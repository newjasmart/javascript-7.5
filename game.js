import Deck from './deck.js';

class Game {
    constructor() {
        this.playerDeck = [];
        this.computerDeck = [];
        this.deck = new Deck(); // Crea una nova baralla de cartes
        this.cardsDealtToPlayer = 0;
        this.cardsDealtToComputer = 0;
    }

    calculatePoints(deck) {
        let points = 0;
        deck.forEach((card) => {
            points += card.getPointValue(); // Suma els punts de cada carta a la ma
        });
        return points;
    }

    updatePoints() {
        const playerPoints = this.calculatePoints(this.playerDeck);
        const dealerPoints = this.calculatePoints(this.computerDeck);
        updatePoints(playerPoints, dealerPoints); // Actualitza els punts a la pantalla
    }

    // butó New Game
    dealOneCard() {
        const cardToPlayer = this.deck.pop();
        const cardToComputer = this.deck.pop();
        this.playerDeck.push(cardToPlayer);
        this.computerDeck.push(cardToComputer);
        this.updatePoints();

        const dealerCardDiv = document.querySelector(".cards .card:nth-child(1)");
        const dealerCardImage = document.createElement("img");
        dealerCardImage.src = `cards/${cardToComputer.suit.toLowerCase()}_${cardToComputer.value}.jpg`;
        dealerCardDiv.innerHTML = "";
        dealerCardDiv.appendChild(dealerCardImage);

        const playerCardDiv = document.querySelector(".cards2 .card:nth-child(1)");
        const playerCardImage = document.createElement("img");
        playerCardImage.src = `cards/${cardToPlayer.suit.toLowerCase()}_${cardToPlayer.value}.jpg`;
        playerCardDiv.innerHTML = "";
        playerCardDiv.appendChild(playerCardImage);
    }

    // butó Hit

     // Reparte una carta al jugador
    dealOneCardToPlayer() {
        const cardToPlayer = this.deck.pop();
        this.playerDeck.push(cardToPlayer);
        this.updatePoints();
    
    // Mostra la carta repartida al jugador
        const playerCardDiv = document.querySelector(`.cards2 .card:nth-child(${this.cardsDealtToPlayer + 2})`);
        const playerCardImage = document.createElement("img");
        playerCardImage.src = `cards/${cardToPlayer.suit.toLowerCase()}_${cardToPlayer.value}.jpg`;
        playerCardDiv.innerHTML = "";
        playerCardDiv.appendChild(playerCardImage);
        this.cardsDealtToPlayer++;
    }

    // Reparte una carta al computador
    dealOneCardToComputer() {
        
        const cardToComputer = this.deck.pop();
        this.computerDeck.push(cardToComputer);
        this.updatePoints();

    // Mostra la carta repartida al computador
        const dealerCardDiv = document.querySelector(`.cards .card:nth-child(${this.cardsDealtToComputer + 2})`);
        const dealerCardImage = document.createElement("img");
        dealerCardImage.src = `cards/${cardToComputer.suit.toLowerCase()}_${cardToComputer.value}.jpg`;
        dealerCardDiv.innerHTML = "";
        dealerCardDiv.appendChild(dealerCardImage);
        this.cardsDealtToComputer++;
    }

    hit() {
        if (this.calculatePoints(this.playerDeck) > 7.5) {
            Swal.fire({
                icon: "error",
                title:"Has Perdut",
                text:"t'has passat del Set i Mig"
            });
            return;
        }
        this.dealOneCardToPlayer();
        const playerPoints = this.calculatePoints(this.playerDeck);
        if (playerPoints === 7.5) {
            Swal.fire({
                icon: "success",
                title: "Felicitats",
                text: "Has aconseguit Set i Mig!",
            });
            this.updatePoints();
            return;
        }
        this.updatePoints();
    }


    // butó Stay
    stay() {
        // Ordinador demana cartes fins a arribar a 7 punts
        while (this.calculatePoints(this.computerDeck) < 5) {
            this.dealOneCardToComputer();
        }

        const dealerPoints = this.calculatePoints(this.computerDeck);
        const playerPoints = this.calculatePoints(this.playerDeck);
        if (dealerPoints > 7.5 ) {
            Swal.fire({
                icon: 'success',
                title: 'Has Guanyat',
                text: 'El dealer s\'ha Passat del Set i Mig!',
            });
        } else if (dealerPoints === playerPoints) {
            Swal.fire({
                icon: 'error',
                title: 'empat',
                text: 'Ha sortit un empat amb el dealer !',
            })
        } else if (dealerPoints > playerPoints) {
            Swal.fire({
                icon: 'error',
                title: 'Has perdut',
                text: 'El dealer ha guanyat!',
            })
        
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Has guanyat',
                text: 'Has guanyat contra el Dealer!',
            })
        }
        this.updatePoints();
    }
}


const game = new Game(); // Crea una nova instància del joc 

function updatePoints(playerPoints, dealerPoints) {
    const playerPointsElement = document.getElementById("player-points");
    const dealerPointsPointsElement = document.getElementById("dealer-points")
    playerPointsElement.innerHTML = playerPoints;
    dealerPointsPointsElement.innerHTML = dealerPoints;
  }


// Demanar carta
document.getElementById("hit").addEventListener("click", () => {
    game.hit();
});

// Plantar-se
document.getElementById("stay").addEventListener("click", () => {
    game.stay();
});

//document.getElementById("startGameButton").addEventListener("click",()=>{
    //game.dealOneCard
//});

//<script src="https.//cdn.jsdelivr.net/npm/sweetalert2011"></script>