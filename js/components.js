import UserTicketsCart from './UserTicketsCart.js';
let hrefpages = window.location.href.includes('pages') ? '../pages/' : './pages/';
let hrefimg = window.location.href.includes('pages') ? '../imgs/' : './imgs/';
let hrefhome = window.location.href.includes('pages') ? '../' : '';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////// Elements for TopHeader /////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export let createTopHeaderElement = () => {
    let topheader =
    `<div class="logo_team row-wrap d-none d-lg-block">
        <img src="${hrefimg}washington_spirit_crest.png" alt="Team logo" width="180">
    </div>

    <header class="header container-fluid">
        <div class="row align-items-center">

            <div class="headder__teamname-container col-sm-6 col-lg-7 d-none d-sm-block">
                <h1 class="d-none d-xl-block header__teamname">National Women's Soccer League</h1>
                <h1 class="d-block d-xl-none header__teamname">NWSL</h1>
            </div>

            <div class="col-9 col-sm-3 col-lg-2">
                <div class="d-flex justify-content-start justify-content-sm-end" id="account">
                </div>
            </div>
    
            <div class="header__search col-3 col-sm-3 col-lg-3 d-flex">
                <form class="d-flex justify-content-end">
                    <input class="form-control me-2 d-none d-sm-block outline-white" type="search" placeholder="Search"
                        aria-label="Search">
                    <button class="btn btn-outline-success outline-white btn-red" type="submit" title="Search">
                        <i class="fa fa-search"></i>
                    </button>
                </form>
            </div>
    
        </div>
    </header>

    <!-- NEW NAVBAR -->

    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid justify-content-start">
            <a class="navbar-brand d-none d-sm-block" href="#">Washington Spirit</a>

            <div class="toggler-button order-first">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>

            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">

                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="${hrefhome}index.html">Home</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="${hrefpages}tickets.html">Tickets</a>
                    </li>

                    <li class="nav-item dropdown nav__menuitem">
                        <a class="nav-link disabled dropdown-toggle" href="#" id="teamDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Team
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="TeamDropdown">
                            <li><a class="dropdown-item" href="${hrefpages}team.html">Stats</a></li>
                            <li><a class="dropdown-item" href="${hrefpages}team.html">Roster</a></li>
                            <li><a class="dropdown-item" href="${hrefpages}team.html">Staff</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="${hrefpages}team.html">Facilities</a></li>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="newsDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            News
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="newsDropdown">
                            <li><a class="dropdown-item" href="${hrefpages}news.html">Standings</a></li>
                            <li><a class="dropdown-item" href="${hrefpages}news.html">Previous Games</a></li>
                            <li><a class="dropdown-item" href="${hrefpages}news.html">Press Releases</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="${hrefpages}news.html">Other News</a></li>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link disabled dropdown-toggle" href="#" id="storeDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Store
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="storeDropdown">
                            <li><a class="dropdown-item" href="${hrefpages}store.html">Jerseys</a></li>
                            <li><a class="dropdown-item" href="${hrefpages}store.html">Clothing</a></li>
                            <li><a class="dropdown-item" href="${hrefpages}store.html">Miscellaneous</a></li>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link disabled dropdown-toggle" href="#" id="mediaDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            Media
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="mediaDropdown">
                            <li><a class="dropdown-item" href="${hrefpages}media.html">Media Contact</a></li>
                            <li><a class="dropdown-item" href="${hrefpages}media.html">Media Resources</a></li>
                            <li><a class="dropdown-item" href="${hrefpages}media.html">Mailing List</a></li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="${hrefpages}contact.html">Contact</a>
                    </li>

                </ul>
            </div>
        </div>
    </nav>`

    document.getElementById("topheader").innerHTML = topheader;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////// Elements for Footer ////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export let createFooterElement = () => {
    let footer = document.createElement("footer");
    footer.classList.add("footer");

    footer.innerHTML = 
    `<div class="footer__lines">
        <hr class="footer__lines-1">
        <hr class="footer__lines-2">
        <hr class="footer__lines-3">
    </div>

    <div class="container-fluid">
        <div class="footer__column-list row align-items-center">

            <div class="footercolumn__logo col-12 col-sm-4 col-md-2 d-flex justify-content-center align-items-center">
                <img src="${hrefimg}washington_spirit_crest.png" alt="Team logo">
            </div>   
            
            <div class="col-12 col-sm-8 col-md-10 container-fluid">
                <div class="row">

                    <div class="footer__column col-2">
                        <h5 class="footer__text">BUY</h5>
                        <ul class="footer__list">
                            <li>
                                <a href="${hrefpages}tickets.html">TICKETS</a>
                            </li>
                            <li>
                                <a href="${hrefpages}store.html" class="disabled">JERSEYS</a>
                            </li>
                            <li>
                                <a href="${hrefpages}store.html" class="disabled">CLOTHES</a>
                            </li>
                            <li>
                                <a href="${hrefpages}store.html" class="disabled">OTHER ITEMS</a>
                            </li> 
                        </ul>
                    </div>
                    <div class="footer__column col-2">
                        <h5 class="footer__text">TEAM</h5>
                        <ul class="footer__list">
                            <li>
                                <a href="${hrefpages}team.html" class="disabled">STATS</a>
                            </li>
                            <li>
                                <a href="${hrefpages}team.html" class="disabled">ROSTER</a>
                            </li>
                            <li>
                                <a href="${hrefpages}team.html" class="disabled">STAFF</a>
                            </li>
                            <li>
                                <a href="${hrefpages}team.html" class="disabled">FACILITIES</a>
                            </li>
                        </ul>
                    </div>
                    <div class="footer__column col-2">
                        <h5 class="footer__text">NEWS</h5>
                        <ul class="footer__list">
                            <li>
                                <a href="${hrefpages}news.html">STANDINGS</a>
                            </li>
                            <li>
                                <a href="${hrefpages}news.html">PREVIOUS GAMES</a>
                            </li>
                            <li>
                                <a href="${hrefpages}news.html">PRESS RELEASES</a>
                            </li>
                            <li>
                                <a href="${hrefpages}news.html">OTHER NEWS</a>
                            </li>
                        </ul>
                    </div>
                    <div class="footer__column col-2">
                        <h5 class="footer__text">MEDIA</h5>
                        <ul class="footer__list">
                            <li>
                                <a href="${hrefpages}media.html" class="disabled">MEDIA CONTACTS</a>
                            </li>
                            <li>
                                <a href="${hrefpages}media.html" class="disabled">MEDIA RESOURCES</a>
                            </li>
                            <li>
                                <a href="${hrefpages}media.html" class="disabled">MAILING LIST</a>
                            </li>
                        </ul>
                    </div>
                    <div class="footer__column col-2">
                        <h5 class="footer__text">CONTACT</h5>
                        <ul class="footer__list">
                            <li>
                                <a href="${hrefpages}contact.html">JOBS</a>
                            </li>
                            <li>
                                <p>email@teamemail.com</p>
                            </li>
                            <li>
                                <p>Team address, number <br>
                                City, State, Postal Code</p>
                            </li>
                        </ul>
                    </div>
                    <div class="footer__column col-2">
                        <h5 class="footer__text">SOCIAL MEDIA</h5>
                        <ul class="socialmedia row-wrap">
                            <li>
                                <a href="https://www.instagram.com/"><img src="${hrefimg}instagram-icon.svg" alt="Instagram logo" width="30"></a>
                            </li>
                            <li>
                                <a href="https://twitter.com/home"><img src="${hrefimg}twitter-icon.svg" alt="Twitter logo" width="30"></a>
                            </li>
                            <li>
                                <a href="https://tiktok.com/"><img src="${hrefimg}tiktok-icon.svg" alt="TikTok logo" width="30"></a>
                            </li>
                            <li>
                                <a href="https://youtube.com/"><img src="${hrefimg}youtube-icon.svg" alt="TikTok logo" width="30"></a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/"><img src="${hrefimg}facebook-icon.svg" alt="Facebook logo" width="30"></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="copyright footer__text">
                <p>Copyright © 2021 Washington Spirit LLC All Rights Reserved Privacy Policy</p>
            </div>
        </div>
    </div>`

    document.getElementsByTagName("body")[0].appendChild(footer);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////// Elements for Login /////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export let createAccountElement = (username, firstname, lastname) => {
    let accountElement = 
    `<div id="account-button">
    <p>${username}</p>
    <div id="account-options">
        <div class="account-header">
            <p>${firstname} ${lastname}</p>
            <p>Rise up, DC!</p>
        </div>
        <div class="account-menu">
            <ul>
                <li>
                    <a>My account</a></li>
                <li>
                    <a href="${hrefpages}cart.html">My <span>tickets</span></a>
                </li>
                <li>
                    <a>My <span>cart</span></a>
                </li>
                <li>
                    <a>Help</a>
                </li>
                <li id="logout">
                    <a>Sign Out</a>
                </li>
            </ul>
        </div>
    </div>
    </div>`;

    return accountElement;
}

