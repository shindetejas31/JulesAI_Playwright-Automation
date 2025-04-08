// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { open: 'never' }]], // generate HTML report, don't auto open
  timeout: 60 * 1000,
  retries: 1,
  use: {
    headless: true, // run browser in headless mode
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure', // capture screenshot on test failure
    video: 'retain-on-failure',    // keep video only if test fails
    trace: 'retain-on-failure',   // retain trace for failed tests
  },
});
