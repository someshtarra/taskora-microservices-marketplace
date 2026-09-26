import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  DollarSign, 
  Users, 
  ShoppingBag, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  FileText, 
  Tag, 
  ChevronRight,
  Filter,
  Eye,
  RefreshCw
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { adminMetrics, addToast } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'Metrics' | 'Disputes' | 'Verifications' | 'Moderation' | 'Coupons'>('Metrics');
  const [disputesList, setDisputesList] = useState(adminMetrics.disputes);
  const [verificationsList, setVerificationsList] = useState(adminMetrics.pendingVerifications);
  const [reportedList, setReportedList] = useState(adminMetrics.reportedServices);

  const handleResolveDispute = (dispId: string, action: 'refund' | 'release') => {
    setDisputesList((prev) => prev.filter((d) => d.id !== dispId));
    addToast(
      'Dispute Resolved',
      action === 'refund' ? 'Full refund issued to buyer wallet.' : 'Escrow released to provider.',
      'success'
    );
  };

  const handleApproveVerification = (verId: string, providerName: string) => {
    setVerificationsList((prev) => prev.filter((v) => v.id !== verId));
    addToast('Verification Approved', `${providerName} is now granted the Verified Specialist badge.`, 'success');
  };

  const handleModerateService = (repId: string, action: 'takedown' | 'dismiss') => {
    setReportedList((prev) => prev.filter((r) => r.id !== repId));
    addToast(
      action === 'takedown' ? 'Service Delisted' : 'Report Dismissed',
      action === 'takedown' ? 'Listing removed from public marketplace.' : 'Report cleared after manual audit.',
      action === 'takedown' ? 'warning' : 'info'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Governance & Administration</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">Master Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Platform Operations & Oversight
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200/50 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Core Escrow Settlement Active
          </span>
        </div>
      </div>

      {/* Primary KPI Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total GMV</span>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
            ${adminMetrics.gmv.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">+18.4% growth</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Platform Net Rev</span>
          <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
            ${adminMetrics.platformRevenue.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">5% fee rake</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Users / Providers</span>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
            {adminMetrics.activeUsers.toLocaleString()} / {adminMetrics.activeProviders.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">94% verification rate</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Orders Fulfilled</span>
          <div className="text-xl font-black text-slate-900 dark:text-white mt-1">
            {adminMetrics.totalOrders.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">{adminMetrics.repeatPurchaseRate}% repeat rate</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Open Disputes</span>
          <div className="text-xl font-black text-rose-500 mt-1">
            {disputesList.length}
          </div>
          <span className="text-[10px] text-slate-400 block mt-1">{adminMetrics.pendingRefundsCount} pending refund</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {(['Metrics', 'Disputes', 'Verifications', 'Moderation', 'Coupons'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveAdminTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeAdminTab === tab
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab}
            {tab === 'Disputes' && disputesList.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[9px]">
                {disputesList.length}
              </span>
            )}
            {tab === 'Verifications' && verificationsList.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[9px]">
                {verificationsList.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab: Disputes Queue */}
      {activeAdminTab === 'Disputes' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Buyer / Specialist Escrow Disputes
          </h2>
          {disputesList.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
              No open disputes! All milestone deliveries have been resolved peacefully.
            </div>
          ) : (
            <div className="space-y-3">
              {disputesList.map((d) => (
                <div
                  key={d.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-rose-500 uppercase text-[10px] tracking-wider">
                        {d.id} • Order {d.orderId}
                      </span>
                      <span className="text-slate-400 font-medium">({d.date})</span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {d.clientName} vs. {d.providerName}
                    </h4>
                    <p className="text-slate-500 mt-1 max-w-xl">
                      <strong>Claim:</strong> {d.reason}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-base font-black text-slate-900 dark:text-white">
                      ${d.amount} in Escrow
                    </span>

                    <button
                      onClick={() => handleResolveDispute(d.id, 'refund')}
                      className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950 dark:text-rose-400 rounded-xl font-bold"
                    >
                      Refund Client
                    </button>

                    <button
                      onClick={() => handleResolveDispute(d.id, 'release')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm"
                    >
                      Release to Provider
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Verifications Queue */}
      {activeAdminTab === 'Verifications' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Pending Specialist Identity & Portfolio Approvals
          </h2>
          {verificationsList.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
              Queue clear! All applicant credentials audited.
            </div>
          ) : (
            <div className="space-y-3">
              {verificationsList.map((v) => (
                <div
                  key={v.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {v.providerName}
                    </h4>
                    <span className="text-slate-400 text-[11px]">Domain: {v.category} • Submitted {v.submissionDate}</span>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono">
                        Doc: {v.idDocument}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleApproveVerification(v.id, v.providerName)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm"
                    >
                      Grant Verified Badge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Moderation */}
      {activeAdminTab === 'Moderation' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Reported Microservices Queue
          </h2>
          {reportedList.map((r) => (
            <div
              key={r.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs"
            >
              <div>
                <span className="text-rose-500 font-bold uppercase text-[10px]">
                  {r.flagsCount} Community Flags
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">
                  {r.serviceTitle}
                </h4>
                <p className="text-slate-500 mt-1">Creator: {r.creatorName} • Reason: {r.reason}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleModerateService(r.id, 'dismiss')}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl font-bold"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => handleModerateService(r.id, 'takedown')}
                  className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Takedown Listing
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Metrics */}
      {activeAdminTab === 'Metrics' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Marketplace Liquidity & Conversion Telemetry
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Taskora algorithmic liquidity is currently balancing 42,800 active buyers against 3,150 specialized technical providers. Average milestone payout latency is 14 minutes from sign-off.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Average Deal Size</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">$320.00</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Dispute Ratio</span>
              <span className="font-bold text-emerald-600 text-sm">0.016%</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Escrow In-Flight</span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">$284,500</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Platform Uptime</span>
              <span className="font-bold text-emerald-600 text-sm">99.98%</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Coupons */}
      {activeAdminTab === 'Coupons' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Promotional Codes</h3>
          <div className="space-y-2">
            {[
              { code: 'TASKORA10', discount: '10% off subtotal', redemptions: 482, active: true },
              { code: 'LAUNCH25', discount: '$25 flat discount', redemptions: 194, active: true },
              { code: 'ENTERPRISE100', discount: '$100 off orders > $500', redemptions: 48, active: true }
            ].map((c) => (
              <div key={c.code} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex justify-between items-center text-xs">
                <div>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{c.code}</span>
                  <span className="text-slate-400 text-[11px] ml-2">({c.discount})</span>
                </div>
                <span className="text-slate-500 font-medium">{c.redemptions} used</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
