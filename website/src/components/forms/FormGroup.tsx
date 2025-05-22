import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface FormGroupProps {
  label: string;
  htmlFor: string;
  icon?: IconDefinition;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  htmlFor,
  icon,
  required = false,
  children,
  className = ''
}) => {
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={htmlFor}>
        {icon && <FontAwesomeIcon icon={icon} className="me-2" />}
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>
      {children}
    </div>
  );
};

export default FormGroup;
