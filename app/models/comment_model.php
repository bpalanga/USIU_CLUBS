<?php
require_once __DIR__ . '/../../config/database.php';

function fetch_comments_by_event($event_id) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM comments WHERE event_id = ?");
    $stmt->execute([$event_id]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function save_comment($event_id, $name, $comment) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO comments (event_id, name, comment) VALUES (?, ?, ?)");
    $stmt->execute([$event_id, $name, $comment]);
}

function find_comment_by_id($comment_id) {
    global $pdo;
    $stmt = $pdo->prepare("SELECT * FROM comments WHERE id = ?");
    $stmt->execute([$comment_id]);
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

function delete_comment($comment_id) {
    global $pdo;
    $stmt = $pdo->prepare("DELETE FROM comments WHERE id = ?");
    $stmt->execute([$comment_id]);
}