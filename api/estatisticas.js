export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const { fixture } = req.query;

    if (!fixture) {
      return res.status(400).json({ error: "Fixture ID obrigatório." });
    }

    const API_KEY = process.env.API_FOOTBALL_KEY;

    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures/statistics?fixture=${fixture}`,
      {
        headers: {
          "x-apisports-key": API_KEY,
        },
      }
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar estatísticas." });
  }
}
