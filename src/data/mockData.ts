import { Creator, Service, CreatorPost, Project, SubscriptionPlan, Order, Conversation, NotificationItem, AdminMetrics, Review } from '../types';

export const mockCreators: Creator[] = [
  {
    id: 'c1',
    name: 'Elena Rostova',
    handle: '@elena_ai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    bio: 'Senior AI Engineer & LLM Architecture specialist. Ex-Palantir. Built 40+ production AI agents, RAG pipelines, and conversational agents for YC startups.',
    title: 'Lead Autonomous AI & Agent Systems Architect',
    verified: true,
    level: 'Top Rated Plus',
    rating: 4.98,
    reviewCount: 342,
    completedOrders: 512,
    completedProjects: 86,
    responseTime: '< 15 mins',
    location: 'Zurich, Switzerland',
    timezone: 'CET (UTC+1)',
    languages: ['English (Native)', 'German (Fluent)', 'Russian (Fluent)'],
    skills: ['LangChain', 'OpenAI API', 'Llama 3', 'Python', 'Vector DBs', 'Shopify Bot Integration', 'FastAPI'],
    followersCount: 14200,
    followingCount: 380,
    isOnline: true,
    availability: 'Available Now',
    hourlyRate: 145,
    joinedDate: 'March 2023'
  },
  {
    id: 'c2',
    name: 'Marcus Vance',
    handle: '@vance_design',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    bio: 'Product Designer & Design Systems Lead. Specializing in high-conversion SaaS web apps, fintech platforms, and complex responsive design.',
    title: 'Principal Product & Design Systems Designer',
    verified: true,
    level: 'Enterprise Elite',
    rating: 4.96,
    reviewCount: 429,
    completedOrders: 820,
    completedProjects: 115,
    responseTime: '< 30 mins',
    location: 'Austin, TX, USA',
    timezone: 'CST (UTC-6)',
    languages: ['English (Native)', 'Spanish (Conversational)'],
    skills: ['Figma', 'Design Systems', 'Micro-interactions', 'SaaS UX', 'Design Audits', 'Tailwind CSS'],
    followersCount: 28400,
    followingCount: 520,
    isOnline: true,
    availability: 'Available Now',
    hourlyRate: 160,
    joinedDate: 'January 2022'
  },
  {
    id: 'c3',
    name: 'Siddharth Rao',
    handle: '@sid_devops',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    bio: 'Certified Kubernetes & Cloud Security Architect. 9+ years managing zero-downtime microservices on AWS/GCP, Docker, Terraform & CI/CD pipelines.',
    title: 'Cloud Infrastructure & Kubernetes Security Specialist',
    verified: true,
    level: 'Top Rated Plus',
    rating: 4.95,
    reviewCount: 288,
    completedOrders: 430,
    completedProjects: 64,
    responseTime: '< 45 mins',
    location: 'Bengaluru, India',
    timezone: 'IST (UTC+5:30)',
    languages: ['English (Fluent)', 'Hindi (Native)'],
    skills: ['Kubernetes', 'AWS', 'Terraform', 'Docker', 'CI/CD Pipelines', 'Prometheus', 'Cost Optimization'],
    followersCount: 11800,
    followingCount: 290,
    isOnline: false,
    availability: 'Taking Bookings for Next Week',
    hourlyRate: 130,
    joinedDate: 'July 2022'
  },
  {
    id: 'c4',
    name: 'Aisha Al-Mansoor',
    handle: '@aisha_growth',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    bio: 'Data-driven B2B SaaS Growth Marketer & Technical SEO Strategist. Generated over $18M in pipeline revenue across 60+ clients.',
    title: 'B2B Growth & Technical SEO Strategist',
    verified: true,
    level: 'Pro Specialist',
    rating: 4.92,
    reviewCount: 195,
    completedOrders: 310,
    completedProjects: 48,
    responseTime: '< 1 hour',
    location: 'Dubai, UAE',
    timezone: 'GST (UTC+4)',
    languages: ['English (Fluent)', 'Arabic (Native)'],
    skills: ['Technical SEO', 'Programmatic SEO', 'Google Analytics 4', 'Ahrefs', 'Conversion Rate Optimization', 'B2B Funnels'],
    followersCount: 9600,
    followingCount: 195,
    isOnline: true,
    availability: 'Available Now',
    hourlyRate: 110,
    joinedDate: 'October 2023'
  },
  {
    id: 'c5',
    name: 'Kaito Tanaka',
    handle: '@kaito_3d',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    bio: '3D Motion Designer & WebGL Creative Technologist. Creating mesmerizing 3D assets, Spline interactive models, and product launch trailers.',
    title: '3D Motion Designer & WebGL Visual Specialist',
    verified: true,
    level: 'Rising Talent',
    rating: 4.89,
    reviewCount: 124,
    completedOrders: 180,
    completedProjects: 32,
    responseTime: '< 2 hours',
    location: 'Tokyo, Japan',
    timezone: 'JST (UTC+9)',
    languages: ['Japanese (Native)', 'English (Conversational)'],
    skills: ['Blender', 'Spline 3D', 'Three.js', 'Cinema 4D', 'After Effects', 'Product Renders'],
    followersCount: 18900,
    followingCount: 410,
    isOnline: true,
    availability: 'In High Demand',
    hourlyRate: 95,
    joinedDate: 'February 2024'
  }
];

