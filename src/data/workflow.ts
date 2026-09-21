import { BuildWorkflowStep } from '../types';

export const WORKFLOW_STEPS: BuildWorkflowStep[] = [
  {
    number: '01',
    title: 'Understand',
    subtitle: 'Problem Discovery & Core Constraints',
    description:
      'Every project begins by deconstructing the core problem. I identify user pain points, analyze data schemas, and define architectural requirements before writing a single line of code.',
    activities: [
      'Problem definition & scope framing',
      'Data modeling & schema design',
      'API & third-party requirement audits',
      'User journey mapping'
    ],
    icon: 'Search'
  },
  {
    number: '02',
    title: 'Design',
    subtitle: 'System Architecture & Interface Aesthetics',
    description:
      'Designing with intention: pairing clean, high-contrast layouts with modular component hierarchies. I prioritize typography, responsive layout flow, and robust state machines.',
    activities: [
      'Component hierarchy wireframing',
      'Design tokens & dark mode color palettes',
      'Type safety & interface contracts',
      'Micro-interaction choreography'
    ],
    icon: 'PenTool'
  },
  {
    number: '03',
    title: 'Build',
    subtitle: 'Clean Code & Rapid Execution',
    description:
      'Executing with modern, battle-tested tools — React 19, TypeScript, Python, Kotlin, and Firebase. Code is written modularly with strict typing, clean separation of concerns, and zero fluff.',
    activities: [
      'Strict TypeScript & reactive state hooks',
      'Real-time Firestore sync & cloud routes',
      'Pandas vectorization & model scripts',
      'Modern GPU-accelerated motion'
    ],
    icon: 'Code2'
  },
  {
    number: '04',
    title: 'Test',
    subtitle: 'Resilience, Edge Cases & Verification',
    description:
      'Testing across network failures, asynchronous edge cases, responsive viewports, and accessibility requirements. Validating that software handles the unexpected gracefully.',
    activities: [
      'Build compilation & type checks',
      'Network failure & loading states',
      'Cross-browser & mobile touch testing',
      'Accessibility & contrast audit'
    ],
    icon: 'CheckCircle2'
  },
  {
    number: '05',
    title: 'Analyze',
    subtitle: 'Metrics, Performance & Insights',
    description:
      'Analyzing real performance: measuring bundle sizes, rendering bottlenecks, and computational complexity. For data products, evaluating model accuracy and business KPI clarity.',
    activities: [
      'Bundle analyzer & Web Vitals tracking',
      'Forecasting confidence intervals',
      'Pareto 80/20 commercial distribution',
      'User interaction bottlenecks'
    ],
    icon: 'BarChart'
  },
  {
    number: '06',
    title: 'Ship',
    subtitle: 'Automated CI/CD & Production Delivery',
    description:
      'Shipping to production with automated Vercel pipelines, GitHub Actions, and cloud deployments. Delivering software that is live, reliable, and continuously maintainable.',
    activities: [
      'Vercel edge deployment & caching',
      'GitHub Actions CI/CD workflows',
      'Environment variable security audits',
      'Production observability & documentation'
    ],
    icon: 'Rocket'
  }
];
