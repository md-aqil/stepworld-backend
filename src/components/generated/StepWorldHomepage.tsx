import React, { useEffect, useState } from 'react';
import { Link } from '../../App';
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  GraduationCap,
  Users,
  Sparkles,
} from 'lucide-react';

const GRADIENT_BG = 'bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 via-red-500 via-purple-500 to-blue-500';
const GRADIENT_TEXT = 'bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 via-red-500 via-purple-500 to-blue-500';

const GRADIENT_LOGO = 'bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 via-red-500 via-purple-500 to-blue-500';

const StepWorldLogo = ({ height, variant }: { height: number; variant: 'nav' | 'footer' }) => {
  const idPrefix = variant === 'nav' ? 'stepworld-nav' : 'stepworld-footer';
  const taglineColor = variant === 'nav' ? '#475569' : '#CBD5E1';
  return (
    <svg aria-labelledby={`${idPrefix}-title`} role="img" viewBox="0 0 330 92" className="block w-auto max-w-[220px] sm:max-w-none" style={{ height }} xmlns="http://www.w3.org/2000/svg">
      <title id={`${idPrefix}-title`}>StepWorld — Step Your Career With Us</title>
      <defs>
        <linearGradient id={`${idPrefix}-swoosh`} x1="10" y1="28" x2="252" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#16A34A" />
          <stop offset="0.24" stopColor="#FACC15" />
          <stop offset="0.45" stopColor="#F97316" />
          <stop offset="0.66" stopColor="#E11D48" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-metal`} x1="78" y1="38" x2="235" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.38" stopColor="#F8FAFC" />
          <stop offset="0.64" stopColor="#CBD5E1" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-figure`} x1="236" y1="18" x2="314" y2="84" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#22D3EE" />
          <stop offset="0.52" stopColor="#2563EB" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
        <filter id={`${idPrefix}-soft-shadow`} x="-20%" y="-30%" width="140%" height="170%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000000" floodOpacity="0.26" />
        </filter>
      </defs>
      <path d="M8 29C70 50 139 9 226 13C172 18 119 44 62 42C40 41 23 36 8 29Z" fill={`url(#${idPrefix}-swoosh)`} opacity="0.9" />
      <path d="M86 42C141 20 197 20 260 26C204 32 154 52 100 51C92 51 88 48 86 42Z" fill={`url(#${idPrefix}-swoosh)`} opacity="0.82" />
      <text x="12" y="64" fill={`url(#${idPrefix}-metal)`} filter={`url(#${idPrefix}-soft-shadow)`} fontFamily="Arial Black, Inter, sans-serif" fontSize="37" fontWeight="900" letterSpacing="-2.2">STEPWORLD</text>
      <text x="36" y="84" fill={taglineColor} fontFamily="Inter, Arial, sans-serif" fontSize="13" fontWeight="700" letterSpacing="1.2">Step Your Career With Us</text>
      <path d="M247 21C269 42 286 40 318 22C299 48 279 62 248 68C234 71 228 78 219 88C222 65 231 51 246 44C251 40 252 31 247 21Z" fill={`url(#${idPrefix}-figure)`} opacity="0.94" />
      <circle cx="282" cy="18" r="8" fill={`url(#${idPrefix}-figure)`} />
      <path d="M276 27C263 39 251 51 235 54C253 58 271 49 286 33L276 27Z" fill={`url(#${idPrefix}-figure)`} />
      <path d="M288 54C302 62 311 71 322 87C301 83 285 76 271 61L288 54Z" fill={`url(#${idPrefix}-figure)`} />
    </svg>
  );
};

/** Real-looking dummy college logo: solid-color circular badge with initials. */
const CollegeLogo = ({
  initials,
  color,
  size = 'md',
}: {
  initials: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const sz = size === 'sm' ? 'h-10 w-10 text-sm' : size === 'lg' ? 'h-16 w-16 text-xl' : 'h-12 w-12 text-base';
  return (
    <div
      className={`${sz} shrink-0 rounded-full border-2 border-white shadow-md ring-1 ring-slate-200 flex items-center justify-center font-black text-white overflow-hidden`}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center flex-shrink-0 cursor-pointer">
            <StepWorldLogo height={48} variant="nav" />
          </Link>
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
            <button className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">About Us</button>
            <Link to="/admin" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">Admin</Link>
          </div>
          <div className="hidden lg:flex items-center space-x-4">
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
        </div>
      )}
    </nav>
  );
};

type ApiCollege = {
  id: string; slug: string; name: string; shortName: string | null;
  location: string; initials: string; logoGradient: string; rating: number;
  ratingCount: string | null; nirfRank: string | null; qsRank: string | null; isFeatured: boolean;
  courses: ApiCourse[];
};

