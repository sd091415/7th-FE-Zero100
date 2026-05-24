import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboardhome'); // 로그인 성공 시 대시보드 홈으로 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
      <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 w-full max-w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-8">로그인</h1>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <TextInput placeholder="이메일을 입력하세요" type="email" />
          <TextInput placeholder="비밀번호를 입력하세요" type="password" />
          <Button type="submit" variant="primary">로그인</Button>
        </form>
        
        <div className="relative flex items-center justify-center my-6">
          <div className="absolute border-t border-gray-200 w-full"></div>
          <span className="bg-white px-4 text-xs text-gray-400 relative">또는</span>
        </div>
        
        <Button variant="kakao">카카오 로그인</Button>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          계정이 없으신가요? <Link to="/signup" className="font-bold text-black underline ml-1">회원가입</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;