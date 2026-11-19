import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { collegesRouter } from './routes/colleges.routes.js';
import { coursesRouter } from './routes/courses.routes.js';
import { approvalsRouter } from './routes/approvals.routes.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = Number(process.env.PORT ?? 4000);

app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: (_origin, callback) => callback(null, true),
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

// Serve compiled frontend SPA if dist exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../../dist');

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/') || req.path === '/health') {
      return next();
    }
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }
    next();
  });
}

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`[stepworld-backend] listening on http://localhost:${PORT}`);
  });
}
