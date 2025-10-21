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
  background-color: var(--color-white);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-grey90);
`;

const PackageHeader = styled.div`
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--color-latex95);
`;

const PackageTitle = styled.h3`
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: var(--color-latex10);
  margin: 0 0 8px 0;
`;

const PackageDescription = styled.p`
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: var(--color-grey65);
  margin: 0;
`;

const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
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
    
    return (
      <React.Fragment key={group.main.id}>
        <FormFieldComponent
          field={group.main}
          value={data[group.main.id]}
          error={errors[group.main.id]}
          onChange={(value) => onFieldChange(group.main.id, value)}
          disabled={disabled}
        />
        {showDetail && group.detail && (
          <FormFieldComponent
            field={group.detail}
            value={data[group.detail.id]}
            error={errors[group.detail.id]}
            onChange={(value) => onFieldChange(group.detail.id, value)}
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
