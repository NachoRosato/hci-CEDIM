"use client";
import styled, { keyframes, css } from 'styled-components';
import Link from 'next/link';
import CloseIcon from '@/components/icons/CloseIcon';
import DummyIcon from '@/components/icons/DummyIcon';
import DashboardIcon from '@/components/icons/DashboardIcon';
import UsersIcon from '@/components/icons/UsersIcon';
import DocIcon from '@/components/icons/DocIcon';
import LoginIcon from '@/components/icons/LoginIcon';
import GearIcon from '@/components/icons/GearIcon';
import { useEffect, useState } from 'react';
import { getRuntimeConfig } from '@/utils/runtimeConfig';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0%); }
`;
const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;
const slideOut = keyframes`
  from { transform: translateX(0%); }
  to { transform: translateX(100%); }
`;
const Drawer = styled.aside.attrs({
  className: 'fixed top-0 right-0 h-full w-80 shadow-2xl z-50 flex flex-col text-white',
})<{$closing?: boolean}>`
  background: var(--color-latex10);
  border-radius: 12px 0 0 12px;
  overflow: hidden;
  ${({ $closing }) => $closing
    ? css`animation: ${slideOut} 220ms ease both, ${fadeOut} 220ms ease both;`
    : css`animation: ${slideIn} 220ms ease both, ${fadeIn} 220ms ease both;`}
`;

const Backdrop = styled.div.attrs({
  className: 'fixed inset-0 bg-black/30 z-40',
})<{$closing?: boolean}>`
  animation: ${fadeIn} 180ms ease both;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  ${({ $closing }) => $closing && css`animation: ${fadeOut} 180ms ease both;`}
`;

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [user, setUser] = useState<string>('');
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const cfg = await getRuntimeConfig();
        setUser(cfg.mockUser ?? 'Usuario');
      } catch { setUser('Usuario'); }
    })();
  }, []);
  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
    } else if (mounted) {
      setClosing(true);
      const id = setTimeout(() => {
        setMounted(false);
        setClosing(false);
      }, 220);
      return () => clearTimeout(id);
    }
  }, [open, mounted]);
  if (!mounted && !closing) return null;
  return (
    <>
      <Backdrop $closing={closing} onClick={onClose} />
      <Drawer $closing={closing} role="dialog" aria-modal="true">
        <div className="h-16 px-4 flex items-center justify-between">
          <button aria-label="Cerrar" onClick={onClose} className="p-2 rounded-full transition-all duration-200 hover:scale-110 hover:bg-white/15">
            <CloseIcon />
          </button>
          <div className="rb16m">{user}</div>
        </div>
        <div className="px-4 py-2">
          <div className="h-[1px] mx-6 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
        <nav className="p-4 flex-1 overflow-auto">
          <ul className="rb16m space-y-2">
            <li>
              <Link className="flex items-center gap-3 px-3 py-3 rounded bgc-latexAlternative c-white transition-transform will-change-transform hover:-translate-y-[1px] hover:shadow-md shadow-sm" href="/protected/dashboard">
                <DashboardIcon />
                <span className="rb14b">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 px-3 py-3 rounded bgc-latexAlternative c-white transition-transform will-change-transform hover:-translate-y-[1px] hover:shadow-md shadow-sm" href="#">
                <UsersIcon />
                <span className="rb14b">Pacientes</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 px-3 py-3 rounded bgc-latexAlternative c-white transition-transform will-change-transform hover:-translate-y-[1px] hover:shadow-md shadow-sm" href="#">
                <DocIcon />
                <span className="rb14b">Protocolos</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 px-3 py-3 rounded bgc-latexAlternative c-white transition-transform will-change-transform hover:-translate-y-[1px] hover:shadow-md shadow-sm" href="#">
                <GearIcon />
                <span className="rb14b">Configuración</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="px-4 py-2">
          <div className="h-[1px] mx-6 bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
        <div className="p-4">
          <button onClick={onClose} className="rb14b px-3 py-3 rounded c-white w-full flex items-center justify-center gap-2 transition-transform will-change-transform duration-200 hover:-translate-y-[1px] hover:shadow-lg hover:opacity-95" style={{ backgroundColor: 'hsla(0, 0%, 35%, 1)' }}>
            <LoginIcon />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </Drawer>
    </>
  );
}

