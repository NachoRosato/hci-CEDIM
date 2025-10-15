export const createStructureData = (data, col, backup, ) => {
  // if (col.length === 0) {
  //   return backup;
  // }

  // if (!backup) {
  //   let str = col[0];
  //   str = str.toLowerCase();
  //   backup = orderForColumn(data, str);
  //   col.shift();
  //   if(col.length === 0) return backup; 
  //   return createStructureData(data, col, backup);
  // } else {
  //   backup = backup.map((e, index) => {
  //     let str = col[0];
  //     str = str.toLowerCase();
  //     // if(Array.isArray(e[1][0])){
  //     //   return [e[1][0][0], orderForColumn(e[1][0][1], str)]; 
  //     // }
  //     return [e[0], orderForColumn(e[1], str)];
  //   });
  //   col.shift();
  //   return createStructureData(data, col, backup);
  // }
  
};

export const orderForColumn = (items, column) => {
  const resultado = {};
  const resultadoRetornable = [];

  items.map((centro) => {
    let content = centro[column];
    if (Array.isArray(resultado[content])) resultado[content].push(centro);
    else {
      resultado[content] = [centro];
    }
  });

  for (const key in resultado) {
    if (Object.hasOwnProperty.call(resultado, key)) {
      const element = resultado[key];
      resultadoRetornable.push([key, element]);
    }
  }

  return resultadoRetornable;
};

const column = ["descripcion", "domicilio"];
const items = [
  {
    id: 1,
    descripcion: "Dim Belgrano",
    domicilio: "Belgrano 136, Ramos Mejía",
    telefono: "5554-8888",
    other: "Este campo es extra",
    fecha: "2022-01-01TT000",
  },
  {
    id: 2,
    descripcion: "Dim Espora",
    domicilio: "Espora 18, Ramos Mejía",
    telefono: "5554-8888",
    other: "Este campo es extra espora",
    fecha: "2021-01-01TT000",
  },
  {
    id: 3,
    descripcion: "Dim Moron",
    domicilio: "Av. Rivadavia 17620, Morón",
    telefono: "4656-2828",
    other: "Este campo es extra",
    fecha: "2015-01-01TT000",
  },
  {
    id: 4,
    descripcion: "Dim Ciudadela",
    domicilio: "Palacios 141, Ciudadela",
    telefono: "5234-8888",
    other: "Este campo es extra",
  },
  {
    id: 5,
    descripcion: "Dim Monteagudo",
    domicilio: "Belgrano 136, Monteagudo",
    telefono: "1233-1331",
    other: "Este campo es extra",
    fecha: "2022-01-01TT000",
  },
  {
    id: 6,
    descripcion: "Dim Pepe",
    domicilio: "Pepa 123, Ciudad Pepe",
    telefono: "5554-8888",
    other: "Este campo es extra",
    fecha: "2022-01-01TT000",
  },
  {
    id: 7,
    descripcion: "Dim Chiripi",
    domicilio: "Chiripi 136, Chiripi",
    telefono: "5554-8888",
    other: "Este campo es extra",
    fecha: "2022-01-01TT000",
  },
  {
    id: 8,
    descripcion: "Dim Nueva Luna",
    domicilio: "Nueva Luna 123 ,Nueva Luna",
    telefono: "5554-8888",
    other: "Este campo es extra",
    fecha: "2022-02-01TT000",
  },
  {
    id: 9,
    descripcion: "Dim Belgrano",
    domicilio: "DIM 177,Belgrano",
    telefono: "5554-8888",
    other: "Este campo es extra",
    fecha: "2022-01-01TT000",
  },
  {
    id: 10,
    descripcion: "Dim OTRA",
    domicilio: "Belgranos 12345, Otra",
    telefono: "5554-8888",
    other: "Este campo es extra",
    fecha: "2022-01-01TT000",
  },
  {
    id: 11,
    descripcion: "Dim Nano",
    domicilio: "Renatia 099, Palermo Mejía",
    telefono: "5554-8888",
    other: "Este campo es extra",
  },
  {
    id: 12,
    descripcion: "Dim Belgrano",
    domicilio: "Belgranos 1233, Ramos Mejíos",
    telefono: "5554-1233",
    other: "Este campo es extra",
    pepe: "sdasdas",
    fecha: "2022-01-01TT000",
  },
  {
    id: 13,
    descripcion: "Dim Belgrano",
    domicilio: "Belgranos 1233, Ramos Mejíos",
    telefono: "5554-1233",
    other: "Este campo es extra",
    pepe: "sdasdas",
    fecha: "2022-01-01TT000",
  },
  {
    id: 13,
    descripcion: "Dim Belgrano",
    domicilio: "Belgranos 1233, Ramos Mejíos",
    telefono: "5554-1233",
    other: "Este campo es extra",
    pepe: "sdasdas",
    fecha: "2022-01-01TT000",
  },
];
