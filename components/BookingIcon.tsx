
import React from 'react';
import { BookingCategory } from '../types';

interface BookingIconProps {
  category: BookingCategory;
  label: string;
  onClick: (category: BookingCategory) => void;
  isWide?: boolean;
}

const ICONS: Record<BookingCategory, JSX.Element> = {
  [BookingCategory.Hotel]: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  [BookingCategory.Bus]: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-9-5.494h18m-18 0a9 9 0 0118 0m-18 0a9 9 0 0018 0m-9 5.494v-11.494" /></svg>,
  [BookingCategory.Train]: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 4v16m8-16v16m-8-12h8m-8 6h8m-8 6h8M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  [BookingCategory.Flight]: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
  [BookingCategory.Metro]: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4v11h-4V10zM17 10h4v11h-4V10zM7 10h10v11H7V10zM5 21h14M5 10V5a2 2 0 012-2h10a2 2 0 012 2v5M12 5V2m0 19v-2" /></svg>,
};

const BookingIcon: React.FC<BookingIconProps> = ({ category, label, onClick, isWide = false }) => {
  return (
    <button
      onClick={() => onClick(category)}
      className={`flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group ${isWide ? 'col-span-2' : ''}`}
    >
      <div className="text-indigo-500 group-hover:text-indigo-600 transition-colors">
        {ICONS[category]}
      </div>
      <span className="mt-3 font-semibold text-gray-700">{label}</span>
    </button>
  );
};

export default BookingIcon;