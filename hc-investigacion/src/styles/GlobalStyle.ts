"use client";
import { createGlobalStyle } from 'styled-components';

// Port mínimo desde GlobalStyle.js para asegurar coherencia visual
const GlobalStyle = createGlobalStyle<{ mode?: 'blue' | 'silver' | 'default' }>`
  :root {
    /* Base tokens */
    --color-primary: hsl(24 100% 50%);
    --color-secondary: hsl(11 100% 70%);
    --color-latex30: hsl(202 100% 30%);
    --color-latex10: #002133;
    --color-scrollbar: hsl(202 100% 30%);

    /* Gradients from legacy */
    --color-primary-gradient: linear-gradient(90deg, #001019 18.65%, #014e7a 86.55%);
    --color-latex30-gradient: linear-gradient(257.94deg, #027bc0 18.65%, #004b76 86.55%);

    /* Formularios - Variables adicionales */
    --color-latex95: hsla(202, 100%, 95%, 1);
    --color-grey97: hsla(0, 0%, 97%, 1);
    --color-grey95: hsla(0, 0%, 95%, 1);
    --color-grey90: hsla(0, 0%, 90%, 1);
    --color-grey85: hsla(0, 0%, 85%, 1);
    --color-grey77: hsla(0, 0%, 77%, 1);
    --color-grey65: hsla(0, 0%, 65%, 1);
    --color-grey45: hsla(0, 0%, 45%, 1);
    --color-black35: hsla(0, 0%, 35%, 1);
    --color-black20: hsla(0, 0%, 20%, 1);
    --color-black10: hsla(0, 0%, 10%, 1);
    --color-black5: hsla(0, 0%, 5%, 1);
    --color-black: hsla(0, 0%, 0%, 1);
    --color-broccoli: hsla(128, 43%, 42%, 1);
    --color-white: hsla(0, 0%, 100%, 1);
  }

  body {
    margin: 0;
    background: #fff;
    color: #000;
    font-family: 'Rubik', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  ${({ mode }) => {
    if (mode === 'blue') {
      return `:root{ --color-latex10:#002133; --color-primary-gradient: linear-gradient(90deg, #001019 18.65%, #014e7a 86.55%); }`;
    }
    if (mode === 'silver') {
      return `:root{ --color-scrollbar:#ff6600; --color-primary-gradient: linear-gradient(90deg, #717171 1.76%, #333333 100%); }`;
    }
    return '';
  }}

  /* Tipografías (port legacy) */
  .rb24b{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
  }
  .rb16m{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
  }
  .rb14l{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
  }
  .rb10l{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
  }
  .rb10b{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
  }
  .rb9b{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 9px;
  }
  .rb8l{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 8px;
  }

  /* Tipografías adicionales (legacy) */
  .rb52b{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 52px;
  }
  .rb32b{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
  }
  .rb32t{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
  }
  .rb24t{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
  }
  .rb20nh{
    font-family: 'Rubik', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  }
  .rb18b{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
  }
  .rb18hh{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
  }
  .rb18mh{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 150%;
  }
  .rb18m{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
  }
  .rb18l{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
  }
  .rb16xxl{
    font-family: 'Rubik', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 169%;
  }
  .rb16xl{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
  }
  .rb16mb{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
  }
  .rb16b{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
  }
  .rb16mh{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
  }
  .rb16l{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
  }
  .rb16t{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
  }
  .rb14m{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
  }
  .rb14b{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
  }
  .rb14mb{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
  }
  .rb14t{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
  }
  .rb12m{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
  }
  .rb12l{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
  }
  .rb12t{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
  }
  .rb12tl{
    line-height: 150%;
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
  }
  .rb12b{
    font-family: 'Rubik', sans-serif;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
  }
  .rb12bn{
    font-family: 'Rubik', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
  }
  /* Extra (no legacy): utilizada en UI actual */
  .rb22b{
    font-family: 'Rubik', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
  }

  /* Colores texto (legacy) */
  .c-primary{ color: hsla(24, 100%, 50%, 1); }
  .c-secondary{ color: hsla(11, 100%, 70%, 1); }
  .c-disabled{ color: hsla(11, 100%, 80%, 1); }
  .c-danger{ color: hsla(4, 100%, 40%, 1); }
  .c-dangerDark{ color: hsla(4, 100%, 30%, 1); }
  .c-latex30{ color: hsla(202, 100%, 30%, 1); }
  .c-latex20{ color: hsla(202, 100%, 19%, 1); }
  .c-latex10{ color: hsla(202, 100%, 10%, 1); }
  /* Alternativa solicitada */
  .c-latexAlternative{ color: hsla(202, 96%, 25%, 1); }
  .c-latexAlternative{ color: hsl(235.38deg 32.19% 47.17%); }
  .c-white{ color: hsla(0,0%,100%,1); }
  .c-grey97{ color: hsla(0,0%,97%,1); }
  .c-grey95{ color: hsla(0,0%,95%,1); }
  .c-grey90{ color: hsla(0,0%,90%,1); }
  .c-grey85{ color: hsla(0,0%,85%,1); }
  .c-grey65{ color: hsla(0,0%,65%,1); }
  .c-grey45{ color: hsla(0,0%,45%,1); }
  .c-black35{ color: hsla(0,0%,35%,1); }
  .c-black20{ color: hsla(0,0%,20%,1); }
  .c-black10{ color: hsla(0,0%,10%,1); }
  .c-black5{ color: hsla(0,0%,5%,1); }
  .c-black{ color: hsla(0,0%,0%,1); }
  .c-broccoli{ color: hsla(128,43%,42%,1); }

  /* Backgrounds (legacy) */
  .bgc-primary{ background-color: hsla(24, 100%, 50%, 1); }
  .bgc-secondary{ background-color: hsla(11, 100%, 70%, 1); }
  .bgc-disabled{ background-color: hsla(11, 100%, 80%, 1); }
  .bgc-danger{ background-color: hsla(4, 100%, 40%, 1); }
  .bgc-dangerSoft{ background-color: hsla(4, 100%, 90%, 1); }
  .bgc-latex95{ background-color: hsla(202, 100%, 95%, 1); }
  .bgc-latex30{ background-color: hsla(202, 100%, 30%, 1); }
  .bgc-latex10{ background-color: var(--color-latex10); }
  .bgc-latexAlternative{ background-color: hsla(202, 96%, 25%, 1); }
  .bgc-white{ background-color: hsla(0,0%,100%,1); }
  .bgc-grey97{ background-color: hsla(0,0%,97%,1); }
  .bgc-grey95{ background-color: hsla(0,0%,95%,1); }
  .bgc-grey90{ background-color: hsla(0,0%,90%,1); }
  .bgc-grey85{ background-color: hsla(0,0%,85%,1); }
  .bgc-grey65{ background-color: hsla(0,0%,65%,1); }
  .bgc-grey45{ background-color: hsla(0,0%,45%,1); }
  .bgc-black35{ background-color: hsla(0,0%,35%,1); }
  .bgc-black20{ background-color: hsla(0,0%,20%,1); }
  .bgc-black10{ background-color: hsla(0,0%,10%,1); }
  .bgc-black5{ background-color: hsla(0,0%,5%,1); }
  .bgc-black{ background-color: hsla(0,0%,0%,1); }
  .bgc-green28{ background-color: hsla(173,100%,28%,1); }
  .bgc-Facebook{ background-color: #4c69ba; }
  .bgc-broccoli{ background-color: hsla(128,43%,42%,1); }
  .bgc-transparent{ background-color: transparent; }

  /* Background gradients (legacy) */
  .bgcG-latex30{ background: linear-gradient(257.94deg, #027bc0 18.65%, #004b76 86.55%); }
  .bgcG-danger{ background: linear-gradient(95.53deg, #730700 1.56%, #c10c00 65.41%); }
`;

export default GlobalStyle;


