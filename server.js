const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/jogos", require("./api/jogos"));
app.use("/api/estatisticas", require("./api/estatisticas"));
app.use("/api/analise", require("./api/analise"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 GolBetPro Backend rodando na porta " + PORT);
});
