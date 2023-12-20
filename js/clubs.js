const clubs = [
  {
    nom: "Club Argentique",
    image: "img/icon/argentique.svg",
    description: "Cuisine, vente",
  },
  {
    nom: "Club Numérique",
    image: "img/icon/numérique.svg",
    description: "Arcade, rétro-découvertes, tournois",
  },
  {
    nom: "Club plante",
    image: "img/icon/plante.svg",
    description: "Super descriptio",
  },
  {
    nom: "Club cuisine",
    image: "img/icon/cuisine.svg",
    description: "Super descriptio",
  },
  {
    nom: "Club gaming",
    image: "img/icon/gaming.svg",
    description: "Super descriptio",
  },
  {
    nom: "Club déco",
    image: "img/icon/déco.svg",
    description: "Super descriptio",
  },
  {
    nom: "Club graph",
    image: "img/icon/graph.svg",
    description: "Super descriptio",
  },
  {
    nom: "Club musique",
    image: "img/icon/musique.svg",
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