export const mockServices: Service[] = [
  {
    id: 'srv-1',
    title: 'Custom AI Customer Support Chatbot for Shopify & SaaS with Vector Search',
    slug: 'custom-ai-customer-support-chatbot',
    category: 'AI & Automation',
    subcategory: 'Conversational AI & Agents',
    description: `Deploy a production-grade AI support chatbot connected directly to your product catalog, orders, and knowledge base. Trained on your proprietary docs, FAQs, and ticket history. Includes smart escalation to human operators, zero hallucination guardrails, and full Shopify / Stripe / Zendesk webhook integrations.`,
    shortDescription: 'Trained on your docs & product database with automated refunds, order lookup, and Zendesk sync.',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    creator: mockCreators[0],
    rating: 4.98,
    reviewCount: 248,
    completedOrders: 1200,
    startingPrice: 149,
    deliveryDays: 3,
    responseTime: '< 15 mins',
    tags: ['AI Chatbot', 'Shopify', 'OpenAI', 'Zendesk', 'RAG Pipeline', 'Customer Support', 'Automation'],
    isFeatured: true,
    isTrending: true,
    isEnterpriseReady: true,
    isVerifiedProvider: true,
    isSubscriptionAvailable: true,
    subscriptionPriceMonthly: 199,
    mediaGallery: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        title: 'Architecture & Agent Pipeline Flow'
      },
      {
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        title: 'Live Chatbot Demo & Guardrails Test'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        title: 'Analytics & Resolution Dashboard'
      }
    ],
    packages: {
      basic: {
        id: 'pkg-1-basic',
        name: 'Basic',
        tagline: 'Ideal for small stores wanting 24/7 FAQ answers & lead capture',
        price: 149,
        deliveryDays: 3,
        revisions: 2,
        deliverables: [
          'Up to 50 FAQ / Doc training embeddings',
          'Web widget embedding code',
          'Lead capture & email notifications',
          'Basic human fallback form'
        ],
        consultationMins: 30,
        sourceFilesIncluded: false,
        commercialUse: true,
        supportDurationDays: 14
      },
      standard: {
        id: 'pkg-1-std',
        name: 'Standard',
        tagline: 'Our most popular tier: full Shopify order lookup + Zendesk sync',
        price: 299,
        deliveryDays: 5,
        revisions: 5,
        deliverables: [
          'Shopify / WooCommerce live order tracking API',
          'Zendesk / Gorgias ticket escalation',
          'Vector database hosting setup',
          'Zero-hallucination guardrail rules',
          'Custom brand styling & voice tuning',
          'Multi-language auto detection'
        ],
        consultationMins: 60,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 30
      },
      premium: {
        id: 'pkg-1-prem',
        name: 'Premium',
        tagline: 'Enterprise multi-agent system with automated actions & custom CRM sync',
        price: 599,
        deliveryDays: 8,
        revisions: 'Unlimited',
        deliverables: [
          'Multi-agent workflow (Refunds, Returns, Inventory queries)',
          'Custom CRM webhook bi-directional sync',
          'Self-hosted LLM fallback or private Azure OpenAI setup',
          'Complete Docker & cloud deployment scripts',
          'Executive analytics dashboard integration',
          'Priority SLA support'
        ],
        consultationMins: 120,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 90
      }
    },
    addons: [
      {
        id: 'add-1',
        name: 'Express 24-Hour Deployment',
        price: 65,
        deliveryDaysAdded: -2,
        description: 'Priority queue bump and delivery within 24 hours.'
      },
      {
        id: 'add-2',
        name: 'Custom Voice Input / TTS Synthesis',
        price: 90,
        deliveryDaysAdded: 1,
        description: 'Voice note support using Whisper + ElevenLabs audio responses.'
      },
      {
        id: 'add-3',
        name: 'Extended 90-Day VIP Maintenance',
        price: 120,
        deliveryDaysAdded: 0,
        description: 'Monthly model retraining, vector cache optimization, and bug fixes.'
      }
    ],
    workflowSteps: [
      { step: 1, title: 'Purchase & Scope', description: 'Select package, confirm deliverables, and fund escrow.', duration: 'Immediate' },
      { step: 2, title: 'Submit Requirements', description: 'Upload your knowledge docs, brand voice guidelines, and API keys.', duration: 'Day 1' },
      { step: 3, title: 'Provider Starts Work', description: 'Elena builds vector indexing, prompt chains, and integration tests.', duration: 'Day 1-2' },
      { step: 4, title: 'Draft Demo Submitted', description: 'Interactive staging environment link delivered for your live sandbox testing.', duration: 'Day 3' },
      { step: 5, title: 'Revision & Tuning', description: 'Refine phrasing, tweak guardrails, and adjust conversation branching.', duration: 'Day 4' },
      { step: 6, title: 'Final Production Delivery', description: 'Full code repository transferred, embed script installed, and docs delivered.', duration: 'Day 5' },
      { step: 7, title: 'Client Approval', description: 'You test the production bot and approve milestone release.', duration: 'Day 6' },
      { step: 8, title: 'Review & Ongoing Care', description: 'Leave feedback and activate optional recurring maintenance subscription.', duration: 'Day 7' }
    ]
  },
  {
    id: 'srv-2',
    title: 'High-Converting SaaS Landing Page UI/UX Design System in Figma',
    slug: 'saas-landing-page-ui-ux-figma',
    category: 'Design',
    subcategory: 'Product & Web Design',
    description: `Transform complex tech products into clean, modern, and high-converting visual experiences. Complete responsive Figma auto-layout files with atomic component tokens, dark/light variations, custom illustrations, and interactive prototype animations ready for developer handoff.`,
    shortDescription: 'Conversion-engineered Figma design with responsive mobile screens, design tokens, and components.',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    creator: mockCreators[1],
    rating: 4.96,
    reviewCount: 382,
    completedOrders: 780,
    startingPrice: 199,
    deliveryDays: 4,
    responseTime: '< 30 mins',
    tags: ['Figma', 'UI/UX', 'Landing Page', 'Design System', 'SaaS', 'Responsive', 'Web Design'],
    isFeatured: true,
    isTrending: false,
    isEnterpriseReady: true,
    isVerifiedProvider: true,
    isSubscriptionAvailable: false,
    mediaGallery: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
        title: 'Design System & Component Kit'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
        title: 'Responsive Desktop & Mobile Breakpoints'
      }
    ],
    packages: {
      basic: {
        id: 'pkg-2-basic',
        name: 'Basic',
        tagline: 'Hero section + 3 core conversion blocks in Figma',
        price: 199,
        deliveryDays: 4,
        revisions: 3,
        deliverables: ['1 Desktop Page (4 sections)', 'Auto-layout Figma file', 'Style guide & typography tokens'],
        consultationMins: 30,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 14
      },
      standard: {
        id: 'pkg-2-std',
        name: 'Standard',
        tagline: 'Complete full landing page with mobile breakpoints & interactive prototype',
        price: 380,
        deliveryDays: 6,
        revisions: 6,
        deliverables: [
          'Full Page (Up to 8 custom sections)',
          'Desktop + Tablet + Mobile Responsive Views',
          'Interactive clickable Figma prototype',
          'Exported asset bundle (SVG, WebP)',
          'Developer handoff documentation'
        ],
        consultationMins: 45,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 30
      },
      premium: {
        id: 'pkg-2-prem',
        name: 'Premium',
        tagline: 'Complete marketing site (3 pages) + full tokenized design system',
        price: 750,
        deliveryDays: 10,
        revisions: 'Unlimited',
        deliverables: [
          'Landing Page + Pricing Page + Feature Deep Dive Page',
          'Complete Design System (30+ atomic components)',
          'Dark mode & Light mode variations',
          'Interactive micro-interaction animations',
          'Live Loom walkthrough and developer Q&A session'
        ],
        consultationMins: 90,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 60
      }
    },
    addons: [
      {
        id: 'add-2-1',
        name: 'Clean Tailwind CSS / Next.js Code Conversion',
        price: 240,
        deliveryDaysAdded: 3,
        description: 'Pixel-perfect responsive code matching the Figma design.'
      },
      {
        id: 'add-2-2',
        name: 'Custom 3D Product Mockup Assets',
        price: 85,
        deliveryDaysAdded: 1,
        description: '3 custom 3D glassmorphic device and interface renders.'
      }
    ],
    workflowSteps: [
      { step: 1, title: 'Purchase & Scope', description: 'Confirm package deliverables and secure payment in escrow.', duration: 'Immediate' },
      { step: 2, title: 'Brand & Wireframe Intake', description: 'Share product screenshots, target audience, and brand guidelines.', duration: 'Day 1' },
      { step: 3, title: 'Low-Fidelity Wireframes', description: 'Structure information architecture and narrative flow.', duration: 'Day 2' },
      { step: 4, title: 'High-Fidelity Visual Design', description: 'Craft visual polish, typography hierarchy, and UI components.', duration: 'Day 3-4' },
      { step: 5, title: 'Interactive Prototype', description: 'Add scroll animations, hover states, and responsive variants.', duration: 'Day 5' },
      { step: 6, title: 'Design Review & Feedback', description: 'In-Figma commenting and rapid refinement iterations.', duration: 'Day 6' },
      { step: 7, title: 'Developer Handoff', description: 'Final file organization, token labeling, and asset export.', duration: 'Day 7' },
      { step: 8, title: 'Client Approval & Rating', description: 'Project release and rating submission.', duration: 'Day 8' }
    ]
  },
  {
    id: 'srv-3',
    title: 'Kubernetes Cluster Audit, Zero-Downtime Migration & Terraform IaC',
    slug: 'kubernetes-cluster-audit-terraform-iac',
    category: 'Cloud',
    subcategory: 'DevOps & Infrastructure',
    description: `Audit your current AWS EKS / GCP GKE infrastructure for security vulnerabilities, excessive cloud spend, and single points of failure. Receive production-ready Terraform modules, automated GitOps CI/CD pipelines with ArgoCD, and configured Grafana / Prometheus observability.`,
    shortDescription: 'Hardened Kubernetes architecture, Terraform IaC, ArgoCD GitOps, and 30%+ cloud cost reduction.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    creator: mockCreators[2],
    rating: 4.95,
    reviewCount: 164,
    completedOrders: 290,
    startingPrice: 249,
    deliveryDays: 5,
    responseTime: '< 45 mins',
    tags: ['Kubernetes', 'AWS EKS', 'GCP GKE', 'Terraform', 'DevOps', 'Cloud Cost', 'Docker', 'Security'],
    isFeatured: false,
    isTrending: true,
    isEnterpriseReady: true,
    isVerifiedProvider: true,
    isSubscriptionAvailable: true,
    subscriptionPriceMonthly: 349,
    mediaGallery: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        title: 'Kubernetes Multi-Region Topology'
      }
    ],
    packages: {
      basic: {
        id: 'pkg-3-basic',
        name: 'Basic',
        tagline: 'Comprehensive security audit & cost optimization report',
        price: 249,
        deliveryDays: 4,
        revisions: 2,
        deliverables: [
          'Cluster security vulnerability scan (RBAC, CIS benchmarks)',
          'Cloud cost right-sizing analysis (expected 20-40% savings)',
          'Detailed actionable PDF remediation guide'
        ],
        consultationMins: 45,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 14
      },
      standard: {
        id: 'pkg-3-std',
        name: 'Standard',
        tagline: 'Full Terraform module restructuring + GitOps CI/CD setup',
        price: 499,
        deliveryDays: 7,
        revisions: 4,
        deliverables: [
          'Modular reusable Terraform codebase (VPC, EKS/GKE, IAM)',
          'GitHub Actions / GitLab CI pipeline with test automation',
          'ArgoCD continuous deployment configuration',
          'Zero-downtime rolling update configuration'
        ],
        consultationMins: 60,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 30
      },
      premium: {
        id: 'pkg-3-prem',
        name: 'Premium',
        tagline: 'Complete enterprise migration, observability stack & 24/7 disaster recovery',
        price: 980,
        deliveryDays: 12,
        revisions: 'Unlimited',
        deliverables: [
          'Live migration assistance with 99.99% uptime guarantee',
          'Prometheus + Grafana + Loki monitoring dashboards',
          'Automated Velero cluster backups and DR drill plan',
          'Secret management with HashiCorp Vault or AWS Secrets Manager',
          'Dedicated technical documentation and team training session'
        ],
        consultationMins: 120,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 90
      }
    },
    addons: [
      {
        id: 'add-3-1',
        name: 'Emergency Weekend Migration Support',
        price: 180,
        deliveryDaysAdded: 0,
        description: 'Direct live call during your off-peak maintenance window.'
      }
    ],
    workflowSteps: [
      { step: 1, title: 'Purchase & Agreement', description: 'Confirm scope and NDA if required.', duration: 'Day 1' },
      { step: 2, title: 'Read-Only Cloud Access', description: 'Secure IAM role provisioned with least privilege.', duration: 'Day 1' },
      { step: 3, title: 'Infrastructure Audit', description: 'Running automated scanners and manual architecture review.', duration: 'Day 2' },
      { step: 4, title: 'Terraform Codebase Staging', description: 'Authoring clean declarative IaC modules.', duration: 'Day 3-4' },
      { step: 5, title: 'Validation & Staging Apply', description: 'Dry-run plan executed on staging environment.', duration: 'Day 5' },
      { step: 6, title: 'Production Execution', description: 'Seamless migration with live monitoring.', duration: 'Day 6' },
      { step: 7, title: 'Verification & Sign-off', description: 'Client approves health checks and metrics.', duration: 'Day 7' },
      { step: 8, title: 'Delivery Package Transferred', description: 'Full documentation and maintenance guidance.', duration: 'Day 8' }
    ]
  },
  {
    id: 'srv-4',
    title: 'Full Business Automation with Make.com, Airtable & AI Assistants',
    slug: 'business-automation-make-airtable-ai',
    category: 'Business',
    subcategory: 'Operations & Workflow Automation',
    description: `Eliminate repetitive manual busywork. Connect HubSpot, Stripe, Slack, Airtable, and Google Workspace using smart conditional logic and LLM categorization. Cut 15+ hours of administrative time per week for your team.`,
    shortDescription: 'Custom multi-step scenarios connecting CRM, invoices, lead routing, and Slack alerts.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    creator: mockCreators[0],
    rating: 4.97,
    reviewCount: 119,
    completedOrders: 310,
    startingPrice: 119,
    deliveryDays: 3,
    responseTime: '< 15 mins',
    tags: ['Make.com', 'Airtable', 'Zapier', 'Automation', 'NoCode', 'CRM', 'Slack Bots'],
    isFeatured: false,
    isTrending: true,
    isEnterpriseReady: false,
    isVerifiedProvider: true,
    isSubscriptionAvailable: true,
    subscriptionPriceMonthly: 159,
    mediaGallery: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        title: 'Automated Pipeline Architecture'
      }
    ],
    packages: {
      basic: {
        id: 'pkg-4-basic',
        name: 'Basic',
        tagline: '1 complex automated workflow scenario (up to 6 app modules)',
        price: 119,
        deliveryDays: 2,
        revisions: 2,
        deliverables: ['1 Make.com / Zapier scenario setup', 'Error-handling router module', 'Video walkthrough guide'],
        consultationMins: 20,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 14
      },
      standard: {
        id: 'pkg-4-std',
        name: 'Standard',
        tagline: '3 integrated scenarios with Airtable relational database schema',
        price: 249,
        deliveryDays: 4,
        revisions: 4,
        deliverables: [
          '3 interconnected automated workflows',
          'Structured Airtable CRM / operations base setup',
          'AI text generation or classification step',
          'Slack notification alerts with action buttons'
        ],
        consultationMins: 45,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 30
      },
      premium: {
        id: 'pkg-4-prem',
        name: 'Premium',
        tagline: 'Complete automated operational back-office for your agency or store',
        price: 490,
        deliveryDays: 6,
        revisions: 'Unlimited',
        deliverables: [
          'Up to 8 end-to-end automation pipelines',
          'Client onboarding, invoicing, payment tracking & contract signing',
          'Automated data backup & webhook fallback system',
          'Team onboarding call and documentation'
        ],
        consultationMins: 90,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 60
      }
    },
    addons: [
      {
        id: 'add-4-1',
        name: 'Webhook Custom Scripting & Data Sanitization',
        price: 55,
        deliveryDaysAdded: 1,
        description: 'Custom JavaScript logic module for complex data transformation.'
      }
    ],
    workflowSteps: [
      { step: 1, title: 'Scope Verification', description: 'Review tools and workflow objectives.', duration: 'Day 1' },
      { step: 2, title: 'Access & Architecture Blueprint', description: 'Grant scoped API keys and agree on logic map.', duration: 'Day 1' },
      { step: 3, title: 'Scenario Construction', description: 'Building webhooks, routers, and data mappings.', duration: 'Day 2' },
      { step: 4, title: 'Edge Case Testing', description: 'Injecting edge case test payloads and failure monitors.', duration: 'Day 3' },
      { step: 5, title: 'Live Sandbox Demonstration', description: 'Recorded video proof and staging run.', duration: 'Day 3' },
      { step: 6, title: 'Client Feedback & Minor Tweaks', description: 'Adjust field mappings or triggers.', duration: 'Day 4' },
      { step: 7, title: 'Production Activation', description: 'Turn scenarios on with active error notifications.', duration: 'Day 4' },
      { step: 8, title: 'Approval & Handover', description: 'Milestone release and reference cheatsheet.', duration: 'Day 5' }
    ]
  },
  {
    id: 'srv-5',
    title: 'Technical B2B SaaS SEO & Programmatic Content Architecture Audit',
    slug: 'technical-b2b-saas-seo-audit',
    category: 'Marketing',
    subcategory: 'Search Engine Optimization',
    description: `Stop guessing why competitors outrank your product. Deep technical crawl analyzing Core Web Vitals, indexation bloat, cannibalization, programmatic keyword clusters, and high-converting competitor backlink gaps.`,
    shortDescription: 'Core Web Vitals, programmatic content blueprint, keyword gap analysis, and 6-month roadmap.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    creator: mockCreators[3],
    rating: 4.93,
    reviewCount: 156,
    completedOrders: 280,
    startingPrice: 135,
    deliveryDays: 4,
    responseTime: '< 1 hour',
    tags: ['SEO', 'Technical SEO', 'B2B SaaS', 'Programmatic SEO', 'Growth', 'Google Search Console'],
    isFeatured: false,
    isTrending: false,
    isEnterpriseReady: true,
    isVerifiedProvider: true,
    isSubscriptionAvailable: true,
    subscriptionPriceMonthly: 299,
    mediaGallery: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        title: 'Keyword Cluster & Authority Matrix'
      }
    ],
    packages: {
      basic: {
        id: 'pkg-5-basic',
        name: 'Basic',
        tagline: 'Technical audit identifying critical site errors holding back rankings',
        price: 135,
        deliveryDays: 3,
        revisions: 1,
        deliverables: ['Full Screaming Frog crawl analysis', 'Indexation & canonical tag audit', 'Core Web Vitals report'],
        consultationMins: 30,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 14
      },
      standard: {
        id: 'pkg-5-std',
        name: 'Standard',
        tagline: 'Complete technical audit + 50 high-intent competitor keyword roadmap',
        price: 280,
        deliveryDays: 5,
        revisions: 3,
        deliverables: [
          'Full technical audit & developer-ready tickets',
          'Competitor backlink gap blueprint (top 3 competitors)',
          '50 targeted BOFU (Bottom of Funnel) search queries',
          'Internal linking architecture map'
        ],
        consultationMins: 45,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 30
      },
      premium: {
        id: 'pkg-5-prem',
        name: 'Premium',
        tagline: 'Programmatic SEO architecture + content briefs for 25 high-traffic pages',
        price: 520,
        deliveryDays: 8,
        revisions: 'Unlimited',
        deliverables: [
          'Complete programmatic page template specification',
          'Database schema for programmatic programmatic directory pages',
          '25 comprehensive SEO content briefs ready for writers',
          'Live 60-minute strategy workshop and execution Q&A'
        ],
        consultationMins: 60,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 60
      }
    },
    addons: [
      {
        id: 'add-5-1',
        name: 'Direct CMS Metadata Fix Implementation',
        price: 110,
        deliveryDaysAdded: 2,
        description: 'Directly fix title tags, meta descriptions, and redirects in Webflow/WordPress.'
      }
    ],
    workflowSteps: [
      { step: 1, title: 'Intake & Domain Assessment', description: 'Review Google Search Console and target geography.', duration: 'Day 1' },
      { step: 2, title: 'Deep Crawl Execution', description: 'Exhaustive site crawl detecting broken logic and slow resources.', duration: 'Day 2' },
      { step: 3, title: 'Competitor Reverse-Engineering', description: 'Extracting highest converting keywords from rivals.', duration: 'Day 3' },
      { step: 4, title: 'Action Plan Compilation', description: 'Prioritizing quick wins vs long-term topical authority.', duration: 'Day 4' },
      { step: 5, title: 'Deliverable Delivery', description: 'Complete spreadsheet and visual audit slide deck.', duration: 'Day 4' },
      { step: 6, title: 'Review & Strategy Call', description: 'Walkthrough recommendations with client team.', duration: 'Day 5' },
      { step: 7, title: 'Final Refinements', description: 'Adjust keywords based on customer feedback.', duration: 'Day 5' },
      { step: 8, title: 'Approval & Monthly Retainer', description: 'Project release and transition to optional ongoing SEO.', duration: 'Day 6' }
    ]
  },
  {
    id: 'srv-6',
    title: 'Photorealistic 3D Interactive Spline / WebGL Assets for Websites',
    slug: 'photorealistic-3d-spline-webgl-assets',
    category: 'Design',
    subcategory: '3D Modeling & Motion',
    description: `Elevate your landing page with smooth 60fps interactive 3D elements. Custom modeled in Blender and ported into Spline 3D or Three.js for seamless mouse-tracking interaction, dark-mode materials, and ultra-fast web loading.`,
    shortDescription: 'Interactive 3D web elements that track cursor movement and respond to scroll position.',
    thumbnail: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    creator: mockCreators[4],
    rating: 4.91,
    reviewCount: 98,
    completedOrders: 165,
    startingPrice: 120,
    deliveryDays: 4,
    responseTime: '< 2 hours',
    tags: ['Spline 3D', 'Three.js', 'Blender', 'Interactive 3D', 'WebGL', 'Motion Design'],
    isFeatured: true,
    isTrending: false,
    isEnterpriseReady: false,
    isVerifiedProvider: true,
    isSubscriptionAvailable: false,
    mediaGallery: [
      {
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        title: 'Interactive 3D WebGL Model in Action'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
        title: 'Material & Lighting Breakdown'
      }
    ],
    packages: {
      basic: {
        id: 'pkg-6-basic',
        name: 'Basic',
        tagline: '1 interactive 3D hero asset with mouse cursor follow in Spline',
        price: 120,
        deliveryDays: 4,
        revisions: 2,
        deliverables: ['1 custom 3D model with materials', 'Spline viewer web embed link', 'WebGL performance optimization'],
        consultationMins: 20,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 14
      },
      standard: {
        id: 'pkg-6-std',
        name: 'Standard',
        tagline: 'Multi-state 3D scene that triggers animations as the user scrolls',
        price: 260,
        deliveryDays: 6,
        revisions: 4,
        deliverables: [
          'Full 3D hero scene with 3 interactive states',
          'Scroll-linked animation events',
          'React Three Fiber / Vanilla JS integration code',
          'Fallback WebP/MP4 for low-end mobile devices'
        ],
        consultationMins: 45,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 30
      },
      premium: {
        id: 'pkg-6-prem',
        name: 'Premium',
        tagline: 'Complete 3D visual package (3 scenes + sound design + React components)',
        price: 540,
        deliveryDays: 9,
        revisions: 'Unlimited',
        deliverables: [
          '3 unique custom 3D interactive components',
          'Physics simulation & particle effects',
          'Clean TypeScript React / Next.js component ready to paste',
          'Original Blender .blend source models + 4K textures'
        ],
        consultationMins: 60,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 60
      }
    },
    addons: [
      {
        id: 'add-6-1',
        name: 'React Three Fiber Component Wrapper',
        price: 75,
        deliveryDaysAdded: 1,
        description: 'Ready-to-use npm package or TSX component with performance throttles.'
      }
    ],
    workflowSteps: [
      { step: 1, title: 'Concept Sketch & 3D Moodboard', description: 'Align on aesthetic and polygon budget.', duration: 'Day 1' },
      { step: 2, title: '3D Geometry Modeling', description: 'Base mesh creation in Blender.', duration: 'Day 2' },
      { step: 3, title: 'Materials & Shader Work', description: 'Glass, metallic reflections, and lighting setup.', duration: 'Day 3' },
      { step: 4, title: 'Spline / Three.js Rigging', description: 'Configuring event listeners and mouse tracking.', duration: 'Day 4' },
      { step: 5, title: 'Mobile Optimization', description: 'Texture compression and DRACO polygon decimation.', duration: 'Day 5' },
      { step: 6, title: 'Interactive Link Delivery', description: 'Client reviews live web demo.', duration: 'Day 5' },
      { step: 7, title: 'Polish & Animation Adjustments', description: 'Refine responsiveness and transitions.', duration: 'Day 6' },
      { step: 8, title: 'Asset Handoff & Approval', description: 'Delivery of files and code snippets.', duration: 'Day 6' }
    ]
  },
  {
    id: 'srv-7',
    title: 'SOC2 & ISO27001 Cloud Cybersecurity Penetration Testing & Audit',
    slug: 'soc2-cybersecurity-pen-test-audit',
    category: 'Cybersecurity',
    subcategory: 'Penetration Testing & Compliance',
    description: `Thorough offensive penetration testing for web apps, REST/GraphQL APIs, and AWS/GCP cloud configurations. Detect OWASP Top 10 vulnerabilities, business logic exploits, and authentication bypass flaws before attackers or enterprise auditors do.`,
    shortDescription: 'Offensive pen testing, vulnerability mitigation guide, and compliance-ready executive report.',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    creator: mockCreators[2],
    rating: 4.99,
    reviewCount: 84,
    completedOrders: 142,
    startingPrice: 320,
    deliveryDays: 6,
    responseTime: '< 45 mins',
    tags: ['Cybersecurity', 'Penetration Testing', 'SOC2', 'OWASP', 'API Security', 'Security Audit'],
    isFeatured: false,
    isTrending: false,
    isEnterpriseReady: true,
    isVerifiedProvider: true,
    isSubscriptionAvailable: false,
    mediaGallery: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        title: 'Penetration Testing Scope & Vulnerability Matrix'
      }
    ],
    packages: {
      basic: {
        id: 'pkg-7-basic',
        name: 'Basic',
        tagline: 'Automated vulnerability scan + manual review of 5 core endpoints',
        price: 320,
        deliveryDays: 4,
        revisions: 1,
        deliverables: ['OWASP Top 10 assessment', 'Automated scanning tool verification', 'Actionable remediation checklist'],
        consultationMins: 30,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 14
      },
      standard: {
        id: 'pkg-7-std',
        name: 'Standard',
        tagline: 'Comprehensive gray-box pen test of web app & API with verified PoCs',
        price: 680,
        deliveryDays: 7,
        revisions: 3,
        deliverables: [
          'Full Web Application + API Penetration Testing (Up to 25 endpoints)',
          'Business logic & privilege escalation testing',
          'Executive presentation PDF suitable for B2B enterprise procurement & SOC2 auditors',
          '1 free re-test within 30 days after you apply code patches'
        ],
        consultationMins: 60,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 30
      },
      premium: {
        id: 'pkg-7-prem',
        name: 'Premium',
        tagline: 'Enterprise Full Spectrum: Web + Mobile + Cloud Infrastructure + Re-testing',
        price: 1350,
        deliveryDays: 12,
        revisions: 'Unlimited',
        deliverables: [
          'Complete Web, API, and AWS/GCP Cloud Architecture pen test',
          'Attacker simulation with custom exploit verification',
          'Attestation letter signed by certified CISSP security auditor',
          'Direct developer Slack channel for real-time patch guidance'
        ],
        consultationMins: 90,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 60
      }
    },
    addons: [
      {
        id: 'add-7-1',
        name: 'Immediate Expedited 48-Hour Execution',
        price: 190,
        deliveryDaysAdded: -3,
        description: 'Start testing immediately within 12 hours for urgent investor or client audits.'
      }
    ],
    workflowSteps: [
      { step: 1, title: 'Rules of Engagement & Authorization', description: 'Define scope, IP white-lists, and signed legal test permission.', duration: 'Day 1' },
      { step: 2, title: 'Reconnaissance & Footprinting', description: 'Mapping attack surface and exposed services.', duration: 'Day 2' },
      { step: 3, title: 'Vulnerability Identification', description: 'Manual & automated fuzzing of input vectors.', duration: 'Day 3' },
      { step: 4, title: 'Exploit Verification', description: 'Validating real-world exploitability without business disruption.', duration: 'Day 4' },
      { step: 5, title: 'Draft Report Generation', description: 'Compiling findings, severity CVSS scores, and proof-of-concepts.', duration: 'Day 5' },
      { step: 6, title: 'Executive Briefing Call', description: 'Explaining vulnerabilities and prioritization with your engineering team.', duration: 'Day 5' },
      { step: 7, title: 'Client Remediation Window', description: 'Your developers patch the reported vulnerabilities.', duration: 'Day 6' },
      { step: 8, title: 'Re-test & Final Certified Report', description: 'Re-verifying fixes and issuing the clean attestation document.', duration: 'Day 7' }
    ]
  },
  {
    id: 'srv-8',
    title: 'High-Impact Viral Short-Form Video Editing (Reels, TikTok & Shorts)',
    slug: 'viral-short-form-video-editing',
    category: 'Video',
    subcategory: 'Short-Form Video & Motion',
    description: `Turn raw podcasts, webinars, and screen recordings into high-retention viral content. Fast-paced dynamic captioning, custom motion graphics, sound design that drives watch time, and hook testing proven across 5M+ organic views.`,
    shortDescription: 'Retention-engineered video editing with motion typography, sound effects, and B-roll.',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
    videoPreviewUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    creator: mockCreators[1],
    rating: 4.94,
    reviewCount: 312,
    completedOrders: 920,
    startingPrice: 45,
    deliveryDays: 2,
    responseTime: '< 30 mins',
    tags: ['Video Editing', 'TikTok', 'Instagram Reels', 'YouTube Shorts', 'Motion Graphics', 'Sound Design'],
    isFeatured: false,
    isTrending: true,
    isEnterpriseReady: false,
    isVerifiedProvider: true,
    isSubscriptionAvailable: true,
    subscriptionPriceMonthly: 499,
    mediaGallery: [
      {
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        title: 'Before & After Video Hook Pacing'
      }
    ],
    packages: {
      basic: {
        id: 'pkg-8-basic',
        name: 'Basic',
        tagline: '1 viral short video (up to 60s) with captions & basic B-roll',
        price: 45,
        deliveryDays: 2,
        revisions: 2,
        deliverables: ['1 9:16 vertical video', 'Dynamic animated captions', 'Sound effects & background music'],
        consultationMins: 15,
        sourceFilesIncluded: false,
        commercialUse: true,
        supportDurationDays: 7
      },
      standard: {
        id: 'pkg-8-std',
        name: 'Standard',
        tagline: 'Pack of 5 high-engagement shorts with motion graphics & custom sound design',
        price: 180,
        deliveryDays: 4,
        revisions: 4,
        deliverables: [
          '5 edited vertical videos (up to 90s each)',
          'Custom kinetic typography matched to your branding',
          'High-retention visual zoom transitions & sound design',
          'Thumbnail cover images included'
        ],
        consultationMins: 30,
        sourceFilesIncluded: false,
        commercialUse: true,
        supportDurationDays: 14
      },
      premium: {
        id: 'pkg-8-prem',
        name: 'Premium',
        tagline: 'Batch of 15 viral shorts + Premiere Pro project files + A/B hook testing',
        price: 450,
        deliveryDays: 7,
        revisions: 'Unlimited',
        deliverables: [
          '15 vertical videos formatted for Reels, TikTok & Shorts',
          '2 alternative hook variations per video (30 total renders)',
          'Full Premiere Pro / After Effects project files',
          'Priority turnaround and dedicated editor communication'
        ],
        consultationMins: 45,
        sourceFilesIncluded: true,
        commercialUse: true,
        supportDurationDays: 30
      }
    },
    addons: [
      {
        id: 'add-8-1',
        name: '24-Hour Rush Turnaround',
        price: 35,
        deliveryDaysAdded: -1,
        description: 'Get your edited videos back within 24 hours of raw footage upload.'
      }
    ],
    workflowSteps: [
      { step: 1, title: 'Upload Raw Footage', description: 'Submit Google Drive or Dropbox link with timestamps.', duration: 'Day 1' },
      { step: 2, title: 'Hook Selection & Cutdown', description: 'Isolating the most gripping 30-60 second segments.', duration: 'Day 1' },
      { step: 3, title: 'Editing & Motion Design', description: 'Adding zooms, sound effects, and kinetic captions.', duration: 'Day 2' },
      { step: 4, title: 'First Cut Review', description: 'Watch draft via Frame.io or web link.', duration: 'Day 2' },
      { step: 5, title: 'Revisions & Pacing Fixes', description: 'Fine-tune text animations or cut dead air.', duration: 'Day 2' },
      { step: 6, title: 'Color Grade & Audio Master', description: 'Loudness normalization for social platforms.', duration: 'Day 3' },
      { step: 7, title: 'Final 4K / 1080p Render', description: 'High-bitrate files ready to post.', duration: 'Day 3' },
      { step: 8, title: 'Client Release & Review', description: 'Approve order and release funds.', duration: 'Day 3' }
    ]
  }
];

