import { prisma } from '../lib/prisma.js';
import { HttpError } from '../middleware/errorHandler.js';

export const listApprovals = async () =>
  prisma.approval.findMany({ orderBy: { label: 'asc' } });

export const createApproval = async (label: string) => {
  const existing = await prisma.approval.findUnique({ where: { label } });
  if (existing) throw new HttpError(409, `Approval "${label}" already exists`);
  return prisma.approval.create({ data: { label } });
};

export const deleteApproval = async (id: string) => {
  const existing = await prisma.approval.findUnique({ where: { id } });
  if (!existing) throw new HttpError(404, `Approval not found`);
  const inUse = await prisma.collegeApproval.count({ where: { approvalId: id } });
  if (inUse > 0) throw new HttpError(400, `Approval is used by ${inUse} college(s); remove it from those colleges first`);
  await prisma.approval.delete({ where: { id } });
};