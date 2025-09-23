async function logar() {
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        try {
          const resposta = await fetch('https://localhost:8080/syntro/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              senha: senha
            })
          });

          if (resposta.ok) {
            const dados = await resposta.json();
            sessionStorage.setItem("usuarioLogado", JSON.stringify(dados));
            window.location.href = "upload.html";
          } else {
            // const msg = await resposta.text();
            // erroLogin.textContent = "Falha no login: " + msg;
            // erroLogin.style.display = "block";
          }
        } catch (erro) {
          erro.textContent = "Erro ao conectar ao servidor.";
          erro.style.display = "block";
        }
}