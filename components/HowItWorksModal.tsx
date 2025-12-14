import React from 'react';
import { X, Cpu, Github, FileText, Zap } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
       <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 relative shadow-2xl">
         <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
           <X className="w-6 h-6" />
         </button>
         
         <h2 className="text-2xl font-bold text-white mb-6">How GitGrade Works</h2>
         
         <div className="space-y-6">
            <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <Github className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">1. Fetch Repository Data</h3>
                    <p className="text-slate-400 text-sm">We use the GitHub API to retrieve metadata, file trees, and documentation (README, package.json) from your public repository.</p>
                </div>
            </div>

             <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">2. Pre-process Content</h3>
                    <p className="text-slate-400 text-sm">We filter for relevant source files and structure the data to give the AI a complete context of your project's architecture without sending entire codebases.</p>
                </div>
            </div>

             <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <Cpu className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">3. Gemini AI Analysis</h3>
                    <p className="text-slate-400 text-sm">Google's Gemini 2.5 Flash model analyzes the code patterns, structure, and documentation against industry best practices.</p>
                </div>
            </div>

             <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                    <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">4. Generate Insights</h3>
                    <p className="text-slate-400 text-sm">We compile the results into a comprehensive scorecard with actionable steps to improve your repository.</p>
                </div>
            </div>
         </div>
       </div>
    </div>
  );
};

export default HowItWorksModal;