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
    const userInput = "Préparer un audit ISO";
    const rating = 5;
    const aiService = new AIServiceAPI(request);
    // Étape 3 : Soumettre une évaluation et vérifier que le feedback est bien enregistré
    const response = await aiService.submitRating(userInput,rating);
    expect(response.status()).toBe(200); // Vérifier que la requête a réussi
    // Étape 3 : Vérifier que la note a bien été enregistrée en récupérant les logs
    const logsResponse = await request.get(SaaS_RATING_API_URL, {
        params: { input: userInput }
    })
    expect(logsResponse.status()).toBe(200); // Vérifier que l'API de logs répond
        const logs = await logsResponse.json();
        
    // Étape 4 : Vérifier que le feedback soumis est bien enregistré dans les logs
    expect(logs).toContainEqual({ input: userInput, rating: rating });
});