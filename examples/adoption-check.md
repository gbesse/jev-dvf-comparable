# jev-dvf-comparable — contrôle d’adoption · adoption check · comprobación de adopción

## Français

Point de départ local, après la préparation indiquée dans le README :

```sh
npm run demo:parcours
```

Deux mutations proches en distance peuvent différer en surface ou en nature du bien. Comparez les motifs du rapport et réservez les écarts à la revue humaine.

## English

Local starting point, after the setup described in the README:

```sh
npm run demo:parcours
```

Two nearby transactions can differ in area or property type. Compare the report reasons and send unresolved differences to human review.

## Español

Punto de partida local, después de la preparación descrita en el README:

```sh
npm run demo:parcours
```

Dos transacciones cercanas pueden diferir en superficie o tipo de inmueble. Compare los motivos del informe y envíe las diferencias no resueltas a revisión humana.
## Variante synthétique · Synthetic variation · Variante sintética

```text
distance=100m; floor_area_A=45m²; floor_area_B=180m²
```

FR : adaptez une copie de la fixture locale à cette situation, puis vérifiez le comportement décrit ci-dessus. Les valeurs sont illustratives, pas des résultats Jev mesurés.

EN: adapt a copy of the local fixture to this situation, then check the behavior described above. Values are illustrative, not measured Jev output.

ES: adapte una copia de la fixture local a esta situación y compruebe el comportamiento descrito arriba. Los valores son ilustrativos, no resultados Jev medidos.

## Second cas · Second case · Segundo caso

```text
sale_year_A=2020; sale_year_B=2026; distance_m=100
```

**FR :** La proximité géographique ne suffit pas si les mutations sont éloignées dans le temps. Documentez l’écart plutôt que d’automatiser l’estimation.

**EN:** Geographic proximity is insufficient when transactions are far apart in time. Document the gap instead of automating the valuation.

**ES:** La proximidad geográfica no basta si las transacciones están muy separadas en el tiempo. Documente la diferencia en lugar de automatizar la valoración.
