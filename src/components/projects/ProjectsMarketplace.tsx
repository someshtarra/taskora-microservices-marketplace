import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FolderGit2, 
  DollarSign, 
  Calendar, 
  PlusCircle, 
  ShieldCheck, 
  Clock, 
  Check, 
  ArrowRight,
  Search,
  Filter
} from 'lucide-react';
import { serviceCategories } from '../../data/mockData';

export const ProjectsMarketplace: React.FC = () => {
  const { 
    projects, 
    navigateToProject, 
    setIsPostProjectModalOpen, 
    setCurrentTab 
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState('All');

  const filtered = categoryFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === categoryFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Custom Projects & Milestone Contracts
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Browse active project scopes funded in escrow. Pitch solutions or post your own custom technical requirements.
          </p>
        </div>

        <button
          onClick={() => setIsPostProjectModalOpen(true)}
          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post a Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            onClick={() => navigateToProject(proj)}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 hover:shadow-card-hover transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {proj.category}
                </span>
                <span className="text-xs text-slate-400">
                  Posted {proj.createdAt}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {proj.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4 max-w-3xl">
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {proj.requiredSkills.map((sk) => (
                  <span
                    key={sk}
                    className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[10px] font-semibold text-slate-600 dark:text-slate-300"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800 gap-3 shrink-0">
              <div className="text-left md:text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Budget</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  ${proj.budgetMin} - ${proj.budgetMax}
                </span>
                <span className="block text-[11px] text-slate-400">Due: {proj.deadline}</span>
              </div>

              <button className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all">
                Open Workspace →
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
