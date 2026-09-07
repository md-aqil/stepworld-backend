import { Router } from 'express';
import {
  listColleges,
  getCollegeBySlug,
  createCollege,
  updateCollege,
  deleteCollege,
} from '../services/colleges.service.js';
import { listCourses } from '../services/courses.service.js';
import {
  slugParamSchema,
  createCollegeSchema,
  updateCollegeSchema,
} from '../schemas/index.js';

export const collegesRouter = Router();

collegesRouter.get('/', async (_req, res, next) => {
  try {
    res.json(await listColleges());
  } catch (err) {
    next(err);
  }
});

collegesRouter.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = slugParamSchema.parse(req.params);
    res.json(await getCollegeBySlug(slug));
  } catch (err) {
    next(err);
  }
});

collegesRouter.get('/:slug/courses', async (req, res, next) => {
  try {
    const { slug } = slugParamSchema.parse(req.params);
    res.json(await listCourses(slug));
  } catch (err) {
    next(err);
  }
});

collegesRouter.post('/', async (req, res, next) => {
  try {
    const input = createCollegeSchema.parse(req.body);
    res.status(201).json(await createCollege(input));
  } catch (err) {
    next(err);
  }
});

collegesRouter.patch('/:slug', async (req, res, next) => {
  try {
    const { slug } = slugParamSchema.parse(req.params);
    const input = updateCollegeSchema.parse(req.body);
    res.json(await updateCollege(slug, input));
  } catch (err) {
    next(err);
  }
});

collegesRouter.delete('/:slug', async (req, res, next) => {
  try {
    const { slug } = slugParamSchema.parse(req.params);
    await deleteCollege(slug);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});