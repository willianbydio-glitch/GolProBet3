const predictMatch = (stats) => {

    const scoreHome = stats.homeAttack + stats.homeDefense;
    const scoreAway = stats.awayAttack + stats.awayDefense;

    let result;

    if (scoreHome > scoreAway + 8) result = "Casa Vence";
    else if (scoreAway > scoreHome + 8) result = "Fora Vence";
    else result = "Empate";

    return result;
};

module.exports = { predictMatch };
