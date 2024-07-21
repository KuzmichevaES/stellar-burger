import type {} from 'cypress';
import { testUrl, bunIngredientCategory, mainIngredientCategory, sauceIngredientCategory, mainIngredient, modal, ingredientCard, modalCloseBtn, constructor } from '../constants';

describe('проверка работы конструктора бургеров', function() {

    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.visit(testUrl);
    })

    it('проверка добавления ингридиентов в конструктор бургера', function() {
        cy.get(bunIngredientCategory).contains('Добавить').click();
        cy.get('[data-cy=bun-top]')
            .contains('Булка')
            .should('exist');
        cy.get('[data-cy=bun-bottom]')
            .contains('Булка')
            .should('exist');
        cy.get(mainIngredientCategory).contains('Добавить').click();
        cy.get(mainIngredient)
            .contains('Котлета')
            .should('exist');
        cy.get(sauceIngredientCategory).contains('Добавить').click();
        cy.get(mainIngredient)
            .contains('Соус')
            .should('exist');
    });
});

describe('проверка модальных окон страницы конструктора', function() {

    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.visit(testUrl);
    });

    it('проверка открытия модального окна с информацией об ингридиенте', function() {
        cy.get(modal).should('not.exist');
        cy.contains('Булка').click();
        cy.get(modal).should('be.visible');
        cy.get(modal).contains('Булка').should('exist');
    });

    it('проверка закрытия модального окна по клику на крестик', function() {
        cy.get(ingredientCard).first().click();
        cy.get(modal).should('be.visible');
        cy.get(modalCloseBtn).click();
        cy.get(modal).should('not.exist');
    });

    it('проверка закрытия модального окна по клику на оверлэй', function() {
        cy.get(ingredientCard).first().click();
        cy.get(modal).should('be.visible');
        cy.get('[data-cy=modal-overlay]').click('topRight', { force: true });
        cy.get(modal).should('not.exist');
    });
});

describe('проверка создания заказа', function() {

    beforeEach(function() {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'});
        cy.intercept('POST', 'api/orders', {fixture: 'order-post.json'}).as('orderPost');

        window.localStorage.setItem(
            'refreshToken',
            JSON.stringify('test-refreshToken')
        );

        cy.setCookie('accessToken', 'test-accessToken');

        cy.visit(testUrl);
    });

    afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
    });

    it('проверяем работу оформления заказа', function() {
        cy.get(bunIngredientCategory).contains('Добавить').click();
        cy.get(mainIngredientCategory).contains('Добавить').click();
        cy.get(sauceIngredientCategory).contains('Добавить').click();
        cy.get('[data-cy=make-order-btn]').click();

        cy.get('[data-cy=order-number]').contains('11111').should('exist');

        cy.get(modalCloseBtn).click();
        cy.get(modal).should('not.exist');

        cy.get(constructor)
            .contains('Булка')
            .should('not.exist');
        cy.get(constructor)
            .contains('Котлета')
            .should('not.exist');
        cy.get(constructor)
            .contains('Соус')
            .should('not.exist');
    })
});