export let createLoginElement = () => {

    let loginElement = 
    `<div class="header__searchitem search__login d-flex justify-content-end">
        <a href="${hrefpages}login.html">Log in</a>
    </div>
    <div class="vertical-line">|</div>
    <div class="header__searchitem search__signin">
        <a href="${hrefpages}signin.html">Sign in</a>
    </div>`;

    return loginElement;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////// Elements for Tickets ///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let addToCar = async (gameId, type, amount) => {
    
    let userId = localStorage.getItem("userId");
    try {
        let userCartData = new UserTicketsCart();
        await userCartData.loadUserOrders();
        userCartData.addOrder(gameId, type, amount);
    } catch(error) {
        // Should redirect to an error page
    }
}

let createTeamInTicket_Element = ( {name, logo} ) => 
    `<div class="team d-flex flex-column justify-content-center align-items-center">
        <img src="${hrefimg}Teams/${logo}" alt="${name} Logo" class="team__logo"></img>
        <p class="team__name">${name}</p>
    </div>`;

let createTicket_Element = ( 
    {
        id, 
        date, 
        location, 
        homeTeam, 
        awayTeam,
    } ) => {

    let homeTeam_Element = createTeamInTicket_Element(homeTeam);
    let awayTeam_Element = createTeamInTicket_Element(awayTeam);
    let buyTicket = homeTeam.name == "Washington Spirit" ? "" : "disabled" 
    let ticket = document.createElement("div");
    ticket.classList.add("matches__match", "card");

    ticket.innerHTML = 
    `<div class="match__info card-header">
        <p>${date}
            <br>21:00 ET
            <br>${location}
        </p>
    </div>
    <div class="match__teams card-body">
        ${homeTeam_Element}
        <p class="vs">vs</p>
        ${awayTeam_Element}
    </div>
    <div class="match__tickets d-flex justify-content-center align-items-end">
        <button type="button" class="btn btn-danger ticket id${id}" ${buyTicket}>
            Buy tickets
        </button>
    </div>`
    return ticket;
}

