import React from 'react';
import { 
  Bell, 
  Filter, 
  Search, 
  Download,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const mockUpdates = [
  { company: 'Adobe', role: 'SDE', type: 'FTE', stipend: '—', package: '—', c_normal: '8.0', c_internal: '8.3', branches: 'COE, COPC, ENC, ECE, EIC, IT' },
  { company: 'Atlassian', role: 'SDE', type: 'FTE', stipend: '—', package: '—', c_normal: '8.5', c_internal: '8.8', branches: 'COE, IT, ECE, EIC, ENC' },
  { company: 'Rubrik', role: 'SDE Intern', type: 'Internship', stipend: '₹ 2.00 LPM', package: '—', c_normal: '7.5', c_internal: '8.0', branches: 'COE, IT, ECE, EE, ENC, COPC' },
  { company: 'Deloitte', role: 'Data Analyst', type: 'FTE', stipend: '—', package: '—', c_normal: '7.0', c_internal: '7.5', branches: 'COE, ENC, ECE, IT, COPC' },
  { company: 'ZS Associates', role: 'Decision Analyst', type: 'FTE', stipend: '—', package: '—', c_normal: '7.0', c_internal: '7.5', branches: 'COE, COPC, ENC, IT, ECE' },
  { company: 'Microsoft', role: 'SDE', type: 'FTE', stipend: '—', package: '—', c_normal: '8.5', c_internal: '8.8', branches: 'COE, COPC, ECE, ENC, EIC' },
  { company: 'Amazon', role: 'SDE', type: 'FTE', stipend: '—', package: '—', c_normal: '8.0', c_internal: '8.5', branches: 'COE, IT, ECE, EE, ENC, COPC' },
  { company: 'Samsung', role: 'SDE Intern', type: 'Internship', stipend: '₹ 1.80 LPM', package: '—', c_normal: '7.0', c_internal: '7.5', branches: 'COE, ECE, IT, ENC' },
  { company: 'Goldman Sachs', role: 'Analyst', type: 'FTE', stipend: '—', package: '—', c_normal: '8.5', c_internal: '8.8', branches: 'COE, ECE, ENC, IT, COPC' },
  { company: 'Cisco', role: 'SDE', type: 'FTE', stipend: '—', package: '—', c_normal: '7.5', c_internal: '8.0', branches: 'COE, IT, ECE, ENC' },
];

const FilterSelect = ({ label, options }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-text-secondary">{label}</label>
    <select className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none appearance-none cursor-pointer">
      {options.map((opt, i) => <option key={i}>{opt}</option>)}
    </select>
  </div>
);

export default function PlacementUpdates() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto h-full">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-1">Placement Updates</h1>
          <p className="text-sm text-text-secondary">Stay updated with the latest placement opportunities and drives.</p>
        </div>
        <button className="flex items-center gap-2 bg-surface-highlight border border-border hover:border-text-secondary text-text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Bell className="w-4 h-4" /> Notify Me
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-surface-highlight border border-border rounded-xl p-4 flex flex-wrap items-end gap-4">
        <FilterSelect label="Type" options={['All Types', 'FTE', 'Internship']} />
        <FilterSelect label="Role" options={['All Roles', 'SDE', 'Analyst']} />
        <FilterSelect label="Branches" options={['All Branches', 'COE', 'ENC']} />
        <FilterSelect label="CGPA (Normal)" options={['All', '>= 7.0', '>= 8.0']} />
        <FilterSelect label="CGPA (Internal)" options={['All', '>= 7.5', '>= 8.5']} />
        <FilterSelect label="Stipend" options={['All', 'Paid']} />
        <FilterSelect label="Package" options={['All', '> 10 LPA']} />
        
        <div className="flex items-center gap-3 ml-auto">
          <button className="text-sm text-text-secondary hover:text-text-primary px-3 py-2 transition-colors">
            Reset
          </button>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-surface-highlight border border-border rounded-xl flex flex-col flex-1">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
          <span className="text-sm text-text-secondary font-medium">Total Companies: <span className="text-white">42</span></span>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center h-9 rounded-lg bg-surface border border-border px-3">
              <Search className="w-4 h-4 text-text-secondary mr-2" />
              <input 
                type="text" 
                placeholder="Search in table..." 
                className="w-48 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
              />
            </div>
            <button className="flex items-center gap-2 bg-surface border border-border hover:border-text-secondary text-text-primary px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto flex-1 min-h-0">
          <table className="w-full text-left text-sm text-text-secondary relative">
            <thead className="text-xs uppercase bg-surface text-text-secondary sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-3 py-3 font-medium">Company</th>
                <th className="px-3 py-3 font-medium">Role</th>
                <th className="px-3 py-3 font-medium">Type</th>
                <th className="px-3 py-3 font-medium">Stipend</th>
                <th className="px-3 py-3 font-medium">Package</th>
                <th className="px-3 py-3 font-medium text-center border-x border-border/50">
                  <div className="border-b border-border/50 pb-1 mb-1 text-center">CGPA Cutoff</div>
                  <div className="flex justify-between px-1">
                    <span>Normal</span>
                    <span>Internal</span>
                  </div>
                </th>
                <th className="px-3 py-3 font-medium">Branches Allowed (Max 10)</th>
                <th className="px-3 py-3 font-medium text-center">Discussion Link</th>
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
                  <td className="px-3 py-3 border-x border-border/50">
                    <div className="flex justify-between px-1">
                      <span className="text-white whitespace-nowrap">{update.c_normal}</span>
                      <span className="text-white whitespace-nowrap">{update.c_internal}</span>
                    </div>
                  </td>
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

        {/* Pagination */}
        <div className="p-4 border-t border-border flex items-center justify-between">
          <span className="text-sm text-text-secondary">Showing 1 to 10 of 42 companies</span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded bg-surface border border-border text-text-secondary hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-surface border border-border text-text-secondary hover:text-white transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-surface border border-border text-text-secondary hover:text-white transition-colors">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-surface border border-border text-text-secondary hover:text-white transition-colors">4</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-surface border border-border text-text-secondary hover:text-white transition-colors">5</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-surface border border-border text-text-secondary hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
