export type NavigationTab = 
  | 'home'
  | 'explore'
  | 'marketplace'
  | 'projects'
  | 'creators'
  | 'messages'
  | 'notifications'
  | 'saved'
  | 'orders'
  | 'client_dashboard'
  | 'freelancer_dashboard'
  | 'admin_panel'
  | 'subscriptions'
  | 'service_detail'
  | 'creator_profile'
  | 'project_workspace';

export type UserRole = 'client' | 'freelancer' | 'admin';

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  coverImage: string;
  bio: string;
  title: string;
  verified: boolean;
  level: 'Rising Talent' | 'Pro Specialist' | 'Top Rated Plus' | 'Enterprise Elite';
  rating: number;
  reviewCount: number;
  completedOrders: number;
  completedProjects: number;
  responseTime: string; // e.g. "< 1 hour"
  location: string;
  timezone: string;
  languages: string[];
  skills: string[];
  followersCount: number;
  followingCount: number;
  isOnline: boolean;
  availability: 'Available Now' | 'In High Demand' | 'Taking Bookings for Next Week';
  hourlyRate?: number;
  joinedDate: string;
}

export interface ServicePackage {
  id: string;
  name: 'Basic' | 'Standard' | 'Premium';
  tagline: string;
  price: number;
  deliveryDays: number;
  revisions: number | 'Unlimited';
  deliverables: string[];
  consultationMins: number;
  sourceFilesIncluded: boolean;
  commercialUse: boolean;
  supportDurationDays: number;
}

export interface ServiceAddon {
  id: string;
  name: string;
  price: number;
  deliveryDaysAdded: number;
  description: string;
}

export interface ServiceMedia {
  type: 'image' | 'video' | 'pdf' | 'demo';
  url: string;
  thumbnailUrl?: string;
  title: string;
  aspectRatio?: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  subcategory: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  videoPreviewUrl?: string;
  creator: Creator;
  rating: number;
  reviewCount: number;
  completedOrders: number;
  startingPrice: number;
  deliveryDays: number;
  responseTime: string;
  tags: string[];
  mediaGallery: ServiceMedia[];
  packages: {
    basic: ServicePackage;
    standard: ServicePackage;
    premium: ServicePackage;
  };
  addons: ServiceAddon[];
  workflowSteps: {
    step: number;
    title: string;
    description: string;
    duration: string;
  }[];
  isSubscriptionAvailable: boolean;
  subscriptionPriceMonthly?: number;
  isEnterpriseReady: boolean;
  isVerifiedProvider: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isNewRising?: boolean;
}

export type ServiceCategory = 
  | 'Design'
  | 'Development'
  | 'AI & Automation'
  | 'Marketing'
  | 'Writing'
  | 'Video'
  | 'Business'
  | 'Data'
  | 'Engineering'
  | 'Cybersecurity'
  | 'Cloud'
  | 'Consulting';

export interface CreatorPost {
  id: string;
  creator: Creator;
  type: 'short_video' | 'portfolio_showcase' | 'before_after' | 'case_study';
  title: string;
  caption: string;
  mediaUrl: string;
  videoDuration?: string;
  beforeMediaUrl?: string;
  afterMediaUrl?: string;
  connectedServiceId: string;
  connectedServiceTitle: string;
  startingPrice: number;
  rating: number;
  likesCount: number;
  isLiked?: boolean;
  savesCount: number;
  isSaved?: boolean;
  commentsCount: number;
  sharesCount: number;
  createdAt: string;
  metrics?: {
    resultMetric: string;
    resultValue: string;
  };
  comments: {
    id: string;
    author: string;
    avatar: string;
    text: string;
    timestamp: string;
  }[];
}

export interface ReviewCriteria {
  communication: number;
  quality: number;
  delivery: number;
  value: number;
}

export interface Review {
  id: string;
  serviceId: string;
  creatorId: string;
  clientName: string;
  clientAvatar: string;
  clientCountry: string;
  verifiedPurchase: boolean;
  packageName: string;
  overallRating: number;
  criteria: ReviewCriteria;
  comment: string;
  createdAt: string;
  projectBudget: number;
  images?: string[];
  sellerResponse?: {
    text: string;
    date: string;
  };
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'funded' | 'in_progress' | 'submitted' | 'approved' | 'revision_requested';
  deliverablesSubmitted?: string[];
}

