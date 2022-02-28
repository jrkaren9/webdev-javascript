let signin = async (event) => {

    event.preventDefault(); 

    let accountInfo = document.getElementsByClassName("input-info")[0].getElementsByClassName("required");

    let firstname, lastname, email, phone, username, password, missingRequired = 0;

    for (let input = 0; input < accountInfo.length; input++) {
        const element = accountInfo[input];
        missingRequired += await checkExistanceBase(element, element.getAttribute("placeholder"));
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
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: false, // Prevents dismissing of toast on hover
                className: "user-created",
                callback: function(){} // Callback after click
            }).showToast();
            
            localStorage.setItem("SessionOn", "true");
            localStorage.setItem("userId", UserCreated);
            document.getElementById("rememberUser").checked ? 
                localStorage.setItem("rememberUser", "true") :
                localStorage.setItem("rememberUser", "false");
        }
        else    
            console.log("here");
    }
}

let addEvents_SignIn = () => {
    document.getElementById("firstNameInput").onblur = (event) => checkExistance(event);
    document.getElementById("lastNameInput").onblur = (event) => checkExistance(event);
    document.getElementById("passwordInput").onblur = (event) => checkExistance(event, "Password");
    document.getElementById("usernameInput").onblur = (event) => checkExistance(event, "Username");
    document.getElementById("emailInput").onblur = (event) => checkExistance(event, "Email");
}

addEvents_SignIn();

let button = document.getElementsByClassName("submit-button");
if(button.length === 1) {
    button[0].addEventListener("click", (event) => signin(event)) 
}