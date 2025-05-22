import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

interface TrendWidgetProps {
  title: string;
  value: string | number;
  trend: {
    value: number;
    isPositive: boolean;
  };
  icon?: IconDefinition;
  className?: string;
}

const TrendWidget: React.FC<TrendWidgetProps> = ({
  title,
  value,
  trend,
  icon,
  className = ''
}) => {
  return (
    <div className={`trend-widget ${className}`}>
      <div className="trend-header">
        <div className="trend-title">
          {icon && <FontAwesomeIcon icon={icon} className="me-2" />}
          {title}
        </div>
      </div>
      <div className="trend-value">
        {value}
        <span className={`trend-indicator ${trend.isPositive ? 'positive' : 'negative'}`}>
          <FontAwesomeIcon icon={trend.isPositive ? faArrowUp : faArrowDown} />
          {trend.value}%
        </span>
      </div>
    </div>
  );
};

export default TrendWidget;
