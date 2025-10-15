/// <reference types="Cypress" />
import Objects from '../support/objectslinea'
require('cypress-xpath')

describe("linea de tiempo",() => {

  const master = new Objects()
  Cypress.on('uncaught:exception', (err, runnable)=>{
    return false
  })

  master.inicio()

  it('Refresh', () => {
    cy.xpath('//*[@id="root"]/ion-app/div/ion-router-outlet/div/ion-router-outlet/div[3]/div/button').click()
  })

  it('Menu H => buscar nuevo paciente', () => {
    master.buscarPaciente()
  })

  it('Menu H => salir', () => {
    master.salir()
  })

})