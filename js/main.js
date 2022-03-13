
import { createTopHeaderElement, createAccountElement, createLoginElement } from './components.js';

export let userIdInLocalStorage = "userId";
export let rememberUserInLocalStorage = "rememberUser";
let UserCart = [];
export let baseurl = "https://621c38ff768a4e1020a4acbe.mockapi.io/spirit-api/v1/"


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

export let checkPassword = async (username, password) => {
    let users = await fetch(baseurl + 'users');
    let userdata = await users.json();

    return userdata.items?.find(user => user.username === username && user.password === password);
}

let validatePassword = 
    (password) => {
            return (/[A-Z]/       .test(password) &&
            /[a-z]/       .test(password) &&
            /[0-9]/       .test(password) &&
            /[^A-Za-z0-9]/.test(password) &&
            password.length > 4);
    };

export let checkExistance = (event, input) => {
    let element = event.target;
    checkExistanceBase(element, input);
};

export let checkExistanceBase = async (element, input) => {
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

let getUsers = async () => {
    let users = await fetch(baseurl + 'users');
   
    return await users.json();
}

let findUser = async (username) => {
    let users = await fetch(baseurl + 'users');
    let userdata = await users.json();

    return userdata.items?.find(user => user.username === username);
}

let findEmail = async (email) => {
    let users = await fetch(baseurl + 'users');
    let userdata = await users.json();

    return userdata.items?.find(user => user.email === email);
}

export let findUserDataById = async (id) => {
    let user = await fetch(baseurl + 'users/' + id);
    
    return await user.json();
}

let preloadLogin = async () => {
    let session = localStorage.getItem("SessionOn"),
        element = document.getElementById("account");

    if(JSON.parse(session) == true) {
        let id = localStorage.getItem("userId");
        let {username, firstname, lastname} =  await findUserDataById(id);
        element.innerHTML = createAccountElement(username, firstname, lastname);
        
        document.getElementById("account-button")
            .addEventListener("click", changeAccountStatus);
            
        document.getElementById("signout").addEventListener("click", event => {
            event.preventDefault;
            logout()
        });
    }
    /**Load the login and signin options */
    else  
    {
        element.innerHTML = createLoginElement();
    }
}

createTopHeaderElement();
preloadLogin();

let logout = () => {
    localStorage.setItem("SessionOn", "false");
    document.getElementById("account-button").removeEventListener("click", changeAccountStatus);
    
    setTimeout(() => document.getElementById("account").innerHTML = createLoginElement(), 500);
}

let changeAccountStatus = () => document.getElementById("account-options")?.style.display == "inline-block" ? 
    document.getElementById("account-options").style.display = "none" :
    document.getElementById("account-options").style.display = "inline-block";


