import { Locator, Page } from "@playwright/test";

export default class ParaBankLoginPage{
    constructor( private page:Page){}
    customerLoginText:Locator=this.page.getByRole('heading',{name:'Customer Login'});
    usernameInput:Locator=this.page.locator('input[name="username"]');
    passwordInput:Locator=this.page.locator('input[name="password"]');
    loginButton:Locator=this.page.locator('input[type="submit"]');
    forgotLoginInfoButton:Locator=this.page.getByRole('link',{name:'Forgot login info?'});
    registerButton:Locator=this.page.getByRole('link',{name:'Register'});

    async login(username:string,password:string){
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
    }
}