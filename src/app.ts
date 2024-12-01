import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

// Error Handling
app.use(errorHandler);

export default app;
