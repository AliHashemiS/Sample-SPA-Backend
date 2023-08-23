import express from 'express';
import config from './config';
import bodyParser from 'body-parser';
import cors from 'cors'

import usersRoutes from './routes/users.routes';

const app = express();

app.use(bodyParser.json());

// settings
app.set('port', config.port);

app.use(cors());

app.use(usersRoutes);

export default app;