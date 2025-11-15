
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Language } from '../types';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useAppContext();

  const toggleLanguage = () => {
    setLanguage(language === Language.EN ? Language.TA : Language.EN);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1.5 border border-indigo-500 text-indigo-500 rounded-full text-sm font-semibold hover:bg-indigo-50 transition-colors"
    >
      {language === Language.EN ? 'தமிழ்' : 'English'}
    </button>
  );
};

export default LanguageToggle;
