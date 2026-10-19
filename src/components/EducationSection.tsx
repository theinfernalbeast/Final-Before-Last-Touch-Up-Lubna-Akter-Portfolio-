import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import {
  GraduationCap,
  School,
  ExternalLink,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

type EducationTab = 'qualifications' | 'academic' | 'training';

export const EducationSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EducationTab>('qualifications');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  const { data } = usePortfolio();
  const { isClinical } = useTheme();

  const handleCardClick = (idx: number) => {
    // When tapped, stays still and pinned open until another click on the box
    setPinnedIndex(prev => (prev === idx ? null : idx));
  };

  const parseYear = (timelineStr: string): number => {
    const matches = (timelineStr || '').match(/\b(19\d{2}|20\d{2})\b/g);
    if (!matches || matches.length === 0) return 0;
    return Math.max(...matches.map(Number));
  };

  const academicItems = data.education
    .map((item) => ({
      id: `acad-${item.discipline}`,
      type: 'academic' as const,
      discipline: item.discipline,
      institution: item.institution,
      institutionUrl: item.institutionUrl,
      timeline: item.timeline,
      location: item.location || 'Dhaka, Bangladesh',
      result: item.result,
      group: item.group || (
        item.discipline.includes('HSC') || item.discipline.includes('SSC')
          ? 'Science Group'
          : item.discipline.includes('B. Pharm')
          ? 'Faculty of Pharmacy'
          : 'General Studies'
      ),
    }))
    .sort((a, b) => parseYear(b.timeline) - parseYear(a.timeline));

  const trainingItems = data.certifications
    .map((cert) => ({
      id: `cert-${cert.title}`,
      type: 'training' as const,
      discipline: cert.title,
      institution: cert.issuer,
      institutionUrl: cert.organizationUrl,
      timeline: cert.year,
      location: cert.location || 'Online',
      result: cert.grade || 'Completed',
      group: (cert.group || (cert.title.includes('Drug') ? 'Professional Training' : 'Short Course')).replace(/ProfessionalTraining/gi, 'Professional Training').trim(),
    }))
    .sort((a, b) => parseYear(b.timeline) - parseYear(a.timeline));

  const allSortedItems = [...academicItems, ...trainingItems].sort(
    (a, b) => parseYear(b.timeline) - parseYear(a.timeline)
  );

  const displayedItems =
    activeTab === 'academic'
      ? academicItems
      : activeTab === 'training'
      ? trainingItems
      : allSortedItems;

  return (
    <section id="education" className="py-14 sm:py-20 border-t border-purple-500/20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-10 text-center px-2"
        >
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono mb-2 shadow-sm ${
            isClinical
              ? 'bg-purple-50 border border-purple-200 text-purple-700'
              : 'bg-purple-500/10 border border-purple-400/30 text-purple-300'
          }`}>
            <GraduationCap className={`w-3.5 h-3.5 ${isClinical ? 'text-purple-600' : 'text-purple-400'}`} />
            <span>{t.education.tag || 'Qualifications'}</span>
          </div>
          <h2 className={`text-xl sm:text-3xl font-bold tracking-tight ${isClinical ? 'text-slate-900' : 'text-white'}`}>
            {data.sectionTitles?.education || t.education.title || 'Education, Training & Certifications'}
          </h2>
          <p className={`text-xs sm:text-sm mt-1 max-w-xl mx-auto leading-relaxed ${isClinical ? 'text-slate-600' : 'text-purple-200/70'}`}>
            {t.education.subtitle}
          </p>
        </motion.div>

        {/* Tab Selection: Qualifications | Academic | Training & Certifications (Icon-only on mobile, centrally aligned) */}
        <div className="flex justify-center mb-8 px-2">
          <div className={`flex items-center justify-center p-1.5 rounded-2xl shadow-lg max-w-full gap-1.5 sm:gap-2 ${
            isClinical
              ? 'bg-white/95 border border-purple-200 shadow-slate-200/50'
              : 'bg-slate-900/90 border border-purple-500/20'
          }`}>
            <button
              onClick={() => {
                setActiveTab('qualifications');
                setPinnedIndex(null);
                setHoveredIndex(null);
              }}
              title={t.education.tabQualifications || 'Qualifications'}
              aria-label={t.education.tabQualifications || 'Qualifications'}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'qualifications'
                  ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30'
                  : isClinical
                  ? 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/80'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <GraduationCap className={`w-4 h-4 shrink-0 transition-all duration-300 ${activeTab === 'qualifications' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : isClinical ? 'text-purple-600' : 'text-purple-300'}`} />
              <span className="hidden sm:inline">{t.education.tabQualifications || 'Qualifications'}</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('academic');
                setPinnedIndex(null);
                setHoveredIndex(null);
              }}
              title={t.education.tabAcademic || 'Academic'}
              aria-label={t.education.tabAcademic || 'Academic'}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'academic'
                  ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30'
                  : isClinical
                  ? 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/80'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <School className={`w-4 h-4 shrink-0 transition-all duration-300 ${activeTab === 'academic' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : isClinical ? 'text-indigo-600' : 'text-indigo-300'}`} />
              <span className="hidden sm:inline">{t.education.tabAcademic || 'Academic'}</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('training');
                setPinnedIndex(null);
                setHoveredIndex(null);
              }}
              title={t.education.tabTraining || 'Training & Certifications'}
              aria-label={t.education.tabTraining || 'Training & Certifications'}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'training'
                  ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30'
                  : isClinical
                  ? 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/80'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Award className={`w-4 h-4 shrink-0 transition-all duration-300 ${activeTab === 'training' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : isClinical ? 'text-amber-600' : 'text-amber-300'}`} />
              <span className="hidden sm:inline">{t.education.tabTraining || 'Training & Certifications'}</span>
            </button>
          </div>
        </div>

        {/* Education & Certification List - Clean Bar Matching References Section */}
        <div className="space-y-3.5">
          {displayedItems.map((item, idx) => {
            const isExpanded = pinnedIndex === idx || hoveredIndex === idx;

            const institutionName = item.institution || '';
            const instituteLink =
              item.institutionUrl ||
              `https://www.google.com/search?q=${encodeURIComponent(institutionName)}`;

            const displayTimeline = item.timeline || '';
            const displayLocation = item.location || 'Dhaka, Bangladesh';
            const displayGroup = (item.group || '').replace(/ProfessionalTraining/gi, 'Professional Training').trim();

            return (
              <motion.div
                key={`${item.id}-${idx}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleCardClick(idx)}
                className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md ${
                  isExpanded
                    ? isClinical
                      ? 'bg-white border-purple-400 shadow-xl shadow-purple-950/5 ring-1 ring-purple-300'
                      : 'bg-slate-900 border-purple-400 shadow-xl shadow-purple-500/20 lavender-glow ring-1 ring-purple-400/30'
                    : isClinical
                    ? 'bg-white/95 border-purple-100 hover:border-purple-300 shadow-sm hover:shadow-md hover:bg-white'
                    : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/40 shadow-sm hover:bg-slate-900/80'
                }`}
              >
                {/* Bar Header: On mobile, icon on top of qualification name centrally aligned, arrow hidden. On desktop, icon on left and arrow on right */}
                <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-3">
                  <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-3.5 text-center sm:text-left w-full sm:w-auto">
                    <div
                      className={`w-10 sm:w-11 h-10 sm:h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isExpanded
                          ? 'bg-purple-600 border-purple-300 text-white shadow-md shadow-purple-600/30 scale-105'
                          : isClinical
                          ? 'bg-purple-50 border-purple-200 text-purple-700'
                          : 'bg-purple-950/60 border-purple-500/30 text-purple-300'
                      }`}
                    >
                      {item.type === 'training' ? (
                        <Award className={`w-5 h-5 ${isExpanded ? 'text-amber-200' : isClinical ? 'text-amber-600' : 'text-amber-300'}`} />
                      ) : (
                        <GraduationCap className={`w-5 h-5 ${isExpanded ? 'text-white' : isClinical ? 'text-purple-600' : 'text-purple-300'}`} />
                      )}
                    </div>
                    <div>
                      <h3 className={`font-bold text-base sm:text-lg leading-snug tracking-wide text-center sm:text-left ${
                        isClinical ? 'text-slate-900' : 'text-white'
                      }`}>
                        {item.discipline}
                      </h3>
                    </div>
                  </div>

                  {/* Arrow: Hidden on mobile (< 640px), cleanly visible on desktop */}
                  <div className="hidden sm:flex items-center justify-center shrink-0">
                    <span
                      className={`text-[11px] font-mono p-1 rounded-md transition-colors ${
                        isExpanded
                          ? isClinical ? 'text-purple-700' : 'text-purple-300'
                          : 'text-slate-400'
                      }`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isExpanded
                            ? isClinical ? 'rotate-180 text-purple-700' : 'rotate-180 text-purple-300'
                            : ''
                        }`}
                      />
                    </span>
                  </div>
                </div>

                {/* Dropdown Content on Hover / Tap: Clean 2 Columns & 2 Rows, No Boxy Clutter */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`mt-4 pt-4 border-t ${isClinical ? 'border-purple-100' : 'border-purple-500/20'}`}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 text-xs sm:text-sm">
                        {/* Row 1, Col 1: Institute */}
                        <div className={`flex items-center justify-center sm:justify-start gap-2.5 min-w-0 text-center sm:text-left ${
                          isClinical ? 'text-slate-700' : 'text-slate-200'
                        }`}>
                          <School className={`w-4 h-4 shrink-0 ${isClinical ? 'text-purple-600' : 'text-purple-400'}`} />
                          <a
                            href={instituteLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`font-medium inline-flex items-center gap-1.5 transition-colors group/link truncate ${
                              isClinical ? 'text-slate-900 hover:text-purple-700' : 'text-white hover:text-purple-300'
                            }`}
                          >
                            <span className="truncate">{institutionName}</span>
                            <ExternalLink className={`w-3 h-3 opacity-60 group-hover/link:opacity-100 transition-opacity shrink-0 ${
                              isClinical ? 'text-purple-600' : 'text-purple-400'
                            }`} />
                          </a>
                        </div>

                        {/* Row 1, Col 2: Department / Group / Field */}
                        <div className={`flex items-center justify-center sm:justify-start gap-2.5 min-w-0 text-center sm:text-left ${
                          isClinical ? 'text-slate-700' : 'text-slate-200'
                        }`}>
                          <BookOpen className={`w-4 h-4 shrink-0 ${isClinical ? 'text-indigo-600' : 'text-indigo-400'}`} />
                          <span className={`font-medium truncate ${isClinical ? 'text-purple-700' : 'text-purple-200'}`}>
                            {displayGroup}
                          </span>
                        </div>

                        {/* Row 2, Col 1: Timeline & Location (Locked icon alignment to prevent mobile wrap issues) */}
                        <div className={`flex flex-wrap xs:flex-nowrap items-center justify-center sm:justify-start gap-x-2.5 gap-y-1 min-w-0 text-center sm:text-left ${
                          isClinical ? 'text-slate-600' : 'text-slate-300'
                        }`}>
                          <div className="inline-flex items-center gap-1.5 shrink-0">
                            <Calendar className={`w-4 h-4 shrink-0 ${isClinical ? 'text-purple-600' : 'text-purple-400'}`} />
                            <span className={`font-mono font-semibold whitespace-nowrap ${isClinical ? 'text-slate-800' : 'text-slate-200'}`}>{displayTimeline}</span>
                          </div>
                          <span className={`shrink-0 ${isClinical ? 'text-purple-300' : 'text-purple-500/40'}`}>•</span>
                          <div className="inline-flex items-center gap-1.5 shrink-0">
                            <MapPin className={`w-3.5 h-3.5 shrink-0 ${isClinical ? 'text-pink-600' : 'text-pink-400'}`} />
                            <span className={`whitespace-nowrap ${isClinical ? 'text-slate-600' : 'text-slate-300'}`}>{displayLocation}</span>
                          </div>
                        </div>

                        {/* Row 2, Col 2: Grade / Credential */}
                        <div className="flex items-center justify-center sm:justify-start gap-2.5">
                          <Award className={`w-4 h-4 shrink-0 ${isClinical ? 'text-amber-600' : 'text-amber-400'}`} />
                          <span className={`font-mono font-bold px-2.5 py-0.5 rounded-md shadow-sm border ${
                            isClinical
                              ? 'text-purple-700 bg-purple-50 border-purple-200'
                              : 'text-purple-200 bg-purple-500/15 border-purple-400/30'
                          }`}>
                            {item.result}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
