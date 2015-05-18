<?php

namespace MyRoutines\Classes;

/**
 *
 **/
class Input
{
    private static $data = array();

    /**
     *
     **/
    public static function get($keys)
    {
        if (empty(self::$data) === true) {
            self::$data = json_decode(file_get_contents('php://input'), true);
        }
        $input = self::check($keys);
        foreach ($keys as $key) {
            $input['values'][ucfirst($key)] = self::$data[$key];
        }

        return $input;
    }

    private static function check($keys)
    {
        $ret = array('ok' => true, 'fields' => array());
        foreach ($keys as $key) {
            if (empty(self::$data[$key]) === true) {
                $ret['ok'] = false;
                $ret['fields'][$key] = false;
                continue;
            }

            $ret['fields'][$key] = true;
        }

        return $ret;
    }
}
