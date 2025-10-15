"use client";
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import MenuIcon from '@/components/icons/MenuIcon';
import Image from 'next/image';

const Bar = styled.header.attrs({
  className: 'w-full flex items-center justify-between px-4 text-white',
})`
  background: var(--color-primary-gradient);
  height: 3em;
`;

function formatTime(d: Date) {
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const diaSemana = dias[d.getDay()];
  const diaMes = d.getDate();
  const mes = meses[d.getMonth()];
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${diaSemana} ${diaMes}, ${mes} ${hh}:${mm}`;
}

export default function Navbar({ onMenu }: { onMenu: () => void }) {
  const [time, setTime] = useState<string>('');
  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Bar>
      <div className="flex items-center gap-2">
        <Image src="/assets/images/empresa/IsoLogo.png" alt="Logo" width={70} height={70} />
      </div>
      <div className="flex items-center gap-4">
        <div className="rb16m">{time}</div>
        <button aria-label="Abrir menú" onClick={onMenu} className="flex items-center gap-2">
          <MenuIcon />
          <span className="rb16b">Menú</span>
        </button>
      </div>
    </Bar>
  );
}

