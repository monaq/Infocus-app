// src/components/layout/BottomNavigationBar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Bookmark, Edit3 } from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: '/', label: '홈', icon: <Home size={22} /> },
  { path: '/saved', label: '저장함', icon: <Bookmark size={22} /> },
  { path: '/generate', label: '요약', icon: <Edit3 size={22} /> },
];

const BottomNavigationBar: React.FC = () => {
  return (
    // 테마 색상 적용
    <nav className="fixed bottom-0 left-0 right-0 bg-infocus-surface border-t border-infocus-divider shadow-top-md z-50">
      <div className="container mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-1 w-1/4 transition-colors ${
                isActive
                  ? 'text-infocus-primary' // 활성 탭 색상
                  : 'text-infocus-muted hover:text-infocus-subtext'
              }`
            }
          >
            {item.icon}
            <span className={`text-xs mt-1 ${item.path === '/' && 'font-medium' /* 예시: 홈 탭 글꼴 강조 */ }`}>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigationBar;