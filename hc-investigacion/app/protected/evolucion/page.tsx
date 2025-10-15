"use client";
import styled from 'styled-components';
import { useMemo, useState, useEffect } from 'react';
import ArrowIcon from '@/components/icons/ArrowIcon';

const Page = styled.div.attrs({ className: 'w-full max-w-[1200px] bg-white rounded-md' })``;
const Body = styled.div.attrs({ className: 'grid grid-cols-1 md:grid-cols-2' })``;

// Panel izquierdo - resumen (gradiente azul)
const Left = styled.div`
  position: relative;
  min-height: 640px;
  background: linear-gradient(90deg, #0036E8 0%, #4491F5 100%);
  padding: 20px;
`;

const Box = styled.div.attrs({ className: 'bg-white shadow rounded-md' })``;
const Title = styled.h3.attrs({ className: 'rb16b c-white mb-2' })``;
const Chip = styled.span.attrs({ className: 'rb12b text-white px-3 py-1 rounded-[3px] inline-block mr-2 mb-2' })``;

// Panel derecho - formulario/completar
const Right = styled.div.attrs({ className: 'bg-white rounded-none md:rounded-none shadow border-l border-gray-200 p-6 min-h-[640px]' })``;

const ToggleBtn = styled.button`
  position: absolute;
  top: 8px;
  right: -18px;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: var(--color-primary);
  color: white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  display: flex; align-items: center; justify-content: center;
`;

