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


async function carregarPicksIA(){

 const hoje = new Date().toISOString().slice(0,10);

 const response = await fetch(`${API_BASE}/api/picks-ia?date=${hoje}`);

 const data = await response.json();

 const container = document.getElementById("picksIA");

 container.innerHTML = "";

 if (!data.picks || data.picks.length === 0) {
  container.innerHTML = "<p>Nenhuma pick encontrada hoje.</p>";
  return;
 }

 if(!data.picks || data.picks.length === 0){
 container.innerHTML = "<p>Nenhuma aposta encontrada hoje.</p>";
 return;
}

  container.innerHTML += `
   <div class="pickIA">

    <h3>${pick.jogo}</h3>

    <p><b>Liga:</b> ${pick.liga}</p>

    <p><b>Mercado:</b> ${pick.mercado}</p>

    <p><b>Odd:</b> ${pick.odd}</p>

    <p><b>Probabilidade:</b> ${pick.probModelo}%</p>

    <p><b>EV:</b> ${pick.ev}%</p>

    <p><b>Rating:</b> ${pick.rating}</p>

   </div>
  `;

 });

}
async function carregarApostasDoDia(){

 const hoje = new Date().toISOString().split("T")[0];

 const res = await fetch(`${API_BASE}/api/apostas-do-dia?date=${hoje}`);

 const data = await res.json();

 const container = document.getElementById("top-apostas");

 container.innerHTML = "";

 if(!data.picks || data.picks.length === 0){
  container.innerHTML = "<p>Nenhuma aposta encontrada hoje.</p>";
  return;
 }

 data.picks.forEach(pick => {

  const card = document.createElement("div");

  card.className = "card-aposta";

  card.innerHTML = `
   <h3>${pick.jogo}</h3>
   <p><b>Mercado:</b> ${pick.mercado}</p>
   <p><b>Odd:</b> ${pick.odd}</p>
   <p><b>Probabilidade:</b> ${pick.probModelo}%</p>
   <p><b>EV:</b> ${pick.ev}%</p>
  `;

  container.appendChild(card);

 });

}

async function carregarTopApostas(){

 const res = await fetch(
  "https://keen-grace-production.up.railway.app/api/top-apostas"
 );

 const data = await res.json();

 const div = document.getElementById("top-apostas");

 div.innerHTML = "";

 if(data.total === 0){

  div.innerHTML = `
  <p>Nenhuma oportunidade encontrada hoje</p>
  `;

  return;
 }

 data.picks.forEach(p=>{

  div.innerHTML += `
  <div class="cardPick">

  <h3>${p.home} x ${p.away}</h3>

  <p>Mercado: ${p.market}</p>

  <p>Odd: ${p.odd}</p>

  <p>Probabilidade: ${(p.probModelo).toFixed(1)}%</p>

  <p>Value: ${(p.edge*100).toFixed(2)}%</p>

  <p>Score: ${p.traderScore.toFixed(2)}</p>

  </div>
  `;

 });

}

// Atualiza ao abrir
carregarJogos();
carregarPicksIA();
carregarApostasDoDia();

// Atualiza a cada 60s
setInterval(carregarJogos, 60000);
setInterval(carregarPicksIA, 60000);
setInterval(carregarApostasDoDia, 60000);
