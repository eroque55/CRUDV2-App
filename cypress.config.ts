import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'iqfizd',
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  e2e: {
    baseUrl: 'http://localhost:3000/admin',
    setupNodeEvents: (on, config) => {},
  },
  video: true,
  videosFolder: 'cypress/results/videos',
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results/reports',
    overwrite: true,
    html: true,
    json: false,
    timestamp: 'mmddyyyy_HHMMss',
  },
});
