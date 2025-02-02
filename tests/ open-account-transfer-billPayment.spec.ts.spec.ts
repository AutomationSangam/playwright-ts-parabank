import accountServicesConstants from "@constants/accountServices.constant";
import AccountHomePage from "@pages/accountServices/accountHome.page";
import AccountOpenedPage from "@pages/accountServices/accountOpened.page";
import AccountsOverviewPage from "@pages/accountServices/accountsOverview.page";
import BillPayPage from "@pages/accountServices/billPay.page";
import FindTransactionsPage from "@pages/accountServices/findTransactions.page";
import OpenNewAccountPage from "@pages/accountServices/openNewAccount.page";
import TransferFundsPage from "@pages/accountServices/transferFunds.page";
import ParaBankLoginPage from "@pages/paraBankLogin.page";
import ParaBankSignUpPage from "@pages/paraBankSignUp.page";
import ParaBankWelcomePage from "@pages/paraBankWelcome.page";
import test, { expect } from "@playwright/test";
import testData from "testData/testData";
import testDataFaker from "testData/testDataFaker";

let paraBankLoginPage:ParaBankLoginPage,paraBankSignUpPage:ParaBankSignUpPage,paraBankWelcomePage:ParaBankWelcomePage,accountHomePage:AccountHomePage,accountOpenedPage:AccountOpenedPage,transferFundsPage:TransferFundsPage,billPayPage:BillPayPage,accountsOverviewPage:AccountsOverviewPage,openNewAccountPage:OpenNewAccountPage,findTransactionsPage:FindTransactionsPage
let registrationData=testDataFaker.getRegistrationData()
let payeeInformationTestData=testDataFaker.getPayeeInformation()
let userName:string
const newAccountBalanceWithDollar=testData.newAccountBalanceWithDollar
const amountToTransfer=testData.amountToTransfer
const amountToPay=testData.amountToPay
test.beforeEach(async ({ page }) => {
  paraBankLoginPage=new ParaBankLoginPage(page)
  paraBankSignUpPage=new ParaBankSignUpPage(page)
  paraBankWelcomePage=new ParaBankWelcomePage(page)
  accountHomePage=new AccountHomePage(page)
  accountOpenedPage=new AccountOpenedPage(page)
  transferFundsPage=new TransferFundsPage(page)
  billPayPage=new BillPayPage(page)
  accountsOverviewPage=new AccountsOverviewPage(page)
  openNewAccountPage=new OpenNewAccountPage(page)
  findTransactionsPage=new FindTransactionsPage(page)
  await page.goto('/')
  await paraBankLoginPage.registerButton.click()
  
  // await page.reload()
  userName=await paraBankSignUpPage.fillRegistrationForm(
    registrationData.firstName,
    registrationData.lastName, 
    registrationData.address,
    registrationData.city,
    registrationData.state,
    registrationData.zipCode,
    registrationData.phoneNumber,
    registrationData.ssn,
    registrationData.username,
    registrationData.password
  )
  await paraBankWelcomePage.welcomeText.waitFor({state: 'visible'})
  await paraBankWelcomePage.logOutButton.click()
  await paraBankLoginPage.customerLoginText.waitFor({state:"visible"})
  await paraBankLoginPage.login(userName,registrationData.password)
})

