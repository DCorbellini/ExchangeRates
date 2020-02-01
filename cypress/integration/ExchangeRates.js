/// <reference types="Cypress" />

const URL = 'http://192.168.137.1:8080'

context('ExchangeRates', () => {

    before(() => {
        cy.visit(URL)
    })

    it('Comparar Base con Valores', () => {
        cy.wait(1000).get('#base').invoke('val')
            .then($base => {
                cy.get(`.valor-${$base}`).should('have.text', '1')
            })
    })

    it('Cambia de base y comprobar nuevos valores', () => {

        cy.get('#base').find('.opcion').first().invoke('val')
        .then(base => {
            cy.get('#base').select(base)
        })
        cy.get('#boton').click()
        cy.wait(1000).get('#base').invoke('val')
            .then($base => {
                cy.get(`.valor-${$base}`).should('have.text', '1')
            })

    })

})