import React from 'react';
import { BarChart3, ShieldAlert, Terminal, RefreshCw, FileSpreadsheet } from 'lucide-react';

export default function Reports() {
  const serverLogs = [
    { event: 'Database Backup Completed Successfully', type: 'INFO', server: 'Node-02', time: '00:05 AM' },
    { event: 'Failed API Token Authorization Attempt', type: 'WARN', server: 'Gateway-Auth', time: 'Yesterday, 11:42 PM' },
    { event: 'CORS policy block on asset distribution endpoint', type: 'ERROR', server: 'Edge-CDN', time: 'Yesterday, 09:12 PM' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1b2a49]">System Analytics & Audit Logs</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Real-time terminal errors tracking, telemetry stats and compliance exports.</p>
        </div>
        <button className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold bg-white transition-colors self-start sm:self-auto">
          <FileSpreadsheet size={16} /> Export System Report (Excel)
        </button>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(27,42,73,0.02)]">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><BarChart3 size={16} className="text-blue-500" /> Platform Transaction Volume</h3>
          <div className="h-40 bg-[#F8FAFC] rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-xs text-slate-400 font-medium">
            [Interactive Chart: 324,500 EGP Gross Volume This Month]
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(27,42,73,0.02)]">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2"><ShieldAlert size={16} className="text-rose-500" /> Security Telemetry Status</h3>
          <div className="h-40 bg-[#F8FAFC] rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-xs text-slate-400 font-medium">
            [99.98% Server Uptime • 0 Critical Security Infractions]
          </div>
        </div>
      </div>

      {/* Terminal Live Logs */}
      <div className="bg-[#1e293b] rounded-2xl shadow-xl overflow-hidden font-mono text-xs text-slate-300">
        <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center justify-between">
          <span className="flex items-center gap-2 text-slate-400 font-bold"><Terminal size={14} /> live_server_stream.log</span>
          <button className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"><RefreshCw size={12} /> Refresh Stream</button>
        </div>
        <div className="p-5 space-y-3 max-h-64 overflow-y-auto">
          {serverLogs.map((log, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <span className={`font-bold px-1.5 py-0.5 rounded text-[10px] ${log.type === 'ERROR' ? 'bg-rose-900/50 text-rose-400 border border-rose-800' : log.type === 'WARN' ? 'bg-amber-900/50 text-amber-400 border border-amber-800' : 'bg-slate-700 text-slate-300'}`}>{log.type}</span>
              <span className="text-slate-400 text-[11px] select-none">[{log.time}]</span>
              <span className="text-slate-500 font-bold select-none">&lt;{log.server}&gt;</span>
              <span className="text-slate-200 flex-1">{log.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}