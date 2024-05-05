export default class Card {
    constructor(suit, value) {
        this.suit = suit; // pica, trevol, diamant o cor
        this.value = value; // El valor de la carta (1-7, getPointValue)
    }

    getPointValue() {
        if (this.value > 7) { // Si la carta es 10, 11, 12, val 0.5 punts
            return 0.5;
        }
        return this.value; // Sino retorna el seu valor numèric
    }


    getHTML() {
    return '<img src="./baralla/${this.value}_${this.suit}.jpg" />;';
    }

    toString() {
    return '${this.value}_${this.suit}';
    }
}