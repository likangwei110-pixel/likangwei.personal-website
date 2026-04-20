import { motion } from 'motion/react';
import { Linkedin, Instagram, Mail, Moon, Sun } from 'lucide-react';

export default function Header() {
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
            Kangwei <span className="text-brand-text">Li</span>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            <div className="pill text-[10px] font-bold uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              Available
            </div>
            <div className="pill text-[10px] font-bold uppercase tracking-wider">
              <Sun size={12} className="text-brand-accent" />
              <div className="w-8 h-4 bg-gray-100 rounded-full relative">
                <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white shadow-sm rounded-full" />
              </div>
              <Moon size={12} className="text-gray-300" />
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['home', 'internships', 'play', 'connect'].map((item) => (
            <a 
              key={item}
              href={`#${item}`}
              className="text-xs font-semibold text-brand-text hover:text-brand-accent transition-colors capitalize"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Socials & Lang */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-4 text-brand-text/60">
            <Linkedin size={18} className="hover:text-brand-accent cursor-pointer transition-colors" />
            <Instagram size={18} className="hover:text-brand-accent cursor-pointer transition-colors" />
            <Mail size={18} className="hover:text-brand-accent cursor-pointer transition-colors" />
          </div>
          
          <div className="pill bg-gray-50/50">
            <span className="text-[10px] font-extrabold text-brand-accent">CN</span>
            <div className="w-6 h-3 bg-gray-200 rounded-full relative">
               <div className="absolute left-0.5 top-0.5 w-2 h-2 bg-white rounded-full" />
            </div>
            <span className="text-[10px] font-extrabold text-gray-300">EN</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
