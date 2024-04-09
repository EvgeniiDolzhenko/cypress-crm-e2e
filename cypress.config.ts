import { defineConfig } from "cypress";
import 'dotenv/config'
export default defineConfig({
  watchForFileChanges: false,
  e2e: {
    projectId:process.env.PROJECT_ID,
    baseUrl:process.env.URL,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

});
