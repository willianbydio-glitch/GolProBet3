function mostrarAba(aba){

    document.getElementById("jogosHoje").style.display =
        aba === "hoje" ? "block" : "none";

    document.getElementById("jogosLive").style.display =
        aba === "live" ? "block" : "none";
}

async function carregarJogos(){

    const hoje = new Date().toISOString().split("T")[0];

    const response = await fetch(`/api/jogos?date=${hoje}`);
    const data = await response.json();

    const container = document.getElementById("jogosHoje");

    container.innerHTML = "<h2>📅 Jogos Hoje</h2>";

    if(!data.games) return;

    data.games.forEach(game=>{

        container.innerHTML += `
        <div class="jogo">

            <h3>
                ${game.teams?.home?.name}
                ${game.goals?.home ?? 0}
                x
                ${game.goals?.away ?? 0}
                ${game.teams?.away?.name}
            </h3>

            <div class="status">
                ${game.fixture?.status?.long || ""}
            </div>

        </div>
        `;
    });
}

async function carregarJogosLive(){

    const response = await fetch(`/api/jogos?live=all`);
    const data = await response.json();

    const container = document.getElementById("jogosLive");

    container.innerHTML = "<h2>🔴 Jogos Ao Vivo</h2>";

    if(!data.games) return;

    data.games.forEach(game=>{

        if(game.fixture?.status?.short === "FT") return;

        container.innerHTML += `
        <div class="jogo">

            <h3>
                🔴 ${game.teams?.home?.name}
                ${game.goals?.home ?? 0}
                x
                ${game.goals?.away ?? 0}
                ${game.teams?.away?.name}
            </h3>

            <div class="status">
                ${game.fixture?.status?.long || ""}
            </div>

        </div>
        `;
    });
}

carregarJogos();
carregarJogosLive();

setInterval(()=>{
    carregarJogos();
    carregarJogosLive();
},60000);