export interface TaskItem {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  assignee: string;
  assigneeAvatar: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface DeliverableFile {
  id: string;
  title: string;
  version: string;
  fileType: 'code' | 'figma' | 'zip' | 'mp4' | 'pdf' | 'json';
  fileSize: string;
  fileUrl: string;
  submittedAt: string;
  status: 'approved' | 'revision_requested' | 'pending_review';
  feedback?: string;
}

export interface RecommendedProviderMatch {
  provider: Creator;
  matchScore: number;
  matchReasons: {
    skillsMatch: string[];
    pastCategoryProjects: number;
    ratingMatch: number;
    priceAlignment: string;
    responseSpeed: string;
  };
  startingPrice: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ServiceCategory;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  requiredSkills: string[];
  attachments: { name: string; size: string }[];
  preferredExperience: 'Junior' | 'Mid' | 'Senior' | 'Expert';
  locationTimezone: string;
  visibility: 'Public Marketplace' | 'Private Invite Only';
  client: {
    name: string;
    avatar: string;
    company: string;
    rating: number;
    totalSpent: number;
  };
  assignedProvider?: Creator;
  status: 'open' | 'in_progress' | 'under_review' | 'completed' | 'cancelled';
  createdAt: string;
  progressPercentage: number;
  milestones: Milestone[];
  tasks: TaskItem[];
  deliverables: DeliverableFile[];
  recommendedProviders: RecommendedProviderMatch[];
  unreadMessagesCount: number;
}

export interface Order {
  id: string;
  serviceId: string;
  serviceTitle: string;
  serviceThumbnail: string;
  creator: Creator;
  packageName: 'Basic' | 'Standard' | 'Premium';
  totalPrice: number;
  orderedAt: string;
  expectedDeliveryDate: string;
  status: 'new' | 'active' | 'awaiting_customer' | 'revision_requested' | 'completed' | 'cancelled';
  selectedAddons: ServiceAddon[];
  requirementsSubmitted: boolean;
  progressStep: number; // 1 to 8
}

export interface SubscriptionPlan {
  id: string;
  serviceTitle: string;
  creator: Creator;
  planName: string;
  pricePerMonth: number;
  status: 'active' | 'paused' | 'cancelled';
  billingInterval: 'Monthly' | 'Quarterly' | 'Yearly';
  renewalDate: string;
  category: ServiceCategory;
  usage: {
    metric: string;
    used: number;
    limit: number;
  };
  features: string[];
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  isSelf: boolean;
  text: string;
  timestamp: string;
  reactions?: { emoji: string; count: number; users: string[] }[];
  attachment?: {
    type: 'file' | 'image' | 'voice' | 'quote' | 'payment_request' | 'milestone_approval';
    name?: string;
    url?: string;
    size?: string;
    duration?: string;
    amount?: number;
    serviceTitle?: string;
    milestoneTitle?: string;
  };
}

export interface Conversation {
  id: string;
  participant: Creator;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  projectRef?: string;
  messages: ChatMessage[];
}

export interface NotificationItem {
  id: string;
  category: 'Orders' | 'Messages' | 'Projects' | 'Payments' | 'Reviews' | 'Followers' | 'Recommendations' | 'System';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  avatar?: string;
}

export interface MarketplaceFilters {
  category?: ServiceCategory | 'All';
  searchQuery: string;
  priceMin: number;
  priceMax: number;
  minRating: number;
  maxDeliveryDays: number;
  providerLevels: string[];
  onlyVerified: boolean;
  onlySubscription: boolean;
  onlyEnterprise: boolean;
  onlyInstantResponse: boolean;
  location: string;
  sortBy: 'recommended' | 'popular' | 'rating' | 'price_low' | 'price_high' | 'fastest' | 'newest';
  viewMode: 'grid' | 'compact';
}

export interface AdminMetrics {
  gmv: number;
  platformRevenue: number;
  activeUsers: number;
  activeProviders: number;
  totalOrders: number;
  conversionRate: number;
  repeatPurchaseRate: number;
  openDisputesCount: number;
  pendingRefundsCount: number;
  disputes: {
    id: string;
    orderId: string;
    clientName: string;
    providerName: string;
    amount: number;
    reason: string;
    date: string;
    status: 'investigating' | 'awaiting_evidence' | 'resolved';
  }[];
  pendingVerifications: {
    id: string;
    providerName: string;
    category: string;
    portfolioLinks: string[];
    idDocument: string;
    submissionDate: string;
  }[];
  reportedServices: {
    id: string;
    serviceTitle: string;
    creatorName: string;
    flagsCount: number;
    reason: string;
    status: 'pending_review' | 'action_taken';
  }[];
}
