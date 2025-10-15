import styled from "styled-components";

export const ContainerTabla = styled.div`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const TablaHeader = styled.div`
  display: flex;
  background-color: #f8f9fa;
  border-bottom: 2px solid #e0e0e0;
  font-weight: 600;
  color: #495057;
`;

export const TablaBody = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

export const TablaRow = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }

  ${(props) =>
    props.selected &&
    `
    background-color: #e3f2fd;
    border-left: 4px solid #2196f3;
  `}

  &:last-child {
    border-bottom: none;
  }
`;

export const TablaCell = styled.div`
  padding: 12px 16px;
  flex: ${(props) => (props.width ? "0 0 " + props.width : "1")};
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;

  .validado {
    color: #28a745;
    font-weight: 500;
  }

  .pendiente {
    color: #ffc107;
    font-weight: 500;
  }
`;

export const EmptyMessage = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #6c757d;
  font-style: italic;
  background: #f8f9fa;
`;
