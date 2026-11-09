
const form = document.getElementById("clientForm");
const nomInput = document.getElementById("nom");
const emailInput = document.getElementById("email");
const clientList = document.getElementById("clientList");
const searchInput = document.getElementById("search");

let clients = [];

// Charger les clients depuis PHP
async function chargerClients() {
    try {
        const response = await fetch("php/clients.php");
        clients = await response.json();
        afficherClients(clients);
    } catch (error) {
        alert("Erreur lors du chargement des clients");
    }
}

// Afficher les clients
function afficherClients(liste) {
    clientList.innerHTML = "";

    liste.forEach(client => {
        const row = document.createElement("tr");

        const nomCell = document.createElement("td");
        nomCell.textContent = client.nom;

        const emailCell = document.createElement("td");
        emailCell.textContent = client.email;

        const actionsCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Modifier";
        editButton.addEventListener("click", () => modifierClient(client));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Supprimer";
        deleteButton.addEventListener("click", () => supprimerClient(client.id));

        actionsCell.append(editButton, deleteButton);
        row.append(nomCell, emailCell, actionsCell);
        clientList.appendChild(row);
    });
}

// Ajouter un client
form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const nom = nomInput.value.trim();
    const email = emailInput.value.trim();

    if (!nom || !email) {
        alert("Tous les champs sont obligatoires !");
        return;
    }

    const data = new FormData();
    data.append("nom", nom);
    data.append("email", email);

    const response = await fetch("php/add_client.php", {
        method: "POST",
        body: data
    });
if (response.ok) {
    form.reset();
    await chargerClients();
} else {
        alert("Erreur lors de l'ajout");
    }
});

// Modifier un client
async function modifierClient(client) {
    const nom = prompt("Nouveau nom :", client.nom);
    if (nom === null) return;

    const email = prompt("Nouvel email :", client.email);
    if (email === null) return;

    const data = new FormData();
    data.append("id", client.id);
    data.append("nom", nom.trim());
    data.append("email", email.trim());

    const response = await fetch("php/edit_client.php", {
        method: "POST",
        body: data
    });

    if (response.ok) {
    await chargerClients();
} else {
        alert("Erreur lors de la modification");
    }
}

// Supprimer un client
async function supprimerClient(id) {
    if (!confirm("Voulez-vous supprimer ce client ?")) return;

    const data = new FormData();
    data.append("id", id);

    const response = await fetch("php/delete_client.php", {
        method: "POST",
        body: data
    });

    if (response.ok) {
        await chargerClients();
    } else {
        alert("Erreur lors de la suppression");
    }
}

// Rechercher un client
searchInput.addEventListener("input", function() {
    const recherche = searchInput.value.toLowerCase();

    const resultat = clients.filter(client =>
        client.nom.toLowerCase().includes(recherche) ||
        client.email.toLowerCase().includes(recherche)
    );

    afficherClients(resultat);
});

// Chargement initial
chargerClients().catch(error => {
    console.error("Erreur :", error);
});
