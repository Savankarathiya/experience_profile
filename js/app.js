/**
 * =========================================================================
 * SAVAN KARATHIYA - INTERACTIVE PORTFOLIO & RECRUITER HUB ENGINE
 * =========================================================================
 */

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

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroConsole();
  initRecruiterHub();
  initSkillsMatrix();
  initExperienceTimeline();
  initProjectsShowcase();
  initEducationAndCertifications();
  initContactHub();
  initModal();
  initPrintTriggers();
});

/* -------------------------------------------------------------------------
   1. NAVBAR & NAVIGATION
   ------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('mainNavbar');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  const recruiterToggle = document.getElementById('recruiterModeToggle');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateScrollSpy();
  });

  // Mobile menu toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isExpanded = navLinks.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // Recruiter mode toggle in navbar
  if (recruiterToggle) {
    recruiterToggle.addEventListener('click', () => {
      const isActive = document.body.classList.toggle('recruiter-mode-active');
      recruiterToggle.classList.toggle('active', isActive);

      if (isActive) {
        showToast('⚡ Recruiter Command Mode Activated!');
        const hubSection = document.getElementById('recruiter-hub');
        if (hubSection) {
          hubSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        showToast('Switched back to standard view');
      }
    });
  }
}

function updateScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`);

    if (navLink) {
      if (scrollPos >= top && scrollPos < top + height) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }
  });
}

/* -------------------------------------------------------------------------
   2. HERO CONSOLE INTERACTIVE TABS
   ------------------------------------------------------------------------- */
function initHeroConsole() {
  const tabButtons = document.querySelectorAll('.console-tab-btn');
  const consoleBody = document.getElementById('consoleCodeBody');

  const consoleContent = {
    'system_info.sh': `
<span class="code-comment"># Engineer & Leadership Specification</span>
<span class="code-keyword">export</span> NAME=<span class="code-str">"Savan Karathiya"</span>
<span class="code-keyword">export</span> ROLE=<span class="code-str">"Technical Lead & Systems Architect"</span>
<span class="code-keyword">export</span> EXPERIENCE_YEARS=<span class="code-num">10</span>
<span class="code-keyword">export</span> CURRENT_COMPANY=<span class="code-str">"Rapidops Inc."</span>
<span class="code-keyword">export</span> PREVIOUS_CONSULTING=<span class="code-str">"Infosys"</span>
<span class="code-keyword">export</span> CORE_SYSTEMS=(<span class="code-str">"TypeScript"</span> <span class="code-str">"Python"</span> <span class="code-str">"React"</span> <span class="code-str">"Node"</span> <span class="code-str">"Elasticsearch"</span>)
<span class="code-keyword">export</span> STATUS=<span class="code-str">"ACTIVE_AVAILABLE"</span>
<span class="code-fn">echo</span> <span class="code-str">"System optimal. Ready to build high-scale distributed architectures."</span>
`,
    'tech_stack.ts': `
<span class="code-comment">// High-Performance Architecture Blueprint in TypeScript</span>
<span class="code-keyword">export interface</span> <span class="code-fn">SavanKarathiya</span> {
    title: <span class="code-str">string</span>;
    tenure_years: <span class="code-num">10</span>;
    core_languages: <span class="code-str">string</span>[];
    architecture_pattern: <span class="code-str">string</span>;
}

<span class="code-keyword">export const</span> <span class="code-fn">profile</span>: <span class="code-fn">SavanKarathiya</span> = {
    title: <span class="code-str">"Technical Lead & Systems Architect"</span>,
    tenure_years: <span class="code-num">10</span>,
    core_languages: [<span class="code-str">"TypeScript"</span>, <span class="code-str">"JavaScript"</span>, <span class="code-str">"Python"</span>, <span class="code-str">"Java"</span>],
    architecture_pattern: <span class="code-str">"Distributed Microservices & Event-Driven"</span>
};
`,
    'architecture.json': `
{
  <span class="code-str">"lead"</span>: <span class="code-str">"Savan Karathiya"</span>,
  <span class="code-str">"throughput"</span>: <span class="code-str">"Sub-millisecond P99 API Latency"</span>,
  <span class="code-str">"distributed_stack"</span>: {
    <span class="code-str">"frontend"</span>: [<span class="code-str">"React.js"</span>, <span class="code-str">"Next.js"</span>, <span class="code-str">"D3.js"</span>],
    <span class="code-str">"backend"</span>: [<span class="code-str">"Node.js"</span>, <span class="code-str">"FastAPI"</span>, <span class="code-str">"Python"</span>],
    <span class="code-str">"search_data"</span>: [<span class="code-str">"Elasticsearch"</span>, <span class="code-str">"PostgreSQL"</span>, <span class="code-str">"Snowflake"</span>],
    <span class="code-str">"orchestration"</span>: [<span class="code-str">"Docker"</span>, <span class="code-str">"Kubernetes"</span>, <span class="code-str">"Azure"</span>]
  },
  <span class="code-str">"code_quality"</span>: <span class="code-str">"Strict CI/CD, Automated Tests, Zero Regressions"</span>
}
`,
    'recruiter_pitch.md': `
<span class="code-comment">### Executive Candidate Snapshot</span>
- **Name:** Savan Karathiya
- **Current Role:** Technical Lead @ Rapidops Inc.
- **Consulting Background:** Consultant @ Infosys
- **Tenure:** 10 Years in Software Engineering
- **Focus Areas:** Scalable Microservices, React Ecosystems, Python/Node.js Systems, Elasticsearch Data Visualization.
`
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tabKey = btn.dataset.tab;
      if (consoleBody && consoleContent[tabKey]) {
        consoleBody.innerHTML = `<pre><code>${consoleContent[tabKey].trim()}</code></pre>`;
      }
    });
  });
}

