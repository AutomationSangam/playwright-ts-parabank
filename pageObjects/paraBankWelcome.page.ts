import { Locator, Page } from "@playwright/test";

export default class ParaBankWelcomePage{
    constructor(private page:Page){}
     welcomeText:Locator=this.page.getByRole('heading',{name:'Welcome'});
     accountCreatedText:Locator=this.page.getByRole('paragraph',{name:'Your account was'});
     logOutButton:Locator=this.page.getByRole('link',{name:'Log Out'})
}