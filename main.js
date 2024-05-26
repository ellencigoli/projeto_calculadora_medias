const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
let notaMinima = 7; // Valor padrão da nota mínima

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));
        
        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += '</tr>';
        
        document.querySelector('tbody').innerHTML += linha;
    }

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    const tbody = document.querySelector('tbody');
    let linhas = '';
    atividades.forEach((atividade, index) => {
        linhas += `<tr><td>${atividade}</td><td>${notas[index]}</td><td>${notas[index] >= notaMinima ? imgAprovado : imgReprovado}</td></tr>`;
    });
    tbody.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').textContent = mediaFinal !== null ? mediaFinal.toFixed(2) : '---';
    document.getElementById('media-final-resultado').innerHTML = mediaFinal !== null ? (mediaFinal >= notaMinima ? spanAprovado : spanReprovado) : '<span class="resultado sem-resultado">---</span>';
}

function calculaMediaFinal() {
    if (notas.length === 0) {
        return null;
    }

    const somaDasNotas = notas.reduce((total, nota) => total + nota, 0);
    const media = somaDasNotas / notas.length;
    return media;
}

// Remover prompt e definir nota mínima
window.addEventListener('DOMContentLoaded', () => {
    notaMinima = parseFloat(prompt("Digite a nota mínima:"));
});
