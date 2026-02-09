"use client";
import React from 'react';
import { ABMModal } from './ABMModal';
import styled from 'styled-components';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmLabel?: string;
  loading?: boolean;
}

const Message = styled.p`
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  color: var(--color-black35);
  line-height: 1.6;
  margin: 0;
`;

const WarningIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: hsla(4, 100%, 95%, 1);
  color: hsla(4, 100%, 40%, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 16px;
`;

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Confirmar eliminación',
  message,
  confirmLabel = 'Eliminar',
  loading = false,
}: ConfirmDialogProps) {
  return (
    <ABMModal
      open={open}
      onClose={onClose}
      title={title}
      onSubmit={onConfirm}
      submitLabel={confirmLabel}
      loading={loading}
      width="420px"
    >
      <WarningIcon>⚠</WarningIcon>
      <Message>{message}</Message>
    </ABMModal>
  );
}
