const AdaptiveEngine = {

    adjustProbability(game){

        let base = game.masterEdition?.probability || 50;

        const elapsed = game.fixture?.status?.elapsed || 0;
        const events = game.events?.length || 0;

        // Ajuste simples baseado no tempo de jogo
        const timeFactor = elapsed * 0.03;

        // Ajuste por eventos da partida
        const eventFactor = events * 1.5;

        let adaptiveScore = base + timeFactor + eventFactor;

        if(adaptiveScore > 98) adaptiveScore = 98;

        return adaptiveScore;
    }

};

module.exports = AdaptiveEngine;
