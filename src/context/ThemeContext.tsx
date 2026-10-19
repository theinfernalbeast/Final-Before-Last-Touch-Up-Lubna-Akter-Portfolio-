import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'lavender-night' | 'clean-clinical';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  isClinical: boolean;
}

const THEME_STORAGE_KEY = 'lubna_portfolio_theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'clean-clinical' || saved === 'lavender-night') {
        return saved;
      }
    } catch {
      // Fallback
    }
    return 'lavender-night';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // Ignore
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'lavender-night' ? 'clean-clinical' : 'lavender-night');
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    
    if (theme === 'clean-clinical') {
      root.classList.add('clinical-theme');
      root.classList.remove('lavender-theme');
      root.classList.remove('dark');
      document.body.classList.add('clinical-theme');
      document.body.classList.remove('lavender-theme');
    } else {
      root.classList.add('lavender-theme');
      root.classList.add('dark');
      root.classList.remove('clinical-theme');
      document.body.classList.add('lavender-theme');
      document.body.classList.remove('clinical-theme');
    }
  }, [theme]);

  const isClinical = theme === 'clean-clinical';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isClinical }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
