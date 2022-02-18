let Debug = false;
let TestSignUp = false;
let UserDataBase = [];
let UserCart = [];

let isBlank = (str) => (!str || /^\s*$/.test(str));

class User {
    constructor(firstname, middlename, lastname, email, username, password) {
        this.firstname = firstname;
        this.middlename = middlename;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
    }
}

class ProductInCart {
    constructor(description, amount, total) {
        this.description = description;
        this.amount = amount;
        this.total = total
    }
}

// populate database for testing
if(Debug) {
    UserDataBase.push(new User("Amy", "", "Perez", "amy@mail.com", "pass1234"));
    UserDataBase.push(new User("Fer", "", "Perez", "fer@mail.com", "pass5678"));
}

let button = document.getElementsByClassName("submit-button");
//console.log(button);

if(button.length === 1) {
    button[0].addEventListener("click", (event) => signup(event)) 
}

// let username = document.getElementById("usernameInput").value;
// console.log(username);

let signup = (event) => {

    event.preventDefault(); 

    let accountInfo = document.getElementsByClassName("input-info")[0].getElementsByClassName("required");
    //console.log(accountInfo[0].getElementsByClassName("form-control"));

    let firstname, middlename, lastname, email, phone, username, password;

    for (let input = 0; input < accountInfo.length; input++) {
        const data = accountInfo[input];
        //console.log(data);

        let value = data.value;                             //console.log(data.value);
        let help = data.getAttribute("aria-describedby");   // console.log(data.getAttribute("aria-describedby"));

        if(isBlank(value)) {
            let errorMessage = document.getElementById(help);
            errorMessage.innerText = "This field is required";
            data.classList.add("required-shadow");
        }
        else {
            let errorMessage = document.getElementById(help);
            errorMessage.innerText = "";
            data.classList.remove("required-shadow");
        }
    }

    firstname = document.getElementById("firstNameInput").value;
    lastname = document.getElementById("lastNameInput").value;
    email = document.getElementById("emailInput").value;
    phone = document.getElementById("phoneInput").value;
    username = document.getElementById("usernameInput").value;
    password = document.getElementById("passwordInput").value;

    // create user
    const UserCreated = new User(firstname, middlename, lastname, email, username, password);
    if(Debug)
        console.log(UserCreated);

    // add user to the database
    UserDataBase.push(UserCreated);
    if(Debug)
        console.log(UserDataBase);
}

let findEmail = 
    (email) => UserDataBase.find(user => user.email === email)?.email ? true : false;
let checkPassword = 
    (email, password) => UserDataBase.find(user => user.email === email && user.password === password)?.password 
        === password ? true : false;


// let doesMailExist = findEmail("amy@mail.com");
// if(Debug)
//     console.log(doesMailExist);

// Wrong password
// let isPasswordOk = checkPassword("amy@mail.com", "pass123");
// if(Debug)
//     console.log(isPasswordOk);

// Correct password
// let isPasswordOk = checkPassword("amy@mail.com", "pass1234");
// if(Debug)
//     console.log(isPasswordOk);

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

// signup();
// login();

const products = {
    total: 4,
    items: [
        {
            description: "shirts",
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

// if(Debug) {
    //     console.log(item_confirmStock("shirt"));
    //     console.log(item_findCost("shirt"));
//}

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

//additemsToCart();