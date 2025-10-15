"use client";
import styled from 'styled-components';
import RefreshIcon from '@/components/icons/RefreshIcon';
import { useEffect, useState } from 'react';
import { getRuntimeConfig } from '@/utils/runtimeConfig';

const Wrap = styled.div.attrs({ className: 'flex items-center gap-3' })``;
const Input = styled.input.attrs({
  className: 'flex-1 px-4 py-3 rounded-lg rb12l c-latex30',
  placeholder: 'Buscar... (paciente, médico, protocolo, estado)'
})`
  border: 1px solid #D1D5DB; /* gray-300 base */
  &:focus, &:focus-visible{
    outline: 1px solid transparent;
    outline-offset: 0;
    border-color: var(--color-latex30) !important;
    box-shadow: 0 0 0 1px var(--color-latex30) !important;
  }
  -webkit-tap-highlight-color: transparent;
  appearance: none;
`;
const spin = `@keyframes spin{ from{transform:rotate(0)} to{transform:rotate(360deg)} }`;
const Button = styled.button.attrs({
  className: 'rb14b px-3 py-3 rounded-2xl bgc-latexAlternative c-white flex items-center gap-2',
})`
  ${spin}
  .spin { animation: spin 1.2s linear infinite; }
`;

export default function SearchBar({ value, onChange, onRefresh }: { value: string; onChange: (v: string) => void; onRefresh: () => void }) {
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const cfg = await getRuntimeConfig();
        setEnabled(!!cfg.features?.search);
      } catch { setEnabled(true); }
    })();
  }, []);
  return (
    <Wrap>
      {enabled && (
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      <Button onClick={onRefresh} aria-label="Actualizar datos"><span className="spin"><RefreshIcon /></span> Actualizar datos</Button>
    </Wrap>
  );
}

