import React from 'react';

const TextInput = ({ label, type = 'text', placeholder, value, onChange, errorMessage, className = '' }) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && <label className="text-sm font-semibold text-black mb-1">{label}</label>}
      
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-gray-50 border rounded-lg outline-none focus:ring-2 transition-all text-sm
          ${errorMessage ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-black focus:border-transparent'}
        `}
      />
      
      {/* 에러가 있을 때만 렌더링 */}
      {errorMessage && <span className="text-xs text-red-500 mt-1">{errorMessage}</span>}
    </div>
  );
};

export default TextInput;