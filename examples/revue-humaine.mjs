// Objectif : montrer qu’une décision incertaine est explicitement envoyée en revue humaine.
import assert from "node:assert/strict";
import { assessPropertyComparable } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const dossier = {
  "id": "revue-1",
  "text": "La mutation concerne une surface proche dans le même secteur, mais le type de bien et son état sont mal renseignés.",
  "source": {
    "url": "https://example.test/dossier-ambigu",
    "date": "2026-09-20"
  },
  "details": {
    "origine": "donnée synthétique",
    "signal": "informations incomplètes"
  }
};
const provider = createFakeProvider(() => ({
  model: "jev-1.13.0",
  answers: { decision: {
    type: "choice",
    choice: "weak_comparable",
    probabilities: {
  "strong_comparable": 0.15,
  "partial_comparable": 0.15,
  "weak_comparable": 0.55,
  "same_property": 0.15
},
    confidence: 0.62,
  } },
  usage: { input_tokens: 140, output_tokens: 0 },
}));
const résultat = await assessPropertyComparable(dossier, provider);
assert.equal(résultat.decision, "weak_comparable");
assert.equal(résultat.review, true);
assert.equal(provider.calls, 1);
console.log(`Décision : ${résultat.label} · revue humaine : ${résultat.review} · confiance : ${résultat.confidence}`);
