let cidade = document.getElementById("cidade").value;

let bonus = 0;

function estalagem(func) {
    for (let i = 1; i <= func; i++) {
        if (i == 0) {
            bonus = 0;
        } else if (i == 1) {
            bonus = 5;
        } else {
            bonus += 5;
        }
    }

    let ouro = Math.floor(Math.random() * (5 + bonus) + 1);
    let prata = Math.floor(Math.random() * 100);
    return `Total recebido: ${ouro} de ouro e ${prata} de prata.`;
}

function lojas(func) {
    for (let i = 1; i <= func; i++) {
        if (i == 0) {
            bonus = 0;
        } else if (i == 1) {
            bonus = 10;
        } else {
            bonus += 10;
        }
    }

    let ouro = Math.floor(Math.random() * (10 + bonus) + 1);
    let prata = Math.floor(Math.random() * 100);
    return `Total recebido: ${ouro} de ouro e ${prata} de prata.`;
}

// Função para salvar despesas no localStorage
function salvarDespesas() {
    const despesas = [];
    const funcionarios = document.querySelectorAll('.funcionario');
    funcionarios.forEach(funcionario => {
        const tipo = funcionario.querySelector('.tipo').value || '';
        const quantidade = parseInt(funcionario.querySelector('.quantidade').value) || 0;
        const valor = parseFloat(funcionario.querySelector('.valor').value) || 0;
        despesas.push({ tipo, quantidade, valor });
    });
    localStorage.setItem('despesas', JSON.stringify(despesas));
}

// Função para salvar despesas no localStorage com base na cidade
function salvarDespesasPorCidade() {
    const cidade = document.getElementById("cidade").value;
    const despesas = [];
    const funcionarios = document.querySelectorAll('.funcionario');
    funcionarios.forEach(funcionario => {
        const tipo = funcionario.querySelector('.tipo').value || '';
        const quantidade = parseInt(funcionario.querySelector('.quantidade').value) || 0;
        const valor = parseFloat(funcionario.querySelector('.valor').value) || 0;
        despesas.push({ tipo, quantidade, valor });
    });
    localStorage.setItem(`despesas_${cidade}`, JSON.stringify(despesas));
}

// Função para carregar despesas do localStorage
function carregarDespesas() {
    const despesas = JSON.parse(localStorage.getItem('despesas')) || [];
    const ul = document.getElementById('despesas');
    ul.innerHTML = ''; // Limpa a lista antes de carregar
    despesas.forEach(despesa => {
        const li = document.createElement('li');
        li.classList.add('funcionario');
        li.innerHTML = `
            <input type="text" class="tipo" placeholder="Despesa" value="${despesa.tipo}" placeholder="Tipo de despesa">
            <input type="number" class="quantidade" value="${despesa.quantidade}" min="0" placeholder="Quantidade">
            <input type="number" class="valor" placeholder="Valor" value="${despesa.valor}" min="0" step="0.01" placeholder="Valor">
        `;
        ul.appendChild(li);
    });
}

// Função para carregar despesas do localStorage com base na cidade
function carregarDespesasPorCidade() {
    const cidade = document.getElementById("cidade").value;
    const despesas = JSON.parse(localStorage.getItem(`despesas_${cidade}`)) || [];
    const ul = document.getElementById('despesas');
    ul.innerHTML = ''; // Limpa a lista antes de carregar
    despesas.forEach(despesa => {
        const li = document.createElement('li');
        li.classList.add('funcionario');
        li.innerHTML = `
            <input type="text" class="tipo" placeholder="Despesa" value="${despesa.tipo}" placeholder="Tipo de despesa">
            <input type="number" class="quantidade" value="${despesa.quantidade}" min="0" placeholder="Quantidade">
            <input type="number" class="valor" placeholder="Valor" value="${despesa.valor}" min="0" step="0.01" placeholder="Valor">
        `;
        ul.appendChild(li);
    });
}

// Função para salvar proventos no localStorage com base na cidade
function salvarProventosPorCidade() {
    const cidade = document.getElementById("cidade").value;
    const proventos = [];
    const ganhos = document.querySelectorAll('.ganho');
    ganhos.forEach(ganho => {
        const tipo = ganho.querySelector('.tipo').value || '';
        const quantidade = parseInt(ganho.querySelector('.quantidade').value) || 0;
        const valor = parseFloat(ganho.querySelector('.valor').value) || 0;
        proventos.push({ tipo, quantidade, valor });
    });
    localStorage.setItem(`proventos_${cidade}`, JSON.stringify(proventos));
}

