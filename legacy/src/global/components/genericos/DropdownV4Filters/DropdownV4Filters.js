import { useState, useEffect, useRef } from "react";
import {
  DropdownV2Body,
  DropdownV2Container,
  DropdownV2Footer,
  DropdownV2Header,
  DropdownV2Icon,
  DropdownV2Input,
  MenuDesplegableDropdownV2Container,
  MenuDesplegableDropdownV2Item,
  MenuDesplegableDropdownV2SinCoincidencia,
} from "./localStyle";
import FlechaDropdownV2 from "./assets/FlechaDropdownV2";
import TooltipDropdownV2 from "./component/TooltipDropdownV2/TooltipDropdownV2";
import { orderLista } from "global/utils/orderData";
import { FaStar } from "react-icons/fa";

const DropdownV4Filters = ({ config, onClick }) => {
  //#region  ----------- constants ---------------
  const [showAbove, setShowAbove] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState(config?.error);
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [favData, setFavData] = useState(null);
  const [otrosData, setOtrosData] = useState(null);
  const [filteredData, setFilteredData] = useState(
    config?.data &&
      !config?.ordenPersonalizado &&
      config?.data.sort((x, y) =>
        x[config?.descripcion].localeCompare(y[config?.descripcion])
      )
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState(
    config?.defaultValue ? "" : !config?.search ? "Sin Asignar" : ""
  );

  const inputRef = useRef(null);
  const isFirstRender = useRef(true);
  const selectedRef = useRef(null);
  //#endregion --------- constants ---------------
  //#region  ----------- funciones ---------------
  const handleKeyDown = (event) => {
    if (config?.masBuscados) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex < filteredData.length - 1
            ? prevIndex + 1
            : favData.length - favData.length
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filteredData.length - 1
        );
      }
    } else {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex < filteredData.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : filteredData.length - 1
        );
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (selectedIndex !== -1 && selectedIndex < filteredData.length) {
        handleItemClick(filteredData[selectedIndex]);
      }
    }
  };

  const resetBuscador = () => {
    if (!searchValue) {
      setError(true);
    }
    setFocus(false);
    setTimeout(() => {
      setFilteredData([]);
      setShowSuggestions(false);
      if (!config.search && searchValue) {
        setSearchValue("");
      }
    }, 200);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    // calcularDespliegueBody(event);
    if (value === "") {
      setSearchValue(value);
      setSelectedValue("");
      setShowSuggestions(true);
    } else if (value.length <= config?.maxlength || !config?.maxlength) {
      if (config?.regex) {
        if (config?.regex.test(value)) {
          setSearchValue(value);
          setError(false);
          let filtered = null;
          if (!config?.buscarPorDefault) {
            filtered = config?.data.filter((item) => {
              const searchWords = value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .split(" ");
              return searchWords.every((word) =>
                item[config?.descripcion]
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .includes(word)
              );
            });
          } else {
            filtered = orderLista(config?.data, value, "");
          }
          setFilteredData(filtered);
          if (config?.masBuscados) {
            let favs = filtered.filter((item) => item.cantBusquedas > 0);
            let otros = filtered.filter((item) => item.cantBusquedas <= 0);
            setFavData(favs.slice(0, 5));
            let ultimosFavs = favs.slice(5);
            if (ultimosFavs.length > 0) {
              const turnosCompletos = ultimosFavs.concat(otros);
              setOtrosData(turnosCompletos);
            } else {
              setOtrosData(otros);
            }
          }
        }
      } else {
        setSearchValue(value);
        setError(false);
        setShowSuggestions(true);
        const filtered = config?.data.filter((item) => {
          const searchWords = value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .split(" ");
          return searchWords.every((word) =>
            item[config?.descripcion]
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(word)
          );
        });
        setFilteredData(filtered);
        if (config?.masBuscados) {
          let favs = filtered.filter((item) => item.cantBusquedas > 0);
          let otros = filtered.filter((item) => item.cantBusquedas <= 0);
          setFavData(favs.slice(0, 5));
          let ultimosFavs = favs.slice(5);
          if (ultimosFavs.length > 0) {
            const turnosCompletos = ultimosFavs.concat(otros);
            setOtrosData(turnosCompletos);
          } else {
            setOtrosData(otros);
          }
        }
      }
    }
  };

  const onClickInput = () => {
    if (config.search && searchValue) {
      setSearchValue("");
    }
    if (selectedValue) {
      setSelectedValue("");
    }
  };

  const handleItemClick = (item) => {
    setSearchValue(item[config?.descripcion]);
    setSelectedValue(item[config?.descripcion]);
    onClick(item);
    setShowSuggestions(false);
    setShowAll(false);
    setError(false);
    setFilteredData([]);
    setSelectedIndex(0);
  };

  const handleClickInputSimulado = (event) => {
    if (!config?.disabled && !config?.search) {
      if (showSuggestions) {
        setShowSuggestions(false);
        setShowAll(false);
      } else {
        if (searchValue !== "") {
          setSearchValue("");
        }
        setFilteredData(config?.data);
        setShowAll(true);
        setShowSuggestions(true);
      }
    }
    calcularDespliegueBody(event);
  };

  const calcularDespliegueBody = (event) => {
    // Calcular si el menú debe mostrarse hacia arriba
    if (config?.showUp) {
      const componentRect = event.currentTarget.getBoundingClientRect();
      const componentPositionY = componentRect.bottom;
      const heightElement = 26;
      const heightBody = config?.cantidadItems * heightElement;
      setShowAbove(componentPositionY + heightBody - window.innerHeight < 0);
    }
  };

  const handleDocumentClick = (event) => {
    if (!inputRef.current.contains(event.target)) {
      setSelectedIndex(0);
      setShowSuggestions(false);
      setShowAll(false);
    }
  };

  const buscarDefaultValue = (config) => {
    if (Array.isArray(config?.data)) {
      const defaultValue = config?.data.filter(
        (item) => item[config?.defaultValueParametro] === config?.defaultValue
      );
      return defaultValue.length > 0 ? defaultValue[0] : null;
    }
  };
  //#endregion --------- funciones ---------------
  //#region  ----------- useEffect ---------------
  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (!isFirstRender.current) {
      inputRef.current.focus();
    }
    document.addEventListener("mousedown", handleDocumentClick);
    // Función de limpieza
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      if (config?.search) {
        setShowSuggestions(false);
        setShowAll(false);
        setFilteredData([]);
        setSelectedIndex(0);
      }
    };
  }, []);

  useEffect(() => {
    if (config?.data) {
      if (config?.defaultValueParametro) {
        const result = buscarDefaultValue(config);
        if (result) {
          setSelectedValue(result.descripcion);
        }
      } else {
        setSelectedValue(config?.defaultValue);
      }
    }
  }, [config?.data]);

  useEffect(() => {
    if (config?.data && config?.itemBusqueda) {
      if (config?.defaultValueParametro) {
        const result = buscarDefaultValue(config);
        if (result) {
          setSelectedValue(result.descripcion);
        }
      } else {
        setSelectedValue(config?.defaultValue);
      }
    }
  }, [config?.itemBusqueda]);

  useEffect(() => {
    if (config?.masBuscados && config?.data) {
      setFavData(config?.data.slice(0, 5));
      setOtrosData(config?.data.slice(5));
    }
  }, [config?.masBuscados, config?.data]);
  //#endregion  -------- useEffect ---------------

  return (
    <DropdownV2Container className="rspWidth" width={config?.width}>
      {config?.header && (
        <DropdownV2Header>
          <span className={config?.headerColor && config?.headerColor}>
            {config?.header}
          </span>
        </DropdownV2Header>
      )}
      <DropdownV2Body
        showSuggestions={showSuggestions}
        height={config?.height}
        tabIndex={0}
        ref={inputRef}
        error={error}
        focus={focus}
      >
        {/* <DropdownV2Input
          onClick={config?.search ? onClickInput : handleClickInputSimulado}
          type="text"
          placeholder={config?.placeholder}
          value={searchValue ? searchValue : selectedValue}
          onChange={handleInputChange}
          onFocus={() => {
            setFocus(true);
            if (!isFirstRender.current) {
              setShowSuggestions(true);
            }
          }}
          onBlur={resetBuscador}
          autoFocus={
            config?.autoFocus ? config?.autoFocus : !isFirstRender.current
          }
          // onKeyDown={handleKeyDown}
          onKeyDown={(e) => handleKeyDown(e)}
          onKeyPress={handleKeyPress}
          disabled={config?.disabled}
          fontSize={config?.placeHolderFontSize}
        /> */}
        {config?.search ? (
          <DropdownV2Input
            onClick={config?.search ? onClickInput : handleClickInputSimulado}
            type="text"
            placeholder={config?.placeholder}
            value={searchValue ? searchValue : selectedValue}
            onChange={handleInputChange}
            onFocus={() => {
              setFocus(true);
              if (!isFirstRender.current) {
                setShowSuggestions(true);
              }
            }}
            onBlur={resetBuscador}
            autoFocus={
              config?.autoFocus ? config?.autoFocus : !isFirstRender.current
            }
            // onKeyDown={handleKeyDown}
            onKeyDown={(e) => handleKeyDown(e)}
            onKeyPress={handleKeyPress}
            disabled={config?.disabled}
            fontSize={config?.placeHolderFontSize}
          />
        ) : (
          <div
            className="DropdownV2InputSimulado"
            onClick={handleClickInputSimulado}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onKeyPress={handleKeyPress}
          >
            <span
              className={`rb${config?.placeHolderFontSize}l ${
                config?.disabled && "c-grey45"
              }`}
            >
              {searchValue ? searchValue : selectedValue}
            </span>
          </div>
        )}

        {config?.arrow && (
          <DropdownV2Icon
            onClick={handleClickInputSimulado}
            rotate={showSuggestions ? 1 : 0}
          >
            <FlechaDropdownV2
              color={
                config?.disabled
                  ? "var(--color-grey45)"
                  : error
                  ? "var(--color-danger)"
                  : "var(--color-latex30)"
              }
            />
          </DropdownV2Icon>
        )}
        {(searchValue !== "" && filteredData.length > 0) || showAll ? (
          <MenuDesplegableDropdownV2Container
            cantidadItems={config?.cantidadItems}
            showAbove={!showAbove}
          >
            {config?.masBuscados ? (
              <>
                {favData.length > 0 || otrosData.length > 0 ? (
                  <>
                    <div className="masBuscados">
                      <FaStar size={12} />
                      <p className="rb14m">Prestaciones más buscadas</p>
                    </div>
                    {favData.length > 0 ? (
                      favData.map((item, index) => {
                        return (
                          <MenuDesplegableDropdownV2Item
                            key={index}
                            onClick={() => handleItemClick(item)}
                            selected={selectedIndex === index}
                            ref={selectedIndex === index ? selectedRef : null}
                          >
                            {config?.tooltip ? (
                              <TooltipDropdownV2
                                children={
                                  <div className="dropdown-item-tooltip">
                                    {item[config?.descripcion]}
                                  </div>
                                }
                                detalle={item[config?.descripcion]}
                              />
                            ) : (
                              item[config?.descripcion]
                            )}
                          </MenuDesplegableDropdownV2Item>
                        );
                      })
                    ) : (
                      <MenuDesplegableDropdownV2SinCoincidencia>
                        No hay coincidencias
                      </MenuDesplegableDropdownV2SinCoincidencia>
                    )}
                    <div className="otrosResulados">
                      <p className="rb14m">Otros resultados</p>
                    </div>
                    {otrosData.length > 0 ? (
                      otrosData.map((item, index) => {
                        return (
                          <MenuDesplegableDropdownV2Item
                            key={index}
                            onClick={() => handleItemClick(item)}
                            selected={selectedIndex === index + favData.length}
                            ref={
                              selectedIndex === index + favData.length
                                ? selectedRef
                                : null
                            }
                          >
                            {config?.tooltip ? (
                              <TooltipDropdownV2
                                children={
                                  <div className="dropdown-item-tooltip">
                                    {item[config?.descripcion]}
                                  </div>
                                }
                                detalle={item[config?.descripcion]}
                              />
                            ) : (
                              item[config?.descripcion]
                            )}
                          </MenuDesplegableDropdownV2Item>
                        );
                      })
                    ) : (
                      <MenuDesplegableDropdownV2SinCoincidencia>
                        No hay coincidencias
                      </MenuDesplegableDropdownV2SinCoincidencia>
                    )}
                  </>
                ) : (
                  <MenuDesplegableDropdownV2SinCoincidencia>
                    No hay coincidencias
                  </MenuDesplegableDropdownV2SinCoincidencia>
                )}
              </>
            ) : (
              <>
                {filteredData.reverse().map((item, index) => (
                  <MenuDesplegableDropdownV2Item
                    key={index}
                    onClick={() => handleItemClick(item)}
                    selected={selectedIndex === index}
                    ref={selectedIndex === index ? selectedRef : null}
                  >
                    {config?.tooltip ? (
                      <TooltipDropdownV2
                        children={
                          <div className="dropdown-item-tooltip">
                            {item[config?.descripcion]}
                          </div>
                        }
                        detalle={item[config?.descripcion]}
                      />
                    ) : (
                      item[config?.descripcion]
                    )}
                  </MenuDesplegableDropdownV2Item>
                ))}
              </>
            )}
          </MenuDesplegableDropdownV2Container>
        ) : (
          showSuggestions && (
            <MenuDesplegableDropdownV2Container showAbove={!showAbove}>
              <MenuDesplegableDropdownV2SinCoincidencia>
                No hay coincidencias
              </MenuDesplegableDropdownV2SinCoincidencia>
            </MenuDesplegableDropdownV2Container>
          )
        )}
      </DropdownV2Body>
      {config?.footer && error && (
        <DropdownV2Footer>
          <span>{config?.footer}</span>
        </DropdownV2Footer>
      )}
    </DropdownV2Container>
  );
};

export default DropdownV4Filters;
