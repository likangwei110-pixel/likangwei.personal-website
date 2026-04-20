import { motion } from 'motion/react';
import { Target, Zap, Globe } from 'lucide-react';

const CAPABILITIES = [
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

export default function Interpolation() {
  return (
    <section className="py-24 px-6 md:px-12 border-b border-black">
      <h2 className="text-xs uppercase tracking-[0.2em] font-bold mb-16 text-gray-500">Core Value Proposition / 核心价值</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-black">
        {CAPABILITIES.map((cap, i) => (
          <motion.div 
            key={cap.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="md:px-8 first:pl-0 last:pr-0 py-8 md:py-0 group"
          >
            <div className="mb-6 p-3 w-fit border border-black rounded-lg group-hover:bg-black group-hover:text-white transition-colors duration-300">
              <cap.icon size={20} />
            </div>
            <h3 className="text-xl mb-4">{cap.title}</h3>
            <div className="text-5xl font-display mb-4 text-accent">
              {cap.metric || cap.member}
            </div>
            <p className="text-sm opacity-60 leading-relaxed max-w-[280px]">
              {cap.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
