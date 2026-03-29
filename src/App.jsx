import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ListPage from './pages/ListPage';

function App() {
  // 1. Hardcode the start page to 'landing'
  const [currentPage, setCurrentPage] = useState('landing');

  // 2. Navigation function that we will pass to other pages
  const navigate = (pageName) => {
    console.log("Moving to:", pageName); // This helps us debug in the browser console
    setCurrentPage(pageName);
  };

  // 3. Simple Conditional Rendering
  return (
    <div className="App">
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

export default App;