export const orderItemsFun = (items, colmun, reverse) => {
    items = items.sort((a,b) => {
        if(reverse && a[colmun] < b[colmun]) return 1;
        if(reverse && a[colmun] > b[colmun]) return -1;
        if(a[colmun] > b[colmun]) return 1; 
        if(a[colmun] < b[colmun]) return -1;
        else return 0;    
    }); 
    return items; 
}; 