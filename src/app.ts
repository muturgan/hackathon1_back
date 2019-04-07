import express = require('express');
import { apiRoutes } from './routes/apiRoutes/apiRoutes';
import cors = require('cors');
import helmet = require('helmet');
import compression = require('compression');
import { Server } from 'http';


const app = express();

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false, limit: '5mb' }));

app.use('/api', apiRoutes);

const server = new Server(app);
export default server;
