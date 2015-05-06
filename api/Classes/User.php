<?php

namespace MyRoutines\Classes;

class User
{
    public static $id;

    public static function authenticate ($id = null)
    {
        if (array_key_exists('HTTP_CREDENTIALS', $_SERVER) === false) {
            return false;
        }

        $c = json_decode($_SERVER['HTTP_CREDENTIALS']);
        $r = DB::selectOne(
            'SELECT
                ID,
                Mail
            FROM
                User
            WHERE
                Mail = \'' . $c->mail . '\'
                AND Password = \'' . $c->password . '\''
        );
        if (($id === null && $r !== null) || $id = $r['ID']) {
            self::$id = $r['ID'];
            return true;
        }
        return false;
    }
}
