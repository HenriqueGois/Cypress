import signup from '../pages/signupPage'

describe('Cadastro', () => {
    // // Antes de TUDO 
    // before(function(){
    // cy.log('Teste do BEFORE, será EXECUTADO uma unica vez antes de começar a SUITE')
    // })
    // // Antes de cada caso de teste
    // beforeEach(function(){
    //     cy.log('Teste do BEFORE, será EXECUTADO uma unica vez antes de CADA CASO DE TESTE')
    // })
    // // Depois de TUDO 
    // after(function(){
    //     cy.log('Teste do AFTER, será EXECUTADO uma unica vez depois de finalizar a SUITE')
    // })
    // // Depois de cada caso de teste
    // afterEach(function(){
    //     cy.log('Teste do AFTER, será EXECUTADO uma unica vez depois de finalizar CADA CASO DE TESTE')
    // })
    beforeEach(function () {
        // Pegar massa de teste 
        cy.fixture('deliver').then((d) => {
            this.deliver = d
        })
    })

    it('Cadastro de usuário', function () {
        signup.goFormPage()
        signup.fillForm(this.deliver.signup)
        signup.submit()
        const expectedMessege = "Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato."
        signup.modalContentShoulBe(expectedMessege)
    })

    it('CPF incorreto', function () {
        signup.goFormPage()
        signup.fillForm(this.deliver.cpf_inv)
        signup.submit()
        cy.get('.alert-error').should('have.text', 'Oops! CPF inválido')
    })

    it('E-mail incorreto', function () {
        signup.goFormPage()
        signup.fillForm(this.deliver.email_inv)
        signup.submit()
        cy.get('.alert-error').should('have.text', 'Oops! Email com formato inválido.')
    })
})

// PAREI NA AULAS DE FAKER CPF