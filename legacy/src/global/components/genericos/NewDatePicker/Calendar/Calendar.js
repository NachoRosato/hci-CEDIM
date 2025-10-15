import { useContext, useEffect, useState } from "react";
import { hideSegundoModal } from "../../../../context/action/segundoModal/segundoModal";
import { GlobalContext } from "../../../../context/Provider";
import Dropdown from "../../Dropdown/Dropdown";
import { diasNewDatePicker, isFinished, isIncludeFranja, isSeleted, Mes, obtenerMesYaño } from "./CalendarFun";
import { ColumnDia, ContainerBtn, ContainerCalendar, DiasContainer, DropDownContainer, ItemDia } from "./localStyle";


const Calendar = ({
    dateInitial, 
    dateSelected, 
    setDateSelected, 
    dateFinish,
    setDate, 
    franja, 
    setActive, 
    onchange, 
    buttonHidden, 
    itemOrange
}) => {
    const diaEJ = new Array(null,null,null,null,null,null,null);
    const [dateNow, setDateNow] = useState(dateInitial);
    const [dateLocalSelected, setDateLocalSelected] = useState(dateSelected);
    const { modalDispatch, segundoModalDispatch } =
    useContext(GlobalContext);
    // const {agendaDispatch} = 
    // useContext(GlobalContextMain); 

    const compareDateNow = () => {
        let initial = new Date(dateInitial); 
        let now = new Date(dateNow); 

        if(initial.getFullYear() === now.getFullYear() && initial.getMonth() === now.getMonth() ){
            return true
        }else return false
    }
    const newDateNow = new Date(dateNow);

    const mesActual = !compareDateNow() ? Mes(`${newDateNow.getMonth() + 1} 01 ${newDateNow.getFullYear()}`):Mes(dateInitial); 


    const handleClick = (dia) => {
        let newDate = dateNow.split(" "); 
        newDate = new Date(`${newDate[0]} ${dia} ${newDate[2]}`);
        setDateLocalSelected(newDate);
        
        // codigo extra para funcionalidad especial 
        if(buttonHidden){
            const item = isIncludeFranja(dateNow, franja, newDate.getDate()); 
            if(item) onchange(newDate, item); 
            else onchange(false); 
        }
    }
    const {años, meses} = obtenerMesYaño(dateInitial, dateFinish, dateNow);

    const handleClickMeses = (mes) => {
        if(mes !== ""){
            setDateNow(`${mes.id} ${dateNow.split(' ')[1]} ${dateNow.split(' ')[2]}`)
        }
    }; 
    const handleClickAnio = (anio) => {
        const obj = obtenerMesYaño(dateInitial, dateFinish, `${meses[0].id} ${dateNow.split(' ')[1]} ${anio.id}`);
        if(anio  !== ""){
            setDateNow(`${obj.meses[0].id} ${dateNow.split(' ')[1]} ${anio.id}`)
        }
    };

    // ---------------- SETEAR EL SELECCIONADO -----------------------------
    useEffect(() => {
        const mes = dateSelected.getMonth() + 1; 
        setDateNow(`${mes <= 9? "0":""}${dateSelected.getMonth() + 1} ${dateSelected.getDate()} ${dateSelected.getFullYear()}`)
    }, [dateSelected])
    // ---------------- SETEAR EL SELECCIONADO -----------------------------


    // --------------- ONCLICK DE LOS BUTTON --------------------------
    const confirmar = () => {
       if(franja?.length > 0){
            const item = isIncludeFranja(dateNow, franja, dateLocalSelected.getDate()); 
            if(item){
                setDateSelected(dateLocalSelected);
                setActive(true);
                onchange(dateLocalSelected, item); 
                hideSegundoModal()(segundoModalDispatch)
            }
       }else {
            setDateSelected(dateLocalSelected);
            setActive(true);
            onchange(dateLocalSelected); 
            hideSegundoModal()(segundoModalDispatch)   
       }
    }
    
    const cancelar = () => {
        setActive(false); 
        hideSegundoModal()(segundoModalDispatch)  ;
    }
    // --------------- ONCLICK DE LOS BUTTON --------------------------

    
    return (
        <ContainerCalendar className="date-picker-container calendar-custom-css">
            <DropDownContainer>
                <Dropdown
                    placeholder={"Mes"}
                    datos={meses}
                    campoCodigo="id"
                    descripcion="descripcion"
                    valor={dateNow.split(' ')[0]}
                    customCss={"dropdown"}
                    onChange={handleClickMeses}
                    />
                <Dropdown 
                    placeholder={"Anio"}
                    datos={años}
                    campoCodigo="id"
                    descripcion="descripcion"
                    valor={dateNow.split(' ')[2]}
                    customCss={"dropdown"}
                    onChange={handleClickAnio}
                    />
            </DropDownContainer>
            <DiasContainer>
                {
                    diaEJ.map((e, dia) => {
                        dia = dia === 6 ? -1: dia;

                        return (
                            <ColumnDia>
                                <span className="bold dayTitle">{diasNewDatePicker[dia + 1]}</span>
                                {
                                    mesActual[dia + 1].map((numDia, index) => {
                                        const select = isSeleted(dateNow, dateLocalSelected, numDia);
                                        const finished = isFinished(dateNow, dateFinish, numDia);
                                        const isFranja = franja?.length > 0 ? isIncludeFranja(dateNow, franja, numDia ): false;
                                        return <ItemDia 
                                                    className="custom-item-dia" 
                                                    onClick={!finished ? ()=>{handleClick(numDia)}: ()=>{}} 
                                                    finished={finished} 
                                                    select={select}
                                                    franja={isFranja}
                                                    buttonHidden={buttonHidden || itemOrange}
                                                    > {numDia} </ItemDia>
                                    })
                                }
                            </ColumnDia>
                        )
                    })
                }
            </DiasContainer>
            {
                buttonHidden ? "":     
                <ContainerBtn>
                    <button onClick={cancelar}  className="cancel">Cancelar</button>
                    <button onClick={confirmar} className="confirm">Confirmar</button>
                </ContainerBtn>
            }
        </ContainerCalendar>
    )
}

export default Calendar; 
