import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import axios from 'axios';

const MyPage = () => {
  const navigate = useNavigate();
  const [newName, setNewName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleNameChange = async () => {
    try {
      const token = localStorage.getItem('accessToken'); // 토큰 가져오기

      if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        return;
      }

      // 서버에 이름 변경 요청 보내기
      const response = await axios.patch(
        'https://leetszero100-fe.kro.kr/api/auth/me',
        { name: newName }, // 바꿀 데이터 (Body)
        {
          headers: {
            Authorization: `Bearer ${token}`, // 가져오는 위치 (Headers)
          },
        }
      );

      // 성공 시 처리
      if (response.status === 200) {
        alert('이름이 성공적으로 변경되었습니다!');
        setNewName('');
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const errorMessage = error.response.data.error;

        if (status === 400) {
          alert(`입력 확인: ${errorMessage}`);
        } else if (status === 401) {
          alert(`인증 실패: ${errorMessage}`); 
          localStorage.removeItem('accessToken'); // 토큰 제거 후 로그인 화면으로 이동
          navigate('/login');
        } else {
          alert('로그인 처리 중 알 수 없는 문제가 발생했습니다.');
        }
      } else {
        console.error('서버 연결 실패:', error);
        alert('서버와 연결할 수 없습니다. 백엔드 상태를 확인해주세요.');
      }
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== passwordConfirm) {
      alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        alert('로그인이 필요한 서비스입니다.');
        return;
      }

      const response = await axios.patch(
        'https://leetszero100-fe.kro.kr/api/auth/me/password',
        {
          currentPassword: currentPassword,
          newPassword: newPassword
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert('비밀번호가 성공적으로 변경되었습니다!');
        setCurrentPassword('');
        setNewPassword('');
        setPasswordConfirm('');
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const errorMessage = error.response.data.error;

        if (status === 400) {
          alert(`입력 확인: ${errorMessage}`);
        } else if (status === 401) {
          alert(`인증 실패: ${errorMessage}`); 
          localStorage.removeItem('accessToken'); // 토큰 제거 후 로그인 화면으로 이동
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

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-8">마이페이지</h1>
      
      <div className="flex flex-col gap-6">
        {/* 이름 변경 카드 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-6">이름 변경</h2>
          <div className="flex flex-col items-end gap-4">
            <TextInput 
              placeholder="텍스트를 입력하세요" 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)}
            />
            <Button variant="primary" className="w-24!" onClick={handleNameChange}>변경</Button>
          </div>
        </div>

        {/* 비밀번호 변경 카드 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-6">비밀번호 변경</h2>
          <form onSubmit={handlePasswordChange} className="flex flex-col items-end gap-4 w-full">
            <TextInput label="현재 비밀번호" placeholder="현재 비밀번호" type="password" value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}/>
            <TextInput label="새 비밀번호" placeholder="새 비밀번호" type="password" value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}/>
            <TextInput label="새 비밀번호 확인" placeholder="새 비밀번호 확인" type="password" value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}/>
            <Button type="submit" variant="primary" className="w-24! mt-2">변경</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyPage;