import React from 'react';
import { Mail, Phone, MapPin, Code, HeartPulse } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="project-scope" className="bg-[#1B2A49] text-slate-300 pt-20 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1B2A49] font-bold text-lg shadow-md">
                M
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">Medix</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 font-medium">
              Transforming pharmacy management with Next-Gen UI, Mobile POS, and Artificial Intelligence. Built for speed, safety, and scale.
            </p>
          </div>

          {/* Core Links */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase tracking-wider text-xs">Navigation</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-400">
              <li><a href="#home" className="hover:text-cyan-400 transition-colors">Hero Overview</a></li>
              <li><a href="#core-features" className="hover:text-cyan-400 transition-colors">Phase Timeline</a></li>
              <li><a href="#ai-capabilities" className="hover:text-cyan-400 transition-colors">AI & Clinical Safety</a></li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase tracking-wider text-xs">Powered By</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-400">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> React.js & TypeScript</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" /> Tailwind CSS v4</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-purple-400 rounded-full" /> Framer Motion</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Node.js & Machine Learning</li>
            </ul>
          </div>

          {/* Organization */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase tracking-wider text-xs">Organization</h4>
            <ul className="space-y-3 text-sm font-medium text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Faculty of Computers and Information Technology</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="mailto:support@medix-system.local" className="hover:text-white transition-colors">support@medix-system.local</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Enterprise Dashboard</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Medix. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <HeartPulse className="w-3.5 h-3.5 text-rose-500" /> by the Medix Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;