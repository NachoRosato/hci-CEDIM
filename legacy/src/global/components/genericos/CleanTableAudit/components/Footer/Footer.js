import Back from "../../assets/back";
import BackSimple from "../../assets/backSimple";
import Next from "../../assets/next";
import NextSimple from "../../assets/nextSimple";
import { ContainerFooterTable } from "./localStyle";

const Footer = ({setGlobal, global}) => {


     //#region ------- funciones --------
  const back = (type) => {
    if (type === "first") {
      setGlobal({...global, indexPagination: 0});
  } else if (global.indexPagination - 1 >= 0) {
      setGlobal({...global, indexPagination: global.indexPagination - 1});
  } else setGlobal({...global, indexPagination: global.pagination.length - 1});
  };
  const next = (type) => {
    if (type === "first") {
        setGlobal({...global, indexPagination: global.pagination.length[0]});
    } 
    else if (type === "end") {
      setGlobal({...global, indexPagination: global.pagination.length - 1});
    } 
    else if (global.indexPagination + 1 <  global.pagination.length) {
    //   setIndexPaginacion(indexPagination + 1);
      setGlobal({...global, indexPagination: global.indexPagination + 1 });
    } 
    else  setGlobal({...global, indexPagination: 0 });
  };
  //#endregion ---- funciones --------
  
    return (
        <ContainerFooterTable>
        <div className="pointer" onClick={() => back("first")}>
          <Back color={"var(--color-latexAbmRgb)"}/>{" "}
        </div>
        <div className="pointer" onClick={back}>
          <BackSimple color={"var(--color-latexAbmRgb)"}/>
        </div>{" "}
        <div className="rb16m pointer">
           Página {global.pagination.length === 0 ? 0 : global.indexPagination + 1} de {global.pagination.length}{" "}
        </div>{" "}
        <div onClick={next} className="pointer">
          {" "}
          <NextSimple color={"var(--color-latexAbmRgb)"}/>{" "}
        </div>
        <div onClick={() => next("end")} className="pointer">
          <Next color={"var(--color-latexAbmRgb)"}/>
        </div>
        </ContainerFooterTable>
    )
}; 

export default Footer; 