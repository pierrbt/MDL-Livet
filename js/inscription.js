const tbody = document.querySelector("tbody");

// On récupère les utilisateurs
(async () => {
  try {
    const req = await fetch("https://api.mdl.veagle.fr/members");
    if (req.status !== 200)
      throw new Error(
        "Erreur lors de la récupération des membres sur le serveur",
      );

    const res = await req.json();
    const users = res.data;

    tbody.innerHTML = users
      .map((user) => {
        return `
            <tr>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.class}</td>
                <td>${user.role}</td>
            </tr>`;
      })
      .join("");
  } catch (err) {
    console.error(err);
    tbody.innerHTML =
      '<tr><td colspan="5">Erreur lors du chargement des utilisateurs</td></tr>';
  }
})();

// Sélecteur form
const form = document.querySelector("form");

// On gère le onsubmit
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // On récupère les élements irrécupérables depuis event
  const info = document.querySelector("#info");
  const submit = document.querySelector(".submit");

  // On désactive le bouton submit pour le moment
  submit.disabled = true;

  // On définit toutes les entrées du formulaire
  const inputs = ["firstName", "lastName", "class", "age"];

  // On créé l'objet utilisateur par défaut
  const userObject = { role: "Membre" };

  for (const input of inputs) {
    // On vérifie la validité de l'entrée avec les paramètres dans l'HTML
    const element = event.currentTarget[input];
    if (!element.checkValidity()) {
      info.textContent = "Une des entrées est invalide !";
      return false;
    }

    // On récupère la valeur
    const value = element.value;
    userObject[input] = value;
  }
  // On commence le try pour récupérer toutes les exceptions de conversion et de requête HTTP
  try {
    // Conversion en Number pour l'age
    userObject.age = Number(userObject.age);

    // On envoie l'utilisateur au serveur
    info.textContent = "Ajout de l'utilisateur ...";
    const res = await fetch("https://api.mdl.veagle.fr/members", {
      method: "POST",
      body: JSON.stringify(userObject),
      headers: {
        // Important pour Fastify
        "Content-Type": "application/json",
      },
    });

    const body = await res.json();

    // On gère une éventuelle erreur du serveur
    if (res.status !== 200) {
      throw new Error("Impossible de créer l'utilisateur");
    }

    info.textContent = "Utilisateur créé avec succès";
  } catch (err) {
    console.error(err);
    info.textContent = "Erreur lors de la création de l'utilisateur";
    // On réactive le bouton pour permettre à l'utilisateur de réessayer
    submit.disabled = false;
    return;
  }

  return true;
});
