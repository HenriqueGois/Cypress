describe('API test Books', () => {
  it('Validate status API', () => {
    cy.request({
      method: 'GET',
      url: 'https://simple-books-api.glitch.me/status/',
      // Nesse momento eu não utilzei nenhum assert por conta do FailOnStatusCode default ser True, consequentimente o teste trava caso a API esteja fora. 
    })
  })
  it('Validate GET all books', () => {
    cy.request({
      method: 'GET',
      url: 'https://simple-books-api.glitch.me/books/',
    }).then((response) => {
      expect(response.body).to.not.be.empty;
    })
  })
  it('Validate GET book by id', () => {
    cy.request({
      method: 'GET',
      url: 'https://simple-books-api.glitch.me/books/1',
    }).then((response) => {
      expect(response.body).to.not.be.empty;
    })
  })
})




describe('Validate Orders', () => {
  const idOrder = Cypress.env('idOrder')
  const authorization = `Bearer ${Cypress.env('tokenAcess')}`

  it.skip('Authentication', () => {
    cy.request({
      method: 'POST',
      url: 'https://simple-books-api.glitch.me/api-clients/',
      body: {
        clientName: "Henriue7",
        clientEmail: "henrique7@teste.com"
      }
    }).then((response) => {
      expect(response.body).to.not.be.empty;
    })
  })

  it('Validate POST Orders', () => {
    cy.request({
      method: 'POST',
      url: 'https://simple-books-api.glitch.me/orders/',
      headers: { authorization },
      body: {
        bookId: "5",
        customerName: "HenriqueGois"
      },
    }).then((response) => {
      expect(response.body).to.not.be.empty;
    })
  })
  it('Validate GET Orders', () => {
    cy.request({
      method: 'GET',
      url: 'https://simple-books-api.glitch.me/orders',
      headers: { authorization },
    }).then((response) => {
      expect(response.body).to.not.be.empty;
    })
  })
  it('Validate GET Orders by ID', () => {
    cy.request({
      method: 'GET',
      url: `https://simple-books-api.glitch.me/orders/${idOrder}`,
      headers: { authorization },
    }).then((response) => {
      expect(response.body).to.not.be.empty;
    })
  })
  it('Validate PATCH Orders', () => {
    cy.request({
      method: 'PATCH',
      url: `https://simple-books-api.glitch.me/orders/${idOrder}`,
      headers: { authorization },
      body: {
        customerName: "HenriqueGoisRename"
      },
    })

  })
  it('Validate DELETE Orders', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://simple-books-api.glitch.me/orders/yrWyIr5_2hmHrUTcIywUm',
      headers: { authorization },
    })
  })
})