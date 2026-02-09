"use client";
import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

interface ABMModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitLabel?: string;
  loading?: boolean;
  width?: string;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const slideDown = keyframes`
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(24px) scale(0.97); }
`;

const Backdrop = styled.div<{ $closing?: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  ${({ $closing }) =>
    $closing
      ? css`animation: ${fadeOut} 200ms ease both;`
      : css`animation: ${fadeIn} 200ms ease both;`}
`;

const ModalContainer = styled.div<{ $closing?: boolean; $width?: string }>`
  background: var(--color-white);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  width: ${({ $width }) => $width || '520px'};
  max-width: 90vw;
  max-height: 85vh;
  overflow-y: auto;
  z-index: 9999;
  ${({ $closing }) =>
    $closing
      ? css`animation: ${slideDown} 200ms ease both;`
      : css`animation: ${slideUp} 250ms ease both;`}
`;

const Header = styled.div`
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--color-grey90);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: var(--color-latex10);
  margin: 0;
`;

const CloseBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: var(--color-grey95);
  color: var(--color-grey65);
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--color-grey90);
    color: var(--color-black35);
  }
`;

const Body = styled.div`
  padding: 24px;
`;

const Footer = styled.div`
  padding: 16px 24px 20px;
  border-top: 1px solid var(--color-grey90);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 10px 24px;
  border-radius: 8px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  
  ${({ $primary }) =>
    $primary
      ? `
    background: linear-gradient(135deg, var(--color-latex30) 0%, #0283C0 100%);
    color: var(--color-white);
    
    &:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(2, 123, 192, 0.3);
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `
      : `
    background: var(--color-grey95);
    color: var(--color-black35);
    
    &:hover {
      background: var(--color-grey90);
    }
  `}
`;

export function ABMModal({
  open,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = 'Guardar',
  loading = false,
  width,
}: ABMModalProps) {
  const [closing, setClosing] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
    } else if (mounted) {
      setClosing(true);
      const id = setTimeout(() => {
        setMounted(false);
        setClosing(false);
      }, 200);
      return () => clearTimeout(id);
    }
  }, [open, mounted]);

  // Cerrar con Escape
  useEffect(() => {
    if (!mounted) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [mounted, onClose]);

  if (!mounted && !closing) return null;

  const handleClose = () => {
    if (!loading) onClose();
  };

  return (
    <Backdrop $closing={closing} onClick={handleClose}>
      <ModalContainer
        $closing={closing}
        $width={width}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <Header>
          <Title>{title}</Title>
          <CloseBtn onClick={handleClose} aria-label="Cerrar">×</CloseBtn>
        </Header>
        <Body>{children}</Body>
        <Footer>
          <Button onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          {onSubmit && (
            <Button $primary onClick={onSubmit} disabled={loading}>
              {loading ? 'Guardando...' : submitLabel}
            </Button>
          )}
        </Footer>
      </ModalContainer>
    </Backdrop>
  );
}
