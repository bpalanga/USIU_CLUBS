<?php
require_once __DIR__ . '/../models/comment_model.php';

function get_comments($event_id) {
    $comments = fetch_comments_by_event($event_id);
    header('Content-Type: application/json');
    echo json_encode($comments);
}

function add_comment($event_id) {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'] ?? '';
    $comment = $data['comment'] ?? '';

    if (!$name || !$comment) {
        http_response_code(400);
        echo json_encode(['error' => 'Name and comment are required']);
        return;
    }

    save_comment($event_id, $name, $comment);
    echo json_encode(['message' => 'Comment added successfully']);
}

function remove_comment($comment_id) {
    $comment = find_comment_by_id($comment_id);

    if (!$comment) {
        http_response_code(404);
        echo json_encode(['error' => 'Comment not found']);
        return;
    }

    delete_comment($comment_id);
    echo json_encode(['message' => 'Comment deleted successfully']);
}
