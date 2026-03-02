let listaDeCompras = [];

function adicionarItem() {
    const nomeInput = document.getElementById('produto').value;
    const mercado = document.getElementById('supermercado').value;
    const qtd = parseFloat(document.getElementById('quantidade').value);
    const medida = document.getElementById('medida').value;
    const unidade = document.getElementById('unidade').value;
    const valor = parseFloat(document.getElementById('valor').value);

    if (!nomeInput || !mercado || isNaN(qtd) || isNaN(valor)) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    // Criamos a string de medida (ex: "500g" ou "1L")
    const especificacaoMedida = medida ? `${medida}${unidade}` : "";

    listaDeCompras.push({
        nome: nomeInput,
        mercado: mercado,
        qtd: qtd,
        medida: especificacaoMedida,
        valor: valor,
        total: qtd * valor
    });

    atualizarTabela();
    limparCampos();
}

function atualizarTabela() {
    const corpo = document.getElementById('tabela-corpo');
    const filtroProd = document.getElementById('filtro-produto').value.toLowerCase();
    const filtroMerc = document.getElementById('filtro-mercado').value.toLowerCase();
    const labelTotal = document.getElementById('label-total');

    corpo.innerHTML = "";
    let somaExibida = 0;

    const itensFiltrados = listaDeCompras.filter(item => {
        const matchesProduto = item.nome.toLowerCase().includes(filtroProd);
        const matchesMercado = item.mercado.toLowerCase().includes(filtroMerc);
        return matchesProduto && matchesMercado;
    });

    itensFiltrados.forEach(item => {
        somaExibida += item.total;

        const comparativos = listaDeCompras.filter(i =>
            i.nome.toLowerCase() === item.nome.toLowerCase() && i.medida === item.medida
        );

        let status = "";
        if (comparativos.length > 1) {
            const precos = comparativos.map(i => i.valor);
            const min = Math.min(...precos);
            const max = Math.max(...precos);

            if (item.valor === min) status = "<span class='barato'>★ O mais barato</span>";
            else if (item.valor === max) status = "<span class='caro'>Mais caro</span>";
        }

        corpo.innerHTML += `
            <tr>
                <td>${item.nome} ${item.medida ? `<br><small style="color: #666">(${item.medida})</small>` : ''}</td>
                <td>${item.mercado}</td>
                <td>${item.qtd}</td>
                <td>R$ ${item.valor.toFixed(2)}</td>
                <td>R$ ${item.total.toFixed(2)}</td>
                <td>${status}</td>
            </tr>
        `;
    });

    document.getElementById('total-geral').innerText = somaExibida.toFixed(2);

    if (filtroMerc && !filtroProd) {
        labelTotal.innerHTML = `Total no mercado "${filtroMerc}": R$ <span id="total-geral">${somaExibida.toFixed(2)}</span>`;
    } else {
        labelTotal.innerHTML = `Total Exibido: R$ <span id="total-geral">${somaExibida.toFixed(2)}</span>`;
    }

    processarInteligencia(filtroProd);
}

function processarInteligencia(nomeProduto) {
    const painel = document.getElementById('painel-inteligencia');
    if (!nomeProduto || nomeProduto.length < 2) {
        painel.innerHTML = "";
        return;
    }

    const registros = listaDeCompras.filter(i => i.nome.toLowerCase() === nomeProduto.toLowerCase());

    if (registros.length > 1) {
        const ordenados = [...registros].sort((a, b) => a.valor - b.valor);
        const maisBarato = ordenados[0];
        const maisCaro = ordenados[ordenados.length - 1];

        painel.innerHTML = `💡 <b>Análise:</b> O produto "${maisBarato.nome}" (${maisBarato.medida}) está mais em conta no <u>${maisBarato.mercado}</u> (R$ ${maisBarato.valor.toFixed(2)}) e mais caro no <u>${maisCaro.mercado}</u> (R$ ${maisCaro.valor.toFixed(2)}).`;
    } else {
        painel.innerHTML = "💡 <i>Adicione o mesmo produto de outro supermercado para comparar preços.</i>";
    }
}

function limparCampos() {
    document.getElementById('produto').value = "";
    document.getElementById('supermercado').value = "";
    document.getElementById('quantidade').value = "";
    document.getElementById('medida').value = "";
    document.getElementById('valor').value = "";
    document.getElementById('produto').focus();
}