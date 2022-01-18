import express from 'express';
import { createServer } from 'http';
import { connect } from 'mongoose';

import { handleError } from './error-handler';
import { middleware } from './middleware/middleware';
import { RoutesRegistrator } from './components/routes-registrator';
import { MiddlewareRegistrator } from './middleware/middleware-registrator';

const PORT = 3000;
const DATABASE_URL = 'mongodb://localhost:27017/';
const DATABASE_NAME = 'cookbook';

async function main() {
  try {
    const options = { dbName: DATABASE_NAME };
    await connect(DATABASE_URL, options).then(
      () => console.log(`connected to database: ${DATABASE_URL}${DATABASE_NAME}`),
      _error => console.error(`database connection fail: ${DATABASE_URL}${DATABASE_NAME}`)
    );

    const app = express();
    new MiddlewareRegistrator(app).register(middleware);
    new RoutesRegistrator(app).register('/api');
    app.use(handleError);

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
