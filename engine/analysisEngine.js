const calculateScore = (data) => {

    const formWeight = 0.35;
    const leagueWeight = 0.20;
    const attackWeight = 0.20;
    const defenseWeight = 0.15;
    const homeWeight = 0.10;

    const score =
        (data.recentForm * formWeight) +
        (data.leagueStrength * leagueWeight) +
        (data.attackPower * attackWeight) +
        (data.defensePower * defenseWeight) +
        (data.homeFactor * homeWeight);

    return Math.min(100, Math.max(0, score));
};

module.exports = { calculateScore };
