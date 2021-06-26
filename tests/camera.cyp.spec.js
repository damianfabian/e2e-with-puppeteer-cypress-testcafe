/// <reference types="cypress" />

const { expect } = require("chai");

const delay = (time) => new Promise((res) => setTimeout(() => res(), time));

context('Actions', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('Camera renders with Fake video', () => {
		cy.get('#camera').then(([camera]) => {
            expect(camera.srcObject).to.be.null
        })

		cy.wait(1000);

		cy.get('#camera').then(([camera]) => {
            expect(camera.srcObject).not.to.be.null
        })
	});
});
