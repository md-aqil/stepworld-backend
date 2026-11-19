import React, { useState } from 'react';
import { apiUrl } from '../../lib/api';
import {
  Search,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  GraduationCap,
  Award,
  Briefcase,
  Clock,
  IndianRupee,
  CheckCircle2,
  Star,
  BadgeCheck,
  Building2,
  Users,
  Globe2,
  FileText,
  Phone,
  Mail,
  Sparkles,
} from 'lucide-react';
import { ApplyModal } from './ApplyModal';

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

const Navbar = () => {
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
            <button className="px-4 py-2 text-sm font-bold text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Compare in 2 mins
            </button>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-blue-600 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <a href="#" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md">Explore Programs</a>
          <a href="#" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md">Top Universities</a>
          <a href="#" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md">Tools</a>
          <a href="#" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md">About Us</a>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col space-y-3">
            <button className="w-full px-4 py-2 text-sm font-bold text-blue-600 border-2 border-blue-600 rounded-lg">Compare in 2 mins</button>
            <button className="w-full px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg">Sign In</button>
          </div>
        </div>
      )}
    </nav>
  );
};

type Approval = { id: string; label: string };
type Course = {
  id: string;
  title: string;
  fee: string;
  duration: string;
  specializations: string;
  badge?: string;
  badgeColor?: string;
};
type FaqItem = { q: string; a: string };

const UNIVERSITY = {
  name: 'Alliance University Online',
  shortName: 'Alliance University Online',
  location: 'Bengaluru, Karnataka',
  fullAddress:
    'Central Campus, Chikkahadage Cross, Chandapura-Anekal Main Road, Bengaluru',
  rating: '4.1',
  ratingCount: '7 Reviews',
  logoGradient: 'from-orange-500 via-rose-500 to-purple-600',
  initials: 'AU',
  nirfRank: '71',
  qsRank: 'Top 1% in South Asia',
  about:
    "Alliance Online believes in redefining the future of students by providing them with flexible, accessible, and impactful learning through online education. The online programs offered by the university bridge the gap between technology and transformative education. Alliance Online prepares the mindset of students to make a big move and sustain in this competitive world. Pursuing an online degree with Alliance Online will put 5 stars on the resume of the students, as this university is known for its quality of education offered.",
  highlights: [
    'UGC-approved and South India’s first private University',
    'NAAC A+ accredited for quality assurance',
    'AICTE, BCI and SIRO (DSIR) recognised',
    'AACSB member and IACBE accredited',
    'NIRF ranked 71 (2025) and QS South Asia Top 1%',
  ],
  facts: [
    'Alliance University is committed to becoming the best in the world, where students can develop through excellent teaching, research, and service to society.',
    'The university has the belief of transforming lives, not necessarily through books, but by producing a better person who can serve the communities.',
    'It makes students think, learn, and ask questions, as little scientists and explorers do.',
    'Alliance encourages big ideas and creativity, be it in science, art, business, or service to others.',
    'The university offers personalized resume building, placement support, career counselling, and interview preparation.',
    'Alliance University Online provides 24/7 access to its modern Learning Management System (LMS).',
  ],
};

const APPROVALS: Approval[] = [
  { id: 'ugc', label: 'UGC' },
  { id: 'naac', label: 'NAAC A+' },
  { id: 'aicte', label: 'AICTE' },
  { id: 'qs', label: 'QS World Rankings' },
  { id: 'nirf', label: 'NIRF' },
  { id: 'wes', label: 'WES' },
];

const COURSES: Course[] = [
  { id: 'mba', title: 'Online MBA', fee: '₹1,60,000', duration: '2 Years', specializations: '6 Specializations', badge: '⚡ Trending', badgeColor: 'bg-blue-100 text-blue-700' },
  { id: 'bcom', title: 'Online B.Com', fee: '₹76,000', duration: '3 Years', specializations: '3 Specializations', badge: '🌍 Popular', badgeColor: 'bg-purple-100 text-purple-700' },
  { id: 'bcom-hons', title: 'Online B.Com (Hons)', fee: '₹1,01,336', duration: '4 Years', specializations: 'Honours Track', badge: '🚀 Fast Track', badgeColor: 'bg-orange-100 text-orange-700' },
  { id: 'bba', title: 'Online BBA', fee: '₹1,26,000', duration: '3 Years', specializations: '4 Specializations', badge: '🎯 Top Rated', badgeColor: 'bg-green-100 text-green-700' },
];

