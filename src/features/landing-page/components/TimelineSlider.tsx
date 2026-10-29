import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const phases = [
  {
    id: 'v1',
    title: 'Version 1: Core MVP System',
    description: 'The foundational structure focusing on inventory, drugs, and operational management.',
    image: 'https://images.unsplash.com/photo-1555633514-abcee6ab92e1?auto=format&fit=crop&w=800&q=80',
    features: [
      'Smart Inventory Management: Real-time stock tracking, automated alerts.',
      'Drug Management: Complete CRUD operation tracking for pharmacists.',
      'Smart Drug Search: Auto-correcting spelling mistakes.',
      'Core Auth & Supplier Orders Management.'
    ]
  },
  {
    id: 'v2',
    title: 'Version 2: Sales Engine & POS',
    description: 'Introducing ultra-fast checkout and mobile POS to drive daily pharmacy sales.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    features: [
      'High-Speed Mobile POS: Camera-based barcode scanning to process instant bills.',
      'Checkout Panel: Flexible payment logic, automatic inventory deduction.'
    ]
  },
  {
    id: 'v3',
    title: 'Version 3: Enterprise & Intelligence',
    description: 'Advanced analytics and enterprise-grade procurement workflows.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    features: [
      'Advanced Procurement & Batches tracking with expiry alerts.',
      'Comprehensive Admin Dashboard Analytics.'
    ]
  }
];

const TimelineSlider: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] });
  const pathHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="core-features" className="py-32 bg-[#f8fafc] relative overflow-hidden">
      {/* Subtle top edge to match hero */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[11px] font-mono uppercase tracking-[0.25em] text-cyan-600 mb-4">
              Development Roadmap
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1B2A49] mb-5">
              System Evolution & Core Phases
            </h2>
            <p className="text-[15px] text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Built incrementally — ensuring stability, scalability, and robust feature rollout at every stage.
            </p>
          </motion.div>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Animated Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 transform md:-translate-x-1/2 rounded-full overflow-hidden">
            <motion.div style={{ height: pathHeight }} className="w-full bg-gradient-to-b from-[#1B2A49] via-cyan-500 to-cyan-400 rounded-full" />
          </div>

          <div className="space-y-24">
            {phases.map((phase, index) => (
              <div key={phase.id} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-white border-[3px] border-[#1B2A49] shadow-md z-10">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="w-full md:w-1/2 pl-12 md:pl-0"
                >
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-slate-100 hover:border-cyan-200/60 transition-all duration-300 group relative overflow-hidden cursor-pointer ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}
                  >
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#1B2A49] to-cyan-500 group-hover:w-full transition-all duration-500 rounded-full" />

                    <div className="inline-flex items-center justify-center px-3.5 py-1 rounded-full bg-slate-100 text-[#1B2A49] text-xs font-bold mb-4 tracking-wide">
                      Phase {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-[#1B2A49] mb-3 group-hover:text-cyan-700 transition-colors">
                      {phase.title}
                    </h3>
                    <p className="text-slate-500 mb-6 text-[14px] leading-relaxed">{phase.description}</p>

                    <ul className="space-y-3.5">
                      {phase.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="mt-1 w-5 h-5 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:border-cyan-500 transition-colors duration-300">
                            <svg className="w-3 h-3 text-cyan-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-[14px] text-slate-600 leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>

                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className={`hidden md:block md:w-1/2 ${index % 2 === 0 ? 'pl-12' : 'pr-12'}`}
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl group cursor-pointer border border-slate-100">
                    <img src={phase.image} alt={phase.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-[#1B2A49]/15 group-hover:bg-[#1B2A49]/5 transition-colors duration-500" />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSlider;