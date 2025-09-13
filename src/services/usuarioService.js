import apiFetch from "./api.js";


const usuarioService = {
    login: async (login, password)  => {
        return await apiFetch("/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ login, password }),
        });
    },
};

export default usuarioService;