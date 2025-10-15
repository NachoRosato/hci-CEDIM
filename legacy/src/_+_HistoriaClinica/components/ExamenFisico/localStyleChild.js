import styled from "styled-components";

export const ContainerFormChild = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  padding: 30px 30px 0 30px;
  height: 100%;
  .flexi {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 100px;
  }
`;

export const ContainerBoxFilaChild = styled.div`
  display: flex;
  flex-direction: column;
  .parent {
    display: flex;
    align-items: center;
    justify-content: center;
    /* Estilos del padre */
  }
`;

export const ContainerItemsChild = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  width: 100%;
  ${({ hijo }) => {
    if (hijo) {
      return `flex-direction: row;`;
    } else {
      return `flex-direction: column;`;
    }
  }} /* Estilos de los children */

  .opciones {
  }
`;
export const AbreviaturaChild = styled.div`
  .titulo {
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .subtitulo {
    width: 170px;
  }
`;
export const ContainerHijoChild = styled.div``;

export const ContainerInputChild = styled.div`
  display: flex;
  gap: 10px;
  width: max-content;
  .widthDrop {
    width: 100px;
  }
  .incWidth {
    width: 200px;
  }
`;
