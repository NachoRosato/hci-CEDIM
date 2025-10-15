export class MonandsMaybe {
    constructor(initialState, data){
        this.value = initialState; 
        this.data = data; 
        this.check = this.validation(initialState, data); 
    }

   validation (value, data){
    let check = true; 
    if(Array.isArray(data)){
        value.map((val) => {
            if(!data[0][val]){
                check = false; 
            }
        })
    }else {
        check = false; 
    }
    return check; 

   }
   
   some (cb){
    if(this.check){
        cb(this.data)
    }

    return this
   }
   none(cb){
    if(!this.check){
        cb("Error")
    }
    return this
   }
}



