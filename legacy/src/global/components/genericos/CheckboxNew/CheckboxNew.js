import { useState } from "react";
import CheckboxFlecha from "../../../assets/generico/CheckboxFlecha";
import CheckboxFlechaMenos from "../../../assets/generico/CheckboxFlechaMenos";
import { CheckCircle, ContainerCheckNew } from "./localStyle";

const CheckboxNew  =  ({
    headerStr, 
    property,
    setState, 
    value, 
    state
}) => {

    


    // Maneja el funcionamiento interno del check 
    const [active, setActive] = useState(value);


    const actived = () => {
        if(!active){
            setState({...state, [property]: !active})
        }else  setState({...state, [property]: !active});

        setActive(!active);
    }
    return (
        <ContainerCheckNew active={active} onClick={actived} className="div2-1">
            <CheckCircle active={active}>
            {
                active ? <CheckboxFlechaMenos color="var(--color-checkboxnew-white)" />:  <CheckboxFlecha color="var(--color-checkboxnew-white)"  />
            }
            </CheckCircle>
            
            <span onClick={actived}>{headerStr}</span>
        </ContainerCheckNew>
    )
}
export default CheckboxNew; 