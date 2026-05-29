import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardHome = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null); // 내 정보 저장용

  // 문의 개수를 담을 State
  const [totalCount, setTotalCount] = useState(0); 
  const [myCount, setMyCount] = useState(0);

  // 서버에 내 정보 요청
  const fetchMyInfo = async () => {
    try {
      const token = localStorage.getItem('accessToken'); // 토큰 가져오기

      if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
        return;
      }

      const response = await axios.get(
        'https://leetszero100-fe.kro.kr/api/auth/me',
        {
          headers: {
            Authorization: `Bearer ${token}` // 토큰 인증
          }
        }
      );
      const inquiryResponse = await axios.get(
        'https://leetszero100-fe.kro.kr/api/inquiries',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 200) {
        const myInfo = response.data.data; 
        setUserInfo(myInfo);

        // 전체 문의 개수
        const allInquiries = inquiryResponse.data.data;
        setTotalCount(allInquiries.lenght); 

        // 내 문의 개수
        const myInquiries = allInquiries.filter(
          (inquiry) => inquiry.name === myInfo.name
        );
        setMyCount(myInquiries.length);
      }
    } catch (error) {
      if (error.response) {
      const status = error.response.status; 
      const errorMessage = error.response.data.error; 

      if (status === 401) {
        alert(`인증 실패: ${errorMessage}`); 
        localStorage.removeItem('accessToken'); // 토큰 제거 후 로그인 화면으로 이동
        navigate('/login');
      } else if (status === 404) {
        alert(`사용자 오류: ${errorMessage}`); 
      } else {
        alert('알 수 없는 문제가 발생했습니다.');
      }
    } else {
        console.error('서버 연결 차단 또는 통신 실패:', error);
        alert('서버와 연결할 수 없습니다. 백엔드 상태를 확인해주세요.');
      }
    }
  };

  // 화면이 처음 켜질 때만 내 정보 가져오기
  useEffect(() => {
    fetchMyInfo();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-8 text-gray-900">대시보드 홈</h1>
 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm transition-shadow hover:shadow-md">
          <h2 className="text-lg font-bold mb-6 text-gray-800">내 정보</h2>
          <div className="flex flex-col gap-5 text-sm">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <span className="text-gray-500 font-medium">이름</span>
              <span className="font-bold text-gray-900">{userInfo ? userInfo.name : '로딩중...'}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <span className="text-gray-500 font-medium">이메일</span>
              <span className="font-bold text-gray-900">{userInfo ? userInfo.email : '로딩중...'}</span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-gray-500 font-medium">가입일</span>
              <span className="font-bold text-gray-900">{userInfo ? userInfo.created_at : '로딩중...'}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm transition-shadow hover:shadow-md">
          <h2 className="text-lg font-bold mb-6 text-gray-800">문의 현황</h2>
          <div className="flex flex-col gap-5 text-sm">
            {/* 나중에 버튼식 연결 */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <span className="text-gray-500 font-medium">전체 문의</span> 
              <span className="font-bold text-black text-base">{totalCount}건</span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-gray-500 font-medium">내가 쓴 문의</span>
              <span className="font-bold text-black text-base">{myCount}건</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;