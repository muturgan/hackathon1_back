import { Request } from 'express';


export const attackerDetails = (req: Request) => {
    return {
        body: req.body,
        cookies: req.cookies,
        headers: req.headers,
        params: req.params,
        query: req.query,
        method: req.method,
        hostname: req.hostname,
        path: req.path,
        ip: req.ip,
        originalUrl: req.originalUrl,
        fresh: req.fresh,
        stale: req.stale,
    };
};
