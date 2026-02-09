/**
 * Componente VersionHistory
 * Muestra el historial de versiones de un formulario con capacidad de comparación
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// ================================================================
// TIPOS
// ================================================================

interface VersionMetadata {
  versionNumber: number;
  createdAt: Date;
  createdBy: string;
  comment?: string;
  changesCount: number;
}

interface Change {
  fieldName: string;
  fieldLabel: string;
  oldValue: string | null;
  newValue: string | null;
  changeType: 'added' | 'modified' | 'deleted';
  pageNumber: number;
  packageName: string;
}

// ================================================================
// STYLED COMPONENTS (Respetando GlobalStyle.js)
// ================================================================

const Container = styled.div`
  background: var(--color-white);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--color-latex95);
`;

const Title = styled.h2`
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: var(--color-latex10);
  margin: 0;
`;

const VersionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const VersionCard = styled.div<{ $isSelected?: boolean }>`
  background: ${props => props.$isSelected ? 'var(--color-latex95)' : 'var(--color-white)'};
  border: 2px solid ${props => props.$isSelected ? 'var(--color-latex30)' : 'var(--color-grey90)'};
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--color-latex30);
    box-shadow: 0 2px 8px rgba(2, 131, 192, 0.1);
  }
`;

const VersionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const VersionNumber = styled.span`
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: var(--color-latex30);
`;

const VersionDate = styled.span`
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: var(--color-grey65);
`;

const VersionInfo = styled.div`
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  color: var(--color-black35);
  margin-bottom: 4px;
`;

const VersionComment = styled.p`
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  font-style: italic;
  color: var(--color-grey65);
  margin: 8px 0 0 0;
`;

const Badge = styled.span<{ $type: 'info' | 'success' | 'warning' }>`
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 12px;
  background: ${props => {
    switch (props.$type) {
      case 'success': return 'var(--color-green)';
      case 'warning': return 'var(--color-yellow)';
      default: return 'var(--color-latex30)';
    }
  }};
  color: var(--color-white);
`;

const CompareButton = styled.button`
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: var(--color-latex30-gradient);
  color: var(--color-white);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(2, 131, 192, 0.3);
  }
  
  &:disabled {
    background: var(--color-grey90);
    color: var(--color-grey65);
    cursor: not-allowed;
    transform: none;
  }
`;

const ChangesPanel = styled.div`
  margin-top: 24px;
  background: var(--color-latex95);
  border-radius: 8px;
  padding: 20px;
`;

const ChangesTitle = styled.h3`
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: var(--color-latex10);
  margin: 0 0 16px 0;
`;

const ChangesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ChangeItem = styled.div<{ $type: 'added' | 'modified' | 'deleted' }>`
  background: var(--color-white);
  border-left: 4px solid ${props => {
    switch (props.$type) {
      case 'added': return 'var(--color-green)';
      case 'deleted': return 'var(--color-red)';
      default: return 'var(--color-yellow)';
    }
  }};
  border-radius: 6px;
  padding: 12px 16px;
`;

const ChangeField = styled.div`
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: var(--color-latex10);
  margin-bottom: 4px;
`;

const ChangeValue = styled.div`
  font-family: 'Rubik', sans-serif;
  font-size: 13px;
  color: var(--color-black35);
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ValueBadge = styled.span<{ $isOld?: boolean }>`
  padding: 4px 8px;
  border-radius: 4px;
  background: ${props => props.$isOld ? 'var(--color-red-light)' : 'var(--color-green-light)'};
  font-weight: 600;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  font-family: 'Rubik', sans-serif;
  color: var(--color-grey65);
`;

// ================================================================
// COMPONENTE PRINCIPAL
// ================================================================

interface VersionHistoryProps {
  formId: string;
}

export const VersionHistory: React.FC<VersionHistoryProps> = ({ formId }) => {
  const [versions, setVersions] = useState<VersionMetadata[]>([]);
  const [selectedVersionA, setSelectedVersionA] = useState<number | null>(null);
  const [selectedVersionB, setSelectedVersionB] = useState<number | null>(null);
  const [changes, setChanges] = useState<Change[]>([]);
  const [loading, setLoading] = useState(true);
  const [comparing, setComparing] = useState(false);

  // Cargar historial de versiones al montar
  useEffect(() => {
    loadVersionHistory();
  }, [formId]);

  /**
   * Carga el historial de versiones desde la API
   */
  const loadVersionHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/forms/${formId}/versions`);
      const data = await response.json();
      
      if (data.success) {
        setVersions(data.versions);
      }
    } catch (error) {
      console.error('Error al cargar historial:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Selecciona una versión para comparar
   */
  const handleSelectVersion = (versionNumber: number) => {
    if (selectedVersionA === null) {
      setSelectedVersionA(versionNumber);
    } else if (selectedVersionB === null) {
      setSelectedVersionB(versionNumber);
    } else {
      // Si ambas están seleccionadas, reemplazar la primera
      setSelectedVersionA(versionNumber);
      setSelectedVersionB(null);
      setChanges([]);
    }
  };

  /**
   * Compara las dos versiones seleccionadas
   */
  const handleCompare = async () => {
    if (selectedVersionA === null || selectedVersionB === null) return;
    
    try {
      setComparing(true);
      const response = await fetch(
        `/api/forms/${formId}/versions/compare?versionA=${selectedVersionA}&versionB=${selectedVersionB}`
      );
      const data = await response.json();
      
      if (data.success) {
        setChanges(data.changes);
      }
    } catch (error) {
      console.error('Error al comparar versiones:', error);
    } finally {
      setComparing(false);
    }
  };

  /**
   * Limpia la selección
   */
  const handleClearSelection = () => {
    setSelectedVersionA(null);
    setSelectedVersionB(null);
    setChanges([]);
  };

  /**
   * Formatea la fecha para visualización
   */
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Loading state
  if (loading) {
    return (
      <Container>
        <LoadingSpinner>Cargando historial de versiones...</LoadingSpinner>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>📜 Historial de Versiones</Title>
        <div style={{ display: 'flex', gap: '12px' }}>
          <CompareButton
            onClick={handleCompare}
            disabled={selectedVersionA === null || selectedVersionB === null || comparing}
          >
            {comparing ? 'Comparando...' : 'Comparar Versiones'}
          </CompareButton>
          {(selectedVersionA !== null || selectedVersionB !== null) && (
            <CompareButton onClick={handleClearSelection}>
              Limpiar Selección
            </CompareButton>
          )}
        </div>
      </Header>

      {/* Instrucciones */}
      {(selectedVersionA === null || selectedVersionB === null) && (
        <VersionInfo style={{ marginBottom: '16px', padding: '12px', background: 'var(--color-latex95)', borderRadius: '6px' }}>
          {selectedVersionA === null 
            ? '👉 Selecciona la primera versión para comparar' 
            : '👉 Selecciona la segunda versión para comparar'}
        </VersionInfo>
      )}

      {/* Lista de versiones */}
      <VersionList>
        {versions.map((version) => (
          <VersionCard
            key={version.versionNumber}
            $isSelected={
              version.versionNumber === selectedVersionA || 
              version.versionNumber === selectedVersionB
            }
            onClick={() => handleSelectVersion(version.versionNumber)}
          >
            <VersionHeader>
              <VersionNumber>Versión {version.versionNumber}</VersionNumber>
              <VersionDate>{formatDate(version.createdAt)}</VersionDate>
            </VersionHeader>
            
            <VersionInfo>
              <strong>Autor:</strong> {version.createdBy}
            </VersionInfo>
            
            <VersionInfo>
              <Badge $type="info">{version.changesCount} cambios</Badge>
              {version.versionNumber === selectedVersionA && (
                <Badge $type="warning" style={{ marginLeft: '8px' }}>Versión A</Badge>
              )}
              {version.versionNumber === selectedVersionB && (
                <Badge $type="success" style={{ marginLeft: '8px' }}>Versión B</Badge>
              )}
            </VersionInfo>
            
            {version.comment && (
              <VersionComment>"{version.comment}"</VersionComment>
            )}
          </VersionCard>
        ))}
      </VersionList>

      {/* Panel de cambios */}
      {changes.length > 0 && (
        <ChangesPanel>
          <ChangesTitle>
            🔍 Cambios entre Versión {selectedVersionA} y Versión {selectedVersionB}
          </ChangesTitle>
          
          <ChangesList>
            {changes.map((change, index) => (
              <ChangeItem key={index} $type={change.changeType}>
                <ChangeField>
                  {change.fieldLabel}
                  <Badge 
                    $type={
                      change.changeType === 'added' ? 'success' : 
                      change.changeType === 'deleted' ? 'warning' : 
                      'info'
                    }
                    style={{ marginLeft: '8px', fontSize: '10px' }}
                  >
                    {change.changeType === 'added' ? 'AGREGADO' :
                     change.changeType === 'deleted' ? 'ELIMINADO' :
                     'MODIFICADO'}
                  </Badge>
                </ChangeField>
                
                <ChangeValue>
                  {change.changeType === 'modified' && (
                    <>
                      <ValueBadge $isOld>Anterior: {change.oldValue || '(vacío)'}</ValueBadge>
                      <span>→</span>
                      <ValueBadge>Nuevo: {change.newValue || '(vacío)'}</ValueBadge>
                    </>
                  )}
                  {change.changeType === 'added' && (
                    <ValueBadge>Valor: {change.newValue}</ValueBadge>
                  )}
                  {change.changeType === 'deleted' && (
                    <ValueBadge $isOld>Valor eliminado: {change.oldValue}</ValueBadge>
                  )}
                </ChangeValue>
                
                <VersionInfo style={{ marginTop: '8px', fontSize: '12px' }}>
                  📄 Página {change.pageNumber} • {change.packageName}
                </VersionInfo>
              </ChangeItem>
            ))}
          </ChangesList>
        </ChangesPanel>
      )}
    </Container>
  );
};

export default VersionHistory;



