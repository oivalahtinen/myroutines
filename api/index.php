<?php
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, Credentials');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('HTTP/1.1 200 OK');
    exit();
}

/**
 * @param string $className
 **/
function __autoload($className)
{
    $className = ltrim($className, '\\');
    $fileName  = '';
    $nSpace = '';
    $lastNsPos = strrpos($className, '\\');
    if ($lastNsPos !== 0) {
        $nSpace = substr($className, 0, $lastNsPos);
        $className = substr($className, $lastNsPos + 1);
        $fileName  = str_replace('\\', DIRECTORY_SEPARATOR, $nSpace).DIRECTORY_SEPARATOR;
    }
    $fileName .= str_replace('_', DIRECTORY_SEPARATOR, $className).'.php';

    include_once $fileName;
}

MyRoutines\Classes\DB::connect('localhost', 'root', 'oiva', 'myroutines');
MyRoutines\Classes\Router::setUrl();
MyRoutines\Classes\Router::route();
