// api/estatisticas.js
const fetch = require("node-fetch");

const API_KEY = "csjzMBVSuCm5M0JKNGm38UIiPX5tTUHuaRa5sSmjzFXKrvR9E0kzcbysmftt";
const BASE_URL = "https://v3.football.api-sports.io";

export default async function handler(req, res) {
  try {
    const team = req.query.team;
    const league = req.query.league;
    const season = req.query.season || 2025; // pode ajustar temporada
    const response = await fetch(`${BASE_URL}/teams/statistics?team=${team}&league=${league}&season=${season}`, {
      method: "GET",
      headers: { "x-apisports-key": API_KEY }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