export const mockCreatorPosts: CreatorPost[] = [
  {
    id: 'post-1',
    creator: mockCreators[0],
    type: 'short_video',
    title: 'Built an autonomous AI support agent that handled 14,000 Shopify tickets in 48 hours',
    caption: 'Tired of slow customer support queues? Here is how we connected LangChain + Pinecone to Shopify order APIs to resolve 78% of returns without human intervention.',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    videoDuration: '0:58',
    connectedServiceId: 'srv-1',
    connectedServiceTitle: 'Custom AI Customer Support Chatbot for Shopify & SaaS with Vector Search',
    startingPrice: 149,
    rating: 4.98,
    likesCount: 1842,
    isLiked: false,
    savesCount: 654,
    isSaved: false,
    commentsCount: 94,
    sharesCount: 230,
    createdAt: '2 hours ago',
    metrics: {
      resultMetric: 'Ticket Deflection Rate',
      resultValue: '78.4%'
    },
    comments: [
      {
        id: 'c-1',
        author: 'Devon Vance',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        text: 'Does this handle multi-currency refunds cleanly with Shopify Payments?',
        timestamp: '1h ago'
      },
      {
        id: 'c-2',
        author: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
        text: 'Just hired Elena last week for our store — genuinely the fastest and cleanest deployment we have had!',
        timestamp: '45m ago'
      }
    ]
  },
  {
    id: 'post-2',
    creator: mockCreators[1],
    type: 'before_after',
    title: 'Before & After: Redesigning a fintech dashboard to boost trial-to-paid conversion by 34%',
    caption: 'Cluttered UI was causing 60% user drop-off in the first 3 minutes. Here is the redesigned modular analytics workspace with real-time financial tracking.',
    mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    beforeMediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    afterMediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    connectedServiceId: 'srv-2',
    connectedServiceTitle: 'High-Converting SaaS Landing Page UI/UX Design System in Figma',
    startingPrice: 199,
    rating: 4.96,
    likesCount: 2310,
    isLiked: true,
    savesCount: 940,
    isSaved: true,
    commentsCount: 142,
    sharesCount: 310,
    createdAt: '5 hours ago',
    metrics: {
      resultMetric: 'Conversion Lift',
      resultValue: '+34.2%'
    },
    comments: [
      {
        id: 'c-3',
        author: 'Liam Miller',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
        text: 'The spacing and typographic contrast is chef’s kiss. Are those auto-layout components in Figma?',
        timestamp: '3h ago'
      }
    ]
  },
  {
    id: 'post-3',
    creator: mockCreators[2],
    type: 'case_study',
    title: 'Slashing AWS Kubernetes bill from $18,400/mo to $9,100/mo without dropping 99.99% SLA',
    caption: 'Case study: How we restructured spot instances, rightsized memory allocations with Karpenter, and moved ingress traffic to Cilium eBPF for a fintech customer.',
    mediaUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    connectedServiceId: 'srv-3',
    connectedServiceTitle: 'Kubernetes Cluster Audit, Zero-Downtime Migration & Terraform IaC',
    startingPrice: 249,
    rating: 4.95,
    likesCount: 1420,
    isLiked: false,
    savesCount: 780,
    isSaved: false,
    commentsCount: 68,
    sharesCount: 190,
    createdAt: '1 day ago',
    metrics: {
      resultMetric: 'Monthly Cost Saved',
      resultValue: '$9,300/mo'
    },
    comments: [
      {
        id: 'c-4',
        author: 'Mateo Rossi',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
        text: 'Spot node termination handling with Karpenter is truly a game changer for non-critical pods.',
        timestamp: '18h ago'
      }
    ]
  },
  {
    id: 'post-4',
    creator: mockCreators[4],
    type: 'portfolio_showcase',
    title: 'Interactive 3D Glass Cyberpunk Device modeled in Blender & running in Three.js at 60 FPS',
    caption: 'Full real-time physics and mouse inertia. Perfect for hero sections that want to stand out from generic template landing pages.',
    mediaUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    videoDuration: '0:34',
    connectedServiceId: 'srv-6',
    connectedServiceTitle: 'Photorealistic 3D Interactive Spline / WebGL Assets for Websites',
    startingPrice: 120,
    rating: 4.91,
    likesCount: 3120,
    isLiked: false,
    savesCount: 1240,
    isSaved: false,
    commentsCount: 185,
    sharesCount: 420,
    createdAt: '2 days ago',
    metrics: {
      resultMetric: 'Mobile Frame Rate',
      resultValue: '60 FPS'
    },
    comments: [
      {
        id: 'c-5',
        author: 'Chloe Dupont',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        text: 'Insane lighting on that glass shader! Is this accessible on mobile touch?',
        timestamp: '1d ago'
      }
    ]
  }
];

