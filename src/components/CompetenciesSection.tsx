import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, Layers, Award, Cpu, Users, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export const CompetenciesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'core' | 'soft' | 'computer'>('core');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const { t } = useLanguage();
  const { isClinical } = useTheme();
  const { data } = usePortfolio();

  const handleTabClick = (tab: 'core' | 'soft' | 'computer') => {
    setActiveTab(tab);
  };

  return (
    <section
      id="competencies"
      className={`py-16 sm:py-20 border-t relative transition-colors duration-300 ${
        isClinical ? 'border-purple-200/70 bg-purple-50/15' : 'border-purple-500/20'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-10 text-center px-2"
        >
          <div
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono mb-2.5 transition-colors ${
              isClinical
                ? 'bg-purple-100/80 border border-purple-300 text-purple-700 shadow-sm'
                : 'bg-purple-500/10 border border-purple-400/30 text-purple-300'
            }`}
          >
            <Layers className={`w-3.5 h-3.5 ${isClinical ? 'text-purple-600' : 'text-purple-400'}`} />
            <span>{t.skills.tag || 'Pharmaceutical Knowledge & Skills'}</span>
          </div>
          <h2
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-center transition-colors ${
              isClinical ? 'text-slate-900' : 'text-white'
            }`}
          >
            {data.sectionTitles?.skills || t.skills.title || 'Pharmaceutical Knowledge & Skills'}
          </h2>
          <p
            className={`text-xs sm:text-sm max-w-2xl mx-auto mt-2 text-center transition-colors ${
              isClinical ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            {t.skills.subtitle}
          </p>
        </motion.div>

        {/* Tab Navigation - Centrally aligned, icon-only on mobile & tablet, labels on desktop, no number counts */}
        <div className="flex justify-center mb-8 px-2">
          <div
            className={`flex items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl shadow-lg max-w-full transition-colors ${
              isClinical
                ? 'bg-white/95 border border-purple-200 shadow-purple-950/5'
                : 'bg-slate-900/90 border border-purple-500/30'
            }`}
          >
            <button
              onClick={() => handleTabClick('core')}
              type="button"
              title={t.skills.core || 'Pharmaceutical Knowledge'}
              aria-label={t.skills.core || 'Pharmaceutical Knowledge'}
              className={`flex items-center justify-center gap-2 px-3 sm:px-3.5 lg:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'core'
                  ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30 ring-1 ring-purple-400/50'
                  : isClinical
                  ? 'text-slate-600 hover:text-purple-800 hover:bg-purple-50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Award
                className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                  activeTab === 'core' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : isClinical ? 'text-purple-600' : 'text-purple-300'
                }`}
              />
              <span className="hidden lg:inline">{t.skills.core || 'Pharmaceutical Knowledge'}</span>
            </button>

            <button
              onClick={() => handleTabClick('soft')}
              type="button"
              title={t.skills.soft || 'Professional Strengths'}
              aria-label={t.skills.soft || 'Professional Strengths'}
              className={`flex items-center justify-center gap-2 px-3 sm:px-3.5 lg:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'soft'
                  ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30 ring-1 ring-purple-400/50'
                  : isClinical
                  ? 'text-slate-600 hover:text-purple-800 hover:bg-purple-50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Users
                className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                  activeTab === 'soft' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : isClinical ? 'text-indigo-600' : 'text-indigo-300'
                }`}
              />
              <span className="hidden lg:inline">{t.skills.soft || 'Professional Strengths'}</span>
            </button>

            <button
              onClick={() => handleTabClick('computer')}
              type="button"
              title={t.skills.computer || 'Tools & Research Support'}
              aria-label={t.skills.computer || 'Tools & Research Support'}
              className={`flex items-center justify-center gap-2 px-3 sm:px-3.5 lg:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer ${
                activeTab === 'computer'
                  ? 'bg-purple-600 text-white font-semibold shadow-md shadow-purple-600/30 ring-1 ring-purple-400/50'
                  : isClinical
                  ? 'text-slate-600 hover:text-purple-800 hover:bg-purple-50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Cpu
                className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                  activeTab === 'computer' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : isClinical ? 'text-pink-600' : 'text-pink-300'
                }`}
              />
              <span className="hidden lg:inline">{t.skills.computer || 'Tools & Research Support'}</span>
            </button>
          </div>
        </div>

        {/* Tab Content Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          >
            {activeTab === 'core' &&
              data.coreCompetencies.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.3) }}
                  onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                    selectedSkill === skill
                      ? isClinical
                        ? 'bg-white border-purple-400 shadow-xl shadow-purple-500/10 ring-1 ring-purple-300 scale-[1.02]'
                        : 'bg-slate-900 border-purple-400 shadow-xl shadow-purple-500/20 lavender-glow scale-[1.02]'
                      : isClinical
                      ? 'bg-white/85 border-purple-200/90 hover:border-purple-300 shadow-sm hover:bg-white'
                      : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/50 hover:bg-slate-900/90'
                  }`}
                >
                  <div className="flex items-center gap-3 text-left min-w-0">
                    <div
                      className={`p-2 sm:p-2.5 rounded-xl border group-hover:scale-110 transition-transform shrink-0 ${
                        isClinical
                          ? 'bg-purple-50 border-purple-200 text-purple-700'
                          : 'bg-purple-500/15 border-purple-400/30 text-purple-300'
                      }`}
                    >
                      <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-semibold tracking-wide truncate transition-colors ${
                        isClinical ? 'text-slate-800' : 'text-white'
                      }`}
                    >
                      {skill}
                    </span>
                  </div>
                  <CheckCircle2
                    className={`w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0 ${
                      isClinical ? 'text-purple-600 opacity-90' : 'text-purple-400 opacity-80'
                    }`}
                  />
                </motion.div>
              ))}

            {activeTab === 'soft' &&
              data.softSkills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.3) }}
                  onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                    selectedSkill === skill
                      ? isClinical
                        ? 'bg-white border-indigo-400 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-300 scale-[1.02]'
                        : 'bg-slate-900 border-indigo-400 shadow-xl shadow-indigo-500/20 lavender-glow scale-[1.02]'
                      : isClinical
                      ? 'bg-white/85 border-purple-200/90 hover:border-indigo-300 shadow-sm hover:bg-white'
                      : 'bg-slate-900/60 border-purple-500/20 hover:border-indigo-400/50 hover:bg-slate-900/90'
                  }`}
                >
                  <div className="flex items-center gap-3 text-left min-w-0">
                    <div
                      className={`p-2 sm:p-2.5 rounded-xl border group-hover:scale-110 transition-transform shrink-0 ${
                        isClinical
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                          : 'bg-indigo-500/15 border-indigo-400/30 text-indigo-300'
                      }`}
                    >
                      <Users className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-semibold tracking-wide truncate transition-colors ${
                        isClinical ? 'text-slate-800' : 'text-white'
                      }`}
                    >
                      {skill}
                    </span>
                  </div>
                  <CheckCircle2
                    className={`w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0 ${
                      isClinical ? 'text-indigo-600 opacity-90' : 'text-indigo-400 opacity-80'
                    }`}
                  />
                </motion.div>
              ))}

            {activeTab === 'computer' &&
              data.computerLiteracy.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.3) }}
                  onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                  className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                    selectedSkill === skill
                      ? isClinical
                        ? 'bg-white border-pink-400 shadow-xl shadow-pink-500/10 ring-1 ring-pink-300 scale-[1.02]'
                        : 'bg-slate-900 border-pink-400 shadow-xl shadow-pink-500/20 lavender-glow scale-[1.02]'
                      : isClinical
                      ? 'bg-white/85 border-purple-200/90 hover:border-pink-300 shadow-sm hover:bg-white'
                      : 'bg-slate-900/60 border-purple-500/20 hover:border-pink-400/50 hover:bg-slate-900/90'
                  }`}
                >
                  <div className="flex items-center gap-3 text-left min-w-0">
                    <div
                      className={`p-2 sm:p-2.5 rounded-xl border group-hover:scale-110 transition-transform shrink-0 ${
                        isClinical
                          ? 'bg-pink-50 border-pink-200 text-pink-700'
                          : 'bg-pink-500/15 border-pink-400/30 text-pink-300'
                      }`}
                    >
                      <Cpu className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-semibold tracking-wide truncate transition-colors ${
                        isClinical ? 'text-slate-800' : 'text-white'
                      }`}
                    >
                      {skill}
                    </span>
                  </div>
                  <CheckCircle2
                    className={`w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0 ${
                      isClinical ? 'text-pink-600 opacity-90' : 'text-pink-400 opacity-80'
                    }`}
                  />
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
