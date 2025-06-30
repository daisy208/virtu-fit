import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from './store/authStore';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './components/Layout/DashboardLayout';
import LoadingScreen from './components/Common/LoadingScreen';

function App() {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => setAppLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (appLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" />
          ) : !isAuthenticated ? (
            <LoginPage key="login" />
          ) : (
            <Routes key="app">
              <Route path="/*" element={<DashboardLayout />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;