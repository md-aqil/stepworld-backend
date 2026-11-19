export interface Specialization {
  title: string;
  description: string;
  subjects: string[];
  career: string;
}

export interface EntranceExam {
  name: string;
  code: string;
  desc: string;
  sections: string[];
  acceptedBy: string;
  website: string;
}

export const blogMetadata = {
  title: 'MBA & PGDM Admission 2027–29 in India: Entrance Exams, Registration Dates, Direct Admission, Specializations & Top Colleges',
  publishedBy: 'Stepworld Education',
  badge: 'Complete Admission Guide 2027–29',
  category: 'Management & Business',
  date: 'November 2026',
  readTime: '15 min read',
  seoTitle: 'MBA & PGDM Admission 2027: Entrance Exams, Dates, Direct Admission & Specializations',
  metaDescription: 'Explore MBA and PGDM admission 2027 in India. Check CAT, XAT, SNAP, MAT, NMAT, CMAT, IBSAT and MICAT dates, registration deadlines, direct admission, specializations, fees and colleges.',
  suggestedUrl: 'mba-pgdm-admission-2027-entrance-exams-direct-admission',
  targetKeywords: [
    'MBA admission 2027',
    'PGDM admission 2027',
    'MBA entrance exam dates 2027',
    'PGDM entrance exam in India',
    'MBA direct admission',
    'MBA without CAT',
    'PGDM without CAT',
    'MBA specializations',
    'PGDM colleges in India',
    'MBA colleges in Noida',
    'MBA colleges in Greater Noida',
    'MBA admission through entrance exam',
    'MBA admission in private universities',
    'CAT XAT MAT CMAT SNAP NMAT',
    'PGDM admission without entrance exam'
  ],
  disclaimer: 'Admission schedules, fees, eligibility criteria, entrance exam acceptance and programme recognition may change. Students should verify the latest official information from the respective examination authorities and institutions before applying.'
};

