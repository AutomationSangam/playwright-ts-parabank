import { Locator, Page } from "@playwright/test";

export default class BillPayPage{
    constructor(private page:Page){}
     billPaymentServiceText:Locator=this.page.getByRole('heading',{name:'Bill Payment Service'});
     enterPayeeInformationText:Locator=this.page.getByText('Enter payee information');
     payeeName:Locator=this.page.locator('[name="payee.name"]');
     payeeAddress:Locator=this.page.locator('[name="payee.address.street"]');
     payeeCity:Locator=this.page.locator('[name="payee.address.city"]');
     payeeState:Locator=this.page.locator('[name="payee.address.state"]');
     payeeZipCode:Locator=this.page.locator('[name="payee.address.zipCode"]');
     payeePhoneNumber:Locator=this.page.locator('[name="payee.phoneNumber"]');
     accountNumber:Locator=this.page.locator('[name="payee.accountNumber"]');
     verifyAccountNumber:Locator=this.page.locator('[name="verifyAccount"]');
     amount:Locator=this.page.locator('[name="amount"]');
     fromAccount:Locator=this.page.locator('[name="fromAccountId"]');
     sendPayment:Locator=this.page.locator('[value="Send Payment"]');
     paymentCompleteText:Locator=this.page.getByRole('heading',{name:'Bill Payment Complete'});
    //Bill Payment to fdsf in the amount of $50.00 from account 16341 was successful.
     paymentConfirmationText:Locator=this.page.getByText('Bill payment to');
     seeAccountActivity:Locator=this.page.getByText('See Account Activity for more details.')
    
     async fillPayeeInformation(payeeName:string,payeeAddress:string,payeeCity:string,payeeState:string,payeeZipCode:string,payeePhoneNumber:string,accountNumber:string,amount:string,fromAccount:string){
        await this.payeeName.fill(payeeName)
        await this.payeeAddress.fill(payeeAddress)
        await this.payeeCity.fill(payeeCity)
        await this.payeeState.fill(payeeState)
        await this.payeeZipCode.fill(payeeZipCode)
        await this.payeePhoneNumber.fill(payeePhoneNumber)
        await this.accountNumber.fill(accountNumber)
        await this.verifyAccountNumber.fill(accountNumber)
        await this.amount.fill(amount)
        await this.fromAccount.selectOption(fromAccount)
        await this.page.waitForTimeout(1000)
        await this.sendPayment.click()
     }
}