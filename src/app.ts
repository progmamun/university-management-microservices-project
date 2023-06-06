import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRouters } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

// using cors
app.use(cors());

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully');
});

// application routers
app.use('/api/v1/users/', UserRouters);

// global error handler
app.use(globalErrorHandler);

export default app;
