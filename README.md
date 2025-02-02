# Playwright-TS-Parabank
This project has been created using Playwright and Typescript.
![Playwright Logo](https://playwright.dev/img/playwright-logo.svg)
![TypeScript Logo](https://www.typescriptlang.org/icons/icon-48x48.png)

Playwright Typescript Test Suite for Parabank application.

# Overview
This Project has been created using [Playwright](https://playwright.dev/) and the scripting language is TypeScript. 
This is designed using [Page Object Model](https://playwright.dev/docs/pom) where for each page a seperate locator class has been created which helps in maintaining locator.
For Assertion, I have used the Expect library provided by Playwright. Using default [HTML report](https://playwright.dev/docs/test-reporters#html-reporter) provided by Playwright.


## Steps to Run This Project
minimum requirement- ```Node.js Version>=18```
1. Run the ```npm i``` command, it will install all required dependencies for this project.
2. Just run the ```npx playwright test``` command and you will see the execution started.
3. To Run in Headed mode on chromium ```npx playwright test --project chromium --headed```.


![result](/assets/result.png)

[ExecutionVideo](https://github.com/user-attachments/assets/0e2a9b02-7d2c-4a8e-8ac6-830be1604757)
