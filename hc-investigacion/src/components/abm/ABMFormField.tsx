"use client";
import React from 'react';
import styled from 'styled-components';

interface ABMFormFieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
}

const FieldGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: var(--color-latex30);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const ErrorText = styled.span`
  display: block;
  font-family: 'Rubik', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: hsla(4, 100%, 40%, 1);
  margin-top: 4px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 2px solid var(--color-grey90);
  border-radius: 8px;
  font-family: 'Rubik', sans-serif;
  font-size: 13px;
  color: var(--color-black35);
  transition: all 0.2s ease;
  background: var(--color-white);
  
  &:focus {
    outline: none;
    border-color: var(--color-latex30);
    box-shadow: 0 0 0 3px rgba(2, 123, 192, 0.1);
  }
  
  &::placeholder {
    color: var(--color-grey65);
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px 14px;
  border: 2px solid var(--color-grey90);
  border-radius: 8px;
  font-family: 'Rubik', sans-serif;
  font-size: 13px;
  color: var(--color-black35);
  transition: all 0.2s ease;
  background: var(--color-white);
  resize: vertical;
  min-height: 80px;
  
  &:focus {
    outline: none;
    border-color: var(--color-latex30);
    box-shadow: 0 0 0 3px rgba(2, 123, 192, 0.1);
  }
  
  &::placeholder {
    color: var(--color-grey65);
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 10px 14px;
  border: 2px solid var(--color-grey90);
  border-radius: 8px;
  font-family: 'Rubik', sans-serif;
  font-size: 13px;
  color: var(--color-black35);
  transition: all 0.2s ease;
  background: var(--color-white);
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--color-latex30);
    box-shadow: 0 0 0 3px rgba(2, 123, 192, 0.1);
  }
`;

export function ABMFormField({ label, children, error }: ABMFormFieldProps) {
  return (
    <FieldGroup>
      <Label>{label}</Label>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
    </FieldGroup>
  );
}
