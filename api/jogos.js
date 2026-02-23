const fetch = require("node-fetch");

const API_KEY = process.env.API_FOOTBALL_KEY;
const BASE_URL = "https://v3.football.api-sports.io";

module.exports = async function handler(req, res) {
  try {
    if (!API_KEY) {
      return res.status(500).json({ error: "API key não configurada." });
    }

    const date = req.query.date;

    if (!date) {
      return res.status(400).json({ error: "Parâmetro 'date' é obrigatório." });
    }

    const response = await fetch(`${BASE_URL}/fixtures?date=${date}`, {
      method: "GET",
      headers: {
        "x-apisports-key": API_KEY
      }
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
