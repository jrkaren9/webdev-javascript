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


