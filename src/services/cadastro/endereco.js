const API_BASE_ENDERECO = "/syntro/controller/enderecos";

// Cadastrar
async function cadastrarEndereco(endereco) {
    const response = await fetch(API_BASE_ENDERECO, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(endereco)
    });
    return await response.json();
}

// Listar todos
async function listarEnderecos() {
    const response = await fetch(API_BASE_ENDERECO);
    return await response.json();
}

// Buscar por ID
async function buscarEnderecoPorId(id) {
    const response = await fetch(`${API_BASE_ENDERECO}/${id}`);
    if (!response.ok) return null;
    return await response.json();
}

// Editar
async function editarEndereco(id, dadosAtualizados) {
    const response = await fetch(`${API_BASE_ENDERECO}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosAtualizados)
    });
    if (!response.ok) return null;
    return await response.json();
}

// Deletar
async function deletarEndereco(id) {
    const response = await fetch(`${API_BASE_ENDERECO}/${id}`, { method: "DELETE" });
    return response.ok;
}
