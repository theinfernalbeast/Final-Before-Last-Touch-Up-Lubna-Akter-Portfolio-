import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Languages, CheckCircle2, Sparkles, BookOpen, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export const LanguageSection: React.FC = () => {
  const { data } = usePortfolio();
  const { t } = useLanguage();
  const { isClinical } = useTheme();
  const [selectedLangId, setSelectedLangId] = useState<string | null>(null);

  const languagesList = data.languages && data.languages.length > 0 ? data.languages : [
    {
      id: 'bn',
      language: 'Bengali',
      level: 'Native',
      percentage: 100,
      description: 'Mother tongue, fully bilingual in academic, clinical, and interpersonal discourse.',
      keywords: ['Mother Tongue', 'Literature & Writing', 'Clinical Counseling'],
    },
    {
      id: 'en',
      language: 'English',
      level: 'Professional Working Proficiency',
      percentage: 70,
      description: 'Primary medium for pharmaceutical literature review, medical writing, and clinical reports.',
      keywords: ['Fluency in English', 'Literature & Writing', 'Clinical Counseling'],
    },
  ];

  return (
    <section
      id="languages"
      className={`py-16 border-t relative overflow-hidden transition-colors duration-300 ${
        isClinical ? 'border-purple-200/70 bg-purple-50/15' : 'border-purple-500/20'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 px-2"
        >
          <div
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono mb-2 transition-colors ${
              isClinical
                ? 'bg-purple-100/80 border border-purple-300 text-purple-700 shadow-sm'
                : 'bg-purple-500/10 border border-purple-400/30 text-purple-300'
            }`}
          >
            <Languages className={`w-3 sm:w-3.5 h-3 sm:h-3.5 ${isClinical ? 'text-purple-600' : 'text-purple-400'}`} />
            <span>Language Skills</span>
          </div>
          <h2
            className={`text-xl sm:text-3xl font-bold tracking-tight text-center transition-colors ${
              isClinical ? 'text-slate-900' : 'text-white'
            }`}
          >
            {data.sectionTitles?.languages || 'Language Skills'}
          </h2>
          <p
            className={`text-xs sm:text-sm mt-1 max-w-lg mx-auto text-center leading-relaxed transition-colors ${
              isClinical ? 'text-slate-600' : 'text-purple-200/70'
            }`}
          >
            Scientific, clinical, and interpersonal fluency across professional environments
          </p>
        </motion.div>

        {/* Space-conscious, interactive language cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {languagesList.map((item, idx) => {
            const isSelected = selectedLangId === item.id;
            const pct = item.percentage ?? (item.id === 'bn' ? 100 : 70);
            const isNative = item.level.toLowerCase().includes('native') || item.id === 'bn';

            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onClick={() => setSelectedLangId(prev => prev === item.id ? null : item.id)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer group ${
                  isSelected
                    ? isClinical
                      ? 'bg-white border-purple-400 shadow-xl shadow-purple-500/10 ring-1 ring-purple-300 scale-[1.01]'
                      : 'bg-slate-900 border-purple-400 shadow-xl shadow-purple-500/25 lavender-glow scale-[1.01]'
                    : isClinical
                    ? 'bg-white/85 border-purple-200/90 hover:border-purple-300 shadow-sm hover:bg-white'
                    : 'bg-slate-900/60 border-purple-500/20 hover:border-purple-400/50 shadow-md shadow-black/20 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between text-left gap-3 mb-3">
                  <div className="flex items-center gap-3 text-left">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all shrink-0 border ${
                        isClinical
                          ? 'bg-purple-50 border-purple-200 text-purple-700'
                          : 'bg-purple-950/80 border-purple-500/30 text-purple-300 group-hover:text-purple-200'
                      }`}
                    >
                      <Languages className="w-5 h-5" />
                    </div>
                    <div>
                      <h3
                        className={`font-bold text-sm sm:text-base leading-tight text-left transition-colors ${
                          isClinical ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {item.language}
                      </h3>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-lg border ${
                        isClinical
                          ? 'bg-purple-50 border-purple-300 text-purple-700'
                          : 'bg-purple-500/15 border-purple-400/30 text-purple-300'
                      }`}
                    >
                      {isNative ? 'Native' : 'Fluent'}
                    </span>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div
                  className={`w-full h-2 sm:h-2.5 rounded-full overflow-hidden border mb-3 ${
                    isClinical ? 'bg-slate-100 border-purple-200' : 'bg-slate-950 border-purple-500/20'
                  }`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 + idx * 0.15 }}
                    className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-400 rounded-full shadow-sm shadow-purple-500/50"
                  />
                </div>

                <p
                  className={`text-xs leading-relaxed text-center sm:text-left transition-colors ${
                    isClinical ? 'text-slate-600' : 'text-slate-300/90'
                  }`}
                >
                  {item.description}
                </p>

                {/* Interactive subtle breakdown tags - Centrally aligned across all devices */}
                <div
                  className={`flex flex-wrap items-center justify-center gap-1.5 pt-3 mt-3 border-t text-[10px] font-mono text-center ${
                    isClinical ? 'border-purple-100 text-purple-800' : 'border-purple-500/15 text-purple-200/80'
                  }`}
                >
                  {(item.keywords && item.keywords.length > 0 ? item.keywords : [
                    isNative ? 'Mother Tongue' : 'Fluency in English',
                    'Literature & Writing',
                    'Clinical Counseling'
                  ]).map((kw: string, kIdx: number) => (
                    <span
                      key={kw || kIdx}
                      className={`px-2 py-0.5 rounded-md border flex items-center justify-center gap-1 ${
                        isClinical
                          ? 'bg-purple-50 border-purple-200 text-purple-700'
                          : 'bg-purple-500/10 border-purple-500/20 text-purple-200'
                      }`}
                    >
                      {kIdx === 0 ? (
                        <CheckCircle2 className={`w-3 h-3 shrink-0 ${isClinical ? 'text-purple-600' : 'text-purple-400'}`} />
                      ) : kIdx === 1 ? (
                        <BookOpen className={`w-3 h-3 shrink-0 ${isClinical ? 'text-purple-600' : 'text-purple-400'}`} />
                      ) : (
                        <MessageSquare className={`w-3 h-3 shrink-0 ${isClinical ? 'text-purple-600' : 'text-purple-400'}`} />
                      )}
                      <span>{kw}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