export const entranceExams: EntranceExam[] = [
  {
    "name": "CAT \u2013 Common Admission Test",
    "code": "CAT",
    "desc": "CAT is one of the major management entrance examinations in India and is accepted by IIMs and several other management institutions.",
    "sections": [
      "Verbal Ability and Reading Comprehension",
      "Data Interpretation and Logical Reasoning",
      "Quantitative Aptitude"
    ],
    "acceptedBy": "IIMs and various CAT-accepting management colleges.",
    "website": "https://iimcat.ac.in/"
  },
  {
    "name": "XAT \u2013 Xavier Aptitude Test",
    "code": "XAT",
    "desc": "XAT is conducted by XLRI Jamshedpur and is accepted by various management institutes offering MBA and PGDM programmes.",
    "sections": [
      "Verbal and Logical Ability",
      "Decision Making",
      "Quantitative Aptitude and Data Interpretation",
      "General Knowledge"
    ],
    "acceptedBy": "XLRI and participating management institutes.",
    "website": "https://xatonline.in/"
  },
  {
    "name": "MAT \u2013 Management Aptitude Test",
    "code": "MAT",
    "desc": "MAT is conducted by AIMA and is accepted by participating management colleges across India in PBT, CBT, and IBT modes.",
    "sections": [
      "Language Comprehension",
      "Mathematical Skills",
      "Data Analysis and Sufficiency",
      "Intelligence and Critical Reasoning",
      "Economic and Business Environment"
    ],
    "acceptedBy": "Participating management institutes.",
    "website": "https://mat.aima.in/"
  },
  {
    "name": "CMAT \u2013 Common Management Admission Test",
    "code": "CMAT",
    "desc": "CMAT is a national-level management entrance examination conducted by the National Testing Agency (NTA).",
    "sections": [
      "Quantitative Techniques and Data Interpretation",
      "Logical Reasoning",
      "Language Comprehension",
      "General Awareness",
      "Innovation and Entrepreneurship"
    ],
    "acceptedBy": "AICTE-affiliated and participating universities/institutions.",
    "website": "https://exams.nta.ac.in/CMAT/"
  },
  {
    "name": "NMAT \u2013 NMAT by GMAC",
    "code": "NMAT",
    "desc": "NMAT is accepted by NMIMS and other participating institutions, offering computer-adaptive testing with flexible scheduling.",
    "sections": [
      "Language Skills",
      "Quantitative Skills",
      "Logical Reasoning"
    ],
    "acceptedBy": "NMIMS and partner institutions in India.",
    "website": "https://www.mba.com/exams/nmat"
  },
  {
    "name": "SNAP \u2013 Symbiosis National Aptitude Test",
    "code": "SNAP",
    "desc": "SNAP is conducted for admission to participating Symbiosis International (Deemed University) institutes.",
    "sections": [
      "General English",
      "Analytical and Logical Reasoning",
      "Quantitative, Data Interpretation & Data Sufficiency"
    ],
    "acceptedBy": "SIBM, SCMHRD, and other Symbiosis institutes.",
    "website": "https://www.snaptest.org/"
  },
  {
    "name": "ATMA \u2013 AIMS Test for Management Admissions",
    "code": "ATMA",
    "desc": "ATMA is a management entrance examination accepted by participating management colleges across India.",
    "sections": [
      "Analytical Reasoning",
      "Quantitative Skills",
      "Verbal Skills"
    ],
    "acceptedBy": "Participating management colleges.",
    "website": "https://atmaaims.com/"
  },
  {
    "name": "MAH MBA CET",
    "code": "MAH CET",
    "desc": "MAH MBA CET is a state-level management entrance examination for participating MBA and MMS institutions in Maharashtra.",
    "sections": [
      "Logical Reasoning",
      "Abstract Reasoning",
      "Quantitative Aptitude",
      "Verbal Ability & Reading Comprehension"
    ],
    "acceptedBy": "JBIMS, SIMSREE, PUMBA, and Maharashtra colleges.",
    "website": "https://cetcell.mahacet.org/"
  },
  {
    "name": "CUET-PG",
    "code": "CUET-PG",
    "desc": "CUET-PG is used by participating central, state, and private universities for postgraduate admissions, including management programmes.",
    "sections": [
      "Domain-specific management knowledge",
      "Language Comprehension",
      "General Awareness & Reasoning"
    ],
    "acceptedBy": "Central, state, and participating universities.",
    "website": "https://exams.nta.ac.in/CUET-PG/"
  },
  {
    "name": "IBSAT \u2013 ICFAI Business School Aptitude Test",
    "code": "IBSAT",
    "desc": "IBSAT is conducted for admissions to participating ICFAI Business School (IBS) campuses across India.",
    "sections": [
      "Quantitative Techniques",
      "Data Adequacy & Data Interpretation",
      "Vocabulary & Reading Comprehension"
    ],
    "acceptedBy": "ICFAI Business School campuses (Hyderabad, Mumbai, Gurgaon, etc.).",
    "website": "https://www.ibsindia.org/"
  },
  {
    "name": "MICAT \u2013 MICA Admission Test",
    "code": "MICAT",
    "desc": "MICAT is used for admission to MICA's management programmes and is part of its selection process along with CAT/XAT/GMAT scores.",
    "sections": [
      "Psychometric Test",
      "Descriptive Test",
      "Divergent-Convergent Thinking",
      "Verbal Ability",
      "Quantitative Ability",
      "General Awareness"
    ],
    "acceptedBy": "MICA Ahmedabad.",
    "website": "https://www.mica.ac.in/"
  }
];

export const examCalendar = [
  {
    "exam": "CAT 2026",
    "deadline": "3 Aug \u2013 22 Sep 2026",
    "examDate": "29 Nov 2026"
  },
  {
    "exam": "XAT 2027",
    "deadline": "15 Jul \u2013 6 Dec 2026",
    "examDate": "3 Jan 2027"
  },
  {
    "exam": "SNAP 2026",
    "deadline": "21 Aug \u2013 25 Nov 2026",
    "examDate": "13, 19 & 26 Dec 2026"
  },
  {
    "exam": "NMAT 2026",
    "deadline": "Registration reported closed",
    "examDate": "2 Nov \u2013 20 Dec 2026"
  },
  {
    "exam": "MAT PBT Dec 2026",
    "deadline": "14 Dec 2026",
    "examDate": "20 Dec 2026"
  },
  {
    "exam": "MAT CBT Dec 2026",
    "deadline": "21 Dec 2026",
    "examDate": "27 Dec 2026"
  },
  {
    "exam": "CMAT 2027",
    "deadline": "Not officially announced",
    "examDate": "Proposed 7 Feb 2027 (verify)"
  },
  {
    "exam": "IBSAT 2026",
    "deadline": "December 2026 deadlines reported",
    "examDate": "5, 6, 12, 13, 19, 20, 26 & 27 Dec 2026"
  },
  {
    "exam": "MICAT I 2027",
    "deadline": "21 Nov 2026",
    "examDate": "5 Dec 2026"
  },
  {
    "exam": "MICAT II 2027",
    "deadline": "30 Jan 2027",
    "examDate": "12 Feb 2027"
  },
  {
    "exam": "ATMA 2027",
    "deadline": "Not announced",
    "examDate": "Not announced"
  },
  {
    "exam": "MAH MBA CET 2027",
    "deadline": "Not announced",
    "examDate": "Not announced"
  },
  {
    "exam": "TANCET MBA 2027",
    "deadline": "Not announced",
    "examDate": "Not announced"
  },
  {
    "exam": "AP ICET 2027",
    "deadline": "Not announced",
    "examDate": "Not announced"
  },
  {
    "exam": "TG ICET 2027",
    "deadline": "Not announced",
    "examDate": "Not announced"
  },
  {
    "exam": "CUET-PG 2027",
    "deadline": "Not announced",
    "examDate": "Not announced"
  }
];

