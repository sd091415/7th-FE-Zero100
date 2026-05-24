import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex justify-between items-center px-8 sticky top-0 z-10 min-w-max">
      <Link to="/dashboardhome" className="text-xl font-bold text-black">
        ZERO100 Admin
      </Link>
      <button onClick={handleLogout} className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
        로그아웃
      </button>
    </header>
  );
};

export default Header;