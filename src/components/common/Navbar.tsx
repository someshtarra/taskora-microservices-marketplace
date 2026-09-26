import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UniversalSearch } from './UniversalSearch';
import { 
  Sparkles, 
  Compass, 
  Layers, 
  FolderGit2, 
  Users, 
  MessageSquare, 
  Bell, 
  Bookmark, 
  ShoppingBag, 
  LayoutDashboard, 
  PlusCircle, 
  ShieldCheck, 
  ChevronDown, 
  Sun, 
  Moon, 
  Wifi, 
  WifiOff, 
  Check, 
  CreditCard, 
  FileText, 
  Menu, 
  X,
  Repeat
} from 'lucide-react';
import { NavigationTab, UserRole } from '../../types';
import { serviceCategories } from '../../data/mockData';

export const Navbar: React.FC = () => {
  const { 
    currentTab, 
    setCurrentTab, 
    activeRole, 
    setActiveRole, 
    conversations, 
    notifications, 
    savedServiceIds,
    orders,
    setIsPostProjectModalOpen,
    isOffline,
    setIsOffline,
    addToast
  } = useApp();

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Unread counts
  const totalUnreadMessages = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      addToast('Dark Theme Activated', 'High-contrast obsidian theme enabled.', 'info');
    } else {
      document.documentElement.classList.remove('dark');
      addToast('Light Theme Activated', 'Clean studio canvas enabled.', 'info');
    }
  };

  const navLinks: { label: string; tab: NavigationTab; icon: React.ReactNode }[] = [
    { label: 'Explore', tab: 'explore', icon: <Compass className="w-4 h-4" /> },
    { label: 'Marketplace', tab: 'marketplace', icon: <Layers className="w-4 h-4" /> },
    { label: 'Projects', tab: 'projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { label: 'Specialists', tab: 'creators', icon: <Users className="w-4 h-4" /> },
    { label: 'Subscriptions', tab: 'subscriptions', icon: <Repeat className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-6 shrink-0">
            <button 
              onClick={() => setCurrentTab('home')}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                {/* Original geometric Taskora emblem */}
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5">
                  <path d="M4 7h16M12 7v13M16 11l4 0M16 15l4 0" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
                    Taskora
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
                    PRO
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium tracking-tight">
                  Big results. One task at a time.
                </div>
              </div>
            </button>

            {/* Categories Dropdown Trigger */}
            <div className="relative hidden xl:block">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 py-1.5 px-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              >
                <span>Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 animate-fade-in">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
                    Microservice Fields
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {serviceCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setIsCategoryMenuOpen(false);
                          setCurrentTab('marketplace');
                        }}
                        className="text-left px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center Intelligent Universal Search */}
          <div className="hidden lg:flex flex-1 justify-center max-w-xl mx-2">
            <UniversalSearch />
          </div>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => {
                const isActive = currentTab === item.tab;
                return (
                  <button
                    key={item.tab}
                    onClick={() => setCurrentTab(item.tab)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Post a Project Quick Action */}
            <button
              onClick={() => setIsPostProjectModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl text-xs font-semibold shadow-sm hover:shadow-indigo-500/20 transition-all ml-1"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Project</span>
            </button>

            {/* Saved Items Button */}
            <button
              onClick={() => setCurrentTab('saved')}
              title="Saved Services"
              className={`relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
                currentTab === 'saved' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50' : ''
              }`}
            >
              <Bookmark className="w-4 h-4" />
              {savedServiceIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-indigo-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {savedServiceIds.length}
                </span>
              )}
            </button>

            {/* Orders Button */}
            <button
              onClick={() => setCurrentTab('orders')}
              title="Orders & Deliverables"
              className={`relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
                currentTab === 'orders' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50' : ''
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {orders.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {orders.length}
                </span>
              )}
            </button>

            {/* Messages Button */}
            <button
              onClick={() => setCurrentTab('messages')}
              title="Messages & Chat"
              className={`relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
                currentTab === 'messages' ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50' : ''
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              {totalUnreadMessages > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalUnreadMessages}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                title="Notifications"
                className={`relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors ${
                  isNotificationsOpen ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50' : ''
                }`}
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-950" />
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-fade-in">
                  <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">Notifications</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                        {unreadNotificationsCount} new
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setIsNotificationsOpen(false);
                        setCurrentTab('notifications');
                      }}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      View all
                    </button>
                  </div>
                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {notifications.slice(0, 4).map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setIsNotificationsOpen(false);
                          setCurrentTab('notifications');
                        }}
                        className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
                          !n.isRead
                            ? 'bg-indigo-50/60 dark:bg-indigo-950/30'
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <span className="text-xs font-semibold text-slate-900 dark:text-white">
                            {n.title}
                          </span>
                          <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                          {n.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Role & Profile Dropdown */}
            <div className="relative ml-1">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1 pl-2 bg-slate-100 dark:bg-slate-900 rounded-full hover:ring-2 hover:ring-indigo-500/20 transition-all border border-slate-200/60 dark:border-slate-800"
              >
                <div className="text-left hidden sm:block pr-1">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Alex M.
                  </div>
                  <div className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {activeRole === 'client' ? 'Client' : activeRole === 'freelancer' ? 'Specialist' : 'Admin'}
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="User Avatar"
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
                />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-fade-in">
                  
                  {/* Active Role Switcher */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 mb-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Workspace Mode Switcher
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {(['client', 'freelancer', 'admin'] as UserRole[]).map((role) => (
                        <button
                          key={role}
                          onClick={() => {
                            setActiveRole(role);
                            addToast('Role Switched', `Switched to ${role.toUpperCase()} workspace.`, 'info');
                            if (role === 'client') setCurrentTab('client_dashboard');
                            if (role === 'freelancer') setCurrentTab('freelancer_dashboard');
                            if (role === 'admin') setCurrentTab('admin_panel');
                          }}
                          className={`py-1.5 px-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                            activeRole === role
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700/60'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Links in Profile Menu */}
                  <div className="space-y-0.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        setCurrentTab('client_dashboard');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-400" />
                      <span>Buyer Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        setCurrentTab('freelancer_dashboard');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <Sparkles className="w-4 h-4 text-slate-400" />
                      <span>Specialist Workspace</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        setCurrentTab('admin_panel');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                    >
                      <ShieldCheck className="w-4 h-4 text-indigo-500" />
                      <span>Admin Oversight Panel</span>
                    </button>
                  </div>

                  <div className="my-2 border-t border-slate-100 dark:border-slate-800" />

                  {/* Offline & Dark Mode Toggles */}
                  <div className="flex items-center justify-between px-2 py-1.5 text-xs text-slate-600 dark:text-slate-400">
                    <button
                      onClick={toggleDarkMode}
                      className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white"
                    >
                      {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
                      <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>

                    <button
                      onClick={() => setIsOffline(!isOffline)}
                      className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white"
                    >
                      {isOffline ? <WifiOff className="w-4 h-4 text-rose-500" /> : <Wifi className="w-4 h-4 text-emerald-500" />}
                      <span>{isOffline ? 'Offline' : 'Online'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Row (visible on small screens) */}
        <div className="lg:hidden pb-3 pt-1">
          <UniversalSearch />
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-3 animate-fade-in">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => (
              <button
                key={item.tab}
                onClick={() => {
                  setCurrentTab(item.tab);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold ${
                  currentTab === item.tab
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsPostProjectModalOpen(true);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md"
          >
            <PlusCircle className="w-4 h-4" />
            Post a Project
          </button>
        </div>
      )}
    </header>
  );
};