export const pgdmAcceptedExams = [
  {
    "exam": "CAT",
    "acceptedBy": "Various PGDM institutes"
  },
  {
    "exam": "XAT",
    "acceptedBy": "XLRI and participating institutes"
  },
  {
    "exam": "CMAT",
    "acceptedBy": "Participating PGDM colleges"
  },
  {
    "exam": "MAT",
    "acceptedBy": "Participating management institutes"
  },
  {
    "exam": "ATMA",
    "acceptedBy": "Participating management colleges"
  },
  {
    "exam": "GMAT",
    "acceptedBy": "Selected management institutes"
  },
  {
    "exam": "MICAT",
    "acceptedBy": "MICA, with applicable additional requirements"
  },
  {
    "exam": "NMAT",
    "acceptedBy": "Participating management institutes"
  }
];

export const topColleges = [
  {
    "name": "IIM Ahmedabad",
    "location": "Ahmedabad"
  },
  {
    "name": "IIM Bangalore",
    "location": "Bengaluru"
  },
  {
    "name": "IIM Lucknow",
    "location": "Lucknow"
  },
  {
    "name": "XLRI",
    "location": "Jamshedpur"
  },
  {
    "name": "MDI Gurgaon",
    "location": "Gurugram"
  },
  {
    "name": "IMT Ghaziabad",
    "location": "Ghaziabad"
  },
  {
    "name": "FORE School of Management",
    "location": "New Delhi"
  },
  {
    "name": "BIMTECH",
    "location": "Greater Noida"
  },
  {
    "name": "Jaipuria Institute of Management",
    "location": "Noida and other campuses"
  },
  {
    "name": "Goa Institute of Management",
    "location": "Goa"
  },
  {
    "name": "Lovely Professional University",
    "location": "Punjab"
  },
  {
    "name": "Amity University",
    "location": "Noida and other campuses"
  },
  {
    "name": "Sharda University",
    "location": "Greater Noida"
  },
  {
    "name": "Galgotias University",
    "location": "Greater Noida"
  },
  {
    "name": "GNIOT",
    "location": "Greater Noida"
  }
];

export const feeRanges = [
  {
    "type": "Government universities and colleges",
    "range": "\u20b920,000 \u2013 \u20b94 lakh"
  },
  {
    "type": "Public management institutes",
    "range": "\u20b92 lakh \u2013 \u20b910 lakh"
  },
  {
    "type": "Private universities",
    "range": "\u20b93 lakh \u2013 \u20b915 lakh+"
  },
  {
    "type": "Premium management institutes",
    "range": "\u20b910 lakh \u2013 \u20b930 lakh+"
  }
];

export const specializationMatrix = [
  {
    "interest": "Sales and branding",
    "recommended": "Marketing"
  },
  {
    "interest": "Banking and investments",
    "recommended": "Finance"
  },
  {
    "interest": "Recruitment and employee management",
    "recommended": "HR"
  },
  {
    "interest": "Data and decision-making",
    "recommended": "Business Analytics"
  },
  {
    "interest": "Technology and IT business",
    "recommended": "IT Management"
  },
  {
    "interest": "Manufacturing and processes",
    "recommended": "Operations"
  },
  {
    "interest": "Logistics and transportation",
    "recommended": "Supply Chain"
  },
  {
    "interest": "Global trade",
    "recommended": "International Business"
  },
  {
    "interest": "Startup and business ownership",
    "recommended": "Entrepreneurship"
  },
  {
    "interest": "Hospital administration",
    "recommended": "Healthcare Management"
  },
  {
    "interest": "Pharmaceutical business",
    "recommended": "Pharmaceutical Management"
  },
  {
    "interest": "Online business",
    "recommended": "E-Commerce"
  },
  {
    "interest": "Construction and infrastructure",
    "recommended": "Infrastructure Management"
  },
  {
    "interest": "Hotels and travel",
    "recommended": "Hospitality Management"
  },
  {
    "interest": "Agricultural business",
    "recommended": "Agribusiness Management"
  },
  {
    "interest": "Corporate projects",
    "recommended": "Project Management"
  }
];

