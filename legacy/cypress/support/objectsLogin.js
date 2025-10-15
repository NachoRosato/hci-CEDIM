class Objects {

    falseLogin(){
        cy.visit('http://127.0.0.1:8100')
        cy.get("@datos_json").then((data)=> {
            cy.get(':nth-child(1) > :nth-child(1) > .ptur-inputContainer > .rb16m').click().type('falseuser');
            cy.get('.inputNumeric').click().type('falsepassword');
            cy.get('.ptur-loginBox-show-hideBtn').click();
            cy.get('.sc-ezWOiH').click()
            cy.contains('Clave o usuario incorrecto');
        })
    
    }

    trueLogin(){
        cy.visit('http://127.0.0.1:8100')
        cy.get("@datos_json").then((data)=>{
            cy.get(':nth-child(1) > :nth-child(1) > .ptur-inputContainer > .rb16m').click().type(data.user);
            cy.get('.inputNumeric').click().type(data.password);
            cy.get('.sc-ezWOiH').click()
            cy.url().should('contains', '/buscarpaciente'); 
        })
    }


}

export default Objects;