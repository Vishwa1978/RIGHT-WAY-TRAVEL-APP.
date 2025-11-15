import React, { createContext, useState, useMemo } from 'react';
import { AppContextType, Language, Page, BookingCategory, SearchResult, Location } from '../types';
import { translations } from '../constants';

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showOtpPage, setShowOtpPage] = useState<boolean>(false);
  const [page, setPage] = useState<Page>(Page.Home);
  const [bookingCategory, setBookingCategory] = useState<BookingCategory>(BookingCategory.Hotel);
  const [selectedBooking, setSelectedBooking] = useState<SearchResult | null>(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const login = (phone: string) => {
    console.log('Logging in with phone:', phone);
    setShowOtpPage(true);
  };

  const verifyOtp = (otp: string) => {
    console.log('Verifying OTP:', otp);
    if (otp.length === 4) { // Simple validation
      setIsAuthenticated(true);
      setShowOtpPage(false);
      setPage(Page.Home);
    }
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setShowOtpPage(false);
  };

  const fetchCurrentLocation = (): Promise<Location | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        setLocationError('locationUnavailable');
        resolve(null);
        return;
      }

      setIsFetchingLocation(true);
      setLocationError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsFetchingLocation(false);
          // Mock reverse geocoding
          resolve({ name: 'Your Current Location' });
        },
        (error) => {
          setIsFetchingLocation(false);
          if (error.code === error.PERMISSION_DENIED) {
            setLocationError('locationPermissionDenied');
          } else {
            setLocationError('locationUnavailable');
          }
          resolve(null);
        },
        { timeout: 10000 }
      );
    });
  };

  const currentTranslations = useMemo(() => translations[language], [language]);

  const value: AppContextType = {
    language,
    setLanguage,
    translations: currentTranslations,
    isAuthenticated,
    login,
    verifyOtp,
    logout,
    page,
    setPage,
    showOtpPage,
    bookingCategory,
    setBookingCategory,
    selectedBooking,
    setSelectedBooking,
    isFetchingLocation,
    locationError,
    fetchCurrentLocation
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};