const FAQS: FaqItem[] = [
  { q: 'What is Alliance University Online?', a: 'Alliance University Online is the digital learning platform of Alliance University that offers flexible and industry-relevant online degree programs.' },
  { q: 'Is Alliance University Online recognized?', a: 'Yes, Alliance University Online offers programs through Alliance University, a recognized higher education institution in India, with UGC, NAAC A+, AICTE and NIRF approvals.' },
  { q: 'Who can apply to Alliance University Online?', a: 'Students, working professionals, and career changers can apply to Alliance University Online, subject to program eligibility criteria.' },
  { q: 'Does Alliance University Online provide online classes?', a: 'Yes, Alliance University Online provides live and recorded lectures through its modern Learning Management System (LMS).' },
  { q: 'Are Alliance University Online degrees valid?', a: 'Yes, degrees earned through Alliance University Online are awarded by Alliance University as per applicable regulations.' },
  { q: 'Can working professionals study at Alliance University Online?', a: 'Yes, Alliance University Online is designed to help working professionals balance education with their careers.' },
];

type TabKey = 'overview' | 'programs' | 'faculty' | 'placements' | 'reviews';

const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined) ?? '';

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
};
type ApiFaculty = { id: string; name: string; title: string; experience: string; specialization: string | null; initials: string; color: string };
type ApiAlumni = { id: string; name: string; initials: string; color: string };
type ApiCollegeReview = { id: string; name: string; initials: string; color: string; rating: number; text: string };

type ApiCollege = {
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
  mode?: string | null;
  approvals: { approval: ApiApproval }[];
  courses: ApiCourse[];
  faculty: ApiFaculty[];
  alumni: ApiAlumni[];
  reviews: ApiCollegeReview[];
};

const FALLBACK_COLLEGE: ApiCollege = {
  id: 'fallback',
  slug: 'alliance-university-online',
  name: UNIVERSITY.name,
  shortName: UNIVERSITY.shortName,
  location: UNIVERSITY.location,
  fullAddress: UNIVERSITY.fullAddress,
  about: UNIVERSITY.about,
  initials: UNIVERSITY.initials,
  logoGradient: UNIVERSITY.logoGradient,
  rating: Number(UNIVERSITY.rating),
  ratingCount: UNIVERSITY.ratingCount,
  nirfRank: UNIVERSITY.nirfRank,
  qsRank: UNIVERSITY.qsRank,
  approvals: APPROVALS.map((a) => ({ approval: { id: a.id, label: a.label } })),
  courses: COURSES.map((c) => ({
    id: c.id,
    slug: c.id,
    title: c.title,
    fee: c.fee,
    duration: c.duration,
    specializations: c.specializations,
    badge: c.badge ?? null,
    badgeColor: c.badgeColor ?? null,
  })),
  faculty: [],
  alumni: [],
  reviews: [],
  mission: null,
  established: null,
  campusSize: null,
  studentsCount: null,
  avgPackage: null,
  highestPackage: null,
  placementPct: null,
  topRecruiters: null,
  brochureUrl: null,
  isFeatured: true,
};

