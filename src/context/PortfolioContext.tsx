import React, { createContext, useContext, useState, useEffect } from 'react';
import { PORTFOLIO_DATA, ResearchProject, WorkExperienceItem, EducationItem, ReferenceItem, PersonalInterestItem, LanguageProficiency, CertificationItem, ExtraCurricularItem, AffiliationItem } from '../data/portfolioData';

export interface SkillProficiency {
  subject: string;
  A: number;
}

export interface MetaDataConfig {
  title: string;
  description: string;
  keywords: string;
  faviconUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
}

export const DEFAULT_META_DATA: MetaDataConfig = {
  title: 'Lubna Akter Portfolio',
  description: 'Official portfolio of Lubna Akter — Pharmacy Student, Pharmaceutical Researcher, and Clinical Science Scholar specializing in Pharmacology, Drug Design, and Medical Writing.',
  keywords: 'Lubna Akter, Clinical Pharmacy, Pharmaceutical Research, Pharmacology, Drug Design, Medical Writing, Pharmacy Student Portfolio, UITS, Bangladesh Pharmacist',
  faviconUrl: '',
  ogTitle: 'Lubna Akter Portfolio',
  ogDescription: 'Official portfolio of Lubna Akter — Pharmacy Student, Pharmaceutical Researcher, and Clinical Science Scholar specializing in Pharmacology, Drug Design, and Medical Writing.',
};

export interface PortfolioData {
  profile: typeof PORTFOLIO_DATA.profile & { customCvUrl?: string; customCvName?: string };
  coreCompetencies: string[];
  softSkills: string[];
  computerLiteracy: string[];
  education: EducationItem[];
  researchProjects: ResearchProject[];
  certifications: CertificationItem[];
  workExperience: WorkExperienceItem[];
  entrepreneurialExperience: WorkExperienceItem[];
  extraCurricular: ExtraCurricularItem[];
  affiliations: AffiliationItem[];
  personalDetails: typeof PORTFOLIO_DATA.personalDetails;
  languages: LanguageProficiency[];
  skillProficiency: SkillProficiency[];
  personalInterests: PersonalInterestItem[];
  references: ReferenceItem[];
  sectionTitles: typeof PORTFOLIO_DATA.sectionTitles;
  metaData?: MetaDataConfig;
  secondaryAccent?: string;
}

interface PortfolioContextType {
  data: PortfolioData;
  updateProfile: (profile: Partial<PortfolioData['profile']>) => void;
  updateCoreCompetencies: (competencies: string[]) => void;
  updateSoftSkills: (skills: string[]) => void;
  updateComputerLiteracy: (tools: string[]) => void;
  updateEducation: (education: EducationItem[]) => void;
  updateResearchProjects: (projects: ResearchProject[]) => void;
  updateCertifications: (certs: CertificationItem[]) => void;
  updateWorkExperience: (work: WorkExperienceItem[]) => void;
  updateEntrepreneurial: (ent: WorkExperienceItem[]) => void;
  updateExtraCurricular: (extra: ExtraCurricularItem[]) => void;
  updateAffiliations: (aff: AffiliationItem[]) => void;
  updatePersonalDetails: (details: Partial<PortfolioData['personalDetails']>) => void;
  updateLanguages: (languages: LanguageProficiency[]) => void;
  updateSkillProficiency: (skillProficiency: SkillProficiency[]) => void;
  updatePersonalInterests: (interests: PersonalInterestItem[]) => void;
  updateReferences: (references: ReferenceItem[]) => void;
  updateSectionTitles: (titles: Partial<typeof PORTFOLIO_DATA.sectionTitles>) => void;
  updateMetaData: (meta: Partial<MetaDataConfig>) => void;
  updateSecondaryAccent: (color: string) => void;
  saveAllData: (allData: Partial<PortfolioData>) => void;
  resetToDefault: () => void;
}

