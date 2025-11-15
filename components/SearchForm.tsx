import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { BookingCategory, Location } from '../types';
import LocationInput from './LocationInput';

interface SearchFormProps {
  onSearch: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const { translations, bookingCategory } = useAppContext();
  const [fromLocation, setFromLocation] = useState<Location | null>(null);
  const [toLocation, setToLocation] = useState<Location | null>(null);

  const renderExtraFields = () => {
    switch (bookingCategory) {
      case BookingCategory.Hotel:
        return (
          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700">{translations.guests}</label>
            <input type="number" id="guests" defaultValue="2" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="grid grid-cols-1 gap-4">
        <LocationInput
          label={translations.from}
          onLocationSelect={setFromLocation}
        />
        <LocationInput
          label={translations.to}
          onLocationSelect={setToLocation}
        />
        <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">{translations.date}</label>
              <input type="date" id="date" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            {renderExtraFields()}
        </div>
      </div>
      <button
        onClick={onSearch}
        className="mt-4 w-full bg-indigo-600 text-white py-2.5 rounded-md font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        {translations.search}
      </button>
    </div>
  );
};

export default SearchForm;