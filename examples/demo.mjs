// Objectif : montrer une décision sémantique avec des données entièrement synthétiques.
import assert from "node:assert/strict";
import { assessPropertyComparable } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const dossier = {
  "id": "exemple-1",
  "text": "Deux appartements du même quartier et de surface proche, vendus à neuf mois d’écart, avec états différents.",
  "source": {
    "url": "https://example.test/donnee-source",
    "date": "2026-09-15"
  },
  "details": {
    "territoire": "Commune Exemple",
    "origine": "donnée synthétique"
  }
};
const provider = createFakeProvider(() => ({ model: "jev-1.13.0", answers: { decision: { type: "choice", choice: "partial_comparable", probabilities: {
  "strong_comparable": 0.05,
  "partial_comparable": 0.85,
  "weak_comparable": 0.05,
  "same_property": 0.05
}, confidence: 0.85 } }, usage: { input_tokens: 120, output_tokens: 0 } }));
const résultat = await assessPropertyComparable(dossier, provider);
assert.equal(résultat.decision, "partial_comparable");
assert.equal(provider.calls, 1);
console.log(`Décision : ${résultat.label} · probabilité : ${résultat.probability}`);
