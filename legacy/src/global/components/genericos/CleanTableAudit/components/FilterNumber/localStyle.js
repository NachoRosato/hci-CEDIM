import styled from "styled-components";

export const FilterNumberContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ededed;
  color: var(--color-black);

  
  .range-container {
    width: 100%;
    height: 100px; 
    position: sticky;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .max-min-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  .container-btn {
    width: 90%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 150px;
    margin: auto;
  }




input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #C6C6C6;
  cursor: pointer;
}

input[type=range]::-moz-range-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #C6C6C6;
  cursor: pointer;  
}

input[type=range]::-webkit-slider-thumb:hover {
  background: #f7f7f7;
}

input[type=range]::-webkit-slider-thumb:active {
  box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
  -webkit-box-shadow: inset 0 0 3px #387bbe, 0 0 9px #387bbe;
}

input[type=number] {
  color: #8a8383;
  width: 50px;
  height: 30px;
  font-size: 20px;
  border: none;
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button {  
   opacity: 1;
}

input[type=range] {
  -webkit-appearance: none; 
  appearance: none;
  height: 2px;
  width: 100%;
  position: absolute;
  background-color: #C6C6C6;
  pointer-events: none;
}
  
`;
