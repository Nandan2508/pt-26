import React from 'react';
import { BookOpen } from 'lucide-react';

export default function InterviewResources() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] w-full">
      <div className="bg-surface-highlight border border-border p-10 rounded-2xl flex flex-col items-center text-center max-w-md shadow-lg shadow-black/50">
        <BookOpen className="w-20 h-20 text-primary mb-6 opacity-80" />
        <h1 className="text-3xl font-bold text-white mb-3">Coming Soon</h1>
        <p className="text-text-secondary text-sm leading-relaxed">
          The Interview Resources module is currently under development. Soon you will be able to access previous year questions and interview experiences for top companies.
        </p>
      </div>
    </div>
  );
}
