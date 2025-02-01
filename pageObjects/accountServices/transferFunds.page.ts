import { Locator, Page } from "@playwright/test";

export default class TransferFundsPage{
    constructor(private page:Page){}
     transferFundsText:Locator=this.page.getByRole('heading',{name:'Transfer Funds'});
     fromAccount:Locator=this.page.locator('#fromAccountId');
     toAccount:Locator=this.page.locator('#toAccountId');
     toAccountNo:Locator=this.page.locator('//select[@id="toAccountId"]//option[@selected="selected"]')
     amountInputField:Locator=this.page.locator('#amount');
     transferButton:Locator=this.page.locator('[value="Transfer"]');

     transferCompleteText:Locator=this.page.getByRole('heading',{name:'Transfer Complete!'});
    //$100.00 has been transferred from account #16341 to account #16008.
     amountTransferredText:Locator=this.page.getByText('has been transferred from account');
     seeAccountActivity:Locator=this.page.getByText('See Account Activity for more details.')
}