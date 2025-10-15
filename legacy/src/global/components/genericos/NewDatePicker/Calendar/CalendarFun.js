const GeneradorArray = (m, n) => { // Genera una matriz M*N 
    let array = []; 
    for (let index = 0; index < m; index++) {
        const list = []; 
        for (let index = 0; index < n; index++) {
            list.push(null); 
        }
        array.push(list);
    }

    return array; 
};
export const Mes = (fechaInicial, semana, fecha, mes) => { // La fecha inicial
    fechaInicial = new Date(fechaInicial); 
    if(!mes) mes = GeneradorArray(7,6); // Creo una matriz de 6*7
    if(!fecha) fecha = new Date(fechaInicial); 
    if(!semana) semana = 0;
    if(fechaInicial.getMonth() !== fecha.getMonth()) {return mes}

    // Mes y año 
    for (let dia = 0; dia < mes.length; dia++) {
        const listaSemanas = mes[dia];

        if(fecha.getDay() === dia){
            listaSemanas[semana] = fecha.getDate(); 
            if(fecha.getDay() === 0 && semana <= 5){
                semana = semana + 1 
            }
            fecha.setDate(fecha.getDate() + 1); 

            return Mes(fechaInicial, semana, fecha, mes)
        }
    }

    
};


export const isSeleted = (dateInitial, dateSelected, day) => {
    dateInitial = new Date(dateInitial); 
    dateSelected = new Date(dateSelected); 
    if(
        dateSelected.getDate() === Number(day) &&
        dateInitial.getMonth() === dateSelected.getMonth() && 
        dateInitial.getFullYear() === dateSelected.getFullYear()
    ){
        return true
    }else return false;
}

export const isFinished = (dateInitial, dateFinish, day) => {
    dateInitial = new Date(dateInitial); 
    dateFinish = new Date(dateFinish);
    if(
        dateInitial.getMonth() === dateFinish.getMonth() && 
        dateInitial.getFullYear() === dateFinish.getFullYear() && 
        Number(day) > dateFinish.getDate() || !day
    ){
        return true
    }else return false;
}

const orderDatePicker = (fecha) => {
    if(typeof fecha !== "object"){
        fecha = fecha.split("T"); 
        fecha = fecha[0].split("-");
        return `${fecha[1]} ${fecha[2]} ${fecha[0]}`
    }else{
        return fecha
    } 
}
export const isIncludeFranja = (dateNow, franja, day) => {
    if(day){
        dateNow = new Date(dateNow); 
        day = new Date(`${dateNow.getMonth() + 1} ${day} ${dateNow.getFullYear()}`); 
        const newFranja = franja.filter((element, index) => {
            const fechaFranja = new Date(orderDatePicker(element.fecha));
            return (
                fechaFranja.getMonth() === day.getMonth() && 
                fechaFranja.getDate() === day.getDate()  && 
                fechaFranja.getFullYear() === day.getFullYear()
                ) 
            });      
        if(newFranja.length > 0) return newFranja
        }

    return false; 
}

export const diasNewDatePicker = [
    "Dom",
    "Lun", 
    "Mar",
    "Mier", 
    "Jue", 
    "Vie", 
    "Sab", 
]

const meses = [
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
export const obtenerMesYaño = (fechaInicial, fechaFinal, fechaAhora) => {
    // crear los array iniciales
    fechaInicial = fechaInicial.split(' ');
    fechaFinal = fechaFinal.split(' ');


    // te dice cuantos años hay en medio 

    const cantidadAños = Number(fechaFinal[2]) - Number(fechaInicial[2]);
    const años = [{id: fechaInicial[2], descripcion: fechaInicial[2]}];

    for (let index = 0; index < cantidadAños; index++) {
        años.push(
            {
                id: `${Number(fechaInicial[2]) + (index + 1)}`,
                descripcion: `${Number(fechaInicial[2]) + (index + 1)}`
            }
        )
    }
    
    // nueva logica
    fechaInicial = new Date(fechaInicial);
    fechaFinal = new Date(fechaFinal);
    fechaAhora = new Date(fechaAhora); 

    let mesesElegidos = []; 
    let dosCondiciones = fechaAhora.getFullYear() === fechaInicial.getFullYear() && 
    fechaAhora.getFullYear() === fechaFinal.getFullYear();

    if(dosCondiciones){
      
        meses.map((element, index) => {
            if(
                fechaInicial.getMonth() <= index && 
                fechaFinal.getMonth() >= index
            ) mesesElegidos.push(element); 
        })
    }else if(fechaAhora.getFullYear() === fechaInicial.getFullYear() ){
        meses.map((element, index) => {
            if(fechaInicial.getMonth() <= index) mesesElegidos.push(element); 
        })
    }else if(fechaAhora.getFullYear() === fechaFinal.getFullYear() ){
        meses.map((element, index) => {
            if(fechaFinal.getMonth() >= index) mesesElegidos.push(element); 
        })
    }else {
        mesesElegidos = meses; 
    }
    return { años, meses: mesesElegidos}
}

export const initialOrEnd = (dateInitial, dateFinish,dateSelected) => {
    dateInitial = new Date(dateInitial); 
    dateFinish = new Date(dateFinish); 
    dateSelected = new Date(dateSelected);
}