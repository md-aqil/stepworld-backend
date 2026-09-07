import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Alumni = { name: string; initials: string; color: string };
type Faculty = { name: string; title: string; experience: string; specialization: string; initials: string; color: string };
type CollegeDef = {
  slug: string;
  name: string;
  shortName: string;
  location: string;
  fullAddress?: string;
  initials: string;
  logoColor: string; // solid color, NOT a gradient
  rating: number;
  ratingCount: string;
  nirfRank?: string;
  qsRank?: string;
  isFeatured?: boolean;
  about: string;
  mission: string;
  established: string;
  campusSize: string;
  studentsCount: string;
  avgPackage: string;
  highestPackage: string;
  placementPct: string;
  topRecruiters: string;
  approvals: string[];
  alumni: Alumni[];
  faculty: Faculty[];
  courses: Array<{
    slug: string;
    title: string;
    fee: string;
    duration: string;
    specializations?: string;
    badge?: string;
    badgeColor?: string;
    description: string;
    eligibility: string;
    careerOutcomes: string;
    avgSalary: string;
    skills: string;
    jobRoles: string;
    syllabus: { semester: number; subjects: string[] }[];
  }>;
};

const COLLEGES: CollegeDef[] = [
  {
    slug: 'alliance-university-online',
    name: 'Alliance University Online',
    shortName: 'Alliance Online',
    location: 'Bengaluru, Karnataka',
    fullAddress: 'Central Campus, Chikkahadage Cross, Chandapura-Anekal Main Road, Bengaluru',
    initials: 'AU',
    logoColor: '#E11D48',
    rating: 4.1,
    ratingCount: '7 Reviews',
    nirfRank: '71',
    qsRank: 'Top 1% in South Asia',
    isFeatured: true,
    about:
      "Alliance Online believes in redefining the future of students by providing them with flexible, accessible, and impactful learning through online education. The online programs offered by the university bridge the gap between technology and transformative education.",
    mission: 'To develop leaders and innovators who create positive change through accessible, industry-aligned education.',
    established: '2010',
    campusSize: '55+ Acres',
    studentsCount: '30,000+',
    avgPackage: '₹6.5 LPA',
    highestPackage: '₹32 LPA',
    placementPct: '94%',
    topRecruiters: 'Deloitte, EY, KPMG, Amazon, Infosys, TCS, Wipro, Accenture, HDFC, ICICI',
    approvals: ['UGC', 'NAAC A+', 'AICTE', 'NIRF', 'WES', 'QS World University Rankings'],
    alumni: [
      { name: 'Google', initials: 'G', color: '#4285F4' },
      { name: 'Microsoft', initials: 'M', color: '#00A4EF' },
      { name: 'Amazon', initials: 'A', color: '#FF9900' },
      { name: 'Deloitte', initials: 'D', color: '#86BC25' },
      { name: 'TCS', initials: 'T', color: '#98272B' },
      { name: 'Infosys', initials: 'I', color: '#007CC0' },
      { name: 'Accenture', initials: 'A', color: '#A100FF' },
      { name: 'Wipro', initials: 'W', color: '#341239' },
    ],
    faculty: [
      { name: 'Dr. Anil Kumar', title: 'Dean — School of Business', experience: '22+ yrs', specialization: 'Strategic Management', initials: 'AK', color: '#1E40AF' },
      { name: 'Prof. Meera Iyer', title: 'Professor — Marketing', experience: '18+ yrs', specialization: 'Digital Marketing', initials: 'MI', color: '#BE185D' },
      { name: 'Dr. Rajesh Sharma', title: 'Professor — Finance', experience: '20+ yrs', specialization: 'Corporate Finance', initials: 'RS', color: '#047857' },
      { name: 'Prof. Sneha Verma', title: 'Associate Professor — Analytics', experience: '12+ yrs', specialization: 'Business Analytics', initials: 'SV', color: '#B45309' },
      { name: 'Dr. Vikram Singh', title: 'Professor — Operations', experience: '15+ yrs', specialization: 'Supply Chain', initials: 'VS', color: '#6D28D9' },
    ],
    courses: [],
  },
  {
    slug: 'ignou',
    name: 'Indira Gandhi National Open University',
    shortName: 'IGNOU',
    location: 'New Delhi',
    fullAddress: 'Maidan Garhi, New Delhi - 110068',
    initials: 'IG',
    logoColor: '#003366',
    rating: 4.7,
    ratingCount: '2,140 Reviews',
    nirfRank: '1',
    qsRank: 'South Asia Top 50',
    isFeatured: true,
    about:
      "Indira Gandhi National Open University (IGNOU) is India's largest and the world's second-largest open university, serving over 3 million learners. IGNOU offers flexible, affordable, and quality higher education across disciplines through distance and online modes.",
    mission: 'To democratise higher education by providing access to quality programmes at affordable costs, reaching the unreached.',
    established: '1985',
    campusSize: '611 Acres',
    studentsCount: '30 Lakh+',
    avgPackage: '₹4.8 LPA',
    highestPackage: '₹18 LPA',
    placementPct: '78%',
    topRecruiters: 'TCS, Infosys, Wipro, HCL, SBI, LIC, NIIT, Paytm, BYJU\'S, Accenture',
    approvals: ['UGC', 'NAAC A++', 'AICTE', 'NIRF', 'AIU', 'NCTE'],
    alumni: [
      { name: 'IAS Officers', initials: 'IA', color: '#003366' },
      { name: 'Banking Sector', initials: 'BS', color: '#0EA5E9' },
      { name: 'Defense Services', initials: 'DS', color: '#047857' },
      { name: 'Teaching', initials: 'TE', color: '#B45309' },
      { name: 'PSUs', initials: 'PS', color: '#6D28D9' },
      { name: 'Healthcare', initials: 'HC', color: '#BE185D' },
    ],
    faculty: [
      { name: 'Prof. Nageshwar Rao', title: 'Vice Chancellor', experience: '30+ yrs', specialization: 'Distance Education', initials: 'NR', color: '#003366' },
      { name: 'Prof. Sunil Kumar', title: 'Professor — Management', experience: '25+ yrs', specialization: 'HR & OB', initials: 'SK', color: '#1E40AF' },
      { name: 'Dr. Pardeep Sahni', title: 'Professor — Economics', experience: '20+ yrs', specialization: 'Development Economics', initials: 'PS', color: '#047857' },
    ],
    courses: [
      {
        slug: 'ignou-mba',
        title: 'Online MBA',
        fee: '₹62,000',
        category: 'pg',
        duration: '2 Years',
        specializations: '8 Specializations',
        badge: '🔥 Popular',
        badgeColor: 'bg-red-100 text-red-700',
        description: "IGNOU's flagship MBA program for working professionals and graduates. Approved by AICTE with flexible Open & Distance Learning mode.",
        eligibility: "Bachelor's degree with 50%+ marks (45% for reserved categories) from a recognized university. No entrance exam.",
        careerOutcomes: 'Strong placements in BFSI, IT services, and government sectors. Many alumni move into PSU roles after 2-3 years.',
        avgSalary: '₹4.5 - ₹12 LPA',
        skills: 'Leadership, Marketing, Finance, HR, Operations, Strategy',
        jobRoles: 'Business Analyst, Marketing Executive, HR Manager, Operations Lead, Bank Officer',
        syllabus: [
          { semester: 1, subjects: ['Management Functions & Organisational Behaviour', 'Human Resource Management', 'Business Environment', 'Accounting for Managers', 'Quantitative Analysis', 'Marketing Management'] },
          { semester: 2, subjects: ['Financial Management', 'Operations Management', 'Business Research Methods', 'Information Systems for Managers', 'Management Science', 'Project Management'] },
          { semester: 3, subjects: ['Strategic Management', 'Specialization Core I', 'Specialization Core II', 'Elective I', 'Elective II', 'Business Ethics'] },
          { semester: 4, subjects: ['International Business', 'Specialization Core III', 'Specialization Core IV', 'Elective III', 'Project Report', 'Comprehensive Viva'] },
        ],
      },
      {
        slug: 'ignou-bba',
        title: 'Online BBA',
        fee: '₹30,000',
        category: 'ug',
        duration: '3 Years',
        specializations: '5 Specializations',
        badge: 'Affordable',
        badgeColor: 'bg-blue-100 text-blue-700',
        description: 'Affordable BBA program from IGNOU, designed for students who want a flexible undergraduate management degree.',
        eligibility: '10+2 or equivalent with relevant subjects.',
        careerOutcomes: 'Entry-level management roles, fast-track to MBA, government and banking jobs.',
        avgSalary: '₹3 - ₹6 LPA',
        skills: 'Communication, Teamwork, Marketing, Analytics',
        jobRoles: 'Sales Executive, Marketing Associate, Operations Coordinator, Junior Consultant',
        syllabus: [
          { semester: 1, subjects: ['Business Organisation', 'Business Economics', 'Financial Accounting', 'Business Law', 'Communication Skills'] },
          { semester: 2, subjects: ['Principles of Management', 'Marketing Fundamentals', 'Cost Accounting', 'Business Statistics', 'IT Skills'] },
          { semester: 3, subjects: ['Human Resource Management', 'Business Environment', 'Organisational Behaviour', 'Taxation', 'Elective I'] },
          { semester: 4, subjects: ['Operations Management', 'Corporate Finance', 'Marketing Management', 'Elective II', 'Project'] },
          { semester: 5, subjects: ['Strategic Management', 'Business Ethics', 'Elective III', 'Internship Report', 'Elective IV'] },
          { semester: 6, subjects: ['Entrepreneurship', 'International Business', 'Elective V', 'Dissertation', 'Comprehensive Viva'] },
        ],
      },
    ],
  },
  {
    slug: 'manipal-online',
    name: 'Manipal University Online (MAHE)',
    shortName: 'Manipal Online',
    location: 'Jaipur, Rajasthan',
    fullAddress: 'Manipal University Jaipur, Dehmi Kalan, Jaipur-Ajmer Express Highway, Jaipur',
    initials: 'MU',
    logoColor: '#0F766E',
    rating: 4.8,
    ratingCount: '1,820 Reviews',
    nirfRank: '64',
    qsRank: 'South Asia Top 100',
    isFeatured: true,
    about:
      "Manipal Academy of Higher Education (MAHE) is a globally recognised institution offering online degrees with the same academic rigour as on-campus. Its online platform reaches learners across India and abroad with UGC-entitled programs.",
    mission: 'To deliver world-class education through innovation, research and global collaborations.',
    established: '1953',
    campusSize: '313 Acres',
    studentsCount: '28,000+',
    avgPackage: '₹7.2 LPA',
    highestPackage: '₹45 LPA',
    placementPct: '92%',
    topRecruiters: 'Microsoft, Google, Amazon, IBM, Deloitte, Cognizant, Capgemini, Infosys, TCS',
    approvals: ['UGC', 'NAAC A+', 'AICTE', 'NIRF', 'WES', 'QS World University Rankings', 'AACSB'],
    alumni: [
      { name: 'Microsoft', initials: 'M', color: '#00A4EF' },
      { name: 'Google', initials: 'G', color: '#4285F4' },
      { name: 'Amazon', initials: 'A', color: '#FF9900' },
      { name: 'IBM', initials: 'I', color: '#0530AD' },
      { name: 'Deloitte', initials: 'D', color: '#86BC25' },
      { name: 'Cognizant', initials: 'C', color: '#003D7A' },
      { name: 'Capgemini', initials: 'C', color: '#0070BD' },
      { name: 'TCS', initials: 'T', color: '#98272B' },
    ],
    faculty: [
      { name: 'Dr. H. S. Ballal', title: 'Vice Chancellor', experience: '35+ yrs', specialization: 'Higher Education', initials: 'HB', color: '#0F766E' },
      { name: 'Prof. Madhu Veeraraghavan', title: 'Professor — Finance', experience: '25+ yrs', specialization: 'Capital Markets', initials: 'MV', color: '#1E40AF' },
      { name: 'Dr. Shalini Sharma', title: 'Associate Professor — Analytics', experience: '15+ yrs', specialization: 'Data Analytics', initials: 'SS', color: '#BE185D' },
      { name: 'Prof. Rajeev Joshi', title: 'Professor — Marketing', experience: '22+ yrs', specialization: 'Consumer Behaviour', initials: 'RJ', color: '#047857' },
    ],
    courses: [
      {
        slug: 'manipal-online-mba',
        title: 'Online MBA',
        fee: '₹1,75,000',
        category: 'pg',
        duration: '2 Years',
        specializations: '12 Specializations',
        badge: '⭐ Top Rated',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        description: 'A premium UGC-entitled online MBA from MAHE with weekend live classes and global faculty.',
        eligibility: "Bachelor's degree with 50%+ marks from a recognized university. Work experience preferred but not mandatory.",
        careerOutcomes: 'High placement outcomes across IT, BFSI, and consulting. Strong alumni network globally.',
        avgSalary: '₹7 - ₹18 LPA',
        skills: 'Strategic Thinking, Leadership, Analytics, Communication, Negotiation',
        jobRoles: 'Product Manager, Consultant, Marketing Manager, Business Analyst, Strategy Lead',
        syllabus: [
          { semester: 1, subjects: ['Principles of Management', 'Managerial Economics', 'Financial Accounting', 'Marketing Management', 'Organisational Behaviour', 'Business Communication'] },
          { semester: 2, subjects: ['Operations Management', 'Human Resource Management', 'Business Research', 'Corporate Finance', 'Business Analytics', 'Business Law'] },
          { semester: 3, subjects: ['Strategic Management', 'Specialization Core I', 'Specialization Core II', 'Elective I', 'Capstone Phase I', 'Data Visualisation'] },
          { semester: 4, subjects: ['International Business', 'Specialization Core III', 'Specialization Core IV', 'Elective II', 'Capstone Phase II', 'Industry Project'] },
        ],
      },
      {
        slug: 'manipal-online-bca',
        title: 'Online BCA',
        fee: '₹99,000',
        category: 'ug',
        duration: '3 Years',
        specializations: '4 Specializations',
        badge: 'New',
        badgeColor: 'bg-blue-100 text-blue-700',
        description: 'A career-focused online BCA with specialisations in Cloud, AI, Data Science, and Cyber Security.',
        eligibility: '10+2 with Mathematics as a subject, 50%+ marks.',
        careerOutcomes: 'Entry to mid-level IT roles. Strong foundation for MCA or MS abroad.',
        avgSalary: '₹3.5 - ₹9 LPA',
        skills: 'Programming, Databases, Web Development, Cloud, AI basics',
        jobRoles: 'Junior Developer, QA Engineer, Cloud Engineer, Web Developer, Data Analyst',
        syllabus: [
          { semester: 1, subjects: ['Programming in C', 'Mathematics I', 'Digital Electronics', 'Communication Skills', 'Computer Fundamentals'] },
          { semester: 2, subjects: ['Data Structures', 'Discrete Mathematics', 'Operating Systems', 'DBMS', 'Web Technologies'] },
          { semester: 3, subjects: ['Object-Oriented Programming (Java)', 'Computer Networks', 'Software Engineering', 'Python Programming', 'Elective I'] },
          { semester: 4, subjects: ['Cloud Computing', 'AI Foundations', 'Database Administration', 'Cyber Security', 'Elective II'] },
          { semester: 5, subjects: ['Mobile App Development', 'DevOps Basics', 'Elective III', 'Project Work', 'Professional Ethics'] },
          { semester: 6, subjects: ['Capstone Project', 'Emerging Technologies', 'Elective IV', 'Internship Report', 'Comprehensive Viva'] },
        ],
      },
    ],
  },
  {
    slug: 'amity-online',
    name: 'Amity University Online',
    shortName: 'Amity Online',
    location: 'Noida, Uttar Pradesh',
    fullAddress: 'Amity University, Sector 125, Noida - 201313',
    initials: 'AU',
    logoColor: '#C8102E',
    rating: 4.6,
    ratingCount: '3,540 Reviews',
    nirfRank: '49',
    qsRank: 'Top 1% in Asia',
    isFeatured: true,
    about:
      "Amity University Online offers UGC-entitled online degrees from India's leading private university. With 25+ years of academic excellence, Amity brings global standards of education directly to learners' screens.",
    mission: 'To provide globally benchmarked education, fostering innovation, research and entrepreneurship.',
    established: '2005',
    campusSize: '1,100+ Acres',
    studentsCount: '1.5 Lakh+',
    avgPackage: '₹5.8 LPA',
    highestPackage: '₹42 LPA',
    placementPct: '90%',
    topRecruiters: 'Amazon, Microsoft, Deloitte, EY, KPMG, Cognizant, Infosys, Wipro, TCS, HCL',
    approvals: ['UGC', 'NAAC A+', 'AICTE', 'NIRF', 'WES', 'QS World University Rankings', 'AACSB'],
    alumni: [
      { name: 'Amazon', initials: 'A', color: '#FF9900' },
      { name: 'Microsoft', initials: 'M', color: '#00A4EF' },
      { name: 'Deloitte', initials: 'D', color: '#86BC25' },
      { name: 'EY', initials: 'E', color: '#2E2E38' },
      { name: 'KPMG', initials: 'K', color: '#00338D' },
      { name: 'Cognizant', initials: 'C', color: '#003D7A' },
      { name: 'Infosys', initials: 'I', color: '#007CC0' },
      { name: 'Wipro', initials: 'W', color: '#341239' },
    ],
    faculty: [
      { name: 'Dr. Ashok K. Chauhan', title: 'Founder Chancellor', experience: '40+ yrs', specialization: 'Education Leadership', initials: 'AC', color: '#C8102E' },
      { name: 'Prof. (Dr.) Balvinder Shukla', title: 'Vice Chancellor', experience: '30+ yrs', specialization: 'Business Strategy', initials: 'BS', color: '#1E40AF' },
      { name: 'Dr. Sanjay Srivastava', title: 'Professor — Data Science', experience: '20+ yrs', specialization: 'Machine Learning', initials: 'SS', color: '#047857' },
    ],
    courses: [
      {
        slug: 'amity-online-mba',
        title: 'Online MBA',
        fee: '₹1,99,000',
        category: 'pg',
        duration: '2 Years',
        specializations: '14 Specializations',
        badge: '⚡ Trending',
        badgeColor: 'bg-blue-100 text-blue-700',
        description: "India's most popular online MBA with 14 specializations and strong placement support from Amity.",
        eligibility: "Bachelor's degree with 40%+ marks from a recognized university.",
        careerOutcomes: 'Excellent recruiter network, high placement rate, top packages across IT, BFSI and consulting.',
        avgSalary: '₹6 - ₹18 LPA',
        skills: 'Strategy, Leadership, Marketing, Finance, HR, Analytics',
        jobRoles: 'Product Manager, Marketing Manager, HR Manager, Business Analyst, Consultant',
        syllabus: [
          { semester: 1, subjects: ['Management Theory & Practice', 'Organisational Behaviour', 'Managerial Economics', 'Financial Accounting', 'Marketing Management', 'Business Communication'] },
          { semester: 2, subjects: ['Operations Management', 'Business Research Methods', 'Human Resource Management', 'Corporate Finance', 'Information Systems', 'Business Law'] },
          { semester: 3, subjects: ['Strategic Management', 'Specialization I', 'Specialization II', 'Elective I', 'Capstone Phase I', 'Business Analytics'] },
          { semester: 4, subjects: ['International Business', 'Specialization III', 'Specialization IV', 'Elective II', 'Capstone Phase II', 'Industry Internship'] },
        ],
      },
    ],
  },
  {
    slug: 'chandigarh-online',
    name: 'Chandigarh University Online',
    shortName: 'CU Online',
    location: 'Mohali, Punjab',
    fullAddress: 'Chandigarh University, NH-05, Ludhiana - Chandigarh State Hwy, Mohali',
    initials: 'CU',
    logoColor: '#1E3A8A',
    rating: 4.5,
    ratingCount: '1,250 Reviews',
    nirfRank: '32',
    qsRank: 'Top 200 in Asia',
    isFeatured: false,
    about:
      'Chandigarh University offers UGC-entitled online degrees with industry-aligned curriculum and dedicated placement support. Strong focus on practical learning and skill development.',
    mission: 'To provide accessible, world-class education that empowers learners with skills for the future.',
    established: '2012',
    campusSize: '200+ Acres',
    studentsCount: '40,000+',
    avgPackage: '₹5.5 LPA',
    highestPackage: '₹36 LPA',
    placementPct: '88%',
    topRecruiters: 'Microsoft, IBM, Amazon, Wipro, Infosys, TCS, Capgemini, Deloitte',
    approvals: ['UGC', 'NAAC A+', 'AICTE', 'NIRF', 'AIU'],
    alumni: [
      { name: 'Microsoft', initials: 'M', color: '#00A4EF' },
      { name: 'IBM', initials: 'I', color: '#0530AD' },
      { name: 'Amazon', initials: 'A', color: '#FF9900' },
      { name: 'Wipro', initials: 'W', color: '#341239' },
      { name: 'Infosys', initials: 'I', color: '#007CC0' },
      { name: 'TCS', initials: 'T', color: '#98272B' },
      { name: 'Capgemini', initials: 'C', color: '#0070BD' },
      { name: 'Deloitte', initials: 'D', color: '#86BC25' },
    ],
    faculty: [
      { name: 'Prof. (Dr.) R.S. Bawa', title: 'Vice Chancellor', experience: '35+ yrs', specialization: 'Higher Education', initials: 'RB', color: '#1E3A8A' },
      { name: 'Dr. Deepak Sharma', title: 'Professor — Analytics', experience: '18+ yrs', specialization: 'Big Data', initials: 'DS', color: '#047857' },
    ],
    courses: [
      {
        slug: 'cu-online-mba',
        title: 'Online MBA',
        fee: '₹1,40,000',
        category: 'pg',
        duration: '2 Years',
        specializations: '10 Specializations',
        badge: 'New',
        badgeColor: 'bg-purple-100 text-purple-700',
        description: 'Flexible online MBA with UGC entitlement, AICTE approval, and active placement support.',
        eligibility: "Bachelor's degree with 50%+ marks from a recognized university.",
        careerOutcomes: 'Strong placements across IT, manufacturing, BFSI sectors.',
        avgSalary: '₹5 - ₹14 LPA',
        skills: 'Leadership, Marketing, Finance, HR, IT Management',
        jobRoles: 'Business Manager, Sales Head, HR Manager, Analyst, Operations Manager',
        syllabus: [
          { semester: 1, subjects: ['Principles of Management', 'Managerial Economics', 'Financial Accounting', 'Marketing Management', 'OB', 'Business Statistics'] },
          { semester: 2, subjects: ['Operations Management', 'Corporate Finance', 'HRM', 'Business Research', 'Information Systems', 'Business Communication'] },
          { semester: 3, subjects: ['Strategic Management', 'Specialization I', 'Specialization II', 'Elective I', 'Business Analytics', 'Capstone I'] },
          { semester: 4, subjects: ['International Business', 'Specialization III', 'Specialization IV', 'Elective II', 'Capstone II', 'Industry Project'] },
        ],
      },
    ],
  },
];

