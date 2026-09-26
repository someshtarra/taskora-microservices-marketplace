import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Service } from '../../types';
import { 
  Star, 
  CheckCircle, 
  Clock, 
  Bookmark, 
  Heart, 
  ArrowRight, 
  Play, 
  Zap, 
  ShieldCheck, 
  Layers
} from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  compact?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, compact = false }) => {
  const { 
    savedServiceIds, 
    toggleSaveService, 
    navigateToService, 
    navigateToCreator,
    openCheckout 
  } = useApp();

  const [isHovered, setIsHovered] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const isSaved = savedServiceIds.includes(service.id);

  if (compact) {
    return (
      <div 
        onClick={() => navigateToService(service)}
        className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 hover:shadow-card-hover transition-all cursor-pointer gap-4"
      >
        <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800">
            <img 
              src={service.thumbnail} 
              alt={service.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {service.videoPreviewUrl && (
              <span className="absolute bottom-1 right-1 p-1 bg-black/60 rounded-md text-white backdrop-blur-sm">
                <Play className="w-2.5 h-2.5 fill-white" />
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {service.category}
              </span>
              {service.isEnterpriseReady && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 flex items-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  Enterprise Ready
                </span>
              )}
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {service.title}
            </h3>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1.5">
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToCreator(service.creator);
                }}
                className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-slate-200"
              >
                <img 
                  src={service.creator.avatar} 
                  alt={service.creator.name} 
                  className="w-4 h-4 rounded-full object-cover"
                />
                <span className="font-medium">{service.creator.name}</span>
                {service.creator.verified && (
                  <CheckCircle className="w-3 h-3 text-indigo-500 fill-indigo-100 dark:fill-indigo-950" />
                )}
              </div>

              <span>•</span>

              <div className="flex items-center gap-1 text-amber-500 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{service.rating}</span>
                <span className="text-slate-400 font-normal">({service.reviewCount})</span>
              </div>

              <span>•</span>
              <span>{service.completedOrders.toLocaleString()}+ orders</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {service.deliveryDays}d delivery
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
          <div className="text-left sm:text-right">
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Starting at</span>
            <span className="text-lg font-black text-slate-900 dark:text-white">
              ${service.startingPrice}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveService(service.id);
              }}
              className={`p-2 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors ${
                isSaved ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-indigo-600' : ''}`} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                openCheckout(service, 'standard');
              }}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPlayingVideo(false);
      }}
      onClick={() => navigateToService(service)}
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden hover:border-indigo-500/40 hover:shadow-card-hover transition-all duration-300 cursor-pointer text-left"
    >
      {/* Thumbnail or Video Preview */}
      <div className="relative aspect-[16/10] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        {isPlayingVideo && service.videoPreviewUrl ? (
          <video 
            src={service.videoPreviewUrl} 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img 
            src={service.thumbnail} 
            alt={service.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        )}

        {/* Video Preview Pill on Hover */}
        {service.videoPreviewUrl && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsPlayingVideo(!isPlayingVideo);
            }}
            className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 bg-slate-950/70 hover:bg-slate-950 text-white text-[10px] font-bold rounded-full backdrop-blur-md transition-all shadow-sm"
          >
            <Play className={`w-2.5 h-2.5 ${isPlayingVideo ? 'text-indigo-400 fill-indigo-400' : 'fill-white'}`} />
            <span>{isPlayingVideo ? 'Stop Preview' : 'Video Preview'}</span>
          </button>
        )}

        {/* Quick Save & Like Floating Actions */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isLiked 
                ? 'bg-rose-500 text-white shadow-sm' 
                : 'bg-slate-900/60 text-white hover:bg-slate-900/80'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveService(service.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isSaved 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'bg-slate-900/60 text-white hover:bg-slate-900/80'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {service.isTrending && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-sm flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 fill-slate-950" />
              Trending
            </span>
          )}
          {service.isSubscriptionAvailable && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tight bg-emerald-500 text-white shadow-sm">
              Subscription
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Creator Header */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div 
              onClick={(e) => {
                e.stopPropagation();
                navigateToCreator(service.creator);
              }}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="relative">
                <img 
                  src={service.creator.avatar} 
                  alt={service.creator.name} 
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                />
                {service.creator.isOnline && (
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-white dark:ring-slate-900" />
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-xs font-bold text-slate-900 dark:text-slate-100">
                  <span className="truncate">{service.creator.name}</span>
                  {service.creator.verified && (
                    <CheckCircle className="w-3 h-3 text-indigo-500 fill-indigo-100 dark:fill-indigo-950 shrink-0" />
                  )}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  {service.creator.level}
                </div>
              </div>
            </div>

            <div className="text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md shrink-0">
              ⚡ {service.responseTime}
            </div>
          </div>

          {/* Service Title */}
          <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {service.title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {service.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Rating & Orders Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{service.rating}</span>
              <span className="text-slate-400 font-normal">({service.reviewCount})</span>
            </div>
            <div className="text-[11px] font-medium text-slate-500">
              {service.completedOrders.toLocaleString()}+ orders
            </div>
          </div>

          {/* Footer: Delivery & Price */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{service.deliveryDays} days</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block leading-none">Starting at</span>
              <span className="text-base font-black text-slate-900 dark:text-white leading-tight">
                ${service.startingPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
