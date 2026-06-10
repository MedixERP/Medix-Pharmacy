// src/components/ui/FormElements.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  subLabel?: string;
}

export const FormInput: React.FC<InputProps> = ({ label, required, subLabel, ...props }) => (
  <div className="space-y-1.5 w-full text-left">
    <label className="text-xs font-bold text-[#1b2a49]">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <input
      {...props}
      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 transition-all shadow-sm placeholder:text-slate-300"
    />
    {subLabel && <span className="text-[10px] text-slate-400 block font-medium mt-0.5">{subLabel}</span>}
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  required?: boolean;
  options: string[];
}

export const FormSelect: React.FC<SelectProps> = ({ label, required, options, ...props }) => (
  <div className="space-y-1.5 w-full text-left">
    <label className="text-xs font-bold text-[#1b2a49]">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <select
      {...props}
      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 text-[#1b2a49] font-medium transition-all shadow-sm"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);