import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const collegesToUpsert = [
  // 1. BITS Pilani (Engineering & Tech, Science)
  {
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
    about: 'BITS Pilani is one of India’s foremost autonomous private science and technological institutes. Known for its vibrant 328-acre residential campus, state-of-the-art research laboratories, and top-tier global placements.',
    established: '1964',
    campusSize: '328 Acres Residential Campus',
    studentsCount: '17,000+ On-Campus',
    avgPackage: '₹20.5 LPA',
    highestPackage: '₹60.75 LPA',
    placementPct: '97%',
    topRecruiters: 'Google, Microsoft, Apple, McKinsey, Goldman Sachs, Amazon, Nvidia, Uber',
    approvals: ['UGC', 'NAAC A++', 'AICTE', 'NIRF', 'QS World University Rankings'],
    courses: [
      {
        slug: 'bits-btech-cse',
        title: 'B.Tech in Computer Science & Engineering',
        fee: '₹19,90,000',
        duration: '4 Years',
        category: 'ug',
        mode: 'offline',
        stream: 'Engineering & Technology',
        badge: '⭐ Flagship',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        description: 'Premier on-campus engineering degree with high-tech laboratories, hackathons, and direct campus placements.',
      },
      {
        slug: 'bits-mtech-ai-ds',
        title: 'M.Tech in Data Science & Artificial Intelligence',
        fee: '₹9,80,000',
        duration: '2 Years',
        category: 'pg',
        mode: 'offline',
        stream: 'Engineering & Technology',
        badge: '🔥 High Package',
        badgeColor: 'bg-orange-100 text-orange-800',
        description: 'Advanced postgraduate engineering program in cutting-edge computing, deep learning, and distributed AI systems.',
      },
      {
        slug: 'bits-bsc-physics',
        title: 'B.Sc. (Hons.) in Physics & Data Analytics',
        fee: '₹14,50,000',
        duration: '3 Years',
        category: 'ug',
        mode: 'offline',
        stream: 'Science',
        badge: 'Research Core',
        badgeColor: 'bg-purple-100 text-purple-800',
        description: 'Rigorous fundamental science program with practical lab research and computational data science.',
      },
      {
        slug: 'bits-msc-mathematics',
        title: 'M.Sc. in Applied Mathematics & Computing',
        fee: '₹7,20,000',
        duration: '2 Years',
        category: 'pg',
        mode: 'offline',
        stream: 'Science',
        badge: 'High Demand',
        badgeColor: 'bg-blue-100 text-blue-800',
        description: 'Postgraduate program covering numerical analysis, quantitative finance, and statistical computing.',
      },
    ],
  },

  // 2. Symbiosis International / SIBM / SLS (Management & Law)
  {
    slug: 'symbiosis-international-pune',
    name: 'Symbiosis International University (SIU Pune)',
    shortName: 'Symbiosis Pune',
    location: 'Lavale / Viman Nagar, Pune, Maharashtra',
    fullAddress: 'Gram Lavale, Tal Mulshi, Pune, Maharashtra - 412115',
    initials: 'SI',
    logoGradient: '#B91C1C',
    rating: 4.85,
    ratingCount: '2,800 Reviews',
    nirfRank: '17 (Management) / 3 (Law)',
    qsRank: 'Top 15 B-Schools India',
    isFeatured: true,
    mode: 'offline',
    about: 'Symbiosis International University is renowned across India for management, law, media, and liberal arts. Its picturesque 300+ acre hilltop campus offers state-of-the-art facilities.',
    established: '1978',
    campusSize: '300+ Acres Hilltop Campus',
    studentsCount: '22,000+ Students',
    avgPackage: '₹26.7 LPA',
    highestPackage: '₹35.05 LPA',
    placementPct: '100%',
    topRecruiters: 'McKinsey, BCG, ITC, P&G, Unilever, Khaitan & Co, AZB & Partners, Bajaj Finserv',
    approvals: ['UGC', 'NAAC A++', 'AICTE', 'BCI', 'NIRF'],
    courses: [
      {
        slug: 'sibm-mba-flagship',
        title: 'Full-Time MBA (Residential On-Campus)',
        fee: '₹22,50,000',
        duration: '2 Years',
        category: 'pg',
        mode: 'offline',
        stream: 'Management & Business',
        badge: '🔥 100% Placed',
        badgeColor: 'bg-red-100 text-red-800',
        description: 'Flagship residential MBA program with 100% placement record and top consulting/FMCG recruiters.',
      },
      {
        slug: 'symbiosis-bba-hons',
        title: 'BBA (Honours) - Regular Campus',
        fee: '₹9,80,000',
        duration: '3 Years',
        category: 'ug',
        mode: 'offline',
        stream: 'Management & Business',
        badge: 'Top Ranked',
        badgeColor: 'bg-indigo-100 text-indigo-800',
        description: 'Premium undergraduate business management degree with live corporate internships.',
      },
      {
        slug: 'sls-ba-llb-hons',
        title: 'BA-LL.B (Honours) 5-Year Integrated',
        fee: '₹17,50,000',
        duration: '5 Years',
        category: 'ug',
        mode: 'offline',
        stream: 'Law',
        badge: '⚖️ BCI Approved',
        badgeColor: 'bg-amber-100 text-amber-800',
        description: 'Top-tier integrated law degree approved by the Bar Council of India with moot courts and corporate law placements.',
      },
      {
        slug: 'sls-llm-corporate',
        title: 'LL.M in Corporate & Commercial Law',
        fee: '₹2,60,000',
        duration: '1 Year',
        category: 'pg',
        mode: 'offline',
        stream: 'Law',
        badge: 'Fast Track',
        badgeColor: 'bg-slate-100 text-slate-800',
        description: 'Specialized 1-year Master of Laws program focusing on corporate M&A, intellectual property, and arbitration.',
      },
    ],
  },

  // 3. Christ University (Commerce, Arts, Media, Education)
  {
    slug: 'christ-university-bengaluru',
    name: 'Christ (Deemed to be University) - Central Campus',
    shortName: 'Christ University',
    location: 'Hosur Road, Bengaluru, Karnataka',
    fullAddress: 'Hosur Road, Bhavani Nagar, S.G. Palya, Bengaluru - 560029',
    initials: 'CU',
    logoGradient: '#1E3A8A',
    rating: 4.8,
    ratingCount: '3,100 Reviews',
    nirfRank: 'Top 10 in Commerce & Arts',
    isFeatured: true,
    mode: 'offline',
    about: 'Christ University Central Campus in Bengaluru is celebrated for holistic student development, academic discipline, bustling campus cultural life, and top-tier corporate placement drives.',
    established: '1969',
    campusSize: '80+ Acres Lush Campus',
    studentsCount: '25,000+ Students',
    avgPackage: '₹8.5 LPA',
    highestPackage: '₹21.4 LPA',
    placementPct: '94%',
    topRecruiters: 'Deloitte, EY, KPMG, PwC, Goldman Sachs, Amazon, Bain & Company',
    approvals: ['UGC', 'NAAC A+', 'AICTE', 'NIRF'],
    courses: [
      {
        slug: 'christ-bcom-hons',
        title: 'B.Com (Hons.) in Applied Finance & Analytics',
        fee: '₹6,80,000',
        duration: '3 Years',
        category: 'ug',
        mode: 'offline',
        stream: 'Commerce & Finance',
        badge: '🏆 #1 in India',
        badgeColor: 'bg-blue-100 text-blue-800',
        description: 'India’s premier undergraduate commerce program with integrated financial modeling and Big 4 recruitments.',
      },
      {
        slug: 'christ-mcom-finance',
        title: 'M.Com in Banking, Finance & Risk Management',
        fee: '₹3,40,000',
        duration: '2 Years',
        category: 'pg',
        mode: 'offline',
        stream: 'Commerce & Finance',
        badge: 'Corporate Ready',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        description: 'Postgraduate degree preparing graduates for investment banking, asset management, and actuarial roles.',
      },
      {
        slug: 'christ-ba-journalism',
        title: 'B.A. in Journalism & Mass Communication',
        fee: '₹5,40,000',
        duration: '3 Years',
        category: 'ug',
        mode: 'offline',
        stream: 'Mass Communication & Journalism',
        badge: 'Studio Access',
        badgeColor: 'bg-rose-100 text-rose-800',
        description: 'Hands-on media education in broadcast journalism, digital media production, and public relations.',
      },
      {
        slug: 'christ-ma-media',
        title: 'M.A. in Media and Communication Studies',
        fee: '₹3,90,000',
        duration: '2 Years',
        category: 'pg',
        mode: 'offline',
        stream: 'Mass Communication & Journalism',
        badge: 'Industry Connect',
        badgeColor: 'bg-purple-100 text-purple-800',
        description: 'Advanced media research, film studies, advertising, and corporate brand communications.',
      },
      {
        slug: 'christ-bed-education',
        title: 'B.Ed. (Bachelor of Education)',
        fee: '₹1,90,000',
        duration: '2 Years',
        category: 'ug',
        mode: 'offline',
        stream: 'Education',
        badge: 'NCTE Approved',
        badgeColor: 'bg-amber-100 text-amber-800',
        description: 'Professional teacher training program with experiential school internships and pedagogical research.',
      },
    ],
  },

  // 4. Manipal Health & Medical Sciences (Medical & Healthcare, Hotel Management)
  {
    slug: 'manipal-medical-health-sciences',
    name: 'Kasturba Medical & Health Sciences (MAHE Manipal)',
    shortName: 'KMC Manipal',
    location: 'Manipal, Karnataka',
    fullAddress: 'Tiger Circle, Madhav Nagar, Manipal, Karnataka - 576104',
    initials: 'KM',
    logoGradient: '#0D9488',
    rating: 4.9,
    ratingCount: '4,200 Reviews',
    nirfRank: 'Top 10 Medical Institutions in India',
    isFeatured: true,
    mode: 'offline',
    about: 'KMC Manipal and Welcomgroup Graduate School are world-renowned institutes offering medical, nursing, allied health, and premier hotel management education with 2,500-bed teaching hospital facilities.',
    established: '1953',
    campusSize: '600+ Acres University Town',
    studentsCount: '32,000+ Students',
    avgPackage: '₹12.5 LPA',
    highestPackage: '₹48 LPA',
    placementPct: '98%',
    topRecruiters: 'Apollo Hospitals, Fortis, Max Healthcare, Marriott International, Taj Hotels, Hyatt',
    approvals: ['NMC', 'INC', 'PCI', 'UGC', 'NAAC A++', 'NIRF'],
    courses: [
      {
        slug: 'kmc-mbbs-degree',
        title: 'MBBS (Bachelor of Medicine & Bachelor of Surgery)',
        fee: '₹72,00,000',
        duration: '5.5 Years',
        category: 'ug',
        mode: 'offline',
        stream: 'Medical & Healthcare',
        badge: '🏥 NMC Approved',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        description: 'Globally recognized medical degree with clinical rotations across multi-specialty tertiary hospitals.',
      },
      {
        slug: 'kmc-bpharm-degree',
        title: 'B.Pharm (Bachelor of Pharmacy)',
        fee: '₹11,80,000',
        duration: '4 Years',
        category: 'ug',
        mode: 'offline',
        stream: 'Medical & Healthcare',
        badge: 'PCI Approved',
        badgeColor: 'bg-cyan-100 text-cyan-800',
        description: 'Comprehensive pharmaceutical science curriculum covering drug formulation, pharmacology, and clinical research.',
      },
      {
        slug: 'kmc-bsc-nursing',
        title: 'B.Sc. Nursing',
        fee: '₹6,80,000',
        duration: '4 Years',
        category: 'ug',
        mode: 'offline',
        stream: 'Medical & Healthcare',
        badge: 'INC Approved',
        badgeColor: 'bg-teal-100 text-teal-800',
        description: 'Professional nursing program with intense clinical bedside training and global healthcare placements.',
      },
      {
        slug: 'kmc-mph-public-health',
        title: 'Master of Public Health (MPH)',
        fee: '₹5,50,000',
        duration: '2 Years',
        category: 'pg',
        mode: 'offline',
        stream: 'Medical & Healthcare',
        badge: 'Global Health',
        badgeColor: 'bg-blue-100 text-blue-800',
        description: 'Epidemiology, health systems management, disease surveillance, and biostatistics for healthcare leaders.',
      },
      {
        slug: 'wgsha-bhm-hospitality',
        title: 'BHM (Bachelor of Hotel Management)',
        fee: '₹14,20,000',
        duration: '4 Years',
        category: 'ug',
        mode: 'offline',
        stream: 'Hotel Management & Hospitality',
        badge: '🏨 #1 Hotel School',
        badgeColor: 'bg-amber-100 text-amber-800',
        description: 'India’s top-ranked hospitality institute with commercial training hotels and global luxury hotel placements.',
      },
    ],
  },

  // 5. NID / Srishti Design & Architecture
  {
    slug: 'srishti-institute-art-design',
    name: 'Srishti Manipal Institute of Art, Design & Technology',
    shortName: 'Srishti Design',
    location: 'Yelahanka, Bengaluru, Karnataka',
    fullAddress: 'CA Site No. 21, 5th Phase, Yelahanka New Town, Bengaluru - 560064',
    initials: 'SM',
    logoGradient: '#EA580C',
    rating: 4.75,
    ratingCount: '1,650 Reviews',
    nirfRank: 'Top 5 Design Institutes in India',
    isFeatured: true,
    mode: 'offline',
    about: 'Srishti Manipal is one of India’s leading institutions for design, contemporary art, and creative technologies with state-of-the-art studios, fabrication labs, and international design showcases.',
    established: '1996',
    campusSize: '35 Acres Creative Campus',
    studentsCount: '4,500+ Designers',
    avgPackage: '₹9.8 LPA',
    highestPackage: '₹28 LPA',
    placementPct: '93%',
    topRecruiters: 'IKEA, Tata Elxsi, Infosys Design, Microsoft UX, Samsung, Ogilvy, Landor',
    approvals: ['UGC', 'AICTE', 'COA'],
    courses: [
      {
        slug: 'srishti-bdes-product',
        title: 'B.Des in Industrial & Product Design',
        fee: '₹18,50,000',
        duration: '4 Years',
        category: 'ug',
        mode: 'offline',
        stream: 'Design & Architecture',
        badge: '🎨 Design Flagship',
        badgeColor: 'bg-rose-100 text-rose-800',
        description: 'Hands-on studio design program emphasizing user research, CAD prototyping, UI/UX, and smart consumer products.',
      },
      {
        slug: 'srishti-barch-architecture',
        title: 'B.Arch (Bachelor of Architecture)',
        fee: '₹14,80,000',
        duration: '5 Years',
        category: 'ug',
        mode: 'offline',
        stream: 'Design & Architecture',
        badge: 'COA Approved',
        badgeColor: 'bg-orange-100 text-orange-800',
        description: 'Council of Architecture accredited 5-year degree in sustainable architectural planning and urban design.',
      },
      {
        slug: 'srishti-mdes-interaction',
        title: 'M.Des in Interaction Design & UI/UX',
        fee: '₹9,40,000',
        duration: '2 Years',
        category: 'pg',
        mode: 'offline',
        stream: 'Design & Architecture',
        badge: 'High Demand',
        badgeColor: 'bg-purple-100 text-purple-800',
        description: 'Postgraduate design specialization in human-centered technology, digital product design, and AR/VR systems.',
      },
    ],
  },

  // 6. Punjab Agricultural University (Agriculture)
  {
    slug: 'punjab-agricultural-university',
    name: 'Punjab Agricultural University (PAU)',
    shortName: 'PAU Ludhiana',
    location: 'Ludhiana, Punjab',
    fullAddress: 'Ferozepur Road, Ludhiana, Punjab - 141004',
    initials: 'PA',
    logoGradient: '#15803D',
    rating: 4.8,
    ratingCount: '2,400 Reviews',
    nirfRank: '1 (Agriculture)',
    isFeatured: true,
    mode: 'offline',
    about: 'PAU Ludhiana pioneered India’s Green Revolution and ranks among Asia’s best agricultural universities with 1,500+ acres of experimental farms, precision agriculture labs, and seed research centers.',
    established: '1962',
    campusSize: '1,500+ Acres Agronomy Campus',
    studentsCount: '6,000+ Agricultural Scientists',
    avgPackage: '₹6.8 LPA',
    highestPackage: '₹18 LPA',
    placementPct: '91%',
    topRecruiters: 'ITC Agribusiness, Bayer CropScience, Syngenta, Mahindra Agri, NABARD, Godrej Agrovet',
    approvals: ['ICAR', 'UGC', 'NIRF'],
    courses: [
      {
        slug: 'pau-bsc-agriculture',
        title: 'B.Sc. (Hons.) in Agriculture',
        fee: '₹2,80,000',
        duration: '4 Years',
        category: 'ug',
        mode: 'offline',
        stream: 'Agriculture',
        badge: '🌾 ICAR #1',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        description: 'India’s most prestigious undergraduate agricultural sciences program with agronomy, horticulture, and soil science.',
      },
      {
        slug: 'pau-msc-agribusiness',
        title: 'M.Sc. in Agribusiness Economics & Management',
        fee: '₹1,90,000',
        duration: '2 Years',
        category: 'pg',
        mode: 'offline',
        stream: 'Agriculture',
        badge: 'Agri Core',
        badgeColor: 'bg-green-100 text-green-800',
        description: 'Postgraduate program covering agricultural commodity markets, supply chain logistics, and farm management.',
      },
    ],
  },
];

