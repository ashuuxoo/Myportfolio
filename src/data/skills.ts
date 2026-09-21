import { SkillCategory } from '../types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming & Data',
    description: 'Core languages and foundational execution environments for backend logic, scripting, and analytical pipelines.',
    skills: [
      { name: 'Python', level: 'Core', description: 'Data structures, automation scripts, analytical modeling, and machine learning pipelines', iconName: 'Terminal' },
      { name: 'SQL', level: 'Core', description: 'Relational querying, complex joins, data extraction, and schema design', iconName: 'HardDrive' },
      { name: 'JavaScript', level: 'Core', description: 'Modern ES6+ syntax, asynchronous programming, event handling, and runtime execution', iconName: 'Code' },
      { name: 'TypeScript', level: 'Core', description: 'Strict typing, interfaces, generic abstractions, and compile-time safety', iconName: 'FileCode' },
      { name: 'HTML', level: 'Core', description: 'Semantic structure, accessibility standards (WCAG), and responsive DOM hierarchies', iconName: 'Layout' }
    ]
  },
  {
    title: 'Web Development',
    description: 'Modern reactive web systems and component frameworks for building high-performance digital products.',
    skills: [
      { name: 'React', level: 'Production', description: 'React 19, hooks, concurrent rendering, virtual DOM state synchronization', iconName: 'Atom' },
      { name: 'Tailwind CSS', level: 'Production', description: 'Utility-first styling, custom theme tokens, dark mode design systems', iconName: 'Palette' },
      { name: 'Vite', level: 'Tooling', description: 'Lightning development builds, optimized production bundling, asset hashing', iconName: 'Zap' },
      { name: 'Motion', level: 'Creative', description: 'Hardware-accelerated animations, spring physics, layout transitions', iconName: 'Sparkles' },
      { name: 'Express', level: 'Backend', description: 'RESTful API routing, server-side middleware, HTTP service orchestration', iconName: 'Server' }
    ]
  },
  {
    title: 'Data Analytics & BI',
    description: 'Business intelligence modeling, dynamic executive reports, and metric-driven commercial visibility.',
    skills: [
      { name: 'Power BI', level: 'BI Reporting', description: 'Interactive dashboard creation, KPI monitoring, semantic data models', iconName: 'PieChart' },
      { name: 'DAX', level: 'Analytical', description: 'Calculated columns, time-intelligence measures, dynamic aggregation formulas', iconName: 'Cpu' },
      { name: 'Power Query', level: 'ETL Modeling', description: 'M language transformations, automated dataset merging, columnar shaping', iconName: 'Table' },
      { name: 'Excel', level: 'Analytics', description: 'Pivot tables, financial lookups, data validation, and exploratory models', iconName: 'Binary' },
      { name: 'KPI Reporting', level: 'Business Intelligence', description: 'Executive metric tracking, performance benchmarks, goal variance monitoring', iconName: 'BarChart3' },
      { name: 'Data Visualization', level: 'Visual Analytics', description: 'Design of clear, informative visual summaries for non-technical stakeholders', iconName: 'LineChart' }
    ]
  },
  {
    title: 'Data Engineering & Processing',
    description: 'Robust ETL pipelines, data hygiene protocols, and high-performance tabular computation.',
    skills: [
      { name: 'ETL Pipelines', level: 'Engineering', description: 'Extraction, transformation, and loading across structured & semi-structured datasets', iconName: 'Workflow' },
      { name: 'Data Cleaning', level: 'Hygiene', description: 'Missing value imputation, deduplication, outlier filtering, text normalization', iconName: 'Shield' },
      { name: 'Data Transformation', level: 'Engineering', description: 'Pivoting, feature encoding, type casting, and schema restructuring', iconName: 'Layers' },
      { name: 'Data Quality', level: 'Integrity', description: 'Validation rules, schema consistency checks, automated data integrity audits', iconName: 'ShieldCheck' },
      { name: 'Pandas', level: 'Computation', description: 'High-speed DataFrame manipulation, multi-index aggregations, vectorization', iconName: 'Table' },
      { name: 'NumPy', level: 'Computation', description: 'Multidimensional array math, matrix linear algebra, numerical vectorized ops', iconName: 'Binary' }
    ]
  },
  {
    title: 'AI / ML & Analytics',
    description: 'Applied machine learning models, statistical forecasting algorithms, computer vision, and NLP.',
    skills: [
      { name: 'Prophet', level: 'Forecasting', description: 'Additive seasonal time series demand forecasting and trend changepoint detection', iconName: 'TrendingUp' },
      { name: 'ARIMA & SARIMA', level: 'Time Series', description: 'Autoregressive integrated moving average modeling with seasonal components', iconName: 'LineChart' },
      { name: 'XGBoost', level: 'Machine Learning', description: 'Gradient boosting algorithms for structured tabular prediction and classification', iconName: 'BrainCircuit' },
      { name: 'YOLOv8', level: 'Computer Vision', description: 'Real-time object detection, inspection segmentation, and defect tracking', iconName: 'Eye' },
      { name: 'OpenCV', level: 'Computer Vision', description: 'Image processing, spatial filtering, feature extraction, bounding box overlays', iconName: 'Camera' },
      { name: 'NLP', level: 'Language', description: 'Interview transcript processing, text tokenization, sentiment analysis scoring', iconName: 'MessageSquare' },
      { name: 'Trend & Anomaly Analysis', level: 'Statistical', description: 'Detection of operational anomalies, demand peaks, and statistical divergence', iconName: 'Activity' },
      { name: 'Google Gemini', level: 'Generative AI', description: 'Multimodal LLM integration, writing assistance, automated text generation', iconName: 'Bot' }
    ]
  },
  {
    title: 'Tools & Platforms',
    description: 'Rapid prototyping frameworks, cloud databases, version control, and production platforms.',
    skills: [
      { name: 'Streamlit', level: 'Prototyping', description: 'Interactive Python web apps and analytical dashboards for model presentation', iconName: 'MonitorPlay' },
      { name: 'Firebase', level: 'Cloud Backend', description: 'Firestore real-time document database, Firebase Auth, Realtime Database sync', iconName: 'Database' },
      { name: 'MongoDB', level: 'NoSQL Database', description: 'Document storage, flexible JSON collections, aggregation pipelines', iconName: 'HardDrive' },
      { name: 'Git & GitHub', level: 'Version Control', description: 'Branch workflows, pull requests, semantic versioning, verified repository hygiene', iconName: 'GitBranch' },
      { name: 'Jetpack Compose', level: 'Android Mobile', description: 'Declarative Android UI architecture, Kotlin Coroutines, MVVM pattern', iconName: 'Smartphone' }
    ]
  }
];
