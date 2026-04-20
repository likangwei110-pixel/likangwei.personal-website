import { useApp } from './AppContext';
import { AppProvider } from './AppContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Interpolation from './components/Interpolation';
import Internships from './components/Internships';
import Hobbies from './components/Hobbies';
import Connect from './components/Connect';
import { Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function FloatingToggle() {
  const { theme, toggleTheme } = useApp();
  
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="fixed bottom-10 right-10 z-[100] w-14 h-14 rounded-full bg-brand-accent text-white shadow-2xl flex items-center justify-center cursor-pointer group"
    >
      <AnimatePresence mode="wait">
        {theme === 'light' ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
          >
            <Sun size={24} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
          >
            <Moon size={24} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Tooltip */}
      <div className="absolute right-16 px-4 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
        Press 'D' or Click to Switch
      </div>
    </motion.button>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

function AppContent() {
  const { toggleTheme } = useApp();

  return (
    <main 
      onDoubleClick={(e) => {
        // Only toggle if clicking the main container background, not interactive elements
        if (e.target === e.currentTarget) {
          toggleTheme();
        }
      }}
      className="bg-brand-bg text-brand-text selection:bg-brand-accent selection:text-white transition-colors duration-300 relative min-h-screen"
    >
      <Header />
      <Hero />
      <Interpolation />
      <Internships />
      <Hobbies />
      <Connect />
      <FloatingToggle />
    </main>
  );
}
