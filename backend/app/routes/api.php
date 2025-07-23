<?php
require_once __DIR__ . '/../controllers/events.php';
require_once __DIR__ . '/../controllers/registrations.php';

function handle_request() {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $method = $_SERVER['REQUEST_METHOD'];

    if ($uri === '/api/events' && $method === 'GET') {
        get_all_events();
    } elseif ($uri === '/api/events' && $method === 'POST') {
        create_event();
    }elseif (preg_match('#^/api/events/(\d+)/register$#', $uri, $matches) && $method === 'POST') {
    $event_id = $matches[1];
    register_for_event($event_id);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
    }
}
