// <reference types="cypress" />

import "./category";
import "./product";

Cypress.on("uncaught:exception", () => {
  return false;
});
