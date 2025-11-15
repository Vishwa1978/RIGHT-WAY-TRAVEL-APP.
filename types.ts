export enum Language {
  EN = 'en',
  TA = 'ta',
}

export enum Page {
  Home = 'home',
  Search = 'search',
  Booking = 'booking',
  Profile = 'profile',
}

export enum BookingCategory {
  Hotel = 'hotel',
  Bus = 'bus',
  Train = 'train',
  Flight = 'flight',
  Metro = 'metro',
}

export interface Location {
  name: string;
}

export interface SearchResult {
  id: string;
  category: BookingCategory;
  title: string;
  subtitle: string;
  price: string;
  rating?: number;
  imageUrl: string;
}

export interface AppContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, string>;
  isAuthenticated: boolean;
  login: (phone: string) => void;
  verifyOtp: (otp: string) => void;
  logout: () => void;
  page: Page;
  setPage: (page: Page) => void;
  showOtpPage: boolean;
  bookingCategory: BookingCategory;
  setBookingCategory: (category: BookingCategory) => void;
  selectedBooking: SearchResult | null;
  setSelectedBooking: (booking: SearchResult | null) => void;
  isFetchingLocation: boolean;
  locationError: string | null;
  fetchCurrentLocation: () => Promise<Location | null>;
}