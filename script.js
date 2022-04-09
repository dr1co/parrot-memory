function iniciarJogo()
{
    const cartasQtd = Number(prompt("Com quantas cartas deseja jogar? (coloque um número entre 4 e 14)"))
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
        iniciarJogo()
    }
}

function comparador()
{
    return Math.random() - 0.5
}

iniciarJogo()