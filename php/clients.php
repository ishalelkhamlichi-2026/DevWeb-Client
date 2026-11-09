
<?php
header('Content-Type: application/json; charset=utf-8');

$file = __DIR__ . '/../data/clients.json';

if (!file_exists($file)) {
    file_put_contents($file, '[]');
}

$clients = json_decode(file_get_contents($file), true) ?? [];

echo json_encode($clients, JSON_PRETTY_PRINT);
?>
