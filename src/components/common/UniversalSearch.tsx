import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  X, 
  TrendingUp, 
  History, 
  Sparkles, 
  SlidersHorizontal, 
  ArrowRight, 
  Bookmark, 
  Bot, 
  Star,
  Check
} from 'lucide-react';
import { serviceCategories } from '../../data/mockData';

export const UniversalSearch: React.FC<{ expanded?: boolean; onCloseMobile?: () => void }> = ({ 
  expanded = false, 
  onCloseMobile 
}) => {
  const { 
    searchQuery, 
    setSearchQuery, 
    setCurrentTab, 
    setFilters, 
    services, 
    creators, 
    navigateToService,
    navigateToCreator,
    addToast
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(searchQuery);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Need an AI chatbot for a Shopify store under $300',
    'Kubernetes cluster security audit',
    'Figma SaaS landing page design system'
  ]);
  const [savedSearches, setSavedSearches] = useState<string[]>([
    'SOC2 penetration testing',
    'Interactive 3D Spline web components'
  ]);

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync external search query
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trendingQueries = [
    'Shopify AI Support Bot',
    'Kubernetes Spot Migration',
    'Figma SaaS Design System',
    '3D WebGL Spline Assets',
    'Make.com CRM Automation',
    'Technical SEO Audit'
  ];

  // Natural language query processor
  const processNaturalLanguageQuery = (rawQuery: string) => {
    const queryLower = rawQuery.toLowerCase();
    let detectedCategory: any = 'All';
    let maxPrice = 1500;
    let cleanTerms = rawQuery;

    // Detect price constraint (e.g., "under $300", "under 300", "< $200")
    const priceMatch = queryLower.match(/under\s*\$?(\d+)|less than\s*\$?(\d+)|\<\s*\$?(\d+)/);
    if (priceMatch) {
      const priceVal = parseInt(priceMatch[1] || priceMatch[2] || priceMatch[3], 10);
      if (!isNaN(priceVal)) {
        maxPrice = priceVal;
      }
    }

    // Detect category intent
    if (queryLower.includes('ai') || queryLower.includes('chatbot') || queryLower.includes('bot') || queryLower.includes('llm')) {
      detectedCategory = 'AI & Automation';
    } else if (queryLower.includes('kubernetes') || queryLower.includes('cloud') || queryLower.includes('aws') || queryLower.includes('docker') || queryLower.includes('terraform')) {
      detectedCategory = 'Cloud';
    } else if (queryLower.includes('figma') || queryLower.includes('design') || queryLower.includes('ui/ux') || queryLower.includes('landing page') || queryLower.includes('3d')) {
      detectedCategory = 'Design';
    } else if (queryLower.includes('seo') || queryLower.includes('marketing') || queryLower.includes('growth')) {
      detectedCategory = 'Marketing';
    } else if (queryLower.includes('security') || queryLower.includes('pen test') || queryLower.includes('soc2')) {
      detectedCategory = 'Cybersecurity';
    } else if (queryLower.includes('automation') || queryLower.includes('airtable') || queryLower.includes('crm')) {
      detectedCategory = 'Business';
    }

    // Extract core keywords
    cleanTerms = rawQuery
      .replace(/need an?/gi, '')
      .replace(/for a/gi, '')
      .replace(/under\s*\$?\d+/gi, '')
      .replace(/less than\s*\$?\d+/gi, '')
      .trim();

    return { detectedCategory, maxPrice, cleanTerms };
  };

  const handleExecuteSearch = (queryToRun: string) => {
    if (!queryToRun.trim()) return;

    // Add to recent searches
    if (!recentSearches.includes(queryToRun)) {
      setRecentSearches((prev) => [queryToRun, ...prev.slice(0, 4)]);
    }

    const { detectedCategory, maxPrice, cleanTerms } = processNaturalLanguageQuery(queryToRun);

    setSearchQuery(cleanTerms || queryToRun);
    setFilters((prev) => ({
      ...prev,
      category: detectedCategory !== 'All' ? detectedCategory : prev.category,
      priceMax: maxPrice !== 1500 ? maxPrice : prev.priceMax,
      searchQuery: cleanTerms || queryToRun
    }));

    setIsOpen(false);
    setCurrentTab('marketplace');
    if (onCloseMobile) onCloseMobile();

    if (maxPrice < 1500 || detectedCategory !== 'All') {
      addToast(
        'Smart Filter Applied',
        `Showing ${detectedCategory !== 'All' ? detectedCategory : 'services'} up to $${maxPrice}`,
        'info'
      );
    }
  };

  const handleSaveCurrentSearch = (query: string) => {
    if (!savedSearches.includes(query)) {
      setSavedSearches((prev) => [...prev, query]);
      addToast('Search Saved', `"${query}" added to your saved searches.`, 'success');
    }
  };

  // Typo detection simulation
  const checkTypo = (query: string): string | null => {
    const q = query.toLowerCase();
    if (q.includes('kubernetez') || q.includes('k8s')) return 'Kubernetes';
    if (q.includes('chattbot') || q.includes('chabot')) return 'AI chatbot';
    if (q.includes('shopfy') || q.includes('shoppify')) return 'Shopify';
    if (q.includes('figmma')) return 'Figma';
    return null;
  };

  const suggestedTypo = inputValue ? checkTypo(inputValue) : null;

  // Filtered preview matches
  const previewServices = inputValue
    ? services.filter(
        (s) =>
          s.title.toLowerCase().includes(inputValue.toLowerCase()) ||
          s.category.toLowerCase().includes(inputValue.toLowerCase()) ||
          s.tags.some((t) => t.toLowerCase().includes(inputValue.toLowerCase()))
      ).slice(0, 3)
    : [];

  const previewCreators = inputValue
    ? creators.filter(
        (c) =>
          c.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          c.title.toLowerCase().includes(inputValue.toLowerCase()) ||
          c.skills.some((sk) => sk.toLowerCase().includes(inputValue.toLowerCase()))
      ).slice(0, 2)
    : [];

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl">
      <div className="relative flex items-center">
        <div className="absolute left-3.5 pointer-events-none text-slate-400 dark:text-slate-500">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={inputValue}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleExecuteSearch(inputValue);
            }
          }}
          placeholder="Try 'Need an AI chatbot for a Shopify store under $300'..."
          className="w-full pl-10 pr-24 py-2.5 bg-slate-100 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm rounded-xl border border-transparent focus:border-indigo-500/50 focus:bg-white dark:focus:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
        />

        <div className="absolute right-2.5 flex items-center gap-1.5">
          {inputValue && (
            <button
              onClick={() => {
                setInputValue('');
                setSearchQuery('');
              }}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => handleExecuteSearch(inputValue)}
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-all shadow-sm"
          >
            <span>Search</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Dropdown Suggestions */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800 p-4 z-50 text-left max-h-[85vh] overflow-y-auto animate-fade-in backdrop-blur-xl">
          
          {/* Typo correction notification */}
          {suggestedTypo && (
            <div className="mb-3 p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-800 dark:text-amber-300 flex items-center justify-between">
              <span>
                Did you mean: <strong className="underline cursor-pointer" onClick={() => {
                  setInputValue(suggestedTypo);
                  handleExecuteSearch(suggestedTypo);
                }}>{suggestedTypo}</strong>?
              </span>
              <button 
                onClick={() => handleExecuteSearch(suggestedTypo)}
                className="font-medium text-amber-600 dark:text-amber-400 hover:underline"
              >
                Apply
              </button>
            </div>
          )}

          {/* Natural language helper hint */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800/80 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              Natural Language Marketplace Search
            </span>
            <span className="text-[11px] text-slate-400">Supports budgets, tools & categories</span>
          </div>

          {/* Matching Services Live Preview */}
          {previewServices.length > 0 && (
            <div className="mb-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                Suggested Services
              </div>
              <div className="space-y-1.5">
                {previewServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => {
                      navigateToService(service);
                      setIsOpen(false);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={service.thumbnail}
                        alt={service.title}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {service.title}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <span>{service.creator.name}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-amber-500">
                            <Star className="w-3 h-3 fill-amber-400" />
                            {service.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white shrink-0 ml-3">
                      From ${service.startingPrice}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matching Creators Preview */}
          {previewCreators.length > 0 && (
            <div className="mb-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                Suggested Specialists
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {previewCreators.map((creator) => (
                  <div
                    key={creator.id}
                    onClick={() => {
                      navigateToCreator(creator);
                      setIsOpen(false);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 cursor-pointer transition-colors"
                  >
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-9 h-9 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                        {creator.name}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {creator.title}
                      </div>
                    </div>
                    <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium shrink-0">
                      ★ {creator.rating}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
              <TrendingUp className="w-3 h-3 text-indigo-500" />
              Trending Searches
            </div>
            <div className="flex flex-wrap gap-1.5">
              {trendingQueries.map((query) => (
                <button
                  key={query}
                  onClick={() => {
                    setInputValue(query);
                    handleExecuteSearch(query);
                  }}
                  className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800/80 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 rounded-lg transition-colors border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                <span className="flex items-center gap-1.5">
                  <History className="w-3 h-3 text-slate-400" />
                  Recent Searches
                </span>
                <button
                  onClick={() => setRecentSearches([])}
                  className="text-[10px] font-normal text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  Clear all
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((rec) => (
                  <div
                    key={rec}
                    className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer text-xs text-slate-600 dark:text-slate-300 group"
                  >
                    <span 
                      className="truncate flex-1"
                      onClick={() => {
                        setInputValue(rec);
                        handleExecuteSearch(rec);
                      }}
                    >
                      {rec}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveCurrentSearch(rec);
                      }}
                      title="Save this search"
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-indigo-600 p-1 transition-opacity"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Categories Bar */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
              Browse by Category
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {serviceCategories.slice(0, 8).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, category: cat }));
                    setCurrentTab('marketplace');
                    setIsOpen(false);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className="text-left px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-xs text-slate-700 dark:text-slate-300 hover:text-indigo-600 transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
