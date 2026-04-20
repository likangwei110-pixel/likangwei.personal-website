import { motion } from 'motion/react';
import { Mail, Phone, Linkedin, ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../AppContext';

export default function Connect() {
  const { t } = useApp();
  const [copied, setCopied] = useState(false);
  const email = 'lkwbfsu@outlook.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="connect" className="py-32 px-6 md:px-12 bg-brand-text dark:bg-zinc-950 text-white dark:text-brand-text rounded-t-[60px] transition-colors duration-700">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div>
            <h2 className="text-xs uppercase tracking-[0.2em] font-extrabold mb-12 text-white/40">{t('随便聊聊 / 触达', 'Say Hello / Contact')}</h2>
            <h3 className="text-6xl md:text-8xl font-extrabold mb-12 leading-[0.9] tracking-tighter">
              {t('让我们开启', "Let's craft")} <br/>
              <span className="text-brand-accent italic">{t('下一个增长回路。', 'the next big loop.')}</span>
            </h3>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={copyEmail}
                className="pill py-4 px-8 bg-white text-black border-none hover:bg-brand-accent hover:text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  {copied ? <Check size={18} /> : <Mail size={18} />}
                  <span className="font-bold">{copied ? t("已复制！", "Copied!") : "lkwbfsu@outlook.com"}</span>
                </div>
              </button>
              
              <div className="pill py-4 px-8 bg-white/10 text-white border-white/10">
                <Phone size={18} />
                <span className="font-bold">+86 13850575980</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between h-full lg:text-right">
            <div className="space-y-12">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-extrabold text-white/20 mb-6">{t('社交媒体', 'Socials')}</h4>
                <div className="flex lg:justify-end gap-6">
                  {[
                    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/%E5%BA%B7%E7%82%9C-%E6%9D%8E-39735634a/' }
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-2xl font-bold hover:text-brand-accent transition-colors flex items-center gap-2">
                       {s.label} <ArrowRight size={20} className="-rotate-45" />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest font-extrabold text-white/20 mb-6">{t('所在地', 'Location')}</h4>
                <p className="text-2xl font-bold italic">{t('中国，北京', 'Beijing, China')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-display text-2xl font-extrabold tracking-tight">
            Kangwei <span className="text-white/20">Li</span>
          </div>
          
          <p className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-white/20">
            © 2026 {t('基于产品逻辑开发', 'Developed with Product Logic')}
          </p>

          <div className="flex gap-4">
             <div className="w-2 h-2 rounded-full bg-brand-accent scale-125" />
             <div className="w-2 h-2 rounded-full bg-white/10" />
             <div className="w-2 h-2 rounded-full bg-white/10" />
          </div>
        </div>
      </div>
    </footer>
  );
}
