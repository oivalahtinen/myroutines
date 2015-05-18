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
    private static $routes = array();

    /**
     * @param string[] $routes
     **/
    public static function setRoutes($routes)
    {
        self::$routes = $routes;
    }

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
        $method = $_SERVER['REQUEST_METHOD'];
        $resources = self::ucFirst(self::$resources[0]);
        $className = '\\MyRoutines\\Resources\\'.self::ucFirst($resources);
        $fileName = 'MyRoutines/Resources/'.$resources.'.php';
        if (file_exists($fileName) === false) {
            Response::setStatus('error');
            Response::send('No such resources!'.$fileName);

            return;
        }
        if (class_exists($className) === false) {
            Response::setStatus('error');
            Response::send('No such class!');

            return;
        }
        $callable = array(
            $className::getInstance(),
            strtolower($method).self::getMethodName(),
        );
        if (is_callable($callable) === false) {
            Response::setStatus('error');
            Response::send('No such method!');

            return;
        }
        $response = call_user_func_array($callable, self::$id);
        Response::send($response);
    }

    private static function getMethodName()
    {
        $method = '';
        if (count(self::$resources) > count(self::$id)) {
            self::$resources[count(self::$resources) - 1] .= 's';
        }
        for ($i = 0; $i < count(self::$resources); $i ++) {
            $method .= self::ucFirst(self::$resources[$i]);
        }

        return $method;
    }

    private static function ucFirst($text)
    {
        return strtoupper(substr($text, 0, 1)).substr($text, 1);
    }

    private static function setResourcesAndIds()
    {
        for ($i = 0; $i < count(self::$url); $i ++) {
            if ($i % 2 === 0) {
                self::$resources[] = self::$url[$i];
            } else {
                self::$id[] = self::$url[$i];
            }
        }
    }
}
