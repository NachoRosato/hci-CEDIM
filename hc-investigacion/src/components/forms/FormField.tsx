/**
 * Componente FormField - Campo de formulario individual
 * Maneja diferentes tipos de inputs con validación y estilos consistentes
 */

import React from 'react';
import styled from 'styled-components';
import { FormField as FormFieldType } from './types';

interface FormFieldProps {
  field: FormFieldType;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  disabled?: boolean;
}

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  position: relative;
`;

const Label = styled.label`
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: var(--color-black35);
  
  &.required::after {
    content: ' *';
    color: var(--color-latex30);
  }
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid var(--color-grey90);
  border-radius: 10px;
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  background-color: var(--color-white);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover:not(:disabled) {
    border-color: var(--color-grey65);
  }
  
  &:focus {
    outline: none;
    border-color: var(--color-latex30);
    box-shadow: 0 0 0 3px rgba(0, 54, 232, 0.1);
    transform: translateY(-1px);
  }
  
  &:disabled {
    background-color: var(--color-grey97);
    color: var(--color-grey45);
    cursor: not-allowed;
  }
  
  &[readonly] {
    background-color: #f0f8ff;
    color: var(--color-latex30);
    border-color: var(--color-latex30);
    font-weight: 600;
    cursor: default;
  }
  
  &.error {
    border-color: #FB5555;
    background-color: rgba(251, 85, 85, 0.02);
  }
`;

const TextAreaWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const TextArea = styled.textarea<{ $rows?: number }>`
  padding: 12px 16px;
  padding-top: 16px;
  border: 2px solid var(--color-grey90);
  border-radius: 10px;
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  background-color: var(--color-white);
  resize: vertical;
  min-height: ${props => props.$rows ? `${props.$rows * 24}px` : '120px'};
  width: 100%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover:not(:disabled) {
    border-color: var(--color-grey65);
  }
  
  &:focus {
    outline: none;
    border-color: var(--color-latex30);
    box-shadow: 0 0 0 3px rgba(0, 54, 232, 0.1);
  }
  
  &.error {
    border-color: #FB5555;
    background-color: rgba(251, 85, 85, 0.02);
  }
`;

const FloatingButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--color-latex30);
  background-color: var(--color-white);
  color: var(--color-latex30);
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  
  &:hover {
    background-color: var(--color-latex30);
    color: var(--color-white);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 2px solid var(--color-grey90);
  border-radius: 10px;
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  background-color: var(--color-white);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover:not(:disabled) {
    border-color: var(--color-grey65);
  }
  
  &:focus {
    outline: none;
    border-color: var(--color-latex30);
    box-shadow: 0 0 0 3px rgba(0, 54, 232, 0.1);
  }
  
  &.error {
    border-color: #FB5555;
    background-color: rgba(251, 85, 85, 0.02);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 54, 232, 0.04);
  }
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: var(--color-latex30);
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:focus {
    outline: 2px solid rgba(0, 54, 232, 0.3);
    outline-offset: 2px;
  }
`;

const CheckboxLabel = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-black35);
  cursor: pointer;
  user-select: none;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  padding: 10px 12px;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-weight: 500;
  color: var(--color-black35);
  
  &:hover {
    background-color: rgba(0, 54, 232, 0.04);
  }
`;

const RadioInput = styled.input`
  width: 18px;
  height: 18px;
  accent-color: var(--color-latex30);
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:focus {
    outline: 2px solid rgba(0, 54, 232, 0.3);
    outline-offset: 2px;
  }
`;

const ErrorMessage = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #FB5555;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &::before {
    content: '⚠';
    font-size: 14px;
  }
`;

export const FormFieldComponent: React.FC<FormFieldProps> = ({
  field,
  value,
  onChange,
  error,
  disabled = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let newValue: string | number | boolean = e.target.value;
    
    if (field.type === 'number') {
      // Validación especial para peso_examen: solo 1 decimal
      if (field.id === 'peso_examen') {
        const value = e.target.value;
        // Permitir números con máximo 1 decimal
        if (value && !/^\d*\.?\d{0,1}$/.test(value)) {
          return; // No actualizar si no cumple el formato
        }
      }
      
      // Validación especial para altura_examen: máximo 3 dígitos
      if (field.id === 'altura_examen') {
        const value = e.target.value;
        // Permitir solo números enteros de máximo 3 dígitos
        if (value && (!/^\d{0,3}$/.test(value) || Number(value) > 999)) {
          return; // No actualizar si no cumple el formato
        }
      }
      
      newValue = e.target.value ? Number(e.target.value) : '';
    } else if (field.type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    }
    
    onChange(newValue as string);
  };

  const renderInput = () => {
    // El IMC es de solo lectura porque se calcula automáticamente
    const isReadOnly = field.id === 'imc_examen';
    
    const commonProps = {
      id: field.id,
      value: value || '',
      onChange: handleChange,
      disabled: disabled || isReadOnly,
      className: error ? 'error' : '',
      placeholder: field.placeholder,
      required: field.required,
      readOnly: isReadOnly
    };

    switch (field.type) {
      case 'textarea':
        return (
          <TextAreaWrapper>
            <TextArea {...commonProps} $rows={field.rows} />
            <FloatingButton
              type="button"
              onClick={(e) => {
                e.preventDefault();
                // Aquí se puede agregar lógica para expandir o agregar funcionalidad
                console.log('Botón + presionado en', field.id);
              }}
              title="Expandir"
            >
              +
            </FloatingButton>
          </TextAreaWrapper>
        );
      
      case 'select':
        return (
          <Select {...commonProps}>
            <option value="">Seleccionar...</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        );
      
      case 'checkbox':
        return (
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              id={field.id}
              checked={value || false}
              onChange={handleChange}
              disabled={disabled}
            />
            <CheckboxLabel>{field.label}</CheckboxLabel>
          </CheckboxContainer>
        );
      
      case 'radio':
        return (
          <RadioGroup>
            {field.options?.map((option) => (
              <RadioOption key={option}>
                <RadioInput
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={value === option}
                  onChange={handleChange}
                  disabled={disabled}
                />
                {option}
              </RadioOption>
            ))}
          </RadioGroup>
        );
      
      default:
        // Agregar step para peso (permite decimales)
        const extraProps: any = {};
        if (field.id === 'peso_examen') {
          extraProps.step = '0.1';
        }
        
        return (
          <Input
            type={field.type}
            {...commonProps}
            {...extraProps}
          />
        );
    }
  };

  if (field.type === 'checkbox') {
    return (
      <FieldContainer>
        {renderInput()}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </FieldContainer>
    );
  }

  return (
    <FieldContainer>
      <Label htmlFor={field.id} className={field.required ? 'required' : ''}>
        {field.label}
      </Label>
      {renderInput()}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FieldContainer>
  );
};
