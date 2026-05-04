import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
      <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 w-full max-w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-8">회원가입</h1>
        
        <form className="flex flex-col gap-4">
          <TextInput 
            placeholder="이메일을 입력하세요" 
            type="email" 
            errorMessage="올바른 이메일 형식을 입력하세요" 
          />
          <TextInput placeholder="비밀번호를 입력하세요" type="password" />
          <p className="text-xs text-gray-400 -mt-2 mb-2">8자 이상, 영문/숫자/특수문자 포함</p>
          
          <TextInput placeholder="비밀번호를 입력하세요" type="password" />
          <p className="text-xs text-gray-400 -mt-2 mb-4">2자 이상 8자 이하</p>
          
          <Button type="button" variant="primary">회원가입</Button>
        </form>
        
        <p className="text-center text-sm text-gray-600 mt-8">
          이미 계정이 있으신가요? <Link to="/login" className="font-bold text-black underline ml-1">로그인</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;