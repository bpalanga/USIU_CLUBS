<?php

// === Start session with cookie settings ===
$isLocal = in_array($_SERVER['HTTP_ORIGIN'] ?? '', [
    'http://127.0.0.1:5500', 
    'http://localhost:5500',
    'http://localhost:3000'
]);

session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
   'domain' => 'da8ef67972d2.ngrok-free.app',
    'secure' => true,  
    'httponly' => true,
    'samesite' => 'None' // allow cross-origin cookies
]);

session_start();

// === CORS HEADERS ===
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed_origins = [
    'http://127.0.0.1:5500', 
    'http://localhost:5500',
    'http://localhost:3000', 
];

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true"); // allow cookies
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, ngrok-skip-browser-warning");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0); 
}

// === ROUTING ===
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
if ($uri === '/') {
    echo '✅ API is running.';
    exit;
}

if (!str_starts_with($uri, '/api/')) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']);
    exit;
}

require_once __DIR__ . '/../app/routes/api.php';
handle_request();
