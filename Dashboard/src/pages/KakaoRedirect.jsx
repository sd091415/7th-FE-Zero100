import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 현재 브라우저 주소창에서 ?code= 뒤에 있는 인가 코드만 획득.
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    // 인가 코드가 없는 경우
    if (!code) {
      alert('카카오 로그인 인증 코드가 없습니다.');
      navigate('/login');
      return;
    }

    // 인가 코드가 있는 경우
    const sendCodeToBackend = async () => {
      try {
        const response = await axios.get(
          `https://leetszero100-fe.kro.kr/api/auth/kakao/redirect?code=${code}`
        );

        if (response.status === 200) {
          const { accessToken } = response.data.data;
   
          localStorage.setItem('accessToken', accessToken);
          
          alert('카카오 로그인에 성공했습니다!');
          navigate('/dashboardhome'); // 로그인 성공 후 대시보드로 이동
        }

      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          const errorMessage = error.response.data.error; 
          const errorData = error.response.data;

          if (status === 401) {
            alert(`회원가입 필요: ${errorMessage}`);
            navigate('/signup', { state: { kakaoId: errorData.kakaoId } });
            return;
          } else if (status === 400) {
            alert(`인증 실패: ${errorMessage}`); 
            navigate('/login');
          } else if (status === 500) {
            alert(`카카오 로그인 실패: ${errorMessage}`); 
            navigate('/login');
          } else {
            alert('알 수 없는 문제가 발생했습니다.');
          } 
        }
        else {
          console.error('서버 연결 실패:', error);
          alert('서버와 통신할 수 없습니다.');
        }
      }
    };

    sendCodeToBackend();
    }, [navigate]);

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mb-4"></div>
        <p className="text-gray-600 font-medium text-sm">카카오 로그인 처리 중입니다...</p>
        </div>
    );
};

export default KakaoRedirect;