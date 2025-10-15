/// <reference types="Cypress" />
import Objects from '../support/objectsEvolucion'

describe("linea de tiempo", () => {

  const master = new Objects()
  master.inicio()

  Cypress.on('uncaught:exception', (err, runnable)=>{
    return false
  })

  it('Agregar enfermedad', () => {
    master.agregarEnfermedad()
  })

  it('Corroborar enfermedad agregada', () => {
    // cy.contains('Adenoiditis').should('be.visible')
  })


  it('Agregar motivo y diagnostico', () => {
    master.motivoDiagnostico()
  })
  
  // it('Examen fisico', () => {
  //   master.examenFisico()
  // })

  it.only('Agregar solicitud de estudio', () => {
    master.solicitudEstudio()
  })
})