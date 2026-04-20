import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'CN' | 'EN';
type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (cn: string, en: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') return (localStorage.getItem('lang') as Language) || 'CN';
    return 'CN';
  });
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') return (localStorage.getItem('theme') as Theme) || 'light';
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.backgroundColor = '#0A0A08';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#FDFCF6';
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key.toLowerCase() === 'd' || e.key === '\\') && 
          !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        toggleTheme();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const t = (cn: string, en: string) => (language === 'CN' ? cn : en);

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
