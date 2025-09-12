
const API_BASE_URL = "/syntro"; 

async function apiFetch(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: options.method || "GET",
      headers: options.headers || {},
      body: options.body || null,
    });

    console.log("Chamando:", `${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return response.status !== 204 ? await response.json() : null;
  } catch (error) {
    console.error("Erro no apiFetch:", error);
    throw error;
  }
}

export default apiFetch;
