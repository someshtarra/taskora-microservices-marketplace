import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreatorPost } from '../../types';
import { 
  Heart, 
  Bookmark, 
  MessageCircle, 
  Share2, 
  Play, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  TrendingUp,
  X,
  Send,
  Eye,
  Sliders
} from 'lucide-react';

export const SocialExploreFeed: React.FC = () => {
  const { 
    creatorPosts, 
    likedPostIds, 
    toggleLikePost, 
    savedPostIds, 
    toggleSavePost, 
    followedCreatorIds, 
    toggleFollowCreator, 
    services, 
    navigateToService, 
    navigateToCreator,
    addToast 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'All' | 'short_video' | 'before_after' | 'case_study' | 'portfolio_showcase'>('All');
  const [activeCommentPost, setActiveCommentPost] = useState<CreatorPost | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [sliderPositions, setSliderPositions] = useState<{ [postId: string]: number }>({ 'post-2': 50 });

  const filteredPosts = activeFilter === 'All' 
    ? creatorPosts 
    : creatorPosts.filter((p) => p.type === activeFilter);

  const handleShare = (post: CreatorPost) => {
    navigator.clipboard?.writeText?.(window.location.href);
    addToast('Link Copied to Clipboard', `Sharable link for "${post.title.substring(0, 30)}..." generated.`, 'success');
  };

  const handleAddComment = (post: CreatorPost) => {
    if (!commentInput.trim()) return;
    post.comments.push({
      id: `c-${Date.now()}`,
      author: 'Alex Mercer (You)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      text: commentInput.trim(),
      timestamp: 'Just now'
    });
    post.commentsCount += 1;
    setCommentInput('');
    addToast('Comment Posted', 'Your reply has been added to the public showcase.', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Feed Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/50 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Specialist Work in the Wild
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Explore Real Results & Case Studies
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
          Discover verified proofs of work, before-and-after transformations, and behind-the-scenes breakdowns directly from elite practitioners.
        </p>

        {/* Content Type Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {[
            { label: 'All Showcase', value: 'All' },
            { label: 'Short-Form Breakdowns', value: 'short_video' },
            { label: 'Before & After', value: 'before_after' },
            { label: 'Case Studies', value: 'case_study' },
            { label: '3D & Portfolio', value: 'portfolio_showcase' }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === tab.value
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry-Style Feed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.map((post) => {
          const isLiked = likedPostIds.includes(post.id);
          const isSaved = savedPostIds.includes(post.id);
          const isFollowing = followedCreatorIds.includes(post.creator.id);
          const connectedService = services.find((s) => s.id === post.connectedServiceId) || services[0];
          const sliderPos = sliderPositions[post.id] ?? 50;

          return (
            <article
              key={post.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all text-left"
            >
              {/* Creator Header Bar */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80">
                <div 
                  onClick={() => navigateToCreator(post.creator)}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <img
                    src={post.creator.avatar}
                    alt={post.creator.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/20 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {post.creator.name}
                      </span>
                      {post.creator.verified && (
                        <CheckCircle className="w-3.5 h-3.5 text-indigo-500 fill-indigo-100 dark:fill-indigo-950" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {post.creator.handle} • {post.createdAt}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFollowCreator(post.creator.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isFollowing
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50 hover:bg-indigo-100'
                    }`}
                  >
                    {isFollowing ? 'Following' : '+ Follow'}
                  </button>
                </div>
              </div>

              {/* Main Media Showcase Area */}
              <div className="relative w-full bg-slate-950 overflow-hidden">
                
                {/* Condition 1: Before / After Slider */}
                {post.type === 'before_after' && post.beforeMediaUrl && post.afterMediaUrl ? (
                  <div className="relative aspect-[16/10] select-none">
                    <img
                      src={post.afterMediaUrl}
                      alt="After Transformation"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div 
                      className="absolute inset-0 overflow-hidden" 
                      style={{ width: `${sliderPos}%` }}
                    >
                      <img
                        src={post.beforeMediaUrl}
                        alt="Before Transformation"
                        className="absolute inset-0 w-full h-full object-cover max-w-none"
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>

                    {/* Draggable Divider Line */}
                    <div 
                      className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] cursor-ew-resize flex items-center justify-center"
                      style={{ left: `${sliderPos}%` }}
                    >
                      <div className="w-7 h-7 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg text-[10px] font-bold">
                        ↔
                      </div>
                    </div>

                    {/* Interactive range slider controller */}
                    <input 
                      type="range" 
                      min="5" 
                      max="95" 
                      value={sliderPos}
                      onChange={(e) => setSliderPositions({ ...sliderPositions, [post.id]: parseInt(e.target.value, 10) })}
                      className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-10"
                    />

                    {/* Floating Badges */}
                    <span className="absolute top-3 left-3 px-2 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold rounded-md">
                      BEFORE
                    </span>
                    <span className="absolute top-3 right-3 px-2 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-md">
                      AFTER REDESIGN
                    </span>
                  </div>
                ) : (
                  /* Condition 2: Image / Video Preview */
                  <div className="relative aspect-[16/10] overflow-hidden group">
                    <img
                      src={post.mediaUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    {post.videoDuration && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold rounded-md">
                        <Play className="w-3 h-3 fill-white" />
                        <span>{post.videoDuration}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Floating Metric Pill */}
                {post.metrics && (
                  <div className="absolute top-3 right-3 px-3 py-1.5 bg-emerald-500/90 text-white rounded-xl text-xs font-black shadow-lg backdrop-blur-md flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{post.metrics.resultMetric}: {post.metrics.resultValue}</span>
                  </div>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      {/* Like */}
                      <button
                        onClick={() => toggleLikePost(post.id)}
                        className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${
                          isLiked ? 'text-rose-500' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                        <span>{post.likesCount.toLocaleString()}</span>
                      </button>

                      {/* Comment */}
                      <button
                        onClick={() => setActiveCommentPost(post)}
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.commentsCount}</span>
                      </button>

                      {/* Share */}
                      <button
                        onClick={() => handleShare(post)}
                        className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>{post.sharesCount}</span>
                      </button>
                    </div>

                    {/* Bookmark Save */}
                    <button
                      onClick={() => toggleSavePost(post.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isSaved ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-indigo-600' : ''}`} />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug mb-1.5">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {post.caption}
                  </p>
                </div>

                {/* Direct Service Connection Card */}
                <div 
                  onClick={() => navigateToService(connectedService)}
                  className="mt-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/40 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/20 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={connectedService.thumbnail}
                      alt={connectedService.title}
                      className="w-11 h-11 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-wider">
                        Connected Microservice
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 transition-colors">
                        {connectedService.title}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                          <Star className="w-3 h-3 fill-amber-400" />
                          {connectedService.rating}
                        </span>
                        <span>•</span>
                        <span>Starts at <strong className="text-slate-900 dark:text-white font-bold">${connectedService.startingPrice}</strong></span>
                      </div>
                    </div>
                  </div>

                  <button className="flex items-center gap-1 px-3 py-2 bg-indigo-600 group-hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm shrink-0 transition-colors">
                    <span>View Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </article>
          );
        })}
      </div>

      {/* Interactive Comments Drawer / Modal */}
      {activeCommentPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Discussion ({activeCommentPost.comments.length})
              </h3>
              <button
                onClick={() => setActiveCommentPost(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
              {activeCommentPost.comments.map((c) => (
                <div key={c.id} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <img
                    src={c.avatar}
                    alt={c.author}
                    className="w-7 h-7 rounded-full object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{c.author}</span>
                      <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <input
                type="text"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddComment(activeCommentPost);
                }}
                placeholder="Ask about implementation or technical specs..."
                className="flex-1 p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                onClick={() => handleAddComment(activeCommentPost)}
                className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
