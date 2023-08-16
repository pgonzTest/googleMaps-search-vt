Cypress.Commands.add('searchLocation', (location) => {
    // Type location into the search input
    cy.get('input[name="location"]')
      .should('be.visible')
      .should('not.be.disabled')
      .type(location);

    // Wait for search results to appear and click the first result
    cy.get('.pac-item')
      .should('be.visible')
      .contains(location)
      .first()
      .click();

    // custom wait to ensure the button is ready
    cy.wait(1000);

    // Click the "Search" button
    cy.get('input[type=submit]')
      .should('be.visible')
      .should('not.be.disabled')
      .click();

});

Cypress.Commands.add("waitForResultsWithinRange", (minCount) => {
    cy.waitUntil(() =>
      cy.get('.nsw-results-bar__info').then(($label) => {
        const text = $label.text();
        const resultCount = parseInt(text.match(/\d+/)[0]);
        return resultCount > minCount
      })
    );
});

Cypress.Commands.add('validateMapPinsInRange', (minPins, maxPins) => {
    cy.get('.dcs-public-spaces__map').within(() => {
      // Initialize counters for valid individual pins and grouped pins
      let validIndividualPinsCount = 0;
      let validGroupedPinsCount = 0;
  
      // Target all img elements within the map container
      cy.get('img').each(pinImg => {
        const srcValue = pinImg.attr('src');
        const altValue = pinImg.attr('alt');
  
        if (srcValue === 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png' && altValue) {
          // Check if the alt value is a number (indicating grouped pin)
          if (!isNaN(parseInt(altValue))) {
            validGroupedPinsCount++;
          }
        } else if (srcValue === 'https://maps.gstatic.com/mapfiles/transparent.png') {
          // Validate individual pins
          cy.wrap(pinImg)
            .should('have.attr', 'draggable', 'false')
            .should('exist'); // Verifying the presence of the matched elements
  
          validIndividualPinsCount++;
        }
      }).then(() => {
        // Assert that the total valid pins (individual + grouped) is within the specified range
        cy.log('individualPins are: ', validIndividualPinsCount);
        cy.log('GroupedPins are: ', validGroupedPinsCount);
        const totalValidPins = validIndividualPinsCount + validGroupedPinsCount;
        cy.log(totalValidPins);
        expect(totalValidPins).to.be.greaterThan(minPins);
        expect(totalValidPins).to.be.lte(maxPins);
      });
    });
});  

Cypress.Commands.add("uncheckSpecificOptions", (optionsToUncheck) => {
    cy.get('.nsw-form__fieldset input[type="checkbox"]').each((checkbox) => {
      const checkboxLabel = checkbox.next('.nsw-form__checkbox-label').text().trim();
      cy.log("Label:", checkboxLabel); // Log the label for debugging
  
      if (optionsToUncheck.includes(checkboxLabel)) {
        cy.wrap(checkbox).uncheck({ force: true });
      }
    });
});
  
