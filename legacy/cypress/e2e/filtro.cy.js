/// <reference types="Cypress" />
import Objects from '../support/objectsFiltro'

describe('linea-de-tempo', () => {

  const master = new Objects()
  master.inicio()

  Cypress.on('uncaught:exception', (err, runnable)=>{
    return false
  })

  it('Filtro estudios', () => {
    master.estudios()
  })


  it('Filtro laboratorio', () => {
    master.laboratorio()
  })

  it.only('Filtro informes', () => {
    master.informes()
  })

  it('Filtro evoluciones', () => {
    master.evoluciones()
  })

  it('Filtro evoluciones y etudios', () => {
    master.evoYestudios()
  })

  it('Filtro Laboratorio y etudios', () => {
    master.laboratotioYestudios()
  })

  it('Filtro Laboratorio e informes', () => {
    master.laboratorioEinformes()
  })

  it('Filtro Evolucion e informes', () => {
    master.evolucionEinformes()
  })

  it('Filtro Estudio e informes', () => {
    master.estudioEinformes()
  })

  it('Filtro Evolucion, Estudio y laboratorio', () => {
    master.evolucionEstudioYlaboratorio()
  })

  it('Filtro Informes, Estudios y laboratorio', () => {
    master.informesEstudiosYlaboratorio()
  })

})


