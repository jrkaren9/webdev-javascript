
let Debug = false;
let userIdInLocalStorage = "userId";
let rememberUserInLocalStorage = "rememberUser";
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

let checkPassword = async (username, password) => {
    let users = await fetch(baseurl + 'users');
    let userdata = await users.json();

    return userdata.items?.find(user => user.username === username && user.password === password);
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

let findUserDataById = async (id) => {
    let user = await fetch(baseurl + 'users/' + id);
    
    return await user.json();
}

let loginElement = 
`<div class="header__searchitem search__login d-flex justify-content-end">
    <a href="../pages/login.html">Log in</a>
</div>
<div class="vertical-line">|</div>
<div class="header__searchitem search__signin">
    <a href="../pages/signin.html">Sign in</a>
</div>`

let createLoginElement = () => {
    let href = window.location.href.includes('index.html') ? './pages/' : '../pages/';

    let loginElement = 
    `<div class="header__searchitem search__login d-flex justify-content-end">
        <a href="${href}login.html">Log in</a>
    </div>
    <div class="vertical-line">|</div>
    <div class="header__searchitem search__signin">
        <a href="${href}signin.html">Sign in</a>
    </div>`;

    return loginElement;
}

let createAccountElement = (username, firstname, lastname) => {
    let accountElement = 
    `<div id="account-button">
    <p>${username}</p>
    <div id="account-options">
        <div class="account-header">
            <p>${firstname} ${lastname}</p>
            <p>Rise up, DC!</p>
        </div>
        <div class="account-menu">
            <ul>
                <li>
                    <a>My account</a></li>
                <li>
                    <a>My <span>tickets</span></a>
                </li>
                <li>
                    <a>My <span>cart</span></a>
                </li>
                <li>
                    <a>Help</a>
                </li>
                <li>
                    <a id="signout">Sign Out</a>
                </li>
            </ul>
        </div>
    </div>
    </div>`;

    return accountElement;
}

let preloadLogin = async () => {
    let session = localStorage.getItem("SessionOn"),
        element = document.getElementById("account");

    if(JSON.parse(session) == true) {
        let id = localStorage.getItem("userId");
        ({username, firstname, lastname} =  await findUserDataById(id));
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

preloadLogin();

let logout = () => {
    localStorage.setItem("SessionOn", "false");
    document.getElementById("account-button").removeEventListener("click", changeAccountStatus);
    
    setTimeout(() => document.getElementById("account").innerHTML = createLoginElement(), 500);
    
}

let changeAccountStatus = () => document.getElementById("account-options")?.style.display == "inline-block" ? 
    document.getElementById("account-options").style.display = "none" :
    document.getElementById("account-options").style.display = "inline-block";
