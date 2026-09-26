import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  CheckCircle, 
  Star, 
  MapPin, 
  Clock, 
  Search, 
  ArrowRight,
  ShieldCheck,
  Filter
} from 'lucide-react';

export const CreatorsDirectory: React.FC = () => {
  const { creators, navigateToCreator, setCurrentTab, followedCreatorIds, toggleFollowCreator } = useApp();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');

  const filtered = creators.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((sk) => sk.toLowerCase().includes(search.toLowerCase()));
    
    const matchesLevel = levelFilter === 'All' || c.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Vetted Microservice Specialists
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Directly discover and hire verified engineers, designers, and growth architects on Taskora.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by skill or name..."
              className="pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-none"
            />
          </div>

          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold"
          >
            <option value="All">All Specialist Tiers</option>
            <option value="Top Rated Plus">Top Rated Plus</option>
            <option value="Enterprise Elite">Enterprise Elite</option>
            <option value="Pro Specialist">Pro Specialist</option>
            <option value="Rising Talent">Rising Talent</option>
          </select>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((creator) => {
          const isFollowing = followedCreatorIds.includes(creator.id);
          return (
            <div
              key={creator.id}
              onClick={() => navigateToCreator(creator)}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 hover:shadow-card-hover hover:border-indigo-500/40 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/20"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          {creator.name}
                        </span>
                        {creator.verified && (
                          <CheckCircle className="w-4 h-4 text-indigo-500 fill-indigo-100 dark:fill-indigo-950" />
                        )}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        {creator.title}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{creator.location}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 shrink-0">
                    {creator.level}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {creator.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {creator.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{creator.rating}</span>
                  <span className="text-slate-400 font-normal">({creator.reviewCount})</span>
                </div>

                <div className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1">
                  <span>View Services</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
