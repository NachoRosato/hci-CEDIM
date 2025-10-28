/**
 * Componente FormPackage - Paquete de formulario
 * Agrupa campos relacionados en una sección con título y descripción
 * Diseño en 2 columnas para mejor organización
 */

import React from 'react';
import styled from 'styled-components';
import { FormPackage as FormPackageType, FormData } from './types';
import { FormFieldComponent } from './FormField';

interface FormPackageProps {
  package: FormPackageType;
  data: FormData;
  errors: { [fieldId: string]: string };
  onFieldChange: (fieldId: string, value: any) => void;
  disabled?: boolean;
}

const PackageContainer = styled.div`
  background: linear-gradient(135deg, var(--color-white) 0%, #f8f9ff 100%);
  border-radius: 16px;
  padding: 0;
  margin-bottom: 32px;
  box-shadow: 0 4px 20px rgba(0, 54, 232, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 54, 232, 0.08);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    box-shadow: 0 8px 30px rgba(0, 54, 232, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06);
    transform: translateY(-2px);
    border-color: rgba(0, 54, 232, 0.15);
  }
`;

const PackageHeader = styled.div`
  background: linear-gradient(135deg, var(--color-latex30) 0%, #0283C0 100%);
  padding: 20px 24px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(255, 255, 255, 0.3) 50%, 
      transparent 100%
    );
  }
`;

const PackageTitle = styled.h3`
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: var(--color-white);
  margin: 0 0 6px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.02em;
`;

const PackageDescription = styled.p`
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  line-height: 1.5;
`;

const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  padding: 28px;
  background: var(--color-white);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const FormPackageComponent: React.FC<FormPackageProps> = ({
  package: packageData,
  data,
  errors,
  onFieldChange,
  disabled = false
}) => {
  // Agrupar checkboxes con sus campos de detalle (si el siguiente campo termina en _detalle)
  const groupedFields: Array<{ main: typeof packageData.fields[0], detail?: typeof packageData.fields[0] }> = [];
  
  for (let i = 0; i < packageData.fields.length; i++) {
    const currentField = packageData.fields[i];
    const nextField = packageData.fields[i + 1];
    
    // Si el siguiente campo es un detalle del actual, agrúpalos
    if (nextField && nextField.id === `${currentField.id}_detalle`) {
      groupedFields.push({ main: currentField, detail: nextField });
      i++; // Saltar el siguiente campo ya que lo agrupamos
    } else {
      groupedFields.push({ main: currentField });
    }
  }

  // Dividir en dos columnas
  const fieldsPerColumn = Math.ceil(groupedFields.length / 2);
  const leftColumnGroups = groupedFields.slice(0, fieldsPerColumn);
  const rightColumnGroups = groupedFields.slice(fieldsPerColumn);

  const renderFieldGroup = (group: typeof groupedFields[0]) => {
    const showDetail = group.detail && data[group.main.id];
    const detailField = group.detail;
    
    return (
      <React.Fragment key={group.main.id}>
        <FormFieldComponent
          field={group.main}
          value={data[group.main.id]}
          error={errors[group.main.id]}
          onChange={(value) => onFieldChange(group.main.id, value)}
          disabled={disabled}
        />
        {showDetail && detailField && (
          <FormFieldComponent
            field={detailField}
            value={data[detailField.id]}
            error={errors[detailField.id]}
            onChange={(value) => onFieldChange(detailField.id, value)}
            disabled={disabled}
          />
        )}
      </React.Fragment>
    );
  };

  return (
    <PackageContainer>
      <PackageHeader>
        <PackageTitle>{packageData.title}</PackageTitle>
        {packageData.description && (
          <PackageDescription>{packageData.description}</PackageDescription>
        )}
      </PackageHeader>
      
      <FieldsGrid>
        <FieldGroup>
          {leftColumnGroups.map(renderFieldGroup)}
        </FieldGroup>
        
        <FieldGroup>
          {rightColumnGroups.map(renderFieldGroup)}
        </FieldGroup>
      </FieldsGrid>
    </PackageContainer>
  );
};
