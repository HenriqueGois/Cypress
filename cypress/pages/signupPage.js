class signupPage {

    goFormPage() {
        // Acessar a pagina
        cy.viewport(1920, 1080)
        cy.visit('https://buger-eats-qa.vercel.app')

        // Clicar no botão e acessar a pagina de cadastro
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

    }

    fillForm(deliver) {
        // Preencher cadastro pessoa
        cy.get('input[name=fullName]').type(deliver.name)
        cy.get('input[name=email]').type(deliver.email)
        cy.get('input[name=cpf]').type(deliver.cpf)
        cy.get('input[name=whatsapp]').type(deliver.whats)

        // Preencher e validar address
        cy.get('input[name=postalcode]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()

        cy.get('input[type=text][name=address]').should('have.value', 'Rua Oito de Março')

        cy.get('input[type=text][name=address-number]').type(deliver.address.number)
        cy.get('input[type=text][name=address-details]').type(deliver.address.details)

        cy.get('input[type=text][name=district]').should('have.value', 'Santa Maria')
        cy.get('input[type=text][name=city-uf]').should('have.value', 'Osasco/SP')

        // Selecionar opção
        cy.contains('.delivery-method li', deliver.delivery_method).click()

        // Upload CNH
        cy.get('input[accept^=image]').attachFile('/images/' + deliver.cnh)
    }

    submit() {
        // Submit Form
        cy.get('button[class=button-success][type=submit]').click()
    }

    modalContentShoulBe(expectedMessege) {
        // Recebe e valida a menssagem do POP-UP
        cy.get('.swal2-container div[class=swal2-html-container]').should('have.text', expectedMessege)
    }

}

export default new signupPage;