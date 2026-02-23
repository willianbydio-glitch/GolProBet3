const EliteUltraEngine = {

    adaptiveLeagueRank: {},

    calculateZebraRisk(match){

        const score = match.analysis?.score || 50;

        if(score >= 80) return 5;
        if(score >= 65) return 3;
        if(score >= 50) return 2;

        return 1;
    },

    cashoutHunter(match){

        const score = match.analysis?.score || 50;

        if(score >= 85) return "💰 Cashout seguro sugerido";
        if(score >= 70) return "⚠️ Monitorar jogo";
        return "❌ Não recomendado cashout";
    },

    updateLeagueLearning(leagueId, score){

        if(!this.adaptiveLeagueRank[leagueId]){
            this.adaptiveLeagueRank[leagueId] = {
                totalScore:0,
                count:0
            };
        }

        this.adaptiveLeagueRank[leagueId].totalScore += score;
        this.adaptiveLeagueRank[leagueId].count++;

    },

    getLeagueConfidenceBoost(leagueId){

        const league = this.adaptiveLeagueRank[leagueId];

        if(!league) return 1;

        return Math.min(
            1.3,
            1 + (league.totalScore / (league.count * 100))
        );
    }

};

module.exports = EliteUltraEngine;
