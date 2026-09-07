import { prisma } from '../lib/prisma.js';
import { HttpError } from '../middleware/errorHandler.js';
import type { CreateCollegeInput, UpdateCollegeInput } from '../schemas/index.js';

const includeRelations = {
  approvals: { include: { approval: true } },
  courses: { orderBy: { createdAt: 'asc' as const } },
  faculty: { orderBy: { name: 'asc' as const } },
  alumni: { orderBy: { name: 'asc' as const } },
  reviews: { orderBy: { createdAt: 'desc' as const } },
};

export const listColleges = async () => {
  return prisma.college.findMany({
    orderBy: { createdAt: 'desc' },
    include: includeRelations,
  });
};

export const getCollegeBySlug = async (slug: string) => {
  const college = await prisma.college.findUnique({
    where: { slug },
    include: includeRelations,
  });
  if (!college) throw new HttpError(404, `College '${slug}' not found`);
  return college;
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