type ApiCourse = {
  id: string; slug: string; title: string; fee: string; duration: string;
  specializations: string | null; badge: string | null; badgeColor: string | null;
  description: string | null; collegeId: string;
  category?: 'pg' | 'exec' | 'ug' | 'cert' | null;
  college?: { slug: string; name: string; logoGradient: string; initials: string };
};

type Category = { id: 'pg' | 'exec' | 'ug' | 'cert'; title: string; subtitle: string; keywords: RegExp[] };

const CATEGORIES: Category[] = [
  { id: 'pg', title: 'PG Courses', subtitle: 'After Graduation', keywords: [/mba|m\.com|m\.sc|ma |master|mca/i] },
  { id: 'exec', title: 'Executive Education', subtitle: 'Working Professionals', keywords: [/executive|global/i] },
  { id: 'ug', title: 'UG Courses', subtitle: 'After 12th', keywords: [/bba|bca|b\.com|bachelor|hon/i] },
  { id: 'cert', title: 'Certifications', subtitle: 'Skill Up', keywords: [/cert/i] },
];

const categorizeCourse = (course: { title: string; category?: 'pg' | 'exec' | 'ug' | 'cert' | null }): 'pg' | 'exec' | 'ug' | 'cert' => {
  if (course.category) return course.category;
  for (const c of CATEGORIES) {
    if (c.keywords.some((rx) => rx.test(course.title))) return c.id;
  }
  return 'pg';
};

const Hero = () => (
  <section className="relative isolate w-full min-h-[580px] overflow-hidden bg-[#0F172A]" aria-labelledby="stepworld-hero-title">
    <svg className="absolute -left-24 -top-20 h-72 w-[560px] opacity-20 blur-[1px] sm:h-80 sm:w-[680px] lg:-left-12 lg:top-[-104px] lg:h-[420px] lg:w-[860px]" viewBox="0 0 860 420" fill="none" aria-hidden="true">
      <path d="M10 294C164 175 304 134 451 153C565 168 666 129 848 12" stroke="url(#hero-arc-primary)" strokeWidth="26" strokeLinecap="round" />
      <path d="M2 342C165 250 307 217 459 234C582 248 689 202 858 86" stroke="url(#hero-arc-secondary)" strokeWidth="14" strokeLinecap="round" />
      <defs>
        <linearGradient id="hero-arc-primary" x1="10" y1="342" x2="858" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#16A34A" /><stop offset="0.35" stopColor="#F97316" /><stop offset="0.67" stopColor="#E11D48" /><stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
        <linearGradient id="hero-arc-secondary" x1="2" y1="352" x2="858" y2="86" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22C55E" /><stop offset="0.5" stopColor="#FACC15" /><stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>
    <div className="relative z-10 flex min-h-[580px] w-full flex-col items-center gap-12 px-5 py-16 sm:px-8 lg:flex-row lg:gap-10 lg:py-20 lg:pl-20 lg:pr-10">
      <div className="flex w-full flex-col items-start lg:basis-[55%]">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-300/25 bg-white/[0.07] px-4 py-2 shadow-sm shadow-black/20 backdrop-blur-md">
          <span className="text-lg" aria-hidden="true">🎓</span>
          <span className="text-sm font-extrabold tracking-wide text-orange-300">India's No.1 Career Guidance Platform</span>
        </div>
        <h1 id="stepworld-hero-title" className="max-w-3xl text-[42px] font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-[52px] lg:text-[52px] xl:text-[64px]">
          <span className="block">Find Your Perfect</span>
          <span className="mt-2 block bg-gradient-to-r from-green-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">University and Course</span>
        </h1>
        <p className="mt-7 max-w-2xl text-[18px] leading-8 text-slate-300">Expert guidance from India's top mentors. Compare UGC-approved universities and step into your dream career.</p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a href="#top-courses" className={`inline-flex items-center gap-2 rounded-2xl px-7 min-h-14 text-sm font-black uppercase tracking-[0.12em] text-white shadow-lg shadow-blue-950/25 transition-transform hover:-translate-y-0.5 ${GRADIENT_LOGO}`}>
            Explore Programs
          </a>
          <a href="#top-colleges" className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md px-6 min-h-14 text-sm font-black uppercase tracking-[0.12em] text-white hover:bg-white/15 transition-colors">
            View Universities
          </a>
        </div>
      </div>
      <div className="relative w-full lg:basis-[45%]" aria-label="Student success collage">
        <figure className="relative grid gap-4">
          <div className="relative overflow-hidden rounded-xl border border-white/12 bg-white/5 shadow-2xl shadow-black/35">
            <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800" alt="Graduating students celebrating" className="h-[300px] w-full object-cover" />
            <div className="absolute left-5 top-5 rounded-2xl bg-white px-4 py-3 text-slate-900 shadow-2xl shadow-slate-950/25">
              <p className="text-sm font-black leading-none text-amber-500">★★★★★ <span className="text-slate-950">4.9</span></p>
              <p className="mt-2 max-w-[190px] text-sm font-bold leading-snug text-slate-700">Trusted by 1.25 Lakh+ Students</p>
            </div>
          </div>
        </figure>
      </div>
    </div>
  </section>
);

