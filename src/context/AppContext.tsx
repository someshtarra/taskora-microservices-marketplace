import React, { createContext, useContext, useState } from 'react';
import {
  NavigationTab,
  UserRole,
  Service,
  Creator,
  Project,
  Order,
  Conversation,
  NotificationItem,
  MarketplaceFilters,
  ServiceAddon,
  CreatorPost,
  SubscriptionPlan
} from '../types';
import {
  mockServices,
  mockCreators,
  mockProjects,
  mockOrders,
  mockSubscriptions,
  mockConversations,
  mockNotifications,
  mockCreatorPosts,
  mockAdminMetrics
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface CheckoutParams {
  service: Service;
  packageTier: 'basic' | 'standard' | 'premium';
  addons?: ServiceAddon[];
}

interface AppContextType {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  
  // Selected items for detail views
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;
  selectedCreator: Creator | null;
  setSelectedCreator: (creator: Creator | null) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  
  // Data lists
  services: Service[];
  creators: Creator[];
  projects: Project[];
  orders: Order[];
  subscriptions: SubscriptionPlan[];
  creatorPosts: CreatorPost[];
  conversations: Conversation[];
  notifications: NotificationItem[];
  adminMetrics: typeof mockAdminMetrics;
  
  // Social & Saved State
  savedServiceIds: string[];
  toggleSaveService: (serviceId: string) => void;
  followedCreatorIds: string[];
  toggleFollowCreator: (creatorId: string) => void;
  likedPostIds: string[];
  toggleLikePost: (postId: string) => void;
  savedPostIds: string[];
  toggleSavePost: (postId: string) => void;
  
  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: MarketplaceFilters;
  setFilters: React.Dispatch<React.SetStateAction<MarketplaceFilters>>;
  resetFilters: () => void;
  
  // Checkout & Ordering
  isCheckoutOpen: boolean;
  checkoutItem: CheckoutParams | null;
  openCheckout: (service: Service, packageTier: 'basic' | 'standard' | 'premium', addons?: ServiceAddon[]) => void;
  closeCheckout: () => void;
  placeOrder: (order: Omit<Order, 'id' | 'orderedAt'>) => void;
  
  // Project Workspace Actions
  isPostProjectModalOpen: boolean;
  setIsPostProjectModalOpen: (open: boolean) => void;
  createProject: (newProject: Omit<Project, 'id' | 'createdAt' | 'progressPercentage' | 'tasks' | 'deliverables' | 'unreadMessagesCount'>) => void;
  approveDeliverable: (projectId: string, deliverableId: string) => void;
  requestRevision: (projectId: string, deliverableId: string, feedback: string) => void;
  approveMilestone: (projectId: string, milestoneId: string) => void;
  
  // Messaging
  activeConversationId: string;
  setActiveConversationId: (id: string) => void;
  sendMessage: (text: string, attachment?: any) => void;
  
  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Offline Simulation
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;

  // Navigation helpers
  navigateToService: (service: Service) => void;
  navigateToCreator: (creator: Creator) => void;
  navigateToProject: (project: Project) => void;
}

const defaultFilters: MarketplaceFilters = {
  category: 'All',
  searchQuery: '',
  priceMin: 0,
  priceMax: 1500,
  minRating: 0,
  maxDeliveryDays: 14,
  providerLevels: [],
  onlyVerified: false,
  onlySubscription: false,
  onlyEnterprise: false,
  onlyInstantResponse: false,
  location: 'Anywhere',
  sortBy: 'recommended',
  viewMode: 'grid'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [activeRole, setActiveRole] = useState<UserRole>('client');
  
  const [selectedService, setSelectedService] = useState<Service | null>(mockServices[0]);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(mockCreators[0]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(mockProjects[0]);
  
  const [services] = useState<Service[]>(mockServices);
  const [creators] = useState<Creator[]>(mockCreators);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [subscriptions] = useState<SubscriptionPlan[]>(mockSubscriptions);
  const [creatorPosts, setCreatorPosts] = useState<CreatorPost[]>(mockCreatorPosts);
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [adminMetrics] = useState(mockAdminMetrics);
  
  const [savedServiceIds, setSavedServiceIds] = useState<string[]>(['srv-1', 'srv-2']);
  const [followedCreatorIds, setFollowedCreatorIds] = useState<string[]>(['c1', 'c2']);
  const [likedPostIds, setLikedPostIds] = useState<string[]>(['post-2']);
  const [savedPostIds, setSavedPostIds] = useState<string[]>(['post-2']);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<MarketplaceFilters>(defaultFilters);
  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<CheckoutParams | null>(null);
  
  const [isPostProjectModalOpen, setIsPostProjectModalOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string>('conv-1');
  
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isOffline, setIsOffline] = useState(false);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleSaveService = (serviceId: string) => {
    setSavedServiceIds((prev) => {
      const exists = prev.includes(serviceId);
      if (exists) {
        addToast('Removed from Saved', 'Service was removed from your saved list.', 'info');
        return prev.filter((id) => id !== serviceId);
      } else {
        addToast('Saved to Collection', 'Service saved to your private collection.', 'success');
        return [...prev, serviceId];
      }
    });
  };

  const toggleFollowCreator = (creatorId: string) => {
    setFollowedCreatorIds((prev) => {
      const exists = prev.includes(creatorId);
      if (exists) {
        addToast('Unfollowed', 'You unfollowed this creator.', 'info');
        return prev.filter((id) => id !== creatorId);
      } else {
        addToast('Following Creator', 'You will see new posts and microservices in your feed.', 'success');
        return [...prev, creatorId];
      }
    });
  };

  const toggleLikePost = (postId: string) => {
    setLikedPostIds((prev) => {
      const exists = prev.includes(postId);
      const next = exists ? prev.filter((id) => id !== postId) : [...prev, postId];
      setCreatorPosts((posts) =>
        posts.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              likesCount: exists ? p.likesCount - 1 : p.likesCount + 1,
              isLiked: !exists
            };
          }
          return p;
        })
      );
      return next;
    });
  };

  const toggleSavePost = (postId: string) => {
    setSavedPostIds((prev) => {
      const exists = prev.includes(postId);
      const next = exists ? prev.filter((id) => id !== postId) : [...prev, postId];
      setCreatorPosts((posts) =>
        posts.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              savesCount: exists ? p.savesCount - 1 : p.savesCount + 1,
              isSaved: !exists
            };
          }
          return p;
        })
      );
      if (!exists) {
        addToast('Post Saved', 'Saved to your inspiration board.', 'success');
      }
      return next;
    });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setSearchQuery('');
  };

  const openCheckout = (service: Service, packageTier: 'basic' | 'standard' | 'premium', addons?: ServiceAddon[]) => {
    setCheckoutItem({ service, packageTier, addons: addons || [] });
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
    setCheckoutItem(null);
  };

  const placeOrder = (orderData: Omit<Order, 'id' | 'orderedAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      orderedAt: new Date().toISOString().split('T')[0]
    };
    setOrders((prev) => [newOrder, ...prev]);
    closeCheckout();
    addToast('Order Placed Successfully!', `Your funds are held securely in Taskora Escrow.`, 'success');
    setCurrentTab('orders');
  };

  const createProject = (newProjectData: Omit<Project, 'id' | 'createdAt' | 'progressPercentage' | 'tasks' | 'deliverables' | 'unreadMessagesCount'>) => {
    const newProj: Project = {
      ...newProjectData,
      id: `proj-${Math.floor(200 + Math.random() * 800)}`,
      createdAt: new Date().toISOString().split('T')[0],
      progressPercentage: 10,
      tasks: [
        {
          id: 'task-init',
          title: 'Project kickoff & initial scope alignment',
          status: 'todo',
          assignee: 'Project Lead',
          assigneeAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          dueDate: '3 days',
          priority: 'high'
        }
      ],
      deliverables: [],
      unreadMessagesCount: 0
    };
    setProjects((prev) => [newProj, ...prev]);
    setSelectedProject(newProj);
    setIsPostProjectModalOpen(false);
    addToast('Project Published!', 'Matching specialists are reviewing your requirements.', 'success');
    setCurrentTab('project_workspace');
  };

  const approveDeliverable = (projectId: string, deliverableId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        return {
          ...proj,
          deliverables: proj.deliverables.map((del) =>
            del.id === deliverableId ? { ...del, status: 'approved' as const } : del
          ),
          progressPercentage: Math.min(100, proj.progressPercentage + 20)
        };
      })
    );
    addToast('Deliverable Approved!', 'Milestone funds released to provider.', 'success');
  };

  const requestRevision = (projectId: string, deliverableId: string, feedback: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        return {
          ...proj,
          deliverables: proj.deliverables.map((del) =>
            del.id === deliverableId
              ? { ...del, status: 'revision_requested' as const, feedback }
              : del
          )
        };
      })
    );
    addToast('Revision Requested', 'Feedback delivered to provider workspace.', 'warning');
  };

  const approveMilestone = (projectId: string, milestoneId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        return {
          ...proj,
          milestones: proj.milestones.map((m) =>
            m.id === milestoneId ? { ...m, status: 'approved' as const } : m
          ),
          progressPercentage: Math.min(100, proj.progressPercentage + 25)
        };
      })
    );
    addToast('Milestone Approved', 'Funds released to provider balance.', 'success');
  };

  const sendMessage = (text: string, attachment?: any) => {
    if (!text.trim() && !attachment) return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      conversationId: activeConversationId,
      senderId: 'user-self',
      senderName: 'Alex Mercer (You)',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      isSelf: true,
      text,
      timestamp: 'Just now',
      attachment
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConversationId) {
          return {
            ...c,
            lastMessage: text || (attachment ? `Sent an attachment: ${attachment.type}` : ''),
            lastMessageTime: 'Just now',
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    addToast('Notifications Cleared', 'All notifications marked as read.', 'info');
  };

  const navigateToService = (service: Service) => {
    setSelectedService(service);
    setCurrentTab('service_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCreator = (creator: Creator) => {
    setSelectedCreator(creator);
    setCurrentTab('creator_profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentTab('project_workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        activeRole,
        setActiveRole,
        selectedService,
        setSelectedService,
        selectedCreator,
        setSelectedCreator,
        selectedProject,
        setSelectedProject,
        services,
        creators,
        projects,
        orders,
        subscriptions,
        creatorPosts,
        conversations,
        notifications,
        adminMetrics,
        savedServiceIds,
        toggleSaveService,
        followedCreatorIds,
        toggleFollowCreator,
        likedPostIds,
        toggleLikePost,
        savedPostIds,
        toggleSavePost,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        resetFilters,
        isCheckoutOpen,
        checkoutItem,
        openCheckout,
        closeCheckout,
        placeOrder,
        isPostProjectModalOpen,
        setIsPostProjectModalOpen,
        createProject,
        approveDeliverable,
        requestRevision,
        approveMilestone,
        activeConversationId,
        setActiveConversationId,
        sendMessage,
        markNotificationRead,
        markAllNotificationsRead,
        toasts,
        addToast,
        removeToast,
        isOffline,
        setIsOffline,
        navigateToService,
        navigateToCreator,
        navigateToProject
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
