import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'accent' | 'danger' | 'success' | 'info';
  onClick?: () => void;
  icon?: IconDefinition;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'accent',
  onClick,
  icon,
  disabled = false,
  children,
  className = ''
}) => {
  const variantClass = {
    accent: 'btn-accent',
    danger: 'btn-danger',
    success: 'btn-success',
    info: 'btn-info'
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variantClass} ${className}`}
    >
      {icon && <FontAwesomeIcon icon={icon} className="me-2" />}
      {children}
    </button>
  );
};

export default Button;
