import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ListPage from './pages/ListPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  return (
    <div className="App bg-slate-800 min-h-screen">
      {currentPage === 'landing' && (
        <LandingPage onStart={() => setCurrentPage('login')} />
      )}
      
      {currentPage === 'login' && (
        <LoginPage 
          onLogin={() => setCurrentPage('dashboard')} 
          onBack={() => setCurrentPage('landing')}
          onGuest={() => setCurrentPage('dashboard')}
        />
      )}

      {currentPage === 'dashboard' && (
        <Dashboard onNavigate={setCurrentPage} />
      )}

      {currentPage === 'list' && (
        <ListPage onNavigate={setCurrentPage} />
      )}
    </div>
  );
}

export default App;