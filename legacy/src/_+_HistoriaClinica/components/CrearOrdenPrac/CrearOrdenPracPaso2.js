import QuestionMark from "global/assets/generico/QuestionMark";
import InputV1 from "global/components/genericos/InputV1/InputV1";
import { regexNumeroLetras } from "global/utils/expresionesRegulares";
import { useContext, useEffect, useState } from "react";
import {
  ContainerBox,
  ContainerButtons,
  BtnCerrar,
  ContainerTitle,
  BtnGenerarOrden,
  ContainerBuscador,
  ContainerBody,
  BoxDiagnosticoTitle,
  BoxDiagnosticoInput,
  BoxUnicoDiagnostico,
  BoxUnicoDiagnosticoInput,
  BoxBuscadorPaso2,
  OrdenBox,
  PrestacionesBox,
  ListaPrestaciones,
  CerrarCmp,
  ContainerQst,
  ContainerQstP2,
  PresentacionBox,
  PresentacionItem,
  PresentacionTitle,
  PresentacionTxtAd,
  PresentacionRadios,
  PrsRadItem,
  PrsRadTitle,
  PrsRadInput,
  PrsTxtAdTitle,
  PrsTxtAdBoxInput,
  BoxUnicoDiagnosticoOrden,
} from "./localStyle";
import FlechaIzquierdaIcon from "global/assets/generico/FlechaIzquierdaIcon";
import { hideModal, showModal } from "global/context/action/modal/modal";
import Mensaje from "global/components/genericos/Mensaje/Mensaje";
import { GlobalContext } from "global/context/Provider";
import { agregarDesc } from "./CrearOrdenFun";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import InputRadio from "global/components/genericos/InputRadio/InputRadio";
import { showToaster } from "global/context/action/toaster/toaster";
import { updateEvoEditIndexDB } from "_+_HistoriaClinica/pages/Evolucion/EvolucionFun";

