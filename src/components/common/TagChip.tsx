// src/components/common/TagChip.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface TagChipProps {
  tag: string;
  onClick?: (tag: string) => void;
  to?: string; // 클릭 시 이동할 경로 (선택)
  className?: string;
}

const TagChip: React.FC<TagChipProps> = ({ tag, onClick, to, className }) => {
  const content = (
    <span
      className={`px-3 py-1 text-xs sm:text-sm bg-sky-100 text-sky-700 rounded-full cursor-pointer hover:bg-sky-200 transition-colors ${className || ''}`}
      onClick={() => onClick && onClick(tag)}
    >
      #{tag}
    </span>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }
  return content;
};

export default TagChip;