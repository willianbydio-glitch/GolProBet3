export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const { fixture, home, away } = req.query;
    const API_KEY = process.env.API_FOOTBALL_KEY;

    // 🔹 Estatísticas ao vivo
    const statsRes = await fetch(
      `https://v3.football.api-sports.io/fixtures/statistics?fixture=${fixture}`,
      { headers: { "x-apisports-key": API_KEY } }
    );
    const statsData = await statsRes.json();

    // 🔹 Últimos 5 jogos casa
    const homeFormRes = await fetch(
      `https://v3.football.api-sports.io/fixtures?team=${home}&last=5`,
      { headers: { "x-apisports-key": API_KEY } }
    );
    const homeForm = await homeFormRes.json();

    // 🔹 Últimos 5 jogos visitante
    const awayFormRes = await fetch(
      `https://v3.football.api-sports.io/fixtures?team=${away}&last=5`,
      { headers: { "x-apisports-key": API_KEY } }
    );
    const awayForm = await awayFormRes.json();

    // 🔹 H2H
    const h2hRes = await fetch(
      `https://v3.football.api-sports.io/fixtures/headtohead?h2h=${home}-${away}&last=5`,
      { headers: { "x-apisports-key": API_KEY } }
    );
    const h2h = await h2hRes.json();

    res.status(200).json({
      stats: statsData,
      homeForm,
      awayForm,
      h2h
    });

  } catch (error) {
    res.status(500).json({ error: "Erro na análise completa." });
  }
}
