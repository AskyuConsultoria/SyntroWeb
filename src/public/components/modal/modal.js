let modalLoaded = false;

async function loadModal() {
    if (modalLoaded) return;

    const html = await fetch("/public/components/modal/modal.html").then(r => r.text());

    document.body.insertAdjacentHTML("beforeend", html);

    setTimeout(() => {
        initializeModal();
    }, 50);

    modalLoaded = true;
}

function initializeModal() {
    window.modalOverlay = document.getElementById("globalModal");
    window.modalMessage = document.getElementById("modalMessage");
    window.modalIcon = document.getElementById("modalIcon");
    window.modalCloseBtn = document.getElementById("modalCloseBtn");

    modalCloseBtn.addEventListener("click", closeModal);
    
    modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) {
            closeModal();
        }
    });
}

function showModal(message, type = "success") {
    // Se ainda não carregou, carrega e chama de novo
    if (!modalLoaded) {
        loadModal().then(() => {
            setTimeout(() => showModal(message, type), 50);
        });
        return;
    }

    // Agora tem certeza que tudo está carregado
    const modalOverlay = document.getElementById("globalModal");
    const modalMessage = document.getElementById("modalMessage");
    const modalIcon = document.getElementById("modalIcon");

    modalMessage.textContent = message;

    if (type === "success") {
        modalIcon.textContent = "✔";
        modalIcon.className = "modal-icon success";
    } else {
        modalIcon.textContent = "✖";
        modalIcon.className = "modal-icon error";
    }

    modalOverlay.classList.remove("hidden");
}


function closeModal() {
    modalOverlay.classList.add("hidden");
}
