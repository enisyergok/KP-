import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ProgressWidgetProps {
  title: string;
  value: number;
  maxValue: number;
  icon?: IconDefinition;
  minLabel?: string;
  maxLabel?: string;
  className?: string;
}

const ProgressWidget: React.FC<ProgressWidgetProps> = ({
  title,
  value,
  maxValue,
  icon,
  minLabel = '0',
  maxLabel,
  className = ''
}) => {
  const percentage = Math.min(Math.max(0, (value / maxValue) * 100), 100);
  
  return (
    <div className={`progress-widget ${className}`}>
      <div className="progress-header">
        <div className="progress-title">
          {icon && <FontAwesomeIcon icon={icon} className="me-2" />}
          {title}
        </div>
        <div className="progress-value">{value} / {maxValue}</div>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="progress-labels">
        <span>{minLabel}</span>
        <span>{maxLabel || maxValue}</span>
      </div>
    </div>
  );
};

export default ProgressWidget;
