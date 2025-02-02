import { Locator, Page } from "@playwright/test";

export default class AccountHomePage{
    constructor(private page:Page){}
     accountsServicesHeader=this.page.getByRole('heading',{name:'Account Services'});
     accountsOverviewText=this.page.getByRole('heading',{name:'Accounts Overview'});
     openNewAccountLink=this.page.getByRole('link',{name:'Open New Account'});
     accountsOverviewLink=this.page.getByRole('link',{name:'Accounts Overview'});
     transferFundsLink=this.page.getByRole('link',{name:'Transfer Funds'});
     billPayLink=this.page.getByRole('link',{name:'Bill Pay'});
     findTransactionsLink=this.page.getByRole('link',{name:'Find Transactions'});
     updateContactInfoLink=this.page.getByRole('link',{name:'Update Contact Info'});
     requestLoanLink=this.page.getByRole('link',{name:'Request Loan'});
     logOutButton=this.page.getByRole('link',{name:'Log Out'});

     solutions:Locator=this.page.locator('.leftmenu').getByText('Solutions',{exact:true});
     aboutUs:Locator=this.page.locator('.leftmenu').getByText('About Us',{exact:true});
     services:Locator=this.page.locator('.leftmenu').getByText('Services',{exact:true});
     products:Locator=this.page.locator('.leftmenu').getByText('Products',{exact:true});
     locations:Locator=this.page.locator('.leftmenu').getByText('Locations',{exact:true});
     adminPage:Locator=this.page.locator('.leftmenu').getByText('Admin Page',{exact:true});

     homePage:Locator=this.page.getByRole('link',{name:'home',exact:true});
     aboutLink:Locator=this.page.getByRole('link',{name:'about',exact:true});
     contactLink:Locator=this.page.getByRole('link',{name:'contact',exact:true});
}