const rightDiv = document.querySelector('.right');
const button = rightDiv.querySelector('button');
const container = document.querySelector(".container")

const inputsNumericos = document.querySelectorAll('.bloco-especifico input');

inputsNumericos.forEach(input => {
    input.addEventListener('input', () => {
        input.value = input.value.replace(/\D/g, '');
    });
});

button.addEventListener('click', () => {
    try {
        console.log("Botão clicado!");

        const checkboxRepetir = document.getElementById('repetir');

        const quantidade = parseInt(document.getElementById("quantidade").value);
        const minimo = parseInt(document.getElementById("minimo").value);
        const maximo = parseInt(document.getElementById("maximo").value);

        console.log({ quantidade, minimo, maximo });

        const resultadoContainer = document.createElement('div');
        resultadoContainer.classList.add('resultado-container');

        const numeros = sortearNumero(quantidade, minimo, maximo, checkboxRepetir.checked);
        console.log("Números sorteados:", numeros); 

        const textoSorteio = document.createElement("h2")
        resultadoContainer.appendChild(textoSorteio);
        
        textoSorteio.classList.add('texto-sorteio')
        textoSorteio.textContent = "RESULTADO DO SORTEIO"

        const numerosContainer = document.createElement('div');
        numerosContainer.classList.add('numeros-container');

        numeros.forEach(numero => {
            const numeroBox = document.createElement("div");
            numeroBox.classList.add("numero-box");
            numeroBox.textContent = numero;
            numerosContainer.appendChild(numeroBox);
        });

        resultadoContainer.appendChild(numerosContainer);

        const botaoVoltar = document.createElement("button")
        botaoVoltar.classList.add("button-sortear-novamente")
        botaoVoltar.textContent = 'SORTEAR NOVAMENTE'

        resultadoContainer.appendChild(botaoVoltar);

        rightDiv.innerHTML = '';
        rightDiv.appendChild(resultadoContainer);

        botaoVoltar.addEventListener('click', () => {
            location.reload();
        });

        setTimeout(() => {
            resultadoContainer.classList.add("show");
          }, 50);
    } catch (erro) {
        const msgErro = document.getElementById("msg-erro")
        msgErro.textContent = erro.message
        console.error("Ocorreu um erro ao sortear os números:", erro);
    }
});

function placeInfos() {
    const infos = document.querySelector('.infos');
    const left = document.querySelector('.left');
    const right = document.querySelector('.right');
    if (!infos || !left || !right) return;
  
    if (window.innerWidth > 768) {
      if (infos.parentElement !== left) left.appendChild(infos);
    } else {
      if (infos.parentElement === left) {
        right.insertAdjacentElement('afterend', infos);
      }
    }
  }
  
  window.addEventListener('DOMContentLoaded', placeInfos);
  window.addEventListener('resize', placeInfos);


function sortearNumero(quantidade, minimo, maximo, semRepeticao = false) {
    const sorteados = [];

    if (semRepeticao && quantidade > (maximo - minimo + 1)) {
        throw new Error("Não é possível sortear essa quantidade sem repetição dentro do intervalo definido.");
      }

    if (maximo < minimo) {
        throw new Error("O valor inicial não pode ser maior que o valor final")
    }

    while (sorteados.length < quantidade) {
        const numero = Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
        

        if (semRepeticao) {
            if (!sorteados.includes(numero)) {
                sorteados.push(numero);;
            }
          } else {
            sorteados.push(numero);;
          }
    }

    return sorteados;
}