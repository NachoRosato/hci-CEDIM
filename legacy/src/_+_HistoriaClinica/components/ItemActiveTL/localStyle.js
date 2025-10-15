import styled from "styled-components";
export const ContainerItemActive = styled.div`
  width: ${({ timeline }) => (timeline ? "600px" : "830px")};
  height: ${({ timeline }) => (timeline ? "610px" : "680px")};
  border-radius: 16px;
  overflow: auto;
  padding: 15px;
  margin-top: 10px;
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  .documentoPdf {
    width: 100%;
    height: 99%;
  }
  ${({ flgTest }) => {
    if (flgTest) {
      return `
          display: flex;
          align-items: center;
          padding-bottom: 60px;
        `;
    } else
      return `
          display: unset;
          align-items: center;
          padding-bottom: 15px;
       `;
  }}

  @media (max-width: 1366px) {
    width: ${({ timeline }) => (timeline ? "400px" : "586px")};
    height: ${({ timeline }) => (timeline ? "420px" : "440px")};
  }
`;
