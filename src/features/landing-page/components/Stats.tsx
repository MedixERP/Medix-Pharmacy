'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { LuBrain, LuScanLine, LuShieldCheck, LuCloudOff } from 'react-icons/lu';

const CIRC = 2 * Math.PI * 35;

const stats = [
  { id: 1, index: '01', value: '99.4%', label: 'AI Rx Accuracy', note: 'Based on vision models', pill: 'Verified', progress: 0.994, icon: LuBrain },
  { id: 2, index: '02', value: '<200ms', label: 'Barcode Speed', note: 'Real-time camera scanner', pill: 'Live', progress: 0.88, icon: LuScanLine },
  { id: 3, index: '03', value: '100%', label: 'Clinical Safety', note: 'Cross-reference engine', pill: 'Secure', progress: 1.0, icon: LuShieldCheck },
  { id: 4, index: '04', value: '0 Lost', label: 'Offline Engine', note: 'Syncs on reconnect', pill: 'Synced', progress: 1.0, icon: LuCloudOff },
];

const Ring: React.FC<{ progress: number; animate: boolean; delay: number }> = ({ progress, animate, delay }) => {
  const [offset, setOffset] = useState(CIRC);
  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setOffset(CIRC * (1 - progress)), delay);
    return () => clearTimeout(t);
  }, [animate, progress, delay]);

  return (
    <svg className="w-16 h-16 -rotate-90" viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r="35" fill="none" stroke="#f1f5f9" strokeWidth="3" />
      <circle cx="40" cy="40" r="35" fill="none" stroke="#1B2A49" strokeWidth="3.5" strokeLinecap="round"
        strokeDasharray={CIRC} strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1.2s ease-out' }} />
    </svg>
  );
};

const StatCard: React.FC<{ stat: typeof stats[0]; index: number }> = ({ stat, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative flex flex-col items-center text-center p-6 border-b sm:border-b-0 sm:border-r border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors duration-300"
    >
      <span className="font-mono text-[10px] tracking-widest text-slate-400 mb-4 uppercase">{stat.index}</span>

      <div className="relative w-16 h-16 mx-auto mb-4">
        <Ring progress={stat.progress} animate={inView} delay={index * 100} />
        <Icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-600" size={20} />
      </div>

      <p className="text-2xl sm:text-3xl font-bold tracking-tight mb-1 text-[#1B2A49]">
        {stat.value}
      </p>
      <p className="text-[12px] font-bold text-slate-700 mb-1">{stat.label}</p>
      <p className="text-[11px] text-slate-400 mb-3">{stat.note}</p>
      <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-600">
        {stat.pill}
      </span>
    </motion.div>
  );
};

const Stats: React.FC = () => (
  <section className="relative bg-white border-y border-slate-200/60 py-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-0">
        {stats.map((s, i) => <StatCard key={s.id} stat={s} index={i} />)}
      </div>
    </div>
  </section>
);

export default Stats;