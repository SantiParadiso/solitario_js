class Card {
    constructor(num, palo, numeroStr, numPalo, paloEmoji) {
        this.numero = num;
        this.palo = palo;
        this.numPalo = numPalo;
        this.numeroStr = numeroStr;
        this.paloEmoji = paloEmoji;
        this.isFlipped = false;
    }
}
// 🗡️ 🪵 🪙 🏆

var numerosValidos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var palosValidos = ["espada", "basto", "oro", "copa"];
var palosEmoji = ["🗡️", "🪵", "🪙", "🏆"];
var diezOnceDoce = ["🧑‍🌾", "🐎", "👑"]

var mesa = [
    [],
    [],
    [],
    []
]

var sobrantes = [];

var mano = null;

function construirMazo() {
    let mazo = [];
    let i = 0;
    palosValidos.forEach((palo) => {
        numerosValidos.forEach((num) => {
            mazo.push(new Card(num, palo, num.toString(), i, palosEmoji[i]))
        });
        i++;
    })
    return mazo;
};

function exportarMazo() {
    let mazo = construirMazo();
    let mazoFinal = [];
    while (mazo.length > 0) {
        let rand = Math.floor(Math.random() * mazo.length);
        mazoFinal.push(mazo[rand]);
        mazo.splice(rand, 1);
    }
    return mazoFinal;
}

function repartirCartas() {
    let mazo = exportarMazo();
    mesa[0] = mazo.slice(0, 11)
    mesa[1] = mazo.slice(11, 22)
    mesa[2] = mazo.slice(22, 33)
    mesa[3] = mazo.slice(33, 44)
    sobrantes = mazo.slice(44, 48)
    return;
}

function reemplazarCarta(carta) {
    carta.isFlipped = true;
    if (carta.numero == 12) {
        mesa[carta.numPalo].push(carta);
        return null;
    } else {
        let cartaAux = mesa[carta.numPalo][carta.numero - 1];
        mesa[carta.numPalo].splice((carta.numero - 1), 1, carta);
        return cartaAux;
    }
}

function renderFinish() {
    let i = 0
    mesa.forEach(() => {
        const ROWCONT = document.createElement("div")
        ROWCONT.className = "row-container"
        mesa[i].forEach((ele) => {
            const CARD = document.createElement("div")
            CARD.className = "card"
            if (ele.isFlipped) {
                const SYMBOL = document.createElement("span")
                for (let j = 0; j < ele.numero; j++) {
                    SYMBOL.innerText += ` ${ele.paloEmoji} `
                    if (ele.numero >= 9) {
                        if (ele.numero >= 10) {
                            SYMBOL.innerText += ` ${diezOnceDoce[ele.numero-10]} `
                        }
                        SYMBOL.className = "beeg";
                        break;
                    } else {
                        SYMBOL.className = "symbols";
                    }
                }
                const TEXT = document.createElement("span")
                TEXT.innerText = `${ele.numeroStr}`

                //
                CARD.appendChild(TEXT);
                CARD.appendChild(SYMBOL);
                //
                const TEXT2 = document.createElement("span")
                TEXT2.innerText = `${ele.numeroStr}`
                    //
                CARD.appendChild(TEXT2);
            } else {
                CARD.classList.add("flipped")
            }
            ROWCONT.appendChild(CARD);
        })
        i++;
        document.querySelector("#main").appendChild(ROWCONT);
    })
}

function main() {
    repartirCartas();
    sobrantes.forEach((carta) => {
        mano = carta;
        while (!!mano) {
            mano = reemplazarCarta(mano)
        }
    })
    renderFinish();
}

main(); // ;-;