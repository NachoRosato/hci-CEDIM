import Tooltip from "../components/genericos/Tooltip/Tooltip"; 

export const sizeText = (str, size) => {
    if(str.length > size){
        return <Tooltip data={str.slice(0, size)  + " ..."} descripcion={str} customCss={"ptur-custom-abm-08-06"}>{str.slice(0, size)}</Tooltip> 
    }else {
        return str
    }
}
