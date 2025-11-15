
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { BookingCategory, Page } from '../types';
import BookingIcon from '../components/BookingIcon';

const HomePage: React.FC = () => {
  const { translations, setPage, setBookingCategory } = useAppContext();

  const handleCategorySelect = (category: BookingCategory) => {
    setBookingCategory(category);
    setPage(Page.Search);
  };

  return (
    <div className="p-4">
      <div className="mt-4 mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">{translations.homeTitle}</h1>
        <p className="text-gray-500 mt-2">{translations.homeSubtitle}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <BookingIcon category={BookingCategory.Hotel} label={translations.hotel} onClick={handleCategorySelect} />
        <BookingIcon category={BookingCategory.Bus} label={translations.bus} onClick={handleCategorySelect} />
        <BookingIcon category={BookingCategory.Train} label={translations.train} onClick={handleCategorySelect} />
        <BookingIcon category={BookingCategory.Flight} label={translations.flight} onClick={handleCategorySelect} />
      </div>
      <div className="mt-4">
        <BookingIcon category={BookingCategory.Metro} label={translations.metro} onClick={handleCategorySelect} isWide />
      </div>
    </div>
  );
};

export default HomePage;
