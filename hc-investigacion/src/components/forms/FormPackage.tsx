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
  // Dividir campos en dos columnas
  const fieldsPerColumn = Math.ceil(packageData.fields.length / 2);
  const leftColumnFields = packageData.fields.slice(0, fieldsPerColumn);
  const rightColumnFields = packageData.fields.slice(fieldsPerColumn);

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
          {leftColumnFields.map((field) => (
            <FormFieldComponent
              key={field.id}
              field={field}
              value={data[field.id]}
              error={errors[field.id]}
              onChange={(value) => onFieldChange(field.id, value)}
              disabled={disabled}
            />
          ))}
        </FieldGroup>
        
        <FieldGroup>
          {rightColumnFields.map((field) => (
            <FormFieldComponent
              key={field.id}
              field={field}
              value={data[field.id]}
              error={errors[field.id]}
              onChange={(value) => onFieldChange(field.id, value)}
              disabled={disabled}
            />
          ))}
        </FieldGroup>
      </FieldsGrid>
    </PackageContainer>
  );
};
