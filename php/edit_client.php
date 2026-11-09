
<?php
header('Content-Type: application/json; charset=utf-8');

$file = __DIR__ . '/../data/clients.json';
$clients = json_decode(file_get_contents($file), true) ?? [];

$id = $_POST['id'] ?? '';
$nom = trim($_POST['nom'] ?? '');
$email = trim($_POST['email'] ?? '');

if ($id === '' || $nom === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['message' => 'Données invalides']);
    exit;
}

$found = false;

foreach ($clients as &$client) {
    if ((string)$client['id'] === (string)$id) {
        $client['nom'] = $nom;
        $client['email'] = $email;
        $found = true;
        break;
    }
}
unset($client);

if (!$found) {
    http_response_code(404);
    echo json_encode(['message' => 'Client introuvable']);
    exit;
}

file_put_contents($file, json_encode($clients, JSON_PRETTY_PRINT));

echo json_encode(['message' => 'Client modifié avec succès']);
?>
