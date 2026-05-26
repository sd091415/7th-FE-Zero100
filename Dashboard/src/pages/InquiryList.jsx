import React, { useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import axios from 'axios';

const InquiryList = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);

  // 문의 목록을 가져오는 함수
  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
        return;
      }

      const response = await axios.get(
        'https://leetszero100-fe.kro.kr/api/inquiries',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 200) {
        setInquiries(response.data.data);
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status; 
        const errorMessage = error.response.data.error; 

        if (status === 401) {
          alert(`인증 실패: ${errorMessage}`);
          navigate('/login');
        } else {
          alert('알 수 없는 문제가 발생했습니다.');
        }
      } else {
        console.error('서버 연결 실패:', error);
        alert('서버와 연결할 수 없습니다. 백엔드 상태를 확인해주세요.');
      }
    }
  };

  // 화면이 처음 켜질 때 실행
  useEffect(() => {
    fetchInquiries();
  }, []);

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
            </tr>
          </thead>
          
          {/* 테이블 본문 */}
          <tbody>
            {inquiries.map((inquiry, index) => (
              <tr 
                key={inquiry.id} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer text-sm"
              >
                <td className="py-4 px-6 text-center text-gray-500">{index+1}</td>
                <td className="py-4 px-6 truncate">
                  <Link 
                    to={`/inquiry/${inquiry.id}`}
                    className="text-gray-900 font-medium hover:underline hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded px-1 py-0.5 outline-none"
                  >
                    {inquiry.title}
                  </Link>
                </td>
                <td className="py-4 px-6 text-center text-gray-600">{inquiry.name}</td>
                <td className="py-4 px-6 text-center text-gray-500">{inquiry.created_at}</td>
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