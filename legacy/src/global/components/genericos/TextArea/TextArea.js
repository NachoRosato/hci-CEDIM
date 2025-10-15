import { useEffect, useState } from "react";
import { Container, MsjError, Title, TxtArea } from "./localStyle";

const TextArea = ({
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
        
        if(!regex.test(value) || value === ""){
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
            const e = document.getElementById(`ptur-textarea-abm-table-0306${property}`);
            e.value = value;
        }
    }, [])
    



    return (
        <Container error={error  || (extraProperty.errorForced && isRequired)} className="div">
            <Title>{headerStr + (isRequired ? " *": "")}</Title>
            <TxtArea 
                autocomplete={"off"}
                placeholder={placeholder}
                maxLength={extraProperty.cantMaxText}
                onChange={handleChange}
                id={`ptur-textarea-abm-table-0306${property}`}
                height={extraProperty.heightForced ? extraProperty.heightForced : "50px"}
                />
            <MsjError>
                {
                    error ? errorStr : 
                    (extraProperty.errorForced && isRequired)? "Este campo es requerido":
                    ""  
                }
            </MsjError>
        </Container>
    )
}



export default TextArea; 