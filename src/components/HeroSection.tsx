import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { ThreeMolecularViewer } from './ThreeMolecularViewer';
import { User, Atom, Download, Send } from 'lucide-react';
import { downloadCvFile } from '../utils/downloadCv';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import lubnaProfilePic from '../assets/images/lubna_laboratory_photo_1791695973616.jpg';

interface HeroSectionProps {
  onOpenResume?: () => void;
  onOpenContact?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const [viewMode, setViewMode] = useState<'photo' | '3d'>('photo'); // Start on user uploaded photo
  const { lang, t } = useLanguage();
  const { isClinical } = useTheme();
  const { data } = usePortfolio();

  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 pb-14 md:pt-32 md:pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Identity & Summary - Central aligned on mobile, left on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-5 sm:space-y-6 flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <div className="space-y-2.5 w-full flex flex-col items-center text-center lg:items-start lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border transition-colors mx-auto lg:mx-0 ${
                  isClinical
                    ? 'bg-purple-50 border-purple-200 text-purple-700 shadow-sm'
                    : 'bg-purple-500/10 border-purple-400/30 text-purple-300'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isClinical ? 'bg-purple-600' : 'bg-purple-400'} animate-pulse`} />
                <span>{data.profile.subtitle || t.hero.subtitle}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight transition-colors text-center lg:text-left ${
                  isClinical ? 'text-slate-900' : 'text-white'
                }`}
              >
                {t.hero.name}
              </motion.h1>

              {/* Sub-headline: Single static line as requested */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className={`text-xs xs:text-sm sm:text-base md:text-lg font-medium transition-colors text-center lg:text-left max-w-xl leading-relaxed ${
                  isClinical ? 'text-purple-700' : 'text-purple-200/90'
                }`}
              >
                Clinical Pharmacy | Pharmaceutical Research & Pharmacology | Medical Writing & Drug Information | Healthcare
              </motion.p>
            </div>

            {/* Authentic Professional Summary from CV */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl transition-colors text-center lg:text-left mx-auto lg:mx-0 ${
                isClinical ? 'text-slate-600' : 'text-slate-300'
              }`}
            >
              {t.hero.summary}
            </motion.p>

            {/* Strict Two Action Buttons As Requested: Download CV & Contact Me */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full"
            >
              {/* Button 1: Download CV */}
              <button
                type="button"
                onClick={() => {
                  if (onOpenResume) {
                    onOpenResume();
                  } else {
                    downloadCvFile();
                  }
                }}
                className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 hover:scale-102 active:scale-98 transition-all flex items-center gap-2 cursor-pointer group border border-purple-400/30"
              >
                <Download className="w-4 h-4 text-purple-200 group-hover:text-white transition-colors animate-bounce" />
                <span>{t.hero.downloadCv}</span>
              </button>

              {/* Button 2: Contact Me */}
              <a
                href="#contact"
                onClick={handleScrollToContact}
                className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer border ${
                  isClinical
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-sm'
                    : 'bg-slate-900/80 hover:bg-slate-900 text-slate-200 border-purple-500/30 hover:border-purple-400/60 shadow-md'
                }`}
              >
                <Send className="w-4 h-4 text-purple-400" />
                <span>{t.hero.contactMe}</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Profile Photo OR 3D Interactive Molecular Viewer Box with Mode Switcher */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center space-y-4"
          >
            {/* View Mode Switcher: Two Separate Compact Buttons (Profile Photo & 3D Molecule) */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-2 sm:mb-3">
              {/* Button 1: Profile Photo */}
              <button
                type="button"
                onClick={() => setViewMode('photo')}
                aria-pressed={viewMode === 'photo'}
                className={`px-4 sm:px-4.5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  viewMode === 'photo'
                    ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 text-white shadow-md shadow-purple-600/30 hover:shadow-purple-500/40 border border-purple-400/40 scale-102'
                    : isClinical
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-300/80 shadow-sm hover:scale-102 active:scale-98'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-purple-500/30 hover:border-purple-400/60 shadow-md hover:scale-102 active:scale-98'
                }`}
              >
                <User
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    viewMode === 'photo'
                      ? 'text-white'
                      : isClinical
                      ? 'text-purple-600'
                      : 'text-purple-400'
                  }`}
                />
                <span>{t.hero.photo || 'Profile Photo'}</span>
              </button>

              {/* Button 2: 3D Molecule */}
              <button
                type="button"
                onClick={() => setViewMode('3d')}
                aria-pressed={viewMode === '3d'}
                className={`px-4 sm:px-4.5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  viewMode === '3d'
                    ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 text-white shadow-md shadow-purple-600/30 hover:shadow-purple-500/40 border border-purple-400/40 scale-102'
                    : isClinical
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-300/80 shadow-sm hover:scale-102 active:scale-98'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-purple-500/30 hover:border-purple-400/60 shadow-md hover:scale-102 active:scale-98'
                }`}
              >
                <Atom
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    viewMode === '3d'
                      ? 'text-white'
                      : isClinical
                      ? 'text-purple-600'
                      : 'text-purple-400'
                  }`}
                />
                <span>{t.hero.view3d || '3D Molecule'}</span>
              </button>
            </div>

            {/* Harmonized Identical Responsive Sizing for Profile Picture and 3D Molecule Box */}
            <div className="w-full max-w-[280px] xs:max-w-[310px] sm:max-w-[350px] md:max-w-[380px] mx-auto aspect-[3/4] relative">
              {/* Ambient circular aura glow for modern depth */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-purple-600/25 via-indigo-500/20 to-pink-500/20 rounded-full blur-2xl pointer-events-none opacity-80" />

              {viewMode === 'photo' ? (
                <div
                  className={`relative w-full h-full rounded-3xl overflow-hidden border shadow-2xl group lavender-glow transition-all ${
                    isClinical
                      ? 'border-purple-200 bg-white shadow-slate-200/60 ring-1 ring-purple-100'
                      : 'border-purple-500/30 bg-slate-900/90 ring-1 ring-purple-500/20'
                  }`}
                >
                  {/* User's Profile Photo */}
                  <img
                    src={data.profile.photoUrl || lubnaProfilePic}
                    alt="Lubna Akter - Aspiring Pharmacist"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-all border border-purple-500/30">
                  <ThreeMolecularViewer className="w-full h-full" />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
