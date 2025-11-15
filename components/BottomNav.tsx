
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Page } from '../types';

const NavItem: React.FC<{
  page: Page;
  icon: JSX.Element;
  label: string;
}> = ({ page, icon, label }) => {
  const { page: currentPage, setPage } = useAppContext();
  const isActive = currentPage === page;

  return (
    <button
      onClick={() => setPage(page)}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
        isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-500'
      }`}
    >
      {React.cloneElement(icon, { className: 'h-6 w-6' })}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

const BottomNav: React.FC = () => {
  const { translations } = useAppContext();

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 flex justify-around shadow-top z-10">
      <NavItem
        page={Page.Home}
        label={translations.navHome}
        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" /></svg>}
      />
      <NavItem
        page={Page.Booking}
        label={translations.navBookings}
        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-1.5h5.25m-5.25 0h3m-3 0h-3m2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" /></svg>}
      />
      <NavItem
        page={Page.Profile}
        label={translations.navProfile}
        icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
      />
    </nav>
  );
};

export default BottomNav;