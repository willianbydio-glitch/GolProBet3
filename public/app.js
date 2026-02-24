function mostrarAba(aba){

    document.getElementById("jogosHoje").style.display =
        aba === "hoje" ? "block" : "none";

    document.getElementById("jogosLive").style.display =
        aba === "live" ? "block" : "none";
}

/* ===============================
JOGOS HOJE
=============================== */

async function carregarJogos(){

    const hoje = new Date().toISOString().split("T")[0];

    const response = await fetch(`/api/jogos?date=${hoje}`);
    const data = await response.json();

    const container = document.getElementById("jogosHoje");

    container.innerHTML = "<h2>📅 Jogos Hoje</h2>";

    if(!data.games) return;

    data.games.forEach(game=>{

        const master = game.masterEdition || {};

        container.innerHTML += `
        <div class="jogo">

            <h3>
                ${game.teams?.home?.name || ""}
                ${game.goals?.home ?? 0}
                x
                ${game.goals?.away ?? 0}
                ${game.teams?.away?.name || ""}
            </h3>

            <div class="status">
                ${game.fixture?.status?.long || ""}
            </div>

            <div class="analise">

                <p>⚡ Momentum: ${master.momentum?.toFixed(1) || 0}</p>
                <p>🎯 Probabilidade: ${master.probability?.toFixed(1) || 0}%</p>
                <p>🧠 Status AI: ${master.zebra || ""}</p>

            </div>

        </div>
        `;
    });
}

/* ===============================
JOGOS AO VIVO
=============================== */

async function carregarJogosLive(){

    const response = await fetch(`/api/jogos?live=all`);
    const data = await response.json();

    const container = document.getElementById("jogosLive");

    container.innerHTML = "<h2>🔴 Jogos Ao Vivo</h2>";

    if(!data.games) return;

    data.games.forEach(game=>{

        if(game.fixture?.status?.short === "FT") return;

        const master = game.masterEdition || {};

        container.innerHTML += `
        <div class="jogo">

            <h3>
                🔴 ${game.teams?.home?.name || ""}
                ${game.goals?.home ?? 0}
                x
                ${game.goals?.away ?? 0}
                ${game.teams?.away?.name || ""}
            </h3>

            <div class="status">
                ${game.fixture?.status?.long || ""}
            </div>

            <div class="analise">

                <p>⚡ Momentum: ${master.momentum?.toFixed(1) || 0}</p>
                <p>🎯 Probabilidade: ${master.probability?.toFixed(1) || 0}%</p>
                <p>🧠 Status AI: ${master.zebra || ""}</p>

            </div>

        </div>
        `;
    });
}

/* ===============================
AUTO UPDATE
=============================== */

carregarJogos();
carregarJogosLive();

setInterval(()=>{
    carregarJogos();
    carregarJogosLive();
},60000);
