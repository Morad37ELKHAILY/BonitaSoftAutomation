import { test } from '@playwright/test';
import { AIServiceAPI } from '../../pages/AIServiceAPI';
//import { USER_INPUT } from '../../Fixtures/config.js';

test('Validate AI output consistency', async ({ request }) => {
    const aiService = new AIServiceAPI(request);

    // Étape 1 : Envoyer 5 requêtes et stocker les réponses
    const responses = [];
    for (let i = 0; i < 5; i++) {
        responses.push(await aiService.generateTasks());
    }

    // Étape 2 : Vérifier la cohérence des réponses AI
    await aiService.checkConsistency(responses);
});
test('Validate AI logging', async ({ request }) => {
    const aiService = new AIServiceAPI(request);
    // Étape 3 : Soumettre une évaluation et vérifier que le feedback est bien enregistré
    await aiService.submitRating(5);
});
