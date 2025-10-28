import passwordRecoveryService from "../../services/passwordRecoveryService.js";

const btnEsqueceuSenha = document.querySelector("#btn_esqueceu_senha");
const inputEmail = document.querySelector("#input_email");

btnEsqueceuSenha.addEventListener("click", eventoEnviarEmail)
if(extrairTokenDaURL() != null) substituirElementosParaRedefinicaoDeSenha() 


function substituirElementosParaEnvioDeEmail() {
    const primeiraLinhaEmailEl = document.querySelector("#primeira_linha_email");
    const segundaLinhaEmailEl = document.querySelector("#segunda_linha_email");
    const boxEmailIconEl = document.querySelector("#box_email_icon");
    const div_input_email = document.querySelector("#div_input_email");

    primeiraLinhaEmailEl.innerHTML = "Seu e-mail foi enviado com sucesso!";
    segundaLinhaEmailEl.innerHTML = "Aguarde o recebimento da senha.";
    boxEmailIconEl.innerHTML = "<img src='../../assets/email_icon.svg'>";
    div_input_email.innerHTML = "";
}

function substituirElementosParaRedefinicaoDeSenha() {
    const primeiraLinhaEmailEl = document.querySelector("#primeira_linha_email");
    const segundaLinhaEmailEl = document.querySelector("#segunda_linha_email");
    const boxEmailIconEl = document.querySelector("#box_email_icon");

    primeiraLinhaEmailEl.innerHTML = "Token recebido!"
    segundaLinhaEmailEl.innerHTML = "Redefina sua sua senha agora."
    boxEmailIconEl.innerHTML = ""
    boxEmailIconEl.innerHTML = `
                <form class="form-floating w-100 mb-2" style="width: 100%;">
                <input type="password" class="form-control" id="input_senha" placeholder="name@example.com">
                <label for="floatingInputValue">Senha</label>
                </form>
                <form class="form-floating w-100 mt-2" style="width: 100%;">
                <input type="password" class="form-control" id="input_confirmacao_senha" placeholder="name@example.com">
                <label for="floatingInputValue">Confirmação de Senha</label>
                </form>
                `
    boxEmailIconEl.classList.add("flex-wrap")

  btnEsqueceuSenha.removeEventListener("click", eventoEnviarEmail)
  btnEsqueceuSenha.addEventListener("click", eventoRedefinirSenha)
}


async function eventoEnviarEmail(){
  
    const email = inputEmail.value.trim();

    if (!email) {
        alert("Digite um e-mail válido.");
        return;
    }

    substituirElementosParaEnvioDeEmail();

    try {
        const response = await passwordRecoveryService.esqueceuSenha(email);
        console.log("E-mail de recuperação enviado:", response);
    } catch (error) {
        console.error("Erro ao enviar e-mail de recuperação:", error);
        alert("Ocorreu um erro ao enviar o e-mail. Verifique o console.");
    }
}


async function eventoRedefinirSenha(){
  const senha = document.querySelector("#input_senha").value
  const confirmacaoSenha = document.querySelector("#input_confirmacao_senha").value

  if(senha != confirmacaoSenha) return
  if(extrairTokenDaURL() == null) return alert("Token inválido ou expirado")

  try {
    const response = await passwordRecoveryService.resetarSenha(extrairTokenDaURL(), senha)
    console.log("Reposta da refinição de senha", response)
  } catch (error){
    console.log("Houve um erro na redefinição de senha: ", error)
  }
  
}

function extrairTokenDaURL() {
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams == null || urlParams == undefined) return null
    return urlParams.get("token");
}
