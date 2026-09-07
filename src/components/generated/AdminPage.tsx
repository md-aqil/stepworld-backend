import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  RefreshCw,
  Building2,
  BookOpen,
  Tag,
  Loader2,
  Search,
  CheckCircle2,
  AlertCircle,
  Eye,
} from 'lucide-react';

const GRADIENT_BG = 'bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 via-red-500 via-purple-500 to-blue-500';
const GRADIENT_TEXT = 'bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 via-red-500 via-purple-500 to-blue-500';

type Approval = { id: string; label: string };
type CourseReview = { id: string; name: string; initials: string; color: string; rating: number; text: string };
type Course = {
  id: string;
  slug: string;
  title: string;
  fee: string;
  duration: string;
  specializations: string | null;
  badge: string | null;
  badgeColor: string | null;
  description: string | null;
  eligibility: string | null;
  careerOutcomes: string | null;
  avgSalary: string | null;
  syllabus: { semester: number; subjects: string[] }[] | null;
  skills: string | null;
  jobRoles: string | null;
  category: 'pg' | 'exec' | 'ug' | 'cert';
  collegeId?: string;
  college?: { slug: string; name: string };
  reviews?: CourseReview[];
};
type Faculty = { id: string; name: string; title: string; experience: string; specialization: string | null; initials: string; color: string };
type AlumniLogo = { id: string; name: string; initials: string; color: string };
type CollegeReview = { id: string; name: string; initials: string; color: string; rating: number; text: string };
type College = {
  id: string;
  slug: string;
  name: string;
  shortName: string | null;
  location: string;
  fullAddress: string | null;
  about: string;
  initials: string;
  logoGradient: string;
  rating: number;
  ratingCount: string | null;
  nirfRank: string | null;
  qsRank: string | null;
  isFeatured: boolean;
  mission: string | null;
  established: string | null;
  campusSize: string | null;
  studentsCount: string | null;
  avgPackage: string | null;
  highestPackage: string | null;
  placementPct: string | null;
  topRecruiters: string | null;
  brochureUrl: string | null;
  approvals: { approval: Approval }[];
  courses: Course[];
  faculty: Faculty[];
  alumni: AlumniLogo[];
  reviews: CollegeReview[];
};

type Toast = { kind: 'success' | 'error'; message: string };

const api = async <T,>(path: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      if (data?.error) msg = data.issues ? `${data.error}: ${data.issues.map((i: { path?: string[]; message: string }) => `${i.path?.join('.')}: ${i.message}`).join('; ')}` : data.error;
    } catch {}
    throw new Error(msg);
  }
  if (res.status === 204) return undefined as unknown as T;
  return res.json();
};

const Field = ({ label, children, hint, error }: { label: string; children: React.ReactNode; hint?: string; error?: string }) => (
  <label className="block">
    <span className="text-xs font-bold uppercase tracking-wide text-slate-600">{label}</span>
    <div className="mt-1">{children}</div>
    {hint && !error && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    {error && <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-red-600"><AlertCircle className="h-3 w-3" /> {error}</p>}
  </label>
);

const inputCls = 'w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

const APPROVAL_OPTIONS = ['UGC', 'NAAC A+', 'AICTE', 'NIRF', 'WES', 'QS World University Rankings', 'BCI', 'AACSB', 'IACBE', 'ISO 9001', 'SIRO', 'NBA', 'MHRD'];

const LogoPreview = ({ initials, gradient }: { initials: string; gradient: string }) => (
  <div className="flex items-center gap-3">
    <div className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-black text-white shadow border-2 border-white" style={{ backgroundColor: gradient }}>
      {initials || '??'}
    </div>
    <span className="text-xs text-slate-500">Live preview</span>
  </div>
);

const RatingStars = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
  <div className="inline-flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <button key={s} type="button" onClick={() => onChange(s)} className={`h-7 w-7 rounded text-lg font-black ${s <= value ? 'text-amber-500' : 'text-slate-300 hover:text-amber-400'}`}>★</button>
    ))}
    <span className="ml-2 text-xs font-bold text-slate-500">{value} / 5</span>
  </div>
);