// Online courses to enrich existing online universities
const onlineCoursesToUpsert = [
  // Alliance University Online
  {
    collegeSlug: 'alliance-university-online',
    courses: [
      {
        slug: 'alliance-online-bba',
        title: 'Online BBA (Bachelor of Business Administration)',
        fee: '₹1,20,000',
        duration: '3 Years',
        category: 'ug',
        mode: 'online',
        stream: 'Management & Business',
        badge: 'UGC-DEB',
        badgeColor: 'bg-sky-100 text-sky-800',
        description: 'Flexible online management program for students and budding entrepreneurs with live weekend sessions.',
      },
      {
        slug: 'alliance-online-bcom',
        title: 'Online B.Com (Accounting & Finance)',
        fee: '₹95,000',
        duration: '3 Years',
        category: 'ug',
        mode: 'online',
        stream: 'Commerce & Finance',
        badge: 'Affordable',
        badgeColor: 'bg-blue-100 text-blue-800',
        description: 'Accredited undergraduate commerce degree with contemporary corporate accounting and taxation.',
      },
      {
        slug: 'alliance-online-mcom',
        title: 'Online M.Com in International Banking & Finance',
        fee: '₹1,10,000',
        duration: '2 Years',
        category: 'pg',
        mode: 'online',
        stream: 'Commerce & Finance',
        badge: 'Global Finance',
        badgeColor: 'bg-indigo-100 text-indigo-800',
        description: 'Career advancement degree for working finance professionals with virtual masterclasses.',
      },
    ],
  },

  // Manipal University Online
  {
    collegeSlug: 'manipal-online',
    courses: [
      {
        slug: 'manipal-online-mca',
        title: 'Online MCA (Cloud Computing & AI)',
        fee: '₹1,50,000',
        duration: '2 Years',
        category: 'pg',
        mode: 'online',
        stream: 'Computer & IT',
        badge: '⭐ In High Demand',
        badgeColor: 'bg-purple-100 text-purple-800',
        description: 'Industry-designed Master of Computer Applications with hands-on cloud labs and coding projects.',
      },
      {
        slug: 'manipal-online-mph',
        title: 'Online Master of Public Health (MPH)',
        fee: '₹1,80,000',
        duration: '2 Years',
        category: 'pg',
        mode: 'online',
        stream: 'Medical & Healthcare',
        badge: 'UGC Approved',
        badgeColor: 'bg-teal-100 text-teal-800',
        description: 'Flexible postgraduate health sciences degree for hospital administrators and health consultants.',
      },
      {
        slug: 'manipal-online-ma-jmc',
        title: 'Online M.A. in Journalism & Mass Communication',
        fee: '₹1,20,000',
        duration: '2 Years',
        category: 'pg',
        mode: 'online',
        stream: 'Mass Communication & Journalism',
        badge: 'Digital Media',
        badgeColor: 'bg-rose-100 text-rose-800',
        description: 'Specialized online master’s program in digital journalism, multimedia reporting, and PR.',
      },
    ],
  },

  // Amity University Online
  {
    collegeSlug: 'amity-online',
    courses: [
      {
        slug: 'amity-online-ba',
        title: 'Online B.A. (English, Psychology & Economics)',
        fee: '₹85,000',
        duration: '3 Years',
        category: 'ug',
        mode: 'online',
        stream: 'Arts & Humanities',
        badge: 'UGC-DEB',
        badgeColor: 'bg-emerald-100 text-emerald-800',
        description: 'Liberal arts undergraduate degree with flexible online examinations and self-paced LMS.',
      },
      {
        slug: 'amity-online-ma-psychology',
        title: 'Online M.A. in Psychology & Counseling',
        fee: '₹1,15,000',
        duration: '2 Years',
        category: 'pg',
        mode: 'online',
        stream: 'Arts & Humanities',
        badge: 'Trending',
        badgeColor: 'bg-pink-100 text-pink-800',
        description: 'In-depth behavioral sciences and counseling curriculum designed for educators and HR consultants.',
      },
      {
        slug: 'amity-online-cyber-law',
        title: 'Online LL.M in Cyber Law & Information Security',
        fee: '₹1,30,000',
        duration: '1 Year',
        category: 'pg',
        mode: 'online',
        stream: 'Law',
        badge: 'Tech Law',
        badgeColor: 'bg-slate-100 text-slate-800',
        description: 'Postgraduate legal specialization in data privacy laws, GDPR compliance, and IT dispute resolution.',
      },
    ],
  },
];

