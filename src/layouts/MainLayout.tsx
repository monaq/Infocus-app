// src/layouts/MainLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    // 테마의 기본 캔버스 색상을 전체 앱 배경으로 설정
    <div className="bg-super-ultra-blue antialiased bg-infocus-canvas text-infocus-text">
      <main className="min-h-screen">
        <Outlet />
      </main>
      {/* <BottomNavigationBar /> */}
    </div>
  );
};

export default MainLayout;