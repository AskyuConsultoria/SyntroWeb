async function logar() {
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const resposta = await fetch('/syntro/user/login', {
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
      window.location.href = "/upload";
    } else {
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
