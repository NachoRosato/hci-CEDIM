/**
 * Componente MultiPageForm - Formulario multi-página principal
 * Maneja la navegación entre páginas, persistencia de datos y validación
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FormConfig, FormState, FormData } from './types';
import { FormPackageComponent } from './FormPackage';
import { FormNavigation } from './FormNavigation';
import { FormPreview } from './FormPreview';
import { Toast } from '@/components/ui/Toast';

interface MultiPageFormProps {
  config: FormConfig;
  initialData?: FormData;
  onSubmit: (data: FormData) => void;
  onSave?: (data: FormData) => void;
}

const FormContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 2px solid var(--color-latex95);
`;

const FormTitle = styled.h1`
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 32px;
  color: var(--color-latex10);
  margin: 0 0 8px 0;
`;

const FormDescription = styled.p`
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: var(--color-grey65);
  margin: 0;
`;

const PageContainer = styled.div`
  margin-bottom: 32px;
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
  padding: 16px 24px;
  background: var(--color-latex30-gradient);
  border-radius: 12px;
  color: var(--color-white);
`;

const PageTitle = styled.h2`
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 24px;
  margin: 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: var(--color-grey90);
  border-radius: 4px;
  margin-bottom: 24px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: var(--color-latex30-gradient);
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const PackagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const MultiPageForm: React.FC<MultiPageFormProps> = ({
  config,
  initialData = {},
  onSubmit,
  onSave
}) => {
  const [formState, setFormState] = useState<FormState>({
    currentPage: 1,
    data: initialData,
    completedPages: [],
    errors: {}
  });

  const [showPreview, setShowPreview] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Cargar datos desde localStorage al inicializar (solo una vez)
  useEffect(() => {
    const savedData = localStorage.getItem(`form_${config.id}_data`);
    const savedState = localStorage.getItem(`form_${config.id}_state`);
    
    if (savedData && savedState) {
      try {
        const parsedData = JSON.parse(savedData);
        const parsedState = JSON.parse(savedState);
        
        setFormState({
          ...parsedState,
          data: { ...initialData, ...parsedData }
        });
      } catch (error) {
        console.warn('Error loading saved form data:', error);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.id]); // Solo ejecutar cuando cambia el ID del form

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem(`form_${config.id}_data`, JSON.stringify(formState.data));
    localStorage.setItem(`form_${config.id}_state`, JSON.stringify({
      currentPage: formState.currentPage,
      completedPages: formState.completedPages,
      errors: formState.errors
    }));
  }, [formState.data, formState.currentPage, formState.completedPages, formState.errors, config.id]);

  const currentPage = config.pages.find(page => page.id === `page_${formState.currentPage}`);
  const totalPages = config.pages.length;
  const progress = (formState.currentPage / totalPages) * 100;

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [fieldId]: value
      },
      errors: {
        ...prev.errors,
        [fieldId]: '' // Limpiar error al cambiar el campo
      }
    }));
  };

  const validateCurrentPage = (): boolean => {
    if (!currentPage) return false;

    const errors: { [fieldId: string]: string } = {};
    let isValid = true;

    currentPage.packages.forEach(packageData => {
      packageData.fields.forEach(field => {
        if (field.required && (!formState.data[field.id] || formState.data[field.id] === '')) {
          errors[field.id] = `${field.label} es requerido`;
          isValid = false;
        }
      });
    });

    setFormState(prev => ({
      ...prev,
      errors
    }));

    return isValid;
  };

  const handleNext = () => {
    if (validateCurrentPage()) {
      const nextPage = formState.currentPage + 1;
      setFormState(prev => ({
        ...prev,
        currentPage: nextPage,
        completedPages: [...new Set([...prev.completedPages, formState.currentPage])]
      }));
      // Scroll al inicio de la página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Mostrar Toast de advertencia cuando hay campos requeridos sin completar
      setShowToast(true);
    }
  };

  const handlePrevious = () => {
    if (formState.currentPage > 1) {
      setFormState(prev => ({
        ...prev,
        currentPage: prev.currentPage - 1
      }));
      // Scroll al inicio de la página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    if (validateCurrentPage()) {
      onSubmit(formState.data);
    } else {
      // Mostrar Toast de advertencia cuando hay campos requeridos sin completar
      setShowToast(true);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formState.data);
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  if (showPreview) {
    return (
      <FormContainer>
        <FormHeader>
          <FormTitle>Vista Previa - {config.title}</FormTitle>
          <FormDescription>Revisa todos los datos antes de finalizar</FormDescription>
        </FormHeader>
        
        <FormPreview
          config={config}
          data={formState.data}
          onEdit={() => setShowPreview(false)}
          onSubmit={handleSubmit}
        />
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <Toast
        open={showToast}
        onClose={() => setShowToast(false)}
        text="Complete los datos requeridos"
        tone="warning"
        duration={3500}
      />
      
      <PageContainer>
        {currentPage && (
          <PackagesContainer>
            {currentPage.packages.map((packageData) => (
              <FormPackageComponent
                key={packageData.id}
                package={packageData}
                data={formState.data}
                errors={formState.errors}
                onFieldChange={handleFieldChange}
              />
            ))}
          </PackagesContainer>
        )}
      </PageContainer>

      <FormNavigation
        currentPage={formState.currentPage}
        totalPages={totalPages}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSubmit={handleSubmit}
        onSave={handleSave}
        onPreview={togglePreview}
        canGoNext={formState.currentPage < totalPages}
        canGoPrevious={formState.currentPage > 1}
      />
    </FormContainer>
  );
};
