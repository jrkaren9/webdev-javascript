const products = {
    total: 2,
    items: [{
        description: "shirt",
        cost: 85
    }, {
        description: "jersey",
        cost: "120"
    }]
}

function findCost(item){
    for (let i = 0; i < products.items.length; i++) {
        if(products.items[i].description == item)
            return products.items[i].cost;
    } 
}

function addItems(amount, item, total) {
    
    let cost = findCost(item);

    if(cost != null) {
        for (let i = 0; i < amount; i++) {
            if (i > 2) {
                total += cost*0.9;5
            }
            else {
                total += cost;
            }
        }   
    
        console.log(total);
        return total;
    }

    else 
        return 0;
}

let exit = false;

do {
    let total = 0;
    let item = 'shirt';
    
    let amount = parseInt(prompt("How many " + item + " do you want to add? After three, each new one has a discount of 10%"));

    total = addItems(amount, item, total);

    exit = confirm("The total is $" + total.toFixed(2) + ". Do you want to pay?");

}
while(!exit)
