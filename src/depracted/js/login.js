import usuarioService from "../../services/usuarioService.js";

async function entrarEmpresa() {   
        const usuario = document.getElementById('usuario').value;
        const senha = document.getElementById('senha').value;

        try {
          const resposta = await usuarioService.login()
          if (resposta.ok) {
            const dados = await resposta.json();
            sessionStorage.setItem("usuarioLogado", JSON.stringify(dados));
            window.location.href = '/depracted/upload.html';
          } else {
            const msg = await resposta.text();
            erroLogin.textContent = "Falha no login: " + msg;
            erroLogin.style.display = "block";
          }
        } catch (erro) {
          erroLogin.textContent = "Erro ao conectar ao servidor.";
          erroLogin.style.display = "block";
        }
}


async function entrarFornecedor(event) {
        event.preventDefault();
        const cnpj = document.getElementById('cnpj').value;
        const senha = document.getElementById('senha_fornecedor').value;


        try {
          const dados = await usuarioService.login(cnpj, senha)
          console.log("Dados do login: ", dados)
          if (dados != null) {
            sessionStorage.setItem("usuarioLogado", JSON.stringify(dados));
            window.location.href = '/depracted/upload.html';
          } else {
            alert("Ocorreu um erro no Login")
          }
        } catch (erro) {
          console.log("Erro na requisição: ", erro)
        }
}


        // try {
        //   const resposta = await fetch('http://localhost:8080/syntro/usuario/login', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //       email: email,
        //       senha: senha
        //     })
        //   });

        //   if (resposta.ok) {
        //     const dados = await resposta.json();
        //     sessionStorage.setItem("usuarioLogado", JSON.stringify(dados));
        //     window.location.href = "upload.html";
        //   } else {
        //     const msg = await resposta.text();
        //     erroLogin.textContent = "Falha no login: " + msg;
        //     erroLogin.style.display = "block";
        //   }
        // } catch (erro) {
        //   erroLogin.textContent = "Erro ao conectar ao servidor.";
        //   erroLogin.style.display = "block";
        // }


   

    window.transição = transição;
    window.entrarEmpresa = entrarEmpresa;
    window.entrarFornecedor = entrarFornecedor;
    window.loginFornecedor = loginFornecedor;
    window.loginEmpresa = loginEmpresa; 