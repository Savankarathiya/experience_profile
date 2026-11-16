/**
 * =========================================================================
 * SAVAN KARATHIYA - CAREEROS MASTER COMMAND CENTER ENGINE
 * All-in-One: Job Scout, ATS Matcher, International CVs, Interview Calendar & Upskilling
 * =========================================================================
 */

import { ProfileStore } from './profile-store.js';
import {
  PROFILE_INFO,
  RECRUITER_ROLES,
  SKILLS_CATEGORIES,
  SKILLS_DATA,
  EXPERIENCES_DATA,
  PROJECTS_DATA,
  EDUCATION_DATA,
  CERTIFICATIONS_DATA,
  LANGUAGES_DATA
} from './data.js';

// Global Storage Keys
const STORAGE_KEYS = {
  JOBS: 'cos_jobs_data_v1',
  INTERVIEWS: 'cos_interviews_data_v1',
  LEARNING: 'cos_learning_data_v1',
  LEARNING_HOURS: 'cos_learning_hours_v1',
  LEARNING_LOGS: 'cos_learning_logs_v1',
  SETTINGS: 'cos_settings_data_v1',
  GEMINI_KEY: 'cos_gemini_api_key',
  GEMINI_MODEL: 'cos_gemini_model_v1',
  COVER_LETTERS: 'cos_saved_cover_letters_v1'
};

/* ==========================================================================
   DEFAULT SEED DATA (High-Value Realistic Sample Data)
   ========================================================================== */
const SEED_JOBS = [
  {
    id: 'job-1',
    company: 'Stripe',
    title: 'Staff Distributed Systems Engineer',
    roleTier: 'staff',
    country: 'US',
    locationType: 'Remote',
    salaryRange: '$220,000 - $260,000 + Equity',
    jobUrl: 'https://stripe.com/jobs',
    jobDescriptionText: 'Looking for a Staff Engineer to lead high-throughput distributed transaction engines using Node.js, Python, high QPS microservices, and PostgreSQL.',
    atsMatchScore: 94,
    matchedKeywords: ['Node.js', 'Distributed Systems', 'Microservices', 'PostgreSQL', 'High Throughput', 'Architecture'],
    missingKeywords: ['Event Sourcing', 'Raft Consensus'],
    stage: 'screening',
    appliedDate: '2026-11-05',
    nextActionDate: '2026-11-18',
    notes: 'Recruiter screen passed. Prepping for System Design round focusing on distributed consensus and P99 latency.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'job-2',
    company: 'Datadog',
    title: 'Technical Lead - Observability & Data Pipelines',
    roleTier: 'lead',
    country: 'EU',
    locationType: 'Remote',
    salaryRange: '€120,000 - €145,000',
    jobUrl: 'https://careers.datadoghq.com',
    jobDescriptionText: 'Lead an engineering squad building large-scale log search and visualization pipelines leveraging Elasticsearch, Python, Node.js, and Kafka.',
    atsMatchScore: 98,
    matchedKeywords: ['Elasticsearch', 'Python', 'Node.js', 'Technical Lead', 'Data Pipelines', 'Agile'],
    missingKeywords: ['Kafka Partitioning'],
    stage: 'technical',
    appliedDate: '2026-11-02',
    nextActionDate: '2026-11-20',
    notes: 'Coding round scheduled. Focus on indexing optimization and log aggregation algorithms.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'job-3',
    company: 'Revolut',
    title: 'Senior Systems Architect (Core Banking)',
    roleTier: 'staff',
    country: 'UK',
    locationType: 'Hybrid',
    salaryRange: '£130,000 - £160,000',
    jobUrl: 'https://revolut.com/careers',
    jobDescriptionText: 'Architect resilient event-driven systems and microservices handling millions of financial operations with low latencies.',
    atsMatchScore: 92,
    matchedKeywords: ['System Architecture', 'Microservices', 'Financial Systems', 'Docker', 'Kubernetes'],
    missingKeywords: ['gRPC Streams'],
    stage: 'applied',
    appliedDate: '2026-11-10',
    nextActionDate: '2026-11-22',
    notes: 'Application submitted via referral. Follow up with hiring manager next week.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'job-4',
    company: 'Careem (Uber Subsidiary)',
    title: 'Engineering Technical Lead - SuperApp Backend',
    roleTier: 'lead',
    country: 'UAE',
    locationType: 'Onsite / Dubai',
    salaryRange: 'AED 42,000 - AED 48,000 / month (Tax-Free)',
    jobUrl: 'https://careem.com/careers',
    jobDescriptionText: 'Leading backend squads building high-scale services in Python, Node.js, and Redis caching. Relocation package & visa sponsorship provided.',
    atsMatchScore: 96,
    matchedKeywords: ['Python', 'Node.js', 'Redis', 'Team Mentorship', 'High Scale', 'Microservices'],
    missingKeywords: ['Geo-spatial Indexing'],
    stage: 'final',
    appliedDate: '2026-10-28',
    nextActionDate: '2026-11-16',
    notes: 'Final onsite round in Dubai (or virtual). Culture fit and VP engineering interview.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'job-5',
    company: 'Canva',
    title: 'Senior Software Engineer - Performance & Core Engine',
    roleTier: 'senior',
    country: 'AU',
    locationType: 'Remote (APAC)',
    salaryRange: 'AUD 190,000 - AUD 220,000',
    jobUrl: 'https://canva.com/careers',
    jobDescriptionText: 'Senior IC role optimizing web performance, WebAssembly, TypeScript, and high-throughput backend services for millions of daily active users.',
    atsMatchScore: 95,
    matchedKeywords: ['TypeScript', 'JavaScript', 'Performance Optimization', 'React.js', 'APIs'],
    missingKeywords: ['WebAssembly SIMD'],
    stage: 'wishlist',
    appliedDate: '',
    nextActionDate: '2026-11-25',
    notes: 'Preparing tailored Australian format resume with verifiable achievement bullets.',
    createdAt: new Date().toISOString()
  }
];

const SEED_INTERVIEWS = [
  {
    id: 'int-1',
    company: 'Stripe',
    role: 'Staff Distributed Systems Engineer',
    roundType: 'system_design',
    timezone: 'EST',
    dateTime: '2026-11-18T10:00', // 10:00 AM EST = 8:30 PM IST
    meetingLink: 'https://zoom.us/j/9876543210',
    interviewer: 'David Chen (Principal Architect)',
    prepNotes: 'Design a distributed rate limiter and consensus engine. Emphasize Tokio async concurrency and 50k QPS experience.',
    status: 'upcoming'
  },
  {
    id: 'int-2',
    company: 'Careem',
    role: 'Engineering Technical Lead',
    roundType: 'final_onsite',
    timezone: 'GST',
    dateTime: '2026-11-16T14:00', // 2:00 PM GST (Dubai) = 3:30 PM IST
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    interviewer: 'Fatima Al-Mansoor (VP of Engineering)',
    prepNotes: 'Discuss squad leadership, cross-functional delivery, and high-throughput architectural trade-offs.',
    status: 'upcoming'
  }
];

const SEED_DREAM_TRACKS = [
  {
    id: 'track-distributed-systems',
    title: 'Staff Distributed Systems Engineer (High QPS & Event Streaming)',
    icon: '⚡',
    matchScore: 92,
    targetTier: 'Staff / Principal',
    skills: [
      { name: 'Distributed Event Streaming (Kafka / Pulsar)', current: 85, target: 95, priority: 'CRITICAL' },
      { name: 'Distributed Consensus (Raft / Paxos)', current: 75, target: 90, priority: 'HIGH' },
      { name: 'High-Throughput Node.js & Async Python Internals', current: 90, target: 98, priority: 'CRITICAL' },
      { name: 'Microservices Fault Tolerance & Circuit Breakers', current: 88, target: 95, priority: 'MEDIUM' }
    ],
    sprints: [
      {
        week: 1,
        title: 'Asynchronous Event-Driven Architectures & Partitioning',
        tasks: [
          { text: 'Analyze event partition keying and consumer group rebalancing in Kafka', completed: true },
          { text: 'Benchmark Redis cluster cache-aside vs write-through at 50k QPS', completed: true },
          { text: 'Review gRPC Protobuf serialization vs JSON payload overhead', completed: false }
        ],
        resources: [
          { title: 'Designing Data-Intensive Applications (Kleppmann)', url: 'https://dataintensive.net/' },
          { title: 'Kafka Event Streaming Architecture Guide', url: 'https://kafka.apache.org/documentation/' }
        ]
      },
      {
        week: 2,
        title: 'Distributed Consensus & High-Scale Storage Engines',
        tasks: [
          { text: 'Read Raft consensus paper (Ongaro & Ousterhout)', completed: true },
          { text: 'Design a leader-election & log-replication state machine in TypeScript/Node', completed: false },
          { text: 'Explore LSM-Tree vs B-Tree for high-write workloads', completed: false }
        ],
        resources: [
          { title: 'The Raft Consensus Algorithm', url: 'https://raft.github.io/' },
          { title: 'Martin Fowler: Patterns of Distributed Systems', url: 'https://martinfowler.com/articles/patterns-of-distributed-systems/' }
        ]
      }
    ]
  },
  {
    id: 'track-cloud-k8s',
    title: 'Principal Cloud & Kubernetes Platform Architect (AWS/GCP)',
    icon: '☁️',
    matchScore: 92,
    targetTier: 'Principal Architect',
    skills: [
      { name: 'Kubernetes Custom Resource Definitions (CRDs)', current: 80, target: 95, priority: 'HIGH' },
      { name: 'Service Mesh & Multi-Cluster Traffic (Istio)', current: 75, target: 90, priority: 'HIGH' },
      { name: 'GitOps & Terraform Infrastructure as Code', current: 85, target: 95, priority: 'CRITICAL' },
      { name: 'Zero-Trust Architecture & IAM Governance', current: 80, target: 90, priority: 'MEDIUM' }
    ],
    sprints: [
      {
        week: 1,
        title: 'Kubernetes Operator SDK & Controller Patterns',
        tasks: [
          { text: 'Scaffold a custom Kubernetes operator using Node / TypeScript client', completed: false },
          { text: 'Implement auto-reconciliation loop and status conditions', completed: false },
          { text: 'Deploy stateful distributed cluster with custom CRD', completed: false }
        ],
        resources: [
          { title: 'Kubernetes JavaScript/TypeScript Client', url: 'https://github.com/kubernetes-client/javascript' },
          { title: 'Kubernetes Operator Pattern Docs', url: 'https://kubernetes.io/docs/concepts/extend-kubernetes/operator/' }
        ]
      }
    ]
  },
  {
    id: 'track-ai-infra',
    title: 'AI Platform & High-Performance Data Infra Lead',
    icon: '🤖',
    matchScore: 90,
    targetTier: 'Technical Lead',
    skills: [
      { name: 'LLM Serving & Quantization (vLLM / TensorRT)', current: 70, target: 90, priority: 'HIGH' },
      { name: 'Vector Databases (Milvus / Qdrant / Pgvector)', current: 85, target: 95, priority: 'CRITICAL' },
      { name: 'High-Throughput Feature Stores & Superset BI', current: 90, target: 95, priority: 'CRITICAL' },
      { name: 'Distributed Streaming (Kafka / Flink)', current: 75, target: 90, priority: 'MEDIUM' }
    ],
    sprints: [
      {
        week: 1,
        title: 'Vector Search Indexing & Low-Latency Retrieval',
        tasks: [
          { text: 'Compare HNSW vs IVF-PQ indexing benchmarks', completed: true },
          { text: 'Set up Qdrant cluster with hybrid semantic search', completed: false },
          { text: 'Optimize vector cosine similarity using SIMD instructions', completed: false }
        ],
        resources: [
          { title: 'Qdrant Vector Database Architecture', url: 'https://qdrant.tech/documentation/' },
          { title: 'Pinecone Learning Center: Vector Search Basics', url: 'https://www.pinecone.io/learn/' }
        ]
      }
    ]
  }
];

/* ==========================================================================
   CAREEROS STATE CONTROLLER
   ========================================================================== */
export class CareerOS {
  constructor() {
    this.jobs = [];
    this.interviews = [];
    this.learningTracks = [];
    this.coverLetters = [];
    this.activeTab = 'scout';
    this.currentCountryFormat = 'us'; // 'us' | 'eu' | 'uae' | 'apac'
    this.currentRoleTier = 'lead';    // 'lead' | 'staff' | 'senior'
    this.currentCoverLetterTier = 'lead'; // 'lead' | 'staff' | 'senior'
    this.kanbanSearchQuery = '';
    this.kanbanTierFilter = 'all';
    this.customInjectedKeywords = [];
    this.savedTailoredResumes = [];
    this.geminiApiKey = '';
    this.geminiModel = 'gemini-2.0-flash';
    this.currentAiInterviewBrief = '';
    this.calendarMonthOffset = 0;
    this.selectedCalendarDate = null;
    this.learningHours = 34.5;
    this.learningLogs = [];
    this.worldClockInterval = null;

    this.init();
  }

  init() {
    this.loadState();
    this.bindGlobalEvents();
    this.renderAll();
    this.startWorldClock();
    this.checkHashRoute();
    this.updateProfileBadge();

    ProfileStore.subscribe(() => {
      this.updateProfileBadge();
      this.renderAll();
    });
  }

  updateProfileBadge() {
    const info = ProfileStore.getProfileInfo();
    const isCustom = ProfileStore.isCustom();
    const subtitleEl = document.querySelector('.cos-subtitle');
    if (subtitleEl) {
      subtitleEl.textContent = `${info.name} • Master Career Command Center`;
    }
    const badge = document.getElementById('cosActiveProfileBadge');
    if (badge) {
      if (isCustom) {
        badge.className = 'cos-profile-badge active-custom';
        badge.innerHTML = `<span>👤 ${this.escapeHtml(info.name)}</span><span class="badge-tag">Custom Active</span>`;
      } else {
        badge.className = 'cos-profile-badge default-demo';
        badge.innerHTML = `<span>👤 Savan Karathiya</span><span class="badge-tag">Demo Showcase</span>`;
      }
    }
  }

  /* -------------------------------------------------------------------------
     STATE PERSISTENCE
     ------------------------------------------------------------------------- */
  loadState() {
    try {
      const storedJobs = localStorage.getItem(STORAGE_KEYS.JOBS);
      this.jobs = storedJobs ? JSON.parse(storedJobs) : [...SEED_JOBS];

      const storedInts = localStorage.getItem(STORAGE_KEYS.INTERVIEWS);
      this.interviews = storedInts ? JSON.parse(storedInts) : [...SEED_INTERVIEWS];

      const storedLearn = localStorage.getItem(STORAGE_KEYS.LEARNING);
      this.learningTracks = storedLearn ? JSON.parse(storedLearn) : [...SEED_DREAM_TRACKS];

      const storedHours = localStorage.getItem(STORAGE_KEYS.LEARNING_HOURS);
      this.learningHours = storedHours ? parseFloat(storedHours) : 34.5;

      const storedLogs = localStorage.getItem(STORAGE_KEYS.LEARNING_LOGS);
      this.learningLogs = storedLogs ? JSON.parse(storedLogs) : [];

      const storedCL = localStorage.getItem(STORAGE_KEYS.COVER_LETTERS);
      this.coverLetters = storedCL ? JSON.parse(storedCL) : [];

      this.geminiApiKey = localStorage.getItem(STORAGE_KEYS.GEMINI_KEY) || '';
      this.geminiModel = localStorage.getItem(STORAGE_KEYS.GEMINI_MODEL) || 'gemini-2.0-flash';
    } catch (err) {
      console.warn('CareerOS: LocalStorage error, falling back to seed data:', err);
      this.jobs = [...SEED_JOBS];
      this.interviews = [...SEED_INTERVIEWS];
      this.learningTracks = [...SEED_DREAM_TRACKS];
      this.learningHours = 34.5;
      this.learningLogs = [];
      this.coverLetters = [];
      this.geminiModel = 'gemini-2.0-flash';
    }
  }

  saveLearningHours() {
    try {
      localStorage.setItem(STORAGE_KEYS.LEARNING_HOURS, this.learningHours.toString());
      localStorage.setItem(STORAGE_KEYS.LEARNING_LOGS, JSON.stringify(this.learningLogs));
    } catch (e) {
      console.warn('Failed to save learning hours:', e);
    }
  }

  saveCoverLetters() {
    try {
      localStorage.setItem(STORAGE_KEYS.COVER_LETTERS, JSON.stringify(this.coverLetters));
      this.updateBadges();
    } catch (e) {
      console.error('Failed to save cover letters:', e);
    }
  }

