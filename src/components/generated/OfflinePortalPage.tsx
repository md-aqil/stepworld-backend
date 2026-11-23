import React, { useState, useMemo } from 'react';
import { Link } from '../../lib/router';
import { FALLBACK_COLLEGES, FALLBACK_COURSES, ApiCollege, ApiCourse } from '../../data/fallbackData';
import {
  Search,
  Building2,
  CheckCircle2,
  MapPin,
  Award,
  Sparkles,
  MessageCircle,
  ExternalLink,
  Laptop,
  GraduationCap,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Instagram,
  Facebook,
  BookOpen,
  Briefcase,
  Wrench,
  TrendingUp,
  Calculator,
  FlaskConical,
  Scale,
  Stethoscope,
  Palette,
  Coffee,
  Sprout,
  Film,
  Layers,
  HelpCircle,
} from 'lucide-react';

const GRADIENT_TEXT = 'bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent';

const StepWorldLogo = ({ height = 56 }: { height?: number }) => (
  <div className="flex items-center shrink-0">
    <img
      src="/stepworld-logo.jpg"
      alt="StepWorld"
      style={{ height }}
      className="w-auto object-contain rounded-xl shadow-xs"
    />
  </div>
);

export const OFFLINE_STREAMS = [
  { id: 'all', name: 'All 13 Disciplines' },
  { id: 'engineering', name: 'Engineering & Technology (B.Tech / B.E. / M.Tech / M.E.)' },
  { id: 'computer-it', name: 'Computer & IT (BCA / B.Sc. CS / MCA / M.Sc. IT)' },
  { id: 'management', name: 'Management & Business (BBA / BBM / BMS / MBA / PGDM / MMS)' },
  { id: 'commerce', name: 'Commerce & Finance (B.Com / B.Com Hons / M.Com)' },
  { id: 'science', name: 'Science (B.Sc. / B.Sc. Hons / M.Sc. / M.Sc. Hons)' },
  { id: 'arts', name: 'Arts & Humanities (B.A. / B.A. Hons / M.A. / M.A. Hons)' },
  { id: 'law', name: 'Law (LL.B / BA-LL.B / BBA-LL.B / B.Com-LL.B / LL.M)' },
  { id: 'medical', name: 'Medical & Healthcare (MBBS / BDS / BAMS / BHMS / BUMS / BSMS / Nursing / BPT / B.Pharm / MLT / MD / MS)' },
  { id: 'design', name: 'Design & Architecture (B.Des / B.Arch / BFA / M.Des / M.Arch / MFA)' },
  { id: 'hotel', name: 'Hotel Management & Hospitality (BHM / B.Sc. Hospitality / MHM / M.Sc. Hospitality)' },
  { id: 'agriculture', name: 'Agriculture (B.Sc. Agriculture / B.Tech Agri Eng / M.Sc. Agri / M.Tech Agri)' },
  { id: 'education', name: 'Education (B.Ed / B.El.Ed / D.El.Ed / M.Ed)' },
  { id: 'media', name: 'Mass Communication & Journalism (BJMC / B.A. Journalism / MJMC / M.A. Journalism)' },
];

