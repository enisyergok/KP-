import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface MetricWidgetProps {
  title: string;
  value: string | number;
  icon?: IconDefinition;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  suffix?: string;
  className?: string;
}

const MetricWidget: React.FC<MetricWidgetProps> = ({
  title,
  value,
  icon,
  trend,
  suffix = '',
  className = ''
}) => {
  return (
    <div className={`dashboard-widget-card ${className}`}>
      <div className="content-card-header">
        <div className="header-title-group">
          {icon && <FontAwesomeIcon icon={icon} />}
          <span>{title}</span>
        </div>
      </div>
      <div className="widget-metric-value">
        {value}
        {suffix && <span className="metric-suffix">{suffix}</span>}
      </div>
      {trend && (
        <div className="widget-metric-label">
          <span className={`trend-indicator ${trend.isPositive ? 'positive' : 'negative'}`}>
            <FontAwesomeIcon 
              icon={trend.isPositive ? 
                { prefix: 'fas', iconName: 'arrow-up' } : 
                { prefix: 'fas', iconName: 'arrow-down' }
              } 
            />
            {trend.value}%
          </span>
          <span>son 30 güne göre</span>
        </div>
      )}
    </div>
  );
};

export default MetricWidget;
