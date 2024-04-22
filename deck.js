import Card from './card.js';


export default class Deck {
    constructor() {
        
        this.cards = [];
        this.createDeck(); // Crea una nova baralla de cartes
        this.shuffle(); // Barreja les cartes
    }

    createDeck() {
        const suits = ['bastos', 'copas', 'espadas', 'oros']; // El dibuix de les cartes
        const values = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]; // Els valors de les cartes
        
        // console.log(suits);

        for (let suit of suits) {
            for (let value of values) {
                this.cards.push(new Card(suit, value)); // Afegeix una nova carta a la baralla
                // console.log(suits, values)
            }
        }
    }

    pop() {
        return this.cards.pop(); // Treu la carta de la baralla
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]; // Barreja les cartes
        }
    }

    push(card) {
        this.cards.push(card); // Afegeix una carta a la baralla
        // console.log(card)
    }
}