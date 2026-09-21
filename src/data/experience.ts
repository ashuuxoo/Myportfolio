import { ExperienceItem } from '../types';

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-aispry-trainee',
    period: 'Data Science Trainee',
    role: 'Data Science Trainee',
    organization: 'AISPRY',
    type: 'Professional Experience',
    location: 'Bhubaneswar, Odisha',
    description:
      'Engineered end-to-end data pipelines, performed statistical transformations, and delivered executive Business Intelligence dashboards for stakeholder decision-making.',
    responsibilities: [
      'Collected, cleaned, and transformed structured and semi-structured data using Python and SQL.',
      'Built interactive Power BI dashboards for KPI monitoring, performance tracking, and reporting.',
      'Analyzed trends, patterns, and anomalies to support data-informed business decisions.',
      'Collaborated with business stakeholders to translate analytical requirements into actionable solutions.',
      'Maintained data quality, consistency, and integrity across reporting layers.'
    ],
    technologies: [
      'Python',
      'SQL',
      'Power BI',
      'DAX',
      'Power Query',
      'Pandas',
      'NumPy',
      'Excel',
      'ETL Pipelines'
    ]
  },
  {
    id: 'exp-open-source-software',
    period: '2022 — Present',
    role: 'Software Developer & Open-Source Builder',
    organization: 'Independent Engineering / GitHub (ashuuxoo)',
    type: 'Software & Systems Development',
    location: 'Remote / Bhubaneswar',
    description:
      'Architecting, building, and deploying production-grade web applications, real-time collaboration engines, and machine learning tools with verified public repositories.',
    responsibilities: [
      'Developed MYNOOOK, a browser-based writing workspace for creating, organizing, editing, translating and exporting books with Gemini AI, Firebase, and PDF/EPUB exports.',
      'Built MuviDate, a real-time movie watch-party application featuring millisecond-synchronized video playback, live chat streams, and voice notes using React 19, TypeScript, and Firebase.',
      'Engineered Aficionado Coffee Roasters retail analytics and time-series demand forecasting dashboards using Python, Streamlit, and Prophet.',
      'Created Looklikepro, a native Android phone lookup application built with Kotlin and Jetpack Compose following modern Android Clean Architecture.'
    ],
    technologies: [
      'React 19',
      'TypeScript',
      'Python',
      'Firebase',
      'Tailwind CSS',
      'Streamlit',
      'Kotlin',
      'Jetpack Compose'
    ]
  },
  {
    id: 'exp-education-niis',
    period: '2021 — 2024',
    role: 'BSc – Information Technology & Management',
    organization: 'NIIS Institute of Information Science & Management',
    type: 'Higher Education',
    location: 'Bhubaneswar, Odisha',
    description:
      'Completed three-year comprehensive curriculum focusing on software design, database management systems, data structures, and computer science foundations.',
    responsibilities: [
      'Graduated with CGPA: 7.3 out of 10.0 across the 2021–2024 academic cycle.',
      'Completed foundational coursework in Database Systems (SQL), Object-Oriented Programming, and Data Analysis.',
      'Built capstone software implementations demonstrating end-to-end systems integration.'
    ],
    technologies: [
      'Database Management',
      'Data Structures',
      'SQL',
      'Software Engineering',
      'Operating Systems'
    ]
  }
];

export const CERTIFICATIONS = [
  {
    title: 'Python & Data Science',
    issuer: 'NASSCOM',
    credentialId: 'Verified Certificate',
    focus: 'Python, Data Analytics, Predictive Modeling, Machine Learning'
  },
  {
    title: 'Python, SQL & Power BI',
    issuer: '360DigiTMG',
    credentialId: 'Verified Certificate',
    focus: 'Data Pipelines, Relational SQL Queries, DAX, Interactive BI Dashboards'
  },
  {
    title: 'Internship Projects',
    issuer: 'AISPRY',
    credentialId: 'Internship Completion',
    focus: 'Applied Data Science, KPI Dashboards, Data Quality Assurance'
  }
];
