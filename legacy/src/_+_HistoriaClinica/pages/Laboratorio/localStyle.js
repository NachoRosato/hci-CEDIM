import styled from "styled-components";

export const ContainerBody = styled.div`
  /* Estilos para el contenedor principal del laboratorio */
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;

  /* Estilos para las filas de contenido */
  .fila-contenido {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    @media (max-width: 1200px) {
      flex-direction: column;
      gap: 16px;
    }
  }

  /* Estilos para las columnas */
  .columna-izquierda {
    flex: 0 0 400px;

    @media (max-width: 1200px) {
      flex: 1;
    }
  }

  .columna-derecha {
    flex: 1;
  }

  /* Estilos para títulos de sección */
  .titulo-seccion {
    margin-bottom: 16px;
    color: #333;
    font-size: 18px;
    font-weight: 600;
  }

  /* Estilos para botones */
  .boton-primario {
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s ease;

    &:hover {
      background: #0056b3;
    }

    &:active {
      transform: translateY(1px);
    }
  }
`;

export const ResponsiveStyles = styled.div`
  /* Estilos responsivos específicos para la página de laboratorio */
  @media (max-width: 768px) {
    /* Estilos para dispositivos móviles */
    .fila-contenido {
      flex-direction: column;
      gap: 12px;
    }

    .columna-izquierda,
    .columna-derecha {
      flex: 1;
    }

    .titulo-seccion {
      font-size: 16px;
    }
  }

  @media (min-width: 769px) and (max-width: 1200px) {
    /* Estilos para tablets */
    .fila-contenido {
      flex-direction: column;
      gap: 16px;
    }
  }

  @media (min-width: 1201px) {
    /* Estilos para dispositivos de escritorio */
    .fila-contenido {
      flex-direction: row;
    }
  }
`;
