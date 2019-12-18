<?php
function get_page_by_parts($header, $footer) {
    $url = ((!empty($_SERVER['HTTPS'])) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    $url = explode('?', $url);
    $url = $url[0];
    $url_parts = explode('/', $url);
    $page_body = $url_parts[count($url_parts) - 1] != '' ? $url_parts[count($url_parts) - 1].'.php' : 'main.php';
    include $header;
    include $page_body;
    include $footer;
}