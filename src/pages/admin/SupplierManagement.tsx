import React from 'react';
import { CheckCircle2, AlertCircle, FileText, ExternalLink, ShieldCheck } from 'lucide-react';

export default function SupplierManagement() {
  const suppliers = [
    { name: 'Amoun Pharmaceutical Industry', lic: 'LIC-2026-8831', status: 'Approved', region: 'Cairo Zone A', orders: '1,420' },
    { name: 'Eva Pharma Group', lic: 'LIC-2026-0042', status: 'Approved', region: 'Giza Hub', orders: '890' },
    { name: 'Novartis Egypt S.A.E', lic: 'LIC-2026-9911', status: 'Pending Review', region: 'Alexandria', orders: '0 (New)' },
    { name: 'Pharco Pharmaceuticals', lic: 'LIC-2026-1152', status: 'Suspended Docs', region: 'Delta Sector', orders: '310' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-[#1b2a49]">Supplier Verification</h1>
        <p className="text-xs text-slate-400 font-medium mt-1">Audit medical licenses, company commercial registries and pharmaceutical supply chains.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {suppliers.map((sup, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(27,42,73,0.01)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl mt-0.5 ${sup.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : sup.status === 'Pending Review' ? 'bg-amber-50 text-amber-500' : 'bg-rose-50 text-rose-500'}`}>
                {sup.status === 'Approved' ? <CheckCircle2 size={22} /> : <AlertCircle size={22} />}
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#1b2a49] flex items-center gap-2">
                  {sup.name}
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono">{sup.lic}</span>
                </h3>
                <p className="text-xs text-slate-400 font-medium">Logistics Center: {sup.region} • Fulfilled Trades: {sup.orders}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button className="flex items-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl px-3 py-2 text-xs font-bold transition-colors">
                <FileText size={14} /> View Docs
              </button>
              {sup.status !== 'Approved' && (
                <button className="flex items-center gap-1.5 bg-[#3B81B7] hover:bg-[#2c638c] text-white rounded-xl px-3 py-2 text-xs font-bold transition-all shadow-xs">
                  <ShieldCheck size={14} /> Grant Access
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}