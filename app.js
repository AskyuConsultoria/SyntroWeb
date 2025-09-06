var express = require("express");
var cors = require("cors");
var path = require("path");
var router = express.Router();
var PORTA = 80;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "src")));

app.use(cors());

app.use("/", 
router.get("/", function (res) {
    res.render("index");
})
);

app.get("/password_recovery", (req, res) => {
  res.sendFile(path.join(__dirname, "src/components/password_recovery/password_recovery.html"));
});


var url = `http://localhost:${PORTA}`

app.listen(PORTA, function () {
    console.log(`O seu site já está na web na url ${url}`);
});