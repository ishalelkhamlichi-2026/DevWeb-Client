
<?php
header('Content-Type: application/json; charset=utf-8');

$file = __DIR__ . '/../data/clients.json';
$clients = json_decode(file_get_contents($file), true) ?? [];

$nom = trim($_POST['nom'] ?? '');
$email = trim($_POST['email'] ?? '');

if ($nom === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['message' => 'Données invalides']);
    exit;
}

$clients[] = [
    'id' => time() . random_int(100, 999),
    'nom' => $nom,
    'email' => $email
];

file_put_contents($file, json_encode($clients, JSON_PRETTY_PRINT));

echo json_encode(['message' => 'Client ajouté avec succès']);
?>
