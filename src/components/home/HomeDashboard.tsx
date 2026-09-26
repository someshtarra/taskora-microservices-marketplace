import React from 'react';
import { useApp } from '../../context/AppContext';
import { UniversalSearch } from '../common/UniversalSearch';
import { ServiceCard } from '../marketplace/ServiceCard';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  TrendingUp, 
  Zap, 
  Award, 
  CheckCircle, 
  Users, 
  Layers, 
  Bot, 
  Clock, 
  PlusCircle, 
  Briefcase,
  Sliders,
  DollarSign
} from 'lucide-react';
import { serviceCategories } from '../../data/mockData';

export const HomeDashboard: React.FC = () => {
  const { 
    services, 
    creators, 
    setCurrentTab, 
    setFilters, 
    setSearchQuery, 
    navigateToService, 
    navigateToCreator,
    setIsPostProjectModalOpen 
  } = useApp();

  const handleSuggestionClick = (query: string) => {
    setSearchQuery(query);
    setFilters((prev) => ({ ...prev, searchQuery: query, category: 'All' }));
    setCurrentTab('marketplace');
  };

  // Section subsets with varied layouts
  const recommendedServices = services.slice(0, 3);
  const trendingServices = services.filter((s) => s.isTrending || s.rating >= 4.96);
  const under50Services = services.filter((s) => s.startingPrice <= 100);
  const enterpriseServices = services.filter((s) => s.isEnterpriseReady);
  const aiServices = services.filter((s) => s.category === 'AI & Automation');

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-indigo-50/50 via-white to-white dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
        
        {/* Glow backdrop decorative orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 dark:opacity-20">
          <div className="absolute -top-16 left-1/4 w-96 h-96 rounded-full bg-indigo-500 blur-3xl" />
          <div className="absolute -top-10 right-1/4 w-96 h-96 rounded-full bg-purple-500 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-bold shadow-sm mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>Taskora Specialized Digital Microservices</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-slate-500 dark:text-slate-400 font-normal">Big results. One task at a time.</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Everything you need, <br className="hidden sm:inline" />
            <span className="brand-gradient-text">one microservice at a time.</span>
          </h1>

          {/* Subheading */}
          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Hire pre-vetted specialists for focused, high-precision outcomes. Skip lengthy recruitment, eliminate scope creep, and scale with milestone escrow protection.
          </p>

          {/* Large Intelligent Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <UniversalSearch expanded={true} />
          </div>

          {/* Example Suggestions Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Popular:</span>
            {[
              'Build my website',
              'Edit my YouTube videos',
              'Automate my business',
              'Create a mobile app',
              'Improve SEO'
            ].map((sugg) => (
              <button
                key={sugg}
                onClick={() => handleSuggestionClick(sugg)}
                className="px-3 py-1 rounded-full bg-white/80 dark:bg-slate-900/80 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 border border-slate-200/80 dark:border-slate-800 transition-colors shadow-2xs font-medium"
              >
                {sugg}
              </button>
            ))}
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left sm:text-center">
            <div className="p-3">
              <div className="text-2xl font-black text-slate-900 dark:text-white">24,500+</div>
              <div className="text-xs text-slate-400 font-medium">Microservices Delivered</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">99.4%</div>
              <div className="text-xs text-slate-400 font-medium">Milestone On-Time SLA</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-black text-slate-900 dark:text-white">&lt; 15 min</div>
              <div className="text-xs text-slate-400 font-medium">Average Specialist Response</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">$42M+</div>
              <div className="text-xs text-slate-400 font-medium">Escrow Protected Payouts</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Category Quick Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Specialized Service Domains
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Browse microservices categorized by technical discipline
            </p>
          </div>
          <button
            onClick={() => {
              setFilters((p) => ({ ...p, category: 'All' }));
              setCurrentTab('marketplace');
            }}
            className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>View all 12 categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {serviceCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setFilters((p) => ({ ...p, category: cat as any }));
                setCurrentTab('marketplace');
              }}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/50 hover:shadow-card-hover transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                {cat}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Explore specialized gigs
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Section: Recommended for You (Distinct 3-column Hero Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-3.5 h-3.5" />
              Tailored Selection
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Recommended for You
            </h2>
          </div>
          <button
            onClick={() => setCurrentTab('marketplace')}
            className="text-xs font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"
          >
            <span>See more</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 4. Section: AI & Automation (Distinct Visual Layout with Deep Indigo Glow) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border border-indigo-800/40 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-wider border border-indigo-500/30">
                <Bot className="w-3 h-3" />
                Autonomous Agents & Workflows
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-2">
                AI & Business Automation Microservices
              </h2>
              <p className="text-xs sm:text-sm text-indigo-200/80 mt-1 max-w-xl">
                Replace manual operational bottlenecks with high-accuracy LLM agents, vector retrieval, and automated webhooks.
              </p>
            </div>

            <button
              onClick={() => {
                setFilters((p) => ({ ...p, category: 'AI & Automation' }));
                setCurrentTab('marketplace');
              }}
              className="px-5 py-2.5 bg-white text-slate-950 hover:bg-indigo-50 rounded-xl text-xs font-black shadow-lg transition-all shrink-0 self-start md:self-auto"
            >
              Browse All AI Services
            </button>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Section: Top Creators (Specialist Showcase Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-500">
              <Award className="w-3.5 h-3.5" />
              Verified Industry Veterans
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Top Specialists & Creators
            </h2>
          </div>
          <button
            onClick={() => setCurrentTab('creators')}
            className="text-xs font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"
          >
            <span>View directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.slice(0, 3).map((creator) => (
            <div
              key={creator.id}
              onClick={() => navigateToCreator(creator)}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 hover:border-indigo-500/50 hover:shadow-card-hover transition-all cursor-pointer flex flex-col justify-between text-left group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/20 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                          {creator.name}
                        </span>
                        {creator.verified && (
                          <CheckCircle className="w-4 h-4 text-indigo-500 fill-indigo-100 dark:fill-indigo-950" />
                        )}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">
                        {creator.title}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {creator.location}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {creator.level}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {creator.bio}
                </p>

                {/* Skills tags */}
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

              {/* Creator Card Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{creator.rating}</span>
                  <span className="text-slate-400 font-normal">({creator.reviewCount})</span>
                </div>

                <div className="text-slate-500 font-medium">
                  {creator.completedOrders}+ orders delivered
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Section: Trending & Services Under $50 (Two Column Split Layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Column A: Services Under $100 / Quick Turnaround Tasks */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Rapid Turnaround
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Fast Micro-Tasks Under $100
                </h3>
              </div>
              <span className="text-xs text-slate-400">Delivered in ≤ 3 days</span>
            </div>

            <div className="space-y-3">
              {under50Services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => navigateToService(service)}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={service.thumbnail}
                      alt={service.title}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600">
                        {service.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span>{service.creator.name}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          {service.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 ml-3">
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      ${service.startingPrice}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {service.deliveryDays}d delivery
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column B: Enterprise Grade Certified Services */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Compliance & SLA Ready
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Enterprise Grade Services
                </h3>
              </div>
              <span className="text-xs text-slate-400">SOC2, HIPAA, Cloud IaC</span>
            </div>

            <div className="space-y-3">
              {enterpriseServices.map((service) => (
                <div
                  key={service.id}
                  onClick={() => navigateToService(service)}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-800 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={service.thumbnail}
                      alt={service.title}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600">
                        {service.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="px-1.5 py-0.2 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded text-[9px] font-bold">
                          VERIFIED SLA
                        </span>
                        <span>{service.creator.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 ml-3">
                    <div className="text-sm font-black text-slate-900 dark:text-white">
                      From ${service.startingPrice}
                    </div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      Escrow Backed
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. Post a Custom Project Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-600/10">
          <div className="max-w-xl text-left">
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-white/20 text-white">
              Need Something Custom?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-3">
              Post a project and receive transparent match scores from top specialists.
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100 mt-2 leading-relaxed">
              Describe your objective, set your budget, and our algorithmic matching system recommends specialists based on past code, delivery speed, and verified reviews.
            </p>
          </div>

          <button
            onClick={() => setIsPostProjectModalOpen(true)}
            className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-black rounded-2xl text-xs sm:text-sm transition-all shadow-md shrink-0 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-indigo-600" />
            <span>Post a Project Now</span>
          </button>
        </div>
      </section>

    </div>
  );
};
