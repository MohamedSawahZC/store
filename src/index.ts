import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import errorMiddleware from './middleware/error.middleware';
import config from './config';
import database from './database';
import routes from './routes/index';
const server: Application = express();

server.use(morgan('common')); // Logger middleware to show any request happent in server

server.use(helmet()); //For HTTP Security

server.use(express.json()); //For parsing json bodies

database.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release();
    })
    .catch((error) => console.log(error));
});

server.use('/api', routes);

server.use(errorMiddleware);
//================= handle rate limit for security from spam bots =====================

server.use(
  rateLimit({
    windowMs: 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,
    message: 'Too many request from this IP, please try again after an hour', // Disable the `X-RateLimit-*` headers
  })
);

//============ Handle route not found =============
server.use((_req: Request, res: Response) => {
  res.status(404).json({
    message: 'ooh you are lost maybe page not found',
  });
});

//=================================================

server.listen(config.port, () => {
  console.log(`Server is working successfully in ${config.port}`);
});

export default server;
