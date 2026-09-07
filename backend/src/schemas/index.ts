import { z } from 'zod';

export const slugParamSchema = z.object({
  slug: z
    .string()
    .min(1, 'slug is required')
    .regex(/^[a-z0-9-]+$/i, 'slug must be alphanumeric with hyphens'),
});

const optionalString = z.string().optional();

export const createCollegeSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  shortName: optionalString,
  location: z.string().min(1),
  fullAddress: optionalString,
  about: z.string().min(1),
  initials: z.string().min(1).max(4),
  logoGradient: z.string().min(1),
  rating: z.number().min(0).max(5).default(0),
  ratingCount: optionalString,
  nirfRank: optionalString,
  qsRank: optionalString,
  isFeatured: z.boolean().default(false),
  approvalLabels: z.array(z.string()).default([]),
  mission: optionalString,
  established: optionalString,
  campusSize: optionalString,
  studentsCount: optionalString,
  avgPackage: optionalString,
  highestPackage: optionalString,
  placementPct: optionalString,
  topRecruiters: optionalString,
  brochureUrl: optionalString,
});

export const updateCollegeSchema = createCollegeSchema.partial();

export const createCourseSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  fee: z.string().min(1),
  duration: z.string().min(1),
  specializations: optionalString,
  badge: optionalString,
  badgeColor: optionalString,
  description: optionalString,
  eligibility: optionalString,
  careerOutcomes: optionalString,
  avgSalary: optionalString,
  syllabus: z
    .array(z.object({ semester: z.number(), subjects: z.array(z.string()) }))
    .optional(),
  skills: optionalString,
  jobRoles: optionalString,
  category: z.enum(['pg', 'exec', 'ug', 'cert']).default('pg'),
  collegeId: z.string().min(1),
});

export const updateCourseSchema = createCourseSchema.partial().omit({ collegeId: true });

export type CreateCollegeInput = z.infer<typeof createCollegeSchema>;
export type UpdateCollegeInput = z.infer<typeof updateCollegeSchema>;
export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;