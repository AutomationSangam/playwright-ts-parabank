import { Locator, Page } from "@playwright/test";

export default class AccountsOverviewPage{
    constructor(private page:Page){}
    accountsOverviewText:Locator=this.page.getByRole('heading',{name:'Accounts Overview'});
    totalBalance:Locator=this.page.locator('//b[text()="Total"]/parent::td/following-sibling::td/b')
    accountNoBalance:Locator=this.page.getByRole('link',{name:'16119'}).locator('parent::td')
    existingAccountNo:Locator=this.page.getByRole('table').getByRole('link').first()

    getAccountBalance(accountNo:string):Locator{
        return  this.page.locator(`//a[text()="${accountNo}"]/parent::td/following-sibling::td`).first()
    }
    getAccountAvailableAmount(accountNo:string):Locator{
        return this.page.locator(`//a[text()="${accountNo}"]/parent::td/following-sibling::td/following-sibling::td`).last()
    }
}