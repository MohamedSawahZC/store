import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import RateLimit, { rateLimit } from 'express-rate-limit';
const server: Application = express();

server.use(morgan('common')); // Logger middleware to show any request happent in server

server.use(helmet()); //For HTTP Security

server.use(express.json()); //For parsing json bodies

//================= handle rate limit for security from spam bots =====================

server.use(
  rateLimit({
    windowMs: 60 * 1000, // 15 minutes
    max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,
    message: 'Too many request from this IP, please try again after an hour', // Disable the `X-RateLimit-*` headers
  })
);

server.get('/', (req: Request, res: Response) => {
  res.send({
    message: 'Welcome dude',
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is working successfully in ${PORT}`);
});

export default server;
