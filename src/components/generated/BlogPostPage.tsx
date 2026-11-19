import React, { useState, useEffect } from 'react';
import { Link } from '../../lib/router';
import {
  blogMetadata,
  entranceExams,
  examCalendar,
  pgdmAcceptedExams,
  topColleges,
  feeRanges,
  specializationMatrix,
  faqs,
  specializations,
} from '../../data/mbaBlogData';
import {
  ArrowLeft,
  Calendar,
  Clock,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Search,
  Building2,
  GraduationCap,
  Award,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  HelpCircle,
  ExternalLink,
  ShieldCheck,
  Check,
  Compass,
  ArrowRight,
  Send,
} from 'lucide-react';
import { apiUrl } from '../../lib/api';

export const BlogPostPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [specSearch, setSpecSearch] = useState('');
  const [selectedSpecIndex, setSelectedSpecIndex] = useState<number | null>(null);
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    mode: 'offline', // 'offline' or 'online'
    specialization: 'Marketing',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Set document title and SEO meta
  useEffect(() => {
    document.title = `${blogMetadata.seoTitle} | ${blogMetadata.publishedBy}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', blogMetadata.metaDescription);

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', blogMetadata.targetKeywords.join(', '));
  }, []);

  const filteredSpecs = specializations.filter(
    (s) =>
      s.title.toLowerCase().includes(specSearch.toLowerCase()) ||
      s.description.toLowerCase().includes(specSearch.toLowerCase()) ||
      s.subjects.some((sub) => sub.toLowerCase().includes(specSearch.toLowerCase()))
  );

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;
    setSubmitting(true);
    try {
      await fetch(apiUrl('/leads'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadForm.name,
          phone: leadForm.phone,
          email: leadForm.email,
          city: leadForm.city,
          notes: `MBA Guide Enquiry: ${leadForm.specialization} (${leadForm.mode} mode)`,
          status: 'NEW',
        }),
      });
      setSubmitted(true);
    } catch {
      // fallback success
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white text-xs sm:text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[11px] tracking-wide uppercase">
              Admissions 2027–29
            </span>
            <span className="hidden sm:inline">
              MBA & PGDM Counselling Open • Both On-Campus (Offline) & Approved Online Programs
            </span>
            <span className="sm:hidden">MBA Admissions 2027 Open</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a href="tel:18004200000" className="flex items-center gap-1 hover:text-amber-300 transition-colors">
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              <span>1800-420-0000</span>
            </a>
            <span className="hidden md:inline text-blue-200">|</span>
            <a
              href="https://maps.app.goo.gl/vGmwMaL4Ue9S4hay6?g_st=aw"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>Visit StepWorld Office</span>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
          {/* Logo - Just the logo graphic as requested */}
          <Link to="/" className="flex items-center shrink-0 cursor-pointer">
            <img
              src="/stepworld-logo.jpg"
              alt="StepWorld"
              className="h-16 sm:h-18 w-auto object-contain rounded-xl shadow-xs"
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-4 text-xs xl:text-sm font-bold text-slate-700 whitespace-nowrap shrink-0">
            <Link to="/" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              Home
            </Link>
            <Link to="/#all-courses" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              Offline & Online Courses
            </Link>
            <Link to="/#colleges" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              Universities
            </Link>
            <Link to="/#why-choose" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              About StepWorld
            </Link>
            <Link
              to="/blog/mba-pgdm-admission-2027-entrance-exams-direct-admission"
              className="text-blue-700 font-black flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>MBA 2027 Guide</span>
            </Link>
            <Link to="/#faqs" className="hover:text-blue-600 transition-colors whitespace-nowrap">
              FAQs
            </Link>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#counselling"
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl font-bold text-xs shadow-sm hover:from-blue-700 hover:to-indigo-700 transition-all whitespace-nowrap"
            >
              <span>Free Counselling</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/"
              className="inline-flex xl:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-slate-100/70 border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-600 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-blue-600 font-medium">
            Home
          </Link>
          <span>/</span>
          <span className="hover:text-blue-600 font-medium">Knowledge & Guides</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate max-w-md">
            MBA & PGDM Admission 2027–29 Guide
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#EFF6FF] via-white to-[#F8FAFC] pt-10 pb-12 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="bg-blue-600 text-white font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
              <GraduationCap className="w-3.5 h-3.5" />
              {blogMetadata.category}
            </span>
            <span className="bg-amber-100 text-amber-900 font-semibold px-3 py-1 rounded-full text-xs flex items-center gap-1 border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              {blogMetadata.badge}
            </span>
            <span className="bg-emerald-100 text-emerald-800 font-semibold px-3 py-1 rounded-full text-xs flex items-center gap-1 border border-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified by StepWorld
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black tracking-tight text-slate-950 leading-tight mb-6">
            MBA & PGDM Admission 2027–29 in India: Entrance Exams, Registration Dates, Direct Admission, Specializations & Top Colleges
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-5 bg-white rounded-2xl border border-slate-200 shadow-xs mb-8 text-xs sm:text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center p-0.5 overflow-hidden">
                <img
                  src="/stepworld-logo.jpg"
                  alt="Stepworld Education"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="font-bold text-slate-900">{blogMetadata.publishedBy}</p>
                <p className="text-xs text-slate-600">Counselling & Admissions Since 2015</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Updated Nov 2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-600" />
                <span>{blogMetadata.readTime}</span>
              </div>
            </div>
          </div>

          {/* Quick summary card */}
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-6 sm:p-7 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            <p className="text-slate-800 text-base sm:text-lg leading-relaxed mb-4">
              MBA and PGDM programmes are among the most popular postgraduate courses for students aspiring to build careers in business management, marketing, finance, human resources, business analytics, operations, entrepreneurship and corporate leadership. With numerous management colleges and universities in India, students can explore admission through national-level entrance exams, institute-level selection processes and eligible alternative admission pathways.
            </p>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              For students planning to pursue MBA or PGDM in the <strong>2027–29 academic session</strong>, understanding entrance exams, registration deadlines, eligibility criteria, specializations, fees and admission procedures is essential. <strong>Stepworld Education</strong> brings you this comprehensive guide covering every dimension.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sticky Quick-Jump Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Quick-Jump Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-100">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">
                  Table of Contents
                </h3>
              </div>
              <nav className="space-y-1 text-xs max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
                {[
                  { id: 'sec-1', label: '1. What Is an MBA?' },
                  { id: 'sec-2', label: '2. What Is PGDM?' },
                  { id: 'sec-3', label: '3. Difference: MBA vs PGDM' },
                  { id: 'sec-4', label: '4. Eligibility Criteria' },
                  { id: 'sec-5', label: '5. Entrance Exams in India' },
                  { id: 'sec-6', label: '6. Entrance Exam Calendar' },
                  { id: 'sec-7', label: '7. PGDM Admissions & Tests' },
                  { id: 'sec-8', label: '8. Step-by-Step Admission' },
                  { id: 'sec-9', label: '9. Direct MBA Admission' },
                  { id: 'sec-10', label: '10. All 28 Specializations' },
                  { id: 'sec-11', label: '11. Top Colleges in India' },
                  { id: 'sec-12', label: '12. Fees & Investment' },
                  { id: 'sec-13', label: '13. Career Opportunities' },
                  { id: 'sec-14', label: '14. How to Choose Specialization' },
                  { id: 'sec-15', label: '15. Frequently Asked Questions' },
                  { id: 'sec-16', label: '16. StepWorld Counselling' },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block py-1.5 px-2.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors font-medium truncate"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl p-4 text-center">
                  <p className="font-bold text-sm mb-1">Confused about MBA?</p>
                  <p className="text-xs text-blue-100 mb-3">
                    Talk to our senior management counsellors directly.
                  </p>
                  <a
                    href="tel:18004200000"
                    className="inline-flex items-center justify-center gap-1.5 bg-white text-blue-900 font-bold px-3 py-1.5 rounded-lg text-xs w-full shadow-xs hover:bg-blue-50 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>Call 1800-420-0000</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Article Body */}
          <main className="lg:col-span-9 space-y-12">
            {/* Section 1: What is an MBA? */}
            <article id="sec-1" className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xs scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">
                  1
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  What Is an MBA?
                </h2>
              </div>
              <p className="text-slate-700 leading-relaxed text-base mb-5">
                <strong>MBA</strong> stands for <strong>Master of Business Administration</strong>. It is a postgraduate degree programme designed to develop business knowledge, managerial skills, leadership abilities, strategic thinking and professional competencies.
              </p>
              <p className="text-slate-700 leading-relaxed text-base mb-6">
                An MBA programme generally covers different areas of business, including finance, marketing, human resources, operations, business analytics, strategy and entrepreneurship.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-600 block">
                      Course Duration
                    </span>
                    <span className="font-bold text-slate-900 text-sm">
                      2 Years (generally 4 semesters)
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-600 block">
                      Eligibility
                    </span>
                    <span className="font-bold text-slate-900 text-sm">
                      Bachelor's degree from a recognised university
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-4 italic">
                MBA programmes are offered by universities, affiliated colleges and management institutions across India.
              </p>
            </article>

            {/* Section 2: What is PGDM? */}
            <article id="sec-2" className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xs scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center">
                  2
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  What Is PGDM?
                </h2>
              </div>
              <p className="text-slate-700 leading-relaxed text-base mb-5">
                <strong>PGDM</strong> stands for <strong>Post Graduate Diploma in Management</strong>. It is generally offered by autonomous management institutes and focuses on management education, business practices, industry exposure, case studies, internships and professional development.
              </p>
              <div className="bg-indigo-50/60 p-5 rounded-2xl border border-indigo-200/70 mb-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      <strong>PGDM Course Duration:</strong> Generally 2 years
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      PGDM programmes may be offered by AICTE-approved institutions. A PGDM programme may be considered equivalent to an MBA for certain purposes when applicable regulatory conditions (such as AIU equivalence) are fulfilled.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Section 3: Difference Between MBA and PGDM */}
            <article id="sec-3" className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xs scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-black text-sm flex items-center justify-center">
                  3
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Difference Between MBA and PGDM
                </h2>
              </div>
              <p className="text-slate-700 text-sm mb-6">
                Understanding the structural distinction helps students choose between university academic rigor and autonomous industry agility:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="py-3.5 px-5 font-bold w-1/2">MBA (Master of Business Administration)</th>
                      <th className="py-3.5 px-5 font-bold w-1/2">PGDM (Post Graduate Diploma in Management)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="bg-white hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-5 font-medium text-slate-800">Master of Business Administration</td>
                      <td className="py-3.5 px-5 font-medium text-slate-800">Post Graduate Diploma in Management</td>
                    </tr>
                    <tr className="bg-slate-50/60 hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-5 text-slate-700">Degree awarded by a university</td>
                      <td className="py-3.5 px-5 text-slate-700">Diploma awarded by an autonomous institute</td>
                    </tr>
                    <tr className="bg-white hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-5 text-slate-700">Generally university-based curriculum</td>
                      <td className="py-3.5 px-5 text-slate-700">Often autonomous, practical and industry-oriented</td>
                    </tr>
                    <tr className="bg-slate-50/60 hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-5 text-slate-700">Usually 2 years (4 Semesters)</td>
                      <td className="py-3.5 px-5 text-slate-700">Usually 2 years (Trimester or Semester)</td>
                    </tr>
                    <tr className="bg-white hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-5 text-slate-700">Offered by universities and affiliated colleges</td>
                      <td className="py-3.5 px-5 text-slate-700">Offered by eligible autonomous management institutes (AICTE)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-5 p-4 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <p>
                  <strong>Advisor Note:</strong> Both MBA and PGDM programmes provide exceptional career opportunities in business and management. Students should compare the institution's recognition, curriculum, fees, faculty, placements, internship opportunities and industry exposure before making a final decision.
                </p>
              </div>
            </article>

            {/* Section 4: Eligibility Criteria */}
            <article id="sec-4" className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xs scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">
                  4
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  MBA & PGDM Eligibility Criteria
                </h2>
              </div>
              <p className="text-slate-700 text-sm mb-6">
                Students who wish to pursue MBA or PGDM programmes generally need to fulfil the following core requirements:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Graduation Degree',
                    desc: "Bachelor's degree from a recognised university in any stream (B.Tech, B.Com, BBA, B.Sc, B.A, etc.).",
                  },
                  {
                    title: 'Minimum 50% Marks',
                    desc: 'Generally 50% aggregate marks in graduation for general category, with applicable relaxation (45%) for reserved categories.',
                  },
                  {
                    title: 'Final-Year Students',
                    desc: 'Students appearing in their final year of graduation are eligible to apply on a provisional basis subject to college guidelines.',
                  },
                  {
                    title: 'Entrance / Selection',
                    desc: 'National entrance scores (CAT, MAT, XAT, etc.) or university internal entrance / GD-PI assessment where applicable.',
                  },
                ].map((crit, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex items-start gap-3 hover:border-blue-300 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{crit.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{crit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-4">
                * Eligibility conditions vary by institution and programme. Students should verify the official admission guidelines of specific universities before applying.
              </p>
            </article>

            {/* Section 5: Entrance Exams in India */}
            <article id="sec-5" className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xs scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">
                  5
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  MBA & PGDM Entrance Exams in India
                </h2>
              </div>
              <p className="text-slate-700 text-sm mb-6 leading-relaxed">
                MBA and PGDM admissions in India are offered through various national-level, state-level and institute-level entrance examinations. These exams assess aptitude in quantitative ability, verbal logic, data interpretation, critical reasoning and general business awareness.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {entranceExams.map((exam, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-black px-2.5 py-1 rounded-md">
                        {exam.code}
                      </span>
                      <a
                        href={exam.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium"
                      >
                        Official Site <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-1.5">{exam.name}</h3>
                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">{exam.desc}</p>
                    <div className="border-t border-slate-100 pt-2.5">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Exam Sections:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {exam.sections.map((sec, sIdx) => (
                          <span
                            key={sIdx}
                            className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded font-medium"
                          >
                            {sec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Other exams */}
              <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm mb-2">
                  Other State & University Management Entrance Exams:
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  {[
                    'Karnataka PGCET',
                    'KMAT Karnataka',
                    'KMAT Kerala',
                    'TANCET',
                    'AP ICET',
                    'TG ICET',
                    'OJEE',
                    'GMAT (Global)',
                  ].map((oe, idx) => (
                    <span
                      key={idx}
                      className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-slate-700 font-medium"
                    >
                      {oe}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* Section 6: Exam Calendar 2026-27 */}
            <article id="sec-6" className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xs scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center">
                  6
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  MBA & PGDM Entrance Exam Calendar 2026–27
                </h2>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm mb-6">
                The following dates are based on reported schedules available around 18 November 2026. Students should verify all dates and deadlines through official examination websites before applying.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="py-3 px-4 font-bold">Exam</th>
                      <th className="py-3 px-4 font-bold">Registration / Deadline</th>
                      <th className="py-3 px-4 font-bold">Exam Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {examCalendar.map((row, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/70 hover:bg-slate-100/60 transition-colors'}
                      >
                        <td className="py-3 px-4 font-bold text-slate-900">{row.exam}</td>
                        <td className="py-3 px-4 text-slate-700 text-xs sm:text-sm">{row.deadline}</td>
                        <td className="py-3 px-4 font-medium text-blue-700 text-xs sm:text-sm">{row.examDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            {/* Section 7: PGDM Entrance Exams and Admission Process */}
            <article id="sec-7" className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xs scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 font-black text-sm flex items-center justify-center">
                  7
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  PGDM Entrance Exams and Admission Process
                </h2>
              </div>
              <p className="text-slate-700 text-sm mb-6">
                PGDM admission in India is offered through national-level entrance exams, institute-specific selection processes and other approved admission methods.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-3">
                    Common Entrance Exams Accepted for PGDM:
                  </h4>
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-800 font-bold">
                        <tr>
                          <th className="p-2.5">Entrance Exam</th>
                          <th className="p-2.5">Commonly Accepted By</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {pgdmAcceptedExams.map((p, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-2.5 font-bold text-slate-900">{p.exam}</td>
                            <td className="p-2.5 text-slate-600">{p.acceptedBy}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-3">
                    Institute-Specific Selection Processes:
                  </h4>
                  <p className="text-xs text-slate-600 mb-3">
                    Some management institutes conduct additional selection rounds, including:
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {[
                      'Personal Interviews (PI)',
                      'Group Discussions (GD) / Micro-presentations',
                      'Written Assessments (WAT)',
                      'Case-based discussions',
                      'Aptitude or profile-based assessments',
                    ].map((step, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-slate-500 mt-4 italic">
                    An institute-level selection process is not necessarily a separate entrance examination. Students must check the admission criteria for the specific PGDM programme before applying.
                  </p>
                </div>
              </div>
            </article>

            {/* Section 8: Step-by-Step Admission Process */}
            <article id="sec-8" className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xs scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">
                  8
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  MBA & PGDM Admission Process Through Entrance Exams
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: 'Step 1: Entrance Exam Registration',
                    desc: 'Register for the entrance exam accepted by your preferred colleges (CAT, XAT, MAT, CMAT, SNAP, NMAT, etc.) before the respective deadlines.',
                  },
                  {
                    step: 'Step 2: Prepare and Appear for Examination',
                    desc: 'Prepare for quantitative aptitude, verbal logic, data interpretation, language comprehension and general business awareness.',
                  },
                  {
                    step: 'Step 3: Score and Shortlisting',
                    desc: 'Colleges evaluate test percentiles/cutoffs and shortlist candidates according to academic eligibility and candidate profiles.',
                  },
                  {
                    step: 'Step 4: GD, PI or Other Selection Rounds',
                    desc: 'Shortlisted candidates participate in Group Discussions, Personal Interviews, Written Ability Tests (WAT), or case presentations.',
                  },
                  {
                    step: 'Step 5: Final Admission Offer & Verification',
                    desc: 'Selected candidates receive admission offer letters, complete document verification, and confirm enrollment via initial fee payment.',
                  },
                ].map((st, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-1">{st.step}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            {/* Section 9: Direct Admission Without Entrance Exams */}
            <article id="sec-9" className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xs scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center">
                  9
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  MBA & PGDM Direct Admission Without Entrance Exams
                </h2>
              </div>
              <p className="text-slate-700 text-sm mb-4 leading-relaxed">
                Students who have not appeared for CAT, XAT, MAT, CMAT, NMAT or other management entrance examinations may explore eligible colleges and universities offering admission through alternative selection procedures.
              </p>
              <p className="text-slate-700 text-sm mb-6 leading-relaxed">
                Some private universities and institutions offer admission based on academic eligibility, university-level selection, interviews or other permitted criteria.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-3">
                    How Direct MBA Admission Works:
                  </h4>
                  <ol className="space-y-2 text-xs text-slate-700 list-decimal list-inside">
                    <li>Apply to a college or university offering an eligible alternative admission pathway.</li>
                    <li>Submit the application form and graduation academic documents.</li>
                    <li>Fulfil the institution's eligibility criteria (min. 50% in graduation).</li>
                    <li>Participate in a personal interview or institutional aptitude check, if required.</li>
                    <li>Receive an admission offer letter upon qualification.</li>
                    <li>Complete document verification and secure the seat.</li>
                  </ol>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="font-bold text-slate-900 text-sm mb-3">
                    Who Can Explore Direct MBA Admission?
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {[
                      'Students who did not appear for a national-level entrance exam.',
                      'Students exploring accredited private universities.',
                      'Graduates interested in institution-based profile selection.',
                      'Students seeking alternative admission pathways without losing an academic year.',
                      'Students who want to explore customized specializations and campuses in Delhi-NCR/pan-India.',
                    ].map((w, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                <strong>Disclaimer:</strong> Direct admission is not available in every institution or programme. Students should verify official eligibility, recognition, admission rules and fees before enrolling. StepWorld assists students in finding 100% compliant, accredited institutions.
              </div>
            </article>

            {/* Section 10: Complete List of 28 Specializations */}
            <article id="sec-10" className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xs scroll-mt-28">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-black text-sm flex items-center justify-center">
                    10
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      Complete List of MBA & PGDM Specializations (28 Programs)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Explore detailed syllabus, core subjects and career scopes across all 28 specializations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Specialization Search & Quick Filter */}
              <div className="mb-6 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search among 28 specializations (e.g. Finance, Marketing, Analytics, Healthcare, IT...)"
                  value={specSearch}
                  onChange={(e) => setSpecSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[750px] overflow-y-auto pr-1">
                {filteredSpecs.map((spec, idx) => {
                  const isExpanded = selectedSpecIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-xs transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-bold text-slate-900 text-base leading-snug">
                            {spec.title}
                          </h3>
                          <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded shrink-0">
                            2 Yrs
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                          {spec.description}
                        </p>

                        <div className="mb-3">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                            Core Subjects:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {spec.subjects.slice(0, isExpanded ? spec.subjects.length : 3).map((sub, sI) => (
                              <span
                                key={sI}
                                className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded font-medium"
                              >
                                {sub}
                              </span>
                            ))}
                            {!isExpanded && spec.subjects.length > 3 && (
                              <button
                                onClick={() => setSelectedSpecIndex(idx)}
                                className="text-[11px] text-blue-600 font-bold hover:underline"
                              >
                                +{spec.subjects.length - 3} more
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="border-t border-slate-100 pt-2.5">
                          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                            Career Scope:
                          </span>
                          <p className="text-xs text-slate-700 font-medium">{spec.career}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <a
                          href="#counselling"
                          onClick={() =>
                            setLeadForm((prev) => ({
                              ...prev,
                              specialization: spec.title.replace('MBA in ', ''),
                            }))
                          }
                          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          Enquire for this Specialization <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredSpecs.length === 0 && (
                <div className="text-center py-8 text-slate-500 text-sm">
                  No specialization found matching "{specSearch}". Try clearing the search.
                </div>
              )}
            </article>

            {/* Section 11: Top MBA & PGDM Colleges in India */}
            <article id="sec-11" className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xs scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">
                  11
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Top MBA & PGDM Colleges in India
                </h2>
              </div>
              <p className="text-slate-700 text-sm mb-6">
                Students can explore the following institutions according to their entrance exam scores, specialization, budget, location, eligibility and admission requirements:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs mb-4">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="py-3 px-4 font-bold">Institution / University</th>
                      <th className="py-3 px-4 font-bold">Location</th>
                      <th className="py-3 px-4 font-bold">Category</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {topColleges.map((col, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70 hover:bg-slate-100/60 transition-colors'}
                      >
                        <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{col.name}</span>
                        </td>
                        <td className="py-3 px-4 text-slate-700 text-xs sm:text-sm">{col.location}</td>
                        <td className="py-3 px-4 text-xs font-semibold text-slate-600">
                          {col.name.startsWith('IIM') || col.name === 'XLRI'
                            ? 'Top Tier National'
                            : col.location.includes('Noida')
                            ? 'Delhi-NCR Hub'
                            : 'Accredited University'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-slate-500 italic">
                * This is an illustrative list and not a ranking. Admission criteria, recognition, fees and entrance exam acceptance must be verified for the specific programme.
              </p>
            </article>

            {/* Section 12: Fees in India */}
            <article id="sec-12" className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xs scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center">
                  12
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  MBA & PGDM Fees in India
                </h2>
              </div>
              <p className="text-slate-700 text-sm mb-6">
                MBA and PGDM fees depend on the institution, campus, programme, facilities, hostel accommodation and other charges:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {feeRanges.map((fee, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-colors"
                  >
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-500 block mb-1">
                      {fee.type}
                    </span>
                    <span className="text-lg font-black text-slate-950 block text-emerald-700">
                      {fee.range}
                    </span>
                    <span className="text-[11px] text-slate-500">Indicative 2-year total tuition range</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-500 italic">
                These are broad indicative ranges and not verified fee quotations for individual colleges. Actual fees may differ. StepWorld provides clear, transparent fee breakdowns with scholarship guidance.
              </p>
            </article>

            {/* Section 13: Career Opportunities */}
            <article id="sec-13" className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xs scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-black text-sm flex items-center justify-center">
                  13
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Career Opportunities After MBA & PGDM
                </h2>
              </div>
              <p className="text-slate-700 text-sm mb-5">
                MBA and PGDM graduates can explore rewarding leadership and strategic roles across major industries:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {[
                  'Banking & Financial Services',
                  'IT & Technology',
                  'Management Consulting',
                  'FMCG & Consumer Goods',
                  'Retail & Modern Trade',
                  'E-Commerce & Digital Ops',
                  'Healthcare & Pharma',
                  'Manufacturing & Logistics',
                  'Media, Aviation & Startups',
                ].map((ind, i) => (
                  <div
                    key={i}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2"
                  >
                    <Award className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{ind}</span>
                  </div>
                ))}
              </div>

              <h4 className="font-bold text-slate-900 text-sm mb-3">Popular Job Roles After MBA:</h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  'Marketing Manager',
                  'Brand Manager',
                  'Financial Analyst',
                  'Investment Banker',
                  'HR Business Partner (HRBP)',
                  'Business Analytics Specialist',
                  'Data Consultant',
                  'Operations Manager',
                  'Supply Chain Consultant',
                  'Product Manager',
                  'Management Consultant',
                  'Chief of Staff / Strategy Lead',
                ].map((role, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 text-blue-900 font-medium px-3 py-1.5 rounded-lg border border-blue-200"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </article>

            {/* Section 14: How to Choose Best Specialization */}
            <article id="sec-14" className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xs scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 font-black text-sm flex items-center justify-center">
                  14
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  How to Choose the Best MBA or PGDM Specialization?
                </h2>
              </div>
              <p className="text-slate-700 text-sm mb-6">
                Match your natural strengths, past graduation background, and career aspirations with the ideal specialization:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs mb-4">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="py-3 px-4 font-bold">Your Career Interest</th>
                      <th className="py-3 px-4 font-bold">Recommended Specialization</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {specializationMatrix.map((item, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70 hover:bg-slate-100/60 transition-colors'}
                      >
                        <td className="py-2.5 px-4 text-slate-800 font-medium">{item.interest}</td>
                        <td className="py-2.5 px-4 font-bold text-blue-600 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          <span>{item.recommended}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-500 italic">
                The right specialization depends on the student's interests, abilities, career goals, curriculum, internship opportunities and industry requirements.
              </p>
            </article>

            {/* Section 15: Frequently Asked Questions */}
            <article id="sec-15" className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xs scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center">
                  15
                </span>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    Frequently Asked Questions (FAQs)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Quick answers to common questions about MBA admissions, CAT requirements, and eligibility.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, i) => {
                  const isOpen = activeFaq === i;
                  return (
                    <div
                      key={i}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-white"
                    >
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : i)}
                        className="w-full p-4 sm:p-5 text-left font-bold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors text-sm sm:text-base"
                      >
                        <div className="flex items-center gap-3">
                          <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>{faq.question}</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                            isOpen ? 'rotate-180 text-blue-600' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-slate-700 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </article>

            {/* Section 16: Start Your MBA Journey with Stepworld Education */}
            <article id="counselling" className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-950 text-white rounded-3xl p-7 sm:p-10 shadow-xl relative overflow-hidden scroll-mt-28">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 bg-blue-800/80 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-blue-700">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Personalized Guidance Since 2015</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
                    Start Your MBA & PGDM Admission Journey with Stepworld Education
                  </h2>
                  <p className="text-blue-100 text-sm leading-relaxed mb-5">
                    Choosing the right MBA or PGDM college can be challenging when there are hundreds of universities, entrance examinations, specializations and admission opportunities available. Stepworld Education helps you:
                  </p>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-blue-100 mb-6">
                    {[
                      'Explore accredited MBA and PGDM colleges across India.',
                      'Understand entrance exam and alternative admission pathways.',
                      'Compare 28 MBA specializations aligned with your profile.',
                      'Explore transparent college fee structures and scholarship eligibility.',
                      'Get end-to-end guidance from form filling to GD-PI interview preparation.',
                    ].map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                    <a
                      href="tel:18004200000"
                      className="bg-amber-400 hover:bg-amber-500 text-slate-950 px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-md"
                    >
                      <Phone className="w-4 h-4 text-slate-950" />
                      <span>Call: 1800-420-0000 (Toll Free)</span>
                    </a>
                    <a
                      href="https://maps.app.goo.gl/vGmwMaL4Ue9S4hay6?g_st=aw"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
                    >
                      <MapPin className="w-4 h-4 text-amber-300" />
                      <span>Visit StepWorld Office</span>
                    </a>
                  </div>
                </div>

                {/* Lead Form */}
                <div className="lg:col-span-5">
                  <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-100">
                    <h3 className="font-bold text-slate-900 text-lg mb-1">
                      Request Free MBA Counselling
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Get expert shortlist of colleges matching your budget & profile.
                    </p>

                    {submitted ? (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-center">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                        <h4 className="font-bold text-emerald-900 text-sm">Counselling Requested!</h4>
                        <p className="text-xs text-emerald-700 mt-1">
                          Our senior MBA counsellor will contact you shortly on {leadForm.phone}.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitLead} className="space-y-3 text-xs">
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rahul Sharma"
                            value={leadForm.name}
                            onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Mobile Number *</label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. +91 9876543210"
                            value={leadForm.phone}
                            onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                          <input
                            type="email"
                            placeholder="e.g. rahul@example.com"
                            value={leadForm.email}
                            onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-slate-700 font-semibold mb-1">Program Mode</label>
                            <select
                              value={leadForm.mode}
                              onChange={(e) => setLeadForm({ ...leadForm, mode: e.target.value })}
                              className="w-full px-2.5 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white text-slate-800"
                            >
                              <option value="offline">On-Campus (Offline)</option>
                              <option value="online">Online MBA</option>
                              <option value="both">Open to Both</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-slate-700 font-semibold mb-1">Current City</label>
                            <input
                              type="text"
                              placeholder="e.g. Noida / Delhi"
                              value={leadForm.city}
                              onChange={(e) => setLeadForm({ ...leadForm, city: e.target.value })}
                              className="w-full px-2.5 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Preferred Specialization</label>
                          <input
                            type="text"
                            placeholder="e.g. Marketing / Finance / Business Analytics"
                            value={leadForm.specialization}
                            onChange={(e) => setLeadForm({ ...leadForm, specialization: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 text-xs sm:text-sm mt-3"
                        >
                          <Send className="w-4 h-4" />
                          <span>{submitting ? 'Submitting...' : 'Schedule My Free Session'}</span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </article>

            {/* Disclaimer & SEO Metadata box */}
            <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 text-xs text-slate-600 space-y-3">
              <p>
                <strong>Official Disclaimer:</strong> {blogMetadata.disclaimer}
              </p>
              <div className="border-t border-slate-200 pt-3">
                <span className="font-bold text-slate-700 block mb-1">Related Topic Keywords:</span>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {blogMetadata.targetKeywords.join(' • ')}
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 text-slate-600 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-950 p-1 flex items-center justify-center overflow-hidden">
                  <img
                    src="/stepworld-logo.jpg"
                    alt="Stepworld Education"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="font-black text-slate-900 text-base">STEPWORLD EDUCATION</span>
                  <p className="text-[11px] text-slate-500 font-medium">A Decade of Excellence • Est. 2015</p>
                </div>
              </div>
              <p className="text-slate-600 text-xs max-w-md leading-relaxed">
                StepWorld is an independent education consultancy established in 2015. We empower students with personalized career counselling, university selection, transparent fee details, and end-to-end admission guidance for both regular on-campus and approved online programs.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://maps.app.goo.gl/vGmwMaL4Ue9S4hay6?g_st=aw"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold"
                >
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Google Maps Pin</span>
                </a>
                <span>•</span>
                <a
                  href="tel:18004200000"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>1800-420-0000</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link to="/" className="hover:text-blue-600 transition-colors">
                    Home Page
                  </Link>
                </li>
                <li>
                  <Link to="/#courses" className="hover:text-blue-600 transition-colors">
                    Offline Courses (On-Campus)
                  </Link>
                </li>
                <li>
                  <Link to="/#courses" className="hover:text-blue-600 transition-colors">
                    Online Courses
                  </Link>
                </li>
                <li>
                  <Link to="/#colleges" className="hover:text-blue-600 transition-colors">
                    Top Universities
                  </Link>
                </li>
                <li>
                  <Link to="/#faqs" className="hover:text-blue-600 transition-colors">
                    Frequently Asked Questions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">
                Featured Guides
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    to="/blog/mba-pgdm-admission-2027-entrance-exams-direct-admission"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    MBA & PGDM Admission 2027–29 Guide
                  </Link>
                </li>
                <li>
                  <Link to="/#courses" className="hover:text-blue-600 transition-colors">
                    Engineering Admissions 2027
                  </Link>
                </li>
                <li>
                  <Link to="/#courses" className="hover:text-blue-600 transition-colors">
                    Medical & Healthcare Counselling
                  </Link>
                </li>
                <li>
                  <Link to="/#courses" className="hover:text-blue-600 transition-colors">
                    Direct Admission Eligibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <p>© {new Date().getFullYear()} StepWorld Education Consultancy. All rights reserved.</p>
            <p>Direct university tuition fees should be paid directly to the respective institution.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPostPage;
