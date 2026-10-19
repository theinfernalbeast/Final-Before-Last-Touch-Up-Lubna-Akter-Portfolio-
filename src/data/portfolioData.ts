export interface ResearchProject {
  id: string;
  title: string;
  role: string;
  status: string;
  institution?: string;
  description: string;
  highlights: string[];
  scientificDetails: string;
  image: string;
}

export interface WorkExperienceItem {
  role: string;
  organization: string;
  organizationUrl?: string;
  period: string;
  location: string;
  points: string[];
}

export interface AffiliationItem {
  role: string;
  organization: string;
  period: string;
  location: string;
  points: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  location?: string;
  organizationUrl?: string;
  grade?: string;
  group?: string;
  points?: string[];
}

export interface ExtraCurricularItem {
  role: string;
  organization: string;
  organizationUrl?: string;
  period: string;
  points: string[];
}

export interface EducationItem {
  discipline: string;
  institution: string;
  institutionUrl?: string;
  timeline: string;
  location: string;
  result: string;
  badge?: string;
  group?: string;
}

export interface ReferenceItem {
  name: string;
  institution: string;
  title: string;
  phone: string;
  email: string;
}

export interface CustomSocialLink {
  id: string;
  platform: string;
  url: string;
  icon?: string;
}

export interface PersonalInterestItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  shortDesc: string;
  detailedDesc: string;
  keywords: string[];
}

export interface LanguageProficiency {
  id: string;
  language: string;
  level: string;
  percentage: number;
  description?: string;
  keywords?: string[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Lubna Akter',
    headline: 'Clinical Pharmacy | Pharmaceutical Research & Pharmacology | Medical Writing & Drug Information | Healthcare',
    subtitle: 'Pharmacy Student',
    photoUrl: '/lubna_laboratory_photo_1791695973616.jpg',
    location: 'Gulshan, Vatara, Dhaka, Bangladesh',
    mapQuery: 'Vatara, Gulshan, Dhaka, Bangladesh',
    phone: '+88 0153 77 20 007',
    whatsapp: '+880 1537-720007',
    whatsappUrl: 'https://wa.me/8801537720007',
    email: 'heyitslubnaakter@gmail.com',
    linkedin: 'linkedin.com/in/heyitslubnaakter',
    linkedinUrl: 'https://www.linkedin.com/in/heyitslubnaakter/',
    facebookUrl: 'https://www.facebook.com/thisisrufaida',
    instagramUrl: 'https://www.instagram.com/thisisrufaida',
    bloggerUrl: 'https://www.blogger.com',
    customSocialLinks: [] as CustomSocialLink[],
    footerBadgeText: 'Lubna Akter Portfolio',
    footerRightsText: 'All rights reserved.',
    summary:
      'Pharmacy student with hands-on exposure to pharmacology, drug information analysis, and laboratory-based pharmaceutical research, complemented by practical experience in medical writing and healthcare content development. Skilled in data interpretation, quality-focused documentation, and cross-functional collaboration, with strong attention to detail.',
  },

  coreCompetencies: [
    'Pharmacology',
    'Medicinal Chemistry',
    'Pharmaceutical Analysis',
    'Quality Control',
    'Pharmaceutical Technology',
    'Pharmacognosy',
    'Microbiology',
    'Biopharmaceutics',
    'Clinical Pharmacy',
    'Hospital Pharmacy',
    'Regulatory Affairs',
    'Toxicology',
    'Pharmaceutical Biotechnology',
  ],

  softSkills: [
    'Pharmaceutical Research',
    'Laboratory Techniques',
    'Drug Information Analysis',
    'Quality Control Awareness',
    'Regulatory Compliance',
    'Scientific Writing',
    'Critical Thinking',
    'Attention to Detail',
    'Problem Solving',
    'Team Collaboration',
    'Time Management',
    'Adaptability',
  ],

  computerLiteracy: [
    'Microsoft Word',
    'Microsoft Excel',
    'Microsoft PowerPoint',
    'PubMed',
    'Google Scholar',
    'Mendeley',
    'SPSS',
    'Literature Search',
    'Statistical Analysis Support',
    'ChemDraw',
  ],

