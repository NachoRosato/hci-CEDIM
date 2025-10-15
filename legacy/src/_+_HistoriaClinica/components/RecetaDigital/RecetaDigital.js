import {
  ContainerBox,
  ContainerTitle,
  CerrarCmp,
  IconTitle,
  ContainerBody,
  BoxPaso1,
  OSInputBox,
  OptionBox,
  FlechaContainer,
  Line,
  RecetaBody,
  BtnPaso,
  BtnContainer,
  BoxPaso2,
  ConfigInput,
  DatosConsultorioBox,
  MedicamentoContainer,
  MedicamentoCard,
  FlexRow,
  CantidadBox,
  MatriculaBox,
  IconoBox,
  MatriculasTxt,
} from "./localStyle";
import FlechaIzquierdaIcon from "global/assets/generico/FlechaIzquierdaIcon";
import { useContext, useEffect, useRef, useState } from "react";
import MedicamentoIcon from "global/assets/generico/MedicamentoIcon";
import AddIcon from "global/assets/generico/AddIcon";
import EstetoscopioIcon from "global/assets/generico/EstetoscopioIcon";
import Ayuda from "global/assets/generico/AyudaIcon";
import CalendarIcon from "global/assets/generico/CalendarIcon";
import DatePicker from "global/components/genericos/DatePicker/DatePicker";
import ConfigIcon from "global/assets/generico/ConfigIcon";
import DiagnosticoIcon from "global/assets/generico/DiagnosticoIcon";
import BedIcon from "global/assets/generico/BedIcon";
import EditIcon from "global/assets/generico/EditIcon";
import { hideModal, showModal } from "global/context/action/modal/modal";
import { GlobalContext } from "global/context/Provider";
import MedicamentosReceta from "../MedicamentosReceta/MedicamentosReceta";
import TrashIcon from "global/assets/generico/TrashIcon";
import {
  resetRecetaDigital,
  wsGetFinanciadores,
  wsPostCrearRecetaDig,
} from "_+_HistoriaClinica/context/action/recetaDigital/recetaDigital";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import { showToaster } from "global/context/action/toaster/toaster";
import Mensaje from "global/components/genericos/Mensaje/Mensaje";
import { textoAyuda } from "./txtAyuda";
import { FaCheck } from "react-icons/fa";
import CruzIcon from "global/assets/generico/CruzIcon";
import camelize from "global/utils/camelize";
import RecetaPDF from "../RecetaPDF/RecetaPDF";
import DropdownV2 from "global/components/genericos/DropdownV2/DropdownV2";
import MiPerfilIcon from "global/assets/generico/MiPerfilIcon";
import { updateEvoEditIndexDB } from "_+_HistoriaClinica/pages/Evolucion/EvolucionFun";

