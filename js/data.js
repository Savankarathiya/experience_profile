/**
 * =========================================================================
 * PROFILE & PORTFOLIO DATA CONFIGURATION
 * Savan Karathiya - Technical Lead | Full Stack & Systems Architect
 * =========================================================================
 * 
 * NOTE FOR SAVAN:
 * You can easily add, edit, or remove projects, skills, and experiences here!
 * To add your additional projects, simply add a new object to the `PROJECTS_DATA` array.
 */

export const PROFILE_INFO = {
  name: "Savan Karathiya",
  title: "Technical Lead | Full Stack & Systems Architect",
  tagline: "Architecting high-scale distributed systems, robust microservices, and modern web applications with 10+ years of engineering excellence.",
  email: "savankarathiya@gmail.com",
  linkedin: "https://www.linkedin.com/in/savan-karathiya",
  linkedinHandle: "savan-karathiya",
  location: "Greater Ahmedabad Area, Gujarat, India",
  experienceYears: "10+",
  status: "Available for Technical Leadership & Architect Roles",
  workPreference: "Remote / Hybrid / Onsite (Ahmedabad / Relocation Open)",
  summary: `Experienced and Results-Driven Full Stack Web Developer and Technical Lead with 10 years in software development. Proficient in JavaScript, Node.js, React.js, Redux, Python, TypeScript, PostgreSQL, MongoDB, and Elasticsearch, with working knowledge of Java. Hands-on experience in building scalable web applications, developing microservices, implementing core logic, and integrating third-party gateways. Proven track record of identifying root causes, leading engineering squads, and delivering resilient data-driven architectures.`
};

export const RECRUITER_ROLES = [
  {
    id: "tech-lead",
    title: "Technical Lead / Engineering Manager",
    matchPercentage: 99,
    summary: "Proven leader with 10 years of experience driving architectural decisions, mentoring 15+ engineers, enforcing code standards, and managing agile delivery across multi-service enterprise systems.",
    keySkills: ["System Architecture", "Team Mentorship", "Agile/Scrum & Kanban", "Microservices", "Code Reviews & CI/CD", "Cross-functional Collaboration"],
    elevatorPitch: "Savan Karathiya is an accomplished Technical Lead with 10 years in software engineering. Currently leading architecture and high-quality deliveries at Rapidops, previously consultant at Infosys. Expert in balancing technical excellence with business timelines while mentoring high-performing engineering teams.",
    bulletPoints: [
      "Currently serving as Technical Lead at Rapidops, spearheading architectural vision and code quality across service-based solutions.",
      "Mentors engineers in best practices, design patterns, testing automation, and CI/CD pipelines.",
      "Track record of taking complex POCs into high-availability production environments."
    ]
  },
  {
    id: "full-stack-architect",
    title: "Full Stack Architect (React + Node / Python)",
    matchPercentage: 98,
    summary: "Deep full-stack mastery spanning modern frontend frameworks (React, Next.js, Redux, D3.js) and high-concurrency backends (Node.js, Express, Hapi, FastAPI, Python).",
    keySkills: ["React.js", "Node.js", "TypeScript", "Next.js", "Python / FastAPI", "PostgreSQL / MongoDB", "REST & WebSockets"],
    elevatorPitch: "With a decade of hands-on full-stack development, Savan bridges polished, accessible frontend user experiences with rock-solid, resilient backend APIs and databases. Ex-Infosys Consultant where he led enterprise React.js solutions.",
    bulletPoints: [
      "Architected enterprise React frontends with state management (Redux, React Query) and complex visualizations (D3.js, Cytoscape).",
      "Designed RESTful microservices in Node.js and FastAPI with secure authentication (JWT) and third-party gateways.",
      "Deep expertise across relational (PostgreSQL) and NoSQL (MongoDB, Redis) data stores."
    ]
  },
  {
    id: "systems-backend",
    title: "Systems & Backend Specialist (Node.js / Python / High QPS)",
    matchPercentage: 96,
    summary: "Specialized in performance-critical backends, asynchronous I/O, and concurrent microservices pipelines utilizing Node.js, Python (FastAPI), PostgreSQL, Docker, and Kubernetes.",
    keySkills: ["Node.js", "Python", "FastAPI", "Microservices", "Docker & Kubernetes", "Redis Caching", "API Gateways"],
    elevatorPitch: "Savan leverages high-performance asynchronous Node.js and FastAPI microservices with Redis caching to eliminate bottlenecks, cut latency, and deliver resilient cloud-native architectures.",
    bulletPoints: [
      "Proficient in asynchronous Node.js and Python (FastAPI) for high-throughput, low-latency backend services.",
      "Extensive microservices architecture experience with containerization (Docker, Kubernetes) and CI/CD pipelines.",
      "Expertise in caching strategies with Redis and message brokering for high-throughput workloads."
    ]
  },
  {
    id: "data-observability",
    title: "Big Data & Observability Engineer (Elasticsearch, Kibana, Snowflake)",
    matchPercentage: 95,
    summary: "Hands-on experience building Big Data visualization products with Elasticsearch, Kibana, Logstash, Snowflake, Fivetran, and Apache Superset.",
    keySkills: ["Elasticsearch", "Kibana", "Snowflake", "Fivetran", "Apache Superset", "Logstash", "D3.js"],
    elevatorPitch: "Savan has engineered large-scale Big Data visualization products using Elasticsearch and Kibana, combined with cloud data warehousing on Snowflake, automated ETL via Fivetran, and BI dashboards via Apache Superset.",
    bulletPoints: [
      "Built custom Big Data visualization solutions leveraging Elasticsearch indexing and Kibana dashboards.",
      "Integrated modern cloud data stacks including Snowflake data warehousing and Fivetran automated pipelines.",
      "Certified in Palantir Foundry Foundations for enterprise data platforms."
    ]
  }
];

