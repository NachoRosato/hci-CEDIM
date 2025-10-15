import { useEffect, useState } from "react";
import { ContainerInput, Input, MsjError, TitleMsj } from "./localStyle";

const InputBase = ({
  property, // nombre del input referencia ej: "name"
  placeholder, // campo ayuda - previsualizacion
  regex, // expresion regular validando lo que seteo
  errorStr, // string de error
  headerStr, // string de encabezado
  state, // estado o valor del input en el hook
  setState, // hook para setear el valor
  isRequired, // si el campo es requerido o no
  value, // valor del input
  extraProperty, // todas las propiedades extra que querramos agregar.
  onChange,
  // nuevos
  // type no es necesario ya que lo vamos a dividir. Aqui se utilizan type => text, number, password, email, select
  autoComplete, // por lo gral esta en off a pedido de Diego.
  disabled, // deshabilito el input en funcion de un error/validacion/etc
  inputMode, // tipo de teclado a mostrar en los dispositivos. "numeric" por lo gral.
  pattern, // coincide con la expresion regular a validar.
  onKeyPress, //funcion para validar input ingresado
  onPaste, // funcion para validar el copiado de un input
}) => {
  // al tener en el onchange dentro del componente,
  // debemos manejar los estados por fuera en funcion de efectivizar el cambio
  // estado inicial del formulario. por fuera
  //     const initialState = {
  //     id: -1,
  //     idtipotexto: 1,
  //     idtipotexto_desc: "Beneficios del Portal Web",
  //     nombre: "",
  //     descripcion: "",
  //     idasociado: -1,
  //     orden: -1,
  //     table: "",
  //     check: false,
  // }
  // // fromulario local en hook
  // const [localForm, setLocalForm] = useState(type === "PUT"? form: initialState);

  // const [stateRequired, setStateRequired] = useState({
  //   nombre: false,
  //   descripcion: false,
  //   orden: false,
  //   pepe: false,
  //   check: false,
  // })

  // Ejemplo creacion
  // const handleCreate = () => {
  //   if(true){

  //       setStateRequired({
  //           ...stateRequired,
  //           nombre: false,
  //           descripcion: false,
  //           orden: false,
  //           pepe: false,
  //       });
  //       // submitFormCreate(localForm);
  //   }else {
  //       setStateRequired({
  //           ...stateRequired,
  //           nombre: localForm.nombre !== "" ? false: true,
  //           descripcion: localForm.descripcion !== ""? false: true,
  //           orden: localForm.orden !== -1? false: true,
  //           pepe: true,

  //       });

  //       showToaster(
  //           {
  //             texto: "Complete todos los campos requeridos",
  //             tipo: "danger",
  //           },
  //           "centroArriba"
  //         )(toasterDispatch);
  //   }
  // };

  //ejemplo edicion update
  // const handleUpdate = () => {
  //   if(localForm.nombre !== "" && localForm.descripcion !== "" && localForm.orden !== -1){
  //       submitFomPut(localForm);
  //   }else {
  //       showToaster(
  //           {
  //             texto: "Complete todos los campos requeridos",
  //             tipo: "danger",
  //           },
  //           "centroArriba"
  //         )(toasterDispatch);
  //   }
  // };

  // const onKeyPress = () => {
  //   // validacion de datos o accionar al momento de presionar una tecla determinada.
  // };

  const [error, setError] = useState(false);

  // validando los datos
  const handleChange = (e) => {
    const value = e.target.value;

    if ((regex && !regex.test(value)) || value === "") {
      // Setea el campo requerido o el error
      if (value !== "") setError(true);
      else setError(false);

      setState({
        ...state,
        [property]: extraProperty.initialValue,
      });
      extraProperty.setErrorForced({
        ...extraProperty.stateRequired,
        [property]: true,
      });
    } else {
      setError(false);
      setState({
        ...state,
        [property]: value,
      });
      extraProperty.setErrorForced({
        ...extraProperty.stateRequired,
        [property]: false,
      });
    }
  };

  // Dejando el value por defecto
  useEffect(() => {
    if (value) {
      const e = document.getElementById(`ptur-input-abm-table${property}`);
      e.value = value;
    }
  }, []);

  return (
    <ContainerInput
      width={extraProperty.widthContainer}
      height={extraProperty.heightContainer}
      error={error || (extraProperty.errorForced && isRequired)}
      className="div"
      // width={extraProperty.wi}
    >
      <TitleMsj className={extraProperty.titleStyle}>
        {headerStr ? headerStr + (isRequired ? " *" : "") : ""}
      </TitleMsj>
      <Input
        id={`ptur-input-abm-table${property}`}
        onChange={onChange ? onChange : handleChange}
        placeholder={placeholder}
        heightMax={extraProperty.heightMax}
        onKeyPress={onKeyPress}
        width={extraProperty.widthInput}
        height={extraProperty.heightInput}
        className={extraProperty.textValueStyle}
        maxLength={extraProperty.maxLength}
        disabled={disabled}
        autoComplete="off"
        onPaste={onPaste}
      />
      <MsjError className="rb12m c-danger">
        {error
          ? errorStr
          : extraProperty.errorForced && isRequired
          ? "Este campo es requerido"
          : ""}
      </MsjError>
    </ContainerInput>
  );
};

export default InputBase;
