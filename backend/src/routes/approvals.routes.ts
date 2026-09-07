import { Router } from 'express';
import { z } from 'zod';
import {
  listApprovals,
  createApproval,
  deleteApproval,
} from '../services/approvals.service.js';

export const approvalsRouter = Router();

const createSchema = z.object({ label: z.string().min(1) });

approvalsRouter.get('/', async (_req, res, next) => {
  try {
    res.json(await listApprovals());
  } catch (err) {
    next(err);
  }
});

approvalsRouter.post('/', async (req, res, next) => {
  try {
    const { label } = createSchema.parse(req.body);
    res.status(201).json(await createApproval(label));
  } catch (err) {
    next(err);
  }
});

approvalsRouter.delete('/:id', async (req, res, next) => {
  try {
    await deleteApproval(req.params.id!);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});