export const STEPWORLD_OFFLINE_GUIDE_CATEGORIES = [
  {
    id: 'engineering',
    name: 'Engineering & Technology',
    icon: Wrench,
    accentColor: 'text-amber-700',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    ugCourses: ['B.Tech', 'B.E.'],
    pgCourses: ['M.Tech', 'M.E.'],
    description: 'Technical, computing, automation, mechanical, electrical, and civil core engineering programs.',
  },
  {
    id: 'computer-it',
    name: 'Computer & IT',
    icon: Laptop,
    accentColor: 'text-indigo-700',
    bgLight: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    ugCourses: ['BCA', 'B.Sc. Computer Science', 'B.Sc. IT'],
    pgCourses: ['MCA', 'M.Sc. Computer Science', 'M.Sc. IT'],
    description: 'Software development, programming, algorithms, cybersecurity, cloud architecture, and data systems.',
  },
  {
    id: 'management',
    name: 'Management & Business',
    icon: TrendingUp,
    accentColor: 'text-emerald-700',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    ugCourses: ['BBA', 'BBM', 'BMS'],
    pgCourses: ['MBA', 'PGDM', 'MMS'],
    description: 'Corporate management, business leadership, operations, marketing, human resources, and entrepreneurship.',
  },
  {
    id: 'commerce',
    name: 'Commerce & Finance',
    icon: Calculator,
    accentColor: 'text-teal-700',
    bgLight: 'bg-teal-50',
    borderColor: 'border-teal-200',
    ugCourses: ['B.Com', 'B.Com (Hons.)'],
    pgCourses: ['M.Com', 'Finance-related PG programmes'],
    description: 'Corporate accounting, auditing, taxation, banking, financial analytics, and wealth advisory.',
  },
  {
    id: 'science',
    name: 'Science',
    icon: FlaskConical,
    accentColor: 'text-sky-700',
    bgLight: 'bg-sky-50',
    borderColor: 'border-sky-200',
    ugCourses: ['B.Sc.', 'B.Sc. (Hons.)'],
    pgCourses: ['M.Sc.', 'M.Sc. (Hons.)'],
    description: 'Fundamental and applied sciences: physics, chemistry, mathematics, biological sciences, and research laboratory sciences.',
  },
  {
    id: 'arts',
    name: 'Arts & Humanities',
    icon: BookOpen,
    accentColor: 'text-cyan-700',
    bgLight: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    ugCourses: ['B.A.', 'B.A. (Hons.)'],
    pgCourses: ['M.A.', 'M.A. (Hons.)'],
    description: 'Liberal arts, psychology, literature, history, political science, sociology, and public policy.',
  },
  {
    id: 'law',
    name: 'Law',
    icon: Scale,
    accentColor: 'text-amber-800',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    ugCourses: ['LL.B', 'BA-LL.B', 'BBA-LL.B', 'B.Com-LL.B'],
    pgCourses: ['LL.M'],
    description: 'Bar Council of India approved legal education: civil, criminal, corporate, intellectual property, and constitutional law.',
  },
  {
    id: 'medical',
    name: 'Medical & Healthcare',
    icon: Stethoscope,
    accentColor: 'text-rose-700',
    bgLight: 'bg-rose-50',
    borderColor: 'border-rose-200',
    ugCourses: [
      'MBBS',
      'BDS',
      'BAMS',
      'BHMS',
      'BUMS',
      'BSMS',
      'B.Sc Nursing',
      'BPT',
      'B.Pharm',
      'BOT',
      'B.Sc Medical Laboratory Technology (MLT)',
      'B.Sc Radiology / Medical Imaging',
      'B.Sc Operation Theatre Technology',
      'B.Sc Optometry',
      'B.Sc Anesthesia Technology',
      'B.Sc Cardiac Care Technology',
    ],
    pgCourses: [
      'MD',
      'MS',
      'MDS',
      'MD/MS Ayurveda',
      'MD/MS Homeopathy',
      'M.Pharm',
      'M.Sc Nursing',
      'MPT',
      'M.Sc Medical Laboratory Technology',
      'M.Sc Radiology / Medical Imaging',
      'M.Sc Clinical Psychology',
      'MPH',
      'MBA/MHA in Hospital & Healthcare Management',
    ],
    description: 'NMC & allied health sciences: clinical medicine, dental, AYUSH, nursing, pharmacy, and super-specialty hospital management.',
  },
  {
    id: 'design',
    name: 'Design & Architecture',
    icon: Palette,
    accentColor: 'text-fuchsia-700',
    bgLight: 'bg-fuchsia-50',
    borderColor: 'border-fuchsia-200',
    ugCourses: ['B.Des', 'B.Arch', 'BFA'],
    pgCourses: ['M.Des', 'M.Arch', 'MFA'],
    description: 'COA-approved architecture, industrial design, interior, fashion, fine arts, and digital visual communications.',
  },
  {
    id: 'hotel',
    name: 'Hotel Management & Hospitality',
    icon: Coffee,
    accentColor: 'text-orange-700',
    bgLight: 'bg-orange-50',
    borderColor: 'border-orange-200',
    ugCourses: ['BHM', 'B.Sc. Hospitality / Hotel Management'],
    pgCourses: ['MHM', 'M.Sc. Hospitality / Hotel Management'],
    description: 'International hospitality operations, luxury hotel administration, culinary arts, and event tourism management.',
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    icon: Sprout,
    accentColor: 'text-green-700',
    bgLight: 'bg-green-50',
    borderColor: 'border-green-200',
    ugCourses: ['B.Sc. Agriculture', 'B.Tech Agricultural Engineering'],
    pgCourses: ['M.Sc. Agriculture', 'M.Tech Agricultural Engineering'],
    description: 'ICAR-aligned agronomy, soil science, farm machinery, agricultural biotechnology, and agribusiness economics.',
  },
  {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    accentColor: 'text-blue-800',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    ugCourses: ['B.Ed', 'B.El.Ed', 'D.El.Ed'],
    pgCourses: ['M.Ed'],
    description: 'NCTE-recognized teacher training, elementary education pedagogy, institutional curriculum, and educational leadership.',
  },
  {
    id: 'media',
    name: 'Mass Communication & Journalism',
    icon: Film,
    accentColor: 'text-purple-700',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-200',
    ugCourses: ['BJMC', 'B.A. Journalism & Mass Communication'],
    pgCourses: ['MJMC', 'M.A. Journalism & Mass Communication'],
    description: 'Broadcast television, print reporting, digital investigative journalism, public relations, and advertising media.',
  },
];

