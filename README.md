# webdev-javascript
Webpage for the Washington Spirit

## Functionality

### General Components
These are all available in components.js

<ol>
  <li>NavBar plus the part on top with the logo, league name, account component and search bar: createTopHeaderElement()</li>
  <li>Footer: createFooterElement()</li>
</ol>

### Signin

<ol>
  <li>Check that the required fields are filled by the user, each time the user "leaves" a required field.</li>
    <ol>
      <li>If the field has the information needed, it doesn't show anything else</li>
      <li>If the field doesn't meet the required criteria, it shows an error message under it</li>
      <li>On submit, these validations are done again</li>
    </ol>
  <li>Save the user in the database if all the information is filled correctly</li>
  <li>After saving it:</li>
    <ol>
      <li>Show a message notifying the user was created</li>
      <li>Redirect them to the home page</li>
    </ol>
</ol>

### Login

<ol>
  <li>Filling the fields if the user requested to remember them</li>
  <li>Checking if the user exists with the user and password used</li>
    <ol>
      <li>If the information is correct, show a toast welcoming them and redirect the user to the home page</li>
      <li>If it's not correct, show an error message between the username and password</li>
    </ol>
</ol>

### Account component

It shows a section that reads "Log in | Sign in" or the username, depending on the status of the session for the user. 
This is done with the function preloadLogin(), called in main.js, which at the ends uses the functions createAccountElement() or createLoginElement () in components.js.

### Tickets Component

The tickets are "built" mostly with functions in components.js. In main.js, the function completeGamesComponent() is the one that starts the "building" process. 
It could have been an object probably, but there's no time for that now.

The building process is somewhat like this:
<ol>
  <li>First we create the container for the list: createTicketListElement()</li>
  <li>Inside of that container, we add each game in the database (a json called games.json): createTicket_Element()</li>
  <li>Inside each ticket, we add both teams' info: createTeamInTicket_Element()</li>
  <li>Once we have all that, we add the event to the buy buttons to allow the user to select amount of tickets for a game: createBuyTicket_Element()</li>
</ol>

### Cart Feature

For this part I had a better understanding of objects and I tried to use that. There are two parts to the (tickets) cart feature:

#### Pop-up shown when clicking "Buy Tickets"

The pop-up is shown when the "Buy Ticket" is clicked, which adds the pop-up to the DOM with the function createBuyTicket_Element(). Inside this pop-up, there are 
several functionalities:

<ol>
  <li>A field to increase or decrease the amount of tickets, using two buttons ( + and - )</li>
  <li>The button "Add Tickets"</li>
    <ol>
      <li>It is only enabled if the user already signed in AND if the amount of tickets is greater than zero</li>
      <li>When clicked, it will save that order in the "database" and show a toast with the summary of the tickets bought</li>
    </ol>
  <li>The cancel button just closes the pop-up. One improvement that could be done is to have clicks outside the pop-up close this element... or not</li>
</ol>

The addition of games to the cart is done by using the function addToCar() when clicking the "Add Tickets" button in the pop-up. This function then uses functions from the UserTicketsCart class,
available in UserTicketsCart.js.

        let userCartData = new UserTicketsCart();
        await userCartData.loadUserOrders();
        userCartData.addOrder(gameId, type, amount);

The addOrder() function does everything else, even using the OrderForGame and Ticket classes.

An example of the structure of an order is this:

     {
      "id": "2",
      "userId": "1",
      "gameId": 1,
      "paid": false,
      "tickets": [
       {
        "type": "A1",
        "amount": 213
       },
       {
        "type": "B1",
        "amount": 12
       },
       {
        "type": "A2",
        "amount": 3
       },
       {
        "type": "B2",
        "amount": 2
       }
      ]
     }
     
Therefore, what we have is an array of orders (the cart). The orders are associated with only one game, and for each order you have an array of tickets, with each 
ticket object having a type (where in the stadium the seats are located) and how many seats for that type they user has added.

#### Page to check the tickets added to the cart

This one is really simple because there wasn't too much time, and it's done in the main.js file using UserTicketsCart.showCart()

## Sources

