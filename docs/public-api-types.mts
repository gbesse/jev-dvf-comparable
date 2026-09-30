// Objectif : vérifier que les types publics sont importables.
import { propertyCase, assessPropertyComparable } from "../src/index.mjs";
const dossier = propertyCase({
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
});
void assessPropertyComparable(dossier, { decide: async () => ({}) });
