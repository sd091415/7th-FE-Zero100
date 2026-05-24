import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

const InquiryWrite = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 나중에 이 부분에서 API 호출 
    console.log('등록할 데이터:', { title, content });
    
    alert('문의가 등록되었습니다.');
    navigate('/inquiry'); // 등록 후 목록으로 이동
  };

  return (
    <div className="w-full max-w-2xl">
      <h1 className="text-2xl font-bold mb-8 text-gray-900">문의하기</h1>
      
      {/* 카드 모양 */}
      <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
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