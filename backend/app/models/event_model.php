<?php
require_once __DIR__ . '/../../config/database.php';

function fetch_all_events() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM events");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function save_event($data) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO events (title, descreption, date) VALUES (?, ?, ?)");
    $stmt->execute([$data['title'], $data['descreption'], $data['date']]);
}
