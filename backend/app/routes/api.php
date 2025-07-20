<?php
require_once __DIR__ . '/../controllers/events.php';

function handle_request() {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $method = $_SERVER['REQUEST_METHOD'];

    if ($uri === '/api/events' && $method === 'GET') {
        get_all_events();
    } elseif ($uri === '/api/events' && $method === 'POST') {
        create_event();
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
    }
}
