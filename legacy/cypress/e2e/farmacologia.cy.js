/// <reference types="Cypress" />
import Objects from '../support/objects-farmaco'

describe("farmacologia", () => {

  const master = new Objects()
  master.inicio()

  Cypress.on('uncaught:exception', (err, runnable)=>{
    return false
  })

  it("Agregar indicación", () => {
    master.agregarIndicacion()
  })

})