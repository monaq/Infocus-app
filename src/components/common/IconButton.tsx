import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  ariaLabel: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, className, ariaLabel, ...props }) => {
  return (
    <button
      aria-label={ariaLabel}
      className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors ${className || ''}`}
      {...props}
    >
      {icon}
    </button>
  );
};
export default IconButton;