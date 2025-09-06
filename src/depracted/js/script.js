async function uploadPDF() {
    const fileInput = document.querySelector('#fileInput');
    const file = fileInput.files[0];
    const url = '/nf/nota-fiscal/upload';

    if (!file) {
        console.log('Selecione um arquivo primeiro!');
        return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        console.log('Sucesso:', result);
    } catch (error) {
        console.error('Erro ao enviar o arquivo:', error);
    }
}
