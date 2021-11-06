import { createServer, Server } from 'http';
import express, { Application } from 'express';

import { middleware } from './middleware/middleware';
import { MiddlewareRegistrator } from './middleware/middleware-registrator';

async function main() {
	try {
		const app = express();

    new MiddlewareRegistrator(app).register(middleware);

		const server = createServer(app);

		server.listen(3000);

		server.on('listening', () => {
			console.log(`server listening on port 3000`);
		});

		server.on('close', () => {
			console.log('server closed');
		});
	} catch (error) {
		console.error(error);
	}
}

main();
