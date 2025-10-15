import camelize from "global/utils/camelize";
import { BodyDiagnosticos, Container, ItemBox, Title } from "./localStyle";
import TooltipV2 from "global/components/genericos/TooltipV2/TooltipV2";
import { useState } from "react";

// Componente principal
const ModalDiagnosticos = ({ diagnosticos, eliminarItem }) => {
  const [listDiag, setListDiag] = useState(diagnosticos);

  const quitarElemento = (item) => {
    // Filtrar el elemento a eliminar
    const updatedList = listDiag.filter(
      (diagnostico) => diagnostico.idsnomed !== item.idsnomed
    );
    setListDiag(updatedList);

    // Llamar a la función de eliminación pasada como prop
    eliminarItem(item, updatedList);
  };
  return (
    <>
      <Container>
        <Title>
          Este es el listado completo de diagnosticos agregados en la evolución
        </Title>
        <BodyDiagnosticos>
          {listDiag &&
            listDiag.map((diagnostico, index) => (
              <ItemBox>
                <p></p>
                <div key={index} className="diagnostico-item">
                  {/* Si la descripcion es muy larga lo pongo en un tooltip */}
                  {diagnostico.descripcion?.length >= 50 ? (
                    <TooltipV2
                      csBoxWidth={400}
                      csRadius={16}
                      children={
                        <p className="diagnostico-text rb16m c-white">
                          {camelize(diagnostico.descripcion)}
                        </p>
                      }
                      detalle={
                        <p
                          className="rb12tl"
                          style={{ textAlign: "left", padding: 5 }}
                        >
                          {camelize(diagnostico.descripcion)}
                        </p>
                      }
                    />
                  ) : (
                    <p className="diagnostico-text rb16m c-white">
                      {camelize(diagnostico.descripcion)}
                    </p>
                  )}
                </div>
                <p
                  className="diagnostico-accion rb16m"
                  onClick={() => quitarElemento(diagnostico)}
                >
                  X
                </p>
              </ItemBox>
            ))}
        </BodyDiagnosticos>
      </Container>
    </>
  );
};

export default ModalDiagnosticos;
