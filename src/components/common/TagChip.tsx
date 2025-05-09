// src/components/common/TagChip.tsx
import React from 'react';

interface TagChipProps {
  tag: string;
  onClick?: (tag: string) => void;
  className?: string;
  isActive?: boolean; // 활성 상태 표시를 위한 prop 추가
}

const TagChip: React.FC<TagChipProps> = ({ tag, onClick, className, isActive }) => {
  const baseClasses = "px-3 py-1 text-xs sm:text-sm rounded-full cursor-pointer hover:opacity-80 transition-opacity";
  const activeClasses = isActive
    ? "bg-infocus-primary text-white"
    : "bg-infocus-accent/30 text-infocus-primary"; // accent 색상을 활용하거나, 테마에 맞는 다른 색상 사용

  return (
    <span
      className={`${baseClasses} ${activeClasses} ${className || ''}`}
      onClick={() => onClick && onClick(tag)}
    >
      #{tag}
    </span>
  );
};

export default TagChip;