  // Complete educational qualifications from the official uploaded document
  education: [
    {
      discipline: 'Bachelor of Pharmacy (B. Pharm)',
      institution: 'University of Information Technology & Sciences (UITS)',
      institutionUrl: 'https://uits.edu.bd',
      timeline: '2027',
      location: 'Dhaka, Bangladesh',
      result: '3.37 / 4.00',
      badge: '2027',
      group: 'Faculty of Pharmacy',
    },
    {
      discipline: 'Higher Secondary Certificate (HSC)',
      institution: 'Govt. Kalachandpur School & College',
      institutionUrl: 'https://www.gkhscgulshan.edu.bd/en',
      timeline: '2021',
      location: 'Dhaka, Bangladesh',
      result: '5.00 / 5.00',
      badge: 'GPA 5.00',
      group: 'Science Group',
    },
    {
      discipline: 'Secondary School Certificate (SSC)',
      institution: 'Khilbarirtek Islamia High School',
      institutionUrl: 'https://www.facebook.com/KIHSDhaka/',
      timeline: '2019',
      location: 'Dhaka, Bangladesh',
      result: '4.56 / 5.00',
      badge: 'GPA 4.56',
      group: 'Science Group',
    },
    {
      discipline: 'Junior School Certificate (JSC)',
      institution: 'Khilbarirtek Islamia High School',
      institutionUrl: 'https://www.facebook.com/KIHSDhaka/',
      timeline: '2016',
      location: 'Dhaka, Bangladesh',
      result: '5.00 / 5.00',
      badge: 'GPA 5.00',
      group: 'Middle School',
    },
    {
      discipline: 'Primary School Certificate (PSC)',
      institution: 'Khilbarirtek Islamia High School',
      institutionUrl: 'https://www.facebook.com/KIHSDhaka/',
      timeline: '2013',
      location: 'Dhaka, Bangladesh',
      result: '5.00 / 5.00',
      badge: 'GPA 5.00',
      group: 'Elementary School',
    },
  ],

  researchProjects: [
    {
      id: 'commelina',
      title: 'Anti-Inflammatory Activity of Commelina erecta Extracts (Ongoing)',
      role: 'Co-Researcher',
      status: 'Running Research Project',
      institution: 'University of Information Technology & Sciences',
      description:
        'Evaluation of Anti-Inflammatory Activity of Methanolic and Ethanolic Extracts of Commelina erecta by Protein Denaturation and HRBC Membrane Stabilization Assays',
      highlights: [
        'Methanolic & ethanolic botanical extraction protocols',
        'In vitro protein denaturation inhibition assay',
        'HRBC membrane stabilization assessment for anti-inflammatory efficacy',
      ],
      scientificDetails:
        'Commelina erecta contains phytochemical flavonoids and polyphenols. The research quantifies inhibition of heat-induced protein denaturation and membrane stabilization of erythrocyte membranes to explore potential natural anti-inflammatory therapeutic leads.',
      image: '/src/assets/images/research_commelina_extract_1791679179876.jpg',
    },
    {
      id: 'hepatitis',
      title: 'Efficacy of Entecavir vs. Lamivudine in Chronic Hepatitis B (Poster Presentation)',
      role: 'Co-Author',
      status: 'Ranked Top 3',
      institution: 'Pharma Presentation Competition',
      description:
        'Compared antiviral efficacy of Entecavir and Lamivudine in chronic Hepatitis B, with a focus on public health impact in Bangladesh.',
      highlights: [
        'Comparative virological suppression analysis of nucleoside/nucleotide analogues',
        'Assessment of genotypic resistance barrier (YMDD motif mutations)',
        'Epidemiological cost-benefit and accessibility in Bangladesh',
      ],
      scientificDetails:
        'Entecavir demonstrates a superior genetic resistance barrier and long-term viral load suppression compared to Lamivudine, highlighting the imperative for updated therapeutic guidelines and accessible antiretroviral options in regional clinical practice.',
      image: '/src/assets/images/poster_hepatitis_antiviral_1791679192469.jpg',
    },
  ] as ResearchProject[],

  certifications: [
    {
      title: 'Medicine Concept Plus',
      issuer: 'Clear Concept',
      organizationUrl: 'https://clearconcept.com.bd/',
      year: '2026',
      location: 'Online',
      grade: 'Completed',
      group: 'Short Course',
    },
    {
      title: 'Computer Aided Drug and Vaccine Design',
      issuer: 'BioPC',
      organizationUrl: 'https://biopc.org/',
      year: '2024',
      location: 'Online',
      grade: 'Completed',
      group: 'Professional Training',
    },
  ],

  workExperience: [
    {
      role: 'Education Byte Builder',
      organization: 'Pharma Insights',
      organizationUrl: 'https://www.facebook.com/profile.php?id=61572500610754',
      period: 'Jan 2026 - Feb 2026',
      location: 'Dhaka, Bangladesh',
      points: [
        'Produced research-backed content that strengthened platform credibility.',
        'Simplified complex pharma concepts into clear, engaging content.',
        'Researched pharmacy and healthcare topics to ensure content accuracy.',
        'Supported structured editorial planning and monthly scheduling.',
      ],
    },
    {
      role: 'Branch In-Charge',
      organization: 'Emaan',
      organizationUrl: 'https://emaanbd.com/',
      period: 'May 2023 - Jul 2023',
      location: 'Dhaka, Bangladesh',
      points: [
        'Promoted to Branch In-Charge within one month for outstanding performance.',
        'Grew branch sales by up to 20% through strong customer engagement.',
        'Managed daily branch operations and supervised sales team performance.',
        'Boosted customer retention through improved service delivery.',
      ],
    },
  ],

  entrepreneurialExperience: [
    {
      role: 'Co-Founder',
      organization: 'Neymat Home Décor',
      organizationUrl: 'https://www.facebook.com/helloneymat',
      period: 'Apr 2026 - Present',
      location: 'Dhaka, Bangladesh',
      points: [
        'Co-founded an early-stage home décor brand, building it from the ground up primarily through social media-based sales and marketing.',
        'Grew order volume by nearly 20% since launch by managing sourcing, inventory, and customer engagement end-to-end.',
      ],
    },
  ],

