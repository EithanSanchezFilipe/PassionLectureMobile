const books = [
  {
    id: 1,
    titre: "Le Tour du Monde en Quatre-vingts Jours",
    extrait:
      "Phileas Fogg fit le tour du monde en 80 jours, pour prouver que c’était possible.",
    resume:
      "Phileas Fogg, gentleman britannique, parie qu’il peut faire le tour du monde en 80 jours. Accompagné de son valet Passepartout, il affronte mille obstacles pour relever ce défi.",
    annee_edition: 1873,
    nombre_de_pages: 250,
    id_categorie: 1,
    id_auteur: 2,
    id_editeur: 1,
    epub: "Verne, Jules - Le tour du monde en quatre-vingts jours.epub",
    tag: 1,
  },
  {
    id: 2,
    titre: "Fables",
    extrait:
      "La Cigale, ayant chanté tout l'été, se trouva fort dépourvue quand la bise fut venue...",
    resume:
      "Recueil de fables morales mettant en scène des animaux. Jean de La Fontaine y transmet sagesse et critique sociale avec élégance et humour.",
    annee_edition: 1668,
    nombre_de_pages: 300,
    id_categorie: 2,
    id_auteur: 4,
    id_editeur: 4,
    epub: "La Fontaine, Jean de - Fables.epub",
    tag: 2,
  },
  {
    id: 3,
    titre: "Les Trois Mousquetaires",
    extrait: "Tous pour un, un pour tous !",
    resume:
      "Le jeune d'Artagnan rejoint les mousquetaires du roi et vit des aventures épiques avec Athos, Porthos et Aramis dans la France du XVIIe siècle.",
    annee_edition: 1844,
    nombre_de_pages: 700,
    id_categorie: 1,
    id_auteur: 3,
    id_editeur: 2,
    epub: "Dumas, Alexandre - Les trois mousquetaires.epub",
    tag: 2,
  },
  {
    id: 4,
    titre: "Sherlock Holmes",
    extrait: "Élémentaire, mon cher Watson.",
    resume:
      "Le détective privé Sherlock Holmes et son fidèle compagnon le Dr Watson résolvent les affaires les plus complexes dans le Londres victorien.",
    annee_edition: 1887,
    nombre_de_pages: 350,
    id_categorie: 4,
    id_auteur: 3,
    id_editeur: 3,
    epub: "Doyle, Artur Conan - Sherlock Holmes.epub",
    tag: 1,
  },
  {
    id: 5,
    titre: "Oliver Twist",
    extrait: "S'il vous plaît, monsieur, j’en voudrais encore un peu.",
    resume:
      "Oliver Twist, orphelin maltraité, lutte pour survivre dans les bas-fonds de Londres. Un roman poignant sur l'enfance, la pauvreté et l'injustice sociale.",
    annee_edition: 1837,
    nombre_de_pages: 550,
    id_categorie: 2,
    id_auteur: 2,
    id_editeur: 4,
    epub: "Dickens, Charles - Oliver Twist.epub",
    tag: 1,
  },
  {
    id: 6,
    titre: "A Christmas Carol",
    extrait: "God bless us, every one!",
    resume:
      "La veille de Noël, Ebenezer Scrooge reçoit la visite de trois esprits qui l’aident à redécouvrir la générosité et l’esprit de Noël.",
    annee_edition: 1843,
    nombre_de_pages: 120,
    id_categorie: 2,
    id_auteur: 1,
    id_editeur: 1,
    epub: "Dickens, Charles - A Christmas Carol.epub",
    tag: 1,
  },
];
const categories = [
  {
    id: 1,
    nom: "Roman Policier",
  },
  {
    id: 2,
    nom: "Roman Historique",
  },
  {
    id: 3,
    nom: "Science-Fiction",
  },
  {
    id: 4,
    nom: "Aventure",
  },
];
const authors = [
  {
    id: 1,
    prenom: "Gaston",
    nom: "Leroux",
  },
  {
    id: 2,
    prenom: "Victor",
    nom: "Hugo",
  },
  {
    id: 3,
    prenom: "George",
    nom: "Orwell",
  },
  {
    id: 4,
    prenom: "Paulo",
    nom: "Coelho",
  },
];
const editors = [
  {
    id: 1,
    nom: "Éditions Félix",
  },
  {
    id: 2,
    nom: "Éditions Classiques",
  },
  {
    id: 3,
    nom: "Secker & Warburg",
  },
  {
    id: 4,
    nom: "HarperCollins",
  },
];
const tags = [
  { id: 1, name: "Interessant" },
  { id: 2, name: "A lire" },
];
export { books, categories, authors, editors, tags };
