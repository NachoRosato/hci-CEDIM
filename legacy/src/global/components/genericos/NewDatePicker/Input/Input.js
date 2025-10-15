import MiTurnoIcon from "../../../../assets/generico/MiTurnoIcon";
import { ContaienerInput } from "./localStyle"

const Input = ({dateSelected, onClick, active,error, customCss}) => {
    

    const diaCero = (dia) => {
        if(Number(dia) <= 9){
            return "0" + JSON.stringify(dia);
        }else return dia; 
    }
    return (
        <ContaienerInput error={error} active={active} onClick={onClick} className={`custom-newDatePicker ${customCss}`} >
            <MiTurnoIcon color={active ? "var(--color-latex30)": "var(--color-grey45)"}/>
            <span>{`${diaCero(dateSelected.getDate())}/${diaCero(dateSelected.getMonth() + 1)}/${dateSelected.getFullYear()}`}</span>
        </ContaienerInput>
    )
}

export default Input; 