const CoursesSection = ({ courses, colleges }: { courses: ApiCourse[]; colleges: ApiCollege[] }) => {
  const [active, setActive] = useState<'pg' | 'exec' | 'ug' | 'cert'>('pg');
  const collegeById = React.useMemo(() => Object.fromEntries(colleges.map((c) => [c.id, c])), [colleges]);
  const filtered = courses.filter((c) => categorizeCourse(c) === active);
  return (
    <section className="w-full bg-white py-20" aria-labelledby="explore-courses-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center space-x-2 bg-slate-100 px-3 py-1 rounded-full mb-4 border border-slate-200">
            <span className="text-xl" aria-hidden="true">📚</span>
            <span className="text-sm font-bold text-slate-700">Find Your Course</span>
          </div>
          <h2 id="explore-courses-title" className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight"><span>Explore Courses</span></h2>
          <div className={`mt-4 h-1.5 w-44 rounded-full ${GRADIENT_BG}`} aria-hidden="true" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4" aria-label="Course categories">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-28">
              {CATEGORIES.map((cat) => (
                <button key={cat.id} type="button" onClick={() => setActive(cat.id)} className={`block w-full p-4 text-left cursor-pointer transition-colors border-b border-slate-100 last:border-0 ${active === cat.id ? 'bg-blue-600' : 'hover:bg-slate-50'}`}>
                  <span className={`block font-bold text-[15px] ${active === cat.id ? 'text-white' : 'text-slate-800'}`}>{cat.title}</span>
                  <span className={`block text-xs mt-1 font-medium ${active === cat.id ? 'text-blue-100' : 'text-slate-500'}`}>{cat.subtitle}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="w-full lg:w-3/4">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm font-semibold text-slate-500">
                No courses in this category yet. Add courses in the <Link to="/admin" className="font-black text-blue-600 underline">Admin panel</Link>.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((course) => {
                  const college = course.college ?? collegeById[course.collegeId];
                  if (!college) return null;
                  return (
                    <Link
                      key={course.id}
                      to={`/university/${college.slug}/${course.slug}`}
                      className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col h-full group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <CollegeLogo initials={college.initials} color={college.logoGradient} size="sm" />
                        {course.badge && course.badgeColor && (
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${course.badgeColor}`}>{course.badge}</span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-slate-500">{college.shortName ?? college.name}</p>
                      <h3 className="mt-1 text-slate-800 font-extrabold text-lg flex-grow">{course.title}</h3>
                      <div className="mt-3 text-xs text-slate-600">
                        <span className="font-bold">{course.fee}</span> · <span>{course.duration}</span>
                      </div>
                      <span className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-slate-50 py-2 text-sm font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        View Details <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const CollegesSection = ({ colleges }: { colleges: ApiCollege[] }) => (
  <section className="w-full bg-[#F0F7FF] py-20" aria-labelledby="explore-colleges-title">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="inline-flex items-center space-x-2 bg-white/80 px-3 py-1 rounded-full mb-4 border border-blue-100 shadow-sm">
            <span className="text-xl" aria-hidden="true">🏛️</span>
            <span className="text-sm font-bold text-slate-700">Find Your College</span>
          </div>
          <h2 id="explore-colleges-title" className={`text-3xl md:text-4xl font-extrabold tracking-tight ${GRADIENT_TEXT}`}>Top Universities and Colleges</h2>
        </div>
        <p className="max-w-md text-sm font-medium leading-6 text-slate-600">Compare trusted online universities by approvals, student ratings, program fit, and support quality.</p>
      </div>
      {colleges.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm font-semibold text-slate-500">
          No colleges yet. Add one in the <Link to="/admin" className="font-black text-blue-600 underline">Admin panel</Link>.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {colleges.map((college) => (
            <article key={college.id} className="flex min-h-[200px] flex-col rounded-2xl border border-blue-100 bg-white p-5 shadow-sm shadow-blue-900/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10">
              <div className="mb-4 flex items-start justify-between gap-3">
                <CollegeLogo initials={college.initials} color={college.logoGradient} size="lg" />
                <div className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-600" aria-label={`${college.rating} out of 5`}>
                  <span aria-hidden="true">★</span> <span className="ml-1 text-slate-800">{college.rating}</span>
                </div>
              </div>
              <h3 className="text-lg font-extrabold leading-snug text-slate-900 line-clamp-2">{college.name}</h3>
              <p className="mt-2 text-sm font-semibold text-slate-500">📍 {college.location}</p>
              <p className="mt-2 text-xs font-semibold text-slate-500">{college.courses.length} program{college.courses.length === 1 ? '' : 's'} available</p>
              <Link to={`/university/${college.slug}`} className="mt-auto w-full rounded-xl border-2 border-blue-600 px-4 py-2 text-center text-sm font-bold text-blue-600 transition-colors hover:bg-blue-50">
                View Details
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  </section>
);

const StatsSection = () => (
  <div className="w-full relative overflow-hidden bg-slate-50 py-16 border-y border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-200/50">
        <div className="text-center px-4"><h3 className={`text-4xl font-extrabold mb-2 ${GRADIENT_TEXT}`}>1,25,000+</h3><p className="text-slate-600 font-semibold">Learners Guided</p></div>
        <div className="text-center px-4"><h3 className={`text-4xl font-extrabold mb-2 ${GRADIENT_TEXT}`}>100+</h3><p className="text-slate-600 font-semibold">Universities Listed</p></div>
        <div className="text-center px-4"><h3 className={`text-4xl font-extrabold mb-2 ${GRADIENT_TEXT}`}>1000+</h3><p className="text-slate-600 font-semibold">Courses Available</p></div>
        <div className="text-center px-4"><h3 className={`text-4xl font-extrabold mb-2 ${GRADIENT_TEXT}`}>30+</h3><p className="text-slate-600 font-semibold">Comparison Factors</p></div>
      </div>
    </div>
  </div>
);

const FAQSection = () => {
  const faqs = [
    { q: 'What is StepWorld?', a: "StepWorld is an unbiased online university guidance platform with honest guides, smart tools, and experienced Career Development Advisors." },
    { q: 'How is StepWorld different?', a: 'We only list UGC-approved online universities and explain approvals and courses in plain, simple language.' },
    { q: 'How is StepWorld independent?', a: 'We compare universities on real fees, real reviews, and real outcomes — never on what costs more.' },
    { q: 'Why trust StepWorld?', a: 'Over 1.25 lakh learners, UGC-verified universities only, compare on 30+ factors.' },
    { q: 'Does StepWorld charge?', a: 'No. For learners, every service is 100% free.' },
    { q: 'Do payments go directly to the university?', a: 'Yes. All fees go to the university on its official website, per Government/UGC norms.' },
  ];
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-12">
        <div className="inline-flex items-center space-x-2 bg-slate-100 px-3 py-1 rounded-full mb-3 border border-slate-200">
          <span className="text-xl">📝</span>
          <span className="text-sm font-bold text-slate-700">FAQ's</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Let's clear up <span className={GRADIENT_TEXT}>some doubts</span></h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.q} className="bg-slate-50 rounded-2xl border border-slate-200 p-6 hover:bg-slate-100 transition-colors cursor-pointer group">
            <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{faq.q}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors flex items-center">VIEW MORE <ArrowRight className="ml-2 w-4 h-4" /></button>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-[#0F172A] text-slate-300 pt-20 pb-10 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center"><StepWorldLogo height={56} variant="footer" /></div>
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
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Online MBA</Link></li>
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Distance MBA</Link></li>
            <li><Link to="/" className="hover:text-blue-400 transition-colors">1 Year MBA Online</Link></li>
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Executive MBA</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Online UG Courses</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Online BBA</Link></li>
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Online BCA</Link></li>
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Online B.Com</Link></li>
            <li><Link to="/" className="hover:text-blue-400 transition-colors">Online BA</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">General</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/admin" className="hover:text-white transition-colors">Admin</Link></li>
          </ul>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500">© 2026 StepWorld, Inc. All Rights Reserved. Made in India.</p>
    </div>
  </footer>
);

export const StepWorldHomepage = () => {
  const [colleges, setColleges] = useState<ApiCollege[]>([]);
  const [courses, setCourses] = useState<ApiCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const [c, co] = await Promise.all([
          fetch('/api/colleges').then((r) => r.json()),
          fetch('/api/courses').then((r) => r.json()),
        ]);
        if (!cancelled) {
          setColleges(c);
          setCourses(co);
        }
      } catch (e) {
        if (!cancelled) setError((e as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      <Hero />
      {error && (
        <div className="mx-auto max-w-7xl px-4 pt-6">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
            Could not reach backend ({error}). Make sure the backend is running on http://localhost:4000.
          </div>
        </div>
      )}
      {loading ? (
        <div className="py-20 text-center text-sm font-semibold text-slate-500">Loading courses and colleges…</div>
      ) : (
        <>
          <CoursesSection courses={courses} colleges={colleges} />
          <CollegesSection colleges={colleges} />
        </>
      )}
      <StatsSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default StepWorldHomepage;