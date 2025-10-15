import styled from "styled-components";
// Estilos
export const Container = styled.div`
  background-color: #f0f4f8;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  height: 430px;
  width: 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  @media (max-width: 1366px) {
    height: 330px;
  }
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #1a365d;
  padding: 16px;
  border-bottom: 1px solid #cbd5e0;
  position: sticky;
  top: 0;
  background-color: #f0f4f8;
  z-index: 1;
`;

export const ListWrapper = styled.div`
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px 16px;
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ListItem = styled.li`
  background-color: ${({ selected }) => (selected ? "#2a4365" : "#e2e8f0")};
  color: ${({ selected }) => (selected ? "#ffffff" : "#1a202c")};
  padding: 10px 12px;
  margin-bottom: 6px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: ${({ selected }) => (selected ? "#2c5282" : "#cbd5e0")};
  }
`;
