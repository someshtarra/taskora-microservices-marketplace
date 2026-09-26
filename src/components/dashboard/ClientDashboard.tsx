import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FolderGit2, 
  ShoppingBag, 
  Bookmark, 
  CreditCard, 
  Repeat, 
  MessageSquare, 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  Star, 
  Download, 
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';

export const ClientDashboard: React.FC = () => {
  const { 
    projects, 
    orders, 
    subscriptions, 
    savedServiceIds, 
    services, 
    creators, 
    setCurrentTab, 
    navigateToProject, 
    navigateToService, 
    navigateToCreator,
    setIsPostProjectModalOpen,
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'Projects' | 'Orders' | 'Subscriptions' | 'Invoices' | 'Saved'>('Projects');

  const savedServicesList = services.filter((s) => savedServiceIds.includes(s.id));

  const totalSpent = 12450;
  const activeEscrow = 1850;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Buyer Workspace</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">Alex Mercer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Client Control Center
          </h1>
        </div>

        <button
          onClick={() => setIsPostProjectModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>Post New Project</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Invested</span>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">${totalSpent.toLocaleString()}</div>
          <span className="text-[10px] text-slate-400 block mt-1">Across 14 digital microservices</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Escrow Balance</span>
          <div className="text-xl font-black text-emerald-600 mt-1">${activeEscrow.toLocaleString()}</div>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">Protected in escrow vault</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Projects</span>
          <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1">{projects.length}</div>
          <span className="text-[10px] text-slate-400 block mt-1">All milestones on schedule</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Retainers</span>
          <div className="text-xl font-black text-purple-600 dark:text-purple-400 mt-1">{subscriptions.length}</div>
          <span className="text-[10px] text-slate-400 block mt-1">Monthly recurring support</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 mt-8 pb-2 overflow-x-auto">
        {(['Projects', 'Orders', 'Subscriptions', 'Invoices', 'Saved'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab: Projects with Visual Status Timeline */}
      {activeTab === 'Projects' && (
        <div className="space-y-6 mt-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400">
                    Project #{proj.id} • {proj.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {proj.title}
                  </h3>
                </div>

                <button
                  onClick={() => navigateToProject(proj)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold self-start sm:self-auto"
                >
                  Open Workspace →
                </button>
              </div>

              {/* Visual Project Status Timeline */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>Milestone Stage: <strong>Phase 2 of 3</strong></span>
                  <span>{proj.progressPercentage}% Completed</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${proj.progressPercentage}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                  {proj.milestones.map((m, idx) => (
                    <div key={m.id} className="text-left">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">
                        Milestone {idx + 1}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white truncate block">
                        {m.title}
                      </span>
                      <span className={`text-[10px] font-bold ${
                        m.status === 'approved' ? 'text-emerald-600' : 'text-amber-500'
                      }`}>
                        ${m.amount} ({m.status})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Subscriptions */}
      {activeTab === 'Subscriptions' && (
        <div className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        {sub.status.toUpperCase()}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                        {sub.serviceTitle}
                      </h3>
                      <p className="text-xs text-slate-400">Plan: {sub.planName}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-black text-slate-900 dark:text-white">
                        ${sub.pricePerMonth}
                      </span>
                      <span className="text-[10px] text-slate-400 block">/{sub.billingInterval.toLowerCase()}</span>
                    </div>
                  </div>

                  {/* Usage Quota Meter */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex justify-between text-slate-500 mb-1">
                      <span>{sub.usage.metric}</span>
                      <span className="font-bold">{sub.usage.used} / {sub.usage.limit}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${(sub.usage.used / sub.usage.limit) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-slate-400">Renews on {sub.renewalDate}</span>
                  <button 
                    onClick={() => addToast('Retainer Settings', 'Subscription management drawer opened.', 'info')}
                    className="font-bold text-indigo-600 hover:underline"
                  >
                    Manage Retainer →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Invoices */}
      {activeTab === 'Invoices' && (
        <div className="mt-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Billing History & Tax Invoices</h3>
            <span className="text-xs text-slate-400">3 official receipts</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {[
              { id: 'INV-2026-089', date: 'Sep 24, 2026', desc: 'Custom AI Support Chatbot (Standard)', amount: '$364.00', status: 'Paid' },
              { id: 'INV-2026-064', date: 'Sep 12, 2026', desc: 'High-Converting SaaS Landing Page (Basic)', amount: '$199.00', status: 'Paid' },
              { id: 'INV-2026-021', date: 'Aug 29, 2026', desc: 'Kubernetes Cluster Audit & Remediation', amount: '$499.00', status: 'Paid' }
            ].map((inv) => (
              <div key={inv.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{inv.desc}</div>
                    <div className="text-slate-400 text-[11px]">{inv.id} • {inv.date}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-black text-slate-900 dark:text-white">{inv.amount}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    {inv.status}
                  </span>
                  <button
                    onClick={() => addToast('Invoice Downloaded', `PDF for ${inv.id} saved to disk.`, 'success')}
                    className="p-1.5 text-slate-400 hover:text-indigo-600"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Saved Microservices */}
      {activeTab === 'Saved' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {savedServicesList.map((s) => (
            <div
              key={s.id}
              onClick={() => navigateToService(s)}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-card-hover cursor-pointer"
            >
              <img src={s.thumbnail} alt="" className="w-full aspect-[16/10] rounded-xl object-cover mb-3" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">{s.title}</h4>
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span>Starts at <strong>${s.startingPrice}</strong></span>
                <span className="text-indigo-600 font-bold">View →</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
