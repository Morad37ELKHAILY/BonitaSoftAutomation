export class SlackBotPage {
    constructor(request) {
        //j'instancie le constructeur avec la requet passee en parametre
        this.request = request;
        this.SLACK_BOT_API_URL = 'https://Saas-platform.com/api/slack-bot';
    }

    // Ici J'envoie un message au bot et je récupère la rponse
    async sendMessageToBot(message) {
        const response = await this.request.post(this.SLACK_BOT_API_URL, {
            data: { message }
        });

        expect(response.status()).toBe(200);
        return response.json();
    }
}
