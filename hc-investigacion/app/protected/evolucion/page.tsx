"use client";
import styled from 'styled-components';
import { useMemo, useState } from 'react';
import ArrowIcon from '@/components/icons/ArrowIcon';
import { MultiPageForm } from '@/components/forms';
import { evolucionFormConfig } from '@/config/evolucionFormConfig';
import { FormData } from '@/components/forms/types';

const Page = styled.div.attrs({ className: 'w-full bg-white rounded-md' })`
  max-width: min(1920px, 95vw);
  min-width: 1366px;
  
  @media (max-width: 1400px) {
    min-width: 100%;
  }
`;

const Body = styled.div.attrs({ className: 'grid grid-cols-1 md:grid-cols-2' })`
  position: relative;
`;

// Panel izquierdo - resumen (gradiente azul)
const Left = styled.div`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(90deg, #0036E8 0%, #4491F5 100%);
  padding: 12px;
  overflow: hidden;
`;

const Box = styled.div.attrs({ className: 'bg-white shadow rounded-md' })``;
const Title = styled.h3.attrs({ className: 'rb14b c-white mb-1' })``;
const Chip = styled.span.attrs({ className: 'rb10b text-white px-2 py-1 rounded-[3px] inline-block mr-1 mb-1' })``;

// Panel derecho - formulario
const Right = styled.div.attrs({ className: 'bg-white rounded-none md:rounded-none shadow border-l border-gray-200 p-6 min-h-[640px]' })`
  position: relative;
  z-index: 1;
`;

const ToggleBtn = styled.button`
  position: absolute;
  top: 8px;
  left: calc(50% - 20px);
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: var(--color-primary);
  color: white;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  display: flex; 
  align-items: center; 
  justify-content: center;
  z-index: 9999;
  pointer-events: all;
  
  @media (max-width: 768px) {
    left: calc(100% - 60px);
  }
`;

// Componentes para Datos del Paciente
const PatientData = styled.div.attrs({ className: 'grid grid-cols-3 gap-1 bg-white rounded p-2 mb-2' })`
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const PatientField = styled.div.attrs({ className: 'rb10l c-black35' })``;
const PatientLabel = styled.span.attrs({ className: 'rb10b c-latex30 block' })``;

// Componentes para IMC y Presión
const MetricsGrid = styled.div.attrs({ className: 'grid grid-cols-2 gap-2 mb-2' })``;
const MetricBox = styled(Box).attrs({ className: 'p-2' })``;
const MetricTitle = styled.div.attrs({ className: 'rb12b c-latex30 mb-1 text-center' })``;
const MetricInput = styled.input.attrs({ className: 'rb10l w-full border border-gray-300 rounded px-1 py-0.5 mb-1' })``;
const MetricResult = styled.div.attrs({ className: 'rb16b text-center mt-1' })`
  color: var(--color-primary);
`;
const MetricLabel = styled.div.attrs({ className: 'rb8l text-center c-black35' })``;

// Selector de rango de edad
const RangeSelector = styled.div.attrs({ className: 'flex gap-1 flex-wrap mb-1 justify-center' })``;
const RangeBtn = styled.button<{$active: boolean}>`
  font-size: 8px;
  font-weight: 700;
  padding: 2px 4px;
  border-radius: 4px;
  background: ${p => p.$active ? 'var(--color-primary)' : 'var(--color-grey90)'};
  color: ${p => p.$active ? 'white' : 'var(--color-black35)'};
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    opacity: 0.8;
  }
`;

// Componentes para Criterios
const CriterioItem = styled.div.attrs({ className: 'rb10b text-white px-2 py-1 rounded mb-1' })<{$type: 'green' | 'red'}>`
  background: ${p => p.$type === 'green' ? '#A4DF71' : '#FB5555'};
