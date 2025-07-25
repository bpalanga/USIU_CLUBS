<?php
// === CORS HEADERS ===
header("Access-Control-Allow-Origin: *"); // or set specific origin instead of '*'
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, ngrok-skip-browser-warning");
header("Access-Control-Allow-Credentials: true");

// === Handle Preflight OPTIONS Request ===
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
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
