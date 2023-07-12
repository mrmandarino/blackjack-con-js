const modulo = (() => {
	'use strict'

	let deck = [];
	const tipos = ["C", "D", "H", "S"],
		especiales = ["A", "J", "Q", "K"];
	// let puntosJugador = 0,
	// 	puntosComputadora = 0

	let puntosJugadores = [];

	//Referencias del HTML
	const btnPedir = document.querySelector('#btnPedir'),
		btnDetener = document.querySelector('#btnDetener'),
		btnNuevo = document.querySelector('#btnNuevo');

	const marcadores = document.querySelectorAll('small'),
		divCartasJugadores = document.querySelectorAll('.divCartas');

	const inicializarJuego = (numJugadores = 2) => {
		deck = crearDeck();
		puntosJugadores = [];
		for (let i = 0; i < numJugadores; i++) {
			puntosJugadores.push(0)
		}

		marcadores.forEach(elem => elem.innerText = 0);
		divCartasJugadores.forEach(elem => elem.innerHTML = '');
		btnDetener.disabled = false;
		btnPedir.disabled = false;
	};


	//Esta función crea una nueva baraja y luego la mezcla
	const crearDeck = () => {
		deck = [];
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

		return _.shuffle(deck);;
	};

	const pedirCarta = () => {
		if (deck.length === 0) {
			throw "No hay más cartas en el deck";
		}

		return deck.pop();;
	};

	const valorCarta = (carta) => {
		const valor = carta.substring(0, carta.length - 1);

		return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
	};

	//Turno: 0 = primer jugador y el último será la computadora
	const acumularPuntos = (carta, turno) => {
		puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
		marcadores[turno].innerText = puntosJugadores[turno];

		return puntosJugadores[turno];
	};

	const crearCarta = (carta, turno) => {
		const imagenCarta = document.createElement('img');
		imagenCarta.src = `assets/cartas/${carta}.png`;
		imagenCarta.classList.add('carta');
		divCartasJugadores[turno].append(imagenCarta)
	};

	const determinarGanador = () => {
		const [puntosMinimos, puntosComputadora] = puntosJugadores;
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

	//turno de la computadora
	const turnoComputadora = (puntosMinimos) => {
		let puntosComputadora = 0;
		do {
			const carta = pedirCarta();

			puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
			crearCarta(carta, puntosJugadores.length - 1);

		} while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
		determinarGanador();
	};

	//Eventos
	btnPedir.addEventListener('click', () => {

		const carta = pedirCarta();
		const puntosJugador = acumularPuntos(carta, 0);

		crearCarta(carta, 0);

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

		inicializarJuego();


	});


	return {
		nuevoJuego: inicializarJuego
	};
})();



