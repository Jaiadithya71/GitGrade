import React from 'react';
import { Github, Terminal } from 'lucide-react';

interface HeaderProps {
  onOpenHowItWorks: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenHowItWorks }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <Terminal className="w-6 h-6 text-amber-500" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-500">
            GitGrade
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={onOpenHowItWorks}
            className="text-slate-400 hover:text-white transition-colors text-sm font-medium"
          >
            How it works
          </button>
          <a 
            href="https://github.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">Star on GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;