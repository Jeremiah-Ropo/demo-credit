import 'dotenv/config';
import 'reflect-metadata';
import express, { Response, Request } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import bodyParser from 'body-parser';

import { PORT } from './config';
import { errorHandler } from "./middlewares/errorHandler";

import './utils/connection';

export const app = express();

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (!origin) {
      callback(null, true);
    } else {
      callback('Not allowed by CORS', false);
    }
  },
};

// CORS: Cross-Origin Resource Sharing: Helps in selective access to resources on server based on origin of request
app.use(cors(corsOptions));

// Helment: Helps to secure Express app by setting various HTTP headers response
app.use(helmet());

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Allow', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Authorization, Cache-Control',
  );
  next();
});

// app.use(morgan("dev"));
app.use(morgan('combined'));

app.get('/health', (req: Request, res: Response) => {
  res.send({
    code: 200,
    message: 'Server is running...',
  });
});

// Routes
app.use('/', routes);

// Error Handler on Routes that does not exist
app.use('*', (req, res, next) => {
  return res.status(400).send({ message: "Route does not exist"})
});

app.use(errorHandler);

// Server Error Handler with status code
app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status;
  res.status(status);
});

const port = PORT || 5001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
