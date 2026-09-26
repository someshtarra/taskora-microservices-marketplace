import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Send, 
  Paperclip, 
  Mic, 
  Smile, 
  Search, 
  Check, 
  CheckCheck, 
  FileText, 
  DollarSign, 
  ShieldCheck, 
  Play, 
  Pause, 
  Pin, 
  MoreVertical, 
  Image as ImageIcon,
  Clock,
  Sparkles
} from 'lucide-react';
import { ChatMessage } from '../../types';

export const ChatSystem: React.FC = () => {
  const { 
    conversations, 
    activeConversationId, 
    setActiveConversationId, 
    sendMessage, 
    setCurrentTab, 
    addToast 
  } = useApp();

  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);

  const activeConv = conversations.find((c) => c.id === activeConversationId) || conversations[0];

  const handleSend = () => {
    if (!messageInput.trim()) return;
    sendMessage(messageInput);
    setMessageInput('');
  };

  const handleSendMilestoneQuote = () => {
    sendMessage('I have scoped out the upcoming technical milestone requirements for your approval.', {
      type: 'quote',
      serviceTitle: 'Milestone Scope: Vector Indexing & Benchmark Verification',
      amount: 450
    });
    setShowAttachmentMenu(false);
    addToast('Quote Attached', 'Direct milestone approval card sent to chat.', 'success');
  };

  const handleSendPaymentRequest = () => {
    sendMessage('Payment request submitted for Milestone 2 completion.', {
      type: 'payment_request',
      serviceTitle: 'FastAPI Production Deployment Sign-off',
      amount: 650
    });
    setShowAttachmentMenu(false);
    addToast('Payment Request Sent', 'Escrow release trigger sent to client.', 'info');
  };

  const handleSendDocument = () => {
    sendMessage('Sharing the updated architectural diagrams for your engineering review.', {
      type: 'file',
      name: 'System_Architecture_v2_FINAL.pdf',
      size: '4.2 MB'
    });
    setShowAttachmentMenu(false);
    addToast('Document Attached', 'PDF uploaded to encrypted project storage.', 'info');
  };

  const filteredConversations = conversations.filter((c) =>
    c.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden h-[75vh] min-h-[580px] grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800">
        
        {/* Left Column: Conversations List (4/12) */}
        <div className="md:col-span-4 flex flex-col h-full bg-slate-50/50 dark:bg-slate-950/40">
          
          {/* Search Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Messages
            </h2>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConversationId;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`p-4 flex items-start gap-3 cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-l-4 border-indigo-600'
                      : 'hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={conv.participant.avatar}
                      alt={conv.participant.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {conv.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {conv.participant.name}
                      </h4>
                      <span className="text-[10px] text-slate-400">{conv.lastMessageTime}</span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {conv.lastMessage}
                    </p>

                    {conv.projectRef && (
                      <span className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        Project #{conv.projectRef}
                      </span>
                    )}
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Active Conversation (8/12) */}
        <div className="md:col-span-8 flex flex-col h-full bg-white dark:bg-slate-900">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={activeConv.participant.avatar}
                  alt={activeConv.participant.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                {activeConv.isOnline && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
                )}
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>{activeConv.participant.name}</span>
                  <span className="text-[10px] font-normal text-slate-400">({activeConv.participant.title})</span>
                </h3>
                <span className="text-[10px] text-emerald-600 font-medium">Active now • &lt; 15m response</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentTab('project_workspace')}
                className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 rounded-xl text-xs font-semibold"
              >
                Project Board
              </button>
            </div>
          </div>

          {/* Messages History List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            
            {/* Pinned Message Reminder */}
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
              <Pin className="w-3.5 h-3.5 shrink-0 text-amber-600" />
              <span>
                <strong>Pinned by client:</strong> Target milestone 2 Swagger testing window ends this Friday at 5 PM EST.
              </span>
            </div>

            {activeConv.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.isSelf ? 'justify-end' : 'justify-start'}`}
              >
                {!msg.isSelf && (
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-1"
                  />
                )}

                <div className={`max-w-md space-y-1.5 ${msg.isSelf ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs leading-relaxed inline-block ${
                      msg.isSelf
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Rich Attachment Card if any */}
                    {msg.attachment && (
                      <div className="mt-3 p-3 rounded-xl bg-black/10 dark:bg-black/30 border border-white/10 text-left">
                        {msg.attachment.type === 'quote' && (
                          <div className="space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 block">
                              Milestone Release Request
                            </span>
                            <div className="font-bold">{msg.attachment.serviceTitle}</div>
                            <div className="flex items-center justify-between pt-1">
                              <span className="text-sm font-black">${msg.attachment.amount}</span>
                              <button
                                onClick={() => addToast('Milestone Approved', `$${msg.attachment?.amount} released to provider.`, 'success')}
                                className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg text-xs"
                              >
                                Approve Release
                              </button>
                            </div>
                          </div>
                        )}

                        {msg.attachment.type === 'payment_request' && (
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold text-amber-300">Payment Due</span>
                            <div className="font-bold">{msg.attachment.serviceTitle}</div>
                            <div className="text-sm font-black">${msg.attachment.amount}</div>
                          </div>
                        )}

                        {msg.attachment.type === 'file' && (
                          <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5 text-indigo-300" />
                            <div>
                              <div className="font-bold text-[11px]">{msg.attachment.name}</div>
                              <div className="text-[10px] text-white/70">{msg.attachment.size}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Timestamp & Read Tick */}
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 px-1">
                    <span>{msg.timestamp}</span>
                    {msg.isSelf && <CheckCheck className="w-3 h-3 text-indigo-500" />}
                  </div>

                  {/* Emoji Reactions */}
                  {msg.reactions && (
                    <div className="flex gap-1 mt-1">
                      {msg.reactions.map((r, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          {r.emoji} {r.count}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Voice Message Player UI Demonstration */}
            <div className="flex gap-3 justify-start">
              <img
                src={activeConv.participant.avatar}
                alt=""
                className="w-7 h-7 rounded-full object-cover shrink-0 mt-1"
              />
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs flex items-center gap-3 w-64">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0"
                >
                  {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                </button>
                <div className="flex-1">
                  <div className="h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full bg-indigo-600 ${isPlayingAudio ? 'w-2/3 animate-pulse' : 'w-1/4'}`} />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Voice Note</span>
                    <span>0:42</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Typing Indicator */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400 pl-10">
              <span className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
              </span>
              <span>{activeConv.participant.name} is typing...</span>
            </div>

          </div>

          {/* Chat Message Input Bar */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 relative">
            
            {/* Quick Attachments Popover Menu */}
            {showAttachmentMenu && (
              <div className="absolute bottom-full left-4 mb-2 p-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1 animate-fade-in z-20">
                <button
                  onClick={handleSendDocument}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-left font-medium"
                >
                  <FileText className="w-4 h-4 text-indigo-500" />
                  <span>Attach Technical Spec / Doc</span>
                </button>
                <button
                  onClick={handleSendMilestoneQuote}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-left font-medium"
                >
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>Send Milestone Quote Card</span>
                </button>
                <button
                  onClick={handleSendPaymentRequest}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-left font-medium"
                >
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  <span>Send Payment Release Request</span>
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
                placeholder="Type your message, query or feedback..."
                className="flex-1 p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />

              <button
                onClick={handleSend}
                className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
