const fetch = require("node-fetch");

const API_KEY = "3f052ff910b32e4aefa8fe5fd1063387";

module.exports = async (req, res) => {
  const { team, league, season } = req.query;

  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/teams/statistics?team=${team}&league=${league}&season=${season}`,
      { headers: { "x-apisports-key": API_KEY } }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