const STORAGE_KEY = 'lubna_portfolio_data_v19';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      // Clean up legacy cached data keys
      [
        'lubna_portfolio_data_v1',
        'lubna_portfolio_data_v2',
        'lubna_portfolio_data_v3',
        'lubna_portfolio_data_v4',
        'lubna_portfolio_data_v5',
        'lubna_portfolio_data_v6',
        'lubna_portfolio_data_v7',
        'lubna_portfolio_data_v8',
        'lubna_portfolio_data_v9',
        'lubna_portfolio_data_v10',
        'lubna_portfolio_data_v11',
        'lubna_portfolio_data_v12',
        'lubna_portfolio_data_v13',
        'lubna_portfolio_data_v14',
        'lubna_portfolio_data_v15',
        'lubna_portfolio_data_v16',
        'lubna_portfolio_data_v17',
        'lubna_portfolio_data_v18',
      ].forEach(k => {
        try { localStorage.removeItem(k); } catch (_) {}
      });

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const mergedProfile = { ...PORTFOLIO_DATA.profile, ...(parsed.profile || {}) };
        mergedProfile.linkedinUrl = 'https://www.linkedin.com/in/heyitslubnaakter/';
        mergedProfile.linkedin = 'linkedin.com/in/heyitslubnaakter';
        if (mergedProfile.headline === 'B.Pharm Student | Pharmaceutical Research, Drug Information & Medical Writing') {
          mergedProfile.headline = PORTFOLIO_DATA.profile.headline;
        }
        if (mergedProfile.subtitle === '4th-Year B.Pharm Student' || !mergedProfile.subtitle) {
          mergedProfile.subtitle = 'Pharmacy Student';
        }
        if (mergedProfile.whatsapp === '+8801339591307' || mergedProfile.whatsapp === '+88 0133 95 91 307') {
          mergedProfile.whatsapp = '+880 1537-720007';
          mergedProfile.whatsappUrl = 'https://wa.me/8801537720007';
        }
        if (mergedProfile.instagramUrl === 'https://www.instagram.com/' || !mergedProfile.instagramUrl) {
          mergedProfile.instagramUrl = 'https://www.instagram.com/thisisrufaida';
        }
        if (!mergedProfile.bloggerUrl) {
          mergedProfile.bloggerUrl = 'https://www.blogger.com';
        }
        if (!mergedProfile.customSocialLinks) {
          mergedProfile.customSocialLinks = [];
        }
        if (
          !mergedProfile.photoUrl ||
          mergedProfile.photoUrl === '/Lubna-Akter-Pharmacist-Profile-Photo.png' ||
          mergedProfile.photoUrl.includes('portrait_lubna') ||
          mergedProfile.photoUrl.includes('lubna_niqab_portrait') ||
          mergedProfile.photoUrl.includes('lubna_profile_photo') ||
          mergedProfile.photoUrl.includes('lubna_pakistani_pharmacist')
        ) {
          mergedProfile.photoUrl = PORTFOLIO_DATA.profile.photoUrl;
        }

        const mergedSectionTitles = {
          ...PORTFOLIO_DATA.sectionTitles,
          ...(parsed.sectionTitles || {}),
          skills: 'Pharmaceutical Knowledge & Skills',
        };

        const migratedProjects = ((parsed.researchProjects || PORTFOLIO_DATA.researchProjects) as ResearchProject[]).map(p => {
          if (p.id === 'hepatitis' || p.status?.includes('Ranked Top 3')) {
            return { ...p, status: 'Ranked Top 3' };
          }
          return p;
        });

        const migratedInterests = ((parsed.personalInterests || PORTFOLIO_DATA.personalInterests) as PersonalInterestItem[]).map(item => {
          if (item.id === 'journaling' || item.title?.includes('Aesthetic Journaling')) {
            return {
              ...item,
              shortDesc: 'Capturing little moments, beautiful places, and everyday adventures through my lens, creating a visual diary of memories I can revisit and relive.',
              detailedDesc: 'Capturing little moments, beautiful places, and everyday adventures through my lens, creating a visual diary of memories I can revisit and relive.',
            };
          }
          return item;
        });

        return {
          ...PORTFOLIO_DATA,
          ...parsed,
          profile: mergedProfile,
          coreCompetencies: parsed.coreCompetencies || PORTFOLIO_DATA.coreCompetencies,
          softSkills: parsed.softSkills || PORTFOLIO_DATA.softSkills,
          computerLiteracy: parsed.computerLiteracy || PORTFOLIO_DATA.computerLiteracy,
          education: ((parsed.education || PORTFOLIO_DATA.education) as EducationItem[]).map(e => {
            let timeline = (e.timeline || '').replace(/\s*\(In Progress\)/gi, '').trim();
            let badge = e.badge;
            if (e.discipline.includes('Bachelor of Pharmacy') || e.discipline.includes('B. Pharm')) {
              timeline = '2027';
              badge = '2027';
            }
            return {
              ...e,
              timeline,
              badge,
            };
          }),
          researchProjects: migratedProjects,
          workExperience: parsed.workExperience || PORTFOLIO_DATA.workExperience,
          entrepreneurialExperience: parsed.entrepreneurialExperience || PORTFOLIO_DATA.entrepreneurialExperience,
          certifications: ((parsed.certifications || PORTFOLIO_DATA.certifications) as CertificationItem[]).map(c => ({
            ...c,
            group: (c.group || '').replace(/ProfessionalTraining/gi, 'Professional Training'),
          })),
          extraCurricular: parsed.extraCurricular || PORTFOLIO_DATA.extraCurricular,
          references: parsed.references || PORTFOLIO_DATA.references,
          languages: parsed.languages && parsed.languages.length > 0 ? parsed.languages : PORTFOLIO_DATA.languages,
          personalInterests: migratedInterests,
          sectionTitles: mergedSectionTitles,
        };
      }
    } catch (e) {
      console.error('Failed to load portfolio data from localStorage', e);
    }
    return PORTFOLIO_DATA as PortfolioData;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save portfolio data to localStorage', e);
    }
  }, [data]);

  const updateProfile = (profileUpdate: Partial<PortfolioData['profile']>) => {
    setData(prev => ({
      ...prev,
      profile: { ...prev.profile, ...profileUpdate }
    }));
  };

  const updateCoreCompetencies = (coreCompetencies: string[]) => {
    setData(prev => ({ ...prev, coreCompetencies }));
  };

  const updateSoftSkills = (softSkills: string[]) => {
    setData(prev => ({ ...prev, softSkills }));
  };

  const updateComputerLiteracy = (computerLiteracy: string[]) => {
    setData(prev => ({ ...prev, computerLiteracy }));
  };

  const updateEducation = (education: EducationItem[]) => {
    setData(prev => ({ ...prev, education }));
  };

  const updateResearchProjects = (researchProjects: ResearchProject[]) => {
    setData(prev => ({ ...prev, researchProjects }));
  };

  const updateCertifications = (certifications: { title: string; issuer: string; year: string }[]) => {
    setData(prev => ({ ...prev, certifications }));
  };

  const updateWorkExperience = (workExperience: WorkExperienceItem[]) => {
    setData(prev => ({ ...prev, workExperience }));
  };

  const updateEntrepreneurial = (entrepreneurialExperience: WorkExperienceItem[]) => {
    setData(prev => ({ ...prev, entrepreneurialExperience }));
  };

  const updateExtraCurricular = (extraCurricular: ExtraCurricularItem[]) => {
    setData(prev => ({ ...prev, extraCurricular }));
  };

  const updateAffiliations = (affiliations: AffiliationItem[]) => {
    setData(prev => ({ ...prev, affiliations }));
  };

  const updatePersonalDetails = (personalDetailsUpdate: Partial<PortfolioData['personalDetails']>) => {
    setData(prev => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, ...personalDetailsUpdate }
    }));
  };

  const updateLanguages = (languages: LanguageProficiency[]) => {
    setData(prev => ({ ...prev, languages }));
  };

  const updatePersonalInterests = (personalInterests: PersonalInterestItem[]) => {
    setData(prev => ({ ...prev, personalInterests }));
  };

  const updateReferences = (references: ReferenceItem[]) => {
    setData(prev => ({ ...prev, references }));
  };

  const updateSectionTitles = (titlesUpdate: Partial<typeof PORTFOLIO_DATA.sectionTitles>) => {
    setData(prev => ({
      ...prev,
      sectionTitles: { ...prev.sectionTitles, ...titlesUpdate }
    }));
  };

  const updateSkillProficiency = (skillProficiency: SkillProficiency[]) => {
    setData(prev => ({ ...prev, skillProficiency }));
  };

  const updateMetaData = (metaUpdate: Partial<MetaDataConfig>) => {
    setData(prev => ({
      ...prev,
      metaData: { ...(prev.metaData || DEFAULT_META_DATA), ...metaUpdate }
    }));
  };

  const updateSecondaryAccent = (color: string) => {
    setData(prev => ({
      ...prev,
      secondaryAccent: color
    }));
  };

  // Synchronize dynamic metadata and secondary accent directly to the live document
  useEffect(() => {
    const meta = data.metaData || DEFAULT_META_DATA;

    // 1. Page Title
    if (meta.title) {
      document.title = meta.title;
    }

    // 2. Meta Description
    if (meta.description) {
      const descTag = document.querySelector('meta[name="description"]');
      if (descTag) {
        descTag.setAttribute('content', meta.description);
      }
      const ogDescTag = document.querySelector('meta[property="og:description"]');
      if (ogDescTag) {
        ogDescTag.setAttribute('content', meta.ogDescription || meta.description);
      }
    }

    // 3. Meta Keywords
    if (meta.keywords) {
      const keywordsTag = document.querySelector('meta[name="keywords"]');
      if (keywordsTag) {
        keywordsTag.setAttribute('content', meta.keywords);
      }
    }

    // 4. OG Title
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute('content', meta.ogTitle || meta.title);
    }

    // 5. Dynamic Favicon
    if (meta.faviconUrl && meta.faviconUrl.trim().length > 0) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = meta.faviconUrl;
    }

    // 6. Secondary Accent CSS variables
    const accent = data.secondaryAccent || '#c084fc';
    document.documentElement.style.setProperty('--accent-color', accent);
    document.documentElement.style.setProperty('--accent-glow', `${accent}40`);
  }, [data.metaData, data.secondaryAccent]);

  const saveAllData = (updatedData: Partial<PortfolioData>) => {
    setData(prev => {
      const next: PortfolioData = {
        ...prev,
        ...updatedData,
        profile: { ...prev.profile, ...(updatedData.profile || {}) },
        personalDetails: { ...prev.personalDetails, ...(updatedData.personalDetails || {}) },
        sectionTitles: { ...prev.sectionTitles, ...(updatedData.sectionTitles || {}) },
        metaData: { ...(prev.metaData || DEFAULT_META_DATA), ...(updatedData.metaData || {}) },
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Failed to save to localStorage', e);
      }
      return next;
    });
  };

  const resetToDefault = () => {
    setData(PORTFOLIO_DATA as PortfolioData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateProfile,
        updateCoreCompetencies,
        updateSoftSkills,
        updateComputerLiteracy,
        updateEducation,
        updateResearchProjects,
        updateCertifications,
        updateWorkExperience,
        updateEntrepreneurial,
        updateExtraCurricular,
        updateAffiliations,
        updatePersonalDetails,
        updateLanguages,
        updateSkillProficiency,
        updatePersonalInterests,
        updateReferences,
        updateSectionTitles,
        updateMetaData,
        updateSecondaryAccent,
        saveAllData,
        resetToDefault,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
