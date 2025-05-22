import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faExpand, faDownload, faTimes } from '@fortawesome/free-solid-svg-icons';

interface ChartWidgetProps {
  title: string;
  icon?: IconDefinition;
  children: React.ReactNode;
  onFullscreen?: () => void;
  onDownload?: () => void;
  onClose?: () => void;
  className?: string;
}

const ChartWidget: React.FC<ChartWidgetProps> = ({
  title,
  icon,
  children,
  onFullscreen,
  onDownload,
  onClose,
  className = ''
}) => {
  return (
    <div className={`dashboard-widget-card widget-large ${className}`}>
      <div className="content-card-header">
        <div className="header-title-group">
          {icon && <FontAwesomeIcon icon={icon} />}
          <span>{title}</span>
        </div>
        <div className="widget-actions">
          {onFullscreen && (
            <button 
              className="fullscreen-toggle-btn" 
              onClick={onFullscreen}
              title="Tam ekran"
            >
              <FontAwesomeIcon icon={faExpand} />
            </button>
          )}
          {onDownload && (
            <button 
              className="download-chart-btn" 
              onClick={onDownload}
              title="İndir"
            >
              <FontAwesomeIcon icon={faDownload} />
            </button>
          )}
          {onClose && (
            <button 
              className="close-widget-btn" 
              onClick={onClose}
              title="Kapat"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      </div>
      <div className="widget-chart-container">
        {children}
      </div>
    </div>
  );
};

export default ChartWidget;
