const fetch = require("node-fetch");

const API_KEY = process.env.API_FOOTBALL_KEY;
const BASE_URL = "https://v3.football.api-sports.io";

module.exports = async function handler(req, res) {
  try {

    if (!API_KEY) {
      return res.status(500).json({
        error: "API key não configurada."
      });
    }

    let endpoint = "/fixtures";

    // ===============================
    // LIVE MODE
    // ===============================

    if (req.query.live === "all") {
      endpoint = "/fixtures?live=all";
    }

    // ===============================
    // DATE MODE
    // ===============================

    else if (req.query.date) {
      endpoint = `/fixtures?date=${req.query.date}`;
    }

    const response = await fetch(
      `${BASE_URL}${endpoint}`,
      {
        headers: {
          "x-apisports-key": API_KEY
        }
      }
    );

    const apiData = await response.json();

    const games = apiData.response || [];

    res.status(200).json({
      success: true,
      games
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
