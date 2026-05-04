import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menus = [
    { name: '대시보드 홈', path: '/dashboardhome' },
    { name: '문의', path: '/inquiry' },
    { name: '마이페이지', path: '/mypage' },
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-full flex flex-col pt-4 shrink-0">
      <nav className="flex flex-col">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `px-8 py-4 text-sm transition-colors ${
                isActive
                  ? 'bg-gray-200 text-black font-bold' // 선택중인 메뉴 스타일
                  : 'text-gray-700 font-medium hover:bg-gray-100' // 기본 메뉴 스타일
              }`
            }
          >
            {menu.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;