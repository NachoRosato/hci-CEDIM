"use client";
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ABMPageLayout, CreateButton } from '@/components/abm/ABMPageLayout';
import { ABMTable, ABMColumn } from '@/components/abm/ABMTable';
import { ABMModal } from '@/components/abm/ABMModal';
import { ConfirmDialog } from '@/components/abm/ConfirmDialog';
import { ABMFormField, StyledInput, StyledTextarea } from '@/components/abm/ABMFormField';
import { Toast } from '@/components/ui/Toast';
import { axiosInstance } from '@/lib/axios/axiosInstance';

interface Protocolo {
  _id: string;
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
      ? `
    background: hsla(128, 43%, 92%, 1);
    color: hsla(128, 43%, 32%, 1);
  `
      : `
    background: hsla(0, 0%, 93%, 1);
    color: hsla(0, 0%, 55%, 1);
  `}
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

export default function ABMProtocolosPage() {
  const [protocolos, setProtocolos] = useState<Protocolo[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Protocolo | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Protocolo | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [activo, setActivo] = useState(true);
  const [formError, setFormError] = useState('');

  // Toast
  const [toast, setToast] = useState<{ text: string; tone: 'success' | 'danger' } | null>(null);

  const fetchProtocolos = useCallback(async () => {
    try {
      setLoading(true);
      const api = await axiosInstance();
      const res = await api.get('/protocolos');
      setProtocolos(res.data);
    } catch {
      setToast({ text: 'Error al cargar protocolos', tone: 'danger' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProtocolos();
  }, [fetchProtocolos]);

  const openCreate = () => {
    setEditing(null);
    setNombre('');
    setDescripcion('');
    setActivo(true);
    setFormError('');
    setModalOpen(true);
  };

  const openEdit = (p: Protocolo) => {
    setEditing(p);
    setNombre(p.nombre);
    setDescripcion(p.descripcion);
    setActivo(p.activo);
    setFormError('');
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!nombre.trim()) {
      setFormError('El nombre es obligatorio');
      return;
    }

    setSaving(true);
    try {
      const api = await axiosInstance();
      if (editing) {
        await api.put(`/protocolos/${editing._id}`, { nombre, descripcion, activo });
        setToast({ text: 'Protocolo actualizado', tone: 'success' });
      } else {
        await api.post('/protocolos', { nombre, descripcion });
        setToast({ text: 'Protocolo creado', tone: 'success' });
      }
      setModalOpen(false);
      fetchProtocolos();
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
      await api.delete(`/protocolos/${confirmDelete._id}`);
      setToast({ text: 'Protocolo eliminado', tone: 'success' });
      setConfirmDelete(null);
      fetchProtocolos();
    } catch {
      setToast({ text: 'Error al eliminar', tone: 'danger' });
    } finally {
      setSaving(false);
    }
  };

  const columns: ABMColumn<Protocolo>[] = [
    { key: 'nombre', header: 'Nombre' },
    { key: 'descripcion', header: 'Descripción' },
    {
      key: 'activo',
      header: 'Estado',
      width: '120px',
      render: (row) => <Badge $active={row.activo}>{row.activo ? 'Activo' : 'Inactivo'}</Badge>,
    },
    {
      key: 'createdAt',
      header: 'Creado',
      width: '140px',
      render: (row) => new Date(row.createdAt).toLocaleDateString('es-AR'),
    },
  ];

  return (
    <ABMPageLayout
      title="Protocolos"
      subtitle="Gestión de protocolos de investigación clínica"
      actions={
        <CreateButton onClick={openCreate}>
          + Nuevo Protocolo
        </CreateButton>
      }
    >
      <ABMTable
        columns={columns}
        data={protocolos}
        keyExtractor={(p) => p._id}
        onEdit={openEdit}
        onDelete={(p) => setConfirmDelete(p)}
        loading={loading}
        emptyMessage="No hay protocolos cargados aún"
      />

      {/* Modal Crear / Editar */}
      <ABMModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Editar Protocolo' : 'Nuevo Protocolo'}
        onSubmit={handleSave}
        submitLabel={editing ? 'Actualizar' : 'Crear'}
        loading={saving}
      >
        <ABMFormField label="Nombre" error={formError}>
          <StyledInput
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              setFormError('');
            }}
            placeholder="Nombre del protocolo"
            autoFocus
          />
        </ABMFormField>
        <ABMFormField label="Descripción">
          <StyledTextarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción del protocolo (opcional)"
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
        message={`¿Estás seguro de que querés eliminar el protocolo "${confirmDelete?.nombre}"? Se marcará como inactivo.`}
        loading={saving}
      />

      {/* Toast */}
      {toast && (
        <Toast
          open={!!toast}
          onClose={() => setToast(null)}
          text={toast.text}
          tone={toast.tone}
        />
      )}
    </ABMPageLayout>
  );
}
