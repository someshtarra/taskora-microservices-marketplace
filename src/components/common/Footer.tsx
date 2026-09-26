import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Sparkles, Globe, Lock, ArrowUpRight } from 'lucide-react';
import { serviceCategories } from '../../data/mockData';

export const Footer: React.FC = () => {
  const { setCurrentTab, setFilters } = useApp();

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 text-left transition-colors pt-16 pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand & Category Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-200/60 dark:border-slate-800/60">
          
          {/* Brand Info Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 7h16M12 7v13M16 11l4 0M16 15l4 0" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                Taskora
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              <strong>Big results. One task at a time.</strong> The next-generation marketplace connecting engineering teams, agencies, and founders with vetted specialists for focused digital microservices.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Escrow Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-indigo-500" />
                <span>256-Bit Encryption</span>
              </div>
            </div>
          </div>

          {/* Categories 1 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Tech & Engineering
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              {['AI & Automation', 'Cloud', 'Cybersecurity', 'Development', 'Engineering'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setFilters((p) => ({ ...p, category: cat as any }));
                      setCurrentTab('marketplace');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Creative & Growth
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              {['Design', 'Video', 'Marketing', 'Writing', 'Business'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setFilters((p) => ({ ...p, category: cat as any }));
                      setCurrentTab('marketplace');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions & Workspaces */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button onClick={() => setCurrentTab('explore')} className="hover:text-indigo-600">
                  Explore Showcases
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('projects')} className="hover:text-indigo-600">
                  Custom Projects
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('subscriptions')} className="hover:text-indigo-600">
                  Monthly Retainers
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('admin_panel')} className="hover:text-indigo-600">
                  Admin Oversight
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Currency */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 Taskora Technologies Inc. All rights reserved. Original Specialized Microservices Platform.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
              <Globe className="w-3.5 h-3.5" />
              <span>English (US)</span>
            </span>
            <span>•</span>
            <span className="hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer font-bold">
              USD ($)
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
