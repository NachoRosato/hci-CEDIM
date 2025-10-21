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
  position: relative;
  z-index: 10;
`;

const FloatingMenuButton = styled.button<{ $show: boolean }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--color-primary-gradient);
  color: var(--color-white);
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  opacity: ${props => props.$show ? '1' : '0'};
  transform: ${props => props.$show ? 'scale(1)' : 'scale(0)'};
  pointer-events: ${props => props.$show ? 'all' : 'none'};
  
  &:hover {
    transform: ${props => props.$show ? 'scale(1.1)' : 'scale(0)'};
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  svg {
    width: 28px;
    height: 28px;
  }
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
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  
  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar botón flotante cuando el scroll supera la altura del navbar (3em ≈ 48px)
      setShowFloatingButton(window.scrollY > 48);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
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
      
      <FloatingMenuButton
        $show={showFloatingButton}
        onClick={onMenu}
        aria-label="Abrir menú"
        title="Menú"
      >
        <MenuIcon />
      </FloatingMenuButton>
    </>
  );
}

