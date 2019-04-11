global.Promise = require('bluebird');

const numCPUs: number = process.env.NODE_ENV === 'production'
    ? require('os').cpus().length
    : 1;

import { env } from './configs/enviroment';


const PORT = env.PORT;


import server from './app';
import { logger } from './services/logger';

import Domain = require('domain');
import cluster = require('cluster');

if (cluster.isMaster) {
    logger.info(`Master ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        logger.info(`Worker ${worker.process.pid} died. code: ${ code }. signal: ${ signal }`);
        cluster.fork();
    });

  } else {
    const domain = Domain.create();
    domain.on('error', (error) => {
        logger.error(`Domain error in process id:${ process.pid }`, error);

        try {
            server.close();

            const killtimer = setTimeout(() => {
                process.exit(1);
            }, 30000);
            killtimer.unref();

            process.exit(1);

        } catch (err) {
            logger.error(`Domain error again`, err);
            process.exit(1);
        }
    });

    domain.run(() => {

        server.listen(PORT, () => {
            logger.info(`Express server id:${ process.pid } listening on port ${ PORT }`);
        });
    });
}
