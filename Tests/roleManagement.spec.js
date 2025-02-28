import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { RoleManagementPage } from '../../pages/RoleManagementPage';

// Définition des variables pour une meilleure réutilisation
const USERNAME = 'manager_user';
const PASSWORD = process.env.PLAYWRIGHT_PASSWORD || 'defaultPassword123'; // Utilisation d'une variable d'environnement pour securisé le MDP

test('Manager cannot assign Admin role', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const roleManagementPage = new RoleManagementPage(page);

    // Étape 1 : Se connecter en tant que Manager
    await loginPage.login(USERNAME, PASSWORD);
    await loginPage.verifyLoginSuccess();
    // Étape 2 : Aller au Role Management Dashboard
    await roleManagementPage.navigateToRoleManagement();
    // Étape 3 : Sélectionner un utilisateur et tenter de lui donner le rôle Admin
    await roleManagementPage.assignRole('John Doe', 'Admin');
    // Étape 4 : Vérifier que l'action est bloquée et qu'un message d'erreur s'affiche
    await roleManagementPage.verifyRoleAssignmentBlocked();
    console.log('Test OK : Manager cannot assign Admin rolee');
});
