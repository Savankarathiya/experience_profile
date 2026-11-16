/**
 * =========================================================================
 * PROFILE EDITOR & MULTI-FORMAT INGESTION UI CONTROLLER
 * =========================================================================
 * Handles the Universal Profile Modal (#cosProfileModalBackdrop):
 * - Multi-format ingestion (JSON, PDF via Gemini Multimodal/offline, Word .docx, raw text)
 * - Gemini AI smart parsing vs. offline heuristic extraction
 * - Tabbed form editing (Basic Info, Avatar, Skills, Experiences, Projects, Education & Certs)
 * - Canvas base64 avatar image resizing & compression
 * - Instant real-time updates across Portfolio and CareerOS
 * - 1-Click Profile JSON Export & GitHub Pages Bundle generation
 */

import { ProfileStore, DEFAULT_PROFILE } from './profile-store.js';

class ProfileEditorController {
  constructor() {
    this.tempAvatar = null;
    this.editingSkills = [];
    this.editingExperiences = [];
    this.editingProjects = [];
    this.editingEducation = [];
    this.editingCertifications = [];
    this.editingLanguages = [];
  }

  init() {
    this.bindTriggers();
    this.bindTabs();
    this.bindIngestionActions();
    this.bindAvatarUpload();
    this.bindListActions();
    this.bindExperienceEditorActions();
    this.bindProjectEditorActions();
    this.bindEducationActions();
    this.bindFooterActions();
    this.updateActiveProfileBanner();

    ProfileStore.subscribe(() => {
      this.updateActiveProfileBanner();
    });
  }

