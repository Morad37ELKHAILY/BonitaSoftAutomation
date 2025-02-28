export class AIServiceAPI {
    constructor(request) {
        this.request = request;
    }
    // Envoie la requête HTTP POST pour générer des tâches en fonction d'une entrée utilisateur
    async generateTasks() {
        const response = await this.request.post(SaaS_API_URL, {
            data: { input: USER_INPUT }
        });
        expect(response.status()).toBe(200);
        return response.json();
    }
    // Ici je vérifie la cohérence des réponses sur plusieurs appels
    async checkConsistency(responses) {
        const firstTasks = responses[0].tasks;
        let consistentCount = 0;
        for (const response of responses.slice(1)) { //Slice(1) execute la premiere reponse
            //ici je Compte le nombre de tâches similaires entre les réponses
            const similarTasks = response.tasks.filter(task => firstTasks.includes(task)).length;
            //Ici je calcule le taux te tache similaire entre les reponses
            const similarity = similarTasks / firstTasks.length;
            //ici je vérifie si la similarité dépasse le seuil défini
            if (similarity >= Perf_Consistency_limit) {
                consistentCount++;
            }
        }
        //Ici je vérifie que le score de cohérence est acceptable
        expect(consistentCount / responses.length).toBeGreaterThanOrEqual(Perf_Consistency_limit);
    }
    // Ici j'évalue la réponse AI
    async submitRating(rating) {
        const response = await this.request.post(SaaS_RATING_API_URL, {
            data: { input: USER_INPUT, rating }
        });
        expect(response.status()).toBe(200);
        return response;
    }
}
