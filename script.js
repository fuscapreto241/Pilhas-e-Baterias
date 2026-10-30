/* ==========================================================
   ACORDEÃO
   Cada botão .titulo-acordeao abre/fecha a div .conteudo-acordeao
   que vem logo depois dele no HTML.
   ========================================================== */
document.querySelectorAll(".titulo-acordeao").forEach(botao => {
    botao.addEventListener("click", () => {
        const conteudo = botao.nextElementSibling;
        const aberto = conteudo.style.display === "block";
        conteudo.style.display = aberto ? "none" : "block";
    });
});


/* ==========================================================
   QUIZ (DADOS E LÓGICA)
   ========================================================== */

const perguntas = [
    {
        pergunta: "O que a eletroquímica estuda?",
        alternativas: [
            "Apenas a corrosão dos metais",
            "A relação entre as reações químicas e a energia elétrica",
            "A produção de alimentos industrializados",
            "O movimento dos planetas"
        ],
        correta: 1,
        explicacao: "A eletroquímica é a área da Química que estuda a relação entre as reações químicas e a energia elétrica."
    },
    {
        pergunta: "O que acontece em uma reação de oxidação?",
        alternativas: [
            "A substância ganha elétrons",
            "A substância não troca elétrons",
            "A substância perde elétrons",
            "A substância vira energia elétrica pura"
        ],
        correta: 2,
        explicacao: "Na oxidação, uma substância perde elétrons. Já na redução, ela ganha elétrons."
    },
    {
        pergunta: "O que acontece em uma reação de redução?",
        alternativas: [
            "A substância ganha elétrons",
            "A substância perde elétrons",
            "A substância diminui de tamanho",
            "A substância deixa de reagir"
        ],
        correta: 0,
        explicacao: "Na redução, uma substância ganha elétrons. Oxidação e redução ocorrem juntas, com transferência de elétrons entre substâncias."
    },
    {
        pergunta: "Qual alternativa descreve corretamente a eletrólise?",
        alternativas: [
            "Transforma energia química em energia elétrica de forma espontânea, como nas pilhas",
            "Utiliza energia elétrica para provocar uma reação química que não aconteceria espontaneamente",
            "É o processo de descarte de pilhas",
            "Acontece apenas em baterias de chumbo-ácido"
        ],
        correta: 1,
        explicacao: "Na eletrólise, a energia elétrica provoca uma reação química que não ocorreria espontaneamente. Já as células galvânicas, como as pilhas, transformam energia química em elétrica."
    },
    {
        pergunta: "Em uma pilha, o que ocorre no ânodo durante a descarga?",
        alternativas: [
            "Redução, com ganho de elétrons",
            "Oxidação, com perda de elétrons",
            "Nenhuma reação",
            "Apenas a recarga da pilha"
        ],
        correta: 1,
        explicacao: "O ânodo é o polo negativo durante a descarga e nele ocorre a oxidação, com perda de elétrons. No cátodo, polo positivo, ocorre a redução."
    },
    {
        pergunta: "Qual é a característica das pilhas alcalinas descartáveis?",
        alternativas: [
            "Podem ser recarregadas várias vezes",
            "Não são projetadas para serem recarregadas",
            "Funcionam sem nenhuma reação química",
            "São usadas somente em automóveis"
        ],
        correta: 1,
        explicacao: "As pilhas comuns, como as alcalinas descartáveis, não são projetadas para serem recarregadas. Algumas pilhas recarregáveis usam reações reversíveis."
    },
    {
        pergunta: "Qual tipo de bateria é utilizado em celulares, notebooks e carros elétricos?",
        alternativas: [
            "Bateria de chumbo-ácido",
            "Bateria de níquel-hidreto metálico",
            "Bateria de íons de lítio",
            "Bateria de papel"
        ],
        correta: 2,
        explicacao: "As baterias de íons de lítio são utilizadas em celulares, notebooks e carros elétricos."
    },
    {
        pergunta: "Qual tipo de bateria é comum em automóveis?",
        alternativas: [
            "Bateria de chumbo-ácido",
            "Bateria de íons de lítio",
            "Bateria de níquel-hidreto metálico",
            "Pilha alcalina descartável"
        ],
        correta: 0,
        explicacao: "A bateria de chumbo-ácido é comum em automóveis."
    },
    {
        pergunta: "O que acontece quando uma bateria recarregável é conectada a um carregador adequado?",
        alternativas: [
            "A energia elétrica provoca reações químicas que restauram parte de sua energia armazenada",
            "Ela perde toda a energia química",
            "Ela se transforma em uma pilha descartável",
            "Nada acontece, pois baterias não usam reações químicas"
        ],
        correta: 0,
        explicacao: "Durante a recarga, a energia elétrica provoca reações químicas que restauram parte da energia armazenada na bateria."
    },
    {
        pergunta: "Qual é a forma correta de descartar pilhas e baterias usadas?",
        alternativas: [
            "Jogar no lixo comum",
            "Jogar no solo ou na água",
            "Entregar em pontos de coleta apropriados",
            "Queimar junto com outros resíduos"
        ],
        correta: 2,
        explicacao: "Pilhas e baterias devem ser entregues em pontos de coleta apropriados para reciclagem e destinação adequada. No Brasil, a Política Nacional de Resíduos Sólidos prevê a logística reversa desses produtos."
    }
];


let perguntaAtual = 0;
let pontos = 0;

function mostrarPergunta() {
    let pergunta = perguntas[perguntaAtual];

    document.getElementById("progresso").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById("pergunta").textContent = pergunta.pergunta;

    let alternativasContainer = document.getElementById("alternativas");
    alternativasContainer.innerHTML = ""; // Limpa anterior

    pergunta.alternativas.forEach((alternativa, indice) => {
        let botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.onclick = () => verificarResposta(indice);
        alternativasContainer.appendChild(botao);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("proxima").style.display = "none";
}

function verificarResposta(indice) {
    let pergunta = perguntas[perguntaAtual];
    let botoes = document.querySelectorAll("#alternativas button");

    botoes.forEach(btn => btn.disabled = true);

    if (indice === pergunta.correta) {
        botoes[indice].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta correta! ${pergunta.explicacao}`;
        pontos++;
    } else {
        botoes[indice].classList.add("errada");
        botoes[pergunta.correta].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta incorreta. ${pergunta.explicacao}`;
    }

    document.getElementById("proxima").style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    let msg = pontos === perguntas.length ? "Excelente! Você acertou todas!" :
              pontos >= 7 ? "Muito bom! Ótimo conhecimento." : "Vale a pena revisar o conteúdo.";

    document.getElementById("quiz-container").innerHTML = `
        <h3>Resultado final</h3>
        <p>Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> questões.</p>
        <p>${msg}</p>
        <button id='refazer' onclick='refazerQuiz()'>Refazer Quiz</button>
    `;
}

function refazerQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    document.getElementById("quiz-container").innerHTML = `
        <p id="progresso"></p>
        <h3 id="pergunta"></h3>
        <div id="alternativas"></div>
        <p id="feedback"></p>
        <button id="proxima" onclick="proximaPergunta()">Próxima pergunta</button>
    `;
    mostrarPergunta();
}

// Inicialização automática do Quiz (só roda na página do quiz)
if (document.getElementById("quiz-container")) {
    mostrarPergunta();
}

