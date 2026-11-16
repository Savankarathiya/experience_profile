/**
 * =========================================================================
 * PROFILE STORE - UNIVERSAL DYNAMIC PROFILE & INGESTION ENGINE
 * =========================================================================
 * Manages active candidate profile state across both the public portfolio
 * and CareerOS. Defaults to Savan Karathiya's master showcase out-of-the-box.
 * Supports custom JSON imports, PDF/Word resume text ingestion, manual form
 * editing, and 1-click portfolio bundle generation for GitHub Pages.
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

const STORAGE_KEY = 'cos_user_profile_v1';

export const DEFAULT_PROFILE = {
  profileInfo: { ...PROFILE_INFO },
  recruiterRoles: JSON.parse(JSON.stringify(RECRUITER_ROLES)),
  skillsCategories: JSON.parse(JSON.stringify(SKILLS_CATEGORIES)),
  skillsData: JSON.parse(JSON.stringify(SKILLS_DATA)),
  experiencesData: JSON.parse(JSON.stringify(EXPERIENCES_DATA)),
  projectsData: JSON.parse(JSON.stringify(PROJECTS_DATA)),
  educationData: JSON.parse(JSON.stringify(EDUCATION_DATA)),
  certificationsData: JSON.parse(JSON.stringify(CERTIFICATIONS_DATA)),
  languagesData: JSON.parse(JSON.stringify(LANGUAGES_DATA)),
  customAvatar: null, // base64 string if uploaded
  stats: [
    { number: "10+", label: "Years Experience" },
    { number: "30+", label: "Tech Competencies" },
    { number: "15+", label: "Engineers Mentored" },
    { number: "99.9%", label: "Production Reliability" }
  ],
  heroBadges: ["Technical Lead @ Rapidops", "Ex-Infosys Consultant"],
  availabilityStatus: "Available for Technical Leadership & Architect Roles"
};

class ProfileStoreEngine {
  constructor() {
    this.listeners = [];
    this.currentProfile = this.loadInitialProfile();
  }

  loadInitialProfile() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.profileInfo && parsed.profileInfo.name) {
          // Merge with default to guarantee all expected array keys exist
          return {
            ...JSON.parse(JSON.stringify(DEFAULT_PROFILE)),
            ...parsed,
            profileInfo: {
              ...DEFAULT_PROFILE.profileInfo,
              ...parsed.profileInfo
            }
          };
        }
      }
    } catch (e) {
      console.warn('Could not parse stored profile from localStorage:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_PROFILE));
  }

  isCustom() {
    try {
      return Boolean(localStorage.getItem(STORAGE_KEY));
    } catch {
      return false;
    }
  }

  getProfile() {
    return this.currentProfile;
  }

  getProfileInfo() {
    return this.currentProfile.profileInfo || DEFAULT_PROFILE.profileInfo;
  }

  getSkills() {
    return this.currentProfile.skillsData || DEFAULT_PROFILE.skillsData;
  }

  getSkillCategories() {
    return this.currentProfile.skillsCategories || DEFAULT_PROFILE.skillsCategories;
  }

  getExperiences() {
    return this.currentProfile.experiencesData || DEFAULT_PROFILE.experiencesData;
  }

  getProjects() {
    return this.currentProfile.projectsData || DEFAULT_PROFILE.projectsData;
  }

  getEducation() {
    return this.currentProfile.educationData || DEFAULT_PROFILE.educationData;
  }

  getCertifications() {
    return this.currentProfile.certificationsData || DEFAULT_PROFILE.certificationsData;
  }

  getLanguages() {
    return this.currentProfile.languagesData || DEFAULT_PROFILE.languagesData;
  }

  getRecruiterRoles() {
    return this.currentProfile.recruiterRoles || DEFAULT_PROFILE.recruiterRoles;
  }

  getStats() {
    return this.currentProfile.stats || DEFAULT_PROFILE.stats;
  }

  getHeroBadges() {
    return this.currentProfile.heroBadges || DEFAULT_PROFILE.heroBadges;
  }

  getAvatar() {
    return this.currentProfile.customAvatar || 'assets/savan_profile.jpg';
  }

  subscribe(listener) {
    if (typeof listener === 'function') {
      this.listeners.push(listener);
    }
  }

  notify() {
    this.listeners.forEach(fn => {
      try {
        fn(this.currentProfile);
      } catch (err) {
        console.error('ProfileStore subscriber notification error:', err);
      }
    });
  }

  saveProfile(updatedProfile) {
    if (!updatedProfile || typeof updatedProfile !== 'object') return false;

    // Sanitize and structure
    const cleaned = {
      ...JSON.parse(JSON.stringify(DEFAULT_PROFILE)),
      ...updatedProfile,
      profileInfo: {
        ...DEFAULT_PROFILE.profileInfo,
        ...(updatedProfile.profileInfo || {})
      }
    };

    this.currentProfile = cleaned;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    } catch (e) {
      console.warn('Failed to save profile to localStorage:', e);
    }

    this.notify();
    return true;
  }

  resetToDefault() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Error clearing custom profile:', e);
    }
    this.currentProfile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
    this.notify();
  }

  /**
   * Export the active profile as a clean JSON file
   */
  exportProfileJSON() {
    const profile = this.getProfile();
    const safeName = (profile.profileInfo.name || 'Candidate').replace(/[^a-zA-Z0-9_-]/g, '_');
    const exportPayload = {
      system: 'CareerOS Universal Profile',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      ...profile
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `Profile_${safeName}_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  /**
   * Generates a ready-to-use `data.js` file for deploying to GitHub Pages
   */
  generatePortfolioBundle() {
    const p = this.getProfile();
    const safeName = (p.profileInfo.name || 'Candidate').replace(/[^a-zA-Z0-9_-]/g, '_');
    
    const fileContent = `/**
 * =========================================================================
 * PROFILE & PORTFOLIO DATA CONFIGURATION
 * Generated for ${p.profileInfo.name}
 * =========================================================================
 */

export const PROFILE_INFO = ${JSON.stringify(p.profileInfo, null, 2)};

export const RECRUITER_ROLES = ${JSON.stringify(p.recruiterRoles, null, 2)};

export const SKILLS_CATEGORIES = ${JSON.stringify(p.skillsCategories, null, 2)};

export const SKILLS_DATA = ${JSON.stringify(p.skillsData, null, 2)};

export const EXPERIENCES_DATA = ${JSON.stringify(p.experiencesData, null, 2)};

export const PROJECTS_DATA = ${JSON.stringify(p.projectsData, null, 2)};

export const EDUCATION_DATA = ${JSON.stringify(p.educationData, null, 2)};

export const CERTIFICATIONS_DATA = ${JSON.stringify(p.certificationsData, null, 2)};

export const LANGUAGES_DATA = ${JSON.stringify(p.languagesData, null, 2)};
`;

    const dataStr = 'data:text/javascript;charset=utf-8,' + encodeURIComponent(fileContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'data.js');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  /**
   * Reads a file and returns pure base64 without prefix
   */
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const res = reader.result;
        const base64 = typeof res === 'string' && res.includes(',') ? res.split(',')[1] : res;
        resolve(base64);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  /**
   * Client-side Word (.docx) document plain text extractor
   * Uses native DecompressionStream('deflate-raw') on word/document.xml
   */
  async extractTextFromDocx(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);
    let offset = 0;
    let extractedXml = '';

    while (offset < bytes.length - 30) {
      if (bytes[offset] === 0x50 && bytes[offset+1] === 0x4b && bytes[offset+2] === 0x03 && bytes[offset+3] === 0x04) {
        const compression = bytes[offset + 8] | (bytes[offset + 9] << 8);
        const compressedSize = bytes[offset + 18] | (bytes[offset + 19] << 8) | (bytes[offset + 20] << 16) | (bytes[offset + 21] << 24);
        const nameLen = bytes[offset + 26] | (bytes[offset + 27] << 8);
        const extraLen = bytes[offset + 28] | (bytes[offset + 29] << 8);
        
        const nameBytes = bytes.subarray(offset + 30, offset + 30 + nameLen);
        const entryName = new TextDecoder().decode(nameBytes);
        const dataOffset = offset + 30 + nameLen + extraLen;
        
        if (entryName === 'word/document.xml') {
          const compressedData = bytes.subarray(dataOffset, dataOffset + compressedSize);
          if (compression === 8) {
            const ds = new DecompressionStream('deflate-raw');
            const writer = ds.writable.getWriter();
            writer.write(compressedData);
            writer.close();
            const decompressed = await new Response(ds.readable).arrayBuffer();
            extractedXml = new TextDecoder('utf-8').decode(decompressed);
          } else if (compression === 0) {
            extractedXml = new TextDecoder('utf-8').decode(compressedData);
          }
          break;
        }
        offset = dataOffset + compressedSize;
      } else {
        offset++;
      }
    }

    if (!extractedXml) return '';
    const textMatches = extractedXml.match(/<w:t[^>]*>([^<]*)<\/w:t>/g) || [];
    return textMatches.map(m => m.replace(/<[^>]+>/g, '')).join(' ').replace(/\s+/g, ' ').trim();
  }

  /**
   * Client-side PDF text stream scanner & decompressor
   * Handles uncompressed streams and /FlateDecode zlib streams
   */
  async extractTextFromPdf(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);
    const latin1 = new TextDecoder('latin1').decode(bytes);
    let extractedText = '';

    const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
    let match;
    const streamMatches = [];
    while ((match = streamRegex.exec(latin1)) !== null) {
      streamMatches.push({ index: match.index, rawData: match[1] });
    }

    for (const sm of streamMatches) {
      const preSlice = latin1.slice(Math.max(0, sm.index - 350), sm.index);
      const isFlate = /\/Filter\s*\/?FlateDecode/i.test(preSlice);
      
      let streamText = '';
      if (isFlate) {
        const streamBytes = new Uint8Array(sm.rawData.length);
        for (let i = 0; i < sm.rawData.length; i++) {
          streamBytes[i] = sm.rawData.charCodeAt(i);
        }

        try {
          const ds = new DecompressionStream('deflate');
          const writer = ds.writable.getWriter();
          writer.write(streamBytes);
          writer.close();
          const decompressed = await new Response(ds.readable).arrayBuffer();
          streamText = new TextDecoder('latin1').decode(decompressed);
        } catch {
          try {
            const dsRaw = new DecompressionStream('deflate-raw');
            const writerRaw = dsRaw.writable.getWriter();
            writerRaw.write(streamBytes);
            writerRaw.close();
            const decompressed = await new Response(dsRaw.readable).arrayBuffer();
            streamText = new TextDecoder('latin1').decode(decompressed);
          } catch {
            streamText = '';
          }
        }
      } else {
        streamText = sm.rawData;
      }

      if (streamText) {
        const tjRegex = /\(([^)]*)\)\s*Tj/g;
        let tm;
        while ((tm = tjRegex.exec(streamText)) !== null) {
          extractedText += tm[1] + ' ';
        }

        const arrayTjRegex = /\[([^\]]+)\]\s*TJ/g;
        let am;
        while ((am = arrayTjRegex.exec(streamText)) !== null) {
          const innerTj = am[1].match(/\(([^)]*)\)/g) || [];
          for (const item of innerTj) {
            extractedText += item.slice(1, -1) + ' ';
          }
        }
      }
    }

    extractedText = extractedText
      .replace(/\\([0-7]{3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)))
      .replace(/\\([()\\\/])/g, '$1')
      .replace(/\\r/g, '\n')
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return extractedText;
  }

  /**
   * Compresses an image file client-side to base64 using Canvas
   * Max 360x360, WebP/JPEG quality 0.85 (~30-50KB)
   */
  compressImageToBase64(file) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type.startsWith('image/')) {
        return reject(new Error('Selected file is not an image'));
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 360;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Prefer webp, fallback to jpeg
          try {
            const base64 = canvas.toDataURL('image/webp', 0.85);
            resolve(base64);
          } catch {
            const base64 = canvas.toDataURL('image/jpeg', 0.85);
            resolve(base64);
          }
        };
        img.onerror = () => reject(new Error('Could not load image'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Could not read image file'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Heuristic regex parser for raw resume text when offline or without API key
   */
  parseResumeHeuristic(text) {
    if (!text || typeof text !== 'string') return null;

    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = text.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
    const linkedinMatch = text.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i);
    const githubMatch = text.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i);
    const yearsMatch = text.match(/\b(\d{1,2})\+?\s*(?:years?|yrs?)\b/i);

    // Attempt name from first non-empty line (up to 4 words)
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    let detectedName = 'Candidate Name';
    for (const line of lines.slice(0, 5)) {
      if (line.length > 2 && line.length < 40 && !line.includes('@') && !line.includes('http') && !line.includes('Resume')) {
        detectedName = line;
        break;
      }
    }

    // Common skills scan
    const knownSkills = [
      'JavaScript', 'TypeScript', 'Node.js', 'React.js', 'Python', 'FastAPI',
      'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Docker', 'Kubernetes',
      'AWS', 'CI/CD', 'Next.js', 'Redux', 'GraphQL', 'Express', 'Git', 'Linux'
    ];
    const detectedSkills = [];
    for (const sk of knownSkills) {
      const regex = new RegExp(`\\b${sk.replace('.', '\\.')}\\b`, 'i');
      if (regex.test(text)) {
        detectedSkills.push({
          name: sk,
          category: 'core',
          experience: '3+ yrs',
          level: 85,
          highlight: detectedSkills.length < 4
        });
      }
    }

    return {
      profileInfo: {
        name: detectedName,
        title: lines[1] && lines[1].length < 60 ? lines[1] : 'Software Engineer',
        tagline: lines.slice(2, 4).join(' ').slice(0, 160) || 'Experienced engineer building scalable software.',
        email: emailMatch ? emailMatch[0] : 'email@example.com',
        linkedin: linkedinMatch ? (linkedinMatch[0].startsWith('http') ? linkedinMatch[0] : 'https://' + linkedinMatch[0]) : '',
        github: githubMatch ? (githubMatch[0].startsWith('http') ? githubMatch[0] : 'https://' + githubMatch[0]) : '',
        location: 'Remote / Global',
        experienceYears: yearsMatch ? `${yearsMatch[1]}+` : '5+',
        status: 'Available for New Engineering Opportunities',
        summary: lines.slice(2, 6).join(' ').slice(0, 350)
      },
      skillsData: detectedSkills.length > 0 ? detectedSkills : DEFAULT_PROFILE.skillsData,
      stats: [
        { number: yearsMatch ? `${yearsMatch[1]}+` : "5+", label: "Years Experience" },
        { number: `${Math.max(detectedSkills.length, 12)}+`, label: "Tech Competencies" },
        { number: "10+", label: "Projects Delivered" },
        { number: "99.9%", label: "System Availability" }
      ]
    };
  }

  /**
   * High-accuracy structured parsing with Gemini API
   */
  async parseResumeWithGemini(apiKey, model, rawText) {
    if (!apiKey) throw new Error('Gemini API key is required');
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model || 'gemini-2.0-flash'}:generateContent?key=${apiKey}`;

    const prompt = `You are an expert technical resume parser. Extract candidate details from the following resume text and format them into valid JSON strictly conforming to this structure:
{
  "profileInfo": {
    "name": "Full Name",
    "title": "Current or Target Professional Title",
    "tagline": "Short 1-sentence value proposition",
    "email": "email address",
    "linkedin": "full LinkedIn URL",
    "github": "full GitHub URL",
    "location": "City, Country",
    "experienceYears": "e.g. 8+",
    "status": "Available for Technical Roles",
    "summary": "2-3 sentence executive professional summary"
  },
  "stats": [
    { "number": "e.g. 8+", "label": "Years Experience" },
    { "number": "e.g. 25+", "label": "Tech Competencies" },
    { "number": "e.g. 15+", "label": "Projects Delivered" },
    { "number": "e.g. 99.9%", "label": "Production Reliability" }
  ],
  "heroBadges": ["Current or recent role @ Company", "Prior distinguished role"],
  "skillsData": [
    { "name": "Skill Name", "category": "core", "experience": "e.g. 5 yrs", "level": 90, "highlight": true }
  ],
  "experiencesData": [
    {
      "role": "Role Title",
      "company": "Company Name",
      "period": "YYYY - YYYY",
      "duration": "e.g. 3 yrs",
      "location": "City, Country",
      "type": "Full-time",
      "summary": "Brief 1-2 sentence overview of responsibilities",
      "bullets": ["Accomplishment bullet 1", "Accomplishment bullet 2"]
    }
  ],
  "projectsData": [
    {
      "title": "Project or Architecture Title",
      "client": "Company or Domain",
      "summary": "Brief overview",
      "problem": "Technical bottleneck",
      "solution": "Architectural solution",
      "metrics": [{ "label": "Impact", "value": "Metric" }],
      "technologies": ["Tech 1", "Tech 2"]
    }
  ],
  "educationData": [
    {
      "degree": "Degree Title",
      "field": "Field of Study",
      "institution": "University / Institution",
      "period": "YYYY - YYYY",
      "details": "Coursework or highlights"
    }
  ],
  "languagesData": [
    { "name": "Language", "proficiency": "Fluent", "level": 100 }
  ]
}

Respond ONLY with valid JSON. Do not include markdown codeblocks or extra text.

Resume Text:
${rawText.slice(0, 8000)}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 2500
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    text = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();

    return JSON.parse(text);
  }

  /**
   * Multimodal structured parsing with Gemini API for PDF / binary resumes
   */
  async parseResumeWithGeminiMultimodal(apiKey, model, base64Pdf, mimeType = 'application/pdf') {
    if (!apiKey) throw new Error('Gemini API key is required');
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model || 'gemini-2.0-flash'}:generateContent?key=${apiKey}`;

    const prompt = `You are an expert technical resume parser. Analyze this complete resume document and extract candidate details. Format them into valid JSON strictly conforming to this structure:
{
  "profileInfo": {
    "name": "Full Name",
    "title": "Current or Target Professional Title",
    "tagline": "Short 1-sentence value proposition",
    "email": "email address",
    "linkedin": "full LinkedIn URL",
    "github": "full GitHub URL",
    "location": "City, Country",
    "experienceYears": "e.g. 10+",
    "status": "Available for Technical Roles",
    "summary": "2-3 sentence executive professional summary"
  },
  "stats": [
    { "number": "e.g. 10+", "label": "Years Experience" },
    { "number": "e.g. 30+", "label": "Tech Competencies" },
    { "number": "e.g. 15+", "label": "Projects Delivered" },
    { "number": "e.g. 99.9%", "label": "Production Reliability" }
  ],
  "heroBadges": ["Current or recent role @ Company", "Prior distinguished role"],
  "skillsData": [
    { "name": "Skill Name", "category": "core", "experience": "e.g. 5 yrs", "level": 90, "highlight": true }
  ],
  "experiencesData": [
    {
      "role": "Role Title",
      "company": "Company Name",
      "period": "YYYY - YYYY",
      "duration": "e.g. 3 yrs",
      "location": "City, Country",
      "type": "Full-time",
      "summary": "Brief 1-2 sentence overview of responsibilities",
      "bullets": ["Accomplishment bullet 1", "Accomplishment bullet 2"]
    }
  ],
  "projectsData": [
    {
      "title": "Project or Architecture Title",
      "client": "Company or Domain",
      "summary": "Brief overview",
      "problem": "Technical bottleneck",
      "solution": "Architectural solution",
      "metrics": [{ "label": "Impact", "value": "Metric" }],
      "technologies": ["Tech 1", "Tech 2"]
    }
  ],
  "educationData": [
    {
      "degree": "Degree Title",
      "field": "Field of Study",
      "institution": "University / Institution",
      "period": "YYYY - YYYY",
      "details": "Coursework or highlights"
    }
  ],
  "certificationsData": [
    {
      "title": "Certification Title",
      "issuer": "Issuing Organization",
      "description": "Details",
      "skillsAcquired": ["Skill 1", "Skill 2"]
    }
  ],
  "languagesData": [
    { "name": "Language", "proficiency": "Fluent", "level": 100 }
  ]
}

Respond ONLY with valid JSON. Do not include markdown codeblocks or extra text.`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: mimeType,
                  data: base64Pdf
                }
              },
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 3000
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    text = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim();

    return JSON.parse(text);
  }
}

export const ProfileStore = new ProfileStoreEngine();
