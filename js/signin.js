let signin = (event) => {

    event.preventDefault(); 

    let accountInfo = document.getElementsByClassName("input-info")[0].getElementsByClassName("required");
    //console.log(accountInfo[0].getElementsByClassName("form-control"));

    let firstname, lastname, email, phone, username, password, missingRequired = 0;

    for (let input = 0; input < accountInfo.length; input++) {
        const element = accountInfo[input];
        missingRequired += checkExistanceBase(element, element.getAttribute("placeholder"));
    }

    firstname = document.getElementById("firstNameInput").value;
    lastname = document.getElementById("lastNameInput").value;
    email = document.getElementById("emailInput").value;
    phone = document.getElementById("phoneInput").value;
    username = document.getElementById("usernameInput").value;
    password = document.getElementById("passwordInput").value;

    //console.log(missingRequired); 

    // create user
    if(missingRequired <= 0) {
        const UserCreated = new User(firstname, lastname, email, phone, username, password);
        if (UserCreated) {
            UserDataBase.push(UserCreated);
            localStorage.setItem("UserDatabase", JSON.stringify(UserDataBase));
            console.log(JSON.parse(localStorage.getItem("UserDatabase")) || null);
        }
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