/* -------------------------------------------------------------------------
   3. RECRUITER COMMAND CENTER & ROLE MATCH CALCULATOR
   ------------------------------------------------------------------------- */
function initRecruiterHub() {
  const pillsContainer = document.getElementById('rolePillsContainer');
  const roleResultContainer = document.getElementById('roleResultContainer');
  const copyPitchBtn = document.getElementById('copyPitchBtn');

  if (!pillsContainer || !roleResultContainer) return;

  // Render role pills
  pillsContainer.innerHTML = RECRUITER_ROLES.map((role, idx) => `
    <button class="role-pill-btn ${idx === 0 ? 'active' : ''}" data-role-id="${role.id}">
      <span>${role.title}</span>
      <span class="role-pill-badge">${role.matchPercentage}% Match</span>
    </button>
  `).join('');

  // Initial render of first role
  renderRoleDetails(RECRUITER_ROLES[0]);

  // Pill click handler
  pillsContainer.querySelectorAll('.role-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      pillsContainer.querySelectorAll('.role-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const roleId = btn.dataset.roleId;
      const selectedRole = RECRUITER_ROLES.find(r => r.id === roleId);
      if (selectedRole) {
        renderRoleDetails(selectedRole);
      }
    });
  });

  function renderRoleDetails(role) {
    roleResultContainer.innerHTML = `
      <div class="match-header">
        <div>
          <span class="section-tag" style="margin-bottom:6px;">Target Role Alignment</span>
          <h4 class="role-result-title">${role.title}</h4>
        </div>
        <div class="match-score-badge">
          <span class="match-number">${role.matchPercentage}%</span>
          <span class="match-text">Match</span>
        </div>
      </div>
      
      <p class="role-result-summary">${role.summary}</p>
      
      <div style="margin-bottom:14px;">
        <span class="form-label" style="font-size:0.8rem; text-transform:uppercase;">Key Synergies & Tech Stack:</span>
        <div class="role-skills-tags">
          ${role.keySkills.map(skill => `<span class="role-skill-chip">${skill}</span>`).join('')}
        </div>
      </div>

      <div style="margin-bottom:14px;">
        <span class="form-label" style="font-size:0.8rem; text-transform:uppercase;">Candidate Highlights for Hiring Committee:</span>
        <ul class="role-bullets-list">
          ${role.bulletPoints.map(bullet => `
            <li class="role-bullet-item">
              <svg class="bullet-icon" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
              <span>${bullet}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="role-actions-footer">
        <button id="copyRolePitchBtn" class="btn btn-amber btn-sm" data-pitch="${encodeURIComponent(role.elevatorPitch)}">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
          Copy Recruiter Pitch Note
        </button>
        <a href="#contact" class="btn btn-secondary btn-sm">
          Discuss This Role with Savan
        </a>
      </div>
    `;

    // Hook up copy pitch button
    const copyBtn = document.getElementById('copyRolePitchBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const pitchText = decodeURIComponent(copyBtn.dataset.pitch);
        copyToClipboard(pitchText, 'Recruiter pitch note copied to clipboard!');
      });
    }
  }
}

/* -------------------------------------------------------------------------
   4. INTERACTIVE SKILLS MATRIX
   ------------------------------------------------------------------------- */
function initSkillsMatrix() {
  const tabsContainer = document.getElementById('skillsCategoryTabs');
  const searchInput = document.getElementById('skillsSearchInput');
  const skillsGrid = document.getElementById('skillsGrid');

  if (!tabsContainer || !skillsGrid) return;

  let activeCategory = 'all';
  let searchQuery = '';

  // Render Category Tabs
  tabsContainer.innerHTML = SKILLS_CATEGORIES.map((cat, idx) => `
    <button class="skill-category-pill ${idx === 0 ? 'active' : ''}" data-cat-id="${cat.id}">
      ${cat.label}
    </button>
  `).join('');

  // Category tab clicks
  tabsContainer.querySelectorAll('.skill-category-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      tabsContainer.querySelectorAll('.skill-category-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.catId;
      renderSkills();
    });
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderSkills();
    });
  }

  function renderSkills() {
    const filtered = SKILLS_DATA.filter(skill => {
      const matchesCategory = (activeCategory === 'all') || (skill.category === activeCategory);
      const matchesSearch = !searchQuery || skill.name.toLowerCase().includes(searchQuery) || skill.experience.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      skillsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 48px; background: rgba(255,255,255,0.02); border-radius: var(--radius-lg); border: 1px dashed var(--border-light);">
          <p style="color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 8px;">No matching skills found for "${searchQuery}".</p>
          <p style="color: var(--text-muted); font-size: 0.88rem;">Try searching for "TypeScript", "React", "Node", "Elasticsearch", or clear the filter.</p>
        </div>
      `;
      return;
    }

    skillsGrid.innerHTML = filtered.map(skill => `
      <div class="skill-card ${skill.highlight ? 'top-skill' : ''}">
        <div class="skill-card-top">
          <div class="skill-title-group">
            <div class="skill-icon-placeholder">${skill.name.slice(0, 2).toUpperCase()}</div>
            <span class="skill-name">${skill.name}</span>
          </div>
          <span class="skill-tag">${skill.experience}</span>
        </div>
        <div class="skill-progress-wrap">
          <div class="skill-progress-bar">
            <div class="skill-progress-fill" style="width: ${skill.level}%"></div>
          </div>
          <div class="skill-meta">
            <span>Proficiency Level</span>
            <span>${skill.level}%</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Initial render
  renderSkills();
}

/* -------------------------------------------------------------------------
   5. INTERACTIVE EXPERIENCE TIMELINE
   ------------------------------------------------------------------------- */
function initExperienceTimeline() {
  const timelineContainer = document.getElementById('experienceTimelineContainer');
  if (!timelineContainer) return;

  timelineContainer.innerHTML = EXPERIENCES_DATA.map((exp) => `
    <div class="timeline-item">
      <div class="timeline-node"></div>
      <div class="timeline-card">
        <div class="timeline-header">
          <div>
            <h4 class="timeline-role-title">${exp.role}</h4>
            <div class="timeline-company">${exp.company}</div>
          </div>
          <div class="timeline-date-badge">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span>${exp.period} (${exp.duration})</span>
          </div>
        </div>
        
        <div class="timeline-location">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span>${exp.location}</span>
          <span style="margin: 0 6px;">•</span>
          <span style="color: var(--accent-cyan-light); font-weight:600;">${exp.type}</span>
        </div>

        <p class="timeline-summary">${exp.summary}</p>

        ${exp.subRoles ? `
          <div class="sub-roles-group">
            ${exp.subRoles.map(sub => `
              <div class="sub-role-item">
                <div class="sub-role-title">
                  <span>${sub.title}</span>
                  <span class="sub-role-period">${sub.period}</span>
                </div>
                <div class="sub-role-desc">${sub.description}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <ul class="timeline-responsibilities">
          ${exp.responsibilities.map(resp => `
            <li class="responsibility-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
              <span>${resp}</span>
            </li>
          `).join('')}
        </ul>

        <div class="timeline-tech-stack">
          ${exp.technologies.map(tech => `<span class="tech-tag-chip">${tech}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

/* -------------------------------------------------------------------------
   6. PROJECTS & ARCHITECTURE SHOWCASE
   ------------------------------------------------------------------------- */
function initProjectsShowcase() {
  const filterContainer = document.getElementById('projectsFilterBar');
  const projectsGrid = document.getElementById('projectsGrid');

  if (!filterContainer || !projectsGrid) return;

  const categories = [
    { id: 'all', label: 'All Architectures' },
    { id: 'microservices', label: 'Microservices & Systems' },
    { id: 'bigdata', label: 'Big Data & Observability' },
    { id: 'cloud', label: 'Cloud & Data Pipelines' },
    { id: 'fullstack', label: 'Modern Web & UI' }
  ];

  let activeCategory = 'all';

  // Render Filter Buttons
  filterContainer.innerHTML = categories.map((cat, idx) => `
    <button class="project-filter-btn ${idx === 0 ? 'active' : ''}" data-cat-id="${cat.id}">
      ${cat.label}
    </button>
  `).join('');

  // Filter click handlers
  filterContainer.querySelectorAll('.project-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      filterContainer.querySelectorAll('.project-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.catId;
      renderProjects();
    });
  });

  function renderProjects() {
    const filtered = PROJECTS_DATA.filter(p => activeCategory === 'all' || p.category === activeCategory);

    projectsGrid.innerHTML = filtered.map(project => `
      <div class="project-card">
        <div class="project-card-top">
          <div class="project-meta-row">
            <span class="project-category-badge">${project.categoryLabel}</span>
            <span class="project-client-badge">${project.client}</span>
          </div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-summary">${project.summary}</p>
          
          <div class="project-metrics-grid">
            ${project.metrics.map(m => `
              <div class="project-metric-item">
                <span class="project-metric-val">${m.value}</span>
                <span class="project-metric-lbl">${m.label}</span>
              </div>
            `).join('')}
          </div>

          <div class="project-tech-tags">
            ${project.technologies.map(t => `<span class="project-tech-chip">${t}</span>`).join('')}
          </div>
        </div>

        <div class="project-card-footer">
          <button class="btn btn-primary btn-sm view-specs-btn" data-project-id="${project.id}">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            View Architecture Specs
          </button>
          <span style="font-size:0.8rem; color:var(--text-muted); font-family:var(--font-mono);">${project.duration}</span>
        </div>
      </div>
    `).join('') + `
      <div class="add-project-helper-card">
        <div class="add-helper-content">
          <div class="add-helper-title">🛠️ Have more projects to add?</div>
          <div class="add-helper-desc">
            You can add your additional project case studies anytime! Simply open <span class="add-helper-code">js/data.js</span>, duplicate a project block in <span class="add-helper-code">PROJECTS_DATA</span>, and save. It renders automatically with full specs and metrics!
          </div>
        </div>
        <button id="addProjectGuideBtn" class="btn btn-secondary btn-sm">
          See Easy Edit Guide
        </button>
      </div>
    `;

    // Hook up modal triggers
    projectsGrid.querySelectorAll('.view-specs-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const projId = btn.dataset.projectId;
        const project = PROJECTS_DATA.find(p => p.id === projId);
        if (project) {
          openProjectModal(project);
        }
      });
    });

    const guideBtn = document.getElementById('addProjectGuideBtn');
    if (guideBtn) {
      guideBtn.addEventListener('click', () => {
        openProjectGuideModal();
      });
    }
  }

  // Initial render
  renderProjects();
}

/* -------------------------------------------------------------------------
   7. EDUCATION, CERTIFICATIONS & LANGUAGES
   ------------------------------------------------------------------------- */
function initEducationAndCertifications() {
  const certContainer = document.getElementById('certificationsContainer');
  const eduContainer = document.getElementById('educationContainer');
  const langContainer = document.getElementById('languagesContainer');

  if (certContainer) {
    certContainer.innerHTML = CERTIFICATIONS_DATA.map(cert => `
      <div class="cert-card">
        <div class="cert-card-header">
          <div class="cert-badge-icon">🎖️</div>
          <div>
            <h4 class="cert-title">${cert.title}</h4>
            <div class="cert-issuer">${cert.issuer}</div>
          </div>
        </div>
        <p class="cert-desc">${cert.description}</p>
        <div class="cert-skills-list">
          ${cert.skillsAcquired.map(skill => `<span class="cert-skill-pill">${skill}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  if (eduContainer) {
    eduContainer.innerHTML = EDUCATION_DATA.map(edu => `
      <div class="edu-card">
        <h4 class="edu-degree">${edu.degree}</h4>
        <div class="edu-institution">${edu.institution}</div>
        <div class="edu-meta">
          <span>${edu.field}</span>
          <span style="color:var(--accent-cyan); font-weight:600;">${edu.period}</span>
        </div>
      </div>
    `).join('');
  }

  if (langContainer) {
    langContainer.innerHTML = LANGUAGES_DATA.map(lang => `
      <div class="language-item">
        <div class="language-header">
          <span>${lang.name}</span>
          <span class="language-prof">${lang.proficiency}</span>
        </div>
        <div class="language-bar">
          <div class="language-fill" style="width: ${lang.level}%"></div>
        </div>
      </div>
    `).join('');
  }
}

/* -------------------------------------------------------------------------
   8. CONTACT & COLLABORATION HUB
   ------------------------------------------------------------------------- */
function initContactHub() {
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyLinkedinBtn = document.getElementById('copyLinkedinBtn');
  const contactForm = document.getElementById('contactComposerForm');
  const presetChips = document.querySelectorAll('.preset-chip-btn');
  const subjectInput = document.getElementById('composerSubject');
  const messageInput = document.getElementById('composerMessage');
  const copyDraftBtn = document.getElementById('copyDraftBtn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      copyToClipboard(PROFILE_INFO.email, 'Email address copied to clipboard!');
    });
  }

  if (copyLinkedinBtn) {
    copyLinkedinBtn.addEventListener('click', () => {
      copyToClipboard(PROFILE_INFO.linkedin, 'LinkedIn profile link copied!');
    });
  }

  // Preset Template Chips
  const templates = {
    'discuss-lead-role': {
      subject: 'Opportunity: Technical Lead / Architect Role at [Company Name]',
      message: `Hi Savan,\n\nI came across your profile and was impressed by your 10 years of experience as a Technical Lead at Rapidops and Consultant at Infosys.\n\nWe have an exciting opportunity for a Technical Lead / Architect role and would love to schedule a quick 20-minute introductory conversation to discuss synergies.\n\nBest regards,\n[Your Name]\n[Your Company]`
    },
    'schedule-call': {
      subject: 'Interview Request / Technical Chat with Savan Karathiya',
      message: `Hi Savan,\n\nWe are looking to expand our engineering leadership team with high-caliber talent experienced in Node.js, Python, React, and microservices architecture.\n\nWhen would be a convenient time for a brief discussion this week?\n\nBest,\n[Your Name]`
    },
    'request-resume': {
      subject: 'Inquiry: Project Details & Detailed Technical Profile',
      message: `Hi Savan,\n\nI reviewed your portfolio website and would like to learn more about your recent architectural deliverables and case studies.\n\nPlease share your full resume and availability.\n\nRegards,\n[Your Name]`
    }
  };

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      presetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const key = chip.dataset.template;
      if (templates[key]) {
        if (subjectInput) subjectInput.value = templates[key].subject;
        if (messageInput) messageInput.value = templates[key].message;
      }
    });
  });

  // Copy Draft button
  if (copyDraftBtn) {
    copyDraftBtn.addEventListener('click', () => {
      const draftText = `Subject: ${subjectInput ? subjectInput.value : ''}\n\n${messageInput ? messageInput.value : ''}`;
      copyToClipboard(draftText, 'Message draft copied to clipboard!');
    });
  }

  // Form submit -> mailto:
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const subject = encodeURIComponent(subjectInput ? subjectInput.value : 'Technical Opportunity');
      const body = encodeURIComponent(messageInput ? messageInput.value : 'Hello Savan,\n\nI would like to connect with you regarding a potential opportunity.');
      window.location.href = `mailto:${PROFILE_INFO.email}?subject=${subject}&body=${body}`;
    });
  }
}

/* -------------------------------------------------------------------------
   9. MODAL ENGINE (Architecture Deep Dive & Guide)
   ------------------------------------------------------------------------- */
function initModal() {
  const modalOverlay = document.getElementById('projectModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  if (!modalOverlay) return;

  function closeModal() {
    modalOverlay.classList.remove('open');
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

function openProjectModal(project) {
  const modalOverlay = document.getElementById('projectModalOverlay');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta = document.getElementById('modalMeta');
  const modalBody = document.getElementById('modalBodyContent');

  if (!modalOverlay || !modalBody) return;

  if (modalCategory) modalCategory.textContent = project.categoryLabel;
  if (modalTitle) modalTitle.textContent = project.title;
  if (modalMeta) {
    modalMeta.innerHTML = `
      <span><strong>Role:</strong> ${project.role}</span>
      <span><strong>Client / Track:</strong> ${project.client}</span>
      <span><strong>Duration:</strong> ${project.duration}</span>
    `;
  }

  modalBody.innerHTML = `
    <h4 class="modal-section-h4">Problem Statement</h4>
    <p class="modal-text">${project.problem}</p>

    <h4 class="modal-section-h4">Architectural Solution</h4>
    <p class="modal-text">${project.solution}</p>

    <h4 class="modal-section-h4">Key Technical Highlights</h4>
    <ul class="modal-highlights-list">
      ${project.architectureHighlights.map(hl => `
        <li class="modal-highlight-item">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>${hl}</span>
        </li>
      `).join('')}
    </ul>

    <h4 class="modal-section-h4">Measurable Impact & Metrics</h4>
    <div class="project-metrics-grid" style="margin-top:12px; margin-bottom:20px;">
      ${project.metrics.map(m => `
        <div class="project-metric-item">
          <span class="project-metric-val">${m.value}</span>
          <span class="project-metric-lbl">${m.label}</span>
        </div>
      `).join('')}
    </div>

    <h4 class="modal-section-h4">Technologies & Tooling Used</h4>
    <div class="project-tech-tags" style="margin-top:10px;">
      ${project.technologies.map(t => `<span class="project-tech-chip" style="font-size:0.85rem; padding:6px 12px;">${t}</span>`).join('')}
    </div>
  `;

  modalOverlay.classList.add('open');
}

function openProjectGuideModal() {
  const modalOverlay = document.getElementById('projectModalOverlay');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta = document.getElementById('modalMeta');
  const modalBody = document.getElementById('modalBodyContent');

  if (!modalOverlay || !modalBody) return;

  if (modalCategory) modalCategory.textContent = "PORTFOLIO EXPANSION GUIDE";
  if (modalTitle) modalTitle.textContent = "How to Add Your Extra Projects";
  if (modalMeta) {
    modalMeta.innerHTML = `<span><strong>File Location:</strong> js/data.js</span>`;
  }

  modalBody.innerHTML = `
    <p class="modal-text">
      Adding your extra projects is super fast and requires <strong>zero changes to HTML or CSS</strong>. Everything is dynamically generated from <code>js/data.js</code>!
    </p>
    <h4 class="modal-section-h4">Step-by-Step Instructions:</h4>
    <ol style="padding-left: 20px; color: #cbd5e1; line-height: 1.8; margin-bottom: 20px;">
      <li>Open <code style="color:var(--accent-cyan); background:rgba(0,0,0,0.4); padding:2px 6px; border-radius:4px;">js/data.js</code> in your editor.</li>
      <li>Scroll down to the <code style="color:var(--accent-cyan); background:rgba(0,0,0,0.4); padding:2px 6px; border-radius:4px;">PROJECTS_DATA</code> array.</li>
      <li>Copy any existing project object and paste it into the array.</li>
      <li>Fill in your project title, problem, solution, metrics, and technology tags.</li>
      <li>Save the file — your project will immediately appear with filter tags and full architecture modal!</li>
    </ol>
  `;

  modalOverlay.classList.add('open');
}

/* -------------------------------------------------------------------------
   10. PRINT / ATS CV DOWNLOAD
   ------------------------------------------------------------------------- */
function initPrintTriggers() {
  const printButtons = document.querySelectorAll('.trigger-print-btn');
  printButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });
}

/* -------------------------------------------------------------------------
   11. TOAST NOTIFICATION UTILITY
   ------------------------------------------------------------------------- */
function showToast(message) {
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
    <svg class="toast-icon" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}

function copyToClipboard(text, successMessage = 'Copied to clipboard!') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage);
    }).catch(() => {
      fallbackCopy(text, successMessage);
    });
  } else {
    fallbackCopy(text, successMessage);
  }
}

function fallbackCopy(text, successMessage) {
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = text;
  tempTextArea.style.position = 'fixed';
  tempTextArea.style.opacity = '0';
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  try {
    document.execCommand('copy');
    showToast(successMessage);
  } catch (err) {
    showToast('Failed to copy. Please copy manually.');
  }
  document.body.removeChild(tempTextArea);
}
