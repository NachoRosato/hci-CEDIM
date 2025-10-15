import {  useEffect, useState } from "react";
import FlechaDropdown from "../../../assets/generico/FlechaDropdown";
import { Container, Item, MsjError, Placeholder, SelectDropdown, Title, ViewValue } from "./localStyle";

const DropdownAdm = (
    {
        extraProperty, 
        headerStr, 
        placeholder, 
        isRequired,
        setState,
        state, 
        property,
        value,
    }) => {
    
    const targetContainer =  document.getElementById(extraProperty.idUnique); 

    // abre el dropDown
    const [active, setActive] = useState(false);
    const handleClick = () => {
        setActive(!active)
    }

    // selecciona un elemento
    const [selected, setSelected] = useState({code: false, value: false});

    const handleClickItem = (e) => {
        const value = e[extraProperty.value];

        setState(
            {
                ...state, [property]: value
            }
        )
        extraProperty.setErrorForced({
            ...extraProperty.stateRequired, [property]: false
        })
        setSelected({code:Number(e[extraProperty.code]), value});
        setActive(false)
        
        targetContainer.style.overflow = "scroll";
        
    }


    // Mover con las flechas el dropdown
    const [select, setSelect] = useState(0);
    window.onkeydown = (e) => {
        const target = document.getElementById(`ptur-selectDropDown-abm0306${property}`);        
        if(active){
            targetContainer.style.overflow = "hidden";
            switch (e.key.toLowerCase()) {
                case "arrowdown":
                    if(select + 1 < extraProperty.data.length){
                        setSelect(select+ 1)
                        target.scroll(0,target.scrollTop + 10)
                    }else {
                        setSelect(0);
                        target.scroll(0,0)
                    }
                    break
                case "arrowup":
                    if(select - 1 >= 0){
                        setSelect(select - 1)
                        target.scroll(0,target.scrollTop - 10)
                    }else {
                        setSelect(extraProperty.data.length - 1);
                        target.scroll(0, target.scrollHeight)
                    }
                    break
                case "enter":
                    const value = extraProperty.data[select][extraProperty.value];
                    setSelect(0);
                    setState(
                        {
                            ...state, [property]: value
                        }
                    )
                    setSelected({code:Number(e[extraProperty.code]), value});
                    setActive(false)
                    targetContainer.style.overflow = "scroll";

                default:
                    break;
            }
        }else {
            targetContainer.style.overflow = "scroll";
        }
    }

    // Verificar los values 
    useEffect(()=> {
        if(value){
            const resul = extraProperty.data.filter(e => Number(e.id) === Number(value))
            setSelected({code:Number(value), value: resul[0][extraProperty.value]});
        }
    }, [])

    return (
        <Container active={active} error={(extraProperty.errorForced && isRequired)} className="div">
            <Title>{headerStr + (isRequired ? " *": "")}</Title>
            <div className="background-click" onClick={handleClick}/>
            <ViewValue onClick={handleClick} className="viewValue">
                {
                    !selected.value ? 
                    <>
                        <Placeholder>{placeholder}</Placeholder>
                        <span className={active? "active":""}><FlechaDropdown color={"var(--color-latex30)"} /></span>
                    </>:
                    <>
                        <span>{selected.value}</span>  <span className={active? "active":""}><FlechaDropdown color={"var(--color-latex30)"} /></span>
                    </>
                }
            </ViewValue>
            
           {
               (extraProperty.errorForced && isRequired) ?  <MsjError>Este campo es requerido</MsjError>: ""
           }
            
            
            <SelectDropdown className={"select-dropdown"} id={`ptur-selectDropDown-abm0306${property}`}>
                {
                    extraProperty.data.map((element, index) => {
                        return <Item selected={select === index ? true: false}
                                     id={element[extraProperty.code]}
                                     onClick={()=> handleClickItem(element)}
                                     >
                                        {element[extraProperty.value]}
                                     </Item>
                    })
                }
            </SelectDropdown>
        </Container>
    )
}

export default DropdownAdm;