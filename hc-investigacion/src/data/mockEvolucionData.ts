/**
 * Datos Mock para Formulario de Evolución Médica
 * 3 versiones completas con datos realistas para testing
 */

import { FormData } from '../components/forms/types';

export type MockVersion = 'version1' | 'version2' | 'version3' | 'empty';

/**
 * VERSIÓN 1: Paciente con evolución favorable
 * Perfil: Mujer de 45 años, control exitoso de HTA, seguimiento regular
 */
const version1Data: FormData = {
  // Página 1 - Datos del Paciente
  apellidos_nombres: 'García López, María Elena',
  sexo: 'F',
  domicilio: 'Av. Rivadavia 1250, CABA',
  localidad: 'CABA',
  dni: 28456789,
  os_mpp: 'OSDE 310',
  fecha_nacimiento: '1978-03-15',
  edad: 45,
  medico_cabecera: 'Dr. Roberto Fernández',
  tel1: '1145678901',
  tel2: '1156789012',
  contacto: 'Juan García (Esposo)',
  contacto_tel: '1167890123',
  profesion_tarea: 'Contadora',
  
  // Accesibilidad
  movilizacion: 'Sin dificultad',
  movilidad_propia: true,
  con_transporte: 'Privado',
  acceso_transporte: true,
  salida_casa: true,
  tipo_calle: 'Calle de asfalto',
  transporte_casa: true,
  
  // Página 2 - Primer Contacto
  primer_contacto: 'Paciente acude a consulta programada para control de HTA. Refiere buen estado general. Sin síntomas relevantes en el último período. Adherente al tratamiento farmacológico. Realiza actividad física regular. Consulta motivada por control semestral habitual.',
  
  // Página 3 - Motivo de Consulta y Enfermedad Actual
  motivo_consulta: 'Control de HTA y dislipemia. Solicitud de renovación de recetas.',
  enfermedad_actual: 'Paciente de 45 años con diagnóstico de HTA desde hace 8 años y dislipemia desde hace 5 años, ambas en tratamiento farmacológico. Evolución favorable con buen control de cifras tensionales. Última evaluación de laboratorio (hace 3 meses) con perfil lipídico dentro de objetivos. Sin síntomas cardiovasculares actuales. Niega dolor precordial, disnea o palpitaciones. Realiza actividad física regular (caminatas 30 min/día). No eventos cardiovasculares en el último año.',
  
  // Página 2 - Antecedentes Patológicos I
  acv: false,
  aneur_aort_reparado: false,
  alergia: true,
  alergia_detalle: 'Alergia a penicilina confirmada',
  amenorrea: false,
  amputacion: false,
  angiop_aterectomia: false,
  arritmia: false,
  artrosis_ar: false,
  cataratas: false,
  cefaleas: true,
  cirug_angiop_art_perif: false,
  claudicacion_intermitente: false,
  epoc: false,
  fracturas: false,
  gastritis: true,
  hemorroides: false,
  hepatopatia: false,
  hernia: false,
  
  // Antecedentes Patológicos II
  hta: true,
  climaterio: true,
  anemia_h_hemat: false,
  colagenoapatia_lupus: false,
  colagenoapatia_uctd: false,
  constipacion: false,
  diabetes: false,
  dislipemia: true,
  dismenorrea: false,
  incont_urinaria: false,
  infec_ulcera_extrem: false,
  endarterectomia_carotidea: false,
  enf_coronaria: false,
  enf_ginecologicas: false,
  enf_hematicas: false,
  enf_infecciosas: false,
  enf_t_sexual: false,
  enf_oftalmologicas: false,
  enolismo: false,
  epilepsia: false,
  
  // Página 3 - Antecedentes Patológicos III
  hiperuricemia: false,
  hipoacusia: false,
  hipot_ortost: false,
  impotencia: '',
  insuf_cardiaca: false,
  litiasis: '',
  lumbalgia: true,
  mareos: false,
  miocardiopatia: '',
  miopia: true,
  nefropatia: '',
  neuropatia: '',
  
  // Antecedentes Patológicos IV
  obesidad: false,
  osteoporosis: false,
  parkinson: false,
  pat_prostatica: '',
  pat_psiq: '',
  pat_tiroidea: '',
  pat_tumoral: '',
  periodo_fertil: false,
  tabaquismo: false,
  ulcera_hd: '',
  valvulopatia: '',
  varices: true,
  
  // Página 4 - Antecedentes Adicionales I
  otros_observaciones: 'Paciente colaboradora, adherente al tratamiento. Realiza actividad física regular (caminata 30 min diarios). No refiere consumo de alcohol. Vida sedentaria previa al diagnóstico de HTA.',
  infancia: 'Sin antecedentes patológicos relevantes en la infancia. Desarrollo psicomotor normal. Vacunación completa según calendario.',
  adulto: 'Diagnóstico de HTA en 2015 (37 años). Inició tratamiento con enalapril con buena respuesta. Dislipemia diagnosticada en control de rutina 2018.',
  
  // Página 5 - Antecedentes Adicionales II
  operaciones: 'Cesárea (2005). Apendicectomía (2012).',
  traumas: 'Esguince de tobillo izquierdo (2019) con recuperación completa.',
  medicacion_actual: 'Enalapril 10mg 1 comp/día (VO). Atorvastatina 20mg 1 comp/día (VO). Omeprazol 20mg según síntomas.',
  
  // Página 6 - Antecedentes Familiares y Socioeconómicos
  antecedentes_familiares: 'Madre: HTA, diabetes tipo 2. Padre: fallecido por IAM a los 68 años. Hermana: sana. No antecedentes de cáncer familiar.',
  antecedentes_socioeconomicos: 'Satisface necesidades básicas. Obra social (OSDE). Vivienda propia. Nivel socioeconómico medio-alto. Grupo familiar continente.',
  no_satisface_necesidades_basicas: 'N/A - Paciente satisface todas las necesidades básicas',
  comentarios: 'Buena adhesión al tratamiento. Controles regulares cada 6 meses. Último control de laboratorio dentro de parámetros normales.',
  
  // Página 9 - Examen Físico - Estado Actual
  constitucion: 'Normosómica',
  fascie: 'No patológica',
  altura_examen: 165,
  peso_examen: 65,
  imc_examen: 23.9,
  sc: '1.70',
  comentario_examen: 'Peso estable. IMC dentro de rango normal. Paciente en buen estado general.',
  
  // TSC
  edema: false,
  dist_adiposa: true,
  dist_adiposa_detalle: 'Acorde al sexo y edad, distribución ginecoide',
  adenopatias: false,
  mamas: false,
  raza: 'Caucásica',
  etnia: 'Hispana',
  
  // Piel y Faneras
  piel_faneras: 'Piel hidratada, sin lesiones. Faneras conservadas. Mucosas húmedas y rosadas.',
  
  // Cabeza
  ojos: 'Conjuntivas rosadas, escleras blancas',
  reflejos: 'Fotomotor y consensual conservados',
  
  // Página 10 - Cuello y Tórax
  inspeccion_cuello: 'Simétrico, móvil, sin masas',
  lat_arteriales: 'Presentes, simétricas',
  lat_venosas: 'No ingurgitadas',
  tiroides: 'No palpable, no bocio',
  t_yugular: 'No ingurgitado',
  auscultacion_vde_c: 'Sin soplos carotídeos',
  
  // Tórax Respiratorio
  f_resp: 16,
  rmp: 'Murmullo vesicular conservado',
  tipo_resp: 'Torácico',
  auscultacion: 'Murmullo vesicular presente bilateral, sin ruidos agregados',
  comentarios_respiratorio: 'Buena entrada de aire bilateral. No sibilancias. No roncus. Expansibilidad conservada.',
  
  // Tórax Cardiovascular
  inspeccion_cardiovascular: 'Tórax simétrico. No abombamientos. Choque de punta en 5to EIC LMC.',
  fremitos: 'No',
  frote: 'No',
  ta_cardiovascular: '128/82 mmHg',
  ausc_1r: true,
  ausc_plus: true,
  ausc_2r: true,
  ausc_3r: false,
  ausc_4r: false,
  ausc_clic: false,
  soplos: false,
  brazo: false,
  
  // Página 9 - Vascular Periférico
  pulso_radial_der: 'Normal',
  pulso_radial_izq: 'Normal',
  amplitud: 'Conservada',
  frecuencia: '72 lpm',
  ritmo: 'Regular',
  pulso_pedio_der: 'Normal',
  pulso_pedio_izq: 'Normal',
  p_femoral_der: 'Normal',
  p_femoral_izq: 'Normal',
  comentarios_vascular: 'Pulsos periféricos presentes y simétricos. Buena perfusión distal. No edemas. No várices significativas.',
  ta1: '128/82',
  ta2: '126/80',
  comentarios_ta: 'TA controlada con tratamiento actual',
  fc1: '72 lpm',
  fc2: '74 lpm',
  comentarios_fc: 'FC en reposo dentro de rango normal',
  
  // Página 11 - Abdomen y Urogenital
  abdomen: 'Blando, depresible, no doloroso. Ruidos hidroaéreos presentes. No visceromegalias. No masas palpables.',
  urogenital: 'Sin alteraciones. No referidas patologías genitourinarias.',
  
  // Página 12 - SOMA y Neurológico
  soma: 'Tono muscular conservado. Fuerza muscular 5/5 en cuatro miembros. Marcha sin alteraciones. Sensibilidad conservada.',
  neurologico: 'Paciente consciente, orientada en tiempo, espacio y persona. Lenguaje fluido. Pares craneales conservados. ROT presentes y simétricos.',
  comentarios_soma: 'Estado neurológico dentro de parámetros normales. No déficits motores ni sensitivos.',
  
  // Página 13 - Evolución
  evolucion: 'Paciente de 45 años con antecedente de HTA y dislipemia en tratamiento. Evolución favorable con buen control de cifras tensionales. Adherente al tratamiento farmacológico. Realiza actividad física regular. Última evaluación de laboratorio con perfil lipídico dentro de objetivos terapéuticos. Se indica continuar con tratamiento actual y control en 6 meses. Se refuerza importancia de hábitos saludables y actividad física.',
};

