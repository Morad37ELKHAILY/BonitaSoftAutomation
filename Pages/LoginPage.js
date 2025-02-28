import { expect } from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('#username');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    async login(username, password) {
        await this.page.goto('https://saas-platform.com/login');
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }

    async verifyLoginSuccess() {
        await expect(this.page).toHaveURL(/dashboard/);
    }
}
