let Debug = false;
let UserDataBase = [];
let UserCart = [];

let isBlank = (str) => (!str || /^\s*$/.test(str));

class User {
    constructor(firstname, lastname, email, phone, username, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.username = username;
        this.password = password;
    }
}

// populate database for testing
if(Debug) {
    UserDataBase.push(new User("Amy", "Perez", "amy@mail.com", "", "amy.perez", "pass1234"));
    UserDataBase.push(new User("Fer", "Perez", "fer@mail.com", "", "fer.p", "pass5678"));
}

//console.log(button);
let button = document.getElementsByClassName("submit-button");
if(button.length === 1) {
    button[0].addEventListener("click", (event) => signup(event)) 
}

// let username = document.getElementById("usernameInput").value;
// console.log(username);

let initializeDatabase = () => {
    //console.log(JSON.parse(localStorage.getItem("UserDatabase")) || null);
    UserDataBase = (JSON.parse(localStorage.getItem("UserDatabase")) || []);
}

let checkExistance = (event, input) => {
    let element = event.target;
    checkExistanceBase(element, input);
};

let checkExistanceBase = (element, input) => {
    let help = element.getAttribute("aria-describedby");
    let value = element.value;
    let helpMessage = document.getElementById(help);
    let error = 0;

    if(isBlank(value)) {
        error = changeRequiredStatus(element, helpMessage, "empty");
    } 
    else {
        switch(input) {
            case "Username":
                error = findUser(value) ?
                    changeRequiredStatus(element, helpMessage, "exists") :
                    changeRequiredStatus(element, helpMessage, "valid");
                break;
            case "Email":
                error = findEmail(value) ?
                    changeRequiredStatus(element, helpMessage, "exists") :
                    changeRequiredStatus(element, helpMessage, "valid");
                break;
            case "Password":
                error =!validatePassword(value) ?
                    changeRequiredStatus(element, helpMessage, "invalid-pass") :
                    changeRequiredStatus(element, helpMessage, "valid");
                break;
            default:
                error = changeRequiredStatus(element, helpMessage, "valid");
                break;
        }
    }
    return error;
}


let changeRequiredStatus = (element, helpMessage, status) => {
    switch (status) {
        case "empty": 
            helpMessage.innerText = "This field is required";
            element.classList.add("required-shadow");
            return 1;
        case "exists": 
            helpMessage.innerText = "This " + element.getAttribute("placeholder") + " already exists"; 
            element.classList.add("required-shadow");
            return 1;
        case "invalid-pass":
            helpMessage.innerText = "The password should contain at least: one uppercase letter, one lowecase letter, one figit, one special symbol, and have more than 4 characters"; 
            element.classList.add("required-shadow");
            return 1;
        case "valid":
            helpMessage.innerText = "";
            element.classList.remove("required-shadow");
            return 0;
    }
}

document.getElementById("firstNameInput").onblur = (event) => checkExistance(event);
document.getElementById("lastNameInput").onblur = (event) => checkExistance(event);
document.getElementById("passwordInput").onblur = (event) => checkExistance(event, "Password");
document.getElementById("usernameInput").onblur = (event) => checkExistance(event, "Username");
document.getElementById("emailInput").onblur = (event) => checkExistance(event, "Email");

initializeDatabase();

let signup = (event) => {

    event.preventDefault(); 

    let accountInfo = document.getElementsByClassName("input-info")[0].getElementsByClassName("required");
    //console.log(accountInfo[0].getElementsByClassName("form-control"));

    let firstname, lastname, email, phone, username, password, missingRequired = 0;

    for (let input = 0; input < accountInfo.length; input++) {
        const element = accountInfo[input];
        missingRequired += checkExistanceBase(element, element.getAttribute("placeholder"));
    }

    console.log(missingRequired);
    firstname = document.getElementById("firstNameInput").value;
    lastname = document.getElementById("lastNameInput").value;
    email = document.getElementById("emailInput").value;
    phone = document.getElementById("phoneInput").value;
    username = document.getElementById("usernameInput").value;
    password = document.getElementById("passwordInput").value;

    //console.log(missingRequired); 

    // create user
    if(missingRequired <= 0) {
        const UserCreated = new User(firstname, lastname, email, phone, username, password);
        if (UserCreated) {
            UserDataBase.push(UserCreated);
            localStorage.setItem("UserDatabase", JSON.stringify(UserDataBase));
            console.log(JSON.parse(localStorage.getItem("UserDatabase")) || null);
        }
    }
}

