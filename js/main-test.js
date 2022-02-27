// populate database for testing
if(Debug) {
    UserDataBase.push(new User("Amy", "Perez", "amy@mail.com", "", "amy.perez", "pass1234"));
    UserDataBase.push(new User("Fer", "Perez", "fer@mail.com", "", "fer.p", "pass5678"));
}

let doesMailExist = findEmail("amy@mail.com");
console.log(doesMailExist);

//Wrong password
let isPasswordOk = checkPassword("amy@mail.com", "pass123");
console.log(isPasswordOk);

// Valide Password
console.log(validatePassword("12")); 
console.log(validatePassword("12kJ+")); 

//Correct password for User
let isPasswordOk = checkPassword("amy@mail.com", "pass1234");
console.log(isPasswordOk);

