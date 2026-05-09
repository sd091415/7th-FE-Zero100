import React from 'react';

const TextInput = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  errorMessage, 
  className = '',
  isTextArea = false, // true일 시 본문 내용처럼 조절
  rows = 10 // textarea일 때 기본 줄 수 (높이 조절용)
}) => {

  const commonStyle = `w-full px-4 py-3 bg-gray-50 border rounded-lg outline-none focus:ring-2 transition-all text-sm
    ${errorMessage ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-black focus:border-transparent'}
  `;

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && <label className="text-sm font-semibold text-black mb-1">{label}</label>}
      
      {/* 본문인지 아닌지에 따라 받는 태그 구분 */}
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`${commonStyle} resize-none`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={commonStyle}
        />
      )}
      
      {errorMessage && <span className="text-xs text-red-500 mt-1">{errorMessage}</span>}
    </div>
  );
};

export default TextInput;