  saveJobs() {
    try {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(this.jobs));
      this.updateBadges();
    } catch (e) {
      console.error('Failed to save jobs:', e);
    }
  }

  saveInterviews() {
    try {
      localStorage.setItem(STORAGE_KEYS.INTERVIEWS, JSON.stringify(this.interviews));
      this.updateBadges();
    } catch (e) {
      console.error('Failed to save interviews:', e);
    }
  }

  saveLearning() {
    try {
      localStorage.setItem(STORAGE_KEYS.LEARNING, JSON.stringify(this.learningTracks));
    } catch (e) {
      console.error('Failed to save learning tracks:', e);
    }
  }

  /* -------------------------------------------------------------------------
     GLOBAL EVENT LISTENERS
     ------------------------------------------------------------------------- */
  bindGlobalEvents() {
    // Mode Switcher buttons
    const navToggle = document.getElementById('careerOsToggleBtn');
    const exitBtn = document.getElementById('cosExitBtn');
    const brandLink = document.getElementById('cosBrandLink');

    if (navToggle) {
      navToggle.addEventListener('click', () => this.openOverlay());
    }
    if (exitBtn) {
      exitBtn.addEventListener('click', () => this.closeOverlay());
    }
    if (brandLink) {
      brandLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeOverlay();
      });
    }

    // Keyboard shortcut (Ctrl + Shift + K)
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'K' || e.key === 'k')) {
        e.preventDefault();
        this.toggleOverlay();
      }
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('.cos-modal-backdrop.active');
        if (activeModal) {
          activeModal.classList.remove('active');
          document.body.style.overflow = '';
          return;
        }
        const overlay = document.getElementById('careerOsOverlay');
        if (overlay && overlay.classList.contains('active')) {
          this.closeOverlay();
        }
      }
    });

    // Hash navigation listener
    window.addEventListener('hashchange', () => this.checkHashRoute());

    // Tab Switching
    const tabBtns = document.querySelectorAll('#cosNavTabs .cos-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabKey = btn.dataset.tab;
        this.switchTab(tabKey);
      });
    });

    // Job Scout Portal Search filters
    const scoutRefreshBtn = document.getElementById('scoutRefreshBtn');
    if (scoutRefreshBtn) {
      scoutRefreshBtn.addEventListener('click', () => this.renderPortals());
    }

    const filterChips = document.querySelectorAll('.quick-filter-chips .filter-chip');
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.applyScoutFilter(chip.dataset.filter);
      });
    });

    // Kanban Search and Filter Events
    const kanbanSearch = document.getElementById('kanbanSearchInput');
    if (kanbanSearch) {
      kanbanSearch.addEventListener('input', (e) => {
        this.kanbanSearchQuery = e.target.value.toLowerCase().trim();
        this.renderKanban();
      });
    }

    const kanbanTierChips = document.querySelectorAll('.kanban-tier-chip');
    kanbanTierChips.forEach(chip => {
      chip.addEventListener('click', () => {
        kanbanTierChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.kanbanTierFilter = chip.dataset.tierFilter;
        this.renderKanban();
      });
    });

    // Modal Triggers
    const openAddJobModal = document.getElementById('cosOpenAddJobModalBtn');
    const kanbanAddJobBtn = document.getElementById('kanbanAddJobBtn');
    const closeJobModal = document.getElementById('cosCloseJobModalBtn');
    const cancelJobModal = document.getElementById('cosCancelJobModalBtn');
    const jobForm = document.getElementById('cosJobForm');

    if (openAddJobModal) openAddJobModal.addEventListener('click', () => this.openJobModal());
    if (kanbanAddJobBtn) kanbanAddJobBtn.addEventListener('click', () => this.openJobModal());
    if (closeJobModal) closeJobModal.addEventListener('click', () => this.closeJobModal());
    if (cancelJobModal) cancelJobModal.addEventListener('click', () => this.closeJobModal());
    if (jobForm) {
      jobForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveJobForm();
      });
    }

    // Interview Modal Triggers
    const openAddIntBtn = document.getElementById('cosOpenAddInterviewBtn');
    const closeIntModal = document.getElementById('cosCloseInterviewModalBtn');
    const cancelIntModal = document.getElementById('cosCancelInterviewModalBtn');
    const intForm = document.getElementById('cosInterviewForm');

    if (openAddIntBtn) openAddIntBtn.addEventListener('click', () => this.openInterviewModal());
    if (closeIntModal) closeIntModal.addEventListener('click', () => this.closeInterviewModal());
    if (cancelIntModal) cancelIntModal.addEventListener('click', () => this.closeInterviewModal());
    if (intForm) {
      intForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSaveInterviewForm();
      });
    }

    // ATS Matcher Controls
    const analyzeBtn = document.getElementById('cosAnalyzeJdBtn');
    const sampleJdBtn = document.getElementById('cosLoadSampleJdBtn');
    const countryTabs = document.querySelectorAll('#cosCountryTabs .country-tab-btn');
    const roleTierTabs = document.querySelectorAll('#cosRoleTierTabs .country-tab-btn');

    if (analyzeBtn) analyzeBtn.addEventListener('click', () => this.analyzeCurrentJD());
    if (sampleJdBtn) sampleJdBtn.addEventListener('click', () => this.loadSampleJD());

    countryTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        countryTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCountryFormat = btn.dataset.country;
        this.renderResume();
      });
    });

    roleTierTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        roleTierTabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentRoleTier = btn.dataset.tier;
        this.renderResume();
      });
    });

    // ATS Resume Export Actions
    const printResumeBtn = document.getElementById('cosPrintResumeBtn');
    const copyPlainAtsBtn = document.getElementById('cosCopyPlainAtsBtn');
    const downloadMDBtn = document.getElementById('cosDownloadMarkdownBtn');
    const saveVersionBtn = document.getElementById('cosSaveTailoredVersionBtn');

    if (printResumeBtn) printResumeBtn.addEventListener('click', () => window.print());
    if (copyPlainAtsBtn) copyPlainAtsBtn.addEventListener('click', () => this.copyPlainAtsResume());
    if (downloadMDBtn) downloadMDBtn.addEventListener('click', () => this.downloadResumeMarkdown());
    if (saveVersionBtn) saveVersionBtn.addEventListener('click', () => this.saveTailoredVersion());

    // Cover Letter Actions
    const generateClBtn = document.getElementById('clGenerateBtn');
    const copyClBtn = document.getElementById('cosCopyCoverLetterBtn');
    const printClBtn = document.getElementById('cosPrintCoverLetterBtn');
    const downloadClMdBtn = document.getElementById('cosDownloadCoverLetterMdBtn');
    const saveClVersionBtn = document.getElementById('cosSaveCoverLetterVersionBtn');
    const viewSavedClBtn = document.getElementById('cosViewSavedCoverLettersBtn');
    const closeSavedClBtn = document.getElementById('cosCloseCoverLettersModalBtn');
    const closeSavedClBtn2 = document.getElementById('cosCloseCoverLettersModalBtn2');

    if (generateClBtn) generateClBtn.addEventListener('click', () => this.generateCoverLetter());
    if (copyClBtn) copyClBtn.addEventListener('click', () => this.copyCoverLetter());
    if (printClBtn) printClBtn.addEventListener('click', () => window.print());
    if (downloadClMdBtn) downloadClMdBtn.addEventListener('click', () => this.downloadCoverLetterMarkdown());
    if (saveClVersionBtn) saveClVersionBtn.addEventListener('click', () => this.saveCoverLetterVersion());
    if (viewSavedClBtn) viewSavedClBtn.addEventListener('click', () => this.openSavedCoverLettersModal());
    if (closeSavedClBtn) closeSavedClBtn.addEventListener('click', () => this.closeSavedCoverLettersModal());
    if (closeSavedClBtn2) closeSavedClBtn2.addEventListener('click', () => this.closeSavedCoverLettersModal());

    // Cover Letter Inputs & Live Interactivity
    const clImportJobSelect = document.getElementById('clImportJobSelect');
    if (clImportJobSelect) {
      clImportJobSelect.addEventListener('change', (e) => {
        if (e.target.value) {
          this.importJobToCoverLetter(e.target.value);
        }
      });
    }

    const clRoleTierBtns = document.querySelectorAll('#clRoleTierTabs .country-tab-btn');
    clRoleTierBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        clRoleTierBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentCoverLetterTier = btn.dataset.cltier;
        this.generateCoverLetter();
      });
    });

    const clToneSelector = document.getElementById('clToneSelector');
    if (clToneSelector) {
      clToneSelector.addEventListener('change', () => this.generateCoverLetter());
    }

    ['clSpotlightHighScale', 'clSpotlightEs', 'clSpotlightEnterprise', 'clSpotlightK8s'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', () => this.generateCoverLetter());
    });

    ['clTargetCompany', 'clTargetRole', 'clHiringManager'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => this.generateCoverLetter());
    });

    // Settings & Gemini API Key
    const saveApiKeyBtn = document.getElementById('cosSaveApiKeyBtn');
    const clearApiKeyBtn = document.getElementById('cosClearApiKeyBtn');
    const toggleKeyBtn = document.getElementById('cosToggleApiKeyVisibilityBtn');
    const exportAllBtn = document.getElementById('cosExportAllDataBtn');
    const quickExportBtn = document.getElementById('cosQuickExportBtn');
    const importAllBtn = document.getElementById('cosImportAllDataBtn');
    const quickImportBtn = document.getElementById('cosQuickImportBtn');
    const backupFileInput = document.getElementById('cosBackupFileInput');
    const resetSampleBtn = document.getElementById('cosResetSampleDataBtn');

    if (saveApiKeyBtn) saveApiKeyBtn.addEventListener('click', () => this.handleSaveApiKey());
    if (clearApiKeyBtn) clearApiKeyBtn.addEventListener('click', () => this.handleClearApiKey());
    if (toggleKeyBtn) toggleKeyBtn.addEventListener('click', () => this.toggleApiKeyVisibility());
    if (exportAllBtn) exportAllBtn.addEventListener('click', () => this.exportBackupJSON());
    if (quickExportBtn) quickExportBtn.addEventListener('click', () => this.exportBackupJSON());
    if (importAllBtn) importAllBtn.addEventListener('click', () => backupFileInput.click());
    if (quickImportBtn) quickImportBtn.addEventListener('click', () => backupFileInput.click());
    if (backupFileInput) backupFileInput.addEventListener('change', (e) => this.handleImportBackup(e));
    if (resetSampleBtn) resetSampleBtn.addEventListener('click', () => this.resetSampleData());

    // Day 5 AI Features: Cover Letter Personalizer
    const clAiBtn = document.getElementById('clAiPersonalizeBtn');
    if (clAiBtn) clAiBtn.addEventListener('click', () => this.handleAiCoverLetterSynthesis());

    // Day 5 AI Features: Bullet Point Rewriter Modal
    const aiRewriteBtn = document.getElementById('cosAiRewriteBtn');
    const closeAiBulletBtn = document.getElementById('cosCloseAiBulletModalBtn');
    const closeAiBulletBtn2 = document.getElementById('cosCloseAiBulletModalBtn2');
    const runAiBulletBtn = document.getElementById('cosRunAiBulletRewriteBtn');
    const resetAiBulletBtn = document.getElementById('cosResetAiBulletDefaultsBtn');

    if (aiRewriteBtn) aiRewriteBtn.addEventListener('click', () => this.openAiBulletModal());
    if (closeAiBulletBtn) closeAiBulletBtn.addEventListener('click', () => this.closeAiBulletModal());
    if (closeAiBulletBtn2) closeAiBulletBtn2.addEventListener('click', () => this.closeAiBulletModal());
    if (runAiBulletBtn) runAiBulletBtn.addEventListener('click', () => this.handleRunAiBulletRewrite());
    if (resetAiBulletBtn) resetAiBulletBtn.addEventListener('click', () => this.resetAiBulletModalDefaults());

    // Day 5 AI Features: Interview Simulation & Coach Modal
    const openAiIntBtn = document.getElementById('cosOpenAiInterviewCoachBtn');
    const closeAiIntBtn = document.getElementById('cosCloseAiInterviewModalBtn');
    const closeAiIntBtn2 = document.getElementById('cosCloseAiInterviewModalBtn2');
    const runAiIntBtn = document.getElementById('cosRunAiInterviewSimBtn');
    const copyAiIntBtn = document.getElementById('cosCopyAiInterviewBriefBtn');

    if (openAiIntBtn) openAiIntBtn.addEventListener('click', () => this.openAiInterviewModal());
    if (closeAiIntBtn) closeAiIntBtn.addEventListener('click', () => this.closeAiInterviewModal());
    if (closeAiIntBtn2) closeAiIntBtn2.addEventListener('click', () => this.closeAiInterviewModal());
    if (runAiIntBtn) runAiIntBtn.addEventListener('click', () => this.handleRunAiInterviewSim());
    if (copyAiIntBtn) copyAiIntBtn.addEventListener('click', () => this.handleCopyAiInterviewBrief());

    // Day 6: Calendar Navigation & Date Filter
    const calPrevBtn = document.getElementById('calPrevMonthBtn');
    const calNextBtn = document.getElementById('calNextMonthBtn');
    const calTitle = document.getElementById('calMonthTitle');
    const calClearFilterBtn = document.getElementById('cosClearCalendarFilterBtn');

    if (calPrevBtn) calPrevBtn.addEventListener('click', () => {
      this.calendarMonthOffset--;
      this.renderCalendar();
    });
    if (calNextBtn) calNextBtn.addEventListener('click', () => {
      this.calendarMonthOffset++;
      this.renderCalendar();
    });
    if (calTitle) calTitle.addEventListener('click', () => {
      this.calendarMonthOffset = 0;
      this.selectedCalendarDate = null;
      this.renderCalendar();
    });
    if (calClearFilterBtn) calClearFilterBtn.addEventListener('click', () => {
      this.selectedCalendarDate = null;
      this.renderCalendar();
    });

    // Day 6: Dynamic Live Timezone Converter in Interview Form
    const intDtInput = document.getElementById('cosIntDateTime');
    const intTzSelect = document.getElementById('cosIntTimezone');
    if (intDtInput) intDtInput.addEventListener('input', () => this.updateConvertedTimePreview());
    if (intTzSelect) intTzSelect.addEventListener('change', () => this.updateConvertedTimePreview());

    // Day 6: Study Hours & Learning Modals
    const openLogHoursBtn = document.getElementById('cosOpenLogHoursBtn');
    const closeLogHoursBtn = document.getElementById('cosCloseLogHoursModalBtn');
    const cancelLogHoursBtn = document.getElementById('cosCancelLogHoursModalBtn');
    const logHoursForm = document.getElementById('cosLogHoursForm');

    if (openLogHoursBtn) openLogHoursBtn.addEventListener('click', () => this.openLogHoursModal());
    if (closeLogHoursBtn) closeLogHoursBtn.addEventListener('click', () => this.closeLogHoursModal());
    if (cancelLogHoursBtn) cancelLogHoursBtn.addEventListener('click', () => this.closeLogHoursModal());
    if (logHoursForm) logHoursForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSaveLogHours();
    });

    // Day 6: Add Track Modal
    const openAddTrackBtn = document.getElementById('cosOpenAddTrackBtn');
    const closeAddTrackBtn = document.getElementById('cosCloseAddTrackModalBtn');
    const cancelAddTrackBtn = document.getElementById('cosCancelAddTrackModalBtn');
    const addTrackForm = document.getElementById('cosAddTrackForm');

    if (openAddTrackBtn) openAddTrackBtn.addEventListener('click', () => this.openAddTrackModal());
    if (closeAddTrackBtn) closeAddTrackBtn.addEventListener('click', () => this.closeAddTrackModal());
    if (cancelAddTrackBtn) cancelAddTrackBtn.addEventListener('click', () => this.closeAddTrackModal());
    if (addTrackForm) addTrackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSaveAddTrack();
    });

    // Day 6: Add Sprint Task Modal
    const closeAddSprintTaskBtn = document.getElementById('cosCloseAddSprintTaskModalBtn');
    const cancelAddSprintTaskBtn = document.getElementById('cosCancelAddSprintTaskModalBtn');
    const addSprintTaskForm = document.getElementById('cosAddSprintTaskForm');

    if (closeAddSprintTaskBtn) closeAddSprintTaskBtn.addEventListener('click', () => this.closeAddSprintTaskModal());
    if (cancelAddSprintTaskBtn) cancelAddSprintTaskBtn.addEventListener('click', () => this.closeAddSprintTaskModal());
    if (addSprintTaskForm) addSprintTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSaveSprintTask();
    });
  }

  /* -------------------------------------------------------------------------
     ROUTING & OVERLAY TOGGLE
     ------------------------------------------------------------------------- */
  checkHashRoute() {
    if (window.location.hash === '#careeros') {
      this.openOverlay();
    }
  }

  openOverlay() {
    const overlay = document.getElementById('careerOsOverlay');
    if (overlay) {
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (window.location.hash !== '#careeros') {
        window.history.pushState(null, '', '#careeros');
      }
      this.showToast('⚡ CareerOS Command Center Activated!');
    }
  }

  closeOverlay() {
    const overlay = document.getElementById('careerOsOverlay');
    if (overlay) {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      if (window.location.hash === '#careeros') {
        window.history.pushState(null, '', window.location.pathname);
      }
      this.showToast('Returned to Public Portfolio');
    }
  }

  toggleOverlay() {
    const overlay = document.getElementById('careerOsOverlay');
    if (overlay && overlay.classList.contains('active')) {
      this.closeOverlay();
    } else {
      this.openOverlay();
    }
  }

  switchTab(tabKey) {
    this.activeTab = tabKey;
    const tabBtns = document.querySelectorAll('#cosNavTabs .cos-tab-btn');
    const tabPanes = document.querySelectorAll('.cos-tab-pane');

    tabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabKey);
    });

    tabPanes.forEach(pane => {
      pane.classList.remove('active');
    });

    const targetPaneId = `cosTab${tabKey.charAt(0).toUpperCase() + tabKey.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase())}`;
    const targetPane = document.getElementById(targetPaneId);
    if (targetPane) {
      targetPane.classList.add('active');
    }

    // Tab specific refreshes
    if (tabKey === 'pipeline') this.renderKanban();
    if (tabKey === 'resume') this.renderResume();
    if (tabKey === 'cover-letter') {
      this.populateCoverLetterJobSelect();
      this.generateCoverLetter();
    }
    if (tabKey === 'calendar') this.renderCalendar();
    if (tabKey === 'learning') this.renderLearning();
    if (tabKey === 'settings') this.renderSettings();
  }

  updateBadges() {
    const pipelineBadge = document.getElementById('cosPipelineBadge');
    const interviewsBadge = document.getElementById('cosInterviewsBadge');
    const clCountBadge = document.getElementById('cosCoverLetterSavedCount');

    if (pipelineBadge) pipelineBadge.textContent = this.jobs.length;
    if (interviewsBadge) interviewsBadge.textContent = this.interviews.length;
    if (clCountBadge) clCountBadge.textContent = this.coverLetters.length;
  }

  /* -------------------------------------------------------------------------
     RENDER ALL MODULES
     ------------------------------------------------------------------------- */
  renderAll() {
    this.renderPortals();
    this.renderKanban();
    this.renderResume();
    this.generateCoverLetter();
    this.renderCalendar();
    this.renderLearning();
    this.renderSettings();
    this.updateBadges();
  }

  /* -------------------------------------------------------------------------
     MODULE 1: JOB SCOUT LAUNCHER
     ------------------------------------------------------------------------- */
  renderPortals() {
    const grid = document.getElementById('cosPortalsGrid');
    if (!grid) return;

    const titlesInput = document.getElementById('scoutTargetTitles')?.value || 'Technical Lead, Systems Architect';
    const locInput = document.getElementById('scoutLocations')?.value || 'Remote';

    const cleanTitle = encodeURIComponent(titlesInput.split(',')[0].trim());
    const cleanAllTitles = encodeURIComponent(`"Technical Lead" OR "Systems Architect" OR "Staff Engineer" OR "Full Stack Lead"`);
    const cleanLocation = encodeURIComponent(locInput.split(',')[0].trim());

    const PORTALS = [
      {
        name: 'LinkedIn Worldwide',
        icon: '💼',
        type: 'Global Corporate & Remote',
        desc: 'Pre-filtered search with Boolean logic for senior architecture and engineering leadership roles.',
        query: `keywords=${cleanAllTitles}&location=Remote`,
        url: `https://www.linkedin.com/jobs/search/?keywords=${cleanAllTitles}&f_WT=2`
      },
      {
        name: 'Wellfound (AngelList)',
        icon: '🚀',
        type: 'Top VC Startups (US & EU)',
        desc: 'High-growth Series A-D global tech companies offering high equity and senior architect positions.',
        query: `roles=technical-lead&types=remote`,
        url: `https://wellfound.com/jobs?roles[]=Engineering+Management&roles[]=Software+Engineer`
      },
      {
        name: 'RemoteOK',
        icon: '🌐',
        type: '100% Remote Global',
        desc: 'Curated international high-paying remote roles with USD/EUR salaries open to global talent.',
        query: `tag=lead+architect+backend`,
        url: `https://remoteok.com/remote-lead-jobs`
      },
      {
        name: 'WeWorkRemotely',
        icon: '🏖️',
        type: 'Worldwide Remote',
        desc: 'The largest remote work community for senior full-stack and systems architects.',
        query: `category=dev&term=lead`,
        url: `https://weworkremotely.com/categories/remote-full-stack-programming-jobs`
      },
      {
        name: 'Otta / Welcome to the Jungle',
        icon: '🎯',
        type: 'UK & Europe Curated',
        desc: 'Curated tech opportunities with transparent salary brackets across London, Berlin, Amsterdam & Paris.',
        query: `seniority=lead&location=europe`,
        url: `https://app.otta.com`
      },
      {
        name: 'Indeed Global Tech',
        icon: '🔎',
        type: 'Enterprise & Regional',
        desc: 'Aggregated postings for USA, Canada, UK, Australia, and Singapore tech employers.',
        query: `q=Technical+Lead+Systems+Architect`,
        url: `https://www.indeed.com/jobs?q=Technical+Lead+Architect&l=Remote`
      },
      {
        name: 'Google Jobs Engine',
        icon: '⚡',
        type: 'Global Aggregate Index',
        desc: 'Direct crawl of company career pages indexed by Google Search algorithms.',
        query: `Technical Lead Systems Architect remote jobs`,
        url: `https://www.google.com/search?q=Technical+Lead+Systems+Architect+remote+jobs&ibp=htl;jobs`
      },
      {
        name: 'GulfTalent & Bayt (UAE)',
        icon: '🇦🇪',
        type: 'Dubai & Abu Dhabi Tech',
        desc: 'High-compensation, tax-free executive engineering and technical lead positions in the UAE.',
        query: `Technical Lead UAE Dubai`,
        url: `https://www.gulftalent.com/uae/jobs/title/technical-lead`
      }
    ];

    grid.innerHTML = PORTALS.map(p => `
      <div class="portal-card">
        <div>
          <div class="portal-top">
            <div class="portal-icon">${p.icon}</div>
            <div>
              <div class="portal-name">${p.name}</div>
              <span class="portal-type-badge">${p.type}</span>
            </div>
          </div>
          <div class="portal-desc">${p.desc}</div>
          <div class="portal-query-preview">Query: ${p.query}</div>
        </div>
        <div style="display:flex; gap:0.4rem; align-items:center;">
          <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="portal-action-btn" style="flex:1;">
            <span>Search on ${p.name.split(' ')[0]}</span>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </a>
          <button class="cos-btn-icon copy-portal-link-btn" data-url="${encodeURIComponent(p.url)}" title="Copy Search Link">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
          </button>
          <button class="cos-btn-icon track-portal-role-btn" data-portal="${p.name.split(' ')[0]}" data-url="${encodeURIComponent(p.url)}" title="Track Job From This Portal">
            ➕
          </button>
        </div>
      </div>
    `).join('');

    // Attach Portal actions
    grid.querySelectorAll('.copy-portal-link-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = decodeURIComponent(btn.dataset.url);
        navigator.clipboard.writeText(url).then(() => {
          this.showToast('Copied search URL to clipboard!');
        });
      });
    });

    grid.querySelectorAll('.track-portal-role-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const portal = btn.dataset.portal;
        const url = decodeURIComponent(btn.dataset.url);
        this.openJobModal();
        const urlInput = document.getElementById('cosJobFormUrl');
        const notesInput = document.getElementById('cosJobFormNotes');
        if (urlInput) urlInput.value = url;
        if (notesInput) notesInput.value = `Discovered on ${portal}. Target role matching 10-year tech lead profile.`;
      });
    });
  }

  applyScoutFilter(filterKey) {
    const titlesInput = document.getElementById('scoutTargetTitles');
    const locInput = document.getElementById('scoutLocations');

    if (filterKey === 'us-remote') {
      if (locInput) locInput.value = 'Remote (USA & Canada)';
      if (titlesInput) titlesInput.value = 'Technical Lead, Systems Architect, Staff Engineer';
    } else if (filterKey === 'uk-eu') {
      if (locInput) locInput.value = 'UK, Europe, London, Berlin (Remote/Relocation)';
      if (titlesInput) titlesInput.value = 'Technical Lead, Senior Architect, Full Stack Lead';
    } else if (filterKey === 'uae') {
      if (locInput) locInput.value = 'Dubai, Abu Dhabi, United Arab Emirates';
      if (titlesInput) titlesInput.value = 'Engineering Lead, Technical Lead, Systems Architect';
    } else if (filterKey === 'apac') {
      if (locInput) locInput.value = 'Australia, Singapore, Sydney, Melbourne (Remote/Relocation)';
      if (titlesInput) titlesInput.value = 'Principal Engineer, Lead Developer, Systems Architect';
    } else if (filterKey === 'systems-arch') {
      if (titlesInput) titlesInput.value = 'Systems Architect, Backend Lead, Microservices Architect';
    } else if (filterKey === 'react-node') {
      if (titlesInput) titlesInput.value = 'Lead Full Stack Engineer, React Node Architect';
    } else {
      if (locInput) locInput.value = 'Remote, USA, Canada, Europe, UK, UAE, Australia, Singapore';
      if (titlesInput) titlesInput.value = 'Technical Lead, Systems Architect, Staff Software Engineer';
    }

    this.renderPortals();
    this.showToast(`Applied preset: ${filterKey.toUpperCase()}`);
  }

  /* -------------------------------------------------------------------------
     MODULE 2: KANBAN PIPELINE (WITH HTML5 DRAG & DROP + SEARCH + METRICS)
     ------------------------------------------------------------------------- */
  calculatePipelineMetrics() {
    const totalEl = document.getElementById('metricTotalJobs');
    const activeEl = document.getElementById('metricActiveRounds');
    const offersEl = document.getElementById('metricOffers');
    const avgAtsEl = document.getElementById('metricAvgAts');

    const total = this.jobs.length;
    const active = this.jobs.filter(j => j.stage === 'screening' || j.stage === 'technical').length;
    const offers = this.jobs.filter(j => j.stage === 'final' || j.stage === 'offer').length;

    let totalScore = 0;
    let scoredCount = 0;
    this.jobs.forEach(j => {
      if (j.atsMatchScore) {
        totalScore += j.atsMatchScore;
        scoredCount++;
      }
    });
    const avgScore = scoredCount > 0 ? Math.round(totalScore / scoredCount) : 94;

    if (totalEl) totalEl.textContent = total;
    if (activeEl) activeEl.textContent = active;
    if (offersEl) offersEl.textContent = offers;
    if (avgAtsEl) avgAtsEl.textContent = `${avgScore}%`;
  }

  renderKanban() {
    const board = document.getElementById('cosKanbanBoard');
    if (!board) return;

    this.calculatePipelineMetrics();

    const STAGES = [
      { id: 'wishlist', label: 'Wishlist / Scouted', color: '#94a3b8' },
      { id: 'applied', label: 'Applied', color: '#38bdf8' },
      { id: 'screening', label: 'Recruiter Screening', color: '#6366f1' },
      { id: 'technical', label: 'Technical Assessment', color: '#f59e0b' },
      { id: 'final', label: 'System Design / Final', color: '#a855f7' },
      { id: 'offer', label: 'Offer Received', color: '#10b981' }
    ];

    // Filter jobs by search and tier
    let filteredJobs = this.jobs;
    if (this.kanbanSearchQuery) {
      filteredJobs = filteredJobs.filter(j =>
        j.company.toLowerCase().includes(this.kanbanSearchQuery) ||
        j.title.toLowerCase().includes(this.kanbanSearchQuery) ||
        (j.notes && j.notes.toLowerCase().includes(this.kanbanSearchQuery)) ||
        (j.country && j.country.toLowerCase().includes(this.kanbanSearchQuery))
      );
    }

    if (this.kanbanTierFilter && this.kanbanTierFilter !== 'all') {
      filteredJobs = filteredJobs.filter(j => j.roleTier === this.kanbanTierFilter);
    }

    board.innerHTML = STAGES.map(stage => {
      const stageJobs = filteredJobs.filter(j => j.stage === stage.id);
      return `
        <div class="kanban-column" data-stage="${stage.id}">
          <div class="kanban-column-header">
            <div class="kanban-col-title-wrap">
              <span class="kanban-col-indicator" style="background:${stage.color};"></span>
              <span class="kanban-col-title">${stage.label}</span>
            </div>
            <span class="kanban-col-count">${stageJobs.length}</span>
          </div>

          <div class="kanban-cards-list" data-stage="${stage.id}">
            ${stageJobs.length === 0 ? `
              <div style="font-size:0.75rem; color:var(--text-muted); text-align:center; padding:1.5rem 0.5rem; font-style:italic;">
                ${this.kanbanSearchQuery ? 'No matching applications' : 'No applications in this stage'}
              </div>
            ` : stageJobs.map(job => this.renderKanbanCard(job, STAGES)).join('')}
          </div>
        </div>
      `;
    }).join('');

    // Attach card event listeners (move, delete, edit, schedule, tailor)
    board.querySelectorAll('.move-job-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const jobId = btn.dataset.jobId;
        const targetStage = btn.dataset.targetStage;
        this.moveJobStage(jobId, targetStage);
      });
    });

    board.querySelectorAll('.delete-job-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const jobId = btn.dataset.jobId;
        this.deleteJob(jobId);
      });
    });

    board.querySelectorAll('.edit-job-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const jobId = btn.dataset.jobId;
        this.openJobModal(jobId);
      });
    });

    board.querySelectorAll('.schedule-int-shortcut-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const company = btn.dataset.company;
        const role = btn.dataset.role;
        this.openInterviewModal();
        const compInput = document.getElementById('cosIntCompany');
        const roleInput = document.getElementById('cosIntRole');
        if (compInput) compInput.value = company;
        if (roleInput) roleInput.value = role;
      });
    });

    board.querySelectorAll('.tailor-cv-shortcut-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const jobId = btn.dataset.jobId;
        const job = this.jobs.find(j => j.id === jobId);
        if (job) {
          this.switchTab('resume');
          if (job.roleTier) {
            this.currentRoleTier = job.roleTier;
            document.querySelectorAll('#cosRoleTierTabs .country-tab-btn').forEach(b => {
              b.classList.toggle('active', b.dataset.tier === job.roleTier);
            });
          }
          if (job.country) {
            const countryMap = { US: 'us', CA: 'us', UK: 'eu', EU: 'eu', UAE: 'uae', AU: 'apac', NZ: 'apac', SG: 'apac' };
            const matchedFormat = countryMap[job.country] || 'us';
            this.currentCountryFormat = matchedFormat;
            document.querySelectorAll('#cosCountryTabs .country-tab-btn').forEach(b => {
              b.classList.toggle('active', b.dataset.country === matchedFormat);
            });
          }
          const jdInput = document.getElementById('cosJdInput');
          if (jdInput && job.jobDescriptionText) {
            jdInput.value = job.jobDescriptionText;
            this.analyzeCurrentJD();
          } else {
            this.renderResume();
          }
          this.showToast(`Resume tailored for ${job.company}!`);
        }
      });
    });

    board.querySelectorAll('.cl-gen-shortcut-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const jobId = btn.dataset.jobId;
        this.importJobToCoverLetter(jobId);
        this.switchTab('cover-letter');
      });
    });

    // Attach HTML5 Drag and Drop handlers
    this.attachKanbanDragDrop(board);
  }

  attachKanbanDragDrop(board) {
    const cards = board.querySelectorAll('.kanban-card');
    const lists = board.querySelectorAll('.kanban-cards-list');

    cards.forEach(card => {
      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', card.dataset.jobId);
        e.dataTransfer.effectAllowed = 'move';
        card.classList.add('is-dragging');
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('is-dragging');
        lists.forEach(l => l.classList.remove('drag-over'));
      });
    });

    lists.forEach(list => {
      list.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        list.classList.add('drag-over');
      });

      list.addEventListener('dragleave', (e) => {
        if (!list.contains(e.relatedTarget)) {
          list.classList.remove('drag-over');
        }
      });

      list.addEventListener('drop', (e) => {
        e.preventDefault();
        list.classList.remove('drag-over');
        const jobId = e.dataTransfer.getData('text/plain');
        const targetStage = list.dataset.stage;
        if (jobId && targetStage) {
          this.moveJobStage(jobId, targetStage);
        }
      });
    });

    this.populateCoverLetterJobSelect();
  }

  renderKanbanCard(job, stages) {
    const currentIdx = stages.findIndex(s => s.id === job.stage);
    const prevStage = currentIdx > 0 ? stages[currentIdx - 1].id : null;
    const nextStage = currentIdx < stages.length - 1 ? stages[currentIdx + 1].id : null;

    const countryFlags = {
      US: '🇺🇸', CA: '🇨🇦', UK: '🇬🇧', EU: '🇪🇺', UAE: '🇦🇪', AU: '🇦🇺', NZ: '🇳🇿', SG: '🇸🇬', IN: '🇮🇳'
    };
    const flag = countryFlags[job.country] || '🌐';

    return `
      <div class="kanban-card" data-job-id="${job.id}" draggable="true">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="kanban-card-company">${job.company} ${flag}</div>
          <span style="font-size:0.65rem; color:var(--text-muted); cursor:grab;" title="Drag to reorder/move stage">⋮⋮ Drag</span>
        </div>
        <div class="kanban-card-title">${job.title}</div>

        <div class="kanban-card-meta">
          ${job.roleTier ? `<span class="kanban-card-badge">${job.roleTier.toUpperCase()}</span>` : ''}
          ${job.atsMatchScore ? `<span class="kanban-card-badge score">${job.atsMatchScore}% ATS</span>` : ''}
          ${job.salaryRange ? `<span class="kanban-card-badge">${job.salaryRange}</span>` : ''}
        </div>

        ${job.notes ? `<p style="font-size:0.75rem; color:var(--text-secondary); margin-bottom:0.5rem; line-height:1.4;">${job.notes}</p>` : ''}

        <!-- Quick Action Shortcuts -->
        <div class="kanban-card-quick-actions">
          <button class="card-action-chip schedule-int-shortcut-btn" data-company="${job.company}" data-role="${job.title}" title="Schedule Interview Round">
            <span>🕒 Schedule</span>
          </button>
          <button class="card-action-chip tailor-cv-shortcut-btn" data-job-id="${job.id}" title="Tailor ATS Resume for this job">
            <span>🎯 Tailor CV</span>
          </button>
          <button class="card-action-chip cl-gen-shortcut-btn" data-job-id="${job.id}" title="Generate Tailored Cover Letter">
            <span>✍️ Cover Letter</span>
          </button>
          ${job.jobUrl ? `
            <a href="${job.jobUrl}" target="_blank" rel="noopener noreferrer" class="card-action-chip" title="Open Job Posting">
              <span>🔗 Link</span>
            </a>
          ` : ''}
        </div>

        <div class="kanban-card-footer">
          <span>${job.nextActionDate ? `Next: ${job.nextActionDate}` : 'In Pipeline'}</span>
          <div class="kanban-card-actions">
            ${prevStage ? `
              <button class="kanban-mini-btn move-job-btn" data-job-id="${job.id}" data-target-stage="${prevStage}" title="Move back to previous stage">
                ←
              </button>
            ` : ''}
            ${nextStage ? `
              <button class="kanban-mini-btn move-job-btn" data-job-id="${job.id}" data-target-stage="${nextStage}" title="Advance to next stage" style="color:var(--accent-cyan-light); font-weight:bold;">
                →
              </button>
            ` : ''}
            <button class="kanban-mini-btn edit-job-btn" data-job-id="${job.id}" title="Edit application">
              ✎
            </button>
            <button class="kanban-mini-btn delete-job-btn" data-job-id="${job.id}" title="Delete" style="color:#f87171;">
              ✕
            </button>
          </div>
        </div>
      </div>
    `;
  }

  moveJobStage(jobId, targetStage) {
    const job = this.jobs.find(j => j.id === jobId);
    if (job) {
      job.stage = targetStage;
      this.saveJobs();
      this.renderKanban();
      this.showToast(`Moved ${job.company} to ${targetStage.toUpperCase()}`);
    }
  }

  deleteJob(jobId) {
    const job = this.jobs.find(j => j.id === jobId);
    if (confirm(`Remove ${job?.company || 'this job'} from your pipeline?`)) {
      this.jobs = this.jobs.filter(j => j.id !== jobId);
      this.saveJobs();
      this.renderKanban();
      this.showToast('Application deleted');
    }
  }

  openJobModal(jobId = null) {
    const backdrop = document.getElementById('cosJobModalBackdrop');
    const form = document.getElementById('cosJobForm');
    const titleEl = document.getElementById('cosJobModalTitle');

    if (!backdrop || !form) return;

    form.reset();
    if (jobId) {
      const job = this.jobs.find(j => j.id === jobId);
      if (job) {
        titleEl.textContent = 'Edit Job Application';
        document.getElementById('cosJobFormId').value = job.id;
        document.getElementById('cosJobFormCompany').value = job.company;
        document.getElementById('cosJobFormTitle').value = job.title;
        document.getElementById('cosJobFormCountry').value = job.country || 'US';
        document.getElementById('cosJobFormStage').value = job.stage || 'applied';
        document.getElementById('cosJobFormSalary').value = job.salaryRange || '';
        document.getElementById('cosJobFormUrl').value = job.jobUrl || '';
        document.getElementById('cosJobFormNotes').value = job.notes || '';
      }
    } else {
      titleEl.textContent = 'Add Job Application';
      document.getElementById('cosJobFormId').value = '';
    }

    backdrop.classList.add('active');
  }

  closeJobModal() {
    const backdrop = document.getElementById('cosJobModalBackdrop');
    if (backdrop) backdrop.classList.remove('active');
  }

  handleSaveJobForm() {
    const id = document.getElementById('cosJobFormId').value;
    const company = document.getElementById('cosJobFormCompany').value;
    const title = document.getElementById('cosJobFormTitle').value;
    const country = document.getElementById('cosJobFormCountry').value;
    const stage = document.getElementById('cosJobFormStage').value;
    const salaryRange = document.getElementById('cosJobFormSalary').value;
    const jobUrl = document.getElementById('cosJobFormUrl').value;
    const notes = document.getElementById('cosJobFormNotes').value;

    if (id) {
      const job = this.jobs.find(j => j.id === id);
      if (job) {
        job.company = company;
        job.title = title;
        job.country = country;
        job.stage = stage;
        job.salaryRange = salaryRange;
        job.jobUrl = jobUrl;
        job.notes = notes;
      }
    } else {
      const newJob = {
        id: `job-${Date.now()}`,
        company,
        title,
        roleTier: 'lead',
        country,
        locationType: 'Remote',
        salaryRange,
        jobUrl,
        jobDescriptionText: '',
        atsMatchScore: 92,
        matchedKeywords: ['Leadership', 'System Architecture', 'Microservices'],
        missingKeywords: [],
        stage,
        appliedDate: new Date().toISOString().split('T')[0],
        nextActionDate: '',
        notes,
        createdAt: new Date().toISOString()
      };
      this.jobs.unshift(newJob);
    }

    this.saveJobs();
    this.closeJobModal();
    this.renderKanban();
    this.showToast(`Saved application for ${company}`);
  }

  /* -------------------------------------------------------------------------
     MODULE 3: ATS RESUME TAILORER & INTERNATIONAL FORMATTER
     ------------------------------------------------------------------------- */
  analyzeCurrentJD() {
    const jdText = document.getElementById('cosJdInput')?.value || '';
    if (!jdText.trim()) {
      this.showToast('Please paste a job description first');
      return;
    }

    // Client-side NLP token extraction with Category Mapping
    const techLexicon = [
      // Languages & Core
      { term: 'python', label: 'Python', cat: 'Languages' },
      { term: 'fastapi', label: 'FastAPI', cat: 'Languages' },
      { term: 'react', label: 'React.js', cat: 'Languages' },
      { term: 'node.js', label: 'Node.js', cat: 'Languages' },
      { term: 'node', label: 'Node.js', cat: 'Languages' },
      { term: 'typescript', label: 'TypeScript', cat: 'Languages' },
      { term: 'javascript', label: 'JavaScript (ES6+)', cat: 'Languages' },
      { term: 'java', label: 'Java', cat: 'Languages' },

      // Architecture & Systems
      { term: 'microservices', label: 'Microservices', cat: 'Architecture' },
      { term: 'distributed systems', label: 'Distributed Systems', cat: 'Architecture' },
      { term: 'async', label: 'Asynchronous I/O', cat: 'Architecture' },
      { term: 'event loop', label: 'Event-Driven', cat: 'Architecture' },
      { term: 'concurrency', label: 'High Concurrency', cat: 'Architecture' },
      { term: 'high qps', label: 'High QPS (50k+)', cat: 'Architecture' },
      { term: 'sub-second', label: 'Low Latency P99', cat: 'Architecture' },
      { term: 'caching', label: 'Redis Caching', cat: 'Architecture' },
      { term: 'system design', label: 'System Design', cat: 'Architecture' },
      { term: 'rest', label: 'RESTful APIs', cat: 'Architecture' },
      { term: 'websockets', label: 'WebSockets', cat: 'Architecture' },
      { term: 'graphql', label: 'GraphQL', cat: 'Architecture' },

      // Databases & Data
      { term: 'postgresql', label: 'PostgreSQL', cat: 'Data' },
      { term: 'mongodb', label: 'MongoDB', cat: 'Data' },
      { term: 'redis', label: 'Redis', cat: 'Data' },
      { term: 'elasticsearch', label: 'Elasticsearch', cat: 'Data' },
      { term: 'kibana', label: 'Kibana', cat: 'Data' },
      { term: 'snowflake', label: 'Snowflake', cat: 'Data' },
      { term: 'kafka', label: 'Apache Kafka', cat: 'Data' },

      // Cloud & DevOps
      { term: 'docker', label: 'Docker', cat: 'DevOps' },
      { term: 'kubernetes', label: 'Kubernetes', cat: 'DevOps' },
      { term: 'ci/cd', label: 'CI/CD Automation', cat: 'DevOps' },
      { term: 'aws', label: 'AWS', cat: 'DevOps' },
      { term: 'gcp', label: 'GCP', cat: 'DevOps' },
      { term: 'linux', label: 'Linux Systems', cat: 'DevOps' },

      // Leadership & Management
      { term: 'technical lead', label: 'Technical Leadership', cat: 'Leadership' },
      { term: 'team lead', label: 'Squad Leadership', cat: 'Leadership' },
      { term: 'mentorship', label: 'Team Mentorship', cat: 'Leadership' },
      { term: 'code reviews', label: 'Code Review Governance', cat: 'Leadership' },
      { term: 'agile', label: 'Agile/Scrum Delivery', cat: 'Leadership' }
    ];

    const jdLower = jdText.toLowerCase();
    const matched = [];
    const missing = [];

    // Candidate's known core skill set (lowercased)
    const profileSkills = ProfileStore.getSkills().map(s => s.name.toLowerCase());
    profileSkills.push('microservices', 'distributed systems', 'system design', 'mentorship', 'team lead', 'technical lead', 'agile', 'fastapi', ...this.customInjectedKeywords.map(k => k.toLowerCase()));

    techLexicon.forEach(item => {
      if (jdLower.includes(item.term)) {
        const isKnown = profileSkills.some(s => s.includes(item.term) || item.term.includes(s));
        if (isKnown || this.customInjectedKeywords.includes(item.label)) {
          if (!matched.some(m => m.label === item.label)) matched.push(item);
        } else {
          if (!missing.some(m => m.label === item.label)) missing.push(item);
        }
      }
    });

    // Score calculation formula
    const totalFound = matched.length + missing.length;
    let score = totalFound > 0 ? Math.round((matched.length / totalFound) * 100) : 88;
    score = Math.max(score, 78); // Strong baseline for calibrated profiles

    // Update UI elements
    const dial = document.getElementById('cosScoreDial');
    const num = document.getElementById('cosScoreNumber');
    const title = document.getElementById('cosScoreTitle');
    const hint = document.getElementById('cosScoreHint');
    const matchedWrap = document.getElementById('cosMatchedKeywordsWrap');
    const missingWrap = document.getElementById('cosMissingKeywordsWrap');
    const matchedCount = document.getElementById('cosMatchedCount');
    const missingCount = document.getElementById('cosMissingCount');

    if (dial) dial.style.setProperty('--score-pct', `${score}%`);
    if (num) num.textContent = `${score}%`;
    if (title) title.textContent = score >= 90 ? 'Outstanding ATS Screening Score' : 'Solid Keyword Fit';
    if (hint) hint.textContent = `${matched.length} core competencies matched. Click any missing keyword below to inject it into your resume.`;

    if (matchedCount) matchedCount.textContent = matched.length;
    if (missingCount) missingCount.textContent = missing.length;

    if (matchedWrap) {
      matchedWrap.innerHTML = matched.map(m => `<span class="kw-chip matched" title="Category: ${m.cat}">✓ ${m.label}</span>`).join('');
    }
    if (missingWrap) {
      missingWrap.innerHTML = missing.length > 0
        ? missing.map(m => `<span class="kw-chip missing inject-kw-chip" data-kw="${m.label}" title="Click to inject into resume">+ ${m.label} (Click to Inject)</span>`).join('')
        : '<span style="font-size:0.75rem; color:#34d399;">All core technical keywords matched!</span>';

      missingWrap.querySelectorAll('.inject-kw-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const kw = chip.dataset.kw;
          this.injectKeywordToResume(kw);
        });
      });
    }

    this.renderResume();
    this.showToast(`ATS Match Score: ${score}%! Resume adapted.`);
  }

  injectKeywordToResume(keywordLabel) {
    if (!this.customInjectedKeywords.includes(keywordLabel)) {
      this.customInjectedKeywords.push(keywordLabel);
      this.analyzeCurrentJD();
      this.renderResume();
      this.showToast(`✨ Injected "${keywordLabel}" into your active tailored CV!`);
    }
  }

  saveTailoredVersion() {
    const preview = document.getElementById('resumePreviewPanel');
    if (!preview) return;

    const versionItem = {
      id: `cv-version-${Date.now()}`,
      countryFormat: this.currentCountryFormat,
      roleTier: this.currentRoleTier,
      savedAt: new Date().toISOString(),
      score: document.getElementById('cosScoreNumber')?.textContent || '92%',
      injectedKeywords: [...this.customInjectedKeywords]
    };

    try {
      const stored = localStorage.getItem('cos_saved_resumes_v1');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(versionItem);
      localStorage.setItem('cos_saved_resumes_v1', JSON.stringify(list));
      this.showToast(`💾 Saved CV Version for ${this.currentRoleTier.toUpperCase()} (${this.currentCountryFormat.toUpperCase()})!`);
    } catch (e) {
      console.error('Failed to save CV version:', e);
      this.showToast('Saved CV Version locally!');
    }
  }

  loadSampleJD() {
    const sample = `
Role: Staff Distributed Systems Engineer / Technical Lead
Location: Remote (US / Europe / Global)
About the Role:
We are seeking an experienced Technical Lead / Staff Software Engineer with 8-10+ years of experience to lead our distributed core backend infrastructure. You will architect high-scale microservices using Node.js, Python, and TypeScript with PostgreSQL and Redis.
Requirements:
- Proven experience designing distributed systems with sub-second P99 latencies and high QPS.
- Expertise in asynchronous Node.js, TypeScript, or high-performance Python / FastAPI.
- Deep background in PostgreSQL, Elasticsearch distributed search indexing, and Redis caching.
- Strong track record of engineering leadership, team mentorship, code reviews, and CI/CD pipelines.
- Experience with Docker, Kubernetes, and cloud-native containerization.
    `.trim();

    const input = document.getElementById('cosJdInput');
    if (input) {
      input.value = sample;
      this.analyzeCurrentJD();
    }
  }

  renderResume() {
    const preview = document.getElementById('resumePreviewPanel');
    if (!preview) return;

    const format = this.currentCountryFormat; // 'us' | 'eu' | 'uae' | 'apac'
    const tier = this.currentRoleTier;        // 'lead' | 'staff' | 'senior'

    // Multi-Tier Role Calibration: Title, Summary, Bullets & Skills
    let roleTitle = 'Technical Lead & Systems Architect';
    let summaryText = `Accomplished Technical Lead and Systems Architect with 10 years of software engineering craftsmanship. Specialized in building resilient, high-throughput microservices using <strong>Node.js, Python, TypeScript, React.js, and Elasticsearch</strong>. Proven track record leading multi-disciplinary engineering squads (15+ developers) at Rapidops and delivering enterprise-grade consulting solutions at Infosys. Deep expertise eliminating performance bottlenecks, optimizing P99 query latencies (sub-25ms), and architecting scalable cloud-native platforms.`;

    let rapidopsBullets = [
      `<strong>Accomplished 50,000 QPS throughput with sub-25ms P99 latency</strong> by architecting an asynchronous microservices engine in Node.js, Python FastAPI, and Redis.`,
      `<strong>Boosted engineering squad sprint velocity by 30%</strong> by mentoring 15+ software developers in design patterns, clean code architecture, and automated unit/integration testing.`,
      `<strong>Eliminated single-point bottlenecks and sustained 99.9% uptime</strong> by engineering decoupled, containerized microservices on Docker & Kubernetes with automated CI/CD pipelines.`,
      `<strong>Reduced log query discovery time by 70% across 10M+ records</strong> by deploying distributed Elasticsearch indexing clusters and Kibana observability boards.`
    ];

    let infosysBullets = [
      `<strong>Delivered enterprise web platform modernization for Fortune 500 clients</strong> leveraging modular React.js, Redux state pipelines, and high-performance Node.js APIs.`,
      `<strong>Reduced frontend rendering bottlenecks by 40%</strong> across data-intensive financial dashboards by implementing virtualized lists and memoized component architectures.`,
      `<strong>Partnered with cross-functional architecture committees</strong> to author technical design specifications, enforce REST API standards, and integrate enterprise third-party gateways.`
    ];

    let project1Bullets = [
      `Engineered an asynchronous microservices concurrency engine in Node.js and FastAPI with Redis caching, cutting compute overhead by 45% and sustaining 50,000 QPS under peak traffic.`
    ];
    let project2Bullets = [
      `Built interactive data exploration dashboards visualizing over 10 million log records in sub-second queries using custom Elasticsearch index templates.`
    ];

    let competencyEmphasis = `
      <div><strong>Core Languages:</strong> JavaScript (ES6+), TypeScript, Python, HTML5/CSS3, Java (Working Knowledge)</div>
      <div><strong>Backend & Systems:</strong> FastAPI, Node.js, Express, Microservices Architecture, RESTful APIs, WebSockets</div>
      <div><strong>Frontend & UI:</strong> React.js, Next.js, Redux, D3.js, Cytoscape.js, Modern CSS3/HTML5</div>
      <div><strong>Databases & Search:</strong> Elasticsearch, Kibana, PostgreSQL, MongoDB, Redis Caching, Snowflake</div>
      <div><strong>Cloud & DevOps:</strong> Docker, Kubernetes, CI/CD Automation, Git, Linux Systems</div>
      <div><strong>Engineering Leadership:</strong> Squad Mentorship (15+ devs), Agile/Scrum, Code Review Governance, Sprint Delivery</div>
    `;

    if (tier === 'staff') {
      roleTitle = 'Staff Software Engineer / Distributed Systems Architect';
      summaryText = `High-impact Staff Systems Architect with 10 years experience driving enterprise distributed systems strategy, architectural governance, and multi-team technical delivery. Proven multiplier leading cross-squad architecture committees, defining technical RFC roadmaps, and authoring high-throughput microservices in <strong>Node.js, TypeScript, Python (FastAPI), and Redis</strong>. Expert at architecting 50k QPS fault-tolerant systems, instituting enterprise observability frameworks, and aligning multi-year engineering strategy with executive business objectives.`;

      rapidopsBullets = [
        `<strong>Spearheaded enterprise architectural vision and technical governance across 4 engineering squads</strong>, standardizing asynchronous Node.js and FastAPI microservices handling 50,000 QPS with sub-25ms P99 latency.`,
        `<strong>Instituted company-wide architectural RFC framework and technical review board</strong>, driving 30% faster time-to-market while slashing production architectural regressions to near zero.`,
        `<strong>Mentored 15+ senior engineers and technical leads</strong> on distributed systems safety, asynchronous I/O models, and resilient system design, acting as an organizational engineering multiplier.`,
        `<strong>Architected enterprise-wide distributed observability & telemetry strategy</strong> leveraging Elasticsearch clusters indexing 10M+ daily events with real-time alerting and SLO compliance.`
      ];

      infosysBullets = [
        `<strong>Steered technical design and enterprise architectural roadmap for Fortune 500 clients</strong>, migrating legacy monolithic workloads to event-driven microservices on Node.js and React.`,
        `<strong>Authored multi-region scalability blueprints</strong> that reduced frontend latency by 40% and established enterprise data isolation compliance.`,
        `<strong>Advised C-suite and executive stakeholders</strong> on tech stack modernization, third-party vendor integrations, and cloud migration trade-offs.`
      ];

      project1Bullets = [
        `Designed enterprise-grade distributed microservices blueprint in Node.js and FastAPI adopted as the core foundation for high-throughput transactional services across the organization.`
      ];
      project2Bullets = [
        `Architected multi-tenant Big Data telemetry platform integrating Elasticsearch, Snowflake, and Kibana, delivering executive dashboards over 10M+ records.`
      ];

      competencyEmphasis = `
        <div><strong>Systems Architecture:</strong> Distributed Systems Design, Multi-Team RFCs, Event-Driven Architecture, High-Throughput Microservices</div>
        <div><strong>Core Languages:</strong> TypeScript, JavaScript (ES6+), Python, Node.js, Java</div>
        <div><strong>Distributed Data & Search:</strong> Elasticsearch (Cluster Topology), Kibana, PostgreSQL, Redis, Snowflake Big Data</div>
        <div><strong>Cloud & Reliability:</strong> Docker, Kubernetes Orchestration, Zero-Downtime Blue/Green, Observability & SLOs</div>
        <div><strong>Frontend Platforms:</strong> React.js, Next.js, Redux Architecture, D3.js Data Visualizations</div>
        <div><strong>Strategic Leadership:</strong> Cross-Squad Governance, Tech Debt Prioritization, Mentoring Senior ICs, Executive Alignment</div>
      `;
    } else if (tier === 'senior') {
      roleTitle = 'Senior Software Engineer (Systems & Full-Stack)';
      summaryText = `Accomplished Senior Software Engineer with a decade of deep hands-on code craftsmanship specializing in low-latency systems, asynchronous backend architecture, and full-stack performance optimization. Expert at solving complex algorithmic bottlenecks, building sub-25ms P99 services in <strong>Node.js, TypeScript, Python (FastAPI), React.js, and Redis</strong>, and tuning Elasticsearch pipelines for 10M+ records. Focused on zero-overhead code execution, clean architecture, automated testing, and bulletproof production stability.`;

      rapidopsBullets = [
        `<strong>Directly authored and optimized core asynchronous microservices concurrency engine in Node.js, FastAPI, and Redis</strong>, sustaining 50,000 QPS at &lt;25ms P99 latency with zero memory leaks.`,
        `<strong>Slashing backend compute and CPU overhead by 45%</strong> by refactoring blocking I/O to non-blocking event loops, asynchronous worker tasks, and connection pooling.`,
        `<strong>Built and containerized fault-tolerant production microservices</strong> with Docker and Kubernetes, configuring automated health checks, blue-green deployments, and CI/CD pipelines.`,
        `<strong>Engineered custom Elasticsearch cluster mappings, query analyzers, and bulk ingestion workers</strong> indexing 10M+ records with sub-350ms search latency.`
      ];

      infosysBullets = [
        `<strong>Authored mission-critical frontend components and high-performance Node.js APIs</strong> for Fortune 500 clients using modular React.js and Redux.`,
        `<strong>Slashing frontend DOM rendering bottlenecks by 40%</strong> across data-intensive financial grids by implementing virtualized lists, code-splitting, and memoized selectors.`,
        `<strong>Developed and maintained comprehensive automated test suites (unit, integration, E2E)</strong> achieving 90%+ code coverage across critical customer journeys.`
      ];

      project1Bullets = [
        `Hands-on implementation of asynchronous worker thread pool in Node.js with clustering and Redis caching, sustaining 50,000 QPS under rigorous load testing.`
      ];
      project2Bullets = [
        `Constructed end-to-end data ingestion and search indexing pipeline using Elasticsearch and Node.js, achieving sub-second analytics over 10M+ data points.`
      ];

      competencyEmphasis = `
        <div><strong>Core Programming:</strong> TypeScript, JavaScript (ES6+), Python (FastAPI, Asyncio), Node.js, Java</div>
        <div><strong>Performance & Systems:</strong> Concurrency Optimization, Memory Profiling, Non-blocking I/O, Sub-25ms P99 Latency</div>
        <div><strong>Frontend Engineering:</strong> React.js, Next.js, Redux Toolkit, Virtualized Rendering, Web Performance Tuning</div>
        <div><strong>Databases & Caching:</strong> Elasticsearch Query Tuning, PostgreSQL Indexing, Redis Cache-Aside, Snowflake</div>
        <div><strong>DevOps & CI/CD:</strong> Docker Containerization, Kubernetes Pods, GitHub Actions, Linux System Administration</div>
        <div><strong>Engineering Rigor:</strong> Test-Driven Development (TDD), 90%+ Code Coverage, Code Reviews, Production Debugging</div>
      `;
    }

    const info = ProfileStore.getProfileInfo();
    const isCustom = ProfileStore.isCustom();
    if (isCustom) {
      roleTitle = info.title || roleTitle;
      summaryText = info.summary || info.tagline || summaryText;
    }

    // Country specific contact line
    let contactLine = '';
    if (format === 'us') {
      // Strict US ATS: Single-column, no photo, no full street, city/country only
      contactLine = `
        <span>${this.escapeHtml(info.location || 'Remote')}</span>
        <span>•</span>
        <span>${this.escapeHtml(info.email)}</span>
        <span>•</span>
        <span>${this.escapeHtml(info.linkedin || '')}</span>
      `;
    } else if (format === 'eu') {
      // European format: Includes language proficiency & GMT/CET overlap
      contactLine = `
        <span>${this.escapeHtml(info.location || 'Remote')} • Available for UK & EU Remote (Full GMT/CET Overlap) & Relocation</span>
        <span>•</span>
        <span>${this.escapeHtml(info.email)} • ${this.escapeHtml(info.linkedin || '')}</span>
      `;
    } else if (format === 'uae') {
      // Gulf format: Highlight immediate visa/relocation readiness
      contactLine = `
        <span>${this.escapeHtml(info.location || 'Remote')} • Open to UAE / Dubai Relocation (Immediate Visa Readiness)</span>
        <span>•</span>
        <span>${this.escapeHtml(info.email)} • ${this.escapeHtml(info.linkedin || '')}</span>
      `;
    } else {
      // APAC / Australia format
      contactLine = `
        <span>${this.escapeHtml(info.location || 'Remote')} • Open to Australia / Singapore Remote & Relocation</span>
        <span>•</span>
        <span>${this.escapeHtml(info.email)} • ${this.escapeHtml(info.linkedin || '')}</span>
      `;
    }

    // Injected Keywords Tag
    const injectedBadge = this.customInjectedKeywords.length > 0
      ? `<div style="margin-top:0.35rem; font-size:0.75rem; color:#0284c7;"><strong>Target Injected Focus:</strong> ${this.customInjectedKeywords.join(', ')}</div>`
      : '';

    const experiences = ProfileStore.getExperiences();
    const exp1 = experiences[0] || { role: roleTitle, company: 'Enterprise Inc.', period: '2022 - Present' };
    const exp2 = experiences[1] || { role: 'Software Engineer', company: 'Consulting Ltd.', period: '2018 - 2022' };

    preview.innerHTML = `
      <div class="resume-header-block">
        <h1 class="resume-applicant-name">${this.escapeHtml(info.name)}</h1>
        <div class="resume-applicant-title">${this.escapeHtml(roleTitle)}</div>
        <div class="resume-contact-line">${contactLine}</div>
        ${injectedBadge}
      </div>

      <!-- Executive Summary -->
      <div class="resume-section">
        <div class="resume-section-title">Professional Summary</div>
        <p class="resume-summary-text">
          ${summaryText}
        </p>
      </div>

      <!-- Core Competencies / Technical Skills -->
      <div class="resume-section">
        <div class="resume-section-title">Core Technical Competencies</div>
        <div class="resume-skills-grid">
          ${competencyEmphasis}
        </div>
      </div>

      <!-- Experience Section -->
      <div class="resume-section">
        <div class="resume-section-title">Professional Experience</div>

        ${isCustom ? experiences.map(exp => `
          <div class="resume-exp-item">
            <div class="resume-exp-header">
              <div>
                <span class="resume-exp-role">${this.escapeHtml(exp.role)}</span> — <span class="resume-exp-company">${this.escapeHtml(exp.company)}</span>
              </div>
              <span class="resume-exp-date">${this.escapeHtml(exp.period || '')}</span>
            </div>
            <ul class="resume-bullets">
              ${(exp.bullets || exp.responsibilities || [exp.summary || '']).map(b => `<li>${this.escapeHtml(b)}</li>`).join('')}
            </ul>
          </div>
        `).join('') : `
          <!-- Rapidops -->
          <div class="resume-exp-item">
            <div class="resume-exp-header">
              <div>
                <span class="resume-exp-role">${tier === 'staff' ? 'Staff Systems Architect / Tech Lead' : (tier === 'senior' ? 'Senior Software Engineer (Systems)' : exp1.role)}</span> — <span class="resume-exp-company">${exp1.company}</span>
              </div>
              <span class="resume-exp-date">${exp1.period}</span>
            </div>
            <ul class="resume-bullets">
              ${rapidopsBullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
          </div>

          <!-- Infosys -->
          <div class="resume-exp-item">
            <div class="resume-exp-header">
              <div>
                <span class="resume-exp-role">${tier === 'staff' ? 'Lead Enterprise Architect / Consultant' : (tier === 'senior' ? 'Senior Software Engineer (Full Stack)' : exp2.role)}</span> — <span class="resume-exp-company">${exp2.company}</span>
              </div>
              <span class="resume-exp-date">${exp2.period}</span>
            </div>
            <ul class="resume-bullets">
              ${infosysBullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
          </div>
        `}
      </div>

      <!-- Key Architectural Projects -->
      <div class="resume-section">
        <div class="resume-section-title">Selected Architectural Deliverables & Impact</div>
        <div class="resume-exp-item">
          <div class="resume-exp-header">
            <div>
              <strong style="color:#0f172a;">High-Throughput Microservices Concurrency Engine</strong> (Node.js, FastAPI, PostgreSQL, Docker)
            </div>
            <span class="resume-exp-date">50k QPS | P99 &lt; 25ms</span>
          </div>
          <ul class="resume-bullets">
            ${project1Bullets.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>

        <div class="resume-exp-item">
          <div class="resume-exp-header">
            <div>
              <strong style="color:#0f172a;">Enterprise Big Data Visualization Product</strong> (Elasticsearch, Kibana, Snowflake, D3.js)
            </div>
            <span class="resume-exp-date">10M+ Records Indexed</span>
          </div>
          <ul class="resume-bullets">
            ${project2Bullets.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Education & Credentials -->
      <div class="resume-section">
        <div class="resume-section-title">Credentials, Education & Mobility</div>
        <div style="font-size:0.85rem; color:#334155; line-height:1.6;">
          <div><strong>Palantir Foundry Foundations Certified</strong> — Palantir Technologies</div>
          <div><strong>Master of Science in Information Technology (M.Sc IT)</strong> — Sarvoday College (2014 - 2016)</div>
          <div><strong>Bachelor of Computer Applications (BCA)</strong> — Sarvoday College (2011 - 2014)</div>
          ${format === 'eu' ? '<div style="margin-top:0.35rem;"><strong>Language Proficiencies (CEFR):</strong> English (Full Professional / C2), Hindi (Native / C2), Gujarati (Native / C2).</div>' : ''}
          ${format === 'uae' ? '<div style="margin-top:0.35rem;"><strong>Relocation & Visa Status:</strong> Immediate visa readiness, willing to relocate to Dubai/Abu Dhabi within standard notice period.</div>' : ''}
          ${format === 'apac' ? '<div style="margin-top:0.35rem;"><strong>References:</strong> Professional referees, verified employment credentials, and technical references available upon request.</div>' : ''}
        </div>
      </div>
    `;
  }

  copyPlainAtsResume() {
    const preview = document.getElementById('resumePreviewPanel');
    if (!preview) return;
    const text = preview.innerText;
    navigator.clipboard.writeText(text).then(() => {
      this.showToast('Copied Clean ATS Plaintext Resume!');
    });
  }

  downloadResumeMarkdown() {
    const preview = document.getElementById('resumePreviewPanel');
    if (!preview) return;

    const info = ProfileStore.getProfileInfo();
    const safeName = (info.name || 'Candidate').replace(/[^a-zA-Z0-9_-]/g, '_');
    const md = `# ${info.name} - ${this.currentRoleTier.toUpperCase()} Resume\n\n` + preview.innerText;
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeName}_Resume_${this.currentCountryFormat.toUpperCase()}.md`;
    link.click();
    URL.revokeObjectURL(url);
    this.showToast('Downloaded Markdown Resume!');
  }

  /* -------------------------------------------------------------------------
     MODULE 4: CONTEXTUAL COVER LETTER ENGINE
     ------------------------------------------------------------------------- */
  populateCoverLetterJobSelect() {
    const select = document.getElementById('clImportJobSelect');
    if (!select) return;

    const currentVal = select.value;
    select.innerHTML = '<option value="">-- Select from Active Applications --</option>' +
      this.jobs.map(j => {
        const tierTag = j.roleTier ? j.roleTier.toUpperCase() : 'LEAD';
        return `<option value="${j.id}">${j.company} — ${j.title} (${j.country} • ${tierTag})</option>`;
      }).join('');

    if (currentVal && this.jobs.some(j => j.id === currentVal)) {
      select.value = currentVal;
    }
  }

  importJobToCoverLetter(jobId) {
    const job = this.jobs.find(j => j.id === jobId);
    if (!job) return;

    const companyInput = document.getElementById('clTargetCompany');
    const roleInput = document.getElementById('clTargetRole');
    const toneSelect = document.getElementById('clToneSelector');
    const highlightsInput = document.getElementById('clCustomHighlights');
    const jobSelect = document.getElementById('clImportJobSelect');

    if (companyInput) companyInput.value = job.company || '';
    if (roleInput) roleInput.value = job.title || '';
    if (jobSelect) jobSelect.value = job.id;

    // Role Tier calibration
    if (job.roleTier) {
      this.currentCoverLetterTier = job.roleTier;
      document.querySelectorAll('#clRoleTierTabs .country-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cltier === job.roleTier);
      });
    }

    // Cultural tone mapping
    if (job.country && toneSelect) {
      const countryToneMap = {
        US: 'us',
        CA: 'us',
        UK: 'eu',
        EU: 'eu',
        UAE: 'uae',
        AU: 'apac',
        NZ: 'apac',
        SG: 'apac'
      };
      const matchedTone = countryToneMap[job.country] || 'us';
      toneSelect.value = matchedTone;
    }

    // Populate highlights with matched keywords or specific requirements
    if (highlightsInput) {
      const keywords = [];
      if (job.matchedKeywords && job.matchedKeywords.length) {
        keywords.push(...job.matchedKeywords.slice(0, 4));
      }
      if (job.notes) {
        keywords.push(job.notes);
      }
      if (keywords.length) {
        highlightsInput.value = keywords.join(', ');
      }
    }

    this.generateCoverLetter();
    this.showToast(`Imported ${job.company} into Cover Letter!`);
  }

  generateCoverLetter() {
    const paper = document.getElementById('clOutputPaper');
    if (!paper) return;

    const company = document.getElementById('clTargetCompany')?.value.trim() || 'the Hiring Organization';
    const role = document.getElementById('clTargetRole')?.value.trim() || 'Technical Lead / Systems Architect';
    const manager = document.getElementById('clHiringManager')?.value.trim() || 'Engineering Hiring Committee';
    const tone = document.getElementById('clToneSelector')?.value || 'us';
    const tier = this.currentCoverLetterTier || 'lead';
    const highlights = document.getElementById('clCustomHighlights')?.value.trim() || '';

    // Project Spotlight Checkboxes
    const spotlightHighScale = document.getElementById('clSpotlightHighScale')?.checked ?? true;
    const spotlightEs = document.getElementById('clSpotlightEs')?.checked ?? true;
    const spotlightEnterprise = document.getElementById('clSpotlightEnterprise')?.checked ?? false;
    const spotlightK8s = document.getElementById('clSpotlightK8s')?.checked ?? false;

    // Calibrated Role Title
    let senderTitle = 'Technical Lead & Systems Architect';
    if (tier === 'staff') {
      senderTitle = 'Staff Software Engineer / Distributed Systems Architect';
    } else if (tier === 'senior') {
      senderTitle = 'Senior Software Engineer (Systems & Full Stack)';
    }

    // Format Current Date
    const todayStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Opening Hook calibrated by Tone & Tier
    let openingHook = '';
    if (tone === 'eu') {
      if (tier === 'staff') {
        openingHook = `I am writing to formally submit my candidacy for the <strong>${role}</strong> position at <strong>${company}</strong>. With a decade of software engineering craftsmanship and proven experience steering distributed systems strategy, architectural governance, and multi-team technical delivery, I offer both technical rigor and diplomatic engineering leadership. Working in full alignment with UK & European business hours (GMT/CET), I am enthusiastic about partnering with your engineering squads to architect resilient platforms for the long term.`;
      } else if (tier === 'senior') {
        openingHook = `I would like to apply for the <strong>${role}</strong> opportunity with <strong>${company}</strong>. Over the past 10 years, I have dedicated my career to hands-on systems programming in Node.js, Python (FastAPI), and modern TypeScript architectures. I specialize in eliminating latency bottlenecks, ensuring high availability, and authoring clean, maintainable microservices with full GMT/CET remote overlap.`;
      } else {
        openingHook = `I am pleased to submit my application for the <strong>${role}</strong> role at <strong>${company}</strong>. Having spent the last 10 years leading multidisciplinary squads and architecting resilient microservices at Rapidops and Infosys, I bring structured engineering leadership, disciplined code governance, and a collaborative mindset ready to thrive in European engineering environments.`;
      }
    } else if (tone === 'uae') {
      if (tier === 'staff') {
        openingHook = `I am writing to express my eager interest in the <strong>${role}</strong> role at <strong>${company}</strong> in the UAE. With 10 years of enterprise systems architecture experience—delivering 50,000 QPS transaction backends and orchestrating large-scale digital platforms—I offer the strategic vision and high-throughput execution necessary to support your regional expansion. I have immediate relocation readiness for Dubai/Abu Dhabi and swift visa availability.`;
      } else if (tier === 'senior') {
        openingHook = `I am delighted to submit my application for the <strong>${role}</strong> role with <strong>${company}</strong> in the UAE. As a Senior Software Engineer with a decade of production craftsmanship in high-concurrency Node.js and Python platforms, I am eager to apply my deep algorithmic and performance-tuning skills to your mission-critical applications. I am actively preparing for relocation to the UAE and available on immediate notice.`;
      } else {
        openingHook = `I am thrilled to apply for the <strong>${role}</strong> opportunity at <strong>${company}</strong> in Dubai/UAE. Over the past decade, I have served as a Technical Lead guiding engineering teams to deliver high-scale consumer and enterprise platforms. With immediate relocation readiness, full visa availability, and proven experience scaling systems under peak regional load, I look forward to contributing directly to your growth.`;
      }
    } else if (tone === 'apac') {
      if (tier === 'staff') {
        openingHook = `I am writing to apply for the <strong>${role}</strong> position at <strong>${company}</strong>. Throughout my 10-year career across high-growth engineering environments and global consulting, I have focused on empowering engineering teams through pragmatic architectural governance, decoupled system design, and collaborative ownership. I am very keen to contribute this experience to your innovative engineering culture.`;
      } else if (tier === 'senior') {
        openingHook = `I am excited to express my interest in the <strong>${role}</strong> role at <strong>${company}</strong>. As an individual contributor with 10 years of deep coding experience in Node.js, Python, and frontend platforms, I take pride in pragmatic craftsmanship, zero-bureaucracy problem solving, and building high-reliability products that end users love.`;
      } else {
        openingHook = `I am writing to submit my application for the <strong>${role}</strong> opportunity at <strong>${company}</strong>. In my 10 years of engineering leadership, I have always believed in leading by example—blending strong technical architecture with an open, egalitarian team culture. I am enthusiastic about the prospect of joining your team and delivering high-impact solutions across the APAC region.`;
      }
    } else if (tone === 'startup') {
      if (tier === 'staff') {
        openingHook = `I am reaching out regarding the <strong>${role}</strong> position at <strong>${company}</strong>. In fast-growing ventures, architecture must enable velocity rather than stifle it. Over the last 10 years, I have architected systems capable of scaling from zero to 50,000 QPS, instituting just enough structure to eliminate tech debt while empowering squads to ship production features at record speed.`;
      } else if (tier === 'senior') {
        openingHook = `I am writing to apply for the <strong>${role}</strong> role at <strong>${company}</strong>. I love moving fast, diving into the most complex codebases, and solving hard concurrency bottlenecks. With 10 years of production coding in Node.js, Python, React, and TypeScript, I bring the 0-to-1 builder mentality and relentless focus on product execution that high-growth startups require.`;
      } else {
        openingHook = `I am thrilled to apply for the <strong>${role}</strong> position at <strong>${company}</strong>. As a hands-on Technical Lead who has guided squads through rapid scaling phases, I thrive in nimble, high-ownership environments where engineers wear multiple hats and ship impactful software daily without getting bogged down by bureaucratic friction.`;
      }
    } else {
      // US Direct & Metrics-Driven (Default)
      if (tier === 'staff') {
        openingHook = `I am writing to express my enthusiastic interest in the <strong>${role}</strong> position at <strong>${company}</strong>. With over a decade of software engineering excellence—spearheading distributed systems strategy as a Technical Lead at Rapidops and delivering enterprise architecture as a Consultant at Infosys—I have built my career delivering high-reliability, low-latency platforms that scale to millions of users while directly accelerating business revenue.`;
      } else if (tier === 'senior') {
        openingHook = `I am writing to apply for the <strong>${role}</strong> position at <strong>${company}</strong>. With a decade of dedicated hands-on systems programming in Node.js, Python, and high-performance TypeScript microservices, I specialize in solving hard algorithmic challenges, driving P99 latencies below 25ms, and delivering production code that operates with zero downtime.`;
      } else {
        openingHook = `I am writing to express my strong interest in the <strong>${role}</strong> position at <strong>${company}</strong>. With a proven 10-year track record leading engineering squads of 15+ developers, architecting high-throughput microservices, and boosting sprint velocity by 30%, I am eager to bring my hands-on technical leadership and delivery rigor to <strong>${company}</strong>.`;
      }
    }

    // Core Value / Leadership Paragraph calibrated by Tier
    let coreNarrative = '';
    if (tier === 'staff') {
      coreNarrative = `
        At Rapidops, I currently spearhead technical architecture and engineering governance across 4 cross-functional squads. My role balances long-term architectural strategy—such as defining RFC roadmaps, driving adoption of asynchronous concurrency patterns, and standardizing observability frameworks—with active mentoring of senior engineers and tech leads. I firmly believe that effective Staff leadership acts as a force multiplier: eliminating architectural regressions before they reach production, cutting operational cloud costs, and ensuring that engineering delivery maps tightly to executive milestones.
      `;
    } else if (tier === 'senior') {
      coreNarrative = `
        Throughout my 10 years in software engineering, my passion has been pure code craftsmanship and performance engineering. At Rapidops, I roll up my sleeves daily to solve complex concurrency challenges, profile memory allocations, and design decoupled, clean APIs in <strong>Node.js, TypeScript, Python, and React</strong>. I bring deep experience in non-blocking event loops, asynchronous event pipelines, and database query optimization, consistently delivering bug-free, well-tested code backed by comprehensive automated test suites.
      `;
    } else {
      coreNarrative = `
        As a Technical Lead at Rapidops, I lead a dedicated squad of 15+ software engineers, bridging high-level system architecture with day-to-day sprint delivery. By championing automated testing, rigorous code reviews, and structured agile ceremonies, I have boosted our squad's sprint velocity by 30% while maintaining 99.9% production availability. Prior to Rapidops, my consulting tenure at Infosys honed my ability to collaborate directly with Fortune 500 executive stakeholders, translating complex enterprise requirements into robust, modular platforms.
      `;
    }

    // Selected Project Spotlights
    const spotlightParagraphs = [];
    if (spotlightHighScale) {
      spotlightParagraphs.push(
        `<strong>High-Throughput Microservices Architecture:</strong> To support mission-critical transactional workloads, I engineered an asynchronous microservices engine in <strong>Node.js, FastAPI, and Redis</strong>. This system sustains <strong>50,000 QPS with sub-25ms P99 latency</strong>, reducing backend compute and CPU overhead by 45% during peak traffic spikes.`
      );
    }
    if (spotlightEs) {
      spotlightParagraphs.push(
        `<strong>Big Data Observability & Search Pipelines:</strong> I designed and built an enterprise telemetry and search visualization product powered by <strong>Elasticsearch, Kibana, and Snowflake</strong>. By implementing customized index templates and sharding policies, our team slashed query discovery times by 70% across a dataset exceeding <strong>10 million records</strong>.`
      );
    }
    if (spotlightEnterprise) {
      spotlightParagraphs.push(
        `<strong>Enterprise Digital Modernization:</strong> During my consulting engagement at Infosys, I guided Fortune 500 clients through the modernization of legacy monolithic portals into decoupled microservices and modular <strong>React.js and Redux</strong> platforms, reducing client-side rendering bottlenecks by 40%.`
      );
    }
    if (spotlightK8s) {
      spotlightParagraphs.push(
        `<strong>Cloud-Native Infrastructure:</strong> Across all platforms, I enforce cloud-native containerization using <strong>Docker and Kubernetes</strong>, establishing automated CI/CD pipelines, automated rollbacks, and health probes that guarantee high availability and zero-downtime deployments.`
      );
    }

    const spotlightSectionHtml = spotlightParagraphs.length > 0
      ? `<div style="background:#f8fafc; border-left:3px solid #0284c7; padding:0.85rem 1.15rem; margin:1.25rem 0; border-radius:0 6px 6px 0;">
          <div style="font-size:0.82rem; font-weight:700; text-transform:uppercase; color:#0284c7; margin-bottom:0.5rem; letter-spacing:0.04em;">Selected Architectural Accomplishments:</div>
          <ul style="margin:0; padding-left:1.2rem; font-size:0.88rem; color:#334155; line-height:1.6;">
            ${spotlightParagraphs.map(p => `<li style="margin-bottom:0.45rem;">${p}</li>`).join('')}
          </ul>
        </div>`
      : '';

    // Highlights / Custom Keywords Integration
    const highlightsHtml = highlights
      ? `<p>
          In reviewing the specific expectations for the <strong>${role}</strong> position, I was particularly drawn to your emphasis on <strong>${highlights}</strong>. Having tackled identical technical challenges in high-availability enterprise environments, I am well-prepared to deliver immediate, measurable impact.
        </p>`
      : '';

    // Regional & Cultural Value Alignment
    let regionalAlignment = '';
    if (tone === 'eu') {
      regionalAlignment = `Working with distributed international teams has taught me the paramount importance of clear asynchronous communication, exhaustive architectural documentation, and disciplined code review standards. I am fully equipped to operate within European working hours (GMT/CET) and adhere to strict engineering compliance frameworks.`;
    } else if (tone === 'uae') {
      regionalAlignment = `The rapid pace of technological innovation in the UAE demands platforms engineered for extreme reliability and seamless user experience. With immediate readiness to relocate to Dubai/Abu Dhabi and a deep commitment to regional growth, I am eager to establish long-term roots and drive your technological leadership forward.`;
    } else if (tone === 'apac') {
      regionalAlignment = `I deeply value collaborative, transparent engineering environments where every engineer is encouraged to challenge assumptions and propose better solutions. I welcome the opportunity to connect you with verified professional referees who can speak directly to my technical execution and team contributions.`;
    } else if (tone === 'startup') {
      regionalAlignment = `I thrive in fast-paced startup environments where ownership is personal, feedback loops are rapid, and momentum is everything. I bring the resilience and adaptability required to navigate evolving product requirements without sacrificing foundational system stability.`;
    } else {
      regionalAlignment = `What draws me most to <strong>${company}</strong> is your uncompromising commitment to engineering excellence and technological innovation. I am excited by the prospect of bringing my systems programming expertise, architectural leadership, and focus on quantifiable business outcomes to your talented team.`;
    }

    const info = ProfileStore.getProfileInfo();

    paper.innerHTML = `
      <div class="cl-header">
        <div class="cl-name">${this.escapeHtml(info.name)}</div>
        <div class="cl-title">${senderTitle}</div>
        <div class="cl-contact">
          ${this.escapeHtml(info.email)} • ${this.escapeHtml(info.linkedin || '')} • ${this.escapeHtml(info.location || 'Remote')}
        </div>
      </div>

      <div class="cl-recipient-block">
        <div class="cl-date">${todayStr}</div>
        <div class="cl-recipient-name">To: <strong>${manager}</strong></div>
        <div class="cl-recipient-company">${company}</div>
      </div>

      <div class="cl-subject-line">
        <strong>SUBJECT: Application for ${role} — ${this.escapeHtml(info.name)}</strong>
      </div>

      <div class="cl-body">
        <p>Dear ${manager},</p>

        <p>${openingHook}</p>

        <p>${coreNarrative}</p>

        ${spotlightSectionHtml}

        ${highlightsHtml}

        <p>${regionalAlignment}</p>

        <p>
          I would welcome the opportunity to discuss how my systems engineering track record, architectural leadership, and execution velocity can accelerate <strong>${company}</strong>'s roadmap. Thank you for your time, consideration, and leadership.
        </p>

        <div class="cl-signoff">
          <p style="margin-bottom:0.4rem;">Sincerely,</p>
          <div class="cl-signature-name">${this.escapeHtml(info.name)}</div>
          <div class="cl-signature-title">${senderTitle}</div>
          <div class="cl-signature-links">${this.escapeHtml(info.email)} • ${this.escapeHtml(info.linkedin || '')}</div>
        </div>
      </div>
    `;
  }

  copyCoverLetter() {
    const paper = document.getElementById('clOutputPaper');
    if (!paper) return;
    navigator.clipboard.writeText(paper.innerText).then(() => {
      this.showToast('📋 Copied Cover Letter to Clipboard!');
    }).catch(err => {
      console.error('Failed to copy cover letter:', err);
      this.showToast('Copied text!');
    });
  }

  downloadCoverLetterMarkdown() {
    const paper = document.getElementById('clOutputPaper');
    if (!paper) return;

    const info = ProfileStore.getProfileInfo();
    const safeName = (info.name || 'Candidate').replace(/[^a-zA-Z0-9_-]/g, '_');
    const company = document.getElementById('clTargetCompany')?.value.trim() || 'Company';
    const role = document.getElementById('clTargetRole')?.value.trim() || 'Role';
    const md = `# ${info.name} - Cover Letter - ${company}\n` +
      `**Position:** ${role}\n` +
      `**Date:** ${new Date().toISOString().split('T')[0]}\n\n` +
      `---\n\n` +
      paper.innerText;

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeCompany = company.replace(/[^a-zA-Z0-9_-]/g, '_');
    link.download = `${safeName}_Cover_Letter_${safeCompany}.md`;
    link.click();
    URL.revokeObjectURL(url);
    this.showToast(`Downloaded Cover Letter Markdown for ${company}!`);
  }

  saveCoverLetterVersion() {
    const paper = document.getElementById('clOutputPaper');
    if (!paper) return;

    const company = document.getElementById('clTargetCompany')?.value.trim() || 'Company';
    const role = document.getElementById('clTargetRole')?.value.trim() || 'Position';
    const tone = document.getElementById('clToneSelector')?.value || 'us';
    const tier = this.currentCoverLetterTier || 'lead';

    const versionItem = {
      id: `cl-ver-${Date.now()}`,
      company,
      role,
      tier,
      tone,
      savedAt: new Date().toISOString(),
      previewText: paper.innerText.substring(0, 150) + '...',
      fullHtml: paper.innerHTML,
      fullText: paper.innerText
    };

    this.coverLetters.unshift(versionItem);
    this.saveCoverLetters();
    this.showToast(`💾 Saved Cover Letter Version for ${company}!`);
  }

  openSavedCoverLettersModal() {
    const backdrop = document.getElementById('cosCoverLettersModalBackdrop');
    if (!backdrop) return;
    this.renderSavedCoverLetters();
    backdrop.classList.add('active');
  }

  closeSavedCoverLettersModal() {
    const backdrop = document.getElementById('cosCoverLettersModalBackdrop');
    if (backdrop) backdrop.classList.remove('active');
  }

  renderSavedCoverLetters() {
    const container = document.getElementById('cosSavedCoverLettersList');
    if (!container) return;

    if (this.coverLetters.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:2.5rem 1rem; color:var(--text-muted);">
          <div style="font-size:2rem; margin-bottom:0.5rem;">✍️</div>
          <p>No saved cover letters yet.</p>
          <p style="font-size:0.75rem;">Generate a tailored letter and click <strong>"Save Version"</strong> to store it here.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.coverLetters.map(item => {
      const dateStr = new Date(item.savedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      return `
        <div class="saved-cl-card" data-cl-id="${item.id}">
          <div class="saved-cl-header">
            <div class="saved-cl-title">${item.company} — <span style="font-weight:400; color:var(--text-secondary);">${item.role}</span></div>
            <div class="saved-cl-meta">
              <span class="kanban-card-badge">${item.tier.toUpperCase()}</span>
              <span class="country-badge">${item.tone.toUpperCase()}</span>
              <span>${dateStr}</span>
            </div>
          </div>
          <div class="saved-cl-preview">${item.previewText}</div>
          <div class="saved-cl-actions">
            <button class="btn btn-secondary btn-sm restore-cl-btn" data-cl-id="${item.id}" style="font-size:0.72rem; padding:4px 8px;">
              <span>Restore to Editor</span>
            </button>
            <button class="btn btn-secondary btn-sm copy-cl-item-btn" data-cl-id="${item.id}" style="font-size:0.72rem; padding:4px 8px;">
              <span>Copy Text</span>
            </button>
            <button class="btn btn-secondary btn-sm delete-cl-item-btn" data-cl-id="${item.id}" style="font-size:0.72rem; padding:4px 8px; color:#f87171;">
              <span>Delete</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach Action Handlers
    container.querySelectorAll('.restore-cl-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.clId;
        this.restoreSavedCoverLetter(id);
      });
    });

    container.querySelectorAll('.copy-cl-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.clId;
        const item = this.coverLetters.find(c => c.id === id);
        if (item && item.fullText) {
          navigator.clipboard.writeText(item.fullText).then(() => {
            this.showToast(`Copied ${item.company} letter to clipboard!`);
          });
        }
      });
    });

    container.querySelectorAll('.delete-cl-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.clId;
        this.deleteSavedCoverLetter(id);
      });
    });
  }

  deleteSavedCoverLetter(id) {
    const item = this.coverLetters.find(c => c.id === id);
    if (confirm(`Delete saved cover letter for ${item?.company || 'this role'}?`)) {
      this.coverLetters = this.coverLetters.filter(c => c.id !== id);
      this.saveCoverLetters();
      this.renderSavedCoverLetters();
      this.showToast('Cover letter deleted');
    }
  }

  restoreSavedCoverLetter(id) {
    const item = this.coverLetters.find(c => c.id === id);
    if (!item) return;

    const companyInput = document.getElementById('clTargetCompany');
    const roleInput = document.getElementById('clTargetRole');
    const toneSelect = document.getElementById('clToneSelector');

    if (companyInput) companyInput.value = item.company;
    if (roleInput) roleInput.value = item.role;
    if (toneSelect) toneSelect.value = item.tone;

    if (item.tier) {
      this.currentCoverLetterTier = item.tier;
      document.querySelectorAll('#clRoleTierTabs .country-tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cltier === item.tier);
      });
    }

    const paper = document.getElementById('clOutputPaper');
    if (paper && item.fullHtml) {
      paper.innerHTML = item.fullHtml;
    } else {
      this.generateCoverLetter();
    }

    this.closeSavedCoverLettersModal();
    this.showToast(`Restored cover letter for ${item.company}!`);
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* -------------------------------------------------------------------------
     MODULE 5: INTERVIEW CALENDAR & MULTI-TIMEZONE WORLD CLOCK
     ------------------------------------------------------------------------- */
  startWorldClock() {
    if (this.worldClockInterval) clearInterval(this.worldClockInterval);

    const updateClocks = () => {
      const bar = document.getElementById('cosTzClocksBar');
      if (!bar) return;

      const now = new Date();

      const ZONES = [
        { code: 'IST', name: 'Ahmedabad (Your Base)', tz: 'Asia/Kolkata', isBase: true },
        { code: 'EST', name: 'New York (US East)', tz: 'America/New_York', isBase: false },
        { code: 'PST', name: 'San Francisco (US West)', tz: 'America/Los_Angeles', isBase: false },
        { code: 'GMT', name: 'London (UK / BST)', tz: 'Europe/London', isBase: false },
        { code: 'CET', name: 'Berlin (Europe)', tz: 'Europe/Berlin', isBase: false },
        { code: 'GST', name: 'Dubai (UAE)', tz: 'Asia/Dubai', isBase: false },
        { code: 'SGT', name: 'Singapore (SGT)', tz: 'Asia/Singapore', isBase: false }
      ];

      bar.innerHTML = ZONES.map(z => {
        const timeStr = now.toLocaleTimeString('en-US', { timeZone: z.tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        const dateStr = now.toLocaleDateString('en-US', { timeZone: z.tz, month: 'short', day: 'numeric', weekday: 'short' });

        return `
          <div class="tz-clock-card">
            <div class="tz-clock-header">
              <span class="tz-label">${z.code}</span>
              <span class="tz-badge ${z.isBase ? 'ist' : ''}">${z.isBase ? 'YOU' : z.name.split(' ')[0]}</span>
            </div>
            <div class="tz-time">${timeStr}</div>
            <div class="tz-date">${dateStr}</div>
          </div>
        `;
      }).join('');
    };

    updateClocks();
    this.worldClockInterval = setInterval(updateClocks, 1000);
  }

  renderCalendar() {
    this.renderAgenda();

    const grid = document.getElementById('calDaysGrid');
    const title = document.getElementById('calMonthTitle');
    if (!grid) return;

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth() + (this.calendarMonthOffset || 0), 1);
    const targetMonth = targetDate.getMonth();
    const targetYear = targetDate.getFullYear();

    if (title) {
      title.textContent = targetDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      title.style.cursor = 'pointer';
      title.title = 'Click to jump back to current month';
    }

    const firstDay = new Date(targetYear, targetMonth, 1).getDay();
    const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();

    let html = daysOfWeek.map(d => `<div class="cal-day-header">${d}</div>`).join('');

    // Blank padding before day 1
    for (let i = 0; i < firstDay; i++) {
      html += `<div class="cal-day-cell" style="opacity:0.25;"></div>`;
    }

    // Days in target month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = (day === now.getDate() && targetMonth === now.getMonth() && targetYear === now.getFullYear());
      const dateStr = `${targetYear}-${String(targetMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isSelected = (this.selectedCalendarDate === dateStr);

      const dayInterviews = this.interviews.filter(int => int.dateTime && int.dateTime.startsWith(dateStr));
      const hasInterview = dayInterviews.length > 0;

      html += `
        <div class="cal-day-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${hasInterview ? 'has-interview' : ''}" data-date="${dateStr}" style="cursor:pointer;" title="Click to filter rounds on ${dateStr}">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="cal-day-num" style="${isToday ? 'color:var(--accent-cyan-light); font-weight:bold;' : ''}">${day}</span>
            ${isToday ? '<span style="font-size:0.58rem; color:var(--accent-cyan-light); font-family:var(--font-mono);">TODAY</span>' : ''}
          </div>
          ${dayInterviews.map(i => `
            <div class="cal-interview-pill" title="${this.escapeHtml(i.company)} - ${this.escapeHtml(i.roundType)}">
              ${this.escapeHtml(i.company)}
            </div>
          `).join('')}
        </div>
      `;
    }

    grid.innerHTML = html;

    grid.querySelectorAll('.cal-day-cell[data-date]').forEach(cell => {
      cell.addEventListener('click', () => {
        const dateStr = cell.dataset.date;
        if (this.selectedCalendarDate === dateStr) {
          this.selectedCalendarDate = null;
        } else {
          this.selectedCalendarDate = dateStr;
        }
        this.renderCalendar();
      });
    });
  }

  renderAgenda() {
    const list = document.getElementById('cosAgendaList');
    const filterBadge = document.getElementById('cosAgendaFilterBadge');
    const clearFilterBtn = document.getElementById('cosClearCalendarFilterBtn');
    if (!list) return;

    let displayInterviews = [...this.interviews];

    if (this.selectedCalendarDate) {
      displayInterviews = displayInterviews.filter(int => int.dateTime && int.dateTime.startsWith(this.selectedCalendarDate));
      if (filterBadge) {
        filterBadge.style.display = 'block';
        filterBadge.textContent = `Showing: ${this.selectedCalendarDate} (${displayInterviews.length} rounds)`;
      }
      if (clearFilterBtn) clearFilterBtn.style.display = 'inline-block';
    } else {
      if (filterBadge) filterBadge.style.display = 'none';
      if (clearFilterBtn) clearFilterBtn.style.display = 'none';
    }

    if (displayInterviews.length === 0) {
      list.innerHTML = `
        <div style="font-size:0.82rem; color:var(--text-muted); text-align:center; padding:1.5rem 1rem; background:rgba(255,255,255,0.02); border-radius:var(--radius-md); border:1px dashed var(--border-light);">
          <p style="margin-bottom:0.6rem;">${this.selectedCalendarDate ? `No interviews on ${this.selectedCalendarDate}.` : 'No upcoming interviews scheduled yet.'}</p>
          <button class="btn btn-primary btn-sm" id="cosQuickScheduleOnDateBtn" style="font-size:0.75rem;">
            <span>+ Schedule on this Day</span>
          </button>
        </div>
      `;
      const quickBtn = document.getElementById('cosQuickScheduleOnDateBtn');
      if (quickBtn) {
        quickBtn.addEventListener('click', () => {
          this.openInterviewModal(this.selectedCalendarDate || '');
        });
      }
      return;
    }

    list.innerHTML = displayInterviews.map(int => {
      const conv = this.convertForeignTimeToIst(int.dateTime, int.timezone);
      const gcalUrl = this.generateGoogleCalendarUrl(int);

      return `
        <div class="agenda-card">
          <div class="agenda-time-badge">
            ${conv.dayNightIcon} ${conv.istFormatted}
            <span style="opacity:0.75; font-size:0.7rem; margin-left:0.35rem;">(${int.timezone} Local)</span>
          </div>
          <div class="agenda-title">${this.escapeHtml(int.role)}</div>
          <div class="agenda-company">🏢 ${this.escapeHtml(int.company)} • <strong>${this.escapeHtml(int.roundType).replace('_', ' ').toUpperCase()}</strong></div>
          
          ${int.interviewer ? `<div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.4rem;">Interviewer: ${this.escapeHtml(int.interviewer)}</div>` : ''}
          ${int.prepNotes ? `<div style="font-size:0.78rem; color:var(--text-secondary); margin-bottom:0.5rem; line-height:1.4;">${this.escapeHtml(int.prepNotes)}</div>` : ''}

          <div class="agenda-actions" style="display:flex; flex-wrap:wrap; gap:0.35rem;">
            ${int.meetingLink ? `
              <a href="${this.escapeHtml(int.meetingLink)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="font-size:0.72rem; padding:0.25rem 0.55rem;">
                <span>Join Meeting</span>
              </a>
            ` : ''}
            <a href="${gcalUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="font-size:0.72rem; padding:0.25rem 0.55rem; color:var(--accent-cyan-light); border-color:rgba(6,182,212,0.3);" title="Add to Google Calendar">
              <span>📅 Google Cal</span>
            </a>
            <button class="btn btn-secondary btn-sm export-ics-btn" data-int-id="${int.id}" style="font-size:0.72rem; padding:0.25rem 0.55rem;" title="Download .ics event file">
              <span>💾 .ics</span>
            </button>
            <button class="btn btn-secondary btn-sm ai-prep-int-btn" data-company="${this.escapeHtml(int.company)}" data-role="${this.escapeHtml(int.role)}" data-round="${this.escapeHtml(int.roundType)}" style="font-size:0.72rem; padding:0.25rem 0.55rem; color:var(--accent-cyan-light); border-color:rgba(6,182,212,0.3);">
              <span>✨ AI Prep</span>
            </button>
            <button class="btn btn-secondary btn-sm edit-int-btn" data-int-id="${int.id}" style="font-size:0.72rem; padding:0.25rem 0.55rem;">
              ✏️
            </button>
            <button class="btn btn-secondary btn-sm delete-int-btn" data-int-id="${int.id}" style="font-size:0.72rem; padding:0.25rem 0.55rem; color:#f87171;">
              Delete
            </button>
          </div>
        </div>
      `;
    }).join('');

    list.querySelectorAll('.export-ics-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = this.interviews.find(i => i.id === btn.dataset.intId);
        if (item) this.downloadIcsFile(item);
      });
    });

    list.querySelectorAll('.edit-int-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.openInterviewModal('', btn.dataset.intId);
      });
    });

    list.querySelectorAll('.ai-prep-int-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.openAiInterviewModal(btn.dataset.company, btn.dataset.role, btn.dataset.round);
      });
    });

    list.querySelectorAll('.delete-int-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.deleteInterview(btn.dataset.intId);
      });
    });
  }

  updateConvertedTimePreview() {
    const dtInput = document.getElementById('cosIntDateTime');
    const tzSelect = document.getElementById('cosIntTimezone');
    const preview = document.getElementById('cosIntIstPreview');
    if (!preview) return;

    const dtVal = dtInput?.value;
    const tzCode = tzSelect?.value || 'EST';

    if (!dtVal) {
      preview.innerHTML = 'Select date & time above to see your local India (IST) schedule';
      return;
    }

    const converted = this.convertForeignTimeToIst(dtVal, tzCode);
    preview.innerHTML = `<strong>${converted.istFormatted}</strong> <span style="opacity:0.8;">(${converted.dayNightIcon} ${converted.dayNightLabel} in Ahmedabad)</span> • Recruiter Time: ${converted.foreignFormatted}`;
  }

  convertForeignTimeToIst(dateTimeStr, tzCode) {
    const TZ_OFFSETS = {
      IST: 5.5,
      EST: -5,
      PST: -8,
      GMT: 0,
      CET: 1,
      GST: 4,
      SGT: 8,
      AEST: 10
    };

    const foreignOffset = TZ_OFFSETS[tzCode] !== undefined ? TZ_OFFSETS[tzCode] : 5.5;
    if (!dateTimeStr || !dateTimeStr.includes('T')) {
      return { istFormatted: dateTimeStr || 'TBD', dayNightIcon: '🕒', dayNightLabel: 'Scheduled', foreignFormatted: dateTimeStr || 'TBD', istDate: new Date() };
    }

    const [datePart, timePart] = dateTimeStr.split('T');
    const [y, m, d] = datePart.split('-').map(Number);
    const [hh, mm] = timePart.split(':').map(Number);

    const utcEpochMs = Date.UTC(y, m - 1, d, hh, mm) - (foreignOffset * 60 * 60 * 1000);
    const istEpochMs = utcEpochMs + (5.5 * 60 * 60 * 1000);
    const istDate = new Date(istEpochMs);

    const istHour = istDate.getUTCHours();
    const isNight = istHour >= 22 || istHour < 6;
    const isEvening = istHour >= 18 && istHour < 22;
    const isMorning = istHour >= 6 && istHour < 12;

    const dayNightIcon = isNight ? '🌙' : isEvening ? '🌆' : isMorning ? '🌅' : '☀️';
    const dayNightLabel = isNight ? 'Late Night' : isEvening ? 'Evening' : isMorning ? 'Morning' : 'Afternoon';

    const options = {
      timeZone: 'UTC',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };

    const istFormatted = istDate.toLocaleDateString('en-US', options) + ' IST';
    const foreignFormatted = `${dateTimeStr.replace('T', ' ')} (${tzCode})`;

    return {
      istFormatted,
      dayNightIcon,
      dayNightLabel,
      foreignFormatted,
      istDate
    };
  }

  generateGoogleCalendarUrl(int) {
    try {
      const dtVal = int.dateTime;
      const tzCode = int.timezone || 'EST';
      const conv = this.convertForeignTimeToIst(dtVal, tzCode);
      const start = conv.istDate || new Date(int.dateTime);
      const end = new Date(start.getTime() + 60 * 60 * 1000);

      const formatGCal = (d) => {
        return d.getUTCFullYear() +
          String(d.getUTCMonth() + 1).padStart(2, '0') +
          String(d.getUTCDate()).padStart(2, '0') + 'T' +
          String(d.getUTCHours()).padStart(2, '0') +
          String(d.getUTCMinutes()).padStart(2, '0') + '00Z';
      };

      const dates = `${formatGCal(start)}/${formatGCal(end)}`;
      const title = encodeURIComponent(`Interview: ${int.company} - ${int.role} (${int.roundType.replace('_', ' ').toUpperCase()})`);
      const details = encodeURIComponent(
        `Company: ${int.company}\n` +
        `Role: ${int.role}\n` +
        `Round: ${int.roundType}\n` +
        `Interviewer: ${int.interviewer || 'TBD'}\n` +
        `Meeting Link: ${int.meetingLink || 'Virtual'}\n\n` +
        `Prep Notes:\n${int.prepNotes || 'N/A'}`
      );
      const location = encodeURIComponent(int.meetingLink || 'Virtual / Video Call');

      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    } catch (e) {
      return 'https://calendar.google.com';
    }
  }

  downloadIcsFile(int) {
    try {
      const dtVal = int.dateTime;
      const tzCode = int.timezone || 'EST';
      const conv = this.convertForeignTimeToIst(dtVal, tzCode);
      const start = conv.istDate || new Date(int.dateTime);
      const end = new Date(start.getTime() + 60 * 60 * 1000);

      const formatIcs = (d) => {
        return d.getUTCFullYear() +
          String(d.getUTCMonth() + 1).padStart(2, '0') +
          String(d.getUTCDate()).padStart(2, '0') + 'T' +
          String(d.getUTCHours()).padStart(2, '0') +
          String(d.getUTCMinutes()).padStart(2, '0') + '00Z';
      };

      const candidateName = ProfileStore.getProfileInfo().name || 'Candidate';
      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        `PRODID:-//${candidateName} CareerOS//Interview Calendar//EN`,
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:careeros-int-${int.id}@careeros.local`,
        `DTSTAMP:${formatIcs(new Date())}`,
        `DTSTART:${formatIcs(start)}`,
        `DTEND:${formatIcs(end)}`,
        `SUMMARY:Interview: ${int.company} - ${int.role} (${int.roundType})`,
        `DESCRIPTION:${(int.prepNotes || '').replace(/\n/g, '\\n')}`,
        `LOCATION:${int.meetingLink || 'Virtual'}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Interview_${int.company.replace(/[^a-zA-Z0-9]/g, '_')}_${int.id}.ics`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      this.showToast('Downloaded .ics calendar invite!');
    } catch (e) {
      this.showToast('Failed to export calendar file');
    }
  }

  openInterviewModal(prefillDate = '', editId = null) {
    const backdrop = document.getElementById('cosInterviewModalBackdrop');
    const modalTitle = document.getElementById('cosInterviewModalTitle');
    const hiddenId = document.getElementById('cosInterviewFormId');

    if (editId) {
      const existing = this.interviews.find(i => i.id === editId);
      if (existing) {
        if (hiddenId) hiddenId.value = existing.id;
        if (modalTitle) modalTitle.textContent = `Edit Interview (${existing.company})`;
        document.getElementById('cosIntCompany').value = existing.company;
        document.getElementById('cosIntRole').value = existing.role;
        document.getElementById('cosIntRound').value = existing.roundType;
        document.getElementById('cosIntTimezone').value = existing.timezone || 'EST';
        document.getElementById('cosIntDateTime').value = existing.dateTime || '';
        document.getElementById('cosIntMeetingLink').value = existing.meetingLink || '';
        document.getElementById('cosIntInterviewer').value = existing.interviewer || '';
        document.getElementById('cosIntPrepNotes').value = existing.prepNotes || '';
      }
    } else {
      if (hiddenId) hiddenId.value = '';
      if (modalTitle) modalTitle.textContent = 'Schedule Interview';
      document.getElementById('cosInterviewForm')?.reset();
      if (prefillDate) {
        document.getElementById('cosIntDateTime').value = `${prefillDate}T10:00`;
      }
    }

    this.updateConvertedTimePreview();
    if (backdrop) backdrop.classList.add('active');
  }

  closeInterviewModal() {
    const backdrop = document.getElementById('cosInterviewModalBackdrop');
    if (backdrop) backdrop.classList.remove('active');
  }

  handleSaveInterviewForm() {
    const editId = document.getElementById('cosInterviewFormId')?.value;
    const company = document.getElementById('cosIntCompany').value;
    const role = document.getElementById('cosIntRole').value;
    const roundType = document.getElementById('cosIntRound').value;
    const timezone = document.getElementById('cosIntTimezone').value;
    const dateTime = document.getElementById('cosIntDateTime').value;
    const meetingLink = document.getElementById('cosIntMeetingLink').value;
    const interviewer = document.getElementById('cosIntInterviewer').value;
    const prepNotes = document.getElementById('cosIntPrepNotes').value;

    if (editId) {
      const idx = this.interviews.findIndex(i => i.id === editId);
      if (idx !== -1) {
        this.interviews[idx] = {
          ...this.interviews[idx],
          company,
          role,
          roundType,
          timezone,
          dateTime,
          meetingLink,
          interviewer,
          prepNotes
        };
        this.showToast(`Updated interview with ${company}!`);
      }
    } else {
      const newInt = {
        id: `int-${Date.now()}`,
        company,
        role,
        roundType,
        timezone,
        dateTime,
        meetingLink,
        interviewer,
        prepNotes,
        status: 'upcoming'
      };
      this.interviews.unshift(newInt);
      this.showToast(`Interview scheduled with ${company}!`);
    }

    this.saveInterviews();
    this.closeInterviewModal();
    this.renderCalendar();
  }

  deleteInterview(id) {
    if (confirm('Delete this interview from your calendar?')) {
      this.interviews = this.interviews.filter(i => i.id !== id);
      this.saveInterviews();
      this.renderCalendar();
      this.showToast('Interview deleted');
    }
  }

  /* -------------------------------------------------------------------------
     MODULE 6: DREAM JOB UPSKILLING PORTAL & HABIT TRACKER
     ------------------------------------------------------------------------- */
  renderLearning() {
    const tabsContainer = document.getElementById('cosDreamTracksTabs');
    const totalHoursEl = document.getElementById('learningTotalHours');
    const streakEl = document.getElementById('learningStreakCount');

    if (totalHoursEl) {
      totalHoursEl.textContent = `${this.learningHours.toFixed(1)} hrs`;
    }
    if (streakEl) {
      const streak = Math.max(1, Math.min(7, Math.ceil(this.learningHours / 7)));
      streakEl.textContent = `${streak}-Day Streak`;
    }

    if (!tabsContainer) return;

    // Render Track selection pills
    tabsContainer.innerHTML = this.learningTracks.map((track, idx) => {
      const totalTasks = (track.sprints || []).reduce((acc, s) => acc + (s.tasks ? s.tasks.length : 0), 0);
      const completedTasks = (track.sprints || []).reduce((acc, s) => acc + (s.tasks ? s.tasks.filter(t => t.completed).length : 0), 0);
      const sprintPct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      return `
        <div class="dream-role-pill ${idx === 0 ? 'active' : ''}" data-track-id="${track.id}">
          <div class="dream-role-icon">${track.icon || '🚀'}</div>
          <div>
            <div class="dream-role-name">${this.escapeHtml(track.title)}</div>
            <div style="display:flex; align-items:center; gap:0.4rem; margin-top:0.2rem;">
              <span class="dream-role-match">${track.matchScore || 85}% Target Match</span>
              <span class="track-progress-badge">${sprintPct}% Done</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach pill click
    tabsContainer.querySelectorAll('.dream-role-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        tabsContainer.querySelectorAll('.dream-role-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const trackId = pill.dataset.trackId;
        this.renderSelectedTrack(trackId);
      });
    });

    // Populate track select in study modal
    const trackSelect = document.getElementById('cosLogHoursTrackSelect');
    if (trackSelect) {
      trackSelect.innerHTML = this.learningTracks.map(t => `
        <option value="${t.id}">${this.escapeHtml(t.title)}</option>
      `).join('');
    }

    // Render first track
    if (this.learningTracks.length > 0) {
      this.renderSelectedTrack(this.learningTracks[0].id);
    }
  }

  renderSelectedTrack(trackId) {
    const track = this.learningTracks.find(t => t.id === trackId) || this.learningTracks[0];
    if (!track) return;

    const radarList = document.getElementById('cosSkillRadarList');
    const sprintsList = document.getElementById('cosLearningSprintsList');

    if (radarList && track.skills) {
      radarList.innerHTML = track.skills.map((s, sIdx) => {
        const gap = Math.max(0, s.target - s.current);
        return `
          <div class="skill-radar-item">
            <div class="skill-radar-meta">
              <span class="skill-radar-name">
                ${this.escapeHtml(s.name)}
                <span style="font-size:0.68rem; margin-left:0.35rem; color:${s.priority === 'CRITICAL' ? '#f87171' : s.priority === 'HIGH' ? '#fbbf24' : '#34d399'}; font-family:var(--font-mono);">[${s.priority || 'HIGH'}]</span>
              </span>
              <div style="display:flex; align-items:center; gap:0.4rem;">
                <span class="skill-radar-score">${s.current}% / ${s.target}% Target</span>
                <button class="skill-radar-action-btn skill-minus-btn" data-track-id="${track.id}" data-skill-idx="${sIdx}" title="Decrease proficiency (-5%)">-5%</button>
                <button class="skill-radar-action-btn skill-plus-btn" data-track-id="${track.id}" data-skill-idx="${sIdx}" title="Increase proficiency (+5%)">+5%</button>
              </div>
            </div>
            <div class="skill-progress-track">
              <div class="skill-progress-bar" style="width:${s.current}%;"></div>
            </div>
            ${gap > 0 ? `<div style="font-size:0.7rem; color:var(--text-muted); font-family:var(--font-mono); margin-top:0.15rem;">Gap to Mastery: +${gap}% required</div>` : `<div style="font-size:0.7rem; color:#34d399; font-family:var(--font-mono); margin-top:0.15rem;">✓ Target Competency Achieved</div>`}
          </div>
        `;
      }).join('');

      radarList.querySelectorAll('.skill-plus-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const sIdx = parseInt(btn.dataset.skillIdx);
          if (track.skills[sIdx] && track.skills[sIdx].current < 100) {
            track.skills[sIdx].current = Math.min(100, track.skills[sIdx].current + 5);
            this.saveLearning();
            this.renderSelectedTrack(track.id);
            this.showToast(`Updated ${track.skills[sIdx].name} to ${track.skills[sIdx].current}%!`);
          }
        });
      });

      radarList.querySelectorAll('.skill-minus-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const sIdx = parseInt(btn.dataset.skillIdx);
          if (track.skills[sIdx] && track.skills[sIdx].current > 0) {
            track.skills[sIdx].current = Math.max(0, track.skills[sIdx].current - 5);
            this.saveLearning();
            this.renderSelectedTrack(track.id);
            this.showToast(`Updated ${track.skills[sIdx].name} to ${track.skills[sIdx].current}%!`);
          }
        });
      });
    }

    if (sprintsList && track.sprints) {
      sprintsList.innerHTML = track.sprints.map(sp => {
        const completedCount = sp.tasks.filter(t => t.completed).length;
        const totalCount = sp.tasks.length;
        const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

        return `
          <div class="sprint-card">
            <div class="sprint-header">
              <div class="sprint-title-wrap">
                <span class="sprint-badge">Week ${sp.week}</span>
                <span class="sprint-title">${this.escapeHtml(sp.title)}</span>
              </div>
              <span class="track-progress-badge">${completedCount}/${totalCount} Done (${pct}%)</span>
            </div>

            <div class="sprint-tasks-list">
              ${sp.tasks.map((task, tIdx) => `
                <label class="sprint-task-item">
                  <input type="checkbox" class="sprint-task-checkbox" data-track-id="${track.id}" data-week="${sp.week}" data-task-idx="${tIdx}" ${task.completed ? 'checked' : ''}>
                  <span style="${task.completed ? 'text-decoration:line-through; opacity:0.6;' : ''}">${this.escapeHtml(task.text)}</span>
                </label>
              `).join('')}
            </div>

            <button type="button" class="sprint-add-task-btn" data-track-id="${track.id}" data-week="${sp.week}">
              <span>+ Add Task to Week ${sp.week}</span>
            </button>

            ${sp.resources && sp.resources.length > 0 ? `
              <div class="sprint-resources-box" style="margin-top:0.85rem;">
                <div class="sprint-resources-title">Curated Deep Dive Resources:</div>
                <div>
                  ${sp.resources.map(r => `
                    <a href="${this.escapeHtml(r.url)}" target="_blank" rel="noopener noreferrer" class="resource-link">
                      <span>📖 ${this.escapeHtml(r.title)}</span>
                      <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </div>
        `;
      }).join('');

      sprintsList.querySelectorAll('.sprint-task-checkbox').forEach(box => {
        box.addEventListener('change', (e) => {
          const trackObj = this.learningTracks.find(t => t.id === box.dataset.trackId);
          const weekNum = parseInt(box.dataset.week);
          const taskIdx = parseInt(box.dataset.taskIdx);
          if (trackObj) {
            const sprint = trackObj.sprints.find(s => s.week === weekNum);
            if (sprint && sprint.tasks[taskIdx]) {
              sprint.tasks[taskIdx].completed = box.checked;
              this.saveLearning();
              this.renderLearning();
              this.showToast(box.checked ? 'Task marked complete! 🚀' : 'Task uncompleted');
            }
          }
        });
      });

      sprintsList.querySelectorAll('.sprint-add-task-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.openAddSprintTaskModal(btn.dataset.trackId, parseInt(btn.dataset.week));
        });
      });
    }
  }

  openLogHoursModal() {
    const backdrop = document.getElementById('cosLogHoursModalBackdrop');
    const dateInput = document.getElementById('cosLogHoursDate');
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }
    if (backdrop) backdrop.classList.add('active');
  }

  closeLogHoursModal() {
    const backdrop = document.getElementById('cosLogHoursModalBackdrop');
    if (backdrop) backdrop.classList.remove('active');
  }

  handleSaveLogHours() {
    const trackId = document.getElementById('cosLogHoursTrackSelect')?.value;
    const hours = parseFloat(document.getElementById('cosLogHoursAmount')?.value) || 1.0;
    const date = document.getElementById('cosLogHoursDate')?.value || new Date().toISOString().split('T')[0];
    const topic = document.getElementById('cosLogHoursTopic')?.value.trim() || 'General Architecture Study';
    const notes = document.getElementById('cosLogHoursNotes')?.value.trim() || '';

    this.learningHours += hours;
    this.learningLogs.unshift({
      id: `log-${Date.now()}`,
      trackId,
      hours,
      date,
      topic,
      notes
    });

    this.saveLearningHours();
    this.closeLogHoursModal();
    this.renderLearning();
    this.showToast(`⏱️ Logged ${hours} hrs of prep time! Total: ${this.learningHours.toFixed(1)} hrs 🔥`);
  }

  openAddTrackModal() {
    const backdrop = document.getElementById('cosAddTrackModalBackdrop');
    if (backdrop) backdrop.classList.add('active');
  }

  closeAddTrackModal() {
    const backdrop = document.getElementById('cosAddTrackModalBackdrop');
    if (backdrop) backdrop.classList.remove('active');
  }

  handleSaveAddTrack() {
    const icon = document.getElementById('cosTrackIcon')?.value.trim() || '⚡';
    const title = document.getElementById('cosTrackTitle')?.value.trim();
    const targetTier = document.getElementById('cosTrackTier')?.value || 'Staff / Principal';
    const matchScore = parseInt(document.getElementById('cosTrackMatch')?.value) || 85;
    const skillsRaw = document.getElementById('cosTrackSkills')?.value.trim();
    const sprintTitle = document.getElementById('cosTrackSprintTitle')?.value.trim() || 'Sprint 1: Core Fundamentals';

    if (!title || !skillsRaw) {
      this.showToast('Please enter track title and skills');
      return;
    }

    const skills = skillsRaw.split(',').map(s => s.trim()).filter(Boolean).map(name => ({
      name,
      current: 75,
      target: 95,
      priority: 'HIGH'
    }));

    const newTrack = {
      id: `track-${Date.now()}`,
      title,
      icon,
      targetTier,
      matchScore,
      skills,
      sprints: [
        {
          week: 1,
          title: sprintTitle,
          tasks: [
            { text: `Review architectural requirements for ${title}`, completed: false },
            { text: 'Complete hands-on reference implementation benchmark', completed: false }
          ],
          resources: [
            { title: 'High Scalability Architecture Library', url: 'http://highscalability.com/' }
          ]
        }
      ]
    };

    this.learningTracks.push(newTrack);
    this.saveLearning();
    this.closeAddTrackModal();
    this.renderLearning();
    this.showToast(`Created new dream track: ${title}!`);
  }

  openAddSprintTaskModal(trackId, week) {
    const backdrop = document.getElementById('cosAddSprintTaskModalBackdrop');
    const trackInput = document.getElementById('cosSprintTaskTrackId');
    const weekInput = document.getElementById('cosSprintTaskWeek');
    const textInput = document.getElementById('cosSprintTaskText');

    if (trackInput) trackInput.value = trackId;
    if (weekInput) weekInput.value = week;
    if (textInput) textInput.value = '';

    if (backdrop) backdrop.classList.add('active');
  }

  closeAddSprintTaskModal() {
    const backdrop = document.getElementById('cosAddSprintTaskModalBackdrop');
    if (backdrop) backdrop.classList.remove('active');
  }

  handleSaveSprintTask() {
    const trackId = document.getElementById('cosSprintTaskTrackId')?.value;
    const week = parseInt(document.getElementById('cosSprintTaskWeek')?.value);
    const text = document.getElementById('cosSprintTaskText')?.value.trim();

    if (!text) {
      this.showToast('Please enter task description');
      return;
    }

    const track = this.learningTracks.find(t => t.id === trackId);
    if (track) {
      const sprint = track.sprints.find(s => s.week === week);
      if (sprint) {
        sprint.tasks.push({ text, completed: false });
        this.saveLearning();
        this.closeAddSprintTaskModal();
        this.renderLearning();
        this.renderSelectedTrack(trackId);
        this.showToast('Task added to sprint!');
      }
    }
  }

  /* -------------------------------------------------------------------------
     MODULE 7: SETTINGS & GEMINI API INTEGRATION
     ------------------------------------------------------------------------- */
  renderSettings() {
    const keyInput = document.getElementById('cosGeminiApiKeyInput');
    const modelSelect = document.getElementById('cosGeminiModelSelect');
    const badge = document.getElementById('cosApiStatusBadge');

    if (keyInput) keyInput.value = this.geminiApiKey || '';
    if (modelSelect) modelSelect.value = this.geminiModel || 'gemini-2.0-flash';

    if (badge) {
      if (this.geminiApiKey) {
        badge.className = 'api-status-badge connected';
        badge.innerHTML = `<span>●</span><span>Connected (${this.geminiModel} Active)</span>`;
      } else {
        badge.className = 'api-status-badge disconnected';
        badge.innerHTML = '<span>●</span><span>Offline Rule-Based Mode (No API key stored)</span>';
      }
    }
  }

  async callGeminiApi(prompt, model = null) {
    if (!this.geminiApiKey) {
      throw new Error('No Gemini API key stored in browser.');
    }

    const selectedModel = model || this.geminiModel || 'gemini-2.0-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(selectedModel)}:generateContent?key=${encodeURIComponent(this.geminiApiKey)}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          topK: 40,
          topP: 0.95
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      const errMsg = errData?.error?.message || `HTTP ${response.status} (${response.statusText})`;
      throw new Error(errMsg);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('Gemini API returned an empty response.');
    }
    return text;
  }

  toggleApiKeyVisibility() {
    const input = document.getElementById('cosGeminiApiKeyInput');
    const btn = document.getElementById('cosToggleApiKeyVisibilityBtn');
    if (!input || !btn) return;
    if (input.type === 'password') {
      input.type = 'text';
      btn.textContent = 'Hide Key';
    } else {
      input.type = 'password';
      btn.textContent = 'Show Key';
    }
  }

  async handleSaveApiKey() {
    const key = document.getElementById('cosGeminiApiKeyInput')?.value.trim();
    const model = document.getElementById('cosGeminiModelSelect')?.value || 'gemini-2.0-flash';
    const badge = document.getElementById('cosApiStatusBadge');

    if (!key) {
      this.showToast('Please enter a valid Gemini API key.');
      return;
    }

    this.geminiApiKey = key;
    this.geminiModel = model;
    localStorage.setItem(STORAGE_KEYS.GEMINI_KEY, key);
    localStorage.setItem(STORAGE_KEYS.GEMINI_MODEL, model);

    if (badge) {
      badge.className = 'api-status-badge testing';
      badge.innerHTML = `<span>●</span><span>Testing connection with ${model}...</span>`;
    }

    try {
      await this.callGeminiApi('Respond with "Connected" only.');
      if (badge) {
        badge.className = 'api-status-badge connected';
        badge.innerHTML = `<span>●</span><span>Connected (${model} Verified & Ready)</span>`;
      }
      this.showToast(`✨ Successfully connected to Gemini API (${model})!`);
    } catch (err) {
      console.warn('Gemini test connection failed:', err);
      if (badge) {
        badge.className = 'api-status-badge failed';
        const displayErr = err.message.length > 50 ? err.message.slice(0, 50) + '...' : err.message;
        badge.innerHTML = `<span>●</span><span>Connection Failed: ${displayErr}</span>`;
      }
      this.showToast(`Connection failed: ${err.message}`);
    }
  }

  handleClearApiKey() {
    this.geminiApiKey = '';
    localStorage.removeItem(STORAGE_KEYS.GEMINI_KEY);
    this.renderSettings();
    this.showToast('API key removed from browser storage.');
  }

  /* -------------------------------------------------------------------------
     DAY 5: AI BULLET REWRITER (GOOGLE XYZ FORMULA)
     ------------------------------------------------------------------------- */
  openAiBulletModal() {
    const backdrop = document.getElementById('cosAiBulletModalBackdrop');
    if (!backdrop) return;

    // Pre-populate keywords from current ATS gap if available
    const missingChips = document.querySelectorAll('#cosMissingKeywordsWrap .keyword-chip');
    const missingKeywords = Array.from(missingChips).map(c => c.textContent.trim()).filter(Boolean);
    const keywordsInput = document.getElementById('cosAiBulletFocusKeywords');
    if (keywordsInput && (!keywordsInput.value || keywordsInput.value.length < 3)) {
      keywordsInput.value = missingKeywords.length > 0
        ? missingKeywords.slice(0, 6).join(', ')
        : 'Distributed Systems, Redis Caching, High-Scale Microservices, PostgreSQL, CI/CD';
    }

    const tierSelect = document.getElementById('cosAiBulletTierSelect');
    if (tierSelect) tierSelect.value = this.currentRoleTier || 'lead';

    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Auto-generate if empty
    const resultsContainer = document.getElementById('cosAiBulletResults');
    if (resultsContainer && resultsContainer.children.length === 0) {
      this.handleRunAiBulletRewrite();
    }
  }

  closeAiBulletModal() {
    const backdrop = document.getElementById('cosAiBulletModalBackdrop');
    if (backdrop) {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  resetAiBulletModalDefaults() {
    const roleSelect = document.getElementById('cosAiBulletRoleSelect');
    const tierSelect = document.getElementById('cosAiBulletTierSelect');
    const keywordsInput = document.getElementById('cosAiBulletFocusKeywords');
    if (roleSelect) roleSelect.value = 'rapidops-lead';
    if (tierSelect) tierSelect.value = 'lead';
    if (keywordsInput) keywordsInput.value = 'Distributed Systems, Redis Caching, High-Scale Microservices, PostgreSQL, CI/CD';
    this.handleRunAiBulletRewrite();
  }

  async handleRunAiBulletRewrite() {
    const role = document.getElementById('cosAiBulletRoleSelect')?.value || 'rapidops-lead';
    const tier = document.getElementById('cosAiBulletTierSelect')?.value || 'lead';
    const focusKeywords = document.getElementById('cosAiBulletFocusKeywords')?.value || '';
    const jdText = document.getElementById('cosJdInput')?.value || '';
    const resultsContainer = document.getElementById('cosAiBulletResults');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = `
      <div class="cos-ai-loader">
        <div class="cos-ai-spinner"></div>
        <p style="font-size:0.88rem; color:var(--accent-cyan-light); font-weight:600; margin:0;">
          ${this.geminiApiKey ? '✨ Gemini AI synthesizing XYZ accomplishment bullets...' : '⚡ Calibrating high-impact XYZ accomplishment bullets...'}
        </p>
        <span style="font-size:0.75rem; color:var(--text-muted);">Calibrating for ${tier.toUpperCase()} tier with target ATS keywords</span>
      </div>
    `;

    let bullets = [];
    let sourceLabel = 'Rule-Based Engine';

    if (this.geminiApiKey) {
      try {
        const profileInfo = ProfileStore.getProfileInfo();
        const topSkills = ProfileStore.getSkills().slice(0, 10).map(s => s.name).join(', ');
        const prompt = `You are a Staff Technical Recruiter and Principal Resume Architect specializing in high-concurrency systems.
Candidate: ${profileInfo.name} (${profileInfo.yearsExperience || '10'} years experience, ${profileInfo.role} at ${profileInfo.currentCompany || 'Technology Firm'}).
Core Tech: ${topSkills || 'Node.js, TypeScript, Python, React, PostgreSQL, Redis, Elasticsearch, Docker, Kubernetes, Microservices'}.
Role Calibration Tier: ${tier} (staff = systems strategy & governance, lead = squad mentorship & delivery velocity, senior = hands-on high QPS & concurrency).
Target Experience: ${role === 'rapidops-lead' ? (profileInfo.currentCompany ? `${profileInfo.role} @ ${profileInfo.currentCompany}` : 'Technical Lead') : role === 'rapidops-senior' ? 'Senior Systems Engineer' : 'Senior Systems Consultant'}
Job Description Excerpt: ${jdText ? jdText.slice(0, 800) : 'High-throughput microservices architecture and cloud backend systems'}
Target ATS Keywords to Weave In: ${focusKeywords || 'Microservices, Redis, PostgreSQL, Latency'}

Craft 3 distinct, high-impact resume bullet points strictly following Google's XYZ formula:
"Accomplished [X] as measured by [Y] by doing [Z]"

Respond ONLY with a valid JSON array of objects with keys "bullet", "metric", and "keywords". Example format:
[
  {
    "bullet": "Architected distributed Node.js microservices processing 50,000+ QPS with sub-25ms P99 latency by implementing Redis multi-tier caching and PostgreSQL connection pooling.",
    "metric": "50,000+ QPS with sub-25ms P99 latency",
    "keywords": ["Node.js microservices", "50,000+ QPS", "sub-25ms P99", "Redis multi-tier caching", "PostgreSQL"]
  }
]`;

        const responseText = await this.callGeminiApi(prompt);
        let cleanJsonStr = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
        const jsonMatch = cleanJsonStr.match(/\[[\s\S]*\]/);
        if (jsonMatch) cleanJsonStr = jsonMatch[0];

        const parsed = JSON.parse(cleanJsonStr);
        if (Array.isArray(parsed) && parsed.length > 0) {
          bullets = parsed;
          sourceLabel = `Gemini AI (${this.geminiModel})`;
        }
      } catch (err) {
        console.warn('Gemini bullet rewrite error, falling back to rule engine:', err);
        this.showToast('Using high-precision rule engine fallback.');
      }
    }

    if (bullets.length === 0) {
      sourceLabel = 'Calibrated Rule Engine';
      if (tier === 'staff') {
        bullets = [
          {
            bullet: `Directed systems architecture across 4 engineering squads, scaling enterprise microservices to 50k QPS with 99.95% uptime by introducing domain-driven boundaries and Redis caching layers.`,
            metric: `50k QPS & 99.95% availability`,
            keywords: ['Systems Architecture', 'Enterprise Microservices', '50k QPS', '99.95% Uptime', 'Redis Caching']
          },
          {
            bullet: `Cut enterprise search latency by 65% across 10M+ documents by architecting an event-driven Elasticsearch pipeline with zero-downtime blue/green reindexing.`,
            metric: `65% search latency reduction across 10M+ docs`,
            keywords: ['Elasticsearch', '10M+ Documents', 'Event-Driven Pipeline', 'Blue/Green Reindexing']
          },
          {
            bullet: `Reduced cross-service deployment failures by 80% and elevated engineering velocity by driving enterprise RFC governance, containerized CI/CD, and Kubernetes orchestration.`,
            metric: `80% reduction in deployment failures`,
            keywords: ['RFC Governance', 'Kubernetes Orchestration', 'CI/CD Automation', 'Docker']
          }
        ];
      } else if (tier === 'senior') {
        bullets = [
          {
            bullet: `Engineered core Node.js & Python backend microservices handling 50,000+ QPS under peak loads with sub-25ms P99 latency by optimizing asynchronous event loops and Redis connection pooling.`,
            metric: `50k QPS with sub-25ms P99 latency`,
            keywords: ['Node.js', 'Python', '50k QPS', 'Sub-25ms P99 Latency', 'Redis Connection Pooling']
          },
          {
            bullet: `Eliminated memory leaks and reduced database CPU overhead by 32% across high-concurrency PostgreSQL clusters by refactoring queries and implementing Redis read-through caching.`,
            metric: `32% database CPU reduction`,
            keywords: ['PostgreSQL Optimization', 'Memory Leak Elimination', 'Redis Read-Through Caching']
          },
          {
            bullet: `Automated test coverage to 92% across all REST microservices by establishing comprehensive unit, integration, and load testing pipelines in GitHub Actions.`,
            metric: `92% automated test coverage`,
            keywords: ['92% Test Coverage', 'REST Microservices', 'Integration Testing', 'CI/CD']
          }
        ];
      } else {
        bullets = [
          {
            bullet: `Mentored squad of 15+ engineers and accelerated bi-weekly sprint delivery velocity by 35% by implementing automated code review standards and CI/CD pipelines.`,
            metric: `35% sprint velocity increase across 15+ engineers`,
            keywords: ['Engineering Leadership', '15+ Engineers Mentored', '35% Sprint Velocity', 'CI/CD']
          },
          {
            bullet: `Delivered high-throughput microservices architecture serving 50k QPS with 99.95% SLA by implementing Redis caching and PostgreSQL query optimization.`,
            metric: `50k QPS with 99.95% SLA`,
            keywords: ['Microservices Architecture', '50k QPS', '99.95% SLA', 'Redis', 'PostgreSQL']
          },
          {
            bullet: `Spearheaded enterprise analytics and search engine for 10M+ records by migrating legacy monolithic queries to Elasticsearch and event-driven Node.js workers.`,
            metric: `Search scale across 10M+ records`,
            keywords: ['Elasticsearch', '10M+ Records', 'Event-Driven Architecture', 'Node.js']
          }
        ];
      }
    }

    resultsContainer.innerHTML = bullets.map((item, idx) => `
      <div class="cos-ai-bullet-card">
        <div class="cos-ai-bullet-header">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span style="font-weight:700; font-size:0.85rem; color:var(--accent-cyan-light);">Google XYZ Bullet #${idx + 1}</span>
            <span class="cos-ai-pill">${sourceLabel}</span>
          </div>
          <span style="font-size:0.72rem; color:var(--text-muted); font-family:var(--font-mono);">${tier.toUpperCase()} TIER</span>
        </div>
        <div class="cos-ai-bullet-text">
          "${this.escapeHtml(item.bullet)}"
        </div>
        <div class="cos-ai-bullet-footer">
          <div style="display:flex; gap:0.35rem; flex-wrap:wrap; align-items:center;">
            ${(item.keywords || []).map(k => `
              <span class="keyword-chip matched" style="font-size:0.7rem; padding:0.15rem 0.45rem;">${this.escapeHtml(k)}</span>
            `).join('')}
          </div>
          <div style="display:flex; gap:0.4rem;">
            <button class="btn btn-secondary btn-sm copy-xyz-btn" data-text="${this.escapeHtml(item.bullet)}" style="font-size:0.72rem; padding:0.25rem 0.55rem;">
              📋 Copy
            </button>
            <button class="btn btn-primary btn-sm inject-xyz-btn" data-text="${this.escapeHtml(item.bullet)}" style="font-size:0.72rem; padding:0.25rem 0.55rem;">
              📌 Inject to Resume
            </button>
          </div>
        </div>
      </div>
    `).join('');

    resultsContainer.querySelectorAll('.copy-xyz-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(btn.dataset.text);
        this.showToast('Copied XYZ bullet to clipboard!');
      });
    });

    resultsContainer.querySelectorAll('.inject-xyz-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.injectBulletIntoLiveResume(btn.dataset.text);
      });
    });
  }

  injectBulletIntoLiveResume(bulletText) {
    const firstBulletList = document.querySelector('#resumePreviewPanel .resume-bullets');
    if (firstBulletList) {
      const li = document.createElement('li');
      li.style.background = 'rgba(6,182,212,0.15)';
      li.style.borderLeft = '3px solid var(--accent-cyan-light)';
      li.style.padding = '0.35rem 0.5rem';
      li.style.borderRadius = '3px';
      li.style.marginBottom = '0.35rem';
      li.innerHTML = `<strong>[✨ XYZ Optimized]</strong> ${this.escapeHtml(bulletText)}`;
      firstBulletList.insertBefore(li, firstBulletList.firstChild);
      this.closeAiBulletModal();
      this.showToast('✨ Injected XYZ accomplishment into live resume draft!');
    } else {
      navigator.clipboard.writeText(bulletText);
      this.showToast('Copied XYZ bullet to clipboard!');
    }
  }

  /* -------------------------------------------------------------------------
     DAY 5: AI COVER LETTER PERSONALIZER
     ------------------------------------------------------------------------- */
  async handleAiCoverLetterSynthesis() {
    if (!this.geminiApiKey) {
      this.showToast('Add your free Gemini API key in Settings for AI synthesis! Generating with calibrated rules.');
      this.generateCoverLetter();
      return;
    }

    const company = document.getElementById('clTargetCompany')?.value.trim() || 'Target Company';
    const role = document.getElementById('clTargetRole')?.value.trim() || 'Technical Lead / Systems Architect';
    const manager = document.getElementById('clHiringManager')?.value.trim() || 'Engineering Hiring Committee';
    const tone = document.getElementById('clToneSelector')?.value || 'us';
    const tier = this.currentCoverLetterTier || 'lead';
    const customHighlights = document.getElementById('clCustomHighlights')?.value.trim() || '';

    // Collect selected flagship project spotlights
    const spotlights = [];
    if (document.getElementById('clSpotlightHighScale')?.checked) spotlights.push('50k QPS Microservices Engine (Node.js + Redis)');
    if (document.getElementById('clSpotlightEs')?.checked) spotlights.push('10M+ Enterprise Search Platform (Elasticsearch)');
    if (document.getElementById('clSpotlightEnterprise')?.checked) spotlights.push('Enterprise ERP Microservices Modernization');
    if (document.getElementById('clSpotlightK8s')?.checked) spotlights.push('Container CI/CD (Docker & Kubernetes)');

    const paper = document.getElementById('clOutputPaper');
    if (!paper) return;

    paper.innerHTML = `
      <div class="cos-ai-loader">
        <div class="cos-ai-spinner"></div>
        <p style="font-size:0.95rem; color:var(--accent-cyan-light); font-weight:600; margin:0;">
          ✨ Gemini AI synthesizing bespoke cover letter for ${this.escapeHtml(company)}...
        </p>
        <span style="font-size:0.78rem; color:var(--text-muted);">Calibrating for ${tier.toUpperCase()} tier with ${tone.toUpperCase()} cultural tone</span>
      </div>
    `;

    try {
      const profileInfo = ProfileStore.getProfileInfo();
      const topSkills = ProfileStore.getSkills().slice(0, 10).map(s => s.name).join(', ');
      const prompt = `You are ${profileInfo.name}, an accomplished ${profileInfo.yearsExperience || '10'}-year veteran ${profileInfo.role} based in ${profileInfo.location || 'Ahmedabad, India'}.
Your core tech stack: ${topSkills || 'Node.js, TypeScript, Python (FastAPI), React, PostgreSQL, Redis, Elasticsearch, Docker, Kubernetes, High-Scale Microservices'}.
You are writing a tailored cover letter for:
- Company: ${company}
- Role: ${role}
- Hiring Committee: ${manager}
- Role Level: ${tier} (staff = strategic systems design & architecture, lead = squad mentorship & agile microservices delivery, senior = hands-on high QPS microservices & low latency)
- Cultural Tone: ${tone} (us = direct, ROI, metrics-driven; eu = structured, engineering rigor, GMT/CET remote overlap; uae = enterprise scale, high-volume consumer systems, immediate relocation readiness; apac = collaborative, egalitarian, verified referees; startup = 0-to-1 builder, high velocity)
- Flagship achievements to spotlight: ${spotlights.join(', ') || '50k QPS microservices, Redis caching, 15+ engineer mentorship'}
- Specific Context / JD notes: ${customHighlights || 'Full-stack engineering leadership and distributed systems scale'}

Write an engaging, compelling 3-4 paragraph cover letter.
Return ONLY valid HTML paragraphs (<p>...</p>) for the body paragraphs. Do not wrap in markdown code blocks.`;

      const aiResponse = await this.callGeminiApi(prompt);
      const cleanHtml = aiResponse.replace(/```html/gi, '').replace(/```/g, '').trim();

      const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const fullLetterHtml = `
        <div class="cl-letterhead">
          <div class="cl-applicant-name">${this.escapeHtml(profileInfo.name.toUpperCase())}</div>
          <div class="cl-applicant-role">${this.escapeHtml(profileInfo.role)} • ${this.escapeHtml(profileInfo.yearsExperience || '10')} Years Experience</div>
          <div class="cl-contact">
            ${this.escapeHtml(profileInfo.location || '')} • ${this.escapeHtml(profileInfo.email || '')} • ${this.escapeHtml(profileInfo.phone || '')} • ${this.escapeHtml(profileInfo.linkedin || '')} • ${this.escapeHtml(profileInfo.github || '')}
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
          <div class="cos-ai-pill">
            <span>✨ Synthesized by Gemini AI (${this.geminiModel})</span>
            <span>•</span>
            <span>${tone.toUpperCase()} TONE</span>
            <span>•</span>
            <span>${tier.toUpperCase()} TIER</span>
          </div>
          <div style="font-size:0.78rem; color:var(--text-muted); font-family:var(--font-mono);">${currentDate}</div>
        </div>

        <div class="cl-recipient-box">
          <div><strong>${this.escapeHtml(manager)}</strong></div>
          <div>${this.escapeHtml(company)}</div>
        </div>

        <div class="cl-subject-line">
          <strong>RE: Application for ${this.escapeHtml(role)}</strong>
        </div>

        <div class="cl-body">
          ${cleanHtml}
        </div>

        <div class="cl-signoff">
          <p>Sincerely,</p>
          <div class="cl-signature-hand">${this.escapeHtml(profileInfo.name)}</div>
          <div style="font-size:0.85rem; font-weight:700; color:#0f172a;">${this.escapeHtml(profileInfo.name)}</div>
          <div style="font-size:0.75rem; color:#64748b;">${this.escapeHtml(profileInfo.role)}</div>
        </div>
      `;

      paper.innerHTML = fullLetterHtml;
      this.currentCoverLetterText = paper.innerText;
      this.showToast(`✨ Bespoke cover letter synthesized for ${company}!`);
    } catch (err) {
      console.warn('AI cover letter error:', err);
      this.showToast('AI request failed. Generating with calibrated rule engine.');
      this.generateCoverLetter();
    }
  }

  /* -------------------------------------------------------------------------
     DAY 5: AI INTERVIEW SIMULATION & ROLE COACH
     ------------------------------------------------------------------------- */
  openAiInterviewModal(company = '', role = '', round = '') {
    const backdrop = document.getElementById('cosAiInterviewModalBackdrop');
    if (!backdrop) return;

    if (company) document.getElementById('cosAiIntCompany').value = company;
    if (role) document.getElementById('cosAiIntRole').value = role;
    if (round) {
      const select = document.getElementById('cosAiIntRound');
      if (select) select.value = round;
    }

    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';

    const resultsContainer = document.getElementById('cosAiInterviewResults');
    if (resultsContainer && resultsContainer.children.length === 0) {
      this.handleRunAiInterviewSim();
    }
  }

  closeAiInterviewModal() {
    const backdrop = document.getElementById('cosAiInterviewModalBackdrop');
    if (backdrop) {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  async handleRunAiInterviewSim() {
    const company = document.getElementById('cosAiIntCompany')?.value.trim() || 'Stripe';
    const role = document.getElementById('cosAiIntRole')?.value.trim() || 'Technical Lead';
    const round = document.getElementById('cosAiIntRound')?.value || 'system_design';
    const topics = document.getElementById('cosAiIntTopics')?.value.trim() || '';
    const resultsContainer = document.getElementById('cosAiInterviewResults');
    if (!resultsContainer) return;

    resultsContainer.innerHTML = `
      <div class="cos-ai-loader">
        <div class="cos-ai-spinner"></div>
        <p style="font-size:0.88rem; color:var(--accent-cyan-light); font-weight:600; margin:0;">
          ${this.geminiApiKey ? '✨ Gemini AI generating interview simulation brief...' : '⚡ Compiling role-specific interview simulation...'}
        </p>
        <span style="font-size:0.75rem; color:var(--text-muted);">${company} • ${role} • ${round.replace('_', ' ').toUpperCase()}</span>
      </div>
    `;

    let briefHtml = '';

    if (this.geminiApiKey) {
      try {
        const profileInfo = ProfileStore.getProfileInfo();
        const topSkills = ProfileStore.getSkills().slice(0, 10).map(s => s.name).join(', ');
        const prompt = `You are a Principal Systems Architect and Executive Hiring Manager at ${company}.
Candidate: ${profileInfo.name} (${profileInfo.yearsExperience || '10'}-year veteran ${profileInfo.role}).
Candidate Profile: ${topSkills || 'Node.js, TypeScript, Python, React, PostgreSQL, Redis, Elasticsearch, Docker, Kubernetes'}, microservices architecture, technical squad leadership at ${profileInfo.currentCompany || 'Rapidops'}.
Simulating: ${round.replace('_', ' ').toUpperCase()} round for ${role} at ${company}.
Focus Topics: ${topics || 'High QPS microservices, Redis caching, P99 latency, squad mentorship'}

Generate a high-yield Interview Simulation Brief formatted as clean HTML:
1. <h4 style="color:var(--accent-cyan-light); margin-bottom:0.5rem;">🎯 Top 4 High-Probability Questions for this Round</h4>
   Include 4 questions specific to ${company}'s scale, followed by concise STAR talking points and architecture trade-offs.
2. <h4 style="color:#a855f7; margin:1rem 0 0.5rem;">🏗️ Architectural Case Studies from ${profileInfo.name}'s Portfolio to Highlight</h4>
   Show exactly how to bring up real-world system architecture, data throughput, and squad leadership.
3. <h4 style="color:#10b981; margin:1rem 0 0.5rem;">💡 3 Strategic Reverse Questions to Ask the Interviewer</h4>
   Questions demonstrating senior architectural ownership.

Return ONLY clean HTML with no wrapping markdown codeblocks.`;

        const responseText = await this.callGeminiApi(prompt);
        briefHtml = responseText.replace(/```html/gi, '').replace(/```/g, '').trim();
      } catch (err) {
        console.warn('Gemini interview sim error:', err);
        this.showToast('Using calibrated rule engine fallback.');
      }
    }

    if (!briefHtml) {
      briefHtml = `
        <div class="cos-ai-interview-qa">
          <div class="cos-ai-q-title">
            <span>❓</span>
            <span>Q1: How would you design a distributed microservices architecture to handle 50,000+ QPS with sub-25ms P99 latency?</span>
          </div>
          <div class="cos-ai-a-box">
            <strong>Key Talking Points (${this.escapeHtml(ProfileStore.getProfileInfo().name)}'s Experience):</strong><br>
            • <em>Layered Caching:</em> Implement multi-tier Redis caching (L1 local in-memory LRU + L2 distributed Redis cluster with read-through replication).<br>
            • <em>Asynchronous Decoupling:</em> Offload writes and audit logs to message queues to keep HTTP request-response cycles ultra-lean.<br>
            • <em>Database Tier:</em> Connection pooling (PgBouncer), read replicas with connection routing, and partitioned tables by time/tenant.<br>
            • <em>Resilience:</em> Circuit breakers, aggressive timeouts, and graceful degradation during cache misses.
          </div>
        </div>

        <div class="cos-ai-interview-qa">
          <div class="cos-ai-q-title">
            <span>❓</span>
            <span>Q2: How do you handle zero-downtime schema migrations and search re-indexing on a live database with 10M+ records?</span>
          </div>
          <div class="cos-ai-a-box">
            <strong>Key Talking Points:</strong><br>
            • <em>Expand & Contract Pattern:</em> Add nullable columns first, deploy code writing to both old and new schema, backfill asynchronously in batches, then contract.<br>
            • <em>Elasticsearch Blue/Green Aliases:</em> Create new index with updated mappings, stream CDC/Kafka changes, run historical re-index worker, flip ES index alias with 0ms downtime.
          </div>
        </div>

        <div class="cos-ai-interview-qa">
          <div class="cos-ai-q-title">
            <span>❓</span>
            <span>Q3: How do you lead a squad of 15+ engineers through technical debt while maintaining aggressive sprint velocity?</span>
          </div>
          <div class="cos-ai-a-box">
            <strong>Key Talking Points:</strong><br>
            • <em>The 80/20 Rule:</em> Reserve 20% of every sprint for tech debt, refactoring, and test infrastructure.<br>
            • <em>RFC Culture:</em> Require Lightweight Architectural RFCs for major changes so junior and mid-level devs have clear technical roadmaps before writing code.<br>
            • <em>Automated Guardrails:</em> Linters, static analysis, and automated PR test gates to prevent new debt from entering main.
          </div>
        </div>

        <div style="margin-top:1.25rem;">
          <h4 style="font-size:0.9rem; font-weight:700; color:#10b981; margin-bottom:0.5rem; display:flex; align-items:center; gap:0.4rem;">
            <span>💡</span>
            <span>Strategic Reverse Questions to Ask the ${this.escapeHtml(company)} Interviewers</span>
          </h4>
          <div class="cos-ai-reverse-q">
            <strong>1.</strong> "How does your engineering team measure and manage the trade-off between quarterly feature velocity and architectural platform reliability?"
          </div>
          <div class="cos-ai-reverse-q">
            <strong>2.</strong> "What is the single biggest distributed scaling bottleneck your team is currently solving as you expand to more concurrent users?"
          </div>
          <div class="cos-ai-reverse-q">
            <strong>3.</strong> "How are architectural decisions governed across different squad domains — is it centralized through Staff RFCs or decentralized within autonomous squads?"
          </div>
        </div>
      `;
    }

    resultsContainer.innerHTML = briefHtml;
    this.currentAiInterviewBrief = resultsContainer.innerText;
    this.showToast(`✨ Generated interview simulation brief for ${company}!`);
  }

  handleCopyAiInterviewBrief() {
    const briefText = this.currentAiInterviewBrief || document.getElementById('cosAiInterviewResults')?.innerText;
    if (briefText) {
      navigator.clipboard.writeText(briefText);
      this.showToast('📋 Interview simulation brief copied to clipboard!');
    } else {
      this.showToast('No brief available to copy. Generate one first!');
    }
  }

  exportBackupJSON() {
    const candidateName = ProfileStore.getProfileInfo().name || 'Candidate';
    const safeName = candidateName.replace(/[^a-zA-Z0-9_-]/g, '_');
    const backupData = {
      system: 'CareerOS Command Center',
      version: '2.0',
      exportedAt: new Date().toISOString(),
      applicant: candidateName,
      meta: {
        totalJobs: this.jobs.length,
        totalInterviews: this.interviews.length,
        totalTracks: this.learningTracks.length,
        totalCoverLetters: this.coverLetters.length,
        prepTimeHours: this.learningHours
      },
      jobs: this.jobs,
      interviews: this.interviews,
      learningTracks: this.learningTracks,
      learningHours: this.learningHours,
      learningLogs: this.learningLogs,
      coverLetters: this.coverLetters,
      geminiModel: this.geminiModel,
      security: 'API keys are strictly excluded from JSON backups for zero-leakage client security.'
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `CareerOS_Backup_${safeName}_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    this.showToast('💾 Exported complete CareerOS JSON Backup!');
  }

  handleImportBackup(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (!imported || typeof imported !== 'object') {
          throw new Error('File does not contain valid CareerOS JSON data');
        }

        if (Array.isArray(imported.jobs)) {
          this.jobs = imported.jobs;
          this.saveJobs();
        }

        if (Array.isArray(imported.interviews)) {
          this.interviews = imported.interviews;
          this.saveInterviews();
        }

        if (Array.isArray(imported.learningTracks)) {
          this.learningTracks = imported.learningTracks;
          this.saveLearning();
        }

        if (typeof imported.learningHours === 'number') {
          this.learningHours = imported.learningHours;
        }

        if (Array.isArray(imported.learningLogs)) {
          this.learningLogs = imported.learningLogs;
          this.saveLearningHours();
        }

        if (Array.isArray(imported.coverLetters)) {
          this.coverLetters = imported.coverLetters;
          this.saveCoverLetters();
        }

        if (imported.geminiModel) {
          this.geminiModel = imported.geminiModel;
          localStorage.setItem(STORAGE_KEYS.GEMINI_MODEL, imported.geminiModel);
        }

        this.renderAll();
        this.updateBadges();

        const jobsCount = imported.jobs ? imported.jobs.length : 0;
        const intCount = imported.interviews ? imported.interviews.length : 0;
        const tracksCount = imported.learningTracks ? imported.learningTracks.length : 0;
        const lettersCount = imported.coverLetters ? imported.coverLetters.length : 0;

        this.showToast(`✨ Restored ${jobsCount} jobs, ${intCount} interviews, ${tracksCount} tracks, and ${lettersCount} cover letters!`);
      } catch (err) {
        console.warn('Backup import error:', err);
        alert('Invalid or corrupted CareerOS JSON backup file.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }

  resetSampleData() {
    if (confirm('Reset all CareerOS data back to clean initial demo data? This will restore sample jobs, interviews, and learning roadmaps.')) {
      this.jobs = [...SEED_JOBS];
      this.interviews = [...SEED_INTERVIEWS];
      this.learningTracks = [...SEED_DREAM_TRACKS];
      this.learningHours = 34.5;
      this.learningLogs = [];
      this.coverLetters = [];
      this.saveJobs();
      this.saveInterviews();
      this.saveLearning();
      this.saveLearningHours();
      this.saveCoverLetters();
      this.renderAll();
      this.updateBadges();
      this.showToast('Reset to clean initial demo data!');
    }
  }

  showToast(message) {
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toastContainer';
      toastContainer.className = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg class="toast-icon" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }
}

// Auto-instantiate upon DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.careerOS = new CareerOS();
});

