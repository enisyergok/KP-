import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface PerformanceListProps {
  title: string;
  items: {
    name: string;
    value: string | number;
  }[];
  icon?: IconDefinition;
  className?: string;
}

const PerformanceList: React.FC<PerformanceListProps> = ({
  title,
  items,
  icon,
  className = ''
}) => {
  return (
    <div className={`performance-list-container ${className}`}>
      <h4>
        {icon && <FontAwesomeIcon icon={icon} className="me-2" />}
        {title}
      </h4>
      <ul className="performance-list">
        {items.map((item, index) => (
          <li key={index}>
            <span className="name">{item.name}</span>
            <span className="value">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PerformanceList;
