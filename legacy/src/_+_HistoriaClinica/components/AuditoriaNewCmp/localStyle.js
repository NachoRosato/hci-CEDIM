import styled from "styled-components";

export const AuditoriaNewCmpContainer = styled.div`
  width: 1156px;
  height: 788px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: var(--color-white);
  border-radius: 8px;
  padding-left: 41px;
  padding-right: 44px;
  padding-top: 20px;
  padding-bottom: 33px;
`;

export const TitleContainer = styled.div`
  margin-bottom: 40px;
`;
export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 32px;
  margin-bottom: 45px;
`;

export const EvoContainer = styled.div`
  width: 666px;
  height: 560.984px;
  background-color: var(--color-white);
  border-radius: 16px;
  box-shadow: 0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04),
    0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.03),
    0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.02);
  padding: 10px 10px 10px 10px;
  overflow-y: scroll;
  overflow-x: none;
  div {
    text-align: left;
  }
`;
export const DiagContainer = styled.div`
  width: 377px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const DiagTitleContainer = styled.div`
  margin-bottom: 13px;
`;

export const DiagTagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 375.689px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 33px;
  background: #008ddd;
`;
export const DiagTextContainer = styled.div`
  text-align: left;
  margin-bottom: 25px;
`;
export const DiagDropContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
  position: relative;
  #DropdownAudit {
    width: 377px;
    left: 0px;
  }
`;
export const DiagBtnContainer = styled.div`
  display: flex;
  justify-content: right;
  align-items: right;
  width: 100%;
`;
export const DiagBtn = styled.button`
  width: 174.646px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--color-primary);
  box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.25);
  border: none;
`;

export const BtnContainer = styled.div``;

export const BtnCerrar = styled.button`
  width: 160px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--color-latex30);
  color: var(--color-white);
  border: none;
  box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.25);
`;