/**
 * VERSIÓN 2: Paciente con complicaciones leves
 * Perfil: Hombre de 62 años, múltiples comorbilidades, control regular
 */
const version2Data: FormData = {
  // Página 1 - Datos del Paciente
  apellidos_nombres: 'Fernández Martínez, Carlos Alberto',
  sexo: 'M',
  domicilio: 'Calle San Martín 845, Morón',
  localidad: 'Morón',
  dni: 16234567,
  os_mpp: 'PAMI',
  fecha_nacimiento: '1961-07-22',
  edad: 62,
  medico_cabecera: 'Dra. Laura González',
  tel1: '1134567890',
  tel2: '1145678901',
  contacto: 'Ana Fernández (Hija)',
  contacto_tel: '1156789012',
  profesion_tarea: 'Jubilado',
  
  // Accesibilidad (sin cambios en esta sección)
  movilizacion: 'Con dificultad',
  movilidad_propia: false,
  con_transporte: 'Publico',
  acceso_transporte: false,
  salida_casa: true,
  tipo_calle: 'Calle de tierra',
  transporte_casa: false,
  
  // Página 2 - Primer Contacto
  primer_contacto: 'Paciente de 62 años acude a control trimestral por múltiples comorbilidades. Refiere empeoramiento de claudicación intermitente en últimas semanas. Dificultad para adherencia a dieta. TA mal controlada en domicilio según registro. Solicita renovación de recetas. Acompañado por hija quien refiere preocupación por estado general del paciente.',
  
  // Página 3 - Motivo de Consulta y Enfermedad Actual
  motivo_consulta: 'Control de múltiples patologías crónicas: HTA, DBT2, enfermedad coronaria, EPOC. Empeoramiento de claudicación intermitente.',
  enfermedad_actual: 'Paciente de 62 años con múltiples comorbilidades. HTA diagnosticada hace 17 años, mal controlada actualmente. Diabetes tipo 2 desde hace 12 años, último control con HbA1c 8.2%. IAM con angioplastia hace 5 años, actualmente estable. EPOC moderado con crisis ocasionales. Refiere claudicación intermitente a menor distancia (200m), frialdad en pies, edema en miembros inferiores bilateral. Dificultades para adherencia a tratamiento y dieta. Control subóptimo de cifras tensionales en domicilio (150/95 promedio última semana).',
  
  // Página 4 - Antecedentes Patológicos I
  acv: false,
  aneur_aort_reparado: false,
  alergia: false,
  amenorrea: false,
  amputacion: false,
  angiop_aterectomia: false,
  arritmia: true,
  artrosis_ar: true,
  cataratas: true,
  cefaleas: false,
  cirug_angiop_art_perif: false,
  claudicacion_intermitente: true,
  epoc: true,
  fracturas: false,
  gastritis: true,
  hemorroides: true,
  hepatopatia: false,
  hernia: true,
  
  // Antecedentes Patológicos II
  hta: true,
  climaterio: false,
  anemia_h_hemat: false,
  colagenoapatia_lupus: false,
  colagenoapatia_uctd: false,
  constipacion: true,
  constipacion_detalle: 'Crónica, tratamiento con laxantes',
  diabetes: true,
  dislipemia: true,
  dismenorrea: false,
  incont_urinaria: true,
  infec_ulcera_extrem: false,
  endarterectomia_carotidea: false,
  enf_coronaria: true,
  enf_coronaria_detalle: 'Angina estable, stent en descendente anterior 2018',
  enf_ginecologicas: false,
  enf_hematicas: false,
  enf_infecciosas: false,
  enf_t_sexual: false,
  enf_oftalmologicas: true,
  enolismo: false,
  epilepsia: false,
  
  // Página 3 - Antecedentes Patológicos III
  hiperuricemia: true,
  hipoacusia: true,
  hipot_ortost: true,
  impotencia: 'Disfunción eréctil desde hace 5 años',
  insuf_cardiaca: false,
  litiasis: 'Litiasis renal, último episodio 2020',
  lumbalgia: true,
  mareos: true,
  miocardiopatia: '',
  miopia: false,
  nefropatia: 'Nefropatía diabética incipiente',
  neuropatia: 'Neuropatía diabética periférica',
  
  // Antecedentes Patológicos IV
  obesidad: true,
  osteoporosis: false,
  parkinson: false,
  pat_prostatica: 'HBP, en tratamiento con tamsulosina',
  pat_psiq: 'Depresión leve, seguimiento psicológico',
  pat_tiroidea: '',
  pat_tumoral: '',
  periodo_fertil: false,
  tabaquismo: true,
  ulcera_hd: '',
  valvulopatia: '',
  varices: true,
  
  // Página 4 - Antecedentes Adicionales I
  otros_observaciones: 'Paciente con múltiples comorbilidades. Ex-tabaquista (dejó hace 5 años, 30 paq/año). Sedentarismo. Dificultad para adherencia a dieta. Soporte familiar presente.',
  infancia: 'Sin antecedentes relevantes. Familia numerosa, condiciones socioeconómicas bajas.',
  adulto: 'Diagnóstico de HTA a los 45 años. Diabetes tipo 2 diagnosticada a los 50 años. IAM en 2018 con angioplastia + stent. EPOC diagnosticado hace 10 años.',
  
  // Página 5 - Antecedentes Adicionales II
  operaciones: 'Hernioplastia inguinal (2010). Angioplastia con colocación de stent en DA (2018). Cirugía de cataratas OD (2021).',
  traumas: 'Accidente de tránsito con fractura de costillas (2005). Esguince cervical (2015).',
  medicacion_actual: 'Enalapril 20mg 2 veces/día. Metformina 850mg 3 veces/día. Atorvastatina 40mg/día. AAS 100mg/día. Clopidogrel 75mg/día. Tamsulosina 0.4mg/día. Omeprazol 40mg/día. Salbutamol aerosol según necesidad.',
  
  // Página 6 - Antecedentes Familiares y Socioeconómicos
  antecedentes_familiares: 'Padre fallecido por IAM a los 60 años. Madre diabética, fallecida por ACV a los 72 años. Hermano con diabetes. Hermana con HTA.',
  antecedentes_socioeconomicos: 'Jubilación mínima. Vive con esposa. Hija colabora económicamente. PAMI. Dificultades para acceder a medicación de alto costo. Vivienda propia humilde.',
  no_satisface_necesidades_basicas: 'Dificultades económicas para acceder a todos los medicamentos prescriptos. Necesita gestión de medicación por programa social.',
  comentarios: 'Paciente con red de apoyo familiar. Requiere seguimiento estrecho y gestión social para acceso a medicación. Control trimestral recomendado.',
  
  // Página 7 - Examen Físico - Estado Actual
  constitucion: 'Obesidad central',
  fascie: 'Cushingoid',
  imc_examen: 32.5,
  peso_examen: 92,
  altura_examen: 169,
  sc: '2.05',
  comentario_examen: 'Sobrepeso importante. IMC compatible con obesidad grado I. Dificultad para bajar de peso.',
  
  // TSC
  edema: true,
  edema_detalle: 'Edema en miembros inferiores bilateral, leve, con fóvea',
  dist_adiposa: true,
  dist_adiposa_detalle: 'Distribución central, abdomen prominente',
  adenopatias: false,
  mamas: true,
  mamas_detalle: 'Ginecomastia grado I',
  raza: 'Caucásica',
  etnia: 'Hispana',
  
  // Piel y Faneras
  piel_faneras: 'Piel seca. Hiperqueratosis plantar. Micosis interdigital en pies. Onicomicosis en hallux derecho.',
  
  // Cabeza
  ojos: 'Xantelasmas. Arcus senilis',
  reflejos: 'Fotomotor lento bilateral',
  
  // Página 8 - Cuello y Tórax
  inspeccion_cuello: 'Cuello corto. Circunferencia aumentada. No masas palpables.',
  lat_arteriales: 'Aumentadas',
  lat_venosas: 'Levemente ingurgitadas',
  tiroides: 'No palpable',
  t_yugular: 'Levemente ingurgitado a 45 grados',
  auscultacion_vde_c: 'Soplo carotídeo izquierdo',
  
  // Tórax Respiratorio
  f_resp: 20,
  rmp: 'Disminuido en bases',
  tipo_resp: 'Torácico',
  auscultacion: 'Murmullo vesicular disminuido bilateral con sibilancias espiratorias difusas',
  comentarios_respiratorio: 'Murmullo vesicular disminuido bilateral. Sibilancias espiratorias difusas. Espiración prolongada. Compatible con EPOC.',
  
  // Tórax Cardiovascular
  inspeccion_cardiovascular: 'Tórax en tonel. Choque de punta no palpable.',
  fremitos: 'No',
  frote: 'No',
  ta_cardiovascular: '148/92 mmHg',
  ausc_1r: true,
  ausc_plus: true,
  ausc_2r: true,
  ausc_3r: false,
  ausc_4r: false,
  ausc_clic: false,
  soplos: true,
  soplos_detalle: 'Soplo sistólico 2/6 en foco mitral',
  brazo: true,
  
  // Página 9 - Vascular Periférico
  pulso_radial_der: 'Normal',
  pulso_radial_izq: 'Normal',
  amplitud: 'Conservada',
  frecuencia: '88 lpm, irregular',
  ritmo: 'Irregular',
  pulso_pedio_der: '-',
  pulso_pedio_izq: '-',
  p_femoral_der: 'Normal',
  p_femoral_izq: 'Normal',
  comentarios_vascular: 'Pulsos pedios disminuidos bilateral. Frialdad en pies. Claudicación intermitente a 200 metros. Várices en MMII bilateral.',
  ta1: '148/92',
  ta2: '146/90',
  comentarios_ta: 'TA mal controlada, considerar ajuste de dosis',
  fc1: '88 lpm',
  fc2: '86 lpm',
  comentarios_fc: 'FC elevada en reposo, ritmo irregular',
  
  // Abdomen y Urogenital
  abdomen: 'Globuloso, distendido. Obesidad central. RHA disminuidos. Hepatomegalia de 2cm. No doloroso a la palpación. Cicatriz de herniorrafia.',
  urogenital: 'Incontinencia urinaria de urgencia. Nicturia 3-4 veces por noche. Próstata aumentada de tamaño grado II.',
  
  // Página 10 - SOMA y Neurológico
  soma: 'Fuerza muscular global disminuida 4/5. Marcha lenta, arrastrando pies. Artrosis de rodillas bilateral. Disminución de sensibilidad vibratoria en pies.',
  neurologico: 'Consciente, orientado. Reflejos osteotendinosos disminuidos en MMII. Sensibilidad táctil disminuida en guante y calcetín. Compatible con neuropatía periférica.',
  comentarios_soma: 'Limitación funcional por artrosis y neuropatía. Requiere rehabilitación kinésica.',
  
  // Página 11 - Evolución
  evolucion: 'Paciente de 62 años con múltiples comorbilidades: HTA, DBT2, enfermedad coronaria, EPOC, obesidad. Control subóptimo de cifras tensionales y glucémicas. Neuropatía diabética periférica establecida. Claudicación intermitente. Requiere ajuste de tratamiento antihipertensivo. Se solicitan estudios: eco doppler arterial MMII, fondo de ojo, proteinuria, HbA1c. Derivación a nutrición para plan alimentario. Control en 1 mes con resultados. Se enfatiza adherencia a tratamiento y hábitos saludables.',
};

