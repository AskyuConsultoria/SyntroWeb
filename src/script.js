document.addEventListener('DOMContentLoaded', () => {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const inputPDFButton = document.getElementById('inputPDFButton');
    const cancelButton = document.querySelector('.btn-action:nth-child(2)');
    const sendButton = document.querySelector('.btn-action:nth-child(3)');

    dropzone.addEventListener('click', () => fileInput.click());

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
        const url = '/nf/nota-fiscal/upload';

        if (!file) {
            alert('Selecione um arquivo primeiro!');
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'application/zip'];
        if (!allowedTypes.includes(file.type)) {
            alert('Tipo de arquivo não suportado! Use .jpg, .png, .svg ou .zip.');
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
            alert('Upload realizado com sucesso!');
            console.log('Sucesso:', result);

            fileInput.value = '';
        } catch (error) {
            alert('Erro ao enviar o arquivo!');
            console.error('Erro:', error);
        }
    });
});
