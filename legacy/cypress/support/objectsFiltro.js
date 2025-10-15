require('cypress-xpath')

class Objects {

    inicio(){
        beforeEach(() => {
            cy.visit('http://127.0.0.1:8100')
            cy.viewport(1920, 1080) //y cy.viewport(1366, 768)
            cy.credenciales("11111", "0258")
            cy.get('input').should('have.attr', 'name', 'txtBuscadorPac').type('palazzini mariano{enter}')
        })
    }

    estudios(){
        cy.get('.ptur-dropdownCheck-overSelect').click()
        cy.get(':nth-child(2) > .ptur-ItemCheckBoxGroup-container').click()
        // cy.get(':nth-child(3) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get(':nth-child(4) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get(':nth-child(5) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get('.ptur-dropdownCheck-fondo').click()
        cy.contains('Estudios').should('not.exist')
    }

    laboratorio(){
        cy.get('.ptur-dropdownCheck-overSelect').click()
        cy.get(':nth-child(2) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get(':nth-child(3) > .ptur-ItemCheckBoxGroup-container').click()
        // cy.get(':nth-child(4) > .ptur-ItemCheckBoxGroup-container').click() 
        cy.get(':nth-child(5) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get('.ptur-dropdownCheck-fondo').click()
        cy.contains('Informes').should('not.exist')
    }

    informes(){
        cy.get('.ptur-dropdownCheck-overSelect').click()
        cy.get(':nth-child(2) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get(':nth-child(3) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get(':nth-child(4) > .ptur-ItemCheckBoxGroup-container').click() 
        // cy.get(':nth-child(5) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get('.ptur-dropdownCheck-fondo').click()
        cy.contains('Estudios').should('not.exist')
        cy.contains('Evoluciones').should('not.exist')
    }

    evoluciones(){
        cy.get('.ptur-dropdownCheck-overSelect').click()
        // cy.get(':nth-child(2) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get(':nth-child(3) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get(':nth-child(4) > .ptur-ItemCheckBoxGroup-container').click() 
        cy.get(':nth-child(5) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get('.ptur-dropdownCheck-fondo').click()
        cy.contains('Informes').should('not.exist')
        cy.contains('Estudios').should('not.exist')
    }

    evoYestudios(){
        cy.get('.ptur-dropdownCheck-overSelect').click()
        // cy.get(':nth-child(2) > .ptur-ItemCheckBoxGroup-container').click()
        // cy.get(':nth-child(3) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get(':nth-child(4) > .ptur-ItemCheckBoxGroup-container').click() 
        cy.get(':nth-child(5) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get('.ptur-dropdownCheck-fondo').click()
        cy.contains('Informes').should('not.exist')
        cy.contains('Laboratorio').should('not.exist')
    }

    laboratotioYestudios(){
        cy.get('.ptur-dropdownCheck-overSelect').click()
        cy.get(':nth-child(2) > .ptur-ItemCheckBoxGroup-container').click()
        // cy.get(':nth-child(3) > .ptur-ItemCheckBoxGroup-container').click()
        // cy.get(':nth-child(4) > .ptur-ItemCheckBoxGroup-container').click() 
        cy.get(':nth-child(5) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get('.ptur-dropdownCheck-fondo').click()
        cy.contains('Informes').should('not.exist')
        cy.contains('Evoluciones').should('not.exist')
    }

    laboratorioEinformes(){
        cy.get('.ptur-dropdownCheck-overSelect').click()
        cy.get(':nth-child(2) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get(':nth-child(3) > .ptur-ItemCheckBoxGroup-container').click()
        // cy.get(':nth-child(4) > .ptur-ItemCheckBoxGroup-container').click() 
        // cy.get(':nth-child(5) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get('.ptur-dropdownCheck-fondo').click()
        cy.contains('Estudios').should('not.exist')
        cy.contains('Evoluciones').should('not.exist')
    }

    evolucionEinformes(){
        cy.get('.ptur-dropdownCheck-overSelect').click()
        // cy.get(':nth-child(2) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get(':nth-child(3) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get(':nth-child(4) > .ptur-ItemCheckBoxGroup-container').click() 
        // cy.get(':nth-child(5) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get('.ptur-dropdownCheck-fondo').click()
        cy.contains('Estudios').should('not.exist')
        cy.contains('Laboratorio').should('not.exist')
    }

    estudioEinformes(){
        cy.get('.ptur-dropdownCheck-overSelect').click()
        cy.get(':nth-child(2) > .ptur-ItemCheckBoxGroup-container').click()
        // cy.get(':nth-child(3) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get(':nth-child(4) > .ptur-ItemCheckBoxGroup-container').click() 
        // cy.get(':nth-child(5) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get('.ptur-dropdownCheck-fondo').click()
        cy.contains('Laboratorio').should('not.exist')
        cy.contains('Evoluciones').should('not.exist')
    }

    evolucionEstudioYlaboratorio(){
        cy.get('.ptur-dropdownCheck-overSelect').click()
        // cy.get(':nth-child(2) > .ptur-ItemCheckBoxGroup-container').click()
        // cy.get(':nth-child(3) > .ptur-ItemCheckBoxGroup-container').click()
        // cy.get(':nth-child(4) > .ptur-ItemCheckBoxGroup-container').click() 
        cy.get(':nth-child(5) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get('.ptur-dropdownCheck-fondo').click()
        cy.contains('Informes').should('not.exist')
    }

    informesEstudiosYlaboratorio(){
        cy.get('.ptur-dropdownCheck-overSelect').click()
        cy.get(':nth-child(2) > .ptur-ItemCheckBoxGroup-container').click()
        // cy.get(':nth-child(3) > .ptur-ItemCheckBoxGroup-container').click()
        // cy.get(':nth-child(4) > .ptur-ItemCheckBoxGroup-container').click() 
        // cy.get(':nth-child(5) > .ptur-ItemCheckBoxGroup-container').click()
        cy.get('.ptur-dropdownCheck-fondo').click()
        cy.contains('Evoluciones').should('not.exist')
    }
}

export default Objects;