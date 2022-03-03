class TicketsInCart {
    constructor(id, description, date, amount, total) {
        this.id = id;
        this.description = description;
        this.date = date;
        this.amount = amount;
        this.total = total
    }

    calulateTicketCost (cost) {
        this.total = this.amount * cost;
    } 
}

const products = {
    total: 4,
    items: [
        {
            description: "Washington vs ",
            cost: 85,
            stock: 5
        }, {
            description: "jerseys",
            cost: 120,
            stock: 3
        }, {
            description: "shorts",
            cost: 45,
            stock: 0
        }, {
            description: "sweaters",
            cost: 110,
            stock: 10
        }
    ]
};

let item_confirmStock = (description) => products.items.find(item => item.description === description)?.stock;
let item_findCost = (description) => products.items.find(items => items.description === description)?.cost;

function calculateNewTotal(amount, item, total) {
    
    let cost = item_findCost(item);

    if(cost != null) {
        for (let i = 0; i < amount; i++) {
            if (i > 2) {
                total += cost*0.9;
            }
            else {
                total += cost;
            }
        }   
        
        if(Debug)
            console.log(total);
        return total;
    }
    else 
        return 0;
}

let additemsToCart = () => {
    let exit = false;
    
    do {
        let total = 0, 
            item, 
            amount, 
            decreaseAmount = true, 
            itemStock;
     
        do {
            item = prompt("What item do you want?");
            itemStock = item_confirmStock(item);
            if(!itemStock)
                alert("We don't have that item in this store");
        } while(!itemStock || itemStock <= 0);
        
        do {
            amount = parseInt(prompt("How many " + item + " do you want to add? After three, each new one has a discount of 10%"));
            if(itemStock < amount && amount > 0) {
                amount = 0;
                decreaseAmount = confirm("We only have " + itemStock + ". Do you want to select less items?");
            }
        } while (amount <= 0 && decreaseAmount);
    
        if(amount > 0) {
            total = calculateNewTotal(amount, item, total);
            exit = confirm("The total is $" + total.toFixed(2) + ". Confirm your selection");

            if(exit) {
                UserCart.push(new ProductInCart(item, amount, total));
                console.log(UserCart);
            }
        }
        else 
            exit = 0;
    }
    while(!exit);
}