async function cadastrar_empresa() {
        const cnpj = document.getElementById('email').value;
        const razao  = document.getElementById('razao').value;
        const tipo  = document.getElementById('tipo').value;
        const bairro  = document.getElementById('bairro').value;
        const cidade  = document.getElementById('cidade').value;
        const uf  = document.getElementById('uf').value;
        const cep  = document.getElementById('cep').value;
        const logradouro  = document.getElementById('logradouro').value;
        const complemento  = document.getElementById('complemento').value;

        try {
          const resposta = await fetch('https://localhost:8080/syntro/empresa', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cnpj: cnpj,
                razaoSocial: razao,
                tipoEmpresa: tipo,
                bairro: bairro,
                cidade: cidade,
                uf: uf,
                cep: cep,
                logradouro: logradouro,
                complemento: complemento
            })
          });

          if (resposta.ok) {
            const dados = await resposta.json();

          } else {
            const msg = await resposta.text();
            //erroLogin.textContent = "Falha no login: " + msg;
            //erroLogin.style.display = "block";
          }
        } catch (erro) {
          erro.textContent = "Erro ao conectar ao servidor.";
          erro.style.display = "block";
        }
}

async function cadastrar_emissor() {
        const nome = document.getElementById('email').value;
        const pais  = document.getElementById('pais').value;
        const tipoDocumento  = document.getElementById('tipoDocumento').value;
        const documento  = document.getElementById('documento').value;
        const email  = document.getElementById('email').value;
        const empresa  = document.getElementById('empresa').value;
        const cargo  = document.getElementById('cargo').value;

        try {
          const resposta = await fetch('https://localhost:8080/syntro/fornecedor', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                pais: pais,
                tipoDocumento: tipoDocumento,
                documento: documento,
                email: email,
                empresa: empresa,
                cargo: cargo
            })
          });

          if (resposta.ok) {
            const dados = await resposta.json();

          } else {
            const msg = await resposta.text();
            //erroLogin.textContent = "Falha no login: " + msg;
            //erroLogin.style.display = "block";
          }
        } catch (erro) {
          erro.textContent = "Erro ao conectar ao servidor.";
          erro.style.display = "block";
        }
}

async function cadastrar_servico() {
        const nome = document.getElementById('email').value;
        const empresa  = document.getElementById('empresa').value;
        const cargo  = document.getElementById('cargo').value;
        const nomeServico  = document.getElementById('nomeServico').value;
        const dataInicio  = document.getElementById('dataInicio').value;
        const FrquenciaCobranca  = document.getElementById('FrquenciaCobranca').value;
        const duracao  = document.getElementById('duracao').value;
        const moeda  = document.getElementById('moeda').value;
        const valor  = document.getElementById('valor').value;
        const representante  = document.getElementById('representante').value;
        const descricao  = document.getElementById('descricao').value;

        try {
          const resposta = await fetch('https://localhost:8080/syntro/servico', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                empresa: empresa,
                cargo: cargo,
                nomeServico: nomeServico,
                dataInicio: dataInicio,
                FrquenciaCobranca: FrquenciaCobranca,
                duracao: duracao,
                moeda: moeda,
                valor: valor,
                representante: representante,
                descricao: descricao
            })
          });

          if (resposta.ok) {
            const dados = await resposta.json();

          } else {
            const msg = await resposta.text();
            //erroLogin.textContent = "Falha no login: " + msg;
            //erroLogin.style.display = "block";
          }
        } catch (erro) {
          erro.textContent = "Erro ao conectar ao servidor.";
          erro.style.display = "block";
        }
}

async function cadastrar_auditor() {
        const nome = document.getElementById('nome').value;
        const pais  = document.getElementById('pais').value;
        const tipoDocumento  = document.getElementById('tipoDocumento').value;
        const documento  = document.getElementById('documento').value;
        const email  = document.getElementById('email').value;
        const departamento  = document.getElementById('departamento').value;
        const cargo  = document.getElementById('cargo').value;
        const permissionamento  = document.getElementById('permissionamento').value;

        try {
          const resposta = await fetch('https://localhost:8080/syntro/servico', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                pais: pais,
                tipoDocumento: tipoDocumento,
                documento: documento,
                email: email,
                departamento: departamento,
                cargo: cargo,
                permissionamento: permissionamento
            })
          });

          if (resposta.ok) {
            const dados = await resposta.json();

          } else {
            const msg = await resposta.text();
            //erroLogin.textContent = "Falha no login: " + msg;
            //erroLogin.style.display = "block";
          }
        } catch (erro) {
          erro.textContent = "Erro ao conectar ao servidor.";
          erro.style.display = "block";
        }
}