export const faqs = [
  {
    "question": "Can I pursue MBA without CAT?",
    "answer": "Yes. Many colleges accept other entrance exams such as MAT, CMAT, XAT, NMAT, SNAP, ATMA or university-specific entrance exams. Some institutions may offer eligible alternative admission pathways without CAT."
  },
  {
    "question": "Is direct admission available for MBA in private colleges?",
    "answer": "Yes. Some private universities and management colleges offer admission through academic eligibility, institutional selection, interviews or other permitted criteria without requiring a national-level entrance exam."
  },
  {
    "question": "Can I pursue MBA after BTech?",
    "answer": "Yes. Engineering graduates can pursue MBA programmes in Marketing, Finance, Business Analytics, Operations, IT Management, HR, International Business and other specializations."
  },
  {
    "question": "Can students from BCom, BBA, BA and BSc pursue an MBA?",
    "answer": "Yes. Graduates from different academic disciplines can generally apply for MBA programmes, subject to the institution's eligibility requirements."
  },
  {
    "question": "Which MBA specialization is best?",
    "answer": "Marketing, Finance, HR, Business Analytics, IT, Operations and Supply Chain Management are commonly pursued specializations. The best option depends on the student's interests and career goals."
  },
  {
    "question": "What is the difference between MBA and PGDM?",
    "answer": "MBA is a postgraduate degree generally awarded by a university, while PGDM is a diploma awarded by an autonomous institution. Programme recognition and career opportunities depend on the institution and programme."
  },
  {
    "question": "Can I get admission in MBA without an entrance exam?",
    "answer": "Yes, some colleges offer admission through alternative or institution-based selection pathways. Students should confirm the eligibility, admission rules, recognition and fees before applying."
  },
  {
    "question": "Is MBA a good career option after graduation?",
    "answer": "MBA can be a valuable option for graduates interested in management, business, leadership, finance, marketing, operations, analytics and entrepreneurship. Its value depends on the quality of the programme and skills developed."
  },
  {
    "question": "Can I pursue PGDM without CAT?",
    "answer": "Yes, some PGDM institutions accept other entrance exams such as XAT, CMAT, MAT, ATMA or GMAT, where applicable. Some institutions may have alternative selection pathways, subject to their approved admission rules."
  },
  {
    "question": "What are the major PGDM entrance exams in India?",
    "answer": "CAT, XAT, CMAT, MAT, ATMA, GMAT and selected institute-specific admission tests are among the commonly used examinations for PGDM admissions."
  }
];

