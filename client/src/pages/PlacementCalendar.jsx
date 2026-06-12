import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon
} from 'lucide-react';
import api from '../services/api';

const FilterSelect = ({ label, options }) => (
  <div className="flex flex-col gap-1">
    <select className="bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none appearance-none cursor-pointer min-w-[200px]">
      {options.map((opt, i) => <option key={i}>{opt}</option>)}
    </select>
  </div>
);

export default function PlacementCalendar() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // We'll hardcode the viewing month to May 2025 for this UI mockup, 
  // but we will render actual notices dynamically.
  const viewingMonth = 4; // May (0-indexed)
  const viewingYear = 2025;

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setIsLoading(true);
        const res = await api.get('/notices');
        setNotices(res.data);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotices();
  }, []);

  // Format date helper for the right panel
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto h-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-1">Placement Calendar</h1>
        <p className="text-sm text-text-secondary">Track all placement related notices and company announcements.</p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-4">
        <FilterSelect options={['All Companies', 'Adobe', 'Atlassian']} />
        <FilterSelect options={['All Event Types', 'Notice Released']} />
        <FilterSelect options={['All Modes', 'Online', 'Offline']} />
        <button className="text-sm text-text-secondary hover:text-text-primary px-4 py-2 transition-colors border border-border rounded-lg ml-2">
          Reset
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left Column: Calendar Grid */}
        <div className="w-full xl:w-2/3 flex flex-col gap-4">
          <div className="bg-surface-highlight border border-border rounded-xl flex flex-col flex-1">
            {/* Calendar Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <button className="p-2 border border-border rounded-l-lg hover:bg-surface transition-colors">
                    <ChevronLeft className="w-4 h-4 text-text-secondary" />
                  </button>
                  <button className="p-2 border-y border-r border-border rounded-r-lg hover:bg-surface transition-colors">
                    <ChevronRight className="w-4 h-4 text-text-secondary" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-white">May 2025</h2>
              </div>
              <button className="text-sm px-4 py-2 border border-primary/50 text-primary hover:bg-primary/10 rounded-lg font-medium transition-colors">
                Today
              </button>
            </div>

            {/* Grid */}
            <div className="flex-1 grid grid-cols-7 grid-rows-[auto_1fr_1fr_1fr_1fr_1fr] border-b border-border">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-3 text-center text-xs font-medium text-text-secondary border-b border-r border-border last:border-r-0">
                  {day}
                </div>
              ))}
              
              {/* Mock Days - 35 cells mapping dynamic notices if they match the date */}
              {Array.from({ length: 35 }).map((_, i) => {
                const dayNum = i - 3; // start from April 27
                const isCurrentMonth = dayNum > 0 && dayNum <= 31;
                const displayNum = isCurrentMonth ? dayNum : (dayNum <= 0 ? 30 + dayNum : dayNum - 31);
                
                // Find notices for this specific day (Assuming May 2025)
                const dayNotices = notices.filter(n => {
                  const d = new Date(n.noticeDate);
                  return isCurrentMonth && d.getDate() === displayNum && d.getMonth() === viewingMonth && d.getFullYear() === viewingYear;
                });

                return (
                  <div key={i} className={`p-2 border-r border-b border-border last:border-r-0 min-h-[100px] ${!isCurrentMonth ? 'opacity-30' : ''}`}>
                    <span className="text-sm font-medium text-text-secondary">{displayNum}</span>
                    <div className="mt-2 space-y-1 overflow-y-auto max-h-[70px] hide-scrollbar">
                      {dayNotices.map((n, idx) => (
                        <div key={idx} className="text-[10px] px-2 py-1 rounded border bg-primary/20 text-primary border-primary/30 truncate">
                          ● {n.companyId?.name || 'Unknown'}<br/><span className="opacity-70">Notice Released</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="p-4 flex items-center gap-6 overflow-x-auto">
              <div className="flex items-center gap-2 text-xs text-text-secondary whitespace-nowrap"><span className="w-2 h-2 rounded-full bg-primary"></span> Notice Released</div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="bg-surface-highlight border border-border rounded-xl p-4 flex items-center justify-between mt-auto">
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-xl text-primary">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Never Miss an Update</h3>
                <p className="text-xs text-text-secondary">Stay updated with the latest placement notices and company announcements.</p>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
              <CalendarIcon className="w-4 h-4" /> Sync with Calendar
            </button>
          </div>
        </div>

        {/* Right Column: Company Notices */}
        <div className="w-full xl:w-1/3 bg-surface-highlight border border-border rounded-xl p-6 flex flex-col h-full">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Company Notices</h2>
          
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {isLoading ? (
              <div className="text-sm text-text-secondary text-center py-4">Loading notices...</div>
            ) : notices.length === 0 ? (
              <div className="text-sm text-text-secondary text-center py-4">No notices released yet.</div>
            ) : (
              notices.map((notice) => (
                <div key={notice._id} className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-white flex items-center justify-center text-background text-lg font-bold shrink-0">
                      {notice.companyId?.name?.[0]?.toUpperCase() || '?'}
                    </div>
                    <div className="flex flex-col overflow-hidden max-w-[150px]">
                      <span className="text-sm font-medium text-white truncate">{notice.companyId?.name || 'Unknown'}</span>
                      <span className="text-xs text-text-secondary">Notice Released</span>
                    </div>
                  </div>
                  <span className="text-xs text-primary font-medium">{formatDate(notice.noticeDate)}</span>
                </div>
              ))
            )}
          </div>

          <button className="w-full mt-6 py-2.5 border border-border hover:border-primary text-primary text-sm font-medium rounded-lg transition-colors">
            View All Notices
          </button>
        </div>

      </div>
    </div>
  );
}
