export interface RepoMetadata {
  owner: string;
  name: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  openIssues: number;
  defaultBranch: string;
  updatedAt: string;
}

export interface FileNode {
  path: string;
  type: 'blob' | 'tree';
}

export interface RepoContext {
  metadata: RepoMetadata;
  fileTree: string[];
  readmeContent: string | null;
  packageJsonContent: string | null;
}

export interface RoadmapItem {
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface AnalysisResult {
  score: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  roadmap: RoadmapItem[];
  strengths: string[];
  weaknesses: string[];
}
