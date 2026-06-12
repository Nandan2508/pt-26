import React, { useState } from 'react';
import { 
  User, 
  Search, 
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Building2,
  BarChart2,
  Users,
  RefreshCw
} from 'lucide-react';

const mockResults = [
  { company: 'Adobe', roles: 'SDE, Data Analyst', c_normal: '8.0', c_internal: '8.3', branches: 'COE, COPC, ENC, ECE, EIC, IT', types: ['FTE', 'Internship'] },
  { company: 'Atlassian', roles: 'SDE, QA, Data Engineer', c_normal: '8.5', c_internal: '8.8', branches: 'COE, IT, ECE, EIC, ENC', types: ['FTE', 'Internship'] },
  { company: 'Rubrik', roles: 'SDE Intern', c_normal: '7.5', c_internal: '8.0', branches: 'COE, IT, ECE, EE, ENC, COPC', types: ['Internship'] },
  { company: 'Deloitte', roles: 'Data Analyst, Consultant', c_normal: '7.0', c_internal: '7.5', branches: 'COE, ENC, ECE, IT, COPC', types: ['FTE'] },
  { company: 'ZS Associates', roles: 'Decision Analyst', c_normal: '7.0', c_internal: '7.5', branches: 'COE, COPC, ENC, IT, ECE', types: ['FTE'] },
];

const branchesList = ['COE', 'COPC', 'ENC', 'ECE', 'EIC', 'IT', 'EE', 'ME', 'CE', 'BT'];

