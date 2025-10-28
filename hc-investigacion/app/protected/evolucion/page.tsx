"use client";
import styled from 'styled-components';
import { useMemo, useState } from 'react';
import ArrowIcon from '@/components/icons/ArrowIcon';
import { MultiPageForm } from '@/components/forms';
import { evolucionFormConfig } from '@/config/evolucionFormConfig';
import { FormData } from '@/components/forms/types';
import VersionSelector from '@/components/VersionSelector';
import { getMockDataByVersion, MockVersion } from '@/data/mockEvolucionData';
import { Toast } from '@/components/ui/Toast';

const Page = styled.div.attrs({ className: 'w-full bg-white rounded-md' })`
  max-width: min(1920px, 100vw);
  min-width: 1366px;
  
  @media (max-width: 1400px) {
    min-width: 100%;
  }
`;

const Body = styled.div.attrs({ className: 'grid grid-cols-1 md:grid-cols-2' })`
  position: relative;
`;

// Panel izquierdo - resumen (gradiente azul moderno)
const Left = styled.div`
  position: sticky;
  top: 0;
  /* Ajuste: usar min-height para asegurar cobertura sin forzar scroll */
  min-height: 100vh;
  background: linear-gradient(180deg, #030e35 0%, #0283C0 50%, #027BB5 100%);
  padding: 20px 16px;
  overflow-x: hidden;
  
  /* Scrollbar personalizado */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
`;

const Box = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
  }
`;

const Title = styled.h3`
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: var(--color-white);
  margin: 0 0 12px 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '';
    width: 4px;
    height: 20px;
    background: var(--color-white);
    border-radius: 2px;
  }
`;

const Chip = styled.span`
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  font-size: 11px;
  color: var(--color-white);
  padding: 6px 12px;
  border-radius: 20px;
  display: inline-block;
  margin-right: 8px;
  margin-bottom: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

// Panel derecho - formulario
const Right = styled.div`
  position: relative;
  z-index: 1;
  background-color: #f8f9ff;
  padding: 24px;
  /* Ajuste: dejar que crezca con el contenido sin altura fija */
  min-height: 100vh;
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
const PatientData = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PatientField = styled.div`
  font-family: 'Rubik', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: var(--color-black35);
  line-height: 1.4;
`;

const PatientLabel = styled.span`
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 10px;
  color: var(--color-latex30);
  display: block;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Componentes para IMC y Presión
const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
`;

const MetricBox = styled(Box)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MetricTitle = styled.div`
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 14px;
  color: var(--color-latex30);
  text-align: center;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const MetricInput = styled.input`
  font-family: 'Rubik', sans-serif;
  font-size: 13px;
  width: 100%;
  border: 2px solid var(--color-grey90);
  border-radius: 10px;
  padding: 8px 12px;
  margin-bottom: 6px;
  transition: all 0.3s ease;
  background-color: var(--color-white);
  
  &:focus {
    outline: none;
    border-color: var(--color-latex30);
    box-shadow: 0 0 0 3px rgba(0, 54, 232, 0.1);
  }
  
  &::placeholder {
    color: var(--color-grey65);
    font-size: 12px;
  }
`;

const MetricResult = styled.div`
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 32px;
  text-align: center;
  margin-top: 8px;
  color: var(--color-primary);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MetricLabel = styled.div`
  font-family: 'Rubik', sans-serif;
  font-size: 11px;
  font-weight: 500;
  text-align: center;
  color: var(--color-black35);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Selector de rango de edad
const RangeSelector = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 8px;
  justify-content: center;
`;

const RangeBtn = styled.button<{$active: boolean}>`
  font-family: 'Rubik', sans-serif;
  font-size: 10px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 8px;
  background: ${p => p.$active ? 'var(--color-primary)' : 'var(--color-grey90)'};
  color: ${p => p.$active ? 'white' : 'var(--color-black35)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-1px);
    background: ${p => p.$active ? 'var(--color-primary)' : 'var(--color-grey65)'};
    color: white;
  }
`;

// Componentes para Criterios
const CriterioItem = styled.div<{$type: 'green' | 'red'}>`
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: var(--color-white);
  padding: 10px 14px;
  border-radius: 10px;
  margin-bottom: 8px;
  background: ${p => p.$type === 'green' ? 
    'linear-gradient(135deg, #A4DF71 0%, #8BC34A 100%)' : 
    'linear-gradient(135deg, #FB5555 0%, #E53935 100%)'};
  box-shadow: 0 2px 8px ${p => p.$type === 'green' ? 
    'rgba(164, 223, 113, 0.4)' : 
    'rgba(251, 85, 85, 0.4)'};
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px ${p => p.$type === 'green' ? 
      'rgba(164, 223, 113, 0.6)' : 
      'rgba(251, 85, 85, 0.6)'};
  }
`;

const FormContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const rangoEdadOptions = ['< 18', '18-25', '25-30', '30-35', '35-40', '40+'];

export default function EvolucionPage() {
  const [showLeft, setShowLeft] = useState(true);
  const [formData, setFormData] = useState<FormData>({});
  
  // Estado para la versión mock seleccionada
  const [selectedVersion, setSelectedVersion] = useState<MockVersion>('empty');
  const [initialData, setInitialData] = useState<FormData>({});
  
  // Estado para el Toast de éxito
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
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
    setShowSuccessToast(true);
  };

  const handleFormSave = (data: FormData) => {
    console.log('Formulario de evolución guardado:', data);
    setFormData(data);
  };

  // Handler para cambiar versión mock
  const handleVersionChange = (version: MockVersion) => {
    setSelectedVersion(version);
    const mockData = getMockDataByVersion(version);
    setInitialData(mockData);
    console.log('Versión cambiada a:', version);
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
            <Box style={{ padding: '16px', marginBottom: '20px' }}>
              <Chip style={{ background: 'linear-gradient(135deg, #FB5555 0%, #E53935 100%)' }}>Estado: AUSENTE</Chip>
              <Chip style={{ background: 'linear-gradient(135deg, #FB5555 0%, #E53935 100%)' }}>Eventos Adversos: Erupción Cutanea</Chip>
              <Chip style={{ background: 'linear-gradient(135deg, #A4DF71 0%, #8BC34A 100%)' }}>Dosis: Normal</Chip>
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
            <Box style={{ padding: '16px' }}>
              <CriterioItem $type="green">✓ FA diagnosticada en ECG</CriterioItem>
              <CriterioItem $type="green">✓ Causa reversible</CriterioItem>
              <CriterioItem $type="green">✓ Aleteo auricular</CriterioItem>
              <CriterioItem $type="red">✗ Contraindicación activa</CriterioItem>
              <CriterioItem $type="red">✗ Riesgo elevado</CriterioItem>
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
            {/* Selector de versión mock */}
            <VersionSelector
              selectedVersion={selectedVersion}
              onVersionChange={handleVersionChange}
            />
            
            {/* Formulario multipágina */}
            <MultiPageForm
              config={evolucionFormConfig}
              onSubmit={handleFormSubmit}
              onSave={handleFormSave}
              initialData={initialData}
              key={selectedVersion}
            />
          </FormContainer>
        </Right>
      </Body>
      
      {/* Toast de éxito */}
      <Toast
        open={showSuccessToast}
        onClose={() => setShowSuccessToast(false)}
        text="✓ ¡Evolución médica guardada exitosamente!"
        tone="success"
        duration={4000}
      />
    </Page>
  );
}