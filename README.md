# Portfolio : Mohamed Said Kaba

Site statique (HTML/CSS/JS, sans build), bilingue FR/EN, thème clair.
En ligne : https://mohamed-said-kaba.github.io/EngPortfolio/

## Voir le site en local

Double-cliquer sur `index.html`. La version imprimable (livre PDF) est `book.html` : l'ouvrir puis « Imprimer / Enregistrer en PDF ».

## Où modifier quoi

| Je veux... | Fichier |
|---|---|
| Nom, titre, accroche, coordonnées, libellés | `content/site.js` |
| Chiffres clés, parcours, compétences, certifications | `content/profile.js` |
| Ajouter ou modifier une réalisation (fiche + images) | `content/works.js` |
| Schéma de la chaîne d'outils Robot | `content/tools.js` |
| Activer la section Vidéos / YouTube | `content/videos.js` → `"enabled": true` |
| Photo de profil | remplacer `assets/img/portrait.jpg` (carré, 800 px conseillé) |
| Images des réalisations | `assets/img/work/` (format .webp ou .jpg, 1400 px de large max) |
| Bouton « Télécharger le CV » | déposer `cv/CV_Mohamed_Said_Kaba_FR.pdf` (et `_EN.pdf`) |

Chaque texte est un objet `{ "fr": "...", "en": "..." }`. Ajouter une réalisation : copier un bloc de `content/works.js`, changer `id`, les textes et la liste `images`. La première image sert de couverture. `"featured": true` affiche la fiche en grand.

## Publier

```
git add -A
git commit -m "Mise à jour du site"
git push
```
GitHub Pages republie le site en 1 à 2 minutes.

## Règles de rédaction

Phrases courtes, un fait par phrase, pas de tiret long. Ne publier aucun document client (plans, notes de calcul, maquettes OCP) sans accord.
