function iniciarJogo()
{
    const cartas = [
        `<img class="frente" src="/midia/bobrossparrot.gif" />`,
        `<img class="frente" src="/midia/explodyparrot.gif" />`,
        `<img class="frente" src="/midia/fiestaparrot.gif" />`,
        `<img class="frente" src="/midia/metalparrot.gif" />`,
        `<img class="frente" src="/midia/revertitparrot.gif" />`,
        `<img class="frente" src="/midia/tripletsparrot.gif" />`,
        `<img class="frente" src="/midia/unicornparrot.gif" />`
    ]
    const versoCarta = `<img class="verso" src="/midia/front.png" />`
    const linha1 = document.querySelector(".linha-1")
    const linha2 = document.querySelector(".linha-2")

    if(cartasQtd % 2 === 0 && cartasQtd >= 4 && cartasQtd <= 14)
    {
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

    else
    {
        alert("NÚMERO DE CARTAS INVÁLIDO")
        cartasQtd = Number(prompt("Com quantas cartas deseja jogar? (coloque um número entre 4 e 14)"))
        iniciarJogo()
    }
}

function comparador()
{
    return Math.random() - 0.5
}

function virarCarta(elemento)
{
    elemento.classList.toggle("virado")
    checarPares()
}

function checarPares()
{
    const par = document.querySelectorAll(".virado")
    console.log(par.length)
    if(par.length < 2) {}
    else
    {
        const carta1 = par[0].querySelector(".frente")
        const carta2 = par[1].querySelector(".frente")
        console.log(carta1)
        console.log(carta2)
        console.log(carta1.src)
        console.log(carta2.src)
        if(carta1.src === carta2.src)
        {
            par[0].onclick = ""
            par[1].onclick = ""
            par[0].classList.add("correto")
            par[1].classList.add("correto")
            desvirarCartasCorretas()
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
}

function desvirarCartasErradas()
{
    const par = document.querySelectorAll(".virado")
    const congelar = document.querySelector(".congelar-site")
    par[0].classList.remove("virado")
    par[1].classList.remove("virado")
    congelar.style.display = "none"
}

let cartasQtd = Number(prompt("Com quantas cartas deseja jogar? (coloque um número entre 4 e 14)"))
iniciarJogo()