export const mockProjects: Project[] = [
  {
    id: 'proj-101',
    title: 'Full AI-Powered Search & Recommendation Engine for Healthcare Portal',
    description: 'We need an experienced AI engineer to build a HIPAA-compliant semantic search and doctor recommendation pipeline using vector embeddings, OpenAI / Claude APIs, and Postgres pgvector.',
    category: 'AI & Automation',
    budgetMin: 800,
    budgetMax: 2000,
    deadline: '2026-10-30',
    requiredSkills: ['Python', 'pgvector', 'FastAPI', 'OpenAI API', 'Healthcare Data', 'Docker'],
    attachments: [
      { name: 'architecture_spec_v2.pdf', size: '2.4 MB' },
      { name: 'data_sample_schema.json', size: '420 KB' }
    ],
    preferredExperience: 'Expert',
    locationTimezone: 'Any timezone with 3h overlap with EST',
    visibility: 'Public Marketplace',
    client: {
      name: 'Dr. Gregory Hart',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80',
      company: 'BioPulse Health',
      rating: 5.0,
      totalSpent: 18400
    },
    assignedProvider: mockCreators[0],
    status: 'in_progress',
    createdAt: '2026-09-18',
    progressPercentage: 65,
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Data Ingestion & pgvector Pipeline',
        description: 'Sanitize medical ontology taxonomy and generate embeddings stored in PostgreSQL pgvector.',
        amount: 500,
        dueDate: '2026-09-28',
        status: 'approved',
        deliverablesSubmitted: ['ingestion_script.py', 'docker-compose.yml', 'benchmark_report.pdf']
      },
      {
        id: 'm2',
        title: 'Milestone 2: Hybrid RAG Search API & Latency Optimization',
        description: 'Build FastAPI endpoints combining keyword search and semantic cosine similarity with sub-100ms response.',
        amount: 650,
        dueDate: '2026-10-14',
        status: 'submitted',
        deliverablesSubmitted: ['fastapi_service_v1.2.zip', 'test_results.json']
      },
      {
        id: 'm3',
        title: 'Milestone 3: Staging Deployment & Frontend Integration Testing',
        description: 'Deploy to AWS ECS Fargate, configure secrets, and verify with frontend client apps.',
        amount: 450,
        dueDate: '2026-10-28',
        status: 'funded'
      }
    ],
    tasks: [
      {
        id: 't1',
        title: 'Setup PostgreSQL 16 + pgvector container with HIPAA-ready encryption',
        status: 'done',
        assignee: 'Elena Rostova',
        assigneeAvatar: mockCreators[0].avatar,
        dueDate: 'Sep 22',
        priority: 'high'
      },
      {
        id: 't2',
        title: 'Benchmark text-embedding-3-small vs BioClinical-BERT latency',
        status: 'done',
        assignee: 'Elena Rostova',
        assigneeAvatar: mockCreators[0].avatar,
        dueDate: 'Sep 25',
        priority: 'medium'
      },
      {
        id: 't3',
        title: 'Implement dynamic hybrid reciprocal rank fusion (RRF)',
        status: 'in_progress',
        assignee: 'Elena Rostova',
        assigneeAvatar: mockCreators[0].avatar,
        dueDate: 'Oct 02',
        priority: 'urgent'
      },
      {
        id: 't4',
        title: 'Write load testing script with Locust (500 concurrent req/sec)',
        status: 'todo',
        assignee: 'Elena Rostova',
        assigneeAvatar: mockCreators[0].avatar,
        dueDate: 'Oct 10',
        priority: 'medium'
      }
    ],
    deliverables: [
      {
        id: 'del-1',
        title: 'FastAPI Semantic Search Engine Microservice Package',
        version: 'v1.2.0',
        fileType: 'code',
        fileSize: '14.8 MB',
        fileUrl: '#',
        submittedAt: 'Yesterday at 4:30 PM',
        status: 'pending_review',
        feedback: 'Awaiting client review of Swagger UI staging tests.'
      },
      {
        id: 'del-2',
        title: 'Data Ingestion & Embedding Pipeline Scripts',
        version: 'v1.0.0',
        fileType: 'code',
        fileSize: '3.2 MB',
        fileUrl: '#',
        submittedAt: 'Sep 24, 2026',
        status: 'approved'
      }
    ],
    recommendedProviders: [
      {
        provider: mockCreators[0],
        matchScore: 98,
        matchReasons: {
          skillsMatch: ['Python', 'pgvector', 'FastAPI', 'OpenAI API'],
          pastCategoryProjects: 14,
          ratingMatch: 4.98,
          priceAlignment: 'Within target budget ($800 - $2,000)',
          responseSpeed: 'Replies in < 15 mins'
        },
        startingPrice: 149
      },
      {
        provider: mockCreators[2],
        matchScore: 89,
        matchReasons: {
          skillsMatch: ['Docker', 'AWS Infrastructure', 'Security'],
          pastCategoryProjects: 9,
          ratingMatch: 4.95,
          priceAlignment: 'Within budget ($900 - $1,500)',
          responseSpeed: 'Replies in < 45 mins'
        },
        startingPrice: 249
      }
    ],
    unreadMessagesCount: 2
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ord-8921',
    serviceId: 'srv-1',
    serviceTitle: 'Custom AI Customer Support Chatbot for Shopify & SaaS',
    serviceThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
    creator: mockCreators[0],
    packageName: 'Standard',
    totalPrice: 364,
    orderedAt: '2026-09-24',
    expectedDeliveryDate: '2026-09-29',
    status: 'active',
    selectedAddons: [
      {
        id: 'add-1',
        name: 'Express 24-Hour Deployment',
        price: 65,
        deliveryDaysAdded: -2,
        description: 'Priority queue bump and delivery within 24 hours.'
      }
    ],
    requirementsSubmitted: true,
    progressStep: 4
  },
  {
    id: 'ord-8740',
    serviceId: 'srv-2',
    serviceTitle: 'High-Converting SaaS Landing Page UI/UX Design System in Figma',
    serviceThumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80',
    creator: mockCreators[1],
    packageName: 'Basic',
    totalPrice: 199,
    orderedAt: '2026-09-12',
    expectedDeliveryDate: '2026-09-16',
    status: 'completed',
    selectedAddons: [],
    requirementsSubmitted: true,
    progressStep: 8
  }
];

