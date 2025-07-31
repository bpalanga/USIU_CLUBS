<?php
require_once __DIR__ . '/../../config/database.php';

function save_user($email, $hashedPassword, $role, $club_name) {
    global $pdo;
    $stmt = $pdo->prepare(
        "INSERT INTO users (email, password, role, club_name) VALUES (?, ?, ?, ?)"
    );
    return $stmt->execute([$email, $hashedPassword, $role, $club_name]);
}


function get_user_by_email($email) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function get_all_admins() {
    global $pdo;
    $stmt = $pdo->query("SELECT id, email FROM users WHERE role = 'admin'");
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
