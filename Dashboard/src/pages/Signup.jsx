import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();

  // 입력창의 값들을 저장할 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // 이메일 형식 확인
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // 8자 이상, 영문/숫자/특수문자 포함 확인
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|\\:;"'<>,.?/-]).{8,}$/;

  // 오류 문자
  const emailError = email && !emailRegex.test(email) ? '올바른 이메일 형식을 입력하세요' : '';  
  const passwordError = password && !passwordRegex.test(password) ? '8자 이상, 영문/숫자/특수문자 포함이어야 합니다' : '';
  const confirmError = passwordConfirm && password !== passwordConfirm ? '비밀번호가 일치하지 않습니다' : '';

  // 폼 제출 시 실행되는 함수
  const handleSignup = async (e) => {
    e.preventDefault(); 

    // 빈 칸이나 에러의 경우 제출 막기
    if (!email || !password || !passwordConfirm) {
      alert('모든 정보를 입력해주세요.');
      return;
    }
    if (emailError || passwordError || confirmError) {
      alert('입력한 정보를 다시 확인해주세요.');
      return;
    }
  
    // API 서버로 데이터 전송
    try {
      const response = await axios.post(
        'https://leetszero100-fe.kro.kr/api/auth/signup',
        {
          email: email,       
          password: password, 
          // 임시 값 적용
          name: "홍길동",      
          kakaoId: "123456789" 
        }
      );

      if (response.status === 201) {
        alert('회원가입이 완료되었습니다.'); 
        navigate('/login'); 
      }

    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const errorMessage = error.response.data.error; 

        // errorMessage가 여러 종류의 오류 처리
        if (status === 400) {
          alert(`입력값을 다시 확인해주세요: ${errorMessage}`);
        } else if (status === 409) {
          alert(`가입 실패: ${errorMessage}`);
        } else {
          alert('회원가입 처리 중 문제가 발생했습니다.');
        }
      } else {
          // 서버 연결 실패시
          console.error('서버 연결 실패:', error);
          alert('서버와 연결할 수 없습니다. 백엔드 상태를 확인해주세요.');
        }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
      <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 w-full max-w-100">
        <h1 className="text-2xl font-bold text-center mb-8">회원가입</h1>
        
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <TextInput 
            placeholder="이메일을 입력하세요" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            errorMessage={emailError}
          />
          <TextInput 
            placeholder="비밀번호를 입력하세요" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={passwordError} 
          />
          <p className="text-xs text-gray-400 -mt-2 mb-2">8자 이상, 영문/숫자/특수문자 포함</p>
          
          <TextInput 
            placeholder="비밀번호 확인" 
            type="password" 
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            errorMessage={confirmError} 
          />
          
          <Button type="submit" variant="primary">회원가입</Button>
        </form>
        
        <p className="text-center text-sm text-gray-600 mt-8">
          이미 계정이 있으신가요? <Link to="/login" className="font-bold text-black underline ml-1">로그인</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;