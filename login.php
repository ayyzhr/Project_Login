<?php
// Supaya React diizinkan mengakses file PHP ini
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// 1. Hubungkan ke database db_login yang ada di Laragon
$conn = mysqli_connect("localhost", "root", "", "db_login");

if (!$conn) {
    echo json_encode(["status" => "error", "message" => "Gagal konek database"]);
    exit;
}

// 2. Menerima data dari React
$data = json_decode(file_get_contents("php://input"), true);
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';

// 3. Cek apakah email dan password cocok di tabel users
$query = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) > 0) {
    echo json_encode(["status" => "success", "message" => "Login Berhasil! Welcome back!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Email atau Password salah!"]);
}
?>