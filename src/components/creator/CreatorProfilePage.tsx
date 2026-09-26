import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceCard } from '../marketplace/ServiceCard';
import { 
  CheckCircle, 
  Star, 
  MapPin, 
  Clock, 
  MessageSquare, 
  PlusCircle, 
  ShieldCheck, 
  Calendar, 
  ArrowRight,
  ExternalLink,
  Award,
  ChevronRight
} from 'lucide-react';
import { mockReviews, mockCreatorPosts } from '../../data/mockData';

export const CreatorProfilePage: React.FC = () => {
  const { 
    selectedCreator, 
    creators, 
    services, 
    setCurrentTab, 
    followedCreatorIds, 
    toggleFollowCreator,
    setIsPostProjectModalOpen,
    addToast 
  } = useApp();

  const creator = selectedCreator || creators[0];
  const isFollowing = followedCreatorIds.includes(creator.id);

  const [activeTab, setActiveTab] = useState<
    'Services' | 'Portfolio' | 'Reviews' | 'Case Studies' | 'Posts' | 'About' | 'Availability'
  >('Services');

  const creatorServices = services.filter((s) => s.creator.id === creator.id);
  const creatorPostsList = mockCreatorPosts.filter((p) => p.creator.id === creator.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left space-y-8">
      
      {/* 1. Header Profile Banner */}
      <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
        
        {/* Cover Image */}
        <div className="h-44 sm:h-64 w-full bg-slate-950 relative overflow-hidden">
          <img
            src={creator.coverImage}
            alt="Cover"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Profile Info Row */}
        <div className="p-6 sm:p-8 pt-0 relative flex flex-col md:flex-row items-start md:items-end justify-between gap-6 -mt-16 sm:-mt-20">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-white dark:ring-slate-900 shadow-xl"
            />

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {creator.name}
                </h1>
                {creator.verified && (
                  <CheckCircle className="w-5 h-5 text-indigo-500 fill-indigo-100 dark:fill-indigo-950" />
                )}
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {creator.level}
                </span>
              </div>

              <div className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
                {creator.title}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {creator.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {creator.rating} ({creator.reviewCount} reviews)
                </span>
                <span>•</span>
                <span>{creator.completedOrders} orders completed</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => toggleFollowCreator(creator.id)}
              className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isFollowing
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200/50'
              }`}
            >
              {isFollowing ? 'Following' : '+ Follow'}
            </button>

            <button
              onClick={() => setCurrentTab('messages')}
              className="flex-1 md:flex-none px-4 py-2.5 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-800 flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Message</span>
            </button>

            <button
              onClick={() => setIsPostProjectModalOpen(true)}
              className="flex-1 md:flex-none px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20"
            >
              Hire Specialist
            </button>
          </div>

        </div>

        {/* Bio & Skills Tag Bar */}
        <div className="px-6 sm:px-8 pb-6 border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            {creator.bio}
          </p>

          <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
            {creator.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {(['Services', 'Portfolio', 'Reviews', 'Case Studies', 'Posts', 'About', 'Availability'] as const).map((tab) => (
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

      {/* 3. Tab Contents */}
      {activeTab === 'Services' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Available Microservices ({creatorServices.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creatorServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Case Studies' && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Verified Project Case Studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {creatorPostsList.map((post) => (
              <div
                key={post.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3"
              >
                <img src={post.mediaUrl} alt="" className="w-full aspect-video rounded-2xl object-cover mb-3" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{post.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{post.caption}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Reviews' && (
        <div className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Client Testimonials ({mockReviews.length})
          </h2>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {mockReviews.map((rev) => (
              <div key={rev.id} className="py-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{rev.clientName}</span>
                  <span className="text-amber-500 font-bold">★ {rev.overallRating}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Availability' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 max-w-xl">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <span>Currently {creator.availability}</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Elena is taking new scoped microservices and custom consulting projects for the upcoming sprint cycle. Guaranteed response time is {creator.responseTime}.
          </p>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
            <span>Base Hourly Estimate:</span>
            <span className="text-base font-black text-slate-900 dark:text-white">${creator.hourlyRate}/hour</span>
          </div>
        </div>
      )}

    </div>
  );
};