const Toast = ({ toast, onClose }: { toast: Toast | null; onClose: () => void }) => {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [toast, onClose]);
  if (!toast) return null;
  return (
    <div className={`fixed top-20 right-4 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold shadow-xl ${toast.kind === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
      {toast.kind === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
      {toast.message}
      <button onClick={onClose} className="ml-2 opacity-75 hover:opacity-100"><X className="h-4 w-4" /></button>
    </div>
  );
};

type CollegeFormState = {
  slug: string; name: string; shortName: string; location: string; fullAddress: string; about: string;
  initials: string; logoGradient: string; rating: number; ratingCount: string; nirfRank: string; qsRank: string;
  isFeatured: boolean; approvalLabels: string[]; mission: string; established: string; campusSize: string;
  studentsCount: string; avgPackage: string; highestPackage: string; placementPct: string;
  topRecruiters: string; brochureUrl: string;
};

const emptyCollege: CollegeFormState = {
  slug: '', name: '', shortName: '', location: '', fullAddress: '', about: '',
  initials: '', logoGradient: 'from-orange-500 via-rose-500 to-purple-600',
  rating: 0, ratingCount: '', nirfRank: '', qsRank: '', isFeatured: false, approvalLabels: [],
  mission: '', established: '', campusSize: '', studentsCount: '',
  avgPackage: '', highestPackage: '', placementPct: '', topRecruiters: '', brochureUrl: '',
};

const CollegeForm = ({
  initial, onCancel, onSubmit, submitting,
}: { initial: CollegeFormState; onCancel: () => void; onSubmit: (s: CollegeFormState) => Promise<void>; submitting: boolean }) => {
  const [state, setState] = useState<CollegeFormState>(initial);
  const update = <K extends keyof CollegeFormState>(k: K, v: CollegeFormState[K]) => setState((s) => ({ ...s, [k]: v }));
  const toggleApproval = (label: string) =>
    setState((s) => ({
      ...s,
      approvalLabels: s.approvalLabels.includes(label)
        ? s.approvalLabels.filter((l) => l !== label)
        : [...s.approvalLabels, label],
    }));
  const errors: Partial<Record<keyof CollegeFormState, string>> = {};
  if (!state.slug) errors.slug = 'Required';
  if (!state.name) errors.name = 'Required';
  if (!state.initials) errors.initials = 'Required';
  if (!state.location) errors.location = 'Required';
  if (!state.about) errors.about = 'Required';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) return;
    await onSubmit(state);
  };
  return (
    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
      <Field label="Slug (URL)" error={errors.slug}><input required value={state.slug} onChange={(e) => update('slug', e.target.value)} placeholder="alliance-university-online" className={inputCls} /></Field>
      <Field label="Name" error={errors.name}><input required value={state.name} onChange={(e) => update('name', e.target.value)} className={inputCls} /></Field>
      <Field label="Short Name"><input value={state.shortName} onChange={(e) => update('shortName', e.target.value)} className={inputCls} /></Field>
      <Field label="Initials (logo)" error={errors.initials}><input required maxLength={4} value={state.initials} onChange={(e) => update('initials', e.target.value.toUpperCase())} placeholder="AU" className={inputCls} /></Field>
      <Field label="Location" error={errors.location}><input required value={state.location} onChange={(e) => update('location', e.target.value)} className={inputCls} /></Field>
      <Field label="Full Address"><input value={state.fullAddress} onChange={(e) => update('fullAddress', e.target.value)} className={inputCls} /></Field>
      <div className="md:col-span-2"><Field label="About" error={errors.about}><textarea required rows={4} value={state.about} onChange={(e) => update('about', e.target.value)} className={inputCls} /></Field></div>
      <Field label="Logo Gradient (Tailwind classes)" hint="e.g. from-orange-500 via-rose-500 to-purple-600"><input required value={state.logoGradient} onChange={(e) => update('logoGradient', e.target.value)} className={inputCls} /></Field>
      <div className="md:col-span-2"><LogoPreview initials={state.initials} gradient={state.logoGradient} /></div>
      <Field label="Rating"><RatingStars value={state.rating} onChange={(v) => update('rating', v)} /></Field>
      <Field label="Rating Count"><input value={state.ratingCount} onChange={(e) => update('ratingCount', e.target.value)} placeholder="7 Reviews" className={inputCls} /></Field>
      <Field label="NIRF Rank"><input value={state.nirfRank} onChange={(e) => update('nirfRank', e.target.value)} placeholder="71" className={inputCls} /></Field>
      <Field label="QS Ranking"><input value={state.qsRank} onChange={(e) => update('qsRank', e.target.value)} placeholder="Top 1% in South Asia" className={inputCls} /></Field>
      <Field label="Established"><input value={state.established} onChange={(e) => update('established', e.target.value)} placeholder="2010" className={inputCls} /></Field>
      <Field label="Campus Size"><input value={state.campusSize} onChange={(e) => update('campusSize', e.target.value)} placeholder="55+ Acres" className={inputCls} /></Field>
      <Field label="Students Count"><input value={state.studentsCount} onChange={(e) => update('studentsCount', e.target.value)} placeholder="30,000+" className={inputCls} /></Field>
      <Field label="Avg Package"><input value={state.avgPackage} onChange={(e) => update('avgPackage', e.target.value)} placeholder="₹6.5 LPA" className={inputCls} /></Field>
      <Field label="Highest Package"><input value={state.highestPackage} onChange={(e) => update('highestPackage', e.target.value)} placeholder="₹32 LPA" className={inputCls} /></Field>
      <Field label="Placement %"><input value={state.placementPct} onChange={(e) => update('placementPct', e.target.value)} placeholder="94%" className={inputCls} /></Field>
      <div className="md:col-span-2"><Field label="Top Recruiters" hint="Comma separated"><input value={state.topRecruiters} onChange={(e) => update('topRecruiters', e.target.value)} placeholder="Deloitte, EY, KPMG, Amazon" className={inputCls} /></Field></div>
      <div className="md:col-span-2"><Field label="Mission"><textarea rows={3} value={state.mission} onChange={(e) => update('mission', e.target.value)} className={inputCls} /></Field></div>
      <Field label="Brochure URL"><input value={state.brochureUrl} onChange={(e) => update('brochureUrl', e.target.value)} placeholder="https://..." className={inputCls} /></Field>
      <Field label="Featured"><label className="inline-flex items-center gap-2"><input type="checkbox" checked={state.isFeatured} onChange={(e) => update('isFeatured', e.target.checked)} /><span className="text-sm text-slate-700">Show on homepage as featured</span></label></Field>
      <div className="md:col-span-2">
        <span className="text-xs font-bold uppercase tracking-wide text-slate-600">Approvals</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {APPROVAL_OPTIONS.map((label) => {
            const active = state.approvalLabels.includes(label);
            return (
              <button key={label} type="button" onClick={() => toggleApproval(label)}
                className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${active ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'}`}>
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="md:col-span-2 mt-2 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
        <button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Cancel</button>
        <button type="submit" disabled={submitting || Object.keys(errors).length > 0}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white shadow ${GRADIENT_BG} disabled:opacity-50`}>
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
        </button>
      </div>
    </form>
  );
};

type CourseFormState = {
  slug: string; title: string; fee: string; duration: string; specializations: string;
  badge: string; badgeColor: string; description: string; eligibility: string; careerOutcomes: string;
  avgSalary: string; skills: string; jobRoles: string; syllabusText: string; collegeId: string;
  category: 'pg' | 'exec' | 'ug' | 'cert';
};

const emptyCourse: CourseFormState = {
  slug: '', title: '', fee: '', duration: '', specializations: '',
  badge: '', badgeColor: '', description: '', eligibility: '', careerOutcomes: '',
  avgSalary: '', skills: '', jobRoles: '', syllabusText: '', collegeId: '',
  category: 'pg',
};

const CATEGORY_OPTIONS: { id: 'pg' | 'exec' | 'ug' | 'cert'; title: string; subtitle: string }[] = [
  { id: 'pg', title: 'PG Courses', subtitle: 'After Graduation' },
  { id: 'exec', title: 'Executive Education', subtitle: 'Working Professionals' },
  { id: 'ug', title: 'UG Courses', subtitle: 'After 12th' },
  { id: 'cert', title: 'Certifications', subtitle: 'Skill Up' },
];

const categoryLabel = (id: Course['category']): string => CATEGORY_OPTIONS.find((c) => c.id === id)?.title ?? id;

const categoryBadgeClass = (id: Course['category']): string => {
  switch (id) {
    case 'exec': return 'bg-purple-100 text-purple-700';
    case 'ug':   return 'bg-emerald-100 text-emerald-700';
    case 'cert': return 'bg-amber-100 text-amber-700';
    case 'pg':
    default:     return 'bg-blue-100 text-blue-700';
  }
};

const CourseForm = ({
  initial, colleges, onCancel, onSubmit, submitting,
}: { initial: CourseFormState; colleges: College[]; onCancel: () => void; onSubmit: (s: CourseFormState) => Promise<void>; submitting: boolean }) => {
  const [state, setState] = useState<CourseFormState>(initial);
  const update = <K extends keyof CourseFormState>(k: K, v: CourseFormState[K]) => setState((s) => ({ ...s, [k]: v }));
  const errors: Partial<Record<keyof CourseFormState, string>> = {};
  if (!state.slug) errors.slug = 'Required';
  if (!state.title) errors.title = 'Required';
  if (!state.collegeId) errors.collegeId = 'Required';
  if (!state.fee) errors.fee = 'Required';
  if (!state.duration) errors.duration = 'Required';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) return;
    await onSubmit(state);
  };
  return (
    <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
      <Field label="Slug" error={errors.slug}><input required value={state.slug} onChange={(e) => update('slug', e.target.value)} placeholder="online-mba" className={inputCls} /></Field>
      <Field label="Title" error={errors.title}><input required value={state.title} onChange={(e) => update('title', e.target.value)} placeholder="Online MBA" className={inputCls} /></Field>
      <Field label="College" error={errors.collegeId}>
        <select required value={state.collegeId} onChange={(e) => update('collegeId', e.target.value)} className={inputCls}>
          <option value="">Select a college…</option>
          {colleges.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </Field>
      <Field label="Full Fees" error={errors.fee}><input required value={state.fee} onChange={(e) => update('fee', e.target.value)} placeholder="₹1,60,000" className={inputCls} /></Field>
      <Field label="Duration" error={errors.duration}><input required value={state.duration} onChange={(e) => update('duration', e.target.value)} placeholder="2 Years" className={inputCls} /></Field>
      <Field label="Category" hint="Where this course appears on the homepage">
        <select value={state.category} onChange={(e) => update('category', e.target.value as CourseFormState['category'])} className={inputCls}>
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c.id} value={c.id}>{c.title} — {c.subtitle}</option>
          ))}
        </select>
      </Field>
      <Field label="Specializations"><input value={state.specializations} onChange={(e) => update('specializations', e.target.value)} placeholder="6 Specializations" className={inputCls} /></Field>
      <Field label="Badge"><input value={state.badge} onChange={(e) => update('badge', e.target.value)} placeholder="⚡ Trending" className={inputCls} /></Field>
      <Field label="Badge Color (Tailwind classes)"><input value={state.badgeColor} onChange={(e) => update('badgeColor', e.target.value)} placeholder="bg-blue-100 text-blue-700" className={inputCls} /></Field>
      <div className="md:col-span-2"><Field label="Description"><textarea rows={3} value={state.description} onChange={(e) => update('description', e.target.value)} className={inputCls} /></Field></div>
      <div className="md:col-span-2"><Field label="Eligibility"><textarea rows={2} value={state.eligibility} onChange={(e) => update('eligibility', e.target.value)} className={inputCls} /></Field></div>
      <div className="md:col-span-2"><Field label="Career Outcomes"><textarea rows={2} value={state.careerOutcomes} onChange={(e) => update('careerOutcomes', e.target.value)} className={inputCls} /></Field></div>
      <Field label="Avg Salary"><input value={state.avgSalary} onChange={(e) => update('avgSalary', e.target.value)} placeholder="₹6.5 - ₹14 LPA" className={inputCls} /></Field>
      <div className="md:col-span-2"><Field label="Skills" hint="Comma separated"><input value={state.skills} onChange={(e) => update('skills', e.target.value)} className={inputCls} /></Field></div>
      <div className="md:col-span-2"><Field label="Job Roles" hint="Comma separated"><input value={state.jobRoles} onChange={(e) => update('jobRoles', e.target.value)} className={inputCls} /></Field></div>
      <div className="md:col-span-2">
        <Field label="Syllabus" hint='Format: Semester 1: Subject A, Subject B / Semester 2: Subject C'>
          <textarea rows={4} value={state.syllabusText} onChange={(e) => update('syllabusText', e.target.value)} className={inputCls} />
        </Field>
      </div>
      <div className="md:col-span-2 mt-2 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
        <button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Cancel</button>
        <button type="submit" disabled={submitting || Object.keys(errors).length > 0}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white shadow ${GRADIENT_BG} disabled:opacity-50`}>
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
        </button>
      </div>
    </form>
  );
};

