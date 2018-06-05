<?php

try {
    define('DB_HOST', '162.241.237.235');
    define('DB_DATABASE', 'icojonng_icojon');
    define('DB_USER', 'icojonng_icojon');
    define('DB_PASSWORD', '#@IcojonNG5000@#');
    define('DB_CHARSET', 'utf8mb4');

    $dsn = 'mysql:host='.DB_HOST.';dbname='.DB_DATABASE.';charset='.DB_CHARSET;

    $opt = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ];

    $conn = new PDO($dsn, DB_USER, DB_PASSWORD, $opt);
} catch (PDOException $pe) {
    die("Could not connect to the database " . DB_DATABASE . ": " . $pe->getMessage());
}
?>