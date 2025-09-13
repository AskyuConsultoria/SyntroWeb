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

app.use('/depracted', express.static(path.join(__dirname, 'src/depracted')));
app.use('/features', express.static(path.join(__dirname, 'src/features')));
app.use('/services', express.static(path.join(__dirname, 'src/services')));

// Rota principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/index.html"));
});

// Rota de recuperação de senha
app.get("/password_recovery", (req, res) => {
    res.sendFile(path.join(__dirname, "src/features/password_recovery/password_recovery.html"));
});

app.get("/upload.html", (req, res) => {
    res.sendFile(path.join(__dirname, "src/depracted/upload.html"));
});




// Iniciar servidor
app.listen(PORTA, () => {
    console.log(`O seu site já está na web na url http://localhost:${PORTA}`);
});
 