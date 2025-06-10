async function entrarEmpresa(event) {
    event.preventDefault();

        const usuario = document.getElementById('usuario').value;
        const senha = document.getElementById('senha').value;

        alert("sucesso")
        window.location.href = "chamados.html";

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
}
async function entrarFornecedor(event) {
    event.preventDefault();

        const cnpj = document.getElementById('cnpj').value;
        const senha = document.getElementById('senha_fornecedor').value;

        alert("sucesso")
        window.location.href = "upload.html";
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
}