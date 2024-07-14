import type {} from 'cypress';

describe('проверка работы конструктора бургеров', function() {

    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.visit('http://localhost:4000');
    })

    it('проверка добавления ингридиентов в конструктор бургера', function() {
        cy.get('[data-cy=buns-category]').contains('Добавить').click();
        cy.get('[data-cy=bun-top]')
            .contains('Булка')
            .should('exist');
        cy.get('[data-cy=bun-bottom]')
            .contains('Булка')
            .should('exist');
        cy.get('[data-cy=mains-category]').contains('Добавить').click();
        cy.get('[data-cy=main-ingredient]')
            .contains('Котлета')
            .should('exist');
        cy.get('[data-cy=sauces-category]').contains('Добавить').click();
        cy.get('[data-cy=main-ingredient]')
            .contains('Соус')
            .should('exist');
    });
});

describe('проверка модальных окон страницы конструктора', function() {

    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
        cy.visit('http://localhost:4000');
    });

    it('проверка открытия модального окна с информацией об ингридиенте', function() {
        cy.get('[data-cy=modal]').should('not.exist');
        cy.contains('Булка').click();
        cy.get('[data-cy=modal]').should('be.visible');
        cy.get('[data-cy=modal]').contains('Булка').should('exist');
    });

    it('проверка закрытия модального окна по клику на крестик', function() {
        cy.get('[data-cy=ingredient-card]').first().click();
        cy.get('[data-cy=modal]').should('be.visible');
        cy.get('[data-cy=modal-close-btn]').click();
        cy.get('[data-cy=modal]').should('not.exist');
    });

    it('проверка закрытия модального окна по клику на оверлэй', function() {
        cy.get('[data-cy=ingredient-card]').first().click();
        cy.get('[data-cy=modal]').should('be.visible');
        cy.get('[data-cy=modal-overlay]').click('topRight', { force: true });
        cy.get('[data-cy=modal]').should('not.exist');
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

        cy.visit('http://localhost:4000');
    });

    afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
    });

    it('проверяем работу оформления заказа', function() {
        cy.get('[data-cy=buns-category]').contains('Добавить').click();
        cy.get('[data-cy=mains-category]').contains('Добавить').click();
        cy.get('[data-cy=sauces-category]').contains('Добавить').click();
        cy.get('[data-cy=make-order-btn]').click();

        cy.get('[data-cy=order-number]').contains('11111').should('exist');

        cy.get('[data-cy=modal-close-btn]').click();
        cy.get('[data-cy=modal]').should('not.exist');

        cy.get('[data-cy=constructor]')
            .contains('Булка')
            .should('not.exist');
        cy.get('[data-cy=constructor]')
            .contains('Котлета')
            .should('not.exist');
        cy.get('[data-cy=constructor]')
            .contains('Соус')
            .should('not.exist');
    })
});