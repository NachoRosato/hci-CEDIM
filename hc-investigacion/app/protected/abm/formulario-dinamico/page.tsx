"use client";
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ABMPageLayout } from '@/components/abm/ABMPageLayout';
import { Toast } from '@/components/ui/Toast';
import { axiosInstance } from '@/lib/axios/axiosInstance';
import { evolucionFormConfig } from '@/config/evolucionFormConfig';

// === Types ===

interface Protocolo {
  _id: string;
  nombre: string;
}

interface TipoProtocolo {
  _id: string;
  nombre: string;
}

interface CampoConfig {
  fieldId: string;
  included: boolean;
  required: boolean;
}

interface FormConfigFromDB {
  _id: string;
  protocoloId: string;
  tipoProtocoloId: string;
  campos: CampoConfig[];
}

// === Styled Components ===

const SelectorsBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px 24px;
  background: linear-gradient(135deg, var(--color-latex30) 0%, #0283C0 100%);
  border-radius: 12px;
  flex-wrap: wrap;
`;

const SelectorGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SelectorLabel = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-white);
  white-space: nowrap;
`;

const Selector = styled.select`
  padding: 8px 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-family: 'Rubik', sans-serif;
  font-size: 13px;
  color: var(--color-latex30);
  background: var(--color-white);
  cursor: pointer;
  min-width: 220px;
  
  &:focus {
    outline: none;
    border-color: var(--color-white);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
  }
`;

const SectionContainer = styled.div`
  margin-bottom: 16px;
  border: 1px solid var(--color-grey90);
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.2s ease;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

const SectionHeader = styled.button<{ $expanded: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background: ${({ $expanded }) => $expanded ? 'linear-gradient(135deg, var(--color-latex30) 0%, #0283C0 100%)' : 'var(--color-grey97)'};
  color: ${({ $expanded }) => $expanded ? 'var(--color-white)' : 'var(--color-latex10)'};
  border: none;
  cursor: pointer;
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-align: left;
  transition: all 0.2s ease;
`;

const SectionTitle = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SectionBadge = styled.span`
  font-size: 11px;
  font-weight: 500;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
`;

const SectionArrow = styled.span<{ $expanded: boolean }>`
  transition: transform 0.2s ease;
  transform: ${({ $expanded }) => $expanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  font-size: 12px;
`;

const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  padding: 0;
  background: var(--color-white);
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const FieldItem = styled.div<{ $included: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-bottom: 1px solid var(--color-grey95);
  border-right: 1px solid var(--color-grey95);
  font-family: 'Rubik', sans-serif;
  font-size: 12px;
  transition: background-color 0.15s ease;
  background: ${({ $included }) => $included ? 'hsla(202, 100%, 98%, 1)' : 'var(--color-white)'};
  
  &:hover {
    background: ${({ $included }) => $included ? 'hsla(202, 100%, 95%, 1)' : 'var(--color-grey97)'};
  }
`;

const FieldLabel = styled.span`
  flex: 1;
  font-weight: 500;
  color: var(--color-black35);
  font-size: 11px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
`;

const RadioOption = styled.label<{ $active: boolean; $variant: 'include' | 'exclude' }>`
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
  
  ${({ $active, $variant }) => {
    if ($active && $variant === 'include') {
      return `background: hsla(128, 43%, 42%, 1); color: white;`;
    }
    if ($active && $variant === 'exclude') {
      return `background: hsla(4, 100%, 40%, 1); color: white;`;
    }
    return `background: var(--color-grey95); color: var(--color-grey65);`;
  }}
  
  input { display: none; }
`;

const RequiredCheck = styled.label<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
  transition: all 0.15s ease;
  background: ${({ $checked }) => $checked ? 'hsla(24, 100%, 50%, 1)' : 'var(--color-grey95)'};
  color: ${({ $checked }) => $checked ? 'white' : 'var(--color-grey65)'};
  
  input { display: none; }
`;

const SaveBar = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: var(--color-white);
  border-top: 2px solid var(--color-grey90);
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 0 0 12px 12px;
  margin-top: 24px;
`;

const SaveButton = styled.button`
  padding: 12px 32px;
  border: none;
  border-radius: 8px;
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  background: linear-gradient(135deg, var(--color-latex30) 0%, #0283C0 100%);
  color: var(--color-white);
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(2, 123, 192, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StatsText = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 13px;
  color: var(--color-grey65);
`;

const BulkActions = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const BulkButton = styled.button`
  padding: 6px 16px;
  border: 1px solid var(--color-grey85);
  border-radius: 6px;
  font-family: 'Rubik', sans-serif;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  background: var(--color-white);
  color: var(--color-black35);
  transition: all 0.15s ease;
  
  &:hover {
    background: var(--color-grey97);
    border-color: var(--color-latex30);
    color: var(--color-latex30);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 24px;
  color: var(--color-grey65);
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
`;

// === Helper: extract all fields from config ===

interface FlatField {
  fieldId: string;
  label: string;
  type: string;
  pageTitle: string;
  packageTitle: string;
  sectionKey: string; // pageId_packageId
}

function extractAllFields(): { sections: Map<string, { pageTitle: string; packageTitle: string; fields: FlatField[] }> } {
  const sections = new Map<string, { pageTitle: string; packageTitle: string; fields: FlatField[] }>();

  for (const page of evolucionFormConfig.pages) {
    for (const pkg of page.packages) {
      const key = `${page.id}_${pkg.id}`;
      const fields: FlatField[] = pkg.fields.map((f) => ({
        fieldId: f.id,
        label: f.label,
        type: f.type,
        pageTitle: page.title,
        packageTitle: pkg.title,
        sectionKey: key,
      }));
      sections.set(key, {
        pageTitle: page.title,
        packageTitle: pkg.title,
        fields,
      });
    }
  }

  return { sections };
}

const { sections: allSections } = extractAllFields();
const allFieldIds = Array.from(allSections.values()).flatMap((s) => s.fields.map((f) => f.fieldId));

// === Component ===

export default function ABMFormularioDinamicoPage() {
  const [protocolos, setProtocolos] = useState<Protocolo[]>([]);
  const [tipos, setTipos] = useState<TipoProtocolo[]>([]);
  const [selectedProtocolo, setSelectedProtocolo] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
  const [saving, setSaving] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(false);
  const [existingConfigId, setExistingConfigId] = useState<string | null>(null);

  // Campos: map fieldId -> { included, required }
  const [campos, setCampos] = useState<Map<string, { included: boolean; required: boolean }>>(new Map());

  // Expanded sections
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Toast
  const [toast, setToast] = useState<{ text: string; tone: 'success' | 'danger' } | null>(null);

  // Init campos with all fields defaulting to excluded
  useEffect(() => {
    const initial = new Map<string, { included: boolean; required: boolean }>();
    for (const fid of allFieldIds) {
      initial.set(fid, { included: false, required: false });
    }
    setCampos(initial);
  }, []);

  // Load protocolos
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

  // Load tipos when protocolo changes
  useEffect(() => {
    if (!selectedProtocolo) {
      setTipos([]);
      setSelectedTipo('');
      return;
    }
    (async () => {
      try {
        const api = await axiosInstance();
        const res = await api.get(`/tipos-protocolo?protocoloId=${selectedProtocolo}&activo=true`);
        setTipos(res.data);
        setSelectedTipo('');
      } catch {
        setToast({ text: 'Error al cargar tipos', tone: 'danger' });
      }
    })();
  }, [selectedProtocolo]);

  // Load existing config when both are selected
  const loadConfig = useCallback(async () => {
    if (!selectedProtocolo || !selectedTipo) return;

    setLoadingConfig(true);
    try {
      const api = await axiosInstance();
      const res = await api.get(
        `/formulario-dinamico?protocoloId=${selectedProtocolo}&tipoProtocoloId=${selectedTipo}`
      );
      const configs: FormConfigFromDB[] = res.data;

      // Reset to all excluded
      const newCampos = new Map<string, { included: boolean; required: boolean }>();
      for (const fid of allFieldIds) {
        newCampos.set(fid, { included: false, required: false });
      }

      if (configs.length > 0) {
        const cfg = configs[0];
        setExistingConfigId(cfg._id);
        // Apply saved values
        for (const c of cfg.campos) {
          if (newCampos.has(c.fieldId)) {
            newCampos.set(c.fieldId, { included: c.included, required: c.required });
          }
        }
      } else {
        setExistingConfigId(null);
      }

      setCampos(newCampos);
    } catch {
      setToast({ text: 'Error al cargar configuración', tone: 'danger' });
    } finally {
      setLoadingConfig(false);
    }
  }, [selectedProtocolo, selectedTipo]);

  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  // Toggle section expand
  const toggleSection = (key: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // Update field
  const setFieldIncluded = (fieldId: string, included: boolean) => {
    setCampos((prev) => {
      const next = new Map(prev);
      const current = next.get(fieldId) || { included: false, required: false };
      next.set(fieldId, { ...current, included, required: included ? current.required : false });
      return next;
    });
  };

  const setFieldRequired = (fieldId: string, required: boolean) => {
    setCampos((prev) => {
      const next = new Map(prev);
      const current = next.get(fieldId) || { included: false, required: false };
      next.set(fieldId, { ...current, required });
      return next;
    });
  };

  // Bulk actions
  const includeAll = () => {
    setCampos((prev) => {
      const next = new Map(prev);
      for (const fid of allFieldIds) {
        const curr = next.get(fid) || { included: false, required: false };
        next.set(fid, { ...curr, included: true });
      }
      return next;
    });
  };

  const excludeAll = () => {
    setCampos((prev) => {
      const next = new Map(prev);
      for (const fid of allFieldIds) {
        next.set(fid, { included: false, required: false });
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedSections(new Set(allSections.keys()));
  };

  const collapseAll = () => {
    setExpandedSections(new Set());
  };

  // Save
  const handleSave = async () => {
    if (!selectedProtocolo || !selectedTipo) return;

    setSaving(true);
    try {
      const camposArray: CampoConfig[] = [];
      campos.forEach((val, key) => {
        camposArray.push({ fieldId: key, included: val.included, required: val.required });
      });

      const api = await axiosInstance();

      if (existingConfigId) {
        await api.put(`/formulario-dinamico/${existingConfigId}`, { campos: camposArray });
      } else {
        await api.post('/formulario-dinamico', {
          protocoloId: selectedProtocolo,
          tipoProtocoloId: selectedTipo,
          campos: camposArray,
        });
      }

      setToast({ text: 'Configuración guardada exitosamente', tone: 'success' });
      loadConfig(); // Reload to get updated _id
    } catch {
      setToast({ text: 'Error al guardar configuración', tone: 'danger' });
    } finally {
      setSaving(false);
    }
  };

  // Stats
  const includedCount = Array.from(campos.values()).filter((c) => c.included).length;
  const requiredCount = Array.from(campos.values()).filter((c) => c.required).length;

  const configReady = !!selectedProtocolo && !!selectedTipo;

  return (
    <ABMPageLayout
      title="Formulario Dinámico"
      subtitle="Configurá qué campos incluye cada combinación de protocolo y tipo"
    >
      {/* Selectores */}
      <SelectorsBar>
        <SelectorGroup>
          <SelectorLabel>Protocolo:</SelectorLabel>
          <Selector
            value={selectedProtocolo}
            onChange={(e) => setSelectedProtocolo(e.target.value)}
          >
            <option value="">-- Seleccionar --</option>
            {protocolos.map((p) => (
              <option key={p._id} value={p._id}>{p.nombre}</option>
            ))}
          </Selector>
        </SelectorGroup>

        <SelectorGroup>
          <SelectorLabel>Tipo:</SelectorLabel>
          <Selector
            value={selectedTipo}
            onChange={(e) => setSelectedTipo(e.target.value)}
            disabled={!selectedProtocolo}
          >
            <option value="">-- Seleccionar --</option>
            {tipos.map((t) => (
              <option key={t._id} value={t._id}>{t.nombre}</option>
            ))}
          </Selector>
        </SelectorGroup>
      </SelectorsBar>

      {!configReady ? (
        <EmptyState>
          Seleccioná un protocolo y un tipo para configurar los campos del formulario
        </EmptyState>
      ) : loadingConfig ? (
        <EmptyState>Cargando configuración...</EmptyState>
      ) : (
        <>
          {/* Bulk actions */}
          <BulkActions>
            <BulkButton onClick={includeAll}>Incluir todos</BulkButton>
            <BulkButton onClick={excludeAll}>Excluir todos</BulkButton>
            <BulkButton onClick={expandAll}>Expandir todo</BulkButton>
            <BulkButton onClick={collapseAll}>Colapsar todo</BulkButton>
          </BulkActions>

          {/* Sections */}
          {Array.from(allSections.entries()).map(([key, section]) => {
            const expanded = expandedSections.has(key);
            const sectionIncluded = section.fields.filter(
              (f) => campos.get(f.fieldId)?.included
            ).length;

            return (
              <SectionContainer key={key}>
                <SectionHeader $expanded={expanded} onClick={() => toggleSection(key)}>
                  <SectionTitle>
                    {section.pageTitle} — {section.packageTitle}
                    <SectionBadge>
                      {sectionIncluded}/{section.fields.length}
                    </SectionBadge>
                  </SectionTitle>
                  <SectionArrow $expanded={expanded}>▼</SectionArrow>
                </SectionHeader>

                {expanded && (
                  <FieldsGrid>
                    {section.fields.map((field) => {
                      const cfg = campos.get(field.fieldId) || { included: false, required: false };
                      return (
                        <FieldItem key={field.fieldId} $included={cfg.included}>
                          <FieldLabel title={`${field.label} (${field.type})`}>
                            {field.label}
                          </FieldLabel>

                          <RadioGroup>
                            <RadioOption
                              $active={cfg.included}
                              $variant="include"
                            >
                              <input
                                type="radio"
                                name={`field_${field.fieldId}`}
                                checked={cfg.included}
                                onChange={() => setFieldIncluded(field.fieldId, true)}
                              />
                              Sí
                            </RadioOption>
                            <RadioOption
                              $active={!cfg.included}
                              $variant="exclude"
                            >
                              <input
                                type="radio"
                                name={`field_${field.fieldId}`}
                                checked={!cfg.included}
                                onChange={() => setFieldIncluded(field.fieldId, false)}
                              />
                              No
                            </RadioOption>
                          </RadioGroup>

                          {cfg.included && (
                            <RequiredCheck $checked={cfg.required}>
                              <input
                                type="checkbox"
                                checked={cfg.required}
                                onChange={(e) => setFieldRequired(field.fieldId, e.target.checked)}
                              />
                              Req.
                            </RequiredCheck>
                          )}
                        </FieldItem>
                      );
                    })}
                  </FieldsGrid>
                )}
              </SectionContainer>
            );
          })}

          {/* Save bar */}
          <SaveBar>
            <StatsText>
              {includedCount} campos incluidos · {requiredCount} requeridos · {allFieldIds.length} totales
            </StatsText>
            <SaveButton onClick={handleSave} disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar Configuración'}
            </SaveButton>
          </SaveBar>
        </>
      )}

      {toast && (
        <Toast open={!!toast} onClose={() => setToast(null)} text={toast.text} tone={toast.tone} />
      )}
    </ABMPageLayout>
  );
}
