<?php
// === start session ===

session_start();
// === CORS HEADERS ===
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed_origins = [
    'http://127.0.0.1:5500', 
    'http://localhost:5500',
];

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, ngrok-skip-browser-warning");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); 
}

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
