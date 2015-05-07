<?php

namespace MyRoutines\Classes;

class Auth
{
    public static $id;
    const SUCCESS = 1;
    const FAIL = 2;
    const EMPTY_CREDENTIALS = 3;
    const EMPTY_MAIL = 4;
    const EMPTY_PASSWORD = 5;
    const MAIL_NOT_FOUND = 6;
    const WRONG_PASSWORD = 7;

    public static function authenticate ($id = null, $returnFailureType = false)
    {
        if (array_key_exists('HTTP_CREDENTIALS', $_SERVER) === false) {
            return self::EMPTY_CREDENTIALS;
        }

        $c = json_decode($_SERVER['HTTP_CREDENTIALS']);
        if ($returnFailureType === true && empty($c->mail) === true) {
            return self::EMPTY_MAIL;
        } else if ($returnFailureType === true && empty($c->password) === true) {
            return self::EMPTY_PASSWORD;
        }

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
            return self::SUCCESS;
        }
        if ($returnFailureType === false) {
            return self::FAIL;
        }

        $r = DB::selectOne(
            'SELECT
                ID
            FROM
                User
            WHERE
                Mail = \'' . $c->mail . '\''
        );
        if (empty($r) === true) {
            return self::MAIL_NOT_FOUND;
        }
        return self::WRONG_PASSWORD;
    }
}
