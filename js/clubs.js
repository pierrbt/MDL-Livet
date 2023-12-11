// On créé une liste avec les différents clubs

// const = let = var
// clubs c'est une liste qui contient plusieurs "objets" qui contiennent les informations des clubs
const clubs = [
  {
    nom: "Club Graph",
    image: "/img/clubs/graph.png", // lien vers l'image
    // tu peux rajouter d'autres propriétés si tu veux
  },
  {
    nom: "Club Numérique",
    image: "/img/clubs/num.png",
  },
  // A compléter avec les autres clubs
];

// ensuite tu peux sélectionner ton élément html depuis le javascript

// A FAIRE

// ensuite tu peux dire que le html du conteneur que tu vas utiliser c'est egal au html que tu as généré
// la fonction map appelle la chaque élément de la liste clubs et l'envoie dans club, qui retourne le html
// ensuite ça l'assigne au html du conteneur (ça ne marchera pas comme ça il faut le faire)

// A FAIRE

conteneur.innerHTML = clubs.map((club) => {
  return `<li>${club.nom}</li>`;
});
