

export let baseurl = "https://621c38ff768a4e1020a4acbe.mockapi.io/spirit-api/v1/"

export default class User {
    constructor(firstname, lastname, email, phone, username, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.username = username;
        this.password = password;
    }

    static async getAllUsers () {
        let users = await fetch(baseurl + 'users');
        return await users.json();
    }

    static async findUserByUsername (username) {
        let users = await fetch(baseurl + 'users');
        let userData = await users.json();
    
        return userData.items?.find(user => user.username === username);
    }

    static async findUserByEmail (email) {
        let users = await fetch(baseurl + 'users');
        let userData = await users.json();
    
        return userData.items?.find(user => user.email === email);
    }

    static async finduserDataById (id) {
        try {
            let user =
            await fetch(baseurl + 'users/' + id)
                .then(async response => {
                    if(response.ok) {
                      return await response.json();
                    } else if (response.status === 404){
                        return Promise.reject("Error 404");
                    } else {
                        return Promise.reject('Other error: ' + response.status)
                    }
                })
                
            return user;
        } catch(error) {
            console.error(error);
        }
        
    }
}