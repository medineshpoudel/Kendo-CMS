/// <reference types="cypress" />
describe("Login Test", () => {
  it("The webpage loads", () => {
    cy.visit("http://localhost:3000/");
    // cy.viewport("iphone-8");
    // cy.contains("Login");
    // cy.get("div.mb-3");
  });
  it("Login Page Works", () => {
    cy.visit("http://localhost:3000/");
    // cy.viewport("iphone-8");
    // cy.contains("Login");
    // cy.get("div.mb-3");
    cy.contains("Login").click();
    cy.contains("Please Log in").should("exist");
    cy.contains("Forgot Password").should("exist");
    cy.contains("Remember Me").should("exist");
    cy.contains("Create User").should("exist");
  });
  it("Forget Password Route Works", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Forgot Password").click();
    cy.url().should("include", "/forgot");
    cy.go("back");
  });

  it("Forget Password Route work", () => {
    cy.visit("http://localhost:3000/forgot");
    cy.contains("Change").click();
    cy.url().should("include", "http://localhost:3000/");
  });
  it("Logging In Works", () => {
    cy.visit("http://localhost:3000/");
    cy.get('input[name="email"]').type("dinesh@gmail.com");
    cy.get('input[name = "password"]').type("password");
    cy.get('button[type = "submit"]').click();
    cy.url().should("include", "/");
  });
  it("Logging Out Works", () => {
    cy.contains("Log Out").click();
    cy.url().should("include", "/");
  });
  it("Create Route Works", () => {
    cy.contains("Create").click();
    cy.url().should("include", "/signup");
  });

  it("Invalid Password Error Works", () => {
    cy.visit("http://localhost:3000/");
    cy.get('input[name = "email"]').type("dinesh@gmail.com");
    cy.get('button[type= "submit"]').click();
    cy.get('input[name = "password"]').type("abcd");
    cy.get('div[data-typeId="login-error"]').should("exist");
  });
  it("Invalid Email Error Works", () => {
    cy.visit("http://localhost:3000/");
    cy.get('input[name = "email"]').type("email");
    cy.get('button[type = "submit" ]').click();
    cy.contains("Please enter a valid email");
  });
});
