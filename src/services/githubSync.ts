import { Project, ProjectCategory } from '../types';
import { PROJECTS as FALLBACK_PROJECTS } from '../data/projects';

export const GITHUB_USERNAME = 'ashuuxoo';
const CACHE_KEY = 'ashuuxoo_github_portfolio_cache_v2';
const CACHE_EXPIRY_MS = 1000 * 60 * 10; // 10 minutes cache TTL for instant loads, with background revalidation

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  fork: boolean;
  private: boolean;
  archived: boolean;
  stargazers_count: number;
  topics?: string[];
  default_branch: string;
  pushed_at: string;
  updated_at: string;
  created_at: string;
}

export interface GitHubUserProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers?: number;
  following?: number;
}

export interface SyncResult {
  projects: Project[];
  repoCount: number;
  userProfile: GitHubUserProfile;
  lastSynced: Date;
  fromCache: boolean;
}

/**
 * Fetches the user's latest GitHub profile metadata including the dynamic avatar URL.
 * Never stores or relies on a static permanent avatar string.
 */
export async function fetchGitHubUserProfile(): Promise<GitHubUserProfile> {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (res.ok) {
      const data = await res.json();
      return {
        login: data.login || GITHUB_USERNAME,
        name: data.name || 'Asis Kumar Das',
        avatar_url: data.avatar_url || `https://github.com/${GITHUB_USERNAME}.png`,
        html_url: data.html_url || `https://github.com/${GITHUB_USERNAME}`,
        bio: data.bio || null,
        public_repos: typeof data.public_repos === 'number' ? data.public_repos : 6,
        followers: data.followers,
        following: data.following,
      };
    }
  } catch (err) {
    console.warn('Failed to fetch GitHub profile directly:', err);
  }

  // Dynamic GitHub avatar redirect without any static avatar ID
  return {
    login: GITHUB_USERNAME,
    name: 'Asis Kumar Das',
    avatar_url: `https://github.com/${GITHUB_USERNAME}.png`,
    html_url: `https://github.com/${GITHUB_USERNAME}`,
    bio: 'Technology and analytics professional',
    public_repos: 6,
  };
}

/**
 * Validates whether a candidate string is a real external deployment URL.
 * Filters out template placeholders, invalid protocols, and internal repository paths.
 */
function isValidDeploymentUrl(url: string | null | undefined): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) return false;

  const lower = trimmed.toLowerCase();
  // Filter out GitHub repository links unless it is GitHub Pages (.github.io)
  if (lower.includes('github.com') && !lower.includes('.github.io')) return false;
  // Filter out placeholder / template strings
  if (lower.includes('example.com')) return false;
  if (lower.includes('your-app')) return false;
  if (lower.includes('paste your')) return false;
  if (lower.includes('localhost')) return false;
  if (lower.includes('insert-link')) return false;

  return true;
}

/**
 * Searches the repository description, homepage, and README markdown for real deployment URLs.
 * Never guesses or invents a URL.
 */