test('User should be able to open an account, transfer funds, and make a bill payment', async ({page}) => {
  let newAccountNo:string
  await expect(accountsOverviewPage.accountsOverviewText).toBeVisible()
  const existingAccountNo:string=await accountsOverviewPage.existingAccountNo.innerText()
  const existingTotalBalanceWithDollarSign:string=await accountsOverviewPage.totalBalance.innerText();
  const existingTotalBalance=existingTotalBalanceWithDollarSign?.replace('$','')
  await test.step('Verify the Global Navigation Menu',async()=>{
    await accountHomePage.aboutUs.click()
    await expect(page).toHaveURL('/parabank/about.htm')
    await accountHomePage.services.click()
    await expect(page).toHaveURL('/parabank/services.htm')
    await accountHomePage.products.click()
    await expect(page).toHaveURL('https://www.parasoft.com/products/')
    await page.goBack()
    await accountHomePage.locations.click()
    await expect(page).toHaveURL('https://www.parasoft.com/solutions/')
    await page.goBack()
    await accountHomePage.adminPage.click()
    await expect(page).toHaveURL('/parabank/admin.htm')
    await accountHomePage.homePage.click()
    await expect(page).toHaveURL('/parabank/index.htm')
    await accountHomePage.aboutLink.click()
    await expect(page).toHaveURL('/parabank/about.htm')
    await accountHomePage.contactLink.click()
    await expect(page).toHaveURL('/parabank/contact.htm')
  })
  await test.step('Open New Account',async()=>{
    await accountHomePage.openNewAccountLink.click()
    await openNewAccountPage.openNewAccountHeader.waitFor({state:'visible'})
    const dropDown=openNewAccountPage.accountTypeSelect
    await dropDown.selectOption('SAVINGS')
    await expect(openNewAccountPage.minimumDepositText).toHaveText(accountServicesConstants.minimumDespositText)
    await expect(openNewAccountPage.existingAccountSelect).toHaveText(existingAccountNo)
    await openNewAccountPage.openNewAccountButton.click()
    await expect(accountOpenedPage.accountOpenedText).toBeVisible()
    await expect(accountOpenedPage.congratulationsText).toBeVisible()
    await expect(accountOpenedPage.yourNewAccountNumberText).toBeVisible()
    newAccountNo=await accountOpenedPage.newAccountNo.textContent()
  })
  await test.step('Verify the Balance at Account Overview Page',async()=>{
    await accountHomePage.accountsOverviewLink.click()
    await expect(accountsOverviewPage.accountsOverviewText).toBeVisible()
    const newTotalBalanceWithDollarSign:string=await accountsOverviewPage.totalBalance.textContent()
    const newTotalBalance=newTotalBalanceWithDollarSign.replace('$','')
    expect(existingTotalBalance).toEqual(newTotalBalance)
    await expect(accountsOverviewPage.getAccountBalance(newAccountNo)).toHaveText(newAccountBalanceWithDollar)
    await expect(accountsOverviewPage.getAccountAvailableAmount(newAccountNo)).toHaveText(newAccountBalanceWithDollar)
    const oldAccountBalance=(parseFloat(existingTotalBalance)-100).toFixed(2)
    const oldAccountBalanceWithDollar='$'+oldAccountBalance.toString()
    await expect(accountsOverviewPage.getAccountAvailableAmount(existingAccountNo)).toHaveText(oldAccountBalanceWithDollar)
    await expect(accountsOverviewPage.getAccountBalance(existingAccountNo)).toHaveText(oldAccountBalanceWithDollar)
  })
  await test.step('Transfer the funds from created account to another account',async()=>{
    await accountHomePage.transferFundsLink.click()
    await transferFundsPage.transferFundsText.waitFor({state:'visible'})
    await transferFundsPage.amountInputField.fill(amountToTransfer)
    await transferFundsPage.fromAccount.selectOption(newAccountNo)
    await transferFundsPage.toAccount.selectOption(existingAccountNo)
    await transferFundsPage.transferButton.click()
    await expect(transferFundsPage.transferCompleteText).toBeVisible()
    await expect(transferFundsPage.amountTransferredText).toHaveText(`$${parseFloat(amountToTransfer).toFixed(2)} has been transferred from account #${newAccountNo} to account #${existingAccountNo}.`)
    await expect(transferFundsPage.seeAccountActivity).toBeVisible()
  })
  await test.step('Pay the Bill from New Account',async()=>{
    await accountHomePage.billPayLink.click()
    await billPayPage.billPaymentServiceText.waitFor({state:'visible'})
    await billPayPage.fillPayeeInformation(payeeInformationTestData.payeeName,payeeInformationTestData.payeeAddress,payeeInformationTestData.payeeCity,payeeInformationTestData.payeeState,payeeInformationTestData.payeeZipCode,payeeInformationTestData.payeePhoneNumber,payeeInformationTestData.payeeAccountNumber,amountToPay,newAccountNo)
    await expect(billPayPage.paymentCompleteText).toBeVisible()
    await expect(billPayPage.paymentConfirmationText).toHaveText(`Bill Payment to ${payeeInformationTestData.payeeName} in the amount of $${parseFloat(amountToPay).toFixed(2)} from account ${newAccountNo} was successful.`)
  })

  await test.step('Verify the Bill Payment using Find Transactions API',async()=>{
    await accountHomePage.findTransactionsLink.click()
    await findTransactionsPage.accountId.selectOption(newAccountNo)
    await findTransactionsPage.amount.fill(amountToPay)
    await findTransactionsPage.findByAmount.click()
    const promiseResponse=page.waitForResponse(`/parabank/services_proxy/bank/accounts/${newAccountNo}/transactions/amount/${amountToPay}?timeout=30000`)
    const response=await promiseResponse
    const jsonResponse=await response.json()
    expect(response.status()).toBe(200)
    expect(response.request().method()).toBe('GET')
    const filteredResponse=jsonResponse.filter(transaction=>transaction.description.includes(`Bill Payment to ${payeeInformationTestData.payeeName}`))
    expect(filteredResponse[0].accountId).toBe(parseInt(newAccountNo))
    expect(filteredResponse[0].amount).toBe(parseInt(amountToPay))
    expect(filteredResponse[0].description).toBe(`Bill Payment to ${payeeInformationTestData.payeeName}`)
    expect(filteredResponse[0].type).toBe('Debit')
  })
  
})