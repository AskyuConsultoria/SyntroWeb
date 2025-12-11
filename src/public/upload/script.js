document.addEventListener('DOMContentLoaded', () => {

    const buttons = document.querySelectorAll('.btn-action');
    const cancelButton = buttons[0];
    const sendButton = buttons[1];

    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const inputPDFButton = document.getElementById('inputPDFButton');

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = '#0d6efd';
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.style.borderColor = '#ccc';
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = '#ccc';
        if (e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            showModal(`Arquivo selecionado: ${fileInput.files[0].name}`, "success");
        }
    });

    //inputPDFButton.addEventListener('click', () => fileInput.click());

    cancelButton.addEventListener('click', () => {
        fileInput.value = '';
        showModal('Seleção de arquivo cancelada!', "error");
    });

    sendButton.addEventListener('click', async () => {
        const file = fileInput.files[0];
        const url = `http://localhost:8080/syntro/nota-fiscal/upload-multiple?idUsuario=${JSON.parse(sessionStorage.getItem("usuarioLogado")).id}`;

        if (!file) {
            showModal('Selecione um arquivo primeiro!', "error");
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'application/zip', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            showModal('Tipo de arquivo não suportado! Use .jpg, .pdf ou .zip.', "error");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Erro na requisição');

            const result = await response.json();
            showModal('Upload realizado com sucesso!', "success");
            console.log('Sucesso:', result);
            fileInput.value = '';
            
            if(result) setTimeout(()=> window.location.href="/visualizacao", "2000")

        } catch (error) {
            showModal('Erro ao enviar o arquivo!', "error");
            console.error('Erro:', error);
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const dropzone = document.getElementById("dropzone");
    const fileInput = document.getElementById("fileInput");
    const inputPDFButton = document.getElementById("inputPDFButton");
    const dropzoneContent = document.getElementById("dropzoneContent");
    const divider = document.querySelector(".divider");
    const fileList = document.getElementById("fileList");

    let selectedFiles = [];

    function refreshPreview() {
        fileList.innerHTML = "";

        selectedFiles.forEach((file, index) => {
            const fileItem = document.createElement("div");
            fileItem.classList.add("file-item");

            const img = document.createElement("img");

            if (file.type.startsWith("image/")) {
                img.src = URL.createObjectURL(file);
            } else if (file.type === "application/pdf") {
                img.src = "/assets/icons/pdf.png";
            } else if (file.type.includes("zip")) {
                img.src = "/assets/icons/zip.png";
            } else {
                img.src = "/assets/icons/file.png";
            }

            const name = document.createElement("span");
            name.textContent =
                file.name.length > 12 ? file.name.substring(0, 12) + "…" : file.name;

            const removeBtn = document.createElement("button");
            removeBtn.classList.add("remove-btn");
            removeBtn.textContent = "×";
            removeBtn.onclick = () => {
                selectedFiles.splice(index, 1);
                refreshPreview();

                if (selectedFiles.length === 0) {
                    dropzoneContent.style.display = "flex";
                    divider.style.display = "flex";
                    inputPDFButton.textContent = "Escolha um arquivo";
                }
            };

            fileItem.appendChild(img);
            fileItem.appendChild(name);
            fileItem.appendChild(removeBtn);

            fileList.appendChild(fileItem);
        });
    }

    function handleFileAdd(file) {
        selectedFiles.push(file);
        dropzoneContent.style.display = "none";
        divider.style.display = "none";
        inputPDFButton.textContent = "Escolher outro arquivo";

        refreshPreview();
    }

    fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0) {
            handleFileAdd(fileInput.files[0]);
        }
    });

    dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.style.borderColor = "#0d6efd";
    });

    dropzone.addEventListener("dragleave", () => {
        dropzone.style.borderColor = "#ccc";
    });

    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.style.borderColor = "#ccc";

        if (e.dataTransfer.files.length > 0) {
            handleFileAdd(e.dataTransfer.files[0]);
        }
    });

    inputPDFButton.addEventListener("click", () => fileInput.click());
});

