import React, { useState, useMemo } from 'react';
import { Link } from '../../lib/router';
import { FALLBACK_COLLEGES, FALLBACK_COURSES, ApiCollege, ApiCourse } from '../../data/fallbackData';
import {
  Search,
  Laptop,
  CheckCircle2,
  MapPin,
  Award,
  Sparkles,
  MessageCircle,
  Building2,
  GraduationCap,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Instagram,
  Facebook,
  Clock,
  Briefcase,
  BookOpen,
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
  AlertCircle,
  Info,
} from 'lucide-react';

const GRADIENT_TEXT = 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent';

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

export const ONLINE_STREAMS = [
  { id: 'all', name: 'All 13 Online Disciplines' },
  { id: 'management', name: 'Management & Business (Online MBA / PGDM / BBA / BBM)' },
  { id: 'computer-it', name: 'Computer & IT (Online BCA / MCA / B.Sc. CS / M.Sc. IT)' },
  { id: 'commerce', name: 'Commerce & Finance (Online B.Com / B.Com Hons / M.Com)' },
  { id: 'arts', name: 'Arts & Humanities (Online BA / BA Hons / MA / MA Hons)' },
  { id: 'science', name: 'Science (Online B.Sc. / B.Sc. Hons / M.Sc. Specialisations)' },
  { id: 'journalism', name: 'Journalism & Mass Comm (Online BJMC / BA / MJMC / MA)' },
  { id: 'education', name: 'Education (Online B.Ed. / M.Ed. / Education Programmes)' },
  { id: 'healthcare', name: 'Healthcare & Allied (Online MPH / Hospital Management)' },
  { id: 'law', name: 'Law (Online LL.M. / Legal Certificate Programmes)' },
  { id: 'design', name: 'Design & Creative (Online Visual Comm / UI/UX / Creative PG)' },
  { id: 'hospitality', name: 'Hospitality & Tourism (Online Tourism & Hospitality / MHM)' },
  { id: 'agriculture', name: 'Agriculture & Related (Online Agri Programmes)' },
  { id: 'professional', name: 'Professional & Specialised (AI/ML / Data Science / Cyber Security)' },
];

