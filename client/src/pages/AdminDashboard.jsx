import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Bell, 
  BookOpen,
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';
import api from '../services/api';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('companies');
  
  // Companies State
  const [companies, setCompanies] = useState([]);
  const [isCompanyLoading, setIsCompanyLoading] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: '', role: '', type: 'FTE', stipend: '', package: '', normalCutoff: '', internalCutoff: '', branches: ''
  });
  const [jdFile, setJdFile] = useState(null);
  const [editingCompanyId, setEditingCompanyId] = useState(null);

  // Notices State
  const [newNotice, setNewNotice] = useState({ companyId: '', noticeDate: '' });

  useEffect(() => {
    if (activeTab === 'companies' || activeTab === 'notices') {
      fetchCompanies();
    }
  }, [activeTab]);

  const fetchCompanies = async () => {
    try {
      setIsCompanyLoading(true);
      const res = await api.get('/companies', { params: { limit: 100 } });
      setCompanies(res.data.companies);
    } catch (error) {
      console.error(error);
    } finally {
      setIsCompanyLoading(false);
    }
  };

  const handleCreateCompany = async (e) => {
    e.preventDefault();
    try {
      const branchesArray = newCompany.branches.split(',').map(b => b.trim());
      
      const formData = new FormData();
      formData.append('name', newCompany.name);
      formData.append('role', newCompany.role);
      formData.append('type', newCompany.type);
      formData.append('stipend', newCompany.stipend);
      formData.append('package', newCompany.package);
      formData.append('normalCutoff', newCompany.normalCutoff);
      formData.append('internalCutoff', newCompany.internalCutoff);
      branchesArray.forEach(b => formData.append('branches', b));
      
      if (jdFile) {
        formData.append('jdFile', jdFile);
      }

      if (editingCompanyId) {
        await api.put(`/companies/${editingCompanyId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Company updated successfully!');
      } else {
        await api.post('/companies', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Company created successfully!');
      }

      setNewCompany({ name: '', role: '', type: 'FTE', stipend: '', package: '', normalCutoff: '', internalCutoff: '', branches: '' });
      setJdFile(null);
      setEditingCompanyId(null);
      fetchCompanies();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save company');
    }
  };

  const handleEditClick = (company) => {
    setEditingCompanyId(company._id);
    setNewCompany({
      name: company.name,
      role: company.role,
      type: company.type,
      stipend: company.stipend || '',
      package: company.package || '',
      normalCutoff: company.normalCutoff,
      internalCutoff: company.internalCutoff,
      branches: company.branches.join(', ')
    });
    setJdFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingCompanyId(null);
    setNewCompany({ name: '', role: '', type: 'FTE', stipend: '', package: '', normalCutoff: '', internalCutoff: '', branches: '' });
    setJdFile(null);
  };

  const handleDeleteCompany = async (id) => {
    if (!window.confirm('Are you sure you want to delete this company?')) return;
    try {
      await api.delete(`/companies/${id}`);
      fetchCompanies();
    } catch (error) {
      alert('Failed to delete company');
    }
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    try {
      await api.post('/notices', newNotice);
      alert('Notice created successfully!');
      setNewNotice({ companyId: '', noticeDate: '' });
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create notice');
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto h-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-1">Admin Dashboard</h1>
        <p className="text-sm text-text-secondary">Manage platform entities and resources.</p>
      </div>

      <div className="flex items-center gap-4 border-b border-border">
        <button 
          onClick={() => setActiveTab('companies')}
          className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors ${activeTab === 'companies' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-white'}`}
        >
          <Building2 className="w-4 h-4" /> Companies
        </button>
        <button 
          onClick={() => setActiveTab('notices')}
          className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors ${activeTab === 'notices' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-white'}`}
        >
          <Bell className="w-4 h-4" /> Notices
        </button>
        <button 
          onClick={() => setActiveTab('resources')}
          className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors ${activeTab === 'resources' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-white'}`}
        >
          <BookOpen className="w-4 h-4" /> Resources
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'companies' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-surface-highlight border border-border p-5 rounded-xl h-fit">
              <h3 className="text-lg font-semibold text-white mb-4">
                {editingCompanyId ? 'Edit Company' : 'Add Company'}
              </h3>
              <form onSubmit={handleCreateCompany} className="flex flex-col gap-3">
                <input required type="text" placeholder="Company Name" value={newCompany.name} onChange={e => setNewCompany({...newCompany, name: e.target.value})} className="bg-surface border border-border rounded p-2 text-sm text-white" />
                <input required type="text" placeholder="JD Title (e.g. SDE)" value={newCompany.role} onChange={e => setNewCompany({...newCompany, role: e.target.value})} className="bg-surface border border-border rounded p-2 text-sm text-white" />
                
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-text-secondary">JD Document (PDF/Doc/Image)</label>
                  <input type="file" onChange={e => setJdFile(e.target.files[0])} className="bg-surface border border-border rounded p-1.5 text-sm text-text-secondary file:mr-3 file:bg-primary file:border-none file:text-white file:px-3 file:py-1 file:rounded-sm file:text-xs file:cursor-pointer" />
                </div>
                <select value={newCompany.type} onChange={e => setNewCompany({...newCompany, type: e.target.value})} className="bg-surface border border-border rounded p-2 text-sm text-white">
                  <option>FTE</option>
                  <option>Internship</option>
                  <option>Internship + FTE</option>
                </select>
                <input type="text" placeholder="Stipend (optional)" value={newCompany.stipend} onChange={e => setNewCompany({...newCompany, stipend: e.target.value})} className="bg-surface border border-border rounded p-2 text-sm text-white" />
                <input type="text" placeholder="Package (optional)" value={newCompany.package} onChange={e => setNewCompany({...newCompany, package: e.target.value})} className="bg-surface border border-border rounded p-2 text-sm text-white" />
                <input required type="number" step="0.01" placeholder="Normal Cutoff" value={newCompany.normalCutoff} onChange={e => setNewCompany({...newCompany, normalCutoff: e.target.value})} className="bg-surface border border-border rounded p-2 text-sm text-white" />
                <input required type="number" step="0.01" placeholder="Internal Cutoff" value={newCompany.internalCutoff} onChange={e => setNewCompany({...newCompany, internalCutoff: e.target.value})} className="bg-surface border border-border rounded p-2 text-sm text-white" />
                <input required type="text" placeholder="Branches (comma separated)" value={newCompany.branches} onChange={e => setNewCompany({...newCompany, branches: e.target.value})} className="bg-surface border border-border rounded p-2 text-sm text-white" />
                <div className="flex gap-2 mt-2">
                  <button type="submit" className="flex-1 bg-primary hover:bg-primary-hover text-white py-2 rounded font-medium flex items-center justify-center gap-2">
                    {editingCompanyId ? 'Update Company' : <><Plus className="w-4 h-4" /> Add Company</>}
                  </button>
                  {editingCompanyId && (
                    <button type="button" onClick={cancelEdit} className="bg-surface border border-border text-text-secondary hover:text-white py-2 px-4 rounded font-medium flex items-center justify-center">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="lg:col-span-2 bg-surface-highlight border border-border rounded-xl flex flex-col">
              <div className="p-4 border-b border-border">
                <h3 className="text-lg font-semibold text-white">Manage Companies</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-text-secondary">
                  <thead className="bg-surface text-xs border-b border-border">
                    <tr>
                      <th className="p-3">Company</th>
                      <th className="p-3">JD Title</th>
                      <th className="p-3">Cutoffs (N/I)</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {(() => {
                      if (isCompanyLoading) {
                        return <tr><td colSpan="4" className="p-4 text-center">Loading...</td></tr>;
                      }

                      const grouped = Object.values(companies.reduce((acc, curr) => {
                        if (!acc[curr.name]) acc[curr.name] = { name: curr.name, roles: [] };
                        acc[curr.name].roles.push(curr);
                        return acc;
                      }, {}));

                      return grouped.map(company => (
                        <React.Fragment key={company.name}>
                          {company.roles.map((role, idx) => (
                            <tr key={role._id} className="hover:bg-surface/50">
                              {idx === 0 && (
                                <td rowSpan={company.roles.length} className="p-3 text-white font-medium align-top border-b border-border">
                                  {company.name}
                                </td>
                              )}
                              <td className="p-3">{role.role}</td>
                              <td className="p-3">{role.normalCutoff} / {role.internalCutoff}</td>
                              <td className="p-3 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button onClick={() => handleEditClick(role)} className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded transition-colors"><Edit2 className="w-4 h-4" /></button>
                                  <button onClick={() => handleDeleteCompany(role._id)} className="p-1.5 text-danger hover:bg-danger/10 rounded transition-colors"><Trash2 className="w-4 h-4" /></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notices' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-surface-highlight border border-border p-5 rounded-xl h-fit">
              <h3 className="text-lg font-semibold text-white mb-4">Create Notice</h3>
              <form onSubmit={handleCreateNotice} className="flex flex-col gap-3">
                <select required value={newNotice.companyId} onChange={e => setNewNotice({...newNotice, companyId: e.target.value})} className="bg-surface border border-border rounded p-2 text-sm text-white">
                  <option value="">Select Company</option>
                  {companies.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
                <input required type="date" value={newNotice.noticeDate} onChange={e => setNewNotice({...newNotice, noticeDate: e.target.value})} className="bg-surface border border-border rounded p-2 text-sm text-white" />
                <button type="submit" className="bg-primary hover:bg-primary-hover text-white py-2 rounded font-medium mt-2 flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Create Notice
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="bg-surface-highlight border border-border p-10 rounded-xl flex flex-col items-center justify-center text-center">
            <BookOpen className="w-12 h-12 text-text-secondary mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Resources Management (Placeholder)</h3>
            <p className="text-sm text-text-secondary max-w-md">The Resource API (Phase 8) was skipped in this update. This interface will be fully functional once the corresponding backend endpoints are implemented in the future.</p>
          </div>
        )}
      </div>
    </div>
  );
}