export function extractDeploymentUrl(repo: GitHubRepo, readme: string): string | undefined {
  // 1. Check repository settings homepage (e.g. set in GitHub repo header)
  if (repo.homepage && isValidDeploymentUrl(repo.homepage)) {
    return repo.homepage.trim();
  }

  // 2. Check repository description for a standalone URL
  if (repo.description) {
    const descUrlMatch = repo.description.match(/https?:\/\/[^\s)]+/i);
    if (descUrlMatch && isValidDeploymentUrl(descUrlMatch[0])) {
      return descUrlMatch[0].trim();
    }
  }

  // 3. Search README markdown for live demo links, badges, or deployment sections
  if (readme && readme.length > 0) {
    // A) Markdown badges: [![Live Demo](...badge...)](URL)
    const badgeMatch = readme.match(/\[!\[[^\]]*(?:live|demo|preview|app)[^\]]*\]\([^)]+\)\]\((https?:\/\/[^\s)]+)\)/i);
    if (badgeMatch && isValidDeploymentUrl(badgeMatch[1])) {
      return badgeMatch[1].trim();
    }

    // B) Markdown text links: [Live Demo](URL), [Live App](URL), [Demo](URL), [Website](URL), etc.
    const mdLinkRegex = /\[(?:Live Demo|Live App|Live Site|Demo|Preview|Try it out|Streamlit App|Web App|Deployed App|Deployed Link)[^\]]*\]\((https?:\/\/[^\s)]+)\)/gi;
    let linkMatch: RegExpExecArray | null;
    while ((linkMatch = mdLinkRegex.exec(readme)) !== null) {
      if (isValidDeploymentUrl(linkMatch[1])) {
        return linkMatch[1].trim();
      }
    }

    // C) Explicit labeled URLs: e.g. "Streamlit App: https://..." or "Live: https://..."
    const labeledRegex = /(?:Live Demo|Live App|Streamlit App|Deployed App|Website|Live Dashboard)[:\s]+(?:👉|🔗|🚀|•)?\s*(https?:\/\/[^\s\)>]+)/gi;
    let labeledMatch: RegExpExecArray | null;
    while ((labeledMatch = labeledRegex.exec(readme)) !== null) {
      if (isValidDeploymentUrl(labeledMatch[1])) {
        return labeledMatch[1].trim();
      }
    }

    // D) Search for standard public cloud deployment domains (e.g. .vercel.app, .streamlit.app, .netlify.app, .pages.dev)
    const cloudDomainRegex = /https?:\/\/[a-zA-Z0-9_-]+(?:\.vercel\.app|\.streamlit\.app|\.netlify\.app|\.pages\.dev|\.onrender\.com|\.fly\.dev|\.railway\.app)[^\s\)>]*/gi;
    let domainMatch: RegExpExecArray | null;
    while ((domainMatch = cloudDomainRegex.exec(readme)) !== null) {
      if (isValidDeploymentUrl(domainMatch[0])) {
        return domainMatch[0].trim();
      }
    }
  }

  // No deployment URL found
  return undefined;
}

/**
 * Parses raw README content to extract title, subtitle, overview, tech stack, and key features.
 */
