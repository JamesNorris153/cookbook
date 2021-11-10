import express from 'express';
import { createServer } from 'http';
import { MongoClient } from 'mongodb';

import { ComponentRegistrator } from './components/component-registrator';
import { handleError } from './error-handler';
import { middleware } from './middleware/middleware';
import { MiddlewareRegistrator } from './middleware/middleware-registrator';

const PORT = 3000;

async function main() {
  try {
    const databaseClient = new MongoClient('mongodb://localhost:27017');
    await databaseClient.connect();

    const database = databaseClient.db('cookbook');
    const test = database.collection('test');

    console.log(`Database name: ${database.databaseName}`);
    console.log(`Collection name: ${test.collectionName}`);

    const app = express();
    new MiddlewareRegistrator(app).register(middleware);
    new ComponentRegistrator(database, app).register('/api');
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
