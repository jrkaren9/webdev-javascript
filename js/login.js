let preloadLogin = () => {
    let session = localStorage.getItem("SessionOn"),
        rememberUser = localStorage.getItem("rememberUser");

    if(session && rememberUser) {
        
    }
}

/**
 * Event triggered when submitting the login info
 * @param {*} event 
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

    let name = user.firstname;

    Toastify({
        text: "Welcome back, " + name + "!",
        selector: "content-signin",
        duration: 3000,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: false, // Prevents dismissing of toast on hover
        className: "user-created",
        callback: function(){} // Callback after click
    }).showToast();
}

let button = document.getElementsByClassName("submit-button");
if(button.length === 1) {
    button[0].addEventListener("click", (event) => login(event)) 
}