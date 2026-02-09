"use client";
import React from 'react';
import styled from 'styled-components';

interface ABMPageLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

const Container = styled.div`
  padding: 24px 32px;
  max-width: 1400px;
  margin: 0 auto;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const TitleGroup = styled.div``;

const PageTitle = styled.h1`
  font-family: 'Rubik', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: var(--color-latex10);
  margin: 0;
`;

const PageSubtitle = styled.p`
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: var(--color-grey65);
  margin: 4px 0 0 0;
`;

const CreateButton = styled.button`
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  font-family: 'Rubik', sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  background: linear-gradient(135deg, var(--color-latex30) 0%, #0283C0 100%);
  color: var(--color-white);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(2, 123, 192, 0.3);
  }
`;

export function ABMPageLayout({ title, subtitle, children, actions }: ABMPageLayoutProps) {
  return (
    <Container>
      <HeaderRow>
        <TitleGroup>
          <PageTitle>{title}</PageTitle>
          {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
        </TitleGroup>
        {actions}
      </HeaderRow>
      {children}
    </Container>
  );
}

export { CreateButton };
