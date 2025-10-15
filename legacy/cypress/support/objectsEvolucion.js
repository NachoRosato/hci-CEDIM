require('cypress-xpath')

class Objects {
    
    inicio() {
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

    agregarEnfermedad() {
        cy.wait(500)
        cy.get('.adjustEnfBtnBox').click()
        cy.get('.ts_dropDownInput-dropdown').type('Glaucoma {enter}')
        cy.contains('Agregar').click()
        cy.contains('Glaucoma').should('be.visible')
        //Agregar Diagnostico y guardar evolución
        // cy.xpath('//*[@id="root"]/ion-app/div/ion-router-outlet/div/ion-router-outlet/div[4]/div[3]/div[6]/div/div[2]/div/input').type('Colestasis {enter}')
        // cy.contains('Guardar Evolución').click()
        
    }

    motivoDiagnostico() {
        cy.get('.ptur-inputContainer > .rb16m').clear().type('test')
        cy.get('.bgc-grey95').click().type('Hipercolesterolemia')
        cy.contains('Hipercolesterolemia')
        cy.get('#listaItem0').click()
        cy.get('.bgc-grey95').should("contain", "Hipercoles")
        cy.contains('Guardar Evlución').click()
    }

    // examenFisico() {
    //     cy.get('.ts_evolucion_exFisico-btn').click().then(() => {
    //     cy.get('#ptur-input-abm-tablenombre4912').type('11')
    //     cy.get('#ptur-input-abm-tablenombre4913').type('11')
    //     cy.get('#ptur-input-abm-tablenombre4914').type('11')
    //     cy.get('#ptur-input-abm-tablenombre4915').type('11')
    //     cy.get('#ptur-input-abm-tablenombre4916').type('11')
      
    //     cy.xpath('//*[@id="root"]/ion-app/div/ion-router-outlet/div/ion-router-outlet/div[4]/div[3]/div[1]/div[2]/div[2]/div[2]/div/div[3]/div[2]/div[2]/div[1]/div[2]/div/div[2]').click()
    //       })  
    // }

    solicitudEstudio(){
        // Seleccion de estudio
        cy.get('.ts_orden_crear-btn').click()
        cy.get('.ts_solicitaEstudios_selCircuitoPrac-btn').click({force:true})
        cy.xpath('//*[@id="root"]/ion-app/div/ion-router-outlet/div/ion-router-outlet/div[4]/div[3]/div[3]/div[2]/div[3]/div/div[2]/div/div/input').type('CAPILAROSCOP')
        cy.contains('CAPILAROSCOP').click()
        // Cambiar fecha
        cy.get('.hc-ordenPrac-DatePickerCustom').click()
        cy.get(':nth-child(5) > :nth-child(3)').click()
        cy.get('.ptur-datePiker-footerContainer-btn2').click()
        // Guardar proceso
        cy.contains('Siguiente').click()
        // Escribir diagnostico
        cy.get('.ts_creaOrdenPrac_diagUnique-input').type('test')
        // Generar orden
        cy.get('[class*="ts_creaOrdenPrac2_save-btn"]').click()
        // Corroborar estudio creado
        cy.contains('test')
        // Borrar estudio creado
        cy.get('[class*="ts_orden_del-item"]').click()
    }
}

export default Objects;