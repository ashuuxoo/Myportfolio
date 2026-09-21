export type ProjectCategory = 'All' | 'Web' | 'AI / ML' | 'Data' | 'Analytics' | 'Mobile';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: ('Web' | 'AI / ML' | 'Data' | 'Analytics' | 'Mobile')[];
  type: string;
  description: string;
  longDescription: string;
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  techStack: string[];
  isPrimary?: boolean;
  accentColor: string;
  architectureNote?: string;
  disclaimer?: string;
}

export interface SkillItem {
  name: string;
  level: string;
  description: string;
  iconName: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  type: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface BuildWorkflowStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  activities: string[];
  icon: string;
}
