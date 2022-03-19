
import { createTopHeaderElement, createAccountElement, createLoginElement, createTicketList_Element } from './components.js';

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
    try {
        let users = await fetch(baseurl + 'users');
        let userData = await users.json();
    
        return userData.items?.find(user => user.username === username && user.password === password);
    } catch(error) {
        console.error(error);
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
    let userData = await users.json();

    return userData.items?.find(user => user.username === username);
}

let findEmail = async (email) => {
    let users = await fetch(baseurl + 'users');
    let userData = await users.json();

    return userData.items?.find(user => user.email === email);
}

export let finduserDataById = async (id) => {
    try {
        let user = await fetch(baseurl + 'users/' + id);
        return await user.json();
    } catch(error) {
        console.error(error);
    }
    
}

let preloadLogin = async () => {
    let session = localStorage.getItem("SessionOn"),
        element = document.getElementById("account");

    if(JSON.parse(session) == true) {
        let id = localStorage.getItem("userId");
        let {username, firstname, lastname} =  await finduserDataById(id);
        element.innerHTML = createAccountElement(username, firstname, lastname);
        
        document.getElementById("account-button")
            .addEventListener("click", changeAccountStatus);
            
        document.getElementById("logout").addEventListener("click", event => {
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

let logout = () => {
    localStorage.setItem("SessionOn", "false");
    document.getElementById("account-button").removeEventListener("click", changeAccountStatus);
    
    setTimeout(() => document.getElementById("account").innerHTML = createLoginElement(), 100);
}

let changeAccountStatus = () => document.getElementById("account-options")?.style.display == "inline-block" ? 
    document.getElementById("account-options").style.display = "none" :
    document.getElementById("account-options").style.display = "inline-block";

let getGames = async () => {
    let games = await fetch('../gamesDB.json');
    let gamesData = await games.json();

    return gamesData;
}

createTopHeaderElement();
preloadLogin();

if (document.getElementById('nextmatches-carousel')) {
    let games = await getGames();
    createTicketList_Element(games);
}

let ticketsControls = document.getElementsByClassName("nextmatches-control")
for (let index = 0; index < ticketsControls.length; index++) {
    const element = ticketsControls[index];
    element.addEventListener("click", () => {
        //https://yogeshchauhan.com/how-to-create-a-horizontal-scroll-on-button-click-using-javascript/
        let tickets = document.getElementById("nextmatches-carousel-inner");
        tickets.scrollBy(
            {
                left: element.classList.contains("control-prev") ? -150 : 150,
                top: 0,
                behavior: 'smooth'
            }
        )  
    })
}    

window.addEventListener('mouseup', (event) => {
    let button = document.getElementById('account-button');
    let options = document.getElementById('account-options');
    if(event.target != button && event.target.parentNode != button && options){
        options.style.display = 'none';
    }
}); 