`;

const FormContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const rangoEdadOptions = ['< 18', '18-25', '25-30', '30-35', '35-40', '40+'];

export default function EvolucionPage() {
  const [showLeft, setShowLeft] = useState(true);
  const [formData, setFormData] = useState<FormData>({});
  
  // Estados para IMC
  const [alturaCm, setAlturaCm] = useState('167');
  const [pesoKg, setPesoKg] = useState('70');
  const [rangoEdad, setRangoEdad] = useState('25-30');
  
  // Estados para Presión
  const [taSistolica, setTaSistolica] = useState('123');
  const [taDiastolica, setTaDiastolica] = useState('104');

  // Cálculos en tiempo real del panel izquierdo
  const imc = useMemo(() => {
    const h = parseFloat(alturaCm);
    const p = parseFloat(pesoKg);
    if (!h || !p) return '--';
    const val = p / Math.pow(h / 100, 2);
    return val.toFixed(1);
  }, [alturaCm, pesoKg]);

  const taMedia = useMemo(() => {
    const s = parseFloat(taSistolica);
    const d = parseFloat(taDiastolica);
    if (!s || !d) return '--';
    const map = (s + 2 * d) / 3;
    return map.toFixed(1);
  }, [taSistolica, taDiastolica]);

  // Handlers del formulario
  const handleFormSubmit = (data: FormData) => {
    console.log('Formulario de evolución enviado:', data);
    alert('¡Evolución médica guardada exitosamente!');
  };

  const handleFormSave = (data: FormData) => {
    console.log('Formulario de evolución guardado:', data);
    setFormData(data);
  };

  return (
    <Page>
      <Body className={showLeft ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-1'}>
        {showLeft && (
          <Left>
            {/* Sección 1: Datos del Paciente */}
            <PatientData>
              <PatientField>
                <PatientLabel>Nombre</PatientLabel>
                Jane Doe (F)
              </PatientField>
              <PatientField>
                <PatientLabel>Edad</PatientLabel>
                30 años
              </PatientField>
              <PatientField>
                <PatientLabel>F. Nac</PatientLabel>
                1/2/1995
              </PatientField>
              <PatientField>
                <PatientLabel>DNI</PatientLabel>
                40559615
              </PatientField>
              <PatientField>
                <PatientLabel>Tel</PatientLabel>
                115569605
              </PatientField>
              <PatientField>
                <PatientLabel>Dirección</PatientLabel>
                Brasil 780, Villa Sarmiento
              </PatientField>
              <PatientField>
                <PatientLabel>HCD</PatientLabel>
                11812033
              </PatientField>
              <PatientField>
                <PatientLabel>HCP</PatientLabel>
                18669
              </PatientField>
            </PatientData>

            {/* Sección 2: Notas */}
            <Title>NOTAS</Title>
            <Box className="p-2 mb-2">
              <Chip style={{ background: '#FB5555' }}>Estado: AUSENTE</Chip>
              <Chip style={{ background: '#FB5555' }}>Eventos Adversos: Erupción Cutanea</Chip>
              <Chip style={{ background: '#A4DF71' }}>Dosis: Normal</Chip>
            </Box>

            {/* Sección 3: IMC y Presión */}
            <MetricsGrid>
              {/* IMC */}
              <MetricBox>
                <MetricTitle>IMC</MetricTitle>
                <MetricInput 
                  type="number" 
                  placeholder="Altura (cm)" 
                  value={alturaCm}
                  onChange={(e) => setAlturaCm(e.target.value)}
                />
                <MetricInput 
                  type="number" 
                  placeholder="Peso (kg)" 
                  value={pesoKg}
                  onChange={(e) => setPesoKg(e.target.value)}
                />
                <RangeSelector>
                  {rangoEdadOptions.map((rango) => (
                    <RangeBtn
                      key={rango}
                      $active={rangoEdad === rango}
                      onClick={() => setRangoEdad(rango)}
                    >
                      {rango}
                    </RangeBtn>
                  ))}
                </RangeSelector>
                <MetricResult>{imc}</MetricResult>
                <MetricLabel>{imc !== '--' ? 'Exceso de peso' : 'Complete datos'}</MetricLabel>
              </MetricBox>

              {/* Presión */}
              <MetricBox>
                <MetricTitle>PRESIÓN</MetricTitle>
                <MetricInput 
                  type="number" 
                  placeholder="TA sistólica" 
                  value={taSistolica}
                  onChange={(e) => setTaSistolica(e.target.value)}
                />
                <MetricInput 
                  type="number" 
                  placeholder="TA diastólica" 
                  value={taDiastolica}
                  onChange={(e) => setTaDiastolica(e.target.value)}
                />
                <MetricResult>{taMedia}</MetricResult>
                <MetricLabel>{taMedia !== '--' ? 'mmHg (TA media)' : 'Complete datos'}</MetricLabel>
              </MetricBox>
            </MetricsGrid>

            {/* Sección 4: Criterios */}
            <Title>CRITERIOS: ANT-010 RED ⓘ</Title>
            <Box className="p-2">
              <CriterioItem $type="green">FA diagnosticada en ECG</CriterioItem>
              <CriterioItem $type="green">Causa reversible</CriterioItem>
              <CriterioItem $type="green">Aleteo auricular</CriterioItem>
              <CriterioItem $type="red">Contraindicación activa</CriterioItem>
              <CriterioItem $type="red">Riesgo elevado</CriterioItem>
            </Box>
          </Left>
        )}

        {showLeft && (
          <ToggleBtn onClick={() => setShowLeft(false)} aria-label="Ocultar panel">
            <ArrowIcon direction="right" />
          </ToggleBtn>
        )}

        <Right className={showLeft ? '' : 'md:col-span-2 relative'}>
          {!showLeft && (
            <button 
              onClick={() => setShowLeft(true)} 
              className="absolute top-4 left-4 w-10 h-10 rounded-full bgc-latexAlternative c-white flex items-center justify-center" 
              aria-label="Mostrar panel"
            >
              <ArrowIcon direction="left" />
            </button>
          )}
          <FormContainer>
            <MultiPageForm
              config={evolucionFormConfig}
              onSubmit={handleFormSubmit}
              onSave={handleFormSave}
            />
          </FormContainer>
        </Right>
      </Body>
    </Page>
  );
}