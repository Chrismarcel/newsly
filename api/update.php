<?php
require_once('config.php');

$content = json_decode(file_get_contents("https://newsapi.org/v2/top-headlines?country=ng&apiKey=90e0ae8dcffb4ac6830be6bfd93be312", 1), 1);

$news_content = [];

$query = "INSERT INTO `news_tbl` (news_title, news_body, news_image, news_time, news_source, news_url) VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($query);

if ($content['status'] === 'ok') {
    foreach($content['articles'] as $prop){
        $news_time = date('Y-m-d H:i:s', strtotime($prop['publishedAt']));
        $stmt->bindParam(1, $prop['title'], PDO::PARAM_STR);
        $stmt->bindParam(2, $prop['description'], PDO::PARAM_STR);
        $stmt->bindParam(3, $prop['urlToImage'], PDO::PARAM_STR);
        $stmt->bindParam(4, $news_time, PDO::PARAM_STR);
        $stmt->bindParam(5, $prop['source']['name'], PDO::PARAM_STR);
        $stmt->bindParam(6, $prop['url'], PDO::PARAM_STR);
        $stmt->execute();
    }
}
?>