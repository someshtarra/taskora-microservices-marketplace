import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Repeat, 
  Check, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { SubscriptionPlan } from '../../types';

export const SubscriptionMarketplace: React.FC = () => {
  const { subscriptions, addToast, setCurrentTab } = useApp();

  const [activeInterval, setActiveInterval] = useState<'Monthly' | 'Yearly'>('Monthly');
  const [selectedSubForCancel, setSelectedSubForCancel] = useState<SubscriptionPlan | null>(null);

  const availableCatalogSubscriptions = [
    {
      id: 'sub-cat-1',
      title: 'Monthly Technical B2B SEO & Keyword Expansion Retainer',
      creatorName: 'Aisha Al-Mansoor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      monthlyPrice: 299,
      yearlyPrice: 2870,
      category: 'Marketing',
      features: [
        'Weekly automated Screaming Frog technical crawls',
        '4 high-converting Bottom-of-Funnel content briefs',
        'Continuous rank tracking for 250 keywords',
        'Bi-weekly 30-min strategy review call'
      ]
    },
    {
      id: 'sub-cat-2',
      title: '24/7 Cloud SRE Infrastructure & Kubernetes Monitoring',
      creatorName: 'Siddharth Rao',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      monthlyPrice: 199,
      yearlyPrice: 1910,
      category: 'Cloud',
      features: [
        'Automated PagerDuty & Prometheus alert integration',
        'Monthly zero-downtime cluster security updates',
        '5 hours of included urgent incident triage per month',
        '< 1 hour guaranteed critical SLA response'
      ]
    },
    {
      id: 'sub-cat-3',
      title: 'High-Retention Short-Form Video Channel Management',
      creatorName: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      monthlyPrice: 499,
      yearlyPrice: 4790,
      category: 'Video',
      features: [
        '15 dynamic short videos edited per month',
        'Custom kinetic captions & sound design',
        'A/B tested viral hook variations',
        'Direct YouTube Shorts & TikTok upload packaging'
      ]
    },
    {
      id: 'sub-cat-4',
      title: 'Continuous Web App & Design System Maintenance',
      creatorName: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      monthlyPrice: 149,
      yearlyPrice: 1430,
      category: 'Development',
      features: [
        'React / Next.js dependency security patching',
        'Design token synchronization and bug fixes',
        'Core Web Vitals monthly audit report',
        'Priority queue turnaround for micro-adjustments'
      ]
    }
  ];

  const handleSubscribe = (subTitle: string, price: number) => {
    addToast('Subscription Activated', `Enrolled in "${subTitle}" at $${price}/${activeInterval.toLowerCase()}.`, 'success');
  };

  const handleConfirmCancel = () => {
    if (selectedSubForCancel) {
      addToast('Retainer Cancelled', `"${selectedSubForCancel.serviceTitle}" will end at billing cycle close.`, 'info');
      setSelectedSubForCancel(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left space-y-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Repeat className="w-3.5 h-3.5" />
          Recurring Microservice Retainers
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Ongoing Specialist Retainers Without Agency Bloat
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
          Keep your infrastructure monitored, SEO expanding, and content pipelines flowing with transparent, cancel-anytime monthly micro-retainers.
        </p>

        {/* Interval Switcher */}
        <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl mt-6">
          <button
            onClick={() => setActiveInterval('Monthly')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeInterval === 'Monthly'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setActiveInterval('Yearly')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeInterval === 'Yearly'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-500'
            }`}
          >
            Annual Billing (Save 20%)
          </button>
        </div>
      </div>

      {/* Retainer Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {availableCatalogSubscriptions.map((catSub) => {
          const price = activeInterval === 'Monthly' ? catSub.monthlyPrice : Math.round(catSub.yearlyPrice / 12);
          return (
            <div
              key={catSub.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-indigo-500/50 hover:shadow-card-hover transition-all"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <img src={catSub.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                    {catSub.creatorName}
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {catSub.category} Retainer
                </span>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                  {catSub.title}
                </h3>

                <div className="mt-4 mb-6">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    ${price}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">/month</span>
                  {activeInterval === 'Yearly' && (
                    <span className="block text-[10px] text-emerald-600 font-bold mt-0.5">
                      Billed annually (${catSub.yearlyPrice}/yr)
                    </span>
                  )}
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                  {catSub.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleSubscribe(catSub.title, price)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  Subscribe to Retainer
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Subscriptions Management */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Your Active Retainers ({subscriptions.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage automatic renewal dates, quota meters, and cancellation terms
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {sub.serviceTitle}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    {sub.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-slate-400 text-[11px]">
                  Specialist: {sub.creator.name} • Plan: {sub.planName} • Renews on {sub.renewalDate}
                </div>

                {/* Quota Progress */}
                <div className="mt-2.5 max-w-sm">
                  <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                    <span>Quota: {sub.usage.metric}</span>
                    <span className="font-bold">{sub.usage.used} / {sub.usage.limit}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 rounded-full"
                      style={{ width: `${(sub.usage.used / sub.usage.limit) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className="text-base font-black text-slate-900 dark:text-white">
                    ${sub.pricePerMonth}
                  </span>
                  <span className="text-[10px] text-slate-400 block">/month</span>
                </div>

                <button
                  onClick={() => setSelectedSubForCancel(sub)}
                  className="px-3 py-1.5 border border-rose-200 text-rose-600 dark:border-rose-900 dark:text-rose-400 hover:bg-rose-50 rounded-xl font-bold text-xs"
                >
                  Cancel Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancellation Confirmation Modal */}
      {selectedSubForCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Cancel Monthly Retainer?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to stop renewal for <strong>{selectedSubForCancel.serviceTitle}</strong>? Your services will remain active until {selectedSubForCancel.renewalDate}.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedSubForCancel(null)}
                className="px-4 py-2 text-xs font-bold text-slate-500"
              >
                Keep Retainer
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
