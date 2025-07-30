<?php
require_once __DIR__ . '/../../config/database.php';

function save_user($email, $hashedPassword) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
    return $stmt->execute([$email, $hashedPassword]);
}

function get_user_by_email($email) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}
