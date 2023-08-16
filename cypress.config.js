const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    
    baseUrl: 'https://www.nsw.gov.au/visiting-and-exploring-nsw/walks-near-me/map',
    testIsolation: false
  },
});


