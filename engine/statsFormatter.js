const formatConfidence = (score) => {

    if (score >= 80) return "🔥 Muito Forte";
    if (score >= 65) return "✅ Forte";
    if (score >= 50) return "⚠️ Médio";
    return "❌ Fraco";
};

module.exports = { formatConfidence };
