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
`;

const Label = styled.label`
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: var(--color-black35);
  
  &.required::after {
    content: ' *';
    color: var(--color-danger);
  }
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid var(--color-grey90);
  border-radius: 8px;
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  background-color: var(--color-white);
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: var(--color-latex30);
  }
  
  &:disabled {
    background-color: var(--color-grey97);
    color: var(--color-grey45);
  }
  
  &.error {
    border-color: var(--color-danger);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid var(--color-grey90);
  border-radius: 8px;
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  background-color: var(--color-white);
  resize: vertical;
  min-height: 80px;
  
  &:focus {
    outline: none;
    border-color: var(--color-latex30);
  }
  
  &.error {
    border-color: var(--color-danger);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid var(--color-grey90);
  border-radius: 8px;
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
  background-color: var(--color-white);
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--color-latex30);
  }
  
  &.error {
    border-color: var(--color-danger);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: var(--color-latex30);
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-family: 'Rubik', sans-serif;
  font-size: 14px;
`;

const RadioInput = styled.input`
  width: 16px;
  height: 16px;
  accent-color: var(--color-latex30);
`;

const ErrorMessage = styled.span`
  font-family: 'Rubik', sans-serif;
  font-size: 12px;
  color: var(--color-danger);
  margin-top: 4px;
`;

export const FormFieldComponent: React.FC<FormFieldProps> = ({
  field,
  value,
  onChange,
  error,
  disabled = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let newValue = e.target.value;
    
    if (field.type === 'number') {
      newValue = e.target.value ? Number(e.target.value) : '';
    } else if (field.type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    }
    
    onChange(newValue);
  };

  const renderInput = () => {
    const commonProps = {
      id: field.id,
      value: value || '',
      onChange: handleChange,
      disabled,
      className: error ? 'error' : '',
      placeholder: field.placeholder,
      required: field.required
    };

    switch (field.type) {
      case 'textarea':
        return <TextArea {...commonProps} />;
      
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
            <span>{field.label}</span>
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
        return (
          <Input
            type={field.type}
            {...commonProps}
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
