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

const ONLINE_STREAMS = [
  { id: 'all', name: 'All Online Disciplines' },
  { id: 'management', name: 'Online MBA & PGDM (14+ Specializations)' },
  { id: 'it', name: 'Online BCA & MCA (Cloud / Full-Stack)' },
  { id: 'commerce', name: 'Online B.Com & M.Com (Finance & Accounting)' },
  { id: 'bba', name: 'Online BBA (Digital Business & Marketing)' },
  { id: 'arts', name: 'Online B.A. & M.A. (Humanities)' },
  { id: 'health', name: 'Online Hospital Admin (MHA)' },
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
        if (streamFilter === 'management' && !str.includes('manage') && !title.includes('mba') && !title.includes('pgdm')) return false;
        if (streamFilter === 'it' && !str.includes('computer') && !str.includes('it') && !title.includes('bca') && !title.includes('mca')) return false;
        if (streamFilter === 'commerce' && !str.includes('commerce') && !title.includes('b.com') && !title.includes('m.com')) return false;
        if (streamFilter === 'bba' && !title.includes('bba')) return false;
        if (streamFilter === 'arts' && !str.includes('arts') && !title.includes('b.a.') && !title.includes('m.a.')) return false;
        if (streamFilter === 'health' && !str.includes('health') && !title.includes('mha')) return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchTitle = crs.title.toLowerCase().includes(q);
        const matchCollege = (crs.college?.name ?? '').toLowerCase().includes(q);
        const matchSpec = (crs.specializations ?? '').toLowerCase().includes(q);
        if (!matchTitle && !matchCollege && !matchSpec) return false;
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Top Advisory Banner */}
      <div className="bg-slate-950 text-slate-300 py-2.5 px-4 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-bold text-white">UGC-DEB Entitled Online Degrees 2026–27 Open</span>
            <span className="hidden sm:inline text-slate-400">• Equivalent to Regular Degrees for Jobs & Govt Exams</span>
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
              <Link
                to="/online-degrees"
                className="text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-xl border border-blue-200 font-black flex items-center gap-1.5"
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
            <Link
              to="/online-degrees"
              onClick={() => setIsNavOpen(false)}
              className="block px-3 py-2 text-sm font-black text-blue-800 bg-blue-50 rounded-lg border border-blue-200"
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
                    placeholder="e.g. Online MBA, Online BCA, Manipal"
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
      <section className="bg-white py-16 border-t border-slate-200">
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
                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer"
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
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Popular Online Degrees</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Online MBA (14+ Specializations)</li>
                <li>Online BCA & MCA</li>
                <li>Online BBA & B.Com</li>
                <li>Online Hospital Admin (MHA)</li>
                <li>Executive MBA Programs</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white">Home Portal</Link></li>
                <li><Link to="/offline-courses" className="hover:text-white">Regular Campus Portal</Link></li>
                <li><Link to="/online-degrees" className="text-blue-400 font-bold">Online Degrees Portal</Link></li>
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
              <p className="text-slate-400">Office: Noida / Delhi NCR</p>
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
