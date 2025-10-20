/**
 * Configuración del formulario de evolución médica
 * Basado en la página actual de evolución y adaptado al sistema de formularios
 */

import { FormConfig } from '../components/forms/types';

export const evolucionFormConfig: FormConfig = {
  id: 'evolucion_medica',
  title: 'Evolución Médica',
  description: 'Formulario para seguimiento y evolución del paciente',
  
  pages: [
    {
      id: 'page_1',
      title: 'Datos del Paciente y Evolución',
      packages: [
        {
          id: 'datos_paciente_evolucion',
          title: 'Datos del Paciente',
          description: 'Información básica del paciente para la evolución',
          page: 1,
          order: 1,
          fields: [
            {
              id: 'apellidos_nombres',
              label: 'Apellidos y Nombres',
              type: 'text',
              required: true,
              placeholder: 'Ej: Jane Doe'
            },
            {
              id: 'domicilio',
              label: 'Domicilio',
              type: 'text',
              required: true,
              placeholder: 'Ej: Brasil 780, Villa Sarmiento'
            },
            {
              id: 'dni',
              label: 'DNI',
              type: 'number',
              required: true,
              placeholder: 'Ej: 40559615'
            },
            {
              id: 'edad',
              label: 'Edad',
              type: 'number',
              required: true,
              placeholder: 'Ej: 30',
              validation: {
                min: 0,
                max: 120
              }
            },
            {
              id: 'fecha_nacimiento',
              label: 'Fecha de Nacimiento',
              type: 'date',
              required: true
            },
            {
              id: 'profesion_tarea',
              label: 'Profesión/Tarea Actual',
              type: 'text',
              required: false,
              placeholder: 'Ej: Abogada, Profesor, etc.'
            }
          ]
        },
        {
          id: 'accesibilidad',
          title: 'Accesibilidad',
          description: 'Evaluación de la accesibilidad del paciente',
          page: 1,
          order: 2,
          fields: [
            {
              id: 'movilizacion',
              label: 'Puede movilizarse',
              type: 'select',
              required: true,
              options: ['Sin dificultad', 'Con dificultad leve', 'Con dificultad moderada', 'Con dificultad severa']
            },
            {
              id: 'transporte_propio',
              label: 'Con movilidad propia',
              type: 'checkbox'
            },
            {
              id: 'transporte_publico',
              label: 'Con transporte público',
              type: 'checkbox'
            },
            {
              id: 'transporte_privado',
              label: 'Con transporte privado',
              type: 'checkbox'
            },
            {
              id: 'acceso_transporte',
              label: 'Accede sin dificultad al transporte',
              type: 'checkbox'
            },
            {
              id: 'salida_casa',
              label: 'Puede salir sin dificultad de su casa',
              type: 'checkbox'
            },
            {
              id: 'calle_asfalto',
              label: 'Calle de asfalto',
              type: 'checkbox'
            },
            {
              id: 'transporte_casa',
              label: 'El transporte llega hasta su casa',
              type: 'checkbox'
            }
          ]
        }
      ]
    },
    {
      id: 'page_2',
      title: 'Signos Vitales y Evaluación Clínica',
      packages: [
        {
          id: 'signos_vitales_evolucion',
          title: 'Signos Vitales',
          description: 'Mediciones actuales del paciente',
          page: 2,
          order: 1,
          fields: [
            {
              id: 'altura_cm',
              label: 'Altura (cm)',
              type: 'number',
              required: true,
              placeholder: 'cm',
              validation: {
                min: 50,
                max: 250
              }
            },
            {
              id: 'peso_kg',
              label: 'Peso (kg)',
              type: 'number',
              required: true,
              placeholder: 'kg',
              validation: {
                min: 1,
                max: 300
              }
            },
            {
              id: 'rango_edad',
              label: 'Rango de Edad',
              type: 'select',
              required: true,
              options: ['< 18', '18-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50-55', '55-60', '> 60']
            },
            {
              id: 'presion_sistolica',
              label: 'TA Sistólica (mmHg)',
              type: 'number',
              required: true,
              placeholder: 'mmHg',
              validation: {
                min: 70,
                max: 250
              }
            },
            {
              id: 'presion_diastolica',
              label: 'TA Diastólica (mmHg)',
              type: 'number',
              required: true,
              placeholder: 'mmHg',
              validation: {
                min: 40,
                max: 150
              }
            },
            {
              id: 'presion_media',
              label: 'TA Media (mmHg)',
              type: 'number',
              required: false,
              placeholder: 'Calculada automáticamente'
            }
          ]
        },
        {
          id: 'evaluacion_clinica',
          title: 'Evaluación Clínica',
          description: 'Evaluación del estado actual del paciente',
          page: 2,
          order: 2,
          fields: [
            {
              id: 'estado_general',
              label: 'Estado General',
              type: 'select',
              required: true,
              options: ['Excelente', 'Bueno', 'Regular', 'Malo', 'Crítico']
            },
            {
              id: 'tolerancia_tratamiento',
              label: 'Tolerancia al Tratamiento',
              type: 'select',
              required: true,
              options: ['Excelente', 'Buena', 'Regular', 'Mala']
            },
            {
              id: 'efectos_adversos',
              label: 'Efectos Adversos',
              type: 'checkbox'
            },
            {
              id: 'descripcion_efectos',
              label: 'Descripción de Efectos Adversos',
              type: 'textarea',
              required: false,
              placeholder: 'Describa los efectos adversos si los hay'
            },
            {
              id: 'observaciones_clinicas',
              label: 'Observaciones Clínicas',
              type: 'textarea',
              required: false,
              placeholder: 'Observaciones adicionales sobre el estado del paciente'
            }
          ]
        }
      ]
    },
    {
      id: 'page_3',
      title: 'Criterios y Seguimiento',
      packages: [
        {
          id: 'criterios_evaluacion',
          title: 'Criterios de Evaluación',
          description: 'Criterios específicos para el protocolo ANT-010 RED',
          page: 3,
          order: 1,
          fields: [
            {
              id: 'fa_ecg_documentado',
              label: 'FA o aleteo auricular diagnosticados/documentados en un ECG o monitoreo',
              type: 'checkbox'
            },
            {
              id: 'fa_causa_reversible',
              label: 'FA debida a una causa reversible aguda en curso',
              type: 'checkbox'
            },
            {
              id: 'fa_causa_reversible_2',
              label: 'FA debida a una causa reversible aguda en curso (segunda instancia)',
              type: 'checkbox'
            },
            {
              id: 'fa_causa_reversible_3',
              label: 'FA debida a una causa reversible aguda en curso (tercera instancia)',
              type: 'checkbox'
            },
            {
              id: 'fa_causa_reversible_4',
              label: 'FA debida a una causa reversible aguda en curso (cuarta instancia)',
              type: 'checkbox'
            },
            {
              id: 'observaciones_criterios',
              label: 'Observaciones sobre Criterios',
              type: 'textarea',
              required: false,
              placeholder: 'Observaciones adicionales sobre los criterios evaluados'
            }
          ]
        },
        {
          id: 'seguimiento_tratamiento',
          title: 'Seguimiento y Tratamiento',
          description: 'Plan de seguimiento y modificaciones al tratamiento',
          page: 3,
          order: 2,
          fields: [
            {
              id: 'modificacion_dosis',
              label: 'Modificación de Dosis',
              type: 'checkbox'
            },
            {
              id: 'suspension_medicamento',
              label: 'Suspensión de Medicamento',
              type: 'checkbox'
            },
            {
              id: 'nuevo_medicamento',
              label: 'Nuevo Medicamento',
              type: 'checkbox'
            },
            {
              id: 'detalles_modificacion',
              label: 'Detalles de Modificaciones',
              type: 'textarea',
              required: false,
              placeholder: 'Describa los cambios realizados en el tratamiento'
            },
            {
              id: 'proximo_control',
              label: 'Próximo Control',
              type: 'date',
              required: false
            },
            {
              id: 'observaciones_finales',
              label: 'Observaciones Finales',
              type: 'textarea',
              required: false,
              placeholder: 'Observaciones finales y recomendaciones'
            }
          ]
        }
      ]
    }
  ]
};
