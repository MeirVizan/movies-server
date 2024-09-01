import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db';
import userRoutes from './routes/userRoutes';
import cors from 'cors';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());


// Routes
app.use('/api/users', userRoutes);
app.get('/', (req, res) => res.send('Hello World'));

export default app;