export const SKILLS_CATEGORIES = [
  { id: "all", label: "All Skills" },
  { id: "languages", label: "Languages & Core" },
  { id: "frontend", label: "Frontend & UI" },
  { id: "backend", label: "Backend & Systems" },
  { id: "databases", label: "Databases & Data" },
  { id: "devops", label: "Cloud & DevOps" },
  { id: "testing", label: "Testing & Tools" }
];

export const SKILLS_DATA = [
  // Languages
  { name: "JavaScript (ES6+)", category: "languages", level: 98, experience: "10 yrs", highlight: true, icon: "javascript" },
  { name: "TypeScript", category: "languages", level: 94, experience: "6+ yrs", highlight: true, icon: "typescript" },
  { name: "Python", category: "languages", level: 92, experience: "8+ yrs", highlight: true, icon: "python" },
  { name: "Java", category: "languages", level: 75, experience: "Working Knowledge", highlight: false, icon: "java" },
  { name: "HTML5 & CSS3", category: "languages", level: 96, experience: "10 yrs", highlight: false, icon: "html5" },

  // Frontend
  { name: "React.js", category: "frontend", level: 98, experience: "8+ yrs", highlight: true, icon: "react" },
  { name: "Next.js", category: "frontend", level: 90, experience: "4+ yrs", highlight: true, icon: "nextjs" },
  { name: "Redux & Redux Form", category: "frontend", level: 95, experience: "7+ yrs", highlight: false, icon: "redux" },
  { name: "React Query", category: "frontend", level: 92, experience: "4+ yrs", highlight: false, icon: "reactquery" },
  { name: "D3.js", category: "frontend", level: 85, experience: "Visualization", highlight: true, icon: "d3" },
  { name: "Cytoscape", category: "frontend", level: 84, experience: "Graph Viz", highlight: false, icon: "graph" },
  { name: "Tailwind CSS", category: "frontend", level: 92, experience: "Modern UI", highlight: false, icon: "tailwind" },
  { name: "Bootstrap & jQuery", category: "frontend", level: 90, experience: "Legacy & Modern", highlight: false, icon: "bootstrap" },
  { name: "Webpack & Babel", category: "frontend", level: 88, experience: "Build Tooling", highlight: false, icon: "webpack" },

  // Backend
  { name: "Node.js", category: "backend", level: 96, experience: "9+ yrs", highlight: true, icon: "nodejs" },
  { name: "FastAPI", category: "backend", level: 90, experience: "Top Skill", highlight: true, icon: "fastapi" },
  { name: "Express.js", category: "backend", level: 95, experience: "8+ yrs", highlight: false, icon: "express" },
  { name: "Hapi.js", category: "backend", level: 88, experience: "Enterprise APIs", highlight: false, icon: "hapi" },
  { name: "Microservices", category: "backend", level: 95, experience: "Architecture", highlight: true, icon: "microservices" },
  { name: "RESTful APIs", category: "backend", level: 98, experience: "Design & Impl", highlight: false, icon: "api" },
  { name: "Socket.IO", category: "backend", level: 88, experience: "Real-time", highlight: false, icon: "socketio" },
  { name: "JWT & Security", category: "backend", level: 94, experience: "Auth & Gateways", highlight: false, icon: "security" },

  // Databases & Data Stores
  { name: "PostgreSQL", category: "databases", level: 92, experience: "7+ yrs", highlight: true, icon: "postgresql" },
  { name: "Elasticsearch", category: "databases", level: 94, experience: "Big Data Viz", highlight: true, icon: "elasticsearch" },
  { name: "MongoDB & Mongoose", category: "databases", level: 94, experience: "8+ yrs", highlight: true, icon: "mongodb" },
  { name: "Redis", category: "databases", level: 90, experience: "Caching & Queues", highlight: false, icon: "redis" },
  { name: "Snowflake", category: "databases", level: 85, experience: "Cloud DW", highlight: true, icon: "snowflake" },
  { name: "Fivetran", category: "databases", level: 82, experience: "Data Ingestion", highlight: false, icon: "fivetran" },
  { name: "Apache Superset", category: "databases", level: 84, experience: "BI & Analytics", highlight: false, icon: "superset" },

  // Cloud & DevOps
  { name: "Docker", category: "devops", level: 90, experience: "Containerization", highlight: true, icon: "docker" },
  { name: "Kubernetes", category: "devops", level: 82, experience: "Orchestration", highlight: false, icon: "kubernetes" },
  { name: "Azure (Functions, Apps, Blob)", category: "devops", level: 80, experience: "Cloud Services", highlight: false, icon: "azure" },
  { name: "CI/CD (Jenkins, GitHub Actions)", category: "devops", level: 88, experience: "Pipelines", highlight: false, icon: "cicd" },
  { name: "Git, GitHub, GitLab, Bitbucket", category: "devops", level: 98, experience: "Collaboration", highlight: false, icon: "git" },
  { name: "Logstash & Kibana", category: "devops", level: 90, experience: "Observability", highlight: false, icon: "kibana" },

  // Testing & Methodologies
  { name: "Jest & Mocha", category: "testing", level: 90, experience: "Unit & Integration", highlight: false, icon: "jest" },
  { name: "Selenium & WebdriverIO", category: "testing", level: 82, experience: "E2E Automation", highlight: false, icon: "selenium" },
  { name: "Postman & Hoppscotch", category: "testing", level: 95, experience: "API Testing", highlight: false, icon: "postman" },
  { name: "Agile / Scrum / Kanban", category: "testing", level: 96, experience: "Jira / Trello", highlight: false, icon: "agile" }
];

