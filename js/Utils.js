import User from './User.js';

export default class Utils {

    static isBlank (str) {
        return (!str || /^\s*$/.test(str));
    }

    static validatePassword (password) {
        return (/[A-Z]/       .test(password) &&
        /[a-z]/       .test(password) &&
        /[0-9]/       .test(password) &&
        /[^A-Za-z0-9]/.test(password) &&
        password.length > 4);
    }

    static changeRequiredStatus (element, helpMessage, status) {
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

    static async checkExistanceBase (element, input) {
        let help = element.getAttribute("aria-describedby");
        let value = element.value;
        let helpMessage = document.getElementById(help);
        let error = 0;

        if(this.isBlank(value)) {
            error = this.changeRequiredStatus(element, helpMessage, "empty");
        } 
        else {
            switch(input) {
                case "Username":
                    error = await User.findUserByUsername(value) ?
                        this.changeRequiredStatus(element, helpMessage, "exists") :
                        this.changeRequiredStatus(element, helpMessage, "valid");
                    break;
                case "Email":
                    error = await User.findUserByEmail(value) ?
                        this.changeRequiredStatus(element, helpMessage, "exists") :
                        this.changeRequiredStatus(element, helpMessage, "valid");
                    break;
                case "Password":
                    error =! this.validatePassword(value) ?
                        this.changeRequiredStatus(element, helpMessage, "invalid-pass") :
                        this.changeRequiredStatus(element, helpMessage, "valid");
                    break;
                default:
                    error = this.changeRequiredStatus(element, helpMessage, "valid");
                    break;
            }
        }
        return error;
    }

    static checkExistance (event, input) {
        let element = event.target;
        this.checkExistanceBase(element, input);
    }
}
