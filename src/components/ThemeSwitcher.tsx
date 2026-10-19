import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Sparkles, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeSwitcherProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ 
  className = ''
}) => {
  const { theme, toggleTheme, isClinical } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-300 cursor-pointer select-none ${
        isClinical
          ? 'bg-purple-50 hover:bg-purple-100/80 text-purple-800 border border-purple-200 shadow-sm shadow-purple-500/10'
          : 'bg-purple-950/40 hover:bg-purple-900/50 text-purple-200 border border-purple-500/30 shadow-sm shadow-purple-950/30'
      } ${className}`}
      title={
        isClinical
          ? 'Switch to Lavender Night mode'
          : 'Switch to Clean Clinical light mode'
      }
      aria-label="Toggle theme between Lavender Night and Clean Clinical"
    >
      <div className="relative flex items-center justify-center w-4 h-4">
        {isClinical ? (
          <motion.div
            key="clinical-icon"
            initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center"
          >
            <Sun className="w-4 h-4 text-amber-500 stroke-[2.2]" />
          </motion.div>
        ) : (
          <motion.div
            key="lavender-icon"
            initial={{ rotate: 90, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center"
          >
            <Moon className="w-4 h-4 text-purple-300 stroke-[2.2]" />
          </motion.div>
        )}
      </div>
    </button>
  );
};

