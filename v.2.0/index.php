<?php

require "kernel/kernel.php";
require "models/UsersModel.php";
use models\UsersModel;


$router->build_page(
    'views/static_parts/header.php',
    $router->get_main_part_for_page(),
    'views/static_parts/footer.php'
);

$user = new UsersModel();
print_r($user->insert([
    'login' => 'ThridModelAndDBTest',
    'password' => 'ThridModelAndDBTest'
]));
/*print_r($user->select('*'));*/

