import { Locator, Page } from "@playwright/test";

export default class AccountOpenedPage{
    constructor(private page:Page){}
     accountOpenedText:Locator=this.page.getByRole('heading',{name:'Account Opened!'});
     congratulationsText:Locator=this.page.getByText('Congratulations, your account is now open.');
     yourNewAccountNumberText:Locator=this.page.getByText('Your new account number:')
     newAccountNo:Locator=this.page.locator('#newAccountId')
  
}