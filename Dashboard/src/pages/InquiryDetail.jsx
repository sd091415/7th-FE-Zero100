import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import axios from 'axios';

const InquiryDetail = () => {
  const navigate = useNavigate();
  // useParams를 통해 id 받아오기
  const { id } = useParams(); 

  const [inquiry, setInquiry] = useState(' ');

  const handleInquiryDelete = async () => {
    if (!window.confirm('정말 이 문의를 삭제하시겠습니까?')) {
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
        return;
      }

      const response = await axios.delete(
        `https://leetszero100-fe.kro.kr/api/inquiries/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        alert('문의가 정상적으로 삭제되었습니다.');
        navigate('/inquiry');
      }

    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const errorMessage = error.response.data.error;

        if (status === 401) {
          alert(`인증 실패: ${errorMessage}`);
          navigate('/login');
        } else if (status === 403) {
        alert(`본인 확인: ${errorMessage}`); 
        } else if (status === 404) {
        alert(`사용자 오류: ${errorMessage}`); 
        } else {
          alert(`알 수 없는 문제가 발생했습니다.'}`);
        }
      } else {
        console.error('서버 연결 실패:', error);
        alert('서버와 연결할 수 없습니다. 백엔드 상태를 확인해주세요.');
      }
    }
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

        <div className="p-8 min-h-50 text-gray-800 leading-relaxed whitespace-pre-wrap">
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
            <Button variant="danger" className="w-24 bg-red-500 hover:bg-red-600 text-white" onClick={handleInquiryDelete}>
              삭제
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InquiryDetail;