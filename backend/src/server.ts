import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { collegesRouter } from './routes/colleges.routes.js';
import { coursesRouter } from './routes/courses.routes.js';
import { approvalsRouter } from './routes/approvals.routes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = Number(process.env.PORT ?? 4000);
const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:5173';

app.use(helmet());
app.use(
  cors({
    origin: FRONTEND_URL.split(',').map((s) => s.trim()),
    credentials: true,
  }),
);
app.use(express.json({ limit: '1mb' }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'stepworld-backend' });
});

app.use('/api/colleges', collegesRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/approvals', approvalsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[stepworld-backend] listening on http://localhost:${PORT}`);
});