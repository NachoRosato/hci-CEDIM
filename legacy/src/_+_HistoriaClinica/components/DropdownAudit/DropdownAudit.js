import { useContext, useEffect, useRef, useState } from "react";
import {
  Container,
  ContainerBuscadorDropBox,
  Dropdown,
  Input,
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
import TooltipDropdownV2 from "./TooltipDropdownV2/TooltipDropdownV2";
import InputV1 from "global/components/genericos/InputV1/InputV1";

const DropdownAudit = ({
  handleSelectItem,
  posTop,
  customHeight,
  customContWidth,
  blockAgregar,
}) => {
  const { snomedState, snomedDispatch } = useContext(HistoriaClinicaContext);
  const { toasterDispatch } = useContext(GlobalContext);

  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastOptions, setLastOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [emptySnomed, setEmptySnomed] = useState(false);
  const containerRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  useEffect(() => {
    if (query.length >= 3) {
      setLoading(true);
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        wsGetFsnSnomed(query)(snomedDispatch);
      }, 1500); // 1.5 segundos de retraso
    } else {
      resetSnomed()(snomedDispatch);
      setOptions([]);
      setLastOptions([]);
      setEmptySnomed(false);
    }
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [query, snomedDispatch]);

  useEffect(() => {
    if (snomedState.snomed.fsnItems && snomedState.snomed.fsnItems !== null) {
      if (snomedState.snomed.fsnItems.items.length > 0) {
        let concatArr = snomedState.snomed.fsnItems.items;
        concatArr = concatArr.map((item) => {
          return { ...item, diagnostico: item.term };
        });
        posDropwdown();
        setOptions(concatArr);
        setLastOptions(concatArr);
        setEmptySnomed(false);
        setLoading(false);
      } else if (snomedState.snomed.fsnItems.items.length === 0) {
        showToaster(
          {
            texto: "No se encontraron registros para la busqueda",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
        setLastOptions([]);
        setOptions([]);
        setEmptySnomed(true);
        setLoading(false);
        resetSnomed()(snomedDispatch);
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
      setEmptySnomed(false);
      setLoading(false);
      resetSnomed()(snomedDispatch);
    }
  }, [snomedState.snomed]);

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

  const [posBottom, setPosBottom] = useState(false);

  const posDropwdown = () => {
    const elemento = document.getElementById("DropdownAudit");
    if (!elemento) {
      return false;
    }
    const posicion = elemento.getBoundingClientRect();
    return posicion.bottom > 490;
  };

  useEffect(() => {
    if (loading) {
      setPosBottom(posDropwdown());
    }
  }, [loading]);

  return (
    <Container customContWidth={customContWidth} ref={containerRef}>
      <ContainerBuscadorDropBox customContWidth={customContWidth}>
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
          posBottom={posBottom}
          customHeight={customHeight}
          customContWidth={customContWidth}
          id={"DropdownAudit"}
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              {emptySnomed && !blockAgregar && (
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
                ? options.reverse().map((option, index) => (
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
                : lastOptions.reverse().map((option, index) => (
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

export default DropdownAudit;
