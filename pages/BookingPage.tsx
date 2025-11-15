
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Page } from '../types';
import Header from '../components/Header';

const BookingPage: React.FC = () => {
  const { translations, selectedBooking, setPage } = useAppContext();

  if (!selectedBooking) {
    return (
      <div>
        <Header title="Error" showBackButton={true} backPage={Page.Search} />
        <p className="p-4">No booking selected. Please go back and select an item to book.</p>
      </div>
    );
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Proceeding to payment gateway!');
    // In a real app, integrate with a payment API
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <Header title={translations.bookingSummary} showBackButton={true} backPage={Page.Search} />
      <div className="p-4 flex-grow">
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="font-bold text-lg text-gray-800">{selectedBooking.title}</h3>
          <p className="text-sm text-gray-500">{selectedBooking.subtitle}</p>
          <div className="flex justify-between items-center mt-2 pt-2 border-t">
            <span className="text-gray-600">Total Price:</span>
            <span className="font-bold text-xl text-indigo-600">{selectedBooking.price}</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg text-gray-800 mb-4">{translations.yourDetails}</h3>
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">{translations.fullName}</label>
              <input type="text" id="fullName" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">{translations.age}</label>
              <input type="number" id="age" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">{translations.email}</label>
              <input type="email" id="email" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <button type="submit" className="w-full bg-green-500 text-white py-2.5 mt-2 rounded-md font-semibold hover:bg-green-600 transition-colors">
              {translations.proceedToPayment}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
