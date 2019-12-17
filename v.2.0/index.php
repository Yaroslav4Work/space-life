<?php

include "kernel/kernel.php";
include "kernel/router.php";

/*$url = ((!empty($_SERVER['HTTPS'])) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
$url = explode('?', $url);
$url = $url[0];
$url_parts = explode('/', $url);
$page_body = $url_parts[4] != '' ? $url_parts[4].'.php' : 'main.php';

include "header.php";

include $page_body;

include "footer.php";*/

get_page_by_parts(HEADER_PATH, FOOTER_PATH);

