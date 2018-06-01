<?php

require_once('config.php');
$data = [];

// Fetch news updates
$fetch_news = $conn->query(
    "SELECT * FROM news_tbl ORDER BY news_time DESC"
);

$news = $fetch_news->fetchAll();

echo json_encode($news);

?>