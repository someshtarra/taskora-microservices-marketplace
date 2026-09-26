import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const OrdersView: React.FC = () => {
  const { orders, setCurrentTab, navigateToService } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left space-y-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Purchased Services & Active Orders
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor requirements submission, milestone delivery deadlines, and final release sign-offs.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="p-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs space-y-4">
          <ShoppingBag className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No active orders found</h3>
          <p className="text-slate-500 max-w-sm mx-auto">
            Discover focused microservices starting at $45 and purchase with 100% escrow protection.
          </p>
          <button
            onClick={() => setCurrentTab('marketplace')}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold"
          >
            Browse Marketplace
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={ord.serviceThumbnail}
                    alt={ord.serviceTitle}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Order #{ord.id}
                      </span>
                      <span className="text-slate-400 text-xs">• Ordered {ord.orderedAt}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {ord.serviceTitle}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span>Specialist: <strong>{ord.creator.name}</strong></span>
                      <span>•</span>
                      <span>Tier: <strong>{ord.packageName}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  <div className="text-left sm:text-right">
                    <span className="text-lg font-black text-slate-900 dark:text-white">
                      ${ord.totalPrice}
                    </span>
                    <span className="block text-[10px] text-emerald-600 font-bold uppercase">
                      Escrow Vaulted
                    </span>
                  </div>

                  <button
                    onClick={() => setCurrentTab('project_workspace')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span>Track Deliverables</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 8-Step Interactive Progress Bar */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>Delivery Stage (Step {ord.progressStep} of 8)</span>
                  <span className="text-emerald-600 font-bold">Estimated Delivery: {ord.expectedDeliveryDate}</span>
                </div>

                <div className="grid grid-cols-8 gap-1.5">
                  {[
                    'Purchase',
                    'Scope',
                    'Working',
                    'Draft',
                    'Revision',
                    'Final',
                    'Approval',
                    'Complete'
                  ].map((stepLabel, idx) => {
                    const stepNum = idx + 1;
                    const isDone = ord.progressStep >= stepNum;
                    const isCurrent = ord.progressStep === stepNum;
                    return (
                      <div key={stepLabel} className="text-center">
                        <div
                          className={`h-2 rounded-full mb-1 transition-all ${
                            isDone ? 'bg-indigo-600' : 'bg-slate-100 dark:bg-slate-800'
                          } ${isCurrent ? 'ring-2 ring-indigo-500/40' : ''}`}
                        />
                        <span className={`text-[10px] hidden sm:block truncate ${
                          isDone ? 'font-bold text-slate-800 dark:text-slate-200' : 'text-slate-400'
                        }`}>
                          {stepLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
