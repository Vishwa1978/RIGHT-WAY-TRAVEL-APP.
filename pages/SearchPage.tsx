
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { BookingCategory, Page, SearchResult } from '../types';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import SearchResultCard from '../components/SearchResultCard';

const generateMockData = (category: BookingCategory): SearchResult[] => {
    switch(category) {
        case BookingCategory.Hotel:
            return Array.from({ length: 5 }, (_, i) => ({ id: `h${i}`, category, title: `Luxury Hotel ${i+1}`, subtitle: 'City Center, Near Park', price: `₹${4500 + i * 500}`, rating: 4.5 + i * 0.1, imageUrl: `https://picsum.photos/400/300?random=${i}`}));
        case BookingCategory.Bus:
            return Array.from({ length: 5 }, (_, i) => ({ id: `b${i}`, category, title: `Express Bus ${i+1}`, subtitle: 'Mumbai to Pune', price: `₹${800 + i * 50}`, rating: 4.2 + i * 0.1, imageUrl: `https://picsum.photos/400/300?random=${i+10}`}));
        case BookingCategory.Train:
            return Array.from({ length: 5 }, (_, i) => ({ id: `t${i}`, category, title: `Shatabdi Express ${i+1}`, subtitle: 'Delhi to Agra', price: `₹${1200 + i * 100}`, rating: 4.8, imageUrl: `https://picsum.photos/400/300?random=${i+20}`}));
        case BookingCategory.Flight:
            return Array.from({ length: 5 }, (_, i) => ({ id: `f${i}`, category, title: `Airline Indigo ${i+1}`, subtitle: 'Chennai to Bengaluru', price: `₹${3500 + i * 200}`, rating: 4.6, imageUrl: `https://picsum.photos/400/300?random=${i+30}`}));
        case BookingCategory.Metro:
            return Array.from({ length: 5 }, (_, i) => ({ id: `m${i}`, category, title: `Blue Line Metro ${i+1}`, subtitle: 'Station A to Station B', price: `₹${40 + i * 5}`, imageUrl: `https://picsum.photos/400/300?random=${i+40}`}));
    }
}

const SearchPage: React.FC = () => {
  const { translations, bookingCategory, setPage, setSelectedBooking } = useAppContext();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const pageTitle = translations.searchTitle.replace('{category}', translations[bookingCategory]);

  const mockData = useMemo(() => generateMockData(bookingCategory), [bookingCategory]);

  const handleSearch = () => {
    // In a real app, this would be an API call
    setSearchResults(mockData);
  };
  
  const handleBookingSelect = (booking: SearchResult) => {
    setSelectedBooking(booking);
    setPage(Page.Booking);
  };

  return (
    <div className="flex flex-col h-full">
      <Header title={pageTitle} showBackButton={true} backPage={Page.Home} />
      <div className="p-4">
        <SearchForm onSearch={handleSearch} />
      </div>
      <div className="p-4 flex-grow bg-gray-50">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{translations.searchResults}</h2>
        <div className="space-y-4">
            {searchResults.length > 0 ? (
                 searchResults.map(result => (
                    <SearchResultCard key={result.id} result={result} onBook={handleBookingSelect} />
                 ))
            ) : (
                <p className="text-center text-gray-500 mt-8">Click search to see results.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
