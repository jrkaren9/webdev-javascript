import * as main from './main.js'

let saveUser = async (firstname, lastname, email, phone, username, password) => {
    let resp = await fetch(main.baseurl + "users", {
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

let signin = async (event) => {

    event.preventDefault(); 

    let accountInfo = document.getElementsByClassName("input-info")[0].getElementsByClassName("required");

    let firstname, lastname, email, phone, username, password, missingRequired = 0;

    for (let input = 0; input < accountInfo.length; input++) {
        const element = accountInfo[input];
        missingRequired += await main.checkExistanceBase(element, element.getAttribute("placeholder"));
    }

    firstname = document.getElementById("firstNameInput").value;
    lastname = document.getElementById("lastNameInput").value;
    email = document.getElementById("emailInput").value;
    phone = document.getElementById("phoneInput").value;
    username = document.getElementById("usernameInput").value;
    password = document.getElementById("passwordInput").value;

    // create user
    if(missingRequired <= 0) {
        let UserCreated = await saveUser(firstname, lastname, email, phone, username, password);
        if (UserCreated) {

            Toastify({
                text: "The user was created correctly",
                selector: "content-signin",
                duration: 2000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: false, // Prevents dismissing of toast on hover
                className: "user-created",
                callback: function(){} // Callback after click
            }).showToast();
            
            localStorage.setItem("SessionOn", "true");
            localStorage.setItem(main.userIdInLocalStorage, UserCreated);
            document.getElementById("rememberUser").checked ? 
                localStorage.setItem("rememberUser", "true") :
                localStorage.setItem("rememberUser", "false");
                         
            setTimeout(() => window.location.replace("../index.html"), 2500);
        }
    }
}

let addEvents_SignIn = () => {
    document.getElementById("firstNameInput").onblur = (event) => main.checkExistance(event);
    document.getElementById("lastNameInput").onblur = (event) => main.checkExistance(event);
    document.getElementById("passwordInput").onblur = (event) => main.checkExistance(event, "Password");
    document.getElementById("usernameInput").onblur = (event) => main.checkExistance(event, "Username");
    document.getElementById("emailInput").onblur = (event) => main.checkExistance(event, "Email");
}

addEvents_SignIn();

let button = document.getElementsByClassName("submit-button");
if(button.length === 1) {
    button[0].addEventListener("click", (event) => signin(event)) 
}