import {defineConfig} from 'cypress';
import ip from 'ip';

const address = ip.address();

export default defineConfig({
  e2e: {
    baseUrl: `http://${address}:3001`,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
