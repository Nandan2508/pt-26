import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Dashboard from './pages/Dashboard';
import PlacementUpdates from './pages/PlacementUpdates';
import EligibilitySimulator from './pages/EligibilitySimulator';
import PlacementCalendar from './pages/PlacementCalendar';
import DiscussionHub from './pages/DiscussionHub';
import InterviewResources from './pages/InterviewResources';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Public Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/placement-updates" element={<PlacementUpdates />} />
            <Route path="/eligibility-simulator" element={<EligibilitySimulator />} />
            <Route path="/placement-calendar" element={<PlacementCalendar />} />
            <Route path="/discussion" element={<DiscussionHub />} />
            <Route path="/resources" element={<InterviewResources />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Admin Route */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
