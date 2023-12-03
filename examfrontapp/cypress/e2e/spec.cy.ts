describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/login')
    cy.contains('Online Examination System')
    cy.get('input[name="username"]').type('Akshay33');
    cy.get('input[name="password"]').type('akshay@44');

    // Click the login button
    cy.get('button[type="submit"]').click();

    // Assert that the login was successful by checking the URL or any expected element on the logged-in page
    cy.url().should('include', '/admin'); // Change '/dashboard' to the expected URL after successful login

    // Change '.welcome-message' to the selector for the welcome message element
    cy.visit('admin/add-category')
    cy.visit('admin/quizzes')
    cy.get('button[name="Questions"]').click();

  });
});
