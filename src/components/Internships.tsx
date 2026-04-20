import { motion } from 'motion/react';
import { INTERNSHIPS } from '../constants';
import { ArrowUpRight, Briefcase } from 'lucide-react';

export default function Internships() {
  return (
    <section id="internships" className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-brand-accent/10 text-brand-accent">
              <Briefcase size={16} />
            </div>
            <h2 className="text-xs uppercase tracking-[0.2em] font-extrabold text-brand-accent">Internship Journey</h2>
          </div>
          <h3 className="text-5xl md:text-7xl font-extrabold tracking-tight">Work that <span className="text-brand-accent italic">matters</span>.</h3>
        </div>
        <p className="text-brand-text/50 max-w-sm text-sm font-medium">
          A collection of high-impact internships where I combined product thinking with AIGC capabilities.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {INTERNSHIPS.map((job, i) => (
          <motion.div 
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className="group glass rounded-[40px] p-8 md:p-10 flex flex-col h-full hover:shadow-2xl hover:shadow-brand-accent/5 transition-all duration-500"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-accent/5 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-500">
                <Briefcase size={20} />
              </div>
              <ArrowUpRight className="text-brand-text/20 group-hover:text-brand-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={24} />
            </div>

            <div className="mb-auto">
              <h4 className="text-2xl font-bold mb-2 group-hover:text-brand-accent transition-colors">{job.company}</h4>
              <p className="text-xs font-extrabold text-brand-text/40 uppercase tracking-widest mb-6">{job.role}</p>
              
              <ul className="space-y-4 mb-10">
                {job.highlights.map((h, i) => (
                  <li key={i} className="text-sm font-medium text-brand-text/70 leading-relaxed flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent/40 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-8 border-t border-black/5 flex items-center justify-between">
              {job.results.map((r, idx) => (
                <div key={idx}>
                  <div className="text-[9px] uppercase font-extrabold text-brand-text/30 mb-1">{r.label}</div>
                  <div className="text-2xl font-display text-brand-accent">{r.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