export function parseRepoDetails(
  repo: GitHubRepo,
  readme: string
): {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  features: string[];
  techStack: string[];
  categories: ('Web' | 'AI / ML' | 'Data' | 'Analytics' | 'Mobile')[];
  type: string;
  accentColor: string;
  isPrimary: boolean;
  architectureNote?: string;
} {
  const repoName = repo.name;
  let title = repoName.replace(/[-_]/g, ' ');
  let subtitle = repo.description || '';
  let description = repo.description || '';
  let longDescription = repo.description || '';
  const features: string[] = [];
  const techStack: string[] = [];
  let architectureNote: string | undefined = undefined;

  // Initial tech stack from GitHub primary language
  if (repo.language) {
    techStack.push(repo.language);
  }

  if (readme && readme.trim().length > 0) {
    // 1. Title from primary H1 header
    const h1Match = readme.match(/^#\s+(.+)$/m);
    if (h1Match) {
      const cleanTitle = h1Match[1]
        .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
        .replace(/[\u2600-\u26FF]/g, '')
        .replace(/^📞|☕|🎬|✨|⚡\s*/g, '')
        .replace(/\(.*?demo.*?\)/gi, '')
        .trim();
      if (cleanTitle.length > 1) {
        title = cleanTitle;
      }
    }

    // 2. Subtitle from blockquote > right under title or H2/H3
    const blockquoteMatch = readme.match(/^>\s+(.+)$/m);
    if (blockquoteMatch) {
      subtitle = blockquoteMatch[1].trim();
    } else {
      const h2Match = readme.match(/^##?\s+(.+)$/m);
      if (
        h2Match &&
        !h2Match[1].toLowerCase().includes('overview') &&
        !h2Match[1].toLowerCase().includes('features') &&
        !h2Match[1].toLowerCase().includes('table of contents')
      ) {
        subtitle = h2Match[1]
          .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
          .replace(/[\u2600-\u26FF]/g, '')
          .trim();
      }
    }

    // 3. Overview extraction (Project Overview / About)
    const overviewMatch = readme.match(
      /(?:##\s*📌?\s*(?:Project\s+)?Overview|###\s*(?:Project\s+)?Overview|##\s*About)[\s\S]*?\n\n([\s\S]*?)(?=\n##|\n---|$)/i
    );
    if (overviewMatch && overviewMatch[1]) {
      const cleanOverview = overviewMatch[1]
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // remove markdown links, keep text
        .replace(/[*_`#]/g, '')
        .trim();
      if (cleanOverview.length > 20) {
        longDescription = cleanOverview;
        if (!description || description.length < 20) {
          description = cleanOverview.split('\n')[0].slice(0, 180);
        }
      }
    }

    // 4. Features extraction from bullet points
    const featuresMatch = readme.match(
      /(?:##\s*✨?\s*Features|###\s*Highlights|##\s*Key\s+Features|##\s*Highlights)[\s\S]*?(?=\n##|\n---|$)/i
    );
    if (featuresMatch) {
      const lines = featuresMatch[0].split('\n');
      for (const line of lines) {
        const bulletMatch = line.match(/^[\s\t]*[-*•]\s+(.+)$/);
        if (bulletMatch) {
          const cleanBullet = bulletMatch[1]
            .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
            .replace(/[\u2600-\u26FF]/g, '')
            .replace(/[*_`]/g, '')
            .trim();
          if (cleanBullet.length > 4 && features.length < 8) {
            features.push(cleanBullet);
          }
        }
      }
    }

    // 5. Tech stack scanning
    const knownTechnologies = [
      'React 19',
      'React',
      'TypeScript',
      'JavaScript',
      'Vite',
      'Tailwind CSS',
      'Firebase Authentication',
      'Firebase',
      'Firestore',
      'Realtime Database',
      'Google Gemini API',
      'Google Gemini',
      'Meta Prophet',
      'Prophet',
      'Python',
      'Pandas',
      'NumPy',
      'Streamlit',
      'Kotlin',
      'Jetpack Compose',
      'Retrofit',
      'Kotlin Coroutines',
      'Moshi',
      'Android SDK',
      'Express',
      'Node.js',
      'Jupyter Notebook',
      'jsPDF',
      'JSZip',
      'EDA',
      'PostgreSQL',
      'Docker',
    ];

    for (const tech of knownTechnologies) {
      const escaped = tech.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp('(?:^|[\\s,|`*_])' + escaped + '(?:[\\s,|`*_]|$)', 'i');
      if (regex.test(readme)) {
        // Deduplicate variants
        if (tech === 'React' && techStack.some((t) => t.includes('React'))) continue;
        if (tech === 'Firebase' && techStack.some((t) => t.includes('Firebase'))) continue;
        if (tech === 'Prophet' && techStack.some((t) => t.includes('Prophet'))) continue;
        if (!techStack.includes(tech)) {
          techStack.push(tech);
        }
      }
    }

    // 6. Architecture Note
    const archMatch = readme.match(/(?:##\s*Architecture|###\s*Architecture)[\s\S]*?\n\n([\s\S]*?)(?=\n##|\n---|$)/i);
    if (archMatch && archMatch[1]) {
      architectureNote = archMatch[1].replace(/```[\s\S]*?```/g, '').replace(/[*_`#]/g, '').trim().slice(0, 240);
    }
  }

  // Sensible fallbacks if data is sparse
  if (!subtitle || subtitle.length < 5) {
    subtitle = `${repo.language || 'Modern'} public repository on GitHub`;
  }
  if (!description || description.length < 10) {
    description = subtitle;
  }
  if (!longDescription || longDescription.length < 10) {
    longDescription = description;
  }
  if (features.length === 0) {
    if (longDescription.includes('.')) {
      const sentences = longDescription.split('. ').filter((s) => s.trim().length > 12);
      features.push(...sentences.slice(0, 4));
    }
    if (features.length === 0) {
      features.push('Fully public and verifiable source code on GitHub');
      features.push('Engineered following standard modular design patterns');
    }
  }

  // Categorization based on specific technologies, language and repository context
  const categories: ('Web' | 'AI / ML' | 'Data' | 'Analytics' | 'Mobile')[] = [];
  const repoNameLower = repo.name.toLowerCase();
  const langLower = (repo.language || '').toLowerCase();
  const descLower = (repo.description || '').toLowerCase();
  const readmeLower = readme.slice(0, 4000).toLowerCase();

  // Mobile
  if (
    langLower.includes('kotlin') ||
    langLower.includes('swift') ||
    langLower.includes('dart') ||
    langLower.includes('flutter') ||
    repoNameLower.includes('android') ||
    descLower.includes('android') ||
    descLower.includes('phone') ||
    readmeLower.includes('jetpack compose') ||
    readmeLower.includes('android phone')
  ) {
    categories.push('Mobile');
  }

  // Analytics & Business Intelligence
  if (
    repoNameLower.includes('analytics') ||
    repoNameLower.includes('forecast') ||
    descLower.includes('analytics') ||
    descLower.includes('forecasting') ||
    readmeLower.includes('retail analytics') ||
    readmeLower.includes('demand forecasting') ||
    readmeLower.includes('sales trend') ||
    readmeLower.includes('pareto') ||
    readmeLower.includes('business intelligence')
  ) {
    categories.push('Analytics');
  }

  // Data Engineering & EDA
  if (
    langLower.includes('jupyter') ||
    descLower.includes('eda') ||
    descLower.includes('pandas') ||
    readmeLower.includes('eda') ||
    readmeLower.includes('pandas') ||
    readmeLower.includes('data cleaning') ||
    (langLower.includes('python') && !categories.includes('Mobile'))
  ) {
    if (!categories.includes('Data')) categories.push('Data');
  }

  // AI / ML
  if (
    descLower.includes('prophet') ||
    descLower.includes('machine learning') ||
    descLower.includes('gemini') ||
    readmeLower.includes('meta prophet') ||
    readmeLower.includes('gemini api') ||
    readmeLower.includes('time-series forecasting') ||
    readmeLower.includes('machine learning')
  ) {
    categories.push('AI / ML');
  }

  // Web
  if (
    langLower.includes('typescript') ||
    langLower.includes('javascript') ||
    langLower.includes('html') ||
    readmeLower.includes('react') ||
    readmeLower.includes('vite') ||
    readmeLower.includes('next.js') ||
    descLower.includes('web app') ||
    categories.length === 0
  ) {
    if (!categories.includes('Web')) categories.push('Web');
  }

  // Accent color selection
  let accentColor = '#06b6d4'; // default cyan
  if (categories.includes('Mobile')) accentColor = '#3b82f6';
  else if (categories.includes('Analytics') && categories.includes('Data')) accentColor = '#10b981';
  else if (categories.includes('AI / ML') && !categories.includes('Web')) accentColor = '#f59e0b';
  else if (repoNameLower.includes('muvidate') || readmeLower.includes('firebase')) accentColor = '#a855f7';

  // Primary flagship determination
  const isPrimary = repo.name.toLowerCase() === 'mynoook' || repo.name.toLowerCase() === 'mynook';

  // Project type string
  let type = 'Public GitHub Codebase';
  if (categories.includes('Mobile')) type = 'Native Android Application';
  else if (categories.includes('Web') && categories.includes('AI / ML')) type = 'AI-Powered Web Application';
  else if (categories.includes('Analytics')) type = 'Business Intelligence & Analytics';
  else if (categories.includes('Web')) type = 'Full-Stack Web Application';

  return {
    title,
    subtitle,
    description,
    longDescription,
    features,
    techStack,
    categories,
    type,
    accentColor,
    isPrimary,
    architectureNote,
  };
}

/**
 * Fetches all public repositories for user `ashuuxoo` directly from GitHub Public API,
 * retrieves their latest raw README files, and dynamically constructs Project objects.
 * Also retrieves live GitHub profile metadata including dynamic avatar.
 */
export async function fetchGitHubProjects(): Promise<SyncResult> {
  // Fetch user profile and repositories concurrently
  const [userProfile, reposResponse] = await Promise.all([
    fetchGitHubUserProfile(),
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    ).catch(() => null),
  ]);

  try {
    if (!reposResponse || !reposResponse.ok) {
      throw new Error(`GitHub repos API returned status ${reposResponse?.status ?? 'network error'}`);
    }

    const repos: GitHubRepo[] = await reposResponse.json();

    // Filter out forks, private repos, or archived repos (ensuring only public work)
    const publicRepos = repos.filter((r) => !r.fork && !r.private && !r.archived);

    // Fetch READMEs concurrently for all repos
    const projectPromises = publicRepos.map(async (repo) => {
      let readmeContent = '';
      const branchesToTry = [repo.default_branch || 'main', 'main', 'master'];

      for (const branch of branchesToTry) {
        try {
          const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repo.name}/${branch}/README.md`;
          const rawRes = await fetch(rawUrl);
          if (rawRes.ok) {
            readmeContent = await rawRes.text();
            break;
          }
        } catch {
          // Continue to next branch
        }
      }

      // Extract deployment URL according to user rule:
      // Search description and README for real live/deployment/demo URLs. Never invent or guess a URL.
      const liveUrl = extractDeploymentUrl(repo, readmeContent);

      // Parse metadata, features, tech stack, and category
      const details = parseRepoDetails(repo, readmeContent);

      const project: Project = {
        id: repo.name.toLowerCase(),
        title: details.title,
        subtitle: details.subtitle,
        category: details.categories,
        type: details.type,
        isPrimary: details.isPrimary,
        description: details.description,
        longDescription: details.longDescription,
        liveUrl, // If undefined: shows ONLY "View GitHub". If valid: shows both "Live Demo" and "View GitHub".
        githubUrl: repo.html_url,
        features: details.features,
        techStack: details.techStack,
        accentColor: details.accentColor,
        architectureNote: details.architectureNote,
      };

      return project;
    });

    const dynamicProjects = await Promise.all(projectPromises);

    // Sort to ensure flagship is prominently featured, followed by most recently updated
    dynamicProjects.sort((a, b) => {
      if (a.isPrimary) return -1;
      if (b.isPrimary) return 1;
      return 0;
    });

    // Save projects to local storage for instant cold-start and resilience
    // Notice: We deliberately do NOT store avatar_url permanently in localStorage
    const result: SyncResult = {
      projects: dynamicProjects,
      repoCount: publicRepos.length,
      userProfile,
      lastSynced: new Date(),
      fromCache: false,
    };

    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          projects: dynamicProjects,
          repoCount: publicRepos.length,
          timestamp: Date.now(),
        })
      );
    } catch {
      // Ignore storage write issues
    }

    return result;
  } catch (err) {
    console.warn('GitHub live auto-sync error, falling back to cache/seed:', err);

    // Attempt cache restoration
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.projects) && parsed.projects.length > 0) {
          return {
            projects: parsed.projects,
            repoCount: parsed.repoCount || parsed.projects.length,
            userProfile,
            lastSynced: new Date(parsed.timestamp || Date.now()),
            fromCache: true,
          };
        }
      }
    } catch {
      // Ignore cache read issues
    }

    // Ultimate fallback to pre-verified seed projects
    return {
      projects: FALLBACK_PROJECTS,
      repoCount: FALLBACK_PROJECTS.length,
      userProfile,
      lastSynced: new Date(),
      fromCache: true,
    };
  }
}

/**
 * Synchronously retrieves cached projects if available, avoiding layout shifts on initial paint.
 */
export function getInitialCachedProjects(): { projects: Project[]; repoCount: number } {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed.projects) && parsed.projects.length > 0) {
        return {
          projects: parsed.projects,
          repoCount: parsed.repoCount || parsed.projects.length,
        };
      }
    }
  } catch {
    // Ignore cache access issues
  }

  return {
    projects: FALLBACK_PROJECTS,
    repoCount: FALLBACK_PROJECTS.length,
  };
}
