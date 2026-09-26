import React from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceCard } from '../marketplace/ServiceCard';
import { Bookmark, ShoppingBag, ArrowRight } from 'lucide-react';

export const SavedView: React.FC = () => {
  const { savedServiceIds, services, setCurrentTab } = useApp();

  const savedList = services.filter((s) => savedServiceIds.includes(s.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left space-y-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Saved Microservices & Collections
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review bookmarked services and specialists saved for upcoming sprints.
        </p>
      </div>

      {savedList.length === 0 ? (
        <div className="p-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs space-y-4">
          <Bookmark className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Your collection is empty</h3>
          <p className="text-slate-500 max-w-sm mx-auto">
            Click the bookmark icon on any microservice or explore reel to save it for later comparison.
          </p>
          <button
            onClick={() => setCurrentTab('marketplace')}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold"
          >
            Explore Microservices
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedList.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}

    </div>
  );
};
