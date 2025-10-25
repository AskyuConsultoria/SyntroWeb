// Endpoints da API
const API_BASE_EMPRESA = "/syntro/controller/empresas";
const API_BASE_ENDERECO = "/syntro/controller/enderecos";

// Função para cadastrar empresa e retornar o ID
async function cadastrarEmpresa() {
    const nomeServico = document.getElementById("razaoSocial").value;
    const areaAtuacao = document.getElementById("tipoEmpresa").value;
    const identificacaoFiscal = document.getElementById("cnpj").value;

    const empresa = {
        nomeServico,
        areaAtuacao,
        identificacaoFiscal,
        fornecedor: true,       // ou false, conforme necessidade
        subsidiaria: null,
        tipoIdentificacaoFiscal: 1
    };

    try {
        const response = await fetch(API_BASE_EMPRESA, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(empresa)
        });

        if (!response.ok) throw new Error("Erro ao cadastrar a empresa.");

        const dadosEmpresa = await response.json();
        alert(`Empresa cadastrada com sucesso! ID: ${dadosEmpresa.id}`);

        // Após cadastrar empresa, cadastra o endereço vinculado
        await cadastrarEndereco(dadosEmpresa.id);

        limparFormulario();
    } catch (error) {
        console.error(error);
        alert("Falha ao cadastrar a empresa. Veja o console para detalhes.");
    }
}

// Função para cadastrar endereço vinculado à empresa
async function cadastrarEndereco(idEmpresa) {
    const logradouro = document.getElementById("logradouro").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const uf = document.getElementById("uf").value;
    const cepRaw = document.getElementById("cep").value;
    const cep = parseInt(cepRaw.replace(/\D/g, ""), 10); // remove não números

    const endereco = {
        logradouro,
        bairro,
        cidade,
        uf,
        cep,
        complemento: document.getElementById("complemento").value,
        idFornecedor: idEmpresa, // vincula o endereço à empresa
        idUsuario: null           // ou outro ID se necessário
    };

    try {
        const response = await fetch(API_BASE_ENDERECO, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(endereco)
        });

        if (!response.ok) throw new Error("Erro ao cadastrar o endereço.");

        const dadosEndereco = await response.json();
        alert(`Endereço cadastrado com sucesso! ID: ${dadosEndereco.id}`);
    } catch (error) {
        console.error(error);
        alert("Falha ao cadastrar o endereço. Veja o console para detalhes.");
    }
}

// Limpa formulário após cadastro
function limparFormulario() {
    ["razaoSocial", "tipoEmpresa", "cnpj", "logradouro", "bairro", "cidade", "uf", "cep", "complemento"]
        .forEach(id => document.getElementById(id).value = "");
}

// Adiciona listener ao botão de cadastro
document.addEventListener("DOMContentLoaded", () => {
    let botao = document.getElementById("btnCadastrar");
    if (!botao) {
        botao = document.createElement("button");
        botao.id = "btnCadastrar";
        botao.type = "button";
        botao.textContent = "Cadastrar Empresa e Endereço";
        botao.className = "btn btn-primary";
        document.querySelector(".cadastro-form-card").appendChild(botao);
    }
    botao.addEventListener("click", cadastrarEmpresa);
});
