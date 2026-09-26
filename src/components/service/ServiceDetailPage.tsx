import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Star, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  Share2, 
  Bookmark, 
  Heart, 
  MessageSquare, 
  FileText, 
  Play, 
  ArrowRight, 
  Check, 
  ChevronRight, 
  Calendar, 
  DollarSign, 
  Zap, 
  Eye, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { mockReviews } from '../../data/mockData';
import { ServicePackage, ServiceAddon } from '../../types';

export const ServiceDetailPage: React.FC = () => {
  const { 
    selectedService, 
    setCurrentTab, 
    navigateToCreator, 
    savedServiceIds, 
    toggleSaveService, 
    followedCreatorIds, 
    toggleFollowCreator, 
    openCheckout,
    addToast
  } = useApp();

  const service = selectedService;
  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold">No service selected</h2>
        <button 
          onClick={() => setCurrentTab('marketplace')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
        >
          Back to Marketplace
        </button>
      </div>
    );
  }

  const [selectedTier, setSelectedTier] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  const isSaved = savedServiceIds.includes(service.id);
  const isFollowing = followedCreatorIds.includes(service.creator.id);

  const currentPkg: ServicePackage = service.packages[selectedTier];

  const toggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const selectedAddonsList = service.addons.filter((a) => selectedAddonIds.includes(a.id));
  const addonsTotal = selectedAddonsList.reduce((sum, a) => sum + a.price, 0);
  const calculatedTotal = currentPkg.price + addonsTotal;

  // Handle direct order
  const handleProceedToCheckout = () => {
    openCheckout(service, selectedTier, selectedAddonsList);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    addToast('Link Copied', 'Service URL copied to clipboard.', 'success');
  };

  // Mock rating breakdown
  const ratingDistribution = [
    { stars: 5, pct: 88, count: 218 },
    { stars: 4, pct: 9, count: 22 },
    { stars: 3, pct: 2, count: 5 },
    { stars: 2, pct: 1, count: 2 },
    { stars: 1, pct: 0, count: 1 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      
      {/* 1. Header & Breadcrumbs */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button onClick={() => setCurrentTab('marketplace')} className="hover:text-indigo-600">
              Marketplace
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <button 
              onClick={() => setCurrentTab('marketplace')} 
              className="hover:text-indigo-600 font-medium"
            >
              {service.category}
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-400 truncate max-w-xs">{service.subcategory}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>

            <button
              onClick={() => toggleSaveService(service.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold transition-colors ${
                isSaved ? 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-950' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {service.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-600 dark:text-slate-400">
          <div 
            onClick={() => navigateToCreator(service.creator)}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80"
          >
            <img
              src={service.creator.avatar}
              alt={service.creator.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="font-bold text-slate-900 dark:text-white">{service.creator.name}</span>
            {service.creator.verified && (
              <CheckCircle className="w-3.5 h-3.5 text-indigo-500 fill-indigo-100 dark:fill-indigo-950" />
            )}
          </div>

          <span>•</span>

          <div className="flex items-center gap-1 text-amber-500 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{service.rating}</span>
            <span className="text-slate-400 font-normal">({service.reviewCount} reviews)</span>
          </div>

          <span>•</span>
          <span>{service.completedOrders.toLocaleString()} orders completed</span>
          <span>•</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">⚡ Replies in {service.responseTime}</span>
        </div>
      </div>

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7/12: Media, Description, Workflow Steps, Reviews */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          
          {/* Media Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/10] w-full rounded-3xl bg-slate-950 overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm">
              {service.mediaGallery[activeMediaIndex]?.type === 'video' ? (
                <video
                  src={service.mediaGallery[activeMediaIndex].url}
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={service.mediaGallery[activeMediaIndex]?.url || service.thumbnail}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              )}

              <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-white text-xs font-semibold">
                {service.mediaGallery[activeMediaIndex]?.title || 'Service Preview'}
              </div>
            </div>

            {/* Thumbnail selector row */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {service.mediaGallery.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeMediaIndex === idx
                      ? 'border-indigo-600 ring-2 ring-indigo-500/20'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={m.url} alt={m.title} className="w-full h-full object-cover" />
                  {m.type === 'video' && (
                    <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                      <Play className="w-3 h-3 fill-white" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Service Description */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800">
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4">
              Microservice Overview
            </h2>
            <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
              {service.description}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Core Competencies & Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 8-Step Service Execution Workflow Tracker */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Transparency Guarantee
                </span>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  Step-by-Step Delivery Workflow
                </h2>
              </div>
              <span className="text-xs text-slate-400">8 milestone checkpoints</span>
            </div>

            <div className="relative pl-6 border-l-2 border-indigo-200 dark:border-indigo-900/60 space-y-6 ml-3">
              {service.workflowSteps.map((step) => (
                <div key={step.step} className="relative group">
                  <div className="absolute -left-[31px] top-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black ring-4 ring-white dark:ring-slate-900">
                    {step.step}
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {step.title}
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seller Information Deep-Dive Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800">
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-6">
              About the Specialist
            </h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div 
                onClick={() => navigateToCreator(service.creator)}
                className="flex items-center gap-4 cursor-pointer"
              >
                <img
                  src={service.creator.avatar}
                  alt={service.creator.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/20"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {service.creator.name}
                    </h3>
                    {service.creator.verified && (
                      <CheckCircle className="w-4 h-4 text-indigo-500 fill-indigo-100 dark:fill-indigo-950" />
                    )}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {service.creator.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {service.creator.location} • {service.creator.timezone}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => toggleFollowCreator(service.creator.id)}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isFollowing
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200/50'
                  }`}
                >
                  {isFollowing ? 'Following' : '+ Follow'}
                </button>

                <button
                  onClick={() => setCurrentTab('messages')}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Message</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-100 dark:border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Rating</span>
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  {service.creator.rating} ({service.creator.reviewCount})
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Completed Orders</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">
                  {service.creator.completedOrders.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Avg Response</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">
                  {service.creator.responseTime}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Followers</span>
                <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">
                  {service.creator.followersCount.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
              {service.creator.bio}
            </p>
          </div>

          {/* Section 14: Reviews & Reputation System */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800">
            <h2 className="text-lg font-black text-slate-900 dark:text-white mb-6">
              Client Feedback & Reputation
            </h2>

            {/* Criteria Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              
              {/* Overall Score & Rating distribution bars */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl font-black text-slate-900 dark:text-white">
                    {service.rating}
                  </div>
                  <div>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Based on {service.reviewCount} verified transactions
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  {ratingDistribution.map((row) => (
                    <div key={row.stars} className="flex items-center gap-2 text-xs">
                      <span className="w-12 text-slate-500 font-medium">{row.stars} stars</span>
                      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-slate-400 text-[10px]">{row.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-criteria: Communication, Quality, Delivery, Value */}
              <div className="space-y-3 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl">
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Performance Breakdown
                </div>
                {[
                  { label: 'Quality of Deliverable', score: 5.0 },
                  { label: 'Communication & Responsiveness', score: 4.9 },
                  { label: 'On-Time Delivery Rate', score: 5.0 },
                  { label: 'Value for Investment', score: 4.8 }
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400">{item.label}</span>
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                      {item.score}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* Individual Reviews List */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-6">
              {mockReviews.map((rev) => (
                <div key={rev.id} className="py-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.clientAvatar}
                        alt={rev.clientName}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {rev.clientName}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <span>{rev.clientCountry}</span>
                          <span>•</span>
                          <span>{rev.createdAt}</span>
                          <span>•</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                            <CheckCircle className="w-2.5 h-2.5" />
                            Verified Purchase ({rev.packageName})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(Math.floor(rev.overallRating))].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {rev.comment}
                  </p>

                  {/* Provider Response */}
                  {rev.sellerResponse && (
                    <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100 dark:border-indigo-900/40 text-xs mt-2">
                      <div className="font-bold text-indigo-700 dark:text-indigo-300 mb-1 flex items-center gap-1.5">
                        <span>Response from {service.creator.name}</span>
                        <span className="text-[10px] font-normal text-slate-400">({rev.sellerResponse.date})</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-xs">
                        {rev.sellerResponse.text}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Right 5/12: Sticky Pricing Package Selector & Addons */}
        <div className="lg:col-span-5 xl:col-span-4 sticky top-24 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
            
            {/* 3-Tier Package Switcher */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-6">
              {(['basic', 'standard', 'premium'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`py-2 px-1 text-xs font-bold capitalize rounded-xl transition-all ${
                    selectedTier === tier
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>

            {/* Current Tier Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {currentPkg.name} Plan
                </span>
                <p className="text-xs text-slate-500 mt-1">
                  {currentPkg.tagline}
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  ${currentPkg.price}
                </div>
                <div className="text-[10px] text-slate-400">One-time payment</div>
              </div>
            </div>

            {/* Turnaround & Revision Specs */}
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 py-3 border-y border-slate-100 dark:border-slate-800 mb-4">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <strong>{currentPkg.deliveryDays} Days Delivery</strong>
              </span>

              <span className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5 text-indigo-500" />
                <strong>{currentPkg.revisions === 'Unlimited' ? 'Unlimited Revisions' : `${currentPkg.revisions} Revisions`}</strong>
              </span>
            </div>

            {/* Included Deliverables Checklist */}
            <div className="space-y-2 mb-6">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                What’s Included:
              </div>
              {currentPkg.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}

              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{currentPkg.consultationMins} mins 1-on-1 specialist consult</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Full commercial license included</span>
              </div>
            </div>

            {/* Optional Add-Ons Selection */}
            {service.addons.length > 0 && (
              <div className="mb-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Recommended Add-ons:
                </div>
                <div className="space-y-2">
                  {service.addons.map((addon) => {
                    const isChecked = selectedAddonIds.includes(addon.id);
                    return (
                      <label
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex items-start justify-between gap-3 p-3 rounded-xl border text-xs cursor-pointer select-none transition-all ${
                          isChecked
                            ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                            isChecked ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300 dark:border-slate-700'
                          }`}>
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">
                              {addon.name}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {addon.description}
                            </div>
                          </div>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white shrink-0">
                          +${addon.price}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Total & Order Action Button */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="text-slate-500 font-medium">Calculated Total</span>
                <span className="text-xl font-black text-slate-900 dark:text-white">
                  ${calculatedTotal}
                </span>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Continue (${calculatedTotal})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 mt-3 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Protected by Taskora Escrow Guarantee</span>
              </div>
            </div>

          </div>

          {/* Custom Quote Request Banner */}
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 text-xs text-center">
            <p className="text-slate-600 dark:text-slate-400">
              Need custom enterprise terms or multi-system integration?
            </p>
            <button
              onClick={() => setCurrentTab('messages')}
              className="mt-2 text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
            >
              Request Custom Quote from {service.creator.name} →
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
