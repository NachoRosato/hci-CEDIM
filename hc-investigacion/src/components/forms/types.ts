/**
 * Tipos de datos para el sistema de formularios multi-página
 * Define la estructura de datos y tipos de inputs para cada formulario
 */

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'date' | 'select' | 'checkbox' | 'radio' | 'textarea';
  required?: boolean;
  placeholder?: string;
  options?: string[]; // Para select y radio
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  value?: any;
}

export interface FormPackage {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  page: number;
  order: number;
}

export interface FormData {
  [fieldId: string]: any;
}

export interface FormPage {
  id: string;
  title: string;
  packages: FormPackage[];
}

export interface FormState {
  currentPage: number;
  data: FormData;
  completedPages: number[];
  errors: { [fieldId: string]: string };
}

export interface FormConfig {
  id: string;
  title: string;
  description?: string;
  pages: FormPage[];
  submitAction?: string;
}
