<?php

namespace MyRoutines\Classes;

class Input
{
    private static $data = array();

    public static function get ($key)
    {
        return self::http('get', $key);
    }

    public static function post ($key)
    {
        return self::http('post', $key);
    }

    public static function put ($key)
    {
        return self::http('put', $key);
    }

    public static function delete ($key)
    {
        return self::http('delete', $key);
    }

    private static function http ($verb, $key)
    {
        if (empty(self::$data) === true) {
            self::$data = json_decode(file_get_contents('php://input'), true);
        }
        return self::$data[$key];
    }
}