export const EXPERIENCES_DATA = [
  {
    company: "Rapidops Inc.",
    role: "Technical Lead",
    period: "January 2023 - Present",
    duration: "3+ Years",
    location: "Ahmedabad, Gujarat, India",
    type: "Current Role",
    badge: "Current Leadership",
    summary: "Leading technical architecture, code quality, and on-time delivery across multiple high-impact service-based projects while mentoring cross-functional engineering teams.",
    responsibilities: [
      "Architect and review scalable microservice ecosystems and modern web frontends for global clients.",
      "Define technical roadmaps, establish strict coding standards, and implement automated CI/CD pipelines.",
      "Mentor senior and junior developers on software craftsmanship, clean architecture, and performance optimization.",
      "Interface directly with client stakeholders, product managers, and executive leadership to translate business vision into robust technical implementations.",
      "Drive proof-of-concepts (POCs) in emerging technologies including FastAPI, Node.js microservices, and asynchronous event pipelines for performance-critical services."
    ],
    technologies: ["FastAPI", "Python", "React.js", "Node.js", "TypeScript", "PostgreSQL", "Docker", "Kubernetes", "Microservices", "Azure", "CI/CD", "Jira"]
  },
  {
    company: "Infosys",
    role: "Consultant",
    period: "June 2022 - December 2022",
    duration: "7 Months",
    location: "Pune District, Maharashtra, India",
    type: "Enterprise Consulting",
    badge: "Ex-Infosys",
    summary: "Led React.js-based frontend development for enterprise clients and provided strategic technical guidance to distributed engineering squads.",
    responsibilities: [
      "Spearheaded complex React.js application architecture, optimizing frontend performance and modular state management.",
      "Provided technical consulting and code quality governance to distributed team members across multiple project tracks.",
      "Collaborated on enterprise integration patterns, security compliance, and accessibility standards.",
      "Delivered high-quality sprint milestones with thorough unit testing coverage and peer review standards."
    ],
    technologies: ["React.js", "Redux", "TypeScript", "JavaScript (ES6+)", "Jest", "RESTful APIs", "Git", "Agile/Scrum"]
  },
  {
    company: "Rapidops Inc.",
    role: "Team Lead & Senior Software Developer",
    period: "May 2016 - May 2022",
    duration: "6 Years 5 Months",
    location: "Ahmedabad, Gujarat, India",
    type: "Career Growth Track",
    badge: "6+ Years Tenure",
    summary: "Progressed from Project Trainee to Team Lead, owning product development lifecycles, building Big Data visualization platforms, and leading release cycles.",
    subRoles: [
      {
        title: "Team Lead",
        period: "May 2020 - May 2022",
        description: "Owned product development lifecycle, enforced engineering standards, delivered mission-critical releases, and implemented POCs for emerging technologies."
      },
      {
        title: "Senior Software Developer",
        period: "May 2018 - December 2019",
        description: "Engineered scalable web applications, developed microservices, implemented core backend business logic, and integrated complex third-party payment and API gateways."
      },
      {
        title: "Software Developer",
        period: "May 2016 - April 2018",
        description: "Engineered Big Data Visualization Products working with AngularJS, Node.js, Elasticsearch, Logstash, and Kibana tools for large-scale data analytics."
      },
      {
        title: "Project Trainee",
        period: "January 2016 - April 2016",
        description: "Gained core engineering foundations, assisted in prototype development, and contributed to full-stack web application modules."
      }
    ],
    responsibilities: [
      "Engineered a flagship Big Data Visualization product using Elasticsearch and Kibana with custom Node.js middleware.",
      "Architected RESTful microservices, event-driven integrations, and relational/document database schemas.",
      "Led sprint planning, retrospectives, code reviews, and release deployment engineering.",
      "Championed automated unit and integration testing using Jest, Mocha, and Postman."
    ],
    technologies: ["Node.js", "React.js", "AngularJS", "Elasticsearch", "Kibana", "MongoDB", "PostgreSQL", "Express.js", "Redis", "Docker"]
  }
];

