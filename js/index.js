async function fetchStatistics() {
  // On séléctionne notre élément depuis le DOM
  const informations = document.querySelector(".info");
  informations.textContent = "Chargement ...";

  try {
    // On fait la reqête au serveur
    const req = await fetch("https://api.mdl.veagle.fr/members");
    if (req.status !== 200) {
      // On vérifie que la requête est un succès
      throw new Error("Erreur lors de la requête");
    }
    const res = await req.json();

    // On regarde le nombre d'utilisateurs (data est la liste des utilisateurs)
    const count = res.data.length;
    informations.textContent = `Il y a actuellement ${count} élèves inscrits à la MDL.`;
  } catch (err) {
    // Si il y a une erreur on le notifie
    console.error("Erreur lors de la reqête");
    console.log(err);
    informations.textContent = "Une erreur est survenue lors de la requête !";
  }
}

fetchStatistics();
