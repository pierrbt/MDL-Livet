// On sélectionne l'élément <tbody> dans lequel on va injecter les <tr>
const tbody = document.querySelector("tbody");

// Fonction pour récupérer les utilisateurs
async function fetchUsers() {
    // On utilise une fonction asynchrone pour pouvoir utiliser await
    try {
        // On récupère les utilisateurs depuis le serveur
        const req = await fetch("https://api.mdl.veagle.fr/members");
        // On vérifie que la requête s'est bien passée
        if (req.status !== 200)
            throw new Error(
                "Erreur lors de la récupération des membres sur le serveur",
            );
        // On récupère le JSON
        const res = await req.json();
        const users = res.data;

        // On map chaque utilisateur pour créer une ligne du tableau
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
            .join(""); // On join le tout pour éviter les virgules
    } catch (err) {
        console.error(err);
        // On affiche une erreur dans le tableau si on a une erreur
        tbody.innerHTML =
            '<tr><td colspan="5">Erreur lors du chargement des utilisateurs</td></tr>';
    }
}

fetchUsers(); // On appelle la fonction pour la première fois

// Sélecteur form
const form = document.querySelector("form");

// On gère le onsubmit (addEventListener est plus propre que l'attribut onsubmit)
form.addEventListener("submit", async (event) => {
    event.preventDefault(); // On empêche le rechargement de la page

    // On récupère les élements irrécupérables depuis event
    const info = document.querySelector("#info");
    const submit = document.querySelector(".submit");

    // On désactive le bouton submit pour le moment
    submit.disabled = true;

    // On définit toutes les entrées du formulaire
    const inputs = ["firstName", "lastName", "class", "age"];

    // On créé l'objet utilisateur par défaut
    const userObject = {role: "Membre"};

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
                // Important pour Fastify (le serveur) pour lui dire que c'est du JSON
                "Content-Type": "application/json",
            },
        });

        // On gère une éventuelle erreur du serveur
        if (res.status !== 200) {
            throw new Error("Impossible de créer l'utilisateur");
        }

        await res.json(); // On vérifie que la réponse est bien du JSON

        info.textContent = "Utilisateur créé avec succès";

        fetchUsers(); // On recharge les utilisateurs
    } catch (err) {
        console.error(err);
        info.textContent = "Erreur lors de la création de l'utilisateur";
        // On réactive le bouton pour permettre à l'utilisateur de réessayer
        submit.disabled = false;
        return;
    }

    return true;
});
