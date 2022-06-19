import express, { Application, Request, Response } from 'express';

const server: Application = express();

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