  bindTriggers() {
    // Navbar button
    const navBtn = document.getElementById('cosProfileManagerNavBtn');
    if (navBtn) navBtn.addEventListener('click', () => this.openModal());

    // CareerOS Settings button
    const settingsBtn = document.getElementById('cosProfileManagerSettingsBtn');
    if (settingsBtn) settingsBtn.addEventListener('click', () => this.openModal());

    // CareerOS Header Profile button
    const cosHeaderBtn = document.getElementById('cosHeaderProfileBtn');
    if (cosHeaderBtn) cosHeaderBtn.addEventListener('click', () => this.openModal());

    // Close buttons
    const closeBtn = document.getElementById('cosCloseProfileModalBtn');
    const cancelBtn = document.getElementById('cosCancelProfileModalBtn');
    const backdrop = document.getElementById('cosProfileModalBackdrop');

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
    if (cancelBtn) cancelBtn.addEventListener('click', () => this.closeModal());
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) this.closeModal();
      });
    }
  }

  bindTabs() {
    const tabBtns = document.querySelectorAll('.profile-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const targetTab = btn.dataset.tab;

        document.querySelectorAll('.profile-tab-pane').forEach(pane => {
          pane.classList.remove('active');
        });
        const activePane = document.getElementById(`profileTab-${targetTab}`);
        if (activePane) activePane.classList.add('active');
      });
    });
  }

  bindIngestionActions() {
    const fileInput = document.getElementById('profileFileInput');
    const pasteInput = document.getElementById('profilePasteTextInput');
    const parseBtn = document.getElementById('profileParseBtn');
    const templateBtn = document.getElementById('profileDownloadTemplateBtn');
    const dropzone = document.getElementById('profileFileDropzone');

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
      dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          this.handleFileSelected(e.dataTransfer.files[0]);
        }
      });

      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          this.handleFileSelected(e.target.files[0]);
        }
      });
    }

    if (parseBtn && pasteInput) {
      parseBtn.addEventListener('click', () => this.handleParseRawText(pasteInput.value.trim()));
    }

    if (templateBtn) {
      templateBtn.addEventListener('click', () => {
        ProfileStore.exportProfileJSON();
      });
    }
  }

  async handleFileSelected(file) {
    if (!file) return;

    const statusBadge = document.getElementById('profileFileStatusBadge');
    const updateStatus = (text, isVisible = true) => {
      if (!statusBadge) return;
      statusBadge.style.display = isVisible ? 'inline-block' : 'none';
      statusBadge.textContent = text;
    };

    // 1. JSON Profile Import
    if (file.name.endsWith('.json') || file.type === 'application/json') {
      try {
        updateStatus(`📄 Reading JSON: ${file.name}...`);
        const text = await file.text();
        const json = JSON.parse(text);
        if (json && (json.profileInfo || json.profile || json.name)) {
          const normalized = this.normalizeImportedProfile(json);
          ProfileStore.saveProfile(normalized);
          this.populateFormFromStore();
          this.showToast(`✨ Successfully imported profile for ${normalized.profileInfo.name}!`);
          updateStatus('');
          this.closeModal();
          return;
        }
        throw new Error('Unrecognized JSON profile structure');
      } catch (err) {
        updateStatus('');
        alert('Invalid profile JSON file: ' + err.message);
        return;
      }
    }

    // 2. Word Document (.docx)
    if (file.name.endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      try {
        updateStatus(`📄 Decompressing Word Document: ${file.name}...`);
        const buffer = await file.arrayBuffer();
        const extractedText = await ProfileStore.extractTextFromDocx(buffer);
        if (!extractedText || extractedText.length < 30) {
          throw new Error('Could not extract readable text from this Word document.');
        }
        updateStatus(`✨ Extracted ${extractedText.length} chars from Word doc. Parsing...`);
        await this.handleParseRawText(extractedText);
        updateStatus('');
        return;
      } catch (err) {
        updateStatus('');
        console.warn('DOCX parse failed:', err);
        alert('Word document parsing error: ' + err.message + '. Please paste the resume text directly.');
        return;
      }
    }

    // 3. PDF Document (.pdf)
    if (file.name.endsWith('.pdf') || file.type === 'application/pdf') {
      const apiKey = localStorage.getItem('cos_gemini_api_key');
      const model = localStorage.getItem('cos_gemini_model_v1') || 'gemini-2.0-flash';

      // If user has Gemini API Key, use Multimodal PDF understanding
      if (apiKey) {
        try {
          updateStatus(`✨ Analyzing PDF with Gemini Multimodal AI: ${file.name}...`);
          const base64Pdf = await ProfileStore.fileToBase64(file);
          const parsed = await ProfileStore.parseResumeWithGeminiMultimodal(apiKey, model, base64Pdf, 'application/pdf');
          if (parsed) {
            this.applyParsedDataToForm(parsed);
            this.showToast('✨ High-accuracy Gemini AI parse completed from PDF!');
            const basicTab = document.querySelector('.profile-tab-btn[data-tab="basic"]');
            if (basicTab) basicTab.click();
            updateStatus('');
            return;
          }
        } catch (aiErr) {
          console.warn('Gemini multimodal PDF failed, trying client-side extraction:', aiErr);
        }
      }

      // Offline / Heuristic PDF fallback
      try {
        updateStatus(`📄 Extracting text streams from PDF: ${file.name}...`);
        const buffer = await file.arrayBuffer();
        const extractedText = await ProfileStore.extractTextFromPdf(buffer);
        if (extractedText && extractedText.length >= 30) {
          updateStatus(`✨ Extracted ${extractedText.length} chars from PDF. Parsing...`);
          await this.handleParseRawText(extractedText);
          updateStatus('');
          return;
        }
      } catch (pdfErr) {
        console.warn('Client-side PDF extraction failed:', pdfErr);
      }

      updateStatus('');
      alert('Could not automatically parse PDF. Please copy and paste your resume text into the text area below.');
      return;
    }

    // 4. Plain Text or Markdown (.txt, .md)
    try {
      updateStatus(`📄 Reading text file: ${file.name}...`);
      const rawText = await file.text();
      await this.handleParseRawText(rawText);
      updateStatus('');
    } catch {
      updateStatus('');
      alert('Could not read text from selected file. Try pasting the resume text directly.');
    }
  }

  async handleParseRawText(text) {
    if (!text || text.length < 30) {
      alert('Please enter or upload at least 30 characters of resume text to parse.');
      return;
    }

    const parseBtn = document.getElementById('profileParseBtn');
    const originalText = parseBtn ? parseBtn.innerHTML : '';
    if (parseBtn) {
      parseBtn.disabled = true;
      parseBtn.innerHTML = '<span>⏳ Parsing Resume...</span>';
    }

    try {
      const apiKey = localStorage.getItem('cos_gemini_api_key');
      const model = localStorage.getItem('cos_gemini_model_v1') || 'gemini-2.0-flash';
      let parsed = null;

      if (apiKey) {
        try {
          parsed = await ProfileStore.parseResumeWithGemini(apiKey, model, text);
          this.showToast('✨ High-accuracy Gemini AI parse completed!');
        } catch (aiErr) {
          console.warn('Gemini parse failed, falling back to heuristic:', aiErr);
          parsed = ProfileStore.parseResumeHeuristic(text);
          this.showToast('ℹ️ Parsed using offline heuristic rules.');
        }
      } else {
        parsed = ProfileStore.parseResumeHeuristic(text);
        this.showToast('ℹ️ Parsed using offline heuristic rules (Connect Gemini API in Settings for AI parsing).');
      }

      if (parsed) {
        this.applyParsedDataToForm(parsed);
        const basicTab = document.querySelector('.profile-tab-btn[data-tab="basic"]');
        if (basicTab) basicTab.click();
      }
    } catch (err) {
      console.error('Parse error:', err);
      alert('Error parsing resume text: ' + err.message);
    } finally {
      if (parseBtn) {
        parseBtn.disabled = false;
        parseBtn.innerHTML = originalText;
      }
    }
  }

  normalizeImportedProfile(raw) {
    const base = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
    const info = raw.profileInfo || raw.profile || raw;

    base.profileInfo = {
      name: info.name || base.profileInfo.name,
      title: info.title || base.profileInfo.title,
      tagline: info.tagline || base.profileInfo.tagline,
      email: info.email || base.profileInfo.email,
      linkedin: info.linkedin || base.profileInfo.linkedin,
      linkedinHandle: info.linkedinHandle || (info.linkedin ? info.linkedin.split('/').filter(Boolean).pop() : ''),
      location: info.location || base.profileInfo.location,
      experienceYears: info.experienceYears || base.profileInfo.experienceYears,
      status: info.status || base.profileInfo.status,
      workPreference: info.workPreference || base.profileInfo.workPreference,
      summary: info.summary || base.profileInfo.summary
    };

    if (Array.isArray(raw.skillsData)) base.skillsData = raw.skillsData;
    if (Array.isArray(raw.skillsCategories)) base.skillsCategories = raw.skillsCategories;
    if (Array.isArray(raw.experiencesData)) base.experiencesData = raw.experiencesData;
    if (Array.isArray(raw.projectsData)) base.projectsData = raw.projectsData;
    if (Array.isArray(raw.educationData)) base.educationData = raw.educationData;
    if (Array.isArray(raw.certificationsData)) base.certificationsData = raw.certificationsData;
    if (Array.isArray(raw.languagesData)) base.languagesData = raw.languagesData;
    if (Array.isArray(raw.stats)) base.stats = raw.stats;
    if (Array.isArray(raw.heroBadges)) base.heroBadges = raw.heroBadges;
    if (raw.customAvatar) base.customAvatar = raw.customAvatar;

    return base;
  }

  applyParsedDataToForm(parsed) {
    if (!parsed) return;
    const p = parsed.profileInfo || {};

    if (p.name) document.getElementById('profNameInput').value = p.name;
    if (p.title) document.getElementById('profTitleInput').value = p.title;
    if (p.tagline) document.getElementById('profTaglineInput').value = p.tagline;
    if (p.email) document.getElementById('profEmailInput').value = p.email;
    if (p.linkedin) document.getElementById('profLinkedinInput').value = p.linkedin;
    if (p.location) document.getElementById('profLocationInput').value = p.location;
    if (p.experienceYears) document.getElementById('profExpYearsInput').value = p.experienceYears;
    if (p.status) document.getElementById('profStatusInput').value = p.status;
    if (p.summary) document.getElementById('profSummaryInput').value = p.summary;

    if (Array.isArray(parsed.skillsData) && parsed.skillsData.length > 0) {
      this.editingSkills = [...parsed.skillsData];
      this.renderSkillsList();
    }
    if (Array.isArray(parsed.experiencesData) && parsed.experiencesData.length > 0) {
      this.editingExperiences = [...parsed.experiencesData];
      this.renderExperiencesList();
    }
    if (Array.isArray(parsed.projectsData) && parsed.projectsData.length > 0) {
      this.editingProjects = [...parsed.projectsData];
      this.renderProjectsList();
    }
    if (Array.isArray(parsed.educationData) && parsed.educationData.length > 0) {
      this.editingEducation = [...parsed.educationData];
      this.renderEducationList();
    }
    if (Array.isArray(parsed.certificationsData) && parsed.certificationsData.length > 0) {
      this.editingCertifications = [...parsed.certificationsData];
      this.renderCertificationsList();
    }
    if (Array.isArray(parsed.languagesData) && parsed.languagesData.length > 0) {
      this.editingLanguages = [...parsed.languagesData];
      this.renderLanguagesList();
    }
  }

  bindAvatarUpload() {
    const avatarInput = document.getElementById('profAvatarFileInput');
    const avatarPreview = document.getElementById('profAvatarPreview');
    const removeBtn = document.getElementById('profRemoveAvatarBtn');

    if (avatarInput && avatarPreview) {
      avatarInput.addEventListener('change', async (e) => {
        if (e.target.files && e.target.files[0]) {
          try {
            const base64 = await ProfileStore.compressImageToBase64(e.target.files[0]);
            this.tempAvatar = base64;
            avatarPreview.src = base64;
            this.showToast('📷 Avatar image compressed and loaded!');
          } catch (err) {
            alert('Image upload failed: ' + err.message);
          }
        }
      });
    }

    if (removeBtn && avatarPreview) {
      removeBtn.addEventListener('click', () => {
        this.tempAvatar = '';
        avatarPreview.src = 'assets/savan_profile.jpg';
        this.showToast('Reverted to default avatar.');
      });
    }
  }

  bindListActions() {
    const addSkillBtn = document.getElementById('profAddSkillBtn');
    if (addSkillBtn) {
      addSkillBtn.addEventListener('click', () => {
        const nameInput = document.getElementById('profNewSkillName');
        const catSelect = document.getElementById('profNewSkillCategory');
        const levelInput = document.getElementById('profNewSkillLevel');
        const highlightInput = document.getElementById('profNewSkillHighlight');

        const name = nameInput ? nameInput.value.trim() : '';
        if (!name) return;

        this.editingSkills.unshift({
          name: name,
          category: catSelect ? catSelect.value : 'core',
          experience: '3+ yrs',
          level: levelInput ? parseInt(levelInput.value, 10) || 85 : 85,
          highlight: highlightInput ? highlightInput.checked : false
        });

        if (nameInput) nameInput.value = '';
        this.renderSkillsList();
      });
    }
  }

  /* -------------------------------------------------------------------------
     EXPERIENCES RICH INLINE EDITOR
     ------------------------------------------------------------------------- */
  bindExperienceEditorActions() {
    const addBtn = document.getElementById('profAddExpBtn');
    const cancelBtn = document.getElementById('profCancelExpEditBtn');
    const saveBtn = document.getElementById('profSaveExpEditBtn');

    if (addBtn) addBtn.addEventListener('click', () => this.openExperienceEditor(-1));
    if (cancelBtn) cancelBtn.addEventListener('click', () => this.closeExperienceEditor());
    if (saveBtn) saveBtn.addEventListener('click', () => this.saveExperienceFromEditor());
  }

  openExperienceEditor(index = -1) {
    const box = document.getElementById('profExpEditorBox');
    const title = document.getElementById('profExpEditorTitle');
    const idxInput = document.getElementById('profExpEditIndex');
    if (!box || !idxInput) return;

    idxInput.value = index;

    if (index >= 0 && this.editingExperiences[index]) {
      const exp = this.editingExperiences[index];
      if (title) title.textContent = '✏️ Edit Work Experience';
      document.getElementById('profExpRole').value = exp.role || '';
      document.getElementById('profExpCompany').value = exp.company || '';
      document.getElementById('profExpPeriod').value = exp.period || '';
      document.getElementById('profExpLocation').value = exp.location || '';
      document.getElementById('profExpTeam').value = exp.teamSize || '';
      document.getElementById('profExpSummary').value = exp.summary || '';
      document.getElementById('profExpBullets').value = (exp.bullets || []).join('\n');
    } else {
      if (title) title.textContent = '➕ Add New Work Experience';
      document.getElementById('profExpRole').value = '';
      document.getElementById('profExpCompany').value = '';
      document.getElementById('profExpPeriod').value = '2023 - Present';
      document.getElementById('profExpLocation').value = 'Remote';
      document.getElementById('profExpTeam').value = '10+ Engineers';
      document.getElementById('profExpSummary').value = '';
      document.getElementById('profExpBullets').value = 'Architected high-scale microservices processing real-time traffic.\nOptimized database indexing and caching layers for sub-50ms P99 latency.';
    }

    box.style.display = 'block';
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  closeExperienceEditor() {
    const box = document.getElementById('profExpEditorBox');
    if (box) box.style.display = 'none';
  }

  saveExperienceFromEditor() {
    const idx = parseInt(document.getElementById('profExpEditIndex')?.value || '-1', 10);
    const role = document.getElementById('profExpRole')?.value.trim();
    const company = document.getElementById('profExpCompany')?.value.trim();
    if (!role || !company) {
      alert('Please provide both Role Title and Company Name');
      return;
    }

    const period = document.getElementById('profExpPeriod')?.value.trim() || '2023 - Present';
    const location = document.getElementById('profExpLocation')?.value.trim() || 'Remote';
    const team = document.getElementById('profExpTeam')?.value.trim() || '';
    const summary = document.getElementById('profExpSummary')?.value.trim() || `Leading technical initiatives and architectural delivery at ${company}.`;
    const rawBullets = document.getElementById('profExpBullets')?.value || '';
    const bullets = rawBullets
      .split('\n')
      .map(b => b.replace(/^[•\-\*\s]+/, '').trim())
      .filter(Boolean);

    const expObj = {
      role,
      company,
      period,
      duration: period.includes('Present') ? 'Current' : 'Completed',
      location,
      teamSize: team,
      type: 'Full-time',
      summary,
      bullets: bullets.length > 0 ? bullets : ['Architected resilient distributed systems and delivered core features.']
    };

    if (idx >= 0 && idx < this.editingExperiences.length) {
      this.editingExperiences[idx] = expObj;
      this.showToast(`Updated experience at ${company}`);
    } else {
      this.editingExperiences.unshift(expObj);
      this.showToast(`Added experience at ${company}`);
    }

    this.closeExperienceEditor();
    this.renderExperiencesList();
  }

  /* -------------------------------------------------------------------------
     PROJECTS RICH INLINE EDITOR
     ------------------------------------------------------------------------- */
  bindProjectEditorActions() {
    const addBtn = document.getElementById('profAddProjBtn');
    const cancelBtn = document.getElementById('profCancelProjEditBtn');
    const saveBtn = document.getElementById('profSaveProjEditBtn');

    if (addBtn) addBtn.addEventListener('click', () => this.openProjectEditor(-1));
    if (cancelBtn) cancelBtn.addEventListener('click', () => this.closeProjectEditor());
    if (saveBtn) saveBtn.addEventListener('click', () => this.saveProjectFromEditor());
  }

  openProjectEditor(index = -1) {
    const box = document.getElementById('profProjEditorBox');
    const title = document.getElementById('profProjEditorTitle');
    const idxInput = document.getElementById('profProjEditIndex');
    if (!box || !idxInput) return;

    idxInput.value = index;

    if (index >= 0 && this.editingProjects[index]) {
      const p = this.editingProjects[index];
      if (title) title.textContent = '✏️ Edit Case Study / Project';
      document.getElementById('profProjTitle').value = p.title || '';
      document.getElementById('profProjCategory').value = p.category || 'microservices';
      document.getElementById('profProjRole').value = p.role || 'Lead Architect';
      document.getElementById('profProjClient').value = p.client || '';
      document.getElementById('profProjDuration').value = p.duration || '';
      document.getElementById('profProjSummary').value = p.summary || '';
      document.getElementById('profProjProblem').value = p.problem || '';
      document.getElementById('profProjSolution').value = p.solution || '';
      document.getElementById('profProjImpact').value = p.impact || '';
      document.getElementById('profProjTech').value = (p.technologies || []).join(', ');
    } else {
      if (title) title.textContent = '🚀 Add New Case Study / Project';
      document.getElementById('profProjTitle').value = '';
      document.getElementById('profProjCategory').value = 'microservices';
      document.getElementById('profProjRole').value = 'Lead Architect';
      document.getElementById('profProjClient').value = 'Enterprise Client';
      document.getElementById('profProjDuration').value = '2024 - 2025';
      document.getElementById('profProjSummary').value = '';
      document.getElementById('profProjProblem').value = '';
      document.getElementById('profProjSolution').value = '';
      document.getElementById('profProjImpact').value = '';
      document.getElementById('profProjTech').value = 'Node.js, PostgreSQL, Redis, Docker';
    }

    box.style.display = 'block';
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  closeProjectEditor() {
    const box = document.getElementById('profProjEditorBox');
    if (box) box.style.display = 'none';
  }

  saveProjectFromEditor() {
    const idx = parseInt(document.getElementById('profProjEditIndex')?.value || '-1', 10);
    const title = document.getElementById('profProjTitle')?.value.trim();
    if (!title) {
      alert('Please provide a Project or System Title');
      return;
    }

    const category = document.getElementById('profProjCategory')?.value || 'microservices';
    const role = document.getElementById('profProjRole')?.value.trim() || 'Lead Architect';
    const client = document.getElementById('profProjClient')?.value.trim() || 'Enterprise';
    const duration = document.getElementById('profProjDuration')?.value.trim() || '2024 - 2025';
    const summary = document.getElementById('profProjSummary')?.value.trim() || `Engineered ${title} for ${client}.`;
    const problem = document.getElementById('profProjProblem')?.value.trim() || 'System faced high concurrency and scalability requirements.';
    const solution = document.getElementById('profProjSolution')?.value.trim() || 'Designed asynchronous microservices architecture and caching layers.';
    const impact = document.getElementById('profProjImpact')?.value.trim() || 'Achieved high reliability and sub-50ms latency.';
    const rawTech = document.getElementById('profProjTech')?.value || '';
    const technologies = rawTech.split(',').map(t => t.trim()).filter(Boolean);

    const categoryLabels = {
      microservices: 'Microservices & Systems',
      bigdata: 'Big Data & Observability',
      cloud: 'Cloud & DevOps',
      fullstack: 'Full Stack & Web Apps'
    };

    const projObj = {
      id: (idx >= 0 && this.editingProjects[idx]?.id) ? this.editingProjects[idx].id : 'proj-' + Date.now(),
      title,
      category,
      categoryLabel: categoryLabels[category] || 'Microservices & Systems',
      role,
      duration,
      client,
      summary,
      problem,
      solution,
      impact,
      metrics: [
        { label: 'Throughput', value: '30k QPS' },
        { label: 'P99 Latency', value: '< 30ms' }
      ],
      technologies: technologies.length > 0 ? technologies : ['Node.js', 'PostgreSQL', 'Redis'],
      architectureHighlights: [
        'Asynchronous event loop and connection pooling',
        'Multi-tier caching with Redis cluster'
      ]
    };

    if (idx >= 0 && idx < this.editingProjects.length) {
      this.editingProjects[idx] = projObj;
      this.showToast(`Updated project: ${title}`);
    } else {
      this.editingProjects.unshift(projObj);
      this.showToast(`Added project: ${title}`);
    }

    this.closeProjectEditor();
    this.renderProjectsList();
  }

  /* -------------------------------------------------------------------------
     EDUCATION, CERTS & LANGUAGES ACTIONS
     ------------------------------------------------------------------------- */
  bindEducationActions() {
    const addEduBtn = document.getElementById('profAddEduBtn');
    const addCertBtn = document.getElementById('profAddCertBtn');
    const addLangBtn = document.getElementById('profAddLangBtn');

    if (addEduBtn) {
      addEduBtn.addEventListener('click', () => {
        const degree = prompt('Enter Degree (e.g. Bachelor of Engineering in IT):');
        if (!degree) return;
        const institution = prompt('Enter University / Institution:') || 'University';
        const period = prompt('Enter Period (e.g. 2012 - 2016):') || '2012 - 2016';
        this.editingEducation.push({
          degree,
          field: 'Information Technology & Systems',
          institution,
          period,
          details: 'Graduated with Distinction'
        });
        this.renderEducationList();
      });
    }

    if (addCertBtn) {
      addCertBtn.addEventListener('click', () => {
        const title = prompt('Enter Certification Title (e.g. AWS Certified Solutions Architect):');
        if (!title) return;
        const issuer = prompt('Enter Issuer (e.g. Amazon Web Services):') || 'AWS';
        this.editingCertifications.push({
          id: 'cert-' + Date.now(),
          title,
          issuer,
          issueDate: '2023',
          credentialId: 'VERIFIED',
          description: 'Validates architectural mastery in designing scalable, highly available cloud systems.',
          skillsAcquired: ['Cloud Architecture', 'High Availability', 'Security']
        });
        this.renderCertificationsList();
      });
    }

    if (addLangBtn) {
      addLangBtn.addEventListener('click', () => {
        const name = prompt('Enter Language (e.g. French, Spanish):');
        if (!name) return;
        const proficiency = prompt('Enter Proficiency (e.g. Professional Working, Fluent):') || 'Professional';
        this.editingLanguages.push({ name, proficiency, level: 90 });
        this.renderLanguagesList();
      });
    }
  }

  bindFooterActions() {
    const saveBtn = document.getElementById('profSaveProfileBtn');
    const exportJsonBtn = document.getElementById('profExportJsonBtn');
    const exportBundleBtn = document.getElementById('profExportBundleBtn');
    const resetDemoBtn = document.getElementById('profResetDemoBtn');

    if (saveBtn) saveBtn.addEventListener('click', () => this.handleSaveForm());

    if (exportJsonBtn) {
      exportJsonBtn.addEventListener('click', () => {
        ProfileStore.exportProfileJSON();
      });
    }

    if (exportBundleBtn) {
      exportBundleBtn.addEventListener('click', () => {
        ProfileStore.generatePortfolioBundle();
        this.showToast('📦 Generated data.js bundle! Replace js/data.js in your repo for instant GitHub Pages hosting.');
      });
    }

    if (resetDemoBtn) {
      resetDemoBtn.addEventListener('click', () => {
        if (confirm("Reset back to Savan Karathiya's master showcase profile? This clears custom local changes.")) {
          ProfileStore.resetToDefault();
          this.populateFormFromStore();
          this.showToast("🔄 Restored Savan Karathiya's demo showcase!");
          this.closeModal();
        }
      });
    }
  }

  handleSaveForm() {
    const name = document.getElementById('profNameInput')?.value.trim() || 'Candidate Name';
    const title = document.getElementById('profTitleInput')?.value.trim() || 'Software Engineer';
    const tagline = document.getElementById('profTaglineInput')?.value.trim() || '';
    const email = document.getElementById('profEmailInput')?.value.trim() || 'email@example.com';
    const linkedin = document.getElementById('profLinkedinInput')?.value.trim() || '';
    const location = document.getElementById('profLocationInput')?.value.trim() || 'Remote';
    const expYears = document.getElementById('profExpYearsInput')?.value.trim() || '10+';
    const status = document.getElementById('profStatusInput')?.value.trim() || 'Available for New Roles';
    const summary = document.getElementById('profSummaryInput')?.value.trim() || tagline;

    const current = ProfileStore.getProfile();
    const updated = {
      ...current,
      profileInfo: {
        ...current.profileInfo,
        name: name,
        title: title,
        tagline: tagline,
        email: email,
        linkedin: linkedin,
        linkedinHandle: linkedin ? linkedin.split('/').filter(Boolean).pop() : '',
        location: location,
        experienceYears: expYears,
        status: status,
        summary: summary
      },
      skillsData: this.editingSkills.length > 0 ? this.editingSkills : current.skillsData,
      experiencesData: this.editingExperiences.length > 0 ? this.editingExperiences : current.experiencesData,
      projectsData: this.editingProjects.length > 0 ? this.editingProjects : current.projectsData,
      educationData: this.editingEducation.length > 0 ? this.editingEducation : current.educationData,
      certificationsData: this.editingCertifications.length > 0 ? this.editingCertifications : current.certificationsData,
      languagesData: this.editingLanguages.length > 0 ? this.editingLanguages : current.languagesData,
      customAvatar: this.tempAvatar !== null ? this.tempAvatar : current.customAvatar,
      stats: [
        { number: expYears, label: 'Years Experience' },
        { number: `${Math.max(this.editingSkills.length, 25)}+`, label: 'Tech Competencies' },
        { number: '15+', label: 'Engineers Mentored' },
        { number: '99.9%', label: 'Production Reliability' }
      ]
    };

    ProfileStore.saveProfile(updated);
    this.showToast(`✨ Profile updated and applied for ${name}!`);
    this.closeModal();
  }

  populateFormFromStore() {
    const p = ProfileStore.getProfile();
    const info = p.profileInfo || {};

    const nameEl = document.getElementById('profNameInput');
    const titleEl = document.getElementById('profTitleInput');
    const tagEl = document.getElementById('profTaglineInput');
    const emailEl = document.getElementById('profEmailInput');
    const linkEl = document.getElementById('profLinkedinInput');
    const locEl = document.getElementById('profLocationInput');
    const expEl = document.getElementById('profExpYearsInput');
    const statEl = document.getElementById('profStatusInput');
    const sumEl = document.getElementById('profSummaryInput');
    const avatarPreview = document.getElementById('profAvatarPreview');

    if (nameEl) nameEl.value = info.name || '';
    if (titleEl) titleEl.value = info.title || '';
    if (tagEl) tagEl.value = info.tagline || '';
    if (emailEl) emailEl.value = info.email || '';
    if (linkEl) linkEl.value = info.linkedin || '';
    if (locEl) locEl.value = info.location || '';
    if (expEl) expEl.value = info.experienceYears || '';
    if (statEl) statEl.value = info.status || '';
    if (sumEl) sumEl.value = info.summary || '';

    if (avatarPreview) {
      avatarPreview.src = ProfileStore.getAvatar();
    }
    this.tempAvatar = p.customAvatar;

    this.editingSkills = JSON.parse(JSON.stringify(ProfileStore.getSkills()));
    this.editingExperiences = JSON.parse(JSON.stringify(ProfileStore.getExperiences()));
    this.editingProjects = JSON.parse(JSON.stringify(ProfileStore.getProjects()));
    this.editingEducation = JSON.parse(JSON.stringify(ProfileStore.getEducation()));
    this.editingCertifications = JSON.parse(JSON.stringify(ProfileStore.getCertifications()));
    this.editingLanguages = JSON.parse(JSON.stringify(ProfileStore.getLanguages()));

    this.renderSkillsList();
    this.renderExperiencesList();
    this.renderProjectsList();
    this.renderEducationList();
    this.renderCertificationsList();
    this.renderLanguagesList();
  }

  renderSkillsList() {
    const listEl = document.getElementById('profSkillsList');
    if (!listEl) return;

    listEl.innerHTML = this.editingSkills.map((sk, idx) => `
      <div class="profile-item-chip">
        <span><strong>${this.escapeHtml(sk.name)}</strong> (${sk.level}%)</span>
        ${sk.highlight ? '<span style="color:#f59e0b;" title="Featured">★</span>' : ''}
        <button type="button" class="profile-delete-item-btn" data-skill-idx="${idx}" title="Delete skill">&times;</button>
      </div>
    `).join('');

    listEl.querySelectorAll('.profile-delete-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.skillIdx, 10);
        this.editingSkills.splice(idx, 1);
        this.renderSkillsList();
      });
    });
  }

  renderExperiencesList() {
    const listEl = document.getElementById('profExperiencesList');
    if (!listEl) return;

    listEl.innerHTML = this.editingExperiences.map((exp, idx) => `
      <div class="profile-exp-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem;">
          <div>
            <strong>${this.escapeHtml(exp.role)}</strong> @ <em>${this.escapeHtml(exp.company)}</em>
            <div style="font-size:0.75rem; color:var(--text-muted);">${this.escapeHtml(exp.period || '')} • ${this.escapeHtml(exp.location || '')} ${exp.teamSize ? `• ${this.escapeHtml(exp.teamSize)}` : ''}</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.3rem;">${(exp.bullets || []).slice(0, 2).map(b => `• ${this.escapeHtml(b)}`).join('<br>')}</div>
          </div>
          <div class="profile-card-actions">
            <button type="button" class="btn btn-secondary btn-sm edit-exp-btn" data-exp-idx="${idx}">✏️ Edit</button>
            <button type="button" class="btn btn-secondary btn-sm delete-exp-btn" data-exp-idx="${idx}" style="color:#ef4444;">Delete</button>
          </div>
        </div>
      </div>
    `).join('');

    listEl.querySelectorAll('.edit-exp-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.expIdx, 10);
        this.openExperienceEditor(idx);
      });
    });

    listEl.querySelectorAll('.delete-exp-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.expIdx, 10);
        this.editingExperiences.splice(idx, 1);
        this.renderExperiencesList();
      });
    });
  }

  renderProjectsList() {
    const listEl = document.getElementById('profProjectsList');
    if (!listEl) return;

    listEl.innerHTML = this.editingProjects.map((p, idx) => `
      <div class="profile-exp-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem;">
          <div>
            <strong>${this.escapeHtml(p.title)}</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">${this.escapeHtml(p.client || '')} • ${(p.technologies || []).join(', ')}</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.25rem;">${this.escapeHtml(p.impact || p.summary || '')}</div>
          </div>
          <div class="profile-card-actions">
            <button type="button" class="btn btn-secondary btn-sm edit-proj-btn" data-proj-idx="${idx}">✏️ Edit</button>
            <button type="button" class="btn btn-secondary btn-sm delete-proj-btn" data-proj-idx="${idx}" style="color:#ef4444;">Delete</button>
          </div>
        </div>
      </div>
    `).join('');

    listEl.querySelectorAll('.edit-proj-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.projIdx, 10);
        this.openProjectEditor(idx);
      });
    });

    listEl.querySelectorAll('.delete-proj-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.projIdx, 10);
        this.editingProjects.splice(idx, 1);
        this.renderProjectsList();
      });
    });
  }

  renderEducationList() {
    const listEl = document.getElementById('profEduList');
    if (!listEl) return;

    listEl.innerHTML = this.editingEducation.map((edu, idx) => `
      <div class="profile-exp-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem;">
          <div>
            <strong>${this.escapeHtml(edu.degree)}</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">${this.escapeHtml(edu.institution)} • ${this.escapeHtml(edu.period || '')}</div>
          </div>
          <button type="button" class="btn btn-secondary btn-sm delete-edu-btn" data-edu-idx="${idx}" style="color:#ef4444;">Delete</button>
        </div>
      </div>
    `).join('');

    listEl.querySelectorAll('.delete-edu-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.eduIdx, 10);
        this.editingEducation.splice(idx, 1);
        this.renderEducationList();
      });
    });
  }

  renderCertificationsList() {
    const listEl = document.getElementById('profCertsList');
    if (!listEl) return;

    listEl.innerHTML = this.editingCertifications.map((cert, idx) => `
      <div class="profile-exp-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:0.5rem;">
          <div>
            <strong>${this.escapeHtml(cert.title)}</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">${this.escapeHtml(cert.issuer)}</div>
          </div>
          <button type="button" class="btn btn-secondary btn-sm delete-cert-btn" data-cert-idx="${idx}" style="color:#ef4444;">Delete</button>
        </div>
      </div>
    `).join('');

    listEl.querySelectorAll('.delete-cert-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.certIdx, 10);
        this.editingCertifications.splice(idx, 1);
        this.renderCertificationsList();
      });
    });
  }

  renderLanguagesList() {
    const listEl = document.getElementById('profLangsList');
    if (!listEl) return;

    listEl.innerHTML = this.editingLanguages.map((lang, idx) => `
      <div class="profile-item-chip">
        <span><strong>${this.escapeHtml(lang.name)}</strong> (${this.escapeHtml(lang.proficiency || 'Fluent')})</span>
        <button type="button" class="profile-delete-item-btn delete-lang-btn" data-lang-idx="${idx}">&times;</button>
      </div>
    `).join('');

    listEl.querySelectorAll('.delete-lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.langIdx, 10);
        this.editingLanguages.splice(idx, 1);
        this.renderLanguagesList();
      });
    });
  }

  updateActiveProfileBanner() {
    const isCustom = ProfileStore.isCustom();
    const info = ProfileStore.getProfileInfo();

    // In Navbar
    const navBtn = document.getElementById('cosProfileManagerNavBtn');
    if (navBtn) {
      if (isCustom) {
        navBtn.classList.add('custom-active');
        navBtn.innerHTML = `<span>👤 ${this.escapeHtml(info.name.split(' ')[0])} (Custom)</span>`;
      } else {
        navBtn.classList.remove('custom-active');
        navBtn.innerHTML = `<span>👤 Edit Profile</span>`;
      }
    }

    // In CareerOS Header
    const cosBadge = document.getElementById('cosActiveProfileBadge');
    if (cosBadge) {
      if (isCustom) {
        cosBadge.className = 'cos-profile-badge active-custom';
        cosBadge.innerHTML = `<span>👤 ${this.escapeHtml(info.name)}</span><span class="badge-tag">Custom Active</span>`;
      } else {
        cosBadge.className = 'cos-profile-badge default-demo';
        cosBadge.innerHTML = `<span>👤 Savan Karathiya</span><span class="badge-tag">Demo Showcase</span>`;
      }
    }
  }

  openModal() {
    this.populateFormFromStore();
    const backdrop = document.getElementById('cosProfileModalBackdrop');
    if (backdrop) {
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    const backdrop = document.getElementById('cosProfileModalBackdrop');
    if (backdrop) {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast toast-enter';
    toast.innerHTML = `
      <div class="toast-icon">✨</div>
      <div class="toast-message">${this.escapeHtml(message)}</div>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('toast-enter');
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

export const ProfileEditor = new ProfileEditorController();