/**
 * =========================================================================
 * PROJECTS & ARCHITECTURE SHOWCASE
 * =========================================================================
 * 
 * SAVAN: Add your extra project details right here!
 * Simply duplicate one of the objects below and customize the fields:
 * - id: unique slug (e.g. 'my-custom-saas')
 * - title: Project name
 * - category: 'microservices' | 'bigdata' | 'cloud' | 'fullstack'
 * - role: Your role on the project
 * - duration: Timeline or year
 * - summary: Short 2-sentence description
 * - problem: The challenge or business problem addressed
 * - solution: The architectural solution you implemented
 * - impact: Measurable metrics or outcomes (e.g. 'Reduced latency by 45%')
 * - technologies: Array of tech tags
 * - metrics: Highlight key stats
 * - architectureHighlights: Array of technical architecture points
 */
export const PROJECTS_DATA = [
  {
    id: "high-throughput-microservices-engine",
    title: "High-Throughput Distributed Microservices Engine",
    category: "microservices",
    categoryLabel: "Microservices & Systems",
    role: "Lead Architect & Systems Designer",
    duration: "2023 - Present",
    client: "Rapidops Enterprise Client",
    summary: "Engineered high-performance, resilient microservices utilizing Node.js and FastAPI to replace legacy bottlenecks, processing millions of concurrent events with sub-millisecond latencies.",
    problem: "A legacy monolith suffered from severe connection pool exhaustion and memory spikes during peak traffic bursts, causing high API response latencies (>850ms) and intermittent outages.",
    solution: "Designed an asynchronous, distributed microservice architecture utilizing high-performance Node.js for event-driven I/O and FastAPI for flexible business logic, backed by Redis caching and PostgreSQL partitioning.",
    impact: "Cut average API latency from 850ms down to 42ms (95% reduction), lowered infrastructure compute costs by 35%, and achieved 99.98% uptime SLA.",
    metrics: [
      { label: "Latency Reduction", value: "95%" },
      { label: "Avg Response Time", value: "42ms" },
      { label: "System Uptime", value: "99.98%" },
      { label: "Infrastructure Savings", value: "35%" }
    ],
    technologies: ["Node.js", "FastAPI", "Python", "TypeScript", "Docker", "Kubernetes", "PostgreSQL", "Redis", "JWT", "GitHub Actions"],
    architectureHighlights: [
      "Non-blocking asynchronous event loop concurrency model in Node.js and Python Asyncio.",
      "Connection pooling and resilient circuit breakers preventing cascading microservice failures.",
      "JWT-based stateless authentication gateway with automated token revocation list in Redis.",
      "Automated CI/CD pipeline building multi-stage minimal Docker images deployed to Kubernetes."
    ]
  },
  {
    id: "big-data-visualization-analytics",
    title: "Enterprise Big Data Visualization & Analytics Engine",
    category: "bigdata",
    categoryLabel: "Big Data & Observability",
    role: "Lead Full Stack & Data Developer",
    duration: "Rapidops Product Track",
    client: "Global Analytics Platform",
    summary: "Built an interactive big data visualization product indexing terabytes of log and transaction data using Elasticsearch, Kibana, Node.js, and D3.js.",
    problem: "Enterprise stakeholders were struggling to extract actionable insights from billions of unstructured log events due to slow search queries and inflexible, static reporting tools.",
    solution: "Engineered a high-performance aggregation and visualization pipeline: Logstash for ingestion, Elasticsearch for partitioned multi-index cluster querying, and custom D3.js + Cytoscape graph views in React.",
    impact: "Accelerated query retrieval speeds by 10x, enabling non-technical business analysts to render multi-dimensional visual dashboards across 50M+ records in real time.",
    metrics: [
      { label: "Query Speedup", value: "10x" },
      { label: "Data Scaled", value: "Terabytes" },
      { label: "Record Aggregation", value: "50M+" },
      { label: "Dashboard Load Time", value: "< 1.2s" }
    ],
    technologies: ["Elasticsearch", "Kibana", "Logstash", "Node.js", "React.js", "D3.js", "Cytoscape", "MongoDB", "Express.js"],
    architectureHighlights: [
      "Custom Elasticsearch index mapping and pipeline aggregations optimized for time-series telemetry.",
      "Dynamic data visualization components built with D3.js and Cytoscape for network graph relationships.",
      "Robust caching layer mitigating database load for recurring executive metric calculations."
    ]
  },
  {
    id: "cloud-dw-modern-etl-platform",
    title: "Modern Cloud Data Warehouse & BI Platform",
    category: "cloud",
    categoryLabel: "Cloud & Data Engineering",
    role: "Technical Lead",
    duration: "Rapidops Cloud Initiatives",
    client: "Data Infrastructure Solution",
    summary: "Architected a unified enterprise data warehouse combining Snowflake, Fivetran ingestion pipelines, Apache Superset self-service BI, and Azure cloud integration.",
    problem: "Siloed departmental databases (PostgreSQL, MongoDB, external APIs) resulted in fragmented reporting, stale dashboards, and manual weekly spreadsheet reconciliation.",
    solution: "Consolidated all disparate data sources into a centralized Snowflake cloud data warehouse via automated Fivetran sync pipelines, delivering self-service business intelligence dashboards via Apache Superset.",
    impact: "Eliminated 100% of manual reporting overhead, provided real-time cross-departmental dashboards, and ensured strict data governance and row-level access control.",
    metrics: [
      { label: "Data Pipeline Sync", value: "Automated" },
      { label: "Reporting Overhead", value: "-100%" },
      { label: "Dashboards Deployed", value: "30+" },
      { label: "Data Sources Unified", value: "6+" }
    ],
    technologies: ["Snowflake", "Fivetran", "Apache Superset", "Azure Blob Storage", "Azure Functions", "PostgreSQL", "Python"],
    architectureHighlights: [
      "Automated zero-maintenance ETL data pipelines with Fivetran connectors.",
      "Role-based access control (RBAC) and data masking schemas configured in Snowflake.",
      "Apache Superset embedded analytics dashboards with customizable slice-and-dice exploration."
    ]
  },
  {
    id: "enterprise-react-frontend-system",
    title: "Enterprise React.js Architecture & Micro-Frontend Design System",
    category: "fullstack",
    categoryLabel: "Modern Web & Architecture",
    role: "Lead Consultant / Technical Lead",
    duration: "Infosys & Rapidops",
    client: "Enterprise Web Applications",
    summary: "Led frontend architecture engineering for modular, high-scale React.js applications with Next.js, Redux, React Query, and Tailwind CSS design systems.",
    problem: "Multiple engineering teams were building redundant UI components with inconsistent design patterns, fragmented state synchronization, and sub-optimal core web vitals.",
    solution: "Designed and distributed an enterprise-grade component design system with TypeScript, strict linting, optimistic UI caching with React Query, and atomic state with Redux.",
    impact: "Boosted team development velocity by 40%, achieved 98+ Google Lighthouse performance scores, and ensured 100% WCAG accessibility compliance.",
    metrics: [
      { label: "Dev Velocity", value: "+40%" },
      { label: "Lighthouse Score", value: "98/100" },
      { label: "Code Reusability", value: "85%" },
      { label: "Accessibility", value: "WCAG AA" }
    ],
    technologies: ["React.js", "Next.js", "TypeScript", "Redux", "React Query", "Tailwind CSS", "Webpack", "Jest"],
    architectureHighlights: [
      "Atomic design system with zero-runtime CSS tokens and customizable themes.",
      "Intelligent cache invalidation and background re-fetching via React Query.",
      "Rigorous unit and snapshot testing with Jest and React Testing Library."
    ]
  }
];

