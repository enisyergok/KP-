import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface StatusIndicatorProps {
  title: string;
  status: 'success' | 'warning' | 'error';
  statusText: string;
  icon?: IconDefinition;
  className?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  title,
  status,
  statusText,
  icon,
  className = ''
}) => {
  return (
    <div className={`status-indicator-widget status-${status} ${className}`}>
      <div className="status-header">
        <div className="status-title">
          {icon && <FontAwesomeIcon icon={icon} />}
          <span>{title}</span>
        </div>
      </div>
      <div className="status-text">
        <span className="status-icon"></span>
        {statusText}
      </div>
    </div>
  );
};

export default StatusIndicator;
