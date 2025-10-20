"use client";
import styled from 'styled-components';
import { useMemo, useState, useEffect } from 'react';
import ArrowIcon from '@/components/icons/ArrowIcon';
import { MultiPageForm } from '@/components/forms';
import { evolucionFormConfig } from '@/config/evolucionFormConfig';
import { calculateIMC, calculatePresionMedia, generateFormSummary } from '@/utils/formHelpers';
import { FormData } from '@/components/forms/types';

const Page = styled.div.attrs({ className: 'w-full max-w-[1200px] bg-white rounded-md' })``;
const Body = styled.div.attrs({ className: 'grid grid-cols-1 md:grid-cols-2' })``;

// Panel izquierdo - resumen (gradiente azul)
const Left = styled.div`
  position: relative;
  min-height: 640px;
  background: var(--color-latex30-gradient);
  padding: 20px;
`;

const Box = styled.div.attrs({ className: 'bg-white shadow rounded-md' })``;
const Title = styled.h3.attrs({ className: 'rb16b c-white mb-2' })``;
const Chip = styled.span.attrs({ className: 'rb12b text-white px-3 py-1 rounded-[3px] inline-block mr-2 mb-2' })``;

// Panel derecho - formulario
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

const FormContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const InfoCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 16px;
  color: var(--color-white);
  margin-bottom: 16px;
`;

const InfoTitle = styled.h4`
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 16px;
  margin: 0 0 8px 0;
`;

const InfoText = styled.p`
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 14px;
  margin: 0;
  line-height: 1.4;
`;

const CalculationCard = styled(InfoCard)`
  background-color: rgba(255, 255, 255, 0.15);
`;

const CalculationValue = styled.div`
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 20px;
  color: var(--color-white);
  text-align: center;
  margin: 8px 0;
`;

const CalculationLabel = styled.div`
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
`;

export default function EvolucionPage() {
  const [showLeft, setShowLeft] = useState(true);
  const [formData, setFormData] = useState<FormData>({});

  // Cálculos en tiempo real basados en los datos del formulario
  const imc = useMemo(() => {
    const peso = formData.peso_kg;
    const altura = formData.altura_cm;
    if (!peso || !altura) return null;
    return calculateIMC(Number(peso), Number(altura));
  }, [formData.peso_kg, formData.altura_cm]);

  const presionMedia = useMemo(() => {
    const sistolica = formData.presion_sistolica;
    const diastolica = formData.presion_diastolica;
    if (!sistolica || !diastolica) return null;
    return calculatePresionMedia(Number(sistolica), Number(diastolica));
  }, [formData.presion_sistolica, formData.presion_diastolica]);

  const formSummary = useMemo(() => {
    return generateFormSummary(formData);
  }, [formData]);

  // Manejar envío del formulario
  const handleFormSubmit = (data: FormData) => {
    console.log('Formulario de evolución enviado:', data);
    alert('¡Evolución médica guardada exitosamente!');
  };

  // Manejar guardado del formulario
  const handleFormSave = (data: FormData) => {
    console.log('Formulario de evolución guardado:', data);
    setFormData(data);
  };

  return (
    <Page>
      <Body className={showLeft ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-1'}>
        {showLeft && (
          <Left>
            <Title>NOTAS</Title>
            
            {/* Información del paciente */}
            <InfoCard>
              <InfoTitle>📋 Información del Paciente</InfoTitle>
              <InfoText>
                {formSummary || 'Complete los datos del paciente para ver el resumen aquí'}
              </InfoText>
            </InfoCard>

            {/* Cálculos automáticos */}
            {imc && (
              <CalculationCard>
                <InfoTitle>📊 Cálculos Automáticos</InfoTitle>
                <CalculationValue>{imc}</CalculationValue>
                <CalculationLabel>Índice de Masa Corporal</CalculationLabel>
              </CalculationCard>
            )}

            {presionMedia && (
              <CalculationCard>
                <CalculationValue>{presionMedia} mmHg</CalculationValue>
                <CalculationLabel>Presión Arterial Media</CalculationLabel>
              </CalculationCard>
            )}

            {/* Estado y eventos adversos */}
            <Box className="p-3 mb-4">
              <Chip style={{ background: '#FB5555' }}>Estado: AUSENTE</Chip>
              <Chip style={{ background: '#FB5555' }}>Eventos Adversos: Erupción Cutanea</Chip>
              <Chip style={{ background: '#A4DF71' }}>Dosis: Normal</Chip>
            </Box>

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

            {/* Ayuda */}
            <InfoCard>
              <InfoTitle>💡 Ayuda</InfoTitle>
              <InfoText>
                • Los datos se guardan automáticamente<br/>
                • Puedes navegar entre páginas libremente<br/>
                • Usa "Vista Previa" para revisar todo antes de finalizar
              </InfoText>
            </InfoCard>

            <ToggleBtn onClick={() => setShowLeft(false)} aria-label="Ocultar panel">
              <ArrowIcon direction="right" />
            </ToggleBtn>
          </Left>
        )}

        <Right className={showLeft ? '' : 'md:col-span-2 relative'}>
          <FormContainer>
            <MultiPageForm
              config={evolucionFormConfig}
              onSubmit={handleFormSubmit}
              onSave={handleFormSave}
            />
          </FormContainer>
          
          {!showLeft && (
            <button 
              onClick={() => setShowLeft(true)} 
              className="absolute top-4 left-4 w-10 h-10 rounded-full bgc-latexAlternative c-white flex items-center justify-center" 
              aria-label="Mostrar panel"
            >
              <ArrowIcon direction="left" />
            </button>
          )}
        </Right>
      </Body>
    </Page>
  );
}