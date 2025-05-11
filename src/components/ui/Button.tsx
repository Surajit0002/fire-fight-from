import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'success';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary'
}) => {
  const baseClasses = "px-6 py-3 rounded-md font-medium transition-all duration-200";
  
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-800/50",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white disabled:bg-gray-800/50",
    success: "bg-green-600 hover:bg-green-700 text-white disabled:bg-green-800/50"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${disabled ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg'}
      `}
    >
      {children}
    </button>
  );
};

export default Button;