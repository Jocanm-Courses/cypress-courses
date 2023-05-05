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

  it('second test', () => {
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()
    cy.get(".sidebar-toggle").click()

    cy.get("[data-cy='signInButton']")

    cy.contains("[status='warning']", "Sign in")

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click()

    cy.contains("nb-card", "Horizontal form")
      .find("[type='email']")
      .type("email@gmail.com")
      .should("have.value", "email@gmail.com")
  })

  it('then and wrap methods', async () => {
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()

    // cy
    //   .contains("nb-card", "Using the Grid")
    //   .find("[for='inputEmail1']")
    //   .should("contain.text", "Email")

    // cy
    //   .contains("nb-card", "Using the Grid")
    //   .find("[for='inputPassword2']")
    //   .should("contain.text", "Password")

    // cy
    //   .contains("nb-card", "Basic form")
    //   .find("[for='exampleInputEmail1']")
    //   .should("contain.text", "Email address")

    // cy
    //   .contains("nb-card", "Basic form")
    //   .find("[for='exampleInputPassword1']")
    //   .should("contain.text", "Password")

    cy.contains("nb-card", "Using the Grid").then(firstForm => {
      const emailLabelFirst = firstForm.find("[for='inputEmail1']").text()
      const passwordLabelFirst = firstForm.find("[for='inputPassword2']").text()

      expect(emailLabelFirst).to.equal("Email")
      expect(passwordLabelFirst).to.equal("Password")

      cy.contains("nb-card", "Basic form").then(secondForm => {
        const emailLabelSecond = secondForm.find("[for='exampleInputEmail1']").text()
        const passwordLabelSecond = secondForm.find("[for='exampleInputPassword1']").text()

        expect(emailLabelSecond).to.equal("Email address")
        expect(passwordLabelSecond).to.equal(passwordLabelFirst)

        cy.wrap(secondForm).find("[for='exampleInputPassword1']").should("contain.text", passwordLabelFirst)
      })
    })
  })

  it('invoke command', () => {
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()

    cy.get("[for='exampleInputEmail1']").should("contain.text", "Email address")

    cy.get("[for='exampleInputEmail1']").then(label => {
      expect(label.text()).to.equal("Email address")
    })

    cy.get("[for='exampleInputEmail1']").invoke("text").then(text => {
      expect(text).to.equal("Email address")
    })

    cy.contains("nb-card", "Basic form")
      .find("nb-checkbox")
      .click()
      .find("span.custom-checkbox")
      .invoke("attr", "class")
      .should("contain", "checked")
    // .should("have.class", "checked")
  })

  it('radio buttons', () => {

    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()

    cy.contains('nb-card', 'Using the Grid').find("[type='radio']").then(radioButtons => {
      cy.wrap(radioButtons)
        .first()
        .check({ force: true })
        .should('be.checked')

      cy.wrap(radioButtons)
        .eq(1)
        .check({ force: true })

      cy.wrap(radioButtons)
        .first()
        .should('not.be.checked')

      cy.wrap(radioButtons)
        .eq(2)
        .should('be.disabled')

    })

  })

  it('check boxes', () => {
    cy.contains("Modal & Overlays").click()
    cy.contains("Toastr").click()

    cy.get("[type='checkbox']").click({
      force: true,
      multiple: true
    })

  })

  it('lists and dropdowns', () => {
    // cy.get('[data-cy="theme-selector"]').click()
    // cy.get('.options-list').contains('Dark').click()
    // cy.get('[data-cy="theme-selector"]').should('contain', 'Dark')
    // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

    // 2
    cy.get('[data-cy="theme-selector"]').then(dropdown => {
      cy.wrap(dropdown).click()
      cy.get('.options-list nb-option').each((listItem, index) => {
        const itemText = listItem.text().trim()

        const colors = {
          "Light": "rgb(255, 255, 255)",
          "Dark": "rgb(34, 43, 69)",
          "Cosmic": "rgb(50, 50, 89)",
          "Corporate": "rgb(255, 255, 255)"
        }

        cy.wrap(listItem).click()
        cy.wrap(dropdown).should('contain', itemText)
        cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])

        if (index < 3) {
          cy.wrap(dropdown).click()
        }
      })
    })
  })

  it.only('Web tables', () => {})
})