const Hero = ({ college, onApply }: { college: ApiCollege; onApply: () => void }) => (
  <section className="relative isolate w-full overflow-hidden bg-[#0F172A]">
    <svg className="absolute -left-24 -top-20 h-72 w-[560px] opacity-20 blur-[1px] sm:h-80 sm:w-[680px] lg:-left-12 lg:top-[-104px] lg:h-[420px] lg:w-[860px]" viewBox="0 0 860 420" fill="none" aria-hidden="true">
      <path d="M10 294C164 175 304 134 451 153C565 168 666 129 848 12" stroke="url(#detail-arc-primary)" strokeWidth="26" strokeLinecap="round" />
      <path d="M2 342C165 250 307 217 459 234C582 248 689 202 858 86" stroke="url(#detail-arc-secondary)" strokeWidth="14" strokeLinecap="round" />
      <defs>
        <linearGradient id="detail-arc-primary" x1="10" y1="342" x2="858" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16A34A" />
          <stop offset="0.35" stopColor="#F97316" />
          <stop offset="0.67" stopColor="#E11D48" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
        <linearGradient id="detail-arc-secondary" x1="2" y1="352" x2="858" y2="86" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22C55E" />
          <stop offset="0.5" stopColor="#FACC15" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>

    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-300">
        <a href="/" className="hover:text-white transition-colors">Home</a>
        <ChevronRight className="h-4 w-4 text-slate-500" />
        <a href="#" className="hover:text-white transition-colors">Universities</a>
        <ChevronRight className="h-4 w-4 text-slate-500" />
        <span className="text-white">Alliance University Online</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-300/25 bg-white/[0.07] px-4 py-2 shadow-sm shadow-black/20 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-orange-300" aria-hidden="true" />
            <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-orange-300">Featured University</span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white/20 shadow-2xl shadow-black/40 ring-2 ring-white/30 text-2xl font-black tracking-tight text-white" style={{ backgroundColor: college.logoGradient }}>
              {college.initials}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.05] tracking-tight text-white">
                {college.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-300">
                <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4" /> {college.location}</span>
                <span className="hidden sm:inline text-slate-500">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <strong className="text-white">{college.rating}</strong>
                  <span>({college.ratingCount ?? '0 Reviews'})</span>
                </span>
                <span className="hidden sm:inline text-slate-500">•</span>
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-black ${
                  (college.mode ?? (/online/i.test(college.name) ? 'online' : 'offline')) === 'online'
                    ? 'bg-sky-500/25 text-sky-200 border border-sky-400/40'
                    : 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/40'
                }`}>
                  {(college.mode ?? (/online/i.test(college.name) ? 'online' : 'offline')) === 'online'
                    ? '💻 Online University'
                    : '🏫 Regular On-Campus (Offline)'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {college.approvals.map(({ approval }) => (
              <span key={approval.id} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                <BadgeCheck className="h-3.5 w-3.5 text-emerald-300" /> {approval.label}
              </span>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300">{college.about}</p>
        </div>

        <aside className="rounded-3xl border border-white/12 bg-white p-6 shadow-2xl shadow-black/40">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-black text-amber-700">
            <Sparkles className="h-3.5 w-3.5" /> NIRF Ranked University
          </div>
          <h2 className="text-lg font-extrabold text-slate-900">Get Free Counselling</h2>
          <p className="mt-1 text-sm text-slate-600">Talk to a Career Development Advisor and shortlist your program.</p>

          <div className="mt-5 space-y-3">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-600">Full Name</span>
              <input type="text" placeholder="e.g. Rahul Sharma" className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-600">Mobile Number</span>
              <input type="tel" placeholder="+91 9876543210" className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-600">Interested In</span>
              <select className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                <option>Online MBA</option>
                <option>Online BBA</option>
                <option>Online B.Com</option>
                <option>Online B.Com (Hons)</option>
              </select>
            </label>
          </div>

          <button onClick={onApply} className={`mt-5 w-full rounded-xl py-3 text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-900/25 transition-transform hover:-translate-y-0.5 ${GRADIENT_BG}`}>
            Apply Now
          </button>
          <button className="mt-3 w-full rounded-xl border-2 border-blue-600 py-3 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50">
            Talk to University
          </button>

          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5 text-xs font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-blue-600" /> 1800-420-5757</span>
            <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-blue-600" /> info@stepworld.com</span>
          </div>
        </aside>
      </div>
    </div>
  </section>
);

const QuickFacts = ({ college }: { college: ApiCollege }) => {
  const facts = [
    { icon: Award, label: 'NIRF Rank', value: college.nirfRank ?? '—', color: 'from-orange-500 to-rose-500' },
    { icon: Globe2, label: 'QS Ranking', value: college.qsRank ?? '—', color: 'from-blue-500 to-cyan-500' },
    { icon: GraduationCap, label: 'Programs', value: `${college.courses.length}+`, color: 'from-emerald-500 to-teal-500' },
    { icon: Users, label: 'Learners', value: '1.25L+', color: 'from-purple-500 to-fuchsia-500' },
  ];
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {facts.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.label} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition-all hover:shadow-md hover:-translate-y-0.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-md border border-white/20" style={{ backgroundColor: f.color }}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{f.label}</p>
                  <p className="text-lg font-extrabold text-slate-900">{f.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const TabsBar = ({ active, onChange }: { active: TabKey; onChange: (k: TabKey) => void }) => {
  const tabs: { id: TabKey; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'programs', label: 'Programs' },
    { id: 'faculty', label: 'Faculty' },
    { id: 'placements', label: 'Placements' },
    { id: 'reviews', label: 'Reviews' },
  ];
  return (
    <div className="sticky top-20 z-30 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map((t) => {
            const isActive = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onChange(t.id)}
                className={`relative whitespace-nowrap px-5 py-4 text-sm font-bold transition-colors ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {t.label}
                {isActive && <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-blue-600" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const OverviewSection = ({ college }: { college: ApiCollege }) => (
  <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">About {college.name}</h2>
        <p className="mt-3 text-base leading-7 text-slate-600">{college.about}</p>
        {college.mission && (
          <>
            <h3 className="mt-6 text-lg font-extrabold text-slate-900">Our Mission</h3>
            <p className="mt-2 text-base leading-7 text-slate-600">{college.mission}</p>
          </>
        )}
        <h3 className="mt-6 text-lg font-extrabold text-slate-900">Why Choose {college.name}?</h3>
        <ul className="mt-3 space-y-2">
          {UNIVERSITY.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-slate-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">University at a glance</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Established', value: college.established, icon: Sparkles },
            { label: 'Campus Size', value: college.campusSize, icon: Building2 },
            { label: 'Students', value: college.studentsCount, icon: Users },
            { label: 'Avg Package', value: college.avgPackage, icon: Award },
            { label: 'Highest Package', value: college.highestPackage, icon: Award },
            { label: 'Placement %', value: college.placementPct, icon: CheckCircle2 },
            { label: 'NIRF Rank', value: college.nirfRank, icon: Award },
            { label: 'QS Ranking', value: college.qsRank, icon: Globe2 },
          ].filter((s) => s.value).map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${GRADIENT_BG} text-white`}>
                  <Icon className="h-4 w-4" />
                </div>
                <p className="mt-2 text-xs font-bold uppercase tracking-wide text-slate-500">{s.label}</p>
                <p className="mt-1 text-lg font-black text-slate-900">{s.value}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Alumni Network</h2>
        <p className="mt-1 text-sm text-slate-600">Our graduates work at leading companies worldwide.</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {college.alumni.map((a) => (
            <div key={a.id} className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-black text-white shadow border-2 border-white" style={{ backgroundColor: a.color }}>
                {a.initials}
              </div>
              <p className="text-center text-xs font-bold text-slate-700">{a.name}</p>
            </div>
          ))}
          {college.alumni.length === 0 && <p className="col-span-full text-sm text-slate-500">No alumni logos yet.</p>}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Key Facts</h2>
        <ul className="mt-4 space-y-3">
          {UNIVERSITY.facts.map((f, i) => (
            <li key={i} className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
              <span className={`mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${GRADIENT_BG}`}>{i + 1}</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Approved By</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {college.approvals.map(({ approval }) => (
            <div key={approval.id} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${GRADIENT_BG} text-white shadow`}>
                <BadgeCheck className="h-5 w-5" />
              </div>
              <span className="text-sm font-bold text-slate-800">{approval.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Sample Certificate</h2>
        <p className="mt-1 text-sm text-slate-600">Get a degree from a renowned university that is A+ accredited.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {['Study from experienced mentors', 'Provides top-notch facilities', 'Quality education'].map((b) => (
            <div key={b} className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800">
              <CheckCircle2 className="h-4 w-4 text-blue-600" /> {b}
            </div>
          ))}
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200">
          <div className="flex items-center justify-center p-10 text-center">
            <div>
              <FileText className="mx-auto h-10 w-10 text-slate-400" />
              <p className="mt-3 text-sm font-bold text-slate-600">Alliance University Sample Certificate Preview</p>
              <p className="mt-1 text-xs text-slate-500">A+ NAAC accredited • UGC approved</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Education Loan / EMI</h2>
        <p className="mt-2 text-sm text-slate-600">
          Flexible EMI options and education loan support available through 20+ lenders, sanctioned in less than 24 hours with no bank visit required.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {['20+ Lenders', 'Sanctioned < 24 hrs', 'No Bank Visit'].map((t) => (
            <div key={t} className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-center text-sm font-extrabold text-emerald-700">{t}</div>
          ))}
        </div>
      </section>
    </div>

    <aside className="space-y-6">
      <div className="rounded-2xl border border-blue-100 bg-[#F0F7FF] p-6 shadow-sm">
        <h3 className="text-base font-extrabold text-slate-900">Summary</h3>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white shadow text-white font-black" style={{ backgroundColor: college.logoGradient }}>
              {college.initials}
            </div>
            <div>
              <p className="font-extrabold text-slate-900">{college.shortName ?? college.name}</p>
              <p className="text-xs text-slate-500">Student Rating {college.rating} / 5</p>
            </div>
          </div>
          <p className="text-slate-600">{college.fullAddress ?? college.location}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            {college.approvals.map(({ approval }) => (
              <span key={approval.id} className="rounded-full border border-blue-100 bg-white px-2.5 py-1 text-[11px] font-bold text-blue-700">{approval.label}</span>
            ))}
          </div>
          <button className="mt-3 w-full rounded-xl border-2 border-blue-600 px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50">Add to Compare</button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-base font-extrabold text-slate-900">Placement Support</h3>
        <p className="mt-1 text-sm text-slate-600">Get placement opportunities & internship offers from 3000+ companies.</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-2xl font-black text-slate-900">3000+</p>
            <p className="text-xs font-semibold text-slate-500">Job Offers</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-2xl font-black text-slate-900">2000+</p>
            <p className="text-xs font-semibold text-slate-500">Internships</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h3 className="text-base font-extrabold text-amber-900">Need Help Choosing?</h3>
        <p className="mt-1 text-sm text-amber-800">Talk to a verified counsellor and shortlist your program in 2 minutes.</p>
        <button className={`mt-4 w-full rounded-xl py-3 text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg ${GRADIENT_BG}`}>
          Get Counselling
        </button>
      </div>
    </aside>
  </div>
);

const CoursesSection = ({ college }: { college: ApiCollege }) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="inline-flex items-center space-x-2 bg-slate-100 px-3 py-1 rounded-full mb-3 border border-slate-200">
          <span className="text-xl" aria-hidden="true">📚</span>
          <span className="text-sm font-bold text-slate-700">Course Wise Updated Fees 2026</span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Programs Offered</h2>
      </div>
      <p className="max-w-md text-sm text-slate-600">Compare specializations, fees, and durations across programs.</p>
    </div>

    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50">
          <tr className="text-xs font-black uppercase tracking-wide text-slate-600">
            <th className="px-5 py-3">Course</th>
            <th className="px-5 py-3">Full Fees</th>
            <th className="px-5 py-3">Duration</th>
            <th className="px-5 py-3">Specializations</th>
            <th className="px-5 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {college.courses.map((c, idx) => (
            <tr key={c.id} className={`border-t border-slate-100 transition-colors hover:bg-blue-50/40 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
              <td className="px-5 py-4">
                <a href={`/university/${college.slug}/${c.slug}`} className="font-extrabold text-slate-900 hover:text-blue-600">
                  {c.title}
                </a>
                {c.badge && c.badgeColor && (
                  <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${c.badgeColor}`}>{c.badge}</span>
                )}
              </td>
              <td className="px-5 py-4 font-bold text-slate-800">{c.fee}</td>
              <td className="px-5 py-4 text-slate-600">{c.duration}</td>
              <td className="px-5 py-4 text-slate-600">{c.specializations ?? '—'}</td>
              <td className="px-5 py-4 text-right">
                <a href={`/university/${college.slug}/${c.slug}`} className="inline-block rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700">
                  View Details
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {college.courses.map((c) => (
        <a
          key={`${c.id}-card`}
          href={`/university/${college.slug}/${c.slug}`}
          className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-blue-200"
        >
          {c.badge && c.badgeColor && (
            <span className={`mb-3 w-max rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${c.badgeColor}`}>{c.badge}</span>
          )}
          <h3 className="text-lg font-extrabold text-slate-900">{c.title}</h3>
          <p className="mt-1 text-xs font-semibold text-slate-500">{c.specializations ?? ''}</p>
          <div className="mt-4 flex items-center gap-3 text-sm font-bold text-slate-700">
            <span className="inline-flex items-center gap-1"><IndianRupee className="h-4 w-4 text-emerald-600" />{c.fee}</span>
            <span className="text-slate-300">|</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4 text-blue-600" />{c.duration}</span>
          </div>
          <span className="mt-5 inline-block w-full rounded-xl border-2 border-blue-600 px-4 py-2 text-center text-sm font-bold text-blue-600">
            View Course
          </span>
        </a>
      ))}
    </div>
  </section>
);

