// src/components/layout/AppHeader.tsx
import React from 'react';
import defaultProfileImage from '@/assets/user-image.png';
import { supabase } from '@/services/supabaseClient';
import { Navigate, useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  userInfo: {
    name: string;
    email: string;
    profileImage: string;
  };
  title?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ userInfo, title }) => {
  const navigate = useNavigate()
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login');
  }

  return (
    // 테마 색상 적용
    <header className="bg-infocus-surface shadow-sm sticky top-0 z-50 border-b border-infocus-divider">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {userInfo.profileImage ? (
            <img src={userInfo.profileImage} alt="Profile" className="w-8 h-8 rounded-full" />
          ) : (
            <img src={defaultProfileImage} alt="Profile" className="w-8 h-8 rounded-full" />
          )}

          {title ? <span className="text-sm font-bold text-infocus-primary">{title}</span> : <span className="text-sm font-bold text-infocus-primary">{userInfo.name}</span>}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleLogout} className="text-sm text-infocus-primary">
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;