import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Project } from '../types';
import {
  fetchGitHubProjects,
  getInitialCachedProjects,
  GITHUB_USERNAME,
  GitHubUserProfile,
} from '../services/githubSync';

interface GitHubContextType {
  projects: Project[];
  repoCount: number;
  isSyncing: boolean;
  lastSynced: Date | null;
  refresh: () => Promise<void>;
  githubProfileUrl: string;
  githubAvatarUrl: string;
  githubUser: GitHubUserProfile | null;
}

const DEFAULT_AVATAR_URL = `https://github.com/${GITHUB_USERNAME}.png`;

const GitHubContext = createContext<GitHubContextType>({
  projects: [],
  repoCount: 5,
  isSyncing: false,
  lastSynced: null,
  refresh: async () => {},
  githubProfileUrl: `https://github.com/${GITHUB_USERNAME}`,
  githubAvatarUrl: DEFAULT_AVATAR_URL,
  githubUser: null,
});

export const GitHubProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initial = getInitialCachedProjects();
  const [projects, setProjects] = useState<Project[]>(initial.projects);
  const [repoCount, setRepoCount] = useState<number>(initial.repoCount);
  const [isSyncing, setIsSyncing] = useState<boolean>(true);
  const [lastSynced, setLastSynced] = useState<Date | null>(null);
  const [githubAvatarUrl, setGithubAvatarUrl] = useState<string>(DEFAULT_AVATAR_URL);
  const [githubUser, setGithubUser] = useState<GitHubUserProfile | null>(null);

  const syncData = useCallback(async () => {
    setIsSyncing(true);
    try {
      const result = await fetchGitHubProjects();
      setProjects(result.projects);
      setRepoCount(result.repoCount);
      setLastSynced(result.lastSynced);
      if (result.userProfile) {
        setGithubUser(result.userProfile);
        if (result.userProfile.avatar_url) {
          setGithubAvatarUrl(result.userProfile.avatar_url);
        }
      }
    } catch (err) {
      console.warn('Sync failed:', err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Automatically fetch / sync GitHub data whenever portfolio is opened / refreshed
  useEffect(() => {
    syncData();
  }, [syncData]);

  return (
    <GitHubContext.Provider
      value={{
        projects,
        repoCount,
        isSyncing,
        lastSynced,
        refresh: syncData,
        githubProfileUrl: `https://github.com/${GITHUB_USERNAME}`,
        githubAvatarUrl,
        githubUser,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

export const useGitHub = () => useContext(GitHubContext);
