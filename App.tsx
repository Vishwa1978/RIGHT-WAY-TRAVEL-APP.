
import React from 'react';
// FIX: `useAppContext` is exported from `hooks/useAppContext.ts`, not `context/AppContext.tsx`.
import { AppProvider } from './context/AppContext';
import { useAppContext } from './hooks/useAppContext';
import LoginPage from './pages/LoginPage';
import OtpPage from './pages/OtpPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import BookingPage from './pages/BookingPage';
import ProfilePage from './pages/ProfilePage';
import BottomNav from './components/BottomNav';
import { Page } from './types';

const AppContent: React.FC = () => {
  const { page, isAuthenticated, showOtpPage } = useAppContext();

  const renderPage = () => {
    if (!isAuthenticated) {
      if (showOtpPage) return <OtpPage />;
      return <LoginPage />;
    }

    switch (page) {
      case Page.Home:
        return <HomePage />;
      case Page.Search:
        return <SearchPage />;
      case Page.Booking:
        return <BookingPage />;
      case Page.Profile:
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };
  
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white shadow-lg flex flex-col">
      <main className="flex-grow pb-20">
        {renderPage()}
      </main>
      {isAuthenticated && <BottomNav />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;