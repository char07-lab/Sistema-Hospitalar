document.addEventListener("DOMContentLoaded", function () {
    // Base de dados simulada para a listagem
    const pacientes = [
        { codigo: "1", nome: "Maria da Silva", cpf: "123.456.789-00", telefone: "(11) 1234-5678" },
        { codigo: "2", nome: "Carlos dos Santos", cpf: "987.654.321-00", telefone: "(11) 8765-4321" },
        { codigo: "3", nome: "Eduardo Souza", cpf: "456.789.123-00", telefone: "(11) 9876-5432" },
        { codigo: "4", nome: "João Silva", cpf: "159.753.456-00", telefone: "(11) 4567-8901" }
    ];

    const tabela = document.getElementById("tabelaPacientes");
    const txtValorBusca = document.getElementById("txtValorBusca");
    const cbTipoBusca = document.getElementById("cbTipoBusca");
    const btnLimparBusca = document.getElementById("btnLimparBusca");
    const btnTodosPacientes = document.getElementById("btnTodosPacientes");

    // Função para renderizar os dados na tabela
    function renderizarTabela(lista) {
        tabela.innerHTML = "";
        
        if (lista.length === 0) {
            tabela.innerHTML = `<tr><td colspan="4" style="text-align: center; color: #666;">Nenhum paciente encontrado.</td></tr>`;
            return;
        }

        lista.forEach(p => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${p.codigo}</td>
                <td>${p.nome}</td>
                <td>${p.cpf}</td>
                <td>${p.telefone}</td>
            `;
            tabela.appendChild(tr);
        });
    }

    // Exibe todos inicialmente
    renderizarTabela(pacientes);

    // Evento de filtro em tempo real ao digitar no input
    if (txtValorBusca) {
        txtValorBusca.addEventListener("input", function () {
            const termo = txtValorBusca.value.toLowerCase().trim();
            const tipoFiltro = cbTipoBusca.value; // 'nome', 'codigo', ou 'cpf'

            const filtrados = pacientes.filter(p => {
                const valorCampo = p[tipoFiltro].toLowerCase();
                return valorCampo.includes(termo);
            });

            renderizarTabela(filtrados);
        });
    }

    // Botão Limpar Busca
    if (btnLimparBusca) {
        btnLimparBusca.addEventListener("click", function () {
            txtValorBusca.value = "";
            renderizarTabela(pacientes);
            txtValorBusca.focus();
        });
    }

    // Botão Todos Pacientes
    if (btnTodosPacientes) {
        btnTodosPacientes.addEventListener("click", function () {
            txtValorBusca.value = "";
            renderizarTabela(pacientes);
        });
    }
});