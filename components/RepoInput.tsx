import React, { useState } from 'react';
import { Search, Loader2, Key } from 'lucide-react';
import { parseRepoUrl } from '../services/github';

interface RepoInputProps {
  onAnalyze: (owner: string, repo: string, token?: string) => void;
  isLoading: boolean;
}

const RepoInput: React.FC<RepoInputProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');
  const [token, setToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const repoInfo = parseRepoUrl(url);
    if (!repoInfo) {
      setError('Invalid GitHub URL. Please use format: https://github.com/owner/repo');
      return;
    }

    onAnalyze(repoInfo.owner, repoInfo.repo, token || undefined);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Rate My <span className="text-amber-500">Repo</span>
        </h1>
        <p className="text-lg text-slate-400">
          Get an AI-powered audit of your code quality, documentation, and engineering practices.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-slate-900 rounded-xl border border-slate-700 shadow-2xl p-2 flex flex-col sm:flex-row items-center gap-2">
          <div className="flex-1 flex items-center w-full px-4 h-12">
            <Search className="w-5 h-5 text-slate-500 mr-3" />
            <input 
              type="text"
              placeholder="https://github.com/username/repository"
              className="bg-transparent border-none outline-none text-white w-full placeholder-slate-500"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <button 
            type="submit"
            disabled={isLoading || !url}
            className="w-full sm:w-auto h-12 px-8 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Analyzing
              </>
            ) : (
              'Analyze Repo'
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-400 text-sm text-center bg-red-950/30 p-2 rounded-lg border border-red-900/50">
          {error}
        </div>
      )}

      <div className="flex justify-center">
        <button 
          type="button"
          onClick={() => setShowTokenInput(!showTokenInput)}
          className="text-xs text-slate-500 hover:text-amber-500 flex items-center gap-1 transition-colors"
        >
          <Key className="w-3 h-3" />
          {showTokenInput ? 'Hide Token' : 'Add GitHub Token (Optional for higher rate limits)'}
        </button>
      </div>

      {showTokenInput && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
           <input 
              type="password"
              placeholder="ghp_xxxxxxxxxxxx"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2 text-sm text-slate-300 focus:border-amber-500 focus:outline-none transition-colors"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <p className="text-[10px] text-slate-600 mt-1 text-center">
              Your token is used only for this request and not stored.
            </p>
        </div>
      )}
    </div>
  );
};

export default RepoInput;
