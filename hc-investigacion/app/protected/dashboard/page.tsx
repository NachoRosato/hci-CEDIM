"use client";
import { useMemo, useState } from 'react';
import Filters, { FiltersValue } from '@/features/dashboard/Filters';
import Table, { Row } from '@/features/dashboard/Table';
import data from '@/features/dashboard/mock/data.json';
import SearchBar from '@/features/dashboard/SearchBar';
import ColumnToggles, { ColumnsState } from '@/features/dashboard/ColumnToggles';

export default function Dashboard() {
  const [filters, setFilters] = useState<FiltersValue>({ protocolo: '', medico: '', usuario: '', dia: '' });
  const [query, setQuery] = useState('');
  const [cols, setCols] = useState<ColumnsState>({ protocolo: true, paciente: true, medico: true, usuario: true, hora: true, dia: true, estado: true });
  const rows = data as Row[];
  const protocolos = useMemo(() => Array.from(new Set(rows.map(r => r.protocolo))), [rows]);
  const medicos = useMemo(() => Array.from(new Set(rows.map(r => r.medico))), [rows]);
  const usuarios = useMemo(() => Array.from(new Set(rows.map(r => r.usuario))), [rows]);
  const filtered = useMemo(() => {
    let res = rows.filter(r => (
      (!filters.protocolo || r.protocolo === filters.protocolo)
      && (!filters.medico || r.medico === filters.medico)
      && (!filters.usuario || r.usuario === filters.usuario)
      && (!filters.dia || r.dia === filters.dia)
    ));
    if (!query) return res;
    const q = query.toLowerCase();
    // prioridad: paciente (mockeado con usuario), luego médico, luego protocolo, luego estado
    const byPaciente = res.filter(r => r.usuario.toLowerCase().includes(q));
    if (byPaciente.length) return byPaciente;
    const byMedico = res.filter(r => r.medico.toLowerCase().includes(q));
    if (byMedico.length) return byMedico;
    const byProtocolo = res.filter(r => r.protocolo.toLowerCase().includes(q));
    if (byProtocolo.length) return byProtocolo;
    return res.filter(r => r.estado.toLowerCase().includes(q));
  }, [rows, filters, query]);

  return (
    <div className="p-4 space-y-4">
      <SearchBar value={query} onChange={setQuery} onRefresh={() => console.log('refresh')} />
      <Filters value={filters} onChange={setFilters} protocolos={protocolos} medicos={medicos} usuarios={usuarios} />
      <ColumnToggles value={cols} onChange={setCols} />
      <Table data={filtered.map(r => ({...r, protocolo: cols.protocolo ? r.protocolo : '', paciente: cols.paciente ? r.paciente : '', medico: cols.medico ? r.medico : '', usuario: cols.usuario ? r.usuario : '', hora: cols.hora ? r.hora : '', dia: cols.dia ? r.dia : '', estado: cols.estado ? r.estado : ''}))} onSelect={(row) => console.log('select', row)} />
    </div>
  );
}


