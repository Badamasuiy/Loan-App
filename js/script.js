// function checkDate(){
//     let testDate = document.getElementById('test').value
// console.log(testDate)
// console.log(typeof(testDate))
// }
document.getElementById('creditForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    //function calculateCreditWorthiness() {
        const annualIncome = parseFloat(document.getElementById('annualIncome').value);
        const loanAmount = parseFloat(document.getElementById('loanAmount').value);
        const currentAmount = parseFloat(document.getElementById('currentAmount').value);
        const creditHistory = document.getElementById('creditHistory').value;
        const lastDepositDateValue = document.getElementById('lastDeposit').value;
        const lastLoanDateValue = document.getElementById('lastLoanCollection').value;
        const loanStartDateValue = document.getElementById('loanRepaymentStart').value;
        const loanEndDateValue = document.getElementById('loanRepaymentEnd').value;
        const accountType = document.getElementById('accountType').value;
    
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = ''; // Clear previous results
    
        // Input validation
        if (isNaN(annualIncome) || annualIncome <= 0) {
            resultElement.innerHTML = 'Please enter a valid annual income.';
            return;
        }
        if (isNaN(loanAmount) || loanAmount <= 0) {
            resultElement.innerHTML = 'Please enter a valid loan amount.';
            return;
        }
        if (isNaN(currentAmount) || currentAmount < 0) {
            resultElement.innerHTML = 'Please enter a valid current amount in account.';
            return;
        }
        if (creditHistory === '') {
            alert('Please select an option for Credit History.');
            return;
        }
        // if (creditHistory ='selectMonth') {
        //     resultElement.innerHTML = 'Please select a valid option for 6 months credit history.';
        //     return;
        // }
        if (!lastDepositDateValue) {
            resultElement.innerHTML = 'Please enter a valid last deposit date.';
            return;
        }
        if (!lastLoanDateValue) {
            resultElement.innerHTML = 'Please enter a valid last loan collection date.';
            return;
        }
        if (!loanStartDateValue) {
            resultElement.innerHTML = 'Please enter a valid loan start date.';
            return;
        }
        if (!loanEndDateValue) {
            resultElement.innerHTML = 'Please enter a valid loan end date.';
            return;
        }
        if (accountType !== 'current' && accountType !== 'savings') {
            resultElement.innerHTML = 'Please select a valid account type.';
            return;
        }
    
        const lastDepositDate = new Date(lastDepositDateValue);
        const lastLoanDate = new Date(lastLoanDateValue);
        const loanStartDate = new Date(loanStartDateValue);
        const loanEndDate = new Date(loanEndDateValue);
    
        const amountPayable = annualIncome * 0.45;
        let score = 0;
    
        // Check current amount in account
        if (currentAmount >= loanAmount) {
            score += 10;
        } else {
            score -= 10;
        }
    
        // Check 6 months credit history
        if (creditHistory === 'yes') {
            score += 10;
        }
    
        // Check last deposit date
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        if (lastDepositDate >= oneMonthAgo) {
            score += 5;
        }
    
        // Check last loan collection date
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        if (lastLoanDate <= sixMonthsAgo) {
            score += 10;
        }
    
        // Check loan repayment period
        const repaymentPeriod = (loanEndDate - loanStartDate) / (1000 * 60 * 60 * 24 * 30);
        if (repaymentPeriod < 6) {
            score += 5;
        }
    
        // Check account type
        if (accountType === 'current') {
            score += 10;
        } else if (accountType === 'savings') {
            score += 5;
        }
    
        // Determine credit worthiness
        if (loanAmount <= amountPayable && score >= 30) {
            resultElement.innerHTML = `Credit Worthiness: Approved (Score: ${score})`;
        } else {
            resultElement.innerHTML = `Credit Worthiness: Rejected (Score: ${score})`;
        }
   // }

})
