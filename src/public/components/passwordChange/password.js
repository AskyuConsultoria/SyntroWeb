let modalLoadedP = false;

async function loadModalP() {
    if (modalLoadedP) return;

    const html = await fetch("/public/components/passwordChange/password.html").then(r => r.text());

    document.body.insertAdjacentHTML("beforeend", html);

    setTimeout(() => {
        initializeModalP();
    }, 50);

    modalLoadedP = true;
}

function initializeModalP() {
    window.modalOverlayP = document.getElementById("globalModalP");
    window.modalCloseBtnP = document.getElementById("modalCloseBtnP");
    window.modalFinishBtn = document.getElementById("modalFinishBtn");
    window.SenhaAntiga = document.getElementById("SenhaAntiga");
    window.NovaSenha = document.getElementById("NovaSenha");

    modalCloseBtnP.addEventListener("click", closeModalP);

    modalFinishBtn.addEventListener("click", () => {
        const autentificado = autentificar(SenhaAntiga.value)
        if(autentificado){
        const newPassword = NovaSenha.value;
        mudarsenha(newPassword);
        closeModalP();
        showModal("Senha alterada com sucesso!", "success");
        setTimeout(() => {
            window.location.href = "/";
        }, 2000);
    } else{
        showModal("Senha antiga incorreta!", "error");
    }
    });
    
    modalOverlayP.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            closeModalP();
        }
    });
}

function showPasswordChanger() {
    if (!modalLoadedP) {
        loadModalP().then(() => {
            setTimeout(() => showPasswordChanger(), 50);
        });
        return;
    }

    // Agora tem certeza que tudo está carregado
    const modalOverlayP = document.getElementById("globalModalP");

    modalOverlayP.classList.remove("hidden");
}


function closeModalP() {
    modalOverlayP.classList.add("hidden");
}

async function autentificar(senha){
    var usuario = sessionStorage.getItem("usuarioLogado");
    email = JSON.parse(usuario).email;
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
        return true;
    } else {
        return false;
    }
}

function mudarsenha(novaSenha){
    var usuario = sessionStorage.getItem("usuarioLogado");
    id = JSON.parse(usuario).id;
    fetch(`http://localhost:8080/syntro/user/${id}?novaSenha=${novaSenha}`, {
      method: 'PUT'
    });
}