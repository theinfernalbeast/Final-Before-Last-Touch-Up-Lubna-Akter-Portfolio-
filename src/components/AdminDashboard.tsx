import React, { useState } from 'react';
import { usePortfolio, DEFAULT_META_DATA, MetaDataConfig } from '../context/PortfolioContext';
import { useTheme } from '../context/ThemeContext';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { 
  X, User, Sliders, BookOpen, Award, Briefcase, Languages, Heart, UserCheck, 
  Mail, Share2, Type, Settings, Save, RotateCcw, Download, Upload, Plus, 
  Trash2, CheckCircle2, Image as ImageIcon, ChevronLeft, ChevronRight, 
  Building2, Calendar, MapPin, Link as LinkIcon, FileText, Check, ShieldCheck,
  Globe, Palette, Sparkles, GraduationCap, School
} from 'lucide-react';
import { TrafficChart } from './TrafficChart';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabId = 
  | 'profile' 
  | 'header' 
  | 'research' 
  | 'skills' 
  | 'experience' 
  | 'qualification'
  | 'language' 
  | 'interests' 
  | 'reference' 
  | 'contact' 
  | 'footer' 
  | 'sections' 
  | 'metadata'
  | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const { 
    data, updateProfile, updateCoreCompetencies, updateSoftSkills, updateComputerLiteracy, 
    updateEducation, updateResearchProjects, updateCertifications, updateWorkExperience, 
    updateEntrepreneurial, updateExtraCurricular, updateAffiliations, updatePersonalDetails, 
    updateLanguages, updatePersonalInterests, updateReferences, updateSectionTitles,
    updateMetaData, updateSecondaryAccent, saveAllData, resetToDefault 
  } = usePortfolio();
  
  const { isClinical } = useTheme();
  
  // Sorted strictly according to user's specification:
  // Profile > Header > Research > Skills > Experience > Qualification > Language > Interests > Reference > Contact > Footer > Sections > Metadata > Settings
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => 
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Experience sub-section tab (Education and Certifications are exclusively in the Qualification tab)
  const [expSubTab, setExpSubTab] = useState<'work' | 'ventures' | 'voluntary'>('work');
  // Qualification sub-section tab (Education and Certifications)
  const [qualSubTab, setQualSubTab] = useState<'education' | 'certs'>('education');

  // Local editing states
  const [profile, setProfile] = useState(data.profile);
  const [coreComps, setCoreComps] = useState([...data.coreCompetencies]);
  const [softSkills, setSoftSkills] = useState([...data.softSkills]);
  const [computerTools, setComputerTools] = useState([...data.computerLiteracy]);
  const [education, setEducation] = useState([...data.education]);
  const [researchProjects, setResearchProjects] = useState([...data.researchProjects]);
  const [workExp, setWorkExp] = useState([...data.workExperience]);
  const [entExp, setEntExp] = useState([...data.entrepreneurialExperience]);
  const [personalDetails, setPersonalDetails] = useState({ ...data.personalDetails });
  const [languages, setLanguages] = useState([...(data.languages || [])]);
  const [interests, setInterests] = useState([...data.personalInterests]);
  const [references, setReferences] = useState([...data.references]);
  const [certs, setCerts] = useState([...data.certifications]);
  const [affiliations, setAffiliations] = useState([...(data.affiliations || [])]);
  const [sectionTitles, setSectionTitles] = useState({ ...data.sectionTitles });
  const [metaData, setMetaData] = useState<MetaDataConfig>(data.metaData || DEFAULT_META_DATA);
  const [secondaryAccent, setSecondaryAccent] = useState<string>(data.secondaryAccent || '#c084fc');

  // Password change state
  const [newAdminPwd, setNewAdminPwd] = useState('');

  // Synchronize local states whenever dashboard opens or context data updates
  React.useEffect(() => {
    if (isOpen) {
      setProfile(data.profile);
      setCoreComps([...data.coreCompetencies]);
      setSoftSkills([...data.softSkills]);
      setComputerTools([...data.computerLiteracy]);
      setEducation([...data.education]);
      setResearchProjects([...data.researchProjects]);
      setWorkExp([...data.workExperience]);
      setEntExp([...data.entrepreneurialExperience]);
      setPersonalDetails({ ...data.personalDetails });
      setLanguages([...(data.languages || [])]);
      setInterests([...data.personalInterests]);
      setReferences([...data.references]);
      setCerts([...data.certifications]);
      setAffiliations([...(data.affiliations || [])]);
      setSectionTitles({ ...data.sectionTitles });
      setMetaData(data.metaData || DEFAULT_META_DATA);
      setSecondaryAccent(data.secondaryAccent || '#c084fc');
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3500);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    // 1. Atomic save and persistence to localStorage
    saveAllData({
      profile,
      coreCompetencies: coreComps.filter(Boolean),
      softSkills: softSkills.filter(Boolean),
      computerLiteracy: computerTools.filter(Boolean),
      education,
      researchProjects,
      workExperience: workExp,
      entrepreneurialExperience: entExp,
      personalDetails,
      languages,
      personalInterests: interests,
      references,
      certifications: certs,
      affiliations,
      sectionTitles,
      metaData,
      secondaryAccent,
    });
    // 2. Individual setters to ensure context reactivity
    updateProfile(profile);
    updateCoreCompetencies(coreComps.filter(Boolean));
    updateSoftSkills(softSkills.filter(Boolean));
    updateComputerLiteracy(computerTools.filter(Boolean));
    updateEducation(education);
    updateResearchProjects(researchProjects);
    updateWorkExperience(workExp);
    updateEntrepreneurial(entExp);
    updatePersonalDetails(personalDetails);
    updateLanguages(languages);
    updatePersonalInterests(interests);
    updateReferences(references);
    updateCertifications(certs);
    updateAffiliations(affiliations);
    updateSectionTitles(sectionTitles);
    updateMetaData(metaData);
    updateSecondaryAccent(secondaryAccent);
    await new Promise(resolve => setTimeout(resolve, 400));
    setIsSaving(false);
    showSuccess('All changes saved and applied live to website!');
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `lubna_portfolio_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showSuccess('Portfolio backup exported as JSON!');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.profile) {
            updateProfile(parsed.profile);
            if (parsed.coreCompetencies) updateCoreCompetencies(parsed.coreCompetencies);
            if (parsed.softSkills) updateSoftSkills(parsed.softSkills);
            if (parsed.computerLiteracy) updateComputerLiteracy(parsed.computerLiteracy);
            if (parsed.education) updateEducation(parsed.education);
            if (parsed.researchProjects) updateResearchProjects(parsed.researchProjects);
            if (parsed.certifications) updateCertifications(parsed.certifications);
            if (parsed.workExperience) updateWorkExperience(parsed.workExperience);
            if (parsed.entrepreneurialExperience) updateEntrepreneurial(parsed.entrepreneurialExperience);
            if (parsed.personalDetails) updatePersonalDetails(parsed.personalDetails);
            if (parsed.languages) updateLanguages(parsed.languages);
            if (parsed.personalInterests) updatePersonalInterests(parsed.personalInterests);
            if (parsed.references) updateReferences(parsed.references);
            
            setProfile(parsed.profile);
            if (parsed.coreCompetencies) setCoreComps([...parsed.coreCompetencies]);
            if (parsed.softSkills) setSoftSkills([...parsed.softSkills]);
            if (parsed.computerLiteracy) setComputerTools([...parsed.computerLiteracy]);
            if (parsed.education) setEducation([...parsed.education]);
            if (parsed.researchProjects) setResearchProjects([...parsed.researchProjects]);
            if (parsed.workExperience) setWorkExp([...parsed.workExperience]);
            if (parsed.entrepreneurialExperience) setEntExp([...parsed.entrepreneurialExperience]);
            if (parsed.personalDetails) setPersonalDetails({ ...parsed.personalDetails });
            if (parsed.languages) setLanguages([...parsed.languages]);
            if (parsed.personalInterests) setInterests([...parsed.personalInterests]);
            if (parsed.references) setReferences([...parsed.references]);
            if (parsed.certifications) setCerts([...parsed.certifications]);

            showSuccess('Portfolio data imported successfully!');
          } else {
            alert('Invalid portfolio backup file format.');
          }
        } catch {
          alert('Error parsing JSON backup file.');
        }
      };
    }
  };

  // Nav menu items sorted strictly by portfolio flow:
  const menuItems: { id: TabId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'header', label: 'Header', icon: Sliders },
    { id: 'research', label: 'Research', icon: BookOpen },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'qualification', label: 'Qualification', icon: GraduationCap },
    { id: 'language', label: 'Language', icon: Languages },
    { id: 'interests', label: 'Interests', icon: Heart },
    { id: 'reference', label: 'Reference', icon: UserCheck },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'footer', label: 'Footer', icon: Share2 },
    { id: 'sections', label: 'Sections', icon: Type },
    { id: 'metadata', label: 'Metadata', icon: Globe },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const activeAccent = secondaryAccent || data.secondaryAccent || '#c084fc';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-1.5 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden">
      <div
        className={`relative w-full max-w-6xl h-[96vh] sm:h-[92vh] flex flex-col rounded-2xl sm:rounded-3xl shadow-2xl border overflow-hidden ${
          isClinical ? 'bg-white text-slate-800 border-purple-200' : 'bg-slate-900/95 backdrop-blur-xl text-slate-100 border-purple-500/30'
        }`}
        style={{ borderColor: `${activeAccent}50` }}
      >
        
        {/* Simple Clean Header: Only "Portfolio Dashboard" as requested */}
        <div className={`flex items-center justify-between px-3.5 sm:px-6 py-3 sm:py-4 border-b shrink-0 ${
          isClinical ? 'border-purple-100 bg-[#faf9fd]' : 'border-purple-500/20 bg-slate-950/80'
        }`}>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white shadow-md"
              style={{ background: `linear-gradient(135deg, #7c3aed, ${activeAccent})` }}
            >
              <Sliders className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <h2 className={`text-lg sm:text-2xl font-bold tracking-tight ${isClinical ? 'text-slate-900' : 'text-white'}`}>
              Portfolio Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {successMessage && (
              <span className="hidden md:flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 animate-pulse">
                <CheckCircle2 className="w-3.5 h-3.5" /> {successMessage}
              </span>
            )}
            <button
              onClick={onClose}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isClinical ? 'border-purple-100 bg-white hover:bg-[#f3f0f9] text-slate-700 shadow-sm' : 'border-slate-700 hover:bg-slate-800 text-slate-300'
              }`}
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Main Body with Sideways Sidebar Menu & Content Area */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Sideways Menu: Collapsible with icons & names */}
          <aside className={`flex flex-col border-r transition-all duration-300 shrink-0 select-none ${
            isSidebarCollapsed ? 'w-14 sm:w-18' : 'w-48 sm:w-60'
          } ${
            isClinical ? 'border-purple-100 bg-[#faf9fd]' : 'border-purple-500/15 bg-slate-950/70'
          }`}>
            {/* Sidebar Toggle Minimize/Expand Button */}
            <div className="p-2 sm:p-3 border-b flex items-center justify-between border-inherit">
              {!isSidebarCollapsed && (
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-purple-400 font-semibold px-2">
                  Navigation
                </span>
              )}
              <button
                type="button"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                title={isSidebarCollapsed ? 'Expand Menu' : 'Minimize Menu'}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-purple-600/20 transition-colors mx-auto cursor-pointer"
              >
                {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>

            {/* Menu List */}
            <div className="flex-1 overflow-y-auto py-2 px-1.5 sm:px-2 space-y-1 scrollbar-none">
              {menuItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    title={item.label}
                    style={{
                      background: isActive ? `linear-gradient(135deg, #7c3aed, ${activeAccent})` : undefined,
                    }}
                    className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-start'} gap-2.5 sm:gap-3 px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer group ${
                      isActive
                        ? 'text-white shadow-md shadow-purple-600/30 font-semibold'
                        : isClinical
                        ? 'text-slate-700 hover:bg-white hover:text-purple-700 shadow-none hover:shadow-sm'
                        : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                    {!isSidebarCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Save Changes Button at the BOTTOM of Sidebar */}
            <div className="p-2 sm:p-3 border-t border-inherit shrink-0">
              <button
                onClick={handleSaveAll}
                disabled={isSaving}
                title="Save Changes"
                style={{
                  background: isSaving ? undefined : `linear-gradient(135deg, #7c3aed, ${activeAccent})`,
                }}
                className={`w-full flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl font-bold shadow-lg transition-all text-xs cursor-pointer ${
                  isSaving
                    ? 'bg-slate-700 text-slate-300 cursor-not-allowed'
                    : 'text-white hover:scale-[1.02] hover:shadow-purple-600/40'
                }`}
              >
                <Save className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isSaving ? 'animate-spin' : ''}`} />
                {!isSidebarCollapsed && (
                  <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                )}
              </button>
            </div>
          </aside>

          {/* Right Content Panel */}
          <main className={`flex-1 flex flex-col overflow-hidden ${isClinical ? 'bg-[#f8f7fc]' : 'bg-slate-900/40'}`}>
            
            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

              {/* 1. PROFILE TAB */}
              {activeTab === 'profile' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-purple-400" /> Profile Identity & Media
                      </h3>
                      <p className="text-xs text-slate-400">Manage personal identification, profile photo, and downloadable CV.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Full Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={e => setProfile({ ...profile, name: e.target.value })}
                        className="w-full p-3 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Subtitle / Academic Status</label>
                      <input
                        type="text"
                        value={profile.subtitle}
                        onChange={e => setProfile({ ...profile, subtitle: e.target.value })}
                        className="w-full p-3 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Professional Headline</label>
                      <input
                        type="text"
                        value={profile.headline}
                        onChange={e => setProfile({ ...profile, headline: e.target.value })}
                        className="w-full p-3 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      />
                    </div>

                    {/* Uploadable Profile Picture from PC */}
                    <div className="md:col-span-2 p-4 rounded-2xl border border-purple-500/30 bg-slate-950/70 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-xs font-semibold text-purple-400 flex items-center gap-1.5">
                            <ImageIcon className="w-4 h-4" /> Profile Picture (Upload from PC or URL)
                          </label>
                          <p className="text-[11px] text-slate-400">Upload a fresh photo directly from your computer or enter an image link.</p>
                        </div>
                        {profile.photoUrl && (
                          <div className="w-12 h-12 rounded-xl overflow-hidden border border-purple-400 shadow-md">
                            <img src={profile.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="text"
                          value={profile.photoUrl}
                          onChange={e => setProfile({ ...profile, photoUrl: e.target.value })}
                          placeholder="Paste image URL or use PC upload button..."
                          className="flex-1 p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                        />
                        <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold cursor-pointer shrink-0 transition-colors shadow-md">
                          <Upload className="w-4 h-4" /> Upload from PC
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  const base64Str = event.target?.result as string;
                                  setProfile({ ...profile, photoUrl: base64Str });
                                  showSuccess('Profile photo uploaded from PC!');
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Uploadable Latest CV from PC */}
                    <div className="md:col-span-2 p-4 rounded-2xl border border-purple-500/30 bg-slate-950/70 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-xs font-semibold text-purple-400 flex items-center gap-1.5">
                            <FileText className="w-4 h-4" /> Latest CV / Resume (Upload from PC)
                          </label>
                          <p className="text-[11px] text-slate-400">Upload your updated resume (.pdf, .doc, .docx) for instant visitor downloads.</p>
                        </div>
                        {profile.customCvUrl && (
                          <span className="text-xs text-emerald-400 font-mono flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
                            <Check className="w-3.5 h-3.5" /> {profile.customCvName || 'Latest CV Active'}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const base64Str = event.target?.result as string;
                                setProfile({ ...profile, customCvUrl: base64Str, customCvName: file.name });
                                showSuccess(`CV "${file.name}" uploaded successfully from PC!`);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="text-xs text-slate-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
                        />
                        {profile.customCvUrl && (
                          <button
                            type="button"
                            onClick={() => {
                              setProfile({ ...profile, customCvUrl: undefined, customCvName: undefined });
                              showSuccess('Restored default official CV.');
                            }}
                            className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg border border-red-500/30"
                          >
                            Reset to Default CV
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Professional Bio & Career Objective</label>
                      <textarea
                        rows={4}
                        value={profile.summary}
                        onChange={e => setProfile({ ...profile, summary: e.target.value })}
                        className="w-full p-3 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. HEADER TAB */}
              {activeTab === 'header' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="pb-2 border-b border-purple-500/20">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sliders className="w-5 h-5 text-purple-400" /> Hero & Header Presentation
                    </h3>
                    <p className="text-xs text-slate-400">Control the greeting, sub-tagline, and primary hero call-to-actions.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Hero Subtitle Badge</label>
                      <input
                        type="text"
                        value={profile.subtitle}
                        onChange={e => setProfile({ ...profile, subtitle: e.target.value })}
                        className="w-full p-3 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Hero Name Display</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={e => setProfile({ ...profile, name: e.target.value })}
                        className="w-full p-3 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Hero Headline Stream</label>
                      <input
                        type="text"
                        value={profile.headline}
                        onChange={e => setProfile({ ...profile, headline: e.target.value })}
                        className="w-full p-3 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>

                    <div className="md:col-span-2 p-4 rounded-xl bg-purple-950/20 border border-purple-500/20">
                      <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">Call to Action Buttons</h4>
                      <p className="text-xs text-slate-400">
                        Button 1 downloads your active CV. Button 2 scrolls down seamlessly to the Contact section.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. RESEARCH TAB */}
              {activeTab === 'research' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-purple-400" /> Pharmaceutical Research & Presentations
                      </h3>
                      <p className="text-xs text-slate-400">Manage research studies, upload images from your PC, and edit analytical bullet points.</p>
                    </div>
                    <button
                      onClick={() => setResearchProjects([
                        ...researchProjects, 
                        { 
                          id: 'proj-' + Date.now(), 
                          title: 'New Research Investigation', 
                          role: 'Lead Researcher', 
                          status: 'Ongoing', 
                          institution: 'UITS', 
                          description: 'Comprehensive pharmacological study.', 
                          highlights: ['Key analytical finding'], 
                          scientificDetails: 'Pharmacological mechanism and biochemical pathways.', 
                          image: '' 
                        }
                      ])}
                      className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" /> Add Project
                    </button>
                  </div>

                  <div className="space-y-6">
                    {researchProjects.map((proj, index) => (
                      <div key={proj.id || index} className="p-5 rounded-2xl border border-purple-500/30 bg-slate-950/70 space-y-4 relative">
                        <div className="flex items-center justify-between pb-2 border-b border-purple-500/10">
                          <span className="text-xs font-mono font-bold text-purple-400">
                            Project #{index + 1}: {proj.title || 'Untitled Project'}
                          </span>
                          <button
                            onClick={() => setResearchProjects(researchProjects.filter((_, i) => i !== index))}
                            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg cursor-pointer transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold mb-1 text-purple-400">Project Title</label>
                            <input
                              type="text"
                              value={proj.title}
                              onChange={e => {
                                const updated = [...researchProjects];
                                updated[index].title = e.target.value;
                                setResearchProjects(updated);
                              }}
                              className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                            />
                          </div>

                          {/* Research Project Image Upload from PC */}
                          <div className="md:col-span-2 p-3 rounded-xl border border-purple-500/20 bg-slate-900/60 space-y-2">
                            <label className="text-xs font-semibold text-purple-400 flex items-center gap-1.5">
                              <ImageIcon className="w-4 h-4" /> Project Image (Upload from PC or Paste URL)
                            </label>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <input
                                type="text"
                                value={proj.image}
                                onChange={e => {
                                  const updated = [...researchProjects];
                                  updated[index].image = e.target.value;
                                  setResearchProjects(updated);
                                }}
                                placeholder="Paste image link or choose file from PC..."
                                className="flex-1 p-2 rounded-lg border text-xs bg-slate-950 border-slate-700 text-white"
                              />
                              <label className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold cursor-pointer shrink-0">
                                <Upload className="w-3.5 h-3.5" /> Upload from PC
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        const base64Str = event.target?.result as string;
                                        const updated = [...researchProjects];
                                        updated[index].image = base64Str;
                                        setResearchProjects(updated);
                                        showSuccess('Project image uploaded from PC!');
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  className="hidden"
                                />
                              </label>
                            </div>
                            {proj.image && (
                              <div className="mt-2 w-28 h-20 rounded-lg overflow-hidden border border-purple-400/40">
                                <img src={proj.image} alt="Preview" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-semibold mb-1 text-purple-400">Role</label>
                            <input
                              type="text"
                              value={proj.role}
                              onChange={e => {
                                const updated = [...researchProjects];
                                updated[index].role = e.target.value;
                                setResearchProjects(updated);
                              }}
                              className="w-full p-2 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold mb-1 text-purple-400">Status</label>
                            <input
                              type="text"
                              value={proj.status}
                              onChange={e => {
                                const updated = [...researchProjects];
                                updated[index].status = e.target.value;
                                setResearchProjects(updated);
                              }}
                              className="w-full p-2 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold mb-1 text-purple-400">Description</label>
                            <textarea
                              rows={2}
                              value={proj.description}
                              onChange={e => {
                                const updated = [...researchProjects];
                                updated[index].description = e.target.value;
                                setResearchProjects(updated);
                              }}
                              className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold mb-1 text-purple-400">Scientific Context</label>
                            <textarea
                              rows={2}
                              value={proj.scientificDetails || ''}
                              onChange={e => {
                                const updated = [...researchProjects];
                                updated[index].scientificDetails = e.target.value;
                                setResearchProjects(updated);
                              }}
                              className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                            />
                          </div>

                          {/* Bullet points for research */}
                          <div className="md:col-span-2 space-y-2 pt-2 border-t border-purple-500/20">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-semibold text-purple-300">Methodology Bullet Points</label>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...researchProjects];
                                  updated[index].highlights = [...(updated[index].highlights || []), 'New analytical methodology point'];
                                  setResearchProjects(updated);
                                }}
                                className="text-xs px-2.5 py-1 rounded-lg bg-purple-600/80 hover:bg-purple-600 text-white flex items-center gap-1 cursor-pointer"
                              >
                                <Plus className="w-3 h-3" /> Add Bullet Point
                              </button>
                            </div>
                            {(proj.highlights || []).map((hl, hlIdx) => (
                              <div key={hlIdx} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={hl}
                                  onChange={e => {
                                    const updated = [...researchProjects];
                                    const hls = [...(updated[index].highlights || [])];
                                    hls[hlIdx] = e.target.value;
                                    updated[index].highlights = hls;
                                    setResearchProjects(updated);
                                  }}
                                  className="flex-1 p-2 rounded-lg border text-xs bg-slate-900 border-slate-700 text-white"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...researchProjects];
                                    updated[index].highlights = (updated[index].highlights || []).filter((_, i) => i !== hlIdx);
                                    setResearchProjects(updated);
                                  }}
                                  className="p-1.5 text-red-400 hover:bg-red-500/10 rounded"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. SKILLS TAB */}
              {activeTab === 'skills' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="pb-2 border-b border-purple-500/20">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-400" /> Pharmaceutical Knowledge & Skills
                    </h3>
                    <p className="text-xs text-slate-400">Manage pharmaceutical knowledge, professional strengths, and tools & research support.</p>
                  </div>

                  {/* 1. Core Competencies */}
                  <div className="p-5 rounded-2xl border border-purple-500/30 bg-slate-950/70 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-purple-300">Pharmaceutical Knowledge</h4>
                      <button
                        onClick={() => setCoreComps([...coreComps, 'New Competency'])}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {coreComps.map((comp, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={comp}
                            onChange={e => {
                              const updated = [...coreComps];
                              updated[idx] = e.target.value;
                              setCoreComps(updated);
                            }}
                            className="flex-1 p-2 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                          />
                          <button
                            onClick={() => setCoreComps(coreComps.filter((_, i) => i !== idx))}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Soft Skills */}
                  <div className="p-5 rounded-2xl border border-purple-500/30 bg-slate-950/70 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-indigo-300">Professional Strengths</h4>
                      <button
                        onClick={() => setSoftSkills([...softSkills, 'New Soft Skill'])}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {softSkills.map((skill, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={skill}
                            onChange={e => {
                              const updated = [...softSkills];
                              updated[idx] = e.target.value;
                              setSoftSkills(updated);
                            }}
                            className="flex-1 p-2 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                          />
                          <button
                            onClick={() => setSoftSkills(softSkills.filter((_, i) => i !== idx))}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Computer Literacy */}
                  <div className="p-5 rounded-2xl border border-purple-500/30 bg-slate-950/70 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-pink-300">Tools & Research Support</h4>
                      <button
                        onClick={() => setComputerTools([...computerTools, 'New Tool'])}
                        className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-pink-600 text-white hover:bg-pink-700"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {computerTools.map((tool, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={tool}
                            onChange={e => {
                              const updated = [...computerTools];
                              updated[idx] = e.target.value;
                              setComputerTools(updated);
                            }}
                            className="flex-1 p-2 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                          />
                          <button
                            onClick={() => setComputerTools(computerTools.filter((_, i) => i !== idx))}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 5. EXPERIENCE TAB (Work, Entrepreneurial, Certifications, Voluntary, Education) */}
              {activeTab === 'experience' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="pb-2 border-b border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-purple-400" /> Professional Experience & Milestones
                      </h3>
                      <p className="text-xs text-slate-400">Complete control over Work Experience, Entrepreneurial Ventures, and Affiliations with bullet points.</p>
                    </div>
                    <button
                      onClick={handleSaveAll}
                      disabled={isSaving}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 flex items-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer shrink-0 self-start sm:self-auto"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>

                  {/* Sub-tabs for Experience categories */}
                  <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-950/70 border border-purple-500/20">
                    {[
                      { id: 'work', label: `Work Experience (${workExp.length})` },
                      { id: 'ventures', label: `Entrepreneurial (${entExp.length})` },
                      { id: 'voluntary', label: `Affiliations (${affiliations.length})` },
                    ].map(sub => (
                      <button
                        key={sub.id}
                        onClick={() => setExpSubTab(sub.id as any)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          expSubTab === sub.id
                            ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>

                  {/* Work Experience */}
                  {expSubTab === 'work' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-purple-300">Clinical & Work Experience Items</h4>
                        <button
                          onClick={() => setWorkExp([...workExp, { role: 'Clinical Pharmacist Intern', organization: 'Hospital / Pharmacy', period: '2026', location: 'Dhaka', points: ['Executed drug dispensing and patient counseling.'] }])}
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Experience
                        </button>
                      </div>

                      {workExp.map((item, index) => (
                        <div key={index} className="p-4 rounded-2xl border border-purple-500/25 bg-slate-950/70 space-y-3 relative">
                          <button
                            onClick={() => setWorkExp(workExp.filter((_, i) => i !== index))}
                            className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-purple-400">Role Title</label>
                              <input type="text" value={item.role} onChange={e => { const u = [...workExp]; u[index].role = e.target.value; setWorkExp(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-purple-400">Organization</label>
                              <input type="text" value={item.organization} onChange={e => { const u = [...workExp]; u[index].organization = e.target.value; setWorkExp(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-purple-400">Period</label>
                              <input type="text" value={item.period} onChange={e => { const u = [...workExp]; u[index].period = e.target.value; setWorkExp(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-purple-400">Location</label>
                              <input type="text" value={item.location || ''} onChange={e => { const u = [...workExp]; u[index].location = e.target.value; setWorkExp(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                            </div>

                            {/* Bullet points for Work */}
                            <div className="md:col-span-2 space-y-2 pt-2 border-t border-purple-500/15">
                              <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-purple-300">Bullet Points</label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const u = [...workExp];
                                    u[index].points = [...(u[index].points || []), 'New accomplishment point'];
                                    setWorkExp(u);
                                  }}
                                  className="text-xs px-2 py-0.5 rounded bg-purple-600/80 hover:bg-purple-600 text-white flex items-center gap-1"
                                >
                                  <Plus className="w-3 h-3" /> Add Bullet Point
                                </button>
                              </div>
                              {(item.points || []).map((pt, pIdx) => (
                                <div key={pIdx} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={pt}
                                    onChange={e => {
                                      const u = [...workExp];
                                      u[index].points[pIdx] = e.target.value;
                                      setWorkExp(u);
                                    }}
                                    className="flex-1 p-2 rounded-lg border text-xs bg-slate-900 border-slate-700 text-white"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const u = [...workExp];
                                      u[index].points = u[index].points.filter((_, i) => i !== pIdx);
                                      setWorkExp(u);
                                    }}
                                    className="p-1.5 text-red-400 hover:bg-red-500/10 rounded"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Entrepreneurial Ventures */}
                  {expSubTab === 'ventures' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-indigo-300">Entrepreneurial Ventures</h4>
                        <button
                          onClick={() => setEntExp([...entExp, { role: 'Founder & Formulator', organization: 'Cosmetic Venture', period: '2026', location: 'Dhaka', points: ['Engineered skincare cosmetic formulas.'] }])}
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Venture
                        </button>
                      </div>

                      {entExp.map((item, index) => (
                        <div key={index} className="p-4 rounded-2xl border border-indigo-500/25 bg-slate-950/70 space-y-3 relative">
                          <button
                            onClick={() => setEntExp(entExp.filter((_, i) => i !== index))}
                            className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-indigo-400">Role Title</label>
                              <input type="text" value={item.role} onChange={e => { const u = [...entExp]; u[index].role = e.target.value; setEntExp(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-indigo-400">Venture Name</label>
                              <input type="text" value={item.organization} onChange={e => { const u = [...entExp]; u[index].organization = e.target.value; setEntExp(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-indigo-400">Period</label>
                              <input type="text" value={item.period} onChange={e => { const u = [...entExp]; u[index].period = e.target.value; setEntExp(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-indigo-400">Location</label>
                              <input type="text" value={item.location || ''} onChange={e => { const u = [...entExp]; u[index].location = e.target.value; setEntExp(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                            </div>

                            {/* Bullet points for Ventures */}
                            <div className="md:col-span-2 space-y-2 pt-2 border-t border-indigo-500/15">
                              <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-indigo-300">Bullet Points</label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const u = [...entExp];
                                    u[index].points = [...(u[index].points || []), 'New venture milestone'];
                                    setEntExp(u);
                                  }}
                                  className="text-xs px-2 py-0.5 rounded bg-indigo-600/80 hover:bg-indigo-600 text-white flex items-center gap-1"
                                >
                                  <Plus className="w-3 h-3" /> Add Bullet Point
                                </button>
                              </div>
                              {(item.points || []).map((pt, pIdx) => (
                                <div key={pIdx} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={pt}
                                    onChange={e => {
                                      const u = [...entExp];
                                      u[index].points[pIdx] = e.target.value;
                                      setEntExp(u);
                                    }}
                                    className="flex-1 p-2 rounded-lg border text-xs bg-slate-900 border-slate-700 text-white"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const u = [...entExp];
                                      u[index].points = u[index].points.filter((_, i) => i !== pIdx);
                                      setEntExp(u);
                                    }}
                                    className="p-1.5 text-red-400 hover:bg-red-500/10 rounded"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}



                  {/* Affiliations & Voluntary */}
                  {expSubTab === 'voluntary' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-emerald-300">Affiliations & Voluntary Engagements</h4>
                        <button
                          onClick={() => setAffiliations([...affiliations, { role: 'Executive Member', organization: 'Pharmacy Society', period: '2026', location: 'Dhaka', points: ['Organized scientific seminars.'] }])}
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Affiliation
                        </button>
                      </div>

                      {affiliations.map((item, index) => (
                        <div key={index} className="p-4 rounded-2xl border border-emerald-500/25 bg-slate-950/70 space-y-3 relative">
                          <button
                            onClick={() => setAffiliations(affiliations.filter((_, i) => i !== index))}
                            className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-emerald-400">Role Title</label>
                              <input type="text" value={item.role} onChange={e => { const u = [...affiliations]; u[index].role = e.target.value; setAffiliations(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-emerald-400">Organization</label>
                              <input type="text" value={item.organization} onChange={e => { const u = [...affiliations]; u[index].organization = e.target.value; setAffiliations(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-emerald-400">Period</label>
                              <input type="text" value={item.period} onChange={e => { const u = [...affiliations]; u[index].period = e.target.value; setAffiliations(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-emerald-400">Location</label>
                              <input type="text" value={item.location || ''} onChange={e => { const u = [...affiliations]; u[index].location = e.target.value; setAffiliations(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                            </div>

                            {/* Bullet points for Affiliations */}
                            <div className="md:col-span-2 space-y-2 pt-2 border-t border-emerald-500/15">
                              <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-emerald-300">Bullet Points</label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const u = [...affiliations];
                                    u[index].points = [...(u[index].points || []), 'New voluntary contribution'];
                                    setAffiliations(u);
                                  }}
                                  className="text-xs px-2 py-0.5 rounded bg-emerald-600/80 hover:bg-emerald-600 text-white flex items-center gap-1"
                                >
                                  <Plus className="w-3 h-3" /> Add Bullet Point
                                </button>
                              </div>
                              {(item.points || []).map((pt, pIdx) => (
                                <div key={pIdx} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={pt}
                                    onChange={e => {
                                      const u = [...affiliations];
                                      if (!u[index].points) u[index].points = [];
                                      u[index].points[pIdx] = e.target.value;
                                      setAffiliations(u);
                                    }}
                                    className="flex-1 p-2 rounded-lg border text-xs bg-slate-900 border-slate-700 text-white"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const u = [...affiliations];
                                      u[index].points = (u[index].points || []).filter((_, i) => i !== pIdx);
                                      setAffiliations(u);
                                    }}
                                    className="p-1.5 text-red-400 hover:bg-red-500/10 rounded"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

              {/* QUALIFICATION TAB (Education and Certifications) */}
              {activeTab === 'qualification' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="pb-2 border-b border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-purple-400" /> Education, Training & Certifications
                      </h3>
                      <p className="text-xs text-slate-400">
                        Manage academic degree qualifications and professional training courses & certifications.
                      </p>
                    </div>
                    <button
                      onClick={handleSaveAll}
                      disabled={isSaving}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 flex items-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer shrink-0 self-start sm:self-auto"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>

                  {/* Sub-tabs for Qualification: Education & Certifications */}
                  <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-950/70 border border-purple-500/20">
                    <button
                      onClick={() => setQualSubTab('education')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        qualSubTab === 'education'
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <School className="w-3.5 h-3.5" />
                      <span>Education ({education.length})</span>
                    </button>
                    <button
                      onClick={() => setQualSubTab('certs')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        qualSubTab === 'certs'
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Training & Certifications ({certs.length})</span>
                    </button>
                  </div>

                  {/* 1. Education Subtab */}
                  {qualSubTab === 'education' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-purple-300">Academic Education Qualifications</h4>
                        <button
                          onClick={() =>
                            setEducation([
                              ...education,
                              {
                                discipline: 'Degree Name',
                                institution: 'Institution Name',
                                timeline: 'Year',
                                location: 'Dhaka, Bangladesh',
                                result: 'GPA / CGPA',
                                badge: 'Honors',
                                group: 'Faculty / Group',
                              },
                            ])
                          }
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700 cursor-pointer shadow-md"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Degree
                        </button>
                      </div>

                      {education.map((edu, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-2xl border border-purple-500/25 bg-slate-950/70 space-y-3 relative"
                        >
                          <button
                            onClick={() => setEducation(education.filter((_, i) => i !== index))}
                            className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-purple-400">
                                Discipline / Degree
                              </label>
                              <input
                                type="text"
                                value={edu.discipline}
                                onChange={(e) => {
                                  const u = [...education];
                                  u[index].discipline = e.target.value;
                                  setEducation(u);
                                }}
                                className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-purple-400">
                                Institution
                              </label>
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => {
                                  const u = [...education];
                                  u[index].institution = e.target.value;
                                  setEducation(u);
                                }}
                                className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-purple-400">
                                Institution Website URL
                              </label>
                              <input
                                type="text"
                                value={edu.institutionUrl || ''}
                                onChange={(e) => {
                                  const u = [...education];
                                  u[index].institutionUrl = e.target.value;
                                  setEducation(u);
                                }}
                                className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                                placeholder="https://..."
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-purple-400">
                                Timeline / Year
                              </label>
                              <input
                                type="text"
                                value={edu.timeline}
                                onChange={(e) => {
                                  const u = [...education];
                                  u[index].timeline = e.target.value;
                                  setEducation(u);
                                }}
                                className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-purple-400">
                                Location
                              </label>
                              <input
                                type="text"
                                value={edu.location}
                                onChange={(e) => {
                                  const u = [...education];
                                  u[index].location = e.target.value;
                                  setEducation(u);
                                }}
                                className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-purple-400">
                                Result / Grade
                              </label>
                              <input
                                type="text"
                                value={edu.result}
                                onChange={(e) => {
                                  const u = [...education];
                                  u[index].result = e.target.value;
                                  setEducation(u);
                                }}
                                className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-purple-400">
                                Group / Major / Department
                              </label>
                              <input
                                type="text"
                                value={edu.group || ''}
                                onChange={(e) => {
                                  const u = [...education];
                                  u[index].group = e.target.value;
                                  setEducation(u);
                                }}
                                className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 2. Certifications Subtab */}
                  {qualSubTab === 'certs' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-pink-300">
                          Courses & Professional Certifications
                        </h4>
                        <button
                          onClick={() =>
                            setCerts([
                              ...certs,
                              {
                                title: 'New Course Title',
                                issuer: 'Institute / Issuer',
                                year: '2026',
                                location: 'Online',
                                grade: 'Completed',
                                group: 'Professional Training',
                                organizationUrl: 'https://',
                              },
                            ])
                          }
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-pink-600 text-white hover:bg-pink-700 cursor-pointer shadow-md"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Course / Certification
                        </button>
                      </div>

                      {certs.map((item, index) => (
                        <div
                          key={index}
                          className="p-4 rounded-2xl border border-pink-500/25 bg-slate-950/70 space-y-3 relative"
                        >
                          <button
                            onClick={() => setCerts(certs.filter((_, i) => i !== index))}
                            className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-pink-400">
                                Course Name / Title
                              </label>
                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) => {
                                  const u = [...certs];
                                  u[index].title = e.target.value;
                                  setCerts(u);
                                }}
                                className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-pink-400">
                                Institute / Issuer
                              </label>
                              <input
                                type="text"
                                value={item.issuer}
                                onChange={(e) => {
                                  const u = [...certs];
                                  u[index].issuer = e.target.value;
                                  setCerts(u);
                                }}
                                className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-pink-400">
                                Website URL
                              </label>
                              <input
                                type="text"
                                value={item.organizationUrl || ''}
                                onChange={(e) => {
                                  const u = [...certs];
                                  u[index].organizationUrl = e.target.value;
                                  setCerts(u);
                                }}
                                className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                                placeholder="https://..."
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-pink-400">
                                Department / Group
                              </label>
                              <input
                                type="text"
                                value={item.group || ''}
                                onChange={(e) => {
                                  const u = [...certs];
                                  u[index].group = e.target.value;
                                  setCerts(u);
                                }}
                                className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                                placeholder="e.g. Professional Training or Short Course"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-pink-400">
                                Year
                              </label>
                              <input
                                type="text"
                                value={item.year}
                                onChange={(e) => {
                                  const u = [...certs];
                                  u[index].year = e.target.value;
                                  setCerts(u);
                                }}
                                className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-pink-400">
                                Location
                              </label>
                              <input
                                type="text"
                                value={item.location || ''}
                                onChange={(e) => {
                                  const u = [...certs];
                                  u[index].location = e.target.value;
                                  setCerts(u);
                                }}
                                className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                                placeholder="Online"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold mb-1 text-pink-400">
                                Grade / Status
                              </label>
                              <input
                                type="text"
                                value={item.grade || ''}
                                onChange={(e) => {
                                  const u = [...certs];
                                  u[index].grade = e.target.value;
                                  setCerts(u);
                                }}
                                className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                                placeholder="Completed"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 6. LANGUAGE TAB */}
              {activeTab === 'language' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Languages className="w-5 h-5 text-purple-400" /> Language Proficiency
                      </h3>
                      <p className="text-xs text-slate-400">Configure language proficiencies with interactive percentage sliders.</p>
                    </div>
                    <button
                      onClick={() => setLanguages([...languages, { id: 'lang-' + Date.now(), language: 'New Language', level: 'Working Proficiency', percentage: 80, description: 'Academic and scientific communication.' }])}
                      className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" /> Add Language
                    </button>
                  </div>

                  <div className="space-y-4">
                    {languages.map((item, index) => (
                      <div key={item.id || index} className="p-4 rounded-2xl border border-purple-500/30 bg-slate-950/70 space-y-3 relative">
                        <div className="flex items-center justify-between pr-2">
                          <span className="text-xs font-mono font-bold text-purple-400">
                            {item.language || 'Language'} — {item.percentage}%
                          </span>
                          <button
                            onClick={() => setLanguages(languages.filter((_, i) => i !== index))}
                            className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold mb-1 text-purple-400">Language Name</label>
                            <input
                              type="text"
                              value={item.language}
                              onChange={e => {
                                const u = [...languages];
                                u[index].language = e.target.value;
                                setLanguages(u);
                              }}
                              className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold mb-1 text-purple-400">Fluency Level</label>
                            <input
                              type="text"
                              value={item.level}
                              onChange={e => {
                                const u = [...languages];
                                u[index].level = e.target.value;
                                setLanguages(u);
                              }}
                              className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                            />
                          </div>

                          <div className="md:col-span-2 p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-semibold text-purple-300">
                                Proficiency Percentage: <span className="font-mono font-bold text-purple-200">{item.percentage}%</span>
                              </label>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={item.percentage}
                              onChange={e => {
                                const u = [...languages];
                                u[index].percentage = parseInt(e.target.value) || 0;
                                setLanguages(u);
                              }}
                              className="w-full accent-purple-500 cursor-pointer"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold mb-1 text-purple-400">Description</label>
                            <input
                              type="text"
                              value={item.description || ''}
                              onChange={e => {
                                const u = [...languages];
                                u[index].description = e.target.value;
                                setLanguages(u);
                              }}
                              className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. INTERESTS TAB */}
              {activeTab === 'interests' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Heart className="w-5 h-5 text-purple-400" /> Personal Passions & Creative Pursuits
                      </h3>
                      <p className="text-xs text-slate-400">Manage creative interests, hobbies, reflections, and emblem icons.</p>
                    </div>
                    <button
                      onClick={() => setInterests([...interests, { id: 'int-' + Date.now(), title: 'New Interest', category: 'Creative Expression', icon: 'Sparkles', shortDesc: 'Short description.', detailedDesc: 'Detailed exploration and reflection.', keywords: ['Creative', 'Design'] }])}
                      className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" /> Add Interest
                    </button>
                  </div>

                  <div className="space-y-4">
                    {interests.map((interest, index) => (
                      <div key={interest.id || index} className="p-4 rounded-2xl border border-purple-500/30 bg-slate-950/70 space-y-3 relative">
                        <button
                          onClick={() => setInterests(interests.filter((_, i) => i !== index))}
                          className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pr-8">
                          <div>
                            <label className="block text-xs font-semibold mb-1 text-purple-400">Title</label>
                            <input type="text" value={interest.title} onChange={e => { const u = [...interests]; u[index].title = e.target.value; setInterests(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold mb-1 text-purple-400">Category</label>
                            <input type="text" value={interest.category} onChange={e => { const u = [...interests]; u[index].category = e.target.value; setInterests(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold mb-1 text-purple-400">Icon Emblem</label>
                            <select value={interest.icon} onChange={e => { const u = [...interests]; u[index].icon = e.target.value; setInterests(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white">
                              <option value="Compass">Compass (Travel & Adventure)</option>
                              <option value="Tv">Tv (Anime, Dramas & Stories)</option>
                              <option value="Sparkles">Sparkles (Cosmetic Art & Glam)</option>
                              <option value="BookOpen">BookOpen (Journaling & Notes)</option>
                              <option value="Utensils">Utensils (Food & Chemistry)</option>
                              <option value="Heart">Heart (Passion & Care)</option>
                            </select>
                          </div>
                          <div className="md:col-span-3">
                            <label className="block text-xs font-semibold mb-1 text-purple-400">Short Summary</label>
                            <input type="text" value={interest.shortDesc} onChange={e => { const u = [...interests]; u[index].shortDesc = e.target.value; setInterests(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                          </div>
                          <div className="md:col-span-3">
                            <label className="block text-xs font-semibold mb-1 text-purple-400">Detailed Reflection</label>
                            <textarea rows={2} value={interest.detailedDesc} onChange={e => { const u = [...interests]; u[index].detailedDesc = e.target.value; setInterests(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. REFERENCE TAB */}
              {activeTab === 'reference' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-purple-400" /> Academic & Professional References
                      </h3>
                      <p className="text-xs text-slate-400">Manage professors and clinical referee recommendations.</p>
                    </div>
                    <button
                      onClick={() => setReferences([...references, { name: 'Dr. Professor Name', institution: 'University of Information Technology & Sciences', title: 'Head of Department', phone: '+880 ...', email: 'ref@uits.edu.bd' }])}
                      className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" /> Add Reference
                    </button>
                  </div>

                  <div className="space-y-4">
                    {references.map((ref, index) => (
                      <div key={index} className="p-4 rounded-2xl border border-purple-500/30 bg-slate-950/70 space-y-3 relative">
                        <button
                          onClick={() => setReferences(references.filter((_, i) => i !== index))}
                          className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                          <div>
                            <label className="block text-xs font-semibold mb-1 text-purple-400">Referee Name</label>
                            <input type="text" value={ref.name} onChange={e => { const u = [...references]; u[index].name = e.target.value; setReferences(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold mb-1 text-purple-400">Title / Designation</label>
                            <input type="text" value={ref.title} onChange={e => { const u = [...references]; u[index].title = e.target.value; setReferences(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold mb-1 text-purple-400">Institution / Department</label>
                            <input type="text" value={ref.institution} onChange={e => { const u = [...references]; u[index].institution = e.target.value; setReferences(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold mb-1 text-purple-400">Phone</label>
                            <input type="text" value={ref.phone} onChange={e => { const u = [...references]; u[index].phone = e.target.value; setReferences(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-semibold mb-1 text-purple-400">Email Address</label>
                            <input type="email" value={ref.email} onChange={e => { const u = [...references]; u[index].email = e.target.value; setReferences(u); }} className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 9. CONTACT TAB */}
              {activeTab === 'contact' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="pb-2 border-b border-purple-500/20">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Mail className="w-5 h-5 text-purple-400" /> Contact Details & Reach
                    </h3>
                    <p className="text-xs text-slate-400">Configure your direct communication channels and WhatsApp hotline.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Email Address</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={e => setProfile({ ...profile, email: e.target.value })}
                        className="w-full p-3 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Phone Number</label>
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={e => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full p-3 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">WhatsApp Number</label>
                      <input
                        type="text"
                        value={profile.whatsapp}
                        onChange={e => setProfile({ 
                          ...profile, 
                          whatsapp: e.target.value, 
                          whatsappUrl: `https://wa.me/${e.target.value.replace(/[^0-9]/g, '')}` 
                        })}
                        className="w-full p-3 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Physical Location</label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={e => setProfile({ ...profile, location: e.target.value })}
                        className="w-full p-3 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Google Map Query</label>
                      <input
                        type="text"
                        value={profile.mapQuery || ''}
                        onChange={e => setProfile({ ...profile, mapQuery: e.target.value })}
                        className="w-full p-3 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 10. FOOTER TAB (Social Media Links) */}
              {activeTab === 'footer' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                    <div>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-purple-400" /> Footer & Social Media Channels
                      </h3>
                      <p className="text-xs text-slate-400">Edit existing links and add new custom social media platforms to the footer.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const current = profile.customSocialLinks || [];
                        setProfile({
                          ...profile,
                          customSocialLinks: [...current, { id: 'soc-' + Date.now(), platform: 'New Channel', url: 'https://' }]
                        });
                      }}
                      className="flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" /> Add Social Link
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">LinkedIn Profile URL</label>
                      <input
                        type="text"
                        value={profile.linkedinUrl}
                        onChange={e => setProfile({ ...profile, linkedinUrl: e.target.value })}
                        className="w-full p-2.5 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Facebook URL</label>
                      <input
                        type="text"
                        value={profile.facebookUrl}
                        onChange={e => setProfile({ ...profile, facebookUrl: e.target.value })}
                        className="w-full p-2.5 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Instagram URL</label>
                      <input
                        type="text"
                        value={profile.instagramUrl}
                        onChange={e => setProfile({ ...profile, instagramUrl: e.target.value })}
                        className="w-full p-2.5 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Google Blogger / Blog URL</label>
                      <input
                        type="text"
                        value={profile.bloggerUrl || ''}
                        onChange={e => setProfile({ ...profile, bloggerUrl: e.target.value })}
                        className="w-full p-2.5 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>

                    {/* Custom Social Channels */}
                    <div className="md:col-span-2 pt-4 border-t border-purple-500/20 space-y-3">
                      <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                        Additional Custom Social Media Channels
                      </h4>
                      <div className="space-y-2">
                        {(profile.customSocialLinks || []).map((link, sIdx) => (
                          <div key={link.id || sIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="Platform (e.g. YouTube, GitHub, Medium)"
                              value={link.platform}
                              onChange={e => {
                                const u = [...(profile.customSocialLinks || [])];
                                u[sIdx] = { ...u[sIdx], platform: e.target.value };
                                setProfile({ ...profile, customSocialLinks: u });
                              }}
                              className="w-1/3 p-2.5 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                            />
                            <input
                              type="text"
                              placeholder="URL (https://...)"
                              value={link.url}
                              onChange={e => {
                                const u = [...(profile.customSocialLinks || [])];
                                u[sIdx] = { ...u[sIdx], url: e.target.value };
                                setProfile({ ...profile, customSocialLinks: u });
                              }}
                              className="flex-1 p-2.5 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const u = (profile.customSocialLinks || []).filter((_, i) => i !== sIdx);
                                setProfile({ ...profile, customSocialLinks: u });
                              }}
                              className="p-2.5 rounded-xl text-red-500 hover:bg-red-500/10 border border-red-500/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 11. SECTIONS TAB */}
              {activeTab === 'sections' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="pb-2 border-b border-purple-500/20">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Type className="w-5 h-5 text-purple-400" /> Section Titles & Headings
                    </h3>
                    <p className="text-xs text-slate-400">Customize the headings that appear above each section on your portfolio.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Research Section Title</label>
                      <input
                        type="text"
                        value={sectionTitles.research}
                        onChange={e => setSectionTitles({ ...sectionTitles, research: e.target.value })}
                        className="w-full p-2.5 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Skills Section Title</label>
                      <input
                        type="text"
                        value={sectionTitles.skills}
                        onChange={e => setSectionTitles({ ...sectionTitles, skills: e.target.value })}
                        className="w-full p-2.5 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Experience Section Title</label>
                      <input
                        type="text"
                        value={sectionTitles.experience}
                        onChange={e => setSectionTitles({ ...sectionTitles, experience: e.target.value })}
                        className="w-full p-2.5 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Education Section Title</label>
                      <input
                        type="text"
                        value={sectionTitles.education}
                        onChange={e => setSectionTitles({ ...sectionTitles, education: e.target.value })}
                        className="w-full p-2.5 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Languages Section Title</label>
                      <input
                        type="text"
                        value={sectionTitles.languages || ''}
                        onChange={e => setSectionTitles({ ...sectionTitles, languages: e.target.value })}
                        className="w-full p-2.5 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Interests Section Title</label>
                      <input
                        type="text"
                        value={sectionTitles.about}
                        onChange={e => setSectionTitles({ ...sectionTitles, about: e.target.value })}
                        className="w-full p-2.5 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">References Section Title</label>
                      <input
                        type="text"
                        value={sectionTitles.references || ''}
                        onChange={e => setSectionTitles({ ...sectionTitles, references: e.target.value })}
                        className="w-full p-2.5 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Contact Section Title</label>
                      <input
                        type="text"
                        value={sectionTitles.contact || ''}
                        onChange={e => setSectionTitles({ ...sectionTitles, contact: e.target.value })}
                        className="w-full p-2.5 rounded-xl border text-sm bg-slate-950 border-slate-700 text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 12. METADATA & BRAND ACCENT TAB */}
              {activeTab === 'metadata' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="pb-2 border-b border-purple-500/20">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Globe className="w-5 h-5 text-purple-400" /> Page Metadata & Lavender Accent
                    </h3>
                    <p className="text-xs text-slate-400">
                      Configure search engine optimization (SEO), live browser tab title, favicon, and secondary lavender color accent.
                    </p>
                  </div>

                  {/* 1. Live Google Search & Social Preview Card */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-purple-500/30 bg-slate-950/80 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-purple-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Google Search Live Preview
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Live Connected
                      </span>
                    </div>

                    <div className="p-3.5 rounded-xl border border-purple-500/20 bg-slate-900/90 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <div className="w-4 h-4 rounded-full bg-purple-500/20 flex items-center justify-center overflow-hidden border border-purple-400/40">
                          {metaData.faviconUrl ? (
                            <img src={metaData.faviconUrl} className="w-full h-full object-cover" alt="Favicon" />
                          ) : (
                            <Globe className="w-3 h-3 text-purple-300" />
                          )}
                        </div>
                        <span className="text-slate-300 text-[11px] font-mono truncate">https://lubna-akter-portfolio.netlify.app</span>
                      </div>
                      <h4 className="text-sm sm:text-base text-blue-400 font-semibold hover:underline cursor-pointer truncate">
                        {metaData.title || 'Lubna Akter Portfolio'}
                      </h4>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {metaData.description || 'Official portfolio of Lubna Akter — Pharmacy Student, Pharmaceutical Researcher, and Clinical Science Scholar.'}
                      </p>
                    </div>
                  </div>

                  {/* 2. SEO & Live Page Head Settings */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-purple-500/30 bg-slate-950/70 space-y-4">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <Globe className="w-4 h-4 text-purple-400" /> Search Engine Optimization (SEO) & Title
                    </h4>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Website Tab Title (&lt;title&gt;)</label>
                      <input
                        type="text"
                        value={metaData.title}
                        onChange={e => setMetaData({ ...metaData, title: e.target.value })}
                        placeholder="Lubna Akter Portfolio"
                        className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">Website Meta Description</label>
                      <textarea
                        rows={3}
                        value={metaData.description}
                        onChange={e => setMetaData({ ...metaData, description: e.target.value })}
                        placeholder="Official portfolio of Lubna Akter..."
                        className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white focus:border-purple-500 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">SEO Keywords (Comma Separated)</label>
                      <input
                        type="text"
                        value={metaData.keywords}
                        onChange={e => setMetaData({ ...metaData, keywords: e.target.value })}
                        placeholder="Lubna Akter, Clinical Pharmacy, Pharmacology, Drug Design, Medical Writing"
                        className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-purple-400">OpenGraph (OG) Social Title</label>
                      <input
                        type="text"
                        value={metaData.ogTitle || ''}
                        onChange={e => setMetaData({ ...metaData, ogTitle: e.target.value })}
                        placeholder="Lubna Akter Portfolio"
                        className="w-full p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {/* 3. Browser Favicon Upload & Customization */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-purple-500/30 bg-slate-950/70 space-y-4">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-purple-400" /> Website Favicon (.ico, .png, .svg)
                    </h4>
                    <p className="text-xs text-slate-400">
                      Upload your custom favicon from your PC or provide an image URL. Updates the browser tab icon in real-time.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Favicon Preview */}
                      <div className="w-16 h-16 rounded-2xl border border-purple-400/40 bg-slate-900 flex items-center justify-center overflow-hidden shrink-0 shadow-lg shadow-purple-900/20">
                        {metaData.faviconUrl ? (
                          <img src={metaData.faviconUrl} alt="Favicon Preview" className="w-10 h-10 object-contain" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 flex items-center justify-center text-white">
                            <Sparkles className="w-5 h-5" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-2 w-full">
                        <input
                          type="text"
                          value={metaData.faviconUrl || ''}
                          onChange={e => setMetaData({ ...metaData, faviconUrl: e.target.value })}
                          placeholder="Paste image URL or upload below..."
                          className="w-full p-2.5 rounded-xl border text-xs sm:text-sm bg-slate-900 border-slate-700 text-white"
                        />

                        <div className="flex flex-wrap gap-2">
                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold cursor-pointer shadow-md">
                            <Upload className="w-3.5 h-3.5" /> Upload Favicon from PC
                            <input
                              type="file"
                              accept="image/*,.ico,.svg,.png"
                              className="hidden"
                              onChange={e => {
                                if (e.target.files && e.target.files[0]) {
                                  const reader = new FileReader();
                                  reader.onload = ev => {
                                    if (ev.target?.result) {
                                      const url = ev.target.result as string;
                                      setMetaData({ ...metaData, faviconUrl: url });
                                      showSuccess('Favicon uploaded successfully!');
                                    }
                                  };
                                  reader.readAsDataURL(e.target.files[0]);
                                }
                              }}
                            />
                          </label>

                          <button
                            type="button"
                            onClick={() => {
                              setMetaData({ ...metaData, faviconUrl: '' });
                              showSuccess('Favicon restored to default.');
                            }}
                            className="px-3 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-medium cursor-pointer"
                          >
                            Reset Default
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4. Secondary Color Accent (Shades of Lavender) */}
                  <div className="p-4 sm:p-5 rounded-2xl border border-purple-500/30 bg-slate-950/70 space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                        <Palette className="w-4 h-4 text-purple-400" /> Secondary Color Accent (Shades of Lavender)
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-purple-300">Active:</span>
                        <span
                          className="px-2 py-0.5 rounded-md text-xs font-mono font-bold text-white shadow-sm"
                          style={{ backgroundColor: secondaryAccent }}
                        >
                          {secondaryAccent}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">
                      Choose any shade from the lavender spectrum or enter a custom hex. The primary layout remains balanced while highlights, active indicators, and glowing effects across the portfolio and dashboard update immediately.
                    </p>

                    {/* Curated Palette of Lavender Shades */}
                    <div className="grid grid-cols-2 xs:grid-cols-4 gap-2.5">
                      {[
                        { name: 'Soft Lavender', hex: '#d8b4fe' },
                        { name: 'Classic Lavender', hex: '#c084fc' },
                        { name: 'Amethyst Lavender', hex: '#a855f7' },
                        { name: 'Royal Violet', hex: '#8b5cf6' },
                        { name: 'Lavender Mist', hex: '#e9d5ff' },
                        { name: 'Electric Lavender', hex: '#b794f4' },
                        { name: 'Dusty Lavender', hex: '#9f7aea' },
                        { name: 'Vibrant Orchid', hex: '#c026d3' },
                      ].map(shade => {
                        const isSelected = secondaryAccent.toLowerCase() === shade.hex.toLowerCase();
                        return (
                          <button
                            key={shade.hex}
                            type="button"
                            onClick={() => {
                              setSecondaryAccent(shade.hex);
                              updateSecondaryAccent(shade.hex);
                              showSuccess(`Color accent set to ${shade.name}!`);
                            }}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 group ${
                              isSelected
                                ? 'border-white bg-slate-900 shadow-lg scale-102 ring-2 ring-white/50'
                                : 'border-slate-800 bg-slate-900/60 hover:border-purple-500/50 hover:bg-slate-900'
                            }`}
                          >
                            <span
                              className="w-5 h-5 rounded-lg shrink-0 shadow-sm transition-transform group-hover:scale-110"
                              style={{ backgroundColor: shade.hex }}
                            />
                            <div className="min-w-0">
                              <span className="block text-xs font-semibold text-white truncate">{shade.name}</span>
                              <span className="block text-[10px] font-mono text-slate-400">{shade.hex}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom Hex Color Picker & Code Input */}
                    <div className="pt-3 border-t border-purple-500/20 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <label className="text-xs font-semibold text-purple-300">Custom Color & Code:</label>
                        <input
                          type="color"
                          value={secondaryAccent}
                          onChange={e => {
                            setSecondaryAccent(e.target.value);
                            updateSecondaryAccent(e.target.value);
                          }}
                          className="w-9 h-9 rounded-lg border border-slate-700 cursor-pointer bg-transparent"
                        />
                        <input
                          type="text"
                          value={secondaryAccent}
                          onChange={e => {
                            const val = e.target.value;
                            setSecondaryAccent(val);
                            if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
                              updateSecondaryAccent(val);
                            }
                          }}
                          placeholder="#c084fc"
                          className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-white w-28 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSecondaryAccent('#c084fc');
                          updateSecondaryAccent('#c084fc');
                          showSuccess('Secondary accent reset to signature lavender (#c084fc).');
                        }}
                        className="px-3 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs font-medium cursor-pointer"
                      >
                        Reset to Classic Lavender
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 13. SETTINGS TAB */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-4xl mx-auto">
                  <div className="pb-2 border-b border-purple-500/20">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Settings className="w-5 h-5 text-purple-400" /> System Settings & Operations
                    </h3>
                    <p className="text-xs text-slate-400">Traffic analytics, password protection, data backups, and recovery.</p>
                  </div>

                  {/* 1. Traffic Trends */}
                  <div className="p-5 rounded-2xl border border-purple-500/30 bg-slate-950/70 space-y-3">
                    <TrafficChart />
                  </div>

                  {/* 2. Password Security */}
                  <div className="p-5 rounded-2xl border border-purple-500/30 bg-slate-950/70 space-y-3">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-400" /> Admin Access Password
                    </h4>
                    <p className="text-xs text-slate-400">Set a custom password to protect your Portfolio Dashboard from unauthorized edits.</p>
                    <div className="flex gap-2 max-w-md">
                      <input
                        type="password"
                        value={newAdminPwd}
                        onChange={e => setNewAdminPwd(e.target.value)}
                        placeholder="Enter new password (min. 4 characters)..."
                        className="flex-1 p-2.5 rounded-xl border text-sm bg-slate-900 border-slate-700 text-white"
                      />
                      <button
                        onClick={() => {
                          if (newAdminPwd.trim().length >= 4) {
                            localStorage.setItem('lubna_admin_pwd', newAdminPwd.trim());
                            setNewAdminPwd('');
                            showSuccess('Admin password updated successfully!');
                          } else {
                            alert('Password must be at least 4 characters long.');
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold cursor-pointer"
                      >
                        Update
                      </button>
                    </div>
                  </div>

                  {/* 3. Export / Import Backup */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl border border-purple-500/30 bg-slate-950/70 space-y-2">
                      <h4 className="text-sm font-semibold text-white">Export Backup (JSON)</h4>
                      <p className="text-xs text-slate-400">Download your entire portfolio content, uploaded pictures, and CV as a backup file.</p>
                      <button
                        onClick={handleExportJSON}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold cursor-pointer shadow-md mt-2"
                      >
                        <Download className="w-4 h-4" /> Download Backup
                      </button>
                    </div>

                    <div className="p-5 rounded-2xl border border-purple-500/30 bg-slate-950/70 space-y-2">
                      <h4 className="text-sm font-semibold text-white">Restore Backup (JSON)</h4>
                      <p className="text-xs text-slate-400">Restore your portfolio data from a previously downloaded backup JSON file.</p>
                      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer shadow-md mt-2">
                        <Upload className="w-4 h-4" /> Choose Backup File
                        <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {/* 4. Reset to Default */}
                  <div className="p-5 rounded-2xl border border-red-500/30 bg-red-950/15 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-red-400">Reset to Default Content</h4>
                      <p className="text-xs text-slate-400">Restore the original official profile data and research publications.</p>
                    </div>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to restore official default content? Any custom local edits will be reset.')) {
                          resetToDefault();
                          localStorage.removeItem('lubna_admin_pwd');
                          setProfile(PORTFOLIO_DATA.profile);
                          setCoreComps([...PORTFOLIO_DATA.coreCompetencies]);
                          setSoftSkills([...PORTFOLIO_DATA.softSkills]);
                          setComputerTools([...PORTFOLIO_DATA.computerLiteracy]);
                          setEducation([...PORTFOLIO_DATA.education]);
                          setResearchProjects([...PORTFOLIO_DATA.researchProjects]);
                          setWorkExp([...PORTFOLIO_DATA.workExperience]);
                          setEntExp([...PORTFOLIO_DATA.entrepreneurialExperience]);
                          setPersonalDetails({ ...PORTFOLIO_DATA.personalDetails });
                          setInterests([...PORTFOLIO_DATA.personalInterests]);
                          setReferences([...PORTFOLIO_DATA.references]);
                          setCerts([...PORTFOLIO_DATA.certifications]);
                          showSuccess('Portfolio restored to official default!');
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" /> Reset Default
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Status & Quick Save Footer Bar */}
            <div className={`px-6 py-3 border-t flex items-center justify-end shrink-0 ${
              isClinical ? 'border-purple-100 bg-[#faf9fd]' : 'border-purple-500/20 bg-slate-950/90'
            }`}>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveAll}
                  disabled={isSaving}
                  style={{
                    background: isSaving ? undefined : `linear-gradient(135deg, #7c3aed, ${activeAccent})`,
                  }}
                  className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
                    isSaving
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      : 'text-white hover:scale-[1.02]'
                  }`}
                >
                  <Save className={`w-3.5 h-3.5 ${isSaving ? 'animate-spin' : ''}`} />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={onClose}
                  className={`px-4 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    isClinical ? 'border-purple-200 bg-white hover:bg-[#f3f0f9] text-slate-700 shadow-sm' : 'border-slate-700 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  Close
                </button>
              </div>
            </div>

          </main>
        </div>

      </div>
    </div>
  );
};
