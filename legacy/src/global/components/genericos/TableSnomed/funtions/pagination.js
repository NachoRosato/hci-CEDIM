export const pagination = (lista, count ) => {
    const resultado = []; 
    let current = []; 
    lista.map((element, index) => {
      if(current.length < count){
        current.push(element)
      }else {
        resultado.push(current); 
        current = [element];
      }
  
    })
    if(current.length > 0){
      resultado.push(current); 
    }
    return resultado; 
  }