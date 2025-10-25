const API_BASE_CONTRATO = "/syntro/controller/contrato";

// Função para cadastrar contrato
async function cadastrarContrato() {
    try {
        // Captura os valores do formulário
        const nomeServico = document.getElementById("nomeServico").value;
        const descricao = document.getElementById("descricaoServico").value;
        const dataInicioRaw = document.getElementById("dataInicio").value;
        const duracaoContrato = document.getElementById("duracaoContrato").value;
        const valorCobrancaRaw = document.getElementById("valorCobranca").value;
        const moedaCobranca = document.getElementById("moedaCobranca").value;
        const idEmpresa = "" //vai pegar do session;
        const idDepartamento = "" //vai pegar do session;

        const dataRealizacao = dataInicioRaw ? new Date(dataInicioRaw).getTime() : null;
        const valor = parseFloat(valorCobrancaRaw.replace(",", "."));

        const contrato = {
            nomeServico,
            descricao,
            dataRealizacao: dataRealizacao ? new Date(dataRealizacao).toISOString() : null,
            statusContrato: true,
            tempoContrato: duracaoContrato,
            valor,
            nomeMoeda: moedaCobranca,
            idDepartamento,
            idEmpresa
        };

        const response = await fetch(API_BASE_CONTRATO, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contrato)
        });

        if (!response.ok) throw new Error("Erro ao cadastrar contrato.");

        const dadosContrato = await response.json();
        alert(`Contrato cadastrado com sucesso! ID: ${dadosContrato.id}`);

        limparFormulario();
    } catch (error) {
        console.error(error);
        alert("Falha ao cadastrar o contrato. Veja o console para detalhes.");
    }
}

// Limpa formulário após cadastro
function limparFormulario() {
    [
        "nomeServico", "descricaoServico", "dataInicio", "duracaoContrato",
        "valorCobranca", "moedaCobranca"
    ].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.value = "";
    });

    // Reseta selects para a primeira opção
    ["empresaFornecedor", "representante", "representanteInterno"].forEach(id => {
        const select = document.getElementById(id);
        if (select) select.selectedIndex = 0;
    });

    // Reseta contador de caracteres da descrição
    const contador = document.querySelector('.servico-contador');
    if (contador) contador.textContent = "0/500";
}

// Adiciona listener ao botão de salvar
document.addEventListener("DOMContentLoaded", () => {
    const botaoSalvar = document.querySelector(".servico-salvar-btn");
    if (botaoSalvar) {
        botaoSalvar.addEventListener("click", cadastrarContrato);
    }
});
