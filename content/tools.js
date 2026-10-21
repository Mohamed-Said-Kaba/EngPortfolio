// Chaîne d'outils affichée en schéma (section "Outils").
// Chaque colonne est une étape ; chaque outil a un nom, une ligne de description et un statut.
// statut : "prod" (utilisé en production), "dev" (en développement).
window.SITE = window.SITE || {};
window.SITE.tools = {
  "steps": [
    {
      "label": { "fr": "Modèle", "en": "Model" },
      "tools": [
        { "name": "Robot Structural Analysis", "line": { "fr": "Modèle d'analyse statique et sismique", "en": "Static and seismic analysis model" }, "kind": "source" }
      ]
    },
    {
      "label": { "fr": "Extraction", "en": "Extraction" },
      "tools": [
        { "name": "REDUCED LOADS", "line": { "fr": "Efforts réduits des voiles, tri des cas sismiques", "en": "Wall reduced forces, seismic case filtering" }, "status": "prod" },
        { "name": { "fr": "Analyse dynamique", "en": "Dynamic analysis" }, "line": { "fr": "Modes, déplacements, P-Delta selon RPS 2011", "en": "Modes, drifts, P-Delta to RPS 2011" }, "status": "prod" }
      ]
    },
    {
      "label": { "fr": "Dimensionnement", "en": "Design" },
      "tools": [
        { "name": { "fr": "Semelles sous voiles", "en": "Wall footings" }, "line": { "fr": "EC7, ferraillage, note de calcul", "en": "EC7, reinforcement, calculation note" }, "status": "prod" },
        { "name": "FOOTING LOADS", "line": { "fr": "Charges des semelles isolées et mitoyennes", "en": "Isolated and party-wall footing loads" }, "status": "prod" },
        { "name": "RAFT LOADS", "line": { "fr": "Actions nodales sur radier", "en": "Nodal actions on rafts" }, "status": "dev" },
        { "name": { "fr": "Poinçonnement", "en": "Punching shear" }, "line": { "fr": "Dalle de transfert, EC2", "en": "Transfer slab, EC2" }, "status": "dev" }
      ]
    },
    {
      "label": { "fr": "Livrables", "en": "Deliverables" },
      "tools": [
        { "name": { "fr": "Module BA Robot", "en": "Robot RC module" }, "line": { "fr": "Voiles et semelles créés automatiquement", "en": "Walls and footings created automatically" }, "kind": "source" },
        { "name": { "fr": "Note de calcul", "en": "Calculation note" }, "line": { "fr": "Word puis PDF", "en": "Word, then PDF" }, "kind": "source" }
      ]
    }
  ],
  "principles": {
    "fr": ["Jamais de comportement d'API supposé : une sonde, un relevé, puis le code.", "Les données d'une note de calcul sont figées et datées.", "L'ingénieur garde la main : l'outil prépare, Robot calcule."],
    "en": ["No assumed API behaviour: a probe, a readout, then the code.", "Calculation note data is frozen and dated.", "The engineer stays in control: the tool prepares, Robot calculates."]
  },
  "status": { "prod": { "fr": "En production", "en": "In use" }, "dev": { "fr": "En développement", "en": "In development" } }
};
