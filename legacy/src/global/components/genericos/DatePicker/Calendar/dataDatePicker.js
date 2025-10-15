let mesActual = [
    [null, null, null, null, null,null], // Dom
    [null, null, null, null, null,null], // Lun
    [null, null, null, null, null,null], // Mar
    [null, null, null, null, null,null], // Mier
    [null, null, null, null, null,null], // jue
    [null, null, null, null, null,null],  // Vie
    [null, null, null, null, null,null]   // Sab
]

export const obtenerFecha = (fechaInicial, countSemana, mesAnterior) => {
   
    // seteo la semana
    if(!countSemana) countSemana = 0; 
    // seteo el mes anterior
    if(!mesAnterior) mesAnterior = fechaInicial.getMonth() + 1;
    // crear caso base 
    if(mesAnterior && mesAnterior !== fechaInicial.getMonth() + 1){
        const mesReturn = mesActual; 
        mesActual = [
            [null, null, null, null, null,null], // Dom
            [null, null, null, null, null,null], // Lun
            [null, null, null, null, null,null], // Mar
            [null, null, null, null, null,null], // Mier
            [null, null, null, null, null,null], // jue
            [null, null, null, null, null,null],  // Vie
            [null, null, null, null, null,null]   // Sab
        ]
        return mesReturn
    }
    // // llena el array de mes actual

    mesActual[fechaInicial.getDay()].forEach((element, index) => {
        if(!element && index === countSemana){
            mesActual[fechaInicial.getDay()][index] = fechaInicial.getDate(); 
        }
    })

    // Setea el día siguiente
    fechaInicial.setDate(fechaInicial.getDate()+1);

    //Cambio de semana 
    if(fechaInicial.getDay() === 1) countSemana = countSemana + 1;

    
    return obtenerFecha(fechaInicial, countSemana, mesAnterior)
}


export const dias = [{dia:"Lun", index:1}, {dia:"Mar", index:2}, {dia:"Mie", index:3}, {dia:"Jue", index:4}, {dia:"Vie", index:5}, {dia:"Sab", index:6}, {dia:"Dom", index:0}];

export const meses = [
    {
        id: "01",
        descripcion: "Enero"
    },
    {
        id: "02",
        descripcion: "Febrero",
    },
    {
        id: "03",
        descripcion: "Marzo",
    },
    {
        id: "04",
        descripcion: "Abril",
    },
    {
        id: "05",
        descripcion: "Mayo",
    },
    {
        id: "06",
        descripcion: "Junio",
    },
    {
        id: "07",
        descripcion:"Julio",
    },
    {
        id: "08",
        descripcion:"Agosto",
    },
    {
        id: "09",
        descripcion:"Septiembre",
    },
    {
        id: "10",
        descripcion:"Octubre",
    },
    {
        id: "11",
        descripcion:"Noviembre",
    },
    {
        id: "12",
        descripcion:"Diciembre",
    },
  ];

export const obtenerMesYaño = (fechaInicial, fechaFinal) => {
    // crear los array iniciales
    fechaInicial = fechaInicial.split(' ');
    fechaFinal = fechaFinal.split(' ');


    // te dice cuantos años hay en medio 
    const cantidadAños = Number(fechaFinal[0]) - Number(fechaInicial[0]);
    const años = [{id: fechaInicial[0], descripcion: fechaInicial[0]}];
    for (let index = 0; index < cantidadAños; index++) {
        años.push(
            {
                id: `${Number(fechaInicial[0]) + (index + 1)}`,
                descripcion: `${Number(fechaInicial[0]) + (index + 1)}`
            }
        )
    }
    
    // te dice cuantos meses finales hay
    const mesFinal = Number(fechaFinal[1]);
    const mes = meses.filter((mes, index) => index < mesFinal ); 

    // te dice cauntos meses iniciales hay 
    const mesInicial = Number(fechaInicial[1]);
    const mesInicialReturn = meses.filter((mes, index) => index >= mesInicial - 1 );


    // creo el medium 
     const mesMedium = meses.filter((mes, index) => (index >= mesInicial - 1) && (index < mesFinal));

    return {mesFinal: mes, años, diaFinal: fechaFinal[2], mesInicial: mesInicialReturn, mesMedium}
}


export const formatDate = (str, parse) => {
    if(parse){
        str = str.replace(' ', '/').replace(' ', '/') + ' 00:00:00';
    }else str = str.replace('/', ' ').replace('/', '').replace(' 00:00:00', '');

    return str
} 