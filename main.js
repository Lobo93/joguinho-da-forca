const palavras = [
	'abelha',
	'casa',
	'fogo',
	'bola',
	'lobo',
	'cachorro',
	'cavalo',
	'galinha',
	'manteiga',
	'boneca',
	'nuvem',
	'carimbo',
	'batata',
	'cenoura',
	'mostarda',
	'carro',
	'cidade',
	'governo',
	'luta',
	'paz',
	'árvore'
]

let palavraEscolhida
let letrasRestantes = 0
let tentativas = 6
let chutes = []
const elementoPalavra = document.getElementById('elementoPalavra')
const elementoChutes = document.getElementById('elementoChutes')

// Nova palavra
const botaoNovaPalavra = document.getElementById('botaoNovaPalavra')
botaoNovaPalavra.addEventListener('click', sortearPalavra)

function sortearPalavra() {
	palavraEscolhida = palavras[Math.floor(Math.random() * palavras.length)]
	letrasRestantes = palavraEscolhida.length
	elementoPalavra.innerHTML = ''
	elementoChutes.innerText = 'Chutes: '
	chutes = []
	tentativas = 6
	document.querySelectorAll('.bonequinho').forEach(bonequinho => {
		bonequinho.classList.remove('visivel')
	})
	Array.from(palavraEscolhida).forEach(letra => {
		const elementoLetra = document.createElement('p')
		elementoLetra.classList.add('letra')
		elementoPalavra.appendChild(elementoLetra)
	})
}
sortearPalavra()

// Função de chute
function chute(letra) {
	if (chutes.includes(letra) || tentativas <= 0 || letrasRestantes <= 0) return
	chutes.push(letra)
	elementoChutes.textContent += ` ${letra}`
	if (palavraEscolhida.normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(letra)) {
		Array.from(palavraEscolhida).forEach((letraPalavra, index) => {
			if (letraPalavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === letra) {
				const letras = document.querySelectorAll('.letra')
				letras[index].textContent = palavraEscolhida.charAt(index)
				letrasRestantes--
			}
		})
		if (letrasRestantes <= 0) {
			ganhou()
		}
	}
	else {
		document.querySelectorAll('.bonequinho')[tentativas - 1].classList.add('visivel')
		tentativas--
		if (tentativas <= 0) {
			perdeu()
		}
	}
}

// Teclado virtual
const teclado = document.getElementById('teclado')
teclado.addEventListener('click', ({target}) => {
	if (target.dataset.key) {
		chute(target.dataset.key)
	}
})

// Teclado físico
window.addEventListener('keydown', ({key, repeat}) => {
	if (repeat) return
	if (document.querySelector(`button[data-key="${key}"]`)) {
		chute(key)
	}
})

// Funcção de mensagem
const mensagem = document.getElementById('mensagem')
const mensagemTexto = document.getElementById('mensagemTexto')

function perdeu() {
	mensagemTexto.classList.add('perdeu')
	mensagemTexto.textContent = `A palavra era: ${palavraEscolhida}`
	mensagem.classList.add('visivel')
	setTimeout(() => mensagem.classList.remove('visivel'), 2000)
}

function ganhou() {
	mensagemTexto.classList.remove('perdeu')
	mensagemTexto.textContent = 'Você ganhou!'
	mensagem.classList.add('visivel')
	setTimeout(() => mensagem.classList.remove('visivel'), 2000)
}