  extraCurricular: [
    {
      role: 'Member',
      organization: 'Bangladesh Girls Guide',
      organizationUrl: 'https://www.facebook.com/bgguides/',
      period: 'Leadership & Community',
      points: [
        'Completed leadership and first-aid training, and took part in school health-awareness drives, tree-plantation campaigns, and community-service camps, building teamwork, discipline, and public-speaking skills.',
      ],
    },
  ],
  affiliations: [],

  // Personal Particulars from CV (Birth year strictly omitted as requested)
  personalDetails: {
    nationality: 'Bangladeshi',
    bloodGroup: 'A+',
    languages: 'Bengali (Native), English (Fluent)',
  },

  // Interactive Language Proficiency (Professional English 70%, Bengali 100%)
  languages: [
    {
      id: 'bn',
      language: 'Bengali',
      level: 'Native',
      percentage: 100,
      description: 'Mother tongue, fully bilingual in academic, clinical, and interpersonal communication.',
      keywords: ['Mother Tongue', 'Literature & Writing', 'Clinical Counseling'],
    },
    {
      id: 'en',
      language: 'English',
      level: 'Professional Working Proficiency',
      percentage: 70,
      description: 'Primary medium for pharmaceutical literature review, medical writing, and clinical reports.',
      keywords: ['Fluency in English', 'Literature & Writing', 'Clinical Counseling'],
    },
  ] as LanguageProficiency[],

  skillProficiency: [
    { subject: 'Pharmacology', A: 90 },
    { subject: 'Drug Design', A: 85 },
    { subject: 'Medical Writing', A: 80 },
  ],

  // Personal Passions & Creative Pursuits as requested:
  // Wanderlust (Travel) • Otaku (Anime & K-Dramas) • Glam (Makeup Artistry & Skincare) • Aesthetic Journaling
  personalInterests: [
    {
      id: 'travel',
      title: 'Wanderlust (Travel)',
      category: 'Chasing Calm & Pretty Views',
      icon: 'Compass',
      shortDesc: 'The ocean is my all-time favorite. I also love nature and peaceful village vibes.',
      detailedDesc:
        'The ocean is my all-time favorite. I also love nature and peaceful village vibes, and I’m always up for visiting aesthetic places. For me, the journey is half the fun.',
      keywords: ['Ocean views', 'Village life', 'Nature'],
    },
    {
      id: 'otaku',
      title: 'Otaku (Anime & K-Dramas)',
      category: 'Stories & Little Bits of Magic',
      icon: 'Tv',
      shortDesc: 'Big fan of rom-com anime and fantasy anime with a touch of magic.',
      detailedDesc:
        'I’m a big fan of rom-com anime and fantasy anime with a touch of magic. I also love rom-com K-dramas when I want something sweet and fun to watch.',
      keywords: ['Rom-com anime', 'Fantasy anime', 'Rom-com K-dramas'],
    },
    {
      id: 'glam',
      title: 'Glam (Makeup Artistry & Skincare)',
      category: 'More Than Just a Hobby',
      icon: 'Sparkles',
      shortDesc: 'Makeup is my passion with courses and certificates earned along the way.',
      detailedDesc:
        'Makeup is my passion, and I’ve done a few makeup courses and earned some certificates along the way. Eye makeup is my favorite thing to create.',
      keywords: ['Eye makeup', 'Makeup artistry', 'Skincare'],
    },
    {
      id: 'journaling',
      title: 'Aesthetic Journaling',
      category: 'Keeping My Memories',
      icon: 'BookOpen',
      shortDesc: 'Capturing little moments, beautiful places, and everyday adventures through my lens, creating a visual diary of memories I can revisit and relive.',
      detailedDesc:
        'Capturing little moments, beautiful places, and everyday adventures through my lens, creating a visual diary of memories I can revisit and relive.',
      keywords: ['Visual diary', 'Memory keeping', 'Visual aesthetics'],
    },
  ] as PersonalInterestItem[],

  references: [
    {
      name: 'Dr. Md. Mofazzal Hossain',
      institution: 'University of Information Technology & Sciences',
      title: 'Associate Professor & Head',
      phone: '+880 9678008487 Ext-309',
      email: 'mofazzal.hossain@uits.ac.bd',
    },
    {
      name: 'Md. Al Amin',
      institution: 'University of Information Technology & Sciences',
      title: 'Lecturer',
      phone: '+880 9678008487 Ext-310',
      email: 'md.alamin869@uits.edu.bd',
    },
  ],

  sectionTitles: {
    research: 'Pharmaceutical Research & Presentations',
    skills: 'Pharmaceutical Knowledge & Skills',
    experience: 'Work Experience & Affiliations',
    education: 'Education, Training & Certifications',
    languages: 'Language Skills',
    about: 'Passions & Creative Pursuits',
    references: 'Academic & Professional References',
    contact: 'Contact & Collaboration',
  },
};
