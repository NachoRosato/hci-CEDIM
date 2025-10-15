import { createGlobalStyle } from "styled-components";

const GlobalStyled = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap');
    body {
        padding: 0;
        margin: 0;
        background:#fff;
        color: #000;
        font-family: 'Rubik', sans-serif;
    }
    * {
        margin: 0;
        padding: 0;
        outline: none;
        font-family: "Rubik", sans-serif;
        box-sizing: border-box;
        /* Let's get this party started */
        ::-webkit-scrollbar {
          width: 8px;
        }
        /* Handle */
        ::-webkit-scrollbar-thumb {
          -webkit-border-radius: 10px;
          border-radius: 10px;
          background: var(--color-scrollbar);
        }
        ::-webkit-scrollbar-thumb:hover {
          background: var(--color-latex10);
        }
    }

    :root {
        /*------------------- Variables de los componenetes genericos -----------------------------*/
        /*-- color inicial login */
        --color-primary-gradient: linear-gradient(90deg, #001019 18.65%, #014e7a 86.55%);
        --color-latex30-gradient: linear-gradient(257.94deg, #027bc0 18.65%, #004b76 86.55%);
        --color-primary-gradient2: linear-gradient(90deg, #ff6600 18.65%, #ff8266 86.55%);


        --color-primary:hsl(24, 100.00%, 50.00%);
        --color-secondary:hsla(11, 100%, 70%, 1);
        --color-disabled: hsla(11, 100%, 80%, 1);
        --color-danger: hsla(4, 100%, 40%, 1);
        --color-latex95: hsla(202, 100%, 95%, 1);
        --color-latex30:hsl(202, 100.00%, 30.00%);
        --color-scrollbar: hsla(202, 100%, 30%, 1);
        --color-latexPcr:hsl(202, 96.80%, 24.70%);
        --color-white: hsla(0, 0%, 100%, 1);
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
        --color-green28: hsla(173, 100%, 28%, 1);
        --color-broccoli: hsla(128, 43%, 42%, 1);
        --color-latex10: #002133;
        --color-greyScrollBar: #f1f1f1;

        --color-latexAbmRgb: #00446A;
        --color-checkboxnew-white: #fff; 

        --color-datePicker-grey95: hsla(0, 0%, 95%, 1);
        --color-datePicker-grey45: hsla(0, 0%, 45%, 1);
        --color-datePicker-grey90: hsla(0, 0%, 90%, 1);
        --color-datePicker-latex30: hsla(202, 100%, 30%, 1);
        --color-datePicker-latex10: hsla(202, 100%, 10%, 1);
        --color-datePicker-danger: hsla(4, 100%, 40%, 1);
        --color-datePikcker-white: #fff;
        --color-datePicker-primary: hsla(24, 100%, 50%, 1);

        --color-dropdown-grey90: hsla(0, 0%, 90%, 1);
        --color-dropdown-grey45: hsla(0, 0%, 45%, 1);
        --color-dropdown-grey97: hsla(0, 0%, 97%, 1);
        --color-dropdown-latex30: hsla(202, 100%, 30%, 1); 
        --color-dropdown-white: #fff; 
        --color-dropdown-grey77:  hsla(0, 0%, 77%, 1);
        --color-dropdown-black35:  hsla(0, 0%, 35%, 1);

        --color-dropdownAdm-danger: hsla(4, 100%, 40%, 1);
        --color-dropdownAdm-grey97: hsla(0, 0%, 97%, 1);
        --color-dropdownAdm-grey90: hsla(0, 0%, 90%, 1);
        --color-dropdownAdm-black: #000; 
        --color-dropdownAdm-white: #fff;
        --color-dropdownAdm-latex30: hsla(202, 100%, 30%, 1); 
        --color-dropdownAdm-grey45: hsla(0, 0%, 45%, 1);

        --color-inputs-grey97: hsla(0, 0%, 97%, 1);
        --color-inputs-grey90: hsla(0, 0%, 90%, 1);
        --color-inputs-grey45: hsla(0, 0%, 45%, 1);
        --color-inputs-danger: hsla(4, 100%, 40%, 1);

        --color-inputV1-grey45:  hsla(0, 0%, 45%, 1);
        --color-inputV1-grey90: hsla(0, 0%, 90%, 1);
        --color-inputV1-grey95:  hsla(0, 0%, 95%, 1);
        --color-inputV1-latex30: hsla(202, 100%, 30%, 1); 
        --color-inputV1-danger: hsla(4, 100%, 40%, 1);
        --color-inputs-black: #000;

        --color-searcher-grey97: hsla(0, 0%, 97%, 1);
        --color-searcher-grey90: hsla(0, 0%, 90%, 1);
        --color-searcher-grey45: hsla(0, 0%, 45%, 1);
        --color-searcher-black: #000; 
        --color-searcher-latex30: hsla(202, 100%, 30%, 1); 
        --color-searcher-white: #fff; 
        --color-searcher-danger: hsla(4, 100%, 40%, 1);

        --color-table-latex10: hsla(202, 100%, 10%, 1);
        --color-table-white: #fff; 
        --color-table-black: #000;

        --color-textArea-grey97: hsla(0, 0%, 97%, 1);
        --color-textArea-grey90: hsla(0, 0%, 90%, 1);
        --color-textArea-danger: hsla(4, 100%, 40%, 1);
        --color-textArea-black: #000:

        --color-toaster-danger: hsla(4, 100%, 40%, 1);
        --color-toaster-white: #fff; 

        --color-tooltip-white: #fff; 
        --color-tooltip-latex10: hsla(202, 100%, 10%, 1);
        --color-tooltip-grey65: hsla(0, 0%, 65%, 1);

        --color-modalAbm-white: #fff;
        --color-modalAbm-latex30: hsla(202, 100%, 30%, 1);
        --color-modalAbm-latex10: hsla(202, 100%, 10%, 1);

        ${({ mode }) => {
          if (mode === "blue") {
            return `
            --color-primary-gradient: linear-gradient(90deg, #001019 18.65%, #014e7a 86.55%);
            --color-latex30-gradient: linear-gradient(257.94deg, #027bc0 18.65%, #004b76 86.55%);
            --color-primary-footer: #002133 ;
            --color-latex10: #002133;
            --color-resaltado: #002133;
          `;
          } else if (mode === "silver") {
            return `
            --color-primary-gradient: linear-gradient(90deg, #717171 1.76%, #333333 100%);
            --color-latex30-gradient: hsla(0, 0%, 45%, 1);
            --color-primary-footer: #333333;
            --color-latex10: #333333; 
            --color-scrollbar: #ff6600; 
            --color-resaltado: #ff6600;
  
          `;
          } else {
            return `
            --color-primary-gradient: linear-gradient(90deg, #001019 18.65%, #014e7a 86.55%);
            --color-primary-footer: #002133 ;
            --color-latex10: #002133;
            --color-resaltado: #002133;
          `;
          }
        }}
        
        /*------------------- Variables de los componenetes genericos -----------------------------*/
 

                
        /* Fuentes Rubik */
        .rb52b {
        font-family: Rubik;
        font-style: normal;
        font-weight: bold;
        font-size: 52px;
        }
        .rb32b {
        font-family: Rubik;
        font-style: normal;
        font-weight: bold;
        font-size: 32px;
        }
        .rb32t {
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 32px;
        }
        .rb24b {
        font-family: Rubik;
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        }
        .rb24t {
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        }

        .rb20nh {
        font-family: Rubik;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%;
        }

        .rb18b {
        font-family: Rubik;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        }
        .rb18hh {
        font-family: Rubik;
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        }
        .rb18mh {
        font-family: Rubik;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 150%;
        }
        .rb18m {
        font-family: Rubik;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        }
        .rb18l {
        font-family: Rubik;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        }

        /* Rubik 100%/16 Rubik 100% (Bold) */
        .rb16xxl{
          font-family: Rubik;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 169%;
        }
        .rb16xl {
        font-family: Rubik;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 150%;
        }
        .rb16mb {
        font-family: Rubik;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 150%;
        }

        .rb16b {
        font-family: Rubik;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        }
        .rb16mh {
        font-family: Rubik;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 150%;
        }
        .rb16m {
        font-family: Rubik;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        }
        .rb16l {
        font-family: Rubik;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        }
        .rb16t {
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        }
        .rb14b {
        font-family: Rubik;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        }
        .rb14m {
        font-family: Rubik;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        }
        .rb14mb {
        font-family: Rubik;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 150%;
        }
        .rb14l {
        font-family: Rubik;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        }
        .rb14t {
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        }
        .rb12m {
        font-family: Rubik;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        }
        .rb12l {
        font-family: Rubik;
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        }
        .rb12t {
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        }
        .rb12tl {
        line-height: 150%;
        font-family: Rubik;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        }
        .rb12b {
          font-family: Rubik;
          font-size: 12px;
          font-weight: 700;
          line-height: 18px;
        }
        .rb12bn {
          font-family: Rubik;
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          line-height: 150%;
        }

        .c-primary {
        color: hsla(24, 100%, 50%, 1);
        }
        .c-secondary {
        color: hsla(11, 100%, 70%, 1);
        }
        .c-disabled {
        color: hsla(11, 100%, 80%, 1);
        }
        .c-danger {
        color: hsla(4, 100%, 40%, 1);
        }
        .c-latex30 {
        color: hsla(202, 100%, 30%, 1);
        }
        .c-latex20 {
        color: hsla(202, 100%, 19%, 1);
        }
        .c-latex10 {
        color: hsla(202, 100%, 10%, 1);
        }
        .c-white {
        color: hsla(0, 0%, 100%, 1);
        }
        .c-grey97 {
        color: hsla(0, 0%, 97%, 1);
        }
        .c-grey95 {
        color: hsla(0, 0%, 95%, 1);
        }
        .c-grey90 {
        color: hsla(0, 0%, 90%, 1);
        }
        .c-grey85 {
        color: hsla(0, 0%, 85%, 1);
        }
        .c-grey65 {
        color: hsla(0, 0%, 65%, 1);
        }
        .c-grey45 {
        color: hsla(0, 0%, 45%, 1);
        }
        .c-black35 {
        color: hsla(0, 0%, 35%, 1);
        }
        .c-black20 {
        color: hsla(0, 0%, 20%, 1);
        }
        .c-black10 {
        color: hsla(0, 0%, 10%, 1);
        }
        .c-black5 {
        color: hsla(0, 0%, 5%, 1);
        }
        .c-black {
        color: hsla(0, 0%, 0%, 1);
        }

        .c-broccoli {
        color: hsla(128, 43%, 42%, 1);
        }

        .bgc-primary {
        background-color: hsla(24, 100%, 50%, 1);
        }
        .bgc-secondary {
        background-color: hsla(11, 100%, 70%, 1);
        }
        .bgc-disabled {
        background-color: hsla(11, 100%, 80%, 1);
        }
        .bgc-danger {
        background-color: hsla(4, 100%, 40%, 1);
        }
        .bgc-latex95 {
        background-color: hsla(202, 100%, 95%, 1);
        }
        .bgc-latex30 {
        background-color: hsla(202, 100%, 30%, 1);
        }
        .bgc-latex10 {
        background-color: var(--color-latex10);
        }
        .bgc-white {
        background-color: hsla(0, 0%, 100%, 1);
        }
        .bgc-grey97 {
        background-color: hsla(0, 0%, 97%, 1);
        }
        .bgc-grey95 {
        background-color: hsla(0, 0%, 95%, 1);
        }
        .bgc-grey90 {
        background-color: hsla(0, 0%, 90%, 1);
        }
        .bgc-grey85 {
        background-color: hsla(0, 0%, 85%, 1);
        }
        .bgc-grey65 {
        background-color: hsla(0, 0%, 65%, 1);
        }
        .bgc-grey45 {
        background-color: hsla(0, 0%, 45%, 1);
        }
        .bgc-black35 {
        background-color: hsla(0, 0%, 35%, 1);
        }
        .bgc-black20 {
        background-color: hsla(0, 0%, 20%, 1);
        }
        .bgc-black10 {
        background-color: hsla(0, 0%, 10%, 1);
        }
        .bgc-black5 {
        background-color: hsla(0, 0%, 5%, 1);
        }
        .bgc-black {
        background-color: hsla(0, 0%, 0%, 1);
        }

        .bgc-green28 {
        background-color: hsla(173, 100%, 28%, 1);
        }

        .bgc-Facebook {
        background-color: #4c69ba;
        }

        .bgc-broccoli {
        background-color: hsla(128, 43%, 42%, 1);
        }

        .bgc-transparent {
        background-color: transparent;
        }

        /* Gradiente Headers */
        .bgcG-latex30 {
        background: linear-gradient(257.94deg, #027bc0 18.65%, #004b76 86.55%);
        }

        .bgcG-danger {
        background: linear-gradient(95.53deg, #730700 1.56%, #c10c00 65.41%);
        }

        .b-latex30 {
        border: 1px #006299 solid;
        }
        /* Hover */
        .hoverLatex95:hover {
        background: var(--color-latex95);
        }
        .hoverSecondary:hover {
        background: var(--color-secondary);
        }

        .pointer{
          cursor: pointer;
        }

        /* Image rotates */

        .img-rotated-90 {
          -webkit-transform: rotate(-90deg);
          -moz-transform: rotate(-90deg);
          -ms-transform: rotate(-90deg);
          -o-transform: rotate(-90deg);
          transform: rotate(-90deg);
          transition: 0.3s all;
        }

        .img-rotated180 {
          -webkit-transform: rotate(180deg);
          -moz-transform: rotate(180deg);
          -ms-transform: rotate(180deg);
          -o-transform: rotate(180deg);
          transform: rotate(180deg);
          transition: 0.3s all;
        }
        .img-rotatedX180 {
          transform: rotateX(-0.5turn);
          transition: 0.3s all;
        }

        .m-0 {
          margin: 0px;
        }
        .pointer {
          cursor: pointer;
        }

        .btn {
          padding: 12px 56px;
        }
        .f-left {
          float: left;
        }
        .f-right {
          float: right;
        }

        /* comentamos la siguiente clase utilizada para bloquear la seleccion */
        /* .noSeleccionable {
          -webkit-touch-callout: none; 
          -webkit-user-select: none; 
          -khtml-user-select: none; 
          -moz-user-select: none; 
          -ms-user-select: none; 
          user-select: none; 
        } */

        .textCenter {
          text-align: center;
        }
        .clear {
          clear: both;
        }

        .underline {
          text-decoration: underline;
        }

        .iosMobileStatusBarFix{
          padding-top: 40px;
          height: 85px;
          @media (max-width: 1365px) {
            height: 85px;
          };
        };

        /* Effecto Opaccity */

        .OpacityEffect {
          animation-name: OpacityEffect;
        }

        @keyframes OpacityEffect {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }


    }
`;

export default GlobalStyled;
