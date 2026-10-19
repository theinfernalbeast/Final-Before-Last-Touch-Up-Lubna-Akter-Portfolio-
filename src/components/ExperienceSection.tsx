import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { Calendar, MapPin, ChevronLeft, ChevronRight, ExternalLink, History, Briefcase, Award, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MilestoneItem {
  id: string;
  type: 'work' | 'venture' | 'extracurricular';
  title: string;
  organization: string;
  organizationUrl?: string;
  period: string;
  location?: string;
  points: string[];
}

export const ExperienceSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'work' | 'affiliations'>('all');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const activeCardIdsRef = useRef<Set<string>>(new Set());
  const [renderCounter, setRenderCounter] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { lang, t } = useLanguage();
  const { data } = usePortfolio();

  const handleFilterClick = (f: 'all' | 'work' | 'affiliations') => {
    setFilter(prev => (prev === f ? 'all' : f));
  };

  const toggleCardActive = (id: string) => {
    if (activeCardIdsRef.current.has(id)) {
      activeCardIdsRef.current.delete(id);
    } else {
      activeCardIdsRef.current.add(id);
    }
    setRenderCounter(c => c + 1);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const milestones: MilestoneItem[] = [
    // Dynamic Work Experience items
    ...data.workExperience.map((item, idx) => ({
      id: `work-${idx}`,
      type: 'work' as const,
      title: item.role,
      organization: item.organization,
      organizationUrl: item.organizationUrl || `https://www.google.com/search?q=${encodeURIComponent(item.organization)}`,
      period: item.period,
      location: item.location,
      points: item.points || [],
    })),
    // Dynamic Entrepreneurial Ventures
    ...data.entrepreneurialExperience.map((item, idx) => ({
      id: `venture-${idx}`,
      type: 'venture' as const,
      title: item.role,
      organization: item.organization,
      organizationUrl: item.organizationUrl || `https://www.google.com/search?q=${encodeURIComponent(item.organization)}`,
      period: item.period,
      location: item.location,
      points: item.points || [],
    })),
    // Dynamic Extracurricular & Voluntary
    ...(data.extraCurricular || []).map((item, idx) => ({
      id: `extra-${idx}`,
      type: 'extracurricular' as const,
      title: item.role,
      organization: item.organization,
      organizationUrl: item.organizationUrl || `https://www.google.com/search?q=${encodeURIComponent(item.organization)}`,
      period: item.period,
      points: item.points || [],
    })),
  ];

  const filteredMilestones = milestones.filter((m) => {
    if (filter === 'work') return m.type === 'work' || m.type === 'venture';
    if (filter === 'affiliations') return m.type === 'extracurricular';
    return true;
  });

  const getTypeBadge = (type: MilestoneItem['type']) => {
    switch (type) {
      case 'work':
        return { label: 'Work Experience', color: 'text-purple-300 bg-purple-500/15 border-purple-400/30' };
      case 'venture':
        return { label: 'Entrepreneurial Venture', color: 'text-indigo-300 bg-indigo-500/15 border-indigo-400/30' };
      case 'extracurricular':
        return { label: 'Affiliations & Voluntary', color: 'text-purple-300 bg-purple-500/15 border-purple-400/30' };
    }
  };

  const handleFilterChange = (newFilter: 'all' | 'work' | 'affiliations') => {
    setFilter(newFilter);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  // Framer Motion Staggered Reveal Variants for Experience Cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="experience" className="py-14 sm:py-20 border-t border-purple-500/20 relative overflow-hidden">
      {/* Modern Sleek Minimalist Floating Bar - Track Completely Removed */}
      <style>{`
        .modern-sleek-scroll {
          scrollbar-width: thin;
          scrollbar-color: #a855f7 transparent;
        }
        .modern-sleek-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .modern-sleek-scroll::-webkit-scrollbar-track {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        .modern-sleek-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(90deg, #9333ea, #6366f1, #a855f7);
          border-radius: 9999px;
          border: none;
          box-shadow: 0 0 12px rgba(168, 85, 247, 0.6);
        }
        .modern-sleek-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(90deg, #a855f7, #818cf8, #c084fc);
          box-shadow: 0 0 18px rgba(192, 132, 252, 0.9);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Centrally aligned across all devices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center justify-center gap-4 mb-8 sm:mb-10 px-2"
        >
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-[11px] sm:text-xs font-mono mb-2">
              <History className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-purple-400" />
              <span>{t.timeline.tag}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-white mt-1 tracking-tight text-center">
              {data.sectionTitles?.experience || t.timeline.title}
            </h2>
            <p className="text-xs sm:text-sm text-purple-200/70 mt-1 max-w-xl text-center leading-relaxed">
              {t.timeline.subtitle}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {/* Icon-only for mobile & tablet (< 1024px), labels on desktop, centrally aligned */}
            <div className="flex flex-row items-center justify-center bg-slate-900/90 border border-purple-500/20 p-1 rounded-xl shrink-0 gap-1 shadow-lg">
              <button
                onClick={() => handleFilterClick('all')}
                title={t.timeline.all}
                aria-label={t.timeline.all}
                className={`flex items-center justify-center gap-2 px-3 sm:px-3.5 lg:px-4 py-1.5 sm:py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-purple-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <History className={`w-4 h-4 transition-all duration-300 ${filter === 'all' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-purple-300'} shrink-0`} />
                <span className="hidden lg:inline">{t.timeline.all}</span>
              </button>
              <button
                onClick={() => handleFilterClick('work')}
                title={t.timeline.work}
                aria-label={t.timeline.work}
                className={`flex items-center justify-center gap-2 px-3 sm:px-3.5 lg:px-4 py-1.5 sm:py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  filter === 'work'
                    ? 'bg-purple-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Briefcase className={`w-4 h-4 transition-all duration-300 ${filter === 'work' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-indigo-300'} shrink-0`} />
                <span className="hidden lg:inline">{t.timeline.work}</span>
              </button>
              <button
                onClick={() => handleFilterClick('affiliations')}
                title={t.timeline.training}
                aria-label={t.timeline.training}
                className={`flex items-center justify-center gap-2 px-3 sm:px-3.5 lg:px-4 py-1.5 sm:py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  filter === 'affiliations'
                    ? 'bg-purple-600 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className={`w-4 h-4 transition-all duration-300 ${filter === 'affiliations' ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-purple-300'} shrink-0`} />
                <span className="hidden lg:inline">{t.timeline.training}</span>
              </button>
            </div>

            {/* Sideways Scroll Control Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2.5 rounded-xl bg-slate-900 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-slate-800 transition-colors shadow-lg cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2.5 rounded-xl bg-slate-900 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-slate-800 transition-colors shadow-lg cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Sideways Scrolling Track with key={filter} ensuring tabs always re-animate and preserve state reliably */}
        <motion.div
          key={filter}
          ref={scrollContainerRef}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 px-1 sm:px-2 snap-x snap-mandatory modern-sleek-scroll"
        >
          {filteredMilestones.map((item) => {
            const badge = getTypeBadge(item.type);
            const isHovered = hoveredCardId === item.id;
            const isClicked = activeCardIdsRef.current.has(item.id);
            const isExpanded = isHovered || isClicked;

            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                onMouseEnter={() => setHoveredCardId(item.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => toggleCardActive(item.id)}
                className={`snap-start shrink-0 w-[84vw] max-w-[320px] sm:w-[380px] p-4 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between relative group ${
                  isExpanded
                    ? 'bg-slate-900 border-purple-400 shadow-2xl shadow-purple-500/25 lavender-glow scale-[1.02] sm:scale-[1.03] z-10'
                    : 'bg-slate-900/70 border-purple-500/20 hover:border-purple-400/50 shadow-xl shadow-black/30 hover:scale-[1.01] hover:backdrop-blur-sm'
                }`}
                style={{
                  filter: hoveredCardId !== null && !isExpanded ? 'blur(2px)' : 'blur(0px)',
                }}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <span className={`text-[10px] sm:text-[11px] font-mono px-2 sm:px-2.5 py-0.5 rounded-md border ${badge.color}`}>
                      {badge.label}
                    </span>
                    <span className="text-[11px] sm:text-xs font-mono text-purple-300/80 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-purple-400" />
                      {item.period}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-lg font-bold text-white mb-1 leading-snug text-center sm:text-left">
                    {item.title}
                  </h3>

                  <div className="mb-2.5 sm:mb-3 flex justify-center sm:justify-start">
                    <a
                      href={item.organizationUrl || 'https://www.google.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-purple-300 hover:text-purple-200 hover:underline group/link"
                    >
                      <span className="truncate max-w-[220px] sm:max-w-none">{item.organization}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-purple-400 opacity-70 group-hover/link:opacity-100 transition-opacity shrink-0" />
                    </a>
                  </div>

                  {item.location && (
                    <div className="text-[11px] sm:text-xs text-purple-300/70 font-mono flex items-center justify-center sm:justify-start gap-1 mb-2.5 sm:mb-3">
                      <MapPin className="w-3 h-3 text-purple-400 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  )}

                  <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-300 border-t border-purple-500/20 pt-2.5 sm:pt-3">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 leading-relaxed text-left">
                        <span className="text-purple-400 mt-0.5 shrink-0">✓</span>
                        <span className="break-words">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={item.organizationUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-4 sm:mt-6 pt-2.5 sm:pt-3 border-t border-purple-500/20 flex items-center justify-center sm:justify-between text-[10px] sm:text-[11px] font-mono text-purple-400 hover:text-purple-300 transition-colors group/link cursor-pointer"
                >
                  <span className="truncate">{item.organizationUrl?.includes('facebook') ? 'Facebook Page' : 'Official Page'}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-1.5 sm:ml-0 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
