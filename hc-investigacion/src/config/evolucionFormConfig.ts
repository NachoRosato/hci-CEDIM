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
      title: 'Antecedentes Patológicos Confirmados',
      packages: [
        {
          id: 'antecedentes_columna_izquierda',
          title: 'Antecedentes Patológicos - Parte I',
          description: 'Marque los antecedentes patológicos confirmados',
          page: 2,
          order: 1,
          fields: [
            {
              id: 'acv',
              label: 'ACV',
              type: 'checkbox',
              required: false
            },
            {
              id: 'aneur_aort_reparado',
              label: 'Aneur. Aort. Reparado',
              type: 'checkbox',
              required: false
            },
            {
              id: 'alergia',
              label: 'Alergia',
              type: 'checkbox',
              required: false
            },
            {
              id: 'alergia_detalle',
              label: 'Especificar Alergia',
              type: 'text',
              required: false,
              placeholder: 'Ej: Penicilina'
            },
            {
              id: 'amenorrea',
              label: 'Amenorrea',
              type: 'checkbox',
              required: false
            },
            {
              id: 'amputacion',
              label: 'Amputación',
              type: 'checkbox',
              required: false
            },
            {
              id: 'amputacion_detalle',
              label: 'Especificar Amputación',
              type: 'text',
              required: false,
              placeholder: 'Ej: Dedo anular izq.'
            },
            {
              id: 'angiop_aterectomia',
              label: 'Angiop./aterectomía',
              type: 'checkbox',
              required: false
            },
            {
              id: 'arritmia',
              label: 'Arritmia',
              type: 'checkbox',
              required: false
            },
            {
              id: 'artrosis_ar',
              label: 'Artrosis/A.R.',
              type: 'checkbox',
              required: false
            },
            {
              id: 'cataratas',
              label: 'Cataratas',
              type: 'checkbox',
              required: false
            },
            {
              id: 'cefaleas',
              label: 'Cefaleas',
              type: 'checkbox',
              required: false
            },
            {
              id: 'cirug_angiop_art_perif',
              label: 'Cirug./angiop. Art. perif.',
              type: 'checkbox',
              required: false
            },
            {
              id: 'claudicacion_intermitente',
              label: 'Claudicación intermitente',
              type: 'checkbox',
              required: false
            },
            {
              id: 'epoc',
              label: 'E.P.O.C.',
              type: 'checkbox',
              required: false
            },
            {
              id: 'fracturas',
              label: 'Fracturas',
              type: 'checkbox',
              required: false
            },
            {
              id: 'fracturas_detalle',
              label: 'Especificar Fracturas',
              type: 'text',
              required: false,
              placeholder: 'Especificar localización'
            },
            {
              id: 'gastritis',
              label: 'Gastritis',
              type: 'checkbox',
              required: false
            },
            {
              id: 'hemorroides',
              label: 'Hemorroides',
              type: 'checkbox',
              required: false
            },
            {
              id: 'hepatopatia',
              label: 'Hepatopatía',
              type: 'checkbox',
              required: false
            },
            {
              id: 'hernia',
              label: 'Hernia',
              type: 'checkbox',
              required: false
            }
          ]
        },
        {
          id: 'antecedentes_columna_derecha',
          title: 'Antecedentes Patológicos - Parte II',
          description: 'Continúe marcando los antecedentes patológicos confirmados',
          page: 2,
          order: 2,
          fields: [
            {
              id: 'hta',
              label: 'HTA (Hipertensión Arterial)',
              type: 'checkbox',
              required: true
            },
            {
              id: 'climaterio',
              label: 'Climaterio',
              type: 'checkbox',
              required: false
            },
            {
              id: 'anemia_h_hemat',
              label: 'Anemia/H. Hemat',
              type: 'checkbox',
              required: false
            },
            {
              id: 'colagenoapatia_lupus',
              label: 'Colagenoapatía',
              type: 'checkbox',
              required: false
            },
            {
              id: 'colagenoapatia_lupus_detalle',
              label: 'Especificar Colagenoapatía',
              type: 'text',
              required: false,
              placeholder: 'Ej: Lupus'
            },
            {
              id: 'colagenoapatia_uctd',
              label: 'Colagenoapatía (otra)',
              type: 'checkbox',
              required: false
            },
            {
              id: 'colagenoapatia_uctd_detalle',
              label: 'Especificar otra Colagenoapatía',
              type: 'text',
              required: false,
              placeholder: 'Ej: UCTD'
            },
            {
              id: 'constipacion',
              label: 'Constipación',
              type: 'checkbox',
              required: false
            },
            {
              id: 'constipacion_detalle',
              label: 'Especificar Constipación',
              type: 'text',
              required: false,
              placeholder: 'Detalles'
            },
            {
              id: 'diabetes',
              label: 'Diabetes',
              type: 'checkbox',
              required: true
            },
            {
              id: 'dislipemia',
              label: 'Dislipemia',
              type: 'checkbox',
              required: true
            },
            {
              id: 'dismenorrea',
              label: 'Dismenorrea',
              type: 'checkbox',
              required: false
            },
            {
              id: 'incont_urinaria',
              label: 'Incont. Urinaria',
              type: 'checkbox',
              required: false
            },
            {
              id: 'infec_ulcera_extrem',
              label: 'Infec./Úlcera en extrem.',
              type: 'checkbox',
              required: false
            },
            {
              id: 'endarterectomia_carotidea',
              label: 'Endarterectomía Carotídea',
              type: 'checkbox',
              required: false
            },
            {
              id: 'enf_coronaria',
              label: 'Enf. Coronaria',
              type: 'checkbox',
              required: true
            },
            {
              id: 'enf_coronaria_detalle',
              label: 'Especificar Enf. Coronaria',
              type: 'text',
              required: false,
              placeholder: 'Ej: Isquemia'
            },
            {
              id: 'enf_ginecologicas',
              label: 'Enf. Ginecológicas',
              type: 'checkbox',
              required: false
            },
            {
              id: 'enf_hematicas',
              label: 'Enf. Hemáticas',
              type: 'checkbox',
              required: false
            },
            {
              id: 'enf_infecciosas',
              label: 'Enf. Infecciosas',
              type: 'checkbox',
              required: false
            },
            {
              id: 'enf_infecciosas_detalle',
              label: 'Especificar Enf. Infecciosas',
              type: 'text',
              required: false,
              placeholder: 'Ej: Neumonía'
            },
            {
              id: 'enf_t_sexual',
              label: 'Enf. T. Sexual',
              type: 'checkbox',
              required: false
            },
            {
              id: 'enf_t_sexual_detalle',
              label: 'Especificar Enf. T. Sexual',
              type: 'text',
              required: false,
              placeholder: 'Ej: VIH'
            },
            {
              id: 'enf_oftalmologicas',
              label: 'Enf. Oftalmológicas',
              type: 'checkbox',
              required: false
            },
            {
              id: 'enolismo',
              label: 'Enolismo',
              type: 'checkbox',
              required: false
            },
            {
              id: 'epilepsia',
              label: 'Epilepsia',
              type: 'checkbox',
              required: false
            }
          ]
        }
      ]
    },
    {
      id: 'page_3',
      title: 'Antecedentes Patológicos Confirmados (Continuación)',
      packages: [
        {
          id: 'antecedentes_continuacion_izquierda',
          title: 'Antecedentes Patológicos - Parte III',
          description: 'Continúe marcando los antecedentes patológicos confirmados',
          page: 3,
          order: 1,
          fields: [
            {
              id: 'hiperuricemia',
              label: 'Hiperuricemia',
              type: 'checkbox',
              required: false
            },
            {
              id: 'hipoacusia',
              label: 'Hipoacusia',
              type: 'checkbox',
              required: false
            },
            {
              id: 'hipot_ortost',
              label: 'Hipot. ortost.',
              type: 'checkbox',
              required: false
            },
            {
              id: 'impotencia',
              label: 'Impotencia',
              type: 'text',
              required: false,
              placeholder: 'Especificar detalles si corresponde'
            },
            {
              id: 'insuf_cardiaca',
              label: 'Insuf. Cardíaca',
              type: 'checkbox',
              required: false
            },
            {
              id: 'litiasis',
              label: 'Litiasis',
              type: 'text',
              required: false,
              placeholder: 'Ej: Renal, Biliar, etc.'
            },
            {
              id: 'lumbalgia',
              label: 'Lumbalgia',
              type: 'checkbox',
              required: false
            },
            {
              id: 'mareos',
              label: 'Mareos',
              type: 'checkbox',
              required: false
            },
            {
              id: 'miocardiopatia',
              label: 'Miocardiopatía',
              type: 'text',
              required: false,
              placeholder: 'Ej: Hipertrófica, Dilatada, etc.'
            },
            {
              id: 'miopia',
              label: 'Miopía',
              type: 'checkbox',
              required: false
            },
            {
              id: 'nefropatia',
              label: 'Nefropatía',
              type: 'text',
              required: false,
              placeholder: 'Ej: Diabética, Crónica, etc.'
            },
            {
              id: 'neuropatia',
              label: 'Neuropatía',
              type: 'text',
              required: false,
              placeholder: 'Ej: Periférica, Diabética, etc.'
            }
          ]
        },
        {
          id: 'antecedentes_continuacion_derecha',
          title: 'Antecedentes Patológicos - Parte IV',
          description: 'Continúe marcando los antecedentes patológicos confirmados',
          page: 3,
          order: 2,
          fields: [
            {
              id: 'obesidad',
              label: 'Obesidad',
              type: 'checkbox',
              required: true
            },
            {
              id: 'osteoporosis',
              label: 'Osteoporosis',
              type: 'checkbox',
              required: false
            },
            {
              id: 'parkinson',
              label: 'Parkinson',
              type: 'checkbox',
              required: false
            },
            {
              id: 'pat_prostatica',
              label: 'Pat. Prostática',
              type: 'text',
              required: false,
              placeholder: 'Ej: HBP, Prostatitis, etc.'
            },
            {
              id: 'pat_psiq',
              label: 'Pat-Psiq.',
              type: 'text',
              required: false,
              placeholder: 'Ej: Depresión, Ansiedad, etc.'
            },
            {
              id: 'pat_tiroidea',
              label: 'Pat. Tiroidea',
              type: 'text',
              required: false,
              placeholder: 'Ej: Hipotiroidismo, Hipertiroidismo, etc.'
            },
            {
              id: 'pat_tumoral',
              label: 'Pat. Tumoral',
              type: 'text',
              required: false,
              placeholder: 'Ej: Ca de mama, Ca de próstata, etc.'
            },
            {
              id: 'periodo_fertil',
              label: 'Período Fértil',
              type: 'checkbox',
              required: false
            },
            {
              id: 'tabaquismo',
              label: 'Tabaquismo',
              type: 'checkbox',
              required: true
            },
            {
              id: 'ulcera_hd',
              label: 'Úlcera/H.D.',
              type: 'text',
              required: false,
              placeholder: 'Ej: Úlcera gástrica, H. Duodenal, etc.'
            },
            {
              id: 'valvulopatia',
              label: 'Valvulopatía',
              type: 'text',
              required: false,
              placeholder: 'Ej: Estenosis aórtica, Insuf. mitral, etc.'
            },
            {
              id: 'varices',
              label: 'Várices',
              type: 'checkbox',
              required: false
            }
          ]
        }
      ]
    },
    {
      id: 'page_4',
      title: 'Antecedentes Adicionales - Parte I',
      packages: [
        {
          id: 'antecedentes_adicionales_parte1',
          title: 'Otros Antecedentes y Desarrollo',
          description: 'Registre observaciones generales y antecedentes de infancia y adultez',
          page: 4,
          order: 1,
          fields: [
            {
              id: 'otros_observaciones',
              label: 'Otros/Observaciones',
              type: 'textarea',
              required: false,
              placeholder: 'Ej: No hay síntomas en las de consumo de tabaco. No abuso de alcohol o drogas...'
            },
            {
              id: 'infancia',
              label: 'A) Infancia',
              type: 'textarea',
              required: false,
              placeholder: 'Ej: Lesión de los nervios periféricos debido a una caída deportiva...'
            },
            {
              id: 'adulto',
              label: 'B) Adulto',
              type: 'textarea',
              required: false,
              placeholder: 'Ej: Erupción vascular periférica (2020)...'
            }
          ]
        }
      ]
    },
    {
      id: 'page_5',
      title: 'Antecedentes Adicionales - Parte II',
      packages: [
        {
          id: 'antecedentes_adicionales_parte2',
          title: 'Intervenciones y Medicación',
          description: 'Registre operaciones, traumas y medicación actual del paciente',
          page: 5,
          order: 1,
          fields: [
            {
              id: 'operaciones',
              label: 'C) Operaciones',
              type: 'textarea',
              required: false,
              placeholder: 'Ej: Cirugía por parálisis de los nervios periféricos (2008)...'
            },
            {
              id: 'traumas',
              label: 'D) Traumas',
              type: 'textarea',
              required: false,
              placeholder: 'Ej: No hay fracturas. He hay luxaciones...'
            },
            {
              id: 'medicacion_actual',
              label: 'Medicación Actual',
              type: 'textarea',
              required: false,
              placeholder: 'Ej: Metformina 500 mg, por día (VO X DBT 2008)...'
            }
          ]
        }
      ]
    },
    {
      id: 'page_6',
      title: 'Antecedentes Familiares y Socio-económicos',
      packages: [
        {
          id: 'antecedentes_adicionales',
          title: 'Información Complementaria del Paciente',
          description: 'Registre antecedentes familiares, socio-económicos y comentarios adicionales',
          page: 6,
          order: 1,
          fields: [
            {
              id: 'antecedentes_familiares',
              label: 'Antecedentes Familiares',
              type: 'textarea',
              required: false,
              placeholder: 'Ej: Ambos padres fallecidos por muerte súbita a edad avanzada...'
            },
            {
              id: 'antecedentes_socioeconomicos',
              label: 'Antecedentes Socio-económicos',
              type: 'textarea',
              required: false,
              placeholder: 'Ej: Satisface necesidades básicas. Tiene cobertura médica...'
            },
            {
              id: 'comentarios',
              label: 'Comentarios',
              type: 'textarea',
              required: false,
              placeholder: 'Ej: No hay antecedentes de uso previo de RA GLP...'
            }
          ]
        }
      ]
    },
    {
      id: 'page_7',
      title: 'Signos Vitales y Evaluación Clínica',
      packages: [
        {
          id: 'signos_vitales_evolucion',
          title: 'Signos Vitales',
          description: 'Mediciones actuales del paciente',
          page: 7,
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
          page: 7,
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
      id: 'page_8',
      title: 'Criterios y Seguimiento',
      packages: [
        {
          id: 'criterios_evaluacion',
          title: 'Criterios de Evaluación',
          description: 'Criterios específicos para el protocolo ANT-010 RED',
          page: 8,
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
          page: 8,
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
