// FeatureCard.tsx
import React from 'react';
import { motion } from 'framer-motion';

export interface FeatureCardProps {
  title: string;
  description: string;
  badge?: string;
  delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, badge, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="p-6 rounded-2xl bg-white border border-slate-200/70 hover:border-cyan-500/40 hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer h-full"
    >
      <div className="flex flex-col h-full">
        {badge && (
          <span className="self-start mb-4 px-2.5 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-full border border-slate-200">
            {badge}
          </span>
        )}
        <h3 className="text-base font-bold text-[#1B2A49] mb-2 group-hover:text-cyan-600 transition-colors">
          {title}
        </h3>
        <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </motion.div>
  );
};