/**
 * VERSIÓN 3: Paciente con seguimiento complejo
 * Perfil: Mujer de 78 años, múltiples patologías, polifarmacia, fragilidad
 */
const version3Data: FormData = {
  // Página 1 - Datos del Paciente
  apellidos_nombres: 'Rodríguez de Pérez, Rosa María',
  sexo: 'F',
  domicilio: 'Av. Libertador 2345, Vicente López',
  localidad: 'Vicente López',
  dni: 4567890,
  os_mpp: 'PAMI',
  fecha_nacimiento: '1945-11-08',
  edad: 78,
  medico_cabecera: 'Dr. Martín Rodríguez',
  tel1: '1123456789',
  tel2: '1134567890',
  contacto: 'Patricia Pérez (Hija)',
  contacto_tel: '1145678901',
  profesion_tarea: 'Jubilada',
  
  // Accesibilidad (sin cambios)
  movilizacion: 'Con dificultad',
  movilidad_propia: false,
  con_transporte: 'Privado',
  acceso_transporte: false,
  salida_casa: false,
  tipo_calle: 'Calle de asfalto',
  transporte_casa: true,
  
  // Página 2 - Primer Contacto
  primer_contacto: 'Paciente de 78 años, frágil, acude acompañada por hija a control mensual. Refiere deterioro funcional progresivo. Múltiples caídas en último mes. Edema en miembros inferiores que ha empeorado. Disnea de esfuerzo CF II. Desorientación ocasional referida por familia. Dificultad para manejo de polifarmacia. Hija solicita interconsulta con geriatría y evaluación de cuidados domiciliarios.',
  
  // Página 3 - Motivo de Consulta y Enfermedad Actual
  motivo_consulta: 'Control mensual. Deterioro funcional. Múltiples caídas. Empeoramiento de edemas.',
  enfermedad_actual: 'Paciente de 78 años con múltiples patologías crónicas: HTA, DBT2, cardiopatía isquémica con IAM previo y angioplastia, IC CF II, FA permanente, valvulopatía mitral moderada, ACV previo con mínima secuela, ERC estadio 3a, hipotiroidismo, osteoporosis, deterioro cognitivo leve, anemia crónica. Post fractura de cadera hace 3 años con deterioro funcional severo posterior. Actualmente con dependencia para AVD básicas. Refiere empeoramiento de edemas en miembros inferiores bilateral, disnea de esfuerzo CF II estable, palpitaciones ocasionales por FA. Múltiples caídas (3 en último mes) sin fracturas. Confusión vespertina ocasional. Polifarmacia (15 medicamentos). Alto riesgo de caídas.',
  
  // Página 4 - Antecedentes Patológicos I
  acv: true,
  aneur_aort_reparado: false,
  alergia: true,
  alergia_detalle: 'Alergia a AINES (reacción anafiláctica previa)',
  amenorrea: true,
  amputacion: false,
  angiop_aterectomia: true,
  arritmia: true,
  artrosis_ar: true,
  cataratas: true,
  cefaleas: false,
  cirug_angiop_art_perif: false,
  claudicacion_intermitente: false,
  epoc: false,
  fracturas: true,
  fracturas_detalle: 'Fractura de cadera izquierda (2020). Fractura de Colles derecha (2018)',
  gastritis: true,
  hemorroides: false,
  hepatopatia: false,
  hernia: false,
  
  // Antecedentes Patológicos II
  hta: true,
  climaterio: true,
  anemia_h_hemat: true,
  colagenoapatia_lupus: false,
  colagenoapatia_uctd: false,
  constipacion: true,
  constipacion_detalle: 'Constipación crónica severa',
  diabetes: true,
  dislipemia: true,
  dismenorrea: false,
  incont_urinaria: true,
  infec_ulcera_extrem: false,
  endarterectomia_carotidea: false,
  enf_coronaria: true,
  enf_coronaria_detalle: 'IAM anteroseptal 2015. Angioplastia + 2 stents. IC CF II',
  enf_ginecologicas: false,
  enf_hematicas: true,
  enf_infecciosas: false,
  enf_t_sexual: false,
  enf_oftalmologicas: true,
  enolismo: false,
  epilepsia: false,
  
  // Página 3 - Antecedentes Patológicos III
  hiperuricemia: true,
  hipoacusia: true,
  hipot_ortost: true,
  impotencia: '',
  insuf_cardiaca: true,
  litiasis: '',
  lumbalgia: true,
  mareos: true,
  miocardiopatia: '',
  miopia: false,
  nefropatia: 'ERC estadio 3a',
  neuropatia: 'Neuropatía diabética',
  
  // Antecedentes Patológicos IV
  obesidad: false,
  osteoporosis: true,
  parkinson: false,
  pat_prostatica: '',
  pat_psiq: 'Deterioro cognitivo leve. Depresión',
  pat_tiroidea: 'Hipotiroidismo en tratamiento sustitutivo',
  pat_tumoral: '',
  periodo_fertil: false,
  tabaquismo: false,
  ulcera_hd: '',
  valvulopatia: 'Insuficiencia mitral moderada',
  varices: true,
  
  // Página 4 - Antecedentes Adicionales I
  otros_observaciones: 'Paciente añosa con múltiples patologías crónicas. Polifarmacia (12 medicamentos). Riesgo de caídas alto. Limitación funcional severa. Requiere asistencia para AVD. Cuida hija. Seguimiento por equipo interdisciplinario. Fragilidad.',
  infancia: 'Sin datos relevantes. Familia de clase media. Desarrollo normal.',
  adulto: 'Diagnóstico de HTA a los 55 años. Diabetes tipo 2 a los 60 años. IAM a los 70 años. ACV isquémico hemisférico derecho con secuela motora leve (2017). Fractura de cadera izquierda por caída (2020) con posterior deterioro funcional importante.',
  
  // Página 5 - Antecedentes Adicionales II
  operaciones: 'Histerectomía (1985). Colecistectomía (1995). Angioplastia coronaria + stents (2015). Cirugía de cataratas bilateral (2016-2017). Osteosíntesis de cadera izquierda (2020).',
  traumas: 'Fractura de cadera izquierda por caída en domicilio (2020). Fractura de Colles derecha por caída (2018). Múltiples caídas en último año.',
  medicacion_actual: 'Enalapril 10mg + HCTZ 12.5mg 1 comp/día. Carvedilol 6.25mg 2 veces/día. Furosemida 40mg/día. Espironolactona 25mg/día. AAS 100mg/día. Clopidogrel 75mg/día. Atorvastatina 40mg/día. Metformina 500mg 2 veces/día. Levotiroxina 75mcg/día. Hierro 300mg/día. Calcio + VitD 600mg/día. Omeprazol 20mg/día. Sertralina 50mg/día. Memantina 10mg/día. Tramadol 50mg según dolor. Lactulosa 15ml/día.',
  
  // Página 6 - Antecedentes Familiares y Socioeconómicos
  antecedentes_familiares: 'Padres fallecidos por causas cardiovasculares. Hermana con enfermedad de Alzheimer. Hijos sanos.',
  antecedentes_socioeconomicos: 'Jubilación docente. PAMI. Vivienda propia. Vive con hija y nieta. Buena cobertura social. Nivel socioeconómico medio.',
  no_satisface_necesidades_basicas: 'Paciente satisface necesidades con ayuda familiar. Cobertura social adecuada.',
  comentarios: 'Paciente con deterioro funcional progresivo. Riesgo de caídas. Requiere adecuación del domicilio (barandas, silla de ruedas). Control mensual. Equipo de cuidados paliativos evaluando. Familia continente.',
  
  // Página 7 - Examen Físico - Estado Actual
  constitucion: 'Caquéctica',
  fascie: 'Senil',
  imc_examen: 19.8,
  peso_examen: 48,
  altura_examen: 156,
  sc: '1.45',
  comentario_examen: 'Bajo peso. Sarcopenia evidente. Pérdida ponderal de 8 kg en último año.',
  
  // TSC
  edema: true,
  edema_detalle: 'Edema en MMII bilateral hasta rodillas, con fóvea, no doloroso',
  dist_adiposa: true,
  dist_adiposa_detalle: 'Disminuida, sarcopenia',
  adenopatias: false,
  mamas: false,
  raza: 'Caucásica',
  etnia: 'Europea',
  
  // Piel y Faneras
  piel_faneras: 'Piel senil, adelgazada, múltiples equimosis. Xerosis generalizada. Uñas quebradizas. Pelo canoso y ralo.',
  
  // Cabeza
  ojos: 'Conjuntivas pálidas. Operada de cataratas bilateral',
  reflejos: 'Fotomotor lento',
  
  // Página 8 - Cuello y Tórax
  inspeccion_cuello: 'Cuello delgado. Latido carotídeo visible. Soplo carotídeo derecho.',
  lat_arteriales: 'Aumentadas',
  lat_venosas: 'Ingurgitadas',
  tiroides: 'No palpable',
  t_yugular: 'Ingurgitado a 45 grados, 8 cm',
  auscultacion_vde_c: 'Soplo carotídeo derecho 2/6',
  
  // Tórax Respiratorio
  f_resp: 22,
  rmp: 'Murmullo vesicular disminuido',
  tipo_resp: 'Torácico',
  auscultacion: 'Hipoventilación basal bilateral con crepitantes finos en bases',
  comentarios_respiratorio: 'Hipoventilación basal bilateral. Crepitantes finos en bases. Expansibilidad limitada.',
  
  // Tórax Cardiovascular
  inspeccion_cardiovascular: 'Tórax asténico. Choque de punta desplazado.',
  fremitos: 'No',
  frote: 'No',
  ta_cardiovascular: '102/68 mmHg',
  ausc_1r: true,
  ausc_plus: false,
  ausc_2r: true,
  ausc_3r: true,
  ausc_4r: false,
  ausc_clic: false,
  soplos: true,
  soplos_detalle: 'Soplo sistólico 3/6 en foco mitral, irradiado a axila',
  brazo: true,
  
  // Página 9 - Vascular Periférico
  pulso_radial_der: 'Normal',
  pulso_radial_izq: 'Normal',
  amplitud: 'Disminuida',
  frecuencia: '82 lpm, irregular',
  ritmo: 'Irregular (FA)',
  pulso_pedio_der: '-',
  pulso_pedio_izq: '-',
  p_femoral_der: 'Normal',
  p_femoral_izq: 'Normal',
  comentarios_vascular: 'Pulsos pedios no palpables. Frialdad distal en pies. Llenado capilar lento (>3 seg). Pulsos radiales irregulares por FA. Várices en MMII.',
  ta1: '102/68',
  ta2: '98/66',
  comentarios_ta: 'TA baja, considerar ajuste de medicación antihipertensiva',
  fc1: '82 lpm',
  fc2: '88 lpm',
  comentarios_fc: 'FA permanente, FC variable',
  
  // Abdomen y Urogenital
  abdomen: 'Excavado. Blando, no doloroso. RHA presentes. No visceromegalias. Cicatrices de cirugías previas.',
  urogenital: 'Incontinencia urinaria de esfuerzo y urgencia. Usa pañales. Prolapso vaginal grado II.',
  
  // Página 10 - SOMA y Neurológico
  soma: 'Sarcopenia severa. Fuerza muscular disminuida 3/5 en MMSS, 2/5 en MMII. Limitación funcional severa. Dependiente para AVD. Marcha con andador, trayectos cortos. Riesgo de caídas muy alto. Secuela motora de ACV: hemiparesia derecha residual leve.',
  neurologico: 'Consciente, orientada en tiempo y persona, desorientada en espacio ocasionalmente. Deterioro cognitivo leve (MMSE 22/30). Lenguaje conservado. Memoria reciente alterada. ROT globalmente disminuidos. Sensibilidad alterada en MMII. Marcha inestable.',
  comentarios_soma: 'Paciente frágil con alto riesgo de caídas. Requiere supervisión permanente. Kinesioterapia domiciliaria. Valoración por terapia ocupacional para adecuación ambiental.',
  
  // Página 11 - Evolución
  evolucion: 'Paciente de 78 años, frágil, con múltiples comorbilidades: HTA, DBT2, cardiopatía isquémica, IC CF II, FA permanente, valvulopatía mitral, ACV previo, ERC estadio 3a, hipotiroidismo, osteoporosis, deterioro cognitivo leve, anemia, polifarmacia. Presenta deterioro funcional progresivo post fractura de cadera. Dependiente para AVD básicas. Alto riesgo de caídas. Edemas en MMII por IC. FA con control de frecuencia subóptimo. Anemia multifactorial en estudio. TA baja, sugiere ajuste de antihipertensivos. Requiere manejo interdisciplinario: cardiología, geriatría, neurología, traumatología, kinesiología. Control mensual. Optimización de tratamiento. Reforzar medidas de prevención de caídas. Apoyo a cuidadores. Se cita con estudios: ECG, ecocardiograma, laboratorio completo con perfil renal y metabólico.',
};

/**
 * Datos vacíos para reset
 */
const emptyData: FormData = {};

/**
 * Objeto principal con todas las versiones
 */
export const mockEvolucionVersions = {
  version1: version1Data,
  version2: version2Data,
  version3: version3Data,
  empty: emptyData,
};

/**
 * Obtener datos por versión
 */
export const getMockDataByVersion = (version: MockVersion): FormData => {
  return mockEvolucionVersions[version];
};

/**
 * Descripciones de cada versión
 */
export const versionDescriptions = {
  version1: 'Paciente con evolución favorable - Control exitoso',
  version2: 'Paciente con complicaciones leves - Múltiples comorbilidades',
  version3: 'Paciente con seguimiento complejo - Fragilidad y polifarmacia',
  empty: 'Formulario vacío',
};






