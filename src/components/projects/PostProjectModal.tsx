import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  FolderPlus, 
  Sparkles, 
  Upload, 
  Clock, 
  DollarSign, 
  Check, 
  Star, 
  ShieldCheck, 
  ArrowRight,
  Info,
  Layers,
  UserCheck
} from 'lucide-react';
import { ServiceCategory, RecommendedProviderMatch } from '../../types';
import { serviceCategories } from '../../data/mockData';

export const PostProjectModal: React.FC = () => {
  const { 
    isPostProjectModalOpen, 
    setIsPostProjectModalOpen, 
    createProject, 
    creators, 
    navigateToCreator,
    addToast 
  } = useApp();

  if (!isPostProjectModalOpen) return null;

  const [step, setStep] = useState<1 | 2>(1); // Step 1: Project details, Step 2: Transparent matches & publish

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('AI & Automation');
  const [budgetMin, setBudgetMin] = useState(500);
  const [budgetMax, setBudgetMax] = useState(1500);
  const [deadline, setDeadline] = useState('2026-10-25');
  const [skillsInput, setSkillsInput] = useState('');
  const [skillsList, setSkillsList] = useState<string[]>(['Python', 'OpenAI API', 'Vector DB']);
  const [experience, setExperience] = useState<'Junior' | 'Mid' | 'Senior' | 'Expert'>('Senior');
  const [timezone, setTimezone] = useState('US / Europe overlap (+/- 3 hours)');
  const [visibility, setVisibility] = useState<'Public Marketplace' | 'Private Invite Only'>('Public Marketplace');
  const [attachments, setAttachments] = useState<{ name: string; size: string }[]>([
    { name: 'technical_requirements_spec.pdf', size: '1.8 MB' }
  ]);

  const handleAddSkill = () => {
    if (skillsInput.trim() && !skillsList.includes(skillsInput.trim())) {
      setSkillsList([...skillsList, skillsInput.trim()]);
      setSkillsInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkillsList(skillsList.filter((s) => s !== skill));
  };

  // Generate transparent algorithmic provider matches
  const recommendedMatches: RecommendedProviderMatch[] = creators.map((creator) => {
    const overlappingSkills = creator.skills.filter((sk) =>
      skillsList.some((userSk) => userSk.toLowerCase().includes(sk.toLowerCase()) || sk.toLowerCase().includes(userSk.toLowerCase()))
    );

    const isBudgetFit = creator.hourlyRate ? creator.hourlyRate * 10 <= budgetMax : true;
    const baseScore = 70;
    const skillBonus = Math.min(20, overlappingSkills.length * 8);
    const ratingBonus = (creator.rating - 4.5) * 15;
    const computedScore = Math.min(99, Math.round(baseScore + skillBonus + ratingBonus));

    return {
      provider: creator,
      matchScore: computedScore,
      matchReasons: {
        skillsMatch: overlappingSkills.length > 0 ? overlappingSkills : [creator.skills[0]],
        pastCategoryProjects: creator.completedProjects,
        ratingMatch: creator.rating,
        priceAlignment: isBudgetFit ? `Within estimated budget range ($${budgetMin} - $${budgetMax})` : 'Slightly higher rate preference',
        responseSpeed: `Average response ${creator.responseTime}`
      },
      startingPrice: creator.hourlyRate ? creator.hourlyRate * 8 : 199
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const handleSubmit = (chosenProviderId?: string) => {
    if (!title.trim() || !description.trim()) {
      addToast('Missing Details', 'Please provide a project title and description.', 'warning');
      return;
    }

    const assigned = chosenProviderId ? creators.find((c) => c.id === chosenProviderId) : recommendedMatches[0].provider;

    createProject({
      title,
      description,
      category,
      budgetMin,
      budgetMax,
      deadline,
      requiredSkills: skillsList,
      attachments,
      preferredExperience: experience,
      locationTimezone: timezone,
      visibility,
      client: {
        name: 'Alex Mercer (You)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        company: 'Mercer Enterprise',
        rating: 5.0,
        totalSpent: 12400
      },
      assignedProvider: assigned,
      status: 'in_progress',
      milestones: [
        {
          id: `m-init-1`,
          title: 'Milestone 1: Architectural Scoping & Proof of Concept',
          description: 'Establish foundational codebase, interface definitions, and data schema.',
          amount: Math.round(budgetMin * 0.4),
          dueDate: deadline,
          status: 'in_progress'
        },
        {
          id: `m-init-2`,
          title: 'Milestone 2: Final Implementation & Staging Verification',
          description: 'End-to-end testing, documentation, and production handoff.',
          amount: Math.round(budgetMax * 0.6),
          dueDate: deadline,
          status: 'funded'
        }
      ],
      recommendedProviders: recommendedMatches
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in text-left">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <FolderPlus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {step === 1 ? 'Post a Specialized Custom Project' : 'Transparent Provider Match Breakdown'}
              </h2>
              <span className="text-[10px] text-slate-400">
                Step {step} of 2 • Escrow-protected milestone hiring
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsPostProjectModalOpen(false)}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {step === 1 ? (
            /* STEP 1: Project Scope Inputs */
            <div className="space-y-4">
              
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Build an AI-Powered Healthcare Triage Engine with pgvector"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Technical Discipline / Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
                  >
                    {serviceCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Required Experience Level
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
                  >
                    <option value="Junior">Junior Specialist (1-2 yrs)</option>
                    <option value="Mid">Mid-Level Specialist (3-5 yrs)</option>
                    <option value="Senior">Senior Specialist (5-8 yrs)</option>
                    <option value="Expert">Staff / Principal Architect (8+ yrs)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  Project Description & Outcomes *
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail your goals, tech stack constraints, input datasets, and expected final deliverables..."
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Skills Tags Input */}
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  Required Core Skills & Frameworks
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    placeholder="Type skill & press Enter (e.g. FastAPI, Tailwind, Docker)"
                    className="flex-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-xl text-xs font-bold"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skillsList.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                    >
                      {skill}
                      <button onClick={() => handleRemoveSkill(skill)} className="hover:text-indigo-900 font-bold">×</button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Budget & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Min Budget ($)
                  </label>
                  <input
                    type="number"
                    value={budgetMin}
                    onChange={(e) => setBudgetMin(parseInt(e.target.value, 10))}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Max Budget ($)
                  </label>
                  <input
                    type="number"
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(parseInt(e.target.value, 10))}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Target Completion Date
                  </label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
                  />
                </div>
              </div>

            </div>
          ) : (
            /* STEP 2: Transparent Recommended Matches */
            <div className="space-y-6">
              
              {/* Algorithm Explanation Banner */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-indigo-700 dark:text-indigo-300 mb-1">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Transparent Matching Breakdown
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  Taskora does not use opaque black-box scores. Below is the explicit breakdown of why these specialists match your scope based on skill overlap, past category deliverables, rating, and verified budget alignment.
                </p>
              </div>

              {/* Provider Match Cards */}
              <div className="space-y-4">
                {recommendedMatches.slice(0, 3).map((match) => (
                  <div
                    key={match.provider.id}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4 min-w-0 flex-1">
                      <img
                        src={match.provider.avatar}
                        alt={match.provider.name}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/20 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {match.provider.name}
                          </h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                            {match.matchScore}% Match
                          </span>
                        </div>

                        <div className="text-xs text-slate-500 font-medium">
                          {match.provider.title}
                        </div>

                        {/* Transparent Factors Checklist */}
                        <div className="mt-2.5 space-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                            <span><strong>Skills match:</strong> {match.matchReasons.skillsMatch.join(', ')}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                            <span><strong>Category experience:</strong> {match.matchReasons.pastCategoryProjects} verified projects delivered</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                            <span><strong>Budget & SLA:</strong> {match.matchReasons.priceAlignment} • {match.matchReasons.responseSpeed}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                      <button
                        type="button"
                        onClick={() => navigateToCreator(match.provider)}
                        className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600"
                      >
                        View Profile
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSubmit(match.provider.id)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm"
                      >
                        Hire & Fund Milestone
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {step === 2 ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              ← Edit Project Parameters
            </button>
          ) : (
            <div className="text-[11px] text-slate-400">
              Matches update in real-time as you specify tags and budget.
            </div>
          )}

          {step === 1 ? (
            <button
              type="button"
              onClick={() => {
                if (!title.trim() || !description.trim()) {
                  addToast('Please complete fields', 'Title and description are required.', 'warning');
                  return;
                }
                setStep(2);
              }}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md"
            >
              <span>Review Matching Specialists</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 text-white rounded-xl text-xs font-bold"
            >
              Publish to Open Marketplace
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
