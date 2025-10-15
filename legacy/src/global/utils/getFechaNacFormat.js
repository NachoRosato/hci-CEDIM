
export function getFechaNacFormat( fecha,separador=":") { 

    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    let año = fecha.getFullYear();
  
    return `${fecha.getDate() + " de " + meses[fecha.getMonth()].slice(0,3)+ ". de " + año}`;
  }
  