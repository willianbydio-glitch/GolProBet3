const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/jogos", require("./api/jogos"));
app.use("/api/estatisticas", require("./api/estatisticas"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("GolBetPro Elite Ultra rodando");
});
