// src/app.ts
import express from 'express';
import cors from 'cors';
import tasksRoutes from './routes/tasks';
import accomplishmentsRoutes from './routes/accomplishments';
import dashboardRoutes from './routes/dashboard';
import statsRoutes from './routes/weeklyStats';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/tasks', tasksRoutes);
app.use('/accomplishments', accomplishmentsRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/stats', statsRoutes);

export default app;
