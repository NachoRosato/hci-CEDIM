import Objects from '../support/objectsLogin'
describe('Historia clinica', () => {

  const master = new Objects()
  Cypress.on('uncaught:exception', (err, runnable)=>{
    return false
  })

  beforeEach(function(){
    cy.fixture("data").as("datos_json")
  })

  it('false-login', () => {
    master.falseLogin()
  })

  it('true-login', () => {
    master.trueLogin()
  })
})