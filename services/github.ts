import { RepoMetadata, RepoContext, FileNode } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';

// Helper to parse GitHub URL
export const parseRepoUrl = (url: string): { owner: string; repo: string } | null => {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname !== 'github.com') return null;
    const parts = urlObj.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1] };
  } catch (e) {
    return null;
  }
};

const getHeaders = (token?: string) => {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };
  if (token) {
    headers['Authorization'] = `token ${token}`;
  }
  return headers;
};

export const fetchRepoData = async (
  owner: string, 
  repo: string, 
  token?: string,
  onProgress?: (status: string) => void
): Promise<RepoContext> => {
  const headers = getHeaders(token);

  if (onProgress) onProgress("Connecting to GitHub...");

  // 1. Fetch Metadata
  if (onProgress) onProgress("Fetching repository metadata...");
  const metaRes = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}`, { headers });
  if (!metaRes.ok) {
    const error = await metaRes.json();
    throw new Error(error.message || 'Failed to fetch repository metadata');
  }
  const metaJson = await metaRes.json();
  
  const metadata: RepoMetadata = {
    owner: metaJson.owner.login,
    name: metaJson.name,
    description: metaJson.description,
    stars: metaJson.stargazers_count,
    forks: metaJson.forks_count,
    language: metaJson.language,
    openIssues: metaJson.open_issues_count,
    defaultBranch: metaJson.default_branch,
    updatedAt: metaJson.updated_at,
  };

  // 2. Fetch File Tree (Truncated for context limit)
  if (onProgress) onProgress("Analyzing file structure...");
  const treeRes = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/git/trees/${metadata.defaultBranch}?recursive=1`, { headers });
  let fileTree: string[] = [];
  
  if (treeRes.ok) {
    const treeJson = await treeRes.json();
    // Take top 200 files to avoid massive payloads, filtering for interesting files
    fileTree = (treeJson.tree as FileNode[])
      .filter(node => node.type === 'blob')
      .map(node => node.path)
      .slice(0, 300); 
  }

  // 3. Fetch README
  if (onProgress) onProgress("Reading documentation...");
  let readmeContent: string | null = null;
  try {
    const readmeRes = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/readme`, { headers });
    if (readmeRes.ok) {
      const readmeJson = await readmeRes.json();
      readmeContent = atob(readmeJson.content);
    }
  } catch (e) {
    console.warn('Failed to fetch README');
  }

  // 4. Fetch package.json (if exists, helps identify dependencies)
  if (onProgress) onProgress("Checking dependencies...");
  let packageJsonContent: string | null = null;
  try {
    const pkgRes = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/package.json`, { headers });
    if (pkgRes.ok) {
      const pkgJson = await pkgRes.json();
      packageJsonContent = atob(pkgJson.content);
    }
  } catch (e) {
    // Ignore if not a JS repo
  }

  return {
    metadata,
    fileTree,
    readmeContent,
    packageJsonContent
  };
};