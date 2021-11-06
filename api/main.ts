import express, { Application } from 'express';
import { createServer, Server } from 'http';

import { middleware } from './middleware/middleware';
import { MiddlewareRegistrator } from './middleware/middleware-registrator';

const PORT = 3000;

async function main() {
  try {
    const app = express();

    new MiddlewareRegistrator(app).register(middleware);

    const server = createServer(app);

    server.listen(PORT);

    server.on('listening', () => {
      console.log(`server listening on port ${PORT}`);
    });

    server.on('close', () => {
      console.log('server closed');
    });
  } catch (error) {
    console.error(error);
  }
}

main();
