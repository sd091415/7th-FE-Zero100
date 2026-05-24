import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F8F9FA]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        {/* 메인 컨텐츠 */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto">
          {/* 페이지 내용 */}
          <main className="flex-1 p-10">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;