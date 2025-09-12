const express = require("express");
const cors = require("cors");
const path = require("path");

const PORTA = 3333;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, "src")));

// Rota principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/index.html"));
});

// Rota de recuperação de senha
app.get("/password_recovery", (req, res) => {
    res.sendFile(path.join(__dirname, "src/features/password_recovery/password_recovery.html"));
});

// Iniciar servidor
app.listen(PORTA, () => {
    console.log(`O seu site já está na web na url http://localhost:${PORTA}`);
});
