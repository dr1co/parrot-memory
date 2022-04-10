let cartasQtd = Number(prompt("Com quantas cartas deseja jogar? (coloque um número entre 4 e 14)"))
let jogadas = 0
let tempo = 0

function iniciarJogo()
{
    let cartas = [
        `<img class="frente" src="/midia/bobrossparrot.gif" />`,
        `<img class="frente" src="/midia/explodyparrot.gif" />`,
        `<img class="frente" src="/midia/fiestaparrot.gif" />`,
        `<img class="frente" src="/midia/metalparrot.gif" />`,
        `<img class="frente" src="/midia/revertitparrot.gif" />`,
        `<img class="frente" src="/midia/tripletsparrot.gif" />`,
        `<img class="frente" src="/midia/unicornparrot.gif" />`
    ]
    cartas.sort(comparador)

    const versoCarta = `<img class="verso" src="/midia/front.png" />`
    const linha1 = document.querySelector(".linha-1")
    const linha2 = document.querySelector(".linha-2")

    let dequeCartas = []
    for(let i = 0; i < cartasQtd/2; i++)
    {
        dequeCartas.push(`<li onclick="virarCarta(this)">${cartas[i] + versoCarta}</li>`)
        dequeCartas.push(`<li onclick="virarCarta(this)">${cartas[i] + versoCarta}</li>`)
    }
    dequeCartas.sort(comparador)
    if(cartasQtd <= 6)
    {
        for(let i = 0; i < cartasQtd; i++)
        {
            linha1.innerHTML += dequeCartas[i]
        }
    }
    else
    {
        for(let i = 0; i < cartasQtd/2; i++)
        {
            linha1.innerHTML += dequeCartas[i]
            linha2.innerHTML += dequeCartas[cartasQtd/2 + i]
        }
    }
}

function comparador()
{
    return Math.random() - 0.5
}

function virarCarta(elemento)
{
    elemento.classList.toggle("virado")
    jogadas++
    checarPares()
}

function checarPares()
{
    const par = document.querySelectorAll(".virado")
    if(par.length < 2) {}
    else
    {
        const carta1 = par[0].querySelector(".frente")
        const carta2 = par[1].querySelector(".frente")
        if(carta1.src === carta2.src)
        {
            par[0].onclick = ""
            par[1].onclick = ""
            par[0].classList.add("correto")
            par[1].classList.add("correto")
            setTimeout(desvirarCartasCorretas, 250)
        }
        else
        {
            const congelar = document.querySelector(".congelar-site")
            congelar.style.display = "inline"
            setTimeout(desvirarCartasErradas, 500)
        }
    }
}

function desvirarCartasCorretas()
{
    const par = document.querySelectorAll(".virado")
    const congelar = document.querySelector(".congelar-site")
    par[0].style.transition = "none"
    par[1].style.transition = "none"
    par[0].classList.remove("virado")
    par[1].classList.remove("virado")
    congelar.style.display = "none"
    cartasQtd -= 2
        if(cartasQtd === 0)
        {
            if(tempo >= 60)
            {
                let minutos = tempo / 60
                minutos = Math.floor(minutos)
                let segundos = tempo % (minutos*60)
                alert(`Você ganhou o jogo em ${jogadas} jogadas!\nTempo de jogo: ${minutos} minutos e ${segundos} segundos`)
            }
            else 
            {
                alert(`Você ganhou o jogo em ${jogadas} jogadas!\nTempo de jogo: ${tempo} segundos`)   
            }
            let resposta = prompt("Deseja jogar novamente? ('sim' ou 'não')")
            if(resposta === "sim")
            {
                cartasQtd = Number(prompt("Com quantas cartas deseja jogar? (coloque um número entre 4 e 14)"))
                jogadas = 0
                tempo = 0
                document.querySelector(".linha-1").innerHTML = ""
                document.querySelector(".linha-2").innerHTML = ""
                iniciarJogo()
            }
            else if(resposta === "não")
            {
                alert("Obrigado por jogar!")
                clearInterval(timer)
            }
            else
            {
                while(resposta !== "não" || resposta !== "sim")
                {
                    alert("INSIRA UMA RESPOSTA VÁLIDA")
                    resposta = prompt("Deseja jogar novamente? ('sim' ou 'não')")
                    if(resposta === "sim")
                    {
                        cartasQtd = Number(prompt("Com quantas cartas deseja jogar? (coloque um número entre 4 e 14)"))
                        jogadas = 0
                        tempo = 0
                        document.querySelector(".linha-1").innerHTML = ""
                        document.querySelector(".linha-2").innerHTML = ""
                        iniciarJogo()
                        return 0
                    }
                    else
                    {
                        alert("Obrigado por jogar!")
                        clearInterval(timer)
                        return 0
                    }
                }
            }
        }
}

function desvirarCartasErradas()
{
    const par = document.querySelectorAll(".virado")
    const congelar = document.querySelector(".congelar-site")
    par[0].classList.remove("virado")
    par[1].classList.remove("virado")
    congelar.style.display = "none"
}

function atualizarRelogio()
{
    tempo++
    const relogio = document.querySelector(".relogio")
    if(tempo >= 60)
    {
        let minutos = tempo / 60
        minutos = Math.floor(minutos)
        let segundos = tempo % (minutos*60)
        if(minutos >= 10)
        {
            if(segundos >= 10)
            {
                relogio.innerHTML = `${minutos}:${segundos}`
            }
            else
            {
                relogio.innerHTML = `${minutos}:0${segundos}`
            }
        }
        else
        {
            if(segundos >= 10)
            {
                relogio.innerHTML = `0${minutos}:${segundos}`
            }
            else
            {
                relogio.innerHTML = `0${minutos}:0${segundos}`
            }
        }
    }
    else if(tempo >= 10)
    {
        relogio.innerHTML = `00:${tempo}`
    }
    else
    {
        relogio.innerHTML = `00:0${tempo}`
    }
}

let timer = setInterval(atualizarRelogio, 1000)
if(cartasQtd % 2 === 0 && cartasQtd >= 4 && cartasQtd <=14) iniciarJogo()

else
{
    while(cartasQtd % 2 !== 0 || cartasQtd < 4 || cartasQtd > 14)
    {
        alert("NÚMERO DE CARTAS INVÁLIDO")
        cartasQtd = Number(prompt("Com quantas cartas deseja jogar? (coloque um número entre 4 e 14)"))
        if(cartasQtd % 2 === 0 && cartasQtd >= 4 && cartasQtd <=14)
        {
            iniciarJogo()
        }
    }
}