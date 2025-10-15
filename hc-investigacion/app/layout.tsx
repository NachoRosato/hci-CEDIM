import type { Metadata } from 'next';
import Providers from './providers';
import './globals.css';
import { Rubik } from 'next/font/google';
import GlobalStyle from '@/styles/GlobalStyle';

const rubik = Rubik({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: 'HC Investigación',
  description: 'Historia clínica orientada a investigación de casos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={rubik.className}>
        <Providers>
          <GlobalStyle mode="blue" />
          {children}
        </Providers>
      </body>
    </html>
  );
}


