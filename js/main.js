let exit = false;

do {
    let total = 0, cost = 85;
    let amount = prompt("How many items do you want to add? After three, each new one has a discount of 10%");
        amount = parseInt(amount);

    for (let i = 0; i < amount; i++) {
        if (i > 2) {
            total += cost*0.9;5
        }
        else {
            total += cost;
        }
    }

    exit = confirm("The total is $" + total.toFixed(2) + ". Do you want to pay?");

}
while(!exit)
