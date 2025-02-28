import { expect } from '@playwright/test';

export class RoleManagementPage {
    constructor(page) {
        this.page = page;
        //Xpath qui vas nous permetre de localiser dans les pages : "Role Management, user list, liste des roles, message d'erreur" (on ne le recupere depuis le dom de la page)
        this.roleManagementLink = page.locator('text=Role Management');
        this.userListLink = page.locator('text=User List');
        this.roleDropdown = page.locator('#role-dropdown');
        this.errorMessage = page.locator('.error-message');
    }
    //Acceder vers la page de gestion des roles
    async navigateToRoleManagement() {
        await this.page.click(this.roleManagementLink);
    }
    //Selectionne un utilisateur et on lui attribue un role
    async assignRole(user, role) {
        await this.page.click(this.userListLink);
        // chose a specific user
        await this.page.click(`text=${user}`); 
        await this.roleDropdown.selectOption(role);
    }
    //Verifier que l'attribution du role et bien bloqué
    async verifyRoleAssignmentBlocked() {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(
            'You cannot assign a higher role than yours'
        );
    }
}
