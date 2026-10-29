import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How does the system operate if network connectivity fails?',
    a: 'Medix features a fully decoupled offline sales ledger engine. Transactions continue directly inside the client workspace browser and automatically sync with the central database the moment connectivity is restored.'
  },
  {
    q: 'How does the computer vision model extract drug data safely?',
    a: 'The Vision AI maps character geometry against known regional drug dictionaries. It provides an explicit Confidence Score alongside extracted drugs, guaranteeing the pharmacist can review and manually adjust entries anytime.'
  },
  {
    q: 'Is Medix capable of orchestrating multiple physical branches?',
    a: 'Yes. The central Admin interface aggregates data from all connected localized pharmacy systems into a singular relational database model, providing absolute oversight on stock movements across distinct locations.'
  }
];

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="block text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-600 mb-3">
            Technical FAQ
          </span>
          <h2 className="text-3xl font-bold text-[#1B2A49] mb-3 tracking-tight">
            Common Questions
          </h2>
          <p className="text-slate-500 text-[14px]">Deep architectural insights into the Medix ecosystem.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="border border-slate-200/80 bg-slate-50 rounded-xl overflow-hidden transition-colors duration-200">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-100/50 transition-colors duration-150 cursor-pointer"
                >
                  <span className="text-[14px] font-bold text-[#1B2A49] pr-4 leading-snug">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-cyan-600' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 text-[13px] text-slate-600 font-medium leading-relaxed border-t border-slate-200/40 pt-4 bg-white">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;