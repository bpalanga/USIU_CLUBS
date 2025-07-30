<?php
require_once __DIR__ . '/../controllers/events.php';
require_once __DIR__ . '/../controllers/registrations.php';
require_once __DIR__ . '/../controllers/comment.php';
require_once __DIR__ . '/../controllers/auth.php';

function handle_request() {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $method = $_SERVER['REQUEST_METHOD'];

    if ($uri === '/api/events' && $method === 'GET') {
        get_all_events();

    } elseif ($uri === '/api/events' && $method === 'POST') {
        create_event();

    }elseif (preg_match('#^/api/events/(\d+)$#', $uri, $matches) && $method === 'GET') {
    $event_id = $matches[1];
    get_event($event_id);

// Update event
} elseif (preg_match('#^/api/events/(\d+)$#', $uri, $matches) && $method === 'PUT') {
    $event_id = $matches[1];
    edit_event($event_id);

// Delete event
} elseif (preg_match('#^/api/events/(\d+)$#', $uri, $matches) && $method === 'DELETE') {
    $event_id = $matches[1];
    remove_event($event_id);
 } elseif (preg_match('#^/api/events/(\d+)/register$#', $uri, $matches) && $method === 'POST') {
        $event_id = $matches[1];
        register_for_event($event_id);

    } elseif (preg_match('#^/api/events/(\d+)/comments$#', $uri, $matches) && $method === 'GET') {
        $event_id = $matches[1];
        get_comments($event_id);

    } elseif (preg_match('#^/api/events/(\d+)/comments$#', $uri, $matches) && $method === 'POST') {
        $event_id = $matches[1];
        add_comment($event_id);

    }elseif (preg_match('#^/api/comments/(\d+)$#', $uri, $matches) && $method === 'DELETE') {
        $comment_id = $matches[1];
        remove_comment($comment_id);


        // Authentication routes

    } elseif ($uri === '/api/auth/signup' && $method === 'POST') {
    signup();

} elseif ($uri === '/api/auth/signin' && $method === 'POST') {
    signin();
    }
    else {
        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
    }
}
