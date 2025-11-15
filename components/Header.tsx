
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Page } from '../types';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  backPage?: Page;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, backPage = Page.Home }) => {
    const { setPage } = useAppContext();

  return (
    <header className="bg-indigo-600 text-white p-4 shadow-md flex items-center">
      {showBackButton && (
        <button onClick={() => setPage(backPage)} className="mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <h1 className="text-xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;
