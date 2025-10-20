/**
 * Componente FormPreview - Vista previa completa del formulario
 * Muestra todos los datos ingresados antes de finalizar
 */

import React from 'react';
import styled from 'styled-components';
import { FormConfig, FormData } from './types';

interface FormPreviewProps {
  config: FormConfig;
  data: FormData;
  onEdit: () => void;
  onSubmit: () => void;
}

const PreviewContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const PreviewSection = styled.div`
  background-color: var(--color-white);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-grey90);
`;

const SectionHeader = styled.div`
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--color-latex95);
`;

const SectionTitle = styled.h3`
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: var(--color-latex10);
  margin: 0;
`;

const SectionDescription = styled.p`
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: var(--color-grey65);
  margin: 4px 0 0 0;
`;

const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FieldRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FieldLabel = styled.span`
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: var(--color-black35);
`;

const FieldValue = styled.span`
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: var(--color-black);
  padding: 8px 12px;
  background-color: var(--color-grey97);
  border-radius: 6px;
  min-height: 20px;
  
  &.empty {
    color: var(--color-grey65);
    font-style: italic;
  }
`;

const EmptyValue = styled.span`
  color: var(--color-grey65);
  font-style: italic;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 24px 0;
  border-top: 2px solid var(--color-grey90);
  margin-top: 32px;
`;

const Button = styled.button`
  padding: 14px 32px;
  border: none;
  border-radius: 8px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EditButton = styled(Button)`
  background-color: var(--color-white);
  color: var(--color-latex30);
  border: 2px solid var(--color-latex30);
  
  &:hover {
    background-color: var(--color-latex95);
  }
`;

const SubmitButton = styled(Button)`
  background: var(--color-primary-gradient);
  color: var(--color-white);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 102, 0, 0.3);
  }
`;

export const FormPreview: React.FC<FormPreviewProps> = ({
  config,
  data,
  onEdit,
  onSubmit
}) => {
  const formatValue = (value: any): string => {
    if (value === null || value === undefined || value === '') {
      return '';
    }
    
    if (typeof value === 'boolean') {
      return value ? 'Sí' : 'No';
    }
    
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    
    return String(value);
  };

  const renderField = (field: any, value: any) => {
    const formattedValue = formatValue(value);
    
    return (
      <FieldRow key={field.id}>
        <FieldLabel>{field.label}:</FieldLabel>
        <FieldValue className={!formattedValue ? 'empty' : ''}>
          {formattedValue || <EmptyValue>Sin especificar</EmptyValue>}
        </FieldValue>
      </FieldRow>
    );
  };

  return (
    <PreviewContainer>
      {config.pages.map((page) => (
        <PreviewSection key={page.id}>
          <SectionHeader>
            <SectionTitle>{page.title}</SectionTitle>
          </SectionHeader>
          
          {page.packages.map((packageData) => (
            <div key={packageData.id}>
              {packageData.description && (
                <SectionDescription>{packageData.description}</SectionDescription>
              )}
              
              <FieldsGrid>
                {packageData.fields.map((field) => 
                  renderField(field, data[field.id])
                )}
              </FieldsGrid>
            </div>
          ))}
        </PreviewSection>
      ))}
      
      <ActionsContainer>
        <EditButton onClick={onEdit}>
          ✏️ Editar Formulario
        </EditButton>
        
        <SubmitButton onClick={onSubmit}>
          ✅ Generar Historia Clínica
        </SubmitButton>
      </ActionsContainer>
    </PreviewContainer>
  );
};
