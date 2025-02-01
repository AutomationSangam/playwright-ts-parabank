import { Locator, Page } from "@playwright/test";

export default class OpenNewAccountPage{
    constructor(private page:Page){}
     openNewAccountHeader:Locator=this.page.getByRole('heading',{name:'Open New Account'});
     accountTypeSelect:Locator=this.page.locator('select[id="type"]');
     whatTypeOfAccountText:Locator=this.page.getByText('What type of Account would you like to open?',{exact:true});
     minimumDepositText:Locator=this.page.getByText('A minimum of');
     existingAccountSelect:Locator=this.page.locator('select[id="fromAccountId"]');
     openNewAccountButton:Locator=this.page.locator('input[value="Open New Account"]');
}