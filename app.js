const express = require("express");
const cors = require("cors");
const path = require("path");

const PORTA = 3333;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(path.join(__dirname, "src")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/index.html"));
});

app.get("/password_recovery", (req, res) => {
    res.sendFile(path.join(__dirname, "src/public/password_recovery/password_recovery.html"));
});

app.get("/upload", (req, res) => {
    res.sendFile(path.join(__dirname, "src/public/upload/upload.html"));
});

app.get("/visualizacao", (req, res) => {
    res.sendFile(path.join(__dirname, "src/public/fornecedor/visualizacao.html"));
});

app.get("/empresas", (req, res) => {
    res.sendFile(path.join(__dirname, "src/public/empresas/lista_empresas.html"));
});

app.get("/servicos", (req, res) => {
    res.sendFile(path.join(__dirname, "src/public/servicos/servicos.html"));
});

app.get("/individual", (req, res) => {
    res.sendFile(path.join(__dirname, "src/public/fornecedor/individual.html"));
});

app.get("/permissionamento", (req, res) => {
    res.sendFile(path.join(__dirname, "src/public/permissionamento/acesso.html"));
});

app.get("/cadastros/:pagina", (req, res) => {
    const pagina = req.params.pagina;
    res.sendFile(path.join(__dirname, `src/public/cadastros/cadastros-${pagina}.html`));
});

app.get("/cadastros/departamentos/detalhes", (req, res) => {
    res.sendFile(path.join(__dirname, "src/public/cadastros/cadastros-departamentos-details.html"));
});


app.listen(PORTA, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORTA}`);
});
