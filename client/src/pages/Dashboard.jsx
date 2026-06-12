import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MessageCircle, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import api from '../services/api';

export default function Dashboard() {
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [latestUpdates, setLatestUpdates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Fetch 10 latest companies
        const response = await api.get('/companies', {
          params: { page: 1, limit: 10 }
        });
        setTotalCompanies(response.data.totalCompaniesCount || response.data.total);
        
        // Group by name
        const grouped = response.data.companies.reduce((acc, curr) => {
          if (!acc[curr.name]) acc[curr.name] = { name: curr.name, roles: [] };
          acc[curr.name].roles.push(curr);
          return acc;
        }, {});
        
        setLatestUpdates(Object.values(grouped));
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto h-full">
      
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface-highlight border border-border rounded-xl p-6 flex items-center gap-6">
          <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-text-secondary text-sm font-medium mb-1">Total Companies</span>
            <span className="text-white text-3xl font-bold mb-1">
              {isLoading ? '...' : totalCompanies}
            </span>
            <span className="text-text-secondary text-xs">Companies visited till date</span>
          </div>
        </div>

        <div className="bg-surface-highlight border border-border rounded-xl p-6 flex items-center gap-6">
          <div className="w-16 h-16 rounded-xl bg-warning/20 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-warning" />
          </div>
          <div className="flex flex-col">
            <span className="text-text-secondary text-sm font-medium mb-1">Active Discussions</span>
            <span className="text-white text-3xl font-bold mb-1">0</span>
            <span className="text-text-secondary text-xs">Active company chats (Mocked)</span>
          </div>
        </div>
      </div>

      {/* Latest Placement Updates */}
      <div className="bg-surface-highlight border border-border rounded-xl flex flex-col flex-1 min-h-[400px]">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg text-primary">
              <Briefcase className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-text-primary">Latest Placement Updates</h2>
          </div>
          <button 
            onClick={() => navigate('/placement-updates')}
            className="text-sm text-primary hover:text-primary-hover flex items-center gap-1 font-medium transition-colors"
          >
            View All Updates <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto w-full flex-1 min-h-0">
          <table className="w-full text-left text-sm text-text-secondary relative md:min-w-[800px]">
            <thead className="text-xs uppercase bg-surface text-text-secondary sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-3 py-3 font-medium">Company</th>
                <th className="px-3 py-3 font-medium hidden md:table-cell">JD</th>
                <th className="px-3 py-3 font-medium">Type</th>
                <th className="px-3 py-3 font-medium">Stipend</th>
                <th className="px-3 py-3 font-medium">Package</th>
                <th className="px-3 py-3 font-medium text-center hidden md:table-cell">CGPA Normal</th>
                <th className="px-3 py-3 font-medium text-center hidden md:table-cell">CGPA Internal</th>
                <th className="px-3 py-3 font-medium hidden md:table-cell">Branches Allowed (Max 10)</th>
                <th className="px-3 py-3 font-medium text-center hidden md:table-cell">Discussion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan="9" className="text-center py-8">Loading updates...</td>
                </tr>
              ) : latestUpdates.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-8">No companies added yet.</td>
                </tr>
              ) : (
                latestUpdates.map((company) => (
                  <React.Fragment key={company.name}>
                    {company.roles.map((update, idx) => (
                      <tr key={update._id} className="hover:bg-surface/50 transition-colors">
                        {idx === 0 && (
                          <td rowSpan={company.roles.length} className="px-3 py-3 font-medium text-white border-b border-border align-top">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded bg-white flex items-center justify-center text-background text-xs font-bold shrink-0">
                                {company.name[0]?.toUpperCase()}
                              </div>
                              <span className="truncate">{company.name}</span>
                            </div>
                          </td>
                        )}
                        <td className="px-3 py-3 hidden md:table-cell">
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
                        <td className="px-3 py-3">{update.type || '—'}</td>
                        <td className="px-3 py-3">{update.stipend || '—'}</td>
                        <td className="px-3 py-3">{update.package || '—'}</td>
                        <td className="px-3 py-3 text-center whitespace-nowrap hidden md:table-cell">{update.normalCutoff || '—'}</td>
                        <td className="px-3 py-3 text-center whitespace-nowrap hidden md:table-cell">{update.internalCutoff || '—'}</td>
                        <td className="px-3 py-3 text-xs hidden md:table-cell">
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
                        <td className="px-3 py-3 text-center hidden md:table-cell">
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
                ))
              )}
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
