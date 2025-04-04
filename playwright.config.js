// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [['html', { open: 'never' }]], // 'on' to open automatically
  use: {
    headless: true, // run without showing browser
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
