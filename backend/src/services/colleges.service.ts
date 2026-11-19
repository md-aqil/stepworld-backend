import { prisma } from '../lib/prisma.js';
import { HttpError } from '../middleware/errorHandler.js';
import type { CreateCollegeInput, UpdateCollegeInput } from '../schemas/index.js';
import { FALLBACK_COLLEGES } from '../data/fallbackData.js';

const includeRelations = {
  approvals: { include: { approval: true } },
  courses: { orderBy: { createdAt: 'asc' as const } },
  faculty: { orderBy: { name: 'asc' as const } },
  alumni: { orderBy: { name: 'asc' as const } },
  reviews: { orderBy: { createdAt: 'desc' as const } },
};

export const listColleges = async () => {
  try {
    const colleges = await prisma.college.findMany({
      orderBy: { createdAt: 'desc' },
      include: includeRelations,
    });
    if (colleges && colleges.length > 0) return colleges;
  } catch (err) {
    console.warn('[listColleges] Database query failed, serving fallback colleges:', (err as Error)?.message);
  }
  return FALLBACK_COLLEGES;
};

export const getCollegeBySlug = async (slug: string) => {
  try {
    const college = await prisma.college.findUnique({
      where: { slug },
      include: includeRelations,
    });
    if (college) return college;
  } catch (err) {
    console.warn(`[getCollegeBySlug] Query for '${slug}' failed:`, (err as Error)?.message);
  }
  const fallback = FALLBACK_COLLEGES.find((c) => c.slug === slug);
  if (fallback) return fallback;
  throw new HttpError(404, `College '${slug}' not found`);
};

export const createCollege = async (input: CreateCollegeInput) => {
  const { approvalLabels = [], ...data } = input;
  return prisma.$transaction(async (tx) => {
    const approvals = await Promise.all(
      approvalLabels.map((label) =>
        tx.approval.upsert({ where: { label }, create: { label }, update: {} }),
      ),
    );
    return tx.college.create({
      data: {
        ...data,
        approvals: { create: approvals.map((a) => ({ approvalId: a.id })) },
      },
      include: includeRelations,
    });
  });
};

export const updateCollege = async (slug: string, input: UpdateCollegeInput) => {
  const { approvalLabels, ...data } = input;
  const existing = await prisma.college.findUnique({ where: { slug } });
  if (!existing) throw new HttpError(404, `College '${slug}' not found`);

  return prisma.$transaction(async (tx) => {
    if (approvalLabels) {
      const approvals = await Promise.all(
        approvalLabels.map((label) =>
          tx.approval.upsert({ where: { label }, create: { label }, update: {} }),
        ),
      );
      await tx.collegeApproval.deleteMany({ where: { collegeId: existing.id } });
      await tx.collegeApproval.createMany({
        data: approvals.map((a) => ({ collegeId: existing.id, approvalId: a.id })),
      });
    }
    return tx.college.update({
      where: { id: existing.id },
      data,
      include: includeRelations,
    });
  });
};

export const deleteCollege = async (slug: string) => {
  const existing = await prisma.college.findUnique({ where: { slug } });
  if (!existing) throw new HttpError(404, `College '${slug}' not found`);
  await prisma.college.delete({ where: { id: existing.id } });
};