let login = (event) => {

    event.preventDefault(); 

    let usernameElement = document.getElementById("usernameLogin"),
        username = document.getElementById("usernameLogin").value,
        password = document.getElementById("passwordLogin").value;

    checkPassword(username, password) ? successfulLogin(username) : unsuccesfulLogin(usernameElement);
}

let unsuccesfulLogin = (element) => {
    let help = element.getAttribute("aria-describedby");
    let helpMessage = document.getElementById(help);
    changeRequiredStatus(element, helpMessage, "invalid-user");
}

let successfulLogin = (username) => {

    let name = JSON.parse(localStorage.getItem("UserDatabase")).find(user => user.username === username).firstname;

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