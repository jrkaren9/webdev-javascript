let baseurl = "https://621c38ff768a4e1020a4acbe.mockapi.io/spirit-api/v1/"

let addToCar = async (type, amount, gameId) => {

    let userId = localStorage.getItem("userId");
    
    try {
        let userCart = await fetch(baseurl + 'users/' + userId + "/tickets") ;

        let userData = await users.json();
    
        return userData.items?.find(user => user.username === username && user.password === password);
    } catch(error) {
        console.error(error);
    }

    if(amount > 0) {
        Toastify({
            text: "You added " +  + amount + " in section " + type + " for the match " + gameId,
            selector: "content-index",
            duration: 4000,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: false, // Prevents dismissing of toast on hover
            className: "user-created",
            callback: function(){} // Callback after click
        }).showToast();
    }
}