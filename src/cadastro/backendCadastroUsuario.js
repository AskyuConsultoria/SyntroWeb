const API_BASE_USUARIO = "/syntro/controller/user";

// Função para cadastrar Auditor ou Emissor
async function cadastrarUsuario(tipo) {
    try {
        let nome, email, cargo, departamento, empresa, permissao;

        if(tipo === "auditor") {
            nome = document.getElementById("nomeAuditor").value;
            email = document.getElementById("emailRepresentante").value;
            cargo = document.getElementById("cargoAuditor").value;
            departamento = parseInt(document.getElementById("departamentoAuditor").value);
            empresa = 1; 
            permissao = document.getElementById("permissionamentoAuditor").value;
        } else if(tipo === "emissor") {
            nome = document.getElementById("nomeEmissor").value;
            email = document.getElementById("emailEmissor").value;
            cargo = document.getElementById("cargoEmissor").value;
            departamento = ""; //n sei
            empresa = parseInt(document.getElementById("empresaFornecedora").value);
            permissao = "Emissor";
        }

        // Monta objeto Usuario
        const usuario = {
            nomeCompleto: nome,
            email: email,
            cargo: cargo,
            idDepartamento: departamento,
            idEmpresa: empresa,
            permissao: permissao,
            auditor: tipo === "auditor" ? true : false,
            emissor: tipo === "emissor" ? true : false,
            senha: "123456" // Pode ser alterada ou gerada dinamicamente
        };

        // Chamada POST para cadastro
        const response = await fetch(API_BASE_USUARIO, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });

        if(!response.ok) throw new Error("Erro ao cadastrar usuário");

        const dados = await response.json();
        alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} cadastrado com sucesso! ID: ${dados.id}`);
        limparFormulario(tipo);

    } catch (err) {
        console.error(err);
        alert("Falha ao cadastrar usuário. Veja o console para detalhes.");
    }
}

// Limpa o formulário
function limparFormulario(tipo) {
    const camposAuditor = ["nomeAuditor", "emailRepresentante", "cargoAuditor", "departamentoAuditor", "permissionamentoAuditor", "paisOrigem"];
    const camposEmissor = ["nomeEmissor", "emailEmissor", "cargoEmissor", "empresaFornecedora", "paisOrigem"];

    const campos = tipo === "auditor" ? camposAuditor : camposEmissor;

    campos.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.value = "";
        if(el && el.tagName === "SELECT") el.selectedIndex = 0;
    });
}

// Adiciona listener aos botões
document.addEventListener("DOMContentLoaded", () => {
    const btnAuditor = document.querySelector(".auditor-salvar-btn");
    if(btnAuditor) btnAuditor.addEventListener("click", () => cadastrarUsuario("auditor"));

    const btnEmissor = document.querySelector(".emissor-salvar-btn");
    if(btnEmissor) btnEmissor.addEventListener("click", () => cadastrarUsuario("emissor"));
});
