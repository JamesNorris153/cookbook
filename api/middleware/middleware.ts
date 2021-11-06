import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'express';

const middleware = [
  helmet(),
  cors({ origin:  '*' }),
  json(),
  compression()
];

export { middleware };
