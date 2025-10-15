import {
  ContainerBox,
  PresentacionesBox,
  PresentacionesCard,
} from "./localStyle";

const PresentacionesReceta = ({ presentaciones, agregarMedicamento }) => {
  return (
    <ContainerBox>
      <PresentacionesBox>
        {presentaciones?.map((item, key) => {
          return (
            <PresentacionesCard
              key={key}
              onClick={() => agregarMedicamento(item)}
            >
              <p className="rb16m c-latex30">{item.presentacion}</p>
            </PresentacionesCard>
          );
        })}
      </PresentacionesBox>
    </ContainerBox>
  );
};

export default PresentacionesReceta;