export default function EligibilitySimulator() {
  const [selectedBranches, setSelectedBranches] = useState(['COE', 'COPC', 'ENC', 'ECE']);

  const toggleBranch = (b) => {
    if (selectedBranches.includes(b)) {
      setSelectedBranches(selectedBranches.filter(x => x !== b));
    } else {
      setSelectedBranches([...selectedBranches, b]);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto h-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-1">Eligibility Simulator</h1>
        <p className="text-sm text-text-secondary">Check your eligibility for companies based on CGPA and branch criteria.</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* Left Column: Your Profile */}
        <div className="w-full xl:w-1/3 bg-surface-highlight border border-border rounded-xl flex flex-col p-6 h-fit">
          <div className="flex items-center gap-3 border-b border-border pb-4 mb-6">
            <User className="w-5 h-5 text-text-secondary" />
            <h2 className="text-lg font-semibold text-text-primary">Your Profile</h2>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-text-primary block mb-3">CGPA (Upto 10)</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface border border-border p-3 rounded-lg flex flex-col">
                <label className="text-xs text-text-secondary mb-1">Normal CGPA</label>
                <input type="text" defaultValue="8.24" className="bg-transparent text-white font-medium outline-none" />
              </div>
              <div className="bg-surface border border-border p-3 rounded-lg flex flex-col">
                <label className="text-xs text-text-secondary mb-1">Internal CGPA</label>
                <input type="text" defaultValue="8.63" className="bg-transparent text-white font-medium outline-none" />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="text-sm font-medium text-text-primary block mb-3">Select Your Branches (Upto 10)</label>
            <div className="flex flex-wrap gap-2">
              {branchesList.map(b => {
                const isSelected = selectedBranches.includes(b);
                return (
                  <button 
                    key={b}
                    onClick={() => toggleBranch(b)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm border transition-colors ${
                      isSelected 
                        ? 'bg-primary/20 border-primary text-primary' 
                        : 'bg-surface border-border text-text-secondary hover:text-white hover:border-text-secondary'
                    }`}
                  >
                    {isSelected ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-sm border border-text-secondary/50" />}
                    {b}
                  </button>
                );
              })}
            </div>
          </div>

          <button className="w-full py-3 bg-primary hover:bg-primary-hover flex justify-center items-center gap-2 text-white text-sm font-medium rounded-lg transition-colors mb-4">
            <Search className="w-4 h-4" /> Check Eligibility
          </button>
          
          <div className="flex items-center gap-2 text-text-secondary text-xs mt-auto">
            <Info className="w-4 h-4" /> Eligibility is based on the latest available placement data.
          </div>
        </div>

        {/* Right Column: Eligibility Results */}
        <div className="w-full xl:w-2/3 bg-surface-highlight border border-border rounded-xl p-6 flex flex-col">
          <div className="flex items-center gap-3 border-b border-border pb-4 mb-6">
            <Building2 className="w-5 h-5 text-text-secondary" />
            <h2 className="text-lg font-semibold text-text-primary">Eligibility Results</h2>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-success/10 border border-success/20 rounded-xl p-4 flex flex-col">
              <span className="text-success text-sm font-semibold mb-1">Eligible</span>
              <span className="text-white text-3xl font-bold mb-1">18</span>
              <span className="text-text-secondary text-xs">Companies</span>
            </div>
            <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 flex flex-col">
              <span className="text-warning text-sm font-semibold mb-1">Near Eligible</span>
              <span className="text-white text-3xl font-bold mb-1">7</span>
              <span className="text-text-secondary text-xs">Companies</span>
            </div>
            <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 flex flex-col">
              <span className="text-danger text-sm font-semibold mb-1">Not Eligible</span>
              <span className="text-white text-3xl font-bold mb-1">17</span>
              <span className="text-text-secondary text-xs">Companies</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-border mb-4">
            <button className="pb-3 text-sm font-medium text-white border-b-2 border-primary">Eligible (18)</button>
            <button className="pb-3 text-sm font-medium text-text-secondary hover:text-white transition-colors">Near Eligible (7)</button>
            <button className="pb-3 text-sm font-medium text-text-secondary hover:text-white transition-colors">Not Eligible (17)</button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-text-secondary">
              <thead className="text-xs border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-medium text-text-secondary">Company</th>
                  <th className="px-4 py-3 font-medium text-text-secondary">Roles Offered</th>
                  <th className="px-4 py-3 font-medium text-center border-x border-border/50">
                    <div className="border-b border-border/50 pb-1 mb-1">CGPA Cutoff</div>
                    <div className="flex justify-between">
                      <span>Normal</span>
                      <span>Internal</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 font-medium text-text-secondary">Branches Allowed</th>
                  <th className="px-4 py-3 font-medium text-center text-text-secondary">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockResults.map((res, idx) => (
                  <tr key={idx} className="hover:bg-surface/50 transition-colors">
                    <td className="px-4 py-4 font-medium text-white flex items-center gap-3 whitespace-nowrap">
                      <div className="w-6 h-6 rounded bg-white flex items-center justify-center text-background text-xs font-bold">
                        {res.company[0]}
                      </div>
                      {res.company}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">{res.roles}</td>
                    <td className="px-4 py-4 border-x border-border/50">
                      <div className="flex justify-between">
                        <span className="text-white">{res.c_normal}</span>
                        <span className="text-white">{res.c_internal}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 max-w-[200px] truncate" title={res.branches}>{res.branches}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap items-center justify-center gap-1">
                        {res.types.map(t => (
                          <span key={t} className={`text-[10px] px-2 py-0.5 rounded border ${
                            t === 'FTE' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          }`}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="mt-6 mx-auto bg-surface border border-primary/50 text-primary hover:bg-primary/10 px-6 py-2 rounded-lg text-sm font-medium transition-colors">
            View All Eligible Companies
          </button>
        </div>

      </div>

      {/* Bottom Info Section */}
      <div className="bg-surface-highlight border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 border-b border-border pb-4 mb-6">
          <Info className="w-5 h-5 text-text-secondary" />
          <h2 className="text-lg font-semibold text-text-primary">How Eligibility Works?</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface border border-border rounded-xl p-5 flex items-start gap-4">
            <div className="bg-success/10 text-success p-3 rounded-lg">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">1. CGPA Criteria</h3>
              <p className="text-xs text-text-secondary leading-relaxed">We compare your Normal and Internal CGPA with company cutoffs.</p>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 flex items-start gap-4">
            <div className="bg-blue-500/10 text-blue-400 p-3 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">2. Branch Criteria</h3>
              <p className="text-xs text-text-secondary leading-relaxed">You must have at least one of the allowed branches to be eligible.</p>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 flex items-start gap-4">
            <div className="bg-primary/10 text-primary p-3 rounded-lg">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">3. Dynamic Updates</h3>
              <p className="text-xs text-text-secondary leading-relaxed">Cutoffs and criteria are updated regularly based on the latest placement data.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
