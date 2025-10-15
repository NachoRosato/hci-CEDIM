import { useEffect, useState } from "react";
import { newOrderLista } from "../../../utils/orderData";
import { Container, Input, Item, MsjError, Title, ViewSearch } from "./localStyle";
 
const Searcher = (
    {
        placeholder,
        headerStr, 
        extraProperty,
        setState,
        state,
        regex, 
        errorStr,
        property,
        isRequired, 
        value 
    }) => {
    
    const [selected, setSelected] = useState(false);

    // filtrado de datos  
    const [data, setData] = useState(false);

    // detectando error en los datos 
    const [error, setError] = useState(false);

    const onChange = (e) => {
        const value = e.target.value;

        if(value !== "" && regex.test(value)){
            setError(false)
            setSelected(0)
            const data = newOrderLista(extraProperty.data,extraProperty.searchField, value)
            setData(data);
            setState(
                {
                    ...state, [property]: e.target.value
                }
            )
            extraProperty.setErrorForced({
                ...extraProperty.stateRequired, [property]: false
            })
        }else {
            setData(false)
            setSelected(false)

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
        }
    } 


    
    // recorra con la flechita 
    const handleKeyUp = (e) => {
        const target = document.getElementById(`viewSearch-1${property}`);

        if("arrowdown" === e.key.toLowerCase()){
            target.scroll(0,target.scrollTop + 10); 

            if(selected + 1 < data.length){
                setSelected(selected + 1)
            }else {
                setSelected(0)
                target.scroll(0,0)
            }
        } else if ("arrowup" === e.key.toLowerCase()){
            target.scroll(0,target.scrollTop - 10)

            if(selected - 1 >= 0){
                setSelected(selected - 1)
            }else {
                setSelected(data.length - 1 )
                target.scroll(0, target.scrollHeight)
            }
        } else if ("enter" === e.key.toLowerCase()){
            const select = data[selected]

            e.target.value = select ?  select[extraProperty.value]: e.target.value


            setState(
                {
                    ...state, [property]:  select ?  select[extraProperty.value]: e.target.value
                }
            )
            setData(false)
        }
    }    

    const handleClick = (element) => {
        const e = document.getElementById(`input-searcher-1${property}`);
        e.value = element[extraProperty.value];

        setState(
            {
                ...state, [property]: element[extraProperty.value]
            }
        )
        setData(false)
    }
    const handleClickClose = () => {
        const e = document.getElementById(`input-searcher-1${property}`);
        e.value = "";
        setData(false)
    }

    // Colocandole un value 
    useEffect(()=> {
        if(value){
            const e = document.getElementById(`input-searcher-1${property}`); 
            e.value = value; 
        }
    }, [])

    return (
        <Container active={data.length !== 0 ? data: false} className="div" property={property}>
            <Title>{headerStr + (isRequired ? " *": "")}</Title>
            <div className="background-click" onClick={()=> handleClickClose()}/>

            <Input
               onKeyUp = {handleKeyUp}
               onChange={onChange}
               placeholder={placeholder}
               error={error || (extraProperty.errorForced && isRequired)}
               id={`input-searcher-1${property}`}
             />
             
             {
                 error || (extraProperty.errorForced && isRequired) ? 
                 <MsjError>
                     {
                            error ? errorStr : 
                            (extraProperty.errorForced && isRequired) ? "Este campo es requerido":
                            ""  
                     }
                 </MsjError>: 
                 <ViewSearch id={`viewSearch-1${property}`}>
                    {
                    data && data.length !== 0 ? 
                        data.map((element, index)=> {
                            return <Item onClick={()=> handleClick(element)} active={index === selected ? true: false}>{element[extraProperty.value]}</Item>
                        })
                    : ""
                    }
                 </ViewSearch> 
             }
        </Container> 
    )
}; 

export default Searcher;