const RecetaDigital = ({
  cerrarSlider,
  datosPac,
  setLoadingMedicamentos,
  setLoadingReceta,
  setLoadingGral,
  setOpenReceta,
  setLoadingDeleteRcta,
  setRecetaDigital,
  recetaDigital,
  empresaLogoUrl,
}) => {
  let config = localStorage.getItem("config");
  let opcEmpresa = JSON.parse(config).empresa;

  const { modalDispatch, authState, toasterDispatch } =
    useContext(GlobalContext);
  let itemInfo = JSON.parse(localStorage.getItem("itemInfo"));
  const { evolucionState, recetaDigitalDispatch } = useContext(
    HistoriaClinicaContext
  );
  const [showBox, setShowBox] = useState({
    boxOS: false,
    boxSinCobertura: false,
    boxConsultorio: false,
    box4: false,
  });

  const getTipoDoc = (data) => {
    if (data === "1") {
      return "DNI";
    } else if (data === "2") {
      return "Partida de Nacimiento";
    } else if (data === "3") {
      return "Libreta de Casamiento";
    } else {
      return "Partida de Defunción";
    }
  };

  const setMatricula = () => {
    if (opcEmpresa === "dim") {
      if (authState.auth.data.value.matriculas) {
        let matricula = authState.auth.data.value.matriculas.find(
          (matricula) => matricula.porDefecto === true
        );
        return matricula
          ? `${matricula.tipoMatricula} ${matricula.nroMatricula}`
          : "";
      }
    } else {
      if (authState.auth.data.value.matriculas) {
        let matricula = authState.auth.data.value.matriculas.find(
          (matricula) => matricula.porDefecto === true
        );
        return matricula ? `MN ${matricula.nroMatricula}` : "";
      }
    }
  };

  const [recetaDto, setRecetaDto] = useState({
    paciente: {
      apellido: "",
      nombre: "",
      tipoDoc: getTipoDoc(datosPac?.idTipoDocumento),
      nroDoc: datosPac?.documento,
      sexo: datosPac?.sexo,
      fechaNacimiento: datosPac?.fechaNacimiento,
      cobertura: {
        idFinanciador: "",
        nroFinanciador: "",
        plan: datosPac?.plan,
        numero: datosPac?.nroAfiliado,
        dniTitular: datosPac?.documento,
      },
    },
    medico: {
      apellido: authState?.auth?.data?.value?.apellido,
      nombre: authState?.auth?.data?.value?.nombre,
      tipoDoc: getTipoDoc(authState?.auth?.data?.value?.tipoDoc),
      nroDoc: authState?.auth?.data?.value?.documento,
      especialidad:
        itemInfo.proceso === "edita"
          ? evolucionState?.evolucion?.actual?.value?.especialidad
          : authState?.auth?.data?.value?.especialidad_desc,
      sexo: authState?.auth?.data?.value?.sexo,
      fechaNacimiento: authState?.auth?.data?.value?.fechaNacimiento,
      logoInstitucion: empresaLogoUrl,
      idTributario:
        authState?.auth?.data?.value?.cuit !== null &&
        authState?.auth?.data?.value?.cuit !== undefined
          ? authState?.auth?.data?.value?.cuit
          : "",
      matricula: {
        tipo: "",
        numero: "",
        provincia: "",
      },
      sello: {
        linea1: `${
          authState?.auth?.data?.value?.sexo === "M" ? "Dr." : "Dra."
        } ${camelize(authState?.auth?.data?.value?.nombre)} ${camelize(
          authState?.auth?.data?.value?.apellido
        )}`,
        linea2: camelize(
          itemInfo.proceso === "edita"
            ? evolucionState?.evolucion?.actual?.value?.especialidad
            : authState?.auth?.data?.value?.especialidad_desc
        ),
        linea3: setMatricula(),
      },
      firmalink: "",
      firmabase64: "",
    },
    medicamentos: [],
    recetasPostadatas: {
      cantidad: 0,
      diasAPosdatar: 0,
      fechas: [],
    },
    clienteAppId: "",
    diagnostico: "",
    direccionConsultorio:
      evolucionState?.evolucion?.actual?.value?.consultorio !== null
        ? evolucionState?.evolucion?.actual?.value?.consultorio
        : authState?.auth?.data?.value?.consultorio,
    nombreConsultorio:
      evolucionState?.evolucion?.actual?.value?.centro !== null
        ? evolucionState?.evolucion?.actual?.value?.centro
        : authState?.auth?.data?.value?.centro,
    observaciones: "",
    imprimirDiagnostico: "",
    indicaciones: "",
    fechaEmision: new Date().toISOString(), // Para comentar una línea en JavaScript, se utiliza doble barra "//" al inicio de la línea.
    subemisor: {
      nombre: "",
      cuit: "",
      direccion: "",
      logoLink: "",
      logoBase64: "",
    },
    idpaciente: datosPac?.id,
    idespecialidad: authState?.auth?.data?.value?.idEspecialidad,
    idmedico: authState?.auth?.data?.value?.idMedico,
    idtipomatricula: "",
    idmatriculamedico: "", //idmatricula
    idcentro:
      itemInfo.proceso === "edita"
        ? evolucionState?.evolucion?.actual?.value?.idCentro
        : authState?.auth?.data?.value?.idCentro,
    idEvolucion: evolucionState?.evolucion?.actual?.value?.id,
  });

  // Hook para almacenar las fechas en formato DD/MM/YYYY
  // const [fechasFormatFinal, setFechasFormatFinal] = useState(() => {
  //   const fechaInicial = new Date();
  //   const dia = String(fechaInicial.getDate()).padStart(2, "0");
  //   const mes = String(fechaInicial.getMonth() + 1).padStart(2, "0");
  //   const año = fechaInicial.getFullYear();
  //   return [`${dia}/${mes}/${año}`];
  // });
  const [fechasFormatFinal, setFechasFormatFinal] = useState([]);
  const [page, setPage] = useState(1);
  const [obraSoc, setObraSoc] = useState(false);
  const [prolongado, setProlongado] = useState(false);
  const [edicionMat, setEdicionMat] = useState(false);
  const [edicionPlan, setEdicionPlan] = useState(false);
  const [edicionEsp, setEdicionEsp] = useState(false);
  const [matSelected, setMatSelected] = useState(null);
  const [espSelected, setEspSelected] = useState(null);
  const [planEdited, setPlanEdited] = useState(
    recetaDto.paciente.cobertura.plan
  );

  const [configDropOS, setConfigDropOS] = useState({
    data: [],
    header: "",
    footer: "",
    descripcion: "nombreComercial",
    placeholder: "",
    placeHolderFontSize: 14,
    defaultValue: "",
    defaultValueParametro: "idfinanciador",
    width: 300,
    height: 32,
    cantidadItems: 10,
    maxlength: 100,
    error: false,
    arrow: true,
    search: true,
    disabled: false,
    keyboardNavigation: false,
    showUp: true,
    regex: /^[a-zA-Z\s]+$/,
    buscarPorDefault: true,
    receta: true,
  });
  // const [flgMatricula, setFlgMatricula] = useState(false);
  // const [flgRctaMatricula, setFlgRctaMatricula] = useState(false);
  const hoy = new Date();
  const divRef = useRef(null);

  // Función helper para mostrar toaster de manera segura
  const showToasterSafely = (texto, tipo = "danger") => {
    showToaster(
      {
        texto: texto || "Mensaje",
        tipo: tipo,
      },
      "centroArriba"
    )(toasterDispatch);
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

  const validarName = () => {
    if (
      datosPac.firstName !== null &&
      datosPac.firstName !== "" &&
      datosPac.lastName !== null &&
      datosPac.lastName !== ""
    ) {
      return "";
    } else {
      return datosPac.nombre;
    }
  };

  useEffect(() => {
    setLoadingGral(true);
    let nombre = validarName();
    wsGetFinanciadores(nombre, cargarFinanciadores)(recetaDigitalDispatch);
  }, []);

  const verificarDatos = () => {
    if (recetaDto.medicamentos.length === 0) {
      showToasterSafely("Debe agregar al menos un medicamento.");
      return false;
    }
    if (
      recetaDto.paciente.nombre === "" ||
      recetaDto.paciente.apellido === ""
    ) {
      showToasterSafely("Debe completar los datos del paciente.");
      return false;
    }
    if (
      recetaDto.paciente.cobertura.idFinanciador === "" &&
      obraSoc === false
    ) {
      showToasterSafely("Debe seleccionar al menos 1 cobertura válida.");
      return false;
    }
    if (recetaDto.medico.matricula.numero === "") {
      showToasterSafely(
        "No posee una Matricula activa. Por favor comunicarse con la recepción mas cercana."
      );
      return false;
    }
    setPage(2);
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      divRef.current.focus(); // Si el div es focusable
    }
    return true;
  };

  const cargarFinanciadores = (isCorrect, data) => {
    if (isCorrect) {
      const searchOS = data?.value?.financiadores.financiadores.find(
        (item) => item.nombreComercial === "AMSA"
      );

      setRecetaDto((prevState) => ({
        ...prevState,
        paciente: {
          ...prevState.paciente,
          apellido:
            datosPac?.lastName !== null && datosPac?.lastName !== ""
              ? datosPac?.lastName
              : data?.value?.nombrePaciente?.apellido,
          nombre:
            datosPac?.firstName !== null && datosPac?.firstName !== ""
              ? datosPac?.firstName
              : data?.value?.nombrePaciente?.nombre,
        },
      }));

      setConfigDropOS({
        ...configDropOS,
        data: data?.value?.financiadores.financiadores,
      });

      if (searchOS) {
        setRecetaDto({
          ...recetaDto,
          paciente: {
            ...recetaDto.paciente,
            cobertura: {
              ...recetaDto.paciente.cobertura,
              nroFinanciador: searchOS.nrofinanciador,
              idFinanciador: searchOS.idfinanciador.toString(),
            },
          },
        });
      }
      setMatriculaInicial();
    } else {
      showToasterSafely("Error al cargar financiadores.");
      setOpenReceta(false);
    }
    setLoadingGral(false);
  };

  const showModalMedicamentos = () => {
    if (recetaDto.medicamentos.length <= 1) {
      showModal(
        <MedicamentosReceta
          agregarMedicamento={agregarMedicamento}
          setLoadingMedicamentos={setLoadingMedicamentos}
        />,
        "Medicamentos",
        dissmiss,
        false,
        [],
        "centro",
        true
      )(modalDispatch);
    } else {
      showToasterSafely(
        "Alcanzó el límite de medicamentos permitidos por receta"
      );
    }
  };

  const modalAyuda = (name) => {
    const textoModal = textoAyuda(name);
    showModal(
      <Mensaje texto={textoModal} />,
      "Información",
      dissmiss,
      false,
      [
        {
          text: "Aceptar",
          clase: "btn-Mensaje bgc-latex30 rb16m c-white",
          accion: dissmiss,
        },
      ],
      "centro",
      true
    )(modalDispatch);
  };

  const agregarMedicamento = (medicamento) => {
    let dtoMedicamento = {
      nombreProducto: medicamento.nombreProducto,
      nombreDroga: medicamento.nombreDroga,
      presentacion: medicamento.presentacion,
      cantidad: 1,
      permiteSustitucion: "", // Permitir sustitución
      regNo: medicamento.regNo,
      tratamiento: 0,
      diagnostico: "",
      codigoDiagnostico: "", // Código del diagnóstico para diabetes
      posologia: "",
      observaciones: "",
      requiereDuplicado: medicamento.requiereDuplicado,
    };

    if (
      recetaDto.medicamentos.some(
        (m) =>
          m.nombreProducto === medicamento.nombreProducto &&
          m.presentacion === medicamento.presentacion
      )
    ) {
      showToasterSafely(
        "El medicamento ya se encuentra en la receta, por favor seleccione otro."
      );
      return;
    }

    setRecetaDto({
      ...recetaDto,
      medicamentos: [...recetaDto.medicamentos, dtoMedicamento],
    });
    dissmiss();
  };

  const eliminarMedicamento = (key) => {
    const medicamentos = recetaDto.medicamentos.filter((item, index) => {
      return index !== key;
    });
    setRecetaDto({ ...recetaDto, medicamentos });
  };

  const dissmiss = () => {
    resetRecetaDigital()(recetaDigitalDispatch);
    hideModal()(modalDispatch);
  };

  const nuevaFecha = () => {
    const fechas = recetaDto.recetasPostadatas.fechas;

    // Si el array está vacío, generar la primera fecha (1 mes desde hoy)
    let nuevaFecha;
    if (fechas.length === 0) {
      nuevaFecha = new Date();
      nuevaFecha.setMonth(nuevaFecha.getMonth() + 1);
    } else {
      // Si hay fechas, generar la siguiente fecha (1 mes desde la última)
      const ultimaFecha = new Date(fechas[fechas.length - 1]);
      nuevaFecha = new Date(ultimaFecha);
      nuevaFecha.setMonth(nuevaFecha.getMonth() + 1);
    }

    // Agregar la nueva fecha en formato ISO al recetaDto
    const fechasActualizadas = [...fechas, nuevaFecha.toISOString()];
    setRecetaDto({
      ...recetaDto,
      recetasPostadatas: {
        ...recetaDto.recetasPostadatas,
        fechas: fechasActualizadas,
        cantidad: 0,
      },
    });

    // Convertir a formato DD/MM/YYYY y agregar al hook fechasFormatFinal
    const dia = String(nuevaFecha.getDate()).padStart(2, "0");
    const mes = String(nuevaFecha.getMonth() + 1).padStart(2, "0");
    const año = nuevaFecha.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${año}`;

    setFechasFormatFinal((prevFechas) => [...prevFechas, fechaFormateada]);
  };

  const eliminarFecha = () => {
    const fechas = recetaDto.recetasPostadatas.fechas;
    const fechasActualizadas = fechas.slice(0, -1);
    setRecetaDto({
      ...recetaDto,
      recetasPostadatas: {
        ...recetaDto.recetasPostadatas,
        fechas: fechasActualizadas,
        cantidad: 0,
      },
    });

    // También eliminar la última fecha del hook fechasFormatFinal
    setFechasFormatFinal((prevFechas) => prevFechas.slice(0, -1));
  };

  const onChangeBox = (name) => {
    setShowBox({ ...showBox, [name]: !showBox[name] });
  };

  const onChangeProlongado = () => {
    setProlongado(!prolongado);
    const updatedMedicamentos = recetaDto.medicamentos?.map((medicamento) => {
      return {
        ...medicamento,
        tratamiento: !prolongado ? 1 : 0,
      };
    });
    setRecetaDto({ ...recetaDto, medicamentos: updatedMedicamentos });
  };

  const onChangInput = (e, key) => {
    if (key !== undefined) {
      const updatedMedicamentos = recetaDto.medicamentos?.map(
        (medicamento, index) => {
          if (index === key) {
            return {
              ...medicamento,
              [e.target.name]: e.target.value,
            };
          }
          return medicamento;
        }
      );
      setRecetaDto({ ...recetaDto, medicamentos: updatedMedicamentos });
    } else {
      setRecetaDto({ ...recetaDto, [e.target.name]: e.target.value });
    }
  };

  const onChangeNombre = (e) => {
    setRecetaDto({
      ...recetaDto,
      paciente: {
        ...recetaDto.paciente,
        [e.target.name]: e.target.value,
      },
    });
  };

  const onClickCantidad = (e, key, suma) => {
    const updatedMedicamentos = recetaDto.medicamentos?.map(
      (medicamento, index) => {
        if (index === key) {
          return {
            ...medicamento,
            cantidad: suma
              ? medicamento.cantidad + 1
              : medicamento.cantidad - 1 > 0
              ? medicamento.cantidad - 1
              : 1,
          };
        }
        return medicamento;
      }
    );
    setRecetaDto({ ...recetaDto, medicamentos: updatedMedicamentos });
  };

  const onChangeOS = (obraSoc) => {
    setObraSoc(obraSoc);
    setRecetaDto({
      ...recetaDto,
      paciente: {
        ...recetaDto.paciente,
        cobertura: {
          ...recetaDto.paciente.cobertura,
          nroFinanciador: "",
          idFinanciador: "",
        },
      },
    });
  };

  const onChangeFecha = (date, key) => {
    const updatedFechas = recetaDto.recetasPostadatas.fechas?.map(
      (item, index) => {
        if (index === key) {
          return new Date(date).toISOString();
        }
        return item;
      }
    );
    setRecetaDto({
      ...recetaDto,
      recetasPostadatas: {
        ...recetaDto.recetasPostadatas,
        fechas: updatedFechas,
      },
    });

    // También actualizar la fecha correspondiente en fechasFormatFinal
    const nuevaFecha = new Date(date);
    const dia = String(nuevaFecha.getDate()).padStart(2, "0");
    const mes = String(nuevaFecha.getMonth() + 1).padStart(2, "0");
    const año = nuevaFecha.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${año}`;

    setFechasFormatFinal((prevFechas) =>
      prevFechas.map((fecha, index) =>
        index === key ? fechaFormateada : fecha
      )
    );
  };

  // Función específica para manejar la fecha de emisión
  const onChangeFechaEmision = (date) => {
    setRecetaDto({
      ...recetaDto,
      fechaEmision: new Date(date).toISOString(),
    });
  };

  const onChangeCobertura = (e) => {
    setPlanEdited(e.target.value);
  };

  const onChageSustitucion = (e, key) => {
    const updatedMedicamentos = recetaDto.medicamentos?.map(
      (medicamento, index) => {
        if (index === key) {
          return {
            ...medicamento,
            permiteSustitucion:
              e.target.name === "sustituir"
                ? e.target.checked
                  ? "N"
                  : ""
                : e.target.checked
                ? "S"
                : "",
          };
        }
        return medicamento;
      }
    );
    setRecetaDto({ ...recetaDto, medicamentos: updatedMedicamentos });
  };

  const onChangeEspecialidad = (e) => {
    setEspSelected(e);
  };

  const cambiarEspecialidad = () => {
    if (espSelected) {
      setRecetaDto({
        ...recetaDto,
        medico: {
          ...recetaDto.medico,
          especialidad: espSelected.idEspecialidad_desc,
          sello: {
            ...recetaDto.medico.sello,
            linea2: camelize(espSelected.idEspecialidad_desc),
            linea3: setMatricula(),
          },
        },
        idespecialidad: espSelected.idEspecialidad,
      });
      setEdicionEsp(false);
    }
  };

  const onChangeMatricula = (e) => {
    setMatSelected(e);
  };

  const cambiarMatricula = () => {
    if (matSelected) {
      let dtoMatricula = {
        tipo: matSelected.tipoMatricula,
        numero: matSelected.nroMatricula,
        provincia: matSelected.tipoMatricula === "MP" ? "Buenos Aires" : "",
      };
      setRecetaDto({
        ...recetaDto,
        medico: {
          ...recetaDto.medico,
          matricula: dtoMatricula,
        },
        idtipomatricula: matSelected.tipoMatricula === "MP" ? 1 : 2,
        idmatriculamedico: matSelected.id,
      });
      setEdicionMat(false);
    }
  };

  const cambiarPlan = () => {
    setRecetaDto({
      ...recetaDto,
      paciente: {
        ...recetaDto.paciente,
        cobertura: {
          ...recetaDto.paciente.cobertura,
          plan: planEdited,
        },
      },
    });
    setEdicionPlan(false);
  };

  const guardarReceta = () => {
    if (recetaDto.diagnostico !== "") {
      setLoadingReceta(true);

      // Crear una copia del recetaDto y reemplazar las fechas con el formato DD/MM/YYYY
      const recetaDtoParaEnviar = {
        ...recetaDto,
        recetasPostadatas: {
          ...recetaDto.recetasPostadatas,
          fechas: fechasFormatFinal,
        },
      };
      wsPostCrearRecetaDig(
        recetaDtoParaEnviar,
        nextStep
      )(recetaDigitalDispatch);
    } else {
      showToasterSafely("Debe completar el diagnostico general de la receta");
    }
  };

  const nextStep = (isCorrect, data) => {
    if (isCorrect) {
      const mensaje =
        data?.value && Array.isArray(data.value) && data.value.length > 1
          ? `${data.value.length} recetas generadas correctamente.`
          : "Receta generada correctamente.";

      showToaster(
        {
          texto: mensaje,
          tipo: "success",
        },
        "centroArriba"
      )(toasterDispatch);

      setOpenReceta(false);

      // Verificar si data.value es un array (múltiples recetas) o un objeto (una sola receta)
      const recetasArray = Array.isArray(data?.value)
        ? data.value
        : data?.value
        ? [data.value]
        : [];

      // Crear las nuevas recetas
      const nuevasRecetas = recetasArray.map((receta, index) => ({
        id: receta?.idRcta,
        descripcion:
          receta?.medicamentos
            ?.map(
              (med) =>
                `Medicamento: ${med?.nombreProducto || ""} (${
                  med?.nombreDroga || ""
                }) - ` +
                `Cantidad: ${med?.cantidad || 0}, ` +
                `Presentación: ${med?.presentacion || ""}, ` +
                `Diagnóstico: ${med?.diagnostico || ""}, ` +
                `Observaciones: ${med?.observaciones || ""}, ` +
                `Posología: ${med?.posologia || ""}`
            )
            .join(" | ") || "",
        // Agregar información adicional para identificar múltiples recetas
        numeroReceta: recetasArray.length > 1 ? index + 1 : null,
        linkPdf: receta?.linkPdf,
        medicamentos: receta?.medicamentos || [],
        idRcta: receta?.idRcta,
        idexterno: receta?.idexterno,
      }));

      // Actualizar el estado con las nuevas recetas sin perder las anteriores
      let auxRecetas = recetaDigital || [];
      auxRecetas.push(...nuevasRecetas);
      setRecetaDigital(auxRecetas);
      asyncUpdEdicionIDB(5, "recetaDigital", auxRecetas);

      // Mostrar el modal unificado para una o múltiples recetas
      if (recetasArray.length > 0) {
        showModal(
          <RecetaPDF
            dissmiss={dissmiss}
            dataReceta={recetasArray[0]}
            pdf={recetasArray[0]?.linkPdf}
            obtenerRecetas={() => {}}
            setLoadingDeleteRcta={setLoadingDeleteRcta}
            updateArrRecetas={updateArrRecetas}
            recetas={recetasArray}
            isCreationContext={true}
          />,
          recetasArray.length === 1
            ? `Receta Digital`
            : `Recetas Digitales (${recetasArray.length})`,
          dissmiss,
          false,
          {},
          "centro",
          true
        )(modalDispatch);
      }
    } else {
      // Manejo más robusto de errores
      let errorMessage = "Error al generar la receta.";

      if (data) {
        if (data.error?.errorMessage) {
          errorMessage = data.error.errorMessage;
        } else if (data.errorMessage) {
          errorMessage = data.errorMessage;
        } else if (typeof data === "string") {
          errorMessage = data;
        } else if (data.detail) {
          errorMessage = data.detail;
        }
      }

      showToasterSafely(errorMessage);
    }
    setLoadingReceta(false);
  };

  const updateArrRecetas = (idReceta) => {
    let auxRecetas = recetaDigital.filter(
      (receta) => receta.idRcta !== idReceta
    );

    setRecetaDigital(auxRecetas);
    asyncUpdEdicionIDB(5, "recetaDigital", auxRecetas);
  };

  const onChangeDataOS = (e) => {
    setRecetaDto({
      ...recetaDto,
      paciente: {
        ...recetaDto.paciente,
        cobertura: {
          ...recetaDto.paciente.cobertura,
          nroFinanciador: e.nrofinanciador,
          idFinanciador: e.idfinanciador.toString(),
        },
      },
    });
    setConfigDropOS({
      ...configDropOS,
      defaultValue: e.idfinanciador,
    });
    setObraSoc(false);
  };

  //logica validacion Matricula
  const setMatriculaInicial = () => {
    let dtoMatricula = {
      tipo: validarTipoMatricula(),
      numero: validarNroMatricula(),
      provincia: validarTipoMatricula() === "MP" ? "Buenos Aires" : "",
    };

    setRecetaDto((prevState) => ({
      ...prevState,
      medico: {
        ...prevState.medico,
        matricula: dtoMatricula,
      },
      idtipomatricula: dtoMatricula.tipo === "MP" ? 1 : 2,
      idmatriculamedico: validarIdMatricula(),
    }));
  };

  const validarNroMatricula = () => {
    if (authState?.auth?.data?.value?.matriculas !== null) {
      let matricula = authState.auth.data.value.matriculas.find(
        (matricula) => matricula.porDefecto === true
      );

      if (matricula !== undefined && matricula !== null) {
        return matricula.nroMatricula;
      } else if (authState?.auth?.data?.value?.matriculas !== null) {
        return authState?.auth?.data?.value?.matriculas[0]?.nroMatricula;
      } else {
        return "";
      }
    }
  };

  const validarTipoMatricula = () => {
    if (opcEmpresa === "dim") {
      if (authState?.auth?.data?.value?.matriculas !== null) {
        let matricula = authState.auth.data.value.matriculas.find(
          (matricula) => matricula.porDefecto === true
        );
        if (matricula !== undefined && matricula !== null) {
          return matricula.tipoMatricula;
        } else if (authState?.auth?.data?.value?.matriculas !== null) {
          return authState?.auth?.data?.value?.matriculas[0]?.tipoMatricula;
        } else {
          return "";
        }
      }
    } else {
      return "MN";
    }
  };

  const validarIdMatricula = () => {
    if (authState?.auth?.data?.value?.matriculas !== null) {
      let matricula = authState.auth.data.value.matriculas.find(
        (matricula) => matricula.porDefecto === true
      );
      if (matricula !== undefined && matricula !== null) {
        return matricula.id;
      } else if (authState?.auth?.data?.value?.matriculas !== null) {
        return authState?.auth?.data?.value?.matriculas[0]?.id;
      } else {
        return 0;
      }
    }
  };

  const obtenerMatTxt = () => {
    if (opcEmpresa === "dim") {
      return (
        <MatriculasTxt>
          {authState.auth.data.value.matriculas?.map((matricula, index) => (
            <p key={index} className="rb16m">
              {matricula.tipoMatricula} {matricula.nroMatricula}
            </p>
          ))}
        </MatriculasTxt>
      );
    } else {
      return (
        <MatriculasTxt>
          {authState.auth.data.value.matriculas?.map((matricula, index) => (
            <p key={index} className="rb16m">
              MN {matricula.nroMatricula}
            </p>
          ))}
        </MatriculasTxt>
      );
    }
  };

  return (
    <>
      <CerrarCmp className="cerrarIcon" onClick={() => cerrarSlider()}>
        <span className="rb16l c-latex30">Cerrar</span>{" "}
        <div>
          <FlechaIzquierdaIcon />{" "}
        </div>
      </CerrarCmp>
      <RecetaBody>
        <span className="rb24t title">Crear Receta</span>
        {page === 1 ? (
          <BoxPaso1>
            <ContainerBox ref={divRef} tabIndex={-1}>
              <ContainerTitle>
                <IconTitle>
                  <MiPerfilIcon color={"var(--color-latex30)"} />
                  <p className={"rb16m"}>Paciente</p>
                </IconTitle>
              </ContainerTitle>
              <ContainerBody>
                <p>Nombre</p>
                <input
                  type="text"
                  name="nombre"
                  className="nombreInput"
                  value={recetaDto.paciente.nombre}
                  maxLength={50}
                  onChange={(e) => onChangeNombre(e)}
                />
                <p>Apellido</p>
                <input
                  type="text"
                  name="apellido"
                  className="nombreInput"
                  value={recetaDto.paciente.apellido}
                  maxLength={50}
                  onChange={(e) => onChangeNombre(e)}
                />
              </ContainerBody>
            </ContainerBox>
            <ContainerBox>
              <ContainerTitle>
                <IconTitle>
                  <EstetoscopioIcon
                    background={"transparent"}
                    color={"var(--color-latex30)"}
                  />
                  <p className={"rb16m"}>Perfiles de Recetas</p>
                </IconTitle>
                <div className="pointer" onClick={() => modalAyuda("Perfil")}>
                  <Ayuda color={"var(--color-latex30)"} />
                </div>
              </ContainerTitle>
              <ContainerBody>
                <OptionBox>
                  <OSInputBox>
                    <p>Consultorio</p>
                  </OSInputBox>
                  <FlechaContainer
                    onClick={() => onChangeBox("boxConsultorio")}
                    $rotate={showBox.boxConsultorio ? 1 : 0}
                    id={"flecha"}
                  >
                    <FlechaIzquierdaIcon color={"var(--color-latex30)"} />
                  </FlechaContainer>
                </OptionBox>
                {showBox.boxConsultorio && (
                  <>
                    {/* <DatosConsultorioBox>
                      <p className="rb14l">Profesión</p>
                      <p className="rb16m">Medica</p>
                    </DatosConsultorioBox> */}
                    <DatosConsultorioBox>
                      <div className="matriculaBox">
                        <p className="rb14l">Especialidades</p>
                        <div className="iconContainer">
                          {edicionEsp ? (
                            <>
                              <IconoBox
                                className="pointer"
                                onClick={() => cambiarEspecialidad()}
                              >
                                <FaCheck color="green"></FaCheck>
                              </IconoBox>
                              <IconoBox
                                className="pointer"
                                onClick={() => setEdicionEsp(false)}
                              >
                                <CruzIcon color="red" size={14}></CruzIcon>
                              </IconoBox>
                            </>
                          ) : authState?.auth?.data?.value?.especialidades !==
                            null ? (
                            <IconoBox
                              className="pointer"
                              onClick={() => setEdicionEsp(true)}
                            >
                              <EditIcon
                                color={"var(--color-latex30)"}
                                size={14}
                              />
                            </IconoBox>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      {edicionEsp ? (
                        <MatriculaBox>
                          <div className="especialidadRadio">
                            {authState?.auth?.data?.value?.especialidades?.map(
                              (item, key) => {
                                return (
                                  <div
                                    key={key}
                                    className="inputContainer pointer"
                                  >
                                    <input
                                      type="radio"
                                      name="especialidad"
                                      id={item.id}
                                      value={item.id}
                                      className="rb14l pointer"
                                      onChange={() =>
                                        onChangeEspecialidad(item)
                                      }
                                      checked={espSelected?.id === item.id}
                                    />
                                    <label
                                      htmlFor={item.id}
                                      className="rb16m pointer"
                                    >
                                      {camelize(item.idEspecialidad_desc)}
                                    </label>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </MatriculaBox>
                      ) : (
                        <p className="rb16m">
                          {camelize(recetaDto.medico.especialidad)}
                        </p>
                      )}
                    </DatosConsultorioBox>
                    <DatosConsultorioBox>
                      <div className="matriculaBox">
                        <p className="rb14l">Tipo de Matrícula</p>{" "}
                        <div className="iconContainer">
                          {edicionMat ? (
                            <>
                              <IconoBox
                                className="pointer"
                                onClick={() => cambiarMatricula()}
                              >
                                <FaCheck color="green"></FaCheck>
                              </IconoBox>
                              <IconoBox
                                className="pointer"
                                onClick={() => setEdicionMat(false)}
                              >
                                <CruzIcon color="red" size={14}></CruzIcon>
                              </IconoBox>
                            </>
                          ) : (
                            <IconoBox
                              className="pointer"
                              onClick={() => setEdicionMat(true)}
                            >
                              <EditIcon
                                color={"var(--color-latex30)"}
                                size={14}
                              />
                            </IconoBox>
                          )}
                        </div>
                      </div>
                      {edicionMat ? (
                        <MatriculaBox>
                          <div className="matriculaRadio">
                            {authState?.auth?.data?.value?.matriculas?.map(
                              (item, key) => {
                                return (
                                  <div
                                    key={key}
                                    className="inputContainer pointer"
                                  >
                                    <input
                                      type="radio"
                                      name="matricula"
                                      id={item.tipoMatricula}
                                      value={item.tipoMatricula}
                                      className="rb14l pointer"
                                      onChange={() => onChangeMatricula(item)}
                                      checked={
                                        matSelected?.tipoMatricula ===
                                        item.tipoMatricula
                                      }
                                    />
                                    <label
                                      htmlFor={item.tipoMatricula}
                                      className="rb16m pointer"
                                    >
                                      {item.tipoMatricula}
                                    </label>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </MatriculaBox>
                      ) : (
                        <p className="rb16m">
                          {recetaDto.medico.matricula.tipo}
                        </p>
                      )}
                    </DatosConsultorioBox>
                    <DatosConsultorioBox>
                      <p className="rb14l">Nro. Matrícula</p>
                      <p className="rb16m">
                        {recetaDto.medico.matricula.numero}
                      </p>
                    </DatosConsultorioBox>
                    <DatosConsultorioBox>
                      <p className="rb14l">Jurisdicción</p>
                      <p className="rb16m">
                        {recetaDto.medico.matricula.tipoMatricula === "MP"
                          ? "Buenos Aires"
                          : "Argentina"}
                      </p>
                    </DatosConsultorioBox>
                    <DatosConsultorioBox>
                      <p className="rb14l">Texto del Sello</p>
                      <p className="rb16m">{`${
                        authState?.auth?.data?.value?.sexo === "M"
                          ? "Dr."
                          : "Dra."
                      } ${camelize(
                        authState?.auth?.data?.value?.nombre
                      )} ${camelize(
                        authState?.auth?.data?.value?.apellido
                      )}`}</p>
                      <p className="rb16m">{recetaDto.medico.especialidad}</p>

                      {obtenerMatTxt()}
                    </DatosConsultorioBox>
                    <DatosConsultorioBox>
                      <p className="rb14l">Dirección de la receta</p>
                      <p className="rb16m">{recetaDto.nombreConsultorio}</p>
                    </DatosConsultorioBox>
                  </>
                )}
              </ContainerBody>
            </ContainerBox>
            <ContainerBox>
              <ContainerTitle>
                <IconTitle>
                  <EstetoscopioIcon
                    background={"transparent"}
                    color={"var(--color-latex30)"}
                  />
                  <p className={"rb16m"}>Coberturas Médicas</p>
                </IconTitle>
                <div
                  className="pointer"
                  onClick={() => modalAyuda("Cobertura")}
                >
                  <Ayuda color={"var(--color-latex30)"} />
                </div>
              </ContainerTitle>
              <ContainerBody>
                <OptionBox>
                  <OSInputBox>
                    <DropdownV2
                      config={configDropOS}
                      onClick={onChangeDataOS}
                    />
                  </OSInputBox>
                  <FlechaContainer
                    onClick={() => onChangeBox("boxOS")}
                    $rotate={showBox.boxOS ? 1 : 0}
                    id={"flecha"}
                  >
                    <FlechaIzquierdaIcon color={"var(--color-latex30)"} />
                  </FlechaContainer>
                </OptionBox>
                {showBox.boxOS && (
                  <>
                    <div className="planMedicoBox">
                      <p className="rb14l">Plan Médico:</p>
                      {edicionPlan ? (
                        <>
                          <IconoBox
                            className="pointer"
                            onClick={() => cambiarPlan()}
                          >
                            <FaCheck color="green"></FaCheck>
                          </IconoBox>
                          <IconoBox
                            className="pointer"
                            onClick={() => {
                              setEdicionPlan(false);
                              setPlanEdited(recetaDto.paciente.cobertura.plan);
                            }}
                          >
                            <CruzIcon color="red" size={14}></CruzIcon>
                          </IconoBox>
                        </>
                      ) : (
                        <IconoBox
                          className="pointer"
                          onClick={() => setEdicionPlan(true)}
                        >
                          <EditIcon color={"var(--color-latex30)"} size={14} />
                        </IconoBox>
                      )}
                    </div>
                    {edicionPlan ? (
                      <input
                        type="text"
                        value={planEdited}
                        maxLength={45}
                        className="coberturaInput rb16m"
                        onChange={onChangeCobertura}
                        autoComplete="off"
                        name="plan"
                      />
                    ) : (
                      <p className="rb16m">
                        {recetaDto.paciente.cobertura.plan}
                      </p>
                    )}

                    <p className="rb14l">N° de Afiliado:</p>
                    <p className="rb16m">{datosPac?.nroAfiliado}</p>
                  </>
                )}

                <Line />
                <OptionBox>
                  <OSInputBox onClick={() => onChangeOS(!obraSoc)}>
                    <input
                      type="checkbox"
                      onChange={() => onChangeOS(!obraSoc)}
                      className="inputConfig"
                      checked={obraSoc}
                    />
                    <p>Sin cobertura</p>
                  </OSInputBox>
                </OptionBox>
              </ContainerBody>
            </ContainerBox>
            <ContainerBox>
              <ContainerTitle>
                <IconTitle>
                  <CalendarIcon color={"var(--color-latex30)"} />
                  <p className={"rb16m"}>Fecha de Emisión</p>
                </IconTitle>
                <div
                  className="pointer"
                  onClick={() => modalAyuda("FechaEmision")}
                >
                  <Ayuda color={"var(--color-latex30)"} />
                </div>
              </ContainerTitle>
              <ContainerBody>
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
                  onChange={onChangeFechaEmision}
                  selectedFecha={recetaDto.fechaEmision}
                  checkError={"fecha incorrecta"}
                  errorStr="La fecha es requerida"
                  isRequired={false}
                  posicion={"absolute"}
                  botones={true}
                  background={true}
                  customCss={"rb16l"}
                />
              </ContainerBody>
            </ContainerBox>
            <ContainerBox>
              <ContainerTitle>
                <IconTitle>
                  <CalendarIcon color={"var(--color-latex30)"} />
                  <p className={"rb16m"}>Agregue una fecha a posdatar</p>
                </IconTitle>
                <div className="pointer" onClick={() => modalAyuda("Fecha")}>
                  <Ayuda color={"var(--color-latex30)"} />
                </div>
              </ContainerTitle>
              <ContainerBody>
                {recetaDto.recetasPostadatas?.fechas?.length > 0 &&
                  recetaDto.recetasPostadatas?.fechas?.map((item, key) => {
                    return (
                      <div key={key}>
                        <DatePicker
                          fechaInicial={`${hoy.getFullYear()} ${
                            hoy.getMonth() + 1 >= 10
                              ? hoy.getMonth() + 1
                              : `0${hoy.getMonth() + 1}`
                          } ${
                            hoy.getDate() >= 10
                              ? hoy.getDate()
                              : `0${hoy.getDate()}`
                          }`}
                          fechaFinal={`${hoy.getFullYear() + 1} ${
                            hoy.getMonth() + 1 >= 10
                              ? hoy.getMonth() + 1
                              : `0${hoy.getMonth() + 1}`
                          } ${
                            hoy.getDate() >= 10
                              ? hoy.getDate()
                              : `0${hoy.getDate()}`
                          }`}
                          onChange={(e) => onChangeFecha(e, key)}
                          selectedFecha={item}
                          checkError={"fecha incorrecta"}
                          errorStr="La fecha es requerida"
                          isRequired={false}
                          posicion={"absolute"}
                          botones={true}
                          background={true}
                          customCss={"rb16l"}
                        />
                      </div>
                    );
                  })}
                {recetaDto.recetasPostadatas?.fechas?.length > 0 && (
                  <p
                    className="fechaTxt rb16m pointer c-danger"
                    onClick={() => eliminarFecha()}
                  >
                    Eliminar Fecha
                  </p>
                )}
                <p
                  className="fechaTxt rb16m pointer"
                  onClick={() => nuevaFecha()}
                >
                  Añadir Fecha
                </p>
              </ContainerBody>
            </ContainerBox>
            <ContainerBox>
              <ContainerTitle>
                <IconTitle>
                  <MedicamentoIcon color={"var(--color-latex30)"} />
                  <p className={"rb16m"}>Medicamentos</p>
                </IconTitle>
                <div className="boxAdd pointer" onClick={showModalMedicamentos}>
                  <AddIcon color={"var(--color-latex30)"} size={40} />
                </div>
              </ContainerTitle>
              <ContainerBody>
                <MedicamentoContainer>
                  {recetaDto.medicamentos.length > 0 ? (
                    recetaDto.medicamentos?.map((item, key) => {
                      return (
                        <div key={key}>
                          <MedicamentoCard>
                            <FlexRow>
                              <div>
                                <span
                                  style={{
                                    textDecoration:
                                      item.permiteSustitucion === "N"
                                        ? "underline"
                                        : item.permiteSustitucion === "S"
                                        ? "line-through"
                                        : "",
                                  }}
                                >
                                  {item.nombreProducto}{" "}
                                </span>{" "}
                                <span> {`(${item.nombreDroga})`}</span>
                                <span> {item.presentacion}</span>
                              </div>
                              <div
                                className="trashBox pointer"
                                onClick={() => eliminarMedicamento(key)}
                              >
                                <TrashIcon color={"red"} />
                              </div>
                            </FlexRow>
                            <FlexRow>
                              <p>Recetar sólo genérico</p>
                              <input
                                type="checkbox"
                                name="generico"
                                onChange={(e) => onChageSustitucion(e, key)}
                                className="checkMedicamento"
                                checked={item.permiteSustitucion === "S"}
                              />
                            </FlexRow>
                            <FlexRow>
                              <p>No sustituir</p>
                              <input
                                type="checkbox"
                                name="sustituir"
                                onChange={(e) => onChageSustitucion(e, key)}
                                className="checkMedicamento"
                                checked={item.permiteSustitucion === "N"}
                              />
                            </FlexRow>
                            <FlexRow>
                              <p>Por duplicado</p>
                              <input
                                type="checkbox"
                                onChange={() => {}}
                                className="checkMedicamento"
                                checked={item.requiereDuplicado}
                              />
                            </FlexRow>
                            <p className="rb16m">Diagnóstico</p>
                            <input
                              type="text"
                              placeholder="Añada aqui el diagnóstico de la receta"
                              className="diagnositcoReceta"
                              name="diagnostico"
                              autoComplete="off"
                              value={item.diagnostico}
                              onChange={(e) => onChangInput(e, key)}
                            />
                            <p className="rb16m">Observaciones</p>
                            <textarea
                              placeholder="Añada aqui las observaciones del medicamento"
                              className="observacionesTxtArea"
                              name="observaciones"
                              resize="none"
                              value={item.observaciones}
                              onChange={(e) => onChangInput(e, key)}
                            />
                            <CantidadBox>
                              <div
                                className="c-white rb20nh pointer"
                                onClick={(e) => onClickCantidad(e, key, false)}
                              >
                                -
                              </div>
                              <div className="number">{item.cantidad}</div>
                              <div
                                className="c-white rb20nh pointer"
                                onClick={(e) => onClickCantidad(e, key, true)}
                              >
                                +
                              </div>
                            </CantidadBox>
                          </MedicamentoCard>
                          {key !== recetaDto.medicamentos.length - 1 && (
                            <Line />
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="fechaTxt">
                      Aún no posee medicamentos seleccionados para esta receta.
                    </p>
                  )}
                </MedicamentoContainer>
              </ContainerBody>
            </ContainerBox>
          </BoxPaso1>
        ) : (
          <BoxPaso2>
            <ContainerBox>
              <ContainerTitle>
                <IconTitle>
                  <ConfigIcon color={"var(--color-latex30)"} />
                  <p className={"rb16m"}>Otras configuraciones</p>
                </IconTitle>
              </ContainerTitle>
              <ContainerBody>
                <ConfigInput>
                  <p>Tratamiento prolongado</p>
                  <input
                    type="checkbox"
                    onChange={() => onChangeProlongado()}
                    className="inputConfig"
                    value={prolongado}
                  />
                </ConfigInput>
                {/* <ConfigInput>
                  <p>Paciente HIV</p>
                  <input
                    type="checkbox"
                    onChange={() => {}}
                    className="inputConfig"
                  />
                </ConfigInput> */}
              </ContainerBody>
            </ContainerBox>
            <ContainerBox>
              <ContainerTitle>
                <IconTitle>
                  <DiagnosticoIcon color={"var(--color-latex30)"} />
                  <p className={"rb16m"}>Diagnóstico</p>
                </IconTitle>
              </ContainerTitle>
              <ContainerBody>
                <input
                  type="text"
                  placeholder="Añada aqui el diagnóstico de la receta"
                  className="diagnositcoInput"
                  name="diagnostico"
                  autoComplete="off"
                  value={recetaDto.diagnostico}
                  onChange={onChangInput}
                />
              </ContainerBody>
            </ContainerBox>
            <ContainerBox>
              <ContainerTitle>
                <IconTitle>
                  <BedIcon color={"var(--color-latex30)"} />
                  <p className={"rb16m"}>Indicaciones</p>
                </IconTitle>
              </ContainerTitle>
              <ContainerBody>
                <textarea
                  placeholder="Añada aqui el diagnóstico de la receta"
                  className="indicacionesInput"
                  name="indicaciones"
                  onChange={onChangInput}
                  value={recetaDto.indicaciones}
                />
              </ContainerBody>
            </ContainerBox>
            <ContainerBox>
              <ContainerTitle>
                <IconTitle>
                  <EditIcon color={"var(--color-latex30)"} />
                  <p className={"rb16m"}>Texto adicional (Libre y opcional)</p>
                </IconTitle>
              </ContainerTitle>
              <ContainerBody>
                <textarea
                  placeholder="Lugar para texto libre competente a cualquier aclaración general de la receta"
                  className="indicacionesInput"
                  name="observaciones"
                  onChange={onChangInput}
                  value={recetaDto.observaciones}
                />
              </ContainerBody>
            </ContainerBox>
          </BoxPaso2>
        )}

        <BtnContainer $paso={page}>
          {page === 1 ? (
            <BtnPaso
              className="pointer bgc-primary c-white"
              onClick={() => verificarDatos()}
            >
              <p className="rb16m">Siguiente</p>
            </BtnPaso>
          ) : (
            <>
              <BtnPaso
                className="pointer bgc-latex30 c-white"
                onClick={() => setPage(1)}
              >
                <p className="rb16m">Anterior</p>
              </BtnPaso>
              <BtnPaso
                className="pointer bgc-primary c-white"
                onClick={() => guardarReceta()}
              >
                <p className="rb16m">Guardar Receta</p>
              </BtnPaso>
            </>
          )}
        </BtnContainer>
      </RecetaBody>
    </>
  );
};

export default RecetaDigital;
