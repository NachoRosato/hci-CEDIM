import { useContext, useEffect, useState } from "react";
import {
  ContainerBox,
  ContainerButtons,
  BtnCerrar,
  MedicamentosBox,
  PresentacionesBox,
  DosisBox,
  CadaBox,
  DuranteBox,
  CheckboxContainer,
  BtnAsignar,
  UnidadesBox,
  UnidadesContainer,
} from "./localStyle";
import { hideModal, showModal } from "global/context/action/modal/modal";
import { GlobalContext } from "global/context/Provider";
import MedicamentoPaso2 from "../MedicamentoPaso2/MedicamentoPaso2";
import {
  listaCada,
  listaDosis,
  listaDurante,
  listaUnidades,
} from "./arrayData";
import { regexNumero } from "global/utils/expresionesRegulares";
import { showToaster } from "global/context/action/toaster/toaster";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import { setFarmacoDtoId } from "./MedicamentoPaso3Fun";
import { updateEvoEditIndexDB } from "_+_HistoriaClinica/pages/Evolucion/EvolucionFun";

const MedicamentoPaso3 = ({
  dissmiss,
  medicamentoSelected,
  setMedicamentoSelected,
  setIndicacionFarmacologica,
  setOpenFarmacos,
  indicacionFarmacologica,
  editar,
}) => {
  const { modalDispatch, toasterDispatch } = useContext(GlobalContext);
  const { vademecumState, pacienteState } = useContext(HistoriaClinicaContext);
  const [inputValues, setInputValues] = useState(
    Array(listaDurante.length).fill("")
  );
  const [inputUnidadesValues, setInputUnidadesValues] = useState(
    listaUnidades.reduce((acc, item) => {
      acc[item.desc] = "";
      return acc;
    }, {})
  );
  const [duranteInputValues, setDuranteInputValues] = useState(null);
  const [selectedDosisOption, setSelectedDosisOption] = useState(null);
  const [selectedCadaOption, setSelectedCadaOption] = useState(null);
  const [selectedDuranteOption, setSelectedDuranteOption] = useState(null);

  const [farmacoDto, setFarmacoDto] = useState({
    activo: "1",
    cadaNoHoras: editar ? medicamentoSelected.cadaNoHoras : null,
    cadaXHoras: editar ? medicamentoSelected.cadaXHoras : "",
    dosis: editar ? medicamentoSelected.dosis : "",
    dosisDescripcion: "",
    durante: editar ? medicamentoSelected.durante : "",
    id: setFarmacoDtoId(
      editar,
      medicamentoSelected,
      vademecumState.vademecum.tipoVademecum
    ),
    idDosisTipo: editar ? medicamentoSelected.idDosisTipo : "",
    idMedicamentoModificado:
      editar && medicamentoSelected.fechaIndicacion
        ? parseInt(medicamentoSelected.id.slice(2))
        : -1,
    idPaciente: pacienteState.paciente.buscarPac.value[0].id,
    idPresentacion: editar
      ? medicamentoSelected.idPresentacion
      : medicamentoSelected.id.toString(),
    idProducto: editar
      ? medicamentoSelected.idProducto
      : medicamentoSelected.producto,
    isEdicion: false,
    nuevo: editar && medicamentoSelected.fechaIndicacion ? "0" : "1",
    producto: editar
      ? medicamentoSelected.producto
      : `${medicamentoSelected.nombre} (${medicamentoSelected.descripcion})`,
    tipoDosisDescripcion: editar
      ? medicamentoSelected.tipoDosisDescripcion
      : "",
    tipoDurante: editar ? medicamentoSelected.tipoDurante : "",
    tipoVademecum: vademecumState.vademecum.tipoVademecum,
  });

  useEffect(() => {
    if (editar) {
      //// setear la "dosis" a editar
      let idDosis = parseInt(medicamentoSelected.idDosisTipo);
      if (idDosis > 6) {
        idDosis = idDosis - 1;
      }
      setSelectedDosisOption(parseInt(idDosis));
      //// setear el "cada" a editar
      //// Si elijo una semana o mes no comparo por cadaXHoras, lo hago por cadaNoHoras
      if (medicamentoSelected.cadaXHoras !== -1) {
        let buscarCada = listaCada.filter(
          (item) =>
            parseInt(item.hora) === parseInt(medicamentoSelected.cadaXHoras)
        );
        setSelectedCadaOption(parseInt(buscarCada[0].id));
      } else {
        let buscarCada = listaCada.filter(
          (item) => item.hora === medicamentoSelected.cadaNoHoras
        );
        setSelectedCadaOption(parseInt(buscarCada[0].id));
      }
      //// setear el "durante" a editar
      let buscarDurante = listaDurante.filter(
        (item) => item.abv === medicamentoSelected.tipoDurante
      );
      if (buscarDurante[0].id > 2) {
        setSelectedDuranteOption(buscarDurante[0].id);
      } else {
        handleInputChange(buscarDurante[0].id, medicamentoSelected.durante);
      }
      // Si tengo seleccionado Unidades seteo cada valor en su input
      if (medicamentoSelected.idDosisTipo === "3") {
        const segments = medicamentoSelected.dosisDescripcion.split(";");
        const arrayDeObjetos = segments
          .filter((segment) => segment.trim() !== "")
          .map((segment) => {
            const [key, value] = segment.split("=");
            const numericValue = parseInt(value.replace(/\D/g, "")); // Elimina letras y convierte en número
            return { [key.trim()]: numericValue };
          });

        // hago un forEach y le envio a cada input su campo y valor
        arrayDeObjetos.forEach((item) => {
          const campo = Object.keys(item)[0];
          const valor = item[campo];
          handleInputChangeUnidades(campo, valor);
        });
      }
    }
  }, [editar]);

  // Uso esto para verificar que los input de DURANTE este completo al
  // menos uno para activar el boton ASIGNAR
  useEffect(() => {
    let buscarItem = inputValues.filter((item) => item !== "");
    if (buscarItem[0] === undefined) {
      setDuranteInputValues(null);
    } else {
      setDuranteInputValues(true);
    }
  }, [inputValues]);

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

  const guardarFarmacologia = () => {
    let farmacosList = [];
    if (indicacionFarmacologica !== undefined) {
      if (editar) {
        let filtrarPreviosActivos = indicacionFarmacologica.filter(
          (item) =>
            item.idProducto === farmacoDto.idProducto && item.activoNoEditable
        );

        let eliminarDup = indicacionFarmacologica.filter(
          (item) => item.idProducto !== farmacoDto.idProducto
        );

        farmacosList = [...eliminarDup];

        if (filtrarPreviosActivos.length > 0) {
          filtrarPreviosActivos[0].nuevo = "0";
          filtrarPreviosActivos[0].activo = "0";
          farmacosList.push(filtrarPreviosActivos[0]);
        }
      } else {
        farmacosList = [...indicacionFarmacologica];
      }
    }

    farmacoDto.activoNoEditable = false;
    farmacoDto.medDescripcion =
      farmacoDto.producto +
      " | " +
      farmacoDto.dosis +
      " " +
      farmacoDto.tipoDosisDescripcion +
      " Cada " +
      descCada(farmacoDto.cadaNoHoras, farmacoDto.cadaXHoras) +
      " | " +
      "Durante: " +
      descDurante(farmacoDto.durante, farmacoDto.tipoDurante);
    //agrego fecha fix //5/10/2021
    farmacoDto.fechaIndicacion = new Date().toISOString();

    farmacosList.push(farmacoDto);
    //cargar en indexDB
    asyncUpdEdicionIDB(5, "indicacionFarmacologica", farmacosList);
    setIndicacionFarmacologica(farmacosList);
    setOpenFarmacos(false);
    showToaster(
      {
        texto: editar
          ? "Indicación editada correctamente"
          : "Indicación generada correctamente",
        tipo: "success",
      },
      "centroArriba"
    )(toasterDispatch);
    dissmiss();
  };

  const descCada = (noHoras, xHoras) => {
    if (noHoras !== "") {
      if (noHoras === "S") {
        return "Semanal";
      } else {
        return "Mensual";
      }
    } else if (xHoras !== "") {
      return xHoras + " hs";
    }
  };

  const descDurante = (durante, tDurante) => {
    if (durante === 0 && tDurante === "V") {
      return "Única Vez";
    } else if (tDurante === "P") {
      return "Permanente";
    } else if (tDurante === "D") {
      return durante + " Día/s";
    } else if (tDurante === "S") {
      return durante + " Semana/s";
    } else {
      return durante + " Mes/es";
    }
  };

  const volverAlPaso2 = () => {
    hideModal()(modalDispatch);
    showModal(
      <MedicamentoPaso2
        indicacionFarmacologica={indicacionFarmacologica}
        medicamentoSelected={medicamentoSelected}
        setMedicamentoSelected={setMedicamentoSelected}
        dissmiss={dissmiss}
        setIndicacionFarmacologica={setIndicacionFarmacologica}
      />,
      "Indicaciones Farmacologicas",
      dissmiss,
      false,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  const handleInputChangeUnidades = (desc, value) => {
    setInputUnidadesValues((prevValues) => ({
      ...prevValues,
      [desc]: value,
    }));
  };

  useEffect(() => {
    // Si elijo dosis en "Unidades" creo el campo dosisDescripcion en el dto
    // y lo lleno con el string
    if (farmacoDto.idDosisTipo === "3") {
      let resultString = "";

      listaUnidades.forEach((item) => {
        resultString += `${item.desc}= ${inputUnidadesValues[item.desc] || 0};`;
      });

      setFarmacoDto({
        ...farmacoDto,
        dosisDescripcion: resultString,
      });
    } else {
      // Si elijo uno distinto a "Unidades" borro el campo del dto
      const { dosisDescripcion, ...newFarmacoDto } = farmacoDto;
      setFarmacoDto(newFarmacoDto);
    }
  }, [inputUnidadesValues, farmacoDto.idDosisTipo]);

  const handleInputChange = (index, value) => {
    const newInputValues = Array(listaDurante.length).fill(""); // Vaciar todos los inputs
    newInputValues[index] = value; // Establecer el valor en el input actual
    setInputValues(newInputValues);
    setSelectedDuranteOption(null);

    setFarmacoDto({
      ...farmacoDto,
      durante: parseInt(value),
      tipoDurante: index === 0 ? "D" : index === 1 ? "S" : "M",
    });
  };

  const handleInputChangeDosis = (e) => {
    const value = e.target.value;

    // Si el valor es vacío, permitir limpiar el campo
    if (value === "") {
      setFarmacoDto({
        ...farmacoDto,
        dosis: "",
      });
      return;
    }

    // Validar si el valor es numérico y no excede 9 dígitos en total (incluyendo decimales) y permite hasta 2 decimales
    const regex = /^\d{1,7}(\.\d{0,2})?$/; // Hasta 7 dígitos enteros y hasta 2 decimales

    if (regex.test(value)) {
      setFarmacoDto({
        ...farmacoDto,
        dosis: parseFloat(value),
      });
    }
  };

  const handleCheckboxChange = (tipo, option) => {
    if (tipo === "D") {
      setSelectedDosisOption(option.id);
      setFarmacoDto({
        ...farmacoDto,
        tipoDosisDescripcion: option.desc,
        idDosisTipo: option.id.toString(),
      });
    } else if (tipo === "C") {
      setSelectedCadaOption(option.id);
      // Hago este if ya que si se elige semanal o mensual debe
      // completarse otro campo
      if (option.id > 4) {
        setFarmacoDto({
          ...farmacoDto,
          cadaNoHoras: option.id === 5 ? "S" : "M",
          cadaXHoras: -1,
        });
      } else {
        setFarmacoDto({
          ...farmacoDto,
          cadaNoHoras: null,
          cadaXHoras: option.hora,
        });
      }
    } else {
      const newInputValues = Array(listaDurante.length).fill("");
      setInputValues(newInputValues);
      setSelectedDuranteOption(option.id);
      setFarmacoDto({
        ...farmacoDto,
        durante: 0,
        tipoDurante: option.id === 3 ? "V" : "P",
      });
    }
  };

  return (
    <>
      {medicamentoSelected && (
        <ContainerBox>
          <MedicamentosBox>
            <p className="rb16l c-latex30">Medicamento seleccionado:</p>
            <p className="rb24b c-latex10">
              {editar
                ? medicamentoSelected.producto
                : `${medicamentoSelected.nombre} - ${medicamentoSelected.descripcion}`}
            </p>
            <p className="rb16l c-latex30">
              Seleccione una de las posibles presentaciones
            </p>
          </MedicamentosBox>
          <PresentacionesBox>
            <DosisBox>
              <p className="textoBox rb16b c-latex30">Dosis</p>
              <div className="input-check-box">
                <input
                  type="number"
                  onChange={(e) => handleInputChangeDosis(e)}
                  value={farmacoDto.dosis}
                  className="inputNonScroll inputDosis rb16m c-latex30"
                  placeholder="ej: 1"
                  min="0"
                  step="0.01"
                  maxLength="6" // Limita a 6 caracteres
                  onKeyDown={(e) => {
                    if (e.key === "-" || e.key === "+") {
                      e.preventDefault(); // Evita signos negativos o positivos
                    }
                  }}
                />

                <CheckboxContainer>
                  {listaDosis.map((item, index) => {
                    return (
                      <div
                        className="radio-text-container c-latex30"
                        key={index}
                      >
                        <input
                          type="checkbox"
                          className="checkbox-style"
                          checked={selectedDosisOption === item.id}
                          onChange={() => handleCheckboxChange("D", item)}
                          name="dosis"
                        />
                        <span>{item.desc}</span>
                      </div>
                    );
                  })}
                </CheckboxContainer>
              </div>
            </DosisBox>
            <CadaBox>
              <p className="textoBox rb16b c-latex30">Cada</p>
              <CheckboxContainer>
                {listaCada.map((item, index) => {
                  return (
                    <div className="radio-text-container c-latex30" key={index}>
                      <input
                        type="checkbox"
                        className="checkbox-style"
                        checked={selectedCadaOption === item.id}
                        onChange={() => handleCheckboxChange("C", item)}
                        name="cada"
                      />
                      <span>{item.desc}</span>
                    </div>
                  );
                })}
              </CheckboxContainer>
            </CadaBox>
            <DuranteBox>
              <p className="textoBox rb16b c-latex30">Durante</p>
              <CheckboxContainer>
                {listaDurante.map((item, index) => {
                  return (
                    <div className="radio-text-container c-latex30" key={index}>
                      {item.id < 3 ? (
                        <input
                          type="number"
                          pattern={regexNumero}
                          value={inputValues[index]}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value)
                          }
                          className="inputNonScroll inputDosis rb16m c-latex30"
                          placeholder="ej: 1"
                        />
                      ) : (
                        <input
                          type="checkbox"
                          className="checkbox-style"
                          checked={selectedDuranteOption === item.id}
                          onChange={() => handleCheckboxChange("DU", item)}
                          name="durante"
                        />
                      )}

                      <span>{item.desc}</span>
                    </div>
                  );
                })}
              </CheckboxContainer>
            </DuranteBox>
          </PresentacionesBox>
          {farmacoDto.idDosisTipo === "3" && (
            <UnidadesBox>
              <UnidadesContainer>
                {listaUnidades.map((item, index) => {
                  return (
                    <div className="radio-text-container c-latex30" key={index}>
                      <span>{item.desc}</span>
                      <input
                        type="number"
                        value={inputUnidadesValues[item.desc]}
                        onChange={(e) =>
                          handleInputChangeUnidades(item.desc, e.target.value)
                        }
                        className="inputNonScroll inputDosis rb16m c-latex30"
                        placeholder="ej: 1"
                      />
                    </div>
                  );
                })}
              </UnidadesContainer>
            </UnidadesBox>
          )}

          <ContainerButtons>
            <BtnCerrar
              onClick={editar ? dissmiss : volverAlPaso2}
              className="rb16b c-white"
            >
              Volver
            </BtnCerrar>
            <BtnAsignar
              activo={
                selectedDosisOption !== null &&
                selectedCadaOption !== null &&
                farmacoDto.dosis !== 0 &&
                farmacoDto.dosis !== "" &&
                (selectedDuranteOption !== null || duranteInputValues !== null)
              }
              onClick={
                selectedDosisOption !== null &&
                selectedCadaOption !== null &&
                farmacoDto.dosis !== 0 &&
                farmacoDto.dosis !== "" &&
                (selectedDuranteOption !== null || duranteInputValues !== null)
                  ? guardarFarmacologia
                  : () => {}
              }
              className={`rb16b c-white ${
                selectedDosisOption !== null &&
                selectedCadaOption !== null &&
                farmacoDto.dosis !== 0 &&
                farmacoDto.dosis !== "" &&
                (selectedDuranteOption !== null || duranteInputValues !== null)
                  ? "bgc-primary"
                  : "bgc-grey65"
              }`}
            >
              {editar ? "Editar" : "Asignar"}
            </BtnAsignar>
          </ContainerButtons>
        </ContainerBox>
      )}
    </>
  );
};

export default MedicamentoPaso3;
