const getLoan = document.getElementById("getLoan")
const balanceAmount = document.getElementById("amountt")
const work_btn = document.getElementById("work_btn")
const bank_btn = document.getElementById("bank_btn")
const pay = document.getElementById("amount")
const payBack = document.getElementById("hidden_btn");
const outStanding = document.getElementById("outstandingLoan");
const Loan = document.getElementById("Loan");
const laptopsElement = document.getElementById("laptops");
const feautresElement = document.getElementById("features");
const imageElement = document.getElementById("image");
const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("description");
const priceElement = document.getElementById("price");
const pay_btn = document.getElementById("pay_btn");


let payWork = 0.0;
let balance = 0.0;
let outLoan = 0.0;
let laptops = [];
let laptopPrice = 0.0;
let laptopTitle = "";
let selectedLaptop;




payBack.style.visibility = "hidden";
outStanding.style.visibility = "hidden";

function loadPageFunc(){
 
    balanceAmount.innerText = balance;
    pay.innerText = payWork;
    let spec = selectedLaptop.specs;
    feautresElement.innerText="";
    spec.forEach(specif =>{ feautresElement.appendChild(document.createElement('li')).innerText = specif});
    titleElement.innerText = selectedLaptop.title;
    descriptionElement.innerText = selectedLaptop.description;
    priceElement.innerText = selectedLaptop.price + " Kr";
    laptopPrice = selectedLaptop.price;

    fetch("https://hickory-quilled-actress.glitch.me/"+ selectedLaptop.image)
        .then(response => response.blob())
        .then(imageBlob =>{
            const imageObjectURL = URL.createObjectURL(imageBlob);
            x.setAttribute("src", imageObjectURL);
            x.setAttribute("width", "170");
            x.setAttribute("height", "170");
            x.setAttribute("alt", "The Laptop image");
            x.setAttribute("style", "border-radius: 6px; padding-bottom:30px;")
            imageElement.appendChild(x);
    })
}

const handleLoan = () => {
    const amountLoan = prompt("Please enter the amount of money you wish to get loan: ");
   
    if(outLoan != 0){
        alert("Unfortionatly u can't get a loan from a bank before u full back ur currently loan!")
    }
    else if(amountLoan >= balance * 2){
        alert("You cannot do that:(");
    }
    else{
        balance += parseInt(amountLoan);
        outLoan = amountLoan;
        balanceAmount.innerText = balance;   
        payBack.style.visibility = "visible";
        outStanding.style.visibility = "visible";
        Loan.innerText = amountLoan;

    }
}


getLoan.addEventListener("click", handleLoan);

const handleWork = () => {
    payWork += 100;
    pay.innerText =  payWork;
    console.log(payWork);
} 

work_btn.addEventListener("click", handleWork)

const handleBankTransfer = () => {
    if(outLoan != 0){
        let procentToLoan = payWork / 10;
        let netto = balance - procentToLoan + payWork;
        let loanRemain = outLoan - procentToLoan;
        balance = netto;
        balanceAmount.innerText = balance;
        Loan.innerText = loanRemain;
        outLoan = loanRemain;
        payWork= 0.0;
        pay.innerText = payWork;
        if(outLoan === 0){
            outStanding.style.visibility = "hidden";
            Loan.style.visibility = "hidden";
            payBack.style.visibility = "hidden";
        }
        if(outLoan < 0){
            outLoan = Math.abs(outLoan);
            balance += outLoan;
            balanceAmount.innerText = balance;
            outLoan = 0;
            Loan.innerText = outLoan;
            if(outLoan === 0){
                outStanding.style.visibility = "hidden";
                Loan.style.visibility = "hidden";
                payBack.style.visibility = "hidden";
            }
        }
    }
    else{
        balance += payWork;
        balanceAmount.innerText = balance;
        payWork = 0.0; 
        pay.innerText = payWork ;
    }
}

bank_btn.addEventListener("click", handleBankTransfer)

const payBackHandle = () =>{

    if(payWork != 0 && payWork >= outLoan){
        let loanRemain = payWork - outLoan;
        balance += loanRemain;
        balanceAmount.innerText = balance;
        outLoan =0;
        Loan.innerText = outLoan;
        payWork = 0;
        pay.innerText = payWork;
        outStanding.style.visibility = "hidden";
        Loan.style.visibility = "hidden";
        payBack.style.visibility = "hidden";    
    }else if(payWork < outLoan){
        const payBackAmount =  prompt("Your Pay amount is not sufficient to pay back full Loan, please type Yes to pay anyway otherwise type No: ");
        if(payBackAmount == "Yes"){
            let loanRemain = outLoan - payWork;
            outLoan = loanRemain;
            Loan.innerText = outLoan;
            payWork = 0;
            pay.innerText = payWork;

        }
    }
    
}

payBack.addEventListener("click", payBackHandle)

fetch(" https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptopsToMenu(laptops))

const addLaptopsToMenu = (laptops) => {
    laptops.forEach(x => addLaptopToMenu(x))
    selectedLaptop = laptops[0];
    loadPageFunc();
}

const addLaptopToMenu = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);
    laptopTitle = laptop.title;
}

const x = document.createElement("IMG");

const handleLaptopChanges = e => {
    selectedLaptop = laptops[e.target.selectedIndex];
    let spec = selectedLaptop.specs;

    feautresElement.innerText="";
    spec.forEach(specif =>{ feautresElement.appendChild(document.createElement('li')).innerText = specif});
    
    //feautresElement.innerText = selectedLaptop.specs;

    titleElement.innerText = selectedLaptop.title;
    descriptionElement.innerText = selectedLaptop.description;
    priceElement.innerText = selectedLaptop.price + " Kr";
    laptopPrice = selectedLaptop.price;
    
    fetch("https://hickory-quilled-actress.glitch.me/"+ selectedLaptop.image)
        .then(response => response.blob())
        .then(imageBlob =>{
            const imageObjectURL = URL.createObjectURL(imageBlob);
            x.setAttribute("src", imageObjectURL);
            x.setAttribute("width", "170");
            x.setAttribute("height", "170");
            x.setAttribute("alt", "The Laptop image");
            x.setAttribute("style", "border-radius: 6px; padding-top:10px;")
            imageElement.appendChild(x);
    })

}

laptopsElement.addEventListener("change", handleLaptopChanges);



const handlePayNowButton = () =>{
    if(balance == 0.0){
        alert("You can't handle this shop:(")
    }
    else if(balance < laptopPrice){
        alert("You don't have enough money to by this laptop");
    }
    else{
        const handle = balance - laptopPrice;
        balance = handle;
        balanceAmount.innerText = balance;
        alert("Handle succeeded:)");
    }
}
pay_btn.addEventListener("click", handlePayNowButton);