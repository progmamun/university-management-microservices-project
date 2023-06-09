import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';

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
app.use('/api/v1/', routes);

// global error handler
app.use(globalErrorHandler);

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    message: 'Not found.',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API not found.',
      },
    ],
  });
  next();
});

export default app;
