import User from './User.js';
import Utils from './Utils.js'

let baseurl = "https://621c38ff768a4e1020a4acbe.mockapi.io/spirit-api/v1/"
let userIdInLocalStorage = "userId";
let rememberUserInLocalStorage = "rememberUser";

let checkPassword = async (username, password) => {
    try {
        let users = await fetch(baseurl + 'users');
        let userData = await users.json();
    
        return userData.items?.find(user => user.username === username && user.password === password);
    } catch(error) {
        console.error(error);
    }
}

/**
 * Event triggered when submitting the login info
 * @param {*} event 
 * @see submit-button fires this action from login.html
 */
let login = async (event) => {

    event.preventDefault(); 

    let usernameElement = document.getElementById("usernameLogin"),
        username = document.getElementById("usernameLogin").value,
        password = document.getElementById("passwordLogin").value;

    let user = await checkPassword(username, password) 
        user ? successfulLogin(user) : unsuccesfulLogin(usernameElement);
}

/**
 * Show error message for invalid user under an input element
 * @param {Object} element - The input element where the message is shown
 * @see login() in login.js
 */
let unsuccesfulLogin = (element) => {
    let help = element.getAttribute("aria-describedby");
    let helpMessage = document.getElementById(help);
    Utils.changeRequiredStatus(element, helpMessage, "invalid-user");
}

/**
 * Show a welcome message with toastify-js
 * @param {string} user - An user object with all its data
 * @see login() in login.js
 */
let successfulLogin = (user) => {

    let {firstname, id} = user;

    Toastify({
        text: "Welcome back, " + firstname + "!",
        selector: "content-signin",
        duration: 1500,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        className: "user-created",
        callback: function(){} // Callback after click
    }).showToast();

    localStorage.setItem("SessionOn", "true");
    localStorage.setItem(rememberUserInLocalStorage, document.getElementById("rememberUser").checked);
    localStorage.setItem(userIdInLocalStorage, id);

    setTimeout(() => window.location.replace("../index.html"), 1500);
}

/**
 * If the user selected to be remembered, the fields are filled automatically
 */
let fillLogin = async () => {
    let rememberUser = JSON.parse(localStorage.getItem(rememberUserInLocalStorage));
    let userId = localStorage.getItem(userIdInLocalStorage);
    
    if(rememberUser == true && userId)
    {
        try {
            
            let {username, password} = await User.finduserDataById(userId);
            document.getElementById("usernameLogin").value = username, document.getElementById("passwordLogin").value = password;
            document.getElementById("rememberUser").checked = rememberUser;

        } catch(error) {
            console.log(error);
        }
    }
}

document.getElementById("form-login")?.addEventListener("submit", (event) => login(event));
fillLogin();