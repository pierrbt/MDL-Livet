/**
 * Contient les informations statiques de tous les clubs
 * @type {{image: string, description: string, nom: string}[]}
 */
const clubs = [
  {
    nom: "Club Argentique",
    image: "img/clubs/argentique.svg",
    description: "Cuisine, vente",
  },
  {
    nom: "Club Numérique",
    image: "img/clubs/numérique.svg",
    description: "Arcade, rétro-découvertes, tournois",
  },
  {
    nom: "Club plante",
    image: "img/clubs/plante.svg",
    description: "Super descriptio",
  },
  {
    nom: "Club cuisine",
    image: "img/clubs/cuisine.svg",
    description: "Super descriptio",
  },
  {
    nom: "Club gaming",
    image: "img/clubs/gaming.svg",
    description: "Super descriptio",
  },
  {
    nom: "Club déco",
    image: "img/clubs/déco.svg",
    description: "Super descriptio",
  },
  {
    nom: "Club graph",
    image: "img/clubs/graph.svg",
    description: "Super descriptio",
  },
  {
    nom: "Club musique",
    image: "img/clubs/musique.svg",
    description: "Super descriptio",
  },
];

const ul = document.querySelector("ul");

ul.innerHTML = clubs
  .map((club) => {
    return `
  <li>
    <img src="${club.image}" />
    <div>
      <h2>${club.nom}</h1>
      <span>${club.description}</span>
    </div>
  </li>
  `;
  })
  .join("");
