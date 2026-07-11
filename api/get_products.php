<?php
require_once __DIR__ . '/db.php';

try {
    // Fetch all products sorted by creation/id
    $stmt = $pdo->query("SELECT * FROM products ORDER BY id ASC");
    $products = $stmt->fetchAll();
    
    echo json_encode($products);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch products: " . $e->getMessage()]);
}
