import React, { useEffect, useMemo, useState } from 'react';
import { apiUrl } from '../../lib/api';
import { Link } from '../../lib/router';
import { FALLBACK_COLLEGES, FALLBACK_COURSES } from '../../data/fallbackData';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  GraduationCap,
  Building2,
  Laptop,
  CheckCircle2,
  Compass,
  MapPin,
  Award,
  Briefcase,
  ShieldCheck,
  BookOpen,
  Stethoscope,
  Scale,
  Palette,
  Coffee,
  Sprout,
  Film,
  FlaskConical,
  Calculator,
  TrendingUp,
  Sparkles,
  Phone,
  MessageCircle,
  Mail,
  ExternalLink,
  Clock,
  IndianRupee,
  Filter,
  Layers,
  Check,
  HelpCircle,
  Users,
  Globe,
  Instagram,
  Facebook,
} from 'lucide-react';

const GRADIENT_TEXT = 'bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent';

const StepWorldLogo = ({ height = 56 }: { height?: number }) => {
  return (
    <div className="flex items-center shrink-0">
      <img
        src="/stepworld-logo.jpg"
        alt="StepWorld"
        style={{ height: `${height}px` }}
        className="w-auto object-contain rounded-xl shadow-xs"
      />
    </div>
  );
};

const CollegeLogo = ({
  initials,
  color,
  size = 'md',
}: {
  initials: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const sz =
    size === 'sm' ? 'h-10 w-10 text-sm' : size === 'lg' ? 'h-16 w-16 text-xl' : 'h-12 w-12 text-base';
  return (
    <div
      className={`${sz} shrink-0 rounded-full border-2 border-white shadow-md ring-1 ring-slate-200 flex items-center justify-center font-black text-white`}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
};

export type ApiCollege = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  location: string;
  initials: string;
  logoGradient: string;
  rating: number;
  featured: boolean;
  coursesCount: number;
  mode?: string;
  about?: string | null;
  campusSize?: string;
  avgPackage?: string;
  courses: Array<{
    id: string;
    slug: string;
    title: string;
    category: 'ug' | 'pg';
    fee: string;
    duration: string;
    mode?: string;
  }>;
};

export type ApiCourse = {
  id: string;
  slug: string;
  title: string;
  category: 'ug' | 'pg';
  fee: string;
  duration: string;
  eligibility: string;
  specializations: string;
  description?: string;
  collegeId: string;
  mode?: string;
  stream?: string;
  college?: ApiCollege;
};

export interface CourseStream {
  id: string;
  name: string;
  icon: React.ElementType;
  accentColor: string;
  bgLight: string;
  borderColor: string;
  offlineUG: string[];
  offlinePG: string[];
  onlineUG: string[];
  onlinePG: string[];
  description: string;
}

export const COURSE_STREAMS: CourseStream[] = [
  {
    id: 'engineering',
    name: 'Engineering & Technology',
    icon: FlaskConical,
    accentColor: 'text-blue-700',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    offlineUG: ['B.Tech', 'B.E.'],
    offlinePG: ['M.Tech', 'M.E.'],
    onlineUG: ['B.Sc Computer Science (Online)', 'B.Tech Working Professionals (Lateral/Flexible)'],
    onlinePG: ['M.Tech Working Professionals', 'M.Sc Information Technology'],
    description: 'Technical, computing, automation, and core engineering specializations.',
  },
  {
    id: 'computer-it',
    name: 'Computer & IT',
    icon: Laptop,
    accentColor: 'text-indigo-700',
    bgLight: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    offlineUG: ['BCA', 'B.Sc. Computer Science', 'B.Sc. IT'],
    offlinePG: ['MCA', 'M.Sc. Computer Science', 'M.Sc. IT'],
    onlineUG: ['Online BCA', 'Online B.Sc. IT'],
    onlinePG: ['Online MCA', 'Online M.Sc. IT / Data Science'],
    description: 'Software development, cloud systems, cyber security, and data infrastructure.',
  },
  {
    id: 'management',
    name: 'Management & Business',
    icon: TrendingUp,
    accentColor: 'text-emerald-700',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    offlineUG: ['BBA', 'BBM', 'BMS'],
    offlinePG: ['MBA', 'PGDM', 'MMS'],
    onlineUG: ['Online BBA', 'Online BMS'],
    onlinePG: ['Online MBA', 'Online PGDM', 'Executive Online MBA'],
    description: 'Corporate leadership, marketing strategy, finance, operations, and business analytics.',
  },
  {
    id: 'medical-healthcare',
    name: 'Medical & Healthcare',
    icon: Stethoscope,
    accentColor: 'text-rose-700',
    bgLight: 'bg-rose-50',
    borderColor: 'border-rose-200',
    offlineUG: ['MBBS', 'BDS', 'BAMS', 'BHMS', 'BUMS', 'B.Sc Nursing', 'BPT', 'B.Pharm', 'BOT', 'B.Sc MLT'],
    offlinePG: ['MD', 'MS', 'MDS', 'MD/MS Ayurveda', 'M.Pharm', 'M.Sc Nursing', 'MPT', 'M.Sc MLT', 'MPH', 'MHA'],
    onlineUG: ['Diploma in Healthcare Services Management', 'Hospital Administration Foundation'],
    onlinePG: ['Online MHA (Hospital Administration)', 'Online MPH (Public Health)'],
    description: 'Clinical healthcare, allied health sciences, pharmacy, and hospital administration.',
  },
  {
    id: 'commerce',
    name: 'Commerce & Finance',
    icon: Calculator,
    accentColor: 'text-teal-700',
    bgLight: 'bg-teal-50',
    borderColor: 'border-teal-200',
    offlineUG: ['B.Com', 'B.Com (Hons.)'],
    offlinePG: ['M.Com', 'Finance-related PG programmes'],
    onlineUG: ['Online B.Com', 'Online B.Com (Hons. / International Finance)'],
    onlinePG: ['Online M.Com', 'Online Financial Analytics'],
    description: 'Accounting standards, taxation, corporate banking, auditing, and investments.',
  },
  {
    id: 'law',
    name: 'Law & Legal Studies',
    icon: Scale,
    accentColor: 'text-amber-800',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    offlineUG: ['LL.B', 'BA-LL.B', 'BBA-LL.B', 'B.Com-LL.B'],
    offlinePG: ['LL.M (Master of Laws)'],
    onlineUG: ['Diploma in Cyber Law', 'Certificate in Corporate Legal Compliance'],
    onlinePG: ['Online LL.M in Corporate Law / Cyber Law'],
    description: 'BCI-approved constitutional law, corporate jurisprudence, litigation, and human rights.',
  },
  {
    id: 'science',
    name: 'Pure & Applied Science',
    icon: FlaskConical,
    accentColor: 'text-sky-700',
    bgLight: 'bg-sky-50',
    borderColor: 'border-sky-200',
    offlineUG: ['B.Sc.', 'B.Sc. (Hons.) Physics, Chem, Maths, Bio, Biotech'],
    offlinePG: ['M.Sc.', 'M.Sc. (Hons.)'],
    onlineUG: ['Online B.Sc Data Science & Mathematics'],
    onlinePG: ['Online M.Sc Mathematics / Statistics'],
    description: 'Fundamental research, applied analytics, biotechnology, and laboratory physics.',
  },
  {
    id: 'design',
    name: 'Design & Architecture',
    icon: Palette,
    accentColor: 'text-fuchsia-700',
    bgLight: 'bg-fuchsia-50',
    borderColor: 'border-fuchsia-200',
    offlineUG: ['B.Des', 'B.Arch', 'BFA (Bachelor of Fine Arts)'],
    offlinePG: ['M.Des', 'M.Arch', 'MFA (Master of Fine Arts)'],
    onlineUG: ['Online Diploma in UI/UX & Graphic Design'],
    onlinePG: ['Online M.Des in User Experience & Interaction Design'],
    description: 'Industrial design, COA architecture, fashion, interior, visual arts, and digital UI/UX.',
  },
  {
    id: 'hotel-management',
    name: 'Hotel Management & Hospitality',
    icon: Coffee,
    accentColor: 'text-orange-700',
    bgLight: 'bg-orange-50',
    borderColor: 'border-orange-200',
    offlineUG: ['BHM', 'B.Sc. Hospitality & Hotel Administration', 'B.Sc. Catering'],
    offlinePG: ['MHM', 'M.Sc. Hospitality Administration'],
    onlineUG: ['Online Diploma in Hotel Operations & Event Management'],
    onlinePG: ['Online MBA in Hospitality & Tourism Management'],
    description: 'Culinary arts, hotel operations, luxury guest relations, and tourism logistics.',
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Allied Sciences',
    icon: Sprout,
    accentColor: 'text-green-700',
    bgLight: 'bg-green-50',
    borderColor: 'border-green-200',
    offlineUG: ['B.Sc. Agriculture', 'B.Tech Agricultural Engineering', 'B.Sc. Horticulture'],
    offlinePG: ['M.Sc. Agriculture', 'M.Tech Agricultural Engineering'],
    onlineUG: ['Certificate in Agribusiness & Supply Chain'],
    onlinePG: ['Online MBA in Agribusiness Management'],
    description: 'ICAR-aligned agronomy, soil science, agricultural machinery, and modern crop biotechnology.',
  },
  {
    id: 'education',
    name: 'Education & Teaching',
    icon: GraduationCap,
    accentColor: 'text-blue-800',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-200',
    offlineUG: ['B.Ed', 'B.El.Ed', 'D.El.Ed'],
    offlinePG: ['M.Ed', 'M.A. Education'],
    onlineUG: ['Online Certificate in Early Childhood Care & Education'],
    onlinePG: ['Online M.A. Education / Educational Leadership'],
    description: 'NCTE-recognized pedagogy, teacher training, educational administration, and curriculum design.',
  },
  {
    id: 'media-journalism',
    name: 'Mass Communication & Journalism',
    icon: Film,
    accentColor: 'text-purple-700',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-200',
    offlineUG: ['BJMC', 'B.A. Journalism & Mass Communication'],
    offlinePG: ['MJMC', 'M.A. Journalism & Mass Communication'],
    onlineUG: ['Online BJMC', 'Online BA Journalism & Mass Communication'],
    onlinePG: ['Online MJMC', 'Online MA Journalism & Mass Communication'],
    description: 'Broadcast journalism, digital media production, corporate PR, and advertising communications.',
  },
  {
    id: 'arts-humanities',
    name: 'Arts & Humanities',
    icon: Award,
    accentColor: 'text-cyan-700',
    bgLight: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    offlineUG: ['B.A.', 'B.A. (Hons.)'],
    offlinePG: ['M.A.', 'M.A. (Hons.)'],
    onlineUG: ['Online BA', 'Online BA (Hons.)'],
    onlinePG: ['Online MA', 'Online MA (Hons.)'],
    description: 'Liberal arts, psychology, economics, public policy, literature, and social sciences.',
  },
  {
    id: 'emerging-tech',
    name: 'Professional & Emerging Tech',
    icon: Sparkles,
    accentColor: 'text-pink-700',
    bgLight: 'bg-pink-50',
    borderColor: 'border-pink-200',
    offlineUG: ['B.Tech / B.Sc in AI/ML, Cloud Computing, Cyber Security'],
    offlinePG: ['M.Tech / MBA in Business Analytics, FinTech, Data Science'],
    onlineUG: ['Online Degrees with Data Analytics, Digital Business, AI/ML'],
    onlinePG: ['Online MBA/MCA in AI/ML, Cyber Security, Business Analytics'],
    description: 'High-growth career specializations in artificial intelligence, cloud architectures, and digital business.',
  },
];

const getCollegeMode = (college: { mode?: string; name: string; slug: string }): 'offline' | 'online' => {
  if (college.mode === 'online' || college.mode === 'offline') return college.mode;
  if (/online/i.test(college.name) || /online/i.test(college.slug)) return 'online';
  return 'offline';
};

const getCourseMode = (course: {
  mode?: string;
  title: string;
  slug: string;
  college?: { mode?: string; name: string; slug: string };
}): 'offline' | 'online' => {
  if (course.mode === 'online' || course.mode === 'offline') return course.mode;
  if (/online/i.test(course.title) || /online/i.test(course.slug)) return 'online';
  if (course.college) return getCollegeMode(course.college);
  return 'offline';
};

export const StepWorldHomepage = () => {
  const [colleges, setColleges] = useState<ApiCollege[]>(FALLBACK_COLLEGES);
  const [courses, setCourses] = useState<ApiCourse[]>(FALLBACK_COURSES);
  const [, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);

  // User requirement: primary focus on offline, but make both online and offline crystal clear
  const [globalMode, setGlobalMode] = useState<'offline' | 'online' | 'all'>('offline');
  const [selectedStreamFilter, setSelectedStreamFilter] = useState<string>('all');
  const [syllabusModalStream, setSyllabusModalStream] = useState<CourseStream | null>(null);
  const [showAllCourses, setShowAllCourses] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [courseSearch, setCourseSearch] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'ug' | 'pg'>('all');
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const [cRes, coRes] = await Promise.allSettled([
          fetch(apiUrl('/api/colleges')),
          fetch(apiUrl('/api/courses')),
        ]);
        if (!cancelled) {
          if (cRes.status === 'fulfilled' && cRes.value.ok) {
            const c = await cRes.value.json();
            if (Array.isArray(c) && c.length > 0) {
              setColleges(c);
            }
          }
          if (coRes.status === 'fulfilled' && coRes.value.ok) {
            const co = await coRes.value.json();
            if (Array.isArray(co) && co.length > 0) {
              setCourses(co);
            }
          }
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

  const safeColleges = useMemo(() => (Array.isArray(colleges) && colleges.length > 0 ? colleges : FALLBACK_COLLEGES), [colleges]);
  const safeCourses = useMemo(() => (Array.isArray(courses) && courses.length > 0 ? courses : FALLBACK_COURSES), [courses]);

  const collegeById = useMemo(() => Object.fromEntries(safeColleges.map((c) => [c.id, c])), [safeColleges]);

  // Helper to test if course matches a given stream id
  const courseMatchesStream = (c: ApiCourse, streamId: string) => {
    if (streamId === 'all') return true;
    const strObj = COURSE_STREAMS.find((s) => s.id === streamId);
    const sName = strObj ? strObj.name.toLowerCase() : streamId.toLowerCase();
    const cStream = (c.stream ?? '').toLowerCase();
    const title = c.title.toLowerCase();
    const spec = (c.specializations ?? '').toLowerCase();

    if (cStream && (cStream.includes(sName) || sName.includes(cStream))) return true;
    if (streamId === 'engineering' && (title.includes('b.tech') || title.includes('m.tech') || title.includes('engg') || spec.includes('engineering'))) return true;
    if (streamId === 'computer-it' && (title.includes('bca') || title.includes('mca') || title.includes('comput') || title.includes('software') || title.includes('data science') || title.includes('cyber'))) return true;
    if (streamId === 'management' && (title.includes('mba') || title.includes('bba') || title.includes('managem') || title.includes('pgdm') || title.includes('executive'))) return true;
    if (streamId === 'medical-healthcare' && (title.includes('mbbs') || title.includes('pharm') || title.includes('nurs') || title.includes('bpt') || title.includes('bds') || title.includes('health') || title.includes('mha'))) return true;
    if (streamId === 'law' && (title.includes('ll.b') || title.includes('ll.m') || title.includes('law') || title.includes('legal'))) return true;
    if (streamId === 'commerce' && (title.includes('b.com') || title.includes('m.com') || title.includes('finan') || title.includes('account') || title.includes('banking'))) return true;
    if (streamId === 'science' && (title.includes('b.sc') || title.includes('m.sc') || title.includes('physics') || title.includes('chem') || title.includes('math') || title.includes('biotech'))) return true;
    if (streamId === 'design' && (title.includes('b.des') || title.includes('b.arch') || title.includes('m.des') || title.includes('design') || title.includes('animation') || title.includes('fashion'))) return true;
    if (streamId === 'hotel-management' && (title.includes('bhm') || title.includes('hospitality') || title.includes('hotel') || title.includes('catering'))) return true;
    if (streamId === 'agriculture' && (title.includes('agri') || title.includes('agriculture') || title.includes('horticulture') || title.includes('forestry'))) return true;
    if (streamId === 'education' && (title.includes('b.ed') || title.includes('m.ed') || title.includes('educat') || title.includes('teaching'))) return true;
    if (streamId === 'media-journalism' && (title.includes('journalism') || title.includes('media') || title.includes('bjmc') || title.includes('mjmc') || title.includes('mass comm'))) return true;
    if (streamId === 'arts-humanities' && (title.includes('b.a.') || title.includes('m.a.') || title.includes('arts') || title.includes('humanities') || title.includes('psychology') || title.includes('english'))) return true;
    return false;
  };

  // Filtered courses based on mode, level, search, and stream filter
  const allFilteredCourses = useMemo(() => {
    return safeCourses.filter((c) => {
      const mode = getCourseMode(c);
      if (globalMode !== 'all' && mode !== globalMode) return false;
      if (selectedLevel !== 'all' && c.category !== selectedLevel) return false;
      if (selectedStreamFilter !== 'all' && !courseMatchesStream(c, selectedStreamFilter)) return false;
      if (courseSearch.trim()) {
        const q = courseSearch.toLowerCase().trim();
        const college = c.college ?? collegeById[c.collegeId];
        const matchTitle = c.title.toLowerCase().includes(q);
        const matchCollege = (college?.name ?? '').toLowerCase().includes(q);
        const matchStream = (c.stream ?? '').toLowerCase().includes(q);
        const matchSpecialization = (c.specializations ?? '').toLowerCase().includes(q);
        if (!matchTitle && !matchCollege && !matchStream && !matchSpecialization) return false;
      }
      return true;
    });
  }, [safeCourses, globalMode, selectedLevel, selectedStreamFilter, courseSearch, collegeById]);

  const offlineCoursesCount = safeCourses.filter((c) => getCourseMode(c) === 'offline').length;
  const onlineCoursesCount = safeCourses.filter((c) => getCourseMode(c) === 'online').length;

  const handleSelectModeAndScroll = (mode: 'offline' | 'online' | 'all') => {
    setGlobalMode(mode);
    const target = document.getElementById('all-courses');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Advisory Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden">
            <span className="bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded text-[10px] tracking-wider uppercase shrink-0">
              Since 2015
            </span>
            <span className="hidden sm:inline text-slate-300 font-medium truncate">
              A Decade of Trusted Education Consultancy • Regular On-Campus Offline & Approved Online Degrees
            </span>
            <span className="sm:hidden text-slate-300 truncate">Offline & Online Admissions</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold whitespace-nowrap shrink-0">
            <a
              href="https://wa.me/919910245535?text=Hi%20StepWorld,%20I%20would%20like%20to%20get%20free%20admission%20counselling"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp: +91 99102 45535</span>
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <a href="tel:18004200000" className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-white">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>1800-420-0000</span>
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <a
              href="https://maps.app.goo.gl/ZQknF8MaBnbiPCnw5"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 text-rose-400 hover:text-rose-300"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Office Map</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar - SINGLE LINE LAYOUT GUARANTEE */}
      <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs text-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 sm:h-24">
            {/* Logo in single line */}
            <Link to="/" className="flex items-center shrink-0 cursor-pointer py-1.5">
              <StepWorldLogo height={72} />
            </Link>

            {/* Desktop Nav Links - Clean & Standard */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 text-xs xl:text-sm font-bold text-slate-700 whitespace-nowrap shrink-0">
              <a href="#course-categories" className="hover:text-emerald-600 transition-colors whitespace-nowrap">
                Course Categories
              </a>
              <a href="#all-courses" className="hover:text-emerald-600 transition-colors whitespace-nowrap">
                All Courses
              </a>
              <a href="#colleges" className="hover:text-emerald-600 transition-colors whitespace-nowrap">
                Universities
              </a>
              <a href="#why-choose" className="hover:text-emerald-600 transition-colors whitespace-nowrap">
                Why StepWorld
              </a>
              <Link
                to="/blog/mba-pgdm-admission-2027-entrance-exams-direct-admission"
                className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors whitespace-nowrap shrink-0"
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>MBA 2027 Guide</span>
              </Link>
              <a href="#faqs" className="hover:text-emerald-600 transition-colors whitespace-nowrap">
                FAQs
              </a>

            </div>

            {/* Quick Action Buttons - WhatsApp & Phone */}
            <div className="hidden lg:flex items-center space-x-2 whitespace-nowrap shrink-0">
              <a
                href="https://wa.me/919910245535?text=Hi%20StepWorld,%20I%20would%20like%20to%20get%20free%20admission%20counselling"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 text-xs font-black uppercase tracking-wider shadow-sm transition-all whitespace-nowrap shrink-0"
              >
                <MessageCircle className="h-3.5 w-3.5 fill-current" />
                <span className="whitespace-nowrap">WhatsApp (99102 45535)</span>
              </a>
              <a
                href="tel:18004200000"
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-3 py-2 text-xs font-bold uppercase tracking-wider shadow-sm transition-all whitespace-nowrap shrink-0"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span className="whitespace-nowrap">1800-420-0000</span>
              </a>
            </div>

            {/* Mobile Hamburger - active on < xl */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="text-slate-700 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100"
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
              to="/blog/mba-pgdm-admission-2027-entrance-exams-direct-admission"
              onClick={() => setIsNavOpen(false)}
              className="block px-3 py-2 text-sm font-bold text-blue-700 bg-blue-50 rounded-lg border border-blue-200"
            >
              🔥 MBA & PGDM Admission 2027 Guide
            </Link>
            <a
              href="#course-categories"
              onClick={() => setIsNavOpen(false)}
              className="block px-3 py-2 text-sm font-bold text-slate-800"
            >
              📚 Course Categories (UG & PG)
            </a>
            <a
              href="#mode-comparison"
              onClick={() => setIsNavOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700"
            >
              ⚖️ Offline vs Online Comparison
            </a>
            <a
              href="#all-courses"
              onClick={() => setIsNavOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700"
            >
              🎓 All {courses.length} Courses Directory
            </a>
            <a
              href="#colleges"
              onClick={() => setIsNavOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700"
            >
              🏛️ Partner Universities & Campuses
            </a>
            <a
              href="#why-choose"
              onClick={() => setIsNavOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700"
            >
              ⭐ Why Choose StepWorld (Since 2015)
            </a>
            <a
              href="#faqs"
              onClick={() => setIsNavOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700"
            >
              📝 FAQs
            </a>
            <a
              href="#contact-location"
              onClick={() => setIsNavOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700"
            >
              📍 Office Location on Google Maps
            </a>

          </div>
        )}
      </nav>

            {/* HERO SECTION - LIGHT THEME WITH DUAL DISCOVERY CARDS & 30-SEC COURSE FINDER */}
      <section className="relative isolate w-full overflow-hidden bg-gradient-to-b from-[#F0FDF4] via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex flex-col items-center text-center">

          {/* Trust badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 shadow-xs whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
            <span className="text-xs font-black tracking-wide text-emerald-800 uppercase">
              Established in 2015 · A Decade of Experience in Education Consultancy
            </span>
          </div>

          <h1 className="max-w-4xl text-3xl sm:text-5xl lg:text-[50px] font-black leading-[1.15] tracking-tight text-slate-900">
            <span className="block">Step Your Career With Us —</span>
            <span className="mt-2 block bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
              Regular On-Campus & Online Degrees
            </span>
          </h1>

          <p className="mt-3 max-w-3xl text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed font-normal">
            Whether you seek the full university experience of <strong>regular on-campus offline courses</strong> (our primary focus with lab practicals, hostel life, and placement drives) or the convenience of <strong>accredited online degree programs</strong>, StepWorld provides personalized counselling and direct admission support.
          </p>

          {/* QUICK COURSE & DEGREE MATCHER - REDESIGNED FOR HIGH CONVERSION & ZERO TEXT-CUTTING */}
          <div className="mt-8 w-full max-w-4xl bg-white rounded-3xl border border-slate-200/90 shadow-xl p-5 sm:p-7 text-left">
            {/* Header with icon, title, and live match pill */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                    Quick Course & Degree Matcher
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Filter on-campus and online programs in 30 seconds
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shadow-xs">
                  {allFilteredCourses.length} Programs Available
                </span>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="space-y-4">
              {/* Step 1: Study Mode Toggle Pills (Clean, Modern & Tactile) */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2">
                  1. Choose Study Mode:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setGlobalMode('offline')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                      globalMode === 'offline'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <Building2 className="w-4 h-4 shrink-0" />
                    <span className="truncate">🏫 Regular Campus ({offlineCoursesCount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGlobalMode('online')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                      globalMode === 'online'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <Laptop className="w-4 h-4 shrink-0" />
                    <span className="truncate">💻 Online Degrees ({onlineCoursesCount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGlobalMode('all')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border ${
                      globalMode === 'all'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <Layers className="w-4 h-4 shrink-0" />
                    <span className="truncate">Show Both ({courses.length})</span>
                  </button>
                </div>
              </div>

              {/* Step 2 & 3: Dropdowns + Ample Space Search Button */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
                {/* Academic Stream Dropdown (5 cols) */}
                <div className="sm:col-span-5">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
                    2. Academic Discipline
                  </label>
                  <div className="relative">
                    <select
                      value={selectedStreamFilter}
                      onChange={(e) => setSelectedStreamFilter(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 py-3 pl-3.5 pr-8 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white shadow-xs cursor-pointer"
                    >
                      <option value="all">All 14 Disciplines</option>
                      {COURSE_STREAMS.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>

                {/* Degree Level (3 cols) */}
                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 mb-1.5">
                    3. Degree Level
                  </label>
                  <div className="relative">
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value as any)}
                      className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 py-3 pl-3.5 pr-8 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white shadow-xs cursor-pointer"
                    >
                      <option value="all">All (UG + PG)</option>
                      <option value="ug">Undergrad (UG)</option>
                      <option value="pg">Postgrad (PG)</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>

                {/* Search CTA Button - 4 cols with generous padding & NO TEXT CLIPPING */}
                <div className="sm:col-span-4 flex items-end">
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('all-courses');
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="w-full rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs uppercase tracking-wider py-3.5 px-3 sm:px-4 shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 group"
                  >
                    <Search className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">Find Courses ({allFilteredCourses.length})</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* DUAL DISCOVERY CARDS */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl text-left">
            {/* CARD A: OFFLINE COURSES (PRIMARY FOCUS) */}
            <div
              onClick={() => handleSelectModeAndScroll('offline')}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden group ${
                globalMode === 'offline'
                  ? 'bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 border-emerald-500 shadow-xl ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between mb-3 whitespace-nowrap">
                <span className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs whitespace-nowrap">
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  Primary Focus · Regular On-Campus
                </span>
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
                  {offlineCoursesCount} Programs
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                Regular Offline Degrees & Colleges
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Full-time on-campus degree programs offering direct faculty interaction, high-tech laboratory sessions, campus placements, hostel accommodation, and extracurricular clubs.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> 100% Physical Campus Life</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Hands-On Labs & Practicals</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> On-Campus Placement Drives</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> Hostel & Sports Complex</div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-emerald-700 uppercase tracking-wider group-hover:underline flex items-center gap-1">
                  Explore Regular Campus Courses <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] font-bold text-slate-400">UG & PG</span>
              </div>
            </div>

            {/* CARD B: ONLINE COURSES */}
            <div
              onClick={() => handleSelectModeAndScroll('online')}
              className={`p-6 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden group ${
                globalMode === 'online'
                  ? 'bg-gradient-to-br from-blue-50 via-white to-blue-50/40 border-blue-500 shadow-xl ring-2 ring-blue-500/20'
                  : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between mb-3 whitespace-nowrap">
                <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs whitespace-nowrap">
                  <Laptop className="w-3.5 h-3.5 shrink-0" />
                  Flexible Study · UGC-Approved
                </span>
                <span className="text-xs font-black text-blue-800 bg-blue-100 px-2.5 py-1 rounded-lg">
                  {onlineCoursesCount} Programs
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                UGC-Approved Online Degrees
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Accredited remote degree courses tailored for working professionals, remote learners, and budget-conscious students. Learn from top universities from the comfort of home.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> 100% Online LMS & Lectures</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Study at Your Own Schedule</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> UGC-DEB Equivalent Degree</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Affordable Semester Fees</div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-blue-700 uppercase tracking-wider group-hover:underline flex items-center gap-1">
                  Explore Online Degree Programs <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[11px] font-bold text-slate-400">UG & PG</span>
              </div>
            </div>
          </div>

          {/* Trust points strip */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-bold text-slate-700">
            <div className="flex items-center justify-center gap-1.5 bg-white py-2 px-3 rounded-xl border border-slate-200 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Direct University Fee</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 bg-white py-2 px-3 rounded-xl border border-slate-200 shadow-xs">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>100% Free Counselling</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 bg-white py-2 px-3 rounded-xl border border-slate-200 shadow-xs">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>UGC & AICTE Recognised</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 bg-white py-2 px-3 rounded-xl border border-slate-200 shadow-xs">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Since 2015 Experience</span>
            </div>
          </div>

        </div>
      </section>

<section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 text-white py-6 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                  Featured Admission Guide 2027–29
                </span>
                <span className="text-xs text-blue-200">Fact-Checked by StepWorld</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                MBA & PGDM Admission 2027–29 in India: Entrance Exams, Direct Admission & 28 Specializations
              </h3>
              <p className="text-xs text-blue-200 mt-0.5 max-w-3xl">
                Check CAT, XAT, SNAP, MAT, NMAT, CMAT exam dates, alternative direct admission pathways without CAT, fees & top college lists.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Link
              to="/blog/mba-pgdm-admission-2027-entrance-exams-direct-admission"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md transition-all whitespace-nowrap shrink-0"
            >
              <span>Read Full MBA Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

            {/* SECTION 1: COURSE CATEGORIES (CLEAN, USER-FRIENDLY & UNCLUTTERED) */}
      <section id="course-categories" className="w-full bg-white py-16 sm:py-20 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <Layers className="h-4 w-4 text-emerald-600" /> Academic Disciplines & Streams
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Explore 14 Disciplines for <span className={GRADIENT_TEXT}>On-Campus & Online Degrees</span>
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Browse your chosen field of study. Click <strong>Browse Courses</strong> to see verified programs, or click <strong>Curriculum</strong> to view the official UG/PG degree guide.
            </p>
          </div>

          {/* 14 CATEGORY TILES (CLEAN, BALANCED & RESPONSIVE) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {COURSE_STREAMS.map((stream) => {
              const Icon = stream.icon;
              const sampleDegrees = [
                ...stream.offlineUG.slice(0, 2),
                ...stream.offlinePG.slice(0, 1),
              ];

              return (
                <div
                  key={stream.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stream.bgLight} ${stream.accentColor} group-hover:scale-105 transition-transform`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        UG & PG
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                      {stream.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {stream.description}
                    </p>

                    {/* Popular Degrees */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {sampleDegrees.map((deg) => (
                        <span key={deg} className="text-[10px] font-bold bg-slate-50 text-slate-700 border border-slate-200 px-1.5 py-0.5 rounded">
                          {deg}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedStreamFilter(stream.id);
                        const el = document.getElementById('all-courses');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="text-xs font-black text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group-hover:underline cursor-pointer"
                    >
                      <span>Browse Courses</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setSyllabusModalStream(stream)}
                      className="text-[11px] font-bold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                      title="View StepWorld PDF Curriculum Breakdown"
                    >
                      Curriculum
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

{/* NEW SECTION: OFFLINE VS ONLINE MODE COMPARISON (MAKES IT SUPER EASY FOR USERS TO UNDERSTAND) */}
      <section id="mode-comparison" className="w-full bg-[#F0F7FF] py-16 sm:py-20 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="bg-blue-100 text-blue-800 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
              Decision Guide for Students & Parents
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Offline vs Online Courses: Which Mode is Right for You?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Compare regular campus programs with approved online degrees across key parameters so you make the best choice for your goals and budget.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-md">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-4 px-5 font-bold w-1/4">Key Factor</th>
                  <th className="py-4 px-5 font-bold w-3/8 text-emerald-400">
                    🏫 Offline Courses (On-Campus)
                  </th>
                  <th className="py-4 px-5 font-bold w-3/8 text-sky-400">
                    💻 Approved Online Courses
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-5 font-bold text-slate-900">Learning Mode</td>
                  <td className="py-3.5 px-5 text-slate-700">Daily physical classroom lectures, practical labs & workshops</td>
                  <td className="py-3.5 px-5 text-slate-700">Live virtual classes, recorded video modules & interactive LMS</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-slate-50/40">
                  <td className="py-3.5 px-5 font-bold text-slate-900">Campus & Hostel</td>
                  <td className="py-3.5 px-5 text-slate-700">Full campus experience, hostel stay, sports & annual fests</td>
                  <td className="py-3.5 px-5 text-slate-700">Study from home, zero hostel or relocation costs</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-5 font-bold text-slate-900">Schedule Flexibility</td>
                  <td className="py-3.5 px-5 text-slate-700">Fixed timetable with mandatory 75% attendance</td>
                  <td className="py-3.5 px-5 text-slate-700">100% flexible, study anytime after office hours or on weekends</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-slate-50/40">
                  <td className="py-3.5 px-5 font-bold text-slate-900">Placements & Network</td>
                  <td className="py-3.5 px-5 text-slate-700">Direct on-campus recruitment drives & alumni meetups</td>
                  <td className="py-3.5 px-5 text-slate-700">Virtual job fairs, placement assistance & corporate hiring portal</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="py-3.5 px-5 font-bold text-slate-900">Degree Recognition</td>
                  <td className="py-3.5 px-5 text-slate-700">UGC, AICTE, NMC, BCI, PCI, COA accredited</td>
                  <td className="py-3.5 px-5 text-slate-700">UGC-DEB approved, NAAC A+ accredited, equivalent degree value</td>
                </tr>
                <tr className="hover:bg-slate-50/80 bg-slate-50/40">
                  <td className="py-3.5 px-5 font-bold text-slate-900">Best Suited For</td>
                  <td className="py-3.5 px-5 text-slate-700">Fresh 12th passouts & graduates seeking immersive college life</td>
                  <td className="py-3.5 px-5 text-slate-700">Working professionals, remote learners & budget-conscious students</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleSelectModeAndScroll('offline')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider whitespace-nowrap"
            >
              <Building2 className="w-4 h-4" />
              <span>Explore Offline Campus Degrees ({offlineCoursesCount})</span>
            </button>
            <button
              onClick={() => handleSelectModeAndScroll('online')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all text-xs uppercase tracking-wider whitespace-nowrap"
            >
              <Laptop className="w-4 h-4" />
              <span>Explore Online Degrees ({onlineCoursesCount})</span>
            </button>
          </div>
        </div>
      </section>

            {/* SECTION 2: ALL COURSES DIRECTORY */}
      <section id="all-courses" className="w-full bg-[#F8FAFC] py-16 sm:py-20 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 text-sky-800 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-2">
                <BookOpen className="h-4 w-4 text-sky-600" /> Programs Catalog
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                All Available <span className="text-emerald-700">Offline & Online Courses</span>
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Explore accredited undergraduate & postgraduate programs across partnered universities.
              </p>
            </div>

            {/* Mode filter buttons */}
            <div className="inline-flex rounded-2xl bg-white p-1.5 border border-slate-200 shadow-sm whitespace-nowrap">
              <button
                onClick={() => setGlobalMode('offline')}
                className={`px-4 py-2 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  globalMode === 'offline'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                <span>Offline ({offlineCoursesCount})</span>
              </button>
              <button
                onClick={() => setGlobalMode('online')}
                className={`px-4 py-2 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  globalMode === 'online'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Laptop className="w-3.5 h-3.5 shrink-0" />
                <span>Online ({onlineCoursesCount})</span>
              </button>
              <button
                onClick={() => setGlobalMode('all')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  globalMode === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                All ({courses.length})
              </button>
            </div>
          </div>

          {/* STREAM CATEGORY FILTER PILLS - 1-TAP FILTERING */}
          <div className="mb-6 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-2 min-w-max">
              <button
                type="button"
                onClick={() => setSelectedStreamFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedStreamFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                All Disciplines
              </button>
              {COURSE_STREAMS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedStreamFilter(s.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedStreamFilter === s.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Level filters */}
          <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                placeholder="Search by degree title, college or field (e.g. B.Tech, MBA, MCA, MBBS, B.Com, Design)..."
                className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 shadow-xs"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto whitespace-nowrap">
              <button
                onClick={() => setSelectedLevel('all')}
                className={`flex-1 sm:flex-none rounded-xl px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
                  selectedLevel === 'all' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                All Levels
              </button>
              <button
                onClick={() => setSelectedLevel('ug')}
                className={`flex-1 sm:flex-none rounded-xl px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
                  selectedLevel === 'ug' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                UG Degrees
              </button>
              <button
                onClick={() => setSelectedLevel('pg')}
                className={`flex-1 sm:flex-none rounded-xl px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
                  selectedLevel === 'pg' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                PG Degrees
              </button>
            </div>
          </div>

          {/* ACTIVE FILTER BADGE */}
          {(selectedStreamFilter !== 'all' || courseSearch.trim()) && (
            <div className="mb-6 flex items-center gap-2 text-xs text-slate-600 bg-slate-100 p-2.5 rounded-xl border border-slate-200">
              <span className="font-bold">Active Filter:</span>
              {selectedStreamFilter !== 'all' && (
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                  {COURSE_STREAMS.find(s => s.id === selectedStreamFilter)?.name}
                </span>
              )}
              {courseSearch.trim() && (
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">
                  "{courseSearch}"
                </span>
              )}
              <button
                onClick={() => { setSelectedStreamFilter('all'); setCourseSearch(''); }}
                className="ml-auto text-rose-600 hover:text-rose-800 font-bold underline cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* COURSE CARDS GRID */}
          {allFilteredCourses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
              No courses matched your current filter criteria.
              <button
                onClick={() => { setCourseSearch(''); setSelectedLevel('all'); setGlobalMode('all'); setSelectedStreamFilter('all'); }}
                className="ml-2 font-bold text-emerald-700 underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {(showAllCourses ? allFilteredCourses : allFilteredCourses.slice(0, 8)).map((crs) => {
                  const col = crs.college ?? collegeById[crs.collegeId];
                  const isOffline = getCourseMode(crs) === 'offline';
                  return (
                    <Link
                      key={crs.id}
                      to={col ? `/university/${col.slug}/${crs.slug}` : `/university`}
                      className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-emerald-400 hover:shadow-md transition-all group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          {col && <CollegeLogo initials={col.initials} color={col.logoGradient} size="sm" />}
                          <div className="flex flex-col items-end gap-1">
                            <span
                              className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider whitespace-nowrap ${
                                isOffline
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : 'bg-sky-100 text-sky-800 border border-sky-200'
                              }`}
                            >
                              {isOffline ? '🏫 Offline Course' : '💻 Online Course'}
                            </span>
                            {crs.stream && (
                              <span className="text-[10px] text-slate-500 font-bold">{crs.stream}</span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-slate-500 font-semibold">{col?.shortName ?? col?.name}</p>
                        <h4 className="text-base font-extrabold text-slate-900 mt-1 group-hover:text-emerald-700 transition-colors line-clamp-1">
                          {crs.title}
                        </h4>
                        {crs.specializations && (
                          <p className="text-[11px] text-slate-500 mt-2 line-clamp-1">
                            ⚡ {crs.specializations}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-extrabold text-slate-900">{crs.fee}</span>
                          <span className="text-slate-500 ml-1">({crs.duration})</span>
                        </div>
                        <span className="font-bold text-emerald-700 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                          View <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* SHOW MORE / LESS TOGGLE */}
              {allFilteredCourses.length > 8 && (
                <div className="mt-10 text-center">
                  <button
                    type="button"
                    onClick={() => setShowAllCourses(!showAllCourses)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white border border-slate-300 px-6 py-3 text-xs font-black uppercase tracking-wider text-slate-800 shadow-sm hover:bg-slate-50 hover:border-slate-400 transition-all cursor-pointer"
                  >
                    <span>{showAllCourses ? 'Show Fewer Courses ↑' : `Show All ${allFilteredCourses.length} Courses ↓`}</span>
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </section>

{/* SECTION 3: TOP UNIVERSITIES & CAMPUSES (LIGHT THEME) */}
      <section id="colleges" className="w-full bg-[#F0F7FF] py-16 sm:py-20 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-blue-700 border border-blue-200 mb-2">
                <Building2 className="h-4 w-4 text-blue-600" /> Accredited Institutions
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Top Universities Offering <span className={GRADIENT_TEXT}>Offline & Online Courses</span>
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Explore recognized campus universities across India and leading UGC-approved online degree providers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {safeColleges
              .filter((col) => (globalMode === 'all' ? true : getCollegeMode(col) === globalMode))
              .map((col) => {
                const isOffline = getCollegeMode(col) === 'offline';
                return (
                  <article
                    key={col.id}
                    className="rounded-2xl border border-blue-100 bg-white p-5 flex flex-col justify-between hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <CollegeLogo initials={col.initials} color={col.logoGradient} size="lg" />
                        <div className="text-right">
                          <span
                            className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                              isOffline
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-sky-100 text-sky-800'
                            }`}
                          >
                            {isOffline ? '🏫 Campus' : '💻 Online'}
                          </span>
                          <div className="text-xs font-black text-amber-600 mt-1">★ {col.rating}</div>
                        </div>
                      </div>

                      <h4 className="text-base font-black text-slate-900 leading-snug line-clamp-2">{col.name}</h4>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" /> {col.location}
                      </p>

                      {isOffline && col.campusSize && (
                        <div className="mt-3 rounded-lg bg-emerald-50 border border-emerald-100 p-2 text-[11px] font-bold text-emerald-900">
                          🏛️ {col.campusSize}
                          {col.avgPackage && <span className="block text-emerald-700 mt-0.5">💼 Avg Package: {col.avgPackage}</span>}
                        </div>
                      )}

                      {!isOffline && (
                        <div className="mt-3 rounded-lg bg-sky-50 border border-sky-100 p-2 text-[11px] font-bold text-sky-900">
                          💻 100% Online Delivery · UGC-DEB Approved
                        </div>
                      )}

                      <p className="text-xs text-slate-500 mt-3 font-semibold">
                        {col.courses.length} courses available
                      </p>
                    </div>

                    <Link
                      to={`/university/${col.slug}`}
                      className="mt-4 block w-full rounded-xl border-2 border-blue-600 bg-white py-2 text-center text-xs font-black uppercase tracking-wider text-blue-700 hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      View Details & Courses →
                    </Link>
                  </article>
                );
              })}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE STEPWORLD? (LIGHT THEME - EXACT USER COPY) */}
      <section id="why-choose" className="w-full bg-white py-16 sm:py-20 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="h-4 w-4 text-emerald-600" /> About Our Consultancy
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Why Choose StepWorld?
            </h2>
            <p className="mt-2 text-xl font-extrabold text-emerald-700">
              Your Trusted Education Partner Since 2015
            </p>
            <p className="mt-3 text-base text-slate-600">
              Experience, expertise, and complete educational support — helping you make the right choice for a brighter academic future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* PILLAR 1: EXPERIENCE */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 flex flex-col justify-between hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 border border-emerald-200 mb-6">
                  <Clock className="h-7 w-7" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-emerald-700">1. Experience</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Since 2015 — A Decade of Experience in Education Consultancy
                </h3>
                <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                  With years of experience in the education consultancy sector, StepWorld has been helping students make informed decisions about their education and career. Since 2015, our focus has been on understanding students' individual needs and guiding them towards suitable universities, courses, and educational opportunities.
                </p>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  We understand the challenges students and parents face while choosing the right course, university, and mode of education. Our experience helps us make this journey easier, clearer, and more convenient.
                </p>
              </div>
            </div>

            {/* PILLAR 2: EXPERTISE */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 flex flex-col justify-between hover:bg-white hover:border-blue-300 hover:shadow-md transition-all">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700 border border-blue-200 mb-6">
                  <Award className="h-7 w-7" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-blue-700">2. Expertise</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Professional Counselling. Expert Guidance. Better Decisions.
                </h3>
                <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                  At StepWorld, we believe that every student's educational journey is unique. Our experienced counselling team provides personalized support to help students choose the right academic path according to their background, goals, and budget.
                </p>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  We assist students in understanding university recognition, course details, eligibility criteria, fee structures, and future career opportunities so that they can make confident and well-informed choices.
                </p>
              </div>
            </div>

            {/* PILLAR 3: COMPLETE SUPPORT */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 flex flex-col justify-between hover:bg-white hover:border-purple-300 hover:shadow-md transition-all">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 border border-purple-200 mb-6">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-purple-700">3. Complete Support</span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  From Counselling to Admission, We Guide You at Every Step.
                </h3>
                <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                  StepWorld provides comprehensive educational counselling and admission assistance to make the admission journey smooth and hassle-free. From the initial counselling session and university selection to application support and admission guidance, our team remains connected with students throughout the process.
                </p>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Our services cover online degree programs, distance education, and regular offline and campus-based programs, ensuring that students get reliable support regardless of their preferred mode of learning.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

            {/* SECTION 5: FAQS (INTERACTIVE ACCORDION - CLEAN & COMPACT) */}
      <section id="faqs" className="w-full bg-[#F8FAFC] py-16 sm:py-20 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-slate-200/80 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-slate-700 mb-3">
              📝 Essential Student Information
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Clear, transparent, and honest answers about StepWorld and our counselling methodology.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: '1. What is StepWorld?',
                a: 'StepWorld is a professional education consultancy established in 2015, committed to helping students build a successful academic and professional future. We provide expert counselling, personalized career guidance, university selection, course recommendations, and complete admission assistance.\n\nWhether you are planning to pursue an online degree, distance education, or a regular on-campus program, our experienced counsellors help you understand your options and choose the right path according to your educational qualifications, interests, career goals, and budget.\n\nOur aim is to make the entire education journey simple, transparent, and convenient by providing the right information and guidance at every step.',
              },
              {
                q: '2. How is StepWorld different from other education consultancies?',
                a: 'At StepWorld, we believe that every student has different educational needs, interests, and career aspirations. Therefore, we do not believe in a one-size-fits-all approach.\n\nWe provide personalized counselling and expert guidance to help students identify the right university and course. Our team explains important details such as university recognition, course structure, eligibility requirements, admission procedures, fee structures, learning methods, and future career opportunities.\n\nWe assist students with both online and offline education options, helping them understand the benefits of each mode before making a decision.\n\nOur focus is not just on helping students get admission but also on helping them make the right educational choices for their long-term career growth.',
              },
              {
                q: '3. How is StepWorld independent?',
                a: "StepWorld believes in honest, transparent, and student-focused educational counselling. We understand that choosing a university and course is an important decision that can shape a student's future.\n\nOur counsellors take the time to understand each student's academic background, career interests, personal preferences, and financial requirements before suggesting suitable options.\n\nWe help students compare different universities and colleges based on important factors such as recognition, course quality, academic facilities, faculty, fee structure, student feedback, placement opportunities, and career prospects.\n\nOur objective is to provide clear information and practical guidance so that students can make their own informed decisions without unnecessary confusion or pressure.",
              },
              {
                q: '4. Why should students trust StepWorld?',
                a: 'StepWorld has been serving students in the education consultancy sector since 2015. Over the years, our commitment has remained focused on providing proper counselling, expert guidance, and reliable admission assistance.\n\nWe understand that students and parents often have many questions when selecting a university, choosing a course, or planning their future careers. Our experienced counsellors help them understand the available opportunities and make confident decisions.\n\nFrom the initial counselling session and university selection to application assistance and admission-related support, we guide students throughout the process.\n\nWe believe in building long-term trust through honest communication, personalized attention, transparent information, and a student-first approach.',
              },
              {
                q: '5. Does StepWorld charge for its services?',
                a: 'StepWorld believes that every student deserves proper educational guidance and counselling before making an important academic decision.\n\nWe explain our counselling and consultancy services clearly so that students understand the assistance available to them. Any applicable consultancy or service charges are communicated transparently before proceeding.\n\nUniversity tuition fees, examination fees, and other academic charges are separate from consultancy charges and depend on the selected university and course.\n\nOur priority is to make the admission journey smooth, convenient, and transparent for every student.',
              },
              {
                q: '6. Do payments go directly to the university?',
                a: 'Yes. University admission fees, tuition fees, examination fees, and other academic payments should be made directly to the respective university or college through their official payment modes.\n\nStepWorld assists students with the admission process and provides guidance regarding university fee structures, payment procedures, and necessary documentation.\n\nWe always encourage students and parents to ensure that all university-related fees are deposited directly to the official university accounts or official admission portals.',
              },
            ].map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-slate-300 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 text-emerald-800">
                      {faq.q}
                    </h3>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-700 leading-relaxed whitespace-pre-line border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

{/* SECTION 6: CONTACT & GOOGLE MAPS (LIGHT THEME) */}
      <section id="contact-location" className="w-full bg-white py-16 sm:py-20 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            <div>
              <div className="inline-flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-800 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-3">
                <MapPin className="h-4 w-4 text-rose-600" /> Visit Our Office
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Get In Touch With Our <span className="text-emerald-700">Career Advisors</span>
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Meet our senior educational consultants in person for personalized one-on-one career counseling, campus shortlist verification, and direct admission assistance.
              </p>

              <div className="mt-8 space-y-4">

                <div className="flex items-start gap-3.5 rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <MapPin className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Office Location & Directions</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Find us easily on Google Maps for in-person consultation.</p>
                    <a
                      href="https://maps.app.goo.gl/ZQknF8MaBnbiPCnw5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3.5 py-1.5 text-xs font-black text-white shadow-xs hover:bg-rose-700 whitespace-nowrap"
                    >
                      <MapPin className="h-3.5 w-3.5" /> Open Google Maps <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
                  <MessageCircle className="h-5 w-5 text-emerald-600 shrink-0 fill-current" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Direct WhatsApp Admissions</h4>
                    <a
                      href="https://wa.me/919910245535?text=Hi%20StepWorld,%20I%20would%20like%20to%20get%20free%20admission%20counselling"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-extrabold text-emerald-700 hover:underline"
                    >
                      +91 99102 45535 (Instant Response)
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <Phone className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Toll-Free Helpline</h4>
                    <a href="tel:18004200000" className="text-sm font-extrabold text-emerald-700 hover:underline">
                      1800-420-0000
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <Mail className="h-5 w-5 text-sky-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Email Advisory</h4>
                    <a href="mailto:info@stepworld.com" className="text-xs text-slate-600 hover:text-slate-900 font-medium">
                      info@stepworld.com
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* MAP CARD */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 shadow-xs relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <StepWorldLogo height={48} />
                  <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-black">
                    Open Mon - Sat
                  </span>
                </div>
                <h4 className="text-lg font-black text-slate-900">StepWorld Educational Office</h4>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Visit us in person or get real-time GPS driving directions directly on Google Maps.
                </p>
              </div>

              {/* Interactive Google Map Embed */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.6701651677167!2d77.31935039999999!3d28.5796656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5cf02902e7f%3A0xd6544a39f18aa38b!2sStepWorld%20Education!5e0!3m2!1sen!2sin!4v1795074362324!5m2!1sen!2sin"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="StepWorld Education Office Google Map Location"
                  className="w-full h-64 sm:h-72"
                />
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <a
                  href="https://maps.app.goo.gl/ZQknF8MaBnbiPCnw5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-orange-600 px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md hover:from-rose-700 hover:to-orange-700 transition-all whitespace-nowrap"
                >
                  <ExternalLink className="h-4 w-4" /> Open in Google Maps App
                </a>
                <a
                  href="https://wa.me/919910245535?text=Hi%20StepWorld,%20I%20would%20like%20to%20visit%20your%20office%20for%20admission%20counselling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 text-xs font-black uppercase tracking-wider shadow-md transition-all whitespace-nowrap"
                >
                  <MessageCircle className="h-4 w-4 fill-current" /> Book Office Visit
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="inline-block">
                <img
                  src="/stepworld-logo.jpg"
                  alt="StepWorld"
                  className="h-16 w-auto object-contain rounded-xl shadow-xs"
                />
              </Link>
              <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
                Step Your Career With Us · Established 2015
              </p>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Professional education consultancy helping students with university selection, regular on-campus offline courses, and UGC-approved online degree programs.
              </p>
              <div className="pt-2">
                <a
                  href="https://maps.app.goo.gl/ZQknF8MaBnbiPCnw5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300 whitespace-nowrap"
                >
                  <MapPin className="h-3.5 w-3.5" /> View on Google Maps →
                </a>
              </div>

              {/* SOCIAL MEDIA CHANNELS */}
              <div className="pt-3">
                <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">Connect On Social Media</p>
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
              <h4 className="text-white font-bold text-sm mb-3">Offline Courses (Campus)</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#course-categories" onClick={() => { setSelectedStreamFilter('engineering'); setGlobalMode('offline'); }} className="hover:text-white">B.Tech & M.Tech</a></li>
                <li><a href="#course-categories" onClick={() => { setSelectedStreamFilter('medical-healthcare'); setGlobalMode('offline'); }} className="hover:text-white">MBBS, BDS, Nursing & Pharmacy</a></li>
                <li><a href="#course-categories" onClick={() => { setSelectedStreamFilter('management'); setGlobalMode('offline'); }} className="hover:text-white">Regular MBA, PGDM, BBA</a></li>
                <li><a href="#course-categories" onClick={() => { setSelectedStreamFilter('law'); setGlobalMode('offline'); }} className="hover:text-white">LL.B, BA-LL.B, LL.M</a></li>
                <li><a href="#course-categories" onClick={() => { setSelectedStreamFilter('design'); setGlobalMode('offline'); }} className="hover:text-white">B.Des & B.Arch Architecture</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-3">Online Courses</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#course-categories" onClick={() => { setSelectedStreamFilter('management'); setGlobalMode('online'); }} className="hover:text-white">Online MBA & PGDM</a></li>
                <li><a href="#course-categories" onClick={() => { setSelectedStreamFilter('computer-it'); setGlobalMode('online'); }} className="hover:text-white">Online BCA & MCA</a></li>
                <li><a href="#course-categories" onClick={() => { setSelectedStreamFilter('commerce'); setGlobalMode('online'); }} className="hover:text-white">Online B.Com & M.Com</a></li>
                <li><a href="#course-categories" onClick={() => { setSelectedStreamFilter('arts-humanities'); setGlobalMode('online'); }} className="hover:text-white">Online B.A. & M.A.</a></li>
                <li><a href="#course-categories" onClick={() => { setSelectedStreamFilter('medical-healthcare'); setGlobalMode('online'); }} className="hover:text-white">Online Hospital Admin (MHA)</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-3">Featured Guides & Nav</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    to="/blog/mba-pgdm-admission-2027-entrance-exams-direct-admission"
                    className="text-amber-400 font-bold hover:underline whitespace-nowrap"
                  >
                    🔥 MBA Admission 2027 Guide
                  </Link>
                </li>
                <li><a href="#course-categories" className="hover:text-white">Course Categories</a></li>
                <li><a href="#mode-comparison" className="hover:text-white">Offline vs Online Comparison</a></li>
                <li><a href="#all-courses" className="hover:text-white">All Courses List</a></li>
                <li><a href="#colleges" className="hover:text-white">Top Universities</a></li>
                <li><a href="#why-choose" className="hover:text-white">Why StepWorld</a></li>
                <li><a href="#faqs" className="hover:text-white">FAQ</a></li>
                
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© 2015–{new Date().getFullYear()} StepWorld Education Consultancy. All Rights Reserved.</p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="https://wa.me/919910245535" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-bold">
                WhatsApp
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

      {/* CURRICULUM SYLLABUS MODAL - STEPWORLD OFFICIAL CATALOG BREAKDOWN */}
      {syllabusModalStream && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
            <button
              type="button"
              onClick={() => setSyllabusModalStream(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${syllabusModalStream.bgLight} ${syllabusModalStream.accentColor}`}>
                {React.createElement(syllabusModalStream.icon, { className: 'h-6 w-6' })}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Curriculum Guide
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-0.5">{syllabusModalStream.name}</h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              {syllabusModalStream.description} Below is the degree catalog from StepWorld's official educational guides for both modes:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Box 1: Regular On-Campus */}
              <div className="p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/30">
                <div className="flex items-center gap-1.5 mb-2.5 text-emerald-900 font-black text-xs uppercase tracking-wide">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>🏫 Regular On-Campus</span>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="block font-bold text-slate-700 mb-1">Undergraduate (UG):</span>
                    <div className="flex flex-wrap gap-1">
                      {syllabusModalStream.offlineUG.map(ug => (
                        <span key={ug} className="bg-white border border-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded text-[11px]">
                          {ug}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-700 mb-1">Postgraduate (PG):</span>
                    <div className="flex flex-wrap gap-1">
                      {syllabusModalStream.offlinePG.map(pg => (
                        <span key={pg} className="bg-white border border-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded text-[11px]">
                          {pg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 2: Approved Online */}
              <div className="p-4 rounded-2xl border-2 border-blue-200 bg-blue-50/30">
                <div className="flex items-center gap-1.5 mb-2.5 text-blue-900 font-black text-xs uppercase tracking-wide">
                  <Laptop className="w-4 h-4 text-blue-600" />
                  <span>💻 Approved Online</span>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="block font-bold text-slate-700 mb-1">Undergraduate (UG):</span>
                    <div className="flex flex-wrap gap-1">
                      {syllabusModalStream.onlineUG.map(oug => (
                        <span key={oug} className="bg-white border border-blue-200 text-blue-900 font-bold px-2 py-0.5 rounded text-[11px]">
                          {oug}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-700 mb-1">Postgraduate (PG):</span>
                    <div className="flex flex-wrap gap-1">
                      {syllabusModalStream.onlinePG.map(opg => (
                        <span key={opg} className="bg-white border border-blue-200 text-blue-900 font-bold px-2 py-0.5 rounded text-[11px]">
                          {opg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedStreamFilter(syllabusModalStream.id);
                  setSyllabusModalStream(null);
                  const el = document.getElementById('all-courses');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="w-full sm:flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-3 px-4 text-center cursor-pointer transition-colors shadow-sm"
              >
                Explore {syllabusModalStream.name} Courses →
              </button>
              <button
                type="button"
                onClick={() => setSyllabusModalStream(null)}
                className="w-full sm:w-auto rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 px-4 cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STICKY BOTTOM ACTION BAR FOR MOBILE (SM:HIDDEN) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 shadow-2xl flex items-center gap-2 sm:hidden">
        <a
          href="https://wa.me/919910245535?text=Hi%20StepWorld,%20I%20would%20like%20to%20get%20free%20admission%20counselling"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-xl bg-emerald-600 text-white text-xs font-black py-2.5 px-3 flex items-center justify-center gap-1.5 shadow-xs"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp: 99102 45535</span>
        </a>
        <a
          href="tel:18004200000"
          className="flex-1 rounded-xl bg-slate-900 text-white text-xs font-black py-2.5 px-3 flex items-center justify-center gap-1.5 shadow-xs"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-400" />
          <span>1800-420-0000</span>
        </a>
      </div>
    </div>
  );
};

export default StepWorldHomepage;
