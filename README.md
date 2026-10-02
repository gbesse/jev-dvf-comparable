# Jev DVF Comparable

**Qualifie la comparabilité de mutations DVF pour documenter une estimation immobilière.**

[![Tests](https://github.com/gbesse/jev-dvf-comparable/actions/workflows/test.yml/badge.svg)](https://github.com/gbesse/jev-dvf-comparable/actions/workflows/test.yml) [MIT](LICENSE) · Node.js 22+ · v0.1.2 · Documentation française

Jev DVF Comparable transforme un paire de mutations sourcé en une catégorie explicite et révisable. Le dépôt sépare les règles vérifiables en code de la comparaison sémantique confiée à Jev.

## Démarrage rapide

```sh
git clone https://github.com/gbesse/jev-dvf-comparable.git
cd jev-dvf-comparable
npm install
npm run demo
```

Les trois démonstrations utilisent uniquement des données et probabilités synthétiques. Elles n’effectuent aucun appel réseau et ne mesurent pas la qualité réelle de Jev.

## Exemple exécutable

Le scénario principal aboutit à **`comparable_partiel`**. Le fournisseur Jev est simulé et une assertion fait échouer la commande si le contrat change.

```js
import { assessPropertyComparable } from "@gbesse/jev-dvf-comparable";
import { createFakeProvider } from "@gbesse/jev-dvf-comparable/jev";

const provider = createFakeProvider(() => ({
  model: "jev-1.13.0",
  answers: { decision: {
    type: "choice",
    choice: "partial_comparable",
    probabilities: {
  "strong_comparable": 0.05,
  "partial_comparable": 0.85,
  "weak_comparable": 0.05,
  "same_property": 0.05
},
    confidence: 0.85,
  } },
  usage: { input_tokens: 120, output_tokens: 0 },
}));

const résultat = await assessPropertyComparable({
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
}, provider);
console.log(résultat.label);
```

Le fichier complet est [`examples/demo.mjs`](examples/demo.mjs). Lancez-le avec `npm run demo:principal`.

### Cas limite à tester

[`examples/cas-limite.mjs`](examples/cas-limite.mjs) exerce une règle déterministe propre au domaine. Résultat attendu : **`même_bien`**, avec zéro appel Jev.

```sh
npm run demo:limite
```

`npm run demo` exécute les trois scénarios.

### Décision incertaine à revoir

[`examples/revue-humaine.mjs`](examples/revue-humaine.mjs) simule un dossier incomplet. Une confiance de `0.62` doit produire `review: true` afin que l’incertitude reste visible et qu’aucune action automatique ne soit déclenchée.

```sh
npm run demo:revue
```

Résultat attendu : **`comparable_faible`**, avec `revue humaine : true`.

## Frontière de décision

Qualifie la comparabilité de mutations DVF pour documenter une estimation immobilière. La sortie sert à ordonner ou préparer une revue humaine. Elle ne constitue ni une décision administrative, ni un avis juridique, ni une garantie d’éligibilité, d’accessibilité, de financement ou de performance.

Les identifiants, dates, valeurs exactes, filtres et cas incontestables restent traités par du code ordinaire. La question et les critères envoyés à Jev sont versionnés dans [`src/index.mjs`](src/index.mjs).

## Sources publiques

- [API Données foncières](https://www.data.gouv.fr/dataservices/api-donnees-foncieres)

Conservez l’identifiant amont, l’URL, la date de récupération, le millésime et la licence de chaque donnée. Vérifiez le schéma et les conditions de réutilisation auprès du producteur avant ingestion.

## Appels Jev réels

Les appels réels sont facultatifs et payants. Le client valide le modèle et les probabilités, refuse les redirections, limite les nouvelles tentatives aux erreurs réseau et HTTP 429/529, puis bloque une requête dépassant une estimation prudente de 24 000 jetons.

```sh
TYPESAFE_API_KEY=... node scripts/live-smoke.mjs
```

N’envoyez jamais de secret, de donnée personnelle ni de dossier sensible non expurgé. Calibrez les seuils sur un corpus français annoté avant tout usage opérationnel.

## Parcours comparatif

`npm run demo:parcours` produit un rapport JSON partageable pour **jev-dvf-comparable** : le scénario principal et la frontière déterministe, ainsi que la revue humaine. Chaque scénario garde sa sortie propre et échoue si son assertion ne passe plus. Les données et probabilités sont synthétiques ; aucun appel Jev n’est effectué.

Cette vue permet de comparer rapidement les chemins de décision et de choisir quel exemple adapter à vos propres données sourcées.

## Validation

```sh
npm run check
npm run typecheck
npm test
npm run demo
```

La CI exécute ces vérifications sous Node.js 22 et 24.

Projet indépendant, sans affiliation avec TypeSafe AI, data.gouv.fr ni l’administration française. Consultez la [documentation de l’API Jev](https://docs.typesafe.ai/api) et les [limites du modèle](https://docs.typesafe.ai/model-jaggedness/jev-1.13).
