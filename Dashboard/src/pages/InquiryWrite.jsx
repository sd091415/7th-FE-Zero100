import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import axios from 'axios';

const InquiryWrite = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleInquirySubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지

    // 빈칸 검사
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
        return;
      }

      const response = await axios.post(
        'https://leetszero100-fe.kro.kr/api/inquiries',
        {
          title: title,
          content: content
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 201) {
        alert('문의가 성공적으로 등록되었습니다!');
        navigate('/inquiry'); 
      }

    } catch (error) {
      if (error.response) {
        const status = error.response.status; 
        const errorMessage = error.response.data.error; 

        if (status === 400) {
          alert(`입력 확인: ${errorMessage}`); 
        } else if (status === 401) {
          alert(`인증 실패: ${errorMessage}`); 
          navigate('/login');
        } else {
          alert('알 수 없는 문제가 발생했습니다.');
        }
      } else {
          console.error('서버 연결 차단 또는 통신 실패:', error);
          alert('서버와 연결할 수 없습니다. 백엔드 상태를 확인해주세요.');
        }
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <h1 className="text-2xl font-bold mb-8 text-gray-900">문의하기</h1>
      
      {/* 카드 모양 */}
      <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
        <form onSubmit={handleInquirySubmit} className="flex flex-col gap-6">
          
          <TextInput 
            label="제목" 
            placeholder="제목을 입력하세요" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextInput 
            label="내용" 
            placeholder="내용을 입력하세요" 
            isTextArea={true} 
            rows={12} 
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="flex justify-end gap-3 mt-6">
            <div className="w-18">
              <Button 
                variant="cancel" 
                type="button" 
                className="w-24"
                onClick={() => navigate('/inquiry')}
              >
                취소
              </Button>
            </div>
            <div className="w-18">
              <Button variant="primary" type="submit">
                등록
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InquiryWrite;