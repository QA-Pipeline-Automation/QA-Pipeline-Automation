import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '3hrkhu',
  defaultCommandTimeout: 10000,
  retries: {
    runMode: 2
  },
  allowCypressEnv: false,

  // Configuration Mochawesome (Sprint 2)
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'tests-ui/cypress/e2e/**/*.spec.ts',
    downloadsFolder: 'tests-ui/cypress/downloads',
    fixturesFolder: false,
    supportFile: 'tests-ui/cypress/support/e2e.ts'
  }
})