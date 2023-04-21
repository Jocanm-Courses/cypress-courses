/// <reference types="cypress" />

describe('Our first suite', () => {
  beforeEach(() => {
    cy.visit("")
  })
  it('first test', () => {

    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()

    // get by attribute
    cy.get("[placeholder]")

    // get by attribute and value
    cy.get("[placeholder='Email']")

    // get by tag name and attribute with value
    cy.get("input[placeholder='Email']")

    // get by two different attributes
    cy.get("[placeholder='Email'][type='email']")

    // get by tag name, attribute with value, ID and class name
    // cy.get("input[placeholder='Email'][id='email'][class='form-control']")

    // the most recommended way by Cypress
    cy.get("[data-cy='inputEmail1']")

  })

  it.only('second test', () => {
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()
    cy.get(".sidebar-toggle").click()

    cy.get("[data-cy='signInButton']")

    cy.contains("[status='warning']","Sign in")

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain","Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click()

    cy.contains("nb-card","Horizontal form")
      .find("[type='email']")
      .type("email@gmail.com")
      .should("have.value","email@gmail.com")
  })
})
