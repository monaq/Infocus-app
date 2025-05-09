// src/components/layout/AppHeader.tsx
import React from 'react';

interface AppHeaderProps {
  title: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
  return (
    // 테마 색상 적용
    <header className="bg-infocus-surface shadow-sm sticky top-0 z-50 border-b border-infocus-divider">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-infocus-primary">{title}</h1>
      </div>
    </header>
  );
};

export default AppHeader;