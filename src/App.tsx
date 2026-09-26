import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { ToastContainer } from './components/common/ToastContainer';
import { OfflineBanner } from './components/common/OfflineBanner';
import { Footer } from './components/common/Footer';
import { HomeDashboard } from './components/home/HomeDashboard';
import { SocialExploreFeed } from './components/social/SocialExploreFeed';
import { MarketplaceView } from './components/marketplace/MarketplaceView';
import { ProjectsMarketplace } from './components/projects/ProjectsMarketplace';
import { CreatorsDirectory } from './components/creator/CreatorsDirectory';
import { ChatSystem } from './components/chat/ChatSystem';
import { NotificationCenter } from './components/notifications/NotificationCenter';
import { SavedView } from './components/saved/SavedView';
import { OrdersView } from './components/orders/OrdersView';
import { ClientDashboard } from './components/dashboard/ClientDashboard';
import { FreelancerDashboard } from './components/dashboard/FreelancerDashboard';
import { AdminPanel } from './components/admin/AdminPanel';
import { SubscriptionMarketplace } from './components/subscriptions/SubscriptionMarketplace';
import { ServiceDetailPage } from './components/service/ServiceDetailPage';
import { CreatorProfilePage } from './components/creator/CreatorProfilePage';
import { ProjectWorkspace } from './components/projects/ProjectWorkspace';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { PostProjectModal } from './components/projects/PostProjectModal';

export const AppContent: React.FC = () => {
  const { currentTab } = useApp();

  const renderActiveScreen = () => {
    switch (currentTab) {
      case 'home':
        return <HomeDashboard />;
      case 'explore':
        return <SocialExploreFeed />;
      case 'marketplace':
        return <MarketplaceView />;
      case 'projects':
        return <ProjectsMarketplace />;
      case 'creators':
        return <CreatorsDirectory />;
      case 'messages':
        return <ChatSystem />;
      case 'notifications':
        return <NotificationCenter />;
      case 'saved':
        return <SavedView />;
      case 'orders':
        return <OrdersView />;
      case 'client_dashboard':
        return <ClientDashboard />;
      case 'freelancer_dashboard':
        return <FreelancerDashboard />;
      case 'admin_panel':
        return <AdminPanel />;
      case 'subscriptions':
        return <SubscriptionMarketplace />;
      case 'service_detail':
        return <ServiceDetailPage />;
      case 'creator_profile':
        return <CreatorProfilePage />;
      case 'project_workspace':
        return <ProjectWorkspace />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      <OfflineBanner />
      <Navbar />

      <main className="flex-1">
        {renderActiveScreen()}
      </main>

      <Footer />
      <MobileBottomNav />

      {/* Global Modals & Notifications */}
      <CheckoutModal />
      <PostProjectModal />
      <ToastContainer />
    </div>
  );
};

export default AppContent;
