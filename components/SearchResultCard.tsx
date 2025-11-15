
import React from 'react';
import { SearchResult } from '../types';
import { useAppContext } from '../hooks/useAppContext';

interface SearchResultCardProps {
  result: SearchResult;
  onBook: (result: SearchResult) => void;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ result, onBook }) => {
    const { translations } = useAppContext();
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex">
      <img src={result.imageUrl} alt={result.title} className="w-1/3 h-auto object-cover" />
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{result.title}</h3>
          <p className="text-sm text-gray-500">{result.subtitle}</p>
          {result.rating && (
            <div className="flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span className="text-sm text-gray-600 ml-1">{result.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-lg text-indigo-600">{result.price}</span>
          <button onClick={() => onBook(result)} className="bg-indigo-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-indigo-600 transition-colors">
            {translations.bookNow}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
