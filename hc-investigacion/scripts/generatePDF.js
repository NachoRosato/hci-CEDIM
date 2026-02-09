/**
 * Script para generar PDF desde HTML
 * Utiliza puppeteer para convertir LISTA_INPUTS_FORMULARIO.html a PDF
 * 
 * Uso:
 * 1. Instalar puppeteer: npm install --save-dev puppeteer
 * 2. Ejecutar: npm run generate-pdf
 */

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generatePDF() {
  console.log('🚀 Iniciando generación de PDF...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Ruta del archivo HTML
    const htmlPath = join(__dirname, '..', 'LISTA_INPUTS_FORMULARIO.html');
    const htmlUrl = `file://${htmlPath}`;
    
    console.log(`📄 Cargando HTML desde: ${htmlPath}`);
    
    // Cargar el HTML
    await page.goto(htmlUrl, {
      waitUntil: 'networkidle0'
    });
    
    // Configuración del PDF
    const pdfPath = join(__dirname, '..', 'LISTA_INPUTS_FORMULARIO.pdf');
    
    console.log('📝 Generando PDF...');
    
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
      },
      printBackground: true,
      preferCSSPageSize: true
    });
    
    console.log(`✅ PDF generado exitosamente en: ${pdfPath}`);
    
  } catch (error) {
    console.error('❌ Error al generar PDF:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Ejecutar
generatePDF()
  .then(() => {
    console.log('✨ Proceso completado con éxito');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Error fatal:', error);
    process.exit(1);
  });