const parseSyllabus = (text: string): { semester: number; subjects: string[] }[] | null => {
  if (!text.trim()) return null;
  const lines = text.split(/\n|\//).map((l) => l.trim()).filter(Boolean);
  const out: { semester: number; subjects: string[] }[] = [];
  for (const line of lines) {
    const m = line.match(/^(?:semester\s*)?(\d+)\s*[:\-]\s*(.+)$/i);
    if (m) {
      const semester = parseInt(m[1]!, 10);
      const subjects = m[2]!.split(',').map((s) => s.trim()).filter(Boolean);
      out.push({ semester, subjects });
    }
  }
  return out.length > 0 ? out : null;
};

const AdminPage = () => {
  const [tab, setTab] = useState<'colleges' | 'courses' | 'approvals'>('colleges');
  const [colleges, setColleges] = useState<College[]>([]);
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  const [collegeSearch, setCollegeSearch] = useState('');
  const [courseSearch, setCourseSearch] = useState('');
  const [courseCollegeFilter, setCourseCollegeFilter] = useState<string>('all');
  const [approvalInput, setApprovalInput] = useState('');

  const [editingCollege, setEditingCollege] = useState<College | 'new' | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | 'new' | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const notify = (kind: 'success' | 'error', message: string) => setToast({ kind, message });

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [c, a, co] = await Promise.all([
        api<College[]>('/colleges'),
        api<Approval[]>('/approvals'),
        api<Course[]>('/courses'),
      ]);
      setColleges(c);
      setApprovals(a);
      setAllCourses(co);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const collegeToForm = (c: College): CollegeFormState => ({
    slug: c.slug, name: c.name, shortName: c.shortName ?? '', location: c.location,
    fullAddress: c.fullAddress ?? '', about: c.about, initials: c.initials, logoGradient: c.logoGradient,
    rating: c.rating, ratingCount: c.ratingCount ?? '', nirfRank: c.nirfRank ?? '', qsRank: c.qsRank ?? '',
    isFeatured: c.isFeatured, approvalLabels: c.approvals.map((a) => a.approval.label),
    mission: c.mission ?? '', established: c.established ?? '', campusSize: c.campusSize ?? '',
    studentsCount: c.studentsCount ?? '', avgPackage: c.avgPackage ?? '', highestPackage: c.highestPackage ?? '',
    placementPct: c.placementPct ?? '', topRecruiters: c.topRecruiters ?? '', brochureUrl: c.brochureUrl ?? '',
  });

  const courseToForm = (c: Course, collegeId: string): CourseFormState => ({
    slug: c.slug, title: c.title, fee: c.fee, duration: c.duration,
    specializations: c.specializations ?? '', badge: c.badge ?? '', badgeColor: c.badgeColor ?? '',
    description: c.description ?? '', eligibility: c.eligibility ?? '', careerOutcomes: c.careerOutcomes ?? '',
    avgSalary: c.avgSalary ?? '', skills: c.skills ?? '', jobRoles: c.jobRoles ?? '',
    syllabusText: (c.syllabus ?? []).map((s) => `Semester ${s.semester}: ${s.subjects.join(', ')}`).join('\n'),
    collegeId: c.collegeId ?? collegeId,
    category: c.category,
  });

  const submitCollege = async (s: CollegeFormState) => {
    setSubmitting(true);
    try {
      const payload = {
        ...s, rating: Number(s.rating) || 0,
        shortName: s.shortName || null, fullAddress: s.fullAddress || null, ratingCount: s.ratingCount || null,
        nirfRank: s.nirfRank || null, qsRank: s.qsRank || null, mission: s.mission || null,
        established: s.established || null, campusSize: s.campusSize || null, studentsCount: s.studentsCount || null,
        avgPackage: s.avgPackage || null, highestPackage: s.highestPackage || null, placementPct: s.placementPct || null,
        topRecruiters: s.topRecruiters || null, brochureUrl: s.brochureUrl || null,
      };
      if (editingCollege === 'new') {
        await api('/colleges', { method: 'POST', body: JSON.stringify(payload) });
        notify('success', 'College created');
      } else if (editingCollege) {
        await api(`/colleges/${editingCollege.slug}`, { method: 'PATCH', body: JSON.stringify(payload) });
        notify('success', 'College updated');
      }
      setEditingCollege(null);
      await refresh();
    } catch (e) {
      notify('error', `Save failed: ${(e as Error).message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const submitCourse = async (s: CourseFormState) => {
    setSubmitting(true);
    try {
      const { collegeId, syllabusText, ...rest } = s;
      const payload = {
        ...rest,
        specializations: s.specializations || null, badge: s.badge || null, badgeColor: s.badgeColor || null,
        description: s.description || null, eligibility: s.eligibility || null, careerOutcomes: s.careerOutcomes || null,
        avgSalary: s.avgSalary || null, skills: s.skills || null, jobRoles: s.jobRoles || null,
        syllabus: parseSyllabus(syllabusText),
      };
      if (editingCourse === 'new') {
        await api('/courses', { method: 'POST', body: JSON.stringify({ ...payload, collegeId }) });
        notify('success', 'Course created');
      } else if (editingCourse) {
        await api(`/courses/${editingCourse.slug}`, { method: 'PATCH', body: JSON.stringify(payload) });
        notify('success', 'Course updated');
      }
      setEditingCourse(null);
      await refresh();
    } catch (e) {
      notify('error', `Save failed: ${(e as Error).message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteCollege = async (slug: string) => {
    if (!confirm(`Delete college "${slug}" and all its courses?`)) return;
    try {
      await api(`/colleges/${slug}`, { method: 'DELETE' });
      notify('success', 'College deleted');
      await refresh();
    } catch (e) {
      notify('error', `Delete failed: ${(e as Error).message}`);
    }
  };

  const deleteCourse = async (slug: string) => {
    if (!confirm(`Delete course "${slug}"?`)) return;
    try {
      await api(`/courses/${slug}`, { method: 'DELETE' });
      notify('success', 'Course deleted');
      await refresh();
    } catch (e) {
      notify('error', `Delete failed: ${(e as Error).message}`);
    }
  };

  const addApproval = async () => {
    const label = approvalInput.trim();
    if (!label) return;
    try {
      await api('/approvals', { method: 'POST', body: JSON.stringify({ label }) });
      setApprovalInput('');
      notify('success', `Approval "${label}" added`);
      await refresh();
    } catch (e) {
      notify('error', `Add failed: ${(e as Error).message}`);
    }
  };

  const deleteApproval = async (id: string, label: string) => {
    if (!confirm(`Delete approval "${label}"? It must not be used by any college.`)) return;
    try {
      await api(`/approvals/${id}`, { method: 'DELETE' });
      notify('success', `Approval "${label}" deleted`);
      await refresh();
    } catch (e) {
      notify('error', `Delete failed: ${(e as Error).message}`);
    }
  };

  const filteredColleges = useMemo(() => {
    const q = collegeSearch.toLowerCase().trim();
    if (!q) return colleges;
    return colleges.filter((c) => c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q));
  }, [colleges, collegeSearch]);

  const filteredCourses = useMemo(() => {
    let list = allCourses;
    if (courseCollegeFilter !== 'all') list = list.filter((c) => c.collegeId === courseCollegeFilter);
    const q = courseSearch.toLowerCase().trim();
    if (q) list = list.filter((c) => c.title.toLowerCase().includes(q) || (c.college?.name ?? '').toLowerCase().includes(q));
    return list;
  }, [allCourses, courseSearch, courseCollegeFilter]);

  const tabs = [
    { id: 'colleges' as const, label: 'Colleges', count: colleges.length, icon: Building2 },
    { id: 'courses' as const, label: 'Courses', count: allCourses.length, icon: BookOpen },
    { id: 'approvals' as const, label: 'Approvals', count: approvals.length, icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white shadow-sm lg:flex">
        <div className="flex h-20 items-center border-b border-slate-200 px-6">
          <div>
            <h1 className="text-lg font-black text-slate-900"><span className={GRADIENT_TEXT}>StepWorld</span></h1>
            <p className="text-xs font-bold text-slate-500">Admin Console</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors ${active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
                <Icon className={`h-4 w-4 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                <span className="flex-1 text-left">{t.label}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs ${active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{t.count}</span>
              </button>
            );
          })}
        </nav>
        <div className="border-t border-slate-200 p-3">
          <a href="/" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">
            <Eye className="h-4 w-4" /> View Site
          </a>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 lg:hidden">
              <div>
                <h1 className="text-base font-black text-slate-900"><span className={GRADIENT_TEXT}>StepWorld Admin</span></h1>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-sm font-bold text-slate-500">Admin Console</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={refresh} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
              </button>
            </div>
          </div>
          <div className="lg:hidden border-t border-slate-100 px-2 py-2 overflow-x-auto">
            <div className="flex gap-1">
              {tabs.map((t) => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button key={t.id} onClick={() => setTab(t.id)}
                    className={`inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold ${active ? 'bg-blue-50 text-blue-700' : 'text-slate-600'}`}>
                    <Icon className="h-3.5 w-3.5" /> {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {error && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>
        )}

        {tab === 'colleges' && (
          <section>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[220px] max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={collegeSearch} onChange={(e) => setCollegeSearch(e.target.value)} placeholder="Search colleges by name or location…" className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:border-blue-500" />
              </div>
              <button onClick={() => setEditingCollege('new')} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white shadow ${GRADIENT_BG}`}>
                <Plus className="h-4 w-4" /> Add College
              </button>
            </div>

            {editingCollege && (
              <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-extrabold text-slate-900">{editingCollege === 'new' ? 'New College' : `Edit ${editingCollege.name}`}</h3>
                  <button onClick={() => setEditingCollege(null)} className="text-slate-400 hover:text-slate-700"><X className="h-5 w-5" /></button>
                </div>
                <CollegeForm initial={editingCollege === 'new' ? emptyCollege : collegeToForm(editingCollege)}
                  onCancel={() => setEditingCollege(null)} onSubmit={submitCollege} submitting={submitting} />
              </div>
            )}

            {filteredColleges.length === 0 && !loading ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center">
                <Building2 className="mx-auto h-10 w-10 text-slate-400" />
                <h3 className="mt-3 text-lg font-extrabold text-slate-900">No colleges found</h3>
                <p className="mt-1 text-sm text-slate-500">{collegeSearch ? 'Try a different search.' : 'Get started by creating your first college.'}</p>
                {!collegeSearch && (
                  <button onClick={() => setEditingCollege('new')} className={`mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white shadow ${GRADIENT_BG}`}>
                    <Plus className="h-4 w-4" /> Create First College
                  </button>
                )}
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                {filteredColleges.map((c) => (
                  <article key={c.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-black text-white shadow border-2 border-white" style={{ backgroundColor: c.logoGradient }}>{c.initials}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate text-lg font-extrabold text-slate-900">{c.name}</h3>
                          {c.isFeatured && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-700">FEATURED</span>}
                        </div>
                        <p className="text-sm text-slate-500">{c.location}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {c.approvals.slice(0, 5).map(({ approval }) => (
                            <span key={approval.id} className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">{approval.label}</span>
                          ))}
                          {c.approvals.length > 5 && <span className="text-[10px] font-bold text-slate-500">+{c.approvals.length - 5} more</span>}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button onClick={() => setEditingCollege(c)} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => deleteCollege(c.slug)} className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-2 border-t border-slate-100 pt-3 text-center text-xs">
                      <div><p className="font-black text-slate-900">{c.courses.length}</p><p className="text-slate-500">Courses</p></div>
                      <div><p className="font-black text-slate-900">{c.faculty.length}</p><p className="text-slate-500">Faculty</p></div>
                      <div><p className="font-black text-slate-900">{c.alumni.length}</p><p className="text-slate-500">Alumni</p></div>
                      <div><p className="font-black text-slate-900">{c.reviews.length}</p><p className="text-slate-500">Reviews</p></div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {tab === 'courses' && (
          <section>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-1 flex-wrap items-center gap-2">
                <div className="relative min-w-[220px] flex-1 max-w-md">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input value={courseSearch} onChange={(e) => setCourseSearch(e.target.value)} placeholder="Search courses…" className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:border-blue-500" />
                </div>
                <select value={courseCollegeFilter} onChange={(e) => setCourseCollegeFilter(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
                  <option value="all">All colleges</option>
                  {colleges.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <button onClick={() => setEditingCourse('new')} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white shadow ${GRADIENT_BG}`}>
                <Plus className="h-4 w-4" /> Add Course
              </button>
            </div>

            {editingCourse && (
              <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-extrabold text-slate-900">{editingCourse === 'new' ? 'New Course' : `Edit ${editingCourse.title}`}</h3>
                  <button onClick={() => setEditingCourse(null)} className="text-slate-400 hover:text-slate-700"><X className="h-5 w-5" /></button>
                </div>
                <CourseForm initial={editingCourse === 'new' ? emptyCourse : courseToForm(editingCourse, editingCourse.collegeId ?? '')}
                  colleges={colleges} onCancel={() => setEditingCourse(null)} onSubmit={submitCourse} submitting={submitting} />
              </div>
            )}

            {filteredCourses.length === 0 && !loading ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center">
                <BookOpen className="mx-auto h-10 w-10 text-slate-400" />
                <h3 className="mt-3 text-lg font-extrabold text-slate-900">No courses found</h3>
                <p className="mt-1 text-sm text-slate-500">Add your first course to get started.</p>
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                {filteredCourses.map((c) => (
                  <article key={c.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="truncate text-lg font-extrabold text-slate-900">{c.title}</h3>
                          <span className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${categoryBadgeClass(c.category)}`}>
                            {categoryLabel(c.category)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500">{c.college?.name}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                          <span className="inline-flex items-center gap-1 font-bold text-slate-700">₹{c.fee}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-600">{c.duration}</span>
                          {c.specializations && (
                            <>
                              <span className="text-slate-300">•</span>
                              <span className="text-slate-600">{c.specializations}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button onClick={() => setEditingCourse(c)} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"><Pencil className="h-4 w-4" /></button>
                        <button onClick={() => deleteCourse(c.slug)} className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                </article>
                ))}
              </div>
            )}
          </section>
        )}

        {tab === 'approvals' && (
          <section>
            <div className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-base font-extrabold text-slate-900">Add a new approval</h2>
              <p className="mt-1 text-xs text-slate-500">Approvals are shared across colleges. Use exact names like "UGC", "NAAC A+", "AICTE".</p>
              <div className="mt-3 flex gap-2">
                <input value={approvalInput} onChange={(e) => setApprovalInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addApproval()} placeholder="e.g. NBA" className={inputCls} />
                <button onClick={addApproval} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-white shadow ${GRADIENT_BG}`}>
                  <Plus className="h-4 w-4" /> Add
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              {approvals.length === 0 ? (
                <div className="p-10 text-center text-sm font-semibold text-slate-500">No approvals yet.</div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {approvals.map((a) => {
                    const inUse = colleges.some((c) => c.approvals.some((x) => x.approval.id === a.id));
                    return (
                      <li key={a.id} className="flex items-center justify-between gap-3 p-4">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-xs font-black text-blue-700">✓</span>
                          <div>
                            <p className="text-sm font-extrabold text-slate-900">{a.label}</p>
                            <p className="text-xs text-slate-500">{inUse ? 'In use' : 'Not used'}</p>
                          </div>
                        </div>
                        <button onClick={() => deleteApproval(a.id, a.label)} disabled={inUse}
                          className="inline-flex items-center gap-2 rounded-lg border border-red-100 px-3 py-1.5 text-xs font-bold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50">
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </section>
        )}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;