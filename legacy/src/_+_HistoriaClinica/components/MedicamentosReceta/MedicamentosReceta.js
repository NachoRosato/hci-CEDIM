import { useContext, useEffect, useState } from "react";
import {
  BtnMasResultados,
  ContainerBox,
  MedicamentoBox,
  MedicamentoCard,
  SearchContainer,
} from "./localStyle";
import { showToaster } from "global/context/action/toaster/toaster";
import { GlobalContext } from "global/context/Provider";
import { wsGetRctaMedicamentos } from "_+_HistoriaClinica/context/action/recetaDigital/recetaDigital";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import {
  hideSegundoModal,
  showSegundoModal,
} from "global/context/action/segundoModal/segundoModal";
import PresentacionesReceta from "../PresentacionesReceta/PresentacionesReceta";
import NavSearchIcon from "global/assets/generico/NavSearchIcon";
import TurnoNoEncontrado from "global/components/genericos/TurnoNoEcontrado/TurnoNoEncontrado";

const MedicamentosReceta = ({ agregarMedicamento, setLoadingMedicamentos }) => {
  const { toasterDispatch, segundoModalDispatch } = useContext(GlobalContext);
  const { recetaDigitalDispatch } = useContext(HistoriaClinicaContext);
  const [inputText, setInputText] = useState("");
  const [medicamentos, setMedicamentos] = useState([]);
  const [masResultados, setMasResultados] = useState(false); // Si hay más resultados
  const [itemNoEncontrado, setItemNoEncontrado] = useState(false);
  const [page, setPage] = useState(1); // Página actual
  // const [flgScroll, setFlgScroll] = useState(true);
  // let scrollBody = document.documentElement.getElementsByClassName("bodyMed");

  const handleSearch = (value) => {
    setInputText(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputText.length > 2) {
        fetchMedicamentos(inputText, 1, true);
      } else {
        showToaster(
          {
            texto:
              "El nombre del medicamento debe tener al menos 3 caracteres para realizar la búsqueda",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
      }
    }
  };

  const onClickMedicamento = (presentaciones) => {
    showSegundoModal(
      <PresentacionesReceta
        presentaciones={presentaciones}
        agregarMedicamento={(e) => {
          dissmissPresentacion();
          agregarMedicamento(e);
        }}
      />,
      "Presentaciones disponibles",
      dissmissPresentacion,
      false,
      [],
      "centro",
      true
    )(segundoModalDispatch);
  };

  const dissmissPresentacion = () => {
    hideSegundoModal()(segundoModalDispatch);
  };

  // useEffect(() => {
  //   if (inputText !== "") fetchMedicamentos(inputText, page);
  // }, [page]);

  const fetchMedicamentos = (inputValue, pageNumber, reset) => {
    setLoadingMedicamentos(true);
    wsGetRctaMedicamentos(inputValue, pageNumber, (isCorrect, data) =>
      nextStep(isCorrect, data, reset)
    )(recetaDigitalDispatch);
  };

  const mostrarMasResultados = () => {
    setPage((prevPage) => prevPage + 1); // Incrementar página de forma controlada
    fetchMedicamentos(inputText, page + 1, false);
  };

  const nextStep = (isCorrect, data, reset) => {
    if (isCorrect) {
      setItemNoEncontrado(false);
      const agrupados = data?.medicamentos?.reduce((acc, item) => {
        const { nombreProducto, nombreDroga } = item;
        const clave = `${nombreProducto} - ${nombreDroga}`;

        if (!acc[clave]) {
          acc[clave] = [];
        }

        acc[clave].push(item);

        return acc;
      }, {});

      if (reset) {
        setMedicamentos(agrupados);
        setPage(1);
      } else {
        // Combinar los medicamentos existentes con los nuevos
        setMedicamentos((prev) => {
          // Crear una copia del estado actual
          const nuevosMedicamentos = { ...prev };

          // Mezclar los nuevos medicamentos con los existentes
          for (const clave in agrupados) {
            if (nuevosMedicamentos[clave]) {
              nuevosMedicamentos[clave] = [
                ...nuevosMedicamentos[clave],
                ...agrupados[clave],
              ];
            } else {
              nuevosMedicamentos[clave] = agrupados[clave];
            }
          }

          return nuevosMedicamentos; // Devolver el estado combinado
        });
      }
      setMasResultados(data.pageInfo.tieneMasResultados); // Actualizar estado de más resultados
    } else {
      if (data?.error.errorCode === "RECETA-005") {
        showToaster(
          {
            texto: "No se encontraron medicamentos con ese nombre",
            tipo: "warning",
          },
          "centroArriba"
        )(toasterDispatch);
        setMedicamentos([]); // Limpiar medicamentos si no hay resultados
        setMasResultados(false);
        setItemNoEncontrado(true);
      }
    }
    setLoadingMedicamentos(false); // Finalizar estado de carga
  };

  // const handleScroll = () => {
  //   const scrollElement = scrollBody[0];
  //   if (
  //     scrollElement.scrollTop + scrollElement.clientHeight + 1 >=
  //     scrollElement.scrollHeight
  //   ) {
  //     if (hasMore && !isLoading) {
  //       setPage((prevPage) => prevPage + 1); // Incrementar página de forma controlada
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const scrollElement = scrollBody[0];
  //   scrollElement.addEventListener("scroll", handleScroll);
  //   return () => scrollElement.removeEventListener("scroll", handleScroll); // Asegurar limpieza del listener
  // }, [hasMore, isLoading]);

  return (
    <ContainerBox>
      <p className="rb16m c-latex30">
        Escriba el nombre del medicamento y presione "Enter" para comenzar la
        búsqueda
      </p>
      <SearchContainer>
        <input
          type="text"
          placeholder="Buscar medicamento"
          autoFocus={true}
          className="rb16m inputMedicamentos"
          onChange={(e) => handleSearch(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div
          className="searchBox"
          onClick={() => fetchMedicamentos(inputText, 1, true)}
        >
          <NavSearchIcon
            className={"ptur-dropDownAvatar-icons"}
            color={"var(--color-white)"}
          />
        </div>
      </SearchContainer>
      <MedicamentoBox className={"bodyMed"}>
        {itemNoEncontrado && (
          <TurnoNoEncontrado
            sinSeleccionarMsj={"No se encontraron medicamentos"}
            texto={"Intente con otro nombre de medicamento o revise la ortografía"}
          />
        )}

        {medicamentos &&
          Object.entries(medicamentos).map(([key, items]) => {
            const [nombreProducto, nombreDroga] = key.split(" - ");
            return (
              <MedicamentoCard
                key={key}
                onClick={() => onClickMedicamento(items)}
              >
                <p className="rb16m c-latex30">{nombreProducto}</p>
                <p className="rb14l c-latex30">{nombreDroga}</p>
              </MedicamentoCard>
            );
          })}
      </MedicamentoBox>
      {masResultados && (
        <BtnMasResultados
          className={"bgc-latex30 rb18m c-white pointer"}
          onClick={() => mostrarMasResultados()}
        >
          Más Resultados
        </BtnMasResultados>
      )}
    </ContainerBox>
  );
};

export default MedicamentosReceta;