export const OfflinePortalPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [streamFilter, setStreamFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState<'all' | 'ug' | 'pg'>('all');
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Filter only regular offline campus colleges & courses
  const campusColleges = useMemo(() => {
    return FALLBACK_COLLEGES.filter((c) => c.mode === 'offline' || c.mode === 'both');
  }, []);

  const campusCourses = useMemo(() => {
    return FALLBACK_COURSES.filter((crs) => {
      if (crs.mode !== 'offline') return false;
      if (levelFilter !== 'all' && crs.category !== levelFilter) return false;
      if (streamFilter !== 'all') {
        const str = (crs.stream ?? '').toLowerCase();
        const title = crs.title.toLowerCase();
        if (streamFilter === 'engineering') {
          if (!str.includes('engineer') && !title.includes('b.tech') && !title.includes('b.e.') && !title.includes('m.tech') && !title.includes('m.e.')) return false;
        } else if (streamFilter === 'computer-it') {
          if (!str.includes('computer') && !str.includes('it') && !title.includes('bca') && !title.includes('mca') && !title.includes('computer science')) return false;
        } else if (streamFilter === 'management') {
          if (!str.includes('manage') && !str.includes('business') && !title.includes('bba') && !title.includes('bbm') && !title.includes('bms') && !title.includes('mba') && !title.includes('pgdm') && !title.includes('mms')) return false;
        } else if (streamFilter === 'commerce') {
          if (!str.includes('commerce') && !str.includes('finance') && !title.includes('b.com') && !title.includes('m.com')) return false;
        } else if (streamFilter === 'science') {
          if (!str.includes('science') && !title.includes('b.sc') && !title.includes('m.sc')) return false;
        } else if (streamFilter === 'arts') {
          if (!str.includes('arts') && !str.includes('humanities') && !title.includes('b.a.') && !title.includes('m.a.')) return false;
        } else if (streamFilter === 'law') {
          if (!str.includes('law') && !str.includes('legal') && !title.includes('ll.b') && !title.includes('ll.m')) return false;
        } else if (streamFilter === 'medical') {
          if (!str.includes('medic') && !str.includes('health') && !title.includes('mbbs') && !title.includes('bds') && !title.includes('bams') && !title.includes('bhms') && !title.includes('bums') && !title.includes('bsms') && !title.includes('nurs') && !title.includes('pharm') && !title.includes('bpt') && !title.includes('bot') && !title.includes('mlt') && !title.includes('radiology') && !title.includes('theatre') && !title.includes('optometry') && !title.includes('anesthesia') && !title.includes('cardiac') && !title.includes('md') && !title.includes('ms ') && !title.includes('mds') && !title.includes('mpt') && !title.includes('mph') && !title.includes('mha')) return false;
        } else if (streamFilter === 'design') {
          if (!str.includes('design') && !str.includes('arch') && !title.includes('b.des') && !title.includes('b.arch') && !title.includes('bfa') && !title.includes('m.des') && !title.includes('m.arch') && !title.includes('mfa')) return false;
        } else if (streamFilter === 'hotel') {
          if (!str.includes('hotel') && !str.includes('hospitality') && !title.includes('bhm') && !title.includes('mhm')) return false;
        } else if (streamFilter === 'agriculture') {
          if (!str.includes('agri') && !title.includes('agriculture')) return false;
        } else if (streamFilter === 'education') {
          if (!str.includes('education') && !title.includes('b.ed') && !title.includes('b.el.ed') && !title.includes('d.el.ed') && !title.includes('m.ed')) return false;
        } else if (streamFilter === 'media') {
          if (!str.includes('journalism') && !str.includes('mass') && !title.includes('bjmc') && !title.includes('mjmc')) return false;
        }
      }
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchTitle = crs.title.toLowerCase().includes(q);
        const matchCollege = (crs.college?.name ?? '').toLowerCase().includes(q);
        const matchSpec = (crs.specializations ?? '').toLowerCase().includes(q);
        const matchStream = (crs.stream ?? '').toLowerCase().includes(q);
        if (!matchTitle && !matchCollege && !matchSpec && !matchStream) return false;
      }
      return true;
    });
  }, [search, streamFilter, levelFilter]);

  const handleApplyWhatsApp = (courseTitle: string, collegeName: string) => {
    const text = encodeURIComponent(
      `Hi StepWorld! I want to get Free Admission Counselling & Apply for ${courseTitle} at ${collegeName} (Regular Campus). Please guide me with seat cutoffs and direct university fees.`
    );
    window.open(`https://wa.me/919910245535?text=${text}`, '_blank');
  };

  const handleGuideCategoryWhatsApp = (categoryName: string, sampleCourses: string) => {
    const text = encodeURIComponent(
      `Hi StepWorld! I am looking for admission counselling for ${categoryName} (${sampleCourses}). Please help me choose the best regular on-campus college and guide me with admission cutoffs & fees.`
    );
    window.open(`https://wa.me/919910245535?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Top Advisory Banner */}
      <div className="bg-slate-950 text-slate-300 py-2.5 px-4 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-white">Regular On-Campus Admissions 2026–27 Open</span>
            <span className="hidden sm:inline text-slate-400">• Physical Classes, Labs & Placements</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/919910245535?text=Hi%20StepWorld,%20I%20am%20looking%20for%20regular%20college%20campus%20admission%20guidance"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Us</span>
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <a
              href="https://maps.app.goo.gl/ZQknF8MaBnbiPCnw5"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-bold"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Office Map</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">
            <Link to="/" className="flex items-center shrink-0 cursor-pointer py-1">
              <StepWorldLogo height={72} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-5 text-xs xl:text-sm font-bold text-slate-700">
              <Link to="/" className="hover:text-emerald-600 transition-colors">
                Home
              </Link>
              <a href="#ug-pg-categories" className="hover:text-emerald-600 transition-colors">
                Course Categories Guide
              </a>
              <a href="#all-campus-courses" className="hover:text-emerald-600 transition-colors">
                All Campus Courses
              </a>
              <Link
                to="/online-degrees"
                className="text-blue-700 hover:text-blue-800 transition-colors flex items-center gap-1.5"
              >
                <Laptop className="w-4 h-4 text-blue-600" />
                <span>Online Degrees</span>
              </Link>
              <Link
                to="/blog/mba-pgdm-admission-2027-entrance-exams-direct-admission"
                className="flex items-center gap-1.5 text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 hover:bg-amber-100 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>MBA 2027 Guide</span>
              </Link>
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href="https://wa.me/919910245535?text=Hi%20StepWorld,%20I%20am%20looking%20for%20regular%20college%20campus%20admission%20guidance"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-xs font-black uppercase tracking-wider shadow-sm transition-all"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="text-slate-700 p-2 rounded-lg hover:bg-slate-100"
                aria-label="Toggle navigation"
              >
                {isNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isNavOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl">
            <Link
              to="/"
              onClick={() => setIsNavOpen(false)}
              className="block px-3 py-2 text-sm font-bold text-slate-800"
            >
              🏠 Home
            </Link>
            <a
              href="#ug-pg-categories"
              onClick={() => setIsNavOpen(false)}
              className="block px-3 py-2 text-sm font-bold text-slate-800"
            >
              📚 Course Categories Guide (UG & PG)
            </a>
            <a
              href="#all-campus-courses"
              onClick={() => setIsNavOpen(false)}
              className="block px-3 py-2 text-sm font-bold text-slate-800"
            >
              🎓 All Campus Courses ({campusCourses.length})
            </a>
            <Link
              to="/online-degrees"
              onClick={() => setIsNavOpen(false)}
              className="block px-3 py-2 text-sm font-bold text-blue-700"
            >
              💻 Online Degrees
            </Link>
            <Link
              to="/blog/mba-pgdm-admission-2027-entrance-exams-direct-admission"
              onClick={() => setIsNavOpen(false)}
              className="block px-3 py-2 text-sm font-bold text-amber-800"
            >
              🔥 MBA & PGDM Admission Guide 2027
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Banner */}
      <header className="bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 pt-12 pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 mb-4">
            <Building2 className="w-4 h-4 text-emerald-700" />
            <span>Regular On-Campus Admissions Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Regular On-Campus Degrees & <span className={GRADIENT_TEXT}>Premier Universities</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Direct admission guidance and seat allocation for full-time on-campus degree programs.
            Experience vibrant campus culture, practical laboratories, student hostels, and top corporate recruitment drives.
          </p>

          {/* Quick Filter Box */}
          <div className="mt-8 max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-5 sm:p-6 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* Search */}
              <div className="sm:col-span-5">
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
                  Search Course / University
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="e.g. BBA Honours, B.Tech, Christ University"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-9 pr-3 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Discipline */}
              <div className="sm:col-span-4">
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
                  Academic Discipline
                </label>
                <div className="relative">
                  <select
                    value={streamFilter}
                    onChange={(e) => setStreamFilter(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 py-3 pl-3 pr-8 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
                  >
                    {OFFLINE_STREAMS.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Level */}
              <div className="sm:col-span-3">
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
                  Degree Level
                </label>
                <div className="relative">
                  <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value as any)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 py-3 pl-3 pr-8 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white cursor-pointer"
                  >
                    <option value="all">All (UG + PG)</option>
                    <option value="ug">Undergrad (UG)</option>
                    <option value="pg">Postgrad (PG)</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="font-bold text-slate-600">
                Found <strong className="text-emerald-700">{campusCourses.length}</strong> Regular Campus Programs
              </span>
              <a
                href="https://wa.me/919910245535?text=Hi%20StepWorld,%20I%20need%20help%20choosing%20the%20right%20regular%20college%20campus"
                target="_blank"
                rel="noreferrer"
                className="font-black text-emerald-700 hover:underline flex items-center gap-1"
              >
                Need help shortlisting? Ask on WhatsApp &rarr;
              </a>
            </div>
          </div>

          {/* Campus Features Ribbon */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left text-xs font-bold text-slate-700">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center gap-2.5 shadow-xs">
              <Building2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Full-Time Campus Attendance & Hostel</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center gap-2.5 shadow-xs">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>State-of-the-Art Labs & Workshops</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center gap-2.5 shadow-xs">
              <Award className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>NIRF & NAAC A++ Rated Universities</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center gap-2.5 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Direct Fees to Official College Portals</span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Campus Universities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full">
            Autonomous & Deemed Campuses
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2">
            Top Regular Campus Partner Universities
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Verified campus locations with bustling college life, laboratories, and top corporate hiring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campusColleges.map((col) => (
            <div
              key={col.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:border-emerald-500 hover:shadow-xl transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-black text-white shadow-md"
                    style={{ backgroundColor: col.logoGradient }}
                  >
                    {col.initials}
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                      🏫 Regular Campus
                    </span>
                    <p className="text-xs font-bold text-amber-600 mt-1">★ {col.rating} ({col.ratingCount})</p>
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  <Link to={`/university/${col.slug}`} className="hover:text-emerald-700 transition-colors">
                    {col.name}
                  </Link>
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{col.location}</span>
                </p>

                <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                  {col.about}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Avg Package</span>
                    <span className="font-extrabold text-slate-900">{col.avgPackage ?? '₹8.5 LPA'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Highest Package</span>
                    <span className="font-extrabold text-emerald-700">{col.highestPackage ?? '₹24.0 LPA'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  to={`/university/${col.slug}`}
                  className="flex-1 text-center py-2.5 rounded-xl border border-slate-300 text-slate-800 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  View Campus Details
                </Link>
                <button
                  onClick={() => handleApplyWhatsApp('Admission Enquiry', col.shortName ?? col.name)}
                  className="flex-1 text-center py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Apply on WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STEPWORLD EDUCATION UG & PG COURSE CATEGORIES – COMPREHENSIVE GUIDE */}
      <section id="ug-pg-categories" className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full mb-3 shadow-xs">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <span>Official Student Counselling Reference</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              StepWorld Education UG & PG Course Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              This guide provides major undergraduate (UG) and postgraduate (PG) course categories for student counselling and college/course selection across India.
            </p>
          </div>

          {/* 13 CATEGORIES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPWORLD_OFFLINE_GUIDE_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className={`bg-white rounded-3xl border ${cat.borderColor} p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${cat.bgLight} ${cat.accentColor} shrink-0 group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        UG & PG Degrees
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* UG Courses List */}
                    <div className="mb-4 bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-black uppercase tracking-wide text-slate-700 flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                          <span>UG Courses ({cat.ugCourses.length})</span>
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          Undergraduate
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.ugCourses.map((crs) => (
                          <span
                            key={crs}
                            className="text-[11px] font-bold bg-white text-slate-800 border border-slate-200 px-2 py-0.5 rounded-lg shadow-2xs"
                          >
                            • {crs}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* PG Courses List */}
                    <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-black uppercase tracking-wide text-slate-700 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-blue-600" />
                          <span>PG Courses ({cat.pgCourses.length})</span>
                        </span>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                          Postgraduate
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.pgCourses.map((crs) => (
                          <span
                            key={crs}
                            className="text-[11px] font-bold bg-white text-slate-800 border border-slate-200 px-2 py-0.5 rounded-lg shadow-2xs"
                          >
                            • {crs}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setStreamFilter(cat.id);
                        const el = document.getElementById('all-campus-courses');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="text-xs font-black text-slate-700 hover:text-emerald-700 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Filter Catalog</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleGuideCategoryWhatsApp(cat.name, cat.ugCourses.concat(cat.pgCourses).slice(0, 4).join(', '))}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>WhatsApp Enquire</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* OFFICIAL REGULATORY DISCLAIMER NOTE */}
          <div className="mt-10 bg-amber-50/80 border border-amber-200/90 rounded-2xl p-5 text-xs text-amber-900 leading-relaxed shadow-xs flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-950 mb-0.5">
                Note on Course Names & Availability:
              </p>
              <p className="text-amber-800">
                Course names and availability can vary by university, college, regulatory body and state. Students should verify current eligibility, entrance requirements and recognition before admission. Contact StepWorld Education for direct college-specific verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Courses Directory */}
      <section id="all-campus-courses" className="bg-white py-16 border-t border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Regular Degree Programs
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                All Available Regular Campus Courses ({campusCourses.length})
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Compare fees, duration, and seat availability for on-campus degrees.
              </p>
            </div>
          </div>

          {campusCourses.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center text-slate-600">
              <p className="text-sm font-bold">No regular courses matched your filter criteria.</p>
              <button
                type="button"
                onClick={() => { setSearch(''); setStreamFilter('all'); setLevelFilter('all'); }}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 underline cursor-pointer"
              >
                Reset filters & show all programs
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {campusCourses.map((crs) => (
                <div
                  key={crs.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 flex flex-col justify-between hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {crs.stream}
                      </span>
                      <span className="text-xs font-black text-slate-900">{crs.fee}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900">
                      <Link
                        to={crs.college ? `/university/${crs.college.slug}/${crs.slug}` : `/university/christ-university-bengaluru/${crs.slug}`}
                        className="hover:text-emerald-700 transition-colors"
                      >
                        {crs.title}
                      </Link>
                    </h3>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">
                      {crs.college?.name ?? 'Christ University Bengaluru'} • {crs.duration}
                    </p>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                      {crs.description ?? 'Full-time campus curriculum with laboratory experiments and direct placement drives.'}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                    <Link
                      to={crs.college ? `/university/${crs.college.slug}/${crs.slug}` : `/university/christ-university-bengaluru/${crs.slug}`}
                      className="text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors"
                    >
                      View Details &rarr;
                    </Link>
                    <button
                      onClick={() => handleApplyWhatsApp(crs.title, crs.college?.name ?? 'Christ University')}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Apply Now</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Need Help CTA Banner */}
      <section className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-950 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="bg-emerald-400 text-slate-950 font-black px-3 py-1 rounded-full text-xs uppercase tracking-wider">
            Direct Campus Admission Support
          </span>
          <h2 className="text-2xl sm:text-4xl font-black">
            Confused Between Colleges or Cutoffs?
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mx-auto">
            Our senior education consultants assist with direct quota, management seats, entrance exam cutoffs, and transparent university payment assistance.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/919910245535?text=Hi%20StepWorld,%20I%20need%20expert%20counselling%20for%20regular%20college%20campus%20admission"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3.5 text-sm font-black uppercase tracking-wider shadow-xl transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Chat Directly on WhatsApp</span>
            </a>
            <Link
              to="/online-degrees"
              className="inline-flex items-center gap-1.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white px-5 py-3.5 text-xs font-bold border border-white/20 transition-all"
            >
              <Laptop className="w-4 h-4 text-cyan-300" />
              <span>Looking for Online Degrees instead? Click Here</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="space-y-3">
              <StepWorldLogo height={60} />
              <p className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                Established 2015 · Regular Campus Admissions
              </p>
              <p className="text-slate-400 leading-relaxed">
                StepWorld helps students navigate physical on-campus admissions across premier autonomous universities in India.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Popular Campus Streams</h4>
              <ul className="space-y-2 text-slate-400">
                <li>B.Tech & M.Tech Engineering</li>
                <li>Regular BBA & Full-Time MBA</li>
                <li>MBBS, BDS & Pharmacy</li>
                <li>BA-LL.B Integrated Law</li>
                <li>B.Des & Architecture</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white">Home Portal</Link></li>
                <li><Link to="/offline-courses" className="text-emerald-400 font-bold">Regular Campus Portal</Link></li>
                <li><Link to="/online-degrees" className="hover:text-white">Online Degrees Portal</Link></li>
                <li><Link to="/blog/mba-pgdm-admission-2027-entrance-exams-direct-admission" className="hover:text-white">MBA 2027 Guide</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Connect With Us</h4>
              <div className="flex items-center gap-3 mb-4">
                <a
                  href="https://wa.me/919910245535"
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 w-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                </a>
                <a
                  href="https://www.instagram.com/stepworldeducation?obrf=NzRxMzdsbGF3Mmwz"
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 w-9 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61581972416599"
                  target="_blank"
                  rel="noreferrer"
                  className="h-9 w-9 rounded-xl bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
              <p className="text-slate-400">Office: G-8, Ground Floor, Sector 3, Noida, UP</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500">
            <p>© 2015–{new Date().getFullYear()} StepWorld Education Consultancy. All Rights Reserved.</p>
            <p>Direct university tuition fees should be paid directly to the respective institution.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OfflinePortalPage;