export const mockSubscriptions: SubscriptionPlan[] = [
  {
    id: 'sub-1',
    serviceTitle: 'Monthly B2B Technical SEO & Content Optimization',
    creator: mockCreators[3],
    planName: 'Growth Retainer',
    pricePerMonth: 299,
    status: 'active',
    billingInterval: 'Monthly',
    renewalDate: '2026-10-15',
    category: 'Marketing',
    usage: {
      metric: 'Content Briefs & Crawl Audits',
      used: 3,
      limit: 4
    },
    features: [
      'Weekly automated technical error audits',
      '4 bottom-of-funnel content briefs',
      'Rank tracking for 250 primary keywords',
      'Bi-weekly 30-min strategy review call'
    ]
  },
  {
    id: 'sub-2',
    serviceTitle: '24/7 Cloud Monitoring & Kubernetes Incident Response',
    creator: mockCreators[2],
    planName: 'SRE Shield',
    pricePerMonth: 199,
    status: 'active',
    billingInterval: 'Monthly',
    renewalDate: '2026-10-02',
    category: 'Cloud',
    usage: {
      metric: 'Included Incident Hours',
      used: 1.5,
      limit: 5
    },
    features: [
      'Automated PagerDuty integration',
      'Monthly security vulnerability patching',
      'Prometheus alerting threshold tuning',
      '< 1 hour response SLA for critical outages'
    ]
  },
  {
    id: 'sub-3',
    serviceTitle: 'Social Media Video Editing & Channel Management',
    creator: mockCreators[1],
    planName: 'Creator Velocity',
    pricePerMonth: 499,
    status: 'active',
    billingInterval: 'Monthly',
    renewalDate: '2026-10-20',
    category: 'Video',
    usage: {
      metric: 'Shorts Produced This Month',
      used: 11,
      limit: 15
    },
    features: [
      '15 high-retention short videos per month',
      'Custom kinetic subtitles & sound design',
      'Direct YouTube/TikTok scheduling integration',
      'Thumbnail graphic package'
    ]
  }
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participant: mockCreators[0],
    lastMessage: 'I have attached the Swagger API spec for your team to test the vector search endpoint.',
    lastMessageTime: '10:45 AM',
    unreadCount: 1,
    isOnline: true,
    projectRef: 'proj-101',
    messages: [
      {
        id: 'm-1',
        conversationId: 'conv-1',
        senderId: 'c1',
        senderName: 'Elena Rostova',
        senderAvatar: mockCreators[0].avatar,
        isSelf: false,
        text: 'Hi Alex! I just completed the database migration and the pgvector extension is functioning with cosine distance indexing.',
        timestamp: '10:30 AM'
      },
      {
        id: 'm-2',
        conversationId: 'conv-1',
        senderId: 'user-self',
        senderName: 'Alex Mercer',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        isSelf: true,
        text: 'That is fantastic progress, Elena! What kind of query latencies are you seeing under load?',
        timestamp: '10:38 AM'
      },
      {
        id: 'm-3',
        conversationId: 'conv-1',
        senderId: 'c1',
        senderName: 'Elena Rostova',
        senderAvatar: mockCreators[0].avatar,
        isSelf: false,
        text: 'We are clocking an average of 42ms for hybrid queries across 120,000 embedded documents. I have attached the Swagger API spec for your team to test the vector search endpoint.',
        timestamp: '10:45 AM',
        reactions: [
          { emoji: '🚀', count: 1, users: ['Alex Mercer'] },
          { emoji: '🔥', count: 1, users: ['Elena Rostova'] }
        ],
        attachment: {
          type: 'quote',
          amount: 650,
          serviceTitle: 'Milestone 2 Approval Request: Hybrid RAG Search API',
          url: '#'
        }
      }
    ]
  },
  {
    id: 'conv-2',
    participant: mockCreators[1],
    lastMessage: 'Figma file has been updated with the dark mode variables! Take a look.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: 'm-201',
        conversationId: 'conv-2',
        senderId: 'c2',
        senderName: 'Marcus Vance',
        senderAvatar: mockCreators[1].avatar,
        isSelf: false,
        text: 'Figma file has been updated with the dark mode variables! Take a look.',
        timestamp: 'Yesterday at 3:15 PM',
        attachment: {
          type: 'file',
          name: 'Taskora_Design_Tokens_v2.fig',
          size: '18.4 MB',
          url: '#'
        }
      }
    ]
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    category: 'Orders',
    title: 'Milestone Submitted for Review',
    message: 'Elena Rostova submitted Milestone 2 deliverables on Project #101.',
    timestamp: '25 mins ago',
    isRead: false,
    actionUrl: '#',
    avatar: mockCreators[0].avatar
  },
  {
    id: 'notif-2',
    category: 'Messages',
    title: 'New message from Marcus Vance',
    message: '“Figma file has been updated with the dark mode variables...”',
    timestamp: '2 hours ago',
    isRead: false,
    actionUrl: '#',
    avatar: mockCreators[1].avatar
  },
  {
    id: 'notif-3',
    category: 'Payments',
    title: 'Escrow Funds Secured',
    message: '$650.00 escrow is held safely for Milestone 2 on BioPulse Health.',
    timestamp: '1 day ago',
    isRead: true,
    actionUrl: '#'
  },
  {
    id: 'notif-4',
    category: 'Reviews',
    title: '5-Star Review Received',
    message: 'Sarah Jenkins left a glowing 5-star review on your project.',
    timestamp: '2 days ago',
    isRead: true,
    actionUrl: '#'
  },
  {
    id: 'notif-5',
    category: 'Followers',
    title: 'New Specialist Follower',
    message: 'Kaito Tanaka started following your creator profile.',
    timestamp: '3 days ago',
    isRead: true,
    avatar: mockCreators[4].avatar
  }
];

