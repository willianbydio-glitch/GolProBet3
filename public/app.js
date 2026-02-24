const API_BASE = "https://golbetpro-backend-production.up.railway.app";
async function carregarJogos() {

  try {

    const hoje = new Date().toISOString().split("T")[0];
    const response = await fetch(`${API_BASE}/api/jogos?date=${hoje}`);
    const data = await response.json();

    const container = document.getElementById("jogos");
    container.innerHTML = "";

    if (!data.response || data.response.length === 0) {
      container.innerHTML = "<p>Nenhum jogo encontrado.</p>";
      return;
    }

    // 🔥 RANKING INTELIGENTE
    const jogosOrdenados = data.response.sort((a, b) => {
      const probA = a.masterEdition?.adaptiveProbability || 0;
      const probB = b.masterEdition?.adaptiveProbability || 0;
      return probB - probA;
    });

    jogosOrdenados.forEach((game, index) => {

      const master = game.masterEdition || {};

      const momentum = master.momentum || 0;
      const probability = master.probability || 0;
      const adaptive = master.adaptiveProbability || 0;

      // 🎯 Classificação Momentum
      let momentumClasse = "momentum-baixo";
      if (momentum > 70) momentumClasse = "momentum-alto";
      else if (momentum > 45) momentumClasse = "momentum-medio";

      // 📊 Classificação Probabilidade
      let probClasse = "fraco";
      if (adaptive >= 75) probClasse = "forte";
      else if (adaptive >= 55) probClasse = "moderado";

      const div = document.createElement("div");
      div.className = "jogo";

      div.innerHTML = `
        <div class="ranking">🏆 Ranking #${index + 1}</div>

        <h3>
          ${game.teams?.home?.name || ""}
          ${game.goals?.home ?? 0}
          x
          ${game.goals?.away ?? 0}
          ${game.teams?.away?.name || ""}
        </h3>

        <div class="status">
          ${game.league?.name || ""} - ${game.fixture?.status?.long || ""}
        </div>

        <hr>

        <p>⚡ Momentum ao Vivo:
          <span class="${momentumClasse}">
            ${momentum.toFixed(1)}%
          </span>
        </p>

        <p>📈 Probabilidade Base:
          ${probability.toFixed(1)}%
        </p>

        <p>🧠 Probabilidade Adaptativa:
          <span class="${probClasse}">
            ${adaptive.toFixed(1)}%
          </span>
        </p>

        <p>🚨 Status Zebra:
          ${master.zebra || "Normal"}
        </p>

      `;

      container.appendChild(div);
    });

  } catch (error) {
    document.getElementById("jogos").innerHTML =
      "<p>Erro ao carregar jogos.</p>";
  }
}

// Atualiza ao abrir
carregarJogos();

// Atualiza a cada 60s
setInterval(carregarJogos, 60000);