const CrearOrdenPracPaso2 = ({
  setOpenSlider,
  setOpenCirOrdenPrac,
  agregadosEnConsulta,
  setDatosPaso2Prac,
  ordenDigital,
  setOrdenDigital,
  ordenPrac,
  setOrdenPrac,
  finalizaEdicion,
}) => {
  const { modalDispatch, toasterDispatch } = useContext(GlobalContext);
  const { pacienteState } = useContext(HistoriaClinicaContext);
  const [valueDiagnostico, setValueDiagnostico] = useState("");
  const [valueDiagnosticoUnico, setValueDiagnosticoUnico] = useState(null);
  const [listaOriginal, setListaOriginal] = useState([
    ...agregadosEnConsulta.agregadosConsulta,
  ]);
  const [listaAgrupada, setListaAgrupada] = useState();
  const [ordenDto, setOrdenDto] = useState([]);
  const fechaHoy = new Date();
  let itemInfo = JSON.parse(localStorage.getItem("itemInfo"));
  let idUsuarioLocal = JSON.parse(localStorage.getItem("idUsuario"));

  useEffect(() => {
    agruparPorCircuito(listaOriginal);
  }, [listaOriginal]);

  const agruparPorCircuito = (array) => {
    const grupos = {};

    array.forEach((elemento, index) => {
      const { idOrdenDigGrupo } = elemento;

      // Si idOrdenDigGrupo es -1, crear un grupo único para cada elemento
      const idGrupo =
        idOrdenDigGrupo === -1 ? `sin_grupo_${index}` : idOrdenDigGrupo;

      // Si no existe el grupo, inicializarlo
      if (!grupos[idGrupo]) {
        grupos[idGrupo] = [];
      }

      grupos[idGrupo].push(elemento);
    });

    setListaAgrupada(Object.values(grupos));
  };

  const volverAlPaso1 = () => {
    setOrdenPrac({ ...ordenPrac, ordenPracP1: true, ordenPracP2: false });
    // abrirOrdenPractica(listaOriginal);
  };

  const onChangeDiagnosticoUnico = (e) => {
    if (e !== undefined && e !== null) {
      setValueDiagnosticoUnico(e.target.value);
    }
  };

  // Este useEffect genera los objetos a enviar en el post
  // segun la cantidad de estudios seleccionados
  useEffect(() => {
    let arrx = [];
    for (let i = 0; i < listaOriginal.length; i++) {
      const element = listaOriginal[i];
      const nuevoDiagnostico = {
        idpaciente: pacienteState.paciente.buscarPac.value[0].id,
        idgrupoestudio: element.id,
        fecha: agregadosEnConsulta.fechaElegida,
        fechaAlta: fechaHoy,
        idturnoorigen: itemInfo.idTurno,
        diagnostico:
          element.diagnostico !== undefined && element.diagnostico !== null
            ? element.diagnostico
            : "",
        orden: 0,
        idCircuito: element.idcircuito,
        tipoOrden: "Prac",
        descripcion: element.descripcion,
        lado: element.lado ? element.lado : "",
        textoAdicional: element.textoAdicional ? element.textoAdicional : "",
        idOrdenDigGrupo: element.idOrdenDigGrupo,
        ordenDigReqLado: element.ordenDigReqLado,
        idOrdenDigGrupo_desc: element.idOrdenDigGrupo_desc
          ? element.idOrdenDigGrupo_desc
          : "",
        idUsuario: idUsuarioLocal,
      };
      arrx.push(nuevoDiagnostico);
    }
    setOrdenDto(arrx);
  }, []);

  const onChangeDiagnostico = (e, item) => {
    const { value } = e.target;
    if (item.length > 1) {
      // Si tengo una lista en el parametro item hago un for para reemplazar
      // el campo diagnostico en todos los que sean del mismo idCircuito
      for (let i = 0; i < item.length; i++) {
        const indice = ordenDto.findIndex(
          (e) => e.idgrupoestudio === item[i].id
        );
        if (indice !== -1) {
          // Si el objeto ya existe, reemplazarlo en la lista
          const nuevosDiagnosticos = [...ordenDto];
          nuevosDiagnosticos[indice].diagnostico = value;
          setOrdenDto(nuevosDiagnosticos);
        }
      }
      let auxAgrupados = listaAgrupada;
      for (let i = 0; i < auxAgrupados.length; i++) {
        const element1 = auxAgrupados[i];
        if (element1.length > 1) {
          for (let j = 0; j < element1.length; j++) {
            const element2 = element1[j];
            if (element2.id === item[j].id) {
              element2.diagnostico = value;
            }
          }
        }
      }
      setListaAgrupada(auxAgrupados);
    } else {
      // Buscar el índice del objeto en la lista de diagnosticos existentes
      const indice = ordenDto.findIndex((e) => e.idgrupoestudio === item[0].id);

      // Actualizar la lista de diagnosticos
      if (indice !== -1) {
        // Si el objeto ya existe, reemplazarlo en la lista
        const nuevosDiagnosticos = [...ordenDto];
        nuevosDiagnosticos[indice].diagnostico = value;
        setOrdenDto(nuevosDiagnosticos);
      }
      let auxAgrupados = listaAgrupada;
      for (let i = 0; i < auxAgrupados.length; i++) {
        const element1 = auxAgrupados[i];
        if (element1.length === 1) {
          if (element1[0].id === item[0].id) {
            element1[0].diagnostico = value;
          }
        }
      }
      setListaAgrupada(auxAgrupados);
    }
  };

  // Este useEffect verifica que los campos de diagnostico individuales esten
  // todos vacios para volver a habilitar el de diagnostico general
  useEffect(() => {
    if (ordenDto) {
      let todosVacio = ordenDto.every((obj) => obj.diagnostico === "");
      if (todosVacio) {
        setValueDiagnostico(null);
      } else {
        setValueDiagnostico(true);
      }
    }
  }, [ordenDto]);

  const preventKeyOnlyTextandLetters = (e) => {
    if (!regexNumeroLetras.test(e.key)) {
      e.preventDefault();
    }
  };

  //funcion async para cargar la edicion local
  async function asyncUpdEdicionIDB(key, ref, obj) {
    try {
      const response = await updateEvoEditIndexDB(key, ref, obj);
      if (response !== null) {
        //ok sin respuesta
      }
    } catch (error) {
      //no necesita
    }
  }

  const checkLadoArray = () => {
    return ordenDto.every((item) => {
      if (item.ordenDigReqLado) {
        if (item.idOrdenDigGrupo > 0) {
          return item.lado !== ""; // Si idOrdenDigGrupo > 0, valida que "lado" no esté vacío
        }
      }
      return true; // Si idOrdenDigGrupo no es > 0, no se valida "lado"
    });
  };

  const handleGenerarObjeto = () => {
    if (checkLadoArray()) {
      let ordPracActual = ordenDto;
      let ordActual = ordenDigital;

      // Si hay un diagnóstico global, se aplica a todas las órdenes
      if (valueDiagnosticoUnico !== "" && valueDiagnosticoUnico !== null) {
        ordPracActual = ordPracActual.map((element) => ({
          ...element,
          diagnostico: valueDiagnosticoUnico,
        }));
      }

      // Agrupar por idOrdenDigGrupo
      const gruposOrden = {};
      ordPracActual.forEach((element, index) => {
        // Si el idOrdenDigGrupo es -1, asignar un identificador único para cada elemento
        const idGrupo =
          element.idOrdenDigGrupo === -1
            ? `sin_grupo_${index}` // Generar un id único para cada elemento con idOrdenDigGrupo === -1
            : element.idOrdenDigGrupo;

        // Inicializar el grupo si no existe
        if (!gruposOrden[idGrupo]) {
          gruposOrden[idGrupo] = [];
        }
        gruposOrden[idGrupo].push(element);
      });

      // Generar los objetos necesarios para cada grupo
      const filtroPrac = Object.keys(gruposOrden).map((idGrupo) => {
        const grupoItems = gruposOrden[idGrupo];

        //quitar cuando ya esta la agrupacion el primer item del return.
        return {
          ...grupoItems[0],
          diagnostico: grupoItems[0].diagnostico,
          idOrdenDigGrupo: idGrupo.startsWith("sin_grupo_")
            ? -1
            : parseInt(idGrupo), // Asegurar que los grupos sin id tengan -1
          tipoOrden: grupoItems[0].tipoOrden,
          items: grupoItems, // Cada grupo debería tener sólo un elemento si idOrdenDigGrupo es -1
          descripcion: agregarDesc(grupoItems),
          idUsuario: idUsuarioLocal,
        };
      });

      // Si editas, eliminamos la orden anterior que se estaba editando
      let auxOrden = ordActual.filter((item) => item.tipoOrden !== "Prac");
      // Añadir las nuevas órdenes agrupadas
      auxOrden = [...auxOrden, ...filtroPrac];
      // Guardar los cambios en el estado y en indexDB
      setOrdenDigital(auxOrden);
      asyncUpdEdicionIDB(5, "ordenDigital", auxOrden);
      // Resetear los hooks y flags
      setDatosPaso2Prac({ agregadosConsulta: [], fechaElegida: "" });
      setOpenSlider(false);
      setOpenCirOrdenPrac(false);
      setOrdenPrac({ ...ordenPrac, ordenPracP1: true, ordenPracP2: false });
      finalizaEdicion();
    } else {
      showToaster(
        {
          texto: "Debe cargar un lado en las determinaciones que lo requieran",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  };

  const dissmissCreacion = () => {
    setOpenSlider(false);
    setOrdenPrac({ ...ordenPrac, ordenPracP1: true, ordenPracP2: false });
    setOpenCirOrdenPrac(false);
    finalizaEdicion();
    hideModal()(modalDispatch);
  };
  const continuaCreando = () => {
    hideModal()(modalDispatch);
  };

  const showCierre = () => {
    showModal(
      <Mensaje
        textoNegrita={"Usted tiene una creación de orden en curso"}
        texto={"Desea cancelar?"}
      ></Mensaje>,
      "Creación de Orden en curso",
      continuaCreando,
      false,
      [
        {
          text: "Cancelar creación",
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
  };

  // Función para manejar el cambio de los radios
  const onChangeRadio = (itemId, radioValue) => {
    const updatedLista = listaAgrupada.map((grupo) =>
      grupo.map((elemento) => {
        if (elemento.id === itemId) {
          return {
            ...elemento,
            lado: radioValue, // Setea el valor del radio seleccionado Izq Der Amb
          };
        }
        return elemento;
      })
    );
    setListaAgrupada(updatedLista);
    // Actualizar ordenDto
    const updatedOrdenDto = ordenDto.map((item) => {
      if (item.idgrupoestudio === itemId) {
        return {
          ...item,
          lado: radioValue, // Actualizar también en ordenDto
        };
      }
      return item;
    });
    setOrdenDto(updatedOrdenDto);
  };

  // Función para manejar el cambio del texto adicional
  const onChangeTxtAd = (e, item) => {
    let updatedLista = listaAgrupada.map((grupo) =>
      grupo.map((elemento) => {
        if (elemento.id === item.id) {
          return {
            ...elemento,
            textoAdicional: e.target.value,
          };
        }
        return elemento;
      })
    );
    setListaAgrupada(updatedLista);
    // Actualizar ordenDto
    const updatedOrdenDto = ordenDto.map((ordenItem) => {
      if (ordenItem.idgrupoestudio === item.id) {
        return {
          ...ordenItem,
          textoAdicional: e.target.value, // Actualizar también en ordenDto
        };
      }
      return ordenItem;
    });
    setOrdenDto(updatedOrdenDto);
  };

  return (
    <>
      <CerrarCmp
        className="cerrarIcon ts_creaOrdenPrac2_close-btn"
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
        <ContainerQstP2>
          <span className="rb18l c-latex30">
            Indique el diagnóstico de las ordenes. Puede ingresar un único
            diagnóstico para todas las órdenes o uno para cada una de estas
          </span>
        </ContainerQstP2>
        <BoxUnicoDiagnostico>
          <BoxDiagnosticoTitle>
            <p
              className={`rb16b ${
                valueDiagnostico !== null && valueDiagnostico !== ""
                  ? "c-grey65"
                  : "c-latex30"
              }`}
            >
              Unico diagnóstico para todas las órdenes:
            </p>
            <QuestionMark
              colorFondo={
                valueDiagnostico !== null && valueDiagnostico !== ""
                  ? "var(--color-grey65)"
                  : "var(--color-latex30)"
              }
              colorSigno={"var(--color-white)"}
            />
          </BoxDiagnosticoTitle>
          <BoxUnicoDiagnosticoInput>
            <InputV1
              inputType="text"
              name="txtDiagPac"
              placeholderText="HTA"
              errorStr="Ingrese al menos 3 caracteres."
              onChange={onChangeDiagnosticoUnico}
              onKeyPress={preventKeyOnlyTextandLetters}
              maxLength="50"
              className="rb16m ts_creaOrdenPrac_diagUnique-input"
              isRequired={true}
              desactivado={valueDiagnostico !== null && valueDiagnostico !== ""}
              // value={valueDiagnosticoUnico}
              autoFocus={true}
            />
          </BoxUnicoDiagnosticoInput>
        </BoxUnicoDiagnostico>

        <ContainerBody paso={2}>
          {listaAgrupada &&
            listaAgrupada.map((item, index) => {
              return (
                <ContainerBuscador paso={2} key={index}>
                  <BoxBuscadorPaso2>
                    <p className="rb16b c-primary">
                      Orden {index + 1}
                      {item.length > 1 ? (
                        <span className="rb12l" style={{ paddingLeft: 15 }}>
                          Grupo {item[0].idOrdenDigGrupo_desc} *Se creará una
                          orden por cada 2 determinaciones
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                    <OrdenBox>
                      <PrestacionesBox>
                        <p className="rb14b c-latex30">Prestaciones:</p>
                        <ListaPrestaciones>
                          {item.map((elemento) => (
                            <PresentacionBox key={elemento.id}>
                              <PresentacionItem>
                                <PresentacionTitle className="rb14l c-latex30">
                                  {elemento.descripcion}
                                </PresentacionTitle>
                                {elemento.ordenDigReqLado ? (
                                  <PresentacionRadios>
                                    <PrsRadItem>
                                      <PrsRadTitle>
                                        <p className="rb14b c-latex30">Izq</p>
                                      </PrsRadTitle>
                                      <PrsRadInput>
                                        <InputRadio
                                          name={`izq-${elemento.id}`}
                                          radioHeight={13}
                                          onChange={() =>
                                            onChangeRadio(elemento.id, "I")
                                          }
                                          checked={elemento.lado === "I"}
                                        />
                                      </PrsRadInput>
                                    </PrsRadItem>
                                    <PrsRadItem>
                                      <PrsRadTitle>
                                        <p className="rb14b c-latex30">Der</p>
                                      </PrsRadTitle>
                                      <PrsRadInput>
                                        <InputRadio
                                          name={`der-${elemento.id}`}
                                          radioHeight={13}
                                          onChange={() =>
                                            onChangeRadio(elemento.id, "D")
                                          }
                                          checked={elemento.lado === "D"}
                                        />
                                      </PrsRadInput>
                                    </PrsRadItem>
                                    <PrsRadItem>
                                      <PrsRadTitle>
                                        <p className="rb14b c-latex30">Amb</p>
                                      </PrsRadTitle>
                                      <PrsRadInput>
                                        <InputRadio
                                          name={`amb-${elemento.id}`}
                                          radioHeight={13}
                                          onChange={() =>
                                            onChangeRadio(elemento.id, "A")
                                          }
                                          checked={elemento.lado === "A"}
                                        />
                                      </PrsRadInput>
                                    </PrsRadItem>
                                  </PresentacionRadios>
                                ) : (
                                  ""
                                )}
                              </PresentacionItem>
                              {elemento.ordenDigItemTextoAd ? (
                                <PresentacionTxtAd>
                                  <PrsTxtAdTitle>
                                    <p className="rb14l c-latex30">
                                      Texto Adic.
                                    </p>
                                  </PrsTxtAdTitle>
                                  <PrsTxtAdBoxInput>
                                    <InputV1
                                      inputType="text"
                                      name={`txtAd-${elemento.id}`}
                                      placeholderText="opcional"
                                      errorStr="Ingrese al menos 3 caracteres."
                                      onChange={(e) =>
                                        onChangeTxtAd(e, elemento)
                                      }
                                      maxLength="50"
                                      className="rb14m prsTxtAdBoxInput-customcss"
                                      value={elemento.textoAdicional || ""}
                                    />
                                  </PrsTxtAdBoxInput>
                                </PresentacionTxtAd>
                              ) : (
                                ""
                              )}
                            </PresentacionBox>
                          ))}
                        </ListaPrestaciones>
                      </PrestacionesBox>
                      <BoxUnicoDiagnosticoOrden>
                        <BoxDiagnosticoTitle>
                          <p
                            className={`rb16l ${
                              valueDiagnosticoUnico !== null &&
                              valueDiagnosticoUnico !== ""
                                ? "c-grey65"
                                : "c-latex30"
                            }`}
                          >
                            Diagnóstico:
                          </p>
                          <QuestionMark
                            colorFondo={
                              valueDiagnosticoUnico !== null &&
                              valueDiagnosticoUnico !== ""
                                ? "var(--color-grey65)"
                                : "var(--color-latex30)"
                            }
                            colorSigno={"var(--color-white)"}
                          />
                        </BoxDiagnosticoTitle>
                        <BoxDiagnosticoInput>
                          <InputV1
                            inputType="text"
                            name={`diagnostico`}
                            placeholderText="HTA"
                            errorStr="Ingrese al menos 3 caracteres."
                            onChange={(e) => onChangeDiagnostico(e, item)}
                            onKeyPress={preventKeyOnlyTextandLetters}
                            maxLength="50"
                            className="rb16m"
                            isRequired={true}
                            desactivado={
                              valueDiagnosticoUnico !== null &&
                              valueDiagnosticoUnico !== ""
                            }
                            value={
                              item[0].diagnostico !== undefined &&
                              item[0].diagnostico !== null
                                ? item[0].diagnostico
                                : ""
                            }
                          />
                        </BoxDiagnosticoInput>
                      </BoxUnicoDiagnosticoOrden>
                    </OrdenBox>
                  </BoxBuscadorPaso2>
                </ContainerBuscador>
              );
            })}
        </ContainerBody>

        <ContainerButtons>
          <BtnCerrar
            onClick={() => volverAlPaso1()}
            className="rb16b c-white ts_creaOrdenPrac2_back-btn"
          >
            Volver
          </BtnCerrar>
          <BtnGenerarOrden
            habilitado={
              ordenDto.every((obj) => obj.diagnostico !== "") ||
              (valueDiagnosticoUnico !== null && valueDiagnosticoUnico !== "")
            }
            onClick={
              ordenDto.every((obj) => obj.diagnostico !== "") ||
              (valueDiagnosticoUnico !== null && valueDiagnosticoUnico !== "")
                ? handleGenerarObjeto
                : () => {}
            }
            className={`${
              ordenDto.every((obj) => obj.diagnostico !== "") ||
              (valueDiagnosticoUnico !== null && valueDiagnosticoUnico !== "")
                ? "bgc-primary"
                : "bgc-grey65"
            } rb16m c-white ts_creaOrdenPrac2_save-btn`}
          >
            Generar Orden
          </BtnGenerarOrden>
        </ContainerButtons>
      </ContainerBox>
    </>
  );
};

export default CrearOrdenPracPaso2;
