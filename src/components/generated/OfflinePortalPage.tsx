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

const OFFLINE_STREAMS = [
  { id: 'all', name: 'All Disciplines' },
  { id: 'engineering', name: 'Engineering & Technology (B.Tech / M.Tech)' },
  { id: 'management', name: 'Management & Business (BBA / MBA)' },
  { id: 'medical', name: 'Medical & Healthcare (MBBS / Nursing / Pharma)' },
  { id: 'law', name: 'Law & Legal Studies (LL.B / BA-LL.B)' },
  { id: 'commerce', name: 'Commerce & Banking (B.Com / Finance)' },
  { id: 'design', name: 'Design & Architecture (B.Des / B.Arch)' },
  { id: 'science', name: 'Applied Sciences (B.Sc / M.Sc)' },
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
        if (streamFilter === 'engineering' && !str.includes('engineer') && !title.includes('b.tech') && !title.includes('m.tech')) return false;
        if (streamFilter === 'management' && !str.includes('manage') && !title.includes('bba') && !title.includes('mba')) return false;
        if (streamFilter === 'medical' && !str.includes('health') && !title.includes('mbbs') && !title.includes('pharm') && !title.includes('nurs')) return false;
        if (streamFilter === 'law' && !str.includes('law') && !title.includes('ll.b') && !title.includes('legal')) return false;
        if (streamFilter === 'commerce' && !str.includes('commerce') && !title.includes('b.com')) return false;
        if (streamFilter === 'design' && !str.includes('design') && !title.includes('b.des') && !title.includes('arch')) return false;
        if (streamFilter === 'science' && !str.includes('science') && !title.includes('b.sc')) return false;
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
      `Hi StepWorld! I want to get Free Admission Counselling & Apply for ${courseTitle} at ${collegeName} (Regular Campus). Please guide me with seat cutoffs and direct university fees.`
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
            <div className="hidden lg:flex items-center space-x-5 text-xs xl:text-sm font-bold text-slate-700">
              <Link to="/" className="hover:text-emerald-600 transition-colors">
                Home
              </Link>
              <Link
                to="/offline-courses"
                className="text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200 font-black flex items-center gap-1.5"
              >
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>Regular Campus</span>
              </Link>
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
            <Link
              to="/offline-courses"
              onClick={() => setIsNavOpen(false)}
              className="block px-3 py-2 text-sm font-black text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-200"
            >
              🏛️ Regular Campus Degrees
            </Link>
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

      {/* Campus Courses Directory */}
      <section className="bg-white py-16 border-t border-slate-200">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    View Syllabus & Cutoffs &rarr;
                  </Link>
                  <button
                    onClick={() => handleApplyWhatsApp(crs.title, crs.college?.name ?? 'Christ University')}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer"
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

export default OfflinePortalPage;
