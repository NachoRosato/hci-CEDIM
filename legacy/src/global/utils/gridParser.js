export const gridParser = (arr, columnConfig) => {
    // transforma un array de objetos
    // Si no hay una column config 
    if(!columnConfig){
        const column = Object.keys(arr[0]); // 3
        const filas = arr.map(fila => Object.values(fila));
        filas.unshift(column)
        return {column: column.length, row: arr.length, grid: filas }
    }else {
        const column = columnConfig; // 3
        const filas = arr.map(fila => {
            fila["acciones"] = "parserbuttonDeleteUpdate";
            return objParser(fila, columnConfig)
        });
        filas.unshift(column)
        return {column: column.length, row: arr.length, grid: filas }
    }
}


const objParser = (obj, arr) => { // Objeto y un Array de párametros
    let resultado = [];
    for (const key in obj) {
        if(arr.indexOf(key) !== -1){
            resultado[arr.indexOf(key)] = obj[key]
        }
    }
    return resultado
}

export const pagination = (arr, pag, cantPage) => {
    let resultado = [];
    let totalPage = Math.ceil(arr.length / cantPage);
    pag = pag > 0 && pag <= totalPage ? pag : false;

    if(!pag){
        for (let index = 0; index < cantPage; index++) {
            const element = arr[index];
            if(element) resultado.push(element)
        }
    }else if (typeof pag === "number"){
        let next = pag * cantPage; 
        let index = next - cantPage;

        for (index; index < next; index++) {
            const element = arr[index];
            if(element) resultado.push(element)
        }
    }

    return {
        totalPage,
        pagActual: pag ? pag: 1,
        listRows: resultado
    }
}

