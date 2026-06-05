

// AICapabilities.tsx
import React from 'react';
import { FeatureCard } from './FeatureCard';

const AICapabilities: React.FC = () => {
  return (
    <section id="ai-capabilities" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-600 mb-3">
            Core Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A49] mb-4 tracking-tight">
            System Core Features & AI Nodes
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-[15px] leading-relaxed">
            Detailed modular inspection of the operational capabilities running natively inside the Medix architecture.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard title="Handwritten Rx Scanner" description="Reads highly complex doctors' handwriting automatically via advanced computer vision models." badge="AI Vision" delay={0.05} />
          <FeatureCard title="Drug Safety (Interactions)" description="Cross-references prescriptions automatically to flag lethal drug combinations or dangerous substance redundancy." badge="Critical Safety" delay={0.1} />
          <FeatureCard title="Intelligent Drug Alternatives" description="Recommends substitute therapeutic options matched strictly by identical molecular active ingredients." badge="Smart Match" delay={0.15} />
          <FeatureCard title="Smart Inventory Integration" description="Monitors inventory nodes in real-time, sending automatic supplier restock orders upon breaking critical thresholds." badge="Core System" delay={0.2} />
          <FeatureCard title="Smart Drug Search Engine" description="Instant querying by commercial or chemical naming conventions, completely resilient to typography spelling faults." badge="Core System" delay={0.25} />
          <FeatureCard title="Dynamic Expiry Trackers" description="Automated structural monitoring of active shelf batches with tiered alerts at 3 months, 1 month, and 1 week thresholds." badge="Automation" delay={0.3} />
          <FeatureCard title="Chronic Disease CRM" description="Maintains continuous treatment schedules for patients to guarantee life-saving medication stability." badge="Patient Care" delay={0.35} />
          <FeatureCard title="Reports & Analytics Ledger" description="Processes heavy inventory velocity logs, sales margins, dead stocks, and overall financial pharmacy health metrics." badge="Enterprise" delay={0.4} />
          <FeatureCard title="Drug Inventory Management" description="Comprehensive CRUD validation architecture for precise tracking of dosage structures and active pricing." badge="Foundational" delay={0.45} />
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <blockquote className="border-l-4 border-[#1B2A49] bg-white p-6 rounded-r-2xl shadow-sm border border-y-slate-100 border-r-slate-100">
            <p className="text-[14px] italic font-medium text-slate-600 leading-relaxed">
              "The smart assistant automates administrative velocity, but the professional pharmacist always remains the supreme authority and final decision-maker."
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default AICapabilities;