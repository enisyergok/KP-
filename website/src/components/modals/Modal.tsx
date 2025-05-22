import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  className = ''
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const sizeClass = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl'
  }[size];

  return (
    <div 
      className="modal" 
      onClick={handleBackdropClick}
      style={{
        display: 'flex',
        position: 'fixed',
        zIndex: 1050,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '10px 0',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div 
        className={`modal-content ${sizeClass} ${className}`}
        style={{
          backgroundColor: 'var(--bg-dark-main)',
          margin: 'auto',
          padding: '25px 35px',
          border: '1px solid var(--border-color-dark)',
          width: '90%',
          borderRadius: 'var(--border-radius-md)',
          boxShadow: 'var(--shadow-main)',
          position: 'relative',
          color: 'var(--text-primary-dark)',
          maxHeight: 'calc(100vh - 20px)',
          overflowY: 'auto'
        }}
      >
        <div 
          className="modal-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '15px',
            borderBottom: '1px solid var(--border-color-dark)',
            marginBottom: '20px'
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.3em', color: 'var(--accent-purple)' }}>
            {title}
          </h2>
          <button 
            className="close-button"
            onClick={onClose}
            style={{
              color: 'var(--text-secondary-dark)',
              fontSize: '1.6em',
              fontWeight: 'bold',
              cursor: 'pointer',
              background: 'none',
              border: 'none'
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
