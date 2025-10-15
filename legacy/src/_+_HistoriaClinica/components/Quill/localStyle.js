import styled from "styled-components";

export const ContainerEditor = styled.div`
  width: 100%;
  height: 446px;
  /* ${({ txtQuill }) => {
    if (txtQuill !== "") {
      return `
            height: 435px;
            `;
    } else {
      return `
            height: 300px;
            `;
    }
  }} */
  ${({ flgEditaEvo }) => {
    if (flgEditaEvo) {
      return `
            height: 100%;
            `;
    }
  }}
  ${({ dictado }) => {
    if (dictado) {
      return `
            display: none;
            `;
    }
  }}
  .quillText {
    overflow: auto;
    &::-webkit-scrollbar {
      width: 1px;
      border: none;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--color-grey77);
      border-radius: 8px;
    }
  }
  .ql-container {
    ${({ heightCustom }) => {
      if (heightCustom) {
        return `
            height: ${heightCustom}px;
            `;
      }
    }}
    background: #FAFAFA;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  .ql-toolbar {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  .quillText .ql-editor {
    &::-webkit-scrollbar {
      width: 6px;
      border: none;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--color-grey77);
      border-radius: 8px;
    }
  }
  @media (max-width: 1366px) {
    height: 250px;
    .ql-container {
      ${({ heightCustom }) => {
        if (heightCustom) {
          return `
            height: 190px;
            `;
        }
      }}
    }
  }
`;
