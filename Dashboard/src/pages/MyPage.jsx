import React from 'react';
import Button from '../components/Button';
import TextInput from '../components/TextInput';

const MyPage = () => {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-8">마이페이지</h1>
      
      <div className="flex flex-col gap-6">
        {/* 이름 변경 카드 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-6">이름 변경</h2>
          <div className="flex flex-col items-end gap-4">
            <TextInput placeholder="텍스트를 입력하세요" />
            <Button variant="primary" className="!w-24">변경</Button>
          </div>
        </div>

        {/* 비밀번호 변경 카드 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-6">비밀번호 변경</h2>
          <div className="flex flex-col items-end gap-4 w-full">
            <TextInput label="현재 비밀번호" placeholder="현재 비밀번호" type="password" />
            <TextInput label="새 비밀번호" placeholder="새 비밀번호" type="password" />
            <TextInput label="새 비밀번호 확인" placeholder="새 비밀번호 확인" type="password" />
            <Button variant="primary" className="!w-24 mt-2">변경</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;