export const mockReviews: Review[] = [
  {
    id: 'rev-1',
    serviceId: 'srv-1',
    creatorId: 'c1',
    clientName: 'David K. - CTO at FinNext',
    clientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    clientCountry: 'United States',
    verifiedPurchase: true,
    packageName: 'Premium ($599)',
    overallRating: 5.0,
    criteria: {
      communication: 5.0,
      quality: 5.0,
      delivery: 4.9,
      value: 5.0
    },
    comment: 'Elena is in a league of her own when it comes to production AI engineering. She delivered an autonomous agent with strict guardrails that reduced our tier-1 support tickets by 72% within 3 days of going live. Code quality was exceptional, thoroughly documented, and included unit tests.',
    createdAt: 'Sep 19, 2026',
    projectBudget: 599,
    sellerResponse: {
      text: 'Thank you so much David! Working with the FinNext engineering team was a pleasure. Glad to see the prompt routing and vector retrieval hitting such high accuracy.',
      date: 'Sep 20, 2026'
    }
  },
  {
    id: 'rev-2',
    serviceId: 'srv-1',
    creatorId: 'c1',
    clientName: 'Jessica Thorne - Founder, BloomSkin',
    clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    clientCountry: 'United Kingdom',
    verifiedPurchase: true,
    packageName: 'Standard ($299)',
    overallRating: 4.9,
    criteria: {
      communication: 5.0,
      quality: 4.9,
      delivery: 5.0,
      value: 4.8
    },
    comment: 'Our Shopify store handles roughly 4,000 monthly queries about order status and ingredients. Elena had the bot fully integrated into Gorgias and Shopify within 48 hours. Zero hallucinations detected during our testing.',
    createdAt: 'Sep 11, 2026',
    projectBudget: 299
  },
  {
    id: 'rev-3',
    serviceId: 'srv-2',
    creatorId: 'c2',
    clientName: 'Julian Sterling - VP Product, LayerMesh',
    clientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    clientCountry: 'Canada',
    verifiedPurchase: true,
    packageName: 'Standard ($380)',
    overallRating: 5.0,
    criteria: {
      communication: 5.0,
      quality: 5.0,
      delivery: 5.0,
      value: 5.0
    },
    comment: 'Marcus transformed our messy wireframes into an elegant, polished Figma design system with impeccable auto-layout. Our developers were able to implement the front-end in half the usual time thanks to his detailed token labeling.',
    createdAt: 'Sep 04, 2026',
    projectBudget: 380,
    sellerResponse: {
      text: 'Thanks Julian! The LayerMesh product has incredible potential and I am thrilled with how the conversion components came together.',
      date: 'Sep 05, 2026'
    }
  }
];

