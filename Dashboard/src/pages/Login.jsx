import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
  e.preventDefault();

    try {
      const response = await axios.post(
        'https://leetszero100-fe.kro.kr/api/auth/login',
        {
          email: email,
          password: password
        }
      );

      // 성공 시 토큰 저장 및 이동
      if (response.status === 200) {
        const { accessToken } = response.data.data;
        localStorage.setItem('accessToken', accessToken); // 토큰 보관
        alert('로그인 성공!');
        navigate('/dashboardhome');
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status; 
        const errorMessage = error.response.data.error; 

        if (status === 400) {
          alert(`입력 확인: ${errorMessage}`); 
        } else if (status === 401) {
          alert(`인증 실패: ${errorMessage}`); 
        } else {
          alert('로그인 처리 중 알 수 없는 문제가 발생했습니다.');
        }
      } else {
          console.error('서버 연결 차단 또는 통신 실패:', error);
          alert('서버와 연결할 수 없습니다. 백엔드 상태를 확인해주세요.');
        }
    }
  };

  const handleKakaoLogin = () => {
    window.location.href = 'http://leetszero100-fe.kro.kr/api/auth/kakao';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
      <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 w-full max-w-100">
        <h1 className="text-2xl font-bold text-center mb-8">로그인</h1>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <TextInput placeholder="이메일을 입력하세요" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextInput placeholder="비밀번호를 입력하세요" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" variant="primary">로그인</Button>
        </form>
        
        <div className="relative flex items-center justify-center my-6">
          <div className="absolute border-t border-gray-200 w-full"></div>
          <span className="bg-white px-4 text-xs text-gray-400 relative">또는</span>
        </div>
        
        <Button variant="kakao" onClick={handleKakaoLogin}>카카오 로그인</Button>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          계정이 없으신가요? <Link to="/signup" className="font-bold text-black underline ml-1">회원가입</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;