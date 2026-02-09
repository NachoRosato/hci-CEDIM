"use client";
import React from 'react';
import styled from 'styled-components';

export interface ABMColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  width?: string;
}

interface ABMTableProps<T> {
  columns: ABMColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  emptyMessage?: string;
  loading?: boolean;
}

const TableWrapper = styled.div`
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid var(--color-grey90);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Rubik', sans-serif;
`;

const THead = styled.thead`
  background: linear-gradient(135deg, var(--color-latex30) 0%, #0283C0 100%);
`;

const TH = styled.th<{ $width?: string }>`
  padding: 14px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 13px;
  color: var(--color-white);
  letter-spacing: 0.3px;
  text-transform: uppercase;
  white-space: nowrap;
  ${({ $width }) => $width && `width: ${$width};`}
`;

const TR = styled.tr`
  border-bottom: 1px solid var(--color-grey90);
  transition: background-color 0.15s ease;
  
  &:hover {
    background-color: var(--color-grey97);
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const TD = styled.td`
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 400;
  color: var(--color-black35);
  vertical-align: middle;
`;

const ActionButton = styled.button<{ $variant: 'edit' | 'delete' }>`
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  font-family: 'Rubik', sans-serif;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 8px;
  
  ${({ $variant }) =>
    $variant === 'edit'
      ? `
    background-color: var(--color-latex95);
    color: var(--color-latex30);
    border: 1px solid var(--color-latex30);
    
    &:hover {
      background-color: var(--color-latex30);
      color: var(--color-white);
    }
  `
      : `
    background-color: hsla(4, 100%, 95%, 1);
    color: hsla(4, 100%, 40%, 1);
    border: 1px solid hsla(4, 100%, 40%, 1);
    
    &:hover {
      background-color: hsla(4, 100%, 40%, 1);
      color: var(--color-white);
    }
  `}
`;

const EmptyRow = styled.td`
  padding: 40px 16px;
  text-align: center;
  font-size: 14px;
  color: var(--color-grey65);
  font-style: italic;
`;

const LoadingRow = styled.td`
  padding: 40px 16px;
  text-align: center;
  font-size: 14px;
  color: var(--color-grey65);
`;

export function ABMTable<T>({
  columns,
  data,
  keyExtractor,
  onEdit,
  onDelete,
  emptyMessage = 'No hay registros',
  loading = false,
}: ABMTableProps<T>) {
  const hasActions = !!onEdit || !!onDelete;

  return (
    <TableWrapper>
      <StyledTable>
        <THead>
          <tr>
            {columns.map((col) => (
              <TH key={col.key} $width={col.width}>
                {col.header}
              </TH>
            ))}
            {hasActions && <TH $width="160px">Acciones</TH>}
          </tr>
        </THead>
        <tbody>
          {loading ? (
            <tr>
              <LoadingRow colSpan={columns.length + (hasActions ? 1 : 0)}>
                Cargando...
              </LoadingRow>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <EmptyRow colSpan={columns.length + (hasActions ? 1 : 0)}>
                {emptyMessage}
              </EmptyRow>
            </tr>
          ) : (
            data.map((row) => (
              <TR key={keyExtractor(row)}>
                {columns.map((col) => (
                  <TD key={col.key}>
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[col.key] ?? '')}
                  </TD>
                ))}
                {hasActions && (
                  <TD>
                    {onEdit && (
                      <ActionButton $variant="edit" onClick={() => onEdit(row)}>
                        Editar
                      </ActionButton>
                    )}
                    {onDelete && (
                      <ActionButton $variant="delete" onClick={() => onDelete(row)}>
                        Eliminar
                      </ActionButton>
                    )}
                  </TD>
                )}
              </TR>
            ))
          )}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
}
