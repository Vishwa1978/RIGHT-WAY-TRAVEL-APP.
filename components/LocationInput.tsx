import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Location } from '../types';
import { MOCK_LOCATIONS, RECENT_LOCATIONS } from '../constants';

interface LocationInputProps {
  label: string;
  onLocationSelect: (location: Location | null) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ label, onLocationSelect }) => {
    const { translations, isFetchingLocation, locationError, fetchCurrentLocation } = useAppContext();
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        onLocationSelect({ name: value });
        if (value.length > 1) {
            const filtered = MOCK_LOCATIONS.filter(loc => loc.toLowerCase().includes(value.toLowerCase()));
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions(RECENT_LOCATIONS);
            setShowSuggestions(value.length === 0);
        }
    };

    const handleSuggestionClick = (locationName: string) => {
        setInputValue(locationName);
        onLocationSelect({ name: locationName });
        setShowSuggestions(false);
    };

    const handleCurrentLocation = async () => {
        const location = await fetchCurrentLocation();
        if (location) {
            setInputValue(location.name);
            onLocationSelect(location);
            setShowSuggestions(false);
        }
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <div className="relative mt-1">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => { if (!inputValue) { setSuggestions(RECENT_LOCATIONS); setShowSuggestions(true); } }}
                    className="w-full pl-3 pr-10 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={translations.searchLocationPlaceholder}
                    autoComplete="off"
                />
                <button
                    type="button"
                    onClick={handleCurrentLocation}
                    disabled={isFetchingLocation}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    aria-label={translations.useCurrentLocation}
                >
                    {isFetchingLocation ? (
                         <svg className="animate-spin h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : (
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-indigo-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                    )}
                </button>
            </div>
            {locationError && <p className="text-xs text-red-600 mt-1">{translations[locationError]}</p>}
            {showSuggestions && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
                    {suggestions === RECENT_LOCATIONS && suggestions.length > 0 && (
                        <li className="px-3 py-2 text-xs font-bold text-gray-500 uppercase">{translations.recentLocations}</li>
                    )}
                    {suggestions.map((item) => (
                        <li
                            key={item}
                            onClick={() => handleSuggestionClick(item)}
                            className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-indigo-50"
                        >
                            {item}
                        </li>
                    ))}
                    {suggestions.length === 0 && inputValue.length > 1 && (
                         <li className="px-3 py-2 text-sm text-gray-500">No results found.</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default LocationInput;
