import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';
import DashboardOverview from '../Dashboard/DashboardOverview';
import TryOnStudio from '../VirtualTryOn/TryOnStudio';
import ProductManagement from '../Products/ProductManagement';
import UserManagement from '../Users/UserManagement';
import Analytics from '../Analytics/Analytics';
import AIPreferences from '../AI/AIPreferences';
import Settings from '../Settings/Settings';

const DashboardLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <motion.main 
          className="flex-1 overflow-auto bg-gray-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/tryon" element={<TryOnStudio />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/ai" element={<AIPreferences />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;