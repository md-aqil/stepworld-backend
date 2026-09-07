import { prisma } from '../lib/prisma.js';
import { HttpError } from '../middleware/errorHandler.js';
import type { CreateCourseInput, UpdateCourseInput } from '../schemas/index.js';

const includeRelations = {
  reviews: { orderBy: { createdAt: 'desc' as const } },
  college: { select: { slug: true, name: true, logoGradient: true, initials: true } },
};

export const listCourses = async (collegeSlug?: string) => {
  return prisma.course.findMany({
    where: collegeSlug ? { college: { slug: collegeSlug } } : undefined,
    orderBy: { createdAt: 'asc' },
    include: includeRelations,
  });
};

export const getCourseBySlug = async (slug: string) => {
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      ...includeRelations,
      college: {
        select: {
          slug: true,
          name: true,
          shortName: true,
          location: true,
          logoGradient: true,
          initials: true,
          rating: true,
          ratingCount: true,
          nirfRank: true,
          qsRank: true,
          approvals: { include: { approval: true } },
          faculty: true,
          alumni: true,
        },
      },
    },
  });
  if (!course) throw new HttpError(404, `Course '${slug}' not found`);
  return course;
};

export const createCourse = async (input: CreateCourseInput) => {
  const college = await prisma.college.findUnique({ where: { id: input.collegeId } });
  if (!college) throw new HttpError(404, `College '${input.collegeId}' not found`);
  return prisma.course.create({ data: input, include: includeRelations });
};

export const updateCourse = async (slug: string, input: UpdateCourseInput) => {
  const existing = await prisma.course.findUnique({ where: { slug } });
  if (!existing) throw new HttpError(404, `Course '${slug}' not found`);
  return prisma.course.update({
    where: { id: existing.id },
    data: input,
    include: includeRelations,
  });
};

export const deleteCourse = async (slug: string) => {
  const existing = await prisma.course.findUnique({ where: { slug } });
  if (!existing) throw new HttpError(404, `Course '${slug}' not found`);
  await prisma.course.delete({ where: { id: existing.id } });
};