export const EDUCATION_DATA = [
  {
    degree: "Master of Computer Applications (MCA)",
    field: "Computer Programming & Advanced Software Systems",
    institution: "Sarvoday College of Management and Technology (Integrated campus) / Gujarat Technological University",
    period: "2014 - 2016",
    details: "Advanced curriculum covering Distributed Computing, Advanced Database Management Systems, Object-Oriented Software Engineering, and Algorithm Design."
  },
  {
    degree: "Bachelor of Computer Application (BCA)",
    field: "Computer Applications & Programming",
    institution: "C.U SHAH College of Management and Computer Education",
    period: "2012 - 2014",
    details: "Core foundations in Data Structures, Web Technologies, Database Systems, Software Engineering Methodologies, and Network Protocols."
  },
  {
    degree: "Diploma in Computer Engineering",
    field: "Information Technology",
    institution: "C.U SHAH Institute of Diploma Studies",
    period: "2007 - 2010",
    details: "Foundational computer science, programming fundamentals (C/C++), hardware architectures, and operating system principles."
  },
  {
    degree: "Higher Secondary (High School)",
    field: "General Studies & Sciences",
    institution: "D.N.T High School",
    period: "2004 - 2007",
    details: "Strong academic foundation in Mathematics, Science, and Analytical Problem Solving."
  }
];

export const CERTIFICATIONS_DATA = [
  {
    title: "Palantir Foundry Foundations",
    issuer: "Palantir Technologies",
    badgeUrl: "assets/palantir_badge.svg",
    description: "Certified proficiency in enterprise data integration, ontology modeling, pipeline workflows, and secure analytical platform architecture on Palantir Foundry.",
    skillsAcquired: ["Enterprise Ontology", "Data Pipeline Governance", "Transform Workflows", "Data Security & Access Controls"]
  }
];

export const LANGUAGES_DATA = [
  { name: "English", proficiency: "Professional Working Proficiency", level: 90 },
  { name: "Hindi", proficiency: "Full Professional / Fluent", level: 95 },
  { name: "Gujarati", proficiency: "Native / Bilingual", level: 100 }
];
