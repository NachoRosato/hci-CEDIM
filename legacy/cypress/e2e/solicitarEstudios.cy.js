import Objects from '../support/objectsSolic'
describe('Historia clinica', () => {

  const master = new Objects()
  Cypress.on('uncaught:exception', (err, runnable)=>{
    return false
  })

  master.inicio()

  it('Solicitar Estudio', () => {
    master.ordenEstudioMedico()
  })

  it('Solicitar Laboratorio', () => {
    master.ordenLaboratorio()
  })

  it('Template estudios laboratorio', () => {
    master.templateLaboratorio()
  })
})