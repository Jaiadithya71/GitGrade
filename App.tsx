import React, { useState } from 'react';
import Header from './components/Header';
import RepoInput from './components/RepoInput';
import ResultsDashboard from './components/ResultsDashboard';
import HowItWorksModal from './components/HowItWorksModal';
import { AnalysisResult, RepoMetadata } from './types';
import { fetchRepoData } from './services/github';
import { analyzeRepo } from './services/gemini';
import { AlertTriangle, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Initializing...");
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ result: AnalysisResult; metadata: RepoMetadata } | null>(null);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  const handleAnalyze = async (owner: string, repo: string, token?: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      // 1. Fetch data from GitHub with progress updates
      const repoContext = await fetchRepoData(owner, repo, token, (status) => {
        setLoadingStatus(status);
      });
      
      // 2. Send to Gemini for analysis
      setLoadingStatus("Generating AI Analysis Report...");
      const analysis = await analyzeRepo(repoContext);
      
      setData({
        result: analysis,
        metadata: repoContext.metadata
      });

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred. Please check the repository URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black">
      <Header onOpenHowItWorks={() => setIsHowItWorksOpen(true)} />
      <HowItWorksModal isOpen={isHowItWorksOpen} onClose={() => setIsHowItWorksOpen(false)} />
      
      <main className="container mx-auto px-4 py-12 flex flex-col items-center">
        {!data && (
           <div className="w-full flex flex-col items-center justify-center min-h-[60vh]">
              <RepoInput onAnalyze={handleAnalyze} isLoading={loading} />
              
              {error && (
                <div className="mt-8 p-4 bg-red-950/40 border border-red-900/50 rounded-xl flex items-center gap-3 text-red-200 max-w-lg animate-in fade-in slide-in-from-bottom-2">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    <p className="text-sm">{error}</p>
                </div>
              )}

              {loading && (
                  <div className="mt-8 text-center space-y-3 animate-in fade-in duration-500">
                      <div className="flex items-center justify-center gap-2 text-amber-500 font-medium text-lg">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{loadingStatus}</span>
                      </div>
                      <p className="text-slate-500 text-sm">Please wait while we inspect the repository code and structure.</p>
                  </div>
              )}
           </div>
        )}

        {data && !loading && (
          <div className="w-full">
            <button 
                onClick={() => setData(null)}
                className="mb-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors text-sm font-medium"
            >
                ← Analyze another repository
            </button>
            <ResultsDashboard result={data.result} metadata={data.metadata} />
          </div>
        )}
      </main>

      <footer className="border-t border-slate-800 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
            <p>GitGrade © 2024. Powered by Google Gemini.</p>
            <p className="mt-2 text-xs">This tool uses public GitHub APIs. Add a token to avoid rate limits.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;