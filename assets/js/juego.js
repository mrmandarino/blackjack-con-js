let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];
let puntosJugador = 0,
	puntosComputadora = 0

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const marcadores = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

//Esta función crea una nueva baraja y luego la mezcla
const crearDeck = () => {
	for (let i = 2; i <= 10; i++) {
		for (let tipo of tipos) {
			deck.push(i + tipo);
		}
	}
	for (let tipo of tipos) {
		for (let esp of especiales) {
			deck.push(esp + tipo);
		}
	}
	deck = _.shuffle(deck);

	return deck;
};
crearDeck();

const pedirCarta = () => {
	if (deck.length === 0) {
		throw "No hay más cartas en el deck";
	}
	carta = deck.pop();
	return carta;
};

const valorCarta = (carta) => {
	const valor = carta.substring(0, carta.length - 1);

	return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

//turno de la computadora
const turnoComputadora = (puntosMinimos) => {
	do {
		const carta = pedirCarta();
		puntosComputadora = puntosComputadora + valorCarta(carta);
		marcadores[1].innerText = puntosComputadora;

		const imagenCarta = document.createElement('img');
		imagenCarta.src = `assets/cartas/${carta}.png`;
		imagenCarta.classList.add('carta');
		divCartasComputadora.append(imagenCarta)

		if (puntosMinimos > 21) {
			break;
		}
	} while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

	setTimeout(() => {

		if (puntosComputadora === puntosMinimos) {
			alert('Nadie Gana :(')
		} else if (puntosMinimos > 21) {
			alert('Computadora Gana')
		} else if (puntosComputadora > 21) {
			alert('Jugador Gana')
		} else {
			alert(turnoComputadora)
		}

	}, 100);
};

//Eventos
btnPedir.addEventListener('click', () => {

	const carta = pedirCarta();
	puntosJugador = puntosJugador + valorCarta(carta);
	marcadores[0].innerText = puntosJugador;

	const imagenCarta = document.createElement('img');
	imagenCarta.src = `assets/cartas/${carta}.png`;
	imagenCarta.classList.add('carta');
	divCartasJugador.append(imagenCarta)

	if (puntosJugador > 21) {
		btnPedir.disabled = true;
		btnDetener.disabled = true;
		turnoComputadora(puntosJugador);


	} else if (puntosJugador === 21) {
		btnPedir.disabled = true;
		btnDetener.disabled = true;
		turnoComputadora(puntosJugador);
	}

});

btnDetener.addEventListener('click', () => {

	btnPedir.disabled = true;
	btnDetener.disabled = true;
	turnoComputadora(puntosJugador)
});

btnNuevo.addEventListener('click', () => {

	deck = crearDeck();
	puntosJugador = 0;
	puntosComputadora = 0;
	marcadores[0].innerText = 0;
	marcadores[1].innerText = 0;
	divCartasJugador.innerHTML = '';
	divCartasComputadora.innerHTML = '';
	btnDetener.disabled = false;
	btnPedir.disabled = false;

})

