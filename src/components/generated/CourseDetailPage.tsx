import React, { useState } from 'react';
import { apiUrl } from '../../lib/api';
import {
  Search,
  ChevronDown,
  Menu,
  X,
  IndianRupee,
  Clock,
  GraduationCap,
  Award,
  Briefcase,
  FileText,
  BadgeCheck,
  Building2,
  Star,
  Phone,
  Mail,
  Sparkles,
  CheckCircle2,
  Calendar,
  Users,
  Globe2,
  ArrowRight,
  MessageCircle,
  Instagram,
  Facebook,
} from 'lucide-react';
import ApplyModal from './ApplyModal';

const GRADIENT_TEXT =
  'bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 via-red-500 via-purple-500 to-blue-500';
const GRADIENT_BG =
  'bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 via-red-500 via-purple-500 to-blue-500';

type StepWorldLogoProps = {
  height: number;
  variant: 'nav' | 'footer';
};

const StepWorldLogo = ({ height }: { height: number; variant?: 'nav' | 'footer' }) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/stepworld-logo.jpg"
        alt="StepWorld"
        style={{ height }}
        className="w-auto object-contain rounded-xl shadow-md"
      />
    </div>
  );
};

const Navbar = ({ collegeSlug }: { collegeSlug?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24">
          <a href="/" className="flex items-center flex-shrink-0 cursor-pointer py-1">
            <StepWorldLogo height={72} variant="nav" />
          </a>
          <div className="hidden lg:flex items-center space-x-8">
            <button className="flex items-center text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
              Explore Programs <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <button className="flex items-center text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
              Top Universities <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <button className="flex items-center text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
              Tools <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <button className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
              About Us
            </button>

          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href={collegeSlug ? `/university/${collegeSlug}` : '/#top-colleges'}
              className="px-4 py-2 text-sm font-bold text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              View Details
            </a>
            <button className="px-5 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
              Sign In
            </button>
            <button className="text-slate-500 hover:text-blue-600 transition-colors">
              <Search className="h-5 w-5" />
            </button>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-blue-600 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

type ApiApproval = { id: string; label: string };
type ApiCourse = {
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
  mode?: string | null;
  reviews: { id: string; name: string; initials: string; color: string; rating: number; text: string }[];
};
type ApiCollege = {
  id: string;
  slug: string;
  name: string;
  shortName: string | null;
  location: string;
  fullAddress: string | null;
  initials: string;
  logoGradient: string;
  rating: number;
  ratingCount: string | null;
  nirfRank: string | null;
  qsRank: string | null;
  approvals: { approval: ApiApproval }[];
};

const FALLBACK_COURSE: ApiCourse = {
  id: 'fallback',
  slug: 'online-mba',
  title: 'Online MBA',
  fee: '₹1,60,000',
  duration: '2 Years',
  specializations: '6 Specializations',
  badge: '⚡ Trending',
  badgeColor: 'bg-blue-100 text-blue-700',
  description:
    'A two-year industry-aligned MBA designed for working professionals. Build leadership, strategy and analytical skills with UGC-approved credentials.',
  eligibility: "Bachelor's degree with 50%+ marks from a recognized university.",
  careerOutcomes: 'Graduates move into mid-to-senior roles across product, finance, marketing and operations.',
  avgSalary: '₹6.5 - ₹14 LPA',
  syllabus: null,
  skills: 'Leadership, Strategic Thinking, Financial Modeling',
  jobRoles: 'Product Manager, Business Analyst',
  reviews: [],
};

const FALLBACK_COLLEGE: ApiCollege = {
  id: 'fallback',
  slug: 'alliance-university-online',
  name: 'Alliance University Online',
  shortName: 'Alliance University Online',
  location: 'Bengaluru, Karnataka',
  fullAddress: 'Central Campus, Bengaluru',
  initials: 'AU',
  logoGradient: 'from-orange-500 via-rose-500 to-purple-600',
  rating: 4.1,
  ratingCount: '7 Reviews',
  nirfRank: '71',
  qsRank: 'Top 1% in South Asia',
  approvals: [
    { approval: { id: 'ugc', label: 'UGC' } },
    { approval: { id: 'naac', label: 'NAAC A+' } },
    { approval: { id: 'aicte', label: 'AICTE' } },
    { approval: { id: 'nirf', label: 'NIRF' } },
  ],
};

const SPECIALIZATIONS_BY_TITLE: Record<string, string[]> = {
  'Online MBA': ['Finance', 'Marketing', 'HR', 'Operations', 'Business Analytics', 'IT Management'],
  'Online BBA': ['Finance', 'Marketing', 'Entrepreneurship', 'Digital Marketing'],
  'Online B.Com': ['Finance', 'Accounting', 'Banking & Insurance'],
  'Online B.Com (Hons)': ['Finance & Accounting', 'Business Analytics', 'International Finance'],
};

const FALLBACK_SPECIALIZATIONS = ['Core', 'Electives', 'Capstone Project'];

const Hero = ({ course, college, onApply }: { course: ApiCourse; college: ApiCollege; onApply: () => void }) => (
  <section className="relative isolate w-full overflow-hidden bg-[#0F172A]">
    <svg className="absolute -right-24 -top-20 h-72 w-[560px] opacity-20 blur-[1px] sm:h-80 sm:w-[680px] lg:-right-12 lg:top-[-104px] lg:h-[420px] lg:w-[860px]" viewBox="0 0 860 420" fill="none" aria-hidden="true">
      <path d="M10 294C164 175 304 134 451 153C565 168 666 129 848 12" stroke="url(#course-arc-primary)" strokeWidth="26" strokeLinecap="round" />
      <path d="M2 342C165 250 307 217 459 234C582 248 689 202 858 86" stroke="url(#course-arc-secondary)" strokeWidth="14" strokeLinecap="round" />
      <defs>
        <linearGradient id="course-arc-primary" x1="10" y1="342" x2="858" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16A34A" />
          <stop offset="0.35" stopColor="#F97316" />
          <stop offset="0.67" stopColor="#E11D48" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
        <linearGradient id="course-arc-secondary" x1="2" y1="352" x2="858" y2="86" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22C55E" />
          <stop offset="0.5" stopColor="#FACC15" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>

    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-300">
        <a href="/" className="hover:text-white transition-colors">Home</a>
        <span className="text-slate-500">›</span>
        <a href={`/university/${college.slug}`} className="hover:text-white transition-colors">{college.shortName ?? college.name}</a>
        <span className="text-slate-500">›</span>
        <span className="text-white">{course.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          {(() => {
            const isOffline = (course.mode ?? (/online/i.test(course.title) ? 'online' : 'offline')) === 'offline';
            return (
              <div className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 shadow-sm backdrop-blur-md ${
                isOffline ? 'border-emerald-300/30 bg-emerald-500/10 text-emerald-300' : 'border-sky-300/30 bg-sky-500/10 text-sky-300'
              }`}>
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                <span className="text-xs font-extrabold uppercase tracking-[0.16em]">
                  {isOffline ? '🏫 Regular On-Campus Degree · 2026 Admissions Open' : '💻 Online Degree · 2026 Intake Open'}
                </span>
              </div>
            );
          })()}

          {course.badge && course.badgeColor && (
            <span className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${course.badgeColor}`}>
              {course.badge}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.05] tracking-tight text-white">
            {course.title} <span className={GRADIENT_TEXT}>by {college.shortName ?? college.name}</span>
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-300">
            <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4" /> {college.location}</span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <strong className="text-white">{college.rating}</strong>
              <span>({college.ratingCount ?? '0 Reviews'})</span>
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat icon={IndianRupee} label="Total Fees" value={course.fee} />
            <Stat icon={Clock} label="Duration" value={course.duration} />
            <Stat icon={GraduationCap} label="Specializations" value={course.specializations ?? 'Multiple'} />
            <Stat icon={Award} label="Approvals" value={`${college.approvals.length}+`} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {college.approvals.map(({ approval }) => (
              <span key={approval.id} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                <BadgeCheck className="h-3.5 w-3.5 text-emerald-300" /> {approval.label}
              </span>
            ))}
          </div>
        </div>

        <aside className="rounded-3xl border border-white/12 bg-white p-6 shadow-2xl shadow-black/40">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-700">
            <Sparkles className="h-3.5 w-3.5" /> Apply for 2026 Intake
          </div>
          <h2 className="text-lg font-extrabold text-slate-900">Get Free Counselling</h2>
          <p className="mt-1 text-sm text-slate-600">Talk to an advisor for {course.title} at {college.shortName ?? college.name}.</p>

          <div className="mt-4 p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <MessageCircle className="w-5 h-5 fill-current" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">Direct WhatsApp Support</p>
              <p className="text-sm font-extrabold text-slate-900">+91 99102 45535</p>
            </div>
          </div>

          <button
            onClick={onApply}
            className="mt-4 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Apply on WhatsApp (99102 45535)</span>
          </button>

          <button
            onClick={onApply}
            className={`mt-2.5 w-full rounded-xl py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition-transform hover:-translate-y-0.5 cursor-pointer ${GRADIENT_BG}`}
          >
            Get Free Counselling Now
          </button>
          <button
            onClick={onApply}
            className="mt-3 w-full rounded-xl border-2 border-emerald-600 py-3 text-xs font-black uppercase tracking-wider text-emerald-700 transition-colors hover:bg-emerald-50 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Get Brochure on WhatsApp
          </button>

          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 text-xs font-semibold text-slate-600">
            <a
              href="https://wa.me/919910245535?text=Hi%20StepWorld,%20I%20would%20like%20to%20get%20free%20admission%20counselling"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-600" /> WhatsApp Chat
            </a>
            <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-blue-600" /> info@stepworld.com</span>
          </div>
        </aside>
      </div>
    </div>
  </section>
);

const Stat = ({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) => (
  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-sm">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
      <Icon className="h-5 w-5" />
    </span>
    <div className="min-w-0">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-300">{label}</p>
      <p className="truncate text-base font-black text-white">{value}</p>
    </div>
  </div>
);

const OverviewSection = ({ course, college, onApply }: { course: ApiCourse; college: ApiCollege; onApply: () => void }) => {
  const specs = SPECIALIZATIONS_BY_TITLE[course.title] ?? FALLBACK_SPECIALIZATIONS;
  const [active, setActive] = useState<string>(specs[0] ?? '');
  return (
  <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">About the {course.title}</h2>
        <p className="mt-3 text-base leading-7 text-slate-600">
          {course.description ??
            `The ${course.title} program by ${college.name} is designed for working professionals and graduates who want a UGC-recognized degree with real-world outcomes. Learn through live sessions, case-based teaching, and an industry-aligned curriculum.`}
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Specializations Offered</h2>
        <p className="mt-1 text-sm text-slate-600">Pick a track that matches your career goals.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {specs.map((s) => {
            const isActive = s === active;
            return (
              <button key={s} type="button" onClick={() => setActive(s)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-bold transition-colors ${
                  isActive ? 'border-blue-600 bg-blue-600 text-white' : 'border-blue-100 bg-blue-50 text-blue-700 hover:border-blue-300'
                }`}>
                <CheckCircle2 className="h-4 w-4" /> {s}
              </button>
            );
          })}
        </div>
        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-sm text-slate-700">
          <p><strong className="font-black text-slate-900">{active}</strong> track focuses on industry-specific case studies, capstone projects, and mentorship from senior practitioners in the field.</p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Key Highlights</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { icon: GraduationCap, t: 'Industry-Aligned Curriculum', d: 'Built with input from CXOs and academic experts.' },
            { icon: Users, t: 'Live Weekend Classes', d: 'Designed for working professionals.' },
            { icon: Globe2, t: '24/7 LMS Access', d: 'Recorded lectures, notes, and assessments.' },
            { icon: Briefcase, t: 'Placement Support', d: 'Resume, interview prep, and 3000+ hiring partners.' },
          ].map((h) => {
            const Icon = h.icon;
            return (
              <li key={h.t} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white ${GRADIENT_BG}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">{h.t}</p>
                  <p className="text-xs text-slate-600">{h.d}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Fee Structure</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr className="text-xs font-black uppercase tracking-wide text-slate-600">
                <th className="px-5 py-3">Particulars</th>
                <th className="px-5 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Program Fees', course.fee],
                ['Duration', course.duration],
                ['Mode', 'Regular On-Campus / Approved Online'],
                ['Admission Assistance', '100% Free Guidance by StepWorld'],
              ].map(([k, v], i) => (
                <tr key={k} className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                  <td className="px-5 py-4 font-bold text-slate-700">{k}</td>
                  <td className="px-5 py-4 text-slate-800">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 mb-2">
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Direct WhatsApp Admissions</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Need Instant Help with {course.title}?
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Chat directly with our senior admission counsellor on WhatsApp for cutoff, eligibility, and direct university fee details.
            </p>
          </div>
          <button
            onClick={onApply}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider py-3.5 px-6 shadow-md transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp: 99102 45535</span>
          </button>
        </div>
      </section>
    </div>

    <aside className="space-y-6">
      <div className="rounded-2xl border border-blue-100 bg-[#F0F7FF] p-6 shadow-sm">
        <h3 className="text-base font-extrabold text-slate-900">Quick Facts</h3>
        <ul className="mt-4 space-y-3 text-sm">
          <li className="flex justify-between"><span className="text-slate-500">Program</span><span className="font-bold text-slate-900">{course.title}</span></li>
          <li className="flex justify-between"><span className="text-slate-500">University</span><span className="font-bold text-slate-900">{college.shortName ?? college.name}</span></li>
          <li className="flex justify-between"><span className="text-slate-500">Total Fees</span><span className="font-bold text-slate-900">{course.fee}</span></li>
          <li className="flex justify-between"><span className="text-slate-500">Duration</span><span className="font-bold text-slate-900">{course.duration}</span></li>
          <li className="flex justify-between"><span className="text-slate-500">Mode</span><span className="font-bold text-slate-900">Online</span></li>
        </ul>
        <button onClick={onApply} className={`mt-5 w-full rounded-xl py-3 text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg ${GRADIENT_BG}`}>
          Apply Now
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-base font-extrabold text-slate-900">Intake Calendar 2026</h3>
        <ul className="mt-4 space-y-3 text-sm">
          {[
            { label: 'Application Deadline', value: 'Rolling' },
            { label: 'Next Batch Starts', value: 'Jan 2026' },
            { label: 'Counselling Sessions', value: 'Mon–Sat' },
          ].map((row) => (
            <li key={row.label} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <div className="flex-1">
                <p className="text-xs text-slate-500">{row.label}</p>
                <p className="text-sm font-bold text-slate-800">{row.value}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h3 className="text-base font-extrabold text-amber-900">View full college details</h3>
        <p className="mt-1 text-sm text-amber-800">See approvals, NIRF rank, all programs & faculty.</p>
        <a
          href={`/university/${college.slug}`}
          className={`mt-4 block w-full rounded-xl py-3 text-center text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg ${GRADIENT_BG}`}
        >
          View Details
        </a>
      </div>

      <a href={`/university/${college.slug}`} className="block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-blue-200">
        <p className="text-xs font-black uppercase tracking-wide text-slate-500">About the university</p>
        <p className="mt-1 text-sm font-extrabold text-slate-900">{college.name}</p>
        <p className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-blue-600">
          View college page <ArrowRight className="h-3 w-3" />
        </p>
      </a>
    </aside>
  </div>
  );
};

const SyllabusSection = ({ course }: { course: ApiCourse }) => {
  const [openSem, setOpenSem] = useState<number | null>(1);
  if (!course.syllabus || course.syllabus.length === 0) return null;
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Syllabus & Curriculum</h2>
          <p className="mt-1 text-sm text-slate-600">Semester-wise breakdown of subjects you'll study.</p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{course.syllabus.length} Semesters</span>
      </div>
      <div className="space-y-2">
        {course.syllabus.map((sem) => {
          const isOpen = openSem === sem.semester;
          return (
            <div key={sem.semester} className="rounded-xl border border-slate-200 bg-slate-50">
              <button onClick={() => setOpenSem(isOpen ? null : sem.semester)} className="flex w-full items-center justify-between gap-3 p-4 text-left">
                <div className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-black text-white ${GRADIENT_BG}`}>{sem.semester}</span>
                  <span className="text-base font-extrabold text-slate-900">Semester {sem.semester}</span>
                </div>
                <span className="text-xs font-bold text-slate-500">{sem.subjects.length} subjects</span>
              </button>
              {isOpen && (
                <ul className="grid gap-2 px-4 pb-4 sm:grid-cols-2">
                  {sem.subjects.map((s) => (
                    <li key={s} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

const EligibilitySection = ({ course }: { course: ApiCourse }) => {
  if (!course.eligibility) return null;
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-extrabold text-slate-900">Eligibility Criteria</h2>
      <p className="mt-2 text-base leading-7 text-slate-700">{course.eligibility}</p>
    </section>
  );
};

const CareerSection = ({ course }: { course: ApiCourse }) => {
  const skills = (course.skills ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  const roles = (course.jobRoles ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!course.careerOutcomes && skills.length === 0 && roles.length === 0) return null;
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-extrabold text-slate-900">Career Outcomes</h2>
      {course.careerOutcomes && <p className="mt-2 text-base leading-7 text-slate-700">{course.careerOutcomes}</p>}
      {course.avgSalary && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2">
          <Award className="h-4 w-4 text-emerald-700" />
          <span className="text-sm font-bold text-emerald-800">Avg Salary: {course.avgSalary}</span>
        </div>
      )}
      {skills.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-black uppercase tracking-wide text-slate-700">Skills You'll Gain</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-700">{s}</span>
            ))}
          </div>
        </div>
      )}
      {roles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-black uppercase tracking-wide text-slate-700">Job Roles You Can Target</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {roles.map((r) => (
              <span key={r} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-bold text-slate-700">{r}</span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};



const CourseReviewsSection = ({ course }: { course: ApiCourse }) => {
  if (!course.reviews || course.reviews.length === 0) return null;
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-extrabold text-slate-900">Student Reviews for {course.title}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {course.reviews.map((r) => (
          <div key={r.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white border border-white/30" style={{ backgroundColor: r.color }}>{r.initials}</div>
              <div>
                <p className="text-sm font-extrabold text-slate-900">{r.name}</p>
                <p className="text-xs text-amber-500">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">“{r.text}”</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const AdmissionsSection = ({ course }: { course: ApiCourse }) => {
  const steps = [
    { n: 1, title: 'Fill Application', desc: 'Complete the online enquiry form.' },
    { n: 2, title: 'Get Counselled', desc: 'Verify eligibility and shortlist program.' },
    { n: 3, title: 'Pay & Enrol', desc: 'Pay fees directly on university portal.' },
    { n: 4, title: 'Start Learning', desc: 'Access LMS, live sessions & study material.' },
  ];
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-extrabold text-slate-900">Admission Process for {course.title}</h2>
      <p className="mt-1 text-sm text-slate-600">A simple 4-step journey from enquiry to enrollment.</p>
      <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <li key={s.n} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-black text-white ${GRADIENT_BG}`}>{s.n}</div>
            <h3 className="mt-3 text-base font-extrabold text-slate-900">{s.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

const FAQS = [
  { q: `Is the ${'{course}'} degree valid for jobs?`, a: 'Yes, UGC-approved online degrees are accepted by government and private employers, including for higher studies and competitive exams.' },
  { q: 'How are online exams conducted?', a: 'Exams are held online with secure remote proctoring, scheduled on weekends for working professionals.' },
  { q: 'Will I get placement support?', a: 'Yes — you get resume building, interview prep, and access to 3000+ hiring partners.' },
  { q: 'How does StepWorld assist with admissions?', a: 'StepWorld provides 100% free personalized counselling, direct university fee payment guidance, application verification, and end-to-end admission support.' },
];

const FAQSection = ({ course }: { course: ApiCourse }) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-6">
      <div className="inline-flex items-center space-x-2 bg-slate-100 px-3 py-1 rounded-full mb-3 border border-slate-200">
        <span className="text-xl">📝</span>
        <span className="text-sm font-bold text-slate-700">FAQ's</span>
      </div>
      <h2 className="text-2xl font-extrabold text-slate-900">Frequently asked about <span className={GRADIENT_TEXT}>{course.title}</span></h2>
    </div>
    <div className="space-y-4">
      {FAQS.map((faq, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-base font-bold text-slate-800">{faq.q.replace('{course}', course.title)}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{faq.a}</p>
        </div>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-10 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center"><StepWorldLogo height={68} variant="footer" /></div>
          <p className="text-blue-400 font-medium">Get the right guidance with us</p>
          <p className="text-sm font-medium text-slate-400">info@stepworld.com</p>

          {/* SOCIAL MEDIA */}
          <div className="pt-2">
            <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">Connect With Us</p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/919910245535?text=Hi%20StepWorld,%20I%20would%20like%20to%20get%20free%20admission%20counselling"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#25D366] text-white hover:scale-110 hover:shadow-lg hover:shadow-emerald-900/30 transition-all cursor-pointer"
                title="WhatsApp: 99102 45535"
                aria-label="WhatsApp"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 20.16C10.57 20.16 9.12 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.8 7.37 7.5 3.67 12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.05 20.16ZM16.57 14.39C16.32 14.27 15.11 13.67 14.88 13.58C14.66 13.5 14.5 13.46 14.33 13.71C14.17 13.96 13.71 14.5 13.56 14.66C13.42 14.83 13.28 14.85 13.03 14.73C12.78 14.6 11.99 14.34 11.04 13.5C10.3 12.84 9.8 12.03 9.66 11.78C9.51 11.53 9.64 11.4 9.77 11.27C9.88 11.16 10.02 10.98 10.15 10.83C10.27 10.68 10.31 10.58 10.39 10.41C10.48 10.24 10.43 10.1 10.37 9.97C10.31 9.85 9.81 8.63 9.61 8.13C9.4 7.63 9.2 7.7 9.05 7.69C8.91 7.69 8.74 7.69 8.58 7.69C8.41 7.69 8.14 7.75 7.91 8C7.68 8.25 7.03 8.86 7.03 10.1C7.03 11.34 7.93 12.54 8.06 12.71C8.18 12.87 9.83 15.42 12.36 16.51C12.96 16.77 13.43 16.92 13.79 17.04C14.4 17.23 14.95 17.2 15.39 17.14C15.88 17.07 16.89 16.53 17.1 15.95C17.31 15.37 17.31 14.87 17.24 14.76C17.18 14.65 17.03 14.52 16.78 14.39H16.57Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/stepworldeducation?obrf=NzRxMzdsbGF3Mmwz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white hover:scale-110 hover:shadow-lg hover:shadow-rose-900/30 transition-all cursor-pointer"
                title="Instagram: @stepworldeducation"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61581972416599"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1877F2] text-white hover:scale-110 hover:shadow-lg hover:shadow-blue-900/30 transition-all cursor-pointer"
                title="Facebook: StepWorld"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Programs</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Online MBA</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Online BBA</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Online B.Com</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">General</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© 2015–{new Date().getFullYear()} StepWorld Education Consultancy. All Rights Reserved.</p>
        <div className="flex items-center gap-4 text-slate-400">
          <a href="https://wa.me/919910245535" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-bold">
            WhatsApp: 99102 45535
          </a>
          <span>·</span>
          <a href="https://www.instagram.com/stepworldeducation?obrf=NzRxMzdsbGF3Mmwz" target="_blank" rel="noopener noreferrer" className="hover:text-rose-400 transition-colors">
            Instagram
          </a>
          <span>·</span>
          <a href="https://www.facebook.com/profile.php?id=61581972416599" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
            Facebook
          </a>
        </div>
        <p>Direct university tuition fees should be paid directly to the respective institution.</p>
      </div>
    </div>
  </footer>
);

export const CourseDetailPage = ({
  collegeSlug = 'alliance-university-online',
  courseSlug = 'online-mba',
}: {
  collegeSlug?: string;
  courseSlug?: string;
}) => {
  const [college, setCollege] = useState<ApiCollege>({ ...FALLBACK_COLLEGE, slug: collegeSlug });
  const [course, setCourse] = useState<ApiCourse>({ ...FALLBACK_COURSE, slug: courseSlug });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);

  const handleWhatsAppApply = () => {
    const message = encodeURIComponent(
      `Hi StepWorld! I want to get Free Counselling & Apply for ${course.title} at ${college.shortName ?? college.name}. Please guide me with admissions and fees.`
    );
    window.open(`https://wa.me/919910245535?text=${message}`, '_blank');
  };

  React.useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(apiUrl(`/api/colleges/${collegeSlug}`), { signal: controller.signal });
        if (!res.ok) throw new Error(`College HTTP ${res.status}`);
        const data: ApiCollege = await res.json();
        setCollege(data);
        const target = data.slug === collegeSlug
          ? (data as unknown as { courses?: ApiCourse[] }).courses?.find((c) => c.slug === courseSlug)
          : undefined;
        if (target) setCourse(target);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') setError((err as Error).message);
      }
      try {
        const res = await fetch(apiUrl(`/api/courses/${courseSlug}`), { signal: controller.signal });
        if (res.ok) {
          const data: ApiCourse = await res.json();
          setCourse(data);
        }
      } catch {
        // course load failed or aborted, keep college's course data
      }
      setLoading(false);
    };
    load();
    return () => controller.abort();
  }, [collegeSlug, courseSlug]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-200 selection:text-blue-900">
      <Navbar collegeSlug={college?.slug} />
      <Hero course={course} college={college} onApply={handleWhatsAppApply} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-600 shadow-sm">
            Loading latest data from backend…
          </div>
        )}
        {error && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
            Could not reach backend ({error}). Showing static data.
          </div>
        )}
        <OverviewSection course={course} college={college} onApply={handleWhatsAppApply} />
        <SyllabusSection course={course} />
        <EligibilitySection course={course} />
        <CareerSection course={course} />

        <CourseReviewsSection course={course} />
        <AdmissionsSection course={course} />
        <FAQSection course={course} />
      </main>
      <Footer />
      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} context={{ collegeName: college.shortName ?? college.name, courseName: course.title }} />
    </div>
  );
};

export default CourseDetailPage;