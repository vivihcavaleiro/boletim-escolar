// ======================================
// BOLETIM ESCOLAR - JAVASCRIPT
// ======================================

// Seleção dos elementos
const formulario = document.getElementById("formNotas");
const resultado = document.getElementById("resultado");

const nota1 = document.getElementById("nota1");
const nota2 = document.getElementById("nota2");
const nota3 = document.getElementById("nota3");

const mediaGeral = document.getElementById("mediaGeral");
const situacaoCard = document.getElementById("situacaoCard");


// ======================================
// 1. CALCULAR MÉDIA E SITUAÇÃO
// ======================================

function calcularMedia(n1, n2, n3) {
    return (n1 + n2 + n3) / 3;
}

function verificarSituacao(media) {

    // A ordem é importante:
    // abaixo de 5 = reprovado
    // de 5 até abaixo de 7 = recuperação
    // 7 ou mais = aprovado

    if (media < 5) {
        return "REPROVADO";
    }

    if (media < 7) {
        return "RECUPERAÇÃO";
    }

    return "APROVADO";
}


// ======================================
// 2. CALCULAR RESULTADO DO FORMULÁRIO
// ======================================

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const matricula = document.getElementById("matricula").value.trim();
    const disciplina = document.getElementById("disciplina").value;

    const n1 = Number(nota1.value);
    const n2 = Number(nota2.value);
    const n3 = Number(nota3.value);

    // Validação das notas
    if (
        n1 < 0 || n1 > 10 ||
        n2 < 0 || n2 > 10 ||
        n3 < 0 || n3 > 10
    ) {
        resultado.className = "resultado resultado-reprovado";

        resultado.innerHTML = `
            <strong>Erro!</strong>
            As notas devem estar entre 0 e 10.
        `;

        return;
    }

    const media = calcularMedia(n1, n2, n3);
    const situacao = verificarSituacao(media);

    let classeResultado = "resultado-sucesso";

    if (situacao === "RECUPERAÇÃO") {
        classeResultado = "resultado-recuperacao";
    }

    if (situacao === "REPROVADO") {
        classeResultado = "resultado-reprovado";
    }

    resultado.className = `resultado ${classeResultado}`;

    resultado.innerHTML = `
        <strong>Resultado de ${nome}</strong>
        <p><b>Matrícula:</b> ${matricula}</p>
        <p><b>Disciplina:</b> ${disciplina}</p>
        <p><b>Média:</b> ${media.toFixed(1).replace(".", ",")}</p>
        <p><b>Situação:</b> ${situacao}</p>
    `;
});


// ======================================
// 3. CONSULTAR NOTAS
// ======================================

document.getElementById("btnNotas").addEventListener("click", function() {

    document.getElementById("notas").scrollIntoView({
        behavior: "smooth"
    });

});


// ======================================
// 4. CONSULTAR FALTAS / FREQUÊNCIA
// ======================================

document.getElementById("btnFaltas").addEventListener("click", function() {

    const frequencia = 92;

    document.getElementById("frequenciaCard").textContent =
        `${frequencia}%`;

    document.getElementById("faltas").scrollIntoView({
        behavior: "smooth"
    });

    alert(
        `Frequência atual: ${frequencia}%\nSituação: Frequência adequada`
    );

});


// ======================================
// 5. CALCULAR MÉDIA PELO BOTÃO
// ======================================

document.getElementById("btnMedia").addEventListener("click", function() {

    const n1 = Number(nota1.value);
    const n2 = Number(nota2.value);
    const n3 = Number(nota3.value);

    if (
        nota1.value === "" ||
        nota2.value === "" ||
        nota3.value === ""
    ) {
        alert("Preencha as três notas antes de calcular.");
        return;
    }

    const media = calcularMedia(n1, n2, n3);
    const situacao = verificarSituacao(media);

    alert(
        `Média: ${media.toFixed(1).replace(".", ",")}\n` +
        `Situação: ${situacao}`
    );

});


// ======================================
// 6. IMPRIMIR BOLETIM
// ======================================

document.getElementById("btnImprimir").addEventListener("click", function() {

    window.print();

});


// ======================================
// 7. LIMPAR FORMULÁRIO
// ======================================

document.getElementById("btnLimpar").addEventListener("click", function() {

    formulario.reset();

    resultado.className = "resultado";

    resultado.innerHTML = `
        <p>Preencha o formulário para visualizar o resultado.</p>
    `;

});


// ======================================
// 8. BOTÃO VOLTAR
// ======================================

document.getElementById("btnVoltar").addEventListener("click", function() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ======================================
// 9. ATUALIZAÇÃO AUTOMÁTICA DO CARD
// ======================================

// Calcula a média geral aproximada das disciplinas exibidas.

function atualizarMediaGeral() {

    const linhas = document.querySelectorAll("#tabelaNotas tr");

    let soma = 0;
    let quantidade = 0;

    linhas.forEach(function(linha) {

        const celulas = linha.querySelectorAll("td");

        if (celulas.length >= 5) {

            const media = parseFloat(
                celulas[4].textContent.replace(",", ".")
            );

            if (!isNaN(media)) {
                soma += media;
                quantidade++;
            }
        }
    });

    if (quantidade > 0) {

        const media = soma / quantidade;

        mediaGeral.textContent =
            media.toFixed(1).replace(".", ",");
    }
}

atualizarMediaGeral();


// ======================================
// 10. FREQUÊNCIA
// ======================================

const frequenciaAtual = 92;

if (frequenciaAtual >= 75) {

    document.getElementById("frequenciaCard").textContent =
        `${frequenciaAtual}%`;

} else {

    document.getElementById("frequenciaCard").textContent =
        `${frequenciaAtual}%`;

    situacaoCard.textContent = "ATENÇÃO";
}
