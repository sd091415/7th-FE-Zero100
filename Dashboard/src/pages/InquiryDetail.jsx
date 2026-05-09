import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';

const InquiryDetail = () => {
  const navigate = useNavigate();
  // useParams를 통해 id 받아오기
  const { id } = useParams(); 

  const inquiry = {
    id: id,
    title: '로그인 비밀번호를 까먹었어요',
    author: '홍준표',
    date: '2026.05.07',
    status: '답변대기',
    content: '11',
    answer: null // 만약 답변이 있다면 answer에 텍스트
  };

  return (
    <div className="w-full max-w-3xl">
      <h1 className="text-2xl font-bold mb-8 text-gray-900">문의 상세내역</h1>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        
        <div className="p-8 border-b border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-900">{inquiry.title}</h2>
            
            {/* 상태 표현 */}
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
              inquiry.status === '답변대기' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-600'
            }`}>
              {inquiry.status}
            </span>
          </div>
          
          <div className="flex gap-4 text-sm text-gray-500">
            <span>작성자: <span className="font-medium text-gray-700">{inquiry.author}</span></span>
            <span>작성일: {inquiry.date}</span>
          </div>
        </div>

        <div className="p-8 min-h-[200px] text-gray-800 leading-relaxed whitespace-pre-wrap">
          {inquiry.content}
        </div>

        {/* answer가 존재할시 답변 표현 */}
        {inquiry.answer && (
          <div className="bg-gray-50 p-8 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">A</span>
              <h3 className="text-sm font-bold text-gray-900">관리자 답변</h3>
            </div>
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {inquiry.answer}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <div className="w-24">
          <Button variant="cancel" onClick={() => navigate('/inquiry')}>
            목록으로
          </Button>
        </div>
        
        <div className="flex gap-3">
          <div className="w-24">
            <Button variant="danger" onClick={() => { 
              alert('삭제되었습니다.'); 
              navigate('/inquiry'); 
            }}>
              삭제
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InquiryDetail;