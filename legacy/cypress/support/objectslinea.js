class Objects {

    inicio(){ 
        beforeEach(() => {
            cy.visit('http://127.0.0.1:8100')
            cy.viewport(1920, 1080) //y cy.viewport(1366, 768)
            cy.credenciales("11111", "0258")
            cy.get('input').should('have.attr', 'name', 'txtBuscadorPac').type('palazzini mariano{enter}')
        })  
    }

    buscarPaciente(){
        cy.get('.ptur-flechaAvatar-box').click()
        cy.get(':nth-child(1) > .ptur-dropDownAvatar-listItem').click().url().should("contain","buscarpaciente")
    }

    salir(){
        cy.xpath('//*[@id="root"]/ion-app/div/ion-router-outlet/div/ion-router-outlet/div[2]/div[2]/div[2]/div').click()
        cy.contains('Salir').click()
        cy.contains('Hola! Bienvenido').click().should('be.visible')
    }
}

export default Objects;