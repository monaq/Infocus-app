// src/components/common/IconButton.tsx
import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  ariaLabel: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, className, ariaLabel, ...props }) => {
  return (
    <button
      aria-label={ariaLabel}
      // 테마 색상에 맞게 hover/focus 상태 조정
      className={`p-2 rounded-full text-infocus-subtext hover:bg-infocus-divider focus:outline-none focus:ring-2 focus:ring-infocus-primary/50 transition-colors ${className || ''}`}
      {...props}
    >
      {icon}
    </button>
  );
};
export default IconButton;