const form = document.getElementById('form-atividade');
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima:"));

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    adicionaAtividade();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaAtividade() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));
    }

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    const tabelaAtividades = document.getElementById('tabela-atividades');
    tabelaAtividades.innerHTML = '';

    for (let i = 0; i < atividades.length; i++) {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${atividades[i]}</td>
            <td>${notas[i]}</td>
            <td>${notas[i] >= notaMinima ? spanAprovado : spanReprovado}</td>
        `;
        tabelaAtividades.appendChild(linha);
    }
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    const mediaFinalValor = document.getElementById('media-final-valor');
    const mediaFinalResultado = document.getElementById('media-final-resultado');

    mediaFinalValor.textContent = mediaFinal.toFixed(2);

    if (mediaFinal >= notaMinima) {
        mediaFinalResultado.innerHTML = spanAprovado;
    } else {
        mediaFinalResultado.innerHTML = spanReprovado;
    }
}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return notas.length === 0 ? 0 : somaDasNotas / notas.length;
}