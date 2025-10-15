import SelectBusqPacIcon from "global/assets/generico/SelectBusqPacIcon";
import camelize from "global/utils/camelize";
import { formatFechaTimeLine } from "global/utils/formatFechaTimeLine";
import { TablaCartillaContainer } from "./localStyle";

const TablaCartilla = ({ items, onClickSelecPac }) => {
  return (
    <TablaCartillaContainer>
      <div className="tablaCartilla-header bgc-latex30 c-white">
        <div className="rb18hh">DNI</div>
        <div className="rb18hh">Apellido y Nombre</div>
        <div className="rb18hh">Fecha de Nac.</div>
        <div className="rb18hh">Obra Social</div>
        <div className="rb18hh">Plan</div>
        <div className="rb18hh">Acciones</div>
      </div>
      <div className="tablaCartilla-body">
        {Array.isArray(items) &&
          items.map((item, index) => (
            <div key={index} className="tablaCartilla-elemento c-latex30">
              <div className="tablaCartilla-elemento-medico tablaCartilla-min-w160 rb16l">
                {item.documento}
              </div>
              <div className="rb16l">{camelize(item.nombre)}</div>
              <div className="rb16l">
                {formatFechaTimeLine(item.fechaNacimiento)}
              </div>
              <div className="rb16l">{item.obraSocial}</div>
              <div className="rb16l">{item.plan}</div>
              <div
                className="pointer ts_searchPax_searchTable-btn"
                onClick={() => onClickSelecPac(item)}
              >
                <SelectBusqPacIcon></SelectBusqPacIcon>
              </div>
            </div>
          ))}
      </div>
    </TablaCartillaContainer>
  );
};

export default TablaCartilla;
