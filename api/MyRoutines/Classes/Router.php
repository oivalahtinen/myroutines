<?php

namespace MyRoutines\Classes;

use MyRoutines\Classes;

/**
 *
 **/
class Router
{
    private static $url = '';
    private static $resources = array();
    private static $id = array();

    /**
     *
     **/
    public static function setUrl()
    {
        self::$url = explode('/', explode('api/', $_SERVER['REQUEST_URI'])[1]);
        self::setResourcesAndIds();
    }

    /**
     *
     **/
    public static function route()
    {
        $httpMethod = strtolower($_SERVER['REQUEST_METHOD']);
        $resource = self::$resources[count(self::$resources) - 1];
        $className = '\\MyRoutines\\Resources\\'.$resource;
        $fileName = 'MyRoutines/Resources/'.$resource.'.php';

        if (file_exists($fileName) === false) {
            Response::setStatus('error');
            Response::send('Server Error! (File not found)');

            return;
        }

        if (class_exists($className) === false) {
            Response::setStatus('error');
            Response::send('Server Error! (Class not found)');

            return;
        }

        $callable = array(
            $className::getInstance(),
            $httpMethod.$resource,
        );
        if (is_callable($callable) === false) {
            Response::setStatus('error');
            Response::send('Server Error! (Method not found)');

            return;
        }

        $response = call_user_func_array($callable, self::$id);
        Response::send($response);
    }

    private static function setResourcesAndIds()
    {
        for ($i = 0; $i < count(self::$url); $i ++) {
            if ($i % 2 === 0) {
                self::$resources[] = ucfirst(self::$url[$i]);
            } else {
                self::$id[] = self::$url[$i];
            }
        }
    }
}
