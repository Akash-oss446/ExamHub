describe('My First Test', () => {
  it('Visits the initial project page', () => {
    it('should login with valid credentials', () => {
      // Visit the login page
      cy.visit('/login');
      cy.contains('Online Examination System');
      // Enter valid username and password
      cy.get('input[name="username"]').type('your_username');
      cy.get('input[name="password"]').type('your_password');
  
      // Click the login button
      cy.get('button[type="submit"]').click();
  
      // Assert that the login was successful by checking the URL or any expected element on the logged-in page
      cy.url().should('include', '/admin'); // Change '/dashboard' to the expected URL after successful login
  
      // Optionally, you can also assert the presence of a welcome message or an element that confirms successful login
      cy.get('.welcome-message').should('be.visible'); // Change '.welcome-message' to the selector for the welcome message element
    });
  
    it('should display error with invalid credentials', () => {
      // Visit the login page
      cy.visit('/login');
  
      // Enter invalid username and password
      cy.get('input[name="username"]').type('invalid_username');
      cy.get('input[name="password"]').type('invalid_password');
  
      // Click the login button
      cy.get('button[type="submit"]').click();
  
      // Assert that an error message is displayed
      cy.get('.error-message').should('be.visible'); // Change '.error-message' to the selector for the error message element
    });
  })
})
describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/user-dashboard')
    cy.contains('Online Examination System');
  })
})
describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/signup')
    cy.contains('Online Examination System');
  })
})