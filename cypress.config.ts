import { defineConfig } from "cypress";
import 'dotenv/config'
export default defineConfig({
  watchForFileChanges: false,
  e2e: {
    baseUrl:process.env.URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

});
