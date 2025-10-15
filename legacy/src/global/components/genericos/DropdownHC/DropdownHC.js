import { useContext, useEffect, useRef, useState } from "react";
import {
  Container,
  ContainerBuscadorDropBox,
  Dropdown,
  Item,
  Loader,
} from "./localStyle";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import {
  resetSnomed,
  wsGetFsnSnomed,
} from "_+_HistoriaClinica/context/action/snomed/snomed";
import { showToaster } from "global/context/action/toaster/toaster";
import { GlobalContext } from "global/context/Provider";
import InputV1 from "../InputV1/InputV1";
import TooltipDropdownV2 from "./TooltipDropdownV2/TooltipDropdownV2";
import {
  setDiagByNameCtx,
  wsGetDiagByName,
} from "_+_HistoriaClinica/context/action/diagnostico/diagnostico";

const DropdownHC = ({
  handleSelectItem,
  posTop,
  customHeight,
  customContWidth,
  customItemWidth,
  blockAgregar, // Si es false, permite agregar
}) => {
  const { snomedState, snomedDispatch, diagnosticoState, diagnosticoDispatch } =
    useContext(HistoriaClinicaContext);
  const { toasterDispatch } = useContext(GlobalContext);

  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastOptions, setLastOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    if (query.length >= 3) {
      resetSnomed()(snomedDispatch);
      setDiagByNameCtx(null)(diagnosticoDispatch);
      setLoading(true);
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        wsGetFsnSnomed(query)(snomedDispatch);
        wsGetDiagByName(query)(diagnosticoDispatch);
      }, 1500); // 1.5 segundos de retraso
    } else {
      setOptions([]);
      setLastOptions([]);
    }
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [query, snomedDispatch, diagnosticoDispatch]);

  useEffect(() => {
    if (
      (snomedState.snomed.fsnItems && snomedState.snomed.fsnItems !== null) ||
      (diagnosticoState.diagnostico.diagByName &&
        diagnosticoState.diagnostico.diagByName !== null &&
        diagnosticoState.diagnostico.diagByName.value !== null)
    ) {
      let arrFinal = [];
      //caso snomed
      if (
        snomedState.snomed.fsnItems !== null &&
        snomedState.snomed.fsnItems.items.length > 0
      ) {
        arrFinal = snomedState.snomed.fsnItems.items.map((item) => ({
          ...item,
          diagnostico: item.term,
        }));
      } else if (
        snomedState.snomed.fsnItems !== null &&
        snomedState.snomed.fsnItems.items.length === 0
      ) {
        resetSnomed()(snomedDispatch);
      }
      //caso diagnostico
      if (
        diagnosticoState.diagnostico.diagByName !== null &&
        diagnosticoState.diagnostico.diagByName.value.length > 0
      ) {
        arrFinal = [
          ...arrFinal,
          ...diagnosticoState.diagnostico.diagByName.value.map((item) => ({
            ...item,
            term: item.display, // Agregamos el campo "term"
          })),
        ];
      } else if (
        diagnosticoState.diagnostico.diagByName !== null &&
        diagnosticoState.diagnostico.diagByName.value.length === 0
      ) {
        setDiagByNameCtx(null)(diagnosticoDispatch);
      }

      //caso fill
      if (arrFinal.length > 0) {
        setOptions(arrFinal);
        setLastOptions(arrFinal);
        setLoading(false);
      } else {
        setLastOptions([]);
        setOptions([]);
        setLoading(false);
      }
    } else if (snomedState.snomed.error && snomedState.snomed.error !== null) {
      showToaster(
        {
          texto: "Error al buscar en la base de Snomed",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
      setLastOptions([]);
      setOptions([]);
      setLoading(false);
      resetSnomed()(snomedDispatch);
    }
  }, [snomedState.snomed, diagnosticoState.diagnostico]);

  // if (
  //   snomedState.snomed.fsnItems.items.length > 0 ||
  //   diagnosticoState.diagnostico.diagByName.value.length > 0
  // ) {
  //   let snomedArr = snomedState.snomed.fsnItems.items.map((item) => ({
  //     ...item,
  //     diagnostico: item.term,
  //   }));

  //   let diagnosticoArr = diagnosticoState.diagnostico.data.value.map(
  //     (item) => ({
  //       ...item,
  //       diagnostico: item.display,
  //       descripcion: item.display, // Agregamos el campo "descripcion"
  //     })
  //   );

  // }

  // if (
  //   snomedState.snomed.fsnItems.items.length === 0 &&
  //   diagnosticoState.diagnostico.diagByName.value.length === 0
  // ) {
  //   showToaster(
  //     {
  //       texto: "No se encontraron registros para la búsqueda",
  //       tipo: "danger",
  //     },
  //     "centroArriba"
  //   )(toasterDispatch);
  //   setLastOptions([]);
  //   setOptions([]);
  //   setLoading(false);
  //   resetSnomed()(snomedDispatch);
  //   setDiagByNameCtx(null)(diagnosticoDispatch);
  // }

  const handleSelect = (item) => {
    setQuery(item.term);
    handleSelectItem(item);
    setIsOpen(false);
  };

  const handleAdd = () => {
    let notInSnomed = {
      concept: { conceptId: null },
      term: query,
    };
    handleSelectItem(notInSnomed);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  return (
    <Container
      className="rspWidth"
      customContWidth={customContWidth}
      ref={containerRef}
    >
      <ContainerBuscadorDropBox
        className="rspWidth"
        customContWidth={customContWidth}
      >
        <InputV1
          inputType="text"
          name="txtBuscadorPac"
          placeholderText="Asma, cefalea..."
          errorStr="Ingrese al menos 3 caracteres."
          maxLength="50"
          className="rb16m ts_searchPax_search-input"
          isRequired={true}
          changeHeight={"changeHeight"}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
        />
      </ContainerBuscadorDropBox>

      {isOpen && query.length >= 3 && (
        <Dropdown
          className="dropdownHC-itemsBox-customHeight"
          posTop={posTop}
          customHeight={customHeight}
          customContWidth={customContWidth}
          customItemWidth={customItemWidth}
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              {!blockAgregar && (
                <TooltipDropdownV2
                  children={
                    <Item className="rb14l" onClick={handleAdd}>
                      Agregar "{query}"
                    </Item>
                  }
                  detalle={`Agregar "${query}"`}
                />
              )}
              {options.length > 0
                ? options.map((option, index) => (
                    <TooltipDropdownV2
                      children={
                        <Item
                          key={index}
                          className="rb14l"
                          onClick={() => handleSelect(option)}
                        >
                          {option.term}
                        </Item>
                      }
                      detalle={option.term}
                      key={index}
                    />
                  ))
                : lastOptions.map((option, index) => (
                    <TooltipDropdownV2
                      children={
                        <Item
                          key={index}
                          className="rb14l"
                          onClick={() => handleSelect(option)}
                        >
                          {option.term}
                        </Item>
                      }
                      detalle={option.term}
                      key={index}
                    />
                  ))}
            </>
          )}
        </Dropdown>
      )}
    </Container>
  );
};

export default DropdownHC;
