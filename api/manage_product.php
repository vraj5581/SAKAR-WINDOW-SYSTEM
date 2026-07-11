<?php
// Start session with secure options
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
session_start();

require_once __DIR__ . '/db.php';

// Auth Guard: Only authenticated administrators can modify products
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized access. Please login."]);
    exit();
}

$action = isset($_GET['action']) ? $_GET['action'] : '';
$uploadDir = __DIR__ . '/uploads';

// Image Upload Helper
function handleUpload($fileField, $uploadDir) {
    if (!isset($_FILES[$fileField]) || $_FILES[$fileField]['error'] === UPLOAD_ERR_NO_FILE) {
        return ['status' => 'no_file'];
    }
    if ($_FILES[$fileField]['error'] !== UPLOAD_ERR_OK) {
        return ['status' => 'error', 'message' => 'Upload error code: ' . $_FILES[$fileField]['error']];
    }
    
    $file = $_FILES[$fileField];
    $allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    
    // Validate MIME type
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);
    
    if (!in_array($mime, $allowedTypes)) {
        return ['status' => 'error', 'message' => 'Invalid file type. Only PNG, JPG, JPEG, and WEBP allowed.'];
    }
    
    // Validate size (max 5MB)
    if ($file['size'] > 5 * 1024 * 1024) {
        return ['status' => 'error', 'message' => 'File exceeds 5MB size limit.'];
    }
    
    // Generate unique name
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = 'prod_' . bin2hex(random_bytes(8)) . '.' . $ext;
    
    if (move_uploaded_file($file['tmp_name'], $uploadDir . '/' . $filename)) {
        return ['status' => 'success', 'url' => '/api/uploads/' . $filename];
    } else {
        return ['status' => 'error', 'message' => 'Failed to move uploaded file.'];
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1. Create Product
    if ($action === 'create') {
        $name = isset($_POST['name']) ? trim($_POST['name']) : '';
        $tagline = isset($_POST['tagline']) ? trim($_POST['tagline']) : '';
        $tag = isset($_POST['tag']) ? trim($_POST['tag']) : '';
        $description = isset($_POST['description']) ? trim($_POST['description']) : '';
        $profile_width = isset($_POST['profile_width']) ? trim($_POST['profile_width']) : '';
        $glazing_thickness = isset($_POST['glazing_thickness']) ? trim($_POST['glazing_thickness']) : '';
        $acoustic_rating = isset($_POST['acoustic_rating']) ? trim($_POST['acoustic_rating']) : '';
        $water_tightness = isset($_POST['water_tightness']) ? trim($_POST['water_tightness']) : '';
        
        if (empty($name) || empty($tagline) || empty($tag) || empty($description)) {
            http_response_code(400);
            echo json_encode(["error" => "Name, tagline, tag, and description are required."]);
            exit();
        }
        
        $uploadResult = handleUpload('image', $uploadDir);
        if ($uploadResult['status'] === 'error') {
            http_response_code(400);
            echo json_encode(["error" => $uploadResult['message']]);
            exit();
        }
        
        $imageUrl = ($uploadResult['status'] === 'success') ? $uploadResult['url'] : '/api/uploads/window_sliding.png'; // fallback default
        
        try {
            $stmt = $pdo->prepare("INSERT INTO products 
                (name, tagline, tag, description, profile_width, glazing_thickness, acoustic_rating, water_tightness, image_url) 
                VALUES (:name, :tagline, :tag, :description, :profile_width, :glazing_thickness, :acoustic_rating, :water_tightness, :image_url)");
            
            $stmt->execute([
                'name' => $name,
                'tagline' => $tagline,
                'tag' => $tag,
                'description' => $description,
                'profile_width' => $profile_width,
                'glazing_thickness' => $glazing_thickness,
                'acoustic_rating' => $acoustic_rating,
                'water_tightness' => $water_tightness,
                'image_url' => $imageUrl
            ]);
            
            echo json_encode(["success" => true, "message" => "Product created successfully."]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database write failed: " . $e->getMessage()]);
        }
        exit();
    }
    
    // 2. Update Product
    if ($action === 'update') {
        $id = isset($_POST['id']) ? intval($_POST['id']) : 0;
        $name = isset($_POST['name']) ? trim($_POST['name']) : '';
        $tagline = isset($_POST['tagline']) ? trim($_POST['tagline']) : '';
        $tag = isset($_POST['tag']) ? trim($_POST['tag']) : '';
        $description = isset($_POST['description']) ? trim($_POST['description']) : '';
        $profile_width = isset($_POST['profile_width']) ? trim($_POST['profile_width']) : '';
        $glazing_thickness = isset($_POST['glazing_thickness']) ? trim($_POST['glazing_thickness']) : '';
        $acoustic_rating = isset($_POST['acoustic_rating']) ? trim($_POST['acoustic_rating']) : '';
        $water_tightness = isset($_POST['water_tightness']) ? trim($_POST['water_tightness']) : '';
        
        if ($id <= 0 || empty($name) || empty($tagline) || empty($tag) || empty($description)) {
            http_response_code(400);
            echo json_encode(["error" => "ID, name, tagline, tag, and description are required."]);
            exit();
        }
        
        // Fetch current product to check image URL
        $stmt = $pdo->prepare("SELECT image_url FROM products WHERE id = ?");
        $stmt->execute([$id]);
        $currentProduct = $stmt->fetch();
        if (!$currentProduct) {
            http_response_code(404);
            echo json_encode(["error" => "Product not found."]);
            exit();
        }
        
        $imageUrl = $currentProduct['image_url'];
        
        // Check if new image is uploaded
        $uploadResult = handleUpload('image', $uploadDir);
        if ($uploadResult['status'] === 'error') {
            http_response_code(400);
            echo json_encode(["error" => $uploadResult['message']]);
            exit();
        }
        
        if ($uploadResult['status'] === 'success') {
            $imageUrl = $uploadResult['url'];
            
            // Delete old image file if it's not a seed asset
            $oldFilename = basename($currentProduct['image_url']);
            $defaultAssets = ['window_sliding.png', 'window_casement.png', 'window_slimline.png', 'door_folding.png'];
            if (!in_array($oldFilename, $defaultAssets) && file_exists($uploadDir . '/' . $oldFilename)) {
                @unlink($uploadDir . '/' . $oldFilename);
            }
        }
        
        try {
            $stmt = $pdo->prepare("UPDATE products SET 
                name = :name, 
                tagline = :tagline, 
                tag = :tag, 
                description = :description, 
                profile_width = :profile_width, 
                glazing_thickness = :glazing_thickness, 
                acoustic_rating = :acoustic_rating, 
                water_tightness = :water_tightness, 
                image_url = :image_url 
                WHERE id = :id");
            
            $stmt->execute([
                'id' => $id,
                'name' => $name,
                'tagline' => $tagline,
                'tag' => $tag,
                'description' => $description,
                'profile_width' => $profile_width,
                'glazing_thickness' => $glazing_thickness,
                'acoustic_rating' => $acoustic_rating,
                'water_tightness' => $water_tightness,
                'image_url' => $imageUrl
            ]);
            
            echo json_encode(["success" => true, "message" => "Product updated successfully."]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Database update failed: " . $e->getMessage()]);
        }
        exit();
    }
    
    // 3. Delete Product
    if ($action === 'delete') {
        $input = json_decode(file_get_contents('php://input'), true);
        $id = isset($input['id']) ? intval($input['id']) : (isset($_POST['id']) ? intval($_POST['id']) : 0);
        
        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(["error" => "Valid product ID is required."]);
            exit();
        }
        
        // Fetch product to delete its image file
        $stmt = $pdo->prepare("SELECT image_url FROM products WHERE id = ?");
        $stmt->execute([$id]);
        $product = $stmt->fetch();
        
        if ($product) {
            $filename = basename($product['image_url']);
            $defaultAssets = ['window_sliding.png', 'window_casement.png', 'window_slimline.png', 'door_folding.png'];
            
            // Delete file if it exists and is not a default seed asset
            if (!in_array($filename, $defaultAssets) && file_exists($uploadDir . '/' . $filename)) {
                @unlink($uploadDir . '/' . $filename);
            }
            
            try {
                $delStmt = $pdo->prepare("DELETE FROM products WHERE id = ?");
                $delStmt->execute([$id]);
                echo json_encode(["success" => true, "message" => "Product deleted successfully."]);
            } catch (PDOException $e) {
                http_response_code(500);
                echo json_encode(["error" => "Database delete failed: " . $e->getMessage()]);
            }
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Product not found."]);
        }
        exit();
    }
}

http_response_code(400);
echo json_encode(["error" => "Invalid request method or action."]);
