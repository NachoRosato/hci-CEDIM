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
              id: 'sexo',
              label: 'Sexo',
              type: 'radio',
              required: true,
              options: ['F', 'M']
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
              id: 'fecha_nacimiento',
              label: 'Fecha de Nacimiento',
              type: 'date',
              required: true
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
              id: 'tel1',
              label: 'Tel.1',
              type: 'text',
              required: false,
              placeholder: 'Ej: 115569605'
            },
            {
              id: 'contacto',
              label: 'Contacto',
              type: 'text',
              required: false,
              placeholder: 'Ej: John Doe'
            },
            {
              id: 'tel2',
              label: 'Tel.2',
              type: 'text',
              required: false,
              placeholder: 'Ej: 115569605'
            },
            {
              id: 'profesion_tarea',
              label: 'Profesión/Tarea Actual',
              type: 'text',
              required: false,
              placeholder: 'Ej: Abogada, Profesor, Desempleado, Ama de casa, etc.'
            },
            {
              id: 'profesion_anterior',
              label: 'Anterior',
              type: 'text',
              required: false,
              placeholder: 'Ej: Abogada, Profesor, Desempleado, Ama de casa, etc.'
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
              type: 'radio',
              required: true,
              options: ['Sin dificultad', 'Con dificultad']
            },
            {
              id: 'movilidad_propia',
              label: 'Con movilidad propia',
              type: 'checkbox',
              required: false
            },
            {
              id: 'con_transporte',
              label: 'Con transporte',
              type: 'radio',
              required: false,
              options: ['Publico', 'Privado']
            },
            {
              id: 'acceso_transporte',
              label: 'Accede sin dificultad al transporte',
              type: 'checkbox',
              required: false
            },
            {
              id: 'salida_casa',
              label: 'Puede salir sin dificultad de su casa',
              type: 'checkbox',
              required: false
            },
            {
              id: 'tipo_calle',
              label: 'Calle',
              type: 'radio',
              required: false,
              options: ['Calle de asfalto', 'Calle de tierra']
            },
            {
              id: 'transporte_casa',
              label: 'El transporte llega hasta su casa',
              type: 'checkbox',
              required: false
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
              id: 'no_satisface_necesidades_basicas',
              label: 'No satisface necesidades básicas',
              type: 'textarea',
              required: true,
              placeholder: 'Ej: NO satisface necesidades básicas...'
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
      title: 'Examen Físico - Estado Actual',
      packages: [
        {
          id: 'examen_general',
          title: 'Exámen General',
          description: 'Evaluación general del estado físico del paciente',
          page: 7,
          order: 1,
          fields: [
            {
              id: 'constitucion',
              label: 'Constitución',
              type: 'text',
              required: false,
              placeholder: ''
            },
            {
              id: 'fascie',
              label: 'Fascie',
              type: 'text',
              required: false,
              placeholder: ''
            },
            {
              id: 'imc_examen',
              label: 'IMC',
              type: 'number',
              required: true,
              placeholder: 'Ej: 25.1'
            },
            {
              id: 'peso_examen',
              label: 'Peso',
              type: 'number',
              required: true,
              placeholder: 'Ej: 74 kg'
            },
            {
              id: 'altura_examen',
              label: 'Altura',
              type: 'number',
              required: true,
              placeholder: 'Ej: 187 cm'
            },
            {
              id: 'sc',
              label: 'SC',
              type: 'text',
              required: false,
              placeholder: 'Ej:'
            },
            {
              id: 'comentario_examen',
              label: 'Comentario',
              type: 'textarea',
              required: false,
              placeholder: 'Ej: Pesaje realizado con ropa liviana, sin calzado. Vejiga vacia.'
            }
          ]
        },
        {
          id: 'tsc_evaluacion',
          title: 'TSC',
          description: 'Evaluación de características físicas y distribución',
          page: 7,
          order: 2,
          fields: [
            {
              id: 'edema',
              label: 'Edema',
              type: 'checkbox',
              required: false
            },
            {
              id: 'edema_detalle',
              label: 'Detalle de Edema',
              type: 'text',
              required: false,
              placeholder: 'Especificar localización y características'
            },
            {
              id: 'dist_adiposa',
              label: 'Dist. Adiposa',
              type: 'text',
              required: true,
              placeholder: 'Ej: Acorde al sexo y edad'
            },
            {
              id: 'adenopatias',
              label: 'Adenopatías',
              type: 'checkbox',
              required: false
            },
            {
              id: 'adenopatias_detalle',
              label: 'Detalle de Adenopatías',
              type: 'text',
              required: false,
              placeholder: 'Especificar localización y características'
            },
            {
              id: 'raza',
              label: 'Raza',
              type: 'text',
              required: false,
              placeholder: 'Ej: caucásico'
            },
            {
              id: 'etnia',
              label: 'Etnia',
              type: 'text',
              required: false,
              placeholder: 'Ej: Mapuche'
            }
          ]
        },
        {
          id: 'piel_faneras',
          title: 'Piel y Faneras',
          description: 'Evaluación de piel, cabello y uñas',
          page: 7,
          order: 3,
          fields: [
            {
              id: 'piel_faneras',
              label: 'Piel y Faneras',
              type: 'textarea',
              required: false,
              placeholder: 'Ej:'
            }
          ]
        },
        {
          id: 'cabeza',
          title: 'Cabeza',
          description: 'Evaluación de órganos de la cabeza',
          page: 7,
          order: 4,
          fields: [
            {
              id: 'ojos',
              label: 'Ojos',
              type: 'text',
              required: true,
              placeholder: 'Ej: Conjutivos'
            },
            {
              id: 'vision',
              label: 'Visión',
              type: 'text',
              required: false,
              placeholder: 'Ej: Presbicia'
            },
            {
              id: 'reflejos',
              label: 'Reflejos',
              type: 'text',
              required: false,
              placeholder: 'Ej: Conservados'
            },
            {
              id: 'boca',
              label: 'Boca',
              type: 'text',
              required: false,
              placeholder: 'Ej: Fauces'
            },
            {
              id: 'nariz',
              label: 'Nariz',
              type: 'text',
              required: false,
              placeholder: 'Ej: Senos Paranasales'
            },
            {
              id: 'oidos',
              label: 'Oídos',
              type: 'text',
              required: false,
              placeholder: 'Ej: normales'
            }
          ]
        }
      ]
    },
    {
      id: 'page_8',
      title: 'Examen Físico - Cuello y Tórax',
      packages: [
        {
          id: 'cuello',
          title: 'Cuello',
          description: 'Evaluación del cuello y estructuras relacionadas',
          page: 8,
          order: 1,
          fields: [
            {
              id: 'inspeccion_cuello',
              label: 'Inspección',
              type: 'textarea',
              required: true,
              placeholder: 'Ej:'
            },
            {
              id: 'lat_arteriales',
              label: 'Lat. Arteriales',
              type: 'text',
              required: false,
              placeholder: 'Ej: Presentes'
            },
            {
              id: 'lat_venosas',
              label: 'Lat. Venosas',
              type: 'text',
              required: true,
              placeholder: 'Ej: No'
            },
            {
              id: 'tiroides',
              label: 'Tiroides',
              type: 'text',
              required: false,
              placeholder: 'Ej: No palpable'
            },
            {
              id: 't_yugular',
              label: 'T. Yugular',
              type: 'text',
              required: false,
              placeholder: 'Ej: No'
            },
            {
              id: 'auscultacion_vde_c',
              label: 'Auscultación Vde C',
              type: 'text',
              required: false,
              placeholder: 'Ej: No hay soplos'
            }
          ]
        },
        {
          id: 'torax_aparato_respiratorio',
          title: 'Tórax Aparato Respiratorio',
          description: 'Evaluación del sistema respiratorio',
          page: 8,
          order: 2,
          fields: [
            {
              id: 'f_resp',
              label: 'F. Resp:',
              type: 'number',
              required: true,
              placeholder: 'Ej: 16'
            },
            {
              id: 'rmp',
              label: 'RMP',
              type: 'text',
              required: false,
              placeholder: 'Ej:'
            },
            {
              id: 'tipo_resp',
              label: 'Tipo Resp.',
              type: 'radio',
              required: false,
              options: ['A', 'T']
            },
            {
              id: 'comentarios_respiratorio',
              label: 'Comentarios',
              type: 'textarea',
              required: false,
              placeholder: 'Ej: Buena emitida de aire, no hay soplos...'
            }
          ]
        },
        {
          id: 'torax_aparato_cardiovascular',
          title: 'Tórax Aparato Cardiovascular',
          description: 'Evaluación del sistema cardiovascular',
          page: 8,
          order: 3,
          fields: [
            {
              id: 'inspeccion_cardiovascular',
              label: 'Inspección',
              type: 'textarea',
              required: false,
              placeholder: 'Ej:'
            },
            {
              id: 'zmi',
              label: 'ZMI',
              type: 'text',
              required: false,
              placeholder: 'Ej:'
            },
            {
              id: 'fremitos',
              label: 'Frémitos',
              type: 'text',
              required: true,
              placeholder: 'Ej: No'
            },
            {
              id: 'frote',
              label: 'Frote',
              type: 'text',
              required: false,
              placeholder: 'Ej: No'
            },
            {
              id: 'ta_cardiovascular',
              label: 'TA',
              type: 'text',
              required: false,
              placeholder: 'Ej:'
            },
            {
              id: 'ausc_1r',
              label: '1R',
              type: 'checkbox',
              required: false
            },
            {
              id: 'ausc_plus',
              label: '+',
              type: 'checkbox',
              required: false
            },
            {
              id: 'ausc_2r',
              label: '2R',
              type: 'checkbox',
              required: false
            },
            {
              id: 'ausc_3r',
              label: '3R',
              type: 'checkbox',
              required: false
            },
            {
              id: 'ausc_4r',
              label: '4R',
              type: 'checkbox',
              required: false
            },
            {
              id: 'ausc_clic',
              label: 'Clic',
              type: 'checkbox',
              required: false
            },
            {
              id: 'soplos',
              label: 'Soplos',
              type: 'checkbox',
              required: false
            },
            {
              id: 'soplos_detalle',
              label: 'Detalle de Soplos',
              type: 'text',
              required: false,
              placeholder: 'Especificar características'
            },
            {
              id: 'comentarios_cardiovascular',
              label: 'Comentarios',
              type: 'textarea',
              required: false,
              placeholder: 'Ej: Se procede a determinar el brazo dominante en un ambiente relajado, con la vejiga vacía...'
            },
            {
              id: 'brazo',
              label: 'Brazo',
              type: 'radio',
              required: true,
              options: ['Izquierdo', 'Derecho']
            },
            {
              id: 'tabd',
              label: 'TABD',
              type: 'text',
              required: false,
              placeholder: 'Ej:149/89'
            },
            {
              id: 'tabd1',
              label: 'TABD1',
              type: 'text',
              required: false,
              placeholder: 'Ej:146/90'
            }
          ]
        }
      ]
    },
    {
      id: 'page_9',
      title: 'Examen Físico - Vascular Periférico y Abdomen',
      packages: [
        {
          id: 'vascular_periferico',
          title: 'Vasc. Periférico',
          description: 'Evaluación del sistema vascular periférico',
          page: 9,
          order: 1,
          fields: [
            {
              id: 'pulso_radial_der',
              label: 'Pulso Radial Der.',
              type: 'radio',
              required: true,
              options: ['+', '-', 'Normal']
            },
            {
              id: 'pulso_radial_izq',
              label: 'Izq.',
              type: 'radio',
              required: false,
              options: ['+', '-', 'Normal']
            },
            {
              id: 'amplitud',
              label: 'Amplitud',
              type: 'text',
              required: false,
              placeholder: 'Ej: Conservada'
            },
            {
              id: 'frecuencia',
              label: 'Frecuencia',
              type: 'text',
              required: true,
              placeholder: 'Ej: Conservada'
            },
            {
              id: 'ritmo',
              label: 'Ritmo',
              type: 'text',
              required: false,
              placeholder: 'Ej: Regular'
            },
            {
              id: 'pulso_pedio_der',
              label: 'Pulso Pedio Der.',
              type: 'radio',
              required: false,
              options: ['+', '-', 'Normal']
            },
            {
              id: 'pulso_pedio_izq',
              label: 'Izq.',
              type: 'radio',
              required: true,
              options: ['+', '-', 'Normal']
            },
            {
              id: 'p_femoral_der',
              label: 'P. Femoral Der.',
              type: 'radio',
              required: false,
              options: ['+', '-', 'Normal']
            },
            {
              id: 'p_femoral_izq',
              label: 'Izq.',
              type: 'radio',
              required: false,
              options: ['+', '-', 'Normal']
            },
            {
              id: 'comentarios_vascular',
              label: 'Comentarios',
              type: 'textarea',
              required: false,
              placeholder: 'Ej: En la misma posición y ambiente, se proceden a realizar 2 mediciones de TA y FC con una diferencia en e brazo dominante..'
            },
            {
              id: 'ta1',
              label: 'TA₁',
              type: 'text',
              required: true,
              placeholder: 'Ej: 145/81'
            },
            {
              id: 'ta2',
              label: 'TA₂',
              type: 'text',
              required: false,
              placeholder: 'Ej: 140/79'
            },
            {
              id: 'comentarios_ta',
              label: 'Comentarios (TA)',
              type: 'text',
              required: false,
              placeholder: 'Ej: Con presurómetro autorizado'
            },
            {
              id: 'fc1',
              label: 'FC₁',
              type: 'text',
              required: false,
              placeholder: "Ej: 65x'"
            },
            {
              id: 'fc2',
              label: 'FC₂',
              type: 'text',
              required: true,
              placeholder: "Ej: 66x'"
            },
            {
              id: 'comentarios_fc',
              label: 'Comentarios (FC)',
              type: 'text',
              required: false,
              placeholder: "Ej: Mediante palpitación radial por 1'"
            }
          ]
        },
        {
          id: 'abdomen',
          title: 'Abdomen',
          description: 'Evaluación abdominal',
          page: 9,
          order: 2,
          fields: [
            {
              id: 'abdomen',
              label: 'Abdomen',
              type: 'textarea',
              required: false,
              placeholder: 'Ej:'
            }
          ]
        },
        {
          id: 'urogenital',
          title: 'Urogenital',
          description: 'Evaluación del sistema urogenital',
          page: 9,
          order: 3,
          fields: [
            {
              id: 'urogenital',
              label: 'Urogenital',
              type: 'textarea',
              required: false,
              placeholder: 'Ej:'
            }
          ]
        }
      ]
    },
    {
      id: 'page_10',
      title: 'SOMA - Neurologico',
      packages: [
        {
          id: 'soma_neurologico',
          title: 'Evaluación Somática y Neurológica',
          description: 'Evaluación del sistema somático y neurológico',
          page: 10,
          order: 1,
          fields: [
            {
              id: 'soma',
              label: 'SOMA',
              type: 'textarea',
              required: true,
              placeholder: 'Ej:'
            },
            {
              id: 'neurologico',
              label: 'Neurológico',
              type: 'textarea',
              required: false,
              placeholder: 'Ej:'
            },
            {
              id: 'comentarios_soma',
              label: 'Comentarios',
              type: 'textarea',
              required: true,
              placeholder: 'Ej:'
            }
          ]
        }
      ]
    },
    {
      id: 'page_11',
      title: 'Evolución',
      packages: [
        {
          id: 'evolucion',
          title: 'Evolución del Paciente',
          description: 'Registro de la evolución general del paciente',
          page: 11,
          order: 1,
          fields: [
            {
              id: 'evolucion',
              label: 'Evolución',
              type: 'textarea',
              required: false,
              placeholder: 'Ej:'
            }
          ]
        }
      ]
    }
    // Páginas 13 y 14 comentadas temporalmente hasta completar página 12
    /* 
    ,{
      id: 'page_13',
      title: 'Signos Vitales y Evaluación Clínica',
      packages: [
        {
          id: 'signos_vitales_evolucion',
          title: 'Signos Vitales',
          description: 'Mediciones actuales del paciente',
          page: 13,
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
          page: 13,
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
      id: 'page_14',
      title: 'Criterios y Seguimiento',
      packages: [
        {
          id: 'criterios_evaluacion',
          title: 'Criterios de Evaluación',
          description: 'Criterios específicos para el protocolo ANT-010 RED',
          page: 14,
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
          page: 14,
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
    */
  ]
};
