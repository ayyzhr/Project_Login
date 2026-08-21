const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// DATABASE
// =========================

const db = mysql.createConnection({
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE || "login_db",
  port: Number(process.env.MYSQLPORT) || 3306
});

db.connect((err) => {
  if (err) {
    console.error("Database gagal terhubung:", err);
    return;
  }

  console.log("Database berhasil terhubung!");
});

// =========================
// TEST SERVER
// =========================

app.get("/", (req, res) => {
  res.send("Server Login aktif!");
});

// =========================
// LOGIN
// =========================

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Login error:", err);

      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server"
      });
    }

    if (results.length > 0) {
      return res.json({
        success: true,
        message: "Login berhasil!",
        email: results[0].email
      });
    }

    res.json({
      success: false,
      message: "Email atau password salah!"
    });
  });
});

// =========================
// SIGN UP
// =========================

app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  console.log("SIGN UP REQUEST:", email);

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email dan password harus diisi!"
    });
  }

  const checkSql =
    "SELECT * FROM users WHERE email = ?";

  db.query(checkSql, [email], (err, results) => {
    if (err) {
      console.error("Check email error:", err);

      return res.status(500).json({
        success: false,
        message: "Terjadi kesalahan database"
      });
    }

    if (results.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email sudah terdaftar!"
      });
    }

    const insertSql =
      "INSERT INTO users (email, password) VALUES (?, ?)";

    db.query(
      insertSql,
      [email, password],
      (err, result) => {
        if (err) {
          console.error("Insert error:", err);

          return res.status(500).json({
            success: false,
            message: "Gagal menyimpan akun ke database"
          });
        }

        console.log("AKUN BERHASIL DIBUAT:", email);

        res.json({
          success: true,
          message: "Akun berhasil dibuat!"
        });
      }
    );
  });
});

// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server berjalan di port ${PORT}`);
});