async function main() {
  // Clean all data to avoid stale entries
  await prisma.courseReview.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.collegeReview.deleteMany({});
  await prisma.faculty.deleteMany({});
  await prisma.alumniLogo.deleteMany({});
  await prisma.collegeApproval.deleteMany({});
  await prisma.college.deleteMany({});
  await prisma.approval.deleteMany({});

  for (const def of COLLEGES) {
    // Upsert approvals
    const approvalRecords = await Promise.all(
      def.approvals.map((label) =>
        prisma.approval.upsert({ where: { label }, create: { label }, update: {} }),
      ),
    );
    const approvalByLabel = Object.fromEntries(approvalRecords.map((a) => [a.label, a]));

    const college = await prisma.college.create({
      data: {
        slug: def.slug,
        name: def.name,
        shortName: def.shortName,
        location: def.location,
        fullAddress: def.fullAddress,
        initials: def.initials,
        logoGradient: def.logoColor,
        rating: def.rating,
        ratingCount: def.ratingCount,
        nirfRank: def.nirfRank,
        qsRank: def.qsRank,
        isFeatured: !!def.isFeatured,
        about: def.about,
        mission: def.mission,
        established: def.established,
        campusSize: def.campusSize,
        studentsCount: def.studentsCount,
        avgPackage: def.avgPackage,
        highestPackage: def.highestPackage,
        placementPct: def.placementPct,
        topRecruiters: def.topRecruiters,
        approvals: {
          create: def.approvals.map((label) => ({ approvalId: approvalByLabel[label]!.id })),
        },
        faculty: { create: def.faculty },
        alumni: { create: def.alumni },
        reviews: {
          create: [
            { name: 'Alumni', initials: 'AL', color: def.logoColor, rating: 5, text: `Great learning experience at ${def.shortName}. Industry-relevant curriculum and supportive faculty.` },
            { name: 'Current Student', initials: 'CS', color: '#1E40AF', rating: 4, text: 'Live weekend classes fit my schedule. LMS is easy to use.' },
          ],
        },
      },
    });

    for (const c of def.courses) {
      await prisma.course.create({
        data: {
          slug: c.slug,
          title: c.title,
          fee: c.fee,
          duration: c.duration,
          specializations: c.specializations,
          badge: c.badge,
          badgeColor: c.badgeColor,
          description: c.description,
          eligibility: c.eligibility,
          careerOutcomes: c.careerOutcomes,
          avgSalary: c.avgSalary,
          skills: c.skills,
          jobRoles: c.jobRoles,
          syllabus: c.syllabus,
          category: c.category ?? 'pg',
          collegeId: college.id,
          reviews: {
            create: [
              { name: 'Rohan K.', initials: 'RK', color: def.logoColor, rating: 5, text: `Loved the ${c.title} curriculum. Industry projects really helped in interviews.` },
              { name: 'Sneha P.', initials: 'SP', color: '#BE185D', rating: 4, text: 'Well-structured content and helpful mentors. LMS was easy to use.' },
            ],
          },
        },
      });
    }
  }

  const totalColleges = await prisma.college.count();
  const totalCourses = await prisma.course.count();
  console.log(`✔ Seeded ${totalColleges} colleges and ${totalCourses} courses`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());