// Função para carregar proventos do localStorage com base na cidade
function carregarProventosPorCidade() {
    const cidade = document.getElementById("cidade").value;
    const proventos = JSON.parse(localStorage.getItem(`proventos_${cidade}`)) || [];
    const ul = document.getElementById('proventos');
    ul.innerHTML = ''; // Limpa a lista antes de carregar
    proventos.forEach(provento => {
        const li = document.createElement('li');
        li.classList.add('ganho');
        li.innerHTML = `
            <input type="text" class="tipo" placeholder="Tipo do provento" value="${provento.tipo}">
            <input type="number" class="quantidade" value="${provento.quantidade}" min="0" placeholder="Quantidade">
            <input type="number" class="valor" placeholder="Valor" value="${provento.valor}" min="0" step="0.01" placeholder="Valor">
        `;
        ul.appendChild(li);
    });
}

// Atualiza as despesas e proventos ao mudar a cidade
document.getElementById('cidade').addEventListener('change', () => {
    carregarDespesasPorCidade();
    carregarProventosPorCidade();
});

document.getElementById('adicionar').addEventListener('click', () => {
    const ul = document.getElementById('despesas');
    const li = document.createElement('li');
    li.classList.add('funcionario');
    li.innerHTML = `
        <input type="text" class="tipo" placeholder="Tipo de despesa">
        <input type="number" class="quantidade" value="0" min="0" placeholder="Quantidade">
        <input type="number" class="valor" placeholder="Valor" value="0" min="0" step="0.01" placeholder="Valor">
    `;
    ul.appendChild(li);
    salvarDespesasPorCidade();
});

document.getElementById('adicionarProvento').addEventListener('click', () => {
    const ul = document.getElementById('proventos');
    const li = document.createElement('li');
    li.classList.add('ganho');
    li.innerHTML = `
        <input type="text" class="tipo" placeholder="Tipo do provento">
        <input type="number" class="quantidade" value="0" min="0" placeholder="Quantidade">
        <input type="number" class="valor" placeholder="Valor" value="0" min="0" step="0.01" placeholder="Valor">
    `;
    ul.appendChild(li);
    salvarProventosPorCidade();
});

document.getElementById('calcular').addEventListener('click', () => {
    const funcionarios = document.querySelectorAll('.funcionario');
    let total = 0;
    const resultadoUl = document.getElementById('resultadoDespesas');
    resultadoUl.innerHTML = ''; // Limpa os resultados anteriores

    funcionarios.forEach(funcionario => {
        const tipo = funcionario.querySelector('.tipo').value || 'Funcionário';
        const quantidade = parseInt(funcionario.querySelector('.quantidade').value) || 0;
        const valor = parseFloat(funcionario.querySelector('.valor').value) || 0;
        const subtotal = quantidade * valor;
        total += subtotal;

        if (quantidade > 0) {
            const li = document.createElement('li');
            li.textContent = `${tipo} = ${subtotal.toFixed(0)}`;
            resultadoUl.appendChild(li);
        }
    });

    const totalLi = document.createElement('li');
    totalLi.textContent = `Total = ${total.toFixed(0)} pratas`;
    resultadoUl.appendChild(totalLi);

    salvarDespesasPorCidade();
});

document.getElementById('calcularProventos').addEventListener('click', () => {
    const ganhos = document.querySelectorAll('.ganho');
    let total = 0;
    const resultadoUl = document.getElementById('resultadoProventos');
    resultadoUl.innerHTML = ''; // Limpa os resultados anteriores

    ganhos.forEach(ganho => {
        const tipo = ganho.querySelector('.tipo').value || 'Provento';
        const quantidade = parseInt(ganho.querySelector('.quantidade').value) || 0;
        const valor = parseFloat(ganho.querySelector('.valor').value) || 0;
        const subtotal = quantidade * valor;
        total += subtotal;

        if (quantidade > 0) {
            const li = document.createElement('li');
            li.textContent = `${tipo} = ${subtotal.toFixed(0)}`;
            resultadoUl.appendChild(li);
        }
    });

    const totalLi = document.createElement('li');
    totalLi.textContent = `Total = ${total.toFixed(0)} pratas`;
    resultadoUl.appendChild(totalLi);

    salvarProventosPorCidade();
});

// Carrega as despesas e proventos ao carregar a página
window.addEventListener('load', () => {
    carregarDespesasPorCidade();
    carregarProventosPorCidade();
});