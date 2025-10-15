"use client";
import styled from 'styled-components';
import { useEffect } from 'react';

const Container = styled.div.attrs({
  className:
    'fixed top-6 right-6 px-4 py-3 rounded-md shadow-lg text-white z-50',
})<{ tone: 'danger' | 'success' | 'info' }>`
  background: ${({ tone }) =>
    tone === 'danger'
      ? 'linear-gradient(95.53deg, #730700 1.56%, #c10c00 65.41%)'
      : tone === 'success'
      ? 'linear-gradient(90deg, #0ea965 0%, #12c285 100%)'
      : 'linear-gradient(90deg, #001019 18.65%, #014e7a 86.55%)'};
`;

export function Toast({ open, onClose, text, tone = 'info', duration = 3500 }: {
  open: boolean;
  onClose: () => void;
  text: string;
  tone?: 'danger' | 'success' | 'info';
  duration?: number;
}) {
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [open, onClose, duration]);

  if (!open) return null;
  return <Container role="status" aria-live="polite" tone={tone}>{text}</Container>;
}


