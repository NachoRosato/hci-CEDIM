"use client";
import styled from 'styled-components';

const Wrapper = styled.div.attrs({ className: 'mt-4 bg-white rounded-xl shadow overflow-auto max-h-[60vh]' })``;
const TableEl = styled.table.attrs({ className: 'w-full border-collapse' })``;
const Thead = styled.thead.attrs({ className: 'sticky top-0 bg-gray-50' })``;
const Th = styled.th.attrs({ className: 'text-left rb14b c-latex30 border-b border-gray-200 py-3 px-3' })``;
const Td = styled.td.attrs({ className: 'rb14l border-b border-gray-100 py-3 px-3 align-middle' })``;
const Tr = styled.tr.attrs({ className: 'hover:bg-gray-50 cursor-pointer transition-colors' })``;
const Badge = ({ text }: { text: string }) => {
  if (text === 'Pendiente') return <span className="rb12b px-2 py-1 rounded bgc-dangerSoft c-dangerDark">{text}</span>;
  if (text === 'Completado') return <span className="rb12b px-2 py-1 rounded bg-green-100 c-broccoli">{text}</span>;
  return <span className="rb12b px-2 py-1 rounded bgc-latex95 c-latex30">{text}</span>;
};

export type Row = { id: string; protocolo: string; paciente: string; medico: string; usuario: string; hora: string; dia: string; estado: string };

import InfoIcon from '@/components/icons/InfoIcon';

export default function Table({ data, onSelect }: { data: Row[]; onSelect: (row: Row) => void }) {
  const noData = data.length === 0 || data.every(r => !r.protocolo && !r.paciente && !r.medico && !r.usuario && !r.hora && !r.dia && !r.estado);
  return (
    <Wrapper>
      {noData ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-white bg-black/60 rounded-full p-4 mb-3"><InfoIcon /></div>
          <div className="rb14l c-black35">Sin datos para mostrar en su búsqueda</div>
        </div>
      ) : (
        <TableEl>
          <Thead>
            <Tr>
              {data.some(r => r.protocolo) && <Th>Protocolo</Th>}
              {data.some(r => r.paciente) && <Th>Paciente</Th>}
              {data.some(r => r.medico) && <Th>Médico</Th>}
              {data.some(r => r.usuario) && <Th>Usuario</Th>}
              {data.some(r => r.hora) && <Th>Hora</Th>}
              {data.some(r => r.dia) && <Th>Día</Th>}
              {data.some(r => r.estado) && <Th>Estado</Th>}
            </Tr>
          </Thead>
          <tbody>
            {data.map((r) => (
              <Tr key={r.id} onClick={() => onSelect(r)}>
                {data.some(x => x.protocolo) && <Td className="rb14b">{r.protocolo}</Td>}
                {data.some(x => x.paciente) && <Td>{r.paciente}</Td>}
                {data.some(x => x.medico) && <Td>{r.medico}</Td>}
                {data.some(x => x.usuario) && <Td>{r.usuario}</Td>}
                {data.some(x => x.hora) && <Td>{r.hora}</Td>}
                {data.some(x => x.dia) && <Td>{r.dia}</Td>}
                {data.some(x => x.estado) && <Td><Badge text={r.estado} /></Td>}
              </Tr>
            ))}
          </tbody>
        </TableEl>
      )}
    </Wrapper>
  );
}