export const specializations: Specialization[] = [
  {
    "title": "MBA in Marketing Management",
    "description": "Marketing Management focuses on brand development, consumer behaviour, advertising, sales, market research and digital marketing.",
    "subjects": [
      "Marketing Management",
      "Consumer Behaviour",
      "Brand Management",
      "Digital Marketing",
      "Sales Management",
      "Market Research",
      "Advertising and Promotion",
      "Product Management",
      "**Career opportunities:**",
      "Marketing Manager",
      "Sales Manager",
      "Brand Manager",
      "Digital Marketing Manager",
      "Business Development Executive",
      "Market Research Analyst"
    ],
    "career": ""
  },
  {
    "title": "MBA in Finance",
    "description": "Finance focuses on financial planning, investments, corporate finance, banking, risk management and financial analysis.",
    "subjects": [
      "Corporate Finance",
      "Financial Management",
      "Investment Management",
      "Financial Markets",
      "Banking",
      "Risk Management",
      "Financial Accounting",
      "Portfolio Management",
      "**Career opportunities:**",
      "Financial Analyst",
      "Finance Manager",
      "Banking Professional",
      "Investment Analyst",
      "Credit Analyst",
      "Financial Consultant"
    ],
    "career": ""
  },
  {
    "title": "MBA in Human Resource Management",
    "description": "HR focuses on recruitment, employee engagement, organisational development, workplace policies and talent management.",
    "subjects": [
      "Human Resource Management",
      "Talent Acquisition",
      "Employee Relations",
      "Compensation and Benefits",
      "Performance Management",
      "HR Analytics",
      "Training and Development",
      "**Career opportunities:**",
      "HR Manager",
      "HR Executive",
      "Talent Acquisition Specialist",
      "Recruitment Manager",
      "HR Business Partner"
    ],
    "career": ""
  },
  {
    "title": "MBA in Business Analytics",
    "description": "Business Analytics combines business management with data analysis, statistics, technology and decision-making.",
    "subjects": [
      "Business Intelligence",
      "Data Analytics",
      "Predictive Analytics",
      "Data Visualisation",
      "Statistics",
      "Business Research",
      "Data-driven Decision Making",
      "**Career opportunities:**",
      "Business Analyst",
      "Data Analyst",
      "Business Intelligence Analyst",
      "Analytics Consultant",
      "Reporting Analyst"
    ],
    "career": ""
  },
  {
    "title": "MBA in Information Technology Management",
    "description": "IT Management focuses on technology management, digital systems, IT projects and technology-driven business operations.",
    "subjects": [
      "IT Management",
      "Information Systems",
      "Digital Transformation",
      "Technology Strategy",
      "IT Project Management",
      "Enterprise Systems",
      "**Career opportunities:**",
      "IT Manager",
      "IT Business Analyst",
      "Technology Consultant",
      "Project Manager",
      "Business Systems Analyst"
    ],
    "career": ""
  },
  {
    "title": "MBA in Operations Management",
    "description": "Operations Management focuses on production, process management, quality control and operational efficiency.",
    "subjects": [
      "Operations Management",
      "Production Management",
      "Quality Management",
      "Process Improvement",
      "Project Management",
      "Operations Strategy",
      "**Career opportunities:**",
      "Operations Manager",
      "Production Manager",
      "Process Manager",
      "Operations Analyst",
      "Quality Manager"
    ],
    "career": ""
  },
  {
    "title": "MBA in Supply Chain Management & Logistics",
    "description": "This specialization focuses on transportation, logistics, procurement, inventory and distribution.",
    "subjects": [
      "Supply Chain Management",
      "Logistics Management",
      "Inventory Management",
      "Procurement",
      "Warehousing",
      "Transportation Management",
      "**Career opportunities:**",
      "Supply Chain Manager",
      "Logistics Manager",
      "Procurement Manager",
      "Inventory Manager",
      "Supply Chain Analyst"
    ],
    "career": ""
  },
  {
    "title": "MBA in International Business",
    "description": "International Business focuses on global trade, international markets, cross-border business and international management.",
    "subjects": [
      "International Marketing",
      "International Finance",
      "Global Trade",
      "Export and Import Management",
      "International Business Law",
      "Global Supply Chain Management",
      "**Career opportunities:**",
      "International Business Manager",
      "Export Manager",
      "Import Manager",
      "International Marketing Executive",
      "Trade Analyst"
    ],
    "career": ""
  },
  {
    "title": "MBA in Entrepreneurship",
    "description": "Entrepreneurship is designed for students interested in starting, developing or managing businesses.",
    "subjects": [
      "Startup Management",
      "Business Planning",
      "Entrepreneurship Development",
      "Innovation Management",
      "Venture Capital",
      "Business Strategy",
      "**Career opportunities:**",
      "Entrepreneur",
      "Startup Founder",
      "Business Development Manager",
      "Startup Consultant",
      "Innovation Manager"
    ],
    "career": ""
  },
  {
    "title": "MBA in Healthcare & Hospital Management",
    "description": "Healthcare Management focuses on hospital administration, healthcare operations and management of healthcare organisations.",
    "subjects": [
      "Hospital Administration",
      "Healthcare Operations",
      "Healthcare Finance",
      "Healthcare Marketing",
      "Hospital Quality Management",
      "**Career opportunities:**",
      "Hospital Administrator",
      "Healthcare Operations Manager",
      "Healthcare Consultant",
      "Hospital Management Executive"
    ],
    "career": ""
  },
  {
    "title": "MBA in Pharmaceutical Management",
    "description": "Pharmaceutical Management combines business management with the pharmaceutical and healthcare industry.",
    "subjects": [
      "Pharmaceutical Marketing",
      "Pharma Sales Management",
      "Pharmaceutical Business",
      "Healthcare Management",
      "Pharma Supply Chain",
      "**Career opportunities:**",
      "Pharma Marketing Manager",
      "Pharmaceutical Sales Manager",
      "Product Manager",
      "Pharma Business Development Executive"
    ],
    "career": ""
  },
  {
    "title": "MBA in Retail Management",
    "description": "Retail Management focuses on retail operations, customer experience, store management and merchandising.",
    "subjects": [
      "Retail Operations",
      "Retail Marketing",
      "Merchandising",
      "Customer Experience",
      "Retail Supply Chain",
      "E-Commerce",
      "**Career opportunities:**",
      "Retail Manager",
      "Store Manager",
      "Merchandising Manager",
      "Retail Operations Manager"
    ],
    "career": ""
  },
  {
    "title": "MBA in Digital Marketing",
    "description": "Digital Marketing focuses on online advertising, social media, digital content, online branding and marketing analytics.",
    "subjects": [
      "SEO",
      "Social Media Marketing",
      "Digital Advertising",
      "Content Marketing",
      "Marketing Analytics",
      "E-Commerce Marketing",
      "**Career opportunities:**",
      "Digital Marketing Manager",
      "SEO Manager",
      "Social Media Manager",
      "Content Marketing Manager",
      "Performance Marketing Executive"
    ],
    "career": ""
  },
  {
    "title": "MBA in Banking & Financial Services",
    "description": "This specialization focuses on banking, lending, financial products, financial operations and customer services.",
    "subjects": [
      "Banking Operations",
      "Financial Services",
      "Credit Management",
      "Risk Management",
      "Financial Markets",
      "Retail Banking",
      "**Career opportunities:**",
      "Banking Manager",
      "Relationship Manager",
      "Credit Analyst",
      "Financial Services Executive"
    ],
    "career": ""
  },
  {
    "title": "MBA in Project Management",
    "description": "Project Management focuses on planning, executing, coordinating and managing projects.",
    "subjects": [
      "Project Planning",
      "Project Risk Management",
      "Project Scheduling",
      "Resource Management",
      "Project Finance",
      "Project Execution",
      "**Career opportunities:**",
      "Project Manager",
      "Project Coordinator",
      "Project Analyst",
      "Programme Manager"
    ],
    "career": ""
  },
  {
    "title": "MBA in General Management",
    "description": "General Management provides broad knowledge of business operations, leadership, strategy and organisational management.",
    "subjects": [
      "Business Strategy",
      "Leadership",
      "Management Principles",
      "Business Economics",
      "Organisational Behaviour",
      "Corporate Management",
      "**Career opportunities:**",
      "Management Trainee",
      "Business Manager",
      "General Manager",
      "Business Development Manager"
    ],
    "career": ""
  },
  {
    "title": "MBA in Tourism & Hospitality Management",
    "description": "This specialization focuses on hotel management, hospitality operations, tourism development and customer experience.",
    "subjects": [
      "Hospitality Management",
      "Tourism Management",
      "Hotel Operations",
      "Travel Management",
      "Hospitality Marketing",
      "Event Management",
      "**Career opportunities:**",
      "Hotel Manager",
      "Hospitality Manager",
      "Tourism Manager",
      "Travel Operations Manager"
    ],
    "career": ""
  },
  {
    "title": "MBA in Aviation Management",
    "description": "Aviation Management focuses on airline operations, airport administration, aviation business and industry operations.",
    "subjects": [
      "Aviation Operations",
      "Airline Management",
      "Airport Management",
      "Aviation Safety Management",
      "Aviation Marketing",
      "**Career opportunities:**",
      "Airport Operations Manager",
      "Aviation Operations Executive",
      "Airline Business Executive"
    ],
    "career": ""
  },
  {
    "title": "MBA in Construction & Infrastructure Management",
    "description": "This specialization is suitable for students interested in construction, infrastructure, real estate and project development.",
    "subjects": [
      "Construction Project Management",
      "Infrastructure Planning",
      "Real Estate Management",
      "Project Finance",
      "Contract Management",
      "**Career opportunities:**",
      "Infrastructure Project Manager",
      "Construction Project Manager",
      "Project Coordinator",
      "Real Estate Manager"
    ],
    "career": ""
  },
  {
    "title": "MBA in Agribusiness Management",
    "description": "Agribusiness Management focuses on agricultural business, food supply chains, rural markets and agricultural operations.",
    "subjects": [
      "Agribusiness Management",
      "Agricultural Marketing",
      "Food Supply Chain",
      "Rural Management",
      "Agricultural Finance",
      "**Career opportunities:**",
      "Agribusiness Manager",
      "Agricultural Marketing Manager",
      "Rural Business Development Manager",
      "Food Supply Chain Manager"
    ],
    "career": ""
  },
  {
    "title": "MBA in Rural Management",
    "description": "Rural Management focuses on rural development, rural markets, social enterprises and community-based business operations.",
    "subjects": [
      "Rural Development",
      "Rural Marketing",
      "Rural Finance",
      "Development Management",
      "Rural Entrepreneurship",
      "**Career opportunities:**",
      "Rural Development Manager",
      "Rural Business Manager",
      "Development Consultant",
      "Rural Marketing Executive"
    ],
    "career": ""
  },
  {
    "title": "MBA in Media & Communication Management",
    "description": "Media Management combines management, media business, advertising, communications and entertainment industry operations.",
    "subjects": [
      "Media Management",
      "Advertising Management",
      "Public Relations",
      "Media Marketing",
      "Digital Media",
      "Communication Strategy",
      "**Career opportunities:**",
      "Media Manager",
      "PR Manager",
      "Advertising Manager",
      "Communication Executive"
    ],
    "career": ""
  },
  {
    "title": "MBA in Event Management",
    "description": "Event Management focuses on planning, coordinating and managing corporate events, conferences and exhibitions.",
    "subjects": [
      "Event Planning",
      "Event Marketing",
      "Corporate Event Management",
      "Event Logistics",
      "Budget Management",
      "**Career opportunities:**",
      "Event Manager",
      "Event Coordinator",
      "Corporate Event Planner",
      "Exhibition Manager"
    ],
    "career": ""
  },
  {
    "title": "MBA in Sustainability & Environmental Management",
    "description": "This specialization focuses on sustainable business practices, environmental management and responsible business strategy.",
    "subjects": [
      "Sustainability Management",
      "Environmental Management",
      "ESG",
      "Corporate Responsibility",
      "Sustainable Business Strategy",
      "**Career opportunities:**",
      "Sustainability Manager",
      "ESG Analyst",
      "Sustainability Consultant",
      "Corporate Sustainability Executive"
    ],
    "career": ""
  },
  {
    "title": "MBA in Sports Management",
    "description": "Sports Management focuses on sports business, sports marketing, event management and sports organisations.",
    "subjects": [
      "Sports Marketing",
      "Sports Business",
      "Sports Event Management",
      "Sports Administration",
      "Sponsorship Management",
      "**Career opportunities:**",
      "Sports Manager",
      "Sports Marketing Manager",
      "Sports Event Manager",
      "Sponsorship Manager"
    ],
    "career": ""
  },
  {
    "title": "MBA in E-Commerce Management",
    "description": "E-Commerce Management focuses on online business, digital commerce, marketplace operations and online sales strategies.",
    "subjects": [
      "E-Commerce Management",
      "Online Business Operations",
      "Digital Sales",
      "Marketplace Management",
      "E-Commerce Marketing",
      "**Career opportunities:**",
      "E-Commerce Manager",
      "Marketplace Manager",
      "Online Business Manager",
      "E-Commerce Operations Executive"
    ],
    "career": ""
  },
  {
    "title": "MBA in Business Economics",
    "description": "Business Economics focuses on economic analysis, market analysis and business decision-making.",
    "subjects": [
      "Managerial Economics",
      "Business Economics",
      "Economic Forecasting",
      "Market Analysis",
      "Business Research",
      "**Career opportunities:**",
      "Business Analyst",
      "Economic Analyst",
      "Market Analyst",
      "Research Analyst"
    ],
    "career": ""
  },
  {
    "title": "MBA in Insurance Management",
    "description": "Insurance Management focuses on insurance operations, risk assessment, insurance products and financial services.",
    "subjects": [
      "Insurance Management",
      "Risk Management",
      "Insurance Marketing",
      "Financial Services",
      "Insurance Operations",
      "**Career opportunities:**",
      "Insurance Manager",
      "Insurance Business Executive",
      "Risk Analyst",
      "Insurance Operations Manager",
      ""
    ],
    "career": ""
  }
];
