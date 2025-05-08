// src/components/common/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  const baseStyle = "font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out inline-flex items-center justify-center";
  // 테마 색상 적용
  const variantStyles = {
    primary: "bg-infocus-primary text-white hover:bg-opacity-90 focus:ring-infocus-primary rounded-md",
    secondary: "bg-infocus-divider text-infocus-text hover:bg-opacity-80 focus:ring-infocus-muted rounded-md",
    outline: "border border-infocus-primary text-infocus-primary hover:bg-infocus-primary/10 focus:ring-infocus-primary rounded-md",
    ghost: "text-infocus-primary hover:bg-infocus-primary/10 focus:ring-infocus-primary rounded-md",
    accent: "bg-infocus-accent text-infocus-primary hover:bg-opacity-90 focus:ring-infocus-accent rounded-md",
  };
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;