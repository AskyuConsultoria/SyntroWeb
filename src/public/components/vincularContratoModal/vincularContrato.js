let modalLoadedV = false;

async function loadModalV() {
    if (modalLoadedV) return;

    const html = await fetch("/public/components/vincularContratoModal/vincularContrato.html").then(r => r.text());

    document.body.insertAdjacentHTML("beforeend", html);

    setTimeout(() => {
        initializeModalV();
    }, 50);

    modalLoadedV = true;
}

function initializeModalV() {
    window.modalOverlayV = document.getElementById("globalModalV");
    window.modalCloseBtnV = document.getElementById("modalCloseBtnV");
    window.modalFinishBtnV = document.getElementById("modalFinishBtnV");
    window.contratoSelect = document.getElementById("contratosSelect");

    carregarContratos()

    modalCloseBtnV.addEventListener("click", closeModalV);

    modalFinishBtnV.addEventListener("click", () => {
        const idNota = sessionStorage.getItem("NF-ID");
        vincularContrato(idNota, contratoSelect.value);
        closeModalV();
        showModal("Contrato Vinculado com sucesso", "success");
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    });
    
    modalOverlayV.addEventListener("click", (event) => {
        if (event.target === modalOverlayV) {
            closeModalV();
        }
    });
}

function showVincularContrato() {
    if (!modalLoadedV) {
        loadModalV().then(() => {
            setTimeout(() => showVincularContrato(), 50);
        });
        return;
    }

    // Agora tem certeza que tudo está carregado
    const modalOverlayV = document.getElementById("globalModalV");

    modalOverlayV.classList.remove("hidden");
}


function closeModalV() {
    modalOverlayV.classList.add("hidden");
}

async function carregarContratos() {
    try {
        const response = await fetch("http://localhost:8080/syntro/contrato/contratos");
        if (!response.ok) {
            throw new Error("Erro ao buscar contratos");
        }
        const contratos = await response.json();
        const contratosValidos = contratos.filter(contrato => {
            if (!contrato.dataRealizacao || !contrato.tempoContrato) return false;
            const dataRealizacao = new Date(contrato.dataRealizacao);
            const meses = parseInt(contrato.tempoContrato);
            const dataFim = new Date(dataRealizacao);
            dataFim.setMonth(dataFim.getMonth() + meses);
            const hoje = new Date();
            return dataFim >= hoje;
        });

        const select = document.getElementById("contratosSelect");
        select.innerHTML = `<option value="">Selecione um contrato</option>`;

        contratosValidos.forEach(contrato => {
            const option = document.createElement("option");
            option.value = contrato.id;
            option.textContent = contrato.nomeServico || "Sem nome";
            select.appendChild(option);
        });

    } catch (error) {
        console.error("Erro ao carregar contratos:", error);
    }
}

async function vincularContrato(idNota, idContrato) {
    try {
        const response = await fetch(`http://localhost:8080/syntro/nota-fiscal/${idNota}?idContrato=${idContrato}`, {
            method: "PUT"
        });

        if (!response.ok) {
            throw new Error("Erro ao vincular contrato");
        }

        const resultado = await response.json();
        console.log("Contrato vinculado com sucesso:", resultado);
    } catch (error) {
        console.error(error);
        showModal("Erro ao vincular contrato.");
    }
}
