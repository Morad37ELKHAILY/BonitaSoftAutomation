import { test } from '@playwright/test';
import { APIDataIntegrityPage } from '../../pages/APIDataIntegrityPage'; 

const RequestID = '12345'
test('Checks data integrity of leave request API', async ({ request }) => { 
    // ici j'initialise une instance de la page d'intégrité des données API
    const apiPage = new APIDataIntegrityPage(request); 

    // Ici j'utilise un exemple d'id généré automatiquement par l'api lorsqu'on fait une demande de congé
    // pour tester la récupération d'une demande de congé
    const requestId = RequestID;  
    // Je vérifie que la demande de congé avec cet ID existe et est correcte
    await apiPage.verifyLeaveRequest(requestId);
});
