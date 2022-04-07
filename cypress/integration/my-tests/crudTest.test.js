/// <reference types="cypress" />
describe("CRUD test", () => {
  it("Loggin into app", () => {
    cy.visit("http://localhost:3000/");
    cy.get('input[name="email"]').type("dinesh@gmail.com");
    cy.get('input[name = "password"]').type("password");
    cy.get('button[type = "submit"]').click();
  });
  //   Testing Create Functionality
  it("Create Button Click Works", () => {
    cy.contains("Create").click();
    cy.url().should("include", "/create");
  });
  it("Create Functionality Works", () => {
    cy.get('input[name= "product"]').type("Hello");
    cy.get('input[name = "description"]').type("Testing");
    cy.get('input[name = "email"]').type("testing@testing.com");
    // cy.get('span[class= "k-input-value-text"]').click();
    cy.get('input[name="group2"]').click();
    cy.get('button[type = "submit"]').click();
    cy.url().should("include", "/data-grid");
    cy.get('span[data-testId= "add-toast"]').should("exist");
  });
  //   Testing if data is added to API
  it("Checking if there is data in API", () => {
    cy.request("https://623abb71b5292b8bfcb8eeff.mockapi.io/Todo").as("data");
    cy.get("@data").should((res) => {
      expect(res.body).to.have.length(1);
    });
  });
  // Testing Update Functionality
  it("Update Button Click Works", () => {
    cy.get('button[data-testId = "update-button"]').click();
  });
  it("Update Functionality Works", () => {
    cy.get('input[name= "product"]').clear();
    cy.get('input[name= "product"]').type("Title Changed");
    // cy.get('input[name = "description"]').type("Testing");
    // cy.get('input[name = "email"]').type("testing@testing.com");
    // cy.get('span[class= "k-input-value-text"]').click();
    cy.get('input[name="group1"]').click();
    cy.get('button[type = "submit"]').click();
  });

  // Testing Delete Functionality
  it("Delete Button Wroks", () => {
    cy.get('button[data-testId = "delete-button"]').click();
  });
  //   Testing if data is deleted from API
  it("Checking if data is deleted in API", () => {
    cy.request("https://623abb71b5292b8bfcb8eeff.mockapi.io/Todo").as("data");
    cy.get("@data").should((res) => {
      expect(res.body).to.have.length(0);
    });
  });
});
