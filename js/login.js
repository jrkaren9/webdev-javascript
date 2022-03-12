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
    changeRequiredStatus(element, helpMessage, "invalid-user");
}

/**
 * Show a welcome message with toastify-js
 * @param {string} user - An user object with all its data
 * @see login() in login.js
 */
let successfulLogin = (user) => {

    ({firstname, id} = user);

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

let button = document.getElementsByClassName("submit-button");
if(button.length === 1) {
    button[0].addEventListener("click", (event) => login(event)) 
}

let fillLogin = async () => {
    let rememberUser = JSON.parse(localStorage.getItem(rememberUserInLocalStorage));
    let userId = localStorage.getItem(userIdInLocalStorage);
    
    if(rememberUser == true && userId)
    {
        ({username, password} = await findUserDataById(userId));
        document.getElementById("usernameLogin").value = username, document.getElementById("passwordLogin").value = password;
        document.getElementById("rememberUser").checked = rememberUser;
    }
}

fillLogin();