import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Activity, Pill, Truck, LayoutDashboard } from 'lucide-react';

const rolesData = [
  {
    id: 'pharmacist',
    icon: <Pill className="w-5 h-5" />,
    name: 'Pharmacist / Seller',
    title: 'Next-Gen Clinical Point of Sale',
    desc: 'The clinical heart of Medix. Bridging the gap between standard retail transactions and patient-first safety protocols.',
    bullets: [
      'Ultra-fast Web/Mobile POS with auto inventory deduction.',
      'Instant handwritten prescription interpretation via Vision AI.',
      'Real-time alternative suggestions & cross-drug interaction alerts.'
    ]
  },
  {
    id: 'admin',
    icon: <ShieldAlert className="w-5 h-5" />,
    name: 'Admin / Manager',
    title: 'Centralized Control & Advanced Governance',
    desc: 'Empowering system owners to oversee multi-branch operations, manage configurations, and audit entire clinical logs.',
    bullets: [
      'User management & role permissions architecture.',
      'High-level operational audits & dynamic configuration control.',
      'Comprehensive system architecture monitoring.'
    ]
  },
  {
    id: 'supplier',
    icon: <Truck className="w-5 h-5" />,
    name: 'Supplier Corporation',
    title: 'Automated Supply Chain Node',
    desc: 'Direct integration with medical production lines and pharmaceutical distributors to prevent local market shortage drops.',
    bullets: [
      'Real-time procurement & inbound bulk order streaming workflows.',
      'Order dispatch tracking with synchronized pharmacy stocks.',
      'Automated batch assignment & expiration date ledger ingestion.'
    ]
  },
  {
    id: 'patient',
    icon: <Activity className="w-5 h-5" />,
    name: 'Chronic Patient',
    title: 'Patient-First Care Ledger',
    desc: 'Ensuring life-saving medical dependencies are mapped, personalized, and proactively stocked before critical thresholds.',
    bullets: [
      'Personalized chronic medication management profile.',
      'Automated allocation preventing emergency local supply exhaustion.',
      'Refill alerts and timeline logs synchronization.'
    ]
  },
  {
    id: 'landing',
    icon: <LayoutDashboard className="w-5 h-5" />,
    name: 'Public Landing Page',
    title: 'Enterprise Business Showcase',
    desc: 'Your public gateway. Built decoupled from internal dashboards to guarantee high search performance and clear product marketing.',
    bullets: [
      'Fully SEO optimized lightweight structure with code-splitting.',
      'Comprehensive visual documentation of system modules and phases.',
      'Seamless onboarding paths for pharmacies, suppliers, and managers.'
    ]
  }
];

const RolesOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pharmacist');
  const activeData = rolesData.find((r) => r.id === activeTab)!;

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-600 mb-3">
            System Architecture
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A49] mb-4 tracking-tight">
            Multi-Role Ecosystem
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-[15px] leading-relaxed">
            Five specialized access layers unified into a single relational database, creating harmony across all pharmacy channels.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Tabs */}
          <div className="w-full lg:w-[300px] flex flex-col gap-2.5 shrink-0">
            {rolesData.map((role) => {
              const isActive = activeTab === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setActiveTab(role.id)}
                  className={`flex items-center gap-3.5 p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer ${
                    isActive
                      ? 'border-[#1B2A49] bg-white shadow-sm text-[#1B2A49]'
                      : 'border-slate-200/60 bg-transparent text-slate-500 hover:bg-white/60 hover:text-slate-800'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${isActive ? 'bg-[#1B2A49] text-white' : 'bg-slate-200/60 text-slate-600'}`}>
                    {role.icon}
                  </div>
                  <span className="font-bold text-sm">{role.name}</span>
                </button>
              );
            })}
          </div>

          {/* Content Box */}
          <div className="flex-1 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 min-h-[380px] flex flex-col justify-center relative shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full">
                    Role Configuration
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1B2A49] mt-5 mb-3">{activeData.title}</h3>
                  <p className="text-slate-500 text-[14px] leading-relaxed">{activeData.desc}</p>
                </div>

                <ul className="space-y-3.5">
                  {activeData.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-cyan-500 mt-[6px] shrink-0" />
                      <span className="text-sm font-medium text-slate-600 leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RolesOverview;