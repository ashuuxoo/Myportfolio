import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'mynoook',
    title: 'MYNOOOK',
    subtitle: 'AI-Powered Writing Workspace & Publishing Studio',
    category: ['Web', 'AI / ML'],
    type: 'AI-Powered Writing Workspace / Web Application',
    isPrimary: true,
    description:
      'A modern browser-based writing workspace for creating, organizing, editing, translating and exporting books.',
    longDescription:
      'MYNOOOK is a full-featured writing environment built to empower authors from first draft to final publication. It combines a distraction-free, rich writing canvas with Google Gemini AI assistance, intelligent multi-language translation, and real-time cloud sync. Built with React 19 and Firebase, it offers instantaneous local reactivity paired with enterprise-grade Firestore persistence, Cloudinary asset pipelines, and client-side binary compilation for both print-ready PDF and digital EPUB distribution.',
    liveUrl: 'http://mynoook.vercel.app/',
    githubUrl: 'https://github.com/ashuuxoo/Mynoook',
    accentColor: '#06b6d4',
    features: [
      'Centralized book management & chapter organization dashboard',
      'Distraction-free rich text editor with auto-saving drafts',
      'AI writing assistant for grammar, style polishing & continuation',
      'AI translation across global languages preserving literary tone',
      'Firebase Authentication with secure multi-device sessions',
      'Firestore real-time document persistence & synchronization',
      'Cloudinary media integration for cover art & illustrations',
      'Client-side print-ready PDF compilation via jsPDF',
      'EPUB digital publication generator packaged via JSZip'
    ],
    techStack: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Google Gemini API',
      'Firebase Auth & Firestore',
      'Express',
      'Vercel',
      'jsPDF',
      'JSZip'
    ],
    architectureNote:
      'Client-first reactive architecture powered by React 19 and Tailwind CSS, orchestrated with Express micro-services on Vercel for Gemini AI acceleration and Cloudinary asset processing, backed by Google Firebase Firestore real-time listeners.'
  },
  {
    id: 'muvidate',
    title: 'MuviDate',
    subtitle: 'Real-Time Movie Watch Party & Social Room Web App',
    category: ['Web', 'AI / ML'],
    type: 'Social Movie Watch Party Platform',
    isPrimary: false,
    description:
      'A responsive React 19 and TypeScript application with Firebase Authentication, Firestore, and Realtime Database for synchronized watch parties.',
    longDescription:
      'MuviDate provides private cinema watch rooms with synchronized playback, live chat streams, and voice notes. Developed with React 19 and TypeScript, backed by Firebase Authentication and Firestore, it allows peers to share movies seamlessly with synchronized seek commands and dynamic genre discovery.',
    liveUrl: 'http://muvidate.vercel.app/',
    githubUrl: 'https://github.com/ashuuxoo/Muvidate',
    accentColor: '#a855f7',
    features: [
      'Private watch rooms with instant 4-digit code entry',
      'Synchronized media playback across concurrent viewports',
      'Sub-second real-time group chat stream with typing indicators',
      'Interactive voice notes recording and inline playback',
      'Firebase Authentication supporting personalized user presences',
      'Firestore-backed movie catalog with real-time room states',
      'Dynamic movie search and genre filtering matrix'
    ],
    techStack: [
      'React 19',
      'TypeScript',
      'Firebase Auth',
      'Firestore',
      'Realtime Database',
      'Tailwind CSS',
      'Motion'
    ],
    architectureNote:
      'Real-time state synchronization engine built on Firestore snapshot listeners, ensuring shared playback timestamps, pause/play parity, and synchronized video seek commands across concurrent remote viewers.'
  },
  {
    id: 'retail-analytics-aficionado',
    title: 'Retail Analytics – Aficionado Coffee Roasters',
    subtitle: 'Transaction-Level Retail Analytics & Business Intelligence',
    category: ['Data', 'Analytics'],
    type: 'Retail Business Intelligence & Analytics System',
    isPrimary: false,
    description:
      'Analyzed transaction-level retail data, product performance, revenue contribution, category trends, and Pareto concentration; developed a Streamlit dashboard for product and store insights.',
    longDescription:
      'A comprehensive commercial analytics platform analyzing transactional POS data for Aficionado Coffee Roasters. The project models product velocity, category contribution margins, temporal foot-traffic cycles, and customer purchasing patterns. Features deep Pareto (80/20) revenue concentration analysis and interactive multi-variable exploration in Streamlit.',
    liveUrl: 'https://coffee-forecast-dashboard.streamlit.app/',
    githubUrl: 'https://github.com/ashuuxoo/retail-analytics-aficionado',
    accentColor: '#10b981',
    features: [
      'Transaction-level POS data cleaning and structuring with Python and Pandas',
      'Product performance rankings and revenue contribution modeling',
      'Multi-category sales trend decomposition across operating quarters',
      'Pareto (80/20) concentration calculation isolating key revenue drivers',
      'Store-by-store benchmarking and performance insights',
      'Interactive Streamlit dashboard for operational stakeholder review'
    ],
    techStack: [
      'Python',
      'Pandas',
      'Matplotlib',
      'Streamlit',
      'SQL',
      'NumPy'
    ],
    architectureNote:
      'Data engineering pipeline using Pandas vectorization for processing raw point-of-sale logs, generating normalized KPI aggregations, and rendering interactive dynamic visualizations via Streamlit.'
  },
  {
    id: 'coffee-forecast-dashboard',
    title: 'Coffee Forecast Dashboard',
    subtitle: 'Time-Series Demand Forecasting & Peak Prediction',
    category: ['AI / ML', 'Data', 'Analytics'],
    type: 'Predictive Demand Modeling & Forecasting Dashboard',
    isPrimary: false,
    description:
      'Built a time-series forecasting dashboard using Python, Prophet, Pandas, and Streamlit to predict demand, identify peak periods, and support inventory and staffing planning.',
    longDescription:
      'An enterprise predictive analytics dashboard leveraging Meta Prophet and machine learning algorithms to model future sales demand. Designed to eradicate stockouts and optimize barista shift allocation, it detects holiday spikes, weekend anomalies, and multi-week trend trajectories with uncertainty confidence intervals.',
    liveUrl: 'https://retail-analytics-aficionado-nn73sks3ooiojkrr3s3v7e.streamlit.app/',
    githubUrl: 'https://github.com/ashuuxoo/coffee-forecast-dashboard',
    accentColor: '#f59e0b',
    features: [
      'Time series demand forecasting trained on historical POS distributions using Prophet',
      'Confidence interval uncertainty modeling (80% / 95% bounds)',
      'Automated peak demand period identification for staffing and inventory buffer sizing',
      'Store-level breakdown and shift-level hour clustering',
      'Dynamic date-range and seasonality filter controls in Streamlit'
    ],
    techStack: [
      'Python',
      'Prophet',
      'Pandas',
      'Streamlit',
      'NumPy',
      'Matplotlib'
    ],
    architectureNote:
      'Additive decomposition model decomposing trend, seasonality, and holiday shocks via Prophet, wrapped in an operational Streamlit interface for inventory and staffing optimization.'
  },
  {
    id: 'automated-transcript-analysis',
    title: 'Automated Transcript Analysis',
    subtitle: 'Python & SQL ETL Pipeline with Power BI Intelligence',
    category: ['Data', 'Analytics', 'AI / ML'],
    type: 'NLP & BI ETL Analytics Pipeline',
    isPrimary: false,
    description:
      'Created a Python and SQL ETL pipeline to structure interview transcript data; developed Power BI dashboards to visualize sentiment, candidate performance, and hiring trends.',
    longDescription:
      'Automated extraction, transformation, and sentiment analysis pipeline processing unstructured interview transcripts. Using Python NLP techniques and relational SQL storage, the system converts freeform speech transcripts into structured analytical metrics, displayed through interactive Power BI executive dashboards.',
    accentColor: '#8b5cf6',
    features: [
      'Python and SQL ETL pipeline converting raw transcripts into structured tables',
      'NLP-driven sentiment analysis scoring and key phrase extraction',
      'Interactive Power BI dashboards tracking candidate performance metrics',
      'Historical hiring trend visualization and department-level comparisons',
      'Automated data quality validation ensuring reporting consistency'
    ],
    techStack: [
      'Python',
      'SQL',
      'Power BI',
      'DAX',
      'NLP',
      'Power Query'
    ],
    architectureNote:
      'End-to-end data processing combining Python-based text cleansing with SQL database ingestion, modeled with DAX measures for executive Power BI visualization.'
  },
  {
    id: 'power-trading-analysis',
    title: 'Power Trading Analysis & Forecasting',
    subtitle: 'Energy Market Historical Analysis & BI Reporting',
    category: ['Data', 'Analytics'],
    type: 'Market Intelligence & Forecasting System',
    isPrimary: false,
    description:
      'Analyzed historical trading data with SQL and Python, identified demand patterns and price trends, and created Power BI reports for performance monitoring.',
    longDescription:
      'Comprehensive analytical review of power market trading histories, spot price volatility, and seasonal grid load patterns. Developed with Python and SQL for historical pattern recognition and Power BI for continuous market monitoring.',
    accentColor: '#ec4899',
    features: [
      'Relational SQL data extraction and cleaning across multi-year trading records',
      'Demand pattern identification and spot price trend decomposition with Python',
      'Interactive Power BI reports tracking trading margins and volume variations',
      'Anomaly detection highlighting price spikes and grid demand anomalies',
      'Executive KPI summaries tailored for commercial energy trading stakeholders'
    ],
    techStack: [
      'SQL',
      'Python',
      'Power BI',
      'DAX',
      'Pandas',
      'Excel'
    ],
    architectureNote:
      'Quantitative time-series analysis linking SQL historical repositories to Power BI semantic layers for dynamic price and volume monitoring.'
  },
  {
    id: 'highway-inspection-ai',
    title: 'Highway Inspection & Maintenance using AI',
    subtitle: 'Computer Vision Defect Structuring & BI Tracking',
    category: ['AI / ML', 'Data', 'Analytics'],
    type: 'AI Computer Vision & Infrastructure BI Dashboard',
    isPrimary: false,
    description:
      'Processed AI-generated inspection data and built Power BI dashboards to track defect counts, severity distribution, and location-based trends.',
    longDescription:
      'Ingested inspection logs generated by AI computer vision models (such as YOLO and OpenCV) evaluating highway asphalt conditions. Structured spatial defect classifications into analytical datasets and rendered location-based severity distribution dashboards in Power BI.',
    accentColor: '#0ea5e9',
    features: [
      'ETL structuring of AI vision inference defect logs and spatial coordinates',
      'Severity distribution categorization (cracks, potholes, road degradation)',
      'Location-based defect cluster mapping and geographical trend visualization',
      'Power BI operational dashboards prioritized for highway maintenance crews',
      'Automated KPI reports tracking maintenance backlog resolution rates'
    ],
    techStack: [
      'Python',
      'YOLOv8 & OpenCV Outputs',
      'Power BI',
      'DAX',
      'SQL'
    ],
    architectureNote:
      'Transforms raw bounding box detection outputs into relational tables, feeding an interactive Power BI spatial dashboard for infrastructure maintenance allocation.'
  },
  {
    id: 'hazardous-scrap-detection',
    title: 'Hazardous Scrap Detection using AI',
    subtitle: 'Workplace Safety & Risk Metric Analytics',
    category: ['AI / ML', 'Data', 'Analytics'],
    type: 'Safety Compliance & AI Metric Analytics',
    isPrimary: false,
    description:
      'Structured AI detection outputs into datasets and built dashboards to monitor risk and workplace safety metrics.',
    longDescription:
      'Engineered an analytics pipeline capturing computer-vision scrap sorting detections in industrial recycling and manufacturing environments. Normalized detection confidence scores and material risk categories into structured datasets to deliver safety monitoring dashboards.',
    accentColor: '#f97316',
    features: [
      'Ingestion and transformation of computer-vision scrap classification streams',
      'Risk weighting models identifying hazardous materials before human handling',
      'Workplace safety compliance KPI reporting and incident alert logs',
      'Operational dashboards tracking throughput vs. hazard density over time',
      'Data quality auditing ensuring zero missed critical hazard alerts'
    ],
    techStack: [
      'Python',
      'AI Detection Output Datasets',
      'Power BI',
      'SQL',
      'Pandas'
    ],
    architectureNote:
      'Bridges raw computer vision model outputs with structured business intelligence to enforce industrial safety compliance.'
  },
  {
    id: 'looklikepro',
    title: 'Looklikepro',
    subtitle: 'Modern Android Caller Search & Telecom Intelligence',
    category: ['Mobile'],
    type: 'Native Android Mobile Application',
    isPrimary: false,
    description:
      'A modern Android phone lookup application built with Kotlin and Jetpack Compose following Clean Architecture.',
    longDescription:
      'A high-performance Android mobile application built with Jetpack Compose following modern Android Clean Architecture and unidirectional data flow. Looklikepro delivers instant, low-latency phone number resolution, retrieving telecom carrier circles, location data, and identity metadata while strictly respecting user privacy with minimal system permissions.',
    liveUrl: 'https://github.com/ashuuxoo/Looklikepro/actions',
    githubUrl: 'https://github.com/ashuuxoo/Looklikepro',
    accentColor: '#3b82f6',
    features: [
      'Rapid asynchronous telephone number lookup engine',
      'Caller identification, telecom circle & state carrier display',
      'Dark mode user interface designed with Jetpack Compose Material3',
      'Fluid gesture navigation and responsive screen adaptation',
      'Zero invasive device permissions required (privacy-first architecture)',
      'Automated CI/CD build verification via GitHub Actions'
    ],
    techStack: [
      'Kotlin',
      'Jetpack Compose',
      'Retrofit 2',
      'OkHttp 3',
      'Kotlin Coroutines & Flow',
      'Moshi JSON',
      'Android SDK'
    ],
    architectureNote:
      'Clean Architecture with MVVM pattern, using Kotlin Coroutines for asynchronous I/O and Retrofit/Moshi for type-safe network serialization.'
  }
];
