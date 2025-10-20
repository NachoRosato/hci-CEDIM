/**
 * Hook useFormPersistence - Manejo de persistencia de formularios
 * Guarda automáticamente los datos del formulario en localStorage
 * y permite recuperar datos al recargar la página
 */

import { useState, useEffect, useCallback } from 'react';
import { FormData, FormState } from '../components/forms/types';

interface UseFormPersistenceProps {
  formId: string;
  initialData?: FormData;
}

interface UseFormPersistenceReturn {
  formData: FormData;
  formState: Partial<FormState>;
  updateField: (fieldId: string, value: any) => void;
  updateFormState: (state: Partial<FormState>) => void;
  clearForm: () => void;
  hasUnsavedChanges: boolean;
}

export const useFormPersistence = ({
  formId,
  initialData = {}
}: UseFormPersistenceProps): UseFormPersistenceReturn => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [formState, setFormState] = useState<Partial<FormState>>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const storageKey = `form_${formId}`;
  const stateStorageKey = `form_${formId}_state`;

  // Cargar datos guardados al inicializar
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(storageKey);
      const savedState = localStorage.getItem(stateStorageKey);

      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData({ ...initialData, ...parsedData });
      }

      if (savedState) {
        const parsedState = JSON.parse(savedState);
        setFormState(parsedState);
      }
    } catch (error) {
      console.warn('Error loading form data from localStorage:', error);
    }
  }, [formId, storageKey, stateStorageKey, initialData]);

  // Guardar datos cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(formData));
      localStorage.setItem(stateStorageKey, JSON.stringify(formState));
      setHasUnsavedChanges(false);
    } catch (error) {
      console.warn('Error saving form data to localStorage:', error);
    }
  }, [formData, formState, storageKey, stateStorageKey]);

  const updateField = useCallback((fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    setHasUnsavedChanges(true);
  }, []);

  const updateFormState = useCallback((state: Partial<FormState>) => {
    setFormState(prev => ({
      ...prev,
      ...state
    }));
    setHasUnsavedChanges(true);
  }, []);

  const clearForm = useCallback(() => {
    localStorage.removeItem(storageKey);
    localStorage.removeItem(stateStorageKey);
    setFormData(initialData);
    setFormState({});
    setHasUnsavedChanges(false);
  }, [storageKey, stateStorageKey, initialData]);

  return {
    formData,
    formState,
    updateField,
    updateFormState,
    clearForm,
    hasUnsavedChanges
  };
};
