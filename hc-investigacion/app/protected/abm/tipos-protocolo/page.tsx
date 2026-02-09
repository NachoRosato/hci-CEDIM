"use client";
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ABMPageLayout, CreateButton } from '@/components/abm/ABMPageLayout';
import { ABMTable, ABMColumn } from '@/components/abm/ABMTable';
import { ABMModal } from '@/components/abm/ABMModal';
import { ConfirmDialog } from '@/components/abm/ConfirmDialog';
import { ABMFormField, StyledInput, StyledTextarea, StyledSelect } from '@/components/abm/ABMFormField';
import { Toast } from '@/components/ui/Toast';
import { axiosInstance } from '@/lib/axios/axiosInstance';

interface Protocolo {
  _id: string;
  nombre: string;
}

interface TipoProtocolo {
  _id: string;
  protocoloId: Protocolo | string;
  nombre: string;
  descripcion: string;
  activo: boolean;
  createdAt: string;
}

const Badge = styled.span<{ $active: boolean }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-family: 'Rubik', sans-serif;
  font-size: 11px;
  font-weight: 600;
  ${({ $active }) =>
    $active
      ? `background: hsla(128, 43%, 92%, 1); color: hsla(128, 43%, 32%, 1);`
      : `background: hsla(0, 0%, 93%, 1); color: hsla(0, 0%, 55%, 1);`}
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding: 16px 20px;
  background: var(--color-grey97);
  border-radius: 12px;
  border: 1px solid var(--color-grey90);
`;

const FilterLabel = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-latex30);
  white-space: nowrap;
`;

const FilterSelect = styled.select`
  padding: 8px 14px;
  border: 2px solid var(--color-grey90);
  border-radius: 8px;
  font-family: 'Rubik', sans-serif;
  font-size: 13px;
  color: var(--color-black35);
  background: var(--color-white);
  cursor: pointer;
  min-width: 250px;
  
  &:focus {
    outline: none;
    border-color: var(--color-latex30);
    box-shadow: 0 0 0 3px rgba(2, 123, 192, 0.1);
  }
`;

const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
`;

const ToggleLabel = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-latex30);
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const Toggle = styled.button<{ $on: boolean }>`
  width: 44px;
  height: 24px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: background 0.2s ease;
  background: ${({ $on }) => ($on ? 'var(--color-broccoli)' : 'var(--color-grey85)')};
  
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $on }) => ($on ? '22px' : '2px')};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    transition: left 0.2s ease;
  }