async function seedComprehensive() {
  console.log('--- Starting Comprehensive Seed for Offline & Online Courses ---');

  // Seed colleges & courses
  for (const c of collegesToUpsert) {
    const { approvals, courses, ...data } = c;
    const college = await prisma.college.upsert({
      where: { slug: c.slug },
      create: {
        ...data,
      },
      update: {
        ...data,
      },
    });

    for (const label of approvals) {
      const app = await prisma.approval.upsert({
        where: { label },
        create: { label },
        update: {},
      });
      await prisma.collegeApproval.upsert({
        where: { collegeId_approvalId: { collegeId: college.id, approvalId: app.id } },
        create: { collegeId: college.id, approvalId: app.id },
        update: {},
      });
    }

    for (const crs of courses) {
      await prisma.course.upsert({
        where: { slug: crs.slug },
        create: {
          ...crs,
          collegeId: college.id,
        },
        update: {
          ...crs,
          collegeId: college.id,
        },
      });
    }
    console.log(`✓ Seeded college & courses: ${college.name}`);
  }

  // Seed extra online courses
  for (const group of onlineCoursesToUpsert) {
    const college = await prisma.college.findUnique({ where: { slug: group.collegeSlug } });
    if (!college) continue;

    for (const crs of group.courses) {
      await prisma.course.upsert({
        where: { slug: crs.slug },
        create: {
          ...crs,
          collegeId: college.id,
        },
        update: {
          ...crs,
          collegeId: college.id,
        },
      });
    }
    console.log(`✓ Added online courses for: ${college.name}`);
  }

  // Update existing courses to make sure streams are mapped properly
  const streamMappings: Record<string, string> = {
    'cu-online-mba': 'Management & Business',
    'ignou-mba': 'Management & Business',
    'ignou-bba': 'Management & Business',
    'manipal-online-mba': 'Management & Business',
    'manipal-online-bca': 'Computer & IT',
    'bits-btech-cse': 'Engineering & Technology',
    'bits-mba-analytics': 'Management & Business',
    'christ-bba-honours': 'Management & Business',
    'christ-mba-dual': 'Management & Business',
    'sibm-fulltime-mba': 'Management & Business',
    'vit-btech-cse-campus': 'Engineering & Technology',
    'vit-mca-regular': 'Computer & IT',
  };

  for (const [slug, stream] of Object.entries(streamMappings)) {
    await prisma.course.updateMany({
      where: { slug },
      data: { stream },
    });
  }

  console.log('--- Comprehensive Seed Completed Successfully! ---');
}

seedComprehensive()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
