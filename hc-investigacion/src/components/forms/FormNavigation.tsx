/**
 * Componente FormNavigation - Navegación del formulario
 * Botones para navegar entre páginas, guardar y finalizar
 */

import React from 'react';
import styled from 'styled-components';

interface FormNavigationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  onSave?: () => void;
  onPreview: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  border-top: 2px solid var(--color-grey90);
  margin-top: 32px;
`;

const NavigationGroup = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PrimaryButton = styled(Button)`
  background: var(--color-latex30-gradient);
  color: var(--color-white);
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(2, 123, 192, 0.3);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: var(--color-white);
  color: var(--color-latex30);
  border: 2px solid var(--color-latex30);
  
  &:hover:not(:disabled) {
    background-color: var(--color-latex95);
  }
`;

const SuccessButton = styled(Button)`
  background: var(--color-primary-gradient);
  color: var(--color-white);
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 102, 0, 0.3);
  }
`;

const OutlineButton = styled(Button)`
  background-color: transparent;
  color: var(--color-grey65);
  border: 1px solid var(--color-grey65);
  
  &:hover:not(:disabled) {
    background-color: var(--color-grey97);
    color: var(--color-black35);
  }
`;

const PageIndicator = styled.span`
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: var(--color-grey65);
  padding: 8px 16px;
  background-color: var(--color-grey97);
  border-radius: 20px;
`;

const SaveIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Rubik', sans-serif;
  font-size: 12px;
  color: var(--color-broccoli);
  
  &::before {
    content: '●';
    color: var(--color-broccoli);
  }
`;

export const FormNavigation: React.FC<FormNavigationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  onSubmit,
  onSave,
  onPreview,
  canGoNext,
  canGoPrevious
}) => {
  return (
    <NavigationContainer>
      <NavigationGroup>
        <OutlineButton
          onClick={onPrevious}
          disabled={!canGoPrevious}
        >
          ← Anterior
        </OutlineButton>
        
        <PageIndicator>
          Página {currentPage} de {totalPages}
        </PageIndicator>
      </NavigationGroup>

      <NavigationGroup>
        {onSave && (
          <>
            <SecondaryButton onClick={onSave}>
              💾 Guardar
            </SecondaryButton>
            <SaveIndicator>Datos guardados automáticamente</SaveIndicator>
          </>
        )}
        
        <SecondaryButton onClick={onPreview}>
          👁️ Vista Previa
        </SecondaryButton>
        
        {canGoNext ? (
          <PrimaryButton onClick={onNext}>
            Siguiente →
          </PrimaryButton>
        ) : (
          <SuccessButton onClick={onSubmit}>
            ✅ Finalizar Formulario
          </SuccessButton>
        )}
      </NavigationGroup>
    </NavigationContainer>
  );
};