`;

export default function ABMTiposProtocoloPage() {
  const [protocolos, setProtocolos] = useState<Protocolo[]>([]);
  const [selectedProtocolo, setSelectedProtocolo] = useState('');
  const [tipos, setTipos] = useState<TipoProtocolo[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TipoProtocolo | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<TipoProtocolo | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [activo, setActivo] = useState(true);
  const [formProtocoloId, setFormProtocoloId] = useState('');
  const [formError, setFormError] = useState('');

  // Toast
  const [toast, setToast] = useState<{ text: string; tone: 'success' | 'danger' } | null>(null);

  // Cargar protocolos
  useEffect(() => {
    (async () => {
      try {
        const api = await axiosInstance();
        const res = await api.get('/protocolos?activo=true');
        setProtocolos(res.data);
      } catch {
        setToast({ text: 'Error al cargar protocolos', tone: 'danger' });
      }
    })();
  }, []);

  // Cargar tipos cuando cambia el protocolo seleccionado
  const fetchTipos = useCallback(async () => {
    if (!selectedProtocolo) {
      setTipos([]);
      return;
    }
    setLoading(true);
    try {
      const api = await axiosInstance();
      const res = await api.get(`/tipos-protocolo?protocoloId=${selectedProtocolo}`);
      setTipos(res.data);
    } catch {
      setToast({ text: 'Error al cargar tipos', tone: 'danger' });
    } finally {
      setLoading(false);
    }
  }, [selectedProtocolo]);

  useEffect(() => {
    fetchTipos();
  }, [fetchTipos]);

  const openCreate = () => {
    setEditing(null);
    setNombre('');
    setDescripcion('');
    setActivo(true);
    setFormProtocoloId(selectedProtocolo);
    setFormError('');
    setModalOpen(true);
  };

  const openEdit = (t: TipoProtocolo) => {
    setEditing(t);
    setNombre(t.nombre);
    setDescripcion(t.descripcion);
    setActivo(t.activo);
    const pId = typeof t.protocoloId === 'object' ? t.protocoloId._id : t.protocoloId;
    setFormProtocoloId(pId);
    setFormError('');
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!formProtocoloId) {
      setFormError('Seleccioná un protocolo');
      return;
    }
    if (!nombre.trim()) {
      setFormError('El nombre es obligatorio');
      return;
    }

    setSaving(true);
    try {
      const api = await axiosInstance();
      if (editing) {
        await api.put(`/tipos-protocolo/${editing._id}`, {
          nombre,
          descripcion,
          activo,
          protocoloId: formProtocoloId,
        });
        setToast({ text: 'Tipo actualizado', tone: 'success' });
      } else {
        await api.post('/tipos-protocolo', {
          protocoloId: formProtocoloId,
          nombre,
          descripcion,
        });
        setToast({ text: 'Tipo creado', tone: 'success' });
      }
      setModalOpen(false);
      fetchTipos();
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: { errorMessage?: string } } } })?.response?.data
          ?.error?.errorMessage || 'Error al guardar';
      setFormError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    setSaving(true);
    try {
      const api = await axiosInstance();
      await api.delete(`/tipos-protocolo/${confirmDelete._id}`);
      setToast({ text: 'Tipo eliminado', tone: 'success' });
      setConfirmDelete(null);
      fetchTipos();
    } catch {
      setToast({ text: 'Error al eliminar', tone: 'danger' });
    } finally {
      setSaving(false);
    }
  };

  const getProtocoloNombre = (t: TipoProtocolo): string => {
    if (typeof t.protocoloId === 'object' && t.protocoloId !== null) {
      return t.protocoloId.nombre;
    }
    return '';
  };

  const columns: ABMColumn<TipoProtocolo>[] = [
    { key: 'nombre', header: 'Nombre del Tipo' },
    { key: 'descripcion', header: 'Descripción' },
    {
      key: 'protocoloId',
      header: 'Protocolo',
      render: (row) => getProtocoloNombre(row),
    },
    {
      key: 'activo',
      header: 'Estado',
      width: '120px',
      render: (row) => <Badge $active={row.activo}>{row.activo ? 'Activo' : 'Inactivo'}</Badge>,
    },
  ];

  return (
    <ABMPageLayout
      title="Tipos de Protocolo"
      subtitle="Cada protocolo puede tener múltiples tipos asociados"
      actions={
        <CreateButton onClick={openCreate} disabled={!selectedProtocolo}>
          + Nuevo Tipo
        </CreateButton>
      }
    >
      {/* Filtro por protocolo */}
      <FilterBar>
        <FilterLabel>Protocolo:</FilterLabel>
        <FilterSelect
          value={selectedProtocolo}
          onChange={(e) => setSelectedProtocolo(e.target.value)}
        >
          <option value="">-- Seleccionar protocolo --</option>
          {protocolos.map((p) => (
            <option key={p._id} value={p._id}>{p.nombre}</option>
          ))}
        </FilterSelect>
      </FilterBar>

      {selectedProtocolo ? (
        <ABMTable
          columns={columns}
          data={tipos}
          keyExtractor={(t) => t._id}
          onEdit={openEdit}
          onDelete={(t) => setConfirmDelete(t)}
          loading={loading}
          emptyMessage="No hay tipos para este protocolo"
        />
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '48px',
          color: 'var(--color-grey65)',
          fontFamily: "'Rubik', sans-serif",
          fontSize: '14px',
        }}>
          Seleccioná un protocolo para ver y gestionar sus tipos
        </div>
      )}

      {/* Modal Crear / Editar */}
      <ABMModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Editar Tipo de Protocolo' : 'Nuevo Tipo de Protocolo'}
        onSubmit={handleSave}
        submitLabel={editing ? 'Actualizar' : 'Crear'}
        loading={saving}
      >
        <ABMFormField label="Protocolo" error={!formProtocoloId && formError ? formError : undefined}>
          <StyledSelect
            value={formProtocoloId}
            onChange={(e) => {
              setFormProtocoloId(e.target.value);
              setFormError('');
            }}
          >
            <option value="">-- Seleccionar --</option>
            {protocolos.map((p) => (
              <option key={p._id} value={p._id}>{p.nombre}</option>
            ))}
          </StyledSelect>
        </ABMFormField>
        <ABMFormField label="Nombre" error={formError && formProtocoloId ? formError : undefined}>
          <StyledInput
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              setFormError('');
            }}
            placeholder="Nombre del tipo"
          />
        </ABMFormField>
        <ABMFormField label="Descripción">
          <StyledTextarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción (opcional)"
            rows={3}
          />
        </ABMFormField>
        {editing && (
          <ToggleRow>
            <ToggleLabel>Activo</ToggleLabel>
            <Toggle $on={activo} onClick={() => setActivo(!activo)} />
          </ToggleRow>
        )}
      </ABMModal>

      {/* Confirm Delete */}
      <ConfirmDialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
        message={`¿Estás seguro de que querés eliminar el tipo "${confirmDelete?.nombre}"?`}
        loading={saving}
      />

      {toast && (
        <Toast open={!!toast} onClose={() => setToast(null)} text={toast.text} tone={toast.tone} />
      )}
    </ABMPageLayout>
  );
}
