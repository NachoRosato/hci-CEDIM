import "./InputV1.css";
import { useState } from "react";
const InputDate = ({ placeholderText, onChange }) => {
  const [selectedDate, setSelectedDate] = useState("2012-12-15T13:47:20.789");
  const test = (e) => {
  
  };
  return (
    <>
      <div className={`rb16m fecha`}>
        <ion-datetime
          display-timezone="utc"
          placeholder={placeholderText}
          value={selectedDate}
          onIonChange={(e) => test(e)}
          ionChange={test}
          onChange={test}
        ></ion-datetime>
      </div>
    </>
  );
};
export default InputDate;
