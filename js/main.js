
let Debug = false;
let UserCart = [];
let baseurl = "https://621c38ff768a4e1020a4acbe.mockapi.io/spirit-api/v1/"

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

let checkExistance = (event, input) => {
    let element = event.target;
    checkExistanceBase(element, input);
};

let checkExistanceBase = async (element, input) => {
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
                error = await findUser(value) ?
                    changeRequiredStatus(element, helpMessage, "exists") :
                    changeRequiredStatus(element, helpMessage, "valid");
                break;
            case "Email":
                error = await findEmail(value) ?
                    changeRequiredStatus(element, helpMessage, "exists") :
                    changeRequiredStatus(element, helpMessage, "valid");
                break;
            case "Password":
                error =! validatePassword(value) ?
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
            helpMessage.innerText = "The password should contain at least: one uppercase letter, one lowecase letter, one digit, one special symbol, and have more than 4 characters"; 
            element.classList.add("required-shadow");
            return 1;
        case "invalid-user":
            helpMessage.innerText = "The username or password is incorrect"; 
            element.classList.add("required-shadow");
            return 1;
        case "valid":
            helpMessage.innerText = "";
            element.classList.remove("required-shadow");
            return 0;
    }
}

let validatePassword = 
    (password) => {
            return (/[A-Z]/       .test(password) &&
            /[a-z]/       .test(password) &&
            /[0-9]/       .test(password) &&
            /[^A-Za-z0-9]/.test(password) &&
            password.length > 4);
    };

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
let item_findCost = (description) => products.items.find(items => items.description === description)?.cost;

function calculateNewTotal(amount, item, total) {
    
    let cost = item_findCost(item);

    if(cost != null) {
        for (let i = 0; i < amount; i++) {
            if (i > 2) {
                total += cost*0.9;
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

let getUsers = async (username) => {
    let users = await fetch(baseurl + 'users');
    let userdata = await users.json();
}

let findUser = async (username) => {
    let users = await fetch(baseurl + 'users');
    let userdata = await users.json();

    return userdata.items?.find(user => user.username === username) ? true : false;
}

let findEmail = async (email) => {
    let users = await fetch(baseurl + 'users');
    let userdata = await users.json();

    return userdata.items?.find(user => user.email === email) ? true : false;
}
    
let checkPassword = async (username, password) => {
    let users = await fetch(baseurl + 'users');
    let userdata = await users.json();

    return userdata.items?.find(user => user.username === username && user.password === password);
}

/**
 * Saves the user object in the "database"
 * @param {string} firstname 
 * @param {string} lastname 
 * @param {string} email 
 * @param {string} phone 
 * @param {string} username 
 * @param {string} password 
 * @returns id: the id of the user when saved in the database
 */
let saveUser = async (firstname, lastname, email, phone, username, password) => {
    let resp = await fetch(baseurl + "users", {
        method: 'POST',
        body: JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone: phone,
            username: username,
            password: password,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })

    let userCreated = await resp.json();
    return userCreated.id;
}

let changeAccountActions = () => {
    ({username, userId, SessionOn} = {...localStorage});
    let accountElement = document.getElementById("account");

    if(JSON.parse(SessionOn) === true)
    {
        accountElement.innerHTML = 
            `<div class="header__searchitem d-flex justify-content-end">` +
                `<a href="#">${username} <\a>` + 
            `<\div>`
    }
}

changeAccountActions()