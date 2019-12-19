<?php

namespace kernel;

class Router
{
    public function __construct()
    {

    }

    public function get_main_part_for_page() {
        $url = ((!empty($_SERVER['HTTPS'])) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
        $url = explode('?', $url);
        $url = $url[0];
        $url_parts = explode('/', $url);
        $page_body = $url_parts[count($url_parts) - 1] != '' ? 'views/'.$url_parts[count($url_parts) - 1].'.php' : 'views/main.php';
        return $page_body;
    }

    public function build_page($header, $main, $footer) {
        include $header;
        include $main;
        include $footer;
    }
}

