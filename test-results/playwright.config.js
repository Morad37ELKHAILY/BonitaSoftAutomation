import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    browserName: 'chromium',
    headless: false,  // Afficher le navigateur
    screenshot: 'on', // Capturer les screenshots en cas d'erreur
    video: 'retain-on-failure' // Enregistrer une vidéo si le test échoue
  },
});