export default function EvolucionPage() {
  const [showLeft, setShowLeft] = useState(true);

  // IMC
  const [alturaCm, setAlturaCm] = useState<string>('');
  const [pesoKg, setPesoKg] = useState<string>('');
  const [rangoEdad, setRangoEdad] = useState<string>('18-25');
  const imc = useMemo(() => {
    const h = parseFloat(alturaCm);
    const p = parseFloat(pesoKg);
    if (!h || !p) return '';
    const val = p / Math.pow(h / 100, 2);
    return val ? val.toFixed(1) : '';
  }, [alturaCm, pesoKg]);

  // Presión
  const [tas, setTas] = useState<string>('');
  const [tad, setTad] = useState<string>('');
  const taMedia = useMemo(() => {
    const s = parseFloat(tas); const d = parseFloat(tad);
    if (!s || !d) return '';
    const map = (s + 2 * d) / 3;
    return map.toFixed(2);
  }, [tas, tad]);

  const [fechaBtn] = useState('');

  return (
    <Page>
      {/* HeaderBar ya proviene del layout protegido, omitimos la barra secundaria del diseño */}
      <Body className={showLeft ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-1'}>
        {showLeft && (
        <Left>
          <Title>NOTAS</Title>
          <Box className="p-3 mb-4">
            <Chip style={{ background: '#FB5555' }}>Estado: AUSENTE</Chip>
            <Chip style={{ background: '#FB5555' }}>Eventos Adversos: Erupción Cutanea</Chip>
            <Chip style={{ background: '#A4DF71' }}>Dosis: Normal</Chip>
          </Box>
          {/* Información de paciente */}
          <Box className="p-3 mb-4">
            <div className="rb20nh c-white">Jane Doe (F)</div>
            <div className="rb14b c-white">30 años 1/2/1995 · DNI: 40559615</div>
            <div className="rb14l c-white">Tel: 115569605 · Brasil 780, Villa Sarmiento</div>
            <div className="rb14l c-white">HCD: 11812033 · HCP: 18669</div>
          </Box>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* IMC */}
            <div>
              <div className="rb16b c-white mb-1">IMC</div>
              <Box className="p-3">
                <div className="grid grid-cols-3 gap-2 items-end">
                  <div>
                    <label className="rb14b c-latex10">Altura</label>
                    <input value={alturaCm} onChange={(e)=>setAlturaCm(e.target.value)} className="rb12l c-latex30 border border-gray-300 rounded px-2 py-1 w-full" placeholder="cm" />
                  </div>
                  <div>
                    <label className="rb14b c-latex10">Peso</label>
                    <input value={pesoKg} onChange={(e)=>setPesoKg(e.target.value)} className="rb12l c-latex30 border border-gray-300 rounded px-2 py-1 w-full" placeholder="kg" />
                  </div>
                  <div>
                    <label className="rb14b c-latex10">Rango edad</label>
                    <select value={rangoEdad} onChange={(e)=>setRangoEdad(e.target.value)} className="rb12l c-latex30 border border-gray-300 rounded px-2 py-1 w-full">
                      <option>&lt; 18</option>
                      <option>18-25</option>
                      <option>25-30</option>
                      <option>30-35</option>
                      <option>35-40</option>
                      <option>40-45</option>
                    </select>
                  </div>
                </div>
                <div className="mt-2 rb16b" style={{ color: '#286CF0' }}>{imc || '--'}</div>
                <div className="rb14l" style={{ color: '#286CF0' }}>{imc ? 'Resultado IMC' : 'Complete para calcular'}</div>
              </Box>
            </div>

            {/* Presión */}
            <div>
              <div className="rb16b c-white mb-1">PRESIÓN</div>
              <Box className="p-3">
                <div className="grid grid-cols-3 gap-2 items-center">
                  <div className="rb14b c-latex10">TA sistólica</div>
                  <input value={tas} onChange={(e)=>setTas(e.target.value)} className="rb12l c-latex30 border border-gray-300 rounded px-2 py-1 text-center" placeholder="mmHg" />
                  <div className="rb12b c-latex10">mmHg</div>

                  <div className="rb14b c-latex10">TA diastólica</div>
                  <input value={tad} onChange={(e)=>setTad(e.target.value)} className="rb12l c-latex30 border border-gray-300 rounded px-2 py-1 text-center" placeholder="mmHg" />
                  <div className="rb12b c-latex10">mmHg</div>

                  <div className="rb14b c-latex10">TA media</div>
                  <div className="rb14b text-white bg-[#286CF0] rounded px-3 py-1 text-center">{taMedia || '--'}</div>
                  <div className="rb12b c-latex10">mmHg</div>
                </div>
              </Box>
            </div>
          </div>

          {/* Criterios */}
          <div className="mt-4">
            <div className="rb16b c-white mb-2">CRITERIOS: ANT-010 RED ⓘ</div>
            <Box className="p-3">
              <div className="rb14b text-white bg-[#A4DF71] rounded px-3 py-2 mb-2">FA o aleteo auricular diagnosticados/documentados en un ECG o monitoreo</div>
              <div className="rb14b text-white bg-[#A4DF71] rounded px-3 py-2 mb-2">FA debida a una causa reversible aguda en curso</div>
              <div className="rb14b text-white bg-[#A4DF71] rounded px-3 py-2 mb-2">FA debida a una causa reversible aguda en curso</div>
              <div className="rb14b text-white bg-[#FB5555] rounded px-3 py-2 mb-2">FA debida a una causa reversible aguda en curso</div>
              <div className="rb14b text-white bg-[#FB5555] rounded px-3 py-2">FA debida a una causa reversible aguda en curso</div>
            </Box>
          </div>

          <ToggleBtn onClick={()=>setShowLeft(false)} aria-label="Ocultar panel">
            <ArrowIcon direction="right" />
          </ToggleBtn>
        </Left>
        )}

        <Right className={showLeft ? '' : 'md:col-span-2 relative'}>
          {/* Panel de datos/formulario simplificado */}
          <div className="rb16b mb-4">Datos</div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <label className="rb14l c-black35">Apellidos y Nombres</label>
              <input className="rb12l c-latex30 border border-gray-300 rounded px-2 py-1" placeholder="Ej: Jane Doe" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="rb14l c-black35">Domicilio</label>
              <input className="rb12l c-latex30 border border-gray-300 rounded px-2 py-1" placeholder="Ej: Brasil 780, Villa Sarmiento" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1">
                <label className="rb14l c-black35">DNI</label>
                <input className="rb12l c-latex30 border border-gray-300 rounded px-2 py-1" placeholder="Ej: 40559615" />
              </div>
              <div className="col-span-1">
                <label className="rb14l c-black35">Edad</label>
                <input className="rb12l c-latex30 border border-gray-300 rounded px-2 py-1" placeholder="Ej: 30" />
              </div>
              <div className="col-span-1">
                <label className="rb14l c-black35">Fecha de nacimiento</label>
                <input className="rb12l c-latex30 border border-gray-300 rounded px-2 py-1" placeholder="20/02/95" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <label className="rb14l c-black35">Profesión/Tarea Actual</label>
              <input className="rb12l c-latex30 border border-gray-300 rounded px-2 py-1" placeholder="Ej: Abogada, Profesor, etc." />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <label className="rb14l c-black35">Accesibilidad</label>
              <div className="space-y-2">
                <div className="rb12l c-black35">Puede movilizarse <span className="rb12l c-grey65">Sin dificultad</span></div>
                <div className="rb12l c-black35">Con movilidad propia · Con transporte · Público · Privado</div>
                <div className="rb12l c-black35">Accede sin dificultad al transporte</div>
                <div className="rb12l c-black35">Puede salir sin dificultad de su casa · Calle de asfalto</div>
                <div className="rb12l c-black35">El transporte llega hasta su casa</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6">
              <button className="rb14b px-4 py-2 rounded bg-[#FB5555] c-white">Cancelar</button>
              <div className="flex items-center gap-3">
                <button className="rb14b px-4 py-2 rounded bg-[#A4DF71] c-white">Preview</button>
                <button className="rb14b px-4 py-2 rounded bg-[#A4DF71] c-white">Preview</button>
              </div>
            </div>
          </div>
          {!showLeft && (
            <button onClick={()=>setShowLeft(true)} className="absolute top-4 left-4 w-10 h-10 rounded-full bgc-latexAlternative c-white flex items-center justify-center" aria-label="Mostrar panel">
              <ArrowIcon direction="left" />
            </button>
          )}
        </Right>
      </Body>
    </Page>
  );
}


