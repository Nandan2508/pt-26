import React from 'react';
import { 
  Search, 
  ExternalLink,
  Info,
  BookOpen
} from 'lucide-react';

const mockResources = [
  { company: 'Adobe', role: 'SDE' },
  { company: 'Atlassian', role: 'SDE' },
  { company: 'Rubrik', role: 'SDE' },
  { company: 'ZS Associates', role: 'Decision Analyst' },
  { company: 'Deloitte', role: 'Data Analyst' },
  { company: 'Microsoft', role: 'SDE' },
  { company: 'JP Morgan', role: 'Software Engineer' },
  { company: 'American Express', role: 'SDE' },
  { company: 'Goldman Sachs', role: 'Analyst' },
  { company: 'Qualcomm', role: 'SDE' },
];

export default function InterviewResources() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto h-full">
      {/* Header section with graphic block placeholder */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-surface-highlight border border-border rounded-xl p-8">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h1 className="text-2xl font-bold text-white">PYQ Resources</h1>
          <p className="text-sm text-text-secondary">Access company-wise interview questions. All resources are hosted on external platforms.</p>
        </div>
        <div className="hidden md:flex items-center justify-center w-40 h-32 bg-surface rounded-xl border border-border relative">
          <BookOpen className="w-16 h-16 text-primary opacity-50 absolute" />
          <div className="w-full h-full bg-gradient-to-tr from-primary/10 to-transparent rounded-xl"></div>
        </div>
      </div>

      <div className="bg-surface-highlight border border-border rounded-xl flex flex-col flex-1 min-h-0">
        
        {/* Filters */}
        <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search company or role..." 
              className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-text-secondary outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex gap-4">
            <select className="bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none cursor-pointer min-w-[150px]">
              <option>All Roles</option>
              <option>SDE</option>
              <option>Data Analyst</option>
            </select>
            <select className="bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none cursor-pointer min-w-[150px]">
              <option>All Types</option>
              <option>Internship</option>
              <option>FTE</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto flex-1 min-h-0">
          <table className="w-full text-left text-sm text-text-secondary relative">
            <thead className="text-xs uppercase bg-surface text-text-secondary sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium text-right pr-12">Interview Questions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockResources.map((item, idx) => (
                <tr key={idx} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-background text-sm font-bold shrink-0">
                      {item.company[0]}
                    </div>
                    {item.company}
                  </td>
                  <td className="px-6 py-4">{item.role}</td>
                  <td className="px-6 py-4 text-right pr-6">
                    <button className="text-xs px-4 py-2 border border-primary/30 hover:border-primary text-primary hover:bg-primary/10 rounded-lg flex items-center justify-center gap-2 ml-auto transition-colors whitespace-nowrap">
                      View Interview Questions <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-4 border-t border-border flex items-center justify-between">
          <span className="text-xs text-text-secondary">Showing 1 to 10 of 24 companies</span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:bg-surface text-sm transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:bg-surface text-sm transition-colors">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:bg-surface text-sm transition-colors">&gt;</button>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5 text-text-secondary text-xs">
        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p>All links will open in a new tab and redirect you to external platforms (like TietPrep). Make sure you are logged in there to view the content.</p>
      </div>

    </div>
  );
}
