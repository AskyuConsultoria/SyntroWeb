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
            alert(`Arquivo selecionado: ${fileInput.files[0].name}`);
        }
    });

    inputPDFButton.addEventListener('click', () => fileInput.click());

    cancelButton.addEventListener('click', () => {
        fileInput.value = '';
        alert('Seleção de arquivo cancelada!');
    });

    sendButton.addEventListener('click', async () => {
        const file = fileInput.files[0];
        const url = `/syntro/nota-fiscal/upload?idUsuario=${JSON.parse(sessionStorage.getItem("usuarioLogado")).id}`;

        if (!file) {
            alert('Selecione um arquivo primeiro!');
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'application/zip', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            alert('Tipo de arquivo não suportado! Use .jpg, .pdf ou .zip.');
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
            alert('Upload sendo processado com sucesso!');
            console.log('Sucesso:', result);

            uploadChecker(result);

            fileInput.value = '';
        } catch (error) {
            alert('Erro ao enviar o arquivo!');
            console.error('Erro:', error);
        }
    });
});

async function uploadChecker(key) {
    //Começar o loading spinner aqui
    try {
        while (true) {
            await new Promise(resolve => setTimeout(resolve, 5000)); // Espera 5s
            
            const response = await fetch(`/syntro/temp/${key}`, {
                method: 'GET',
            });

            if (response.status === 404) {
                alert('Upload Concluído!');
                break;
            }
        }
    } catch (error) {
        alert('Não foi possível verificar o upload!');
        console.error('Erro:', error);
    }
    //Parar o loading spinner aqui
}
