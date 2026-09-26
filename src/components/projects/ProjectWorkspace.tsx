import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  MessageSquare, 
  ShieldCheck, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  Calendar, 
  DollarSign, 
  AlertCircle, 
  ChevronRight, 
  Plus, 
  ListTodo, 
  Layers, 
  Activity, 
  FileCode,
  ExternalLink
} from 'lucide-react';
import { Project, DeliverableFile, Milestone } from '../../types';

export const ProjectWorkspace: React.FC = () => {
  const { 
    selectedProject, 
    projects, 
    setSelectedProject, 
    setCurrentTab, 
    approveDeliverable, 
    requestRevision, 
    approveMilestone,
    addToast 
  } = useApp();

  const project = selectedProject || projects[0];

  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<
    'Overview' | 'Tasks' | 'Milestones' | 'Deliverables' | 'Files' | 'Activity'
  >('Overview');

  const [revisionFeedback, setRevisionFeedback] = useState('');
  const [activeRevisionDeliverableId, setActiveRevisionDeliverableId] = useState<string | null>(null);

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold">No active project found</h2>
        <button 
          onClick={() => setCurrentTab('marketplace')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
        >
          Explore Microservices
        </button>
      </div>
    );
  }

  const handleApproveDel = (delId: string) => {
    approveDeliverable(project.id, delId);
  };

  const handleSendRevision = (delId: string) => {
    if (!revisionFeedback.trim()) {
      addToast('Feedback Required', 'Please specify the exact revisions required.', 'warning');
      return;
    }
    requestRevision(project.id, delId, revisionFeedback);
    setActiveRevisionDeliverableId(null);
    setRevisionFeedback('');
  };

  const leftNavItems = [
    { label: 'Overview', icon: <Layers className="w-4 h-4" /> },
    { label: 'Milestones', icon: <DollarSign className="w-4 h-4" /> },
    { label: 'Tasks', icon: <ListTodo className="w-4 h-4" /> },
    { label: 'Deliverables', icon: <FileCode className="w-4 h-4" /> },
    { label: 'Files', icon: <FileText className="w-4 h-4" /> },
    { label: 'Activity', icon: <Activity className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      
      {/* Top Project Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>Project Workspace</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              #{project.id}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {project.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            {project.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentTab('messages')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Open Project Chat</span>
          </button>
        </div>
      </div>

      {/* 3-Column Layout: Left Nav (2/12), Main Center (7/12), Right Summary (3/12) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        
        {/* Left Sidebar (2/12) */}
        <aside className="lg:col-span-2 space-y-1">
          {leftNavItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveWorkspaceTab(item.label as any)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeWorkspaceTab === item.label
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Main Content Center (7/12) */}
        <main className="lg:col-span-7 space-y-6">
          
          {/* Progress Overview Bar */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200">Overall Milestone Progress</span>
              <span className="font-black text-indigo-600 dark:text-indigo-400">{project.progressPercentage}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${project.progressPercentage}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Milestones</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {project.milestones.filter((m) => m.status === 'approved').length} of {project.milestones.length} approved
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Tasks</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {project.tasks.filter((t) => t.status === 'done').length} of {project.tasks.length} closed
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Final Deadline</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {project.deadline}
                </span>
              </div>
            </div>
          </div>

          {/* Conditional Sub-View: Overview & Milestones */}
          {(activeWorkspaceTab === 'Overview' || activeWorkspaceTab === 'Milestones') && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Milestone Escrow Schedule
                </h3>
                <span className="text-[10px] text-slate-400">Total: ${project.budgetMin} - ${project.budgetMax}</span>
              </div>

              <div className="space-y-3">
                {project.milestones.map((m) => (
                  <div
                    key={m.id}
                    className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {m.title}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          m.status === 'approved' 
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : m.status === 'submitted'
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                        }`}>
                          {m.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {m.description}
                      </p>
                      <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Due: {m.dueDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm font-black text-slate-900 dark:text-white">
                        ${m.amount}
                      </span>
                      {m.status === 'submitted' && (
                        <button
                          onClick={() => approveMilestone(project.id, m.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
                        >
                          Release Funds
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conditional Sub-View: Deliverables & Approvals */}
          {(activeWorkspaceTab === 'Overview' || activeWorkspaceTab === 'Deliverables') && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Deliverables Review & Sign-Off
                  </h3>
                  <p className="text-xs text-slate-500">
                    Inspect files and approve to unlock milestone escrow or request revisions
                  </p>
                </div>
              </div>

              {project.deliverables.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-400">
                  No deliverables submitted yet. Specialist is currently working on initial milestones.
                </div>
              ) : (
                <div className="space-y-4">
                  {project.deliverables.map((del) => (
                    <div
                      key={del.id}
                      className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center shrink-0">
                            <FileCode className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                {del.title}
                              </h4>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                {del.version}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {del.fileSize} • Submitted {del.submittedAt}
                            </div>
                          </div>
                        </div>

                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                          del.status === 'approved'
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : del.status === 'revision_requested'
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                            : 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                        }`}>
                          {del.status.replace('_', ' ')}
                        </span>
                      </div>

                      {del.feedback && (
                        <div className="p-2.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-xs">
                          <strong>Revision Notes:</strong> {del.feedback}
                        </div>
                      )}

                      {/* Deliverable Action Buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                        <a
                          href={del.fileUrl}
                          onClick={(e) => {
                            e.preventDefault();
                            addToast('Downloading File', `Starting transfer for ${del.title}...`, 'info');
                          }}
                          className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Archive ({del.fileSize})</span>
                        </a>

                        {del.status === 'pending_review' && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setActiveRevisionDeliverableId(del.id)}
                              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 rounded-xl text-xs font-semibold"
                            >
                              Request Revision
                            </button>

                            <button
                              onClick={() => handleApproveDel(del.id)}
                              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
                            >
                              Approve Deliverable
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Revision Input Box */}
                      {activeRevisionDeliverableId === del.id && (
                        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 mt-2">
                          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                            Specific Modifications Needed:
                          </label>
                          <textarea
                            rows={3}
                            value={revisionFeedback}
                            onChange={(e) => setRevisionFeedback(e.target.value)}
                            placeholder="Detail line numbers, style fixes, or missing edge case handlers..."
                            className="w-full p-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setActiveRevisionDeliverableId(null)}
                              className="px-2.5 py-1 text-xs text-slate-500"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSendRevision(del.id)}
                              className="px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs"
                            >
                              Submit Revision Request
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Conditional Sub-View: Tasks Board */}
          {(activeWorkspaceTab === 'Overview' || activeWorkspaceTab === 'Tasks') && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Sprint Execution Tasks
                </h3>
                <span className="text-[10px] text-slate-400">Kanban Status</span>
              </div>

              <div className="space-y-2">
                {project.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                        task.status === 'done' ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {task.status === 'done' && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <span className={`font-semibold ${task.status === 'done' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                        {task.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        task.priority === 'urgent' ? 'bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400' : 'bg-slate-100 dark:bg-slate-800'
                      }`}>
                        {task.priority}
                      </span>
                      <span>{task.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

        {/* Right Sidebar (3/12): Project Summary, Provider Card & Escrow Info */}
        <aside className="lg:col-span-3 space-y-6">
          
          {/* Provider Card */}
          {project.assignedProvider && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm text-xs">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                Assigned Specialist
              </div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={project.assignedProvider.avatar}
                  alt={project.assignedProvider.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/20"
                />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <span>{project.assignedProvider.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {project.assignedProvider.title}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Rating:</span>
                  <span className="font-bold text-slate-900 dark:text-white">★ {project.assignedProvider.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span>{project.assignedProvider.location}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Response:</span>
                  <span className="text-emerald-600 font-semibold">{project.assignedProvider.responseTime}</span>
                </div>
              </div>
            </div>
          )}

          {/* Project Parameters Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm text-xs space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Contract Terms
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Agreed Budget:</span>
              <span className="font-bold text-slate-900 dark:text-white">${project.budgetMin} - ${project.budgetMax}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Target Date:</span>
              <span className="font-bold text-slate-900 dark:text-white">{project.deadline}</span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-slate-500">Escrow Security:</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Active
              </span>
            </div>

            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Visibility:</span>
              <span className="font-bold text-slate-900 dark:text-white">{project.visibility}</span>
            </div>
          </div>

          {/* Escrow Guarantee */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 text-indigo-900 dark:text-indigo-300 text-xs">
            <div className="font-bold mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              Taskora Escrow Vault
            </div>
            <p className="text-[11px] text-indigo-700 dark:text-indigo-400 leading-relaxed">
              Funds are automatically transferred to the provider upon your deliverable sign-off.
            </p>
          </div>

        </aside>

      </div>

    </div>
  );
};
