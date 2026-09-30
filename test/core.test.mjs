// Objectif : vérifier la normalisation, la règle déterministe et la décision sémantique.
import test from "node:test";
import assert from "node:assert/strict";
import { propertyCase, assessPropertyComparable } from "../src/index.mjs";
import { createFakeProvider } from "../src/jev.mjs";
const edge = {
  "id": "limite-1",
  "text": "Cas synthétique traité par une règle déterministe avant toute analyse sémantique.",
  "source": {
    "url": "https://example.test/cas-limite",
    "date": "2026-09-16"
  },
  "propertyId": "75056-A",
  "candidatePropertyId": "75056-A"
};
test("exige une source", () => assert.throws(() => propertyCase({ id: "x", text: "y" }), /source/));
test("applique le cas limite sans appel Jev", async () => { const provider = createFakeProvider(() => { throw new Error("appel interdit"); }); assert.equal((await assessPropertyComparable(edge, provider)).decision, "same_property"); assert.equal(provider.calls, 0); });
test("classe un dossier sourcé", async () => { const provider = createFakeProvider(() => ({ model: "jev-1.13.0", answers: { decision: { type: "choice", choice: "partial_comparable", probabilities: {
  "strong_comparable": 0.05,
  "partial_comparable": 0.85,
  "weak_comparable": 0.05,
  "same_property": 0.05
}, confidence: 0.85 } }, usage: { input_tokens: 10, output_tokens: 0 } })); const result = await assessPropertyComparable({
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
}, provider); assert.equal(result.decision, "partial_comparable"); assert.equal(result.review, false); });
