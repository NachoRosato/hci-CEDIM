describe('https://ws-historiaclinica.dim.com.ar/api/v1/Paciente/223124', () => {

let authToken;

  it('Get Paciente', () => {
    cy.request('GET', 'https://ws-historiaclinica.dim.com.ar/api/v1/Paciente/223124').then(
      (response) => {
      expect(response.body).to.not.be.null;
      expect(response.status).to.eq(200);
      expect(response.body.items.documento).to.eq("41562103")
      console.log(response)
       })
  })
  
  it("Login", () => {
    cy.request({
      method: 'POST',
      url: 'https://ws-hctest.dim.com.ar/api/v1/login',
      body: {
        "usuario": "11111",
        "clave": "0258"
      },
    }).then((response) => {
      console.log(response)
      expect(response.body.value.apellido).to.eq('GUIDO')
      // authToken = response.body.items.token;
    });
  })

  it('Paciente/documento/{Documento}', () => {
    cy.request('GET', 'https://ws-hctest.dim.com.ar/api/v1/paciente/documento/41562103').then(
      (response) => {
      console.log(response)
      expect(response.body).to.not.be.null;
      expect(response.status).to.eq(200);
      expect(response.body.value[0].documento).to.eq('41562103')      
      expect(response.body.value[0].nombre).to.eq('PALAZZINI MARIANO MAURICIO')
       })
  })
  
  it('Paciente/informes/{idPaciente}', () => {
    cy.request('GET', 'https://ws-hctest.dim.com.ar/api/v1/paciente/informes/223124').then(
      (response) => {
      expect(response.body.items).not.to.be.null
       })
  })

  it('Paciente/estudiosPaciente/{documento}', () => {
    cy.request('GET', 'https://ws-hctest.dim.com.ar/api/v1/paciente/estudiosPaciente/41562103').then(
      (response) => {
      expect(response.body.items).not.to.be.null
      console.log(response)
       })
  })

  it('RolDerecho{idUsuario}', () => {
    cy.request('GET', 'https://ws-hctest.dim.com.ar/api/v1/rolderecho/11111').then(
      (response) => {
      expect(response.body.isSuccess).to.eq(true)
      console.log(response)
       })
  })

  it('Laboratorio/{idPaciente}/{filtroFecha}', () => {
    cy.request('GET', 'https://ws-hctest.dim.com.ar/api/v1/laboratorio/223124/false').then(
      (response) => {
      expect(response.body.value).length.to.be.greaterThan(0)
      console.log(response)
       })
  })

  it('Evolucion/getLineaDeTiempo/{idPaciente}/{idUsuario}/{sinTags}/{filtroFecha}', () => {
    cy.request('GET', 'https://ws-hctest.dim.com.ar/api/v1/evolucion/getLineaDeTiempo/223124/11111/true/true').then(
      (response) => {
      expect(response.body.value).length.to.be.greaterThan(0)
      console.log(response)
       })
  })
})