
import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useAppContext } from '../hooks/useAppContext';

const OtpPage: React.FC = () => {
  const { translations, verifyOtp } = useAppContext();
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Auto submit
    const fullOtp = newOtp.join('');
    if (fullOtp.length === 4) {
      verifyOtp(fullOtp);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-gray-800">{translations.otpTitle}</h1>
        <p className="text-gray-500 mt-2">{translations.otpSubtitle} +91-XXXXXX1234</p>
        
        <div className="flex justify-center gap-3 my-8">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              name="otp"
              maxLength={1}
              value={data}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
              // FIX: Wrapped the ref callback in curly braces to ensure a void return type, fixing the assignment error.
              ref={el => { inputRefs.current[index] = el; }}
              className="w-14 h-14 text-center text-2xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          ))}
        </div>

        <button
          onClick={() => verifyOtp(otp.join(''))}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-md font-semibold hover:bg-indigo-700 transition-colors"
        >
          {translations.verifyOtp}
        </button>

        <p className="mt-4 text-sm text-gray-500">
          Didn't receive code?{' '}
          <button className="font-medium text-indigo-600 hover:underline">
            {translations.resendOtp}
          </button>
        </p>
      </div>
    </div>
  );
};

export default OtpPage;