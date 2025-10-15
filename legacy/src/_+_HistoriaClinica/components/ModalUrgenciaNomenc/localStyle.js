import styled from "styled-components";

export const ContainerModal = styled.div`
  width: 600px;
  max-height: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const ContainerHeader = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

export const ContainerDescription = styled.p`
  color: var(--color-latex30);
  font-size: 14px;
  margin: 0;
`;

export const ContainerList = styled.div`
  flex: 1;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  max-height: 300px;
`;

export const ContainerItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: ${(props) => (props.isLast ? "none" : "1px solid #f0f0f0")};
  cursor: pointer;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const CheckboxInput = styled.input`
  margin-right: 12px;
  width: 16px;
  height: 16px;
  accent-color: var(--color-latex30);
  cursor: pointer;
`;

export const ItemText = styled.span`
  font-size: 14px;
  color: var(--color-latex30);
  flex: 1;
  cursor: pointer;
`;

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 15px;
`;

export const BtnVolver = styled.button`
  flex: 1;
  height: 40px;
  background: var(--color-danger);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.15);
  transition: background 0.2s;

  &:hover {
    background: #c82333;
  }
`;

export const BtnGuardar = styled.button`
  flex: 1;
  height: 40px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.15);
  transition: background 0.2s;

  &:hover {
    background: var(--color-secondary);
  }
`;
