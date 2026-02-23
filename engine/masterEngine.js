const MasterEngine = {

    calculateMomentum(match){

        const elapsed = match.fixture?.status?.elapsed || 0;

        const shots = match.events?.length || 0;

        return Math.min(100,
            (elapsed * 0.5) +
            (shots * 8)
        );
    },

    zebraDetector(match){

        const score = match.analysis?.score || 50;

        if(score > 85) return "Muito Seguro";
        if(score > 70) return "Seguro";
        if(score > 55) return "Moderado";

        return "Risco Alto";
    },

    probabilityModel(match){

        const attack = match.homeAttack || 50;
        const defense = match.awayDefense || 50;

        const base = (attack * 0.6) + (defense * 0.4);

        return Math.min(95, base);
    }

};

module.exports = MasterEngine;
