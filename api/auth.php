<?php
// Start session with secure options
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);

// Configure session start parameters
session_start([
    'cookie_lifetime' => 86400, // 1 day
    'cookie_path' => '/',
    'cookie_secure' => false, // Set to true if on production HTTPS
    'cookie_samesite' => 'Lax'
]);

require_once __DIR__ . '/db.php';

$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($action === 'login') {
        // Read input JSON
        $input = json_decode(file_get_contents('php://input'), true);
        $username = isset($input['username']) ? strtolower(trim($input['username'])) : '';
        $password = isset($input['password']) ? strtolower($input['password']) : '';
        
        if (empty($username) || empty($password)) {
            http_response_code(400);
            echo json_encode(["error" => "Username and password are required."]);
            exit();
        }
        
        // Fetch user from DB
        $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password'])) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_user'] = $username;
            
            echo json_encode([
                "success" => true,
                "message" => "Login successful",
                "user" => $username
            ]);
        } else {
            http_response_code(401);
            echo json_encode(["error" => "Invalid username or password."]);
        }
        exit();
    }
    
    if ($action === 'logout') {
        $_SESSION = [];
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        session_destroy();
        echo json_encode(["success" => true, "message" => "Logged out successfully."]);
        exit();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if ($action === 'check') {
        if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
            echo json_encode([
                "authenticated" => true,
                "user" => $_SESSION['admin_user']
            ]);
        } else {
            echo json_encode(["authenticated" => false]);
        }
        exit();
    }
}

http_response_code(400);
echo json_encode(["error" => "Invalid request method or action."]);
