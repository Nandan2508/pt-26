import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import PlacementUpdates from './pages/PlacementUpdates';
import EligibilitySimulator from './pages/EligibilitySimulator';
import PlacementCalendar from './pages/PlacementCalendar';
import DiscussionHub from './pages/DiscussionHub';
import InterviewResources from './pages/InterviewResources';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/placement-updates" element={<PlacementUpdates />} />
          <Route path="/eligibility-simulator" element={<EligibilitySimulator />} />
          <Route path="/placement-calendar" element={<PlacementCalendar />} />
          <Route path="/discussion" element={<DiscussionHub />} />
          <Route path="/resources" element={<InterviewResources />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
