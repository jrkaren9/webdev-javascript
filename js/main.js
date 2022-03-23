
import { createTopHeaderElement, createFooterElement, createAccountElement, createLoginElement, createTicketListElement } from './components.js';
import Games from './Games.js';
import User from './User.js';
import UserTicketsCart from './UserTicketsCart.js';

export let baseurl = "https://621c38ff768a4e1020a4acbe.mockapi.io/spirit-api/v1/"

let preloadLogin = async () => {
    let session = localStorage.getItem("SessionOn"),
        element = document.getElementById("account");

    if(JSON.parse(session) == true) {
        let id = localStorage.getItem("userId");

        try {
            let {username, firstname, lastname} =  await User.finduserDataById(id);
            element.innerHTML = createAccountElement(username, firstname, lastname);
            
            document.getElementById("account-button")
                .addEventListener("click", changeAccountStatus);
                
            document.getElementById("logout").addEventListener("click", event => {
                event.preventDefault();
                logout();
            });
            
            window.addEventListener("mouseup", (event) => {
                let button = document.getElementById('account-button');
                let options = document.getElementById('account-options');
                if(event.target != button && event.target.parentNode != button && options){
                    options.style.display = 'none';
                }
            }); 

        } catch (error) {
            console.error(error);
            element.innerHTML = createLoginElement();
        }
    }
    /**Load the login and signin options */
    else  
    {
        element.innerHTML = createLoginElement();
    }
}

/**
 * Changes the Login Element to show the options for login and signin again
 */
let logout = () => {
    localStorage.setItem("SessionOn", "false");
    document.getElementById("account-button").removeEventListener("click", changeAccountStatus);
    
    setTimeout(() => document.getElementById("account").innerHTML = createLoginElement(), 100);
}

/**
 * 
 * @returns A change in the display status of the account-options element
 */
let changeAccountStatus = () => document.getElementById("account-options")?.style.display == "inline-block" ? 
    document.getElementById("account-options").style.display = "none" :
    document.getElementById("account-options").style.display = "inline-block";

createTopHeaderElement();
createFooterElement();
preloadLogin();


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////// Games //////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Fills the component to give the user the ability to buy tickets for matches
 */
let completeGamesComponent = async () => {
    if (document.getElementById('nextmatches-carousel')) {
        let games = await Games.getGames();
        createTicketListElement(games);
    }
}

completeGamesComponent();

UserTicketsCart.showCart();