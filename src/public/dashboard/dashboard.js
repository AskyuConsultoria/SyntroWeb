async function ContagemKpiNotas() {
    try {
        const responseNaoIniciada = await fetch('/syntro/nota-fiscal/status/1');
        const dataNaoIniciada = await responseNaoIniciada.json()
        const countNaoIniciada = dataNaoIniciada.length;
        document.getElementById('nao-iniciada').textContent = countNaoIniciada;

        const responseEmAndamento = await fetch('/syntro/nota-fiscal/status/2');
        const dataEmAndamento = await responseEmAndamento.json();
        const countEmAndamento = dataEmAndamento.length;
        document.getElementById('em-andamento').textContent = countEmAndamento;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

window.addEventListener('load', ContagemKpiNotas);