export const STEPWORLD_ONLINE_GUIDE_CATEGORIES = [
  {
    id: 'management',
    name: 'Management & Business',
    icon: TrendingUp,
    accentColor: 'text-blue-700',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    ugCourses: ['Online BBA', 'Online BBM / BMS'],
    pgCourses: ['Online MBA', 'Online PGDM / equivalent programmes'],
    description: 'Corporate leadership, marketing strategy, finance, human resources, and entrepreneurship in flexible online mode.',
  },
  {
    id: 'computer-it',
    name: 'Computer & IT',
    icon: Laptop,
    accentColor: 'text-indigo-700',
    bgLight: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    ugCourses: ['Online BCA', 'Online B.Sc. Computer Science / IT'],
    pgCourses: ['Online MCA', 'Online M.Sc. Computer Science / IT'],
    description: 'Software development, full stack engineering, cloud architecture, cybersecurity, and applied computing.',
  },
  {
    id: 'commerce',
    name: 'Commerce & Finance',
    icon: Calculator,
    accentColor: 'text-teal-700',
    bgLight: 'bg-teal-50',
    borderColor: 'border-teal-200',
    ugCourses: ['Online B.Com', 'Online B.Com (Hons.)'],
    pgCourses: ['Online M.Com', 'Online Finance & Accounting programmes'],
    description: 'Corporate financial accounting, forensic auditing, taxation laws, banking operations, and investment strategies.',
  },
  {
    id: 'arts',
    name: 'Arts & Humanities',
    icon: BookOpen,
    accentColor: 'text-purple-700',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-200',
    ugCourses: ['Online BA', 'Online BA (Hons.)'],
    pgCourses: ['Online MA', 'Online MA (Hons.)'],
    description: 'Liberal arts, English literature, economics, public policy, psychology, and international relations.',
  },
  {
    id: 'science',
    name: 'Science',
    icon: FlaskConical,
    accentColor: 'text-cyan-700',
    bgLight: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    ugCourses: ['Online B.Sc.', 'Online B.Sc. (Hons.) where offered'],
    pgCourses: ['Online M.Sc.', 'Online M.Sc. specialisations'],
    description: 'Applied mathematics, data analytics, statistics, information science, and industry-oriented specialisations.',
  },
  {
    id: 'journalism',
    name: 'Journalism & Mass Communication',
    icon: Film,
    accentColor: 'text-rose-700',
    bgLight: 'bg-rose-50',
    borderColor: 'border-rose-200',
    ugCourses: ['Online BJMC', 'Online BA Journalism & Mass Communication'],
    pgCourses: ['Online MJMC', 'Online MA Journalism & Mass Communication'],
    description: 'Digital journalism, broadcast media, advertising, public relations, podcasting, and corporate communication.',
  },
  {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    accentColor: 'text-amber-700',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    ugCourses: ['Online B.Ed. where permitted/approved', 'Online education-related UG programmes'],
    pgCourses: ['Online M.Ed. where permitted/approved', 'Education & learning-related PG programmes'],
    description: 'Pedagogy, curriculum development, instructional design, educational leadership, and modern EdTech platforms.',
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Allied Fields',
    icon: Stethoscope,
    accentColor: 'text-emerald-700',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    ugCourses: ['Online B.Sc./degree programmes in selected healthcare/allied areas where approved'],
    pgCourses: ['Online MPH', 'Online healthcare/hospital management programmes', 'Online public health programmes'],
    description: 'Public health administration (MPH), hospital management (MHA), clinical governance, and epidemiology systems.',
  },
  {
    id: 'law',
    name: 'Law',
    icon: Scale,
    accentColor: 'text-slate-700',
    bgLight: 'bg-slate-100',
    borderColor: 'border-slate-300',
    ugCourses: ['Online law-related certificate/UG programmes subject to applicable regulations'],
    pgCourses: ['Online LL.M./law-related PG programmes where approved'],
    description: 'Corporate law, cyber law, intellectual property rights (IPR), commercial arbitration, and legal compliance.',
  },
  {
    id: 'design',
    name: 'Design & Creative Fields',
    icon: Palette,
    accentColor: 'text-fuchsia-700',
    bgLight: 'bg-fuchsia-50',
    borderColor: 'border-fuchsia-200',
    ugCourses: ['Online design / visual communication / creative degree programmes where offered'],
    pgCourses: ['Online design / creative PG programmes where offered'],
    description: 'User experience (UI/UX) design, visual communication, digital multimedia, graphic arts, and design thinking.',
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Tourism',
    icon: Coffee,
    accentColor: 'text-orange-700',
    bgLight: 'bg-orange-50',
    borderColor: 'border-orange-200',
    ugCourses: ['Online hospitality / tourism management UG programmes'],
    pgCourses: ['Online hospitality / tourism management PG programmes', 'Online MHM / related programmes where offered'],
    description: 'International travel & tourism, luxury resort operations, hotel management, hospitality finance, and event strategy.',
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Related Fields',
    icon: Sprout,
    accentColor: 'text-lime-700',
    bgLight: 'bg-lime-50',
    borderColor: 'border-lime-200',
    ugCourses: ['Online agriculture-related UG programmes where offered'],
    pgCourses: ['Online agriculture-related PG programmes where offered'],
    description: 'Agribusiness management, sustainable farm supply chains, precision agricultural tech, and rural commerce.',
  },
  {
    id: 'professional',
    name: 'Professional / Specialised Online UG-PG',
    icon: Sparkles,
    accentColor: 'text-violet-700',
    bgLight: 'bg-violet-50',
    borderColor: 'border-violet-200',
    ugCourses: ['Online degrees with specialisations in Data Analytics, Digital Business, AI/ML, Cyber Security and related fields where offered'],
    pgCourses: ['Online MBA/MCA/M.Sc. specialisations in Data Science, AI/ML, Cyber Security, Business Analytics, Digital Marketing, Finance, HR, Operations and related areas'],
    description: 'Cutting-edge degrees mapped to high-growth tech sectors: Artificial Intelligence, Machine Learning, Cloud Systems, and FinTech.',
  },
];

