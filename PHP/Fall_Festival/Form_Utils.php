<?php
function getUsers(){
    $users=[
        "Mario" => "0001",
        "Javier" => "0010",
        "Isabel" => "0100",
        "Perica" => "1000",
        "Elizabeth" => "1001",
        "Elena" => "0110"
    ];
    return $users;
};

function getUserFromCookieCode(){
    $userInCookie=[
        "0001" => "Mario",
        "0010" => "Javier",
        "0100" => "Isabel",
        "1000" => "Perica",
        "1001" => "Elizabeth",
        "0110" => "Elena"
    ];    
    return $userInCookie;
};

function setCookieValue($value){
    $cookie_name = "mrcookie";
    $cookie_value = $value;
    setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/"); // 86400 = 1 day
    return $cookie_name;
};

function getUserFromCookie(){
    $name="Not Known";
    
    $userInCookie=getUserFromCookieCode();
    if($_COOKIE["mrcookie"]){
        $cookieCode= $_COOKIE["mrcookie"];
        $name=$userInCookie[$cookieCode];    
    }
    return $name;
};