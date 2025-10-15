import styled from "styled-components";

export const TablaCartillaContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(1, 60px);
  border: 1px solid var(--color-latex30);
  width: 100%;
  height: 542px;
  border-radius: 16px 16px 0 16px;
  box-shadow: 9px 14px 22px 2px rgba(0, 0, 0, 0.13);
  .tablaCartilla-header {
    display: grid;
    grid-template-columns: repeat(6, 2fr);
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
  }
  .tablaCartilla-header {
    position: sticky;
    top: 0;
    padding: 20px;
    border-top-right-radius: 14px;
    border-top-left-radius: 14px;
  }
  .tablaCartilla-body{
    height: 482px;
    overflow-y: scroll;
    border-left: 10px solid var(--color-latex30);
    border-bottom-left-radius: 16px;
  }

  .tablaCartilla-elemento {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(6, 5fr);
    min-height: 48px;
    border-bottom: 1px solid var(--color-latex30);
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
  }

  .tablaCartilla-elemento-medico {
    padding: 0 20px;
  }

  /* .tablaCartilla-min-w170 {
    min-width: 170px;
  }
  .tablaCartilla-min-w160 {
    min-width: 160px;
  } */

  .tablaCartilla-elemento-icono {
    padding-left: 36px;
  }

  .btn-cartilla {
    display: flex;
    align-items: center;
    justify-content: center;
    width: max-content;
    border-radius: 6px;
    padding: 8px;
    cursor: pointer;
  }

  ::-webkit-scrollbar {
    /* display: none; */
    height: 1000px;
    width: 5000px;
  }

  @media (min-height: 768px) {
    height: 543px;
  }
`;
