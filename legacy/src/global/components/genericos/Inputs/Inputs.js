import { useEffect, useState } from "react";
import { ContainerInput, Input, MsjError, TitleMsj} from "./localStyle";

const Inputs = ({
    property, 
    placeholder, 
    regex,
    errorStr,
    headerStr,
    state, 
    setState,
    isRequired,
    value,
    extraProperty
}) => {
    const [error, setError] = useState(false);

    // validando los datos 
    const handleChange = (e) => {
        const value = e.target.value;
        
        if(!regex.test(value) ||  value === ""){
            // Setea el campo requerido o el error
            if(value !== "") setError(true); 
            else setError(false);


            setState(
                {
                    ...state, [property]: extraProperty.initialValue
                }
            )
            extraProperty.setErrorForced({
                ...extraProperty.stateRequired, [property]: true
            })
        }else{
            setError(false)
            setState(
                {
                    ...state, [property]: value
                }
            )
            extraProperty.setErrorForced({
                ...extraProperty.stateRequired, [property]: false
            })
        }
    }

    // Dejando el value por defecto
    useEffect(()=> {
        if(value){
            const e = document.getElementById(`ptur-input-abm-table${property}`);
            e.value = value;
        }
    }, [])
    

    return (   
        <ContainerInput error={error || (extraProperty.errorForced && isRequired)} className="div">
            <TitleMsj>{headerStr + (isRequired ? " *": "")}</TitleMsj>
            <Input  id={`ptur-input-abm-table${property}`} onChange={handleChange} placeholder={placeholder} />
            <MsjError>
                {
                    error ? errorStr : 
                    extraProperty.errorForced && isRequired ? "Este campo es requerido":
                    ""  
                }
            </MsjError>
        </ContainerInput>
    )
}

export default Inputs; 