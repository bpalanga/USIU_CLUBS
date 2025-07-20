
# 🛠 USIU Clubs Backend – Complete Setup & Command Reference

This document summarizes all key setup steps, commands, and configuration used to build and run the RESTful backend API for the USIU Clubs project using PHP, MySQL, and Docker (in GitHub Codespaces or locally).

---

## 📁 Folder Structure

```
USIU_CLUBS/
├── backend/
│   ├── public/                # Entry point for all web/API requests
│   │   └── index.php
│   ├── app/
│   │   ├── routes/            # api.php for routing logic
│   │   ├── controllers/       # Logic for endpoints (e.g. events.php)
│   │   └── models/            # DB access logic (e.g. event_model.php)
│   ├── config/                # DB config (e.g. database.php)
│   ├── Dockerfile             # PHP + Apache setup
│   ├── docker-compose.yml     # Services: PHP + MySQL
│   └── .env                   # Environment variables (e.g. DB creds)
```

---

## ⚙️ Docker Setup & Usage

### Start or Rebuild the Project
```bash
docker-compose up --build
```

### Stop All Running Containers
```bash
docker-compose down
```

### List Running Containers
```bash
docker ps
```

### View PHP Logs (live output)
```bash
docker logs -f php-app
```

---

## 🐬 MySQL Setup (Inside Docker)

### Access the MySQL Container
```bash
docker exec -it mysql-db mysql -u root -p
# Enter password: root
```

### Select the Project Database
```sql
USE usiu_clubs;
```

### Create `events` Table
```sql
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Insert Sample Event
```sql
INSERT INTO events (title, description, date)
VALUES ('Test Event', 'This is a test event', '2025-07-25');
```

---

## 🧠 PHP Debugging (While Developing)

### Print Logs to Console (Docker Logs)
```php
error_log("Debug message here");
```

### Dump Variable to Output
```php
var_dump($data);
```

Then check in:
```bash
docker logs -f php-app
```

---

## 🗂 Key Files & Routing

📄 public/index.php (Entry point)
```php
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

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
```

📄 app/routes/api.php (Routing logic)
```php
require_once __DIR__ . '/../controllers/events.php';

function handle_request() {
    $uri = $_SERVER['REQUEST_URI'];
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
```

---

## 🐳 Dockerfile Overview

```dockerfile
FROM php:8.2-apache

RUN docker-php-ext-install pdo pdo_mysql

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

# Enable fallback so all routes go to index.php
RUN echo "FallbackResource /index.php" > /etc/apache2/conf-available/fallback.conf && \
    a2enconf fallback

COPY . /var/www/html

EXPOSE 80
```

---

## 🧪 Test API in Browser or Terminal

### Health Check
```http
GET http://localhost:8000/
```

### GET Events Endpoint
```http
GET http://localhost:8000/api/events
```

### POST New Event (using curl)
```bash
curl -X POST http://localhost:8000/api/events \
  -H "Content-Type: application/json" \
  -d '{"title":"Club Fair","description":"Intro event","date":"2025-08-01"}'
```

---

## 🔒 Security Notes

- Only /api/ routes are allowed through public/index.php
- No .htaccess used (Apache fallback handles routing)
- All config files (.env, database.php) are outside public/
- Inputs should always be sanitized before DB queries
- Use prepared statements with PDO

---

## ✅ Summary of Key Commands

| Task                        | Command                                         |
|-----------------------------|--------------------------------------------------|
| Start app                   | docker-compose up --build                        |
| Stop app                    | docker-compose down                              |
| View PHP logs               | docker logs -f php-app                           |
| Enter MySQL                 | docker exec -it mysql-db mysql -u root -p       |
| Run SQL                     | USE usiu_clubs; + CREATE TABLE/INSERT etc.      |
| Test GET API                | curl http://localhost:8000/api/events           |
| Test POST API               | curl -X POST ... (see above)                    |

---

Built with ❤️ using PHP + Docker + MySQL in GitHub Codespaces.
