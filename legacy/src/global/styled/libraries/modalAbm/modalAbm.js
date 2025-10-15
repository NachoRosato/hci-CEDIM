import styled from "styled-components";


export  const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    .fondo-abm {
        width: 100vw;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: hsla(0, 0%, 0%, 0.5);
        z-index: 10;
    }
`;



export const Modal = styled.div`
    border-radius: 8px;
    z-index: 11;
    width: 400px;
    height:  500px; 
    background-color: var(--color-modalAbm-white);
    padding-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    padding: 10px;
    .div {
        width: 300px;
        height: 88px;
    }
    .div2 {
        height: 80px;
        width: 300px;
    }

    .div2-1 {
        height: 50px;
        width: 300px;
    }

    .button {
        width: 304px;
        height: 42px;
        border: 2px solid var(--color-modalAbm-latex30);
        color:var(--color-modalAbm-latex30);
        background-color: transparent;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
    }
    .ptur-inputs-modal {
        width: 10000px;
        border: 10px solid black !important;
    }

    overflow-x:hidden ;
    overflow-y: scroll;
`;

export const Title = styled.h1`
    position: relative;
    margin: 0;
    padding: 0;
    width: max-content;
    height: max-content;
    font-size: 20px;
    background-color: var(--color-modalAbm-latex10);
    padding: 20px;
    border-radius: 20px;
    color: var(--color-modalAbm-white); 
    text-align: center;
`;

export const HeaderModal = styled.div`
    position: relative;
    height: 100px;
    background: var(--color-modalAbm-white);
    display:  flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0;
    margin: 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    .cruz-modalAbm-x {
        color: var(--color-modalAbm-latex10);
        position: absolute;
        top: 3px;
        right:-50px;
        cursor: pointer;
    }
    .ptur-flechitaAbm {
        display: flex;
        justify-content: center;
        align-items: center;
        width: min-content;
        height: 10px;
    }
   
`;