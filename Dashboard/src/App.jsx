import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AdminLayout from './layouts/AdminLayout';

import Login from './pages/Login';
import Signup from './pages/Signup';
import KakaoRedirect from './pages/KakaoRedirect';
import DashboardHome from './pages/DashboardHome';
import InquiryList from './pages/InquiryList';
import InquiryWrite from './pages/InquiryWrite';
import InquiryDetail from './pages/InquiryDetail';
import MyPage from './pages/MyPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/auth/kakao/callback" element={<KakaoRedirect />} />

        <Route element={<AdminLayout />}>
          {/* 로그인 페이지부터 시작 */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/dashboardhome" element={<DashboardHome />} />
          
          <Route path="/inquiry" element={<InquiryList />} />
          <Route path="/inquiry/write" element={<InquiryWrite />} />
          <Route path="/inquiry/:id" element={<InquiryDetail />} />
          <Route path="/mypage" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;