import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';

// Mock Pages for routing (to be implemented later)
const PlaceholderPage = ({ title }) => (
  <div className="flex items-center justify-center h-full text-text-secondary text-2xl font-semibold">
    {title} Page coming soon...
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/placement-updates" element={<PlaceholderPage title="Placement Updates" />} />
          <Route path="/eligibility-simulator" element={<PlaceholderPage title="Eligibility Simulator" />} />
          <Route path="/placement-calendar" element={<PlaceholderPage title="Placement Calendar" />} />
          <Route path="/discussion" element={<PlaceholderPage title="Discussion Hub" />} />
          <Route path="/resources" element={<PlaceholderPage title="PYQ Repository" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
