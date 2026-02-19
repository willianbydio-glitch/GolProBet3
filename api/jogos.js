import fetch from "node-fetch";

const API_KEY = "3f052ff910b32e4aefa8fe5fd1063387";

export default async function handler(req, res) {
  const date = req.query.date || new Date().toISOString().split("T")[0];

  try {
    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?date=${date}`,
      { headers: { "x-apisports-key": API_KEY } }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
