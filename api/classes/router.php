<?php

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
        $resource = self::$resource[0];
        $className = strtoupper(substr($resource, 0, 1)) . substr($resource, 1);
        $fileName = 'resources/' . $resource . '.php';
        if (file_exists($fileName) === false) {
            Response::send('No such resource!', 'error');
            return;
        }
        if (class_exists($resource) === false) {
            Response::send('No such class!', 'error');
            return;
        }
        $classMethod = strtolower($method) . self::getMethodName();
        if (is_callable(array($className, $classMethod), false, $callable) === false) {
            Response::send('No such method!', 'error');
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
            $method .= strtoupper(substr(self::$resource[$i], 0, 1)) . substr(self::$resource[$i], 1);
        }
        return $method;
    }
}
