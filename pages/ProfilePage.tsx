
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Header from '../components/Header';

const ProfilePage: React.FC = () => {
  const { translations, logout } = useAppContext();

  const savedBookings = [
    { id: 1, title: 'Flight to Bengaluru', date: '25 Dec 2023' },
    { id: 2, title: 'Luxury Hotel Stay', date: '15 Jan 2024' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <Header title={translations.profileTitle} />
      <div className="p-4">
        <div className="flex items-center bg-white p-4 rounded-lg shadow mb-6">
          <img src="https://picsum.photos/200" alt="User" className="w-16 h-16 rounded-full" />
          <div className="ml-4">
            <h2 className="font-bold text-xl text-gray-800">John Doe</h2>
            <p className="text-sm text-gray-500">+91 XXXXX XXXXX</p>
          </div>
          <button className="ml-auto text-indigo-600 hover:text-indigo-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg text-gray-800 mb-4">{translations.savedBookings}</h3>
          <div className="space-y-3">
            {savedBookings.map(booking => (
              <div key={booking.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                <div>
                  <p className="font-semibold text-gray-700">{booking.title}</p>
                  <p className="text-xs text-gray-500">{booking.date}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-8 w-full bg-red-500 text-white py-2.5 rounded-md font-semibold hover:bg-red-600 transition-colors flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          {translations.logout}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
