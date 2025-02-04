const html = document.querySelector('html')
const displayTempo = document.querySelector("#timer")
const banner = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")
const botaoInic = document.querySelector(".app__card-primary-button")
const focoBt = document.querySelector(".app__card-button--foco")
const curtoBt = document.querySelector(".app__card-button--curto")
const longoBt = document.querySelector(".app__card-button--longo")
const startPauseBt = document.getElementById("start-pause")
const botoes = document.querySelectorAll(".app__card-button")
const musicaFocoInput = document.getElementById("alternar-musica")
const iniciarOuPausarBt = document.querySelector("#start-pause span")
const IniciarOuPausarIcon = document.querySelector(".app__card-primary-butto-icon")
const tempoNaTela = document.querySelector("#timer")

const musica = new Audio("/sons/luna-rise-part-one.mp3")
const musicaStart = new Audio("/sons/play.wav")
const musicaPause = new Audio("/sons/pause.mp3")
const musicaBeep = new Audio("/sons/beep.mp3")

let tempoDecorridoSeg = 1500
let intervaloId = null

musica.loop = true

musicaFocoInput.addEventListener("change", () => {

    if(musica.paused){
        musica.play()
    }  else {
        musica.pause()
    }

})

const duracaoFoco = 1500;
const duracaoDescCurto = 300;
const duracaoDescLongo = 900;



focoBt.addEventListener('click', () => {
    tempoDecorridoSeg = 1500
    alterarContexto('foco')
    focoBt.classList.add("active")
})

curtoBt.addEventListener("click", () => {
    tempoDecorridoSeg = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add("active")
})

longoBt.addEventListener("click", () => {
    tempoDecorridoSeg = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add("active")
})

function alterarContexto(contexto) {
    exibeTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove("active")
    })
    html.setAttribute("data-contexto", contexto)
    banner.setAttribute("src", `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `
            break;
        case "descanso-longo":
                titulo.innerHTML = `
                Hora de voltar à superfice<br>
                    <strong class="app__title-strong">Faça uma pausa longa.</strong>    
               `     
        default:
            break;
    }
}

const contagemRegressiva = () => {

    if(tempoDecorridoSeg <= 0){

        musicaBeep.play()
        alert("Tempo finalizado!")
        zerar()
        return

    }

    tempoDecorridoSeg -= 1
    exibeTempo()

}

startPauseBt.addEventListener("click", iniciarOuPause)

function iniciarOuPause(){

    if(intervaloId){

        musicaPause.play()
        zerar()
        return 

    }

    musicaStart.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    IniciarOuPausarIcon.setAttribute("src", "/imagens/pause.png")
}

function zerar(){

    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    IniciarOuPausarIcon.setAttribute("src", "/imagens/play_arrow.png")
    intervaloId = null

}

function exibeTempo(){
    const tempo = new Date(tempoDecorridoSeg * 1000)
    const tempoFormatado = tempo.toLocaleTimeString("pt-br", {minute: "2-digit", second: "2-digit"})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

exibeTempo()