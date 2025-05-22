import React from 'react';

interface SelectFieldProps {
  id: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: {
    value: string;
    label: string;
  }[];
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  disabled = false,
  required = false,
  className = ''
}) => {
  return (
    <select
      id={id}
      name={name || id}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={className}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
