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
      <div className="bg-surface-highlight border border-border rounded-xl flex flex-col">
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
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-text-secondary">
            <thead className="text-xs uppercase bg-surface text-text-secondary">
              <tr>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Stipend (Internship)</th>
                <th className="px-6 py-4 font-medium">Package (FTE)</th>
                <th className="px-6 py-4 font-medium text-center">CGPA Normal</th>
                <th className="px-6 py-4 font-medium text-center">CGPA Internal</th>
                <th className="px-6 py-4 font-medium">Branches Allowed (Max 10)</th>
                <th className="px-6 py-4 font-medium text-center">Discussion Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockUpdates.map((update, idx) => (
                <tr key={idx} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-white flex items-center justify-center text-background text-xs font-bold">
                      {update.company[0]}
                    </div>
                    {update.company}
                  </td>
                  <td className="px-6 py-4">{update.role}</td>
                  <td className="px-6 py-4">{update.type}</td>
                  <td className="px-6 py-4">{update.stipend}</td>
                  <td className="px-6 py-4">{update.package}</td>
                  <td className="px-6 py-4 text-center">{update.c_normal}</td>
                  <td className="px-6 py-4 text-center">{update.c_internal}</td>
                  <td className="px-6 py-4 truncate max-w-[200px]" title={update.branches}>{update.branches}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-xs px-3 py-1.5 border border-border hover:border-primary text-text-primary rounded-md flex items-center justify-center gap-2 mx-auto transition-colors whitespace-nowrap">
                      Join Discussion <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Grid: Calendar | Eligibility | Discussions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upcoming Calendar */}
        <div className="bg-surface-highlight border border-border rounded-xl flex flex-col h-96">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-lg text-primary">
                <CalendarIcon className="w-5 h-5" />
              </div>
              <h2 className="text-base font-semibold text-text-primary">Upcoming in Calendar</h2>
            </div>
            <a href="/placement-calendar" className="text-xs text-primary hover:text-primary-hover flex items-center gap-1 font-medium transition-colors">
              View Calendar <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            {/* Event 1 */}
            <div className="flex gap-4 p-3 bg-surface border border-border rounded-lg">
              <div className="flex flex-col items-center justify-center text-center w-12 border-r border-border pr-4">
                <span className="text-xl font-bold text-white">20</span>
                <span className="text-xs text-text-secondary uppercase">May</span>
              </div>
              <div className="flex flex-col flex-1 justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-white">Adobe</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">Registration Ends</span>
                </div>
                <span className="text-xs text-text-secondary">All Day</span>
              </div>
            </div>
            {/* Event 2 */}
            <div className="flex gap-4 p-3 bg-surface border border-border rounded-lg">
              <div className="flex flex-col items-center justify-center text-center w-12 border-r border-border pr-4">
                <span className="text-xl font-bold text-white">28</span>
                <span className="text-xs text-text-secondary uppercase">May</span>
              </div>
              <div className="flex flex-col flex-1 justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-white">Atlassian</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">OA Round</span>
                </div>
                <span className="text-xs text-text-secondary">All Day</span>
              </div>
            </div>
          </div>
        </div>

        {/* Eligibility Simulator */}
        <div className="bg-surface-highlight border border-border rounded-xl flex flex-col h-96">
          <div className="p-5 border-b border-border flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg text-primary">
              <Calculator className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-text-primary">Eligibility Simulator</h2>
          </div>
          <div className="p-5 flex flex-col flex-1">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-surface border border-border p-3 rounded-lg">
                <label className="text-xs text-text-secondary block mb-1">Normal CGPA</label>
                <input type="text" defaultValue="8.24" className="bg-transparent text-white font-medium w-full outline-none" />
              </div>
              <div className="bg-surface border border-border p-3 rounded-lg">
                <label className="text-xs text-text-secondary block mb-1">Internal CGPA</label>
                <input type="text" defaultValue="8.63" className="bg-transparent text-white font-medium w-full outline-none" />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="text-xs text-text-secondary block mb-2">Select Branches (Upto 10)</label>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2 py-1 rounded bg-primary text-white border border-primary">COE ✓</span>
                <span className="text-xs px-2 py-1 rounded bg-primary text-white border border-primary">COPC ✓</span>
                <span className="text-xs px-2 py-1 rounded bg-surface border border-border text-text-secondary hover:text-white cursor-pointer transition-colors">ENC</span>
                <span className="text-xs px-2 py-1 rounded bg-surface border border-border text-text-secondary hover:text-white cursor-pointer transition-colors">ECE</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-auto mb-4">
              <div className="bg-success/10 border border-success/20 rounded-lg p-3 text-center flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1 text-success">
                  <CheckCircle2 className="w-3 h-3" /> <span className="text-[10px] font-medium uppercase">Eligible</span>
                </div>
                <span className="text-lg font-bold text-white leading-none mb-1">12</span>
                <span className="text-[10px] text-text-secondary">Companies</span>
              </div>
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 text-center flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1 text-warning">
                  <AlertTriangle className="w-3 h-3" /> <span className="text-[10px] font-medium uppercase">Near</span>
                </div>
                <span className="text-lg font-bold text-white leading-none mb-1">6</span>
                <span className="text-[10px] text-text-secondary">Companies</span>
              </div>
              <div className="bg-danger/10 border border-danger/20 rounded-lg p-3 text-center flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1 text-danger">
                  <XCircle className="w-3 h-3" /> <span className="text-[10px] font-medium uppercase">Not Elig.</span>
                </div>
                <span className="text-lg font-bold text-white leading-none mb-1">8</span>
                <span className="text-[10px] text-text-secondary">Companies</span>
              </div>
            </div>

            <button className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg transition-colors">
              Check Eligibility
            </button>
          </div>
        </div>

        {/* Popular Discussions */}
        <div className="bg-surface-highlight border border-border rounded-xl flex flex-col h-96">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-lg text-primary">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h2 className="text-base font-semibold text-text-primary">Popular Discussions</h2>
            </div>
            <a href="/discussion" className="text-xs text-primary hover:text-primary-hover flex items-center gap-1 font-medium transition-colors">
              View All <ArrowRight className="w-3 h-3" />
            </a>
          </div>
          <div className="flex-1 p-5 overflow-y-auto">
            <ul className="space-y-4">
              {['adobe', 'atlassian', 'rubrik', 'deloitte', 'zs-associates'].map((tag, idx) => (
                <li key={tag} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-2">
                    <span className="text-text-secondary font-medium">#</span>
                    <span className="text-sm font-medium text-white group-hover:text-primary transition-colors">{tag}</span>
                  </div>
                  <span className="text-xs text-text-secondary bg-surface px-2 py-1 rounded-md border border-border">
                    {Math.floor(Math.random() * 100) + 10} new messages
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 border-t border-border">
            <a href="/discussion" className="text-sm text-primary hover:text-primary-hover font-medium flex items-center transition-colors">
              Go to Discussion Hub <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

// Temporary brief icon component definitions to fix missing imports not in lucide-react directly
function Briefcase(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
}