export const OnlinePortalPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [streamFilter, setStreamFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState<'all' | 'ug' | 'pg'>('all');
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Filter only online colleges & online courses
  const onlineColleges = useMemo(() => {
    return FALLBACK_COLLEGES.filter((c) => c.mode === 'online' || c.mode === 'both');
  }, []);

  const onlineCourses = useMemo(() => {
    return FALLBACK_COURSES.filter((crs) => {
      if (crs.mode !== 'online') return false;
      if (levelFilter !== 'all' && crs.category !== levelFilter) return false;
      if (streamFilter !== 'all') {
        const str = (crs.stream ?? '').toLowerCase();
        const title = crs.title.toLowerCase();
        if (streamFilter === 'management' && !str.includes('management') && !str.includes('business') && !title.includes('mba') && !title.includes('pgdm') && !title.includes('bba') && !title.includes('bbm') && !title.includes('bms')) return false;
        if (streamFilter === 'computer-it' && !str.includes('computer') && !str.includes('it') && !title.includes('bca') && !title.includes('mca') && !title.includes('bsc') && !title.includes('msc')) return false;
        if (streamFilter === 'commerce' && !str.includes('commerce') && !str.includes('finance') && !title.includes('b.com') && !title.includes('m.com')) return false;
        if (streamFilter === 'arts' && !str.includes('arts') && !str.includes('humanities') && !title.includes('ba') && !title.includes('ma')) return false;
        if (streamFilter === 'science' && !str.includes('science') && !title.includes('b.sc') && !title.includes('m.sc')) return false;
        if (streamFilter === 'journalism' && !str.includes('journalism') && !str.includes('mass') && !title.includes('bjmc') && !title.includes('mjmc')) return false;
        if (streamFilter === 'education' && !str.includes('education') && !title.includes('b.ed') && !title.includes('m.ed')) return false;
        if (streamFilter === 'healthcare' && !str.includes('health') && !title.includes('mph') && !title.includes('hospital')) return false;
        if (streamFilter === 'law' && !str.includes('law') && !title.includes('ll.m') && !title.includes('llm')) return false;
        if (streamFilter === 'design' && !str.includes('design') && !str.includes('creative')) return false;
        if (streamFilter === 'hospitality' && !str.includes('hospitality') && !str.includes('tourism') && !str.includes('mhm')) return false;
        if (streamFilter === 'agriculture' && !str.includes('agri')) return false;
        if (streamFilter === 'professional' && !str.includes('professional') && !str.includes('specialised') && !str.includes('specialized') && !title.includes('analytics') && !title.includes('ai')) return false;
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
      `Hi StepWorld! I want to get Free Admission Guidance & Apply for ${courseTitle} at ${collegeName} (UGC-Approved Online Degree). Please share the semester syllabus, fees, and installment options.`
    );
    window.open(`https://wa.me/919910245535?text=${text}`, '_blank');
  };

  const handleEnquireCategoryWhatsApp = (categoryName: string) => {
    const text = encodeURIComponent(
      `Hi StepWorld! I am enquiring about Online UG & PG Degrees in ${categoryName}. Please share the top accredited universities, fee structures, and UGC-DEB approval details.`
    );
    window.open(`https://wa.me/919910245535?text=${text}`, '_blank');
  };

  const selectCategoryAndScroll = (catId: string) => {
    setStreamFilter(catId);
    const el = document.getElementById('all-online-courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Top Advisory Banner */}
      <div className="bg-slate-950 text-slate-300 py-2.5 px-4 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-bold text-white">UGC-DEB Entitled Online Degrees 2026–27 Open</span>
            <span className="hidden sm:inline text-slate-400">• Equivalent to Regular Degrees for Jobs, Promotions & Govt Exams</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/919910245535?text=Hi%20StepWorld,%20I%20am%20looking%20for%20UGC-approved%20online%20degree%20counselling"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-bold"
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
            <div className="hidden lg:flex items-center space-x-5 text-xs xl:text-sm font-bold text-slate-700">
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link
                to="/offline-courses"
                className="text-emerald-700 hover:text-emerald-800 transition-colors flex items-center gap-1.5"
              >
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>Regular Campus</span>
              </Link>
              <a
                href="#online-categories"
                className="text-indigo-700 hover:text-indigo-800 transition-colors flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Online Categories Guide</span>
              </a>
              <a
                href="#all-online-courses"
                className="text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-xl border border-blue-200 font-black flex items-center gap-1.5"
              >
                <Laptop className="w-4 h-4 text-blue-600" />
                <span>Online Degrees</span>
              </a>
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
                href="https://wa.me/919910245535?text=Hi%20StepWorld,%20I%20am%20looking%20for%20UGC-approved%20online%20degree%20counselling"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-xs font-black uppercase tracking-wider shadow-sm transition-all"
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
            <Link
              to="/offline-courses"
              onClick={() => setIsNavOpen(false)}
              className="block px-3 py-2 text-sm font-bold text-emerald-800"
            >
              🏛️ Regular Campus Degrees
            </Link>
            <a
              href="#online-categories"
              onClick={() => setIsNavOpen(false)}
              className="block px-3 py-2 text-sm font-bold text-indigo-800"
            >
              📚 Online UG & PG Course Guide (13 Categories)
            </a>
            <a
              href="#all-online-courses"
              onClick={() => setIsNavOpen(false)}
              className="block px-3 py-2 text-sm font-black text-blue-800 bg-blue-50 rounded-lg border border-blue-200"
            >
              💻 Browse Online Degrees ({onlineCourses.length})
            </a>
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
      <header className="bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-12 pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-blue-800 mb-4">
            <Laptop className="w-4 h-4 text-blue-700" />
            <span>UGC-DEB Entitled Online Degrees Portal</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Accredited Online Degrees from <span className={GRADIENT_TEXT}>India’s Top Universities</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Pursue verified UGC-DEB recognized degree programs from home.
            Study at your own schedule with weekend live faculty sessions, recorded mobile LMS lectures, and affordable semester installment fees.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#online-categories"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 text-xs font-black uppercase tracking-wider shadow-md transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore All 13 Online Categories Guide</span>
            </a>
            <a
              href="#all-online-courses"
              className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 px-5 py-3 text-xs font-bold border border-slate-300 shadow-xs transition-all"
            >
              <span>View Available Programs ({onlineCourses.length}) &darr;</span>
            </a>
          </div>

          {/* Quick Filter Box */}
          <div className="mt-8 max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl p-5 sm:p-6 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              {/* Search */}
              <div className="sm:col-span-5">
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
                  Search Online Degree / University
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="e.g. Online MBA, Online BCA, Manipal, Amity"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-9 pr-3 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Discipline */}
              <div className="sm:col-span-4">
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
                  Program Category
                </label>
                <div className="relative">
                  <select
                    value={streamFilter}
                    onChange={(e) => setStreamFilter(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 py-3 pl-3 pr-8 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
                  >
                    {ONLINE_STREAMS.map((s) => (
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
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 py-3 pl-3 pr-8 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white cursor-pointer"
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
                Found <strong className="text-blue-700">{onlineCourses.length}</strong> UGC-Approved Online Degree Programs
              </span>
              <a
                href="https://wa.me/919910245535?text=Hi%20StepWorld,%20I%20need%20help%20choosing%20the%20best%20online%20degree"
                target="_blank"
                rel="noreferrer"
                className="font-black text-blue-700 hover:underline flex items-center gap-1"
              >
                Need help comparing online universities? Ask on WhatsApp &rarr;
              </a>
            </div>
          </div>

          {/* Online Features Ribbon */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left text-xs font-bold text-slate-700">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center gap-2.5 shadow-xs">
              <Laptop className="w-5 h-5 text-blue-600 shrink-0" />
              <span>100% Online Classes & Remote Exams</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center gap-2.5 shadow-xs">
              <Clock className="w-5 h-5 text-blue-600 shrink-0" />
              <span>Study at Your Own Pace (Weekend Live)</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center gap-2.5 shadow-xs">
              <Award className="w-5 h-5 text-blue-600 shrink-0" />
              <span>UGC-DEB & AICTE Approved Degrees</span>
            </div>
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center gap-2.5 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <span>Easy Semester Installment Options</span>
            </div>
          </div>
        </div>
      </header>

      {/* 📚 INTERACTIVE STEPWORLD ONLINE UG & PG COURSE CATEGORIES GUIDE */}
      <section id="online-categories" className="bg-slate-100/70 py-16 border-b border-slate-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-blue-800 bg-blue-100 px-3.5 py-1 rounded-full mb-3 shadow-xs">
              <BookOpen className="w-4 h-4 text-blue-700" />
              <span>Official Student Counselling Reference</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              StepWorld Education Online UG & PG Course Categories
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              A counselling reference covering major undergraduate and postgraduate programmes available in online/distance-learning formats, subject to university and regulatory approval.
            </p>
          </div>

          {/* 13 CATEGORIES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STEPWORLD_ONLINE_GUIDE_CATEGORIES.map((cat) => {
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
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-100">
                        Online Degrees
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* UG Courses List */}
                    <div className="mb-4 bg-slate-50/80 rounded-2xl p-3.5 border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-black uppercase tracking-wide text-slate-700 flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                          <span>Online UG Courses ({cat.ugCourses.length})</span>
                        </span>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
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
                          <Award className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Online PG Courses ({cat.pgCourses.length})</span>
                        </span>
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
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
                      onClick={() => selectCategoryAndScroll(cat.id)}
                      className="text-xs font-bold text-slate-700 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Filter Courses</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleEnquireCategoryWhatsApp(cat.name)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>Enquire</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* IMPORTANT REGULATORY NOTE */}
          <div className="mt-12 bg-amber-50/90 border border-amber-200 rounded-3xl p-6 sm:p-8 flex items-start gap-4 shadow-sm">
            <div className="flex h-10 w-10 rounded-2xl bg-amber-100 text-amber-800 items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm sm:text-base font-black text-amber-950 uppercase tracking-wide">
                Important Regulatory Notice:
              </h4>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                Online course availability, eligibility, recognition and professional-practice rights vary by programme and institution. For regulated/professional fields such as medicine, dental, nursing, law and certain education programmes, students should verify the latest approval and delivery-mode rules before admission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Online Universities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-wider text-blue-800 bg-blue-100 px-3.5 py-1 rounded-full">
            UGC-DEB Entitled Online Partners
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mt-2">
            Top Online Degree Partner Universities
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Top NAAC A+ accredited universities providing official LMS portals, interactive live webinars, and career services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {onlineColleges.map((col) => (
            <div
              key={col.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:border-blue-500 hover:shadow-xl transition-all"
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
                    <span className="inline-block bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                      💻 Online Degree
                    </span>
                    <p className="text-xs font-bold text-amber-600 mt-1">★ {col.rating} ({col.ratingCount})</p>
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  <Link to={`/university/${col.slug}`} className="hover:text-blue-700 transition-colors">
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

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {col.approvals.map((a, i) => (
                    <span key={i} className="text-[10px] font-extrabold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100">
                      ✓ {a.approval.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  to={`/university/${col.slug}`}
                  className="flex-1 text-center py-2.5 rounded-xl border border-slate-300 text-slate-800 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  View Details
                </Link>
                <button
                  onClick={() => handleApplyWhatsApp('Online Degree Enquiry', col.shortName ?? col.name)}
                  className="flex-1 text-center py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Apply on WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Online Courses Directory */}
      <section id="all-online-courses" className="bg-white py-16 border-t border-slate-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                UGC-Approved Online Programs
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                Available Online Degree Programs ({onlineCourses.length})
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Affordable fees, semester payment plans, and weekend masterclasses.
              </p>
            </div>
            {streamFilter !== 'all' && (
              <button
                onClick={() => setStreamFilter('all')}
                className="text-xs font-bold text-blue-700 hover:underline bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 cursor-pointer"
              >
                Reset Filter (Show All 13 Categories)
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {onlineCourses.map((crs) => (
              <div
                key={crs.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 flex flex-col justify-between hover:bg-white hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">
                      {crs.stream}
                    </span>
                    <span className="text-xs font-black text-slate-900">{crs.fee}</span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900">
                    <Link
                      to={crs.college ? `/university/${crs.college.slug}/${crs.slug}` : `/university/alliance-university-online/${crs.slug}`}
                      className="hover:text-blue-700 transition-colors"
                    >
                      {crs.title}
                    </Link>
                  </h3>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">
                    {crs.college?.name ?? 'Alliance University Online'} • {crs.duration}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {crs.description ?? 'UGC-DEB approved flexible online degree with weekend live faculty sessions and LMS access.'}
                  </p>
                  {crs.specializations && (
                    <p className="text-[11px] font-medium text-slate-500 mt-2">
                      <strong className="text-slate-700 font-bold">Specializations:</strong> {crs.specializations}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                  <Link
                    to={crs.college ? `/university/${crs.college.slug}/${crs.slug}` : `/university/alliance-university-online/${crs.slug}`}
                    className="text-xs font-bold text-slate-700 hover:text-blue-700 transition-colors"
                  >
                    View Syllabus & Fees &rarr;
                  </Link>
                  <button
                    onClick={() => handleApplyWhatsApp(crs.title, crs.college?.name ?? 'Online University')}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Apply Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Need Help CTA Banner */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="bg-blue-400 text-slate-950 font-black px-3 py-1 rounded-full text-xs uppercase tracking-wider">
            100% Free Online Degree Counselling
          </span>
          <h2 className="text-2xl sm:text-4xl font-black">
            Unsure Which Online University is Best for Your Career?
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto">
            Our educational consultants evaluate NAAC accreditation, live lecture timings, semester exam modes, and EMI plans to guide you to the right online degree.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/919910245535?text=Hi%20StepWorld,%20I%20need%20expert%20guidance%20for%20choosing%20an%20online%20degree"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3.5 text-sm font-black uppercase tracking-wider shadow-xl transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Chat on WhatsApp (99102 45535)</span>
            </a>
            <Link
              to="/offline-courses"
              className="inline-flex items-center gap-1.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white px-5 py-3.5 text-xs font-bold border border-white/20 transition-all"
            >
              <Building2 className="w-4 h-4 text-emerald-300" />
              <span>Looking for Regular On-Campus Degrees? Click Here</span>
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
              <p className="text-blue-400 font-bold uppercase tracking-wider text-[11px]">
                Established 2015 · UGC-Approved Online Degrees
              </p>
              <p className="text-slate-400 leading-relaxed">
                StepWorld assists students and working professionals with authentic online and distance degrees approved by UGC-DEB.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Popular Online Categories</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Management & Business (MBA / BBA)</li>
                <li>Computer & IT (BCA / MCA)</li>
                <li>Commerce & Finance (B.Com / M.Com)</li>
                <li>Healthcare & Allied (MPH / Hospital Admin)</li>
                <li>Data Science & AI/ML Specialisations</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white">Home Portal</Link></li>
                <li><Link to="/offline-courses" className="hover:text-white">Regular Campus Portal</Link></li>
                <li><a href="#online-categories" className="hover:text-white">Online Course Categories Guide</a></li>
                <li><a href="#all-online-courses" className="text-blue-400 font-bold">Online Degrees Portal</a></li>
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

export default OnlinePortalPage;
