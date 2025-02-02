import { fa, faker } from "@faker-js/faker";
    
class TestDataFaker{

    getRegistrationData(){
        const firstName=faker.person.firstName()
        const lastName=faker.person.lastName()
        const address=faker.location.streetAddress()
        const city=faker.location.city()
        const state=faker.location.state()
        const zipCode=faker.location.zipCode()
        const phoneNumber=faker.phone.number({style:'national'})
        const ssn=faker.string.alphanumeric({length:5})
        const username=faker.internet.username()+this.generateUniqueUsername()
        const password=faker.internet.password()
        return {firstName,lastName,address,city,state,zipCode,phoneNumber,ssn,username,password}
    }
    generateUniqueUsername():string{
        const randomUppercase = faker.string.alpha({ length: 1 }).toUpperCase();
        const randomLowercase = faker.string.alpha({ length: 1 }).toLowerCase();
        const randomNumber = faker.number.int({ min: 0, max: 9 });
      
        // Combine the generated characters 
        const userName = 
          randomUppercase + 
          randomLowercase + 
          randomNumber + 
          faker.string.alphanumeric({ length:2 }); // Add more random characters for stronger password
      
        return userName;
    }
    getPayeeInformation(){
        const payeeName=faker.person.fullName()
        const payeeAddress=faker.location.streetAddress()
        const payeeCity=faker.location.city()
        const payeeState=faker.location.state()
        const payeeZipCode=faker.location.zipCode()
        const payeePhoneNumber=faker.phone.number({style:'national'})
        const payeeAccountNumber=faker.string.numeric({length:5})
        return {payeeName,payeeAddress,payeeCity,payeeState,payeeZipCode,payeePhoneNumber,payeeAccountNumber}
    }

  
}
export default new TestDataFaker()
