import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  Filter, 
  Search, 
  Download,
  ChevronLeft,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const FilterSelect = ({ label, options, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-text-secondary">{label}</label>
    <select value={value} onChange={onChange} className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none appearance-none cursor-pointer">
      {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default function PlacementUpdates() {
  const [companies, setCompanies] = useState([]);
  const [totalRoles, setTotalRoles] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Filters State
  const [filterType, setFilterType] = useState('All Types');
  const [filterBranch, setFilterBranch] = useState('All Branches');
  const [filterNormalCG, setFilterNormalCG] = useState('All');
  const [filterInternalCG, setFilterInternalCG] = useState('All');
  
  const navigate = useNavigate();

  const fetchCompanies = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/companies', {
        params: {
          page,
          limit: 10,
          search,
          type: filterType !== 'All Types' ? filterType : undefined,
          branch: filterBranch !== 'All Branches' ? filterBranch : undefined,
          normalCutoff: filterNormalCG !== 'All' ? parseFloat(filterNormalCG.replace('>= ', '')) : undefined,
          internalCutoff: filterInternalCG !== 'All' ? parseFloat(filterInternalCG.replace('>= ', '')) : undefined
        }
      });
      setCompanies(res.data.companies);
      setTotalRoles(res.data.total);
      setTotalCompanies(res.data.totalCompaniesCount || res.data.total);
      setPages(res.data.pages);
    } catch (error) {
      console.error('Failed to fetch companies', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [page]);

  // Debounced search
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      if (page !== 1) setPage(1);
      else fetchCompanies();
    }, 500);
    return () => clearTimeout(timer);
  }, [search, filterType, filterBranch, filterNormalCG, filterInternalCG]);

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
        <FilterSelect label="Type" options={['All Types', 'FTE', 'Internship']} value={filterType} onChange={(e) => setFilterType(e.target.value)} />
        <FilterSelect label="Branches" options={['All Branches', 'BT', 'BME', 'CHE', 'CIE', 'CCA', 'COE', 'COPC', 'COBS', 'ENC', 'ECE', 'EVD', 'EIC', 'MEE', 'MEC', 'RAI', 'ELE', 'EEC']} value={filterBranch} onChange={(e) => setFilterBranch(e.target.value)} />
        <FilterSelect label="CGPA (Normal)" options={['All', '>= 7.0', '>= 8.0']} value={filterNormalCG} onChange={(e) => setFilterNormalCG(e.target.value)} />
        <FilterSelect label="CGPA (Internal)" options={['All', '>= 7.5', '>= 8.5']} value={filterInternalCG} onChange={(e) => setFilterInternalCG(e.target.value)} />
        
        <div className="flex items-center gap-3 ml-auto">
          <button 
            onClick={() => {
              setFilterType('All Types');
              setFilterBranch('All Branches');
              setFilterNormalCG('All');
              setFilterInternalCG('All');
              setSearch('');
            }}
            className="text-sm text-text-secondary hover:text-text-primary px-3 py-2 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-surface-highlight border border-border rounded-xl flex flex-col flex-1">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
          <span className="text-sm text-text-secondary font-medium">Total Companies: <span className="text-white">{totalCompanies}</span></span>
          <div className="flex items-center gap-3">
            <div className="relative flex items-center h-9 rounded-lg bg-surface border border-border px-3">
              <Search className="w-4 h-4 text-text-secondary mr-2" />
              <input 
                type="text" 
                placeholder="Search in table..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-48 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
              />
            </div>
            <button className="flex items-center gap-2 bg-surface border border-border hover:border-text-secondary text-text-primary px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full flex-1 min-h-0 relative">
          {isLoading && companies.length > 0 && (
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-20 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium text-text-primary">Updating Data...</span>
              </div>
            </div>
          )}
          <table className="w-full text-left text-sm text-text-secondary relative min-w-[800px]">
            <thead className="text-xs uppercase bg-surface text-text-secondary sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-3 py-3 font-medium">Company</th>
                <th className="px-3 py-3 font-medium">Date Added</th>
                <th className="px-3 py-3 font-medium">JD</th>
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
                <th className="px-3 py-3 font-medium">Branches Allowed</th>
                <th className="px-3 py-3 font-medium text-center">Discussion Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(() => {
                if (isLoading && companies.length === 0) {
                  return (
                    <tr>
                      <td colSpan="9" className="p-8 text-center text-text-secondary">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                          Loading companies...
                        </div>
                      </td>
                    </tr>
                  );
                }
                
                if (companies.length === 0) {
                  return (
                    <tr>
                      <td colSpan="9" className="p-8 text-center text-text-secondary">No companies found.</td>
                    </tr>
                  );
                }

                const grouped = Object.values(companies.reduce((acc, curr) => {
                  if (!acc[curr.name]) acc[curr.name] = { name: curr.name, roles: [] };
                  acc[curr.name].roles.push(curr);
                  return acc;
                }, {}));

                return grouped.map((company) => (
                  <React.Fragment key={company.name}>
                    {company.roles.map((update, idx) => (
                      <tr key={update._id} className="hover:bg-surface/50 transition-colors">
                        {idx === 0 && (
                          <td rowSpan={company.roles.length} className="px-3 py-3 font-medium text-white border-b border-border align-top">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded bg-white flex items-center justify-center text-background text-xs font-bold shrink-0">
                                {company.name[0]?.toUpperCase()}
                              </div>
                              <span className="truncate max-w-[150px]" title={company.name}>{company.name}</span>
                            </div>
                          </td>
                        )}
                        <td className="px-3 py-3 text-xs whitespace-nowrap">
                          {new Date(update.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-3 py-3">
                          <div className="flex flex-col gap-1">
                            <span>{update.role || '—'}</span>
                            {update.jdLink && (
                              <a 
                                href={update.jdLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-primary hover:underline flex items-center gap-1"
                              >
                                View Doc <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-3">{update.type}</td>
                        <td className="px-3 py-3">{update.stipend || '—'}</td>
                        <td className="px-3 py-3">{update.package || '—'}</td>
                        <td className="px-3 py-3 border-x border-border/50">
                          <div className="flex justify-between px-1">
                            <span className="text-white whitespace-nowrap">{update.normalCutoff}</span>
                            <span className="text-white whitespace-nowrap">{update.internalCutoff}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-xs">
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {update.branches?.length > 0 
                              ? update.branches.map((branch, i) => (
                                  <span key={i} className="bg-surface-highlight border border-border px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap">
                                    {branch}
                                  </span>
                                ))
                              : '—'
                            }
                          </div>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <button 
                            onClick={() => navigate(`/discussion/${update.slug}`)}
                            className="text-xs px-2 py-1.5 border border-primary/50 hover:border-primary text-primary hover:bg-primary/10 rounded-md flex items-center justify-center gap-1 mx-auto transition-colors whitespace-nowrap"
                          >
                            Join <ExternalLink className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ));
              })()}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border flex items-center justify-between">
          <span className="text-sm text-text-secondary">
            Showing {(page - 1) * 10 + 1} to {Math.min(page * 10, totalRoles)} of {totalRoles} roles across {totalCompanies} unique companies
          </span>
          <div className="flex items-center gap-1">
            <button 
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
              className="w-8 h-8 flex items-center justify-center rounded bg-surface border border-border text-text-secondary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {Array.from({ length: pages }).map((_, i) => (
              <button 
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${page === i + 1 ? 'bg-primary text-white font-medium' : 'bg-surface border border-border text-text-secondary hover:text-white'}`}
              >
                {i + 1}
              </button>
            ))}

            <button 
              disabled={page >= pages}
              onClick={() => setPage(p => p + 1)}
              className="w-8 h-8 flex items-center justify-center rounded bg-surface border border-border text-text-secondary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

