import { Router } from 'express';
import {
  listCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../services/courses.service.js';
import {
  slugParamSchema,
  createCourseSchema,
  updateCourseSchema,
} from '../schemas/index.js';

export const coursesRouter = Router();

coursesRouter.get('/', async (req, res, next) => {
  try {
    const collegeSlug = typeof req.query.collegeSlug === 'string' ? req.query.collegeSlug : undefined;
    res.json(await listCourses(collegeSlug));
  } catch (err) {
    next(err);
  }
});

coursesRouter.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = slugParamSchema.parse(req.params);
    res.json(await getCourseBySlug(slug));
  } catch (err) {
    next(err);
  }
});

coursesRouter.post('/', async (req, res, next) => {
  try {
    const input = createCourseSchema.parse(req.body);
    res.status(201).json(await createCourse(input));
  } catch (err) {
    next(err);
  }
});

coursesRouter.patch('/:slug', async (req, res, next) => {
  try {
    const { slug } = slugParamSchema.parse(req.params);
    const input = updateCourseSchema.parse(req.body);
    res.json(await updateCourse(slug, input));
  } catch (err) {
    next(err);
  }
});

coursesRouter.delete('/:slug', async (req, res, next) => {
  try {
    const { slug } = slugParamSchema.parse(req.params);
    await deleteCourse(slug);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});