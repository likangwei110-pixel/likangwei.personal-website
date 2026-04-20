import { motion } from 'motion/react';
import { useApp } from '../AppContext';
import { Target, Zap, Globe } from 'lucide-react';

const CAPABILITIES_CN = [
  {
    title: '数据驱动决策',
    metric: '59%',
    description: '赛事运营中运动员意图自动识别准确率',
    icon: Target
  },
  {
    title: 'AI 工具提效',
    metric: '30%',
    description: '通过自建 Agent 提升热点内容识别效率',
    icon: Zap
  },
  {
    title: '全球化协作',
    member: 'PMO Specialist',
    description: '奥迪 (中国) 跨境项目管理与版本控制。提升流转效率 30%',
    icon: Globe
  }
];

const CAPABILITIES_EN = [
  {
    title: 'Data-Driven Decisions',
    metric: '59%',
    description: 'Athlete intent recognition accuracy in sports operations.',
    icon: Target
  },
  {
    title: 'AI Tooling Efficiency',
    metric: '30%',
    description: 'Enhanced trending content identification via custom agents.',
    icon: Zap
  },
  {
    title: 'Global Collaboration',
    member: 'PMO Specialist',
    description: 'Cross-border project management at Audi (China).',
    icon: Globe
  }
];

export default function Interpolation() {
  const { t, language } = useApp();
  const caps = language === 'CN' ? CAPABILITIES_CN : CAPABILITIES_EN;

  return (
    <section className="py-24 px-6 md:px-12 border-b border-black dark:border-white/10 transition-colors">
      <h2 className="text-xs uppercase tracking-[0.2em] font-bold mb-16 text-gray-500 dark:text-white/40">{t('Core Value Proposition / 核心价值', 'Core Value Proposition')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-black dark:divide-white/10">
        {caps.map((cap, i) => (
          <motion.div 
            key={cap.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="md:px-8 first:pl-0 last:pr-0 py-8 md:py-0 group"
          >
            <div className="mb-6 p-3 w-fit border border-black dark:border-white/20 rounded-lg group-hover:bg-black dark:group-hover:bg-white dark:group-hover:text-black group-hover:text-white transition-colors duration-300">
              <cap.icon size={20} className="dark:text-white group-hover:dark:text-black" />
            </div>
            <h3 className="text-xl mb-4 dark:text-white">{cap.title}</h3>
            <div className="text-5xl font-display mb-4 text-brand-accent">
              {cap.metric || cap.member}
            </div>
            <p className="text-sm opacity-60 dark:text-white/60 leading-relaxed max-w-[280px]">
              {cap.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
