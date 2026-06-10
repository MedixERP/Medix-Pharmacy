// src/components/ui/StatCard.tsx
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subText?: string;
  icon?: React.ReactNode;
  valueColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, subText, icon, valueColor = 'text-[#1b2a49]' }) => (
  <div className="glass-light p-6 rounded-2xl flex flex-col justify-between min-h-[145px] transition-all duration-300 hover:scale-[1.01] hover:shadow-md border border-white/60 text-left">
    {icon && (
      <div className="flex justify-between items-start">
        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 shadow-inner text-slate-600">
          {icon}
        </div>
      </div>
    )}
    <div className={icon ? 'mt-4' : 'mt-1'}>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <h3 className={`text-2xl font-extrabold tracking-tight mt-1 ${valueColor}`}>
        {value} {subText && <span className="text-xs text-slate-400 font-medium">{subText}</span>}
      </h3>
    </div>
  </div>
);