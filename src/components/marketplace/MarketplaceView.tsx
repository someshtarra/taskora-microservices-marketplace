import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceCard } from './ServiceCard';
import { 
  Filter, 
  Grid, 
  List, 
  RotateCcw, 
  ShieldCheck, 
  Star, 
  Clock, 
  DollarSign, 
  SlidersHorizontal, 
  Sparkles, 
  Check,
  ChevronRight,
  Search
} from 'lucide-react';
import { serviceCategories } from '../../data/mockData';
import { ServiceCategory } from '../../types';

export const MarketplaceView: React.FC = () => {
  const { 
    services, 
    filters, 
    setFilters, 
    resetFilters, 
    searchQuery, 
    setSearchQuery 
  } = useApp();

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter and sort computation
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Category filter
      if (filters.category && filters.category !== 'All' && service.category !== filters.category) {
        return false;
      }

      // Keyword search
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = service.title.toLowerCase().includes(query);
        const matchesDesc = service.description.toLowerCase().includes(query);
        const matchesTags = service.tags.some((t) => t.toLowerCase().includes(query));
        const matchesCreator = service.creator.name.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesTags && !matchesCreator) {
          return false;
        }
      }

      // Price filter
      if (service.startingPrice < filters.priceMin || service.startingPrice > filters.priceMax) {
        return false;
      }

      // Rating filter
      if (filters.minRating > 0 && service.rating < filters.minRating) {
        return false;
      }

      // Delivery time
      if (filters.maxDeliveryDays && service.deliveryDays > filters.maxDeliveryDays) {
        return false;
      }

      // Verified provider
      if (filters.onlyVerified && !service.creator.verified) {
        return false;
      }

      // Subscription available
      if (filters.onlySubscription && !service.isSubscriptionAvailable) {
        return false;
      }

      // Enterprise ready
      if (filters.onlyEnterprise && !service.isEnterpriseReady) {
        return false;
      }

      // Provider level
      if (filters.providerLevels.length > 0 && !filters.providerLevels.includes(service.creator.level)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filters.sortBy) {
        case 'popular':
          return b.completedOrders - a.completedOrders;
        case 'rating':
          return b.rating - a.rating;
        case 'price_low':
          return a.startingPrice - b.startingPrice;
        case 'price_high':
          return b.startingPrice - a.startingPrice;
        case 'fastest':
          return a.deliveryDays - b.deliveryDays;
        case 'newest':
          return (b.isNewRising ? 1 : 0) - (a.isNewRising ? 1 : 0);
        case 'recommended':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }, [services, filters]);

  const toggleProviderLevel = (level: string) => {
    setFilters((prev) => {
      const exists = prev.providerLevels.includes(level);
      return {
        ...prev,
        providerLevels: exists
          ? prev.providerLevels.filter((l) => l !== level)
          : [...prev.providerLevels, level]
      };
    });
  };

  const providerLevelOptions = [
    'Rising Talent',
    'Pro Specialist',
    'Top Rated Plus',
    'Enterprise Elite'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Marketplace</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {filters.category || 'All Microservices'}
            </span>
            {filters.searchQuery && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-indigo-600 dark:text-indigo-400">"{filters.searchQuery}"</span>
              </>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {filters.category && filters.category !== 'All' ? `${filters.category} Services` : 'Specialized Microservices Marketplace'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Hire vetted domain specialists for scoped, high-impact tasks. Escrow protection and milestone delivery on every order.
          </p>
        </div>

        {/* View Toggle and Sort Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 hidden sm:inline">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm"
            >
              <option value="recommended">Recommended</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price_low">Lowest Price</option>
              <option value="price_high">Highest Price</option>
              <option value="fastest">Fastest Delivery</option>
              <option value="newest">New & Rising</option>
            </select>
          </div>

          {/* Grid / Compact View Toggle */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <button
              onClick={() => setFilters((prev) => ({ ...prev, viewMode: 'grid' }))}
              className={`p-1.5 rounded-lg transition-colors ${
                filters.viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setFilters((prev) => ({ ...prev, viewMode: 'compact' }))}
              className={`p-1.5 rounded-lg transition-colors ${
                filters.viewMode === 'compact'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              title="Compact List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Filter Sheet Button */}
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-800"
          >
            <Filter className="w-4 h-4 text-indigo-500" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout with Left Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        
        {/* Left Filter Sidebar */}
        <aside className="hidden lg:block space-y-6">
          
          {/* Categories Sidebar List */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Categories
              </h3>
              {filters.category !== 'All' && (
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, category: 'All' }))}
                  className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="space-y-1">
              <button
                onClick={() => setFilters((prev) => ({ ...prev, category: 'All' }))}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  filters.category === 'All'
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <span>All Categories</span>
                <span className="text-[10px] text-slate-400 font-normal">{services.length}</span>
              </button>

              {serviceCategories.map((cat) => {
                const count = services.filter((s) => s.category === cat).length;
                const isSelected = filters.category === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setFilters((prev) => ({ ...prev, category: cat as ServiceCategory }))}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isSelected
                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Advanced Filters Card */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-500" />
                Refine Services
              </h3>
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Budget / Price Range */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                <span>Maximum Budget</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-black">
                  ${filters.priceMax}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="1500"
                step="25"
                value={filters.priceMax}
                onChange={(e) => setFilters((prev) => ({ ...prev, priceMax: parseInt(e.target.value, 10) }))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>$50</span>
                <span>$750</span>
                <span>$1,500+</span>
              </div>
            </div>

            {/* Delivery Time */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                <span>Delivery Time</span>
                <span className="text-slate-500">Up to {filters.maxDeliveryDays} days</span>
              </div>
              <input
                type="range"
                min="1"
                max="14"
                step="1"
                value={filters.maxDeliveryDays}
                onChange={(e) => setFilters((prev) => ({ ...prev, maxDeliveryDays: parseInt(e.target.value, 10) }))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>24h</span>
                <span>3 days</span>
                <span>7 days</span>
                <span>14 days</span>
              </div>
            </div>

            {/* Minimum Rating */}
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                Minimum Rating
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[0, 4.5, 4.8, 4.9].map((ratingVal) => (
                  <button
                    key={ratingVal}
                    onClick={() => setFilters((prev) => ({ ...prev, minRating: ratingVal }))}
                    className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                      filters.minRating === ratingVal
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {ratingVal === 0 ? (
                      'Any'
                    ) : (
                      <>
                        <Star className="w-3 h-3 fill-current" />
                        <span>{ratingVal}+</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Provider Level Selection */}
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                Provider Level
              </div>
              <div className="space-y-1.5">
                {providerLevelOptions.map((level) => {
                  const checked = filters.providerLevels.includes(level);
                  return (
                    <label
                      key={level}
                      onClick={() => toggleProviderLevel(level)}
                      className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer select-none"
                    >
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                        checked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {checked && <Check className="w-3 h-3" />}
                      </div>
                      <span>{level}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Toggle Badges */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <label className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-500" />
                  Verified Specialists Only
                </span>
                <input
                  type="checkbox"
                  checked={filters.onlyVerified}
                  onChange={(e) => setFilters((prev) => ({ ...prev, onlyVerified: e.target.checked }))}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  Subscription Available
                </span>
                <input
                  type="checkbox"
                  checked={filters.onlySubscription}
                  onChange={(e) => setFilters((prev) => ({ ...prev, onlySubscription: e.target.checked }))}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-purple-500" />
                  Enterprise Ready
                </span>
                <input
                  type="checkbox"
                  checked={filters.onlyEnterprise}
                  onChange={(e) => setFilters((prev) => ({ ...prev, onlyEnterprise: e.target.checked }))}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
              </label>
            </div>

          </div>
        </aside>

        {/* Right Main Grid */}
        <main className="lg:col-span-3">
          
          {/* Active Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs text-slate-400 font-medium">
              Showing {filteredServices.length} {filteredServices.length === 1 ? 'result' : 'results'}
            </span>

            {filters.category !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                {filters.category}
                <button onClick={() => setFilters((p) => ({ ...p, category: 'All' }))} className="hover:text-indigo-900">×</button>
              </span>
            )}

            {filters.priceMax < 1500 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                Under ${filters.priceMax}
                <button onClick={() => setFilters((p) => ({ ...p, priceMax: 1500 }))} className="hover:text-slate-900">×</button>
              </span>
            )}

            {filters.onlyVerified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50">
                Verified Only
                <button onClick={() => setFilters((p) => ({ ...p, onlyVerified: false }))} className="hover:text-emerald-900">×</button>
              </span>
            )}
          </div>

          {/* Service Cards Container */}
          {filteredServices.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center mx-auto mb-4 text-indigo-600">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                No microservices matched your filter criteria
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6">
                Try raising the maximum budget, clearing selected provider levels, or searching with broader keywords.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : filters.viewMode === 'compact' ? (
            <div className="space-y-3">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} compact={true} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} compact={false} />
              ))}
            </div>
          )}

        </main>
      </div>

      {/* Mobile Drawer Filter Dialog */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm lg:hidden">
          <div className="w-full max-w-xs bg-white dark:bg-slate-900 h-full p-6 overflow-y-auto animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Filters</h2>
              <button 
                onClick={() => setIsMobileFiltersOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                Close
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters((p) => ({ ...p, category: e.target.value as any }))}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold"
                >
                  <option value="All">All Categories</option>
                  {serviceCategories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  Max Budget: ${filters.priceMax}
                </label>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="25"
                  value={filters.priceMax}
                  onChange={(e) => setFilters((p) => ({ ...p, priceMax: parseInt(e.target.value, 10) }))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md"
              >
                Apply Filters ({filteredServices.length} results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
