import 'cypress-wait-until';

describe('view location by filters', () => {
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            console.log(err);
            return false;
          });
        cy.viewport(1280, 720);
    })
    
    const location = 'Haymarket NSW, Australia';

    it('search for a location', () => {
        cy.visit('/');
        cy.searchLocation(location);
        cy.waitForResultsWithinRange(30); // will wait until the closest result are above 0
    });

    it('Apply all filters and validate that I can see “Result Pins” in Map', () => {
        cy.wait(2000);
        // filter options are already checked by default
        cy.get('button[type="submit"]').contains('Apply filters').click();
        cy.validateMapPinsInRange(30, 40); // will validate pins present in the map are between 30 and 40
        
    });

    it('Apply "Open Space” filter and validate that I can only see “Open Space Pins” in Map', () => {
        const optionsToUncheck = ["Walk", "Public Facility", "Point of Interest", "Event"]; 
        // uncheck specific checkboxes
        cy.uncheckSpecificOptions(optionsToUncheck);
        cy.get('button[type="submit"]').contains('Apply filters').click();
        cy.waitForResultsWithinRange(10); // will wait until the closest result are above 10
        cy.wait(4000); // wait for the pins to load
        cy.validateMapPinsInRange(10, 15); // will validate pins present in the map are between 10 and 15
    });
})