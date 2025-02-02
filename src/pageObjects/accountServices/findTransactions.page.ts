import { Locator, Page } from "@playwright/test";

export default class FindTransactionsPage{
    constructor(private page:Page){}
    accountId:Locator=this.page.locator('select#accountId')
    amount:Locator=this.page.locator('input#amount')
    findByAmount:Locator=this.page.locator('button#findByAmount')
}