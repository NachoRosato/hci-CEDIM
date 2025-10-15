import styled from "styled-components";

export const ContainerAcordion = styled.div``;

export const ItemAcordion = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 10px;
  border-bottom: 1px solid #c9c9c9;
  cursor: pointer;

  .container-content-acordeon {
    min-height: 0;
    overflow: hidden;
    width: 100%;
    height: 100px;
  }
  .container-content-acordeon {
    width: 100%;
    max-height: 0;
    overflow: hidden;
    transition: all 0.5s;
    display: flex;
    flex-direction: column;
    /* display: inline-block; */
  }
  ${({ id, acordeonSelected, allRow }) => {
    if (id === acordeonSelected) {
      return `
        .container-content-acordeon {
          width: 100%;
          min-height: calc(34px * ${allRow});
          overflow: hidden;

        }
        `;
    }
  }}
  .containerText {
    width: 100%;
    height: 34px;
    padding-top: 10px;
    color: var(--color-latex30);
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
  }
`;