const AdmissionsSection = () => {
  const steps = [
    { n: 1, title: 'Fill the Application', desc: 'Complete the online enquiry form with your details.' },
    { n: 2, title: 'Get Counselled', desc: 'Our advisor verifies documents and guides you on programs.' },
    { n: 3, title: 'Pay & Enrol', desc: 'Pay fees directly on the official university portal.' },
    { n: 4, title: 'Start Learning', desc: 'Access LMS, live sessions and study material instantly.' },
  ];
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-extrabold text-slate-900">Admission Open 2026</h2>
        <p className="mt-1 text-sm text-slate-600">A simple 4-step admission journey designed for busy professionals.</p>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2">
          {steps.map((s) => (
            <li key={s.n} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-black text-white ${GRADIENT_BG}`}>{s.n}</div>
              <h3 className="mt-3 text-base font-extrabold text-slate-900">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { icon: Briefcase, label: 'Placement Support' },
            { icon: FileText, label: 'LMS Access' },
            { icon: BadgeCheck, label: 'Verified Degree' },
          ].map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.label} className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-3">
                <Icon className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-bold text-blue-800">{b.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      <aside className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-extrabold text-slate-900">Need Counselling?</h3>
          <p className="mt-1 text-sm text-slate-600">Our advisors help you pick the right program in 2 mins.</p>
          <button className={`mt-4 w-full rounded-xl py-3 text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg ${GRADIENT_BG}`}>Compare in 2 mins</button>
        </div>
      </aside>
    </div>
  );
};

const ReviewsSection = () => {
  const breakdown = [
    { star: 5, pct: 43 },
    { star: 4, pct: 29 },
    { star: 3, pct: 29 },
    { star: 2, pct: 0 },
    { star: 1, pct: 0 },
  ];
  const reviews = [
    { name: 'Ananya R.', initials: 'AR', color: 'from-pink-500 to-rose-500', text: 'The MBA program helped me transition into a product role. LMS is reliable and mentors are super supportive.' },
    { name: 'Karthik S.', initials: 'KS', color: 'from-blue-500 to-cyan-500', text: 'Great value for the fee. Live weekend classes fit well with my work schedule.' },
    { name: 'Priya M.', initials: 'PM', color: 'from-emerald-500 to-teal-500', text: 'NAAC A+ shows up in placements — multiple interview opportunities came through placement support.' },
  ];
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Student Reviews</h2>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-3xl font-black text-slate-900">{UNIVERSITY.rating}</span>
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-slate-600">({UNIVERSITY.ratingCount})</span>
          </div>
        </div>
        <button className="rounded-xl border-2 border-blue-600 px-5 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50">Write a Review</button>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="space-y-2">
          {breakdown.map((b) => (
            <div key={b.star} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
              <span className="w-8">{b.star}★</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full ${GRADIENT_BG}`} style={{ width: `${b.pct}%` }} />
              </div>
              <span className="w-10 text-right">{b.pct}%</span>
            </div>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-white border border-white/30" style={{ backgroundColor: r.color }}>{r.initials}</div>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">{r.name}</p>
                  <p className="text-xs text-amber-500">★★★★★</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">“{r.text}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FacultySection = ({ college }: { college: ApiCollege }) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-6">
      <h2 className="text-2xl font-extrabold text-slate-900">Meet our Faculty</h2>
      <p className="mt-1 text-sm text-slate-600">Industry leaders and academic experts dedicated to your growth.</p>
    </div>
    {college.faculty.length === 0 ? (
      <p className="text-sm text-slate-500">Faculty information coming soon.</p>
    ) : (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {college.faculty.map((f) => (
          <div key={f.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-base font-black text-white shadow border-2 border-white/20" style={{ backgroundColor: f.color }}>
                {f.initials}
              </div>
              <div>
                <p className="text-base font-extrabold text-slate-900">{f.name}</p>
                <p className="text-xs font-semibold text-slate-500">{f.experience}</p>
              </div>
            </div>
            <p className="mt-3 text-sm font-bold text-slate-800">{f.title}</p>
            {f.specialization && <p className="mt-1 text-xs text-slate-600">Specialization: {f.specialization}</p>}
          </div>
        ))}
      </div>
    )}
  </section>
);

const PlacementsSection = ({ college }: { college: ApiCollege }) => {
  const recruiters = (college.topRecruiters ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-8">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-900">Placement Report</h2>
          <p className="mt-1 text-sm text-slate-600">Strong industry outcomes powered by career support and recruiter relationships.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Placement Rate', value: college.placementPct ?? '—' },
              { label: 'Average Package', value: college.avgPackage ?? '—' },
              { label: 'Highest Package', value: college.highestPackage ?? '—' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-center">
                <p className="text-3xl font-black text-blue-700">{s.value}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-blue-700">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-extrabold text-slate-900">Top Recruiters</h2>
          <p className="mt-1 text-sm text-slate-600">Our students get placed at leading global companies.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {recruiters.map((r) => (
              <span key={r} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-bold text-slate-700">{r}</span>
            ))}
            {recruiters.length === 0 && <p className="text-sm text-slate-500">Recruiter list coming soon.</p>}
          </div>
        </section>
      </div>

      <aside className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <h3 className="text-base font-extrabold text-emerald-900">Placement Support</h3>
        <ul className="mt-3 space-y-2 text-sm text-emerald-800">
          <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4" /> Resume building</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4" /> Interview preparation</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4" /> Career counselling</li>
          <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4" /> 3000+ hiring partners</li>
        </ul>
      </aside>
    </div>
  );
};

const FAQSection = () => (
  <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-6">
      <div className="inline-flex items-center space-x-2 bg-slate-100 px-3 py-1 rounded-full mb-3 border border-slate-200">
        <span className="text-xl">📝</span>
        <span className="text-sm font-bold text-slate-700">FAQ's</span>
      </div>
      <h2 className="text-2xl font-extrabold text-slate-900">Let's clear up <span className={GRADIENT_TEXT}>some doubts</span></h2>
    </div>
    <div className="space-y-4">
      {FAQS.map((faq) => (
        <div key={faq.q} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:bg-slate-100 transition-colors">
          <h3 className="text-base font-bold text-slate-800">{faq.q}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{faq.a}</p>
        </div>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#0F172A] text-slate-300 pt-20 pb-10 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center"><StepWorldLogo height={68} variant="footer" /></div>
          <p className="text-blue-400 font-medium">Get the right guidance with us</p>
          <div className="space-y-2 pt-4">
            <p className="text-sm font-medium text-slate-400">Contact us:</p>
            <p className="font-medium hover:text-white cursor-pointer transition-colors">info@stepworld.com</p>
            <div className="inline-flex flex-col space-y-1">
              <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full w-max font-bold">Toll Free</span>
              <p className="font-bold text-lg text-white border border-slate-700 rounded-lg px-4 py-2">1800-420-0000</p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Online & Distance MBA</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Online MBA</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Distance MBA</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">1 Year MBA Online</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Executive MBA</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Online & Distance UG Courses</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Online BBA</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Online BCA</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Online B.Com</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Online BA</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">General</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500">© 2026 StepWorld, Inc. All Rights Reserved. Built with Made in India.</p>
    </div>
  </footer>
);
export const DetailPage = ({ slug = 'alliance-university-online' }: { slug?: string }) => {
  const [college, setCollege] = useState<ApiCollege>({ ...FALLBACK_COLLEGE, slug });
  const [tab, setTab] = useState<TabKey>('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applyOpen, setApplyOpen] = useState(false);

  React.useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await fetch(apiUrl(`/api/colleges/${slug}`), {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: ApiCollege = await res.json();
        setCollege(data);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError((err as Error).message);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [slug]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      <Hero college={college} onApply={() => setApplyOpen(true)} />
      <QuickFacts college={college} />
      <TabsBar active={tab} onChange={setTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm font-semibold text-slate-600 shadow-sm">
            Loading latest data from backend…
          </div>
        )}
        {error && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
            Could not reach backend ({error}). Showing static data. Start backend: <code className="font-black">cd backend && npm run dev</code>
          </div>
        )}
        {tab === 'overview' && <OverviewSection college={college} />}
        {tab === 'programs' && <CoursesSection college={college} />}
        {tab === 'faculty' && <FacultySection college={college} />}
        {tab === 'placements' && <PlacementsSection college={college} />}
        {tab === 'reviews' && <ReviewsSection />}
        <FAQSection />
      </main>
      <Footer />
      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} context={{ collegeName: college.name, courseName: 'All Programs' }} />
    </div>
  );
};

export default DetailPage;
