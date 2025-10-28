/**
 * Componente VersionSelector
 * Selector flotante para cambiar entre versiones mock del formulario de evolución
 */

import React from 'react';
import styled from 'styled-components';
import { MockVersion, versionDescriptions } from '../data/mockEvolucionData';

interface VersionSelectorProps {
  /** Versión actualmente seleccionada */
  selectedVersion: MockVersion;
  /** Callback cuando cambia la versión */
  onVersionChange: (version: MockVersion) => void;
}

/**
 * Contenedor flotante del selector
 * Centrado horizontalmente con ancho ajustado al contenido
 */
const SelectorContainer = styled.div`
  position: sticky;
  top: 20px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, var(--color-latex30) 0%, #0283C0 100%);
  padding: 12px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 54, 232, 0.15), 0 2px 8px rgba(0, 0, 0, 0.08);
  margin: 0 auto 24px auto;
  width: fit-content;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    box-shadow: 0 6px 28px rgba(0, 54, 232, 0.22), 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    padding: 12px 16px;
    width: 100%;
  }
`;

/**
 * Label del selector
 */
const SelectorLabel = styled.label`
  font-family: var(--font-family-base);
  font-size: var(--font-size-body);
  font-weight: 600;
  color: var(--color-white);
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.3px;

  @media (max-width: 768px) {
    font-size: var(--font-size-small);
  }
`;

/**
 * Select estilizado
 */
const StyledSelect = styled.select`
  font-family: var(--font-family-base);
  font-size: var(--font-size-body);
  font-weight: 500;
  color: var(--color-latex30);
  background: var(--color-white);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 8px 32px 8px 12px;
  min-width: 280px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%230036E8' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    border-color: var(--color-white);
    box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    min-width: 100%;
    font-size: var(--font-size-small);
  }
`;

/**
 * Option estilizado
 */
const StyledOption = styled.option`
  font-family: var(--font-family-base);
  font-size: var(--font-size-body);
  padding: 8px;
  color: var(--color-latex30);
  background: var(--color-white);

  @media (max-width: 768px) {
    font-size: var(--font-size-small);
  }
`;

/**
 * Componente VersionSelector
 * Permite seleccionar entre las versiones mock del formulario
 */
export const VersionSelector: React.FC<VersionSelectorProps> = ({
  selectedVersion,
  onVersionChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newVersion = event.target.value as MockVersion;
    onVersionChange(newVersion);
  };

  return (
    <SelectorContainer>
      <SelectorLabel htmlFor="version-selector">
        Versión Mock:
      </SelectorLabel>
      <StyledSelect
        id="version-selector"
        value={selectedVersion}
        onChange={handleChange}
      >
        <StyledOption value="empty">
          {versionDescriptions.empty}
        </StyledOption>
        <StyledOption value="version1">
          V1 - {versionDescriptions.version1}
        </StyledOption>
        <StyledOption value="version2">
          V2 - {versionDescriptions.version2}
        </StyledOption>
        <StyledOption value="version3">
          V3 - {versionDescriptions.version3}
        </StyledOption>
      </StyledSelect>
    </SelectorContainer>
  );
};

export default VersionSelector;

