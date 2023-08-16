# googleMaps-search-vt
Visual Testing with Google Maps

## How to Execute the Test

Follow these steps to execute the end-to-end test for validating map pins on the NSW Government website:

1. **Clone the Repository:**
   - Open a terminal.
   - Run the following command to clone the repository in a local folder:

     git clone <repository-url>

   - Navigate to the cloned repository using the `cd` command.

2. **Open the Repository with Visual Studio Code:**
   - Open Visual Studio Code (VS Code).
   - Use the "File" menu to open the repository folder.

3. **Install Dependencies:**
   - In the VS Code terminal, execute the following command to install the necessary dependencies:
     npm install 

4. **Open Cypress Runner:**
   - With the dependencies installed, execute the following command to open the Cypress runner:
     npx cypress open


5. **Select Test and Browser:**
   - When the Cypress runner interface opens, click on the "E2E Testing" tile.

6. **Choose Browser:**
   - Click on the "Chrome" tile to select the Chrome browser for testing.

7. **Start Testing:**
   - Click the "Start E2E Testing in Chrome" button to initiate the test execution.

8. **Select Test Spec:**
   - In the Cypress runner interface, you'll see a list of test specs.
   - Click on the "nswGoogleMapTest.cy.js" spec to run the map pins validation test.

9. **View Test Execution:**
   - Observe the test execution in the Chrome browser as Cypress navigates through the webpage and validates map pins.
   - The Cypress runner interface will display the test progress and results.

10. **Review Results:**
   - After the test completes, review the results in the Cypress runner interface.
   - Any failed assertions or errors will be clearly indicated.

Following these steps will allow you to execute the end-to-end test for validating map pins on the NSW Government website. 
Make sure to observe the test execution and results to ensure the pins validation process is functioning as expected.

**Approach for Validating Map Pins in Cypress:**

1. **Overview:**
   This approach outlines how to validate map pins on a webpage using Cypress, specifically for the scenario described in the user story. The focus is on 
   ensuring accurate and consistent validation of pins while accounting for potential variations.

2. **Custom Commands:**
   - `searchLocation`: Enters a location, selects a result, and initiates the search.
   - `waitForResultsWithinRange`: Waits for a specified range of search results to appear.
   - `validateMapPinsInRange`: Validates the presence of map pins within a customizable range, accommodating potential variations due to grouping.
   - `uncheckSpecificOptions`: Unchecks specific filter options based on provided labels.

3. **Test Cases:**
   - **Search for a Location:** Ensures search results are displayed as expected.
   - **Apply All Filters and Validate Result Pins:** Validates map pins after applying all filters, ensuring they fall within a specified range.
   - **Apply "Open Space" Filter and Validate Pins:** Validates pins under the "Open Space" filter, accounting for variations in pin count.

4. **Execution Environment:**
   Tests are executed with a viewport of 1280x720 pixels for consistent display.

5. **Consideration for Grouped Pins:**
   This approach acknowledges the presence of grouped or clustered pins, which can impact the actual count displayed on the map. By setting a minimum 
   threshold for pin count validation, the approach accommodates variance due to grouping.

6. **Benefits of the Approach:**
   - Provides flexibility in validation, accommodating variations while ensuring a reasonable number of pins are visible.
   - Prevents false negatives from minor differences between labels and displayed pins.
   - Aligns with dynamic behavior of maps with clustering and grouping features.

7. **Customizable Ranges:**
   The range of minimum pin counts can be customized based on real-world observations, ensuring the validation matches the map's behavior.

By adopting this approach, I enhance the accuracy of the pin validation process, ensuring the tests reflect the dynamic behavior of the map while 
accounting for potential grouping effects.
