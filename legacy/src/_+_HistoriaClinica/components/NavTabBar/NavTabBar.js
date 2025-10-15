import React, { useContext, useEffect, useState } from "react";
import {
  ContainerOpcBar,
  ContainerOpcItems,
  ContainerOpcIcon,
  ContainerOpcText,
  ContainerRefresh,
  RefreshButton,
  ExpandButton,
  ItemsContainer,
  ExpandedItemsContainer,
  ExpandedItem,
} from "./localStyle"; // Asegúrate de que estos componentes estén definidos en localStyle
import { itemsNavTabBar } from "./NavTabBarItems";
import { useHistory } from "react-router";
import FlechaRefresh from "global/assets/generico/FlechaRefresh";
import { GlobalContext } from "global/context/Provider";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import { resetHistoricas } from "_+_HistoriaClinica/context/action/evolucion/evolucion";

const NavTabBar = ({ refreshNavTab }) => {
  const { usuarioRolState } = useContext(GlobalContext);
  const { pacienteState, evolucionDispatch } = useContext(
    HistoriaClinicaContext
  );
  const history = useHistory();
  const [mapItemsNav, setMapItemsNav] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleItemsCount, setVisibleItemsCount] = useState(4); // Cantidad de items visibles por defecto
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Estado para pantalla pequeña

  let config = localStorage.getItem("config");
  let opcRecetaDigital = JSON.parse(config).opcRecetaDigital;
  let opcSeguimiento = JSON.parse(config).opcSeguimiento;
  let opcResumenIA = JSON.parse(config).opcResumenIA;
  let opcLaboratorio = JSON.parse(config).opcLaboratorio;

  // Detectar el tamaño de pantalla y ajustar la cantidad de items visibles
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1366) {
        setVisibleItemsCount(3); // En pantallas pequeñas mostrar solo 3 items
        setIsSmallScreen(true);
      } else {
        setVisibleItemsCount(mapItemsNav.length); // En pantallas grandes mostrar todos los items
        setIsSmallScreen(false);
      }
    };

    handleResize(); // Llamar inmediatamente
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [mapItemsNav.length]); // Agregar mapItemsNav.length como dependencia

  // Cerrar el menú expandido cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navBar = event.target.closest(".nav-tab-bar");
      if (!navBar && isExpanded) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isExpanded]);

  const onClickItem = (index) => {
    // Lógica adicional para manejar el clic en el elemento
    setSelectedItem(index);
    setIsExpanded(false); // Cerrar el menú expandido al hacer clic
    const selectedItem = mapItemsNav[index];
    if (selectedItem && selectedItem.id === 6) {
      resetHistoricas()(evolucionDispatch);
    }
    if (selectedItem && selectedItem.id === 7) {
      // Reset resumen IA al navegar
      // Aquí podrías agregar lógica específica si es necesario
    }
    if (selectedItem) {
      history.push(selectedItem.route); // Asumiendo que cada item tiene una propiedad 'route'
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    // Lógica adicional para inicializar el componente
    // uso el array completo como paso inicial
    let auxItems = itemsNavTabBar;
    if (!opcRecetaDigital) {
      auxItems = auxItems.filter((item) => item.id !== 5);
    }
    if (!opcSeguimiento) {
      auxItems = auxItems.filter((item) => item.id !== 3);
    }
    if (!opcResumenIA) {
      auxItems = auxItems.filter((item) => item.id !== 7);
    }
    if (!opcLaboratorio) {
      auxItems = auxItems.filter((item) => item.id !== 8);
    }
    // guardo si estoy editando una evolucion
    let auxEnEdicion = localStorage.getItem("itemInfo");
    auxEnEdicion = JSON.parse(auxEnEdicion);
    //para verificar si sumo o no linea de tiempo
    let boolTL =
      pacienteState.paciente.buscarPac !== null &&
      pacienteState.paciente.buscarPac !== null &&
      pacienteState.paciente.buscarPac.value.length > 0;
    // Primero valido los derechos actuales del usuario
    if (
      usuarioRolState.usuarioRol.data !== null &&
      usuarioRolState.usuarioRol.data.value.length > 0
    ) {
      const idsToFilter = []; // IDs de los elementos a filtrar
      if (auxEnEdicion) {
        // Si estoy editando una evolución, filtro los elementos que no necesito
        setMapItemsNav(auxItems);
      } else {
        if (!boolTL) {
          idsToFilter.push(2);
          idsToFilter.push(5);
        }
        idsToFilter.push(1); // ID de los elementos a filtrar
        auxItems = auxItems.filter((item) => !idsToFilter.includes(item.id));
        setMapItemsNav(auxItems);
      }
    } else if (
      usuarioRolState.usuarioRol.data !== null &&
      usuarioRolState.usuarioRol.data.value.length === 0
    ) {
      // uso el array sin modulos extra
      const idsToFilter = [3, 4]; // IDs de los elementos a filtrar
      if (auxEnEdicion) {
        // Si estoy editando una evolución, filtro los elementos que no necesito
        setMapItemsNav(auxItems);
      } else {
        if (!boolTL) {
          idsToFilter.push(2);
        }
        idsToFilter.push(1); // ID de los elementos a filtrar
        auxItems = auxItems.filter((item) => !idsToFilter.includes(item.id));
        setMapItemsNav(auxItems);
      }
    }
  }, [usuarioRolState]);

  useEffect(() => {
    if (mapItemsNav.length > 0) {
      let ubicación = window.location.pathname;
      let selectedItemIndex = mapItemsNav.findIndex(
        (item) => item.route === ubicación
      );
      if (selectedItemIndex !== -1) {
        setSelectedItem(selectedItemIndex);
      }
    }
  }, [mapItemsNav]);

  // Separar items visibles y ocultos
  const visibleItems = mapItemsNav.slice(0, visibleItemsCount);
  const hiddenItems = mapItemsNav.slice(visibleItemsCount);

  return (
    <>
      <ContainerOpcBar
        className="nav-tab-bar"
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{
        //   duration: 1.5,
        //   ease: "easeInOut",
        //   opacity: [0, 0.3, 0.7, 1],
        //   times: [0, 0.3, 0.7, 1],
        // }}
      >
        <ItemsContainer>
          {visibleItems.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <ContainerOpcItems
                  onClick={() => onClickItem(index)}
                  active={selectedItem === index}
                  className="pointer rb16m c-latex30"
                >
                  {item.icon && (
                    <ContainerOpcIcon>{item.icon}</ContainerOpcIcon>
                  )}
                  <ContainerOpcText>{item.descripcion}</ContainerOpcText>
                </ContainerOpcItems>
              </React.Fragment>
            );
          })}

          {/* Botón de expansión solo si hay items ocultos Y estamos en pantalla pequeña */}
          {hiddenItems.length > 0 && isSmallScreen && (
            <ExpandButton onClick={toggleExpanded} className="pointer">
              {isExpanded ? "−" : "+"}
            </ExpandButton>
          )}
        </ItemsContainer>

        {/* Menú expandido solo en pantallas pequeñas */}
        {isSmallScreen && (
          <ExpandedItemsContainer isExpanded={isExpanded}>
            {hiddenItems.map((item, index) => {
              const actualIndex = visibleItemsCount + index;
              return (
                <ExpandedItem
                  key={actualIndex}
                  onClick={() => onClickItem(actualIndex)}
                  active={selectedItem === actualIndex}
                  className="rb16m c-latex30"
                >
                  {item.icon && (
                    <ContainerOpcIcon>{item.icon}</ContainerOpcIcon>
                  )}
                  <ContainerOpcText>{item.descripcion}</ContainerOpcText>
                </ExpandedItem>
              );
            })}
          </ExpandedItemsContainer>
        )}

        <ContainerRefresh className="c-latex30">
          <span className="c-latex30 ctText" style={{ paddingRight: 5 }}>
            Actualizar datos:
          </span>
          <RefreshButton
            onClick={refreshNavTab}
            className="ts_timeLine_OpcBar_refresh-btn"
          >
            <FlechaRefresh color={"var(--color-latex30)"} />
          </RefreshButton>
        </ContainerRefresh>
      </ContainerOpcBar>
    </>
  );
};

export default NavTabBar;
