require('cypress-xpath')

class Objects {

    inicio(){ 
        beforeEach(() => {
            cy.visit('http://127.0.0.1:8100')
            cy.viewport(1920, 1080) //y cy.viewport(1366, 768)
            cy.credenciales("11111", "0258")
            cy.get('input').should('have.attr', 'name', 'txtBuscadorPac').type('palazzini mariano{enter}').then(() => {
                cy.get(':nth-child(1) > .estudio > .headerDescItem').click()
                cy.get('.ts_timeLine_editEvo-btn').click()
            })
        })
    }

    ordenEstudioMedico() {
        cy.get('.ts_orden_crear-btn').click()
        cy.get('.ts_solicitaEstudios_selCircuitoPrac-btn.ts_solicitaEstudios_selCircuitoPrac-btn').click()
        cy.xpath('//*[@id="root"]/ion-app/div/ion-router-outlet/div/ion-router-outlet/div[4]/div[3]/div[3]/div[2]/div[3]/div/div[2]/div/div').type('ECOGRAFIA ABDOMINAL ADULTO')
        cy.contains('ECOGRAFIA ABDOMINAL ADULTO').click()
        cy.get('.hc-ordenPrac-DatePickerCustom').click()
        // Obtener el texto de la fecha y guardarla en la variable 'fecha'
        cy.get('.ptur-datePiker-bodyContainer > :nth-child(6) > :nth-child(2)').invoke('text').then((fecha) => {
            // Hacer clic en la fecha deseada
            cy.get('.ptur-datePiker-bodyContainer > :nth-child(6) > :nth-child(2)').click()
            cy.get('.ptur-datePiker-footerContainer-btn2').click()
            cy.get('.ptur-InputDate-container-selected').should('contain', fecha)
            cy.contains('Siguiente').click()
            // Verificar que el elemento contenga la fecha obtenida
            cy.get('input[class*="ts_creaOrdenPrac_diagUnique-input"]').type('test')
            cy.contains('Generar Orden').click()
            // Valida que se pueda borrar
            cy.contains('test').should('be.visible')
            cy.get('[class*="ts_orden_del-item"]').click()
        })
    }

    ordenLaboratorio(){
        cy.get('[class*="ts_orden_crear-btn"]').click()
        cy.get('[style="display: flex; flex-direction: column; align-items: center;"]').click()
        // Ver mas
        cy.contains('Seleccionar').click()
        // Modificar rutina
        cy.get('.ts_modifOrdenLabo_gotoNewOrden-btn').click()
        cy.get('[class*="ts_crearOrdenLabo_checkItems-item"]').first().click()
        cy.get('input[name="buscador"]').first().type('Calciuria')
        cy.contains('Calciuria').click()
        cy.get('.ts_crearOrdenLabo_save-btn').click()
        // Fecha
        cy.get('.ptur-InputDate-container-selected').click()
        cy.get(':nth-child(5) > :nth-child(2)').invoke('text').then((fecha) => {
            cy.get(':nth-child(5) > :nth-child(2)').click()
            cy.get('.ptur-datePiker-footerContainer-btn2').click()
            cy.get('.ptur-InputDate-container-selected').should("contain", fecha)
        })
        
        cy.get('input[class*="ts_modifOrdenLabo_diagOrden-input"]').type('test')
        cy.get('[class*="ts_modifOrdenLabo_saveOrden-btn"]').click()
        cy.contains('test')
    }

    templateLaboratorio(){
        cy.get('[class*="ts_orden_crear-btn"]').click()
        cy.get('[style="display: flex; flex-direction: column; align-items: center;"]').click()
        cy.get('[class*="ts_ordenLabo_newOrden-btn"]').click()
        // Seleccion estudios a realizar
        cy.contains('HEMOGRAMA').click()
        cy.contains('CPK').click()
        cy.contains('UREMIA').click()
        cy.contains('TRIGLICERIDOS').click()
        // Agregar enfermedad manualmente
        cy.get('.ts_crearOrdenLabo_searchDeter-search').type('Colbazan')
        cy.contains('Colbazan').click()
        // verificar cantidad de estudios
        cy.get('.ts_crearOrdenLabo_save-btn').click()
        // Completar diagnostico
        cy.get('.ts_modifOrdenLabo_diagOrden-input').click().type('test')
        cy.get('.ts_modifOrdenLabo_saveOrden-btn').click()
        // Verificar si se agrego la orden
        cy.contains('test')
    }
}

export default Objects;