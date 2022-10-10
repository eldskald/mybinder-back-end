import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import errorHandler from './middlewares/errorHandler';
import router from './router';
import testRouter from './routers/testRouter';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

if (process.env.NODE_ENV === 'test') {
  app.use(testRouter);
}

app.use(errorHandler);

export default app;