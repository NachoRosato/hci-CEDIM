import DatePicker from "global/components/genericos/DatePicker/DatePicker";
import {
  ContainerBox,
  ContainerButtons,
  BtnCerrar,
  InformacionBox,
  DatosMedicoBox,
  RadioContainer,
  OptionBox,
} from "./localStyle";
import { useContext, useState } from "react";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import { GlobalContext } from "global/context/Provider";
import { wsPutDatosMedico } from "_+_HistoriaClinica/context/action/recetaDigital/recetaDigital";
import { showToaster } from "global/context/action/toaster/toaster";
import { IonSpinner } from "@ionic/react";
import { setUserByToken } from "global/context/action/auth/auth";
import InputV1 from "global/components/genericos/InputV1/InputV1";

const ModalDatosMedico = ({ datosMedico, continuarEvo }) => {
  const { authState, toasterDispatch, authDispatch } =
    useContext(GlobalContext);
  const { recetaDigitalDispatch } = useContext(HistoriaClinicaContext);
  const [loading, setLoading] = useState(false);
  const [medicoDto, setMedicoDto] = useState({
    sexo: datosMedico.sexo,
    fechaNacimiento: datosMedico.fechaNacimiento,
    documento: datosMedico.documento,
  });
  const hoy = new Date();
  const storedData = sessionStorage.getItem("auth");

  const onChangeFecha = (e) => {
    setMedicoDto({
      ...medicoDto,
      fechaNacimiento: e,
    });
  };

  const onChangeRadio = (e) => {
    setMedicoDto({
      ...medicoDto,
      sexo: e.target.value,
    });
  };

  const onChangeInput = (e) => {
    if (e.target.value.length > 8) {
      return;
    }
    setMedicoDto({
      ...medicoDto,
      documento: e.target.value,
    });
  };

  const guardarDatosMedico = () => {
    setLoading(true);
    wsPutDatosMedico(
      authState.auth.data.value.idMedico,
      medicoDto,
      nextStep
    )(recetaDigitalDispatch);
  };

  const nextStep = (isCorrect, data) => {
    if (isCorrect) {
      showToaster(
        {
          texto: "Datos actualizados correctamente.",
          tipo: "success",
        },
        "centroArriba"
      )(toasterDispatch);
      // ACA DEBO ACTUALIZAR LOS DATOS EN EL CONTEXTO Y EN EL SESSION STORAGE
      if (storedData) {
        // Parsear el JSON a un objeto JavaScript
        const dataObject = JSON.parse(storedData);

        // Actualizar los campos específicos
        dataObject.auth.data.value.documento = medicoDto.documento;
        dataObject.auth.data.value.sexo = medicoDto.sexo; // Cambiar el valor de 'sexo'
        dataObject.auth.data.value.fechaNacimiento = new Date(
          medicoDto.fechaNacimiento
        ).toISOString(); // Cambiar la fecha de nacimiento

        // Convertir el objeto nuevamente a JSON
        const updatedData = JSON.stringify(dataObject);

        // Guardarlo nuevamente en sessionStorage
        sessionStorage.setItem("auth", updatedData);
        setUserByToken(dataObject.auth.data)(authDispatch);
      }

      continuarEvo();
    } else {
      showToaster(
        {
          texto: "Error al actualizar datos del usuario.",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
    setLoading(false);
  };

  return (
    <ContainerBox>
      <InformacionBox className="ts_modalEnf-dropdown">
        <p className="rb18b c-latex30">
          Por favor, complete los campos con sus datos personales.
        </p>
        <p>
          Esta información solo se requiere la primera vez, ya que una vez
          ingresada, no será necesario volver a completarla.
        </p>
      </InformacionBox>
      <DatosMedicoBox>
        {datosMedico.documento === "" && (
          <OptionBox>
            <p className="rb16m">DNI</p>
            <InputV1
              inputType="number"
              name="documento"
              onChange={onChangeInput}
              className="rb16m inputNonScroll"
              isRequired={true}
              changeHeight={"inputModifiedHeight"}
              value={medicoDto.documento}
            />
          </OptionBox>
        )}

        {(datosMedico.sexo === "" || datosMedico.sexo === null) && (
          <OptionBox>
            <p className="rb16m">Sexo</p>
            <RadioContainer>
              <div className="inputContainer pointer">
                <input
                  type="radio"
                  name="sexo"
                  id="masculino"
                  value="M"
                  className="rb14l pointer radioCheck"
                  onChange={(e) => onChangeRadio(e)}
                  checked={medicoDto.sexo === "M"}
                />
                <label htmlFor="masculino" className="rb14l pointer">
                  Masculino
                </label>
              </div>
              <div className="inputContainer pointer">
                <input
                  type="radio"
                  name="sexo"
                  id="femenino"
                  value="F"
                  className="rb14l pointer radioCheck"
                  onChange={(e) => onChangeRadio(e)}
                  checked={medicoDto.sexo === "F"}

                />
                <label htmlFor="femenino" className="rb14l pointer">
                  Femenino
                </label>
              </div>
            </RadioContainer>
          </OptionBox>
        )}

        {(datosMedico.fechaNacimiento === "" ||
          datosMedico.fechaNacimiento === "0001-01-01T00:00:00") && (
          <OptionBox>
            <p className="rb16m">Fecha Nacimiento</p>
            <DatePicker
              fechaInicial={"1903 01 01"}
              fechaFinal={`${hoy.getFullYear()} ${
                hoy.getMonth() + 1 >= 10
                  ? hoy.getMonth() + 1
                  : `0${hoy.getMonth() + 1}`
              } ${hoy.getDate() >= 10 ? hoy.getDate() : `0${hoy.getDate()}`}`}
              onChange={(e) => onChangeFecha(e)}
              selectedFecha={`${hoy.getFullYear()} ${
                hoy.getMonth() + 1 >= 10
                  ? hoy.getMonth() + 1
                  : `0${hoy.getMonth() + 1}`
              } ${hoy.getDate() >= 10 ? hoy.getDate() : `0${hoy.getDate()}`}`}
              checkError={"fecha incorrecta"}
              errorStr="La fecha es requerida"
              isRequired={false}
              posicion={"absolute"}
              botones={true}
              background={true}
              customCss={"rb16l"}
            />
          </OptionBox>
        )}
      </DatosMedicoBox>
      <ContainerButtons>
        {/* <BtnCerrar
          className="bgc-latex30 rb16b c-white ts_modalEnf_volver-btn"
          onClick={dissmiss}
        >
          Volver
        </BtnCerrar> */}
        <BtnCerrar
          className={`${
            medicoDto.sexo === "" ||
            medicoDto.fechaNacimiento === "" ||
            medicoDto.fechaNacimiento === "0001-01-01T00:00:00" ||
            medicoDto.documento === ""
              ? "bgc-grey65"
              : "bgc-primary pointer"
          } rb16b c-white ts_modalEnf_agregar-btn`}
          onClick={
            medicoDto.sexo === "" ||
            medicoDto.fechaNacimiento === "" ||
            medicoDto.fechaNacimiento === "0001-01-01T00:00:00" ||
            medicoDto.documento === ""
              ? () => {}
              : guardarDatosMedico
          }
        >
          {loading ? (
            <span style={{ width: "57.438px", height: "27px" }}>
              <IonSpinner name="lines-small" />{" "}
            </span>
          ) : (
            <span>Agregar</span>
          )}
        </BtnCerrar>
      </ContainerButtons>
    </ContainerBox>
  );
};

export default ModalDatosMedico;
