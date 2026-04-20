import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useApp } from '../AppContext';
import { Send, Search } from 'lucide-react';
import { askKangwei } from '../services/geminiService';

const QUESTIONS_CN = [
  "你如何看待 AIGC 在产品管理中的应用？",
  "分享一下你在 TikTok 实习的高光时刻。",
  "你的德国背景对你在科技行业有什么帮助？",
  "你对未来的数字空间有什么愿景？"
];

const QUESTIONS_EN = [
  "What is your approach to AIGC in product management?",
  "Tell me about your TikTok internship highlights.",
  "How does your German background help in tech?",
  "What's your vision for future digital spaces?"
];

export default function Hero() {
  const { t } = useApp();
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const QUESTIONS = t(QUESTIONS_CN as any, QUESTIONS_EN as any) as unknown as string[];

  const handleAsk = async (q: string) => {
    setLoading(true);
    setAnswer(null);
    const res = await askKangwei(q);
    setAnswer(res || t("我现在不太确定，不如我们通过邮件聊聊吧！", "I'm not sure about that right now, let's chat about it over email!"));
    setLoading(false);
  };

  return (
    <section id="home" className="pt-48 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto min-h-screen flex flex-col justify-between">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Intro */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 leading-[1.1] tracking-tight dark:text-white">
            {t('我是', "Hi, I'm")} <span className="text-brand-accent italic">Kangwei</span>
          </h1>
          <p className="text-xl md:text-2xl text-brand-text/80 dark:text-white/80 max-w-xl leading-relaxed">
            {t(
              '在过去的',
              'I\'ve spent the last'
            )} <span className="text-brand-accent font-bold">3 {t('年', 'years')}</span> {t(
              '里，我一直在探索',
              'exploring the intersection of'
            )}
            <span className="font-bold"> AIGC</span>, 
            <span className="font-bold"> {t('产品管理', 'Product Management')}</span>, {t('以及', 'and')} 
            <span className="font-bold"> {t('跨境运营', 'Cross-cultural Operations')}</span> {t(
              '的交汇点。我热衷于那些能让产品更清晰、更具人情味的细节。',
              'I focus on details that make products feel clear and human.'
            )} <a href="#connect" className="text-brand-accent underline underline-offset-4 decoration-2">{t('聊聊吧', "Let's talk")}</a>.
          </p>
        </motion.div>

        {/* Ask Me Section */}
        <div className="relative">
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-4 items-end"
          >
             <h2 className="text-2xl font-bold mb-4 self-start lg:self-end dark:text-white">{t('想问我点什么？', 'Want to ask me a question?')}</h2>
             
             <div className="flex flex-col gap-3 w-full max-w-md">
               {QUESTIONS.map((q, i) => (
                 <motion.button
                   key={i}
                   whileHover={{ x: -10, scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => handleAsk(q)}
                   className="p-4 rounded-2xl bg-gradient-to-r from-brand-accent to-brand-secondary text-white text-sm font-semibold text-left shadow-lg"
                 >
                   {q}
                 </motion.button>
               ))}
             </div>

             <AnimatePresence>
                {(loading || answer) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-8 p-6 glass rounded-3xl w-full max-w-md relative"
                  >
                    <div className="text-xs uppercase tracking-widest font-extrabold text-brand-accent mb-2">{t('AI 康威：', 'Kangwei AI:')}</div>
                    <p className="text-sm italic text-brand-text/80 dark:text-white/80">
                      {loading ? t("正在输入...", "Typing...") : answer}
                    </p>
                    
                    <div className="absolute -bottom-6 -right-6">
                       <img 
                         src="https://picsum.photos/seed/mascot/100/100" 
                         alt="Mascot" 
                         className="w-20 h-20 rounded-full border-4 border-white dark:border-zinc-800 shadow-xl"
                         referrerPolicy="no-referrer"
                       />
                    </div>
                  </motion.div>
                )}
             </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Bottom Command Bar */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 sticky bottom-10 z-40 w-full max-w-3xl mx-auto"
      >
        <div className="glass rounded-[32px] p-2 flex items-center shadow-xl ring-1 ring-black/5 dark:ring-white/10">
          <div className="p-3 text-gray-400">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder={t("问问我，或者搜索任何内容...", "Ask, write or search for anything...")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk(query)}
            className="flex-1 bg-transparent border-none focus:ring-0 text-brand-text dark:text-white placeholder:text-gray-300 font-medium py-3"
          />
          <button 
            onClick={() => handleAsk(query)}
            className="bg-brand-accent/10 p-3 rounded-full text-brand-accent hover:bg-brand-accent hover:text-white transition-all disabled:opacity-50"
            disabled={!query || loading}
          >
            <Send size={20} />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