export const mockAdminMetrics: AdminMetrics = {
  gmv: 1420850,
  platformRevenue: 178500,
  activeUsers: 42800,
  activeProviders: 3150,
  totalOrders: 18450,
  conversionRate: 4.82,
  repeatPurchaseRate: 64.7,
  openDisputesCount: 3,
  pendingRefundsCount: 2,
  disputes: [
    {
      id: 'disp-401',
      orderId: 'ord-8109',
      clientName: 'Apex Health Tech',
      providerName: 'DevPulse Agency',
      amount: 450,
      reason: 'Deliverable missed agreed deadline by 5 days without communication',
      date: '2026-09-23',
      status: 'investigating'
    },
    {
      id: 'disp-402',
      orderId: 'ord-8255',
      clientName: 'Nordic Retail Group',
      providerName: 'MotionCraft Studios',
      amount: 180,
      reason: 'Client requested complete revision outside initial scope agreement',
      date: '2026-09-24',
      status: 'awaiting_evidence'
    }
  ],
  pendingVerifications: [
    {
      id: 'ver-89',
      providerName: 'Liam O’Connor',
      category: 'Cybersecurity',
      portfolioLinks: ['https://github.com/loconnor-sec', 'https://liamsec.dev'],
      idDocument: 'Passport_Verified_OConnor.pdf',
      submissionDate: '2026-09-25'
    },
    {
      id: 'ver-90',
      providerName: 'Zara Ndiaye',
      category: 'Cloud',
      portfolioLinks: ['https://zara-cloud.io'],
      idDocument: 'Gov_ID_Ndiaye.pdf',
      submissionDate: '2026-09-25'
    }
  ],
  reportedServices: [
    {
      id: 'rep-1',
      serviceTitle: 'Guaranteed 10,000 Organic App Downloads in 24 Hours',
      creatorName: 'GrowthHackBot99',
      flagsCount: 7,
      reason: 'Suspected bot traffic / terms of service violation',
      status: 'pending_review'
    }
  ]
};

export const serviceCategories = [
  'Design',
  'Development',
  'AI & Automation',
  'Marketing',
  'Writing',
  'Video',
  'Business',
  'Data',
  'Engineering',
  'Cybersecurity',
  'Cloud',
  'Consulting'
] as const;
