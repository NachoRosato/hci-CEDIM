import { useEffect, useState } from "react";

const HeaderTimer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  var hora = time?.getHours() < 10 ? "0" + time.getHours() : +time.getHours();
  var minutos =
    time?.getMinutes() < 10 ? "0" + time.getMinutes() : +time.getMinutes();
  return `${hora}:${minutos}`;
};

export default HeaderTimer;
