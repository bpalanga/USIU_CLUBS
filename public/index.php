<?php

// Always route through this index file
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

// Optional: health check on /
if ($uri === '/') {
    echo '✅ API is running.';
    exit;
}

// Only allow access to /api/ paths
if (!str_starts_with($uri, '/api/')) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']);
    exit;
}

// Load router
require_once __DIR__ . '/../app/routes/api.php';
handle_request();
