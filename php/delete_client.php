
<?php
header('Content-Type: application/json; charset=utf-8');

$file = __DIR__ . '/../data/clients.json';
$clients = json_decode(file_get_contents($file), true) ?? [];

$id = $_POST['id'] ?? '';

if ($id === '') {
    http_response_code(400);
    echo json_encode(['message' => 'ID obligatoire']);
    exit;
}

$clients = array_values(array_filter($clients, function ($client) use ($id) {
    return (string)$client['id'] !== (string)$id;
}));

file_put_contents($file, json_encode($clients, JSON_PRETTY_PRINT));

echo json_encode(['message' => 'Client supprimé avec succès']);
?>
