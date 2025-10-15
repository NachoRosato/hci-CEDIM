import styled from "styled-components";
import { motion } from "framer-motion";

export const ContainerBody = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: calc(100vh - 46px);
  background-color: var(--color-latex10);
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;

  @media (max-width: 1366px) {
    min-height: calc(100vh - 40px);
  }
`;

export const ContainerResumen = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-top: 20px;
`;

export const ContainerResumenTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background-color: var(--color-latex30);
  border-bottom: 1px solid var(--color-latex20);

  .resumen-title {
    color: white;
  }

  .resumen-date-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .resumen-date {
    color: white;
    opacity: 0.9;
    font-weight: 500;
  }

  .resumen-separator {
    color: white;
    opacity: 0.7;
  }

  .resumen-info-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .btn-volver {
    background-color: transparent;
    border: 2px solid white;
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: white;
      color: var(--color-latex30);
    }
  }
`;

export const ContainerResumenContent = styled.div`
  padding: 24px;
  min-height: 400px;
  max-height: 70vh;
  overflow-y: auto;

  /* Protección contra selección de texto */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;

  /* Prevenir arrastrar texto */
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;

  /* Prevenir copia */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .resumen-content {
    h3 {
      margin-bottom: 20px;
      color: var(--color-latex30);
    }

    .resumen-section {
      margin-bottom: 24px;
      padding: 16px;
      background-color: var(--color-latex5);
      border-radius: 8px;
      border-left: 4px solid var(--color-latex30);

      h4 {
        color: var(--color-latex30);
        margin-bottom: 12px;
      }

      p {
        line-height: 1.6;
        color: var(--color-latex30);
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          padding: 4px 0;
          line-height: 1.5;
        }
      }

      .markdown-content {
        color: var(--color-latex30);
        line-height: 1.6;

        /* Protección específica para el contenido markdown */
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: transparent;
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-drag: none;

        /* Prevenir selección de texto en todos los elementos hijos */
        * {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          color: var(--color-latex30);
          margin-top: 16px;
          margin-bottom: 8px;
          font-weight: 600;
        }

        h1 {
          font-size: 1.5em;
        }

        h2 {
          font-size: 1.3em;
        }

        h3 {
          font-size: 1.1em;
        }

        p {
          margin-bottom: 12px;
          line-height: 1.6;
        }

        ul,
        ol {
          margin-bottom: 12px;
          padding-left: 20px;

          li {
            margin-bottom: 4px;
            line-height: 1.5;
          }
        }

        ul {
          list-style-type: disc;
        }

        ol {
          list-style-type: decimal;
        }

        strong,
        b {
          font-weight: 600;
        }

        em,
        i {
          font-style: italic;
        }

        code {
          background-color: var(--color-latex10);
          padding: 2px 4px;
          border-radius: 3px;
          font-family: "Courier New", monospace;
          font-size: 0.9em;
        }

        pre {
          background-color: var(--color-latex10);
          padding: 12px;
          border-radius: 6px;
          overflow-x: auto;
          margin-bottom: 12px;

          code {
            background-color: transparent;
            padding: 0;
          }
        }

        blockquote {
          border-left: 4px solid var(--color-latex30);
          padding-left: 16px;
          margin: 16px 0;
          font-style: italic;
          color: var(--color-latex30);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 12px;

          th,
          td {
            border: 1px solid var(--color-latex20);
            padding: 8px 12px;
            text-align: left;
          }

          th {
            background-color: var(--color-latex10);
            font-weight: 600;
          }
        }

        hr {
          border: none;
          border-top: 1px solid var(--color-latex20);
          margin: 20px 0;
        }
      }
    }

    .mb-1 {
      margin-bottom: 4px;
    }

    .mb-2 {
      margin-bottom: 8px;
    }

    .mb-3 {
      margin-bottom: 12px;
    }

    .mb-4 {
      margin-bottom: 16px;
    }
  }
`;

export const ContainerResumenEmpty = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 24px;
  text-align: center;
  background-color: var(--color-latex5);
`;

export const ContainerResumenError = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 24px;
  text-align: center;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  margin: 24px;
  color: #dc2626;
`;

// Responsive design
export const ResponsiveStyles = styled.div`
  @media (max-width: 768px) {
    ${ContainerBody} {
      padding: 10px;
    }

    ${ContainerResumen} {
      margin-top: 10px;
    }

    ${ContainerResumenTitle} {
      padding: 16px 20px;
      flex-direction: column;
      gap: 12px;

      .btn-volver {
        align-self: flex-end;
      }
    }

    ${ContainerResumenContent} {
      padding: 16px;

      .resumen-content {
        .resumen-section {
          padding: 12px;
          margin-bottom: 16px;
        }
      }
    }
  }
`;
