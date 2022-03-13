
export let createTopHeaderElement = () => {
    let hrefpages = window.location.href.includes('pages') ? '../pages/' : './pages/';
    let hrefimg = window.location.href.includes('pages') ? '../imgs/' : './imgs/';
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
                    <button class="btn btn-outline-success outline-white btn-red" type="submit" title="Search"><i
                            class="fa fa-search"></i></button>
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
                        <a class="nav-link" aria-current="page" href="../index.html">Home</a>
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
                    <a>My <span>tickets</span></a>
                </li>
                <li>
                    <a>My <span>cart</span></a>
                </li>
                <li>
                    <a>Help</a>
                </li>
                <li>
                    <a id="signout">Sign Out</a>
                </li>
            </ul>
        </div>
    </div>
    </div>`;

    return accountElement;
}

export let createLoginElement = () => {
    let href = window.location.href.includes('pages') ? '../pages/' : './pages/';

    let loginElement = 
    `<div class="header__searchitem search__login d-flex justify-content-end">
        <a href="${href}login.html">Log in</a>
    </div>
    <div class="vertical-line">|</div>
    <div class="header__searchitem search__signin">
        <a href="${href}signin.html">Sign in</a>
    </div>`;

    return loginElement;
}

export let createTicketListElement = () => {
    let hrefpages = window.location.href.includes('pages') ? '../pages/' : './pages/';
    let hrefimg = window.location.href.includes('pages') ? '../imgs/' : './imgs/';
    let ticketList =
    `
    <button class="nextmatches-control control-prev" type="button">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <div id="nextmatches-carousel-inner" class="d-flex flex-nowrap">
        <div class="matches__match card">
            <div class="match__info card-header">
                <p>October 30th, 2021
                    <br>21:00 ET
                    <br>Audi Field, Washington DC
                </p>
            </div>
            <div class="match__teams card-body">
                <div class="team d-flex flex-column justify-content-center align-items-center">
                    <img src="${hrefimg}Teams/WASpirit-Logo.png" alt="Washington Spirit Logo" class="team__logo"></img>
                    <p class="team__name">Washington Spirit</p>
                </div>
                <p class="vs">vs</p>
                <div class="team d-flex flex-column justify-content-center align-items-center">
                    <img src="${hrefimg}Teams/NCCourage-Logo.png" alt="North Carolina Courage Logo" class="team__logo"></img>
                    <p class="team__name">North Carolina Courage</p>
                </div>
            </div>
            <div class="match__tickets d-flex justify-content-center align-items-end">
                <button type="button" class="btn btn-danger ticket" disabled>
                    Buy tickets
                </button>
            </div>
        </div>
        <div class="matches__match card">
            <div class="match__info card-header">
                <p>October 30th, 2021
                    <br>21:00 ET
                    <br>Stadium, where
                </p>
            </div>
            <div class="match__teams card-body">
                <div class="team d-flex flex-column justify-content-center align-items-center">
                    <img src="${hrefimg}Teams/HOUSDash-Logo.png" alt="Houston Dash Logo" class="team__logo"></img>
                    <p class="team__name">Houston Dash</p>
                </div>
                <p class="vs">vs</p>
                <div class="team d-flex flex-column justify-content-center align-items-center">
                    <img src="${hrefimg}Teams/WASpirit-Logo.png" alt="Washington Spirit Logo" class="team__logo"></img>
                    <p class="team__name">Washington Spirit</p>
                </div>
            </div>
            <div class="match__tickets d-flex justify-content-center align-items-end">
                <button type="button" class="btn btn-danger ticket" disabled>
                    Buy tickets
                </button>
            </div>
        </div>
        <div class="matches__match card">
            <div class="match__info card-header">
                <p>October 30th, 2021
                    <br>21:00 ET
                    <br>Stadium, where
                </p>
            </div>
            <div class="match__teams card-body">
                <div class="team d-flex flex-column justify-content-center align-items-center">
                    <img src="${hrefimg}Teams/PORThorns-Logo.png" alt="Portland Thorns Logo" class="team__logo"></img>
                    <p class="team__name">Portland Thorns</p>
                </div>
                <p class="vs">vs</p>
                <div class="team d-flex flex-column justify-content-center align-items-center">
                    <img src="${hrefimg}Teams/WASpirit-Logo.png" alt="Washington Spirit Logo" class="team__logo"></img>
                    <p class="team__name">Washington Spirit</p>
                </div>
            </div>
            <div class="match__tickets d-flex justify-content-center align-items-end">
                <button type="button" class="btn btn-danger ticket" disabled>
                    Buy tickets
                </button>
            </div>
        </div>
        <div class="matches__match card">
            <div class="match__info card-header">
                <p>October 30th, 2021
                    <br>21:00 ET
                    <br>Stadium, where
                </p>
            </div>
            <div class="match__teams card-body">
                <div class="team d-flex flex-column justify-content-center align-items-center">
                    <img src="${hrefimg}Teams/CHIRedStars-Logo.png" alt="Chicago Red Stars Logo" class="team__logo"></img>
                    <p class="team__name">Chicago Red Stars</p>
                </div>
                <p class="vs">vs</p>
                <div class="team d-flex flex-column justify-content-center align-items-center">
                    <img src="${hrefimg}Teams/WASpirit-Logo.png" alt="Washington Spirit Logo" class="team__logo"></img>
                    <p class="team__name">Washington Spirit</p>
                </div>
            </div>
            <div class="match__tickets d-flex justify-content-center align-items-end">
                <button type="button" class="btn btn-danger ticket" disabled>
                    Buy tickets
                </button>
            </div>
        </div>
        <div class="matches__match card">
            <div class="match__info card-header">
                <p>October 30th, 2021
                    <br>21:00 ET
                    <br>Audi Field, Washington DC
                </p>
            </div>
            <div class="match__teams card-body">
                <div class="team d-flex flex-column justify-content-center align-items-center">
                    <img src="${hrefimg}Teams/WASpirit-Logo.png" alt="Washington Spirit Logo" class="team__logo"></img>
                    <p class="team__name">Washington Spirit</p>
                </div>
                <p class="vs">vs</p>
                <div class="team d-flex flex-column justify-content-center align-items-center">
                    <img src="${hrefimg}Teams/ACFC-Logo.png" alt="Angel City FC Logo" class="team__logo"></img>
                    <p class="team__name">Angel City FC</p>
                </div>
            </div>
            <div class="match__tickets d-flex justify-content-center align-items-end">
                <button type="button" class="btn btn-danger ticket" disabled>
                    Buy tickets
                </button>
            </div>
        </div>
        <div class="matches__match card">
            <div class="match__info card-header">
                <p>October 30th, 2021
                    <br>21:00 ET
                    <br>Audi Field, Washington DC
                </p>
            </div>
            <div class="match__teams card-body">
                <div class="team d-flex flex-column justify-content-center align-items-center">
                    <img src="${hrefimg}Teams/WASpirit-Logo.png" alt="Washington Spirit Logo" class="team__logo"></img>
                    <p class="team__name">Washington Spirit</p>
                </div>
                <p class="vs">vs</p>
                <div class="team d-flex flex-column justify-content-center align-items-center">
                    <img src="${hrefimg}Teams/LOURacing-Logo.png" alt="Racing Louisville Logo" class="team__logo"></img>
                    <p class="team__name">Racing Louisville</p>
                </div>
            </div>
            <div class="match__tickets d-flex justify-content-center align-items-end">
                <button type="button" class="btn btn-danger ticket" disabled>
                    Buy tickets
                </button>
            </div>
        </div>
        <div class="matches__match card">
            <div class="match__info card-header">
                <p>October 30th, 2021
                    <br>21:00 ET
                    <br>Stadium, where
                </p>
            </div>
            <div class="match__teams card-body">
                <div class="team d-flex flex-column justify-content-center align-items-center">
                    <img src="${hrefimg}Teams/NCCourage-Logo.png" alt="North Carolina Courage Logo" class="team__logo"></img>
                    <p class="team__name">North Carolina Courage</p>
                </div>
                <p class="vs">vs</p>
                <div class="team d-flex flex-column justify-content-center align-items-center">
                    <img src="${hrefimg}Teams/WASpirit-Logo.png" alt="Washington Spirit Logo" class="team__logo"></img>
                    <p class="team__name">Washington Spirit</p>
                </div>
            </div>
            <div class="match__tickets d-flex justify-content-center align-items-end">
                <button type="button" class="btn btn-danger ticket" disabled>
                    Buy tickets
                </button>
            </div>
        </div>
        <div class="matches__match card">
            <div class="match__info card-header">
                <p>October 30th, 2021
                    <br>21:00 ET
                    <br>Lynn's Family Stadium, Louisville
                </p>
            </div>
            <div class="match__teams card-body">
                <div class="team d-flex flex-column justify-content-center align-items-center">
                    <img src="${hrefimg}Teams/LOURacing-Logo.png" alt="Racing Louisville Logo" class="team__logo"></img>
                    <p class="team__name">Racing Louisville</p>
                </div>
                <p class="vs">vs</p>
                <div class="team d-flex flex-column justify-content-center align-items-center">
                    <img src="${hrefimg}Teams/WASpirit-Logo.png" alt="Washington Spirit Logo" class="team__logo"></img>
                    <p class="team__name">Washington Spirit</p>
                </div>
            </div>
            <div class="match__tickets d-flex justify-content-center align-items-end">
                <button type="button" class="btn btn-danger ticket" disabled>
                    Buy tickets
                </button>
            </div>
        </div>
    </div>
    <button class="nextmatches-control control-next" type="button">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>`

    document.getElementById("nextmatches-carousel").innerHTML = ticketList;
}