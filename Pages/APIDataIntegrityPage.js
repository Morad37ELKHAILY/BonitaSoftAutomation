export class APIDataIntegrityPage {
    constructor(request) {
        this.request = request;
        this.LEAVE_REQUEST_API_URL = 'https://saas-platform.com/api/leave-requests';
    }

    // Ici je vérifie l'intégrité des données d'une demande spécifique
    async verifyLeaveRequest(requestId) {
        //ici j'effectue une requête GET pour récupérer les données d'une demande de congé et je me base sur le param requestId
        const response = await this.request.get(`${this.LEAVE_REQUEST_API_URL}/${requestId}`);

        expect(response.status()).toBe(200);
        const jsonResponse = await response.json();

        //ici je vérifie que la réponse JSON contient bien une propriété "status"
        expect(jsonResponse).toHaveProperty('status');
        
        //Ici je vérifie que la valeur de "status" est l'ine des trois status de demande d'un congé "pending", "approved" ou "rejected"
        // l'objectif est d'assurer que l'API ne retourne pas une reponce hors context
        expect(jsonResponse.status).toMatch(/pending|approved|rejected/);
    }
}
