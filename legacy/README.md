# hcIonic

Requires node =< 14.21.3

powered by DIM

# Publicar

ionic build //deprecado

npm run build:production //corre scrip de limpiado mas tags en index.

# apis backend

https://wshc.dim.com.ar/api/v1/
https://ws-hctest.dim.com.ar/api/v1/
https://localhost:44333/api/v1/

# credenciales docker snomed

https://10.21.0.73:9443/#!/auth
admin
Cramer2790!!

# config values

"REACT_APP_BACKEND_URL": "https://localhost:44333/api/v1/", //backend gral de la app
"REACT_APP_SNOMED_URL": "https://snomed.dim.com.ar/", //integracion api snomed
"URL_AGENDA": "https://agendatest.dim.com.ar/", //url de agenda para enviar la actualizacion de la misma una vez cierra o guarda la evo
"opcDocumentosPaciente": false, //futuro modulo documentos paciente
"opcDatosConfidenciales": false, //modulo datos confidenciales, nunca se activo (documentos del paciente)
"opcSnomed": true, //modulo diagnostico snomed
"opcEnfermedadesyAntecedentes": false, //modulo enfermedad y antecedente
"opcEstudiosPrevios": true, //modulo estudios previos
"opcOrdenesDigitales": false, //modulo ordenes digitales
"opcOrdenesDigitalesLabo": true, //modulo interno orden labo
"opcOrdenesDigitalesEstudios": false, //modulo interno orden prac
"opcIndicacionFarmaco": false, //modulo indicacion farmacologica
"opcSeguimiento": false, //modulo seguimiento
"opcEditorTextoHerramientas": true, // agrega nuevos item de edicion al editor de texto
"opcFormatearTextoTags": false, //formatea el texto que viene de otras evoluciones html para que se vea bien en el nuevo
"opcImpresionPdf": true, //modulo de impresion de historias clinicas
"opcRecetaDigital": true, //modulo de receta digital
"opcExamenFisico": true, //modulo examen fisico
"opcDictadoVoz": true, //modulo dictado por voz
"opcResetContext": true //resetea el contexto gral al salir de la app
