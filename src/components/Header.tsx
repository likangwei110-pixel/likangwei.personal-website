import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { Linkedin, Instagram, Mail, Moon, Sun } from 'lucide-react';

export default function Header() {
  const { theme, toggleTheme, language, setLanguage, t } = useApp();

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1400px] px-6"
    >
      <div className="glass rounded-full px-6 py-4 flex items-center justify-between shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="font-display text-xl font-extrabold tracking-tight text-brand-accent">
            Kangwei <span className="text-brand-text dark:text-white">Li</span>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <div className="pill text-[10px] font-bold uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              {t('在职', 'Available')}
            </div>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="pill text-[10px] font-bold uppercase tracking-wider hover:border-brand-accent transition-colors group cursor-pointer"
            >
              <Sun size={12} className={`${theme === 'light' ? 'text-brand-accent' : 'text-zinc-500'}`} />
              <div className="w-8 h-4 bg-zinc-100 dark:bg-zinc-800 rounded-full relative">
                <motion.div 
                  animate={{ x: theme === 'light' ? 2 : 18 }}
                  className="absolute top-0.5 w-3 h-3 bg-white dark:bg-brand-accent shadow-sm rounded-full" 
                />
              </div>
              <Moon size={12} className={`${theme === 'dark' ? 'text-brand-accent' : 'text-zinc-300'}`} />
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { id: 'home', label: t('首页', 'Home') },
            { id: 'internships', label: t('实习', 'Internships') },
            { id: 'play', label: t('生活', 'Play') },
            { id: 'connect', label: t('联系', 'Connect') }
          ].map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              className="text-xs font-semibold text-brand-text dark:text-white/70 hover:text-brand-accent dark:hover:text-brand-accent transition-colors capitalize"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Socials & Lang */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4 text-brand-text/60 dark:text-white/40">
            <Linkedin size={18} className="hover:text-brand-accent cursor-pointer transition-colors" />
            <Instagram size={18} className="hover:text-brand-accent cursor-pointer transition-colors" />
            <Mail size={18} className="hover:text-brand-accent cursor-pointer transition-colors" />
          </div>
          
          {/* Lang Toggle */}
          <button 
            onClick={() => setLanguage(language === 'CN' ? 'EN' : 'CN')}
            className="pill bg-gray-50/50 dark:bg-zinc-900/50 hover:border-brand-accent transition-colors cursor-pointer"
          >
            <span className={`text-[10px] font-extrabold ${language === 'CN' ? 'text-brand-accent' : 'text-zinc-400'}`}>CN</span>
            <div className="w-6 h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full relative">
               <motion.div 
                 animate={{ x: language === 'CN' ? 2 : 14 }}
                 className="absolute top-0.5 w-2 h-2 bg-white dark:bg-brand-accent rounded-full" 
               />
            </div>
            <span className={`text-[10px] font-extrabold ${language === 'EN' ? 'text-brand-accent' : 'text-zinc-400'}`}>EN</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
