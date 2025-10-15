import styled from "styled-components";

export const Container = styled.div`
  width: ${({ width }) => (width ? `${width}%` : "100%")};
  height: ${({ height }) => (height ? `${height}px` : "88px")};
  cursor: pointer;

  ${({ active, error }) => {
    if (active) {
      return `
                        .select-dropdown { 
                            visibility: visible;
                        }
                        .background-click {
                            position: fixed;
                            width: 100vw; 
                            height: 100vh; 
                            top: 0;
                            left: 0;
                            z-index: 4;
                        }
                    `;
    }
    if (error) {
      return `.viewValue
                            {
                                border: 1px solid var(--color-danger)
                            }
                        `;
    }
  }}
`;

export const ViewValue = styled.div`
  position: relative;
  width: ${({ width }) => (width ? `${width}%` : "100%")};
  height: ${({ height }) => (height ? `${height}px` : "50px")};
  padding-left: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: ${({ arrowPadding }) =>
    arrowPadding ? `${arrowPadding}px` : "30px"};
  .active {
    transform: rotate(180deg);
  }
  background-color: #ffffff;
  border: 1px solid var(--color-grey90);
  border-radius: 4px;
  .overflowValue {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const SelectDropdown = styled.div`
  position: relative;
  width: ${({ width }) => (width ? `${width}%` : "100%")};
  max-height: 250px;
  max-width: ${({ width }) => (width ? `${width}%` : "100%")};
  visibility: hidden;
  overflow-y: scroll;
  overflow-x: hidden;
  z-index: 5;
  background-color: var(--color-grey97);
  border: 1px solid var(--color-grey90);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  top: ${({ errorPlacement }) => (errorPlacement ? `-19px` : "0px")};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding-left: 10px;
`;

export const ItemBox = styled.div`
  width: 100%;
  display: flex;
  span {
    width: 100%;
    height: 30px !important;
    padding-top: 7px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
    ${({ selected }) => {
      if (selected) {
        return `
        color: var(--color-white);
        `;
      }
    }}
    &:hover {
      background: var(--color-latex30);
      color: var(--color-white);
    }
  }
`;

export const Title = styled.span``;

export const Placeholder = styled.span`
  color: var(--color-grey45);
`;

export const MsjError = styled.span`
  color: var(--color-danger);
`;
