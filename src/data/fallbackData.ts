export interface ApiCollege {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  location: string;
  fullAddress?: string;
  initials: string;
  logoGradient: string;
  rating: number;
  ratingCount?: string;
  nirfRank?: string;
  qsRank?: string;
  isFeatured: boolean;
  mode: string;
  about: string;
  established?: string;
  campusSize?: string;
  studentsCount?: string;
  avgPackage?: string;
  highestPackage?: string;
  placementPct?: string;
  topRecruiters?: string;
  approvals: { approval: { id: string; label: string } }[];
  courses: ApiCourse[];
  faculty: { id: string; name: string; role: string; qualification: string }[];
  alumni: { id: string; name: string; company: string; initials: string; color: string }[];
  reviews: { id: string; author: string; rating: number; title: string; body: string; createdAt: string }[];
}

export interface ApiCourse {
  id: string;
  slug: string;
  title: string;
  fee: string;
  duration: string;
  category: string;
  mode: string;
  stream: string;
  specializations?: string;
  badge?: string;
  badgeColor?: string;
  description?: string;
  collegeId?: string;
  college?: {
    slug: string;
    name: string;
    logoGradient: string;
    initials: string;
  };
}

export const FALLBACK_COLLEGES: ApiCollege[] = [
  {
    id: 'col-christ-university',
    slug: 'christ-university-bengaluru',
    name: 'Christ (Deemed to be University) Bengaluru',
    shortName: 'Christ University',
    location: 'Hosur Road, Bengaluru, Karnataka',
    fullAddress: 'Hosur Main Road, Bhavani Nagar, S.G. Palya, Bengaluru, Karnataka 560029',
    initials: 'CU',
    logoGradient: '#0369a1',
    rating: 4.8,
    ratingCount: '4,120 Reviews',
    nirfRank: 'Ranked in NIRF Top 100 Universities',
    qsRank: 'Asia Top 500',
    isFeatured: true,
    mode: 'offline',
    about: 'Christ University Central Campus in Bengaluru is celebrated for holistic student development, academic discipline, bustling campus cultural life, and top-tier corporate placement drives.',
    established: '1969',
    campusSize: '80+ Acres Lush Urban Campus',
    studentsCount: '25,000+ Students',
    avgPackage: '₹8.5 LPA',
    highestPackage: '₹24.0 LPA',
    placementPct: '94%',
    topRecruiters: 'Deloitte, EY, KPMG, PwC, Goldman Sachs, Amazon, Bain & Company, DE Shaw',
    approvals: [
      { approval: { id: 'app-1', label: 'UGC' } },
      { approval: { id: 'app-2', label: 'NAAC A+' } },
      { approval: { id: 'app-3', label: 'AICTE' } },
      { approval: { id: 'app-4', label: 'BCI' } },
    ],
    faculty: [
      { id: 'f1', name: 'Dr. Joseph C.', role: 'Dean - School of Business and Management', qualification: 'Ph.D. (IIMB), MBA' },
      { id: 'f2', name: 'Dr. Kavitha S.', role: 'Professor of Finance & Analytics', qualification: 'Ph.D., CFA, M.Com' },
    ],
    alumni: [
      { id: 'a1', name: 'Kunal Shah', company: 'CRED', initials: 'KS', color: '#0369a1' },
      { id: 'a2', name: 'Ananya Roy', company: 'Goldman Sachs', initials: 'AR', color: '#0284c7' },
    ],
    reviews: [
      { id: 'r1', author: 'Akash Nair', rating: 5, title: 'Incredible holistic campus exposure', body: 'The Bangalore Central Campus environment is unparalleled. Corporate visits, placement cell and grooming are top notch.', createdAt: '2026-09-01' },
    ],
    courses: [
      {
        id: 'crs-christ-bba-honours',
        slug: 'christ-bba-honours',
        title: 'BBA (Honours / Honours with Research)',
        fee: '₹8,45,000',
        duration: '3 / 4 Years',
        category: 'ug',
        mode: 'offline',
        stream: 'Management & Business',
        specializations: 'Finance, Marketing, Analytics',
        badge: '🏆 #1 Ranked BBA',
        badgeColor: 'bg-amber-100 text-amber-800',
        description: 'India’s most sought-after on-campus undergraduate management degree at Central Campus Bengaluru.',
        collegeId: 'col-christ-university',
        college: { slug: 'christ-university-bengaluru', name: 'Christ University', logoGradient: '#0369a1', initials: 'CU' },
      },
      {
        id: 'crs-christ-mba-dual',
        slug: 'christ-mba-dual',
        title: 'Master of Business Administration (MBA - Dual Specialization)',
        fee: '₹10,50,000',
        duration: '2 Years',
        category: 'pg',
        mode: 'offline',
        stream: 'Management & Business',
        specializations: 'Finance, Marketing, HR, Business Analytics',
        badge: '🔥 100% Placement Support',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        description: 'Rigorous full-time MBA program with specializations in Finance, Marketing, Human Resources, and Business Analytics.',
        collegeId: 'col-christ-university',
        college: { slug: 'christ-university-bengaluru', name: 'Christ University', logoGradient: '#0369a1', initials: 'CU' },
      },
      {
        id: 'crs-christ-bcom-finance',
        slug: 'christ-bcom-finance',
        title: 'B.Com (Applied Finance & Analytics)',
        fee: '₹6,90,000',
        duration: '3 Years',
        category: 'ug',
        mode: 'offline',
        stream: 'Commerce & Banking',
        specializations: 'Finance, Accounting & Tax',
        badge: '⭐ High Placement',
        badgeColor: 'bg-blue-100 text-blue-800',
        description: 'Comprehensive commerce syllabus mapped with global financial certifications (CFA, ACCA) and big 4 recruiting.',
        collegeId: 'col-christ-university',
        college: { slug: 'christ-university-bengaluru', name: 'Christ University', logoGradient: '#0369a1', initials: 'CU' },
      },
      {
        id: 'crs-christ-llb-integrated',
        slug: 'christ-llb-integrated',
        title: 'B.A. LL.B. (Honours) / B.B.A. LL.B. (Honours)',
        fee: '₹11,20,000',
        duration: '5 Years',
        category: 'ug',
        mode: 'offline',
        stream: 'Law & Legal Studies',
        specializations: 'Corporate Law, Criminal Law, Constitutional Law',
        badge: '⚖️ Bar Council Approved',
        badgeColor: 'bg-purple-100 text-purple-800',
        description: 'Bar Council of India approved integrated 5-year law curriculum with active moot courts, legal aid clinics, and tier-1 law firm placements.',
        collegeId: 'col-christ-university',
        college: { slug: 'christ-university-bengaluru', name: 'Christ University', logoGradient: '#0369a1', initials: 'CU' },
      },
    ],
  },
  {
    id: 'col-bits-pilani',
    slug: 'bits-pilani',
    name: 'Birla Institute of Technology and Science (BITS Pilani)',
    shortName: 'BITS Pilani',
    location: 'Pilani, Rajasthan',
    fullAddress: 'Vidya Vihar Campus, Pilani, Rajasthan - 333031',
    initials: 'BP',
    logoGradient: '#047857',
    rating: 4.9,
    ratingCount: '3,450 Reviews',
    nirfRank: '18 (Engineering)',
    qsRank: 'World Top 500',
    isFeatured: true,
    mode: 'offline',
    about: 'BITS Pilani is one of India’s foremost autonomous private science and technological institutes, famous for high-tech labs and top-tier global placements.',
    established: '1964',
    campusSize: '328 Acres Residential Campus',
    studentsCount: '17,000+ On-Campus',
    avgPackage: '₹20.5 LPA',
    highestPackage: '₹60.75 LPA',
    placementPct: '97%',
    topRecruiters: 'Google, Microsoft, Apple, McKinsey, Goldman Sachs, Amazon, Nvidia, Uber',
    approvals: [
      { approval: { id: 'app-1', label: 'UGC' } },
      { approval: { id: 'app-2', label: 'NAAC A++' } },
      { approval: { id: 'app-3', label: 'AICTE' } },
      { approval: { id: 'app-5', label: 'NIRF Top 20' } },
    ],
    faculty: [
      { id: 'fb1', name: 'Prof. V. Ramgopal Rao', role: 'Group Vice-Chancellor', qualification: 'Ph.D., IEEE Fellow' },
    ],
    alumni: [
      { id: 'ab1', name: 'Deepinder Goyal', company: 'Zomato', initials: 'DG', color: '#047857' },
    ],
    reviews: [
      { id: 'rb1', author: 'Varun K.', rating: 5, title: 'No attendance policy and pure learning', body: 'The coding culture and practice school placements give BITS graduates an edge anywhere in the world.', createdAt: '2026-08-15' },
    ],
    courses: [
      {
        id: 'crs-bits-btech-cse',
        slug: 'bits-btech-cse',
        title: 'B.Tech in Computer Science & Engineering',
        fee: '₹19,90,000',
        duration: '4 Years',
        category: 'ug',
        mode: 'offline',
        stream: 'Engineering & Technology',
        specializations: 'AI, Distributed Systems, Software Engineering',
        badge: '⭐ Flagship',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        description: 'Premier on-campus engineering degree with high-tech laboratories, hackathons, and direct campus placements.',
        collegeId: 'col-bits-pilani',
        college: { slug: 'bits-pilani', name: 'BITS Pilani', logoGradient: '#047857', initials: 'BP' },
      },
      {
        id: 'crs-bits-mtech-ai-ds',
        slug: 'bits-mtech-ai-ds',
        title: 'M.Tech in Data Science & Artificial Intelligence',
        fee: '₹9,80,000',
        duration: '2 Years',
        category: 'pg',
        mode: 'offline',
        stream: 'Engineering & Technology',
        specializations: 'Deep Learning, NLP, Big Data',
        badge: '🔥 High Package',
        badgeColor: 'bg-orange-100 text-orange-800',
        description: 'Advanced postgraduate engineering program in cutting-edge computing, deep learning, and distributed AI systems.',
        collegeId: 'col-bits-pilani',
        college: { slug: 'bits-pilani', name: 'BITS Pilani', logoGradient: '#047857', initials: 'BP' },
      },
    ],
  },
  {
    id: 'col-alliance-university',
    slug: 'alliance-university-online',
    name: 'Alliance University',
    shortName: 'Alliance University',
    location: 'Bengaluru, Karnataka',
    fullAddress: 'Chikkahagade Cross, Chandapura - Anekal Main Road, Anekal, Bengaluru, Karnataka 562106',
    initials: 'AU',
    logoGradient: '#b91c1c',
    rating: 4.7,
    ratingCount: '2,890 Reviews',
    nirfRank: 'NIRF Ranked',
    qsRank: 'QS Rated',
    isFeatured: true,
    mode: 'both',
    about: 'Alliance University is a renowned higher education institution in Bengaluru offering state-of-the-art campus learning alongside UGC-DEB approved online degrees.',
    established: '2010',
    campusSize: '60 Acres Green Campus',
    studentsCount: '12,000+',
    avgPackage: '₹8.5 LPA',
    highestPackage: '₹26.1 LPA',
    placementPct: '93%',
    topRecruiters: 'Amazon, Bosch, KPMG, Oracle, Wipro, Infosys, Capgemini, HCL',
    approvals: [
      { approval: { id: 'app-1', label: 'UGC' } },
      { approval: { id: 'app-6', label: 'UGC-DEB' } },
      { approval: { id: 'app-2', label: 'NAAC A+' } },
      { approval: { id: 'app-3', label: 'AICTE' } },
    ],
    faculty: [
      { id: 'fa1', name: 'Dr. Ray Titus', role: 'Dean of Business', qualification: 'Ph.D., MBA' },
    ],
    alumni: [
      { id: 'aa1', name: 'Rohit Verma', company: 'Amazon', initials: 'RV', color: '#b91c1c' },
    ],
    reviews: [
      { id: 'ra1', author: 'Neha Gupta', rating: 5, title: 'Flexible online and great campus faculty', body: 'The online LMS interface and recorded lectures are extremely high quality for working professionals.', createdAt: '2026-07-20' },
    ],
    courses: [
      {
        id: 'crs-online-mba',
        slug: 'online-mba',
        title: 'Master of Business Administration (Online MBA)',
        fee: '₹2,50,000',
        duration: '2 Years',
        category: 'pg',
        mode: 'online',
        stream: 'Management & Business',
        specializations: 'Marketing, Finance, HR, Operations',
        badge: '⭐ Most Popular',
        badgeColor: 'bg-blue-100 text-blue-800',
        description: 'UGC-entitled online MBA with live interactive weekend classes, global case studies, and career guidance.',
        collegeId: 'col-alliance-university',
        college: { slug: 'alliance-university-online', name: 'Alliance University', logoGradient: '#b91c1c', initials: 'AU' },
      },
      {
        id: 'crs-online-bba',
        slug: 'online-bba',
        title: 'Bachelor of Business Administration (Online BBA)',
        fee: '₹1,80,000',
        duration: '3 Years',
        category: 'ug',
        mode: 'online',
        stream: 'Management & Business',
        specializations: 'General Management, Digital Marketing',
        badge: 'UGC Recognized',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        description: 'Flexible undergraduate degree in management with online examinations and comprehensive study materials.',
        collegeId: 'col-alliance-university',
        college: { slug: 'alliance-university-online', name: 'Alliance University', logoGradient: '#b91c1c', initials: 'AU' },
      },
    ],
  },
  {
    id: 'col-manipal-university',
    slug: 'manipal-university-jaipur',
    name: 'Manipal University Jaipur (MUJ)',
    shortName: 'Manipal University',
    location: 'Jaipur, Rajasthan',
    fullAddress: 'Dehmi Kalan, Near GVK Toll Plaza, Jaipur-Ajmer Expressway, Jaipur, Rajasthan 303007',
    initials: 'MU',
    logoGradient: '#ea580c',
    rating: 4.8,
    ratingCount: '5,210 Reviews',
    nirfRank: 'Ranked in NIRF Top 65',
    qsRank: 'QS 5 Stars Rated',
    isFeatured: true,
    mode: 'both',
    about: 'Manipal University Jaipur is NAAC A+ accredited, renowned for academic excellence, modern infrastructure, and prestigious industry-backed programs.',
    established: '2011',
    campusSize: '122 Acres Modern Campus',
    studentsCount: '15,000+',
    avgPackage: '₹9.0 LPA',
    highestPackage: '₹85.0 LPA',
    placementPct: '96%',
    topRecruiters: 'Microsoft, Dell, Cisco, Amazon, Accenture, TCS, Infosys',
    approvals: [
      { approval: { id: 'app-1', label: 'UGC' } },
      { approval: { id: 'app-2', label: 'NAAC A+' } },
      { approval: { id: 'app-3', label: 'AICTE' } },
      { approval: { id: 'app-6', label: 'UGC-DEB' } },
    ],
    faculty: [],
    alumni: [],
    reviews: [],
    courses: [
      {
        id: 'crs-manipal-online-mba',
        slug: 'manipal-online-mba',
        title: 'Online MBA (14+ Specializations)',
        fee: '₹1,75,000',
        duration: '2 Years',
        category: 'pg',
        mode: 'online',
        stream: 'Management & Business',
        specializations: 'Marketing, Finance, HR, IT, Analytics',
        badge: '🔥 Top Ranked Online MBA',
        badgeColor: 'bg-orange-100 text-orange-800',
        description: 'Industry-oriented online MBA with Coursera access, live faculty masterclasses, and placement support.',
        collegeId: 'col-manipal-university',
        college: { slug: 'manipal-university-jaipur', name: 'Manipal University Jaipur', logoGradient: '#ea580c', initials: 'MU' },
      },
      {
        id: 'crs-manipal-online-bca',
        slug: 'manipal-online-bca',
        title: 'Online BCA (Cloud Computing & Full Stack)',
        fee: '₹1,35,000',
        duration: '3 Years',
        category: 'ug',
        mode: 'online',
        stream: 'Computer & IT',
        specializations: 'Cloud, Cybersecurity, Full Stack',
        badge: '💻 Cloud & AI Labs',
        badgeColor: 'bg-cyan-100 text-cyan-800',
        description: 'Practical online BCA degree focusing on modern web development, algorithms, cloud computing, and real-world projects.',
        collegeId: 'col-manipal-university',
        college: { slug: 'manipal-university-jaipur', name: 'Manipal University Jaipur', logoGradient: '#ea580c', initials: 'MU' },
      },
    ],
  },
];

export const FALLBACK_COURSES: ApiCourse[] = FALLBACK_COLLEGES.flatMap((col) =>
  col.courses.map((crs) => ({
    ...crs,
    collegeId: col.id,
    college: {
      slug: col.slug,
      name: col.shortName ?? col.name,
      logoGradient: col.logoGradient,
      initials: col.initials,
    },
  }))
);
