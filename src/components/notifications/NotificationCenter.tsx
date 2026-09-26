import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  ShoppingBag, 
  MessageSquare, 
  FolderGit2, 
  DollarSign, 
  Star, 
  Users, 
  Sparkles, 
  Check, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { NotificationItem } from '../../types';

export const NotificationCenter: React.FC = () => {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead, 
    setCurrentTab, 
    addToast 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Orders',
    'Messages',
    'Projects',
    'Payments',
    'Reviews',
    'Followers',
    'Recommendations',
    'System'
  ];

  const filtered = activeCategory === 'All'
    ? notifications
    : notifications.filter((n) => n.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Orders': return <ShoppingBag className="w-4 h-4 text-emerald-500" />;
      case 'Messages': return <MessageSquare className="w-4 h-4 text-indigo-500" />;
      case 'Projects': return <FolderGit2 className="w-4 h-4 text-purple-500" />;
      case 'Payments': return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case 'Reviews': return <Star className="w-4 h-4 text-amber-500" />;
      case 'Followers': return <Users className="w-4 h-4 text-cyan-500" />;
      case 'Recommendations': return <Sparkles className="w-4 h-4 text-indigo-600" />;
      default: return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  const handleClickItem = (item: NotificationItem) => {
    markNotificationRead(item.id);
    if (item.category === 'Orders') setCurrentTab('orders');
    else if (item.category === 'Messages') setCurrentTab('messages');
    else if (item.category === 'Projects') setCurrentTab('project_workspace');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-left space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Notifications Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time milestone alerts, message pings, and escrow updates
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Categories Filter Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClickItem(item)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
              !item.isRead
                ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900/60 shadow-sm'
                : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm shrink-0">
              {getCategoryIcon(item.category)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {item.title}
                </span>
                <span className="text-[10px] text-slate-400">{item.timestamp}</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {item.message}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {item.category}
                </span>
                {!item.isRead && (
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
