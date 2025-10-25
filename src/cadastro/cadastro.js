// Cadastrar Empresa
async function cadastrar_empresa() {
  const cnpj = document.getElementById('cnpj').value;
  const razaoSocial = document.getElementById('razao-social').value;
  const tipoEmpresa = document.getElementById('tipo-empresa').value;
  const cep = document.getElementById('cep').value;
  const uf = document.getElementById('uf').value;
  const cidade = document.getElementById('cidade').value;
  const bairro = document.getElementById('bairro').value;
  const logradouro = document.getElementById('logradouro').value;
  const complemento = document.getElementById('complemento').value;

  try {
    const resposta = await fetch('https://localhost:8080/syntro/empresa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cnpj,
        razaoSocial,
        tipoEmpresa,
        cep,
        uf,
        cidade,
        bairro,
        logradouro,
        complemento
      })
    });

    if (resposta.ok) {
      const dados = await resposta.json();
      console.log('Empresa cadastrada com sucesso:', dados);
    } else {
      console.error('Erro ao cadastrar empresa:', await resposta.text());
    }
  } catch (erro) {
    console.error('Erro de conexão:', erro);
  }
}


// Cadastrar Emissor
async function cadastrar_emissor() {
  const nome = document.getElementById('nome-emissor').value;
  const paisOrigem = document.getElementById('pais-origem').value;
  const tipoDocumento = document.getElementById('tipo-documento').value;
  const documento = document.getElementById('documento').value;
  const email = document.getElementById('email-emissor').value;
  const empresa = document.getElementById('empresa-fornecedora').value;
  const cargo = document.getElementById('cargo-funcao').value;

  try {
    const resposta = await fetch('https://localhost:8080/syntro/emissor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        paisOrigem,
        tipoDocumento,
        documento,
        email,
        empresa,
        cargo
      })
    });

    if (resposta.ok) {
      const dados = await resposta.json();
      console.log('Emissor cadastrado com sucesso:', dados);
    } else {
      console.error('Erro ao cadastrar emissor:', await resposta.text());
    }
  } catch (erro) {
    console.error('Erro de conexão:', erro);
  }
}


// Cadastrar Serviço
async function cadastrar_servico() {
  const representante = document.getElementById('representante').value;
  const empresa = document.getElementById('empresa-fornecedora').value;
  const cargo = document.getElementById('cargo-funcao').value;
  const nomeServico = document.getElementById('nome-servico').value;
  const dataInicio = document.getElementById('data-inicio').value;
  const frequenciaCobranca = document.getElementById('frequencia-cobranca').value;
  const duracao = document.getElementById('duracao-contrato').value;
  const moeda = document.getElementById('moeda-cobranca').value;
  const valor = document.getElementById('valor-cobranca').value;
  const representanteInterno = document.getElementById('representante-interno').value;
  const descricao = document.getElementById('descricao-servico').value;

  try {
    const resposta = await fetch('https://localhost:8080/syntro/servico', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        representante,
        empresa,
        cargo,
        nomeServico,
        dataInicio,
        frequenciaCobranca,
        duracao,
        moeda,
        valor,
        representanteInterno,
        descricao
      })
    });

    if (resposta.ok) {
      const dados = await resposta.json();
      console.log('Serviço cadastrado com sucesso:', dados);
    } else {
      console.error('Erro ao cadastrar serviço:', await resposta.text());
    }
  } catch (erro) {
    console.error('Erro de conexão:', erro);
  }
}


// Cadastrar Auditor
async function cadastrar_auditor() {
  const nome = document.getElementById('nome-auditor').value;
  const pais = document.getElementById('pais-origem').value;
  const tipoDocumento = document.getElementById('tipo-documento').value;
  const documento = document.getElementById('documento').value;
  const email = document.getElementById('email-representante').value;
  const departamento = document.getElementById('departamento').value;
  const cargo = document.getElementById('cargo-funcao').value;
  const permissionamento = document.getElementById('permissionamento').value;

  try {
    const resposta = await fetch('https://localhost:8080/syntro/auditor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome,
        pais,
        tipoDocumento,
        documento,
        email,
        departamento,
        cargo,
        permissionamento
      })
    });

    if (resposta.ok) {
      const dados = await resposta.json();
      console.log('Auditor cadastrado com sucesso:', dados);
    } else {
      console.error('Erro ao cadastrar auditor:', await resposta.text());
    }
  } catch (erro) {
    console.error('Erro de conexão:', erro);
  }
}

async function carregarEmpresas() {
  try {
    const resposta = await fetch("https://localhost:8080/syntro/empresas");
    if (!resposta.ok) throw new Error("Falha ao buscar empresas.");

    const empresas = await resposta.json();
    const select = document.getElementById("empresa-fornecedora");

    preencherSelect(select, empresas, "idEmpresa", "razaoSocial");
  } catch (erro) {
    console.error("Erro ao carregar empresas:", erro);
  }
}

async function carregarRepresentantes() {
  try {
    const resposta = await fetch("https://localhost:8080/syntro/representantes");
    if (!resposta.ok) throw new Error("Falha ao buscar representantes.");

    const representantes = await resposta.json();
    const select = document.getElementById("representante");

    preencherSelect(select, representantes, "idRepresentante", "nome");
  } catch (erro) {
    console.error("Erro ao carregar representantes:", erro);
  }
}

async function carregarDepartamentos() {
  try {
    const resposta = await fetch("https://localhost:8080/syntro/departamentos");
    if (!resposta.ok) throw new Error("Falha ao buscar departamentos.");

    const departamentos = await resposta.json();
    const select = document.getElementById("departamento");

    preencherSelect(select, departamentos, "idDepartamento", "nome");
  } catch (erro) {
    console.error("Erro ao carregar departamentos:", erro);
  }
}

async function carregarCargos() {
  try {
    const resposta = await fetch("https://localhost:8080/syntro/cargos");
    if (!resposta.ok) throw new Error("Falha ao buscar cargos.");

    const cargos = await resposta.json();
    const select = document.getElementById("cargo-funcao");

    preencherSelect(select, cargos, "idCargo", "nome");
  } catch (erro) {
    console.error("Erro ao carregar cargos:", erro);
  }
}

function preencherSelect(select, lista, campoValor, campoTexto) {
  if (!select) return;

  select.innerHTML = '<option value="">Selecione...</option>';
  lista.forEach(item => {
    const option = document.createElement("option");
    option.value = item[campoValor];
    option.textContent = item[campoTexto];
    select.appendChild(option);
  });
}