"use client";
import styled from 'styled-components';

const Wrap = styled.div.attrs({ className: 'flex items-center gap-2 flex-wrap' })``;
const Toggle = styled.button.attrs({ className: 'rb14b px-3 py-2 rounded-2xl bgc-latexAlternative c-white hover:brightness-110 transition' })``;

export type ColumnsState = {
  protocolo: boolean;
  paciente: boolean;
  medico: boolean;
  usuario: boolean;
  hora: boolean;
  dia: boolean;
  estado: boolean;
};

export default function ColumnToggles({ value, onChange }: { value: ColumnsState; onChange: (next: ColumnsState) => void }) {
  const set = (key: keyof ColumnsState, v: boolean) => onChange({ ...value, [key]: v });
  return (
    <Wrap>
      <Toggle onClick={() => set('protocolo', !value.protocolo)}>Protocolo {value.protocolo ? '✓' : ''}</Toggle>
      <Toggle onClick={() => set('paciente', !value.paciente)}>Paciente {value.paciente ? '✓' : ''}</Toggle>
      <Toggle onClick={() => set('medico', !value.medico)}>Médico {value.medico ? '✓' : ''}</Toggle>
      <Toggle onClick={() => set('usuario', !value.usuario)}>Usuario {value.usuario ? '✓' : ''}</Toggle>
      <Toggle onClick={() => set('hora', !value.hora)}>Hora {value.hora ? '✓' : ''}</Toggle>
      <Toggle onClick={() => set('dia', !value.dia)}>Día {value.dia ? '✓' : ''}</Toggle>
      <Toggle onClick={() => set('estado', !value.estado)}>Estado {value.estado ? '✓' : ''}</Toggle>
    </Wrap>
  );
}

