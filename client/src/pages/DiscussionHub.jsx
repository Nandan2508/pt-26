import React from 'react';
import { 
  Search, 
  MessageSquare, 
  Users, 
  ChevronRight, 
  ShieldAlert,
  MessageCircle,
  Hash
} from 'lucide-react';

const mockDiscussions = [
  {
    company: 'Adobe',
    roles: 'SDE, Data Analyst, Design',
    members: 128,
    threads: [
      { title: 'OA Discussion', desc: 'Discuss about Adobe OA, questions, difficulty level and tips.', threads: 128, replies: 892 },
      { title: 'Interview Discussion', desc: 'Share interview experiences, questions and feedback.', threads: 76, replies: 512 }
    ]
  },
  {
    company: 'Atlassian',
    roles: 'SDE, QA, Data Engineer',
    members: 96,
    threads: [
      { title: 'OA Discussion', desc: 'Discuss about Atlassian OA, questions, difficulty level and tips.', threads: 96, replies: 623 },
      { title: 'Interview Discussion', desc: 'Share interview experiences, questions and feedback.', threads: 54, replies: 388 }
    ]
  },
  {
    company: 'Microsoft',
    roles: 'SDE, PM, Data Scientist',
    members: 142,
    threads: [
      { title: 'OA Discussion', desc: 'Discuss about Microsoft OA, questions, difficulty level and tips.', threads: 142, replies: '1.1K' },
      { title: 'Interview Discussion', desc: 'Share interview experiences, questions and feedback.', threads: 88, replies: 645 }
    ]
  },
  {
    company: 'Amazon',
    roles: 'SDE, Data Analyst, PM',
    members: 180,
    threads: [
      { title: 'OA Discussion', desc: 'Discuss about Amazon OA, questions, difficulty level and tips.', threads: 142, replies: '1.4K' },
      { title: 'Interview Discussion', desc: 'Share interview experiences, questions and feedback.', threads: 112, replies: 823 }
    ]
  },
];

const mockPopular = [
  { company: 'Adobe', title: 'Adobe OA 2025 - Pattern', desc: 'What was the pattern of Adobe OA?', stats: '23 replies • 2h ago' },
  { company: 'Atlassian', title: 'Atlassian Interview Experience', desc: 'Shared my interview experience for SDE role.', stats: '18 replies • 4h ago' },
  { company: 'Amazon', title: 'Amazon SDE Interview Questions', desc: 'What type of questions were asked in on-site?', stats: '15 replies • 6h ago' },
  { company: 'Microsoft', title: 'Microsoft OA - Difficulty Level', desc: 'How difficult was the Microsoft OA this year?', stats: '12 replies • 8h ago' },
];

export default function DiscussionHub() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto h-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-1">Discussion Hub</h1>
        <p className="text-sm text-text-secondary">Explore company-wise discussions, share experiences and help your fellow Thaparians.</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left Column: Companies List */}
        <div className="w-full xl:w-2/3 flex flex-col gap-4 min-h-0">
          
          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Search companies..." 
                className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-text-secondary outline-none focus:border-primary transition-colors"
              />
            </div>
            <select className="bg-surface border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none cursor-pointer">
              <option>Sort by: Most Active</option>
              <option>Sort by: Newest</option>
              <option>Sort by: A-Z</option>
            </select>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {mockDiscussions.map((company, idx) => (
              <div key={idx} className="bg-surface-highlight border border-border rounded-xl p-5 flex flex-col md:flex-row gap-6">
                
                {/* Company Info */}
                <div className="w-full md:w-1/3 flex items-start gap-4">
                  <div className="w-12 h-12 rounded bg-white flex items-center justify-center text-background text-xl font-bold shrink-0">
                    {company.company[0]}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-white mb-1">{company.company}</h3>
                    <p className="text-xs text-text-secondary mb-2">{company.roles}</p>
                    <div className="flex items-center gap-1.5 text-xs text-success font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-success"></span> Active • {company.members} members
                    </div>
                  </div>
                </div>

                {/* Threads */}
                <div className="w-full md:w-2/3 flex flex-col gap-2">
                  {company.threads.map((thread, tidx) => (
                    <div key={tidx} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface/50 border border-transparent hover:border-border transition-colors cursor-pointer group">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="w-4 h-4 text-text-secondary mt-1 shrink-0 group-hover:text-primary transition-colors" />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{thread.title}</span>
                          <span className="text-xs text-text-secondary line-clamp-1">{thread.desc}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 shrink-0">
                        <div className="hidden sm:flex flex-col text-right">
                          <span className="text-sm font-medium text-white">{thread.threads} threads</span>
                          <span className="text-xs text-text-secondary">{thread.replies} replies</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-text-secondary group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Pagination Mock */}
            <div className="flex justify-center items-center gap-2 pt-4 pb-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:bg-surface transition-colors">&lt;</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white font-medium">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:bg-surface transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:bg-surface transition-colors">3</button>
              <span className="text-text-secondary px-1">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:bg-surface transition-colors">8</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border text-text-secondary hover:bg-surface transition-colors">&gt;</button>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="w-full xl:w-1/3 flex flex-col gap-6">
          
          {/* Stats Box */}
          <div className="bg-surface-highlight border border-border rounded-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-text-secondary">Total Companies</span>
              <span className="text-2xl font-bold text-white">48</span>
              <span className="text-[10px] text-text-secondary">Active discussion sections</span>
            </div>
          </div>

          {/* Popular Discussions */}
          <div className="bg-surface-highlight border border-border rounded-xl flex flex-col flex-1 min-h-[300px]">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <h2 className="text-base font-semibold text-white">Popular Discussions</h2>
              <span className="text-xs text-primary cursor-pointer">This Week ⌄</span>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {mockPopular.map((pop, idx) => (
                <div key={idx} className="flex gap-3 cursor-pointer group">
                  <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-background text-sm font-bold shrink-0 mt-1">
                    {pop.company[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">{pop.title}</span>
                    <span className="text-xs text-text-secondary mt-1 line-clamp-1">{pop.desc}</span>
                    <span className="text-[10px] text-text-secondary mt-2">{pop.stats}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-surface-highlight border border-border rounded-xl p-5">
            <h2 className="text-base font-semibold text-white mb-4">Guidelines</h2>
            <ul className="space-y-3 mb-5">
              <li className="flex items-center gap-3 text-xs text-text-secondary">
                <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center text-primary shrink-0">1</div>
                Be respectful and helpful
              </li>
              <li className="flex items-center gap-3 text-xs text-text-secondary">
                <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center text-primary shrink-0">2</div>
                No spam or irrelevant content
              </li>
              <li className="flex items-center gap-3 text-xs text-text-secondary">
                <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center text-primary shrink-0">3</div>
                Do not share copyrighted content
              </li>
              <li className="flex items-center gap-3 text-xs text-text-secondary">
                <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center text-primary shrink-0">4</div>
                Report inappropriate content
              </li>
            </ul>
            <button className="w-full py-2 border border-border hover:border-primary text-primary text-sm font-medium rounded-lg transition-colors">
              Go to Full Guidelines
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
