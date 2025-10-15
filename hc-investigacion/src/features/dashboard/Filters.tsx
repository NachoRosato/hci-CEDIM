"use client";
import styled from 'styled-components';

const Row = styled.div.attrs({ className: 'grid grid-cols-1 md:grid-cols-4 gap-3' })``;
const Label = styled.label.attrs({ className: 'rb14b c-latex30' })``;
const Select = styled.select.attrs({
  className: 'w-full mt-2 px-3 py-2 border border-gray-300 rounded-md rb12l c-latex30',
})``;
const Input = styled.input.attrs({
  className: 'w-full mt-2 px-3 py-2 border border-gray-300 rounded-md rb12l c-latex30',
})``;

export type FiltersValue = { protocolo: string; medico: string; usuario: string; dia: string };

export default function Filters({ value, onChange, protocolos, medicos, usuarios }: {
  value: FiltersValue;
  onChange: (next: FiltersValue) => void;
  protocolos: string[];
  medicos: string[];
  usuarios: string[];
}) {
  return (
    <Row>
      <div>
        <Label>Protocolo</Label>
        <Select value={value.protocolo} onChange={(e) => onChange({ ...value, protocolo: e.target.value })}>
          <option value="">Todos</option>
          {protocolos.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </Select>
      </div>
      <div>
        <Label>Médico</Label>
        <Select value={value.medico} onChange={(e) => onChange({ ...value, medico: e.target.value })}>
          <option value="">Todos</option>
          {medicos.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </Select>
      </div>
      <div>
        <Label>Usuario</Label>
        <Select value={value.usuario} onChange={(e) => onChange({ ...value, usuario: e.target.value })}>
          <option value="">Todos</option>
          {usuarios.map((u) => (
            <option key={u} value={u}>{u}</option>
          ))}
        </Select>
      </div>
      <div>
        <Label>Día</Label>
        <Input type="date" value={value.dia} onChange={(e) => onChange({ ...value, dia: e.target.value })} />
      </div>
    </Row>
  );
}