let createBuyTicket_Element = (
    {
        id: gameId, 
        date, 
        homeTeam, 
        awayTeam
    }) => {
    let homeTeam_Element = createTeamInTicket_Element(homeTeam);
    let awayTeam_Element = createTeamInTicket_Element(awayTeam);

    let div = document.createElement("div");
    div.id = "add-items";
    div.classList.add("d-flex", "flex-column", "justify-content-center" , "align-items-center");

    let buyPopup = 
    `<form id="add-items__container" class="container-fluid">

        <div class="row mb-3">
            <div class="center-text">
                <p>Tickets for match: </p>
                <div class="match__teams card-body">
                    ${homeTeam_Element}
                    <p class="vs">vs</p>
                    ${awayTeam_Element}
                </div>
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="input-group mb-3">
                <label class="input-group-text col-5" for="inputs-type-seats">Seats</label>
                <select class="form-select col-5 col-sm-7" aria-label="Seats to buy">
                    <option selected value="A1">A1 - Behind the goal (North)</option>
                    <option value="A2">A2 - Behind the goal (South)</option>
                    <option value="B1">B1 - Lateral (East)</option>
                    <option value="B2">B2 - Lateral (West)</option>
                </select>
            </div>                            
        </div>

        <div class="row mb-3 justify-content-center">
            <button type="button" class="button-count minus d-flex align-items-center justify-content-center col-1">
                -
            </button>
            <input id="number-input" type="number" min="0" max="100" value="1" class="col-4">
            <button type="button" class="button-count plus d-flex align-items-center justify-content-center outline-white col-1">
                +
            </button>
        </div>
    
        <div class="row justify-content-evenly">
            <button type="submit" class="btn add btn-success col-10 col-sm-8 col-md-6">Add to car</button>
            <button type="button" id="cancel-buy" class="btn cancel outline-white col-10 col-sm-3">Cancel</button>
        </div>
    </form>`

    div.innerHTML = buyPopup;
    document.getElementsByClassName("content")[0].appendChild(div);
    let userId = localStorage.getItem("userId");

    let counts = document.getElementsByClassName("button-count");
    for (let index = 0;  index < counts.length; index++) {
        const button = counts[index];
        button.addEventListener("click", (event) => {
            event.preventDefault();
            let amount = document.getElementById("number-input");
            let prev = parseInt(amount.value);
            amount.value = button.classList.contains("plus") ? 
                prev+1 : prev-1 >= 0 ? prev-1 : 0;

            amount.value > 0 && userId ? 
                document.querySelectorAll("button.btn.add")[0].removeAttribute("disabled")
                : document.querySelectorAll("button.btn.add")[0].setAttribute("disabled", "");
        });
    }

    document.getElementById("add-items__container").addEventListener("submit", (event) => {
        event.preventDefault();
            addToCar(
                gameId,
                document.querySelectorAll(".form-select")[0].value,
                document.getElementById("number-input").value
            )

            setTimeout(() => {
            document.querySelectorAll("button.btn.add")[0].blur();
        }, 300); 
    });

    document.getElementById("cancel-buy").addEventListener("click", (event) => {
        event.preventDefault();
        document.getElementById("add-items").remove();
    });

    if(!userId) {
        document.querySelectorAll("button.btn.add")[0].setAttribute("disabled", "");
        setTimeout(() => {
            Toastify({
                text: "First, you need to login. Click here to do it",
                duration: -1,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                className: "user-created",
                onClick: function () { window.location.replace(`${hrefpages}login.html`) }
            }).showToast()
         }, 500);
    }
}

