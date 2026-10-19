import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { FlaskConical, Sparkles, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export const ResearchSection: React.FC = () => {
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const { t } = useLanguage();
  const { data } = usePortfolio();
  const { isClinical } = useTheme();

  const currentProject = data.researchProjects[activeTabIdx] || data.researchProjects[0];

  const highlightsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const highlightItemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="research" className="py-14 sm:py-16 border-t border-purple-500/20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Concise & Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 sm:mb-8 text-center px-2"
        >
          <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono mb-2 shadow-sm ${
            isClinical
              ? 'bg-purple-50 border border-purple-200 text-purple-700'
              : 'bg-purple-500/10 border border-purple-400/30 text-purple-300'
          }`}>
            <FlaskConical className={`w-3 sm:w-3.5 h-3 sm:h-3.5 ${isClinical ? 'text-purple-600' : 'text-purple-400'}`} />
            <span>{t.research.tag}</span>
          </div>
          <h2 className={`text-xl sm:text-3xl font-bold tracking-tight text-center ${
            isClinical ? 'text-slate-900' : 'text-white'
          }`}>
            {data.sectionTitles?.research || t.research.title}
          </h2>
          <p className={`text-xs sm:text-sm mt-1 max-w-xl mx-auto text-center leading-relaxed ${
            isClinical ? 'text-slate-600' : 'text-purple-200/70'
          }`}>
            {t.research.subtitle}
          </p>
        </motion.div>

        {/* Tab Buttons Navigation - Compact */}
        <div className="flex justify-center mb-6">
          <div className={`inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-2xl shadow-lg max-w-full ${
            isClinical
              ? 'bg-white/95 border border-purple-200 shadow-slate-200/50'
              : 'bg-slate-900/90 border border-purple-500/30'
          }`}>
            {data.researchProjects.map((proj, idx) => {
              const isActive = activeTabIdx === idx;
              const shortTitle = proj.title.split('(')[0].trim();
              return (
                <button
                  key={proj.id}
                  onClick={() => setActiveTabIdx(idx)}
                  title={proj.title}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] sm:text-xs font-medium rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30'
                      : isClinical
                      ? 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/80'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <FlaskConical className={`w-3.5 h-3.5 shrink-0 transition-all duration-300 ${
                    isActive
                      ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                      : isClinical
                      ? 'text-purple-600'
                      : 'text-purple-300'
                  }`} />
                  <span className="hidden sm:inline truncate max-w-[130px] sm:max-w-[170px]">{shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Tab Research Card Display - Instant smooth transition */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`rounded-2xl p-5 sm:p-7 shadow-xl space-y-4 transition-all duration-300 hover:scale-[1.01] transform-gpu ${
              isClinical
                ? 'bg-white border border-purple-200 shadow-slate-200/60 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-950/5'
                : 'bg-slate-900/80 border border-purple-400/40 lavender-glow hover:shadow-2xl hover:shadow-purple-500/20'
            }`}
          >
            {/* Top Bar: Role & Status - Centered on mobile */}
            <div className={`flex flex-wrap items-center justify-center sm:justify-between gap-2.5 pb-3 border-b text-xs font-mono ${
              isClinical ? 'border-purple-100' : 'border-purple-500/20'
            }`}>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-purple-600 text-white font-semibold text-[11px] sm:text-xs shadow-sm">
                  {currentProject.role}
                </span>
                <span className={`px-2.5 py-0.5 rounded-lg border text-[11px] sm:text-xs ${
                  isClinical
                    ? 'bg-purple-50 border-purple-200 text-purple-700 font-medium'
                    : 'bg-purple-950 border-purple-400/40 text-purple-300'
                }`}>
                  {currentProject.status}
                </span>
              </div>
              {currentProject.institution && (
                <span className={`text-[11px] text-center sm:text-right w-full sm:w-auto font-medium ${
                  isClinical ? 'text-slate-500' : 'text-purple-300/80'
                }`}>
                  {currentProject.institution}
                </span>
              )}
            </div>

            {/* Title - Centered on mobile */}
            <h3 className={`text-base sm:text-xl font-bold leading-snug text-center sm:text-left ${
              isClinical ? 'text-slate-900' : 'text-white'
            }`}>
              {currentProject.title}
            </h3>

            {/* Image + Description Grid - Tightened & Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-start">
              <div className={currentProject.image ? "md:col-span-8 space-y-3" : "md:col-span-12 space-y-3"}>
                <p className={`text-xs sm:text-sm leading-relaxed p-3 sm:p-3.5 rounded-xl border text-center md:text-left ${
                  isClinical
                    ? 'bg-slate-50/90 text-slate-700 border-slate-200/80 shadow-sm'
                    : 'bg-slate-950/70 text-slate-200 border-purple-500/20'
                }`}>
                  {currentProject.description}
                </p>

                {currentProject.scientificDetails && (
                  <div className="space-y-1">
                    <div className={`flex items-center justify-center md:justify-start gap-1.5 text-[11px] font-mono uppercase tracking-wider ${
                      isClinical ? 'text-purple-800 font-semibold' : 'text-purple-300'
                    }`}>
                      <BookOpen className={`w-3 h-3 ${isClinical ? 'text-purple-600' : 'text-purple-400'}`} />
                      <span>Scientific Context</span>
                    </div>
                    <p className={`text-xs leading-relaxed p-3 rounded-xl border text-center md:text-left ${
                      isClinical
                        ? 'bg-purple-50/70 text-slate-700 border-purple-200/80 shadow-sm'
                        : 'bg-purple-950/25 text-slate-300 border-purple-500/20'
                    }`}>
                      {currentProject.scientificDetails}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: Image Preview */}
              {currentProject.image && (
                <div className="md:col-span-4 flex justify-center">
                  <div className={`relative rounded-xl overflow-hidden border aspect-4/3 shadow-md w-full max-w-[260px] md:max-w-none mx-auto ${
                    isClinical ? 'border-purple-200 bg-slate-100' : 'border-purple-500/30 bg-slate-950'
                  }`}>
                    <img
                      src={currentProject.image}
                      alt={currentProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Methodology Highlights - Staggered reveal bullet points */}
            {currentProject.highlights && currentProject.highlights.length > 0 && (
              <div className={`space-y-2 pt-3 border-t ${
                isClinical ? 'border-purple-100' : 'border-purple-500/20'
              }`}>
                <div className={`flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider ${
                  isClinical ? 'text-purple-800 font-semibold' : 'text-purple-300'
                }`}>
                  <Sparkles className={`w-3.5 h-3.5 ${isClinical ? 'text-purple-600' : 'text-purple-400'}`} />
                  <span>Key Methodology & Highlights</span>
                </div>
                <motion.ul
                  variants={highlightsContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-1.5"
                >
                  {currentProject.highlights.map((highlight: string, hIdx: number) => (
                    <motion.li
                      key={hIdx}
                      variants={highlightItemVariants}
                      className={`p-2.5 sm:p-3 rounded-xl border text-xs flex items-start gap-2.5 shadow-sm transition-colors ${
                        isClinical
                          ? 'bg-slate-50/90 hover:bg-purple-50/60 border-slate-200/80 text-slate-700'
                          : 'bg-slate-950/80 border-purple-500/20 text-slate-200'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 shadow-sm ${
                        isClinical ? 'bg-purple-600 shadow-purple-600/30' : 'bg-purple-400 shadow-purple-400/60'
                      }`} />
                      <span className="leading-relaxed break-words">{highlight}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

