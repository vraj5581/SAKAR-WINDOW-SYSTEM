<?php
require_once __DIR__ . '/db.php';

try {
    // 1. Create database if not exists
    $pdo->exec("CREATE DATABASE IF NOT EXISTS sakar_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $pdo->exec("USE sakar_db");
    
    echo "Database 'sakar_db' checked/created successfully.<br>";

    // 2. Create admin_users table
    $pdo->exec("CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB");
    
    echo "Table 'admin_users' checked/created successfully.<br>";

    // 3. Create products table
    $pdo->exec("CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        tagline VARCHAR(255) NOT NULL,
        tag VARCHAR(50) NOT NULL,
        description TEXT NOT NULL,
        profile_width VARCHAR(100) NOT NULL,
        glazing_thickness VARCHAR(100) NOT NULL,
        acoustic_rating VARCHAR(100) NOT NULL,
        water_tightness VARCHAR(100) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB");
    
    echo "Table 'products' checked/created successfully.<br>";

    // 4. Seed default admin user (admin / admin123)
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM admin_users");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $username = 'admin';
        $passwordHash = password_hash('admin123', PASSWORD_DEFAULT);
        
        $insertAdmin = $pdo->prepare("INSERT INTO admin_users (username, password) VALUES (?, ?)");
        $insertAdmin->execute([$username, $passwordHash]);
        echo "Default admin user 'admin' with password 'admin123' created successfully.<br>";
    } else {
        echo "Admin users already exist, seeding skipped.<br>";
    }

    // 5. Ensure upload directory exists
    $uploadDir = __DIR__ . '/uploads';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0777, true);
        echo "Uploads directory 'api/uploads' created.<br>";
    }

    // 6. Copy default asset images to uploads
    $assets = [
        'window_sliding.png' => __DIR__ . '/../src/assets/window_sliding.png',
        'window_casement.png' => __DIR__ . '/../src/assets/window_casement.png',
        'window_slimline.png' => __DIR__ . '/../src/assets/window_slimline.png',
        'door_folding.png' => __DIR__ . '/../src/assets/door_folding.png'
    ];

    foreach ($assets as $filename => $sourcePath) {
        $destPath = $uploadDir . '/' . $filename;
        if (file_exists($sourcePath)) {
            if (!file_exists($destPath)) {
                copy($sourcePath, $destPath);
                echo "Copied asset image '$filename' to uploads.<br>";
            } else {
                echo "Asset '$filename' already exists in uploads.<br>";
            }
        } else {
            echo "Warning: Source asset file '$sourcePath' not found.<br>";
        }
    }

    // 7. Seed default products if empty
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM products");
    $stmt->execute();
    if ($stmt->fetchColumn() == 0) {
        $defaultProducts = [
            [
                'name' => 'Thermal Break Sliding Systems',
                'tagline' => 'Smooth Glide Tracks',
                'tag' => 'Sliding',
                'description' => 'Perfectly engineered for wide span openings. Featuring double/triple glazing options, heavy-duty rollers, and multi-point security locking, providing smooth, effortless sliding action with superior sound damping.',
                'profile_width' => '45mm to 120mm',
                'glazing_thickness' => 'Up to 32mm DGU',
                'acoustic_rating' => 'Up to 38 dB',
                'water_tightness' => 'Class E900 (EN 12208)',
                'image_url' => '/api/uploads/window_sliding.png'
            ],
            [
                'name' => 'Premium Casement Series',
                'tagline' => 'Classic Swing Windows',
                'tag' => 'Casement',
                'description' => 'High-performance outward/inward opening casement windows, offering 100% opening space and maximum airflow. Double compression seals ensure absolute water tightness and air insulation.',
                'profile_width' => '50mm to 65mm',
                'glazing_thickness' => 'Up to 28mm DGU',
                'acoustic_rating' => 'Up to 40 dB',
                'water_tightness' => 'Class C5 (EN 12210)',
                'image_url' => '/api/uploads/window_casement.png'
            ],
            [
                'name' => 'Minimalist Slimline Series',
                'tagline' => 'Floor-to-Ceiling Views',
                'tag' => 'Slimline',
                'description' => 'Ultra-thin sightlines of just 20mm, maximizing natural light and offering uninterrupted panoramas. Clean flush floor tracks merge indoor spaces with outdoor vistas seamlessly.',
                'profile_width' => 'Only 20mm (Interlock)',
                'glazing_thickness' => 'Double / Triple Glazed',
                'acoustic_rating' => 'Uf down to 1.6 W/m²K',
                'water_tightness' => 'Up to 4.5 Meters Height',
                'image_url' => '/api/uploads/window_slimline.png'
            ],
            [
                'name' => 'Heavy Duty Folding Bi-Fold Doors',
                'tagline' => 'Expand Your Space',
                'tag' => 'Folding',
                'description' => 'Transform whole walls into open spaces. Engineered to carry large, heavy glass panels with multiple fold configurations (up to 7 panels left or right), sliding smooth on bottom tracks.',
                'profile_width' => '120 kg per panel',
                'glazing_thickness' => 'Up to 14 Panels total',
                'acoustic_rating' => 'Top & Bottom Security Bolts',
                'water_tightness' => 'EPDM Gasket Systems',
                'image_url' => '/api/uploads/door_folding.png'
            ]
        ];

        $insertProduct = $pdo->prepare("INSERT INTO products 
            (name, tagline, tag, description, profile_width, glazing_thickness, acoustic_rating, water_tightness, image_url) 
            VALUES (:name, :tagline, :tag, :description, :profile_width, :glazing_thickness, :acoustic_rating, :water_tightness, :image_url)");

        foreach ($defaultProducts as $p) {
            $insertProduct->execute($p);
        }
        echo "Default products seeded successfully.<br>";
    } else {
        echo "Products already exist, seeding skipped.<br>";
    }

    echo "<br><strong>Setup completed successfully!</strong>";

} catch (Exception $e) {
    http_response_code(500);
    echo "Setup failed: " . $e->getMessage();
}
