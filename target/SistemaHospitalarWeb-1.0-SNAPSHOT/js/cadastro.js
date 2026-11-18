document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formCadastro");
    const inputCpf = document.getElementById("txtCpf");
    const inputTelefone = document.getElementById("txtTelefone");
    const inputDataNasc = document.getElementById("txtDataNasc");

    // ==========================================
    // MÁSCARAS AUTOMÁTICAS ENQUANTO DIGITA
    // ==========================================

    // Máscara de CPF: 000.000.000-00
    if (inputCpf) {
        inputCpf.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, "");
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 9) {
                value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, "$1.$2.$3-$4");
            } else if (value.length > 6) {
                value = value.replace(/^(\d{3})(\d{3})(\d{1,3}).*/, "$1.$2.$3");
            } else if (value.length > 3) {
                value = value.replace(/^(\d{3})(\d{1,3}).*/, "$1.$2");
            }
            e.target.value = value;
        });
    }

    // Máscara de Telefone: (00)0000-0000 ou (00)00000-0000
    if (inputTelefone) {
        inputTelefone.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, "");
            if (value.length > 11) value = value.slice(0, 11);

            if (value.length > 10) {
                value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1)$2-$3");
            } else if (value.length > 6) {
                value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1)$2-$3");
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{0,5}).*/, "($1)$2");
            } else if (value.length > 0) {
                value = value.replace(/^(\d*)/, "($1");
            }
            e.target.value = value;
        });
    }

    // Máscara de Data de Nascimento: DD/MM/AAAA
    if (inputDataNasc) {
        inputDataNasc.addEventListener("input", function (e) {
            let value = e.target.value.replace(/\D/g, "");
            if (value.length > 8) value = value.slice(0, 8);

            if (value.length > 4) {
                value = value.replace(/^(\d{2})(\d{2})(\d{1,4}).*/, "$1/$2/$3");
            } else if (value.length > 2) {
                value = value.replace(/^(\d{2})(\d{1,2}).*/, "$1/$2");
            }
            e.target.value = value;
        });
    }

    // ==========================================
    // VALIDAÇÃO NO SUBMIT (PLANO DE TESTES / RNs)
    // ==========================================
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const nome = document.getElementById("txtNome").value.trim();
            const cpf = inputCpf.value.trim();
            const endereco = document.getElementById("txtEndereco").value.trim();
            const telefone = inputTelefone.value.trim();
            const dataNasc = inputDataNasc.value.trim();
            const convenio = document.getElementById("cbConvenio").value;

            // [RN01] Nome: obrigatório, máx 55 caracteres, sem números
            if (!nome) {
                alert("Erro: O campo Nome é obrigatório.");
                document.getElementById("txtNome").focus();
                return;
            }
            if (/\d/.test(nome)) {
                alert("Erro [RN01]: O campo Nome não pode conter números.");
                document.getElementById("txtNome").focus();
                return;
            }
            if (nome.length > 55) {
                alert("Erro [RN01]: O Nome deve ter no máximo 55 caracteres.");
                document.getElementById("txtNome").focus();
                return;
            }

            // [RN02] CPF: obrigatório e exatamente 11 dígitos
            const cpfNumeros = cpf.replace(/\D/g, "");
            if (!cpf || cpfNumeros.length !== 11) {
                alert("Erro [RN02]: O CPF deve conter exatamente 11 dígitos.");
                inputCpf.focus();
                return;
            }

            // [RN04] Endereço: obrigatório, máx 200 caracteres
            if (!endereco) {
                alert("Erro: O campo Endereço é obrigatório.");
                document.getElementById("txtEndereco").focus();
                return;
            }
            if (endereco.length > 200) {
                alert("Erro [RN04]: O Endereço deve ter no máximo 200 caracteres.");
                document.getElementById("txtEndereco").focus();
                return;
            }

            // [RN05] Telefone: formato correto (10 ou 11 dígitos com DDD)
            const telNumeros = telefone.replace(/\D/g, "");
            if (!telefone || (telNumeros.length !== 10 && telNumeros.length !== 11)) {
                alert("Erro [RN05]: O Telefone deve seguir o formato válido com DDD (ex: (54)99999-1111).");
                inputTelefone.focus();
                return;
            }

            // [RN03] Data de Nascimento: formato DD/MM/AAAA completo (8 dígitos numéricos)
            const dataNumeros = dataNasc.replace(/\D/g, "");
            if (!dataNasc || dataNumeros.length !== 8) {
                alert("Erro [RN03]: A Data de Nascimento deve ser válida no formato DD/MM/AAAA.");
                inputDataNasc.focus();
                return;
            }

            // [RN07] Convênio obrigatório
            if (!convenio) {
                alert("Erro [RN07]: Selecione um convênio válido.");
                document.getElementById("cbConvenio").focus();
                return;
            }

            // Sucesso
            alert("Cadastro de paciente realizado com sucesso!");
            form.reset();
        });
    }
});