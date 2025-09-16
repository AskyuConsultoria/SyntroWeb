import apiFetch from "../services/api.js";

const passwordRecoveryService = {
  esqueceuSenha: async (email) => {
    console.log("Email enviado ao service:", email);
    return await apiFetch("/user/esqueceu-senha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  },

  resetarSenha: async (token, novaSenha) => {
    return await apiFetch("/user/resetar-senha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, novaSenha }),
    });
  },
};

export default passwordRecoveryService;