let findEmail = 
    (email) => UserDataBase.find(user => user.email === email)?.email;

let findUser = 
    (username) => UserDataBase.find(user => user.username === username)?.username;

let validatePassword = 
    (password) => {
            return (/[A-Z]/       .test(password) &&
            /[a-z]/       .test(password) &&
            /[0-9]/       .test(password) &&
            /[^A-Za-z0-9]/.test(password) &&
            password.length > 4);
    };

let checkPassword = 
    (username, password) => UserDataBase.find(user => user.email === email && user.username === username)?.username 
        === password;

let login = () => {
    let email, password, userFound, correctPassword;

    do {
        email = prompt("Please enter your email:");
        userFound = findEmail(email);
        if(!userFound)
            confirm("There is no user signed with this email");
    } while(isBlank(email) || !userFound);
    
    do {
        password = prompt("Please enter your password:");
        correctPassword = checkPassword(email, password);
        if(!checkPassword(email, password))
            confirm("Wrong password");
    } while(isBlank(password) || !correctPassword);

    confirm("Welcome");
}

class TicketsInCart {
    constructor(id, description, date, amount, total) {
        this.id = id;
        this.description = description;
        this.date = date;
        this.amount = amount;
        this.total = total
    }

    calulateTicketCost (cost) {
        this.total = this.amount * cost;
    } 
}

const products = {
    total: 4,
    items: [
        {
            description: "Washington vs ",
            cost: 85,
            stock: 5
        }, {
            description: "jerseys",
            cost: 120,
            stock: 3
        }, {
            description: "shorts",
            cost: 45,
            stock: 0
        }, {
            description: "sweaters",
            cost: 110,
            stock: 10
        }
    ]
};

let item_confirmStock = (description) => products.items.find(item => item.description === description)?.stock;
let item_findCost = (description) => products.items.find(items => items.description === description).cost;

function calculateNewTotal(amount, item, total) {
    
    let cost = item_findCost(item);

    if(cost != null) {
        for (let i = 0; i < amount; i++) {
            if (i > 2) {
                total += cost*0.9;5
            }
            else {
                total += cost;
            }
        }   
        
        if(Debug)
            console.log(total);
        return total;
    }
    else 
        return 0;
}

let additemsToCart = () => {
    let exit = false;
    
    do {
        let total = 0, 
            item, 
            amount, 
            decreaseAmount = true, 
            itemStock;
     
        do {
            item = prompt("What item do you want?");
            itemStock = item_confirmStock(item);
            if(!itemStock)
                alert("We don't have that item in this store");
        } while(!itemStock || itemStock <= 0);
        
        do {
            amount = parseInt(prompt("How many " + item + " do you want to add? After three, each new one has a discount of 10%"));
            if(itemStock < amount && amount > 0) {
                amount = 0;
                decreaseAmount = confirm("We only have " + itemStock + ". Do you want to select less items?");
            }
        } while (amount <= 0 && decreaseAmount);
    
        if(amount > 0) {
            total = calculateNewTotal(amount, item, total);
            exit = confirm("The total is $" + total.toFixed(2) + ". Confirm your selection");

            if(exit) {
                UserCart.push(new ProductInCart(item, amount, total));
                console.log(UserCart);
            }
        }
        else 
            exit = 0;
    }
    while(!exit);
}