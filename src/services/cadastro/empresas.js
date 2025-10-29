// Cadastrar empresa
async function cadastrarEmpresa(empresa) {
    const response = await fetch("/syntro/controller/empresas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empresa)
    });
    return await response.json();
}

// Listar todas as empresas
async function listarEmpresas() {
    const response = await fetch("/syntro/controller/empresas");
    return await response.json();
}

// Buscar empresa por ID
async function buscarEmpresaPorId(id) {
    const response = await fetch(`/syntro/controller/empresas/${id}`);
    if (!response.ok) return null;
    return await response.json();
}

// Editar empresa
async function editarEmpresa(id, dadosAtualizados) {
    const response = await fetch(`/syntro/controller/empresas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAtualizados)
    });
    if (!response.ok) return null;
    return await response.json();
}

// Deletar empresa
async function deletarEmpresa(id) {
    const response = await fetch(`/syntro/controller/empresas/${id}`, { method: "DELETE" });
    return response.ok;
}
