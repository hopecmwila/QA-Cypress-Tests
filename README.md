# QA-CYPRESS-TESTS
A centralized repository containing end-to-end (E2E) and unit test automation scripts written with **Cypress**. This collection covers various web applications, user flows, and automated QA tasks.

## Repository Structure

- **`automation-exercise-cypress/`** – Automated E2E test suites covering user authentication, product search, cart functionality, and checkout flows.
- **`automation-task-cypress/`** – Task-specific automated test scripts and QA assessment scenarios.
- **`bloom-test-cypress/`** – Functional and UI test suites for the Bloom application.
- **`Cypress/`** – Additional Cypress configurations, custom commands, and standalone test specs.
- **`unit/`** – Unit-level test scripts verifying isolated component and function behaviors.

## Tech Stack

- **Framework:** [Cypress](https://cypress.io)
- **Language:** JavaScript / TypeScript
- **Runtime:** Node.js

##  Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org) installed on your machine before running the tests.

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com<your-repo-name>.git
   ```
2. Navigate into the specific test folder you want to run (for example, `automation-exercise-cypress`):
   ```bash
   cd "QA Cypress Tests"/automation-exercise-cypress
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```

##  Running the Tests

You can run the test suites either interactively using the Cypress Test Runner or headlessly in your terminal.

**Open the Cypress Test Runner (Interactive Mode):**
```bash
npx cypress open
```

**Run all tests in the terminal (Headless Mode):**
```bash
npx cypress run
```

## Test Coverage Highlights

- User registration, login, and session validation
- Form submissions and input validation
- Navigation, UI element visibility, and responsive checks
- End-to-end user workflows and regression testing
