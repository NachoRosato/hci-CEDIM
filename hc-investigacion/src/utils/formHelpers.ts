/**
 * Utilidades para el manejo de formularios
 * Funciones auxiliares para cálculos, formateo y validaciones
 */

import { FormData } from '../components/forms/types';

/**
 * Calcula el IMC (Índice de Masa Corporal) basado en peso y talla
 */
export const calculateIMC = (peso: number, talla: number): number | null => {
  if (!peso || !talla || peso <= 0 || talla <= 0) {
    return null;
  }
  
  const alturaEnMetros = talla / 100;
  const imc = peso / (alturaEnMetros * alturaEnMetros);
  
  return Math.round(imc * 10) / 10; // Redondeo a 1 decimal
};

/**
 * Obtiene la clasificación del IMC según la OMS
 */
export const getIMCClassification = (imc: number): string => {
  if (imc < 18.5) return 'Bajo peso';
  if (imc < 25) return 'Peso normal';
  if (imc < 30) return 'Sobrepeso';
  if (imc < 35) return 'Obesidad grado I';
  if (imc < 40) return 'Obesidad grado II';
  return 'Obesidad grado III';
};

/**
 * Calcula la edad basada en la fecha de nacimiento
 */
export const calculateAge = (fechaNacimiento: string): number | null => {
  if (!fechaNacimiento) return null;
  
  const birthDate = new Date(fechaNacimiento);
  const today = new Date();
  
  if (birthDate > today) return null;
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

/**
 * Calcula la presión arterial media
 */
export const calculatePresionMedia = (sistolica: number, diastolica: number): number | null => {
  if (!sistolica || !diastolica || sistolica <= 0 || diastolica <= 0) {
    return null;
  }
  
  const map = (sistolica + 2 * diastolica) / 3;
  return Math.round(map * 100) / 100; // Redondeo a 2 decimales
};

/**
 * Formatea un número de teléfono argentino
 */
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  
  // Remover caracteres no numéricos
  const numbers = phone.replace(/\D/g, '');
  
  if (numbers.length === 10) {
    return `${numbers.slice(0, 2)}-${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  }
  
  if (numbers.length === 11) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
  }
  
  return phone; // Devolver original si no coincide con formatos esperados
};

/**
 * Valida un DNI argentino
 */
export const validateDNI = (dni: string): boolean => {
  if (!dni) return false;
  
  const numbers = dni.replace(/\D/g, '');
  
  // DNI debe tener entre 7 y 8 dígitos
  return numbers.length >= 7 && numbers.length <= 8;
};

/**
 * Genera un resumen de los datos del formulario
 */
export const generateFormSummary = (data: FormData): string => {
  const summary = [];
  
  if (data.apellidos_nombres) {
    summary.push(`Paciente: ${data.apellidos_nombres}`);
  }
  
  if (data.edad) {
    summary.push(`Edad: ${data.edad} años`);
  }
  
  if (data.dni) {
    summary.push(`DNI: ${data.dni}`);
  }
  
  if (data.fecha_nacimiento) {
    summary.push(`Fecha de nacimiento: ${new Date(data.fecha_nacimiento).toLocaleDateString()}`);
  }
  
  return summary.join(' | ');
};

/**
 * Exporta los datos del formulario a diferentes formatos
 */
export const exportFormData = {
  toJSON: (data: FormData): string => {
    return JSON.stringify(data, null, 2);
  },
  
  toCSV: (data: FormData): string => {
    const headers = Object.keys(data);
    const values = Object.values(data).map(value => 
      typeof value === 'string' && value.includes(',') ? `"${value}"` : value
    );
    
    return [headers.join(','), values.join(',')].join('\n');
  },
  
  toFormattedText: (data: FormData): string => {
    return Object.entries(data)
      .filter(([_, value]) => value !== null && value !== undefined && value !== '')
      .map(([key, value]) => {
        const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        return `${formattedKey}: ${value}`;
      })
      .join('\n');
  }
};

/**
 * Limpia los datos del formulario removiendo valores vacíos
 */
export const cleanFormData = (data: FormData): FormData => {
  const cleaned: FormData = {};
  
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      cleaned[key] = value;
    }
  });
  
  return cleaned;
};

/**
 * Combina datos de múltiples formularios
 */
export const mergeFormData = (...forms: FormData[]): FormData => {
  return forms.reduce((merged, form) => ({
    ...merged,
    ...form
  }), {});
};
