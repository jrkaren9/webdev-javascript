
let hrefhome = window.location.href.includes('pages') ? '../' : './';

export default class Games {
    constructor(date, location, homeTeam, awayTeam, capacity, availableSeats) {
        this.date = date;
        this.location = location;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.capacity = capacity;
        this.availableSeats = availableSeats;
    }

    /**
    * Method to obtain the games scheduled for the team, from the "database"
    * @see completeGamesComponent uses this method when there's a "carousel" for the next matches
    * @returns gamesData 
    */
    static getGames = async () => {
       let games = await fetch(`${hrefhome}gamesDB.json`);
       let gamesData = await games.json();
   
       return gamesData;
   }
}
