import React from 'react';
import { AnalysisResult, RepoMetadata } from '../types';
import ScoreGauge from './ScoreGauge';
import { CheckCircle2, XCircle, Map, GitFork, Star, Info } from 'lucide-react';

interface ResultsDashboardProps {
  result: AnalysisResult;
  metadata: RepoMetadata;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result, metadata }) => {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-slate-900/50 rounded-2xl border border-slate-800 backdrop-blur-sm">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3 justify-center md:justify-start">
            {metadata.owner} / {metadata.name}
            <span className="text-xs px-2 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              {result.level}
            </span>
          </h2>
          <p className="text-slate-400 mt-1 max-w-2xl">{metadata.description || "No description provided."}</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-yellow-500 font-bold text-lg"><Star className="w-4 h-4" fill="currentColor"/> {metadata.stars}</span>
            <span>Stars</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 text-blue-400 font-bold text-lg"><GitFork className="w-4 h-4" /> {metadata.forks}</span>
            <span>Forks</span>
          </div>
          <div className="flex flex-col items-center">
             <span className="flex items-center gap-1 text-slate-300 font-bold text-lg"><Info className="w-4 h-4" /> {metadata.openIssues}</span>
            <span>Issues</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Score & Summary Card */}
        <div className="lg:col-span-1 bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-4">Overall Score</h3>
          <ScoreGauge score={result.score} />
          
          <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <h4 className="text-sm font-semibold text-amber-500 uppercase tracking-wider mb-2">Executive Summary</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              {result.summary}
            </p>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/80 rounded-2xl border border-green-900/30 p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-3 opacity-10">
                <CheckCircle2 className="w-24 h-24 text-green-500" />
             </div>
             <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                Strengths
             </h3>
             <ul className="space-y-3 relative z-10">
                {result.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0"></span>
                        {s}
                    </li>
                ))}
             </ul>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-red-900/30 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
                <XCircle className="w-24 h-24 text-red-500" />
             </div>
             <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                Areas for Improvement
             </h3>
             <ul className="space-y-3 relative z-10">
                {result.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0"></span>
                        {w}
                    </li>
                ))}
             </ul>
          </div>

          {/* Roadmap - Spans full width of this column group */}
           <div className="md:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Map className="w-5 h-5 text-blue-400" />
                Personalized Roadmap
              </h3>
              <div className="space-y-4">
                {result.roadmap.map((item, index) => (
                    <div key={index} className="group relative pl-8 border-l border-slate-700 last:border-none pb-2">
                        <div className={`absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${
                            item.priority === 'High' ? 'bg-red-500' : 
                            item.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
                        }`}></div>
                        
                        <div className="bg-slate-800/40 hover:bg-slate-800/80 p-4 rounded-lg border border-slate-700/50 transition-colors">
                            <div className="flex items-start justify-between mb-1">
                                <h4 className="text-white font-medium">{item.title}</h4>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                    item.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                                    item.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                                    'bg-blue-500/20 text-blue-400'
                                }`}>
                                    {item.priority}
                                </span>
                            </div>
                            <p className="text-sm text-slate-400">{item.description}</p>
                        </div>
                    </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
