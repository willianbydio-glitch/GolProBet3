const MasterEngine = require("../engine/masterEngine");
const CacheEngine = require("../engine/cacheEngine");
const AdaptiveEngine = require("../engine/adaptiveEngine");

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

    /* ===============================
    CACHE ENGINE
    =============================== */

    if (CacheEngine.isValid()) {
      return res.status(200).json(CacheEngine.getCache());
    }

    let endpoint = "/fixtures";

    if (req.query.live === "all") {
      endpoint = "/fixtures?live=all";
    }

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

    const games = (apiData.response || []).map(game => {

      try {

        /* ===============================
        MASTER ENGINE
        =============================== */

        const momentum = MasterEngine.calculateMomentum(game);
        const zebra = MasterEngine.zebraDetector(game);
        const probability = MasterEngine.probabilityModel(game);

        game.masterEdition = {
          momentum,
          zebra,
          probability
        };

        /* ===============================
        ADAPTIVE ENGINE
        =============================== */

        const adaptiveProbability =
          AdaptiveEngine.adjustProbability(game);

        game.masterEdition.adaptiveProbability =
          adaptiveProbability;

      } catch (e) {}

      return game;

    });

    const cacheResponse = {
      success: true,
      response: games
    };

    /* ===============================
    SAVE CACHE
    =============================== */

    CacheEngine.setCache(cacheResponse);

    res.status(200).json(cacheResponse);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};
