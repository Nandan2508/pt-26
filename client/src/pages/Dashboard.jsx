import React from 'react';
import { 
  Building2, 
  MessageCircle, 
  Calendar as CalendarIcon, 
  Calculator,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  XCircle
} from 'lucide-react';

const mockUpdates = [
  { company: 'Adobe', role: 'SDE', type: 'FTE', stipend: '—', package: '₹ 24.00 LPA', c_normal: '8.0', c_internal: '8.3', branches: 'COE, COPC, ENC, ECE, EIC, IT' },
  { company: 'Atlassian', role: 'SDE', type: 'FTE', stipend: '—', package: '₹ 26.50 LPA', c_normal: '8.5', c_internal: '8.8', branches: 'COE, IT, ECE, EIC, ENC' },
  { company: 'Rubrik', role: 'SDE Intern', type: 'Internship', stipend: '₹ 2.00 LPM', package: '—', c_normal: '7.5', c_internal: '8.0', branches: 'COE, IT, ECE, EE, ENC, COPC' },
  { company: 'Deloitte', role: 'Data Analyst', type: 'FTE', stipend: '—', package: '₹ 11.00 LPA', c_normal: '7.0', c_internal: '7.5', branches: 'COE, ENC, ECE, IT, COPC' },
  { company: 'ZS Associates', role: 'Decision Analyst', type: 'FTE', stipend: '—', package: '₹ 15.60 LPA', c_normal: '7.0', c_internal: '7.5', branches: 'COE, COPC, ENC, IT, ECE' },
  { company: 'Microsoft', role: 'SDE', type: 'FTE', stipend: '—', package: '₹ 34.00 LPA', c_normal: '8.5', c_internal: '8.8', branches: 'COE, COPC, ECE, ENC, EIC' },
  { company: 'Amazon', role: 'SDE', type: 'FTE', stipend: '—', package: '₹ 32.00 LPA', c_normal: '8.0', c_internal: '8.5', branches: 'COE, IT, ECE, EE, ENC, COPC' },
  { company: 'Samsung', role: 'SDE Intern', type: 'Internship', stipend: '₹ 1.80 LPM', package: '—', c_normal: '7.0', c_internal: '7.5', branches: 'COE, ECE, IT, ENC' },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-highlight border border-border rounded-xl p-6 flex items-center gap-6">
          <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-text-secondary text-sm font-medium mb-1">Total Companies</span>
            <span className="text-white text-3xl font-bold mb-1">215</span>
            <span className="text-text-secondary text-xs">Companies visited till date</span>
          </div>
        </div>

        <div className="bg-surface-highlight border border-border rounded-xl p-6 flex items-center gap-6">
          <div className="w-16 h-16 rounded-xl bg-warning/20 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-warning" />
          </div>
          <div className="flex flex-col">
            <span className="text-text-secondary text-sm font-medium mb-1">Active Discussions</span>
            <span className="text-white text-3xl font-bold mb-1">48</span>
            <span className="text-text-secondary text-xs">Active company chats</span>
          </div>
        </div>
      </div>

      {/* Latest Placement Updates */}
      <div className="bg-surface-highlight border border-border rounded-xl flex flex-col flex-1">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg text-primary">
              <Briefcase className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-text-primary">Latest Placement Updates</h2>
          </div>
          <a href="/placement-updates" className="text-sm text-primary hover:text-primary-hover flex items-center gap-1 font-medium transition-colors">
            View All Updates <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="overflow-auto flex-1 min-h-0">
          <table className="w-full text-left text-sm text-text-secondary relative">
            <thead className="text-xs uppercase bg-surface text-text-secondary sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-3 py-3 font-medium">Company</th>
                <th className="px-3 py-3 font-medium">Role</th>
                <th className="px-3 py-3 font-medium">Type</th>
                <th className="px-3 py-3 font-medium">Stipend</th>
                <th className="px-3 py-3 font-medium">Package</th>
                <th className="px-3 py-3 font-medium text-center">CGPA Normal</th>
                <th className="px-3 py-3 font-medium text-center">CGPA Internal</th>
                <th className="px-3 py-3 font-medium">Branches Allowed (Max 10)</th>
                <th className="px-3 py-3 font-medium text-center">Discussion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockUpdates.map((update, idx) => (
                <tr key={idx} className="hover:bg-surface/50 transition-colors">
                  <td className="px-3 py-3 font-medium text-white flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-white flex items-center justify-center text-background text-xs font-bold shrink-0">
                      {update.company[0]}
                    </div>
                    <span className="truncate">{update.company}</span>
                  </td>
                  <td className="px-3 py-3">{update.role}</td>
                  <td className="px-3 py-3">{update.type}</td>
                  <td className="px-3 py-3">{update.stipend}</td>
                  <td className="px-3 py-3">{update.package}</td>
                  <td className="px-3 py-3 text-center whitespace-nowrap">{update.c_normal}</td>
                  <td className="px-3 py-3 text-center whitespace-nowrap">{update.c_internal}</td>
                  <td className="px-3 py-3 text-xs" title={update.branches}>{update.branches}</td>
                  <td className="px-3 py-3 text-center">
                    <button className="text-xs px-2 py-1.5 border border-primary/50 hover:border-primary text-primary hover:bg-primary/10 rounded-md flex items-center justify-center gap-1 mx-auto transition-colors whitespace-nowrap">
                      Join <ExternalLink className="w-3 h-3" />
                    </button>
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

// Temporary brief icon component definitions to fix missing imports not in lucide-react directly
function Briefcase(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
}
