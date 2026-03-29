import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ListPage from './pages/ListPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  // Centralized Navigation Function
  const navigate = (page) => {
    console.log("Navigating to:", page); // Debugging helper
    setCurrentPage(page);
  };

  return (
    <div className="App bg-slate-900 min-h-screen">
      {currentPage === 'landing' && (
        <LandingPage onStart={() => navigate('login')} />
      )}
      
      {currentPage === 'login' && (
        <LoginPage 
          onLogin={() => navigate('dashboard')} 
          onBack={() => navigate('landing')}
          onGuest={() => navigate('dashboard')}
        />
      )}

      {currentPage === 'dashboard' && (
        <Dashboard onNavigate={navigate} />
      )}

      {currentPage === 'list' && (
        <ListPage onNavigate={navigate} />
      )}
    </div>
  );
}