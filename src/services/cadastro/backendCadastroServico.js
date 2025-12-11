const API_BASE_CONTRATO = "http://localhost:8080/syntro/contrato";

// Função para cadastrar contrato
async function cadastrarContrato() {

    try {
        const usuarioLogado = JSON.parse(sessionStorage.getItem("usuarioLogado"));
        const nomeServico = document.getElementById("nomeServico").value;
        const descricao = document.getElementById("descricaoServico").value;
        const dataInicioRaw = document.getElementById("dataInicio").value;
        const duracaoContrato = document.getElementById("duracaoContrato").value;
        const valorCobrancaRaw = document.getElementById("valorCobranca").value;
        const moedaCobranca = document.getElementById("moedaCobranca").value;
        const idEmpresa = documento.getElementById("empresaFornecedor").value;
        const idDepartamento = usuarioLogado.idDepartamento;

        const dataRealizacao = dataInicioRaw ? new Date(dataInicioRaw).getTime() : null;
        const valor = parseFloat(valorCobrancaRaw.replace(",", "."));

        const contrato = {
            nomeServico: nomeServico,
            descricao: descricao,
            dataRealizacao: dataRealizacao ? new Date(dataRealizacao).toISOString() : null,
            statusContrato: true,
            tempoContrato: duracaoContrato,
            valor: valor,
            nomeMoeda: moedaCobranca,
            idDepartamento: idDepartamento,
            idEmpresa: idEmpresa
        };

        const response = await fetch(API_BASE_CONTRATO, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contrato)
        });

        if (!response.ok) throw new Error("Erro ao cadastrar contrato.");

        const dadosContrato = await response.json();
        showModal(`Contrato cadastrado com sucesso! ID: ${dadosContrato.id}`, "success");

        limparFormulario();
    } catch (error) {
        console.error(error);
        showModal("Falha ao cadastrar o contrato. Veja o console para detalhes.", "error");
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
