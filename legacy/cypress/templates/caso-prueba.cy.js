/// <reference types="Cypress" />

describe("linea de tiempo",() => {

    beforeEach(() => {
      cy.visit('http://10.150.0.30:3000')
      cy.viewport(1920, 1080) //y cy.viewport(1366, 768)
      cy.get(':nth-child(1) > :nth-child(1) > .ptur-inputContainer > .rb16m').type('11111')
      cy.get('.inputNumeric').type('0258')
      cy.get('.sc-ezWOiH').click()
      cy.get('.sc-ikZpkk').click().type('palazzini mariano{enter}')
    })
  
    it('Filtrar todo', () => {
      cy.get('.headerDescItem')
    })
  
  
  
  
  
  
  })