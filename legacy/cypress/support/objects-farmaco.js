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

    agregarIndicacion(){
        //Agregar nuevo medicamento
        cy.get('.ts_farmaco_new-btn').click()
        cy.contains('Nuevo medicamento').click()
        //Clickeo sobre el buscador
        cy.xpath('//*[@id="root"]/ion-app/div/ion-router-outlet/div/ion-router-outlet/div[1]/div/div[2]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]').click()
        cy.xpath('//*[@id="root"]/ion-app/div/ion-router-outlet/div/ion-router-outlet/div[1]/div/div[2]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/input').type('a')
        //Seleccionar medicamento
        cy.xpath('//*[@id="root"]/ion-app/div/ion-router-outlet/div/ion-router-outlet/div[1]/div/div[2]/div[2]/div[2]/div[1]/div[3]').click()
        cy.wait(500)
        cy.xpath('//*[@id="root"]/ion-app/div/ion-router-outlet/div/ion-router-outlet/div[1]/div/div[2]/div[2]/div[2]/div[1]/div[3]/span/div').click()
        //Agregar cantidad
        cy.xpath('//*[@id="root"]/ion-app/div/ion-router-outlet/div/ion-router-outlet/div[1]/div/div[2]/div[2]/div[1]/div/input').type('1')
        cy.xpath('//*[@id="root"]/ion-app/div/ion-router-outlet/div/ion-router-outlet/div[1]/div/div[2]/div[2]/div[1]/div/div/div[1]/input').click()
        cy.xpath('//*[@id="root"]/ion-app/div/ion-router-outlet/div/ion-router-outlet/div[1]/div/div[2]/div[2]/div[2]/div/div[1]/input').click()
        cy.wait(500)
        cy.xpath('//*[@id="root"]/ion-app/div/ion-router-outlet/div/ion-router-outlet/div[1]/div/div[2]/div[2]/div[3]/div/div[1]/input').type('1')
        //Asignar
        cy.xpath('//*[@id="root"]/ion-app/div/ion-router-outlet/div/ion-router-outlet/div[1]/div/div[2]/div[3]/button[2]').click()
        //Verificar si se agrego
        cy.xpath('//*[@id="root"]/ion-app/div/ion-router-outlet/div/ion-router-outlet/div[4]/div[2]/div[4]/div[2]/div[2]/div[1]/div').should('contain', 'A ACIDO')
        //Limpiar indicaciones
        cy.get('.ts_farmaco_del-item').click()
    }


}

export default Objects;