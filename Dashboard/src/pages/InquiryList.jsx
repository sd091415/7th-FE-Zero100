import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';

const InquiryList = () => {
  const navigate = useNavigate();

  // 나중에 교체할 임시 데이터입니다.
  const inquiries = [
    { id: 3, title: '회원가입 문의', author: '홍준표', date: '2026.05.07', status: '답변대기' },
    { id: 2, title: '대시보드 기능 개선 요청', author: '홍준표', date: '2026.05.05', status: '답변완료' },
    { id: 1, title: 'API 연동 방법 문의.', author: '홍준표', date: '2026.05.05', status: '답변완료' },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">문의</h1>
        
        {/* 문의하기 버튼: 클릭 시 /inquiry/write로 이동 */}
        <div className="w-32">
          <Button variant="primary" onClick={() => navigate('/inquiry/write')}>
            문의하기
          </Button>
        </div>
      </div>

      {/* 게시판 테이블 */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          
          {/* 테이블 헤더 */}
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
              <th className="py-4 px-6 font-medium text-center w-16">No</th>
              <th className="py-4 px-6 font-medium">제목</th>
              <th className="py-4 px-6 font-medium text-center w-28">작성자</th>
              <th className="py-4 px-6 font-medium text-center w-32">작성일</th>
              <th className="py-4 px-6 font-medium text-center w-28">상태</th>
            </tr>
          </thead>
          
          {/* 테이블 본문 */}
          <tbody>
            {inquiries.map((inquiry) => (
              <tr 
                key={inquiry.id} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer text-sm"
              >
                <td className="py-4 px-6 text-center text-gray-500">{inquiry.id}</td>
                <td className="py-4 px-6 truncate">
                  {/* 제목에 Link 와 스타일 적용 */}
                  <Link 
                    to={`/inquiry/${inquiry.id}`}
                    className="text-gray-900 font-medium hover:underline hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded px-1 py-0.5 outline-none"
                  >
                    {inquiry.title}
                  </Link>
                </td>
                <td className="py-4 px-6 text-center text-gray-600">{inquiry.author}</td>
                <td className="py-4 px-6 text-center text-gray-500">{inquiry.date}</td>
                <td className="py-4 px-6 text-center">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                    // 답변대기 및 답변완료 구분용
                    inquiry.status === '답변대기' 
                      ? 'bg-red-50 text-red-500' 
                      : 'bg-blue-50 text-blue-600' 
                  }`}>
                    {inquiry.status}
                  </span>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {inquiries.length === 0 && (
          <div className="py-16 text-center text-gray-400">
            등록된 문의가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryList;