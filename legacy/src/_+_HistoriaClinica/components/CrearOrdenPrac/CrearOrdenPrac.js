import CruzOrdenPrac from "global/assets/generico/CruzOrdenPrac";
import QuestionMark from "global/assets/generico/QuestionMark";
import DatePicker from "global/components/genericos/DatePicker/DatePicker";
import { GlobalContext } from "global/context/Provider";
import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import {
  ContainerBox,
  ContainerButtons,
  BtnCerrar,
  ContainerTitle,
  BtnGenerarOrden,
  BoxBuscador,
  BoxBuscadorItem,
  ContainerBody,
  ContainerMasUsados,
  ContainerRecomendados,
  ContainerResumen,
  MasUsadosTitle,
  RecomendadosTitle,
  MasUsadosItem,
  RecomendadosItem,
  RecomendadosBoxItem,
  MasUsadosBoxItem,
  ResumenCard,
  ResumenCardTitle,
  ResumenCardBody,
  ResumenCardItem,
  BoxFecha,
  BoxFechaTitle,
  BoxFechaInput,
  ContainerQst,
  ContainerBuscadorP1,
  SinMasUsadosItem,
} from "./localStyle";
import { hideModal, showModal } from "global/context/action/modal/modal";
import { showToaster } from "global/context/action/toaster/toaster";
import { CerrarCmp } from "../SolicitarEstudios/localStyle";
import FlechaIzquierdaIcon from "global/assets/generico/FlechaIzquierdaIcon";

import Mensaje from "global/components/genericos/Mensaje/Mensaje";
import DropdownV2 from "global/components/genericos/DropdownV3/DropdownV2";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import TildeOk from "global/assets/generico/TildeOk";
import { fechaDatePicker } from "global/utils/fechaTurnoFormat";

const CrearOrdenPrac = ({
  ordenDigital,
  datosBuscador,
  datosPaso2Prac,
  setDatosPaso2Prac,
  setOpenSlider,
  ordenPrac,
  setOrdenPrac,
  setOpenCirOrdenPrac,
  finalizaEdicion,
  setOpenSelectorOrden,
  editaOrdPrac, // Información de la orden que se está editando
}) => {
  const { modalDispatch, toasterDispatch } = useContext(GlobalContext);
  const { ordenPracticaState, pacienteState } = useContext(
    HistoriaClinicaContext
  );

  const [arrayAgregados, setArrayAgregados] = useState([
    ...datosPaso2Prac.agregadosConsulta,
  ]);
  const [fechaElegida, setFechaElegida] = useState("");
  const [recXEsp, setRecXEsp] = useState(null);
  const [masSolicitados, setMasSolicitados] = useState(null);
  const [flgFirstChange, setFlgFirstChange] = useState(false);
  const hoy = new Date();

  // Función para obtener la fecha inicial del datepicker
  // Si estamos editando una orden, usa la fecha de esa orden, sino usa la fecha actual
  const obtenerFechaInicial = () => {
    // Verificar si estamos editando una orden de práctica
    if (
      editaOrdPrac &&
      editaOrdPrac.item &&
      editaOrdPrac.modifica === "edita"
    ) {
      // Si la orden tiene fecha, usarla; sino usar fecha actual
      return editaOrdPrac.item.fecha
        ? fechaDatePicker(editaOrdPrac.item.fecha)
        : null;
    }
    return null; // Retornar null para usar fecha actual por defecto
  };

  // Obtener la fecha inicial para el datepicker
  const fechaInicialDatePicker = obtenerFechaInicial();

  // Inicializar la fecha cuando se está editando una orden
  useEffect(() => {
    if (fechaInicialDatePicker !== null && fechaElegida === "") {
      setFechaElegida(fechaInicialDatePicker);
    }
  }, [fechaInicialDatePicker, fechaElegida]);

  // Optimización: Usar useMemo para evitar recálculos innecesarios
  const arrayAgregadosInicial = useMemo(() => {
    if (
      !ordenDigital ||
      ordenDigital.length === 0 ||
      !datosBuscador ||
      datosBuscador.length === 0
    ) {
      return [];
    }

    // Crear un Map para búsquedas O(1) en lugar de O(n)
    const datosBuscadorMap = new Map();
    datosBuscador.forEach((item) => {
      datosBuscadorMap.set(item.id, item);
    });

    // Procesar órdenes digitales de práctica
    const arrPracSinOrdenar = [];
    ordenDigital.forEach((element) => {
      if (element.tipoOrden === "Prac") {
        if (element.idCircuito !== "" && element.items?.length > 0) {
          arrPracSinOrdenar.push(...element.items);
        } else {
          arrPracSinOrdenar.push(element);
        }
      }
    });

    // Crear array de agregados usando Map para mejor rendimiento
    const arrx = [];
    arrPracSinOrdenar.forEach((elementPrac) => {
      if (elementPrac.tipoOrden === "Prac") {
        const element = datosBuscadorMap.get(elementPrac.idgrupoestudio);
        if (element) {
          arrx.push({
            ...element,
            diagnostico: elementPrac.diagnostico || "",
            lado: elementPrac.lado || "",
            textoAdicional: elementPrac.textoAdicional || "",
            idOrdenDigGrupo_desc: elementPrac.idOrdenDigGrupo_desc || "",
          });
        }
      }
    });

    return arrx;
  }, [ordenDigital, datosBuscador]);

  // Actualizar arrayAgregados solo cuando cambie el valor calculado
  useEffect(() => {
    setArrayAgregados(arrayAgregadosInicial);
  }, [arrayAgregadosInicial]);

  // Optimización: Usar useCallback para evitar recreaciones innecesarias
  const onChangeBuscador = useCallback(
    (e) => {
      if (!e || e === "") return;

      // Optimización: Usar find en lugar de filter para mejor rendimiento
      const buscarItem = arrayAgregados.find((item) => item.id === e.id);
      if (buscarItem) {
        showToaster(
          {
            texto: "El estudio seleccionado ya fue agregado a la consulta",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
        return;
      }

      const newObj = {
        ...e,
        diagnostico: "",
        idpaciente: pacienteState.paciente.buscarPac.value[0].id,
      };

      setArrayAgregados((prev) => [...prev, newObj]);

      // Optimización: Actualizar estados de forma más eficiente
      if (recXEsp !== null) {
        setRecXEsp((prev) =>
          prev.map((item) =>
            item.idgrupoestudio === e.id ? { ...item, agregado: true } : item
          )
        );
      }

      if (masSolicitados !== null) {
        setMasSolicitados((prev) =>
          prev.map((item) =>
            item.idgrupoestudio === e.id ? { ...item, agregado: true } : item
          )
        );
      }
    },
    [
      arrayAgregados,
      recXEsp,
      masSolicitados,
      pacienteState.paciente.buscarPac.value,
      toasterDispatch,
    ]
  );

  const onClickRecomendados = (e) => {
    let auxEdited = ordenPracticaState.ordenPractica.estudioGrupo.value.filter(
      (item) => item.id === e.idgrupoestudio
    );
    onChangeBuscador(auxEdited[0]);
  };

  // Si ya elegi la fecha la vuelvo a setear
  useEffect(() => {
    if (datosPaso2Prac && datosPaso2Prac.fechaElegida) {
      setFechaElegida(datosPaso2Prac.fechaElegida);
    } else {
      // Si estamos editando una orden, usar la fecha de esa orden
      if (fechaInicialDatePicker !== null) {
        setFechaElegida(fechaInicialDatePicker);
      } else {
        // Solo usar fecha actual si no estamos editando
        setFechaElegida(
          `${hoy.getFullYear()}-${
            hoy.getMonth() + 1 >= 10
              ? hoy.getMonth() + 1
              : `0${hoy.getMonth() + 1}`
          }-${hoy.getDate() >= 10 ? hoy.getDate() : `0${hoy.getDate()}`}`
        );
      }
    }
  }, [datosPaso2Prac, fechaInicialDatePicker]);

  const onChangeFecha = (e) => {
    setFechaElegida(e);
  };

  const eliminaDeter = (e) => {
    let listaAux = arrayAgregados.filter((item) => item.id !== e.id);
    setArrayAgregados(listaAux);
    if (recXEsp !== null) {
      let auxEsp = recXEsp.map((item) => {
        if (item.idgrupoestudio === e.id) {
          return { ...item, agregado: false };
        } else {
          return item;
        }
      });
      setRecXEsp(auxEsp);
    }
    if (masSolicitados !== null) {
      let auxSolictados = masSolicitados.map((item) => {
        if (item.idgrupoestudio === e.id) {
          return { ...item, agregado: false };
        } else {
          return item;
        }
      });
      setMasSolicitados(auxSolictados);
    }
  };

  const irAlPaso2 = () => {
    setOrdenPrac({ ...ordenPrac, ordenPracP1: false, ordenPracP2: true });
    setDatosPaso2Prac({
      agregadosConsulta: arrayAgregados,
      fechaElegida: fechaElegida,
    });
  };

  const volverSelector = () => {
    setOpenCirOrdenPrac(false);
    setOpenSelectorOrden(true);
  };

  const configDropdown = {
    data: datosBuscador,
    header: "",
    footer: "",
    descripcion: "descripcion",
    placeholder: "Ej: Ecografía abdominal adulto",
    placeHolderFontSize: 14,
    defaultValue: 1,
    defaultValueParametro: "id",
    height: 32,
    cantidadItems: 10,
    maxlength: 100,
    error: false,
    arrow: false,
    search: true,
    disabled: false,
    tooltip: false,
    showUp: true,
    regex: /^[a-zA-Z\s]+$/,
    masBuscados: true,
    buscarPorDefault: true,
    limpiarInput: true,
  };

  const dissmissCreacion = () => {
    setOpenCirOrdenPrac(false);
    setOpenSlider(false);
    finalizaEdicion();
    hideModal()(modalDispatch);
  };
  const continuaCreando = () => {
    hideModal()(modalDispatch);
  };

  const showCierre = () => {
    if (arrayAgregados.length > 0) {
      showModal(
        <Mensaje
          textoNegrita={"Usted tiene una edición de orden en curso"}
          texto={"Desea cancelar?"}
        ></Mensaje>,
        "Edición de Orden en curso",
        continuaCreando,
        false,
        [
          {
            text: "Cancelar edición",
            clase: "btn-Mensaje bgc-danger rb16m c-white",
            accion: dissmissCreacion,
          },
          {
            text: "Continuar",
            clase: "btn-Mensaje b-latex30 rb16m c-latex30",
            accion: continuaCreando,
          },
        ],
        "centro",
        false
      )(modalDispatch);
    } else {
      dissmissCreacion();
    }
  };

  // Optimización: Usar useMemo para evitar recálculos innecesarios
  const practicasXEspOptimizadas = useMemo(() => {
    const practicasXEsp = ordenPracticaState.ordenPractica.practicasXEsp;
    if (practicasXEsp?.value?.length > 0) {
      return practicasXEsp.value.map((item) => ({ ...item, agregado: false }));
    }
    return null;
  }, [ordenPracticaState.ordenPractica.practicasXEsp?.value]);

  const practicasXUserOptimizadas = useMemo(() => {
    const practicasXUser = ordenPracticaState.ordenPractica.practicasXUser;
    if (practicasXUser?.value?.length > 0) {
      return practicasXUser.value.map((item) => ({ ...item, agregado: false }));
    }
    return null;
  }, [ordenPracticaState.ordenPractica.practicasXUser?.value]);

  // Actualizar estados solo cuando cambien los valores optimizados
  useEffect(() => {
    if (practicasXEspOptimizadas) {
      setRecXEsp(practicasXEspOptimizadas);
    }
  }, [practicasXEspOptimizadas]);

  useEffect(() => {
    if (practicasXUserOptimizadas) {
      setMasSolicitados(practicasXUserOptimizadas);
    }
  }, [practicasXUserOptimizadas]);

  // Optimización: Usar useMemo para marcar elementos agregados
  const recXEspMarcados = useMemo(() => {
    if (!arrayAgregados?.length || !recXEsp?.length || flgFirstChange) {
      return recXEsp;
    }

    // Crear un Set para búsquedas O(1)
    const agregadosIds = new Set(arrayAgregados.map((item) => item.id));

    return recXEsp.map((item) => ({
      ...item,
      agregado: agregadosIds.has(item.idgrupoestudio),
    }));
  }, [arrayAgregados, recXEsp, flgFirstChange]);

  const masSolicitadosMarcados = useMemo(() => {
    if (!arrayAgregados?.length || !masSolicitados?.length || flgFirstChange) {
      return masSolicitados;
    }

    // Crear un Set para búsquedas O(1)
    const agregadosIds = new Set(arrayAgregados.map((item) => item.id));

    return masSolicitados.map((item) => ({
      ...item,
      agregado: agregadosIds.has(item.idgrupoestudio),
    }));
  }, [arrayAgregados, masSolicitados, flgFirstChange]);

  // Actualizar estados cuando cambien los valores marcados
  useEffect(() => {
    if (recXEspMarcados && !flgFirstChange) {
      setRecXEsp(recXEspMarcados);
      setFlgFirstChange(true);
    }
  }, [recXEspMarcados, flgFirstChange]);

  useEffect(() => {
    if (masSolicitadosMarcados && !flgFirstChange) {
      setMasSolicitados(masSolicitadosMarcados);
      setFlgFirstChange(true);
    }
  }, [masSolicitadosMarcados, flgFirstChange]);

  return (
    <>
      <CerrarCmp
        className="cerrarIcon ts_creaOrdenPrac_close-btn"
        onClick={() => showCierre()}
      >
        <span className="rb16l c-latex30">Cerrar</span>
        <div>
          <FlechaIzquierdaIcon />
        </div>
      </CerrarCmp>
      <ContainerBox>
        <ContainerTitle>
          <span className="rb24b c-latex30">
            Solicitud de Orden de Estudios
          </span>
        </ContainerTitle>
        <ContainerQst>
          <span className="rb18l c-latex30">
            Seleccione los estudios que va a solicitar
          </span>
        </ContainerQst>
        <ContainerBuscadorP1>
          <BoxBuscador>
            <div className="rb16l c-latex30">Buscador estudios:</div>
            <BoxBuscadorItem>
              <DropdownV2 config={configDropdown} onClick={onChangeBuscador} />
            </BoxBuscadorItem>
          </BoxBuscador>
        </ContainerBuscadorP1>

        <ContainerBody>
          <ContainerMasUsados>
            <MasUsadosTitle className="rb16b c-latex30">
              Más solicitados
            </MasUsadosTitle>
            <MasUsadosBoxItem>
              {masSolicitados !== null ? (
                masSolicitados.map((item, index) => {
                  return (
                    <MasUsadosItem
                      key={index}
                      onClick={() => onClickRecomendados(item)}
                    >
                      <div className="rb12b c-white">
                        {item.idgrupoestudio_desc.toUpperCase()}
                      </div>
                      {item.agregado ? (
                        <div className="iconAdjust">
                          <TildeOk color={"var(--color-white)"} />
                        </div>
                      ) : (
                        ""
                      )}
                    </MasUsadosItem>
                  );
                })
              ) : (
                <SinMasUsadosItem>
                  <div className="rb14l c-latex30">
                    Sin estudios hasta que comience a realizar ordenes médicas
                  </div>
                </SinMasUsadosItem>
              )}
            </MasUsadosBoxItem>
          </ContainerMasUsados>

          <ContainerRecomendados>
            <RecomendadosTitle className="rb16b c-latex30">
              <span> Recomendados por especialidad</span>
            </RecomendadosTitle>
            <RecomendadosBoxItem>
              {recXEsp !== null ? (
                recXEsp.map((item, index) => {
                  return (
                    <RecomendadosItem
                      key={index}
                      onClick={() => onClickRecomendados(item)}
                      className="pointer"
                      agregado={item.agregado}
                    >
                      <div className="rb12b c-white pointer">
                        {item.idgrupoestudio_desc.toUpperCase()}
                      </div>
                      {item.agregado ? (
                        <div className="iconAdjust">
                          <TildeOk color={"var(--color-white)"} />
                        </div>
                      ) : (
                        ""
                      )}
                    </RecomendadosItem>
                  );
                })
              ) : (
                <RecomendadosItem>
                  <div className="rb12b c-white">Sin estudios recomendados</div>
                </RecomendadosItem>
              )}
            </RecomendadosBoxItem>
          </ContainerRecomendados>

          <ContainerResumen>
            <ResumenCard>
              <ResumenCardTitle>
                <span className="c-white rb16b">
                  Agregados en esta consulta
                </span>
                <QuestionMark
                  colorFondo={"var(--color-white)"}
                  colorSigno={"var(--color-latex30)"}
                />
              </ResumenCardTitle>
              <ResumenCardBody>
                {arrayAgregados &&
                  arrayAgregados.map((item, index) => {
                    return (
                      <ResumenCardItem className="rb12b c-latex30 " key={index}>
                        <span
                          className="pointer ts_creaOrdenPrac_delPrac-btn"
                          onClick={() => eliminaDeter(item)}
                        >
                          <CruzOrdenPrac className="pointer"></CruzOrdenPrac>
                        </span>
                        <div>{item.descripcion}</div>
                      </ResumenCardItem>
                    );
                  })}
              </ResumenCardBody>
            </ResumenCard>
            <BoxFecha>
              <BoxFechaTitle>
                <p className="rb16l c-latex30">Fecha Diferida:</p>
                <QuestionMark
                  colorFondo={"var(--color-latex30)"}
                  colorSigno={"var(--color-white)"}
                />
              </BoxFechaTitle>
              <BoxFechaInput className="ts_creaOrdenPrac_datePicker`">
                <DatePicker
                  fechaInicial={`${hoy.getFullYear()} ${
                    hoy.getMonth() + 1 >= 10
                      ? hoy.getMonth() + 1
                      : `0${hoy.getMonth() + 1}`
                  } ${
                    hoy.getDate() >= 10 ? hoy.getDate() : `0${hoy.getDate()}`
                  }`}
                  fechaFinal={`${hoy.getFullYear() + 1} ${
                    hoy.getMonth() + 1 >= 10
                      ? hoy.getMonth() + 1
                      : `0${hoy.getMonth() + 1}`
                  } ${
                    hoy.getDate() >= 10 ? hoy.getDate() : `0${hoy.getDate()}`
                  }`}
                  onChange={onChangeFecha}
                  selectedFecha={
                    datosPaso2Prac.fechaElegida !== ""
                      ? datosPaso2Prac.fechaElegida
                      : fechaInicialDatePicker !== null
                      ? fechaInicialDatePicker
                      : `${hoy.getFullYear()} ${
                          hoy.getMonth() + 1 >= 10
                            ? hoy.getMonth() + 1
                            : `0${hoy.getMonth() + 1}`
                        } ${
                          hoy.getDate() >= 10
                            ? hoy.getDate()
                            : `0${hoy.getDate()}`
                        }`
                  }
                  checkError={"fecha incorrecta"}
                  errorStr="La fecha es requerida"
                  isRequired={false}
                  posicion={"absolute"}
                  botones={true}
                  background={true}
                  customCss={"hc-ordenPrac-DatePickerCustom"}
                />
              </BoxFechaInput>
            </BoxFecha>
          </ContainerResumen>
        </ContainerBody>

        <ContainerButtons>
          <BtnCerrar
            onClick={volverSelector}
            className="rb16b c-white ts_creaOrdenPrac_back-btn`"
          >
            Volver
          </BtnCerrar>
          <BtnGenerarOrden
            habilitado={arrayAgregados.length > 0 && fechaElegida !== ""}
            onClick={
              arrayAgregados.length > 0 && fechaElegida !== ""
                ? () => irAlPaso2()
                : () => {}
            }
            className={`${
              arrayAgregados.length > 0 && fechaElegida !== ""
                ? "bgc-primary"
                : "bgc-grey65"
            } rb16m c-white ts_creaOrdenPrac_paso2-btn`}
          >
            Siguiente
          </BtnGenerarOrden>
        </ContainerButtons>
      </ContainerBox>
    </>
  );
};

export default CrearOrdenPrac;
