import React from "react";
import {
  ContainerCardOrden,
  ContainerCardOrdenCrear,
  ContainerCardOrdenItem,
  ContainerCardOrdenItems,
  ContainerCardOrdenTitle,
  ContainerIconXCardOrdenCrear,
} from "./localStyle";
import CircleMasMini from "global/assets/generico/CircleMasMini";
import LaboratorioIcon from "global/assets/generico/LaboratorioIcon";
import AskMarkLitIcon from "global/assets/generico/AskMarkLitIcon";
import XLitleIcon from "global/assets/generico/XLitleIcon";
import EditLitleIcon from "global/assets/generico/EditLitleIcon";
import TooltipV2 from "global/components/genericos/TooltipV2/TooltipV2";
import OjoIcon from "global/assets/generico/OjoIcon";

/**
 * Componente OrdenLaboCmp - Gestión de órdenes de laboratorio y práctica
 *
 * Este componente maneja la visualización y edición de órdenes de estudios médicos.
 * Permite crear nuevas órdenes, editar existentes y eliminar órdenes según su estado.
 *
 * Funcionalidades principales:
 * - Visualización de órdenes existentes (laboratorio y práctica)
 * - Edición de órdenes (mantiene la fecha original de la orden)
 * - Eliminación de órdenes (con validaciones según el estado)
 * - Creación de nuevas órdenes
 *
 * @param {Array} ordenDigital - Array de órdenes digitales existentes
 * @param {Function} seleccionaOrdenLabo - Función para editar órdenes de laboratorio
 * @param {Function} seleccionaOrdenPractica - Función para editar órdenes de práctica
 * @param {Function} seleccionarTipoOrden - Función para crear nuevas órdenes
 * @param {Function} borrarOrden - Función para eliminar órdenes
 * @param {Function} borrarOrdenEdit - Función para eliminar órdenes en edición
 * @param {Function} mensajeVerItems - Función para mostrar detalles de órdenes
 */
const OrdenLaboCmp = ({
  ordenDigital,
  seleccionaOrdenLabo,
  seleccionaOrdenPractica,
  seleccionarTipoOrden,
  borrarOrden,
  borrarOrdenEdit,
  mensajeVerItems,
}) => {
  /**
   * Valida si se debe mostrar el botón de eliminar (X) para una orden
   * @param {Object} item - Objeto de la orden a validar
   * @returns {boolean} - true si se debe mostrar el botón X, false en caso contrario
   */
  const valShowX = (item) => {
    if (item.cancelar !== undefined) {
      // Excepción: no mostrar X si la orden no es editable
      if (item.editable === false) {
        return false;
      }
      // Excepción: no mostrar X si la orden está cancelada
      if (item.cancelar) {
        return false;
      } else {
        return true;
      }
    } else if (item.dtoReEdicion !== undefined) {
      return true;
    } else if (item.idCircuito !== undefined) {
      return true;
    }
    return false;
  };

  /**
   * Valida si se debe usar la función de borrado normal o la de edición
   * @param {Object} item - Objeto de la orden a validar
   * @returns {boolean} - true para borrado normal, false para borrado de edición
   */
  const valDelFn = (item) => {
    if (item.cancelar !== undefined) {
      return false; // Usar borrado de edición
    } else {
      return true; // Usar borrado normal
    }
  };

  return (
    <>
      <div>
        <ContainerCardOrdenTitle>
          <div>
            <LaboratorioIcon color={"var(--color-white)"} />
          </div>
          <div className="ordenTitleClass rb16b c-white">
            Estudios Solicitados
          </div>
          <div className="qMarkClass pointer">
            <TooltipV2
              csBoxWidth={289}
              csRadius={16}
              children={<AskMarkLitIcon color={"var(--color-white)"} />}
              detalle={
                <p className="rb12tl" style={{ textAlign: "left", padding: 5 }}>
                  En este apartado se listan todos los estudios que se
                  solicitaron este consulta. Además se pueden crear nuevas
                  órdenes de estudios presionando el botón <b>“Crear orden”</b>
                </p>
              }
            />
          </div>
        </ContainerCardOrdenTitle>
        <ContainerCardOrden>
          <ContainerCardOrdenItems>
            {ordenDigital.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <ContainerCardOrdenItem
                    activo={valShowX(item)}
                    activoNoEditable={
                      item.editable !== undefined && item.editable === false
                    }
                  >
                    <div className="textAdjust rb16b c-white">
                      {item.tipoOrden === "Prac" && item.idOrdenDigGrupo > 0
                        ? item.idOrdenDigGrupo_desc
                        : item.tipoOrden === "Labo"
                        ? item.diagnostico
                        : item.descripcion}
                    </div>
                    {/* Botón de edición - Solo se muestra si la orden no está cancelada */}
                    {item.cancelar === undefined && (
                      <div
                        className="iconCenterAdjust pointer ts_orden_edit-item"
                        onClick={
                          item.tipoOrden === "Prac"
                            ? () =>
                                seleccionaOrdenPractica(item, "edita", index)
                            : () =>
                                seleccionaOrdenLabo(
                                  item.dtoReEdicion,
                                  true,
                                  index
                                )
                        }
                      >
                        <EditLitleIcon color={"var(--color-white)"} />
                      </div>
                    )}
                    {/* Botón de visualización para órdenes canceladas con listGrupoEstudioItem */}
                    {item.cancelar !== undefined &&
                      item.listGrupoEstudioItem !== undefined && (
                        <div
                          className="iconCenterAdjust pointer ts_orden_edit-item"
                          onClick={() =>
                            mensajeVerItems(item.listGrupoEstudioItem)
                          }
                        >
                          <OjoIcon color={"var(--color-white)"} />
                        </div>
                      )}

                    {/* Botón de visualización para órdenes canceladas con grupoItems */}
                    {item.cancelar !== undefined &&
                      item.grupoItems !== undefined &&
                      item.grupoItems !== null && (
                        <div
                          className="iconCenterAdjust pointer ts_orden_edit-item"
                          onClick={() => mensajeVerItems(item.grupoItems)}
                        >
                          <OjoIcon color={"var(--color-white)"} />
                        </div>
                      )}

                    {/* Botón de eliminar - Solo se muestra si valShowX retorna true */}
                    {valShowX(item) ? (
                      <ContainerIconXCardOrdenCrear
                        className="padAdjust pointer ts_orden_del-item"
                        onClick={
                          valDelFn(item)
                            ? () => borrarOrden(item, index)
                            : () => borrarOrdenEdit(item)
                        }
                      >
                        <XLitleIcon color={"var(--color-white)"} />
                      </ContainerIconXCardOrdenCrear>
                    ) : (
                      ""
                    )}
                  </ContainerCardOrdenItem>
                </React.Fragment>
              );
            })}
          </ContainerCardOrdenItems>
          {/* Botón para crear nueva orden o acceder al selector de tipo de orden */}
          <ContainerCardOrdenCrear
            className="pointer ts_orden_crear-btn"
            onClick={seleccionarTipoOrden}
          >
            <span className="busqPaciente-avatar">
              <CircleMasMini></CircleMasMini>
            </span>
            <span className="busqPaciente-title rb14l c-latex30">
              {ordenDigital && ordenDigital.length > 0
                ? "Crear/Editar orden"
                : "Crear orden"}
            </span>
          </ContainerCardOrdenCrear>
        </ContainerCardOrden>
      </div>
    </>
  );
};

export default OrdenLaboCmp;
