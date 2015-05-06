<?php

namespace MyRoutines\Classes;
use \MyRoutines\Classes;

class Router
{
    private static $url;
    private static $resource = array();
    private static $id = array();
    private static $routes;

    public static function setRoutes($routes)
    {
        self::$routes = $routes;
    }

    public static function setUrl()
    {
        self::$url = explode('/', explode('api/', $_SERVER['REQUEST_URI'])[1]);
        self::setResourcesAndIds();
    }

    private static function setResourcesAndIds()
    {
        for ($i = 0; $i < count(self::$url); $i ++) {
            if ($i % 2 === 0) {
                self::$resource[] = self::$url[$i];
            } else {
                self::$id[] = self::$url[$i];
            }
        }
    }

    public static function route()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $resource = self::ucFirst(self::$resource[0]);
        $className = '\\MyRoutines\\Resources\\' . self::ucFirst($resource);
        $fileName = 'Resources/' . $resource . '.php';
        if (file_exists($fileName) === false) {
            Response::setStatus('error');
            Response::send('No such resource!' . $fileName);
            return;
        }
        if (class_exists($className) === false) {
            Response::setStatus('error');
            Response::send('No such class!');
            return;
        }
        $classMethod = strtolower($method) . self::getMethodName();
        if (is_callable(array($className, $classMethod), false, $callable) === false) {
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
        if (count(self::$resource) > count(self::$id)) {
            self::$resource[count(self::$resource) - 1] .= "s";
        }
        for ($i = 0; $i < count(self::$resource); $i ++) {
            $method .= self::ucFirst(self::$resource[$i]);
        }
        return $method;
    }

    private static function ucFirst ($string)
    {
        return strtoupper(substr($string, 0, 1)) . substr($string, 1);
    }
}
