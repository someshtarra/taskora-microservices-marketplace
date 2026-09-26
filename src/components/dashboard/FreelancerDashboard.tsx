import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  DollarSign, 
  ShoppingBag, 
  CheckCircle, 
  Clock, 
  Eye, 
  TrendingUp, 
  Layers, 
  PlusCircle, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  CreditCard, 
  Pause, 
  Play, 
  MoreVertical,
  Check,
  ChevronRight,
  Filter
} from 'lucide-react';

export const FreelancerDashboard: React.FC = () => {
  const { services, orders, addToast, setCurrentTab, navigateToService } = useApp();

  const [activeTab, setActiveTab] = useState<'Overview' | 'Services' | 'Orders' | 'Earnings' | 'Analytics'>('Overview');
  const [orderFilter, setOrderFilter] = useState<'all' | 'active' | 'awaiting_customer' | 'completed'>('all');
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('2450');

  // Realistic mock stats
  const metrics = {
    totalEarnings: '$34,820',
    availableBalance: '$4,150',
    pendingFunds: '$1,850',
    activeOrdersCount: 4,
    completedOrdersCount: 86,
    pendingRequests: 3,
    profileViews: 1420,
    conversionRate: '5.8%',
    responseRate: '99.4%'
  };

  const handleWithdraw = () => {
    setIsWithdrawModalOpen(false);
    addToast('Withdrawal Initiated', `$${withdrawAmount} is being transferred to your linked bank account.`, 'success');
  };

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'all') return true;
    return o.status === orderFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Specialist Studio</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">Elena Rostova</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Specialist Workspace
          </h1>
        </div>

        {/* Quick Top Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsWithdrawModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Withdraw (${metrics.availableBalance})</span>
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 mt-6 pb-2 overflow-x-auto">
        {(['Overview', 'Services', 'Orders', 'Earnings', 'Analytics'] as const).map((tab) => (
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

      {/* Tab 1: Overview */}
      {activeTab === 'Overview' && (
        <div className="space-y-8 mt-6">
          {/* Key KPI Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Earnings</span>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">{metrics.totalEarnings}</div>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
                <ArrowUpRight className="w-3 h-3" /> +14.2% mo/mo
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Orders</span>
              <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 mt-1">{metrics.activeOrdersCount}</div>
              <span className="text-[10px] text-slate-400 block mt-1">3 in progress</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Pending In Escrow</span>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">{metrics.pendingFunds}</div>
              <span className="text-[10px] text-slate-400 block mt-1">Releases on approval</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Profile Views</span>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">{metrics.profileViews}</div>
              <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-1">
                <ArrowUpRight className="w-3 h-3" /> +28% this week
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Conversion Rate</span>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-1">{metrics.conversionRate}</div>
              <span className="text-[10px] text-slate-400 block mt-1">Market avg 3.2%</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Response Rate</span>
              <div className="text-xl font-black text-emerald-600 mt-1">{metrics.responseRate}</div>
              <span className="text-[10px] text-slate-400 block mt-1">&lt; 15 mins avg</span>
            </div>
          </div>

          {/* Active Orders List */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Orders in Pipeline ({orders.length})
              </h2>
              <button
                onClick={() => setActiveTab('Orders')}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                View all orders →
              </button>
            </div>

            <div className="space-y-3">
              {orders.map((o) => (
                <div
                  key={o.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200/60 dark:border-slate-800 gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={o.serviceThumbnail}
                      alt={o.serviceTitle}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">
                        {o.serviceTitle}
                      </div>
                      <div className="text-slate-400 text-[11px] mt-0.5">
                        Order #{o.id} • Tier: {o.packageName} • Due: {o.expectedDeliveryDate}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="font-black text-slate-900 dark:text-white text-sm">
                        ${o.totalPrice}
                      </span>
                      <span className="block text-[10px] text-emerald-600 font-bold uppercase">
                        {o.status.replace('_', ' ')}
                      </span>
                    </div>

                    <button
                      onClick={() => setCurrentTab('project_workspace')}
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                    >
                      Open Workspace
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Services Management */}
      {activeTab === 'Services' && (
        <div className="space-y-6 mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Published Microservices ({services.length})
            </h2>
            <button
              onClick={() => addToast('Create Service', 'Service builder wizard opened.', 'info')}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Microservice</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.slice(0, 4).map((s) => (
              <div
                key={s.id}
                className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={s.thumbnail}
                      alt={s.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400">
                        {s.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                        {s.title}
                      </h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-slate-800 text-center text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] block">Price</span>
                      <span className="font-bold text-slate-900 dark:text-white">${s.startingPrice}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Orders</span>
                      <span className="font-bold text-slate-900 dark:text-white">{s.completedOrders}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">Rating</span>
                      <span className="font-bold text-amber-500">★ {s.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-2">
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Active on Marketplace
                  </span>

                  <button
                    onClick={() => navigateToService(s)}
                    className="text-xs font-bold text-indigo-600 hover:underline"
                  >
                    Manage Service →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Orders Breakdown */}
      {activeTab === 'Orders' && (
        <div className="space-y-6 mt-6">
          <div className="flex items-center gap-2">
            {(['all', 'active', 'awaiting_customer', 'completed'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setOrderFilter(filter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize ${
                  orderFilter === filter
                    ? 'bg-slate-900 dark:bg-slate-700 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {filter.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredOrders.map((o) => (
              <div
                key={o.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img src={o.serviceThumbnail} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{o.serviceTitle}</h4>
                    <p className="text-slate-400 text-[11px]">Ordered on {o.orderedAt} • Expected {o.expectedDeliveryDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-slate-900 dark:text-white">${o.totalPrice}</span>
                  <button
                    onClick={() => setCurrentTab('project_workspace')}
                    className="px-3.5 py-2 bg-indigo-600 text-white rounded-xl font-bold"
                  >
                    View Deliverables
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Earnings & Withdrawals */}
      {activeTab === 'Earnings' && (
        <div className="space-y-6 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-indigo-600 text-white shadow-xl">
              <span className="text-xs uppercase font-bold text-indigo-200 block">Available Balance</span>
              <div className="text-3xl font-black mt-2">{metrics.availableBalance}</div>
              <button
                onClick={() => setIsWithdrawModalOpen(true)}
                className="mt-4 px-4 py-2 bg-white text-indigo-900 font-bold rounded-xl text-xs hover:bg-indigo-50"
              >
                Transfer to Bank Account
              </button>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-xs uppercase font-bold text-slate-400 block">Pending Escrow</span>
              <div className="text-3xl font-black text-slate-900 dark:text-white mt-2">{metrics.pendingFunds}</div>
              <p className="text-[11px] text-slate-400 mt-2">Locked in escrow until clients approve deliverables</p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <span className="text-xs uppercase font-bold text-slate-400 block">Lifetime Earnings</span>
              <div className="text-3xl font-black text-emerald-600 mt-2">{metrics.totalEarnings}</div>
              <p className="text-[11px] text-slate-400 mt-2">Across 86 completed client milestones</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Analytics Charts Simulation */}
      {activeTab === 'Analytics' && (
        <div className="space-y-6 mt-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Revenue & Order Growth Velocity
            </h3>
            
            {/* Visual Bar Chart */}
            <div className="h-48 flex items-end gap-3 pt-8 pb-2 border-b border-slate-100 dark:border-slate-800">
              {[
                { month: 'Apr', rev: 4200, height: '40%' },
                { month: 'May', rev: 5800, height: '55%' },
                { month: 'Jun', rev: 6400, height: '60%' },
                { month: 'Jul', rev: 7900, height: '75%' },
                { month: 'Aug', rev: 9100, height: '88%' },
                { month: 'Sep', rev: 10450, height: '100%' }
              ].map((item) => (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    ${item.rev}
                  </span>
                  <div
                    className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-lg transition-all duration-500 group-hover:from-indigo-500 group-hover:to-purple-400"
                    style={{ height: item.height }}
                  />
                  <span className="text-xs font-semibold text-slate-400">{item.month}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-xs text-slate-500 pt-2">
              <span>Average Order Value: <strong>$382.00</strong></span>
              <span>Repeat Customer Rate: <strong className="text-emerald-600">68.4%</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Withdraw Available Funds
            </h3>
            <p className="text-xs text-slate-500">
              Funds will be sent to your linked Stripe Connect / SEPA account within 1-2 business days.
            </p>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Amount to Transfer ($)
              </label>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                max="4150"
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold"
              />
              <span className="text-[11px] text-slate-400 block mt-1">Available: $4,150.00</span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsWithdrawModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Confirm Transfer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
