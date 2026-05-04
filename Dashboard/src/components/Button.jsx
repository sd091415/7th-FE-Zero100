import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
  // 버튼 기본 스타일 
  const baseStyle = "w-full py-3 rounded-lg font-bold transition-colors flex justify-center items-center gap-2";
  
  // variant에 따른 색상 스타일
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800", // 기본 검은색 버튼
    kakao: "bg-[#FEE500] text-[#000000] hover:bg-[#FFEB3B]", // 카카오 버튼
    cancel: "bg-white text-black border border-gray-300 hover:bg-gray-50", // 취소 버튼
    danger: "bg-red-500 text-white hover:bg-red-600", // 삭제 버튼
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;