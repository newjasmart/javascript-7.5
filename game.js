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
        this.dealOneCardToPlayer();
        const playerPoints = this.calculatePoints(this.playerDeck);
        // const computerPoints = game.calculatePoints(game.computerDeck);
        if (playerPoints > 7.5) {
            Swal.fire({
                icon: "error",
                title: "Has Perdut",
                text: "T\'has Passat del Set i Mig!",
            });
        }
        this.updatePoints();
    }


    // butó Stay
    stay() {
        // Ordinador demana cartes fins a arribar a 6 punts
        while (this.calculatePoints(this.computerDeck) < 6) {
            this.dealOneCardToComputer();
        }

        const dealerPoints = this.calculatePoints(this.computerDeck);
        const playerPoints = this.calculatePoints(this.playerDeck);
        if (dealerPoints > 7.5 && playerPoints <= 7.5) {
            Swal.fire({
                icon: 'success',
                title: 'Has Guanyat',
                text: 'El dealer s\'ha Passat del Set i Mig!',
            })
        } else if (playerPoints > 7.5 && dealerPoints <= 7.5) {
            Swal.fire({
                icon: 'error',
                title: 'Has Perdut',
                text: 'T\'has Passat del Set i Mig!',
            })
        } else if (Math.abs(playerPoints - 7.5) < Math.abs(dealerPoints - 7.5)) {
            Swal.fire({
                icon: 'success',
                title: 'Has Guanyat',
                text: 'Has Guanyat t\'has acostat mes al Set i Mig!',
            })
        } else if (Math.abs(playerPoints - 7.5) > Math.abs(dealerPoints - 7.5)) {
            Swal.fire({
                icon: 'error',
                title: 'Has Perdut',
                text: 'El delaer s\'ha acostat mes al Set i Mig!',
            })
        } else if (playerPoints == 7.5) {
            Swal.fire({
                icon: 'success',
                title: 'Felicitats',
                text: 'Has Guanyat',
            })
        } else if (computerPoints == 7.5) {
            Swal.fire({
                icon: 'error',
                title: 'Has perdut',
                text: 'El dealer ha Guanyat!',
            })
        } else if (computerPoints == playerPoints) {
            Swal.fire({
                icon: 'error',
                title: 'Has perdut',
                text: 'Ha guanyat el Dealer!',
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Has perdut',
                text: 'Ha guanyat el Dealer!',
            })
        }
        game.updatePoints();
    }
}


// Iniciar el joc
const game = new Game(); // Crea una nova instància del joc 

function updatePoints(playerPoints, dealerPoints) {
        const playerPointsElement = document.querySelector(".contcards2 p:last-child");
        const dealerPointsElement = document.querySelector(".contcards p:last-child");

    playerPointsElement.innerHTML = playerPoints;
    dealerPointsElement.innerHTML = dealerPoints;
}

// Demanar carta
document.querySelector("#hit").addEventListener("click", () => {
    game.hit();
});

// Plantar-se
document.querySelector("#stay").addEventListener("click", () => {
    game.stay();
});

// Nova partida
document.getElementById("startGameButton").addEventListener("click", () => {
    game.dealOneCard();
});

const hitButton = document.getElementById("hit");
const stayButton = document.getElementById("stay");
hitButton.disabled = true;
stayButton.disabled = true;


function myfunction() {
    var btn = document.getElementById('repetir');
    btn.remove();
    hitButton.disabled = false;
    stayButton.disabled = false;
}

function funtiondisable() {
    hitButton.disabled = true;
    stayButton.disabled = true;
}


setTimeout(function () {
    // Completar la operació de càrrega aquí
    preloader.style.display = "none";
}, 2000);


setTimeout(function () {
    // Completar la operació de càrrega aquí
    preloader.style.display = "none";
}, 2000);


setTimeout(function () {
    document.body.style.overflow = "hidden";
}, 0);

setTimeout(function () {
    document.body.style.overflow = "auto";
}, 6000);