export let createTicketListElement = (games) => {

    let ticketList =
    `<button class="nextmatches-control control-prev" type="button">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <div id="nextmatches-carousel-inner" class="d-flex flex-nowrap">
    </div>
    <button class="nextmatches-control control-next" type="button">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>`;

    let nextMatches = document.getElementById("nextmatches-carousel");
    if (nextMatches)
    {
        nextMatches.innerHTML = ticketList;
        let innerElement = document.getElementById("nextmatches-carousel-inner");
        games?.forEach ( game => {
            innerElement.appendChild(createTicket_Element(game));
            // for some reason, if I do it in the previous forEach it doesn't work 
            // NOW I KNOW and I will put it back in the loop
            // games?.forEach ( game => {})
            innerElement.querySelectorAll(".btn.ticket.id"+game.id+":not([disabled])")[0]
            ?.addEventListener("click", (event) => {
                event.preventDefault(); 
                createBuyTicket_Element(game);
            });
        })   

        innerElement.firstElementChild.classList.add("first-ticket");

        let ticketsControls = document.getElementsByClassName("nextmatches-control")
        for (let index = 0; index < ticketsControls.length; index++) {
            const element = ticketsControls[index];
            element.addEventListener("click", () => {
                //https://yogeshchauhan.com/how-to-create-a-horizontal-scroll-on-button-click-using-javascript/
                let tickets = document.getElementById("nextmatches-carousel-inner");
                tickets.scrollBy(
                    {
                        left: element.classList.contains("control-prev") ? -150 : 150,
                        top: 0,
                        behavior: 'smooth'
                    }
                )  
            })
        }    
    }
}

