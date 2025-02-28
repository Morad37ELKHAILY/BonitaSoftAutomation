import { test, expect } from '@playwright/test';
import { SlackBotPage } from '../../pages/SlackBotPage';

const Message = 'I want to request leave from march 5 to march 15';

test('Validate Slack bot response for leave request', async ({ request }) => {
    const slackBot = new SlackBotPage(request);

    const response = await slackBot.sendMessageToBot(Message);
    //on suppose que l'objet response retourné par le bot Slack doit inclure un champ nommé confirmation donc on le verifie
    expect(response).toHaveProperty('confirmation');
    //Ici egualement je vérifi que l'objet response retourné par le bot Slack nommé confirmation contien bien un message attendue
    //qui signifie que la requet est bien transmise exemple : Your leave request has been received
    expect(response.confirmation).toBe("Your leave request has been received");
});

//on peut ajouter les cas hor-nominaux