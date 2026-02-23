const fetch = require("node-fetch");

const API_KEY = process.env.API_FOOTBALL_KEY;
const BASE_URL = "https://v3.football.api-sports.io";

module.exports = async function handler(req, res) {
  try {
    if (!API_KEY) {
      return res.status(500).json({ error: "API key não configurada." });
    }

    const team = req.query.team;
    const league = req.query.league;
    const season = req.query.season || 2024;

    if (!team || !league) {
      return res.status(400).json({ error: "Parâmetros 'team' e 'league' são obrigatórios." });
    }

    const response = await fetch(
      `${BASE_URL}/teams/statistics?team=${team}&league=${league}&season=${season}`,
      {
        method: "GET",
        headers: {
          "x-apisports-key": API_KEY
        }
      }
    );

    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
