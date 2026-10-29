import React from 'react';
import { Search, Plus, MoreVertical, ShieldCheck, UserMinus, ToggleLeft } from 'lucide-react';

export default function UserManagement() {
  const users = [
    { name: 'Dr. Ahmed Khaled', email: 'ahmed@pharmacy.com', role: 'Pharmacist', status: 'Active', pharmacy: 'El-Ezaby Pharmacy' },
    { name: 'Amoun Pharmaceutical', email: 'orders@amoun.com', role: 'Supplier', status: 'Active', pharmacy: 'HQ Global' },
    { name: 'Dr. Sara Aly', email: 'sara@medix.com', role: 'Admin', status: 'Active', pharmacy: 'System Board' },
    { name: 'Eva Pharma Egypt', email: 'contact@eva.com', role: 'Supplier', status: 'Pending Verification', pharmacy: 'Alexandria Branch' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1b2a49]">User Management</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Control system privileges, verify logs and configure access groups.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-[#3B81B7] hover:bg-[#2c638c] text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-xs transition-all self-start sm:self-auto">
          <Plus size={16} /> Add New User
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(27,42,73,0.02)] overflow-hidden">
        <div className="p-5 border-b border-slate-50 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search by name, email..." className="w-full bg-[#F8FAFC] border border-transparent rounded-full py-2 pl-10 pr-4 text-xs font-medium text-[#1b2a49] focus:outline-none focus:bg-white focus:border-slate-200 transition-all" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase">
                <th className="py-3 px-6">User / Company</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Affiliation / Scope</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm font-medium text-[#1b2a49]">
              {users.map((u, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <h4 className="font-bold text-[#1b2a49]">{u.name}</h4>
                      <p className="text-xs text-slate-400 font-normal mt-0.5">{u.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${u.role === 'Admin' ? 'bg-purple-100 text-purple-700' : u.role === 'Supplier' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>{u.role}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-500 font-normal text-xs">{u.pharmacy}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold ${u.status === 'Active' ? 'text-emerald-600' : 'text-amber-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-400'}`} /> {u.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors" title="Edit Permissions"><ShieldCheck size={16} /></button>
                      <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-rose-600 transition-colors" title="Deactivate Account"><UserMinus size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}