// api/jogos.js
const fetch = require("node-fetch");

const API_KEY = "csjzMBVSuCm5M0JKNGm38UIiPX5tTUHuaRa5sSmjzFXKrvR9E0kzcbysmftt";
const BASE_URL = "https://v3.football.api-sports.io";

export default async function handler(req, res) {
  try {
    const date = req.query.date;
    const response = await fetch(`${BASE_URL}/fixtures?date=${date}`, {
      method: "GET",
      headers: { "x-apisports-key": API_KEY }
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
