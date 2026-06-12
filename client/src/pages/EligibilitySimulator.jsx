import React, { useState } from 'react';
import { 
  User, 
  Search, 
  Info,
  CheckCircle2,
  BarChart2,
  Users,
  RefreshCw,
  Building2
} from 'lucide-react';
import api from '../services/api';

const branchesList = ['COE', 'COPC', 'ENC', 'ECE', 'EIC', 'IT', 'EE', 'ME', 'CE', 'BT'];

export default function EligibilitySimulator() {
  const [internalCGPA, setInternalCGPA] = useState('8.50');
  const [selectedBranch, setSelectedBranch] = useState('COE');
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('eligible');
  const [isLoading, setIsLoading] = useState(false);

  const handleSimulate = async () => {
    try {
      setIsLoading(true);
      const res = await api.post('/eligibility/simulate', {
        internalCGPA: Number(internalCGPA),
        branch: selectedBranch
      });
      setResults(res.data);
      setActiveTab('eligible');
    } catch (error) {
      console.error('Simulation failed:', error);
      alert(error.response?.data?.message || 'Simulation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const currentList = results ? results[activeTab] : [];

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
            <label className="text-sm font-medium text-text-primary block mb-3">Internal CGPA (Upto 10)</label>
            <div className="bg-surface border border-border p-3 rounded-lg flex flex-col">
              <input 
                type="number" 
                step="0.01"
                min="0"
                max="10"
                value={internalCGPA} 
                onChange={(e) => setInternalCGPA(e.target.value)}
                className="bg-transparent text-white font-medium outline-none" 
              />
            </div>
          </div>

          <div className="mb-8">
            <label className="text-sm font-medium text-text-primary block mb-3">Select Your Branch</label>
            <div className="flex flex-wrap gap-2">
              {branchesList.map(b => {
                const isSelected = selectedBranch === b;
                return (
                  <button 
                    key={b}
                    onClick={() => setSelectedBranch(b)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm border transition-colors ${
                      isSelected 
                        ? 'bg-primary/20 border-primary text-primary' 
                        : 'bg-surface border-border text-text-secondary hover:text-white hover:border-text-secondary'
                    }`}
                  >
                    {isSelected ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-4 h-4 rounded-full border border-text-secondary/50" />}
                    {b}
                  </button>
                );
              })}
            </div>
          </div>

          <button 
            onClick={handleSimulate}
            disabled={isLoading}
            className="w-full py-3 bg-primary hover:bg-primary-hover flex justify-center items-center gap-2 text-white text-sm font-medium rounded-lg transition-colors mb-4 disabled:opacity-50"
          >
            <Search className="w-4 h-4" /> {isLoading ? 'Calculating...' : 'Check Eligibility'}
          </button>
          
          <div className="flex items-center gap-2 text-text-secondary text-xs mt-auto">
            <Info className="w-4 h-4" /> Eligibility is based on the latest available placement data.
          </div>
        </div>

        {/* Right Column: Eligibility Results */}
        <div className="w-full xl:w-2/3 bg-surface-highlight border border-border rounded-xl p-6 flex flex-col min-h-[500px]">
          <div className="flex items-center gap-3 border-b border-border pb-4 mb-6">
            <Building2 className="w-5 h-5 text-text-secondary" />
            <h2 className="text-lg font-semibold text-text-primary">Eligibility Results</h2>
          </div>

          {results ? (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-success/10 border border-success/20 rounded-xl p-4 flex flex-col">
                  <span className="text-success text-sm font-semibold mb-1">Eligible</span>
                  <span className="text-white text-3xl font-bold mb-1">{results.eligible.length}</span>
                  <span className="text-text-secondary text-xs">Companies</span>
                </div>
                <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 flex flex-col">
                  <span className="text-warning text-sm font-semibold mb-1">Near Eligible</span>
                  <span className="text-white text-3xl font-bold mb-1">{results.nearEligible.length}</span>
                  <span className="text-text-secondary text-xs">Companies</span>
                </div>
                <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 flex flex-col">
                  <span className="text-danger text-sm font-semibold mb-1">Not Eligible</span>
                  <span className="text-white text-3xl font-bold mb-1">{results.notEligible.length}</span>
                  <span className="text-text-secondary text-xs">Companies</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-6 border-b border-border mb-4">
                <button 
                  onClick={() => setActiveTab('eligible')}
                  className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'eligible' ? 'text-white border-b-2 border-primary' : 'text-text-secondary hover:text-white'}`}
                >
                  Eligible ({results.eligible.length})
                </button>
                <button 
                  onClick={() => setActiveTab('nearEligible')}
                  className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'nearEligible' ? 'text-white border-b-2 border-warning' : 'text-text-secondary hover:text-white'}`}
                >
                  Near Eligible ({results.nearEligible.length})
                </button>
                <button 
                  onClick={() => setActiveTab('notEligible')}
                  className={`pb-3 text-sm font-medium transition-colors ${activeTab === 'notEligible' ? 'text-white border-b-2 border-danger' : 'text-text-secondary hover:text-white'}`}
                >
                  Not Eligible ({results.notEligible.length})
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto flex-1">
                {currentList.length === 0 ? (
                  <div className="text-center py-10 text-text-secondary">No companies in this category.</div>
                ) : (
                  <table className="w-full text-left text-sm text-text-secondary">
                    <thead className="text-xs border-b border-border">
                      <tr>
                        <th className="px-4 py-3 font-medium text-text-secondary">Company</th>
                        <th className="px-4 py-3 font-medium text-text-secondary">JD</th>
                        <th className="px-4 py-3 font-medium text-center">CGPA Cutoff</th>
                        <th className="px-4 py-3 font-medium text-text-secondary">Branches Allowed</th>
                        <th className="px-4 py-3 font-medium text-center text-text-secondary">Status Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {currentList.map((item, idx) => (
                        <tr key={idx} className="hover:bg-surface/50 transition-colors">
                          <td className="px-4 py-4 font-medium text-white flex items-center gap-3 whitespace-nowrap">
                            <div className="w-6 h-6 rounded bg-white flex items-center justify-center text-background text-xs font-bold">
                              {item.company.name[0]?.toUpperCase()}
                            </div>
                            {item.company.name}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">{item.company.role || '—'}</td>
                          <td className="px-4 py-4 text-center">
                            <span className="text-white">{item.company.internalCutoff || '—'}</span>
                          </td>
                          <td className="px-4 py-4 max-w-[200px] truncate" title={item.company.branches?.join(', ')}>
                            {item.company.branches?.join(', ') || '—'}
                          </td>
                          <td className="px-4 py-4 text-center text-xs">
                            {item.reason}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-text-secondary">
              Enter your CGPA and Branch, then click "Check Eligibility"
            </div>
          )}
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
              <p className="text-xs text-text-secondary leading-relaxed">We compare your Internal CGPA with the internal company cutoffs.</p>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 flex items-start gap-4">
            <div className="bg-blue-500/10 text-blue-400 p-3 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">2. Branch Criteria</h3>
              <p className="text-xs text-text-secondary leading-relaxed">Your branch must be allowed by the company.</p>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-5 flex items-start gap-4">
            <div className="bg-primary/10 text-primary p-3 rounded-lg">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">3. Dynamic Updates</h3>
              <p className="text-xs text-text-secondary leading-relaxed">Near Eligible shows companies where you fall short by 0.30 or less.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
