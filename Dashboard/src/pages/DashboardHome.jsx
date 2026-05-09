import React from 'react';

const DashboardHome = () => {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-8 text-gray-900">대시보드 홈</h1>
 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm transition-shadow hover:shadow-md">
          <h2 className="text-lg font-bold mb-6 text-gray-800">내 정보</h2>
          <div className="flex flex-col gap-5 text-sm">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <span className="text-gray-500 font-medium">이름</span>
              <span className="font-bold text-gray-900">홍준표</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <span className="text-gray-500 font-medium">이메일</span>
              <span className="font-bold text-gray-900">sd091415@example.com</span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-gray-500 font-medium">가입일</span>
              <span className="font-bold text-gray-900">2026.05.07</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm transition-shadow hover:shadow-md">
          <h2 className="text-lg font-bold mb-6 text-gray-800">문의 현황</h2>
          <div className="flex flex-col gap-5 text-sm">
            {/* 나중에 버튼식 연결 */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <span className="text-gray-500 font-medium">전체 문의</span> 
              <span className="font-bold text-black-600 text-base">24건</span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-gray-500 font-medium">내가 쓴 문의</span>
              <span className="font-bold text-black-600 text-base">8건</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;