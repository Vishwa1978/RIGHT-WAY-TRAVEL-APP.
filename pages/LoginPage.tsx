
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import LanguageToggle from '../components/LanguageToggle';

const LoginPage: React.FC = () => {
  const { translations, login } = useAppContext();
  const [phone, setPhone] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      login(phone);
    } else {
      alert('Please enter a valid 10-digit phone number.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">{translations.appName}</h1>
          <p className="text-gray-500 mt-2">{translations.loginSubtitle}</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{translations.phoneLabel}</label>
            <div className="flex items-center border border-gray-300 rounded-md shadow-sm">
                <span className="px-3 text-gray-500">+91</span>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                    className="w-full p-2.5 border-l border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md"
                    placeholder={translations.phonePlaceholder}
                    required
                />
            </div>
          </div>
          
          <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-md font-semibold hover:bg-indigo-700 transition-colors">
            {translations.sendOtp}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2.5 rounded-md font-semibold hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
            <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.42-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6.02C43.63 37.98 46.98 31.85 46.98 24.55z"></path>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
            <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.82l-7.73-6.02c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </svg>
          {translations.loginWithGoogle}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