### Tools to improve the project
MockApi:
[mockAPI](https://mockapi.io/projects/621c38ff768a4e1020a4acbf)
Toastify:
[Toastify JS](https://apvarun.github.io/toastify-js/)
Bootstrap:
[Introduction - Bootstrap v5.0 (getbootstrap.com)](https://getbootstrap.com/docs/5.0/getting-started/introduction/)

### Questions and doubts I had
Nice things to remember but I just keep forgetting:
<https://stackoverflow.com/questions/30037808/multiline-editing-in-visual-studio-code>
[JavaScript String includes() Method (w3schools.com)](https://www.w3schools.com/jsref/jsref_includes.asp)
[Document.getElementsByClassName() - Web APIs | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName)

Working with dates:
[How to get the month name from a JavaScript date (flaviocopes.com)](https://flaviocopes.com/how-to-get-month-from-javascript-date/)
[javascript - What is the difference between toLocaleString, toLocaleDateString, and toLocaleTimeString? - Stack Overflow](https://stackoverflow.com/questions/61870462/what-is-the-difference-between-tolocalestring-tolocaledatestring-and-tolocalet)
[How to get the month name from a JavaScript date (flaviocopes.com)](https://flaviocopes.com/how-to-get-month-from-javascript-date/)

Making things appear dynamically in the HTML:
[html - using javascript to change display - Stack Overflow](https://stackoverflow.com/questions/24023408/using-javascript-to-change-display)

Inspo for the "account component":
[Account Dropdown UI (codepen.io)](https://codepen.io/ildiesign/pen/GmwNJj)
[Hide Div on Clicking outside (codepen.io)](https://codepen.io/marizawi/pen/YgaaMp)
When the user was not found: [reactjs - JavaScript - How to handle 404 error in fetch? - Stack Overflow](https://stackoverflow.com/questions/59008723/javascript-how-to-handle-404-error-in-fetch)
Because of an error I kept getting when changing the "account component" back to its "Login | Signin" state:
[Adding Event Listeners to the future DOM elements using Event Bubbling - DEV Community](https://dev.to/akhil_001/adding-event-listeners-to-the-future-dom-elements-using-event-bubbling-3cp1)
[EventTarget.removeEventListener() - Web APIs | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)

Overview of destructuring:
[La desestructuración - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
[Understanding Destructuring, Rest Parameters, and Spread Syntax in JavaScript | DigitalOcean](https://www.digitalocean.com/community/tutorials/understanding-destructuring-rest-parameters-and-spread-syntax-in-javascript)

To divide javascript files but being able to use them somewhere else:
[How to Include a JavaScript File in another JavaScript File (tutorialrepublic.com)](https://www.tutorialrepublic.com/faq/how-to-include-a-javascript-file-in-another-javascript-file.php)
[import - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/import)
[[Solved] Uncaught SyntaxError: cannot use import statement outside a module - ItsMyCode](https://itsmycode.com/solved-uncaught-syntaxerror-cannot-use-import-statement-outside-a-module/)

For the tickets "component":
[How To Hide Scrollbars With CSS (w3schools.com)](https://www.w3schools.com/howto/howto_css_hide_scrollbars.asp)
[How to create a Horizontal Scroll on button click using JavaScript? (yogeshchauhan.com)](https://yogeshchauhan.com/how-to-create-a-horizontal-scroll-on-button-click-using-javascript/)
[javascript - scrollLeft animation - clean vanilla JS - Stack Overflow](https://stackoverflow.com/questions/61941291/scrollleft-animation-clean-vanilla-js)

Because I kept getting an error related to favicon:
[How to Fix "404 Favicon Not Found" Error - TutsAndTips.com](https://www.tutsandtips.com/web-design/how-to-fix-404-favicon-not-found-error/)
[Favicon Generator - Image to Favicon - favicon.io](https://favicon.io/favicon-converter/)

And another annoying error related to extensions, apparently:
[Unchecked runtime.lastError: The message port closed before a response was received. - Google Chrome Community](https://support.google.com/chrome/thread/2047906/unchecked-runtime-lasterror-the-message-port-closed-before-a-response-was-received?hl=en)

Access to fetch at 'https://621c38ff768a4e1020a4acbe.mockapi.io/spirit-api/v1/games' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
[Cross-Origin Resource Sharing (CORS) (web.dev)](https://web.dev/cross-origin-resource-sharing/)
[javascript - Correct Try...Catch Syntax Using Async/Await - Stack Overflow](https://stackoverflow.com/questions/44663864/correct-try-catch-syntax-using-async-await)

Popup modal to buy tickets
[css - How to make popup look at the centre of the screen? - Stack Overflow](https://stackoverflow.com/questions/19467693/how-to-make-popup-look-at-the-centre-of-the-screen)
[How To Hide Arrows From Number Input (w3schools.com)](https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp)
[javascript - How to use querySelectorAll only for elements that have a specific attribute set? - Stack Overflow](https://stackoverflow.com/questions/10777684/how-to-use-queryselectorall-only-for-elements-that-have-a-specific-attribute-set)
[How to convert a string into integer in JavaScript? (tutorialspoint.com)](https://www.tutorialspoint.com/how-to-convert-a-string-into-integer-in-javascript#:~:text=To%20convert%20a%20string%20to,function%20won%27t%20accept%20spaces.)
[Element.remove() - Web APIs | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove)
[onsubmit Event (w3schools.com)](https://www.w3schools.com/jsref/event_onsubmit.asp)
[javascript - Stop form refreshing page on submit - Stack Overflow](https://stackoverflow.com/questions/19454310/stop-form-refreshing-page-on-submit)

Events in the popup are breaking my events in the whole page:
Let's read some material: [Handling Events :: Eloquent JavaScript](https://eloquentjavascript.net/15_event.html)
Still don't know what is happening: [javascript - Losing an event triggering after adding new HTML item - Stack Overflow](https://stackoverflow.com/questions/52742853/losing-an-event-triggering-after-adding-new-html-item)
Whyyyy?: [javascript - Manipulating innerHTML removes the event handler of a child element? - Stack Overflow](https://stackoverflow.com/questions/5113105/manipulating-innerhtml-removes-the-event-handler-of-a-child-element)
Booooooo: [DOM Manipulation and the Dangers of 'innerHTML' | by Drew Beckmen | Better Programming](https://betterprogramming.pub/dom-manipulation-the-dangers-of-innerhtml-602f4119d905)
Finally, the solution: [javascript - Converting HTML string into DOM elements? - Stack Overflow](https://stackoverflow.com/questions/3103962/converting-html-string-into-dom-elements)

Getting creative with objects doing the cart
[javascript - Check if an array of objects contains another object - Stack Overflow](https://stackoverflow.com/questions/63336390/check-if-an-array-of-objects-contains-another-object)
[javascript - How to add an object to an array - Stack Overflow](https://stackoverflow.com/questions/6254050/how-to-add-an-object-to-an-array)
[Classes - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes)
[JavaScript pattern for multiple constructors - Stack Overflow](https://stackoverflow.com/questions/3220721/javascript-pattern-for-multiple-constructors#:~:text=You%20can%27t%20have%20multiple,to%20do%20what%20you%20want.)
[ecmascript 6 - Are JavaScript ES6 Classes of any use with asynchronous code bases? - Stack Overflow](https://stackoverflow.com/questions/37556058/are-javascript-es6-classes-of-any-use-with-asynchronous-code-bases)
[javascript - Passing object with predefined props to class constructor es6 - Stack Overflow](https://stackoverflow.com/questions/35675275/passing-object-with-predefined-props-to-class-constructor-es6)
[ecmascript 6 - javascript constructor with optional parameters - Stack Overflow](https://stackoverflow.com/questions/50715033/javascript-constructor-with-optional-parameters)

I honestly didn't understand this (pun not intended): 
-   [Traditional versus Arrow functions in JavaScript Classes | by Suhan 🎃 Wijaya | JavaScript in Plain English](https://javascript.plainenglish.io/traditional-versus-arrow-functions-in-javascript-classes-35f958b1a492)
-   [Of Classes and Arrow Functions (a cautionary tale) -- JavaScript, JavaScript... (wordpress.com)](https://javascriptweblog.wordpress.com/2015/11/02/of-classes-and-arrow-functions-a-cautionary-tale/)
