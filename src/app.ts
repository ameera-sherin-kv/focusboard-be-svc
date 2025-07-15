// src/app.ts
import express from 'express';
import cors from 'cors';
import tasksRoutes from './routes/tasks';
import accomplishmentsRoutes from './routes/accomplishments';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/tasks', tasksRoutes);
app.use('/accomplishments', accomplishmentsRoutes);

export default app;
