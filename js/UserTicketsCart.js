let baseurl = "https://621c38ff768a4e1020a4acbe.mockapi.io/spirit-api/v1/"

export default class UserTicketsCart {
    constructor(orders) {
        this.orders = orders;
        this.userId = JSON.parse(localStorage.getItem("SessionOn")) ? localStorage.getItem("userId") : 0;
    }
    
    async loadUserOrders() {
        this.orders = await fetch(baseurl + 'users/' + this.userId + '/tickets')
            .then( async (resp) => {
                return resp.ok ? 
                    await resp.json() : 
                    resp.status === 404 ? Promise.reject("Error 404") : Promise.reject("Other error");
            });
    }

    static async CartContent() {
        try {
            this.orders = 
            await fetch(baseurl + 'users/' + this.userId + '/tickets?paid=false')
                .then( async resp =>
                    {
                        return resp.ok ? 
                            await resp.json() : 
                            resp.status === 404 ? 
                                Promise.reject("Error 404") : 
                                Promise.reject("Other error"); 
                    }
                );

            return this.orders;
                
        } catch(error) {
            return [];
        }
    }

    static async showCart() {
        let cartContainer = document.getElementById("content-cart");
        let cart = new UserTicketsCart()
        await cart.loadUserOrders();

        console.log(cart);
        if(cartContainer) {
            let cartElement = document.createElement("div");
            cartElement.classList.add("d-flex", "flex-column", "justify-content-center", "align-items-center");
            let cartElement_temp = `<div class="col-8 order container-fluid">`
    
            for (let index = 0; index < cart.orders.length; index++) {
                console.log(cart.orders[index])
                const order = cart.orders[index];
                cartElement_temp +=         
                `<div class="order__title">
                    Game ID: ${order.gameId}
                </div>
                <div class="order__info row justify-content-center">    
                    ${cart.createTicketsFromOrderElement(order.tickets)}
                </div>`            
    
                cart.createTicketsFromOrderElement(order.tickets);
            }
    
            cartElement.innerHTML = cartElement_temp + "</div>";
            cartContainer.appendChild(cartElement)
        }
    }

    createTicketsFromOrderElement(tickets) {
        let ticketsElement = ``

        for (let index = 0; index < tickets.length; index++) {
            const ticket = tickets[index];
            console.log(ticket);

            ticketsElement += 
            `<div class="order__tickets col-6 col-sm-4">
                <p>Seats: ${ticket.type} </p>
                <p>Amount: ${ticket.amount} </p>
            </div>`
        }

        return ticketsElement
    }

    async addOrder(gameId, type, amount) {
        // see if the order already exists
        let order = this.orders.find(order => order.gameId === gameId);
        let ticketsOfGame =  order ? new OrderForGame(order) : null;
        
        let resp = ticketsOfGame ?
            // UPDATE the order, adding the tickets
            await ticketsOfGame.addTickets(type, amount) :
            // CREATE the order from zero
            await this.newOrder(gameId, type, amount);

        if(resp.ok) {
            if(amount > 0) {
                Toastify({
                    text: "You added " + amount + 
                        " ticket" + (amount > 1 ? "s" : "") 
                        + " in section " + type + " to your cart",
                    selector: "content-index",
                    duration: 4000,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: false, // Prevents dismissing of toast on hover
                    className: "user-created",
                    callback: function(){} // Callback after click
                }).showToast();
            }

            console.log(await resp.json());
        } 
        //else {
            //Redirect to error page 
        //}
    }

    async newOrder(gameId, type, amount) {
        let tickets = [new Ticket(type, amount)];
        let order = new OrderForGame( {id: null, userId: this.userId, gameId, tickets} );

        let orders =
            await fetch(baseurl + 'users/' + this.userId + '/tickets', {
                method: 'POST',
                body: JSON.stringify(order),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });        

        return orders;
    }
}

// orders are done by game and pay status
// this destructuring was a god sent
// https://stackoverflow.com/questions/50715033/javascript-constructor-with-optional-parameters
class OrderForGame {
    constructor( {id = null, userId, gameId, tickets}) {
        this.id = id;
        this.userId = userId;
        this.gameId = gameId;
        this.paid = false;
        this.tickets = tickets;
    }

    async addTickets(type, amount) {
        let ticket = this.tickets.find(ticket => ticket.type === type) 

        ticket ? 
            // if the the user already added tickets of this type, just add more
            ticket.amount = parseInt(ticket.amount) + parseInt(amount) : 
            // if not, create a new "order" for this game and order
            this.tickets.push(new Ticket(type, amount));

        let tickets = await fetch(baseurl + 'users/' + this.userId + '/tickets/' + this.id, {
            method: 'PUT',
            body: JSON.stringify(this),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        return tickets;
    }
}

class Ticket {
    constructor(type, amount) {
        this.type = type;
        this.amount = parseInt(amount);
    }
}