import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Compass, FolderGit2, MessageSquare, User } from 'lucide-react';
import { NavigationTab } from '../../types';

export const MobileBottomNav: React.FC = () => {
  const { currentTab, setCurrentTab, activeRole, conversations } = useApp();

  const totalUnreadMessages = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  const tabs: { label: string; tab: NavigationTab; icon: React.ReactNode }[] = [
    { label: 'Home', tab: 'home', icon: <Home className="w-5 h-5" /> },
    { label: 'Explore', tab: 'explore', icon: <Compass className="w-5 h-5" /> },
    { label: 'Projects', tab: 'projects', icon: <FolderGit2 className="w-5 h-5" /> },
    { 
      label: 'Messages', 
      tab: 'messages', 
      icon: (
        <div className="relative">
          <MessageSquare className="w-5 h-5" />
          {totalUnreadMessages > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full" />
          )}
        </div>
      ) 
    },
    { 
      label: 'Workspace', 
      tab: activeRole === 'client' ? 'client_dashboard' : activeRole === 'freelancer' ? 'freelancer_dashboard' : 'admin_panel', 
      icon: <User className="w-5 h-5" /> 
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800/80 px-2 py-1.5 transition-colors">
      <div className="flex items-center justify-around">
        {tabs.map((item) => {
          const isActive = currentTab === item.tab;
          return (
            <button
              key={item.label}
              onClick={() => setCurrentTab(item.tab)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
