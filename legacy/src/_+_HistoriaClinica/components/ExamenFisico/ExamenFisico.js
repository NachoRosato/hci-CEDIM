import {
  Abreviatura,
  ContainerBoxFila,
  ContainerItems,
  ContainerForm,
  ContainerHijo,
  ContainerInput,
  BtnGuardar,
  CerrarCmp,
  ContainerButtons,
  ContainerExFisicoQuill,
} from "./localStyle";
import React, { useContext, useEffect, useState } from "react";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import {
  getItemIndexDB,
  updateEvoEditIndexDB,
} from "_+_HistoriaClinica/pages/Evolucion/EvolucionFun";
import { showToaster } from "global/context/action/toaster/toaster";
import { GlobalContext } from "global/context/Provider";
import InputCheck from "global/components/genericos/InputCheck/InputCheck";
import InputRadio from "global/components/genericos/InputRadio/InputRadio";
import InputBase from "global/components/genericos/InputBase/InputBase";
import Loading from "global/components/genericos/Loading/Loading";
import FlechaIzquierdaIcon from "global/assets/generico/FlechaIzquierdaIcon";
import QuillExFisico from "../QuillExFisico/QuillExFisico";

const ExamenFisico = ({ setOpen, type, setExamenFisico }) => {
  const { examenState } = useContext(HistoriaClinicaContext);
  const { toasterDispatch } = useContext(GlobalContext);
  const initialState = {
    nombre: "",
  };

  const [nestedArray, setNestedArray] = useState(null);
  const [dtoExamen, setDtoExamen] = useState(null);
  const [flgFillDtoExamen, setFlgFillDtoExamen] = useState(null);
  const [localForm, setLocalForm] = useState(initialState);
  const [stateRequired, setStateRequired] = useState({
    nombre: false,
  });
  const [startText, setStartText] = useState("");

  const editorCaracLimit = 1950;
  let config = localStorage.getItem("config");
  let opcEditorTools = JSON.parse(config).opcEditorTextoHerramientas;

  useEffect(() => {
    if (
      examenState.examen.data !== null &&
      examenState.examen.data !== undefined
    ) {
      let aux = examenState.examen.data.value;
      setDtoExamen(aux);
      setNestedArray(createNestedArray(aux, -1));
      setFlgFillDtoExamen(true);
    }
  }, [examenState.examen.data]);

  //actualizar datos con datos locales
  useEffect(() => {
    if (flgFillDtoExamen && dtoExamen) {
      async function getDataIndexDB() {
        try {
          const response = await getItemIndexDB(5);
          if (response) {
            if (response.ListEditEvo) {
              if (
                response.ListEditEvo.examenFisico !== null &&
                response.ListEditEvo.examenFisico !== undefined &&
                response.ListEditEvo.examenFisico.length > 0
              ) {
                const itemTL = response.ListEditEvo.examenFisico.find(
                  (item) =>
                    typeof item.display === "string" &&
                    item.display.startsWith("TL/")
                );
                if (itemTL) {
                  setStartText(itemTL.valor);
                }
                // Iterar sobre dtoExamen y actualizar valores según IDs coincidentes
                let auxEx = examenState.examen.data.value;
                const updatedDtoExamen = auxEx.map((dtoItem) => {
                  const match = response.ListEditEvo.examenFisico.find(
                    (exItem) => String(exItem.id) === String(dtoItem.id)
                  );
                  return match ? { ...dtoItem, valor: match.valor } : dtoItem;
                });
                setDtoExamen(updatedDtoExamen);
                setNestedArray(createNestedArray(updatedDtoExamen, -1));

                // Ejecutar cálculos de fórmulas después de cargar los datos
                setTimeout(() => {
                  updatedDtoExamen.forEach((item) => {
                    if (getDisplayType(item.display) === "formula") {
                      calcFormula(updatedDtoExamen, item);
                    }
                  });
                }, 100);
              }
            }
          }
          setFlgFillDtoExamen(false);
        } catch (error) {
          console.log(error);
        }
      }
      getDataIndexDB();
    }
  }, [flgFillDtoExamen]);

  const createNestedArray = (data, parentId) => {
    let result = [];
    for (const obj of data) {
      if (obj.idExamenFisicoPadre === parentId) {
        const children = createNestedArray(data, Number(obj.id));
        if (children.length > 0) {
          obj.children = children;
        }
        result.push(obj);
      }
    }
    result = result.sort((a, b) => a.orden - b.orden);
    return result;
  };

  const isChecked = (id) => {
    let valorNuevo;
    for (let i = 0; i < dtoExamen.length; i++) {
      if (Number(dtoExamen[i].id) === id) {
        valorNuevo = dtoExamen[i].valor;
      }
    }
    return valorNuevo;
  };

  const isCheckedRadio = (id) => {
    let valorNuevo;
    for (let i = 0; i < dtoExamen.length; i++) {
      if (Number(dtoExamen[i].id) === id) {
        valorNuevo = dtoExamen[i].valor;
      }
    }
    return valorNuevo;
  };

  const onChangeCheck = (id) => {
    let mapeo = dtoExamen.map((item) => {
      if (Number(item.id) === id) {
        item.valor = !item.valor;
      }
      return item;
    });
    setDtoExamen(mapeo);
  };

  const onChangeRadio = (id, idExamenFisicoPadre, radio) => {
    let aux = dtoExamen.filter(
      (item) =>
        item.idExamenFisicoPadre === idExamenFisicoPadre &&
        item.radioButton === radio
    );

    let mapeo = aux.map((item) => {
      if (Number(item.id) === id) {
        item.valor = true;
      } else {
        item.valor = false;
      }
      return item;
    });

    let auxExamen = dtoExamen.map((item) => {
      for (let i = 0; i < mapeo.length; i++) {
        const element = mapeo[i];
        if (item.id === element.id) {
          item.valor = element.valor;
        }
      }
      return item;
    });
    setDtoExamen(auxExamen);
  };

  const onChangeInput = (e, id, item) => {
    for (let i = 0; i < dtoExamen.length; i++) {
      if (Number(dtoExamen[i].id) === id) {
        dtoExamen[i].valor = e.target.value;
      }
    }
    let listDtoExamen = dtoExamen;
    calcFormula(listDtoExamen, item);
  };

  const handleKeyPressNumbers = (event, display) => {
    let regex = /^[0-9,]+$/; // Solo números
    if (display.includes("=")) {
      //esto se consulta para evitar indeseados en formulas
      if (!regex.test(event.key)) {
        event.preventDefault(); // Previene cualquier carácter que no sea número
      }
    } else {
      if (!regex.test(event.key)) {
        event.preventDefault(); // Previene cualquier carácter que no sea número
      }
    }
  };

  const handleKeyPressTextAndNumbers = (event, display) => {
    let regex = /^[a-zA-Z0-9]+$/; // Solo letras y números

    if (display.includes("=")) {
      //esto se consulta para evitar indeseados en formulas
      if (!regex.test(event.key)) {
        event.preventDefault();
      }
    } else if (display.includes(",") || display.includes("/")) {
      regex = /^[a-zA-Z0-9,\/]+$/;
      if (!regex.test(event.key)) {
        event.preventDefault(); // Previene cualquier carácter que no sea número, text , coma o barra
      }
    } else {
      if (!regex.test(event.key)) {
        event.preventDefault(); // Previene cualquier carácter que no sea número
      }
    }
  };

  const calcFormula = (lista, item) => {
    // Primero busco los idPadre para armar mi grupo de cálculo
    let auxPadre = lista.filter(
      (e) => e.idExamenFisicoPadre === item.idExamenFisicoPadre
    );
    if (auxPadre.length > 0) {
      let auxItemCalc = auxPadre.filter((item) => {
        return (
          item.display !== "" && getDisplayType(item.display) === "formula"
        );
      });
      if (auxItemCalc.length > 0) {
        // Paso 1: Remuevo '<' '>' '='
        let sanitizedString = auxItemCalc[0].display.replace(/<|>|=/g, "");

        // Paso 2: Reemplazo los valores de cada uno, permitiendo números con coma
        let hayCamposVacios = false;
        // Primero obtenemos todos los IDs de campos disponibles en el grupo
        const idsDisponibles = auxPadre.map((obj) => obj.id.toString());

        sanitizedString = sanitizedString.replace(/\d+,\d+|\d+/g, (match) => {
          // Solo procesamos si el match corresponde a un ID de campo real
          if (idsDisponibles.includes(match)) {
            const foundObject = auxPadre.find(
              (obj) => obj.id.toString() === match
            );

            // Verificamos que foundObject existe y tiene un valor válido
            if (
              foundObject &&
              foundObject.valor !== undefined &&
              foundObject.valor !== null &&
              foundObject.valor !== ""
            ) {
              return foundObject.valor.toString().replace(",", ".");
            }

            // Si algún campo dependiente está vacío, marcamos la bandera
            hayCamposVacios = true;
            return "0"; // Usamos 0 como placeholder para evitar errores de eval
          } else {
            // Es un número literal, lo dejamos tal como está
            return match;
          }
        });

        // 🚨 Si hay campos vacíos, limpiamos la fórmula
        if (hayCamposVacios) {
          for (let i = 0; i < lista.length; i++) {
            if (Number(lista[i].id) === Number(auxItemCalc[0].id)) {
              dtoExamen[i].valor = null;
              const e = document.getElementById(
                `ptur-input-abm-tablenombre${auxItemCalc[0].id}`
              );
              if (e) {
                e.placeholder = "";
              }
            }
          }
          return false;
        }

        // 🚨 Nueva validación
        const valoresInvalidos = sanitizedString
          .split(/[\+\-\*\/\(\)]/)
          .map((v) => v.trim())
          .filter((v) => v !== "" && !isNaN(v))
          .filter((num) => /^0$/.test(num) || /^0\d+/.test(num));

        if (valoresInvalidos.length > 0) {
          // Si hay valores inválidos, no se evalúa la expresión
          for (let i = 0; i < lista.length; i++) {
            if (Number(lista[i].id) === Number(auxItemCalc[0].id)) {
              dtoExamen[i].valor = null;
              const e = document.getElementById(
                `ptur-input-abm-tablenombre${auxItemCalc[0].id}`
              );
              if (e) {
                e.placeholder = "-";
              }
            }
          }
          return false;
        }

        // Evaluar la expresión final
        try {
          const result = eval(sanitizedString);

          if (result !== undefined && result !== Infinity) {
            // Convertimos a número flotante y limitamos a 2 decimales
            const resultRounded = parseFloat(result).toFixed(2); // "12.34"
            // Reemplazamos el punto por coma para mostrar
            const resultDisplay = resultRounded.replace(".", ",");

            for (let i = 0; i < lista.length; i++) {
              if (Number(lista[i].id) === Number(auxItemCalc[0].id)) {
                dtoExamen[i].valor = resultDisplay;
                const e = document.getElementById(
                  `ptur-input-abm-tablenombre${auxItemCalc[0].id}`
                );
                if (e) {
                  e.placeholder = resultDisplay;
                }
              }
            }
          }
        } catch (error) {
          for (let i = 0; i < lista.length; i++) {
            if (Number(lista[i].id) === Number(auxItemCalc[0].id)) {
              dtoExamen[i].valor = null;
              const e = document.getElementById(
                `ptur-input-abm-tablenombre${auxItemCalc[0].id}`
              );
              if (e) {
                e.placeholder = "-";
              }
            }
          }
        }
      }
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

  const enviar = () => {
    let arrayDto = [];
    for (let i = 0; i < dtoExamen.length; i++) {
      if (
        dtoExamen[i].valor !== null &&
        dtoExamen[i].valor !== false &&
        dtoExamen[i].valor !== ""
      ) {
        const {
          valor,
          id,
          tipoResultado,
          idExamenFisicoPadre,
          unificarCon,
          descripcion,
          display,
          orden,
        } = dtoExamen[i]; // Extraer los campos necesarios
        arrayDto.push(
          (dtoExamen[i] = {
            valor,
            id,
            tipoResultado,
            idExamenFisicoPadre,
            unificarCon,
            descripcion,
            display,
            orden,
          })
        ); // Crear un nuevo objeto con los campos requeridos
      }
    }
    // agrego una validacion para los casos que vacian todo "\n"
    if (arrayDto.length > 0 && arrayDto[0].valor !== "\n") {
      asyncUpdEdicionIDB(5, "examenFisico", arrayDto);
      setExamenFisico(arrayDto);
      setOpen(false);
    } else if (arrayDto.length > 0 && arrayDto[0].valor === "\n") {
      asyncUpdEdicionIDB(5, "examenFisico", []);
      setExamenFisico([]);
      setOpen(false);
    } else {
      showToaster(
        {
          texto: "Debe completar al menos 1 campo",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  };

  const buscarItem = (item) => {
    let buscarPadre = dtoExamen.filter(
      (e) => Number(e.id) === item.unificarCon
    );

    if (buscarPadre.length > 0 && buscarPadre[0].valor) {
      return true;
    } else {
      return false;
    }
  };

  const getDisplayType = (string) => {
    if (string.startsWith("TL/")) {
      return "template";
    }
    if (string.includes("=")) {
      return "formula";
    }

    if (
      typeof string === "string" &&
      string !== "" &&
      string !== null &&
      string !== undefined
    ) {
      return "default";
    }
  };

  const handlePaste = (e, display, tipoResultado) => {
    const pastedData = e.clipboardData.getData("text");
    let regex;
    if (tipoResultado === "N") {
      regex = /^[0-9,]+$/; // Solo números
    } else {
      regex = /^[a-zA-Z0-9]+$/; // Solo letras y números
    }
    if (display.includes("=") && !regex.test(pastedData)) {
      //esto se consulta para evitar indeseados en formulas
      if (!regex.test(e.key)) {
        e.preventDefault(); // Previene cualquier carácter que no sea número
      }
    } else if (
      (display.includes(",") || display.includes("/")) &&
      !regex.test(pastedData)
    ) {
      if (tipoResultado === "N") {
        regex = /^[0-9,\/]+$/; // Solo números
      } else {
        regex = /^[a-zA-Z0-9,\/]+$/; // Solo letras y números
      }

      if (!regex.test(e.key)) {
        e.preventDefault(); // Previene cualquier carácter que no sea número, coma o /
      }
    } else {
      if (!regex.test(e.key) && !regex.test(pastedData)) {
        e.preventDefault(); // Previene cualquier carácter que no sea número
      }
    }
  };

  const NestedArray = ({ data, contador }) => {
    return (
      <>
        {data.map((item, index) => (
          <ContainerBoxFila
            opcion={Number(item.idExamenFisicoPadre) !== -1}
            key={index}
          >
            <div className="parent">
              {item.tipoResultado === "A" &&
                item.idExamenFisicoPadre === -1 && (
                  <Abreviatura className={"c-primary rb18b"}>
                    <div className="titulo">{item.descripcion}</div>
                  </Abreviatura>
                )}
            </div>
            <ContainerItems
              hijo={Number(item.idExamenFisicoPadre) !== -1}
              input={item.children === undefined}
            >
              {item.tipoResultado === "A" &&
                item.idExamenFisicoPadre !== -1 && (
                  <Abreviatura className={`c-latex30 rb18b`}>
                    <p
                      className={`${
                        item.tipoResultado === "A" &&
                        item.idExamenFisicoPadre !== -1
                          ? "subtitulo"
                          : ""
                      } `}
                    >
                      {item.descripcion}
                    </p>
                  </Abreviatura>
                )}
              {/* abajo es el caso de item input radio/check */}
              {(item.tipoResultado === "N" ||
                item.tipoResultado === "B" ||
                item.tipoResultado === "T") && (
                <ContainerInput>
                  {item.tipoResultado === "B" &&
                    (item.radioButton === "True" ? (
                      <InputRadio
                        name={item.idExamenFisicoPadre}
                        radioHeight={18}
                        onChange={() =>
                          onChangeRadio(
                            Number(item.id),
                            item.idExamenFisicoPadre,
                            item.radioButton
                          )
                        }
                        checked={isCheckedRadio(Number(item.id))}
                      />
                    ) : (
                      <InputCheck
                        onClick={() => {}}
                        name={Number(item.id)}
                        headerStr={""}
                        onChange={() => onChangeCheck(Number(item.id))}
                        checked={isChecked(Number(item.id))}
                        checboxHeight={16}
                      />
                    ))}

                  <Abreviatura
                    onClick={
                      item.tipoResultado !== "B"
                        ? () => {}
                        : item.radioButton === "1"
                        ? () =>
                            onChangeRadio(
                              Number(item.id),
                              item.idExamenFisicoPadre,
                              item.radioButton
                            )
                        : () => onChangeCheck(Number(item.id))
                    }
                    className={`rb18l c-latex30 ${
                      item.tipoResultado === "B" ? " pointer" : ""
                    }`}
                  >
                    {item.observacion !== "True" && item.descripcion}
                  </Abreviatura>
                  {/* abajo es el caso de ?? */}
                  {(item.tipoResultado === "N" ||
                    item.tipoResultado === "T") && (
                    <>
                      {buscarItem(item) && (
                        <>
                          {item.observacion === "False" ? (
                            <div>{item.descripcion}</div>
                          ) : (
                            ""
                          )}
                          <InputBase
                            property={`nombre${Number(item.id)}`}
                            placeholder={item.display}
                            errorStr="Debe ser una palabra"
                            state={localForm}
                            setState={setLocalForm}
                            isRequired={true}
                            value={item.valor}
                            onChange={(e) =>
                              onChangeInput(e, Number(item.id), item)
                            }
                            onKeyPress={
                              item.tipoResultado === "N"
                                ? (e) => handleKeyPressNumbers(e, item.display)
                                : (e) =>
                                    handleKeyPressTextAndNumbers(
                                      e,
                                      item.display
                                    )
                            }
                            onPaste={(e) =>
                              handlePaste(e, item.display, item.tipoResultado)
                            }
                            extraProperty={{
                              initialValue: "",
                              errorForced: stateRequired.nombre,
                              setErrorForced: setStateRequired,
                              stateRequired: stateRequired,
                              titleStyle: "rb14l c-latexAbm",
                              heightContainer: 34,
                              widthContainer: 100,
                              heightInput: 34,
                              widthInput: 70,
                              textValueStyle: `rb14l c-latex30 widthDrop ${
                                item.display.length > 6 ? "incWidth" : ""
                              }`,
                              maxLength: `${item.display.length > 5 ? 20 : 10}`,
                            }}
                          />
                        </>
                      )}
                      {/* abajo es el caso de item input normal */}
                      {item.unificarCon === -1 &&
                        getDisplayType(item.display) === "default" && (
                          <InputBase
                            property={`nombre${Number(item.id)}`}
                            placeholder={item.display}
                            errorStr="Debe ser una palabra"
                            state={localForm}
                            setState={setLocalForm}
                            isRequired={true}
                            value={item.valor}
                            onChange={(e) =>
                              onChangeInput(e, Number(item.id), item)
                            }
                            onKeyPress={
                              item.tipoResultado === "N"
                                ? (e) => handleKeyPressNumbers(e, item.display)
                                : (e) =>
                                    handleKeyPressTextAndNumbers(
                                      e,
                                      item.display
                                    )
                            }
                            onPaste={(e) =>
                              handlePaste(e, item.display, item.tipoResultado)
                            }
                            extraProperty={{
                              initialValue: "",
                              errorForced: stateRequired.nombre,
                              setErrorForced: setStateRequired,
                              stateRequired: stateRequired,
                              titleStyle: "rb14l c-latexAbm",
                              heightContainer: 34,
                              widthContainer: 100,
                              heightInput: 34,
                              widthInput: 70,
                              textValueStyle: `rb14l c-latex30 widthDrop ${
                                item.display.length > 6 ? "incWidth" : ""
                              }`,
                              maxLength: `${item.display.length > 6 ? 20 : 10}`,
                            }}
                          />
                        )}
                      {/* abajo es el caso de item con formula */}
                      {item.unificarCon === -1 &&
                        getDisplayType(item.display) === "formula" && (
                          <InputBase
                            property={`nombre${Number(item.id)}`}
                            placeholder={
                              item.valor !== null && item.valor !== undefined
                                ? item.valor
                                : ""
                            }
                            errorStr="Debe ser una palabra"
                            state={localForm}
                            setState={setLocalForm}
                            isRequired={true}
                            // value={test}
                            disabled={true}
                            onChange={(e) =>
                              onChangeInput(e, Number(item.id), item)
                            }
                            onKeyPress={
                              item.tipoResultado === "N"
                                ? (e) => handleKeyPressNumbers(e, item.display)
                                : (e) =>
                                    handleKeyPressTextAndNumbers(
                                      e,
                                      item.display
                                    )
                            }
                            onPaste={(e) =>
                              handlePaste(e, item.display, item.tipoResultado)
                            }
                            extraProperty={{
                              initialValue: "",
                              errorForced: stateRequired.nombre,
                              setErrorForced: setStateRequired,
                              stateRequired: stateRequired,
                              titleStyle: "rb14l c-latexAbm",
                              heightContainer: 34,
                              widthContainer: 100,
                              heightInput: 34,
                              widthInput: 70,
                              textValueStyle: `rb14l c-latex30 widthDrop ${
                                item.display.length > 6 ? "incWidth" : ""
                              }`,
                              maxLength: `${item.display.length > 6 ? 20 : 10}`,
                            }}
                          />
                        )}
                      {/* abajo es el caso de item con textarea */}
                      {item.unificarCon === -1 &&
                        getDisplayType(item.display) === "template" && (
                          <>
                            <ContainerExFisicoQuill>
                              <QuillExFisico
                                editorName={"quillExFisico"}
                                heightCustom={380}
                                opcEditorTools={opcEditorTools}
                                startText={startText}
                                contadorLimite={editorCaracLimit}
                                onChangeInput={(e) =>
                                  onChangeInput(e, Number(item.id), item)
                                }
                              />
                            </ContainerExFisicoQuill>
                          </>
                        )}
                    </>
                  )}
                </ContainerInput>
              )}
              {/* abajo es el caso de item hijo. se repite el ciclo */}
              {item.children && item.children.length > 0 && (
                <>
                  <ContainerHijo
                    style={
                      item.children.filter((item) => item.children).length === 0
                        ? {
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                            flexWrap: "wrap",
                          }
                        : {
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                            width: "100%",
                          }
                    }
                  >
                    <NestedArray data={item.children} contador={contador + 1} />
                  </ContainerHijo>
                </>
              )}
            </ContainerItems>
          </ContainerBoxFila>
        ))}
      </>
    );
  };

  return (
    <>
      <Loading
        dataLoading={examenState.examen.loading}
        color={"c-white"}
        descripcion={"Cargando examen físico..."}
      ></Loading>
      {dtoExamen && nestedArray !== null && !examenState.examen.loading && (
        <CerrarCmp
          className="cerrarIcon ts_formDinamico_close-btn"
          onClick={() => setOpen(false)}
        >
          <span className="rb16l c-latex30">Cerrar</span>
          <div>
            {" "}
            <FlechaIzquierdaIcon />
          </div>
        </CerrarCmp>
      )}
      <ContainerForm>
        {dtoExamen && nestedArray !== null && !examenState.examen.loading && (
          <>
            <NestedArray data={nestedArray} contador={0} />
          </>
        )}
      </ContainerForm>
      <ContainerButtons>
        <BtnGuardar
          className="bgc-primary c-white rb16m ts_formDinamico_save-btn"
          onClick={enviar}
        >
          Guardar
        </BtnGuardar>
      </ContainerButtons>
    </>
  );
};

export default ExamenFisico;
