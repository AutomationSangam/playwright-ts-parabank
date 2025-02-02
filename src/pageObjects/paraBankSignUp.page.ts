import { Locator, Page } from "@playwright/test";
import testDataFaker from "src/testData/testDataFaker";

export default class ParaBankSignUpPage{
    constructor(private page:Page){}
    signiningUpEasyText:Locator=this.page.getByRole('heading',{name:'Signing up is easy!'});    
    ifYouHaveAnAccountText:Locator=this.page.getByRole('paragraph',{name:'If you have an account'})
    firstNameText:Locator=this.page.getByText('First Name:');
    firstNameInput:Locator=this.page.locator('input[id="customer.firstName"]');
    lastNameText:Locator=this.page.getByText('Last Name:');
    lastNameInput:Locator=this.page.locator('input[id="customer.lastName"]');
    addressText:Locator=this.page.getByText('Address:');
    addressInput:Locator=this.page.locator('input[id="customer.address.street"]');
    cityText:Locator=this.page.getByText('City:');
    cityInput:Locator=this.page.locator('input[id="customer.address.city"]');
    stateText:Locator=this.page.getByText('State:');
    stateInput:Locator=this.page.locator('input[id="customer.address.state"]');
    zipCodeText:Locator=this.page.getByText('Zip Code:');
    zipCodeInput:Locator=this.page.locator('input[id="customer.address.zipCode"]');
    phoneNumberText:Locator=this.page.getByText('Phone #:');
    phoneNumberInput:Locator=this.page.locator('input[id="customer.phoneNumber"]');
    ssnText:Locator=this.page.getByText('SSN:');
    ssnInput:Locator=this.page.locator('input[id="customer.ssn"]');
    usernameText:Locator=this.page.getByText('Username:');
    usernameInput:Locator=this.page.locator('input[id="customer.username"]');
    passwordText:Locator=this.page.getByText('Password:');
    passwordInput:Locator=this.page.locator('input[id="customer.password"]');
    confirmPasswordText:Locator=this.page.getByText('Confirm:');
    confirmPasswordInput:Locator=this.page.locator('input[id="repeatedPassword"]');
    registerButton:Locator=this.page.locator('input[value="Register"]');
    userNameExistsError:Locator=this.page.getByText('This username already exists.')

    async fillRegistrationForm(firstName:string,lastName:string,address:string,city:string,state:string,zipCode:string,phoneNumber:string,ssn:string,username:string,password:string){
        let userName=username
        let flag=true
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.addressInput.fill(address)
        await this.cityInput.fill(city)
        await this.stateInput.fill(state)
        await this.zipCodeInput.fill(zipCode)
        await this.phoneNumberInput.fill(phoneNumber)
        await this.ssnInput.fill(ssn)
        const url=this.page.url()
        while(flag){
        await this.usernameInput.fill(userName)
        await this.passwordInput.fill(password)
        await this.confirmPasswordInput.fill(password)
        await this.registerButton.click()
        try{
            await this.userNameExistsError.waitFor({state:'visible',timeout:5000})
            userName=testDataFaker.generateUniqueUsername()
            flag=true
        }catch(e){
            flag=false
        }
        }
        return userName;
    }

}