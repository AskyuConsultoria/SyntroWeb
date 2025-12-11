async function logar() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const resposta = await fetch('http://localhost:8080/syntro/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: email,
        password: senha
      })
    });

    if (resposta.ok) {
      const dados = await resposta.json();
      sessionStorage.setItem("usuarioLogado", JSON.stringify(dados));
      showModal("Login realizado com sucesso!", "success");
      setTimeout(() => {
        window.location.href = "/upload";
      }, 2000);
    } else {
      showModal('Falha no login !', "error");
      // const msg = await resposta.text();
      // erroLogin.textContent = "Falha no login: " + msg;
      // erroLogin.style.display = "block";
    }
  } catch (erro) {
    const erroLogin = document.getElementById('erroLogin');
    if (erroLogin) {
      erroLogin.textContent = "Erro ao conectar ao servidor.";
      erroLogin.style.display = "block";
    }
  }
}
